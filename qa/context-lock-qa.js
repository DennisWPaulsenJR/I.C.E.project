/*
 * Context Lock QA for the I.C.E. Chrome extension.
 *
 * Run:
 *   npm run qa:context-lock
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const EXTENSION_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(EXTENSION_ROOT, "qa-output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "latest-context-lock-qa.json");
const TEST_CHAPTERS = [1, 2, 3, 4, 5];
const BASE_URL = "https://www.churchofjesuschrist.org/study/scriptures/nt/matt";

const HIGHER_LAYER_KEYS = new Set([
  "ICE_KNOWLEDGE_GRAPH",
  "ICE_PRINCIPLE_RELATIONSHIPS",
  "ICE_PRINCIPLE_NETWORKS",
  "ICE_SEMANTIC_CONTINUITY",
  "ICE_SESSION_CONTINUITY_REVIEW",
  "ICE_CHARACTER_INTERACTIONS"
]);

const RAW_SOURCE_KEYS = new Set([
  "ICE_LATEST_CAPTURE",
  "ICE_CAPTURE_HISTORY"
]);

const LOCATION_NAMES = [
  "Nazareth",
  "Egypt",
  "Jerusalem",
  "Bethlehem",
  "Galilee",
  "Capernaum",
  "Jordan",
  "sea of Galilee",
  "wilderness"
];

const BAD_LOCATION_KEYS = new Set([
  "actor",
  "actorname",
  "resolvedactorname",
  "recipient",
  "messenger",
  "authority",
  "authoritysource",
  "sourceauthority",
  "origin",
  "sourceentity"
]);

const BAD_LOCATION_ROLE_TYPES = new Set([
  "participant",
  "semanticActor",
  "recipient",
  "sourceAuthority",
  "authoritativeCharacter",
  "authorityChainParticipant",
  "sceneParticipant"
]);

const FORBIDDEN_ROLE_INVERSION_PATTERNS = [
  /angel\s+(?:of\s+(?:the\s+)?lord|of\s+the\s+lord)?\s+receives\s+revelation/i,
  /angel\s+(?:of\s+(?:the\s+)?lord|of\s+the\s+lord)?\s+is\s+(?:the\s+)?(?:source\s+)?authority/i,
  /messenger\s+becomes\s+authority/i,
  /recipient\s+becomes\s+messenger/i,
  /joseph\s+instructs\s+(?:the\s+)?angel/i
];

function loadPlaywright() {
  try {
    return { playwright: require("playwright"), error: null };
  } catch (error) {
    return { playwright: null, error };
  }
}

function normalize(value = "") {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function keyName(value = "") {
  return normalize(value).toLowerCase();
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function outputBundle(bundle) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2));
}

function recordId(record = {}) {
  return record.id || record.semanticEventId || record.eventId || record.nodeId || record.pathId || record.scopePath || record.canonicalKey || record.key || "unknown-record";
}

function recordScope(record = {}) {
  return record.verseRange || record.scopePath || record.sourceScope || record.activeScope || record.sourceTitle || record.eventScope || "unknown-scope";
}

function recordString(record = {}) {
  return JSON.stringify(record, (_key, value) => typeof value === "string" && value.length > 300 ? `${value.slice(0, 300)}...` : value);
}

function allRecords(data) {
  const records = [];
  for (const [storageKey, value] of Object.entries(data || {})) {
    if (Array.isArray(value)) {
      value.forEach((record, index) => {
        if (record && typeof record === "object") records.push({ storageKey, record, index });
      });
    } else if (value && typeof value === "object") {
      records.push({ storageKey, record: value, index: 0 });
    }
  }
  return records;
}

function addViolation(violations, chapter, details) {
  violations.push({
    chapter: `Matthew ${chapter}`,
    sourceScope: details.sourceScope || recordScope(details.record || {}),
    storageKey: details.storageKey || "unknown-storage-key",
    recordId: details.recordId || recordId(details.record || {}),
    recordType: details.recordType || details.record?.layer || details.record?.eventType || details.record?.recordType || "storage_record",
    lowerLayer: details.lowerLayer || "Context Lock",
    higherLayer: details.higherLayer || details.storageKey || "unknown higher layer",
    lowerLayerValue: details.lowerLayerValue || "not recorded",
    conflictingValue: details.conflictingValue || "not recorded",
    message: details.message
  });
}

function sourceMatchFromUrl(url = "") {
  const match = normalize(url).match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);
  const books = { matt: "Matthew", mark: "Mark", luke: "Luke", john: "John" };
  return match ? { book: books[match[1].toLowerCase()], chapter: match[2] } : null;
}

function sourceMatchFromTitle(title = "") {
  const match = normalize(title).match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
  return match ? { book: match[1], chapter: match[2] } : null;
}

function entityRegistry(data) {
  return Array.isArray(data.ICE_ENTITY_REGISTRY) ? data.ICE_ENTITY_REGISTRY : [];
}

function findEntity(data, names) {
  const expected = asArray(names).map(keyName);
  return entityRegistry(data).find((record) => {
    const labels = [record.canonicalName, record.displayName, ...(record.aliases || [])].map(keyName);
    return labels.some((label) => expected.includes(label));
  });
}

function matchesName(value, expected) {
  return keyName(value) === keyName(expected);
}

function includesName(value, expected) {
  return new RegExp(`\\b${expected.replace(/\s+/g, "\\s+")}\\b`, "i").test(normalize(value));
}

function isLocationName(value) {
  const normalized = keyName(value);
  return LOCATION_NAMES.some((location) => normalized === keyName(location));
}

async function getServiceWorker(context) {
  let worker = context.serviceWorkers()[0];
  if (!worker) worker = await context.waitForEvent("serviceworker", { timeout: 15000 });
  return worker;
}

async function clearAndConfigure(worker) {
  await worker.evaluate(async () => {
    await chrome.storage.local.clear();
    await chrome.storage.sync.set({
      enabled: true,
      strictMode: true,
      highlightPronouns: true,
      autoCaptureOnPageLoad: true,
      showPageOverlay: false
    });
  });
}

async function captureActiveSourcePage(worker) {
  return await worker.evaluate(async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs.find((candidate) => /churchofjesuschrist\.org\/study\/scriptures\//i.test(candidate.url || "")) || tabs[0];
    if (!tab?.id) throw new Error("No active scripture tab available for context lock QA capture.");

    async function requestCapture() {
      try {
        return await chrome.tabs.sendMessage(tab.id, { type: "ICE_CAPTURE_PAGE_TEXT" });
      } catch (_error) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["engine.js", "content.js", "pageOverlay.js"]
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await chrome.tabs.sendMessage(tab.id, { type: "ICE_CAPTURE_PAGE_TEXT" });
      }
    }

    const response = await requestCapture();
    if (!response?.ok || !response.capture?.text) throw new Error(response?.error || "Content capture returned no text.");
    const capture = response.capture;
    if (capture.sourceAdapter?.adapterName !== "lds_scripture_adapter") {
      throw new Error(`Expected lds_scripture_adapter, got ${capture.sourceAdapter?.adapterName || "missing"}.`);
    }

    await chrome.storage.local.set({
      ICE_LATEST_CAPTURE: capture,
      ICE_CAPTURE_HISTORY: [{
        id: capture.id,
        title: capture.title || "",
        url: capture.url || "",
        capturedAt: capture.capturedAt || new Date().toISOString(),
        wordCount: capture.wordCount || 0,
        charCount: capture.characterCount || capture.charCount || 0,
        divineReferenceCount: capture.divineReferenceCount || 0,
        text: capture.text || "",
        domSemanticHints: capture.domSemanticHints || [],
        sourceAdapter: capture.sourceAdapter || null,
        textHash: "context-lock-qa"
      }]
    });
    return { title: capture.title || "", url: capture.url || "", text: capture.text || "" };
  });
}

async function runBackgroundAnalysis(worker) {
  return await worker.evaluate(async () => {
    if (typeof runFullAnalysisPipeline === "function") return await runFullAnalysisPipeline("qa:context-lock");
    return await chrome.runtime.sendMessage({ type: "ICE_RUN_FULL_ANALYSIS_PIPELINE", reason: "qa:context-lock" });
  });
}

async function readFullStorage(worker) {
  return await worker.evaluate(async () => chrome.storage.local.get(null));
}

async function waitForAnalysis(worker, timeoutMs = 45000) {
  const start = Date.now();
  let latest = {};
  while (Date.now() - start < timeoutMs) {
    latest = await readFullStorage(worker);
    if (
      latest.ICE_LATEST_CAPTURE?.text &&
      latest.ICE_ACTIVE_ADAPTER?.adapterName &&
      Array.isArray(latest.ICE_ENTITY_REGISTRY) &&
      latest.ICE_ANALYSIS_STATUS
    ) {
      return latest;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return latest;
}

function validateSourceContext(chapter, data, violations) {
  const expected = { book: "Matthew", chapter: String(chapter) };
  const capture = data.ICE_LATEST_CAPTURE || {};
  const captureMatch = sourceMatchFromUrl(capture.url || "") || sourceMatchFromTitle(capture.title || "");
  if (captureMatch?.book !== expected.book || captureMatch?.chapter !== expected.chapter) {
    addViolation(violations, chapter, {
      storageKey: "ICE_LATEST_CAPTURE",
      record: capture,
      lowerLayer: "Level 0 Source Text",
      higherLayer: "Capture identity",
      lowerLayerValue: `${expected.book} ${expected.chapter}`,
      conflictingValue: `${captureMatch?.book || "unknown"} ${captureMatch?.chapter || "unknown"}`,
      message: "Captured source page identity does not match the requested source scope."
    });
  }

  const status = data.ICE_ANALYSIS_STATUS || {};
  if (status.sourceCaptureBook && String(status.sourceCaptureChapter || "") !== expected.chapter) {
    addViolation(violations, chapter, {
      storageKey: "ICE_ANALYSIS_STATUS",
      record: status,
      lowerLayer: "Level 1 Context",
      higherLayer: "Analysis status",
      lowerLayerValue: `${expected.book} ${expected.chapter}`,
      conflictingValue: `${status.sourceCaptureBook || "unknown"} ${status.sourceCaptureChapter || "unknown"}`,
      message: "Analysis status source scope was rewritten away from the active source page."
    });
  }

  for (const marker of asArray(data.ICE_CANONICAL_ANALYZED_PAGES)) {
    if (marker.sourceCaptureBook === expected.book && String(marker.sourceCaptureChapter || "") !== expected.chapter) {
      addViolation(violations, chapter, {
        storageKey: "ICE_CANONICAL_ANALYZED_PAGES",
        record: marker,
        lowerLayer: "Level 1 Context",
        higherLayer: "Stored analyzed session",
        lowerLayerValue: `${expected.book} ${expected.chapter}`,
        conflictingValue: `${marker.sourceCaptureBook || "unknown"} ${marker.sourceCaptureChapter || "unknown"}`,
        message: "Retained analyzed page replaced or redefined the current isolated source scope."
      });
    }
  }
}

function validateRoleStability(chapter, data, violations) {
  const text = normalize(data.ICE_LATEST_CAPTURE?.text || "");
  const hasAngelJosephContext = /angel of (?:the )?lord/i.test(text) && /joseph/i.test(text);

  if (hasAngelJosephContext) {
    const originPaths = asArray(data.ICE_ORIGIN_AUTHORITY_PATHS);
    const revelationPatterns = asArray(data.ICE_REVELATION_PATTERNS);
    const hasLockedPath = originPaths.some((item) =>
      matchesName(item.origin, "THE LORD") &&
      /angel/i.test(item.messenger || "") &&
      matchesName(item.recipient, "Joseph")
    ) || revelationPatterns.some((item) =>
      /angel/i.test(item.speaker || "") &&
      matchesName(item.authoritySource, "THE LORD") &&
      matchesName(item.recipient, "Joseph")
    );

    if (!hasLockedPath) {
      addViolation(violations, chapter, {
        storageKey: "ICE_ORIGIN_AUTHORITY_PATHS/ICE_REVELATION_PATTERNS",
        record: data.ICE_ANALYSIS_STATUS || {},
        lowerLayer: "Level 1 Context",
        higherLayer: "Level 3 Supported Meaning",
        lowerLayerValue: "THE LORD authority -> AngEL messenger -> Joseph recipient",
        conflictingValue: "missing locked authority path",
        message: "Angel/Joseph source context is present but the locked authority/messenger/recipient path was not preserved."
      });
    }

    for (const { storageKey, record } of allRecords(data)) {
      if (RAW_SOURCE_KEYS.has(storageKey)) continue;
      const authorityValue = record.authoritySource || record.sourceAuthority || record.origin;
      if (authorityValue && /angel/i.test(authorityValue)) {
        addViolation(violations, chapter, {
          storageKey,
          record,
          lowerLayer: "Level 1 Context",
          higherLayer: storageKey,
          lowerLayerValue: "AngEL Of THE LORD = messenger",
          conflictingValue: `${authorityValue} assigned as authority/origin`,
          message: "Messenger was assigned as authority/origin."
        });
      }
      const recipientValue = record.recipient;
      if (recipientValue && /angel/i.test(recipientValue) && /joseph/i.test(recordString(record))) {
        addViolation(violations, chapter, {
          storageKey,
          record,
          lowerLayer: "Level 1 Context",
          higherLayer: storageKey,
          lowerLayerValue: "Joseph = recipient",
          conflictingValue: `${recipientValue} assigned as recipient`,
          message: "Recipient role was inverted away from Joseph."
        });
      }
    }
  }

  for (const { storageKey, record } of allRecords(data)) {
    if (RAW_SOURCE_KEYS.has(storageKey)) continue;
    const serialized = recordString(record);
    for (const pattern of FORBIDDEN_ROLE_INVERSION_PATTERNS) {
      if (pattern.test(serialized)) {
        addViolation(violations, chapter, {
          storageKey,
          record,
          lowerLayer: "Level 1 Context",
          higherLayer: storageKey,
          lowerLayerValue: "authority/messenger/recipient roles are locked by source context",
          conflictingValue: serialized.slice(0, 240),
          message: "Stored record contains a role inversion phrase forbidden by Context Lock."
        });
      }
    }
  }
}

function validateLocationStability(chapter, data, violations) {
  for (const location of LOCATION_NAMES) {
    const entity = findEntity(data, [location]);
    if (entity) {
      if (!/^location\b|^location\s*\//i.test(entity.entityType || "")) {
        addViolation(violations, chapter, {
          storageKey: "ICE_ENTITY_REGISTRY",
          record: entity,
          lowerLayer: "Level 1 Context",
          higherLayer: "Entity classification",
          lowerLayerValue: `${location} = Location / Place / Region`,
          conflictingValue: `${location} = ${entity.entityType || "unknown entity type"}`,
          message: "Location entity was not preserved as a location classification."
        });
      }
      for (const roleType of entity.roleTypes || []) {
        if (BAD_LOCATION_ROLE_TYPES.has(roleType)) {
          addViolation(violations, chapter, {
            storageKey: "ICE_ENTITY_REGISTRY",
            record: entity,
            lowerLayer: "Level 1 Context",
            higherLayer: "Entity role assignment",
            lowerLayerValue: `${location} = location/where/place reference`,
            conflictingValue: `${location} roleType = ${roleType}`,
            message: "Location entity acquired actor/recipient/messenger/authority role."
          });
        }
      }
    }

    for (const { storageKey, record } of allRecords(data)) {
      if (RAW_SOURCE_KEYS.has(storageKey)) continue;
      for (const [key, value] of Object.entries(record)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === "participants" && Array.isArray(value) && value.some((item) => matchesName(item, location))) {
          addViolation(violations, chapter, {
            storageKey,
            record,
            lowerLayer: "Level 1 Context",
            higherLayer: storageKey,
            lowerLayerValue: `${location} = location/where/place reference`,
            conflictingValue: `${location} listed as participant`,
            message: "Location was stored as a participant."
          });
        }
        if (BAD_LOCATION_KEYS.has(lowerKey) && matchesName(value, location)) {
          addViolation(violations, chapter, {
            storageKey,
            record,
            lowerLayer: "Level 1 Context",
            higherLayer: storageKey,
            lowerLayerValue: `${location} = location/where/place reference`,
            conflictingValue: `${location} stored in ${key}`,
            message: "Location was stored in an actor/recipient/messenger/authority field."
          });
        }
      }
    }
  }
}

function validateMeaningAndRelationshipStability(chapter, data, violations) {
  const protectedActors = ["Mary", "Joseph", "Abraham", "John the Baptist", "JESUS", "JESUS CHRIST"];
  for (const actor of protectedActors) {
    const entity = findEntity(data, actor === "JESUS" || actor === "JESUS CHRIST" ? ["JESUS", "JESUS CHRIST"] : [actor]);
    if (entity && /location|narrator|source_author|traditional_author/.test(keyName(entity.entityType || ""))) {
      addViolation(violations, chapter, {
        storageKey: "ICE_ENTITY_REGISTRY",
        record: entity,
        lowerLayer: "Level 1 Context",
        higherLayer: "Entity classification",
        lowerLayerValue: `${actor} = grounded actor/person`,
        conflictingValue: `${actor} = ${entity.entityType || "unknown entity type"}`,
        message: "Explicit actor identity was rewritten by classification."
      });
    }
  }

  for (const { storageKey, record } of allRecords(data)) {
    if (!HIGHER_LAYER_KEYS.has(storageKey)) continue;
    const serialized = recordString(record);
    for (const location of LOCATION_NAMES) {
      if (isLocationName(record.actor || record.actorName || record.resolvedActorName || record.recipient || record.messenger || record.authority || record.authoritySource || record.sourceAuthority)) {
        addViolation(violations, chapter, {
          storageKey,
          record,
          lowerLayer: "Level 1 Context",
          higherLayer: storageKey,
          lowerLayerValue: `${location} = location/where/place reference`,
          conflictingValue: `${location} used in actor/recipient/messenger/authority slot`,
          message: "Higher relationship layer rewrote a location into an actor role."
        });
      }
    }
    if (/unknown actor/i.test(serialized)) {
      for (const actor of protectedActors) {
        if (includesName(serialized, actor)) {
          addViolation(violations, chapter, {
            storageKey,
            record,
            lowerLayer: "Level 1 Context",
            higherLayer: storageKey,
            lowerLayerValue: `${actor} = explicit named actor when present in source context`,
            conflictingValue: "Unknown actor record contains named actor evidence",
            message: "Higher layer collapsed a grounded named actor into Unknown actor."
          });
        }
      }
    }
  }
}

function validateProvenance(chapter, data, violations) {
  for (const { storageKey, record } of allRecords(data)) {
    if (!HIGHER_LAYER_KEYS.has(storageKey)) continue;
    const hasScope = Boolean(recordScope(record) && recordScope(record) !== "unknown-scope");
    const hasGrounding = Boolean(record.sourceGrounding || record.provenance || record.evidence || record.evidenceChain || record.reasoningPath || record.sourcePhrase || record.verseRange || record.scopePath);
    if (!hasScope || !hasGrounding) {
      addViolation(violations, chapter, {
        storageKey,
        record,
        lowerLayer: "Level 0/1 Source + Context",
        higherLayer: storageKey,
        lowerLayerValue: "Derived records must retain source scope and grounding/provenance",
        conflictingValue: `scope=${recordScope(record)} grounding=${hasGrounding ? "present" : "missing"}`,
        message: "Higher layer record is missing source/provenance information needed to audit Context Lock."
      });
    }
  }
}

function validateChapter(chapter, data) {
  const violations = [];
  validateSourceContext(chapter, data, violations);
  validateRoleStability(chapter, data, violations);
  validateLocationStability(chapter, data, violations);
  validateMeaningAndRelationshipStability(chapter, data, violations);
  validateProvenance(chapter, data, violations);
  return violations;
}

async function runChapter(playwright, chapter) {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "ice-context-lock-qa-"));
  const context = await playwright.chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_ROOT}`,
      `--load-extension=${EXTENSION_ROOT}`,
      "--no-first-run",
      "--no-default-browser-check"
    ]
  });
  const worker = await getServiceWorker(context);
  await clearAndConfigure(worker);
  const page = await context.newPage();
  const url = `${BASE_URL}/${chapter}?lang=eng`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(() => document.body && document.body.innerText.length > 1000, null, { timeout: 45000 });
    await page.waitForTimeout(1000);
    const capture = await captureActiveSourcePage(worker);
    await runBackgroundAnalysis(worker);
    const storageData = await waitForAnalysis(worker);
    const violations = validateChapter(chapter, storageData);
    if (!asArray(storageData.ICE_ENTITY_REGISTRY).length || !storageData.ICE_ANALYSIS_STATUS) {
      addViolation(violations, chapter, {
        storageKey: "chrome.storage.local",
        record: storageData.ICE_ANALYSIS_STATUS || {},
        lowerLayer: "QA setup",
        higherLayer: "Full storage inspection",
        lowerLayerValue: "analysis should produce full storage records",
        conflictingValue: "missing expected analysis records",
        message: "Analysis did not produce expected full-storage records."
      });
    }
    return {
      chapter,
      url,
      title: capture.title,
      pass: violations.length === 0,
      violations,
      counts: {
        entityRegistry: asArray(storageData.ICE_ENTITY_REGISTRY).length,
        revelationPatterns: asArray(storageData.ICE_REVELATION_PATTERNS).length,
        originAuthorityPaths: asArray(storageData.ICE_ORIGIN_AUTHORITY_PATHS).length,
        knowledgeGraph: asArray(storageData.ICE_KNOWLEDGE_GRAPH).length,
        principleNetworks: asArray(storageData.ICE_PRINCIPLE_NETWORKS).length,
        semanticContinuity: asArray(storageData.ICE_SEMANTIC_CONTINUITY).length,
        journeyPageSnapshots: asArray(storageData.ICE_JOURNEY_PAGE_SNAPSHOTS).length
      }
    };
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
  }
}

async function main() {
  const { playwright, error } = loadPlaywright();
  if (!playwright) {
    const bundle = { pass: false, failureType: "missing-playwright", failures: [`Playwright is not installed: ${error.message}`], chapters: [] };
    outputBundle(bundle);
    console.error("FAIL: Context Lock QA");
    console.error(bundle.failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  const chapters = [];
  for (const chapter of TEST_CHAPTERS) {
    chapters.push(await runChapter(playwright, chapter));
  }
  const violations = chapters.flatMap((item) => item.violations);
  const bundle = {
    testedAt: new Date().toISOString(),
    pass: violations.length === 0,
    command: "npm run qa:context-lock",
    note: "Context Lock and Meaning Staging are display-derived in study.js; this harness validates the persisted source, context, meaning, and relationship records that feed those display layers.",
    chapters,
    violations
  };
  outputBundle(bundle);
  if (violations.length) {
    console.error("FAIL: Context Lock QA");
    for (const violation of violations) {
      console.error(`${violation.chapter} ${violation.storageKey} ${violation.recordId}: ${violation.message}`);
      console.error(`  lower: ${violation.lowerLayerValue}`);
      console.error(`  higher: ${violation.conflictingValue}`);
    }
    console.error(`Bundle: ${OUTPUT_FILE}`);
    process.exitCode = 1;
    return;
  }
  console.log("PASS: Context Lock QA");
  console.log("No Context Lock violations detected.");
  for (const result of chapters) {
    console.log(`Matthew ${result.chapter}:`, JSON.stringify(result.counts));
  }
  console.log(`Bundle: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  const bundle = { pass: false, failureType: "runtime-error", failures: [error.stack || error.message], chapters: [] };
  outputBundle(bundle);
  console.error("FAIL: Context Lock QA");
  console.error(error.stack || error.message);
  console.error(`Bundle: ${OUTPUT_FILE}`);
  process.exitCode = 1;
});
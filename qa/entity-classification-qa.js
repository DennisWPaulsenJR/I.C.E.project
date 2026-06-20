/*
 * Full-storage entity classification QA for the I.C.E. Chrome extension.
 *
 * Run:
 *   npm run qa:entity-classification
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const EXTENSION_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(EXTENSION_ROOT, "qa-output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "latest-entity-classification-qa.json");
const TEST_CHAPTERS = [1, 2, 3, 4, 5];
const BASE_URL = "https://www.churchofjesuschrist.org/study/scriptures/nt/matt";

const EXPECTED_ACTORS_BY_CHAPTER = {
  1: ["Mary", "Joseph", "Abraham", "JESUS CHRIST"],
  2: ["Mary", "Joseph", "JESUS CHRIST"],
  3: ["John the Baptist", "JESUS"],
  4: ["John the Baptist", "JESUS"],
  5: ["JESUS"]
};
const OPTIONAL_ACTORS_IF_PRESENT = ["Gabriel", "Moses"];
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
const LOCATION_ALIASES = new Map([
  ["sea of Galilee", ["sea of Galilee", "sea"]]
]);
const BAD_LOCATION_ROLE_KEYS = new Set([
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
const BAD_NARRATOR_ROLE_TYPES = new Set(["participant", "sceneParticipant"]);

function loadPlaywright() {
  try {
    return { playwright: require("playwright"), error: null };
  } catch (error) {
    return { playwright: null, error };
  }
}

function normalize(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function keyName(value = "") {
  return normalize(value).toLowerCase();
}

function locationAliases(name) {
  return LOCATION_ALIASES.get(name) || [name];
}

function matchesEntity(value, expected) {
  const normalized = keyName(value);
  return locationAliases(expected).some((alias) => normalized === keyName(alias));
}

function recordId(record = {}) {
  return record.id || record.semanticEventId || record.eventId || record.nodeId || record.pathId || record.scopePath || record.canonicalKey || record.key || "unknown-record";
}

function recordScope(record = {}) {
  return record.verseRange || record.scopePath || record.sourceScope || record.activeScope || record.sourceTitle || record.eventScope || "unknown-scope";
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function addFailure(failures, chapter, storageKey, record, entityName, badRole, message) {
  failures.push({
    chapter: `Matthew ${chapter}`,
    storageKey,
    recordType: record?.layer || record?.eventType || record?.recordType || record?.semanticCategory || "storage_record",
    scope: recordScope(record || {}),
    entityName,
    badRole,
    recordId: recordId(record || {}),
    message
  });
}

function outputBundle(bundle) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2));
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
    if (!tab?.id) throw new Error("No active scripture tab available for entity QA capture.");

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
    if (!response?.ok || !response.capture?.text) {
      throw new Error(response?.error || "Content capture returned no text.");
    }
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
        textHash: "entity-classification-qa"
      }]
    });
    return { title: capture.title || "", url: capture.url || "", text: capture.text || "" };
  });
}

async function runBackgroundAnalysis(worker) {
  return await worker.evaluate(async () => {
    if (typeof runFullAnalysisPipeline === "function") {
      return await runFullAnalysisPipeline("qa:entity-classification");
    }
    return await chrome.runtime.sendMessage({
      type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
      reason: "qa:entity-classification"
    });
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
      Array.isArray(latest.ICE_CANONICAL_IDENTITIES) &&
      Array.isArray(latest.ICE_KNOWLEDGE_GRAPH)
    ) {
      return latest;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return latest;
}

function entityRegistry(data) {
  return Array.isArray(data.ICE_ENTITY_REGISTRY) ? data.ICE_ENTITY_REGISTRY : [];
}

function actorTimelines(data) {
  return Array.isArray(data.ICE_ACTOR_TIMELINES) ? data.ICE_ACTOR_TIMELINES : [];
}

function findEntity(data, names) {
  const expected = asArray(names).map(keyName);
  return entityRegistry(data).find((record) => {
    const labels = [record.canonicalName, record.displayName, ...(record.aliases || [])].map(keyName);
    return labels.some((label) => expected.includes(label));
  });
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

function validateActors(chapter, data, failures) {
  const sourceText = normalize(data.ICE_LATEST_CAPTURE?.text || "");
  const expected = [...(EXPECTED_ACTORS_BY_CHAPTER[chapter] || [])];
  for (const optional of OPTIONAL_ACTORS_IF_PRESENT) {
    if (new RegExp(`\\b${optional}\\b`, "i").test(sourceText)) expected.push(optional);
  }

  for (const actor of expected) {
    const lookupNames = actor === "JESUS CHRIST" || actor === "JESUS" ? ["JESUS CHRIST", "JESUS"] : [actor];
    const entity = findEntity(data, lookupNames);
    const timelineHit = actorTimelines(data).find((item) => lookupNames.some((name) => keyName(item.resolvedActorName || item.actorName) === keyName(name)));
    if (!entity && !timelineHit) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY/ICE_ACTOR_TIMELINES", {}, actor, "missing_actor", "Expected grounded actor was not preserved in full storage.");
      continue;
    }
    const entityType = keyName(entity?.entityType || timelineHit?.actorCategory || "");
    if (/location|narrator|source_author|traditional_author/.test(entityType)) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", entity, actor, entity?.entityType || "wrong_entity_type", "Grounded actor resolved to a non-actor classification.");
    }
  }

  const unknownRecords = actorTimelines(data).filter((item) => /unknown actor/i.test(item.actorName || item.resolvedActorName || ""));
  for (const item of unknownRecords) {
    const text = JSON.stringify(item);
    for (const actor of expected) {
      if (new RegExp(`\\b${actor.replace(/\s+/g, "\\s+")}\\b`, "i").test(text)) {
        addFailure(failures, chapter, "ICE_ACTOR_TIMELINES", item, actor, "unknown_actor_collapse", "Named actor appears inside an Unknown actor record.");
      }
    }
  }
}

function validateLocations(chapter, data, failures) {
  for (const location of LOCATION_NAMES) {
    const aliases = locationAliases(location);
    for (const { storageKey, record } of allRecords(data)) {
      if (storageKey === "ICE_LATEST_CAPTURE" || storageKey === "ICE_CAPTURE_HISTORY") continue;
      for (const [key, value] of Object.entries(record)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === "participants" && Array.isArray(value)) {
          for (const item of value) {
            if (aliases.some((alias) => matchesEntity(item, alias))) {
              addFailure(failures, chapter, storageKey, record, location, "participant", "Location was stored in participants.");
            }
          }
        }
        if (BAD_LOCATION_ROLE_KEYS.has(lowerKey) && aliases.some((alias) => matchesEntity(value, alias))) {
          addFailure(failures, chapter, storageKey, record, location, key, `Location was stored as ${key}.`);
        }
      }
    }

    const entity = findEntity(data, aliases);
    if (entity) {
      if (!/^location\b|^location\s*\//i.test(entity.entityType || "")) {
        addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", entity, location, entity.entityType || "entity", "Emitted location record does not have a Location classification.");
      }
      for (const roleType of entity.roleTypes || []) {
        if (BAD_LOCATION_ROLE_TYPES.has(roleType)) {
          addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", entity, location, roleType, "Location entity has an actor/participant role type.");
        }
      }
    }
  }
}

function validateAuthority(chapter, data, failures) {
  for (const name of ["GOD", "THE LORD"]) {
    const entity = findEntity(data, [name]);
    if (!entity) continue;
    const type = keyName(entity.entityType || "");
    const roles = new Set(entity.roleTypes || []);
    if (!/divine|authority|source_authority/.test(type) && !roles.has("sourceAuthority")) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", entity, name, entity.entityType || "entity", "Divine authority/source entity was downgraded to a generic classification.");
    }
    if ((roles.has("participant") || roles.has("sceneParticipant")) && !roles.has("sourceAuthority") && !roles.has("divineGlorifiedEntity")) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", entity, name, "ordinary_participant", "Divine authority/source entity has only ordinary participant grounding.");
    }
  }
}

function validateNarrators(chapter, data, failures) {
  const matthew = findEntity(data, ["Matthew"]);
  if (matthew) {
    const roles = new Set(matthew.roleTypes || []);
    if (!/author|source/.test(keyName(matthew.entityType || "")) || roles.has("participant") || roles.has("semanticActor") || roles.has("sceneParticipant")) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", matthew, "Matthew", matthew.entityType || "bad_source_role", "Matthew source label was not preserved as source/author metadata.");
    }
  }

  const narrator = findEntity(data, ["scripture narrator"]);
  if (narrator) {
    const roles = new Set(narrator.roleTypes || []);
    if (!/narrator/.test(keyName(narrator.entityType || ""))) {
      addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", narrator, "scripture narrator", narrator.entityType || "bad_narrator_role", "Scripture narrator did not remain narrator-classified.");
    }
    for (const roleType of roles) {
      if (BAD_NARRATOR_ROLE_TYPES.has(roleType)) {
        addFailure(failures, chapter, "ICE_ENTITY_REGISTRY", narrator, "scripture narrator", roleType, "Scripture narrator acquired an ordinary participant role.");
      }
    }
  }
}

function validateChapter(chapter, data) {
  const failures = [];
  validateActors(chapter, data, failures);
  validateLocations(chapter, data, failures);
  validateAuthority(chapter, data, failures);
  validateNarrators(chapter, data, failures);
  return failures;
}

async function runChapter(playwright, chapter) {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "ice-entity-classification-qa-"));
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
    const failures = validateChapter(chapter, storageData);
    if (!asArray(storageData.ICE_ENTITY_REGISTRY).length || !asArray(storageData.ICE_ACTOR_TIMELINES).length) {
      addFailure(failures, chapter, "chrome.storage.local", storageData.ICE_ANALYSIS_STATUS || {}, "analysis", "missing_full_storage", "Analysis did not produce expected full-storage entity records.");
    }
    return {
      chapter,
      url,
      title: capture.title,
      pass: failures.length === 0,
      failures,
      counts: {
        entityRegistry: asArray(storageData.ICE_ENTITY_REGISTRY).length,
        actorTimelines: asArray(storageData.ICE_ACTOR_TIMELINES).length,
        semanticEvents: asArray(storageData.ICE_SEMANTIC_EVENTS).length,
        knowledgeGraph: asArray(storageData.ICE_KNOWLEDGE_GRAPH).length,
        movementSemantics: asArray(storageData.ICE_MOVEMENT_SEMANTICS).length
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
    console.error("FAIL: Entity classification QA");
    console.error(bundle.failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  const chapters = [];
  for (const chapter of TEST_CHAPTERS) {
    chapters.push(await runChapter(playwright, chapter));
  }
  const failures = chapters.flatMap((item) => item.failures);
  const bundle = {
    testedAt: new Date().toISOString(),
    pass: failures.length === 0,
    command: "npm run qa:entity-classification",
    chapters,
    failures
  };
  outputBundle(bundle);
  if (failures.length) {
    console.error("FAIL: Entity classification QA");
    for (const failure of failures) {
      console.error(`${failure.chapter} ${failure.storageKey} ${failure.entityName} ${failure.badRole} ${failure.recordId}: ${failure.message}`);
    }
    console.error(`Bundle: ${OUTPUT_FILE}`);
    process.exitCode = 1;
    return;
  }
  console.log("PASS: Entity classification QA");
  for (const result of chapters) {
    console.log(`Matthew ${result.chapter}:`, JSON.stringify(result.counts));
  }
  console.log(`Bundle: ${OUTPUT_FILE}`);
}
main().catch((error) => {
  const bundle = { pass: false, failureType: "runtime-error", failures: [error.stack || error.message], chapters: [] };
  outputBundle(bundle);
  console.error("FAIL: Entity classification QA");
  console.error(error.stack || error.message);
  console.error(`Bundle: ${OUTPUT_FILE}`);
  process.exitCode = 1;
});
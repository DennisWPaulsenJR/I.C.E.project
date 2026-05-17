/*
 * Development-only QA harness for the I.C.E. Chrome extension.
 *
 * Setup:
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   npm run qa:matthew1
 *   or: node qa/matthew1-extension-qa.js
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const TEST_URL = "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/1?lang=eng";
const EXTENSION_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(EXTENSION_ROOT, "qa-output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "latest-qa-bundle.json");
const STORAGE_KEYS = [
  "ICE_LATEST_CAPTURE",
  "ICE_ACTIVE_ADAPTER",
  "ICE_DOM_SEMANTIC_HINTS",
  "ICE_MENTION_INDEX",
  "ICE_ENTITY_REGISTRY",
  "ICE_RELATIONSHIP_GRAPH",
  "ICE_CANONICAL_IDENTITIES",
  "ICE_SEMANTIC_EVENTS",
  "ICE_SEMANTIC_FLOW_CHAINS",
  "ICE_ANALYSIS_STATUS",
  "ICE_SCOPE_INTEGRITY",
  "ICE_SOURCE_DISCOVERY_INDEX",
  "ICE_REFERENCE_GRAPH",
  "ICE_PASSAGE_FUNCTIONS",
  "ICE_REVELATION_PATTERNS",
  "ICE_REFERENCE_ROLES"
];
const CLEAR_KEYS = [
  ...STORAGE_KEYS,
  "ICE_TIMELINE_ITEMS",
  "ICE_EVENT_ITEMS",
  "ICE_ORDERED_EVENTS",
  "ICE_ACTOR_TIMELINES",
  "ICE_PRINCIPLE_ITEMS",
  "ICE_PROPHECY_LINKS",
  "ICE_INTERACTION_GRAPH",
  "ICE_SCENE_MODELS",
  "ICE_ENTITY_ROLE_ITEMS",
  "ICE_SOURCE_ADAPTERS"
];

function loadPlaywright() {
  try {
    return {
      playwright: require("playwright"),
      error: null
    };
  } catch (error) {
    return {
      playwright: null,
      error
    };
  }
}

function count(value) {
  return Array.isArray(value) ? value.length : value && typeof value === "object" ? 1 : 0;
}

function sample(items, size = 3) {
  return Array.isArray(items) ? items.slice(0, size) : items || null;
}

function emptyCounts() {
  return {
    latestCapture: 0,
    domSemanticHints: 0,
    mentionIndex: 0,
    entityRegistry: 0,
    relationshipGraph: 0,
    canonicalIdentities: 0,
    semanticEvents: 0,
    semanticFlowChains: 0,
    sourceDiscovery: 0,
    referenceGraph: 0,
    passageFunctions: 0,
    revelationPatterns: 0,
    referenceRoles: 0
  };
}

function buildCounts(storageData) {
  return {
    latestCapture: count(storageData.ICE_LATEST_CAPTURE),
    domSemanticHints: count(storageData.ICE_DOM_SEMANTIC_HINTS),
    mentionIndex: count(storageData.ICE_MENTION_INDEX),
    entityRegistry: count(storageData.ICE_ENTITY_REGISTRY),
    relationshipGraph: count(storageData.ICE_RELATIONSHIP_GRAPH),
    canonicalIdentities: count(storageData.ICE_CANONICAL_IDENTITIES),
    semanticEvents: count(storageData.ICE_SEMANTIC_EVENTS),
    semanticFlowChains: count(storageData.ICE_SEMANTIC_FLOW_CHAINS),
    sourceDiscovery: count(storageData.ICE_SOURCE_DISCOVERY_INDEX),
    referenceGraph: count(storageData.ICE_REFERENCE_GRAPH),
    passageFunctions: count(storageData.ICE_PASSAGE_FUNCTIONS),
    revelationPatterns: count(storageData.ICE_REVELATION_PATTERNS),
    referenceRoles: count(storageData.ICE_REFERENCE_ROLES)
  };
}

function buildSamples(storageData) {
  return {
    activeAdapter: storageData.ICE_ACTIVE_ADAPTER || null,
    domSemanticHints: sample(storageData.ICE_DOM_SEMANTIC_HINTS, 5),
    mentionIndex: sample(storageData.ICE_MENTION_INDEX, 5),
    entityRegistry: sample(storageData.ICE_ENTITY_REGISTRY, 5),
    relationshipGraph: sample(storageData.ICE_RELATIONSHIP_GRAPH, 10),
    canonicalIdentities: sample(storageData.ICE_CANONICAL_IDENTITIES, 5),
    semanticEvents: sample(storageData.ICE_SEMANTIC_EVENTS, 5),
    semanticFlowChains: sample(storageData.ICE_SEMANTIC_FLOW_CHAINS, 3),
    scopeIntegrity: storageData.ICE_SCOPE_INTEGRITY || null,
    sourceDiscovery: sample(storageData.ICE_SOURCE_DISCOVERY_INDEX, 200),
    referenceGraph: sample(storageData.ICE_REFERENCE_GRAPH, 200),
    passageFunctions: sample(storageData.ICE_PASSAGE_FUNCTIONS, 20),
    revelationPatterns: sample(storageData.ICE_REVELATION_PATTERNS, 20),
    referenceRoles: sample(storageData.ICE_REFERENCE_ROLES, 20),
    analysisStatus: storageData.ICE_ANALYSIS_STATUS || null
  };
}

function writeQaBundle(bundle) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(bundle, null, 2));
  return OUTPUT_FILE;
}

function buildMissingPlaywrightBundle(error) {
  return {
    testedAt: new Date().toISOString(),
    url: TEST_URL,
    pageTitle: "",
    pass: false,
    failureType: "missing-playwright",
    failures: [
      "Playwright is not installed.",
      "Run npm install and npx playwright install chromium.",
      `Original error: ${error.message}`
    ],
    counts: emptyCounts(),
    samples: {},
    pageHtmlSample: "",
    mainContentHtmlSample: ""
  };
}

function reportMissingPlaywright(error) {
  const bundle = buildMissingPlaywrightBundle(error);
  writeQaBundle(bundle);
  console.error("FAIL: Playwright is not installed.");
  console.error("Setup commands:");
  console.error("  npm install");
  console.error("  npx playwright install chromium");
  console.error(`Original error: ${error.message}`);
  console.error(`Bundle: ${OUTPUT_FILE}`);
  process.exitCode = 1;
}

function hasCanonicalIdentity(data, name) {
  const expected = name.toLowerCase();
  return (data.ICE_CANONICAL_IDENTITIES || []).some((item) =>
    String(item.canonicalName || "").toLowerCase() === expected ||
    (item.aliases || []).some((alias) => String(alias).toLowerCase() === expected)
  );
}

function hasRelationship(data, fromEntity, toEntity) {
  const expectedFrom = fromEntity.toLowerCase();
  const expectedTo = toEntity.toLowerCase();
  return (data.ICE_RELATIONSHIP_GRAPH || []).some((edge) =>
    String(edge.fromEntity || "").toLowerCase() === expectedFrom &&
    String(edge.toEntity || "").toLowerCase() === expectedTo
  );
}
function hasScopePath(items, scopePath, predicate = () => true) {
  return (items || []).some((item) =>
    item?.scopePath === scopePath && predicate(item)
  );
}

function hasScopedEvent(data, eventType, scopePath, predicate = () => true) {
  return hasScopePath(data.ICE_SEMANTIC_EVENTS, scopePath, (item) =>
    item.eventType === eventType && predicate(item)
  );
}

function hasScopedHint(data, scopePath, predicate = () => true) {
  return hasScopePath(data.ICE_DOM_SEMANTIC_HINTS, scopePath, predicate);
}
function hasDiscoveredRef(data, refType, predicate = () => true) {
  return (data.ICE_SOURCE_DISCOVERY_INDEX || []).some((item) =>
    item.refType === refType && predicate(item)
  );
}

function hasScopedDiscoveryRef(data, scopePath, predicate = () => true) {
  return hasScopePath(data.ICE_SOURCE_DISCOVERY_INDEX, scopePath, predicate);
}

function hasReferenceEdge(data, relationshipType, predicate = () => true) {
  return (data.ICE_REFERENCE_GRAPH || []).some((item) =>
    item.relationshipType === relationshipType && predicate(item)
  );
}

function hasEvent(data, eventType, predicate = () => true) {
  return (data.ICE_SEMANTIC_EVENTS || []).some((item) =>
    item.eventType === eventType && predicate(item)
  );
}

function hasScopedReferenceEdge(data, scopePath, predicate = () => true) {
  return (data.ICE_REFERENCE_GRAPH || []).some((item) =>
    item.fromScopePath === scopePath && predicate(item)
  );
}

function hasPassageFunction(data, passageFunction, predicate = () => true) {
  return (data.ICE_PASSAGE_FUNCTIONS || []).some((item) =>
    item.passageFunction === passageFunction && predicate(item)
  );
}

function hasReferenceRole(data, referenceRole, predicate = () => true) {
  return (data.ICE_REFERENCE_ROLES || []).some((item) =>
    item.referenceRole === referenceRole && predicate(item)
  );
}

function isGroundedReferenceRole(item) {
  return Boolean(
    item?.sourceDiscoveryId &&
    item?.scopePath &&
    item?.referenceRole &&
    Array.isArray(item.evidence) &&
    item.evidence.length > 0 &&
    item.confidence &&
    item.sourceGrounding
  );
}
function hasRevelationPattern(data, predicate = () => true) {
  return (data.ICE_REVELATION_PATTERNS || []).some((item) => predicate(item));
}

function isGroundedPassageFunction(item) {
  return Boolean(
    item?.scopePath &&
    item?.verseRange &&
    item?.plainMeaning &&
    item?.confidence &&
    Array.isArray(item.evidence) &&
    item.evidence.length > 0 &&
    item.sourceGrounding
  );
}
function evaluateFailures(data) {
  const failures = [];
  const adapterName = data.ICE_ACTIVE_ADAPTER?.adapterName || "";

  if (adapterName !== "lds_scripture_adapter") {
    failures.push(`Expected active adapter lds_scripture_adapter, got ${adapterName || "missing"}.`);
  }
  if (count(data.ICE_DOM_SEMANTIC_HINTS) <= 0) failures.push("Expected DOM hints count > 0.");
  if (count(data.ICE_MENTION_INDEX) <= 0) failures.push("Expected mention index count > 0.");
  if (count(data.ICE_RELATIONSHIP_GRAPH) <= 0) failures.push("Expected relationship graph count > 0.");
  if (!hasCanonicalIdentity(data, "JESUS CHRIST")) failures.push("Expected canonical identity JESUS CHRIST.");

  const scopeIntegrity = data.ICE_SCOPE_INTEGRITY || {};
  if (count(scopeIntegrity) <= 0 || !scopeIntegrity.generatedAt) failures.push("Expected scope integrity report.");
  if (Number(scopeIntegrity.scopedItemsCount || 0) <= 0) failures.push("Expected scoped items count > 0.");
  if (Number(scopeIntegrity.missingScopeCount || 0) !== 0) failures.push(`Expected missing scope count 0, got ${scopeIntegrity.missingScopeCount}.`);
  if (!hasScopedHint(data, "scripture.nt.matthew.1.verse.20")) failures.push("Expected Matthew 1 verse 20 DOM hints scoped to scripture.nt.matthew.1.verse.20.");
  if (!hasScopedHint(data, "scripture.nt.matthew.1.verse.21")) failures.push("Expected Matthew 1 verse 21 DOM hints scoped to scripture.nt.matthew.1.verse.21.");
  if (!hasScopedEvent(data, "instruction_concerning_person", "scripture.nt.matthew.1.verse.20")) failures.push("Expected Joseph marriage instruction event scoped to Matthew 1 verse 20.");
  if (!hasScopedEvent(data, "name_revelation", "scripture.nt.matthew.1.verse.21", (item) => item.target === "JESUS" && /call his name JESUS/i.test(item.anchorText || item.sourceSnippet || ""))) failures.push("Expected name revelation event preserving JESUS surface form scoped to Matthew 1 verse 21.");
  if (!hasScopedEvent(data, "mission_reason_declaration", "scripture.nt.matthew.1.verse.21", (item) => /save.*people.*sins/i.test(item.anchorText || item.sourceSnippet || item.normalizedMeaning || ""))) failures.push("Expected mission reason declaration scoped to Matthew 1 verse 21.");
  if (!hasScopedEvent(data, "conception_revelation", "scripture.nt.matthew.1.verse.20", (item) => /conceived.*Holy Ghost/i.test(item.anchorText || item.sourceSnippet || item.normalizedMeaning || ""))) failures.push("Expected conception revelation scoped to Matthew 1 verse 20.");
  if (!hasEvent(data, "divine_message_cluster", (item) => Array.isArray(item.subEvents) && item.subEvents.some((subEvent) => subEvent.clusterType === "marriage_instruction") && item.subEvents.some((subEvent) => subEvent.clusterType === "conception_revelation") && item.subEvents.some((subEvent) => subEvent.clusterType === "revealed_name_instruction") && item.subEvents.some((subEvent) => subEvent.clusterType === "mission_declaration"))) failures.push("Expected divine message cluster with marriage instruction, conception revelation, name revelation, and mission declaration sub-events.");
  if (!hasScopedEvent(data, "covenant_family_union", "scripture.nt.matthew.1.verse.24", (item) => /took unto him his wife/i.test(item.anchorText || item.sourceSnippet || ""))) failures.push("Expected Joseph response event scoped to Matthew 1 verse 24.");
  if (count(data.ICE_SOURCE_DISCOVERY_INDEX) <= 0) failures.push("Expected source discovery refs count > 0.");
  if (!hasDiscoveredRef(data, "study_note")) failures.push("Expected study note refs in source discovery index.");
  if (!hasDiscoveredRef(data, "chapter_nav") && !hasDiscoveredRef(data, "table_of_contents") && !hasDiscoveredRef(data, "source_collection")) failures.push("Expected chapter/source navigation refs in source discovery index.");
  if (!hasScopedDiscoveryRef(data, "scripture.nt.matthew.1.note.20a", (item) => item.refType === "study_note")) failures.push("Expected verse-scoped note ref scripture.nt.matthew.1.note.20a.");
  if (count(data.ICE_REFERENCE_GRAPH) <= 0) failures.push("Expected reference graph edges count > 0.");
  if (!hasReferenceEdge(data, "has_study_note")) failures.push("Expected study note edges in reference graph.");
  if (!hasReferenceEdge(data, "has_chapter_navigation") && !hasReferenceEdge(data, "has_table_of_contents_link") && !hasReferenceEdge(data, "has_source_collection_link")) failures.push("Expected chapter/source navigation edges in reference graph.");
  if (!hasScopedReferenceEdge(data, "scripture.nt.matthew.1.note.20a", (item) => item.relationshipType === "has_study_note")) failures.push("Expected reference graph edge from scripture.nt.matthew.1.note.20a.");

  if (count(data.ICE_PASSAGE_FUNCTIONS) <= 0) failures.push("Expected passage function records count > 0.");
  if (count(data.ICE_REVELATION_PATTERNS) <= 0) failures.push("Expected revelation pattern records count > 0.");
  if (count(data.ICE_REFERENCE_ROLES) <= 0) failures.push("Expected reference role records count > 0.");
  for (const referenceRole of [
    "davidic_lineage_support",
    "abrahamic_covenant_support",
    "prophecy_fulfillment_support",
    "messianic_identity_support",
    "name_meaning_support"
  ]) {
    if (!hasReferenceRole(data, referenceRole, isGroundedReferenceRole)) {
      failures.push(`Expected grounded reference role ${referenceRole}.`);
    }
  }
  if (!hasRevelationPattern(data, (item) => item.speaker === "AngEL Of THE LORD" && item.authoritySource === "THE LORD" && item.recipient === "Joseph" && item.revelationType === "divine_message_revelation_pattern" && Array.isArray(item.subEvents) && item.subEvents.some((subEvent) => subEvent.clusterType === "marriage_instruction") && item.subEvents.some((subEvent) => subEvent.clusterType === "conception_revelation") && item.subEvents.some((subEvent) => subEvent.clusterType === "revealed_name_instruction") && item.subEvents.some((subEvent) => subEvent.clusterType === "mission_declaration") && Array.isArray(item.evidence) && item.evidence.some((phrase) => /call his name JESUS/i.test(phrase)) && item.confidence === "explicit")) failures.push("Expected grounded revelation pattern for AngEL Of THE LORD speech to Joseph with four ordered sub-events.");
  for (const passageFunction of [
    "genealogy_establishes_identity",
    "divine_message_instruction",
    "prophecy_fulfillment_identification",
    "obedient_response_and_naming"
  ]) {
    if (!hasPassageFunction(data, passageFunction, isGroundedPassageFunction)) {
      failures.push(`Expected grounded passage function ${passageFunction}.`);
    }
  }
  for (const [fromEntity, toEntity] of [
    ["THE LORD", "Angel of THE LORD"],
    ["Angel of THE LORD", "Joseph"],
    ["Joseph", "Mary"],
    ["Mary", "JESUS CHRIST"],
    ["Joseph", "JESUS"],
    ["Angel of THE LORD", "JESUS"]
  ]) {
    if (!hasRelationship(data, fromEntity, toEntity)) {
      failures.push(`Expected relationship ${fromEntity} -> ${toEntity}.`);
    }
  }

  return failures;
}

async function getServiceWorker(context) {
  let worker = context.serviceWorkers()[0];
  if (!worker) worker = await context.waitForEvent("serviceworker", { timeout: 15000 });
  return worker;
}

async function readStorage(worker) {
  return await worker.evaluate(async (keys) => chrome.storage.local.get(keys), STORAGE_KEYS);
}

async function runBackgroundAnalysis(worker) {
  return await worker.evaluate(async () => {
    if (typeof runFullAnalysisPipeline === "function") {
      return await runFullAnalysisPipeline("qa:matthew1");
    }
    return await chrome.runtime.sendMessage({
      type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
      reason: "qa:matthew1"
    });
  });
}

async function waitForAnalysis(worker, timeoutMs = 45000) {
  const start = Date.now();
  let latest = {};

  while (Date.now() - start < timeoutMs) {
    latest = await readStorage(worker);
    if (
      latest.ICE_LATEST_CAPTURE?.text &&
      latest.ICE_ACTIVE_ADAPTER?.adapterName &&
      count(latest.ICE_DOM_SEMANTIC_HINTS) > 0 &&
      count(latest.ICE_MENTION_INDEX) > 0 &&
      count(latest.ICE_RELATIONSHIP_GRAPH) > 0
    ) {
      return latest;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return latest;
}

async function main() {
  const { playwright, error: playwrightError } = loadPlaywright();
  if (!playwright) {
    reportMissingPlaywright(playwrightError);
    return;
  }

  const { chromium } = playwright;
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "ice-extension-qa-"));
  const failures = [];
  let context;
  let page;
  let storageData = {};

  try {
    context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_ROOT}`,
        `--load-extension=${EXTENSION_ROOT}`,
        "--no-first-run",
        "--no-default-browser-check"
      ]
    });

    const worker = await getServiceWorker(context);
    await worker.evaluate(async ({ clearKeys }) => {
      await chrome.storage.local.remove(clearKeys);
      await chrome.storage.sync.set({
        enabled: true,
        strictMode: true,
        highlightPronouns: true,
        autoCaptureOnPageLoad: true,
        showPageOverlay: false
      });
    }, { clearKeys: CLEAR_KEYS });

    page = await context.newPage();
    await page.goto(TEST_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(() => document.body && document.body.innerText.length > 1000, null, { timeout: 45000 });
    await page.waitForSelector("[data-eng-ref], .verse, main, article", { timeout: 45000 });
    await runBackgroundAnalysis(worker);

    storageData = await waitForAnalysis(worker);
    failures.push(...evaluateFailures(storageData));

    const pageTitle = await page.title();
    const pageHtmlSample = await page.evaluate(() => document.documentElement.outerHTML.slice(0, 5000));
    const mainContentHtmlSample = await page.evaluate(() => {
      const main = document.querySelector("main, article, [role='main'], .body-block, .scripture-block, #content") || document.body;
      return main.outerHTML.slice(0, 5000);
    });

    const bundle = {
      testedAt: new Date().toISOString(),
      url: TEST_URL,
      pageTitle,
      pass: failures.length === 0,
      failureType: failures.length > 0 ? "assertion-failure" : null,
      failures,
      counts: buildCounts(storageData),
      samples: buildSamples(storageData),
      pageHtmlSample,
      mainContentHtmlSample
    };

    writeQaBundle(bundle);

    console.log(bundle.pass ? "PASS: Matthew 1 extension QA" : "FAIL: Matthew 1 extension QA");
    console.log(`Bundle: ${OUTPUT_FILE}`);
    console.log("Counts:", bundle.counts);
    if (failures.length > 0) {
      console.log("Failures:");
      for (const failure of failures) console.log(`- ${failure}`);
      process.exitCode = 1;
    }
  } catch (error) {
    failures.push(error.message);
    writeQaBundle({
      testedAt: new Date().toISOString(),
      url: TEST_URL,
      pageTitle: page ? await page.title().catch(() => "") : "",
      pass: false,
      failureType: "runtime-error",
      failures,
      counts: buildCounts(storageData),
      samples: buildSamples(storageData),
      pageHtmlSample: "",
      mainContentHtmlSample: ""
    });
    console.error("FAIL: Matthew 1 extension QA");
    console.error(error.stack || error.message);
    console.error(`Bundle: ${OUTPUT_FILE}`);
    process.exitCode = 1;
  } finally {
    if (context) await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }
}

main();

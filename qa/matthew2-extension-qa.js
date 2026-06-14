/*
 * Development-only QA harness for the I.C.E. Chrome extension.
 *
 * Setup:
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   npm run qa:matthew2
 *   or: node qa/matthew1-extension-qa.js
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const TEST_URL = "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/2?lang=eng";
const EXTENSION_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(EXTENSION_ROOT, "qa-output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "latest-matthew2-qa-bundle.json");
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
  "ICE_REFERENCE_ROLES",
  "ICE_SEMANTIC_DISTINCTIONS",
  "ICE_ONTOLOGY_ROLES",
  "ICE_SEMANTIC_AMBIGUITIES",
  "ICE_ORIGIN_AUTHORITY_PATHS",
  "ICE_ENTITY_RELATION_ROLES",
  "ICE_SEMANTIC_CONTINUITY",
  "ICE_MOVEMENT_SEMANTICS",
  "ICE_SEMANTIC_CAUSALITY",
  "ICE_CHARACTER_INTERACTIONS",
  "ICE_SESSION_CONTINUITY_REVIEW",
  "ICE_KNOWLEDGE_GRAPH",
  "ICE_PRINCIPLE_NETWORKS",
  "ICE_FOCUS_LENS",
  "ICE_SCOPE_LENS",
  "ICE_DEPTH_LENS",
  "ICE_SEMANTIC_QUESTIONS",
  "ICE_TRUST_VERIFICATION"
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
    referenceRoles: 0,
    semanticDistinctions: 0,
    ontologyRoles: 0,
    semanticAmbiguities: 0,
    originAuthorityPaths: 0,
    entityRelationRoles: 0,
    semanticContinuity: 0,
    movementSemantics: 0,
    semanticCausality: 0,
    characterInteractions: 0,
    sessionContinuityReview: 0,
    knowledgeGraph: 0,
    principleNetworks: 0,
    focusLens: 0,
    scopeLens: 0,
    depthLens: 0,
    semanticQuestions: 0,
    trustVerification: 0
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
    referenceRoles: count(storageData.ICE_REFERENCE_ROLES),
    semanticDistinctions: count(storageData.ICE_SEMANTIC_DISTINCTIONS),
    ontologyRoles: count(storageData.ICE_ONTOLOGY_ROLES),
    semanticAmbiguities: count(storageData.ICE_SEMANTIC_AMBIGUITIES),
    originAuthorityPaths: count(storageData.ICE_ORIGIN_AUTHORITY_PATHS),
    entityRelationRoles: count(storageData.ICE_ENTITY_RELATION_ROLES),
    semanticContinuity: count(storageData.ICE_SEMANTIC_CONTINUITY),
    movementSemantics: count(storageData.ICE_MOVEMENT_SEMANTICS),
    semanticCausality: count(storageData.ICE_SEMANTIC_CAUSALITY),
    characterInteractions: count(storageData.ICE_CHARACTER_INTERACTIONS),
    sessionContinuityReview: count(storageData.ICE_SESSION_CONTINUITY_REVIEW),
    knowledgeGraph: count(storageData.ICE_KNOWLEDGE_GRAPH),
    principleNetworks: count(storageData.ICE_PRINCIPLE_NETWORKS),
    focusLens: count(storageData.ICE_FOCUS_LENS),
    scopeLens: count(storageData.ICE_SCOPE_LENS),
    depthLens: count(storageData.ICE_DEPTH_LENS),
    semanticQuestions: count(storageData.ICE_SEMANTIC_QUESTIONS),
    trustVerification: count(storageData.ICE_TRUST_VERIFICATION)
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
    semanticDistinctions: sample(storageData.ICE_SEMANTIC_DISTINCTIONS, 20),
    ontologyRoles: sample(storageData.ICE_ONTOLOGY_ROLES, 20),
    semanticAmbiguities: sample(storageData.ICE_SEMANTIC_AMBIGUITIES, 20),
    originAuthorityPaths: sample(storageData.ICE_ORIGIN_AUTHORITY_PATHS, 20),
    entityRelationRoles: sample(storageData.ICE_ENTITY_RELATION_ROLES, 20),
    semanticContinuity: sample(storageData.ICE_SEMANTIC_CONTINUITY, 20),
    movementSemantics: sample(storageData.ICE_MOVEMENT_SEMANTICS, 20),
    semanticCausality: sample(storageData.ICE_SEMANTIC_CAUSALITY, 20),
    characterInteractions: sample(storageData.ICE_CHARACTER_INTERACTIONS, 20),
    sessionContinuityReview: sample(storageData.ICE_SESSION_CONTINUITY_REVIEW, 20),
    knowledgeGraph: sample(storageData.ICE_KNOWLEDGE_GRAPH, 20),
    principleNetworks: sample(storageData.ICE_PRINCIPLE_NETWORKS, 20),
    focusLens: sample(storageData.ICE_FOCUS_LENS, 20),
    scopeLens: sample(storageData.ICE_SCOPE_LENS, 20),
    depthLens: sample(storageData.ICE_DEPTH_LENS, 20),
    semanticQuestions: sample(storageData.ICE_SEMANTIC_QUESTIONS, 20),
    trustVerification: sample(storageData.ICE_TRUST_VERIFICATION, 20),
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
function hasSemanticDistinction(data, semanticItem, distinctionType) {
  return (data.ICE_SEMANTIC_DISTINCTIONS || []).some((item) =>
    item.semanticItem === semanticItem && item.distinctionType === distinctionType && item.sourceGrounding && item.confidence
  );
}
function hasOntologyRole(data, semanticItem, role) {
  return (data.ICE_ONTOLOGY_ROLES || []).some((item) =>
    item.semanticItem === semanticItem &&
    (item.ontologyRoles || []).some((value) => String(value).toLowerCase() === role.toLowerCase()) &&
    item.sourcePhrase &&
    item.derivedMeaning &&
    item.confidence &&
    item.sourceGrounding
  );
}
function hasSemanticAmbiguity(data, ambiguityType, resolutionStatus) {
  return (data.ICE_SEMANTIC_AMBIGUITIES || []).some((item) =>
    item.ambiguityType === ambiguityType &&
    item.resolutionStatus === resolutionStatus &&
    Array.isArray(item.semanticItems) &&
    item.semanticItems.length > 0 &&
    item.sourceWording &&
    item.derivedInterpretation &&
    Array.isArray(item.evidence) &&
    item.evidence.length > 0 &&
    item.confidence &&
    item.sourceGrounding
  );
}
function hasEntityRelationRole(data, sourceEntity, targetEntity, semanticRole) {
  return (data.ICE_ENTITY_RELATION_ROLES || []).some((item) =>
    item.sourceEntity === sourceEntity &&
    item.targetEntity === targetEntity &&
    item.semanticRole === semanticRole &&
    item.ontologyClassPath &&
    item.sourcePhrase &&
    item.derivedMeaning &&
    item.confidence &&
    item.sourceGrounding
  );
}function hasRevelationPattern(data, predicate = () => true) {
  return (data.ICE_REVELATION_PATTERNS || []).some((item) => predicate(item));
}

function hasOriginAuthorityPath(data, predicate = () => true) {
  return (data.ICE_ORIGIN_AUTHORITY_PATHS || []).some((item) => predicate(item));
}
function hasMovementSemantic(data, movementType, destinationLocation) {
  return (data.ICE_MOVEMENT_SEMANTICS || []).some((item) =>
    item.movementType === movementType &&
    String(item.destinationLocation || "").includes(destinationLocation) &&
    item.sourcePhrase &&
    item.derivedMeaning &&
    item.movementPurpose &&
    Array.isArray(item.evidence) &&
    item.evidence.length > 0 &&
    item.confidence &&
    item.sourceGrounding
  );
}
function hasSemanticCausality(data, sequenceType, predicate = () => true) {
  return (data.ICE_SEMANTIC_CAUSALITY || []).some((item) =>
    item.sequenceType === sequenceType &&
    item.initiatingCause &&
    item.authoritySource &&
    item.humanResponse &&
    item.consequenceResult &&
    item.sourcePhrase &&
    item.derivedMeaning &&
    Array.isArray(item.sequenceSteps) &&
    item.sequenceSteps.length > 0 &&
    Array.isArray(item.evidence) &&
    item.evidence.length > 0 &&
    item.confidence &&
    item.sourceGrounding &&
    predicate(item)
  );
}function isGroundedPassageFunction(item) {
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

  if (adapterName !== "lds_scripture_adapter") failures.push(`Expected active adapter lds_scripture_adapter, got ${adapterName || "missing"}.`);
  if (count(data.ICE_DOM_SEMANTIC_HINTS) <= 0) failures.push("Expected DOM hints count > 0.");
  if (count(data.ICE_MENTION_INDEX) <= 0) failures.push("Expected mention index count > 0.");
  if (count(data.ICE_RELATIONSHIP_GRAPH) <= 0) failures.push("Expected relationship graph count > 0.");
  if (count(data.ICE_PASSAGE_FUNCTIONS) <= 0) failures.push("Expected Matthew 2 passage function records count > 0.");
  if (count(data.ICE_REVELATION_PATTERNS) <= 0) failures.push("Expected Matthew 2 revelation pattern records count > 0.");
  if (count(data.ICE_ONTOLOGY_ROLES) <= 0) failures.push("Expected Matthew 2 semantic ontology role records count > 0.");
  if (count(data.ICE_ORIGIN_AUTHORITY_PATHS) <= 0) failures.push("Expected Matthew 2 origin / authority path records count > 0.");
  if (count(data.ICE_ENTITY_RELATION_ROLES) <= 0) failures.push("Expected Matthew 2 semantic relationship role records count > 0.");
  if (count(data.ICE_SEMANTIC_CONTINUITY) <= 0) failures.push("Expected Matthew 2 cross-chapter semantic continuity records count > 0.");
  if (count(data.ICE_MOVEMENT_SEMANTICS) <= 0) failures.push("Expected Matthew 2 movement / location semantic records count > 0.");
  if (count(data.ICE_SEMANTIC_CAUSALITY) <= 0) failures.push("Expected Matthew 2 semantic sequence / causality records count > 0.");
  if (count(data.ICE_CHARACTER_INTERACTIONS) <= 0) failures.push("Expected Matthew 2 character interaction records count > 0.");

  const scopeIntegrity = data.ICE_SCOPE_INTEGRITY || {};
  if (Number(scopeIntegrity.missingScopeCount || 0) !== 0) failures.push(`Expected missing scope count 0, got ${scopeIntegrity.missingScopeCount}.`);
  if (!hasCanonicalIdentity(data, "JESUS CHRIST")) failures.push("Expected canonical identity JESUS CHRIST.");

  for (const passageFunction of ["wise_men_arrival", "prophecy_fulfillment_identification", "hostile_authority_response", "divine_warning_revelation", "protective_obedient_response", "repeated_guidance_preservation_cycle", "movement_location_prophecy_continuity", "hostile_deception_vs_protective_obedience_contrast", "egypt_escape_preservation", "messianic_location_fulfillment"]) {
    if (!hasPassageFunction(data, passageFunction, isGroundedPassageFunction)) failures.push(`Expected grounded Matthew 2 passage function ${passageFunction}.`);
  }

  for (const [semanticItem, role] of [["Herod", "hostile authority"], ["Wise men", "worship response"], ["Chief priests and scribes", "scriptural knowledge witness"], ["JESUS", "CHILD semantic referent"], ["Bethlehem", "messianic location"], ["Egypt", "protective refuge location"], ["Jerusalem", "authority conflict setting"], ["Nazareth", "protective redirection location"], ["AngEL Of THE LORD", "protective instruction carrier"], ["Joseph", "protective steward"]]) {
    if (!hasOntologyRole(data, semanticItem, role)) failures.push(`Expected Matthew 2 ontology role ${semanticItem} / ${role}.`);
  }

  for (const [sourceEntity, targetEntity, semanticRole] of [["THE LORD", "AngEL Of THE LORD", "source_authority_to_protective_messenger"], ["AngEL Of THE LORD", "Joseph", "protective_revelation_messenger_to_recipient"], ["Joseph", "JESUS", "protective_obedient_response_to_child"], ["Herod", "JESUS", "hostile_authority_to_child_target"], ["Wise men", "JESUS", "worship_witness_to_child"]]) {
    if (!hasEntityRelationRole(data, sourceEntity, targetEntity, semanticRole)) failures.push(`Expected Matthew 2 semantic relationship role ${sourceEntity} -> ${targetEntity} / ${semanticRole}.`);
  }

  if (!hasOriginAuthorityPath(data, (item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph" && /protective instruction/i.test(item.response || "") && /CHILD \/ JESUS/i.test(item.result || "") && Array.isArray(item.processPath) && item.processPath.some((step) => /Divine preservation|CHILD \/ JESUS is preserved/i.test(step)) && item.confidence === "explicit")) failures.push("Expected grounded Matthew 2 protective origin / authority path THE LORD -> AngEL Of THE LORD -> Joseph -> CHILD / JESUS preservation with process path.");
  if (!hasRevelationPattern(data, (item) => item.speaker === "AngEL Of THE LORD" && item.authoritySource === "THE LORD" && item.recipient === "Joseph" && Array.isArray(item.subEvents) && item.subEvents.some((subEvent) => subEvent.clusterType === "protection_instruction"))) failures.push("Expected Matthew 2 AngEL Of THE LORD protective instruction revelation pattern.");


  if (!hasSemanticAmbiguity(data, "deceptive_worship_language_vs_hostile_intent", "resolved")) failures.push("Expected Matthew 2 semantic contrast for Herod deceptive worship language vs hostile intent.");
  if (!hasSemanticAmbiguity(data, "protective_obedience_vs_hostile_deception", "resolved")) failures.push("Expected Matthew 2 semantic contrast for protective obedience vs hostile deception.");

  for (const [movementType, destinationLocation] of [["prophecy_location_identification", "Bethlehem"], ["witness_travel_toward_child", "Jerusalem"], ["protective_escape_preservation", "Egypt"], ["return_after_hostile_threat_removed", "land of Israel"], ["protective_redirection_settlement_fulfillment", "Nazareth"]]) {
    if (!hasMovementSemantic(data, movementType, destinationLocation)) failures.push(`Expected Matthew 2 movement / location semantic ${movementType} -> ${destinationLocation}.`);
  }

  if (!hasSemanticCausality(data, "hostile_threat_warning_preservation_sequence", (item) => /Herod seeks the CHILD/i.test(item.initiatingCause) && /THE LORD/i.test(item.authoritySource) && /Joseph obeys/i.test(item.humanResponse) && /preserved/i.test(item.consequenceResult))) failures.push("Expected Matthew 2 semantic causality sequence for Herod threat, Divine warning, Joseph obedience, and CHILD preservation.");
  if (!hasSemanticCausality(data, "threat_removed_guided_return_fulfillment_sequence", (item) => /threat/i.test(item.initiatingCause) && /warning/i.test(item.messengerTransfer) && /Nazareth/i.test(item.preservationFulfillmentOutcome))) failures.push("Expected Matthew 2 semantic causality sequence for threat removal, guided return, and Nazareth fulfillment linkage.");

  for (const [continuedEntity, continuityType] of [["Joseph", "continued_authority_revelation_relationship"], ["JESUS / CHILD", "continued_child_identity_and_mission_preservation"], ["scripture narrator / quoted prophet", "continued_prophecy_fulfillment_chain"], ["Herod", "adversarial_escalation_against_mission_preservation"]]) {
    const found = (data.ICE_SEMANTIC_CONTINUITY || []).some((item) => item.continuedEntity === continuedEntity && item.continuityType === continuityType && item.chapterTransition === "Matthew 1 -> Matthew 2" && item.confidence && Array.isArray(item.evidence) && item.evidence.length > 0 && item.sourceGrounding);
    if (!found) failures.push(`Expected Matthew 2 semantic continuity ${continuedEntity} / ${continuityType}.`);
  }
  const leakedLabel = [...(data.ICE_ORDERED_EVENTS || []), ...(data.ICE_SEMANTIC_EVENTS || [])].some((item) => /Joseph Obeys and JESUS Is Named/i.test(JSON.stringify(item)));
  if (leakedLabel) failures.push("Matthew 1 naming label leaked into Matthew 2 stored semantic data.");

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

async function captureActiveSourcePage(worker) {
  return await worker.evaluate(async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs.find((candidate) => /churchofjesuschrist\.org\/study\/scriptures\//i.test(candidate.url || "")) || tabs[0];
    if (!tab?.id) throw new Error("No active scripture tab available for QA capture.");

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
      throw new Error(`Expected forced QA capture to use lds_scripture_adapter, got ${capture.sourceAdapter?.adapterName || "missing"}.`);
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
        textHash: "qa-forced-capture"
      }]
    });

    return {
      title: capture.title || "",
      url: capture.url || "",
      wordCount: capture.wordCount || 0,
      adapterName: capture.sourceAdapter?.adapterName || "",
      domHintCount: Array.isArray(capture.domSemanticHints) ? capture.domSemanticHints.length : 0
    };
  });
}
async function runBackgroundAnalysis(worker) {
  return await worker.evaluate(async () => {
    if (typeof runFullAnalysisPipeline === "function") {
      return await runFullAnalysisPipeline("qa:matthew2");
    }
    return await chrome.runtime.sendMessage({
      type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
      reason: "qa:matthew2"
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
    await page.waitForSelector("[data-eng-ref], .verse", { timeout: 45000 });
    await page.waitForFunction(() => document.querySelectorAll("[data-eng-ref], .verse").length >= 5, null, { timeout: 45000 });
    await captureActiveSourcePage(worker);
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

    console.log(bundle.pass ? "PASS: Matthew 2 extension QA" : "FAIL: Matthew 2 extension QA");
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
    console.error("FAIL: Matthew 2 extension QA");
    console.error(error.stack || error.message);
    console.error(`Bundle: ${OUTPUT_FILE}`);
    process.exitCode = 1;
  } finally {
    if (context) await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }
}

main();

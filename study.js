document.addEventListener("DOMContentLoaded", async () => {
  const STORAGE_KEYS = {
    latestCapture: "ICE_LATEST_CAPTURE",
    captureHistory: "ICE_CAPTURE_HISTORY",
    timelineItems: "ICE_TIMELINE_ITEMS",
    eventItems: "ICE_EVENT_ITEMS",
    orderedEvents: "ICE_ORDERED_EVENTS",
    actorTimelines: "ICE_ACTOR_TIMELINES",
    interactionGraph: "ICE_INTERACTION_GRAPH",
    sceneModels: "ICE_SCENE_MODELS",
    semanticEvents: "ICE_SEMANTIC_EVENTS",
    semanticFlowChains: "ICE_SEMANTIC_FLOW_CHAINS",
    entityRegistry: "ICE_ENTITY_REGISTRY",
    relationshipGraph: "ICE_RELATIONSHIP_GRAPH",
    canonicalIdentities: "ICE_CANONICAL_IDENTITIES",
    mentionIndex: "ICE_MENTION_INDEX",
    domSemanticHints: "ICE_DOM_SEMANTIC_HINTS",
    sourceAdapters: "ICE_SOURCE_ADAPTERS",
    activeAdapter: "ICE_ACTIVE_ADAPTER",
    scopeIntegrity: "ICE_SCOPE_INTEGRITY",
    sourceDiscoveryIndex: "ICE_SOURCE_DISCOVERY_INDEX",
    referenceGraph: "ICE_REFERENCE_GRAPH",
    passageFunctions: "ICE_PASSAGE_FUNCTIONS",
    revelationPatterns: "ICE_REVELATION_PATTERNS",
    referenceRoles: "ICE_REFERENCE_ROLES",
    semanticDistinctions: "ICE_SEMANTIC_DISTINCTIONS",
    ontologyRoles: "ICE_ONTOLOGY_ROLES",
    semanticAmbiguities: "ICE_SEMANTIC_AMBIGUITIES",
    originAuthorityPaths: "ICE_ORIGIN_AUTHORITY_PATHS",
    entityRelationRoles: "ICE_ENTITY_RELATION_ROLES",
    semanticContinuity: "ICE_SEMANTIC_CONTINUITY",
    movementSemantics: "ICE_MOVEMENT_SEMANTICS",
    semanticCausality: "ICE_SEMANTIC_CAUSALITY",
    teachingSemantics: "ICE_TEACHING_SEMANTICS",
    principleRelationships: "ICE_PRINCIPLE_RELATIONSHIPS",
    characterInteractions: "ICE_CHARACTER_INTERACTIONS",
    sessionContinuityReview: "ICE_SESSION_CONTINUITY_REVIEW",
    knowledgeGraph: "ICE_KNOWLEDGE_GRAPH",
    principleNetworks: "ICE_PRINCIPLE_NETWORKS",
    focusLens: "ICE_FOCUS_LENS",
    scopeLens: "ICE_SCOPE_LENS",
    depthLens: "ICE_DEPTH_LENS",
    semanticQuestions: "ICE_SEMANTIC_QUESTIONS",
    trustVerification: "ICE_TRUST_VERIFICATION",
    entityRoleItems: "ICE_ENTITY_ROLE_ITEMS",
    principleItems: "ICE_PRINCIPLE_ITEMS",
    prophecyLinks: "ICE_PROPHECY_LINKS",
    analysisStatus: "ICE_ANALYSIS_STATUS",
    analysisHistory: "ICE_ANALYSIS_HISTORY",
    canonicalAnalyzedPages: "ICE_CANONICAL_ANALYZED_PAGES",
    canonicalAnalysisTarget: "ICE_CANONICAL_ANALYSIS_TARGET",
    crossReferenceSet: "ICE_CROSS_REFERENCE_SET",
    activeSourcePage: "ICE_ACTIVE_SOURCE_PAGE",
    selectedRange: "ICE_SELECTED_RANGE",
    analysisQueue: "ICE_ANALYSIS_QUEUE",
    analysisQueueStatus: "ICE_ANALYSIS_QUEUE_STATUS",
    analysisQueueHistory: "ICE_ANALYSIS_QUEUE_HISTORY",
    analysisQueueManifest: "ICE_ANALYSIS_QUEUE_MANIFEST",
    analysisQueuePageSummaries: "ICE_ANALYSIS_QUEUE_PAGE_SUMMARIES",
    journeyPageSnapshots: "ICE_JOURNEY_PAGE_SNAPSHOTS",
    panelUiState: "ICE_PANEL_UI_STATE",
    gptReviewReport: "ICE_GPT_REVIEW_REPORT"
  };
  const DISPLAY_LIMIT = 5;

  let studyData = {};
  const STARTUP_STORAGE_ALIASES = [
    "analysisStatus",
    "canonicalAnalysisTarget",
    "canonicalAnalyzedPages",
    "crossReferenceSet",
    "activeSourcePage",
    "selectedRange",
    "analysisQueue",
    "analysisQueueStatus",
    "analysisQueueHistory",
    "analysisQueueManifest",
    "analysisQueuePageSummaries",
    "activeAdapter",
    "panelUiState"
  ];
  const FULL_STORAGE_ALIASES = Object.keys(STORAGE_KEYS);
  const STARTUP_RENDERER_LABELS = new Set(["Study Scope", "Queue Summary"]);
  const DEFERRED_SECTION_SUMMARIES = {
    "Guided Study": "Grounded next study paths from current semantic records.",
    "Study Progression": "Current focus, explored topics, related topics, and suggested next study direction.",
    "Focus Lens": "Current semantic focus inferred from the analyzed source.",
    "Scope Lens": "The range where the current focus is being considered.",
    "Depth Lens": "How much semantic expansion is active in the current panel.",
    "View Lens": "How current scoped study information is being presented.",
    "Journey Nodes": "Grounded study destinations derived from current scoped semantic records.",
    "Journey Paths": "Grounded transitions between existing current-scope Journey Nodes.",
    "Journey Hubs": "Major grounded convergence points across current-scope Journey Nodes and Journey Paths.",
    "Semantic Coverage": "Layer-by-layer applicability and record status for the current chapter.",
    "Semantic Resolution Explanation": "Why generated semantic labels are grounded and how they were resolved.",
    "Session Continuity Review": "Continuity across analyzed pages in the current session.",
    "Scripture Knowledge Graph": "Graph nodes and relationships derived from current semantic layers.",
    "Trust & Verification": "Source basis, evidence, reasoning path, and unresolved areas.",
    "Semantic Questions": "Answered and suggested study questions grounded in existing records.",
    "Library Awareness": "Current-source principle families and future library boundaries.",
    "Teaching / Discourse Structure": "Teaching blocks, audience, commands, promises, and warnings.",
    "Principle Relationships": "Grounded principle links and supporting teaching context.",
    "Principle Networks": "Semantic neighborhoods around current principles.",
    "Passage Functions": "Why a passage or section exists in the current source.",
    "Revelation Patterns": "Instruction, message, recipient, and authority structure.",
    "Reference Roles": "Resolved roles for source references and linked labels.",
    "Semantic Distinctions": "Distinguished source/derived/canonical meanings.",
    "Ontology Roles": "Semantic role and hierarchy assignments.",
    "Semantic Ambiguities": "Contrasts and unresolved distinctions that remain grounded.",
    "Origin Authority Paths": "Authority/source paths behind semantic actions.",
    "Entity Relation Roles": "Relationship-role assignments between entities.",
    "Semantic Continuity": "Cross-chapter or cross-record continuity signals.",
    "Movement Semantics": "Location movement, purpose, and fulfillment links.",
    "Semantic Causality": "Cause, instruction, response, and result sequences.",
    "Narrative Timeline": "Ordered narrative moments from the current source.",
    "Entity Scope Focus": "Focused entity view across scoped records.",
    "Verse Scope Focus": "Focused verse view across scoped records.",
    "Canonical Identities": "Canonical entity names, aliases, and identity links.",
    "Relationship Graph": "Relationship edges derived from current records.",
    "Semantic Events": "Structured semantic events from the current source.",
    "Semantic Flow Chains": "Ordered semantic process chains.",
    "Reference Graph": "Source references and their linked graph edges.",
    "Source Discovery": "Detected source links and source candidates.",
    "DOM Semantic Hints": "DOM-derived semantic hints from the captured page.",
    "Focused Graph": "Focused relationship graph for the active semantic focus.",
    "Current Page": "Current captured source summary and metadata.",
    "Source Context": "Source context used by Study Panel rendering.",
    "Source Adapter": "Adapter detection and source compatibility details.",
    "Scope Integrity": "Scope validation and missing-scope diagnostics.",
    "Entity Roles": "Classified entities and role summaries.",
    "Entity Registry": "Detected entity registry records.",
    "Mention Index": "Mention records and scoped references.",
    "Actors": "Detected actors from the current source.",
    "Scenes": "Detected scene records from the current source.",
    "Ordered Events": "Chronologically ordered event records.",
    "Interactions": "Interaction graph records from the current source.",
    "Principles": "Extracted principle records.",
    "Prophecy Links": "Prophecy and fulfillment link records.",
    "Timeline": "Timeline records from the current source."
  };
  const DEFERRED_SECTION_COUNT_ALIASES = {
    "Focus Lens": "focusLens",
    "Scope Lens": "scopeLens",
    "Depth Lens": "depthLens",
    "Session Continuity Review": "sessionContinuityReview",
    "Trust & Verification": "trustVerification",
    "Semantic Questions": "semanticQuestions",
    "Library Awareness": "libraryAwareness",
    "Teaching / Discourse Structure": "teachingSemantics",
    "Principle Relationships": "principleRelationships",
    "Principle Networks": "principleNetworks",
    "Passage Functions": "passageFunctions",
    "Revelation Patterns": "revelationPatterns",
    "Reference Roles": "referenceRoles",
    "Semantic Distinctions": "semanticDistinctions",
    "Ontology Roles": "ontologyRoles",
    "Semantic Ambiguities": "semanticAmbiguities",
    "Origin Authority Paths": "originAuthorityPaths",
    "Entity Relation Roles": "entityRelationRoles",
    "Semantic Continuity": "semanticContinuity",
    "Movement Semantics": "movementSemantics",
    "Semantic Causality": "semanticCausality",
    "Narrative Timeline": "narrativeTimeline",
    "Canonical Identities": "canonicalIdentities",
    "Relationship Graph": "relationshipGraph",
    "Semantic Events": "semanticEvents",
    "Semantic Flow Chains": "semanticFlowChains",
    "Reference Graph": "referenceGraph",
    "Source Discovery": "sourceDiscoveryIndex",
    "DOM Semantic Hints": "domSemanticHints",
    "Entity Roles": "entityRoleItems",
    "Entity Registry": "entityRegistry",
    "Mention Index": "mentionIndex",
    "Actors": "actorTimelines",
    "Scenes": "sceneModels",
    "Ordered Events": "orderedEvents",
    "Interactions": "interactionGraph",
    "Principles": "principleItems",
    "Prophecy Links": "prophecyLinks",
    "Timeline": "timelineItems"
  };
  const loadedDeferredSections = new Set();
  let fullStudyDataLoaded = false;
  let refreshInFlight = null;
  let refreshQueued = false;
  let refreshTimer = null;
  let searchRenderTimer = null;
  let pendingSemanticFocus = null;
  let currentSemanticFocus = null;
  let semanticFocusInputUpdate = false;
  let journeyDiagnosticSnapshotKeys = null;
  console.log("[FOCUS DEBUG] study.js loaded", {
    rendererVersion: "v2",
    focusedMountCount: document.querySelectorAll("#focused-relationship-view").length
  });

  function toDisplayText(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) return value.map(toDisplayText).filter(Boolean).join(", ");
    if (value && typeof value === "object") {
      for (const key of ["label", "name", "title", "displayName", "canonicalName", "id"]) {
        if (value[key] != null) return toDisplayText(value[key]);
      }
      try {
        return JSON.stringify(value);
      } catch (_error) {
        return String(value);
      }
    }
    return String(value);
  }

  function normalizeText(text) {
    return toDisplayText(text).replace(/\s+/g, " ").trim();
  }

  function trimText(text, maxLength = 160) {
    const normalized = normalizeText(text);
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 3).trim()}...`;
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function entityDisplayNameFromRecord(item = {}) {
    const displayName = normalizeText(item.displayName || item.canonicalName || item.entityName || item.name || "");
    if (/^angel of the lord$/i.test(displayName)) return "AngEL Of THE LORD";
    if (/^holy (ghost|spirit)$/i.test(displayName)) return "HOLY SPIRIT";
    return displayName;
  }

  function canonicalDisplayCandidates() {
    const candidates = [];
    const addCandidate = (source, display) => {
      const sourceText = normalizeText(source);
      const displayText = normalizeText(display);
      if (!sourceText || !displayText || sourceText.length < 4) return;
      if (!/angel/i.test(`${sourceText} ${displayText}`)) return;
      candidates.push({ sourceText, displayText: entityDisplayNameFromRecord({ displayName: displayText }) });
    };

    for (const item of [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]) {
      const display = entityDisplayNameFromRecord(item);
      if (!/angel/i.test(display)) continue;
      [
        item.displayName,
        item.canonicalName,
        item.entityName,
        item.name,
        ...asArray(item.aliases),
        ...asArray(item.surfaceForms)
      ].forEach((value) => addCandidate(value, display));
    }

    addCandidate("angel of the lord", "AngEL Of THE LORD");
    addCandidate("the angel of the lord", "AngEL Of THE LORD");

    return candidates.sort((left, right) => right.sourceText.length - left.sourceText.length);
  }

  function applyCanonicalDisplayLabels(text) {
    let value = normalizeText(text);
    for (const { sourceText, displayText } of canonicalDisplayCandidates()) {
      if (sourceText.toLowerCase() === displayText.toLowerCase()) continue;
      value = value.replace(new RegExp(`\\b${escapeRegExp(sourceText)}\\b`, "gi"), displayText);
    }
    return value;
  }

  function renderDivineDisplayText(text) {
    return applyCanonicalDisplayLabels(text)
      .replace(/\bHoly Spirit\b/gi, "HOLY SPIRIT")
      .replace(/\bThe Lord\b/gi, "THE LORD")
      .replace(/\bJesus Christ\b/gi, "JESUS CHRIST")
      .replace(/\bJesus\b/gi, "JESUS")
      .replace(/\bChrist\b/gi, "CHRIST")
      .replace(/\bGod\b/gi, "GOD")
      .replace(/\bFather\b/g, "FATHER")
      .replace(/\b(?:the\s+)?angel Of THE LORD\b/gi, "AngEL Of THE LORD");
  }

  function hasDivineDisplayContext(values) {
    const text = asArray(values)
      .flatMap((value) => Array.isArray(value) ? value : [value])
      .join(" ")
      .toLowerCase();
    return /\b(the lord|angel of the lord|jesus|jesus christ|christ|holy ghost|holy spirit|god|father)\b/.test(text) ||
      /\b(divine|deity|name_revelation|mission_reason_declaration|revealed_name|mission_declaration)\b/.test(text);
  }

  function renderIceDivineDisplayText(text, divineContext = false) {
    let value = renderDivineDisplayText(text);
    if (!divineContext) return value;

    return value
      .replace(/\bHe shall save His people\b/g, "HE shall SAVE HIS People")
      .replace(/\bhe shall save his people\b/g, "HE shall SAVE HIS People")
      .replace(/\bHe shall save his people\b/g, "HE shall SAVE HIS People")
      .replace(/\bhe shall save His people\b/g, "HE shall SAVE HIS People")
      .replace(/\bhe shall SAVE HIS People\b/g, "HE shall SAVE HIS People")
      .replace(/\bHe shall SAVE HIS People\b/g, "HE shall SAVE HIS People")
      .replace(/\bsave His people\b/g, "SAVE HIS People")
      .replace(/\bsave his people\b/g, "SAVE HIS People")
      .replace(/\bHIS People\b/g, "HIS People")
      .replace(/\bHis people\b/g, "HIS People")
      .replace(/\bhis people\b/g, "HIS People")
      .replace(/\bcall His name JESUS\b/g, "call HIS NAME JESUS")
      .replace(/\bcall his name JESUS\b/g, "call HIS NAME JESUS")
      .replace(/\bcalled His name JESUS\b/g, "called HIS NAME JESUS")
      .replace(/\bcalled his name JESUS\b/g, "called HIS NAME JESUS")
      .replace(/\bHis name JESUS\b/g, "HIS NAME JESUS")
      .replace(/\bhis name JESUS\b/g, "HIS NAME JESUS")
      .replace(/\bHIS name JESUS\b/g, "HIS NAME JESUS")
      .replace(/\brevealed name: JESUS\b/gi, "revealed NAME: JESUS")
      .replace(/\bNarrative name: JESUS\b/g, "Narrative NAME: JESUS")
      .replace(/\bnarrative name: JESUS\b/g, "narrative NAME: JESUS");
  }

  function hasDerivedDivineChildContext(text, divineContext = false) {
    if (!divineContext) return false;
    const normalized = normalizeText(text).toLowerCase();
    return /\bchild\b/.test(normalized) &&
      /\b(jesus|holy spirit|holy ghost|conceived|conception|mission|save|name|named|call|called|revealed|brought forth|birth|divine|the lord|angel of the lord)\b/.test(normalized);
  }

  function renderDerivedDivineChildDisplayText(text, divineContext = false) {
    const value = normalizeText(text);
    if (!hasDerivedDivineChildContext(value, divineContext)) return value;
    return value.replace(/\bchild\b/gi, "CHILD");
  }
  function renderHolyActionDisplayText(text, divineContext = false) {
    let value = normalizeText(text);
    if (!divineContext) return value;

    return value
      .replace(/\bconceived of HOLY SPIRIT\b/gi, "Conceived Of THE HOLY SPIRIT")
      .replace(/\bconceived in Mary is of the HOLY SPIRIT\b/gi, "Conceived Of THE HOLY SPIRIT in Mary")
      .replace(/\bdivine conception origin\b/gi, "HOLY Conception Origin")
      .replace(/\bconception revelation\b/gi, "HOLY CONCEPTION revelation")
      .replace(/\bconception recipient\b/gi, "HOLY CONCEPTION recipient")
      .replace(/\bdivine instruction\b/gi, "Divine/HOLY instruction")
      .replace(/\bdivine message\b/gi, "Divine/HOLY message")
      .replace(/\bdivine authority source\b/gi, "HOLY authority source")
      .replace(/\bdivine authority\b/gi, "HOLY authority")
      .replace(/\bdivine origin\b/gi, "HOLY Origin")
      .replace(/\bprotects the CHILD\b/gi, "HOLY preservation/protection of the CHILD");
  }

  function renderDerivedSemanticDisplayText(text, divineContext = false) {
    const value = renderIceDivineDisplayText(text, divineContext)
      .replace(/\bHoly Ghost\b/g, "HOLY SPIRIT")
      .replace(/\bHoly Spirit\b/gi, "HOLY SPIRIT");
    return renderHolyActionDisplayText(renderDerivedDivineChildDisplayText(value, divineContext), divineContext);
  }

  function hasHumanBeingDisplayContext(values) {
    const text = asArray(values)
      .flat(Infinity)
      .map((value) => normalizeText(value).toLowerCase())
      .join(" ");
    return /\b(joseph|mary|scripture narrator|quoted prophet|prophet|human|class iii|wife|husband|obedient response|ponder|privily|just man)\b/.test(text);
  }

  function renderHumanExhaltedDisplayText(text, humanContext = false) {
    if (!humanContext) return text;
    return normalizeText(text)
      .replace(/\bthee\b/g, "Thee")
      .replace(/\bthou\b/g, "Thou")
      .replace(/\bthy\b/g, "Thy")
      .replace(/\bthine\b/g, "Thine")
      .replace(/\bhe\b/g, "He")
      .replace(/\bhim\b/g, "Him")
      .replace(/\bhis\b/g, "His")
      .replace(/\bher\b/g, "Her")
      .replace(/\bshe\b/g, "She");
  }

  function renderIceBeingDisplayText(text, options = {}) {
    if (options.sourceQuote) {
      return renderDivineDisplayText(text);
    }
    const divineContext = Boolean(options.divineContext);
    const humanContext = Boolean(options.humanContext);
    const preferHolySpirit = Boolean(options.preferHolySpirit);
    const divineText = preferHolySpirit
      ? renderDerivedSemanticDisplayText(text, divineContext)
      : renderIceDivineDisplayText(text, divineContext);
    return renderHumanExhaltedDisplayText(divineText, humanContext);
  }

  function renderStudyCardBodyText(text, options = {}) {
    return toDisplayText(text).split(/\r?\n/).map((line) => {
      const normalizedLine = normalizeText(line);
      const sourceQuote = /\b(source phrase|snippet):/i.test(normalizedLine);
      return renderIceBeingDisplayText(normalizedLine, { ...options, sourceQuote });
    }).join("\n");
  }
  function isJesusChristDisplayName(value) {
    return normalizedEntityName(value) === "jesus christ";
  }

  function isJesusNarrativeName(value) {
    return normalizedEntityName(value) === "jesus";
  }

  function christTitleDistinctionNote() {
    return "Narrative NAME: JESUS. Canonical identity: JESUS CHRIST. CHRIST appears as title/source identity, not Joseph's naming action.";
  }

  function christIdentityDisplayNote(values) {
    const hasJesus = asArray(values).some(isJesusNarrativeName);
    const hasJesusChrist = asArray(values).some(isJesusChristDisplayName);
    if (!hasJesus && !hasJesusChrist) return "";
    return hasJesus && hasJesusChrist
      ? christTitleDistinctionNote()
      : hasJesusChrist
        ? "Canonical identity: JESUS CHRIST. CHRIST appears as title/source identity, not Joseph's naming action."
        : "Narrative NAME: JESUS.";
  }

  function isJesusNamingType(value) {
    return /name|naming|revealed_name|called/.test(normalizeText(value || "").toLowerCase());
  }

  function isJesusNamingTarget(value) {
    const target = normalizedEntityName(value || "");
    return target === "jesus" || target === "jesus christ";
  }

  function narrativeNamingTargetDisplay(type) {
    return /revealed_name|reveal|call/.test(normalizeText(type || "").toLowerCase())
      ? "revealed NAME given: JESUS"
      : "narrative naming action: JESUS";
  }

  function narrativeNamingDisplayNote(target) {
    return normalizedEntityName(target) === "jesus christ"
      ? "Revealed NAME: JESUS. Canonical linkage: JESUS CHRIST. CHRIST is title/source identity, not Joseph's given-name action."
      : "Revealed NAME: JESUS.";
  }
  function hasNarrativeJesusNameContext(values) {
    const text = asArray(values)
      .flat(Infinity)
      .map((value) => normalizeText(value).toLowerCase())
      .join(" ");
    return /\b(name|naming|named|revealed_name|called|call his name|birth|born|brought forth|obedient_response_and_naming|divine_message_instruction|matthew 1:2[0145])\b/.test(text);
  }

  function primaryEntityDistinctionLines(items, contextValues = []) {
    const values = Array.isArray(items) ? items : items instanceof Set ? Array.from(items) : [];
    const ordered = passageFunctionOrderedEntities(values);
    const rawNames = values.map((value) => normalizedEntityName(value));
    const hasJesus = rawNames.includes("jesus");
    const hasJesusChrist = rawNames.includes("jesus christ");
    const narrativeNameContext = hasNarrativeJesusNameContext([contextValues, values]);
    if (!narrativeNameContext || (!hasJesus && !hasJesusChrist)) {
      return ordered.map((entry) => entry.display);
    }

    const lines = [];
    lines.push("JESUS - Narrative NAME");
    if (hasJesusChrist) lines.push("JESUS CHRIST - Canonical/source identity");

    for (const entry of ordered) {
      const normalized = normalizedEntityName(entry.display);
      if (normalized === "jesus" || normalized === "jesus christ") continue;
      lines.push(entry.display);
    }
    return lines;
  }

  function semanticKnownEntityNamesInText(values = []) {
    const text = normalizeText(asArray(values).flat(Infinity).join(" ")).toLowerCase();
    const known = [
      ["AngEL Of THE LORD", /\bangel of the lord\b/],
      ["THE LORD", /\b(the lord|god)\b/],
      ["JESUS CHRIST", /\bjesus christ\b/],
      ["JESUS", /\bjesus\b|\byoung child\b/],
      ["CHILD", /\byoung child\b|\bchild\b/],
      ["Joseph", /\bjoseph\b/],
      ["Mary", /\bmary\b/],
      ["Abraham", /\babraham\b/],
      ["David", /\bdavid\b/],
      ["Herod", /\bherod\b/],
      ["Wise men", /\bwise men\b/],
      ["Bethlehem", /\bbethlehem\b/],
      ["Jerusalem", /\bjerusalem\b/],
      ["Egypt", /\begypt\b/],
      ["Nazareth", /\bnazareth\b/]
    ];
    return known.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
  }

  function semanticEntityCandidateRejected(value) {
    const text = normalizeText(value || "");
    const normalized = text.toLowerCase();
    if (!normalized) return true;
    if (normalized.length > 80) return true;
    if (/[;:]/.test(text)) return true;
    if (/\b(save his people from their sins|conceived of the holy spirit|child conceived of the holy spirit)\b/i.test(text)) return true;
    if (/\b(obedient_response_to_revealed_name|divine_message_to_obedient_response|protective_obedient_response|source_authority_to_|_to_)\b/i.test(text)) return true;
    if (/\b(conceived|save|fulfill(?:ed|ment)?|response|process|path|mission|declaration|derived|meaning|instruction|preservation)\b/i.test(text) && !semanticKnownEntityNamesInText([text]).includes(text)) return true;
    return false;
  }

  function semanticEntityExactRecord(name) {
    const normalized = normalizedEntityName(name);
    if (!normalized) return null;
    return [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]
      .find((item) => entityNameCandidates(item).some((candidate) => candidate === normalized)) || null;
  }

  function semanticEntityDisplayName(name) {
    const normalized = normalizedEntityName(name);
    if (normalized === "the lord" || normalized === "god") return normalized === "god" ? "GOD" : "THE LORD";
    if (normalized === "angel of the lord") return "AngEL Of THE LORD";
    if (normalized === "holy ghost" || normalized === "holy spirit") return "HOLY SPIRIT";
    if (normalized === "jesus") return "JESUS";
    if (normalized === "jesus christ") return "JESUS CHRIST";
    if (normalized === "child") return "CHILD";
    const record = semanticEntityExactRecord(name);
    return renderDivineDisplayText(entityDisplayNameFromRecord(record || { displayName: name }) || name);
  }
  function semanticEntityCandidateValues(item = {}) {
    return [
      item.relatedEntities,
      item.linkedEntities,
      item.continuingCharacters,
      item.continuingAuthorityPaths,
      item.continuingCharacterInteractions,
      item.node,
      item.relatedNodes,
      item.relatedPrinciples,
      item.entities,
      item.semanticItems,
      item.sourceEntity,
      item.targetEntity,
      item.origin,
      item.messenger,
      item.recipient,
      item.speaker,
      item.authoritySource,
      item.continuedEntity,
      item.originLocation,
      item.destinationLocation,
      asArray(item.subEvents).map((part) => [part.actor, part.speaker, part.recipient, part.target, part.concerning]),
      semanticKnownEntityNamesInText([item.principleText, item.contextSnippet, item.sourceTitle, item.plainMeaning, item.fulfillmentMeaning, item.derivedMeaning, item.sourceGrounding])
    ].flat(Infinity).map((value) => normalizeText(value)).filter((value) => value && !semanticEntityCandidateRejected(value));
  }

  function addSemanticEntityCandidate(candidates, name, source = {}) {
    if (semanticEntityCandidateRejected(name)) return null;
    const display = semanticEntityDisplayName(name);
    const key = normalizedEntityName(display || name);
    if (!key || /^(not recorded|unknown|current scope)$/i.test(key)) return null;
    const existing = candidates.get(key) || {
      name: display || name,
      roles: new Set(),
      localRoles: new Set(),
      authority: new Set(),
      supportRank: 80
    };
    for (const role of asArray(source.roles).map((value) => normalizeText(value)).filter(Boolean)) existing.roles.add(role);
    for (const localRole of asArray(source.localRoles).map((value) => normalizeText(value)).filter(Boolean)) existing.localRoles.add(localRole);
    for (const authority of asArray(source.authority).map((value) => normalizeText(value)).filter(Boolean)) existing.authority.add(authority);
    existing.supportRank = Math.min(existing.supportRank, source.supportRank || 80);
    candidates.set(key, existing);
    return existing;
  }

  function semanticEntityRoleHints(name, contextValues = []) {
    const normalized = normalizedEntityName(name);
    const text = normalizeText(contextValues.flat(Infinity).join(" ")).toLowerCase();
    if (normalized === "the lord" || normalized === "god") return ["source authority / Divine authority"];
    if (normalized === "angel of the lord") return ["messenger / revelation carrier"];
    if (normalized === "joseph") return [/protect|flee|egypt|warning|dream|obedient|steward/.test(text) ? "revelation recipient / obedient responder / protective steward" : "revelation recipient / obedient responder / covenant steward"];
    if (normalized === "mary") return ["mother / covenant participant / conception context"];
    if (normalized === "jesus") return ["Narrative NAME / CHILD mission focus"];
    if (normalized === "jesus christ") return ["Canonical/source identity"];
    if (normalized === "christ") return ["title / office"];
    if (normalized === "david" || normalized === "abraham") return ["lineage / covenant support"];
    if (normalized === "herod") return ["hostile authority / adversarial threat where source-grounded"];
    if (normalized === "wise men") return ["worship witness / travel witness"];
    if (["bethlehem", "jerusalem", "egypt", "nazareth", "galilee", "judaea", "land of israel"].includes(normalized)) return ["location / movement anchor"];
    return [];
  }

  function semanticEntityLocalRole(name, item = {}, mode = "generic") {
    const normalized = normalizedEntityName(name);
    const roles = [];
    if (normalized && asArray(item.relatedEntities).map(normalizedEntityName).includes(normalized)) roles.push("primary evidence entity");
    if (normalized && [item.sourceEntity, item.origin, item.authoritySource].map(normalizedEntityName).includes(normalized)) roles.push("source / authority side");
    if (normalized && [item.targetEntity, item.recipient, item.target].map(normalizedEntityName).includes(normalized)) roles.push("recipient / target side");
    if (normalized && normalizedEntityName(item.speaker) === normalized) roles.push("speaker side");
    if (normalized && normalizedEntityName(item.messenger) === normalized && semanticEntityClassValue(name) !== "I") roles.push("messenger side");
    if (normalized && [item.originLocation].map(normalizedEntityName).includes(normalized)) roles.push("origin location");
    if (normalized && [item.destinationLocation].map(normalizedEntityName).includes(normalized)) roles.push("destination location");
    if (mode === "timeline") roles.push("narrative moment participant");
    return roles;
  }

  function semanticEntityClassValue(name) {
    const normalized = normalizedEntityName(name);
    if (["the lord", "god", "jesus", "jesus christ", "child"].includes(normalized)) return "I";
    if (normalized === "angel of the lord") return "II";
    if (["joseph", "mary", "abraham", "david", "scripture narrator", "prophet", "quoted prophet", "wise men", "chief priests and scribes"].includes(normalized)) return "III";
    if (["bethlehem", "jerusalem", "egypt", "nazareth", "galilee", "judaea", "land of israel", "east"].includes(normalized)) return "IIIII";
    const record = semanticEntityExactRecord(name);
    return classifyEntityDisplay(record || { displayName: name }) || "";
  }

  function semanticEntityClassRank(name) {
    const entityClass = semanticEntityClassValue(name);
    const ranks = { I: 10, II: 20, III: 30, IIII: 40, IIIII: 50, i: 60, AI_Actor: 70 };
    return ranks[entityClass] || 90;
  }

  function semanticEntityClassHeading(name) {
    const entityClass = semanticEntityClassValue(name);
    return entityClass ? entityClassLabel(entityClass) : "Class Unclassified";
  }

  function semanticEntityLayerRecords(item = {}, mode = "generic") {
    const layers = [
      ...asArray(studyData.ontologyRoles),
      ...asArray(studyData.entityRelationRoles),
      ...asArray(studyData.originAuthorityPaths),
      ...asArray(studyData.revelationPatterns),
      ...asArray(studyData.movementSemantics),
      ...asArray(studyData.semanticContinuity),
      ...scopedSemanticRecords(studyData.teachingSemantics),
      ...asArray(studyData.passageFunctions)
    ];
    return layers.filter((record) => {
      if (record === item) return false;
      if (record.passageFunction) return semanticVerseOverlap(record, item);
      return semanticVerseOverlap(record, item) || semanticEntityOverlap(record, item);
    }).slice(0, 24);
  }

  function semanticPrimaryEntityCandidates(item = {}, mode = "generic") {
    const candidates = new Map();
    const contextValues = [
      item.passageFunction,
      item.revelationType,
      item.semanticRole,
      item.pathType,
      item.movementType,
      item.continuityType,
      item.verseRange,
      item.scopePath,
      item.plainMeaning,
      item.fulfillmentMeaning,
      item.derivedMeaning,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ];

    for (const name of semanticEntityCandidateValues(item)) {
      addSemanticEntityCandidate(candidates, name, {
        roles: semanticEntityRoleHints(name, contextValues),
        localRoles: semanticEntityLocalRole(name, item, mode),
        supportRank: 10
      });
    }

    for (const record of semanticEntityLayerRecords(item, mode)) {
      const overlapNames = semanticEntityCandidateValues(record);
      for (const name of overlapNames) {
        addSemanticEntityCandidate(candidates, name, {
          roles: semanticEntityRoleHints(name, [contextValues, semanticEntityCandidateValues(record), record.ontologyRoles, record.semanticRole, record.narrativeRole, record.canonicalRole, record.derivedMeaning]),
          localRoles: [record.semanticRole || record.passageFunction || record.revelationType || record.pathType || record.movementType || record.continuityType || "related semantic layer"],
          supportRank: semanticVerseOverlap(record, item) ? 25 : 45
        });
      }
    }

    const text = normalizeText([contextValues, semanticEntityCandidateValues(item)].flat(Infinity).join(" ")).toLowerCase();
    if (/the lord|angel of the lord|dream|warned|authority|revelation|fulfilled|spoken of the lord/.test(text)) {
      addSemanticEntityCandidate(candidates, "THE LORD", { roles: semanticEntityRoleHints("THE LORD", contextValues), localRoles: ["authority/source relevance"], supportRank: 18 });
    }
    if (/angel of the lord|dream|warned|messenger|revelation/.test(text)) {
      addSemanticEntityCandidate(candidates, "AngEL Of THE LORD", { roles: semanticEntityRoleHints("AngEL Of THE LORD", contextValues), localRoles: ["messenger/revelation relevance"], supportRank: 19 });
    }
    if (hasNarrativeJesusNameContext([contextValues, semanticEntityCandidateValues(item)])) {
      addSemanticEntityCandidate(candidates, "JESUS", { roles: semanticEntityRoleHints("JESUS", contextValues), localRoles: ["narrative NAME focus"], supportRank: 12 });
      if (/jesus christ|generation|book of the generation|canonical/.test(text)) addSemanticEntityCandidate(candidates, "JESUS CHRIST", { roles: semanticEntityRoleHints("JESUS CHRIST", contextValues), localRoles: ["canonical/source identity focus"], supportRank: 13 });
    }
    if (/matthew 1:(1[89]|2[0-5])|conceived|mother|wife|birth|young child|child/.test(text)) {
      addSemanticEntityCandidate(candidates, "Joseph", { roles: semanticEntityRoleHints("Joseph", contextValues), localRoles: ["chapter/passage narrative participant"], supportRank: 28 });
      addSemanticEntityCandidate(candidates, "Mary", { roles: semanticEntityRoleHints("Mary", contextValues), localRoles: ["chapter/passage narrative participant"], supportRank: 29 });
    }

    return Array.from(candidates.values()).sort((left, right) =>
      semanticEntityClassRank(left.name) - semanticEntityClassRank(right.name) ||
      left.supportRank - right.supportRank ||
      passageFunctionEntityRank(left.name) - passageFunctionEntityRank(right.name) ||
      left.name.localeCompare(right.name)
    );
  }

  function classConsistentEntityRoles(entity) {
    const entityClass = semanticEntityClassValue(entity.name);
    const normalized = normalizedEntityName(entity.name);
    const rawRoles = Array.from(entity.roles).filter(Boolean);
    const rawLocal = Array.from(entity.localRoles).filter(Boolean);
    const rejectMessenger = (value) => entityClass === "I" && /messenger|carrier|transfer participant/i.test(value || "");
    const roles = rawRoles.filter((value) => !rejectMessenger(value));
    const localRoles = rawLocal.filter((value) => !rejectMessenger(value));

    if (entityClass === "I") {
      if (normalized === "the lord" || normalized === "god") return {
        roles: ["source authority / HOLY origin", "Divine authority / revelation origin"],
        localRoles: localRoles.length ? localRoles : ["authority/source relevance"]
      };
      if (normalized === "jesus" || normalized === "child") return {
        roles: [normalized === "child" ? "CHILD semantic referent" : "Narrative NAME / CHILD mission focus"],
        localRoles: localRoles.length ? localRoles : ["mission/person focus"]
      };
      if (normalized === "jesus christ") return {
        roles: ["Canonical/source identity"],
        localRoles: localRoles.length ? localRoles : ["canonical identity focus"]
      };
    }

    if (entityClass === "II" && normalized === "angel of the lord") return {
      roles: ["messenger / revelation carrier", "authority transfer participant"],
      localRoles: localRoles.length ? localRoles : ["messenger/revelation relevance"]
    };

    return {
      roles: roles.length ? roles : ["semantic entity"],
      localRoles: localRoles.length ? localRoles : ["contextual evidence entity"]
    };
  }
  function classifiedPrimaryEntityLines(item = {}, mode = "generic", limit = 14) {
    const entities = semanticPrimaryEntityCandidates(item, mode);
    const lines = [];
    let currentClass = "";
    for (const entity of entities) {
      const heading = semanticEntityClassHeading(entity.name);
      if (heading !== currentClass) {
        lines.push(heading);
        currentClass = heading;
      }
      const consistent = classConsistentEntityRoles(entity);
      const role = consistent.roles.slice(0, 2).join("; ");
      const local = consistent.localRoles.slice(0, 2).join("; ");
      const suffix = normalizedEntityName(entity.name) === "jesus" ? " - Narrative NAME" : normalizedEntityName(entity.name) === "jesus christ" ? " - Canonical/source identity" : "";
      lines.push(`${entity.name}${suffix} | Role: ${role} | Local: ${local}`);
      if (lines.length >= limit) break;
    }
    return lines.length ? lines : primaryEntityDistinctionLines(item.relatedEntities || item.entities || [], []);
  }
  function relationshipDisplayTarget(edge = {}) {
    const from = normalizedEntityName(edge.fromEntity || "");
    const target = edge.toEntity || edge.target || "";
    const type = normalizeText(edge.relationshipType || "").toLowerCase();
    if (from === "joseph" && isJesusNamingType(type) && isJesusNamingTarget(target)) return narrativeNamingTargetDisplay(type);
    return target ? renderDerivedSemanticDisplayText(target, hasDivineDisplayContext([target, edge.relationshipType])) : "Entity";
  }

  function relationshipDisplayNote(edge = {}) {
    const from = normalizedEntityName(edge.fromEntity || "");
    const target = edge.toEntity || edge.target || "";
    const type = normalizeText(edge.relationshipType || "").toLowerCase();
    if (from === "joseph" && isJesusNamingType(type) && isJesusNamingTarget(target)) return narrativeNamingDisplayNote(target);
    return christIdentityDisplayNote([edge.fromEntity, edge.toEntity, edge.target]);
  }

  function semanticEventDisplayTarget(item = {}) {
    const target = item.target || item.recipient || item.concerning || "";
    const type = normalizeText(item.eventType || item.relationshipType || item.action || "").toLowerCase();
    if (isJesusNamingType(type) && isJesusNamingTarget(target)) return narrativeNamingTargetDisplay(type);
    return target ? renderDerivedSemanticDisplayText(target, hasDivineDisplayContext([target, item.eventType, item.relationshipType, item.action])) : target;
  }

  function semanticEventDisplayNote(item = {}) {
    const target = item.target || item.recipient || item.concerning || "";
    const type = normalizeText(item.eventType || item.relationshipType || item.action || "").toLowerCase();
    if (isJesusNamingType(type) && isJesusNamingTarget(target)) return narrativeNamingDisplayNote(target);
    return christIdentityDisplayNote([item.actor, target, item.recipient, item.concerning]);
  }

  function includesTerm(value, term) {
    if (!term) return true;
    return normalizeText(value).toLowerCase().includes(term);
  }

  function itemMatches(item, fields, term) {
    return fields.some((field) => includesTerm(item?.[field], term));
  }

  function clearElement(element) {
    element.textContent = "";
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function countItems(value) {
    return Array.isArray(value) ? value.length : 0;
  }

  function confidenceClassName(value) {
    const normalized = normalizeText(displayConfidence(value || "")).toLowerCase();
    if (/^clear$|direct|source-grounded|source grounded|source-markup/.test(normalized)) return "ice-confidence-explicit";
    if (/^highly grounded$|semantic agreement|multiple semantic/.test(normalized)) return "ice-confidence-probable";
    if (/^grounded$/.test(normalized)) return "ice-confidence-possible";
    if (/^lightly grounded$|weak|limited/.test(normalized)) return "ice-confidence-possible";
    if (/^source-attributed$|traditional|narrator|source attribution/.test(normalized)) return "ice-confidence-attributed";
    if (/^unresolved|still evaluating|context required|ambiguous|uncertain/.test(normalized)) return "ice-confidence-unresolved";
    return "ice-confidence-probable";
  }

  function displayConfidence(value) {
    const normalized = normalizeText(value || "").toLowerCase();
    if (!normalized) return "grounded";
    if (["explicit", "source-markup", "direct", "source-grounded", "source grounded"].includes(normalized)) return "clear";
    if (["probable", "semantic agreement", "multiple semantic", "prophecy-fulfillment"].includes(normalized)) return "highly grounded";
    if (["possible"].includes(normalized)) return "grounded";
    if (["weak", "limited"].includes(normalized)) return "lightly grounded";
    if (["attributed", "inferred-source", "traditional-attribution", "believed", "narrator", "source attribution"].includes(normalized)) return "source-attributed";
    if (["unresolved", "context_required", "context required", "ambiguous", "uncertain"].includes(normalized)) return "unresolved / still evaluating";
    return value;
  }
  function displayAppConfidence(value, label = "App accuracy") {
    return `${label}: ${displayConfidence(value)}`;
  }

  function dedupeActorActions(actor) {
    const seen = new Set();
    const orderedActions = [];

    for (const action of actor.orderedActions || []) {
      const key = [
        actor.actorName || "",
        action.sequenceOrder ?? "",
        normalizeText(action.eventText || "").toLowerCase()
      ].join("|");

      if (seen.has(key)) continue;
      seen.add(key);
      orderedActions.push(action);
    }

    return {
      ...actor,
      orderedActions
    };
  }

  function principleDedupKey(item) {
    return [
      item.sourceUrl || item.sourceTitle || "",
      normalizeText(item.principleText || "").toLowerCase(),
      item.principleType || "unknown"
    ].join("|");
  }

  function dedupePrincipleItems(items) {
    const seen = new Set();
    const deduped = [];

    for (const item of items || []) {
      const key = principleDedupKey(item);
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    return deduped;
  }

  function interactionDedupKey(item) {
    const actors = [
      normalizeText(item.actorA || "").toLowerCase(),
      normalizeText(item.actorB || "").toLowerCase()
    ].sort((a, b) => a.localeCompare(b));

    return [
      item.sourceUrl || item.sourceTitle || item.sourceCaptureId || "",
      actors[0],
      actors[1],
      normalizeText(item.interactionType || "").toLowerCase(),
      normalizeText(item.sourceSnippet || "").toLowerCase()
    ].join("|");
  }

  function dedupeInteractions(items) {
    const seen = new Set();
    const deduped = [];

    for (const item of items || []) {
      const key = interactionDedupKey(item);
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    return deduped;
  }

  function createCard(title, body, meta = "") {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const content = document.createElement("p");

    card.className = "study-card";
    heading.textContent = renderIceBeingDisplayText(title || "Untitled", { divineContext: hasDivineDisplayContext([title]), humanContext: hasHumanBeingDisplayContext([title]), preferHolySpirit: true });
    content.textContent = renderStudyCardBodyText(body || "No detail available.", { divineContext: hasDivineDisplayContext([title, body]), humanContext: hasHumanBeingDisplayContext([title, body]), preferHolySpirit: true });

    card.append(heading, content);

    if (meta) {
      const metaText = document.createElement("span");
      metaText.className = "meta";
      metaText.textContent = renderIceBeingDisplayText(meta, { divineContext: hasDivineDisplayContext([title, body, meta]), humanContext: hasHumanBeingDisplayContext([title, body, meta]), preferHolySpirit: true });
      card.appendChild(metaText);
    }

    return card;
  }

  function appendEmpty(container, message) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = message;
    container.appendChild(empty);
  }

  function renderLimited(container, items, countElement, renderItem, emptyMessage, hiddenLabel = "item") {
    clearElement(container);
    countElement.textContent = `${items.length} total`;

    if (items.length === 0) {
      appendEmpty(container, emptyMessage);
      return;
    }

    for (const item of items.slice(0, DISPLAY_LIMIT)) {
      container.appendChild(renderItem(item));
    }

    if (items.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${items.length - DISPLAY_LIMIT} more ${hiddenLabel}(s) hidden by preview limit. Use search/filter or show more later.`);
    }
  }


  function pageRecordKey(page = {}) {
    return [page.sourceCaptureBook || page.book, page.sourceCaptureChapter || page.chapter, page.sourceTitle || page.title, page.activeUrl || page.url]
      .map((value) => normalizeText(value || "").toLowerCase())
      .join("|");
  }
  const approvedStudySourceAdapters = new Set(["lds_scripture_adapter"]);

  function isPanelUiUrl(url = "") {
    return /chrome-extension:.*study\.html|\/study\.html(?:$|[?#])/i.test(normalizeText(url));
  }

  function isExcludedBrowserPage(page = {}) {
    const text = normalizeText([page.sourceTitle, page.title, page.activeUrl, page.url].filter(Boolean).join(" "));
    return /\bchatgpt\b|chat\.openai\.com|chatgpt\.com|openai\.com\/chat|\bgmail\b|mail\.google\.com|chrome-extension:|moz-extension:|edge-extension:/i.test(text);
  }

  function sourceMatchFromTitle(title = "") {
    const match = normalizeText(title).match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
    return match ? { book: match[1], chapter: match[2] } : null;
  }

  function sourceMatchFromUrl(url = "") {
    const match = normalizeText(url).match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);
    const urlBooks = { matt: "Matthew", mark: "Mark", luke: "Luke", john: "John" };
    return match ? { book: urlBooks[match[1].toLowerCase()] || "", chapter: match[2] } : null;
  }

  function validStudySourceUrl(url = "") {
    const normalized = normalizeText(url);
    return /^https?:\/\/(?:www\.)?churchofjesuschrist\.org\/study\/scriptures\//i.test(normalized) ||
      /^https?:\/\/(?:www\.)?churchofjesuschrist\.org\/scriptures\//i.test(normalized) ||
      /\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(?:matt|mark|luke|john)\/\d+\b/i.test(normalized);
  }

  function validSourcePageRecord(page = {}, { requireAnalyzed = false } = {}) {
    if (!page) return false;
    const url = normalizeText(page.activeUrl || page.url || "");
    if (!url || isPanelUiUrl(url) || isExcludedBrowserPage(page) || !validStudySourceUrl(url)) return false;
    const adapterName = normalizeText(page.activeAdapterName || page.adapterName || page.sourceAdapter?.adapterName || "");
    if (!approvedStudySourceAdapters.has(adapterName)) return false;
    const book = normalizeText(page.sourceCaptureBook || page.book || "");
    const chapter = normalizeText(page.sourceCaptureChapter || page.chapter || "");
    if (!book || !chapter) return false;
    const titleMatch = sourceMatchFromTitle(page.sourceTitle || page.title || "");
    const urlMatch = sourceMatchFromUrl(url);
    if (!urlMatch || urlMatch.book !== book || String(urlMatch.chapter) !== String(chapter)) return false;
    if (titleMatch && (titleMatch.book !== book || String(titleMatch.chapter) !== String(chapter))) return false;
    if (requireAnalyzed && !page.analyzedAt) return false;
    return true;
  }
  function sourcePageValidationReason(page = {}, { requireAnalyzed = false, requireMarker = false } = {}) {
    if (!page) return "empty page record";
    const url = normalizeText(page.activeUrl || page.url || "");
    if (!url) return "missing source URL";
    if (isPanelUiUrl(url)) return "panel UI URL is not source content";
    if (isExcludedBrowserPage(page)) return "non-scripture/browser page excluded";
    if (!validStudySourceUrl(url)) return "URL is not an approved scripture/source URL";
    const adapterName = normalizeText(page.activeAdapterName || page.adapterName || page.sourceAdapter?.adapterName || "");
    if (!approvedStudySourceAdapters.has(adapterName)) return "adapter is not an approved source adapter";
    const book = normalizeText(page.sourceCaptureBook || page.book || "");
    const chapter = normalizeText(page.sourceCaptureChapter || page.chapter || "");
    if (!book || !chapter) return "missing source book/chapter";
    const urlMatch = sourceMatchFromUrl(url);
    const titleMatch = sourceMatchFromTitle(page.sourceTitle || page.title || "");
    if (!urlMatch) return "URL does not identify a supported scripture chapter";
    if (urlMatch.book !== book || String(urlMatch.chapter) !== String(chapter)) return "URL book/chapter does not match capture metadata";
    if (titleMatch && (titleMatch.book !== book || String(titleMatch.chapter) !== String(chapter))) return "title book/chapter does not match capture metadata";
    if (requireAnalyzed && !page.analyzedAt) return "missing analysis timestamp";
    if (requireMarker && (!page.pageKey || !page.analysisTimestamp && !page.analyzedAt || !page.buildMarker)) return "missing canonical confirmed analysis marker";
    return "accepted";
  }

  function pageRecordFromCanonicalMarker(marker = {}) {
    const page = {
      sourceCaptureId: marker.captureId || marker.sourceCaptureId || "",
      sourceTitle: marker.sourceTitle || "Current source",
      sourceCaptureBook: marker.sourceCaptureBook || "",
      sourceCaptureChapter: marker.sourceCaptureChapter || "",
      activeUrl: marker.url || marker.activeUrl || "",
      activeAdapterName: marker.adapter || marker.activeAdapterName || "",
      analyzedAt: marker.analysisTimestamp || marker.analyzedAt || "",
      updatedAt: marker.analysisTimestamp || marker.updatedAt || "",
      pageKey: marker.pageKey || "",
      buildMarker: marker.buildMarker || ""
    };
    return sourcePageValidationReason(page, { requireAnalyzed: true, requireMarker: true }) === "accepted" && page.pageKey === pageRecordKey(page) ? page : null;
  }

  function rawPageRecordFromCapture(capture = {}) {
    if (!capture?.text && !capture?.url && !capture?.title) return null;
    const inferred = inferDisplaySourceContext(capture) || {};
    return {
      sourceCaptureId: capture.id || "",
      sourceTitle: capture.title || inferred.sourceTitle || "Current source",
      sourceCaptureBook: inferred.book || "",
      sourceCaptureChapter: inferred.chapter || "",
      activeUrl: normalizeText(capture.url || ""),
      activeAdapterName: capture.sourceAdapter?.adapterName || capture.activeAdapterName || capture.adapterName || studyData.activeAdapter?.adapterName || studyData.analysisStatus?.activeAdapterName || "",
      capturedAt: capture.capturedAt || "",
      updatedAt: capture.capturedAt || ""
    };
  }

  function pageRecordFromCapture(capture = {}) {
    const record = rawPageRecordFromCapture(capture);
    return validSourcePageRecord(record) ? record : null;
  }

  function pageRecordFromStatus(status = {}) {
    if (!status?.sourceCaptureTitle && !status?.activeUrl && !status?.sourceCaptureBook) return null;
    const record = {
      sourceCaptureId: status.sourceCaptureId || "",
      sourceTitle: status.sourceCaptureTitle || "Current source",
      sourceCaptureBook: status.sourceCaptureBook || "",
      sourceCaptureChapter: status.sourceCaptureChapter || "",
      activeUrl: status.activeUrl || "",
      activeAdapterName: status.activeAdapterName || "",
      analyzedAt: status.analyzedAt || "",
      updatedAt: status.analyzedAt || ""
    };
    return validSourcePageRecord(record, { requireAnalyzed: Boolean(status.analyzedAt) }) ? record : null;
  }

  function frozenAnalysisTargetRecord() {
    return pageRecordFromCanonicalMarker(studyData.canonicalAnalysisTarget) || pageRecordFromStatus(studyData.analysisStatus || {});
  }

  function activeSourcePageRecord() {
    const storedActive = validSourcePageRecord(studyData.activeSourcePage) ? studyData.activeSourcePage : null;
    return frozenAnalysisTargetRecord() ||
      storedActive ||
      pageRecordFromStatus(studyData.analysisStatus || {}) ||
      analyzedPageHistory()[0] ||
      pageRecordFromCapture(studyData.latestCapture) ||
      null;
  }

  function currentAnalyzedStatusRecord() {
    const statusEntry = pageRecordFromStatus(studyData.analysisStatus || {});
    if (!statusEntry?.analyzedAt) return null;
    const activeCandidate = frozenAnalysisTargetRecord() || (validSourcePageRecord(studyData.activeSourcePage) ? studyData.activeSourcePage : null);
    const activeKey = pageRecordKey(activeCandidate || {});
    const statusKey = pageRecordKey(statusEntry || {});
    if (activeCandidate && activeKey && statusKey && activeKey !== statusKey) return null;
    return statusEntry;
  }

  function pageChapterNumber(page = {}) {
    const value = Number(page.sourceCaptureChapter || page.chapter || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function pageBookName(page = {}) {
    return normalizeText(page.sourceCaptureBook || page.book || "");
  }

  function sortedAnalyzedPages(analyzedPages = []) {
    return asArray(analyzedPages)
      .filter(Boolean)
      .slice()
      .sort((left, right) => {
        const leftBook = pageBookName(left).toLowerCase();
        const rightBook = pageBookName(right).toLowerCase();
        return leftBook.localeCompare(rightBook) || pageChapterNumber(left) - pageChapterNumber(right) || String(left.analyzedAt || left.updatedAt || "").localeCompare(String(right.analyzedAt || right.updatedAt || ""));
      });
  }

  function missingPageLabelsForPages(pages = []) {
    const sorted = sortedAnalyzedPages(pages);
    if (sorted.length < 2) return [];
    const books = [...new Set(sorted.map(pageBookName).filter(Boolean).map((book) => book.toLowerCase()))];
    if (books.length !== 1) return [];
    const book = pageBookName(sorted[0]);
    const chapters = sorted.map(pageChapterNumber).filter(Boolean);
    if (chapters.length !== sorted.length) return [];
    const present = new Set(chapters);
    const min = Math.min(...chapters);
    const max = Math.max(...chapters);
    const missing = [];
    for (let chapter = min; chapter <= max; chapter += 1) {
      if (!present.has(chapter)) missing.push(book + " " + chapter);
    }
    return missing;
  }

  function selectedSessionScopeFromPages(pages = []) {
    const sorted = sortedAnalyzedPages(pages);
    if (!sorted.length) return null;
    const labels = sorted.map(volumePageLabel).filter(Boolean);
    const missingLabels = missingPageLabelsForPages(sorted);
    const isContiguous = missingLabels.length === 0;
    const start = sorted[0];
    const end = sorted[sorted.length - 1];
    const startLabel = volumePageLabel(start);
    const endLabel = volumePageLabel(end);
    const rangeLabel = startLabel === endLabel ? startLabel : startLabel + " -> " + endLabel;
    const selectedLabel = labels.join(", ");
    return {
      start,
      end,
      count: sorted.length,
      pages: sorted,
      labels,
      isContiguous,
      missingLabels,
      sessionType: sorted.length < 2 ? "Single analyzed page" : (isContiguous ? "Contiguous analyzed range" : "Non-contiguous selected pages"),
      sessionLabel: sorted.length < 2 ? (labels[0] || "Current analyzed source") : (isContiguous ? rangeLabel : labels.join(" + ")),
      continuityLabel: sorted.length < 2 ? "Continuity awaits multiple analyzed pages" : (isContiguous ? "Continuity follows analyzed adjacent pages" : "Limited continuity across selected pages only"),
      currentRangeLabel: sorted.length < 2
        ? "Selected page only: " + (labels[0] || "Current analyzed source")
        : (isContiguous
          ? "Start: " + startLabel + "\nEnd: " + endLabel + "\nScope: " + sorted.length + " page(s) analyzed"
          : "Selected pages only: " + selectedLabel + "\nNot a complete " + rangeLabel + " range")
    };
  }

  function rangeFromAnalyzedPages(analyzedPages = []) {
    return selectedSessionScopeFromPages(analyzedPages);
  }

  function selectedRangeFromAnalyzedPages(analyzedPages = []) {
    const sorted = sortedAnalyzedPages(analyzedPages);
    const selected = studyData.selectedRange || null;
    if (!selected?.start || !selected?.end) return selectedSessionScopeFromPages(sorted);
    const pagesByKey = new Map(sorted.map((page) => [pageRecordKey(page), page]));
    const start = pagesByKey.get(pageRecordKey(selected.start));
    const end = pagesByKey.get(pageRecordKey(selected.end));
    if (!start || !end) return selectedSessionScopeFromPages(sorted);
    const book = pageBookName(start).toLowerCase();
    const startChapter = pageChapterNumber(start);
    const endChapter = pageChapterNumber(end);
    if (!book || !startChapter || !endChapter || book !== pageBookName(end).toLowerCase()) return selectedSessionScopeFromPages(sorted);
    const min = Math.min(startChapter, endChapter);
    const max = Math.max(startChapter, endChapter);
    const selectedPages = sorted.filter((page) => pageBookName(page).toLowerCase() === book && pageChapterNumber(page) >= min && pageChapterNumber(page) <= max);
    return selectedSessionScopeFromPages(selectedPages.length ? selectedPages : sorted);
  }

  function currentStudyScopePages() {
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    if (range?.pages?.length) return range.pages;
    const activePage = activeSourcePageRecord();
    if (activePage) return [activePage];
    return analyzedPages;
  }

  function currentStudyScopeLabel() {
    const range = selectedRangeFromAnalyzedPages(analyzedPageHistory());
    if (range?.sessionLabel) return range.sessionLabel;
    const pages = currentStudyScopePages();
    return pages.length ? pages.map(volumePageLabel).join(" + ") : "current scope";
  }

  function recordScopeSearchText(item = {}) {
    return [
      item.scopePath,
      item.verseRange,
      item.verseRef,
      item.sourceTitle,
      item.sourceUrl,
      item.activeUrl,
      item.url,
      item.chapterScope,
      item.sessionScope,
      item.currentScope,
      item.currentSource,
      item.sourceCaptureBook,
      item.sourceCaptureChapter,
      item.book,
      item.chapter,
      item.sourceContext?.scopePath,
      item.sourceContext?.sourceTitle,
      item.sourceContext?.book,
      item.sourceContext?.chapter,
      item.analysisTarget?.pageKey,
      item.analysisTarget?.title,
      item.analysisTarget?.book,
      item.analysisTarget?.chapter,
      item.analysisTarget?.url,
      ...normalizeScopeList(item.scopes, item)
    ].flat(Infinity).map((value) => normalizeText(value)).filter(Boolean).join(" ").toLowerCase();
  }

  function recordMatchesCurrentStudyScope(item = {}) {
    const pages = currentStudyScopePages();
    if (!pages.length) return true;
    const scopeText = recordScopeSearchText(item);
    if (!scopeText) return true;
    const allowed = pages.map((page) => ({
      book: pageBookName(page),
      slug: scopeBookSlug(pageBookName(page)),
      chapter: String(pageChapterNumber(page)),
      label: volumePageLabel(page).toLowerCase(),
      url: normalizeText(sourcePageUrl(page)).replace(/\/+$/, "").toLowerCase(),
      key: normalizeText(page.pageKey || pageRecordKey(page)).toLowerCase()
    })).filter((page) => page.book && page.chapter);
    if (!allowed.length) return true;
    const allowedChapters = new Set(allowed.map((page) => page.chapter));
    const allowedBooks = new Set(allowed.flatMap((page) => [page.book.toLowerCase(), page.slug]).filter(Boolean));
    const allowedHit = allowed.some((page) =>
      scopeText.includes(page.label) ||
      scopeText.includes(page.url) ||
      scopeText.includes(page.key) ||
      scopeText.includes(`scripture.nt.${page.slug}.${page.chapter}`) ||
      new RegExp(`\\b${escapeRegExp(page.book)}\\s+${page.chapter}\\b`, "i").test(scopeText)
    );
    const chapterMatches = [];
    const patterns = [
      /scripture\.nt\.([a-z]+)\.(\d+)/gi,
      /\b(matthew|matt|mark|luke|john)\s+(\d+)\b/gi,
      /\/scriptures\/nt\/(matt|mark|luke|john)\/(\d+)\b/gi
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(scopeText)) !== null) chapterMatches.push({ book: match[1], chapter: match[2] });
    }
    const explicitOutOfScope = chapterMatches.some((match) => {
      const book = match.book.toLowerCase() === "matt" ? "matthew" : match.book.toLowerCase();
      return allowedBooks.has(book) && !allowedChapters.has(String(match.chapter));
    });
    if (explicitOutOfScope) return false;
    return allowedHit || chapterMatches.length === 0;
  }

  function scopedSemanticRecords(records = []) {
    return asArray(records).filter((item) => recordMatchesCurrentStudyScope(item));
  }
  function volumePageLabel(page = {}) {
    const book = normalizeText(page.sourceCaptureBook || page.book || "");
    const chapter = normalizeText(page.sourceCaptureChapter || page.chapter || "");
    if (book && chapter) return `${book} ${chapter}`;
    return normalizeText(page.sourceTitle || page.title || page.activeUrl || page.url || "Unknown page");
  }

  function analyzedPageHistory() {
    const seen = new Set();
    return asArray(studyData.canonicalAnalyzedPages)
      .map(pageRecordFromCanonicalMarker)
      .filter(Boolean)
      .filter((item) => {
        const key = item.pageKey || pageRecordKey(item);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((left, right) => Number(left.sourceCaptureChapter || 0) - Number(right.sourceCaptureChapter || 0) || String(left.analyzedAt || left.updatedAt || "").localeCompare(String(right.analyzedAt || right.updatedAt || "")));
  }
  function analysisStatusLabel(activePage = activeSourcePageRecord()) {
    const status = studyData.analysisStatus || {};
    if (!status.analyzedAt) return activePage ? "session data cleared" : "not analyzed";
    const statusKey = pageRecordKey(pageRecordFromStatus(status) || {});
    const activeKey = pageRecordKey(activePage || {});
    if (activePage && activeKey && statusKey && activeKey !== statusKey) return "stale / different active source";
    return "current";
  }

  function currentAnalysisPageRecord() {
    const statusPage = pageRecordFromStatus(studyData.analysisStatus || {});
    return statusPage?.analyzedAt ? statusPage : null;
  }

  function retainedAnalyzedPages(analyzedPages = analyzedPageHistory()) {
    const currentKey = pageRecordKey(currentAnalysisPageRecord() || {});
    if (!currentKey) return analyzedPages;
    return analyzedPages.filter((page) => pageRecordKey(page) !== currentKey);
  }

  function currentActionLine(activePage, analyzedPages = analyzedPageHistory()) {
    const statusPage = currentAnalysisPageRecord();
    if (!statusPage) return "No current analysis action recorded.";
    const statusKey = pageRecordKey(statusPage);
    const activeKey = pageRecordKey(activePage || {});
    const label = volumePageLabel(statusPage);
    const retained = retainedAnalyzedPages(analyzedPages);
    const actionOnly = retained.length ? " only" : "";
    if (activePage && statusKey && activeKey && statusKey !== activeKey) {
      return "Latest action analyzed " + label + "; active source is now " + volumePageLabel(activePage) + ".";
    }
    return "Analyzed active source page" + actionOnly + ": " + label;
  }

  function retainedPagesLine(_activePage, analyzedPages = analyzedPageHistory()) {
    const retained = retainedAnalyzedPages(analyzedPages);
    if (!retained.length) return "None";
    const statusTime = Date.parse(studyData.analysisStatus?.analyzedAt || "");
    return retained.map((page) => {
      const label = volumePageLabel(page);
      const pageTime = Date.parse(page.analyzedAt || page.updatedAt || "");
      if (Number.isFinite(statusTime) && Number.isFinite(pageTime) && pageTime < statusTime) {
        return label + " was already present in local study data before this action.";
      }
      return label + " is present in stored local study data; current action source unknown.";
    }).join("\n");
  }

  function storedSessionTypeLabel(range) {
    if (!range) return "No analyzed session";
    if (range.sessionType === "Non-contiguous selected pages") return "Non-contiguous stored analyzed pages";
    return range.sessionType;
  }

  function storedContinuityLine(activePage, analyzedPages = analyzedPageHistory()) {
    const scope = selectedRangeFromAnalyzedPages(analyzedPages);
    if (scope && !scope.isContiguous) return "Limited continuity across stored analyzed pages only.";
    return continuitySummaryLines(activePage, analyzedPages).join("\n");
  }

  function humanList(values = []) {
    const labels = asArray(values).map((value) => normalizeText(value)).filter(Boolean);
    if (labels.length <= 1) return labels[0] || "";
    if (labels.length === 2) return labels.join(" and ");
    return labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1];
  }

  function continuityScopeFromLabels(labels = []) {
    const pages = asArray(labels).map((label) => {
      const match = normalizeText(label).match(/^([A-Za-z]+)\s+(\d+)$/);
      return match ? { sourceCaptureBook: match[1], sourceCaptureChapter: match[2], sourceTitle: normalizeText(label) } : null;
    }).filter(Boolean);
    return selectedSessionScopeFromPages(pages);
  }

  function normalizeSessionContinuityReviewRecord(record = {}) {
    const analyzedLabels = asArray(record.analyzedPages).map((label) => normalizeText(label)).filter(Boolean);
    const scope = continuityScopeFromLabels(analyzedLabels);
    if (!scope || scope.isContiguous) return record;
    const selectedText = humanList(scope.labels);
    const missingText = humanList(scope.missingLabels);
    return {
      ...record,
      sessionRange: scope.sessionLabel,
      sessionType: scope.sessionType,
      missingPages: scope.missingLabels,
      derivedMeaning: "The current study session can be reviewed across selected analyzed pages only: " + selectedText + ". " + missingText + " are not analyzed and are not included in the continuity review.",
      sourceGrounding: "Review layer uses selected analyzed pages only. Missing intermediate pages are not analyzed and are not included in the continuity review.",
      evidence: uniqueStudyList([...(asArray(record.evidence)), "Selected analyzed pages only: " + scope.labels.join(", "), "Missing pages not analyzed: " + scope.missingLabels.join(", ")])
    };
  }

  function continuitySummaryLines(_activePage, analyzedPages) {
    const scope = selectedRangeFromAnalyzedPages(analyzedPages);
    if (scope && !scope.isContiguous) return ["Limited continuity across selected pages only"];

    const continuityLines = asArray(studyData.semanticContinuity)
      .map((item) => normalizeText(item.chapterTransition || ""))
      .filter(Boolean);
    if (continuityLines.length > 0) return [...new Set(continuityLines)].slice(0, 4);

    if (scope?.labels?.length >= 2) return [scope.sessionLabel];
    if (scope?.labels?.length === 1) return ["Continuity awaits multiple analyzed pages"];
    return ["No cross-page continuity detected yet"];
  }

  function sessionContinuityReviewRecords() {
    const stored = asArray(studyData.sessionContinuityReview);
    if (stored.length) return stored.map(normalizeSessionContinuityReviewRecord);
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const scopePages = range?.pages?.length ? range.pages : analyzedPages;
    if (!range || scopePages.length < 2) return [];
    const labels = range.labels.length ? range.labels : scopePages.map(volumePageLabel).filter(Boolean);
    const chapterSet = new Set(scopePages.map((page) => Number(page.sourceCaptureChapter || page.chapter || 0)).filter(Boolean));
    const hasChapter = (chapter) => chapterSet.has(chapter);
    const unique = (values = []) => Array.from(new Set(values.map((value) => normalizeText(value)).filter(Boolean)));
    return [{
      id: `session-continuity-review-${labels.join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      sessionRange: range.sessionLabel,
      sessionType: range.sessionType,
      missingPages: range.missingLabels,
      analyzedPages: labels,
      continuingCharacters: unique([
        hasChapter(1) || hasChapter(2) || hasChapter(3) || hasChapter(5) ? "JESUS" : "",
        hasChapter(1) || hasChapter(2) ? "Joseph" : "",
        hasChapter(1) || hasChapter(2) ? "Mary" : "",
        hasChapter(3) ? "John" : "",
        hasChapter(5) ? "disciples" : "",
        hasChapter(5) ? "People / multitudes" : "",
        ...scopedSemanticRecords(studyData.characterInteractions).flatMap((item) => [item.sourceCharacter, item.targetCharacter])
      ]).slice(0, 12),
      continuingThemes: unique([
        hasChapter(1) ? "mission revealed" : "",
        hasChapter(2) ? "mission preserved" : "",
        hasChapter(3) ? "mission announced" : "",
        hasChapter(4) ? "mission prepared" : "",
        hasChapter(5) ? "mission taught" : "",
        ...scopedSemanticRecords(studyData.principleRelationships).flatMap((item) => [item.principle, ...asArray(item.relatedPrinciples)]),
        ...scopedSemanticRecords(studyData.semanticContinuity).flatMap((item) => asArray(item.continuity))
      ]).slice(0, 14),
      continuingAuthorityPaths: unique([
        hasChapter(1) || hasChapter(2) ? "THE LORD -> AngEL Of THE LORD -> Joseph" : "",
        hasChapter(3) ? "HOLY SPIRIT source wording / derived display continuity" : "",
        hasChapter(5) ? "JESUS -> disciples / multitudes" : "",
        ...scopedSemanticRecords(studyData.originAuthorityPaths).map((item) => [item.origin, item.messenger, item.recipient].filter(Boolean).join(" -> "))
      ]).slice(0, 8),
      teachingProgression: [
        hasChapter(1) ? "Matthew 1: mission revealed" : "",
        hasChapter(2) ? "Matthew 2: mission preserved" : "",
        hasChapter(3) ? "Matthew 3: mission announced" : "",
        hasChapter(4) ? "Matthew 4: mission prepared" : "",
        hasChapter(5) ? "Matthew 5: mission taught" : ""
      ].filter(Boolean),
      continuingPrincipleFamilies: unique([
        ...scopedSemanticRecords(studyData.principleRelationships).map((item) => item.principle),
        ...scopedSemanticRecords(studyData.teachingSemantics).flatMap((item) => [item.principle, item.teachingTopic, item.blessing, item.commandment]),
        hasChapter(5) ? "righteousness" : "",
        hasChapter(5) ? "kingdom" : "",
        hasChapter(5) ? "mercy" : "",
        hasChapter(1) || hasChapter(2) ? "obedience" : "",
        hasChapter(1) || hasChapter(2) ? "fulfillment" : ""
      ]).slice(0, 12),
      continuingCharacterInteractions: unique([
        ...scopedSemanticRecords(studyData.characterInteractions).map((item) => `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"}`),
        hasChapter(3) ? "John -> people | preaches / prepares" : "",
        hasChapter(5) ? "JESUS -> disciples | teaches" : "",
        hasChapter(5) ? "JESUS -> People / multitudes | teaches in surrounding audience context" : ""
      ]).slice(0, 10),
      sourcePhrase: "Analyzed session metadata plus current source-grounded semantic layers",
      derivedMeaning: range.isContiguous ? "The current study session can be reviewed as " + range.sessionLabel + "; continuity is summarized from analyzed page history and current semantic layers without crawling or whole-book indexing." : "The current study session can be reviewed across selected analyzed pages only: " + humanList(labels) + ". " + humanList(range.missingLabels) + " are not analyzed and are not included in the continuity review.",
      evidence: unique([
        `Analyzed session pages: ${labels.join(", ")}`,
        countItems(studyData.semanticContinuity) ? `Semantic continuity records available: ${countItems(studyData.semanticContinuity)}` : "",
        countItems(studyData.ontologyRoles) ? `Ontology role records available: ${countItems(studyData.ontologyRoles)}` : "",
        countItems(scopedSemanticRecords(studyData.principleRelationships)) ? `Principle relationship records available in ${currentStudyScopeLabel()}: ${countItems(scopedSemanticRecords(studyData.principleRelationships))}` : "",
        countItems(scopedSemanticRecords(studyData.characterInteractions)) ? `Character interaction records available in ${currentStudyScopeLabel()}: ${countItems(scopedSemanticRecords(studyData.characterInteractions))}` : ""
      ]),
      confidence: hasChapter(5) && countItems(scopedSemanticRecords(studyData.teachingSemantics)) ? "probable" : "possible",
      sourceGrounding: range.isContiguous ? "Review layer uses analyzed page history plus currently stored continuity, ontology, principle relationship, character interaction, authority path, relationship role, and teaching records. It does not crawl or infer unanalyzed pages." : "Review layer uses selected analyzed pages only. Missing intermediate pages are not analyzed and are not included in the continuity review."
    }];
  }
  function knowledgeGraphRecords() {
    const stored = scopedSemanticRecords(studyData.knowledgeGraph);
    if (stored.length) return stored;
    const records = [];
    const byNode = new Map();
    const chapterScope = currentStudyScopeLabel();
    const sessionReview = sessionContinuityReviewRecords()[0] || null;
    const sessionScope = sessionReview?.sessionRange || chapterScope;
    const uniquePush = (target, field, values) => {
      asArray(values).map((value) => normalizeText(value)).filter(Boolean).forEach((value) => {
        if (!target[field].includes(value)) target[field].push(value);
      });
    };
    const addNode = (node, type, update = {}) => {
      const label = normalizeText(node);
      if (!label) return;
      const key = `${type}|${label}`.toLowerCase();
      if (!byNode.has(key)) {
        byNode.set(key, {
          id: `knowledge-graph-${key.replace(/[^a-z0-9]+/g, "-")}`,
          node: label,
          type,
          relationships: [],
          relatedNodes: [],
          relatedPrinciples: [],
          sourcePhrase: "",
          derivedMeaning: "",
          chapterScope,
          sessionScope,
          evidence: [],
          confidence: "probable",
          sourceGrounding: "derived from existing source-grounded semantic layers"
        });
      }
      const item = byNode.get(key);
      uniquePush(item, "relationships", update.relationships || []);
      uniquePush(item, "relatedNodes", update.relatedNodes || []);
      uniquePush(item, "relatedPrinciples", update.relatedPrinciples || []);
      uniquePush(item, "evidence", update.evidence || []);
      if (update.sourcePhrase && !item.sourcePhrase) item.sourcePhrase = update.sourcePhrase;
      if (update.derivedMeaning && !item.derivedMeaning) item.derivedMeaning = update.derivedMeaning;
      if (update.confidence === "explicit" || item.confidence !== "explicit") item.confidence = update.confidence || item.confidence;
      if (update.sourceGrounding) item.sourceGrounding = update.sourceGrounding;
    };

    scopedSemanticRecords(studyData.characterInteractions).forEach((interaction) => {
      const source = interaction.sourceCharacter || "";
      const target = interaction.targetCharacter || "";
      const type = /multitudes|people|disciples|wise men/i.test(source) ? "Group / Character" : /THE LORD|JESUS|HOLY SPIRIT/i.test(source) ? "Authority / Character" : "Character";
      addNode(source, type, {
        relationships: [`${interaction.interactionType || "interacts with"} -> ${target}`],
        relatedNodes: [target],
        sourcePhrase: interaction.sourcePhrase,
        derivedMeaning: interaction.derivedMeaning,
        evidence: interaction.evidence,
        confidence: interaction.confidence,
        sourceGrounding: interaction.sourceGrounding
      });
    });
    scopedSemanticRecords(studyData.principleRelationships).forEach((relationship) => {
      const related = asArray(relationship.relatedPrinciples);
      addNode(relationship.principle, "Principle", {
        relationships: related.map((item) => `${relationship.relationshipType || "related"} -> ${item}`),
        relatedNodes: related,
        relatedPrinciples: related,
        sourcePhrase: relationship.sourcePhrase,
        derivedMeaning: relationship.derivedMeaning,
        evidence: relationship.evidence,
        confidence: relationship.confidence,
        sourceGrounding: relationship.sourceGrounding
      });
    });
    scopedSemanticRecords(studyData.teachingSemantics).forEach((teaching) => {
      const topic = teaching.teachingTopic || teaching.blessing || teaching.commandment || teaching.principle || teaching.discourseType || "Teaching / Discourse";
      const relatedPrinciples = [teaching.principle, teaching.blessing, teaching.commandment, teaching.promise, teaching.warning].map((value) => normalizeText(value)).filter(Boolean);
      addNode(topic, "Teaching", {
        relationships: relatedPrinciples.map((item) => `teaches / frames -> ${item}`),
        relatedNodes: [teaching.speaker, teaching.audience, ...relatedPrinciples],
        relatedPrinciples,
        sourcePhrase: teaching.sourcePhrase,
        derivedMeaning: teaching.derivedMeaning,
        evidence: teaching.evidence,
        confidence: teaching.confidence,
        sourceGrounding: teaching.sourceGrounding
      });
    });
    if (sessionReview) {
      addNode(sessionReview.sessionRange, "Session Scope", {
        relationships: [
          ...asArray(sessionReview.continuingCharacters).map((item) => `continues character -> ${item}`),
          ...asArray(sessionReview.continuingPrincipleFamilies).map((item) => `continues principle family -> ${item}`)
        ],
        relatedNodes: [...asArray(sessionReview.continuingCharacters), ...asArray(sessionReview.continuingThemes)],
        relatedPrinciples: sessionReview.continuingPrincipleFamilies,
        sourcePhrase: sessionReview.sourcePhrase,
        derivedMeaning: sessionReview.derivedMeaning,
        evidence: sessionReview.evidence,
        confidence: sessionReview.confidence,
        sourceGrounding: sessionReview.sourceGrounding
      });
    }
    byNode.forEach((item) => {
      if (item.relationships.length || item.relatedNodes.length) records.push({
        ...item,
        relationships: item.relationships.slice(0, 12),
        relatedNodes: item.relatedNodes.slice(0, 12),
        relatedPrinciples: item.relatedPrinciples.slice(0, 8),
        evidence: item.evidence.slice(0, 8)
      });
    });
    return records.slice(0, 80);
  }
  function suggestedNextPageLabel(page) {
    if (!page) return "Analyze another source page when ready";
    const book = pageBookName(page);
    const chapter = pageChapterNumber(page);
    if (book && chapter) return book + " " + (chapter + 1);
    return "Choose the next source page manually";
  }

  function suggestedNextPageLine(activePage, scope) {
    if (activePage && pageChapterNumber(activePage)) {
      return "Active source " + volumePageLabel(activePage) + " -> " + suggestedNextPageLabel(activePage);
    }
    if (scope?.end && pageChapterNumber(scope.end)) {
      return "Latest analyzed " + volumePageLabel(scope.end) + " -> " + suggestedNextPageLabel(scope.end);
    }
    return suggestedNextPageLabel(activePage || scope?.end);
  }

  function queueSummarySessionTypeLabel(range, analyzedPages = []) {
    const count = asArray(analyzedPages).length;
    if (!range || !count) return "No analyzed pages";
    if (count < 2 || range.count < 2) return "Single Page";
    return range.isContiguous ? "Contiguous Range" : "Non-Contiguous Selection";
  }

  function queueSummarySuggestedNextLine(activePage, range) {
    const missing = asArray(range?.missingLabels).map((label) => normalizeText(label)).filter(Boolean);
    if (missing.length) return missing[0];
    const seed = range?.end || activePage || null;
    const target = pageNavigationTarget(seed || {}, 1);
    if (target?.label) return target.label;
    return suggestedNextPageLabel(seed);
  }

  function queueSummaryContinuityLines(analyzedPages = []) {
    const lines = sortedAnalyzedPages(analyzedPages)
      .map((page) => {
        const target = pageNavigationTarget(page, 1);
        return target?.label ? `${volumePageLabel(page)} -> ${target.label}` : "";
      })
      .filter(Boolean);
    return lines.length ? lines : ["None yet"];
  }

  function queueSummaryBoundaryLine(range, analyzedPages = []) {
    if (!asArray(analyzedPages).length) return "No analyzed pages are available for study opportunities yet.";
    if (range && !range.isContiguous) return "Selected analyzed pages only; missing intermediate pages are opportunities, not analyzed scope.";
    return "Uses canonical analyzed pages from Study Scope; informational only.";
  }

  function queueSummaryRows() {
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const analyzedLabels = sortedAnalyzedPages(analyzedPages).map(volumePageLabel).filter(Boolean);
    const missingLabels = asArray(range?.missingLabels).map((label) => normalizeText(label)).filter(Boolean);
    return [
      ["Current Active Page", activePage ? volumePageLabel(activePage) : "No active source page selected"],
      ["Analyzed Pages", analyzedLabels.length ? analyzedLabels.join("\n") : "None"],
      ["Session Type", queueSummarySessionTypeLabel(range, analyzedPages)],
      ["Missing Pages Between Analyzed Pages", missingLabels.length ? missingLabels.join("\n") : "None"],
      ["Suggested Next", queueSummarySuggestedNextLine(activePage, range)],
      ["Available Continuity Links", queueSummaryContinuityLines(analyzedPages).join("\n")],
      ["Selected Cross-reference Pages", crossReferenceSetLine()],
      ["Queue State", analysisQueueSummaryLine()],
      ["Queue Result Summaries", analysisQueuePageSummaryLine()],
      ["Boundary", queueSummaryBoundaryLine(range, analyzedPages)],
      ["Provenance", "Derived from Study Scope canonical analyzed page markers, the separate cross-reference set, and lightweight queue summaries. This section does not analyze, select, crawl, or modify scope."]
    ];
  }

  function queueSummarySearchText() {
    return queueSummaryRows().map(([label, value]) => `${label} ${value}`).join(" ");
  }
  function sourcePageUrl(page = {}) {
    return normalizeText(page.activeUrl || page.url || page.sourceUrl || "");
  }

  function pageNavigationTarget(page = {}, delta = 0) {
    const chapter = pageChapterNumber(page);
    const targetChapter = chapter + delta;
    if (!chapter || targetChapter < 1) return null;
    const url = sourcePageUrl(page);
    if (!url) return null;
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/");
      const chapterIndex = parts.findIndex((part) => part === String(chapter));
      if (chapterIndex < 0) return null;
      parts[chapterIndex] = String(targetChapter);
      parsed.pathname = parts.join("/");
      parsed.hash = "";
      const book = pageBookName(page) || "Page";
      return {
        label: `${book} ${targetChapter}`,
        url: parsed.toString(),
        page: {
          ...page,
          pageKey: `${book.toLowerCase()}|${targetChapter}|${book.toLowerCase()} ${targetChapter}|${parsed.toString().toLowerCase()}`,
          sourceCaptureId: "",
          sourceCaptureChapter: String(targetChapter),
          chapter: String(targetChapter),
          sourceTitle: `${book} ${targetChapter}`,
          title: `${book} ${targetChapter}`,
          activeUrl: parsed.toString(),
          url: parsed.toString(),
          analyzedAt: ""
        }
      };
    } catch (_error) {
      return null;
    }
  }

  function suggestedNextPageTarget(activePage, scope) {
    return pageNavigationTarget(activePage || scope?.end || {}, 1);
  }

  function analyzedPageKeySet(analyzedPages = analyzedPageHistory()) {
    return new Set(asArray(analyzedPages).map((page) => page.pageKey || pageRecordKey(page)).filter(Boolean));
  }

  function pageRecordFromCrossReferenceRecord(record = {}) {
    if (!record?.canonicalKey && !record?.url) return null;
    const page = {
      sourceCaptureId: "",
      sourceTitle: record.label || [record.book, record.chapter].filter(Boolean).join(" ") || "Selected page",
      sourceCaptureBook: record.book || "",
      sourceCaptureChapter: record.chapter || "",
      activeUrl: record.url || "",
      activeAdapterName: "lds_scripture_adapter",
      analyzedAt: record.analyzedAt || "",
      updatedAt: record.addedAt || "",
      pageKey: record.canonicalKey || record.id || ""
    };
    return validSourcePageRecord(page) ? page : null;
  }

  function crossReferenceRecordFromPage(page = {}, analyzedPages = analyzedPageHistory(), existing = {}) {
    const book = pageBookName(page);
    const chapter = normalizeText(page.sourceCaptureChapter || page.chapter || "");
    const url = normalizeText(page.activeUrl || page.url || "");
    const label = volumePageLabel(page);
    if (!book || !chapter || !url) return null;
    const canonicalKey = page.pageKey || pageRecordKey(page);
    const analyzedPage = asArray(analyzedPages).find((candidate) => (candidate.pageKey || pageRecordKey(candidate)) === canonicalKey) || null;
    const analyzed = Boolean(analyzedPage);
    return {
      id: canonicalKey,
      label,
      url,
      book,
      chapter: String(chapter),
      canonicalKey,
      addedAt: existing.addedAt || page.addedAt || new Date().toISOString(),
      source: existing.source || "manual",
      analyzed,
      analyzedAt: analyzedPage?.analyzedAt || page.analyzedAt || "",
      analysisPageKey: analyzed ? canonicalKey : ""
    };
  }

  function crossReferenceSetRecords(records = studyData.crossReferenceSet, analyzedPages = analyzedPageHistory()) {
    return asArray(records)
      .map((record) => {
        const page = pageRecordFromCrossReferenceRecord(record);
        return page ? crossReferenceRecordFromPage(page, analyzedPages, record) : null;
      })
      .filter(Boolean)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.canonicalKey === item.canonicalKey) === index)
      .sort((left, right) => pageBookName(pageRecordFromCrossReferenceRecord(left)).localeCompare(pageBookName(pageRecordFromCrossReferenceRecord(right))) || Number(left.chapter || 0) - Number(right.chapter || 0));
  }

  function crossReferenceSetPages(records = studyData.crossReferenceSet) {
    return crossReferenceSetRecords(records).map(pageRecordFromCrossReferenceRecord).filter(Boolean);
  }

  function crossReferenceStatusLine(records = crossReferenceSetRecords()) {
    if (!records.length) return "No selected pages.";
    return records.map((record) => `${record.label}: ${record.analyzed ? "Analyzed" : "Not analyzed yet"}`).join("\n");
  }

  function crossReferenceSetLine(records = studyData.crossReferenceSet) {
    const selected = crossReferenceSetRecords(records);
    const pages = selected.map(pageRecordFromCrossReferenceRecord).filter(Boolean);
    if (!pages.length) return "No cross-reference pages selected yet.";
    const scope = selectedSessionScopeFromPages(pages);
    if (!scope) return "No cross-reference pages selected yet.";
    const missingAnalysis = selected.filter((record) => !record.analyzed).map((record) => record.label);
    const status = crossReferenceStatusLine(selected).replace(/\n/g, "; ");
    const missingAnalysisLine = missingAnalysis.length ? ` Missing from analysis: ${missingAnalysis.join(", ")}.` : "";
    return scope.isContiguous
      ? `Cross-reference selected pages: ${scope.sessionLabel}. ${status}.${missingAnalysisLine}`
      : `Cross-reference set: ${scope.labels.join(" + ")} (non-contiguous selected pages; missing intermediate pages are not selected/analyzed: ${scope.missingLabels.join(", ") || "none"}). ${status}.${missingAnalysisLine}`;
  }
  function validQueueStatus(value = "pending") {
    return ["pending", "running", "done", "failed", "skipped"].includes(value) ? value : "pending";
  }

  function analysisQueueRecords(records = studyData.analysisQueue) {
    return asArray(records)
      .map((item) => ({
        id: normalizeText(item.id || item.canonicalKey || item.url || ""),
        label: normalizeText(item.label || [item.book, item.chapter].filter(Boolean).join(" ") || item.url || "Queued page"),
        url: normalizeText(item.url || ""),
        book: normalizeText(item.book || ""),
        chapter: normalizeText(item.chapter || ""),
        canonicalKey: normalizeText(item.canonicalKey || item.id || ""),
        status: validQueueStatus(item.status),
        attempts: Number.isFinite(Number(item.attempts)) ? Number(item.attempts) : 0,
        error: normalizeText(item.error || ""),
        queuedAt: normalizeText(item.queuedAt || ""),
        startedAt: normalizeText(item.startedAt || ""),
        completedAt: normalizeText(item.completedAt || ""),
        failedAt: normalizeText(item.failedAt || ""),
        lastAttemptedUrl: normalizeText(item.lastAttemptedUrl || ""),
        expectedCanonicalKey: normalizeText(item.expectedCanonicalKey || item.canonicalKey || ""),
        actualAnalyzedCanonicalKey: normalizeText(item.actualAnalyzedCanonicalKey || ""),
        source: ["range", "book", "volume", "manual"].includes(item.source) ? item.source : "manual"
      }))
      .filter((item) => item.url && item.book && item.chapter && item.canonicalKey)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.canonicalKey === item.canonicalKey) === index)
      .sort((left, right) => Number(left.chapter || 0) - Number(right.chapter || 0) || left.label.localeCompare(right.label));
  }

  function analysisQueueStatus() {
    const status = studyData.analysisQueueStatus || {};
    if (!status || typeof status !== "object" || Array.isArray(status)) return { state: "idle" };
    return {
      state: ["idle", "running", "paused", "canceled", "complete"].includes(status.state) ? status.state : "idle",
      currentItemId: normalizeText(status.currentItemId || ""),
      message: normalizeText(status.message || ""),
      updatedAt: normalizeText(status.updatedAt || ""),
      startedAt: normalizeText(status.startedAt || ""),
      pausedAt: normalizeText(status.pausedAt || ""),
      canceledAt: normalizeText(status.canceledAt || "")
    };
  }

  function queueItemPageRecord(item = {}) {
    if (!item?.url || !item.book || !item.chapter) return null;
    return {
      sourceCaptureId: "",
      sourceTitle: item.label || `${item.book} ${item.chapter}`,
      sourceCaptureBook: item.book,
      sourceCaptureChapter: String(item.chapter),
      activeUrl: item.url,
      activeAdapterName: "lds_scripture_adapter",
      pageKey: item.canonicalKey || ""
    };
  }

  function currentQueueItem(records = analysisQueueRecords(), status = analysisQueueStatus()) {
    return records.find((item) => item.id === status.currentItemId || item.canonicalKey === status.currentItemId) ||
      records.find((item) => item.status === "running") ||
      records.find((item) => item.status === "pending") ||
      null;
  }

  function firstPendingQueueItem(records = analysisQueueRecords()) {
    return records.find((item) => item.status === "pending") || null;
  }

  function nextPendingQueueItem(records = analysisQueueRecords(), currentId = analysisQueueStatus().currentItemId) {
    const pending = records.filter((item) => item.status === "pending");
    if (!pending.length) return null;
    const currentIndex = records.findIndex((item) => item.id === currentId || item.canonicalKey === currentId);
    if (currentIndex < 0) return pending[0];
    return pending.find((item) => records.indexOf(item) > currentIndex) || pending[0];
  }

  function updateQueueItem(records = analysisQueueRecords(), itemId = "", patch = {}) {
    return records.map((item) => (item.id === itemId || item.canonicalKey === itemId)
      ? { ...item, ...patch }
      : item);
  }

  function analysisQueueCounts(records = analysisQueueRecords()) {
    return records.reduce((counts, item) => {
      counts.total += 1;
      counts[item.status] = (counts[item.status] || 0) + 1;
      return counts;
    }, { total: 0, pending: 0, running: 0, done: 0, failed: 0, skipped: 0 });
  }

  function analysisQueueSummaryLine(records = analysisQueueRecords(), status = analysisQueueStatus()) {
    const counts = analysisQueueCounts(records);
    if (!counts.total) return "No analysis queue built. Nothing will run until a queue is built and Start queue is clicked.";
    return `Queue ${status.state}: ${counts.total} item(s), ${counts.pending} pending, ${counts.done} done, ${counts.failed} failed, ${counts.skipped} skipped. Phase 2A manual runner; no automatic crawling.`;
  }

  function analysisQueueManifest(records = analysisQueueRecords(), source = "range") {
    const counts = analysisQueueCounts(records);
    const labels = records.map((item) => item.label);
    return {
      id: records.length ? `queue-${Date.now()}` : "",
      source,
      total: counts.total,
      pending: counts.pending,
      running: counts.running,
      done: counts.done,
      failed: counts.failed,
      skipped: counts.skipped,
      firstLabel: labels[0] || "",
      lastLabel: labels[labels.length - 1] || "",
      labels,
      updatedAt: new Date().toISOString(),
      phase: "scaffold"
    };
  }

  function analysisQueueHistoryEvent(action, message) {
    return { action, message, at: new Date().toISOString(), phase: "scaffold" };
  }

  function queueItemFromPage(page = {}, source = "range", queuedAt = new Date().toISOString()) {
    if (!validSourcePageRecord(page)) return null;
    const label = volumePageLabel(page);
    const canonicalKey = page.pageKey || pageRecordKey(page);
    return {
      id: `${source}:${canonicalKey}`,
      label,
      url: sourcePageUrl(page),
      book: pageBookName(page),
      chapter: String(pageChapterNumber(page)),
      canonicalKey,
      status: "pending",
      attempts: 0,
      error: "",
      queuedAt,
      startedAt: "",
      completedAt: "",
      failedAt: "",
      lastAttemptedUrl: "",
      expectedCanonicalKey: canonicalKey,
      actualAnalyzedCanonicalKey: "",
      source
    };
  }

  function queueCandidatePageForChapter(seedPage = {}, chapter) {
    const seedChapter = pageChapterNumber(seedPage);
    if (!seedChapter || !chapter) return null;
    const target = pageNavigationTarget(seedPage, Number(chapter) - seedChapter);
    return target?.page || null;
  }

  function selectedRangeQueueCandidate() {
    const analyzedPages = analyzedPageHistory();
    const scope = selectedRangeFromAnalyzedPages(analyzedPages);
    const activePage = activeSourcePageRecord();
    const seed = scope?.start || activePage;
    if (!seed || !validSourcePageRecord(seed)) return { items: [], reason: "No supported LDS source page is available for queue building." };
    const book = pageBookName(seed);
    if (book !== "Matthew") return { items: [], reason: "Phase 1 queue building is limited to supported LDS Matthew pages." };
    const startChapter = pageChapterNumber(scope?.start || seed);
    const endChapter = pageChapterNumber(scope?.end || seed);
    if (!startChapter || !endChapter) return { items: [], reason: "No selected range start/end chapter is available." };
    const min = Math.min(startChapter, endChapter);
    const max = Math.max(startChapter, endChapter);
    const queuedAt = new Date().toISOString();
    const items = [];
    for (let chapter = min; chapter <= max; chapter += 1) {
      const page = queueCandidatePageForChapter(seed, chapter);
      const item = page ? queueItemFromPage(page, "range", queuedAt) : null;
      if (item) items.push(item);
    }
    if (!items.length) return { items: [], reason: "No supported queue items could be built for the selected range." };
    return { items, reason: "" };
  }

  function analysisQueueDetailsLine(records = analysisQueueRecords()) {
    if (!records.length) return "Queue is empty.";
    return records.map((item) => `${item.label}: ${item.status}${item.error ? ` (${item.error})` : ""}`).join("\n");
  }

  function limitedText(value = "", maxLength = 500) {
    return trimText(value, maxLength);
  }

  function analysisQueuePageSummaries(records = studyData.analysisQueuePageSummaries) {
    const rawRecords = Array.isArray(records)
      ? records
      : (records && typeof records === "object" ? Object.values(records) : []);
    const seen = new Set();
    return rawRecords
      .map((item) => ({
        schemaVersion: 1,
        id: normalizeText(item.id || item.canonicalKey || item.queueItemId || ""),
        canonicalKey: normalizeText(item.canonicalKey || ""),
        queueItemId: normalizeText(item.queueItemId || ""),
        label: normalizeText(item.label || item.canonicalKey || item.queueItemId || "Queued page"),
        url: normalizeText(item.url || ""),
        book: normalizeText(item.book || ""),
        chapter: normalizeText(item.chapter || ""),
        source: normalizeText(item.source || "queue") || "queue",
        status: ["done", "failed"].includes(item.status) ? item.status : "done",
        analyzedAt: normalizeText(item.analyzedAt || ""),
        updatedAt: normalizeText(item.updatedAt || ""),
        failedAt: normalizeText(item.failedAt || ""),
        adapter: normalizeText(item.adapter || ""),
        analysisTarget: item.analysisTarget && typeof item.analysisTarget === "object" && !Array.isArray(item.analysisTarget) ? item.analysisTarget : {},
        counts: item.counts && typeof item.counts === "object" && !Array.isArray(item.counts) ? item.counts : {},
        primaryEntities: asArray(item.primaryEntities).map((value) => normalizeText(value)).filter(Boolean).slice(0, 8),
        chapterType: normalizeText(item.chapterType || ""),
        attempts: Number.isFinite(Number(item.attempts)) ? Number(item.attempts) : 0,
        error: limitedText(item.error || "", 500),
        expectedCanonicalKey: normalizeText(item.expectedCanonicalKey || ""),
        actualAnalyzedCanonicalKey: normalizeText(item.actualAnalyzedCanonicalKey || "")
      }))
      .filter((item) => item.id)
      .filter((item) => {
        const key = item.canonicalKey || item.id;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((left, right) => Number(left.chapter || 0) - Number(right.chapter || 0) || left.label.localeCompare(right.label));
  }

  function queuePageSummaryCounts() {
    const status = studyData.analysisStatus || {};
    const derivedLayerCounts = status.derivedLayerCounts || {};
    const statusCount = (key, fallback) => Number.isFinite(Number(status[key])) ? Number(status[key]) : fallback;
    return {
      entities: statusCount("entityRegistryCount", countItems(studyData.entityRegistry)),
      mentions: statusCount("mentionCount", countItems(studyData.mentionIndex)),
      semanticEvents: statusCount("semanticEventCount", countItems(studyData.semanticEvents)),
      relationships: statusCount("relationshipGraphCount", countItems(studyData.relationshipGraph)),
      passageFunctions: statusCount("passageFunctionCount", countItems(studyData.passageFunctions)),
      referenceGraph: statusCount("referenceGraphCount", countItems(studyData.referenceGraph)),
      sourceDiscovery: statusCount("sourceDiscoveryCount", countItems(studyData.sourceDiscoveryIndex)),
      domHints: statusCount("domHintCount", countItems(studyData.domSemanticHints)),
      coverageLayers: Object.values(derivedLayerCounts).filter((value) => Number(value) > 0).length || layerCountPairs().filter(([, value]) => Number(value) > 0).length
    };
  }

  function queuePagePrimaryEntities(limit = 8) {
    const names = [];
    const seen = new Set();
    for (const item of [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]) {
      const name = entityDisplayNameFromRecord(item);
      const key = name.toLowerCase();
      if (!name || seen.has(key)) continue;
      seen.add(key);
      names.push(name);
      if (names.length >= limit) break;
    }
    return names;
  }

  function queuePageAnalysisTarget(status = studyData.analysisStatus || {}) {
    const marker = studyData.canonicalAnalysisTarget || {};
    return {
      pageKey: normalizeText(marker.pageKey || analyzedCanonicalKeyFromStatus(status) || ""),
      captureId: normalizeText(marker.captureId || marker.sourceCaptureId || status.sourceCaptureId || studyData.latestCapture?.id || ""),
      title: normalizeText(marker.title || marker.sourceTitle || status.sourceCaptureTitle || studyData.latestCapture?.title || ""),
      book: normalizeText(marker.book || marker.sourceCaptureBook || status.sourceCaptureBook || ""),
      chapter: normalizeText(marker.chapter || marker.sourceCaptureChapter || status.sourceCaptureChapter || ""),
      url: normalizeText(marker.url || marker.activeUrl || status.activeUrl || studyData.latestCapture?.url || "")
    };
  }

  function queuePageDoneSummary(item = {}, verified = {}) {
    const status = studyData.analysisStatus || {};
    const canonicalKey = normalizeText(item.canonicalKey || verified.actualKey || "");
    const now = new Date().toISOString();
    return {
      schemaVersion: 1,
      id: canonicalKey,
      canonicalKey,
      queueItemId: item.id || "",
      label: item.label || canonicalKey || "Queued page",
      url: item.url || "",
      book: item.book || "",
      chapter: item.chapter || "",
      source: "queue",
      status: "done",
      analyzedAt: normalizeText(status.analyzedAt || now),
      updatedAt: now,
      adapter: normalizeText(studyData.activeAdapter?.adapterName || status.activeAdapterName || ""),
      analysisTarget: queuePageAnalysisTarget(status),
      counts: queuePageSummaryCounts(),
      primaryEntities: queuePagePrimaryEntities(8),
      chapterType: activeChapterType(),
      error: ""
    };
  }

  function queuePageFailedSummary(item = {}, message = "", actualKey = "") {
    const now = new Date().toISOString();
    const canonicalKey = normalizeText(item.canonicalKey || "");
    return {
      schemaVersion: 1,
      id: canonicalKey || item.id || "",
      canonicalKey,
      queueItemId: item.id || "",
      label: item.label || canonicalKey || item.id || "Queued page",
      url: item.url || "",
      book: item.book || "",
      chapter: item.chapter || "",
      source: "queue",
      status: "failed",
      attempts: Number.isFinite(Number(item.attempts)) ? Number(item.attempts) : 0,
      failedAt: now,
      updatedAt: now,
      error: limitedText(message, 500),
      expectedCanonicalKey: item.canonicalKey || "",
      actualAnalyzedCanonicalKey: actualKey || ""
    };
  }

  async function writeQueuePageSummary(summary = {}) {
    const key = normalizeText(summary.canonicalKey || summary.id || summary.queueItemId || "");
    if (!key) return;
    const summaries = analysisQueuePageSummaries();
    const nextSummaries = [summary, ...summaries.filter((item) => (item.canonicalKey || item.id) !== key)].slice(0, 250);
    studyData.analysisQueuePageSummaries = nextSummaries;
    await chrome.storage.local.set({ [STORAGE_KEYS.analysisQueuePageSummaries]: nextSummaries });
  }

  function analysisQueuePageSummaryLine(summaries = analysisQueuePageSummaries()) {
    if (!summaries.length) return "No queue page summaries recorded yet.";
    const done = summaries.filter((item) => item.status === "done").length;
    const failed = summaries.filter((item) => item.status === "failed").length;
    return `${summaries.length} page summary record(s): ${done} done, ${failed} failed. Summaries are lightweight; full semantic records remain latest/global.`;
  }

  function analysisQueuePageSummaryDetails(summaries = analysisQueuePageSummaries()) {
    if (!summaries.length) return "No queue page summaries recorded yet.";
    return summaries.slice(0, 12).map((item) => {
      if (item.status === "failed") {
        return `${item.label}: failed (${item.error || "No error recorded"}) expected ${item.expectedCanonicalKey || "unknown"}; actual ${item.actualAnalyzedCanonicalKey || "none"}`;
      }
      const counts = item.counts || {};
      const primary = asArray(item.primaryEntities).length ? ` | Primary: ${asArray(item.primaryEntities).join(", ")}` : "";
      return `${item.label}: done | entities ${counts.entities || 0}, mentions ${counts.mentions || 0}, events ${counts.semanticEvents || 0}, relationships ${counts.relationships || 0}, coverage layers ${counts.coverageLayers || 0}${primary}`;
    }).join("\n");
  }

  function pageChipLines(pages = []) {
    return pages.map((page) => `[${volumePageLabel(page)}]`);
  }


  function exportPlainText(value = "", limit = 6500) {
    const ascii = String(value || "")
      .replace(/[\u2190\u2192\u2194]/g, "->")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\u00a0/g, " ")
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (ascii.length <= limit) return ascii;
    return `${ascii.slice(0, limit).trim()}\n\n[compressed: ${ascii.length - limit} additional character(s) omitted]`;
  }

  function exportLine(label, value) {
    return `${label}: ${normalizeText(value || "Not recorded")}`;
  }

  function layerCountPairs() {
    return [
      ["DOM hints", countItems(studyData.domSemanticHints)],
      ["Mention index", countItems(studyData.mentionIndex)],
      ["Source Discovery", countItems(studyData.sourceDiscoveryIndex)],
      ["Reference Graph", countItems(studyData.referenceGraph)],
      ["Passage Functions", countItems(studyData.passageFunctions)],
      ["Revelation Patterns", countItems(studyData.revelationPatterns)],
      ["Reference Roles", countItems(studyData.referenceRoles)],
      ["Ontology Roles", countItems(studyData.ontologyRoles)],
      ["Semantic Relationship Roles", countItems(studyData.entityRelationRoles)],
      ["Movement / Location", countItems(studyData.movementSemantics)],
      ["Semantic Causality", countItems(studyData.semanticCausality)],
      ["Teaching / Discourse", countItems(scopedSemanticRecords(studyData.teachingSemantics))],
      ["Principle Relationships", countItems(scopedSemanticRecords(studyData.principleRelationships))],
      ["Principle Networks", countItems(scopedSemanticRecords(studyData.principleNetworks))],
      ["Focus Lens", countItems(scopedSemanticRecords(studyData.focusLens))],
      ["Scope Lens", countItems(scopedSemanticRecords(studyData.scopeLens))],
      ["Depth Lens", countItems(scopedSemanticRecords(studyData.depthLens))],
      ["Character Interactions", countItems(scopedSemanticRecords(studyData.characterInteractions))],
      ["Study Progression", countItems(studyProgressionRecords())],
      ["Semantic Resolution Explanations", countItems(resolutionExplanationRecords())],
      ["Session Continuity Review", countItems(sessionContinuityReviewRecords())],
      ["Scripture Knowledge Graph", countItems(knowledgeGraphRecords())],
      ["Library Awareness", countItems(libraryAwarenessRecords())]
    ];
  }

  function compactLayerCountsLine() {
    return layerCountPairs().map(([label, value]) => `${label}: ${value}`).join(" | ");
  }

  function sourceIsolationWarningLines() {
    return asArray(studyData.analysisStatus?.sourceIsolationRejections)
      .map((item) => {
        const source = normalizeText(item.rejectedSource || item.sourceTitle || item.activeUrl || "browser page");
        if (!source) return "";
        return `Ignored non-source browser page: ${source}.`;
      })
      .filter(Boolean)
      .slice(0, 3);
  }

  function currentBrowserTabIgnoredLines() {
    const frozen = frozenAnalysisTargetRecord();
    const current = rawPageRecordFromCapture(studyData.latestCapture);
    if (!frozen || !current) return [];
    const frozenKey = pageRecordKey(frozen);
    const currentKey = pageRecordKey(current);
    if (frozenKey && currentKey === frozenKey) return [];
    if (!isExcludedBrowserPage(current) && validSourcePageRecord(current)) return [];
    const label = normalizeText(current.sourceTitle || current.activeUrl || "current browser tab");
    return [
      `Current browser tab ignored: ${label}.`,
      "Reason: active tab changed after analysis target was frozen."
    ];
  }

  function topWarningLines(activePage = activeSourcePageRecord()) {
    const warnings = [];
    const status = analysisStatusLabel(activePage);
    warnings.push(...sourceIsolationWarningLines());
    warnings.push(...currentBrowserTabIgnoredLines());
    if (/stale|cleared|not analyzed/i.test(status)) warnings.push(`Analysis status: ${status}`);
    if (!studyData.activeAdapter?.adapterName && !studyData.analysisStatus?.activeAdapterName) warnings.push("Adapter not detected in current session data.");
    if (/chrome-extension:.*study\.html|\/study\.html(?:$|[?#])/i.test(activePage?.activeUrl || "")) warnings.push("Stored active target appears to be Study Panel UI; source page should be selected before analysis.");
    if (countItems(studyData.sourceDiscoveryIndex) > 200) warnings.push("Source Discovery is large; compact exports omit raw lists by design.");
    if (countItems(studyData.referenceGraph) > 200) warnings.push("Reference Graph is large; compact exports omit raw edge dumps by design.");
    return warnings.slice(0, 5);
  }

  function majorEntityLines(limit = 10) {
    const seen = new Set();
    const values = [];
    const add = (name, role = "") => {
      const label = normalizeText([name, role].filter(Boolean).join(" - "));
      const key = label.toLowerCase();
      if (!label || seen.has(key)) return;
      seen.add(key);
      values.push(label);
    };
    asArray(studyData.ontologyRoles).forEach((item) => add(item.semanticItem || item.entityName || item.name, item.ontologyClass || item.classLabel || item.semanticRole));
    scopedSemanticRecords(studyData.teachingSemantics).forEach((item) => {
      add(item.speaker, "Speaker");
      add(item.canonicalIdentity, "Canonical/source identity");
      asArray(item.relatedEntities).forEach((entity) => add(entity));
    });
    return values.slice(0, limit);
  }

  function teachingSummaryLines(limit = 8) {
    return scopedSemanticRecords(studyData.teachingSemantics).slice(0, limit).map((item) => {
      const label = item.teachingTopic || item.blessing || item.commandment || item.principle || item.discourseType || "Teaching record";
      return `${label} | ${item.verseRange || item.scopePath || "current scope"} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }

  function principleRelationshipSummaryLines(limit = 6) {
    return scopedSemanticRecords(studyData.principleRelationships).slice(0, limit).map((item) => {
      const related = asArray(item.relatedPrinciples).slice(0, 3).join(", ");
      return `${item.principle || "Principle"} ${item.relationshipType || "related"} ${related || "related principles"} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }


  function principleNetworkSummaryLines(limit = 6) {
    return scopedSemanticRecords(studyData.principleNetworks).slice(0, limit).map((item) => {
      const related = asArray(item.relatedPrinciples).slice(0, 3).join(", ") || "related principles awaiting records";
      return `${item.corePrinciple || "Principle"} | Related: ${related} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }
  function characterInteractionSummaryLines(limit = 6) {
    return scopedSemanticRecords(studyData.characterInteractions).slice(0, limit).map((item) => {
      return `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${passageFunctionTitle(item.interactionType || "interaction")} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }
  function knowledgeGraphSummaryLines(limit = 6) {
    return knowledgeGraphRecords().slice(0, limit).map((item) => {
      const relations = asArray(item.relationships).slice(0, 2).join("; ") || "relationships awaiting grounded layers";
      return `${item.node || "Node"} | ${item.type || "Semantic Node"} | ${relations} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }

  function sessionContinuityReviewSummaryLines(limit = 5) {
    return sessionContinuityReviewRecords().slice(0, limit).map((item) => {
      const range = item.sessionRange || "Current session";
      const progression = asArray(item.teachingProgression).slice(0, 3).join("; ") || "progression awaiting grounded session records";
      return `${range} | ${progression} | ${displayConfidence(item.confidence || "probable")}`;
    });
  }

  function studyScopeExportLines() {
    const frozenTarget = frozenAnalysisTargetRecord();
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    return [
      exportLine("Frozen source target", frozenTarget ? volumePageLabel(frozenTarget) : "No frozen source target recorded"),
      exportLine("Active source page", activePage ? volumePageLabel(activePage) : "No active source page selected"),
      exportLine("Active URL", activePage?.activeUrl || studyData.analysisStatus?.activeUrl || studyData.latestCapture?.url || "Not recorded"),
      exportLine("Adapter", studyData.activeAdapter?.adapterName || activePage?.activeAdapterName || studyData.analysisStatus?.activeAdapterName || "not detected"),
      exportLine("Analysis status", analysisStatusLabel(activePage)),
      exportLine("Current session", range ? `${volumePageLabel(range.start)} -> ${volumePageLabel(range.end)}` : "No active study range"),
      exportLine("Analyzed pages", analyzedPages.length ? pageChipLines(analyzedPages).join(" ") : "none recorded"),
      exportLine("Continuity", continuitySummaryLines(activePage, analyzedPages).join("; ")),
      exportLine("Suggested next", suggestedNextPageLabel(range?.end || activePage)),
      exportLine("Last analyzed", studyData.analysisStatus?.analyzedAt || "Never"),
      ...currentBrowserTabIgnoredLines().map((line) => exportLine(line.startsWith("Reason:") ? "Source isolation reason" : "Current browser tab ignored", line))
    ];
  }

  function buildCompactPanelSummary() {
    const warnings = topWarningLines();
    return exportPlainText([
      "I.C.E. Compact Panel Summary",
      "",
      ...studyScopeExportLines(),
      exportLine("Derived layer counts", compactLayerCountsLine()),
      "",
      "Top issues / warnings:",
      ...(warnings.length ? warnings.map((line) => `- ${line}`) : ["- none detected in compact snapshot"]),
      "",
      "Major entities:",
      ...(majorEntityLines(10).map((line) => `- ${line}`)),
      "",
      "Teaching / passage summaries:",
      ...(teachingSummaryLines(8).map((line) => `- ${line}`)),
      "",
      "Principle relationships:",
      ...(principleRelationshipSummaryLines(6).map((line) => `- ${line}`)),
      "",
      "Principle networks:",
      ...(principleNetworkSummaryLines(6).map((line) => `- ${line}`))
    ].join("\n"), 5200);
  }

  function buildDiagnosticSnapshot() {
    return exportPlainText([
      "I.C.E. Diagnostic Snapshot",
      "",
      ...studyScopeExportLines(),
      exportLine("Source capture ID", studyData.analysisStatus?.sourceCaptureId || studyData.latestCapture?.id || "Not recorded"),
      exportLine("Analysis reason", studyData.analysisStatus?.reason || "None"),
      exportLine("Analysis build", studyData.analysisStatus?.analysisBuildMarker || "None"),
      exportLine("Builder scope", studyData.analysisStatus?.derivedBuildersScope || "None"),
      exportLine("Matthew 2 builders ran", String(Boolean(studyData.analysisStatus?.matthew2DerivedBuildersRan))),
      exportLine("Matthew 5 teaching builders ran", String(Boolean(studyData.analysisStatus?.matthew5TeachingBuildersRan))),
      exportLine("Derived layer counts", studyData.analysisStatus?.derivedLayerCounts ? Object.entries(studyData.analysisStatus.derivedLayerCounts).map(([key, value]) => `${key}: ${value}`).join(" | ") : compactLayerCountsLine()),
      exportLine("Scope integrity", `scoped: ${studyData.scopeIntegrity?.scopedItemsCount || 0}; missing: ${studyData.scopeIntegrity?.missingScopeCount || 0}`)
    ].join("\n"), 4200);
  }

  function relevantHandoffSection() {
    if (currentSemanticFocus?.targetSection) {
      const focused = document.getElementById(currentSemanticFocus.targetSection);
      const title = normalizeText(focused?.querySelector("h2")?.textContent || "");
      if (title) return title;
    }
    if (countItems(knowledgeGraphRecords()) > 0) return "Scripture Knowledge Graph";
    if (countItems(sessionContinuityReviewRecords()) > 0) return "Session Continuity Review";
    if (countItems(scopedSemanticRecords(studyData.teachingSemantics)) > 0) return "Teaching / Discourse Structure";
    if (countItems(studyData.principleNetworks) > 0) return "Principle Networks";
    if (countItems(scopedSemanticRecords(studyData.principleRelationships)) > 0) return "Principle Relationships";
    if (countItems(studyData.passageFunctions) > 0) return "Passage Functions";
    return "Current Study Panel section";
  }

  function handoffLayerCountLines() {
    return layerCountPairs()
      .filter(([, value]) => value > 0)
      .slice(0, 10)
      .map(([label, value]) => `${label}: ${value}`);
  }

  function topEvidenceLines(limit = 3) {
    const values = [];
    scopedSemanticRecords(studyData.teachingSemantics).forEach((item) => {
      const phrase = normalizeText(item.sourcePhrase || "");
      const meaning = normalizeText(item.derivedMeaning || "");
      if (phrase) values.push(`${phrase}${meaning ? ` | ${meaning}` : ""}`);
    });
    scopedSemanticRecords(studyData.principleRelationships).forEach((item) => {
      const related = asArray(item.relatedPrinciples).slice(0, 3).join(", ");
      if (item.principle) values.push(`${item.principle} ${item.relationshipType || "related"} ${related || "related principles"} | ${item.sourcePhrase || "source phrase not recorded"}`);
    });
    scopedSemanticRecords(studyData.principleNetworks).forEach((item) => {
      if (item.corePrinciple) values.push(`${item.corePrinciple} | ${asArray(item.relatedPrinciples).slice(0, 3).join(", ") || "principle network"} | ${item.sourcePhrase || "source phrase not recorded"}`);
    });
    scopedSemanticRecords(studyData.characterInteractions).forEach((item) => {
      if (item.sourceCharacter || item.targetCharacter) values.push(`${item.sourceCharacter || "source"} -> ${item.targetCharacter || "target"} | ${item.interactionType || "interaction"} | ${item.sourcePhrase || "source phrase not recorded"}`);
    });
    scopedSemanticRecords(studyData.knowledgeGraph).forEach((item) => {
      if (item.node) values.push(`${item.node} | ${asArray(item.relationships).slice(0, 2).join("; ") || "knowledge graph node"}`);
    });
    sessionContinuityReviewRecords().forEach((item) => {
      if (item.sessionRange) values.push(`${item.sessionRange} | ${asArray(item.teachingProgression).slice(0, 3).join("; ") || "session progression"}`);
    });
    asArray(studyData.passageFunctions).forEach((item) => {
      if (item.plainMeaning || item.sourcePhrase) values.push(`${item.passageFunction || "passage function"} | ${item.plainMeaning || item.sourcePhrase}`);
    });
    return values.slice(0, limit);
  }

  function suggestedReviewLines(section = relevantHandoffSection()) {
    if (/teaching|discourse/i.test(section)) {
      return [
        "check speaker resolution",
        "check audience classification",
        "check teaching block and source-text grounding",
        "check reference role filtering"
      ];
    }
    if (/knowledge graph/i.test(section)) {
      return [
        "check graph nodes reuse existing semantic layers",
        "check relationships are grounded",
        "check chapter and session scope",
        "check no visual graph assumptions are implied"
      ];
    }
    if (/session continuity/i.test(section)) {
      return [
        "check analyzed page selection or range",
        "check continuing characters are grounded",
        "check teaching progression does not include unanalyzed pages",
        "check continuity uses current semantic layers"
      ];
    }
    if (/principle/i.test(section)) {
      return [
        "check principle relationship type",
        "check related principles are grounded",
        "check source phrase vs derived meaning separation"
      ];
    }
    return [
      "check active source target",
      "check relevant semantic layer counts",
      "check source phrase vs derived meaning separation"
    ];
  }


  function markdownList(lines, fallback = "none recorded") {
    const values = asArray(lines).map((line) => normalizeText(line)).filter(Boolean);
    return values.length ? values.map((line) => `- ${line}`) : [`- ${fallback}`];
  }

  function semanticCoverageSummaryLines(limit = 8) {
    return semanticCoverageRows().slice(0, limit).map((row) => `${row.layer}: ${row.status} (${row.count} record(s))`);
  }

  function qaStyleSummaryLines() {
    return [
      `latestCapture: ${studyData.latestCapture ? 1 : 0}`,
      `domSemanticHints: ${countItems(studyData.domSemanticHints)}`,
      `sourceDiscovery: ${countItems(studyData.sourceDiscoveryIndex)}`,
      `referenceGraph: ${countItems(studyData.referenceGraph)}`,
      `teachingSemantics: ${countItems(scopedSemanticRecords(studyData.teachingSemantics))}`,
      `principleRelationships: ${countItems(scopedSemanticRecords(studyData.principleRelationships))}`,
      `principleNetworks: ${countItems(studyData.principleNetworks)}`,
      `characterInteractions: ${countItems(studyData.characterInteractions)}`,
      `sessionContinuityReview: ${countItems(sessionContinuityReviewRecords())}`,
      `knowledgeGraph: ${countItems(knowledgeGraphRecords())}`,
      `libraryAwareness: ${countItems(libraryAwarenessRecords())}`,
      `scopeMissing: ${studyData.scopeIntegrity?.missingScopeCount || 0}`
    ];
  }


  function currentReviewQuestion() {
    const section = relevantHandoffSection();
    if (/teaching|discourse/i.test(section)) return "Is the teaching/discourse structure resolving speaker, audience, teaching blocks, and grounding correctly?";
    if (/knowledge graph/i.test(section)) return "Does the Scripture Knowledge Graph connect existing semantic layers without fabricating relationships?";
    if (/session continuity/i.test(section)) return "Does the current study range preserve grounded continuity across analyzed pages without fabricating unanalyzed links?";
    if (/principle/i.test(section)) return "Are principle relationships grounded and classified with the right relationship type?";
    if (/movement/i.test(section)) return "Are movement/location records grounded to the active source and purpose?";
    return `Does the ${section} output match the active source and expected semantic layer behavior?`;
  }

  function userObservedIssuePlaceholder() {
    return "Not provided in Study Panel. Add the user's observed issue when handing this report to GPT/cdx.";
  }

  function majorUnclassifiedEntityLines(limit = 5) {
    return asArray(studyData.ontologyRoles)
      .filter((item) => /unclassified/i.test(`${item.ontologyClass || ""} ${item.classLabel || ""} ${item.semanticClass || ""}`))
      .map((item) => item.semanticItem || item.entityName || item.name || "unclassified entity")
      .filter(Boolean)
      .slice(0, limit);
  }

  function autoDetectedConcernLines(activePage = activeSourcePageRecord()) {
    const concerns = [...topWarningLines(activePage)];
    const pageLabel = activePage ? volumePageLabel(activePage) : "";
    const chapterType = activeChapterType();
    const unclassified = majorUnclassifiedEntityLines();
    if (unclassified.length) concerns.push(`Class Unclassified major entities: ${unclassified.join(", ")}`);
    if (/Teaching/i.test(chapterType) && countItems(scopedSemanticRecords(studyData.teachingSemantics)) === 0) concerns.push("Primary applicable layer has zero records: Teaching / Discourse Structure.");
    if (/movement|protection/i.test(chapterType) && countItems(studyData.movementSemantics) === 0) concerns.push("Primary applicable layer has zero records: Movement / Location Semantics.");
    if (/scripture|Matthew/i.test(pageLabel) && /generic_html_adapter/i.test(studyData.activeAdapter?.adapterName || studyData.analysisStatus?.activeAdapterName || "")) concerns.push("Generic adapter is active on a scripture-like source page.");
    if (analyzedPageHistory().length > 1 && countItems(studyData.semanticContinuity) === 0) concerns.push("Session spans multiple pages but continuity records are missing.");
    if (countItems(studyData.sourceDiscoveryIndex) > 250 || countItems(studyData.referenceGraph) > 250 || countItems(studyData.domSemanticHints) > 250) concerns.push("Large diagnostic sections are present; use compact report instead of raw panel paste.");
    return Array.from(new Set(concerns)).slice(0, 7);
  }

  function gptRecommendedReviewFocusLines() {
    return Array.from(new Set([
      ...suggestedReviewLines(relevantHandoffSection()),
      "check auto-detected concerns before requesting raw panel data",
      "use selected evidence before asking for Source Discovery or Reference Graph dumps"
    ])).slice(0, 6);
  }

  function repoContextLines() {
    return [
      "Current canonical anchor: available from git history / latest pcdx report",
      "Report generated by: GPT Review Mode",
      "Target QA command: npm.cmd run review:matthew5"
    ];
  }

  function buildGptReviewReport() {
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const reportTime = new Date().toISOString();
    return exportPlainText([
      "# I.C.E. GPT Review Report",
      "",
      "## Repo Context",
      ...repoContextLines(),
      "",
      "## Review Prompt",
      exportLine("Current Review Question", currentReviewQuestion()),
      exportLine("User Observed Issue", userObservedIssuePlaceholder()),
      "",
      "## Source",
      exportLine("Active source page", activePage ? volumePageLabel(activePage) : studyData.analysisStatus?.sourceCaptureTitle || "Not recorded"),
      exportLine("URL", activePage?.activeUrl || studyData.analysisStatus?.activeUrl || studyData.latestCapture?.url || "Not recorded"),
      exportLine("Adapter", studyData.activeAdapter?.adapterName || activePage?.activeAdapterName || studyData.analysisStatus?.activeAdapterName || "not detected"),
      exportLine("Analysis timestamp", studyData.analysisStatus?.analyzedAt || "Never"),
      exportLine("Report generated", reportTime),
      exportLine("Current page/chapter type", activeChapterType()),
      "",
      "## Study Scope",
      exportLine("Range", range ? `${volumePageLabel(range.start)} -> ${volumePageLabel(range.end)}` : "No active study range"),
      exportLine("Analyzed pages", analyzedPages.length ? analyzedPages.map(volumePageLabel).join(", ") : "none recorded"),
      exportLine("Continuity", continuitySummaryLines(activePage, analyzedPages).join("; ")),
      "",
      "## Layer Counts",
      ...layerCountPairs().map(([label, value]) => `${label}: ${value}`),
      "",
      "## Guided Study",
      ...markdownList(guidedStudySummaryLines(6), "no guided study suggestions available"),
      "",
      "## Study Progression",
      ...markdownList(studyProgressionSummaryLines(4), "no study progression records available"),
      "",
      "## Semantic Coverage",
      ...markdownList(semanticCoverageSummaryLines(10)),
      "",
      "## Scripture Knowledge Graph",
      ...markdownList(knowledgeGraphSummaryLines(6), "no knowledge graph records available"),
      "",
      "## Session Continuity Review",
      ...markdownList(sessionContinuityReviewSummaryLines(5), "no session continuity review records available"),
      "",
      "## Library Awareness",
      ...markdownList(libraryAwarenessSummaryLines(5), "no library awareness records available"),
      "",
      "## Top Concern Auto-Detection",
      ...markdownList(autoDetectedConcernLines(activePage), "none detected in compact review snapshot"),
      "",
      "## GPT Recommended Review Focus",
      ...markdownList(gptRecommendedReviewFocusLines()),
      "",
      "## Top Derived Sections",
      ...markdownList([
        ...teachingSummaryLines(6),
        ...principleRelationshipSummaryLines(5),
        ...characterInteractionSummaryLines(5),
        ...sessionContinuityReviewSummaryLines(5),
        ...knowledgeGraphSummaryLines(6)
      ], "no teaching/principle summaries available"),
      "",
      "## Selected Evidence",
      ...(topEvidenceLines(5).length ? topEvidenceLines(5).map((line, index) => `${index + 1}. ${line}`) : ["1. No compact evidence lines available."]),
      "",
      "## QA-Style Summary",
      ...qaStyleSummaryLines(),
      "",
      "## Excluded From This Report",
      "- full Source Discovery",
      "- full Reference Graph",
      "- huge DOM hints",
      "- full raw mention index",
      "",
      "## Review Notes",
      "This report is generated from local Study Panel data. GPT reviews this artifact; it does not control the browser or crawl pages."
    ].join("\n"), 6500);
  }

  function buildGptHandoffSummary() {
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const warnings = topWarningLines(activePage);
    const relevantSection = relevantHandoffSection();
    const evidence = topEvidenceLines(3);
    return exportPlainText([
      "I.C.E. GPT Handoff",
      "",
      "Active Source:",
      activePage ? volumePageLabel(activePage) : studyData.analysisStatus?.sourceCaptureTitle || "Not recorded",
      "URL:",
      activePage?.activeUrl || studyData.analysisStatus?.activeUrl || "Not recorded",
      "",
      "Study Scope:",
      range ? `${volumePageLabel(range.start)} -> ${volumePageLabel(range.end)}` : "No active study range",
      "Analyzed Pages:",
      analyzedPages.length ? analyzedPages.map(volumePageLabel).join(", ") : "none recorded",
      "",
      "Adapter:",
      studyData.activeAdapter?.adapterName || activePage?.activeAdapterName || studyData.analysisStatus?.activeAdapterName || "not detected",
      "",
      "Relevant Section:",
      relevantSection,
      "",
      "Observed Issue:",
      warnings.length ? warnings[0] : "User requested review of the relevant Study Panel section; no compact warning was detected.",
      "",
      "Likely Issue:",
      warnings.length ? "Study/session state may need targeted review before pasting larger panel data." : "Semantic output needs human review in the named section, using the compact evidence below.",
      "",
      "Layer Counts:",
      ...handoffLayerCountLines(),
      "",
      "Top Evidence:",
      ...(evidence.length ? evidence.map((line, index) => `${index + 1}. ${line}`) : ["1. No compact evidence lines available."]),
      "",
      "Suggested Review:",
      ...suggestedReviewLines(relevantSection).map((line) => `- ${line}`),
      "",
      "Data To Review:",
      `- ${relevantSection}`,
      "- Study Scope",
      "- Diagnostic Snapshot if target/session state is unclear",
      "",
      "Do Not Paste:",
      "- full Source Discovery",
      "- full Reference Graph",
      "- huge DOM hints",
      "- full raw mention index"
    ].join("\n"), 3200);
  }

  function currentSectionForExport() {
    if (currentSemanticFocus?.targetSection) {
      const focused = document.getElementById(currentSemanticFocus.targetSection);
      if (focused) return focused;
    }
    const sections = Array.from(document.querySelectorAll("main .study-section"));
    const headerBottom = document.querySelector(".study-header")?.getBoundingClientRect().bottom || 0;
    return sections.find((section) => section.getBoundingClientRect().bottom > headerBottom + 40) || sections[0] || null;
  }

  function buildCurrentSectionExport() {
    const section = currentSectionForExport();
    if (!section) return "I.C.E. Current Section\n\nNo Study Panel section is currently available.";
    const title = normalizeText(section.querySelector("h2")?.textContent || section.id || "Current section");
    const text = normalizeText(section.textContent || "No section text available.").replace(/\s+/g, " ");
    return exportPlainText([`I.C.E. Current Section: ${title}`, "", text].join("\n"), 3600);
  }

  async function copyPlainTextReport(kind, text) {
    const output = exportPlainText(text);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output);
      } else {
        const area = document.createElement("textarea");
        area.value = output;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      showDiagnosticMessage(`${kind} copied (${output.length} characters).`);
    } catch (error) {
      showDiagnosticMessage(`${kind} copy failed: ${error.message}`);
    }
  }

  async function handleExportAction(action) {
    const reports = {
      compact: ["Compact Panel Summary", buildCompactPanelSummary],
      section: ["Current Section", buildCurrentSectionExport],
      diagnostic: ["Diagnostic Snapshot", buildDiagnosticSnapshot]
    };
    const [label, builder] = reports[action] || [];
    if (!builder) return;
    await ensureFullStudyDataLoaded();
    copyPlainTextReport(label, builder());
  }
  function activeChapterNumber() {
    const scopePages = currentStudyScopePages();
    const scopedPage = scopePages.length ? scopePages[scopePages.length - 1] : null;
    const page = scopedPage || activeSourcePageRecord();
    return Number(page?.sourceCaptureChapter || page?.chapter || studyData.analysisStatus?.sourceCaptureChapter || 0);
  }

  function activeChapterType() {
    const scopePages = currentStudyScopePages();
    const scopedPage = scopePages.length ? scopePages[scopePages.length - 1] : null;
    const page = scopedPage || activeSourcePageRecord();
    const book = normalizeText(page?.sourceCaptureBook || studyData.analysisStatus?.sourceCaptureBook || "");
    const chapter = activeChapterNumber();
    if (/Matthew/i.test(book) && chapter === 1) return "Narrative-heavy";
    if (/Matthew/i.test(book) && chapter === 2) return "Narrative + movement + protection";
    if (/Matthew/i.test(book) && chapter === 5) return "Teaching / discourse heavy";
    if (/Matthew/i.test(book) && chapter === 3) return "Narrative + preaching + baptism context";
    return book && chapter ? "General source analysis" : "Unknown / no active source";
  }

  function coverageStatus({ count = 0, applicable = true, primary = false, future = false, pilot = false, sessionScoped = false } = {}) {
    if (future) return "Future layer";
    if (!applicable) return "Not applicable to current chapter";
    if (sessionScoped && analyzedPageHistory().length < 2) return "Available when session scope spans multiple pages";
    if (primary && count > 0) return "Primary semantic layer for this chapter; grounded records found";
    if (primary) return "Primary semantic layer for this chapter; awaiting grounding";
    if (count > 0) return pilot ? "Pilot layer; grounded records found" : "Implemented; grounded records found";
    return pilot ? "Pilot layer; no grounded records found" : "Implemented; no grounded records found";
  }

  function semanticCoverageRows() {
    const chapter = activeChapterNumber();
    const type = activeChapterType();
    const isNarrative = /Narrative/i.test(type);
    const isMovement = chapter === 2;
    const isTeaching = chapter === 5;
    return [
      {
        layer: "Passage Functions",
        count: countItems(studyData.passageFunctions),
        status: coverageStatus({ count: countItems(studyData.passageFunctions), applicable: isNarrative || isMovement, primary: isNarrative || isMovement })
      },
      {
        layer: "Revelation Patterns",
        count: countItems(studyData.revelationPatterns),
        status: coverageStatus({ count: countItems(studyData.revelationPatterns), applicable: chapter === 1 || chapter === 2 || chapter === 3 })
      },
      {
        layer: "Movement / Location Semantics",
        count: countItems(studyData.movementSemantics),
        status: coverageStatus({ count: countItems(studyData.movementSemantics), applicable: isMovement, primary: isMovement })
      },
      {
        layer: "Teaching / Discourse Structure",
        count: countItems(scopedSemanticRecords(studyData.teachingSemantics)),
        status: coverageStatus({ count: countItems(scopedSemanticRecords(studyData.teachingSemantics)), applicable: isTeaching, primary: isTeaching, pilot: true })
      },
      {
        layer: "Principle Relationships",
        count: countItems(scopedSemanticRecords(studyData.principleRelationships)),
        status: coverageStatus({ count: countItems(scopedSemanticRecords(studyData.principleRelationships)), applicable: isTeaching, pilot: true })
      },
      {
        layer: "Character Interactions",
        count: countItems(scopedSemanticRecords(studyData.characterInteractions)),
        status: coverageStatus({ count: countItems(scopedSemanticRecords(studyData.characterInteractions)), applicable: chapter === 1 || chapter === 2 || chapter === 5, pilot: true })
      },
      {
        layer: "Study Progression",
        count: countItems(studyProgressionRecords()),
        status: coverageStatus({ count: countItems(studyProgressionRecords()), applicable: true, pilot: true })
      },
      {
        layer: "Semantic Resolution Explanations",
        count: countItems(resolutionExplanationRecords()),
        status: coverageStatus({ count: countItems(resolutionExplanationRecords()), applicable: true, pilot: true })
      },
      {
        layer: "Session Continuity Review",
        count: countItems(sessionContinuityReviewRecords()),
        status: coverageStatus({ count: countItems(sessionContinuityReviewRecords()), applicable: true, pilot: true, sessionScoped: true })
      },
      {
        layer: "Semantic Sequence / Causality",
        count: countItems(scopedSemanticRecords(studyData.semanticCausality)),
        status: coverageStatus({ count: countItems(scopedSemanticRecords(studyData.semanticCausality)), applicable: chapter === 1 || chapter === 2 })
      },
      {
        layer: "Cross-Chapter Continuity",
        count: countItems(scopedSemanticRecords(studyData.semanticContinuity)),
        status: coverageStatus({ count: countItems(scopedSemanticRecords(studyData.semanticContinuity)), applicable: true, sessionScoped: true })
      },
      {
        layer: "Semantic Ontology Roles",
        count: countItems(studyData.ontologyRoles),
        status: coverageStatus({ count: countItems(studyData.ontologyRoles), applicable: true })
      },
      {
        layer: "Reference Roles",
        count: countItems(studyData.referenceRoles),
        status: coverageStatus({ count: countItems(studyData.referenceRoles), applicable: true })
      },
      {
        layer: "Library Awareness",
        count: countItems(libraryAwarenessRecords()),
        status: coverageStatus({ count: countItems(libraryAwarenessRecords()), applicable: isTeaching, pilot: true })
      },
      {
        layer: "Future Strong's / POS Layer",
        count: 0,
        status: coverageStatus({ future: true })
      }
    ];
  }

  function compactEvidenceWeightLabel(type = "") {
    const normalized = normalizeText(type);
    if (/Direct Source Evidence/i.test(normalized)) return "Direct Source Evidence";
    if (/Supporting Source Evidence/i.test(normalized)) return "Supporting Source Evidence";
    if (/Relationship Inference/i.test(normalized)) return "Relationship Inference";
    if (/Continuity Inference/i.test(normalized)) return "Continuity Inference";
    if (/Library Awareness Classification/i.test(normalized)) return "Library Awareness Classification";
    return "Derived Semantic Evidence";
  }

  function resolutionExplanationRecord(record = {}) {
    return {
      result: record.result || "Semantic resolution",
      sourceEvidence: normalizeText(record.sourceEvidence || record.sourcePhrase || "Not recorded."),
      supportingEvidence: asArray(record.supportingEvidence).map((value) => normalizeText(value)).filter(Boolean),
      ontologyRole: normalizeText(record.ontologyRole || "Not recorded."),
      relationshipInputs: asArray(record.relationshipInputs).map((value) => normalizeText(value)).filter(Boolean),
      teachingInputs: asArray(record.teachingInputs).map((value) => normalizeText(value)).filter(Boolean),
      reasoningPath: asArray(record.reasoningPath).map((value) => normalizeText(value)).filter(Boolean),
      evidenceWeight: record.evidenceWeight || "Derived Semantic Evidence",
      provenance: record.provenance || "I.C.E. Derived",
      sourcePhrase: record.sourcePhrase || record.sourceEvidence || "",
      derivedMeaning: record.derivedMeaning || record.result || "",
      confidence: record.confidence || "probable",
      sourceGrounding: record.sourceGrounding || record.sourceEvidence || "Not recorded.",
      scopePath: record.scopePath || "",
      relatedSemanticLayers: asArray(record.relatedSemanticLayers).map((value) => normalizeText(value)).filter(Boolean)
    };
  }

  function resolutionExplanationRecords() {
    const records = [];
    asArray(studyData.ontologyRoles).slice(0, 8).forEach((item) => {
      const result = [item.semanticItem || item.entityName || item.name || "Entity", item.semanticRole || item.ontologyRole || item.ontologyClass || item.classLabel || "Ontology role"].filter(Boolean).join(" = ");
      records.push(resolutionExplanationRecord({
        result,
        sourceEvidence: item.sourcePhrase || item.sourceGrounding || item.contextSnippet,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: item.semanticRole || item.ontologyRole || item.ontologyClass || item.classLabel,
        relationshipInputs: asArray(item.relatedRelationshipRoles),
        teachingInputs: asArray(item.relatedTeachingSemantics),
        reasoningPath: ["source phrase", "ontology role", "class-consistent rendering", "final resolution"],
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
        provenance: "I.C.E. Classification",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning || result,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath,
        relatedSemanticLayers: ["Semantic Ontology Roles"]
      }));
    });
    asArray(studyData.referenceRoles).slice(0, 5).forEach((item) => {
      records.push(resolutionExplanationRecord({
        result: [referenceRolePrimaryReferencedBeing(item), referenceRoleDisplayTitle(item)].filter(Boolean).join(" = ") || "Reference role resolution",
        sourceEvidence: item.discoveredReference,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: referenceRoleCanonicalIdentity(item),
        relationshipInputs: asArray(item.linkedThemes),
        teachingInputs: referenceRoleRelatedCharacters(item),
        reasoningPath: ["source reference", "reference role", "related characters", "final reference resolution"],
        evidenceWeight: "Supporting Source Evidence",
        provenance: referenceRoleSourceProvenanceLabel(item),
        sourcePhrase: item.discoveredReference,
        derivedMeaning: referenceRolePlainExplanation(item),
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.sourceDiscoveryId,
        relatedSemanticLayers: ["Reference Roles", "Source Discovery", "Reference Graph"]
      }));
    });
    scopedSemanticRecords(studyData.teachingSemantics).slice(0, 8).forEach((item) => {
      const label = item.teachingTopic || item.blessing || item.commandment || item.principle || item.discourseType || "Teaching";
      records.push(resolutionExplanationRecord({
        result: label,
        sourceEvidence: item.sourcePhrase,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: item.speaker ? `${item.speaker} as speaker` : "Not recorded.",
        relationshipInputs: asArray(item.relatedEntities),
        teachingInputs: [item.teachingBlock, item.audience, item.principle, item.commandment, item.blessing, item.promise].filter(Boolean),
        reasoningPath: ["source phrase", "speaker/audience context", "teaching category", "final teaching resolution"],
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
        provenance: "I.C.E. Teaching Classification",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.verseRange,
        relatedSemanticLayers: ["Teaching / Discourse Structure"]
      }));
    });
    scopedSemanticRecords(studyData.principleRelationships).slice(0, 8).forEach((item) => {
      const related = asArray(item.relatedPrinciples).slice(0, 3).join(", ");
      records.push(resolutionExplanationRecord({
        result: `${item.principle || "Principle"} ${passageFunctionTitle(item.relationshipType || "related")} ${related || "related principle"}`,
        sourceEvidence: item.sourcePhrase,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: item.speaker ? `${item.speaker} as teaching source` : "Not recorded.",
        relationshipInputs: asArray(item.relatedPrinciples),
        teachingInputs: [item.teachingBlock, item.audience, ...asArray(item.relatedTeachingSemantics)].filter(Boolean),
        reasoningPath: ["source teaching evidence", "shared discourse context", "relationship type", "final principle relationship"],
        evidenceWeight: "Relationship Inference",
        provenance: "I.C.E. Principle Relationship",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.verseRange,
        relatedSemanticLayers: ["Principle Relationships", "Teaching / Discourse Structure"]
      }));
    });
    scopedSemanticRecords(studyData.characterInteractions).slice(0, 8).forEach((item) => {
      records.push(resolutionExplanationRecord({
        result: `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"}`,
        sourceEvidence: item.sourcePhrase,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: item.authorityClass || "Not recorded.",
        relationshipInputs: [passageFunctionTitle(item.interactionType || "interaction"), ...asArray(item.relatedEntities)],
        teachingInputs: asArray(item.relatedTeachingSemantics),
        reasoningPath: ["source character", "target character", "interaction type", "final interaction resolution"],
        evidenceWeight: "Relationship Inference",
        provenance: "I.C.E. Relationship",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.verseRange,
        relatedSemanticLayers: ["Character Interactions"]
      }));
    });
    sessionContinuityReviewRecords().slice(0, 3).forEach((item) => {
      records.push(resolutionExplanationRecord({
        result: item.sessionRange || "Session Continuity Review",
        sourceEvidence: item.sourcePhrase || item.sessionRange,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: asArray(item.continuingAuthorityPaths).slice(0, 2).join("; "),
        relationshipInputs: asArray(item.continuingCharacterInteractions),
        teachingInputs: asArray(item.teachingProgression),
        reasoningPath: ["analyzed pages", "continuing characters/themes", "session review", "final continuity resolution"],
        evidenceWeight: "Continuity Inference",
        provenance: "I.C.E. Continuity",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.sessionRange,
        relatedSemanticLayers: ["Session Continuity Review"]
      }));
    });
    libraryAwarenessRecords().slice(0, 5).forEach((item) => {
      records.push(resolutionExplanationRecord({
        result: item.principleFamily || "Library Awareness",
        sourceEvidence: item.sourcePhrase || item.currentGrounding,
        supportingEvidence: asArray(item.knownRelatedCategories),
        ontologyRole: item.doctrineFamily,
        relationshipInputs: asArray(item.knownRelatedCategories),
        teachingInputs: [item.teachingFamily, item.semanticSourceLayer].filter(Boolean),
        reasoningPath: ["current source grounding", "family classification", "future sources held open", "final library awareness label"],
        evidenceWeight: "Library Awareness Classification",
        provenance: "I.C.E. Library Awareness",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.currentSource,
        relatedSemanticLayers: ["Library Awareness", item.semanticSourceLayer].filter(Boolean)
      }));
    });
    knowledgeGraphRecords().slice(0, 8).forEach((item) => {
      records.push(resolutionExplanationRecord({
        result: `${item.node || "Node"} = ${item.type || "Semantic Node"}`,
        sourceEvidence: item.sourcePhrase,
        supportingEvidence: asArray(item.evidence),
        ontologyRole: item.type,
        relationshipInputs: [...asArray(item.relationships), ...asArray(item.relatedNodes)],
        teachingInputs: asArray(item.relatedPrinciples),
        reasoningPath: ["existing semantic records", "node relationship aggregation", "scope preservation", "final graph node"],
        evidenceWeight: "Derived Semantic Evidence",
        provenance: "I.C.E. Knowledge Graph",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        confidence: item.confidence,
        sourceGrounding: item.sourceGrounding,
        scopePath: item.scopePath || item.id,
        relatedSemanticLayers: ["Scripture Knowledge Graph"]
      }));
    });
    const seen = new Set();
    return records.filter((item) => {
      const key = [item.result, item.scopePath, item.provenance].join("|").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 80);
  }

  function resolutionExplanationSearchText(item = {}) {
    return [item.result, item.sourceEvidence, item.supportingEvidence, item.ontologyRole, item.relationshipInputs, item.teachingInputs, item.reasoningPath, item.evidenceWeight, item.provenance, item.sourceGrounding, item.scopePath].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function resolutionExplanationSummaryLines(limit = 6) {
    return resolutionExplanationRecords().slice(0, limit).map((item) => `${item.result} | ${compactEvidenceWeightLabel(item.evidenceWeight)} | ${item.provenance}`);
  }

  function createResolutionExplanationCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card resolution-explanation-card";
    assignSemanticCardTarget(card, "resolutionExplanation", item, `${item.result || "resolution"}-${item.scopePath || "scope"}`);
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.result || "Semantic resolution";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["ICE_RESOLUTION_EXPLANATIONS", displayConfidence(item.confidence || "probable")].join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.result, item.sourceEvidence, item.supportingEvidence, item.ontologyRole, item.derivedMeaning]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Derived", label: item.result || "Semantic resolution", layer: "Semantic Resolution Explanation", storageKey: "ICE_RESOLUTION_EXPLANATIONS", scopePath: item.scopePath, rule: "Explanation records are constructed from existing semantic records; no new semantic conclusion is introduced." }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight, evidenceStrength: "explanation uses current record grounding only", sourceGrounding: item.sourceGrounding || item.sourceEvidence, supportingRecords: [...asArray(item.supportingEvidence), ...asArray(item.relationshipInputs), ...asArray(item.teachingInputs)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Result", item.result || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Evidence", item.sourceEvidence || "Not recorded.", { divineContext, sourceQuote: Boolean(item.sourcePhrase) }),
      createPassageFunctionSection("Supporting Evidence", "", { list: asArray(item.supportingEvidence).slice(0, 5), hiddenCount: Math.max(0, asArray(item.supportingEvidence).length - 5), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Ontology Role", item.ontologyRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationship Inputs", "", { list: asArray(item.relationshipInputs).slice(0, 6), hiddenCount: Math.max(0, asArray(item.relationshipInputs).length - 6), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Inputs", "", { list: asArray(item.teachingInputs).slice(0, 6), hiddenCount: Math.max(0, asArray(item.teachingInputs).length - 6), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", list: asArray(item.relatedSemanticLayers), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderResolutionExplanations(term) {
    const container = document.getElementById("resolutionExplanationCards");
    const count = document.getElementById("resolutionExplanationCount");
    if (!container || !count) return;
    const records = resolutionExplanationRecords();
    const filtered = records.filter((item) => matchesSearchQuery(resolutionExplanationSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} explanation record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No semantic resolution explanations derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Semantic Resolution Explanation",
      [
        `Derived records: ${records.length}`,
        "Layer: ICE_RESOLUTION_EXPLANATIONS",
        "Purpose: explain why I.C.E. resolved a result from existing source evidence, semantic roles, relationship inputs, teaching inputs, provenance, and evidence weight.",
        "Boundary: derived explanation only; no new semantic conclusion, no crawling, and no freeform speculation."
      ].join("\n"),
      "derived explanation layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No semantic resolution explanations match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createResolutionExplanationCard(item)));
  }
  function createSemanticCoverageCard(rows) {
    const card = document.createElement("article");
    card.className = "study-card semantic-coverage-card";
    const heading = document.createElement("h3");
    heading.textContent = "Semantic Coverage";
    const intro = document.createElement("p");
    intro.textContent = [
      `Chapter type: ${activeChapterType()}`,
      `Purpose: distinguish grounded records from empty, not-applicable, pilot, session-scoped, and future layers.`,
      `Source: I.C.E. Classification; labels generated from current layer counts, session scope, and chapter type.`
    ].join("\n");

    const list = document.createElement("div");
    list.className = "semantic-coverage-list";
    rows.forEach((row) => {
      const wrapper = document.createElement("div");
      wrapper.className = "semantic-coverage-row";
      const layer = document.createElement("div");
      layer.className = "semantic-coverage-layer";
      layer.textContent = row.layer;
      const status = document.createElement("div");
      status.className = "semantic-coverage-status";
      status.textContent = row.status;
      const count = document.createElement("div");
      count.className = "semantic-coverage-count";
      count.textContent = `${row.count} record(s)`;
      const provenance = document.createElement("div");
      provenance.className = "semantic-coverage-provenance";
      provenance.textContent = "Source: I.C.E. Classification | Label: coverage status | Storage key: derived panel coverage row";
      const weight = document.createElement("div");
      weight.className = "semantic-coverage-evidence-weight";
      weight.textContent = "Evidence Weight: Derived Semantic Evidence | Strength: count/status derived from current panel data";
      wrapper.append(layer, status, count, provenance, weight);
      list.appendChild(wrapper);
    });

    card.append(heading, intro, list);
    return card;
  }

  function uniqueStudyList(values = []) {
    const seen = new Set();
    return asArray(values)
      .map((value) => normalizeText(value))
      .filter(Boolean)
      .filter((value) => {
        const key = value.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function guidedStudyRecord(record = {}) {
    return {
      pathType: record.pathType || "Study Focus",
      title: record.title || "Study current source",
      why: record.why || "This suggestion is grounded in the current analyzed semantic records.",
      related: uniqueStudyList(record.related).slice(0, 8),
      evidence: uniqueStudyList(record.evidence).slice(0, 5),
      sourcePhrase: record.sourcePhrase || asArray(record.evidence)[0] || "",
      derivedMeaning: record.derivedMeaning || record.why || "",
      provenance: record.provenance || "I.C.E. generated study suggestion",
      evidenceWeight: record.evidenceWeight || "Derived Semantic Evidence",
      confidence: record.confidence || "probable",
      sourceGrounding: record.sourceGrounding || record.why || "Grounded in current semantic records.",
      supportingLayers: uniqueStudyList(record.supportingLayers)
    };
  }

  function guidedStudyRecords() {
    const records = [];
    const teachings = scopedSemanticRecords(studyData.teachingSemantics);
    const principles = scopedSemanticRecords(studyData.principleRelationships);
    const interactions = scopedSemanticRecords(studyData.characterInteractions);
    const graph = knowledgeGraphRecords();
    const sessionReview = sessionContinuityReviewRecords();
    const library = libraryAwarenessRecords();
    const jesusTeaching = teachings.find((item) => /\bJESUS\b/i.test(item.speaker || item.relatedEntities || item.derivedMeaning || ""));
    if (jesusTeaching || graph.some((item) => /\bJESUS\b/i.test(item.node || ""))) {
      records.push(guidedStudyRecord({
        pathType: "Character Focus",
        title: "Study JESUS as Teacher",
        why: "JESUS is resolved as the speaker/teacher where Matthew 5 grounds the teaching context.",
        related: ["Sermon on the Mount", "Kingdom of Heaven", "Righteousness", "Mercy", "Peacemaking", ...asArray(jesusTeaching?.relatedEntities)],
        evidence: [jesusTeaching?.sourcePhrase, jesusTeaching?.derivedMeaning, ...graph.filter((item) => /\bJESUS\b/i.test(item.node || "")).slice(0, 2).map((item) => item.derivedMeaning || item.sourceGrounding)],
        sourcePhrase: jesusTeaching?.sourcePhrase,
        derivedMeaning: jesusTeaching?.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Teaching Semantics + Knowledge Graph",
        evidenceWeight: "Derived Semantic Evidence / Relationship Inference",
        confidence: jesusTeaching?.confidence || "probable",
        sourceGrounding: jesusTeaching?.sourceGrounding || "Teaching and graph records ground JESUS as central speaker/teacher where available.",
        supportingLayers: ["Teaching / Discourse Structure", "Scripture Knowledge Graph"]
      }));
    }
    const mercyPrinciple = principles.find((item) => /mercy|merciful|peace|peacemak|reconcil/i.test([item.principle, asArray(item.relatedPrinciples).join(" "), item.derivedMeaning].join(" ")));
    if (mercyPrinciple) {
      records.push(guidedStudyRecord({
        pathType: "Principle Focus",
        title: `Study ${mercyPrinciple.principle || "Mercy"} with related principles`,
        why: "This principle is connected to related principles by grounded Matthew 5 teaching records.",
        related: asArray(mercyPrinciple.relatedPrinciples),
        evidence: [mercyPrinciple.sourcePhrase, mercyPrinciple.derivedMeaning, ...asArray(mercyPrinciple.evidence)],
        sourcePhrase: mercyPrinciple.sourcePhrase,
        derivedMeaning: mercyPrinciple.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Principle Relationships",
        evidenceWeight: "Relationship Inference",
        confidence: mercyPrinciple.confidence,
        sourceGrounding: mercyPrinciple.sourceGrounding,
        supportingLayers: ["Principle Relationships", "Teaching / Discourse Structure"]
      }));
    }
    const teachingBlock = teachings.find((item) => item.teachingBlock || item.teachingTopic || item.discourseType);
    if (teachingBlock) {
      records.push(guidedStudyRecord({
        pathType: "Teaching Focus",
        title: `Study ${teachingBlock.teachingBlock || teachingBlock.teachingTopic || "the teaching block"}`,
        why: "A teaching/discourse record identifies the current passage as teaching-oriented and gives a grounded topic to review.",
        related: [teachingBlock.teachingTopic, teachingBlock.principle, teachingBlock.commandment, teachingBlock.blessing, teachingBlock.promise, teachingBlock.audience],
        evidence: [teachingBlock.sourcePhrase, teachingBlock.derivedMeaning, ...asArray(teachingBlock.evidence)],
        sourcePhrase: teachingBlock.sourcePhrase,
        derivedMeaning: teachingBlock.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Teaching Semantics",
        evidenceWeight: teachingBlock.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
        confidence: teachingBlock.confidence,
        sourceGrounding: teachingBlock.sourceGrounding,
        supportingLayers: ["Teaching / Discourse Structure"]
      }));
    }
    const relation = interactions.find((item) => /JESUS|THE LORD|AngEL|Joseph|Herod/i.test([item.sourceCharacter, item.targetCharacter].join(" ")));
    if (relation) {
      records.push(guidedStudyRecord({
        pathType: "Relationship Focus",
        title: `Study ${relation.sourceCharacter || "source"} and ${relation.targetCharacter || "target"}`,
        why: "A character interaction record shows a grounded relationship between source and target characters.",
        related: [passageFunctionTitle(relation.interactionType || "interaction"), relation.authorityClass, ...asArray(relation.relatedEntities)],
        evidence: [relation.sourcePhrase, relation.derivedMeaning, ...asArray(relation.evidence)],
        sourcePhrase: relation.sourcePhrase,
        derivedMeaning: relation.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Character Interactions",
        evidenceWeight: "Relationship Inference",
        confidence: relation.confidence,
        sourceGrounding: relation.sourceGrounding,
        supportingLayers: ["Character Interactions"]
      }));
    }
    const continuity = sessionReview[0];
    if (continuity) {
      records.push(guidedStudyRecord({
        pathType: "Session Continuity Focus",
        title: continuity.sessionType === "Non-contiguous selected pages" ? "Study continuity across selected pages: " + (continuity.sessionRange || "the current session") : "Study continuity across " + (continuity.sessionRange || "the current session"),
        why: "The current session review connects analyzed pages through continuing characters, themes, authority paths, and teaching progression.",
        related: [...asArray(continuity.continuingCharacters), ...asArray(continuity.continuingThemes), ...asArray(continuity.continuingPrincipleFamilies)],
        evidence: [continuity.sourcePhrase, continuity.derivedMeaning, ...asArray(continuity.evidence), ...asArray(continuity.teachingProgression)],
        sourcePhrase: continuity.sourcePhrase,
        derivedMeaning: continuity.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Session Continuity Review",
        evidenceWeight: "Continuity Inference",
        confidence: continuity.confidence,
        sourceGrounding: continuity.sourceGrounding,
        supportingLayers: ["Session Continuity Review"]
      }));
    }
    const family = library[0];
    if (family) {
      records.push(guidedStudyRecord({
        pathType: "Library Awareness Focus",
        title: `Study the ${family.principleFamily || "principle"} family in this source`,
        why: "Library Awareness groups current-source principles into a family while keeping future sources marked as awaiting analysis.",
        related: [family.teachingFamily, family.doctrineFamily, ...asArray(family.knownRelatedCategories)],
        evidence: [family.sourcePhrase, family.currentGrounding, family.derivedMeaning],
        sourcePhrase: family.sourcePhrase,
        derivedMeaning: family.derivedMeaning,
        provenance: "I.C.E. generated study suggestion from Library Awareness",
        evidenceWeight: "Library Awareness Classification",
        confidence: family.confidence,
        sourceGrounding: family.sourceGrounding || family.currentGrounding,
        supportingLayers: ["Library Awareness", family.semanticSourceLayer]
      }));
    }
    return records.slice(0, 8);
  }

  function guidedStudySearchText(item = {}) {
    return [item.pathType, item.title, item.why, item.related, item.evidence, item.provenance, item.evidenceWeight, item.sourceGrounding, item.supportingLayers].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function guidedStudySummaryLines(limit = 6) {
    return guidedStudyRecords().slice(0, limit).map((item, index) => `${index + 1}. ${item.title} | ${item.pathType} | ${item.evidenceWeight}`);
  }

  function createGuidedStudyCard(item = {}, index = 0) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card guided-study-card";
    assignSemanticCardTarget(card, "guidedStudy", item, `${item.pathType || "study"}-${item.title || index}`);
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${item.title || "Study current source"}`;
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.pathType || "Study Focus", displayConfidence(item.confidence || "probable")].join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.title, item.why, item.related, item.evidence, item.derivedMeaning]);
    header.append(heading, range);
    [
      createPassageFunctionSection("Why", item.why || "Grounded study suggestion from current semantic records.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related", "", { list: asArray(item.related), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Evidence", "", { list: asArray(item.evidence), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source", item.provenance || "I.C.E. generated study suggestion", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight, evidenceStrength: "suggestion uses current grounded semantic records only", sourceGrounding: item.sourceGrounding, supportingRecords: item.supportingLayers, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Supporting Layers", "", { collapsed: true, summaryLabel: "Show supporting layers", list: asArray(item.supportingLayers), plainList: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderGuidedStudy(term) {
    const container = document.getElementById("guidedStudyCards");
    const count = document.getElementById("guidedStudyCount");
    if (!container || !count) return;
    const records = guidedStudyRecords();
    const filtered = records.filter((item) => matchesSearchQuery(guidedStudySearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} suggestion(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No grounded guided study suggestions are available yet.");
      return;
    }
    container.appendChild(createCard(
      "Suggested Study Path",
      [
        `Suggestions: ${records.length}`,
        "Purpose: give grounded next study paths from existing semantic records.",
        "Boundary: no devotional advice, no invented doctrine, and no instruction about what to believe."
      ].join("\n"),
      "guided study"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No guided study suggestions match current filter.");
      return;
    }
    filtered.forEach((item, index) => container.appendChild(createGuidedStudyCard(item, index)));
  }

  function studyProgressionTopicKey(value = "") {
    return normalizeText(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function studyProgressionPushTopic(list, value, source = "") {
    const label = normalizeText(value);
    if (!label) return;
    const key = studyProgressionTopicKey(label);
    if (!key || list.some((item) => item.key === key)) return;
    list.push({ label, key, source: normalizeText(source) });
  }

  function studyProgressionCurrentFocus() {
    if (currentSemanticFocus) {
      const value = semanticFocusValueLabel(currentSemanticFocus);
      if (value && !/^semantic focus$/i.test(value)) return value;
    }
    const scopeLabel = currentStudyScopeLabel();
    if (scopeLabel && !/^current scope$/i.test(scopeLabel)) return scopeLabel;
    const activePage = activeSourcePageRecord();
    if (activePage) return volumePageLabel(activePage);
    const teaching = scopedSemanticRecords(studyData.teachingSemantics).find((item) => item.teachingTopic || item.teachingBlock || item.speaker);
    return teaching?.teachingTopic || teaching?.teachingBlock || teaching?.speaker || "Current analyzed source";
  }

  function studyProgressionRecords() {
    const explored = [];
    const related = [];
    const teachings = scopedSemanticRecords(studyData.teachingSemantics);
    const principles = scopedSemanticRecords(studyData.principleRelationships);
    const interactions = scopedSemanticRecords(studyData.characterInteractions);
    const graph = knowledgeGraphRecords();
    const library = libraryAwarenessRecords();
    const sessionReview = sessionContinuityReviewRecords();
    if (teachings.some((item) => /\bJESUS\b/i.test(item.speaker || item.derivedMeaning || ""))) studyProgressionPushTopic(explored, "JESUS as Teacher", "Teaching / Discourse Structure");
    teachings.forEach((item) => {
      studyProgressionPushTopic(explored, item.teachingBlock || item.teachingTopic || item.discourseType, "Teaching / Discourse Structure");
      studyProgressionPushTopic(related, item.principle || item.commandment || item.blessing || item.promise || item.warning, "Teaching / Discourse Structure");
      studyProgressionPushTopic(related, item.audience, "Teaching / Discourse Structure");
    });
    principles.forEach((item) => {
      studyProgressionPushTopic(explored, item.principle, "Principle Relationships");
      asArray(item.relatedPrinciples).forEach((topic) => studyProgressionPushTopic(related, topic, "Principle Relationships"));
    });
    interactions.forEach((item) => {
      studyProgressionPushTopic(explored, [item.sourceCharacter, item.targetCharacter].filter(Boolean).join(" and "), "Character Interactions");
      studyProgressionPushTopic(related, passageFunctionTitle(item.interactionType || "interaction"), "Character Interactions");
    });
    graph.forEach((item) => {
      studyProgressionPushTopic(related, item.node, "Scripture Knowledge Graph");
      asArray(item.relatedPrinciples).forEach((topic) => studyProgressionPushTopic(related, topic, "Scripture Knowledge Graph"));
      asArray(item.relatedNodes).forEach((topic) => studyProgressionPushTopic(related, topic, "Scripture Knowledge Graph"));
    });
    library.forEach((item) => {
      studyProgressionPushTopic(explored, item.principleFamily, "Library Awareness");
      asArray(item.knownRelatedCategories).forEach((topic) => studyProgressionPushTopic(related, topic, "Library Awareness"));
    });
    sessionReview.forEach((item) => {
      asArray(item.continuingThemes).forEach((topic) => studyProgressionPushTopic(related, topic, "Session Continuity Review"));
      asArray(item.continuingPrincipleFamilies).forEach((topic) => studyProgressionPushTopic(related, topic, "Session Continuity Review"));
    });
    const exploredKeys = new Set(explored.map((item) => item.key));
    const notYetExplored = related.filter((item) => !exploredKeys.has(item.key));
    const preferredNext = notYetExplored.find((item) => /reconciliation|righteousness|law fulfillment|peacemak|mercy|kingdom/i.test(item.label)) || notYetExplored[0];
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const currentFocus = studyProgressionCurrentFocus();
    const supportingLayers = uniqueStudyList([
      teachings.length ? "Teaching / Discourse Structure" : "",
      principles.length ? "Principle Relationships" : "",
      interactions.length ? "Character Interactions" : "",
      graph.length ? "Scripture Knowledge Graph" : "",
      library.length ? "Library Awareness" : "",
      sessionReview.length ? "Session Continuity Review" : ""
    ]);
    if (!explored.length && !related.length && !supportingLayers.length) return [];
    return [{
      currentFocus,
      exploredTopics: explored.map((item) => item.label).slice(0, 10),
      relatedTopics: related.map((item) => item.label).slice(0, 12),
      notYetExplored: notYetExplored.map((item) => item.label).slice(0, 10),
      suggestedNextTopic: preferredNext?.label || "Review another grounded Guided Study suggestion",
      reasonForSuggestion: preferredNext ? `Connected to the current focus through ${preferredNext.source || "existing semantic layers"}.` : "Current records do not expose an unexplored related topic yet; review another grounded suggestion from Guided Study.",
      supportingLayers,
      provenance: "I.C.E. generated study progression from current session semantic records",
      evidenceWeight: preferredNext ? "Relationship Inference / Derived Semantic Evidence" : "Derived Semantic Evidence",
      sessionScope: range ? range.sessionLabel : (analyzedPages.length ? analyzedPages.map(volumePageLabel).join(", ") : "Current analyzed source"),
      sourcePhrase: teachings.find((item) => item.sourcePhrase)?.sourcePhrase || principles.find((item) => item.sourcePhrase)?.sourcePhrase || "Not recorded.",
      derivedMeaning: preferredNext ? `${preferredNext.label} is available as a grounded next study topic from the current semantic record set.` : "Study progression is derived from available semantic records only.",
      sourceGrounding: supportingLayers.length ? `Derived from ${supportingLayers.join(", ")}.` : "Derived from current semantic records.",
      confidence: preferredNext ? "probable" : "possible"
    }];
  }

  function studyProgressionSearchText(item = {}) {
    return [item.currentFocus, item.exploredTopics, item.relatedTopics, item.notYetExplored, item.suggestedNextTopic, item.reasonForSuggestion, item.supportingLayers, item.provenance, item.evidenceWeight, item.sessionScope].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function studyProgressionSummaryLines(limit = 4) {
    return studyProgressionRecords().slice(0, limit).map((item) => [
      `Current Focus: ${item.currentFocus}`,
      `Suggested Next: ${item.suggestedNextTopic}`,
      `Why: ${item.reasonForSuggestion}`,
      `Evidence Weight: ${item.evidenceWeight}`
    ].join(" | "));
  }

  function createStudyProgressionCard(item = {}, index = 0) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card study-progression-card";
    assignSemanticCardTarget(card, "studyProgression", item, `${item.currentFocus || "focus"}-${item.suggestedNextTopic || index}`);
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.suggestedNextTopic ? `Suggested Next: ${item.suggestedNextTopic}` : "Study Progression";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["ICE_STUDY_PROGRESSION", displayConfidence(item.confidence || "probable")].join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.currentFocus, item.exploredTopics, item.relatedTopics, item.suggestedNextTopic, item.derivedMeaning]);
    header.append(heading, range);
    [
      createPassageFunctionSection("Main Conclusion", item.suggestedNextTopic || "Review another grounded Guided Study suggestion", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why", item.reasonForSuggestion || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Study Paths", "", { list: asArray(item.relatedTopics), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Current Focus", item.currentFocus || "Current analyzed source", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Explored Topics", "", { list: asArray(item.exploredTopics), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Not Yet Explored", "", { list: asArray(item.notYetExplored), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Session Scope", item.sessionScope || "Current session", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight, evidenceStrength: "derived from current grounded semantic records only", sourceGrounding: item.sourceGrounding, supportingRecords: item.supportingLayers, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Supporting Layers", "", { collapsed: true, summaryLabel: "Show Evidence", list: asArray(item.supportingLayers), plainList: true }),
      createWordingProvenanceSection({ source: "I.C.E. Generated", label: item.suggestedNextTopic || "Study Progression", layer: "Study Progression", storageKey: "ICE_STUDY_PROGRESSION", scopePath: item.sessionScope, rule: "Study progression labels are generated from current semantic focus, Guided Study suggestions, and existing grounded semantic records; no personal belief data is stored." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderStudyProgression(term) {
    const container = document.getElementById("studyProgressionCards");
    const count = document.getElementById("studyProgressionCount");
    if (!container || !count) return;
    const records = studyProgressionRecords();
    const filtered = records.filter((item) => matchesSearchQuery(studyProgressionSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} progression record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No study progression records are available yet. Analyze a source with grounded semantic layers first.");
      return;
    }
    container.appendChild(createCard(
      "Study Progression",
      [
        `Progression records: ${records.length}`,
        "Layer: ICE_STUDY_PROGRESSION",
        "Purpose: show current focus, explored topics, related topics, and a grounded suggested next topic.",
        "Boundary: study navigation only; no user profiling, no belief scoring, no doctrinal advice, and no auto-crawling."
      ].join("\n"),
      "study progression"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No study progression records match current filter.");
      return;
    }
    filtered.forEach((item, index) => container.appendChild(createStudyProgressionCard(item, index)));
  }
  function renderSemanticCoverage(term) {
    const container = document.getElementById("semanticCoverageCards");
    const count = document.getElementById("semanticCoverageCount");
    if (!container || !count) return;
    const rows = semanticCoverageRows();
    const filtered = rows.filter((row) => matchesSearchQuery([row.layer, row.status, activeChapterType()].join(" "), term));
    clearElement(container);
    count.textContent = `${filtered.length} layer status(es)`;
    if (filtered.length === 0) {
      appendEmpty(container, "No semantic coverage rows match current filter.");
      return;
    }
    container.appendChild(createSemanticCoverageCard(filtered));
  }


  function sessionContinuityReviewSearchText(item = {}) {
    return [
      item.sessionRange,
      item.analyzedPages,
      item.continuingCharacters,
      item.continuingThemes,
      item.continuingAuthorityPaths,
      item.teachingProgression,
      item.continuingPrincipleFamilies,
      item.continuingCharacterInteractions,
      item.sourcePhrase,
      item.derivedMeaning,
      item.evidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createSessionContinuityReviewCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card session-continuity-review-card";
    assignSemanticCardTarget(card, "sessionContinuityReview", item, item.sessionRange || item.id || "session-continuity-review");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.sessionRange || "Session Continuity Review";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["ICE_SESSION_CONTINUITY_REVIEW", displayConfidence(item.confidence || "probable")].join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.continuingCharacters, item.continuingAuthorityPaths, item.derivedMeaning, item.sourceGrounding]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: "I.C.E. Continuity", label: item.sessionRange || "Session Continuity Review", layer: "Session Continuity Review", storageKey: "ICE_SESSION_CONTINUITY_REVIEW", scopePath: item.scopePath || item.sessionRange, rule: "Session review labels are generated from analyzed page selections or ranges, continuity records, teaching semantics, authority paths, and character interactions." }),
      createEvidenceWeightSection({ evidenceType: "Continuity Inference", evidenceStrength: "derived from analyzed session records", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.evidence), ...asArray(item.teachingProgression), ...asArray(item.continuingCharacterInteractions)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Session Range", item.sessionRange || "Current session", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Session Type", item.sessionType || "Contiguous analyzed range", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Analyzed Pages", "", { list: asArray(item.analyzedPages), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Missing Pages", asArray(item.missingPages).length ? "" : "None", { list: asArray(item.missingPages), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Continuing Characters", "", { list: asArray(item.continuingCharacters), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Continuing Themes", "", { list: asArray(item.continuingThemes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Continuing Authority Paths", "", { list: asArray(item.continuingAuthorityPaths), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Progression", "", { list: asArray(item.teachingProgression), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Continuing Principle Families", "", { list: asArray(item.continuingPrincipleFamilies), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Continuing Character Interactions", "", { list: asArray(item.continuingCharacterInteractions), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: asArray(item.evidence).slice(0, 6), hiddenCount: Math.max(0, asArray(item.evidence).length - 6), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "sessionContinuityReview"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show grounding", divineContext, preferHolySpirit: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function knowledgeGraphSearchText(item = {}) {
    return [
      item.node,
      item.type,
      item.relationships,
      item.relatedNodes,
      item.relatedPrinciples,
      item.sourcePhrase,
      item.derivedMeaning,
      item.chapterScope,
      item.sessionScope,
      item.evidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createKnowledgeGraphCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card knowledge-graph-card";
    assignSemanticCardTarget(card, "knowledgeGraph", item, item.node || item.id || "knowledge-graph");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.node || "Knowledge Graph Node";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.type || "Semantic Node", displayConfidence(item.confidence || "probable")].join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.node, item.relationships, item.relatedNodes, item.sourceGrounding]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: "I.C.E. Knowledge Graph", label: item.node || "Knowledge Graph Node", layer: "Scripture Knowledge Graph", storageKey: "ICE_KNOWLEDGE_GRAPH", scopePath: item.scopePath || item.id, rule: "Graph node labels are generated from existing grounded semantic layer nodes and relationships; source phrase remains separately displayed." }),
      createEvidenceWeightSection({ evidenceType: "Derived Semantic Evidence", evidenceStrength: "derived from connected semantic layer records", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.evidence), ...asArray(item.relationships), ...asArray(item.relatedNodes)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Node", item.node || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Type", item.type || "Semantic Node", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationships", "", { list: asArray(item.relationships), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Nodes", "", { list: asArray(item.relatedNodes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Principles", "", { list: asArray(item.relatedPrinciples), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Chapter Scope", item.chapterScope || "Current source", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Session Scope", item.sessionScope || "Current session", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: asArray(item.evidence).slice(0, 6), hiddenCount: Math.max(0, asArray(item.evidence).length - 6), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "knowledgeGraph"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show grounding", divineContext, preferHolySpirit: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderKnowledgeGraph(term) {
    const container = document.getElementById("knowledgeGraphCards");
    const count = document.getElementById("knowledgeGraphCount");
    if (!container || !count) return;
    const records = knowledgeGraphRecords();
    const filtered = records.filter((item) => matchesSearchQuery(knowledgeGraphSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} graph node(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No Scripture Knowledge Graph records derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Scripture Knowledge Graph",
      [
        `Graph nodes: ${records.length}`,
        "Layer: ICE_KNOWLEDGE_GRAPH",
        "Purpose: connect characters, interactions, principles, teachings, authority paths, continuity, chapters, and library/session families.",
        "Boundary: derived graph foundation only; no visual graph rendering, no auto-crawling, and no fabricated relationships."
      ].join("\n"),
      "derived graph foundation"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No knowledge graph records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createKnowledgeGraphCard(item)));
  }

  function trustVerificationSearchText(item = {}) {
    return [
      item.result,
      item.sourceBasis,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.supportingRecords,
      item.conflictingRecords,
      item.unresolvedAreas,
      item.trustSignals,
      item.sourcePhrase,
      item.derivedMeaning,
      item.evidence,
      item.relatedSemanticRecords,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createTrustVerificationCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card trust-verification-card";
    assignSemanticCardTarget(card, "trustVerification", item, item.result || item.id || "trust-verification");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.result || "Trust Verification";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["ICE_TRUST_VERIFICATION", item.verseRange || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.result, item.sourceBasis, item.sourcePhrase, item.derivedMeaning, item.supportingRecords, item.reasoningPath]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Derived", label: item.result || "Trust verification", layer: "Trust & Verification", storageKey: "ICE_TRUST_VERIFICATION", scopePath: item.scopePath || item.verseRange, rule: "Trust verification records demonstrate the basis for a conclusion from existing source-grounded semantic records; no truth score, doctrine ranking, or belief score is generated." }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "trust basis uses visible provenance, reasoning path, and supporting records only", sourceGrounding: item.sourceGrounding || item.sourceBasis, supportingRecords: [...asArray(item.supportingRecords), ...asArray(item.relatedSemanticRecords), ...asArray(item.trustSignals)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Source Basis", item.sourceBasis || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Derived", { preserveExact: true }),
      createPassageFunctionSection("Evidence Weight", item.evidenceWeight || "Derived Semantic Evidence", { preserveExact: true }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Trust Signals", "", { list: asArray(item.trustSignals), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Supporting Records", "", { list: asArray(item.supportingRecords).slice(0, 8), hiddenCount: Math.max(0, asArray(item.supportingRecords).length - 8), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Conflicting Records", "", { list: asArray(item.conflictingRecords), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Unresolved Areas", "", { list: asArray(item.unresolvedAreas), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related Semantic Records", "", { collapsed: true, summaryLabel: "Show related semantic records", list: asArray(item.relatedSemanticRecords), plainList: true }),
      createPassageFunctionSection("Scope", item.scopePath || item.verseRange || "Current source/session", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderTrustVerification(term) {
    const container = document.getElementById("trustVerificationCards");
    const count = document.getElementById("trustVerificationCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.trustVerification);
    const filtered = records.filter((item) => matchesSearchQuery(trustVerificationSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} trust record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No trust verification records are available yet.");
      return;
    }
    container.appendChild(createCard(
      "Trust & Verification",
      [
        `Trust records: ${records.length}`,
        "Layer: ICE_TRUST_VERIFICATION",
        "Purpose: show why a conclusion is trustable through visible source basis, provenance, evidence weight, reasoning path, supporting records, and unresolved areas.",
        "Boundary: no truth scoring, doctrinal ranking, belief scoring, or speculative confidence metrics."
      ].join("\n"),
      "trust verification architecture"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No trust verification records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createTrustVerificationCard(item)));
  }
  function semanticQuestionSearchText(item = {}) {
    return [
      item.questionKind,
      item.questionFamily,
      item.question,
      item.reasonSuggested,
      item.answer,
      item.answerItems,
      item.answerConstruction,
      item.sourcePhrase,
      item.derivedMeaning,
      item.evidence,
      item.groundingLayers,
      item.supportingLayer,
      item.relatedSemanticRecords,
      item.evidenceWeight,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createSemanticQuestionCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card semantic-question-card";
    assignSemanticCardTarget(card, "semanticQuestion", item, item.question || item.id || "semantic-question");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = item.question || "Semantic Question";
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.questionKind === "suggested" ? "Suggested" : "Answered", item.questionFamily || "Question", item.verseRange || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const isSuggestion = item.questionKind === "suggested";
    const divineContext = hasDivineDisplayContext([item.question, item.answer, item.answerItems, item.reasonSuggested, item.sourcePhrase, item.derivedMeaning, item.evidence]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: isSuggestion ? "I.C.E. Contextual Inquiry Suggestion" : "I.C.E. Semantic Question", label: item.question || "Semantic Question", layer: "Semantic Questions", storageKey: "ICE_SEMANTIC_QUESTIONS", scopePath: item.scopePath || item.verseRange, rule: isSuggestion ? "Suggested questions are derived from existing current page/session semantic records; answers are intentionally kept separate." : "Question answers are constructed from existing semantic records for the current page/session only; source phrase and derived meaning remain separately displayed." }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: isSuggestion ? "suggestion uses current grounded semantic records only" : "answer uses current grounded semantic records only", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.evidence), ...asArray(item.groundingLayers), item.supportingLayer, ...asArray(item.relatedSemanticRecords)], sourcePhrase: item.sourcePhrase }),
      isSuggestion ? createPassageFunctionSection("Reason Suggested", item.reasonSuggested || "Suggested from current semantic records.", { divineContext, preferHolySpirit: true }) : createPassageFunctionSection("Answer", item.answer || "No grounded answer available yet.", { divineContext, preferHolySpirit: true }),
      isSuggestion ? createPassageFunctionSection("Supporting Layer", item.supportingLayer || asArray(item.groundingLayers)[0] || "Not recorded.", { preserveExact: true }) : createPassageFunctionSection("Answer Items", "", { list: asArray(item.answerItems), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection(isSuggestion ? "Suggestion Boundary" : "Answer Construction", item.answerConstruction || (isSuggestion ? "suggested question only; answer remains separate" : "constructed from existing semantic records only"), { preserveExact: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: asArray(item.evidence).slice(0, 6), hiddenCount: Math.max(0, asArray(item.evidence).length - 6), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", "", { list: asArray(item.groundingLayers), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Records", "", { collapsed: true, summaryLabel: "Show related semantic records", list: asArray(item.relatedSemanticRecords), plainList: true }),
      createPassageFunctionSection("Scope", item.scopePath || item.verseRange || "Current source/session", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderSemanticQuestions(term) {
    const container = document.getElementById("semanticQuestionsCards");
    const count = document.getElementById("semanticQuestionsCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.semanticQuestions);
    const answered = records.filter((item) => item.questionKind !== "suggested");
    const suggested = records.filter((item) => item.questionKind === "suggested");
    const filteredAnswered = answered.filter((item) => matchesSearchQuery(semanticQuestionSearchText(item), term));
    const filteredSuggested = suggested.filter((item) => matchesSearchQuery(semanticQuestionSearchText(item), term));
    const filtered = [...filteredAnswered, ...filteredSuggested];
    clearElement(container);
    count.textContent = `${filtered.length} question(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No semantic question answers or suggestions are available yet.");
      return;
    }
    container.appendChild(createCard(
      "Semantic Questions",
      [
        `Answered Questions: ${answered.length}`,
        `Suggested Next Questions: ${suggested.length}`,
        "Layer: ICE_SEMANTIC_QUESTIONS",
        "Purpose: answer and suggest Who/What/When/Where/Why/How inquiries from current page/session semantic records.",
        "Boundary: derived review layer only; no speculative devotional questions, no freeform AI answers, no crawling, and no full-library querying."
      ].join("\n"),
      "semantic question framework"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No semantic questions match current filter.");
      return;
    }
    if (filteredAnswered.length) {
      container.appendChild(createCard("Answered Questions", `${filteredAnswered.length} grounded answer(s)`, "semantic question answers"));
      filteredAnswered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createSemanticQuestionCard(item)));
    }
    if (filteredSuggested.length) {
      container.appendChild(createCard("Suggested Next Questions", `${filteredSuggested.length} grounded suggestion(s)`, "contextual inquiry suggestions"));
      filteredSuggested.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createSemanticQuestionCard(item)));
    }
  }
  function renderSessionContinuityReview(term) {
    const container = document.getElementById("sessionContinuityReviewCards");
    const count = document.getElementById("sessionContinuityReviewCount");
    if (!container || !count) return;
    const records = sessionContinuityReviewRecords();
    const filtered = records.filter((item) => matchesSearchQuery(sessionContinuityReviewSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} review record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No session continuity review yet. Add at least two analyzed pages to the Study Scope to review session continuity.");
      return;
    }
    container.appendChild(createCard(
      "Session Continuity Review",
      [
        `Review records: ${records.length}`,
        "Layer: ICE_SESSION_CONTINUITY_REVIEW",
        "Purpose: review analyzed page selections or contiguous ranges as one developing narrative/teaching structure.",
        "Boundary: derived review only; no auto-crawling, no whole-book analysis, and no fabricated unanalyzed links."
      ].join("\n"),
      "derived session review layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No session continuity review records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createSessionContinuityReviewCard(item)));
  }
  function uniqueLibraryList(values = []) {
    const seen = new Set();
    return asArray(values)
      .map((value) => normalizeText(value))
      .filter(Boolean)
      .filter((value) => {
        const key = value.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function currentLibrarySourceLabel() {
    const activePage = activeSourcePageRecord();
    return activePage ? volumePageLabel(activePage) : normalizeText(studyData.analysisStatus?.sourceCaptureTitle || studyData.latestCapture?.title || "Current source");
  }

  function analyzedLibrarySourceLabels() {
    const labels = analyzedPageHistory().map(volumePageLabel);
    const current = currentLibrarySourceLabel();
    return uniqueLibraryList(labels.length ? labels : [current]);
  }

  function libraryAwarenessFamilyForText(value = "") {
    const text = normalizeText(value).toLowerCase();
    if (/merciful|mercy|peace|peacemak|forgiv|compassion/.test(text)) {
      return { principleFamily: "Mercy", teachingFamily: "Sermon on the Mount / Beatitudes", doctrineFamily: "Mercy / Peacemaking", relatedCategories: ["Forgiveness", "Peacemaking", "Compassion"] };
    }
    if (/righteous|law|fulfil|fulfill|commandment|kingdom/.test(text)) {
      return { principleFamily: "Righteousness", teachingFamily: "Sermon on the Mount / Law Fulfillment", doctrineFamily: "Kingdom righteousness", relatedCategories: ["Law Fulfillment", "Commandment Expansion", "Kingdom of heaven themes"] };
    }
    if (/reconcil|brother|agree|altar/.test(text)) {
      return { principleFamily: "Reconciliation", teachingFamily: "Sermon on the Mount / Righteousness Teaching", doctrineFamily: "Peace / Relationship repair", relatedCategories: ["Peace", "Mercy", "Inward Righteousness"] };
    }
    if (/pure|heart|adulter|lust/.test(text)) {
      return { principleFamily: "Purity", teachingFamily: "Sermon on the Mount / Commandment Interpretation", doctrineFamily: "Inward righteousness", relatedCategories: ["Purity of heart", "Commandment Expansion", "Inner intent"] };
    }
    if (/enemy|love|persecut|retaliat|oath|speech/.test(text)) {
      return { principleFamily: "Love and Integrity", teachingFamily: "Sermon on the Mount / Commandment Interpretation", doctrineFamily: "Covenant conduct", relatedCategories: ["Love of enemy", "Speech integrity", "Non-retaliation"] };
    }
    return null;
  }

  function libraryAwarenessRecordFromPrinciple(item = {}) {
    const text = [item.principle, asArray(item.relatedPrinciples).join(" "), item.teachingBlock, item.sourcePhrase, item.derivedMeaning].join(" ");
    const family = libraryAwarenessFamilyForText(text);
    if (!family) return null;
    return {
      ...family,
      currentSource: currentLibrarySourceLabel(),
      currentGrounding: trimText(item.sourcePhrase || item.sourceGrounding || item.derivedMeaning || "Current source grounding recorded in principle relationship layer.", 180),
      knownRelatedCategories: uniqueLibraryList([...family.relatedCategories, ...asArray(item.relatedPrinciples)]),
      analyzedSources: analyzedLibrarySourceLabels(),
      futureScope: "Awaiting analysis; no cross-library source links generated yet.",
      sourcePhrase: item.sourcePhrase || "Not recorded.",
      derivedMeaning: item.derivedMeaning || item.principle || family.principleFamily,
      confidence: item.confidence || "probable",
      sourceGrounding: item.sourceGrounding || "Framework derived from already-analyzed source records only.",
      semanticSourceLayer: "Principle Relationships"
    };
  }

  function libraryAwarenessRecordFromTeaching(item = {}) {
    const text = [item.principle, item.teachingTopic, item.blessing, item.commandment, item.interpretation, item.sourcePhrase, item.derivedMeaning].join(" ");
    const family = libraryAwarenessFamilyForText(text);
    if (!family) return null;
    return {
      ...family,
      currentSource: currentLibrarySourceLabel(),
      currentGrounding: trimText(item.sourcePhrase || item.sourceGrounding || item.derivedMeaning || "Current source grounding recorded in teaching layer.", 180),
      knownRelatedCategories: uniqueLibraryList(family.relatedCategories),
      analyzedSources: analyzedLibrarySourceLabels(),
      futureScope: "Awaiting analysis; no cross-library source links generated yet.",
      sourcePhrase: item.sourcePhrase || "Not recorded.",
      derivedMeaning: item.derivedMeaning || item.teachingTopic || item.principle || family.principleFamily,
      confidence: item.confidence || "probable",
      sourceGrounding: item.sourceGrounding || "Framework derived from already-analyzed source records only.",
      semanticSourceLayer: "Teaching / Discourse Structure"
    };
  }

  function libraryAwarenessRecords() {
    const records = [
      ...scopedSemanticRecords(studyData.principleRelationships).map(libraryAwarenessRecordFromPrinciple),
      ...scopedSemanticRecords(studyData.teachingSemantics).map(libraryAwarenessRecordFromTeaching)
    ].filter(Boolean);
    const seen = new Set();
    return records.filter((item) => {
      const key = [item.principleFamily, item.currentSource].join("|").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function libraryAwarenessSearchText(item = {}) {
    return [item.principleFamily, item.teachingFamily, item.doctrineFamily, item.currentSource, item.currentGrounding, asArray(item.knownRelatedCategories).join(" "), asArray(item.analyzedSources).join(" "), item.futureScope, item.sourcePhrase, item.derivedMeaning, item.sourceGrounding, item.semanticSourceLayer].join(" ");
  }

  function libraryAwarenessSummaryLines(limit = 5) {
    return libraryAwarenessRecords().slice(0, limit).map((item) => {
      const categories = asArray(item.knownRelatedCategories).slice(0, 3).join(", ");
      return `${item.principleFamily} | Current source: ${item.currentSource} | Related categories: ${categories || "awaiting analysis"} | Future sources: awaiting analysis`;
    });
  }

  function createLibraryAwarenessCard(item = {}) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const divineContext = hasDivineDisplayContext([item.principleFamily, item.teachingFamily, item.doctrineFamily, item.sourcePhrase, item.derivedMeaning]);

    card.className = "study-card semantic-card library-awareness-card";
    assignSemanticCardTarget(card, "libraryAwareness", item, `${item.principleFamily || "library"}-${item.currentSource || "source"}`);
    header.className = "semantic-card-header";
    heading.textContent = item.principleFamily || "Library Awareness";
    range.className = "semantic-card-range";
    range.textContent = ["framework only", item.currentSource].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createWordingProvenanceSection({ source: "I.C.E. Library Awareness", label: item.principleFamily || "Library Awareness", layer: "Library Awareness", storageKey: "ICE_LIBRARY_AWARENESS_FOUNDATION", scopePath: item.scopePath || item.currentSource, rule: "Family labels are generated from already-analyzed teaching and principle relationship records; future sources remain awaiting analysis." }),
      createEvidenceWeightSection({ evidenceType: "Library Awareness Classification", evidenceStrength: "classification from current analyzed source only", sourceGrounding: item.sourceGrounding || item.currentGrounding, supportingRecords: [item.semanticSourceLayer, ...asArray(item.knownRelatedCategories)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Principle Family", item.principleFamily || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Family", item.teachingFamily || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Doctrine Family", item.doctrineFamily || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Current Source", item.currentSource || "Not recorded."),
      createPassageFunctionSection("Current Grounding", item.currentGrounding || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Known Related Categories", "", { list: asArray(item.knownRelatedCategories), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Analyzed Sources", "", { list: asArray(item.analyzedSources), plainList: true }),
      createPassageFunctionSection("Future Scope", item.futureScope || "Awaiting analysis; no cross-library source links generated yet."),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Semantic Grounding", item.sourceGrounding || "Framework derived from already-analyzed source records only.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Framework Boundary", "No full-library crawl, auto-indexing, or future-source claim is generated by this layer.")
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderLibraryAwareness(term) {
    const container = document.getElementById("libraryAwarenessCards");
    const count = document.getElementById("libraryAwarenessCount");
    const records = libraryAwarenessRecords();
    const filtered = records.filter((item) => matchesSearchQuery(libraryAwarenessSearchText(item), term));
    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} framework record(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No library awareness framework records derived from current analyzed teaching/principle layers yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No library awareness records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Library Awareness",
      [
        `Framework records: ${records.length}`,
        "Layer: ICE_LIBRARY_AWARENESS_FOUNDATION",
        "Purpose: show current-source principle, teaching, and doctrine families while future sources remain awaiting analysis.",
        "Boundary: no auto-crawling, no whole-library index, and no fabricated cross-book links."
      ].join("\n"),
      "framework semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createLibraryAwarenessCard(item));
    });
  }
  function pageLabelForDiagnostics(page = {}) {
    return `${volumePageLabel(page)} | ${page.activeUrl || page.url || "no URL"}`;
  }

  function selectedRangeDiagnosticPages() {
    const selected = studyData.selectedRange || {};
    return [selected.start, selected.end].filter(Boolean);
  }

  function sessionContinuityDiagnosticPages() {
    return asArray(studyData.sessionContinuityReview).flatMap((item) => asArray(item.analyzedPages).map((label) => ({
      sourceTitle: label,
      sourceCaptureBook: normalizeText(label).split(/\s+/)[0] || "",
      sourceCaptureChapter: normalizeText(label).match(/\b(\d+)\b/)?.[1] || ""
    })));
  }

  function studyScopeSourceDiagnostics() {
    const acceptedKeys = new Set(analyzedPageHistory().map((page) => page.pageKey || pageRecordKey(page)));
    const groups = [
      ["canonicalAnalyzedPages", asArray(studyData.canonicalAnalyzedPages).map((item) => pageRecordFromCanonicalMarker(item) || {
        sourceTitle: item.sourceTitle || "Canonical marker",
        sourceCaptureBook: item.sourceCaptureBook || "",
        sourceCaptureChapter: item.sourceCaptureChapter || "",
        activeUrl: item.url || "",
        activeAdapterName: item.adapter || "",
        analyzedAt: item.analysisTimestamp || "",
        pageKey: item.pageKey || "",
        buildMarker: item.buildMarker || ""
      }), { requireAnalyzed: true, requireMarker: true }],
      ["analysisHistory pages", asArray(studyData.analysisHistory), { requireAnalyzed: true, requireMarker: true }],
      ["selectedRange", selectedRangeDiagnosticPages(), { requireAnalyzed: true, requireMarker: true }],
      ["latestCapture", [rawPageRecordFromCapture(studyData.latestCapture)].filter(Boolean), { requireAnalyzed: true, requireMarker: true }],
      ["activeSourcePage", [studyData.activeSourcePage].filter(Boolean), { requireAnalyzed: true, requireMarker: true }],
      ["captureHistory pages", asArray(studyData.captureHistory).map(rawPageRecordFromCapture).filter(Boolean), { requireAnalyzed: true, requireMarker: true }],
      ["sessionContinuityReview records", sessionContinuityDiagnosticPages(), { requireAnalyzed: true, requireMarker: true }],
      ["GPT review report", studyData.gptReviewReport ? [{ sourceTitle: "GPT review report", activeUrl: "", note: "Review reports are never analyzed page state" }] : [], { requireAnalyzed: true, requireMarker: true }]
    ];
    return groups.map(([label, pages, options]) => {
      const lines = asArray(pages).map((page) => {
        const key = page.pageKey || pageRecordKey(page);
        const reason = acceptedKeys.has(key) ? "accepted canonical marker" : sourcePageValidationReason(page, options);
        return `${pageLabelForDiagnostics(page)} -> ${reason}`;
      });
      return { label, lines };
    });
  }

  function createStudyScopeDiagnosticsDetails() {
    const details = document.createElement("details");
    details.className = "study-scope-source-diagnostics";
    const summary = document.createElement("summary");
    summary.textContent = "Study Scope Sources";
    details.appendChild(summary);
    studyScopeSourceDiagnostics().forEach(({ label, lines }) => {
      const section = document.createElement("div");
      section.className = "study-scope-source-group";
      const title = document.createElement("strong");
      title.textContent = `${label}:`;
      const pre = document.createElement("pre");
      pre.textContent = lines.length ? lines.join("\n") : "none";
      section.append(title, pre);
      details.appendChild(section);
    });
    return details;
  }
  function createStudyScopeCard() {
    const card = document.createElement("article");
    card.className = "study-card volume-context-card";
    const heading = document.createElement("h3");
    heading.textContent = "Study Scope";

    const frozenTarget = frozenAnalysisTargetRecord();
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const range = selectedRangeFromAnalyzedPages(analyzedPages);
    const activeLabel = activePage ? volumePageLabel(activePage) : "No active source page selected";
    const targetLooksLikePanel = /chrome-extension:.*study\.html|\/study\.html(?:$|[?#])/i.test(activePage?.activeUrl || "");
    const rows = [
      ["Frozen source target", frozenTarget ? volumePageLabel(frozenTarget) : "No frozen source target recorded"],
      ["Active Source Page", activeLabel],
      activePage ? ["Current Analysis Target", activeLabel + "\n" + (activePage.activeUrl || "No source URL recorded")] : ["Current Analysis Target", "No active source page selected. Open a scripture/source page or choose from analyzed pages."],
      ["Current Action", currentActionLine(activePage, analyzedPages)],
      ["Stored Session", range ? range.sessionLabel : "No stored analyzed pages"],
      ["Session Type", storedSessionTypeLabel(range)],
      ["Stored Session Pages", analyzedPages.length ? pageChipLines(analyzedPages).join(" ") : "none recorded"],
      ["Previously Analyzed / Retained Pages", retainedPagesLine(activePage, analyzedPages)],
      ["Session Data", analyzedPages.length ? String(analyzedPages.length) + " stored analyzed page(s)" : (activePage ? "cleared" : "not started")],
      ["Continuity", storedContinuityLine(activePage, analyzedPages)],
      ["Suggested Next", suggestedNextPageLine(activePage, range)],
      ["Cross-reference Set", crossReferenceSetLine()],
      [range && !range.isContiguous ? "Current Selected Pages" : "Current Range", range ? range.currentRangeLabel.replace(/^Selected pages only:/, "Selected/stored pages only:") : "No range selected"],
      ["Missing Pages", range ? (range.missingLabels.length ? range.missingLabels.join("\n") : "None") : "No range selected"],
      ["Current analysis status", analysisStatusLabel(activePage)],
      ["Active adapter", studyData.activeAdapter?.adapterName || activePage?.activeAdapterName || studyData.analysisStatus?.activeAdapterName || "not detected"],
      ["Last analyzed time", studyData.analysisStatus?.analyzedAt || "Never"],
      ...sourceIsolationWarningLines().map((line) => ["Source Isolation", line]),
      ...currentBrowserTabIgnoredLines().map((line) => [line.startsWith("Reason:") ? "Source Isolation Reason" : "Current Browser Tab", line]),
      ["Analysis Queue", analysisQueueSummaryLine()],
      ["Future range controls", "Select start page; Select end page; Analyze selected range; Analyze book; Analyze volume"],
      targetLooksLikePanel ? ["Target Warning", "Current target appears to be the Study Panel, not the source page. Analysis will use the stored active source target or require source selection; panel UI markup is not source content."] : null,
      !activePage ? ["Target Warning", "No active source page selected. Open a scripture/source page or choose from analyzed pages."] : null
    ].filter(Boolean);

    const list = document.createElement("dl");
    list.className = "volume-context-list";
    rows.forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = renderIceBeingDisplayText(value || "Not recorded", { divineContext: hasDivineDisplayContext([value]), preferHolySpirit: true });
      list.append(term, detail);
    });

    const queueDetails = createAnalysisQueueDetails();

    const pageWorkflow = document.createElement("div");
    pageWorkflow.className = "volume-context-action-group page-workflow-actions";
    const pageWorkflowHeading = document.createElement("h4");
    pageWorkflowHeading.textContent = "Page Workflow";
    const pageWorkflowHelp = document.createElement("p");
    pageWorkflowHelp.textContent = "Manual page-by-page navigation and selected-page cross-reference controls. Navigation does not analyze pages.";
    const pageWorkflowButtons = document.createElement("div");
    pageWorkflowButtons.className = "volume-context-actions";
    const crossReferenceRecords = crossReferenceSetRecords();
    const previousTarget = pageNavigationTarget(activePage || range?.end || {}, -1);
    const nextTarget = pageNavigationTarget(activePage || range?.end || {}, 1);
    const suggestedTarget = suggestedNextPageTarget(activePage, range);
    [
      ["Previous page", "previousPage", !previousTarget],
      ["Next page", "nextPage", !nextTarget],
      ["Open suggested next", "openSuggestedNext", !suggestedTarget],
      ["Analyze this page", "analyzeCurrentPage", false],
      ["Analyze and add this page to stored session", "analyzeAndAddToSession", false],
      ["Add this page to cross-reference set", "addActivePageToCrossReferenceSet", false],
      ["Show cross-reference set", "showCrossReferenceSet", !crossReferenceRecords.length],
      ["Clear cross-reference set", "clearCrossReferenceSet", !crossReferenceRecords.length]
    ].forEach(([label, action, disabled]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.volumeAction = action;
      button.textContent = label;
      button.disabled = Boolean(disabled);
      pageWorkflowButtons.appendChild(button);
    });
    pageWorkflow.append(pageWorkflowHeading, pageWorkflowHelp, pageWorkflowButtons);
    const actions = document.createElement("div");
    actions.className = "volume-context-actions";
    [
      ["Analyze active source page; keep stored pages", "analyzeCurrentPage"],
      ["Add analyzed active page to stored session", "addActivePageToSession"],
      ["Range re-analysis unavailable", "reanalyzeCurrentRange"],
      ["Clear current analyzed page data", "clearCurrentPageAnalysis"],
      ["Clear session analysis", "clearSessionAnalysis"],
      ["Clear all I.C.E. data", "clearAllSessionData"],
      ["Show analyzed pages", "showAnalyzedPages"],
      ["Show continuity map", "showContinuityMap"]
    ].forEach(([label, action]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.volumeAction = action;
      button.textContent = label;
      actions.appendChild(button);
    });

    card.append(heading, list, pageWorkflow, queueDetails, fullStudyDataLoaded ? createStudyScopeDiagnosticsDetails() : createDeferredStudyScopeDiagnosticsDetails(), actions);
    return card;
  }

  function renderVolumeContext(term) {
    const container = document.getElementById("volumeContextCards");
    const count = document.getElementById("volumeContextCount");
    if (!container || !count) return;
    clearElement(container);
    const activePage = activeSourcePageRecord();
    const analyzedPages = analyzedPageHistory();
    const contextText = [
      activePage?.sourceTitle,
      activePage?.sourceCaptureBook,
      activePage?.sourceCaptureChapter,
      activePage?.activeUrl,
      studyData.activeAdapter?.adapterName,
      analysisStatusLabel(activePage),
      analyzedPages.map(volumePageLabel).join(" "),
      selectedRangeFromAnalyzedPages(analyzedPages)?.sessionLabel,
      selectedRangeFromAnalyzedPages(analyzedPages)?.sessionType,
      selectedRangeFromAnalyzedPages(analyzedPages)?.missingLabels?.join(" "),
      continuitySummaryLines(activePage, analyzedPages).join(" "),
      analysisQueueSummaryLine(),
      analysisQueueDetailsLine()
    ].join(" ");
    count.textContent = "scope";
    if (term && !includesTerm(contextText, term)) {
      appendEmpty(container, "No study scope match.");
      return;
    }
    container.appendChild(createStudyScopeCard());
  }

  function createQueueSummaryCard() {
    const card = document.createElement("article");
    card.className = "study-card volume-context-card queue-summary-card";
    const heading = document.createElement("h3");
    heading.textContent = "Queue Summary";

    const list = document.createElement("dl");
    list.className = "volume-context-list";
    queueSummaryRows().forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value || "None";
      list.append(term, detail);
    });

    card.append(heading, list);
    return card;
  }

  function renderQueueSummary(term) {
    const container = document.getElementById("queueSummaryCards");
    const count = document.getElementById("queueSummaryCount");
    if (!container || !count) return;
    clearElement(container);
    count.textContent = "summary";
    if (term && !includesTerm(queueSummarySearchText(), term)) {
      appendEmpty(container, "No queue summary match.");
      return;
    }
    container.appendChild(createQueueSummaryCard());
  }
  function createAnalysisQueueDetails() {
    const records = analysisQueueRecords();
    const status = analysisQueueStatus();
    const counts = analysisQueueCounts(records);
    const candidate = selectedRangeQueueCandidate();
    const details = document.createElement("details");
    details.className = "study-scope-source-diagnostics analysis-queue-summary";
    const summary = document.createElement("summary");
    summary.textContent = `Analysis Queue - ${analysisQueueSummaryLine(records, status)}`;
    const body = document.createElement("div");
    body.className = "study-scope-source-diagnostics-body";
    const note = document.createElement("p");
    const current = currentQueueItem(records, status);
    note.textContent = records.length
      ? "Phase 2A queue runner is manual-confirm-per-page: Start selects an item; Open navigates one item; Analyze verifies the canonical result before marking done."
      : (candidate.reason || "Queue is empty. Build a selected range queue when ready.");
    const list = document.createElement("dl");
    list.className = "volume-context-list";
    [
      ["State", status.state],
      ["Current item", current ? `${current.label} (${current.status})` : "None selected"],
      ["Items", String(counts.total)],
      ["Pending", String(counts.pending)],
      ["Done", String(counts.done)],
      ["Failed", String(counts.failed)],
      ["Skipped", String(counts.skipped)],
      ["Result summaries", analysisQueuePageSummaryLine()],
      ["Queue contents", analysisQueueDetailsLine(records)],
      ["Summary contents", analysisQueuePageSummaryDetails()]
    ].forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value || "None";
      list.append(term, detail);
    });
    const buttons = document.createElement("div");
    buttons.className = "volume-context-actions";
    const hasFailed = counts.failed > 0;
    const hasCompleted = counts.done + counts.skipped > 0;
    const hasCurrent = Boolean(current);
    const hasRunnableCurrent = Boolean(current && ["pending", "running"].includes(current.status));
    [
      ["Build selected range queue", "buildSelectedRangeQueue", !candidate.items.length],
      ["Show queue", "showAnalysisQueue", !records.length],
      ["Clear queue", "clearAnalysisQueue", !records.length],
      ["Start queue", "startAnalysisQueue", !records.length || status.state === "running"],
      ["Open current queue item", "openCurrentQueueItem", !hasRunnableCurrent || status.state !== "running"],
      ["Analyze current queue item", "analyzeCurrentQueueItem", !hasRunnableCurrent || status.state !== "running"],
      ["Next queue item", "selectNextQueueItem", !records.some((item) => item.status === "pending")],
      ["Pause queue", "pauseAnalysisQueue", !records.length || status.state !== "running"],
      ["Resume queue", "resumeAnalysisQueue", !records.length || status.state !== "paused"],
      ["Cancel queue", "cancelAnalysisQueue", !records.length || status.state === "canceled"],
      ["Retry failed", "retryFailedQueueItems", !hasFailed],
      ["Clear completed", "clearCompletedQueueItems", !hasCompleted]
    ].forEach(([label, action, disabled]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.volumeAction = action;
      button.textContent = label;
      button.disabled = Boolean(disabled);
      buttons.appendChild(button);
    });
    body.append(note, list, buttons);
    details.append(summary, body);
    return details;
  }

  function sourceContentTabCandidate(tab = {}) {
    const url = normalizeText(tab.url || "");
    return Boolean(tab?.id && /^https?:/i.test(url) && !isPanelUiUrl(url) && !/^chrome-extension:/i.test(url) && validStudySourceUrl(url));
  }

  async function rerunFormatterOnTab(tabId) {
    if (!tabId) return false;
    try {
      await chrome.tabs.sendMessage(tabId, { type: "ICE_RERUN_FORMATTER" });
      return true;
    } catch (_error) {
      try {
        await chrome.scripting.executeScript({ target: { tabId }, files: ["engine.js", "content.js"] });
        return true;
      } catch (_scriptError) {
        return false;
      }
    }
  }

  async function rerunFormatterOnActiveContentTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs.find(sourceContentTabCandidate);
    return rerunFormatterOnTab(tab?.id);
  }

  function sameQueueItemUrl(left = "", right = "") {
    return normalizeText(left).replace(/\/+$/, "") === normalizeText(right).replace(/\/+$/, "");
  }

  async function rerunFormatterOnQueueItemTab(item = {}) {
    const itemUrl = normalizeText(item.url || "");
    if (!itemUrl) return false;
    const tabs = await chrome.tabs.query({});
    const tab = tabs.find((candidate) => sourceContentTabCandidate(candidate) && sameQueueItemUrl(candidate.url || "", itemUrl));
    return rerunFormatterOnTab(tab?.id);
  }

  async function persistActiveSourcePage(page = activeSourcePageRecord()) {
    if (!page) return null;
    await chrome.storage.local.set({ [STORAGE_KEYS.activeSourcePage]: page });
    return page;
  }

  async function addActivePageToSession() {
    const activePage = currentAnalyzedStatusRecord();
    const activeKey = pageRecordKey(activePage || {});
    const hasCanonicalMarker = analyzedPageHistory().some((page) => (page.pageKey || pageRecordKey(page)) === activeKey);
    if (!activePage || !hasCanonicalMarker) {
      showDiagnosticMessage("Only a canonical confirmed analyzed scripture/source page can be added to the study session.");
      return;
    }
    await persistActiveSourcePage(activePage);
    const nextHistory = [activePage, ...analyzedPageHistory()]
      .filter((item) => validSourcePageRecord(item, { requireAnalyzed: true }))
      .filter((item, index, items) => items.findIndex((candidate) => pageRecordKey(candidate) === pageRecordKey(item)) === index)
      .slice(0, 24);
    await chrome.storage.local.set({
      [STORAGE_KEYS.analysisHistory]: nextHistory,
      [STORAGE_KEYS.selectedRange]: rangeFromAnalyzedPages(nextHistory),
      [STORAGE_KEYS.panelUiState]: { lastAction: "add_active_page_to_session", updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage(`${volumePageLabel(activePage)} added to the study session.`);
  }

  async function runAnalysisFromStudyPanel() {
    showDiagnosticMessage("Running active source page analysis...");
    const pageUpdated = await rerunFormatterOnActiveContentTab();
    const activePage = activeSourcePageRecord();
    if (!pageUpdated && !activePage) {
      showDiagnosticMessage("No active source page selected. Open a scripture/source page or choose from analyzed pages.");
      return;
    }
    if (activePage) await persistActiveSourcePage(activePage);
    const response = await chrome.runtime.sendMessage({
      type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
      reason: pageUpdated ? "study-scope-active-source" : "study-scope-stored-source"
    });
    if (!response?.ok) throw new Error(response?.error || "Analysis pipeline failed.");
    await refreshStudyData();
    showDiagnosticMessage(pageUpdated ? "Active source page analysis complete." : "Stored active source analysis complete.");
  }

  async function clearCurrentPageAnalysis() {
    const activePage = activeSourcePageRecord();
    const currentKey = pageRecordKey(activePage || pageRecordFromStatus(studyData.analysisStatus || {}) || {});
    const remainingHistory = analyzedPageHistory().filter((item) => pageRecordKey(item) !== currentKey);
    const remainingCanonical = asArray(studyData.canonicalAnalyzedPages).filter((item) => item.pageKey !== currentKey);
    const remainingJourneySnapshots = asArray(studyData.journeyPageSnapshots).filter((item) => item.pageKey !== currentKey);

    await chrome.storage.local.remove([
      STORAGE_KEYS.timelineItems,
      STORAGE_KEYS.eventItems,
      STORAGE_KEYS.orderedEvents,
      STORAGE_KEYS.actorTimelines,
      STORAGE_KEYS.interactionGraph,
      STORAGE_KEYS.sceneModels,
      STORAGE_KEYS.semanticEvents,
      STORAGE_KEYS.semanticFlowChains,
      STORAGE_KEYS.entityRegistry,
      STORAGE_KEYS.relationshipGraph,
      STORAGE_KEYS.canonicalIdentities,
      STORAGE_KEYS.mentionIndex,
      STORAGE_KEYS.domSemanticHints,
      STORAGE_KEYS.sourceAdapters,
      STORAGE_KEYS.activeAdapter,
      STORAGE_KEYS.scopeIntegrity,
      STORAGE_KEYS.sourceDiscoveryIndex,
      STORAGE_KEYS.referenceGraph,
      STORAGE_KEYS.passageFunctions,
      STORAGE_KEYS.revelationPatterns,
      STORAGE_KEYS.referenceRoles,
      STORAGE_KEYS.semanticDistinctions,
      STORAGE_KEYS.ontologyRoles,
      STORAGE_KEYS.semanticAmbiguities,
      STORAGE_KEYS.originAuthorityPaths,
      STORAGE_KEYS.entityRelationRoles,
      STORAGE_KEYS.semanticContinuity,
      STORAGE_KEYS.movementSemantics,
      STORAGE_KEYS.semanticCausality,
      STORAGE_KEYS.teachingSemantics,
      STORAGE_KEYS.principleRelationships,
      STORAGE_KEYS.characterInteractions,
      STORAGE_KEYS.sessionContinuityReview,
      STORAGE_KEYS.knowledgeGraph,
      STORAGE_KEYS.principleNetworks,
      STORAGE_KEYS.focusLens,
      STORAGE_KEYS.scopeLens,
      STORAGE_KEYS.depthLens,
      STORAGE_KEYS.semanticQuestions,
      STORAGE_KEYS.trustVerification,
      STORAGE_KEYS.gptReviewReport,
      STORAGE_KEYS.entityRoleItems,
      STORAGE_KEYS.principleItems,
      STORAGE_KEYS.prophecyLinks,
      STORAGE_KEYS.analysisStatus
    ]);
    await chrome.storage.local.set({
      [STORAGE_KEYS.analysisHistory]: remainingHistory,
      [STORAGE_KEYS.canonicalAnalyzedPages]: remainingCanonical,
      [STORAGE_KEYS.journeyPageSnapshots]: remainingJourneySnapshots,
      [STORAGE_KEYS.activeSourcePage]: activePage,
      [STORAGE_KEYS.selectedRange]: rangeFromAnalyzedPages(remainingHistory),
      [STORAGE_KEYS.panelUiState]: { lastAction: "clear_active_page_analysis", updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage(activePage ? `Active source target preserved: ${volumePageLabel(activePage)}.` : "Active page analysis cleared.");
  }

  async function clearSessionAnalysis() {
    await chrome.storage.local.remove([
      STORAGE_KEYS.timelineItems,
      STORAGE_KEYS.eventItems,
      STORAGE_KEYS.orderedEvents,
      STORAGE_KEYS.actorTimelines,
      STORAGE_KEYS.interactionGraph,
      STORAGE_KEYS.sceneModels,
      STORAGE_KEYS.semanticEvents,
      STORAGE_KEYS.semanticFlowChains,
      STORAGE_KEYS.entityRegistry,
      STORAGE_KEYS.relationshipGraph,
      STORAGE_KEYS.canonicalIdentities,
      STORAGE_KEYS.mentionIndex,
      STORAGE_KEYS.domSemanticHints,
      STORAGE_KEYS.sourceAdapters,
      STORAGE_KEYS.activeAdapter,
      STORAGE_KEYS.scopeIntegrity,
      STORAGE_KEYS.sourceDiscoveryIndex,
      STORAGE_KEYS.referenceGraph,
      STORAGE_KEYS.passageFunctions,
      STORAGE_KEYS.revelationPatterns,
      STORAGE_KEYS.referenceRoles,
      STORAGE_KEYS.semanticDistinctions,
      STORAGE_KEYS.ontologyRoles,
      STORAGE_KEYS.semanticAmbiguities,
      STORAGE_KEYS.originAuthorityPaths,
      STORAGE_KEYS.entityRelationRoles,
      STORAGE_KEYS.semanticContinuity,
      STORAGE_KEYS.movementSemantics,
      STORAGE_KEYS.semanticCausality,
      STORAGE_KEYS.teachingSemantics,
      STORAGE_KEYS.principleRelationships,
      STORAGE_KEYS.characterInteractions,
      STORAGE_KEYS.sessionContinuityReview,
      STORAGE_KEYS.knowledgeGraph,
      STORAGE_KEYS.principleNetworks,
      STORAGE_KEYS.focusLens,
      STORAGE_KEYS.scopeLens,
      STORAGE_KEYS.depthLens,
      STORAGE_KEYS.semanticQuestions,
      STORAGE_KEYS.trustVerification,
      STORAGE_KEYS.gptReviewReport,
      STORAGE_KEYS.entityRoleItems,
      STORAGE_KEYS.principleItems,
      STORAGE_KEYS.prophecyLinks,
      STORAGE_KEYS.analysisStatus,
      STORAGE_KEYS.analysisHistory,
      STORAGE_KEYS.canonicalAnalyzedPages,
      STORAGE_KEYS.journeyPageSnapshots,
      STORAGE_KEYS.activeSourcePage,
      STORAGE_KEYS.selectedRange
    ]);
    await chrome.storage.local.set({
      [STORAGE_KEYS.panelUiState]: { lastAction: "clear_session_analysis", updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage("Session data cleared. No analyzed pages, active source target, or selected range remain.");
  }

  async function clearAllSessionData() {
    if (!window.confirm("Clear all local I.C.E. data for this browser profile?")) return;
    await chrome.storage.local.remove(Object.values(STORAGE_KEYS));
    await refreshStudyData();
    showDiagnosticMessage("All local I.C.E. data cleared.");
  }

  function scrollToStudySection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.classList.add("study-section-highlight");
    window.setTimeout(() => section.classList.remove("study-section-highlight"), 1600);
  }

  async function navigateToSourcePage(target, actionName = "page_navigation") {
    if (!target?.url) {
      showDiagnosticMessage("No source page navigation target is available.");
      return;
    }
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const contentTab = tabs.find(sourceContentTabCandidate);
    if (contentTab?.id) {
      await chrome.tabs.update(contentTab.id, { url: target.url, active: true });
    } else {
      await chrome.tabs.create({ url: target.url, active: true });
    }
    await chrome.storage.local.set({
      [STORAGE_KEYS.activeSourcePage]: target.page,
      [STORAGE_KEYS.panelUiState]: { lastAction: actionName, updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage(`Opened ${target.label}. Analyze manually when ready; navigation did not run analysis.`);
  }

  async function analyzeAndAddActivePageToSession() {
    await runAnalysisFromStudyPanel();
    await addActivePageToSession();
  }

  function crossReferenceCandidatePage() {
    return validSourcePageRecord(studyData.activeSourcePage) ? studyData.activeSourcePage : activeSourcePageRecord();
  }

  async function addActivePageToCrossReferenceSet() {
    const page = crossReferenceCandidatePage();
    const record = crossReferenceRecordFromPage(page || {});
    if (!record) {
      showDiagnosticMessage("Open or select a supported scripture/source page before adding it to the cross-reference set.");
      return;
    }
    const nextSet = [record, ...crossReferenceSetRecords()]
      .filter((item, index, items) => items.findIndex((candidate) => candidate.canonicalKey === item.canonicalKey) === index)
      .slice(0, 48);
    await chrome.storage.local.set({
      [STORAGE_KEYS.crossReferenceSet]: nextSet,
      [STORAGE_KEYS.activeSourcePage]: page,
      [STORAGE_KEYS.panelUiState]: { lastAction: "add_active_page_to_cross_reference_set", updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage(`${record.label} selected for cross-reference. ${record.analyzed ? "Analyzed" : "Not analyzed yet"}.`);
  }

  async function clearCrossReferenceSet() {
    await chrome.storage.local.set({
      [STORAGE_KEYS.crossReferenceSet]: [],
      [STORAGE_KEYS.panelUiState]: { lastAction: "clear_cross_reference_set", updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage("Cross-reference set cleared. Stored analyzed session data was not changed.");
  }

  function showCrossReferenceSet() {
    showDiagnosticMessage(crossReferenceSetLine());
    scrollToStudySection("volumeContextSection");
  }
  async function writeAnalysisQueue(records, statusPatch = {}, action = "queue_update", message = "Queue updated.") {
    const queue = analysisQueueRecords(records);
    const previousStatus = analysisQueueStatus();
    const status = { ...previousStatus, ...statusPatch, updatedAt: new Date().toISOString() };
    const history = [analysisQueueHistoryEvent(action, message), ...asArray(studyData.analysisQueueHistory)].slice(0, 50);
    await chrome.storage.local.set({
      [STORAGE_KEYS.analysisQueue]: queue,
      [STORAGE_KEYS.analysisQueueStatus]: status,
      [STORAGE_KEYS.analysisQueueHistory]: history,
      [STORAGE_KEYS.analysisQueueManifest]: analysisQueueManifest(queue, queue[0]?.source || "range"),
      [STORAGE_KEYS.panelUiState]: { lastAction: action, updatedAt: new Date().toISOString() }
    });
    await refreshStudyData();
    showDiagnosticMessage(message);
  }

  async function buildSelectedRangeQueue() {
    const candidate = selectedRangeQueueCandidate();
    if (!candidate.items.length) {
      showDiagnosticMessage(candidate.reason || "No supported selected range queue can be built yet.");
      return;
    }
    await writeAnalysisQueue(candidate.items, {
      state: "idle",
      currentItemId: "",
      message: "Queue built. Click Start queue when ready; Phase 2A selects one item and still requires explicit open/analyze clicks.",
      startedAt: "",
      pausedAt: "",
      canceledAt: ""
    }, "build_selected_range_queue", `Built selected range queue with ${candidate.items.length} pending item(s). Start queue remains manual.`);
  }

  function showAnalysisQueue() {
    showDiagnosticMessage(analysisQueueSummaryLine() + "\n" + analysisQueueDetailsLine());
    scrollToStudySection("volumeContextSection");
  }

  async function clearAnalysisQueue() {
    await writeAnalysisQueue([], { state: "idle", currentItemId: "", message: "Queue cleared.", startedAt: "", pausedAt: "", canceledAt: "" }, "clear_analysis_queue", "Analysis queue cleared. Analyzed pages and cross-reference set were not changed.");
  }

  async function startAnalysisQueue() {
    const records = analysisQueueRecords();
    if (!records.length) {
      showDiagnosticMessage("Build a queue before starting it.");
      return;
    }
    const current = currentQueueItem(records, analysisQueueStatus());
    const selected = current?.status === "pending" || current?.status === "running" ? current : firstPendingQueueItem(records);
    if (!selected) {
      await writeAnalysisQueue(records, { state: "complete", currentItemId: "", message: "No pending queue items remain.", pausedAt: "", canceledAt: "" }, "start_analysis_queue", "No pending queue items remain. Nothing was analyzed.");
      return;
    }
    await writeAnalysisQueue(records, {
      state: "running",
      currentItemId: selected.id,
      message: `Current queue item selected: ${selected.label}. Open it manually, then analyze current queue item.`,
      startedAt: new Date().toISOString(),
      pausedAt: "",
      canceledAt: ""
    }, "start_analysis_queue", `Queue running. Current item selected: ${selected.label}. No navigation or analysis occurred.`);
  }

  async function openCurrentQueueItem() {
    const status = analysisQueueStatus();
    if (status.state !== "running") {
      showDiagnosticMessage("Start or resume the queue before opening the current queue item.");
      return;
    }
    const item = currentQueueItem(analysisQueueRecords(), status);
    if (!item) {
      showDiagnosticMessage("No current queue item is selected.");
      return;
    }
    if (!["pending", "running"].includes(item.status)) {
      showDiagnosticMessage("Select a pending queue item before opening it.");
      return;
    }
    const page = queueItemPageRecord(item);
    await navigateToSourcePage({ url: item.url, label: item.label, page }, "open_current_queue_item");
    await writeAnalysisQueue(analysisQueueRecords(), {
      state: "running",
      currentItemId: item.id,
      message: `Opened ${item.label}. Analyze current queue item when ready.`
    }, "open_current_queue_item", `Opened ${item.label}. Navigation only; no analysis occurred.`);
  }

  function analyzedCanonicalKeyFromStatus(status = {}) {
    const page = pageRecordFromStatus(status);
    return page ? pageRecordKey(page) : "";
  }

  function canonicalMatchForQueueItem(item = {}, status = studyData.analysisStatus || {}) {
    const statusKey = analyzedCanonicalKeyFromStatus(status);
    const targetKey = pageRecordFromCanonicalMarker(studyData.canonicalAnalysisTarget || {})?.pageKey || "";
    const actualKey = targetKey || statusKey || "";
    return {
      matched: Boolean(item.canonicalKey && (item.canonicalKey === statusKey || item.canonicalKey === targetKey)),
      actualKey
    };
  }

  function analysisPipelineStatus(responseStatus = {}) {
    if (responseStatus?.sourceCaptureTitle || responseStatus?.activeUrl || responseStatus?.sourceCaptureBook) return responseStatus;
    return responseStatus?.[STORAGE_KEYS.analysisStatus] || studyData.analysisStatus || {};
  }

  function latestCaptureCanonicalKey() {
    const page = pageRecordFromCapture(studyData.latestCapture || {});
    return page ? pageRecordKey(page) : "";
  }

  async function failCurrentQueueItem(item, message, actualKey = "") {
    await writeQueuePageSummary(queuePageFailedSummary({ ...item, attempts: item.attempts + 1 }, message, actualKey));
    await writeAnalysisQueue(updateQueueItem(analysisQueueRecords(), item.id, {
      status: "failed",
      error: message,
      failedAt: new Date().toISOString(),
      completedAt: "",
      lastAttemptedUrl: item.url,
      expectedCanonicalKey: item.canonicalKey,
      actualAnalyzedCanonicalKey: actualKey || ""
    }), {
      state: "running",
      currentItemId: item.id,
      message
    }, "analyze_current_queue_item_failed", message);
  }

  async function analyzeCurrentQueueItem() {
    const status = analysisQueueStatus();
    if (status.state !== "running") {
      showDiagnosticMessage("Queue must be running before analyzing the current queue item.");
      return;
    }
    const item = currentQueueItem(analysisQueueRecords(), status);
    if (!item) {
      showDiagnosticMessage("No current queue item is selected.");
      return;
    }
    if (!["pending", "running"].includes(item.status)) {
      showDiagnosticMessage("Select a pending queue item before analyzing it.");
      return;
    }
    const startedAt = new Date().toISOString();
    await writeAnalysisQueue(updateQueueItem(analysisQueueRecords(), item.id, {
      status: "running",
      attempts: item.attempts + 1,
      startedAt,
      lastAttemptedUrl: item.url,
      expectedCanonicalKey: item.canonicalKey,
      error: "",
      failedAt: "",
      actualAnalyzedCanonicalKey: ""
    }), {
      state: "running",
      currentItemId: item.id,
      message: `Analyzing ${item.label}; waiting for canonical match.`
    }, "analyze_current_queue_item_started", `Analyzing current queue item: ${item.label}.`);

    try {
      const pageUpdated = await rerunFormatterOnQueueItemTab(item) || await rerunFormatterOnActiveContentTab();
      await refreshStudyData();
      const captureKey = latestCaptureCanonicalKey();
      if (captureKey && item.canonicalKey && captureKey !== item.canonicalKey) {
        const message = `Canonical mismatch before analysis. Expected ${item.canonicalKey}; current capture is ${captureKey}.`;
        await failCurrentQueueItem(item, message, captureKey);
        return;
      }
      const response = await chrome.runtime.sendMessage({
        type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
        reason: pageUpdated ? "queue-current-item" : "queue-current-item-stored-source"
      });
      if (!response?.ok) throw new Error(response?.error || "Analysis pipeline failed.");
      await refreshStudyData();
      const verified = canonicalMatchForQueueItem(item, analysisPipelineStatus(response.status));
      if (!verified.matched) {
        const message = `Canonical mismatch after analysis. Expected ${item.canonicalKey}; got ${verified.actualKey || "none"}.`;
        await failCurrentQueueItem(item, message, verified.actualKey || "");
        return;
      }
      await writeQueuePageSummary(queuePageDoneSummary(item, verified));
      const remainingRecords = updateQueueItem(analysisQueueRecords(), item.id, {
        status: "done",
        error: "",
        completedAt: new Date().toISOString(),
        failedAt: "",
        lastAttemptedUrl: item.url,
        expectedCanonicalKey: item.canonicalKey,
        actualAnalyzedCanonicalKey: verified.actualKey || item.canonicalKey
      });
      await writeAnalysisQueue(remainingRecords, {
        state: "running",
        currentItemId: item.id,
        message: `${item.label} analyzed and verified. Click Next queue item to continue.`
      }, "analyze_current_queue_item_done", `${item.label} marked done after canonical match. No next item was opened or analyzed automatically.`);
    } catch (error) {
      await writeQueuePageSummary(queuePageFailedSummary({ ...item, attempts: item.attempts + 1 }, error.message, ""));
      await writeAnalysisQueue(updateQueueItem(analysisQueueRecords(), item.id, {
        status: "failed",
        error: error.message,
        failedAt: new Date().toISOString(),
        completedAt: "",
        lastAttemptedUrl: item.url,
        expectedCanonicalKey: item.canonicalKey,
        actualAnalyzedCanonicalKey: ""
      }), {
        state: "running",
        currentItemId: item.id,
        message: `Queue item failed: ${error.message}`
      }, "analyze_current_queue_item_failed", `Queue item failed: ${error.message}`);
    }
  }

  async function selectNextQueueItem() {
    const records = analysisQueueRecords();
    const next = nextPendingQueueItem(records, analysisQueueStatus().currentItemId);
    if (!next) {
      await writeAnalysisQueue(records, { state: "complete", currentItemId: "", message: "No pending queue items remain." }, "select_next_queue_item", "No pending queue items remain. Nothing opened or analyzed.");
      return;
    }
    await writeAnalysisQueue(records, {
      state: analysisQueueStatus().state === "paused" ? "paused" : "running",
      currentItemId: next.id,
      message: `Current queue item selected: ${next.label}. Open it manually, then analyze current queue item.`
    }, "select_next_queue_item", `Selected next queue item: ${next.label}. No navigation or analysis occurred.`);
  }

  async function pauseAnalysisQueue() {
    await writeAnalysisQueue(analysisQueueRecords(), { state: "paused", message: "Queue paused.", pausedAt: new Date().toISOString() }, "pause_analysis_queue", "Queue paused. No queue item will open or analyze until resumed.");
  }

  async function resumeAnalysisQueue() {
    const records = analysisQueueRecords();
    const current = currentQueueItem(records, analysisQueueStatus()) || firstPendingQueueItem(records);
    await writeAnalysisQueue(records, { state: "running", currentItemId: current?.id || "", message: current ? `Queue resumed at ${current.label}.` : "Queue resumed with no pending items.", pausedAt: "" }, "resume_analysis_queue", current ? `Queue resumed at ${current.label}. Open/analyze still requires explicit clicks.` : "Queue resumed with no pending items.");
  }

  async function cancelAnalysisQueue() {
    await writeAnalysisQueue(analysisQueueRecords(), { state: "canceled", message: "Queue canceled.", canceledAt: new Date().toISOString() }, "cancel_analysis_queue", "Queue canceled. Item statuses remain intact and no processing is active.");
  }

  async function retryFailedQueueItems() {
    const records = analysisQueueRecords().map((item) => item.status === "failed" ? { ...item, status: "pending", error: "", failedAt: "", actualAnalyzedCanonicalKey: "" } : item);
    await writeAnalysisQueue(records, { state: "idle", currentItemId: "", message: "Failed queue items reset to pending." }, "retry_failed_queue_items", "Failed queue items reset to pending. Start queue remains manual.");
  }

  async function clearCompletedQueueItems() {
    const records = analysisQueueRecords().filter((item) => !["done", "skipped"].includes(item.status));
    const currentId = records.some((item) => item.id === analysisQueueStatus().currentItemId) ? analysisQueueStatus().currentItemId : "";
    await writeAnalysisQueue(records, { state: records.length ? analysisQueueStatus().state : "idle", currentItemId: currentId, message: "Completed/skipped queue items cleared." }, "clear_completed_queue_items", "Completed/skipped queue items cleared. Analyzed pages were not changed.");
  }

  function handleVolumeContextAction(event) {
    const button = event.target.closest("button[data-volume-action]");
    if (!button) return;
    const action = button.dataset.volumeAction;
    if (action === "previousPage") {
      const target = pageNavigationTarget(activeSourcePageRecord() || selectedRangeFromAnalyzedPages(analyzedPageHistory())?.end || {}, -1);
      navigateToSourcePage(target, "previous_page_navigation").catch((error) => showDiagnosticMessage(`Navigation failed: ${error.message}`));
    } else if (action === "nextPage") {
      const target = pageNavigationTarget(activeSourcePageRecord() || selectedRangeFromAnalyzedPages(analyzedPageHistory())?.end || {}, 1);
      navigateToSourcePage(target, "next_page_navigation").catch((error) => showDiagnosticMessage(`Navigation failed: ${error.message}`));
    } else if (action === "openSuggestedNext") {
      const target = suggestedNextPageTarget(activeSourcePageRecord(), selectedRangeFromAnalyzedPages(analyzedPageHistory()));
      navigateToSourcePage(target, "open_suggested_next").catch((error) => showDiagnosticMessage(`Navigation failed: ${error.message}`));
    } else if (action === "analyzeCurrentPage") {
      runAnalysisFromStudyPanel().catch((error) => showDiagnosticMessage(`Analysis failed: ${error.message}`));
    } else if (action === "analyzeAndAddToSession") {
      analyzeAndAddActivePageToSession().catch((error) => showDiagnosticMessage(`Analyze/add failed: ${error.message}`));
    } else if (action === "addActivePageToSession") {
      addActivePageToSession().catch((error) => showDiagnosticMessage(`Add failed: ${error.message}`));
    } else if (action === "addActivePageToCrossReferenceSet") {
      addActivePageToCrossReferenceSet().catch((error) => showDiagnosticMessage(`Add failed: ${error.message}`));
    } else if (action === "buildSelectedRangeQueue") {
      buildSelectedRangeQueue().catch((error) => showDiagnosticMessage(`Queue build failed: ${error.message}`));
    } else if (action === "showAnalysisQueue") {
      showAnalysisQueue();
    } else if (action === "clearAnalysisQueue") {
      clearAnalysisQueue().catch((error) => showDiagnosticMessage(`Queue clear failed: ${error.message}`));
    } else if (action === "startAnalysisQueue") {
      startAnalysisQueue().catch((error) => showDiagnosticMessage(`Queue start failed: ${error.message}`));
    } else if (action === "openCurrentQueueItem") {
      openCurrentQueueItem().catch((error) => showDiagnosticMessage(`Queue navigation failed: ${error.message}`));
    } else if (action === "analyzeCurrentQueueItem") {
      analyzeCurrentQueueItem().catch((error) => showDiagnosticMessage(`Queue analysis failed: ${error.message}`));
    } else if (action === "selectNextQueueItem") {
      selectNextQueueItem().catch((error) => showDiagnosticMessage(`Queue selection failed: ${error.message}`));
    } else if (action === "pauseAnalysisQueue") {
      pauseAnalysisQueue().catch((error) => showDiagnosticMessage(`Queue pause failed: ${error.message}`));
    } else if (action === "resumeAnalysisQueue") {
      resumeAnalysisQueue().catch((error) => showDiagnosticMessage(`Queue resume failed: ${error.message}`));
    } else if (action === "cancelAnalysisQueue") {
      cancelAnalysisQueue().catch((error) => showDiagnosticMessage(`Queue cancel failed: ${error.message}`));
    } else if (action === "retryFailedQueueItems") {
      retryFailedQueueItems().catch((error) => showDiagnosticMessage(`Queue retry failed: ${error.message}`));
    } else if (action === "clearCompletedQueueItems") {
      clearCompletedQueueItems().catch((error) => showDiagnosticMessage(`Queue cleanup failed: ${error.message}`));
    } else if (action === "reanalyzeCurrentRange") {
      showDiagnosticMessage("Range re-analysis is ready as a controlled UI concept, but automatic range crawling is not enabled yet. Build a queue explicitly when ready; queued pages remain pending until future processing is approved.");
    } else if (action === "clearCurrentPageAnalysis") {
      clearCurrentPageAnalysis().catch((error) => showDiagnosticMessage(`Clear failed: ${error.message}`));
    } else if (action === "clearSessionAnalysis") {
      clearSessionAnalysis().catch((error) => showDiagnosticMessage(`Clear failed: ${error.message}`));
    } else if (action === "clearAllSessionData") {
      clearAllSessionData().catch((error) => showDiagnosticMessage(`Clear failed: ${error.message}`));
    } else if (action === "showAnalyzedPages") {
      loadDeferredSection("Current Page").then(() => scrollToStudySection("currentPageSection"));
    } else if (action === "showContinuityMap") {
      loadDeferredSection("Semantic Continuity").then(() => scrollToStudySection("semanticContinuitySection"));
    } else if (action === "showCrossReferenceSet") {
      showCrossReferenceSet();
    } else if (action === "clearCrossReferenceSet") {
      clearCrossReferenceSet().catch((error) => showDiagnosticMessage(`Clear failed: ${error.message}`));
    }
  }  function renderCurrentPage(term) {
    const container = document.getElementById("currentPageSummary");
    const count = document.getElementById("currentPageCount");
    const capture = studyData.latestCapture;
    const history = Array.isArray(studyData.captureHistory)
      ? studyData.captureHistory
      : [];

    clearElement(container);
    count.textContent = capture?.text ? "1 current" : "0 current";

    if (!capture?.text) {
      appendEmpty(container, "No current capture yet.");
      return;
    }

    const searchable = [
      capture.title,
      capture.url,
      capture.text
    ].join(" ");

    if (!includesTerm(searchable, term)) {
      appendEmpty(container, "No current capture match.");
      return;
    }

    container.appendChild(createCard(
      capture.title || "Current capture",
      trimText(capture.text, 220),
      [
        capture.url || "",
        `${capture.wordCount || 0} words`,
        `${capture.characterCount || 0} chars`,
        `${capture.divineReferenceCount || 0} divine refs`
      ].filter(Boolean).join(" | ")
    ));

    if (history.length > 0) {
      container.appendChild(createCard(
        "Saved capture library",
        "Local captures are ready for document library, source collections, and historical comparison.",
        `${history.length} saved capture(s)`
      ));
    }
  }

  function inferDisplaySourceContext(capture) {
    if (!capture) return null;
    const title = normalizeText(capture.title || "");
    const url = normalizeText(capture.url || "");
    const titleMatch = title.match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
    const urlMatch = url.match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);
    const urlBooks = {
      matt: "Matthew",
      mark: "Mark",
      luke: "Luke",
      john: "John"
    };
    const book = titleMatch?.[1] || (urlMatch ? urlBooks[urlMatch[1].toLowerCase()] : "");
    const chapter = titleMatch?.[2] || urlMatch?.[2] || "";
    const looksScripture = /\b(Matthew|Mark|Luke|John)\b/i.test(`${title} ${url}`) ||
      /\/scriptures\//i.test(url);

    const traditionalAuthors = {
      Matthew: "Matthew",
      Mark: "Mark",
      Luke: "Luke",
      John: "John"
    };
    const traditionalAuthor = looksScripture && book ? traditionalAuthors[book] || "" : "";

    return {
      sourceCaptureId: capture.id || "",
      sourceTitle: title,
      sourceUrl: url,
      sourceType: looksScripture ? "scripture" : "unknown",
      collection: looksScripture ? "scripture" : "unknown",
      sourceCollection: looksScripture ? "scripture" : "unknown",
      book,
      chapter,
      section: "",
      author: "",
      traditionalAuthor,
      speaker: "",
      compiler: "",
      translator: "",
      authorConfidence: traditionalAuthor ? "traditional-attribution" : "",
      authorBasis: traditionalAuthor ? "book/source metadata" : "",
      explicitDate: "",
      inferredDate: "",
      timeRange: "",
      confidence: looksScripture ? "probable" : "possible"
    };
  }

  function findSourceContext() {
    const candidates = [
      ...(asArray(studyData.sceneModels)),
      ...(asArray(studyData.orderedEvents)),
      ...(asArray(studyData.actorTimelines).flatMap((actor) => asArray(actor.sourceContexts))),
      ...(asArray(studyData.interactionGraph)),
      ...(asArray(studyData.principleItems)),
      ...(asArray(studyData.prophecyLinks)),
      ...(asArray(studyData.timelineItems))
    ];

    return candidates.find((item) => item?.sourceContext)?.sourceContext ||
      candidates.find((item) => item?.sourceTitle || item?.sourceUrl) ||
      inferDisplaySourceContext(studyData.latestCapture);
  }

  function formatSourceContext(context) {
    return [
      context.collection ? `Collection: ${context.collection}` : "",
      context.sourceCollection && context.sourceCollection !== context.collection ? `Source Collection: ${context.sourceCollection}` : "",
      context.sourceType ? `Type: ${context.sourceType}` : "",
      context.book ? `Book: ${context.book}` : "",
      context.chapter ? `Chapter: ${context.chapter}` : "",
      context.section ? `Section: ${context.section}` : "",
      context.author ? `Author: ${context.author}` : "",
      context.traditionalAuthor ? `Believed Author: ${context.traditionalAuthor}` : "",
      context.authorConfidence ? displayAppConfidence(context.authorConfidence) : "",
      context.authorBasis ? `Author Basis: ${context.authorBasis}` : "",
      context.speaker ? `Speaker: ${context.speaker}` : "",
      context.compiler ? `Compiler: ${context.compiler}` : "",
      context.translator ? `Translator: ${context.translator}` : "",
      context.explicitDate ? `Date: ${context.explicitDate}` : "",
      context.inferredDate ? `Inferred date: ${context.inferredDate}` : "",
      context.timeRange ? `Range: ${context.timeRange}` : "",
      context.confidence ? displayAppConfidence(context.confidence, "Source App accuracy") : ""
    ].filter(Boolean).join("\n");
  }

  function sourceDescriptionCandidates(context = {}) {
    const capture = studyData.latestCapture || {};
    const active = studyData.activeAdapter || {};
    const captureMetadata = capture.metadata || capture.meta || {};
    const captureSourceContext = capture.sourceContext || {};
    const candidates = [
      capture.sourceDescription,
      capture.description,
      capture.pageDescription,
      capture.chapterDescription,
      captureMetadata.description,
      captureMetadata.pageDescription,
      captureMetadata.chapterDescription,
      captureSourceContext.description,
      captureSourceContext.sourceDescription,
      context.description,
      context.sourceDescription,
      context.pageDescription,
      context.chapterDescription,
      active.sourceDescription,
      active.description,
      active.pageDescription,
      active.chapterDescription
    ];
    for (const hint of asArray(studyData.domSemanticHints)) {
      const hintType = normalizeText(hint.hintType || "").toLowerCase();
      if (/^(chapter_heading|source_description|page_description|chapter_description|summary|source_summary|chapter_summary|meta_description)$/.test(hintType)) {
        candidates.push(hint.text || hint.normalizedText || hint.originalText);
      }
    }
    return candidates.map((value) => normalizeText(value || "")).filter(Boolean);
  }

  function sourceDescriptionHintRecords() {
    return asArray(studyData.domSemanticHints).filter((hint) => /^(chapter_heading|page_description|source_description|chapter_description|summary|source_summary|chapter_summary|meta_description)$/i.test(hint.hintType || ""));
  }

  function currentPageSourceDescriptionRecord(context = {}) {
    const title = normalizeText(studyData.latestCapture?.title || context.sourceTitle || "").toLowerCase();
    const url = normalizeText(studyData.latestCapture?.url || context.sourceUrl || "").toLowerCase();
    const rejected = new Set([title, url, "scripture", "unknown"]);
    const hint = sourceDescriptionHintRecords().find((item) => {
      const normalized = normalizeText(item.text || item.normalizedText || "").toLowerCase();
      return normalized.length > 24 && !rejected.has(normalized);
    });
    if (hint) return {
      text: normalizeText(hint.text || hint.normalizedText || ""),
      hintType: hint.hintType || "source_description",
      source: hint.source || "dom",
      confidence: hint.confidence || "source-markup"
    };
    const fallback = sourceDescriptionCandidates(context).find((value) => {
      const normalized = value.toLowerCase();
      return normalized.length > 24 && !rejected.has(normalized);
    });
    return fallback ? { text: fallback, hintType: "page_description", source: "page-metadata", confidence: "source-markup" } : null;
  }

  function sourceDescriptionTypeLabel(record = {}) {
    if (record.hintType === "chapter_heading") return "LDS Chapter Heading";
    if (/description/i.test(record.hintType || "")) return "Page Description";
    return "Source Context";
  }

  function sourceDescriptionUsageLines(record = {}) {
    const sourceType = sourceDescriptionTypeLabel(record);
    const provenance = sourceType === "LDS Chapter Heading" ? "Church-provided heading" : record.source || "page metadata";
    return [
      `Source Type: ${sourceType}`,
      `Source Provenance: ${provenance}`,
      "Usage: Contextual guidance only",
      "Not Scripture Text",
      "Not Direct Semantic Evidence",
      "Potential semantic use: chapter overview; thematic guidance; navigation aid; continuity assistance",
      displayAppConfidence(record.confidence || "source-markup")
    ].join("\n");
  }
  function renderSourceContext(term) {
    const container = document.getElementById("sourceContextCards");
    const count = document.getElementById("sourceContextCount");
    const context = findSourceContext();
    const sourceDescriptionRecord = currentPageSourceDescriptionRecord(context || {});
    const sourceDescription = sourceDescriptionRecord?.text || "";

    clearElement(container);
    count.textContent = `${(context ? 1 : 0) + (sourceDescription ? 1 : 0)} context item(s)`;

    if (!context && !sourceDescription) {
      appendEmpty(container, "No source context yet.");
      return;
    }

    const searchable = [
      context?.collection,
      context?.sourceCollection,
      context?.sourceType,
      context?.book,
      context?.chapter,
      context?.section,
      context?.author,
      context?.traditionalAuthor,
      context?.authorConfidence,
      context?.authorBasis,
      context?.speaker,
      context?.compiler,
      context?.translator,
      context?.sourceTitle,
      context?.sourceUrl,
      context?.confidence,
      sourceDescription
    ].join(" ");

    if (!includesTerm(searchable, term)) {
      appendEmpty(container, "No source context match.");
      return;
    }

    if (sourceDescriptionRecord) {
      container.appendChild(createCard(
        "Source Description / Chapter Heading",
        `${sourceDescriptionRecord.text}\n\n${sourceDescriptionUsageLines(sourceDescriptionRecord)}`,
        context?.sourceTitle || studyData.latestCapture?.title || "current page metadata"
      ));
    }

    if (context) {
      container.appendChild(createCard(
        context.sourceTitle || context.book || "Source context",
        formatSourceContext(context),
        context.sourceUrl || ""
      ));
    }
  }
  function addEntityRole(groups, groupName, name, confidence = "probable", metadata = {}) {
    const cleanName = normalizeText(name || "");
    if (!cleanName) return;
    if (!groups[groupName]) groups[groupName] = new Map();
    const key = cleanName.toLowerCase();
    if (!groups[groupName].has(key)) {
      groups[groupName].set(key, {
        name: cleanName,
        confidence,
        actorReason: metadata.actorReason || metadata.evidence || "",
        semanticEventReference: metadata.semanticEventReference || "",
        eventType: metadata.eventType || "",
        anchorText: metadata.anchorText || ""
      });
    }
  }

  function displayEntityRoleReason(reason, item = {}) {
    const covenantParts = normalizeText(reason)
      .split(";")
      .map((part) => part.trim())
      .filter((part) => /^(instruction|response|concerning|covenant relation):/i.test(part));
    if (covenantParts.length > 0) return covenantParts.join("\n- ");
    const normalizedReason = normalizeText(reason).toLowerCase();
    const normalizedName = normalizeText(item.name).toLowerCase();
    if (normalizedReason === "took / accepted mary as wife") {
      return "accepted / took Mary as wife";
    }
    if (normalizedName === "matthew" && normalizedReason === "believed author") {
      return "author";
    }
    if (normalizedName === "scripture narrator" && normalizedReason === "narrates fulfillment") {
      return "narrative voice identifying fulfillment";
    }
    if (normalizedReason === "captured divine title") {
      return "source-title phrase: JESUS CHRIST; narrative NAME: JESUS / child; CHRIST is title/source identity, not Joseph's naming action";
    }
    return reason || "";
  }
  function entityNamesFromRoles(roles) {
    return asArray(roles)
      .map((role) => roleName(role))
      .filter(Boolean);
  }

  function lineagePersonsFromEvents() {
    const lineageEvents = asArray(studyData.eventItems)
      .filter((item) => item.eventType === "lineage_record");
    const names = [];

    for (const item of lineageEvents) {
      if (Array.isArray(item.lineagePersons) && item.lineagePersons.length > 0) {
        names.push(...item.lineagePersons);
        continue;
      }

      for (const match of normalizeText(item.eventText || "").matchAll(/\b([A-Z][A-Za-z]+)\s+begat\s+([A-Z][A-Za-z]+)\b/g)) {
        names.push(match[1], match[2]);
      }
    }

    return names;
  }

  const ENTITY_GROUP_ORDER = [
    "Semantic Entities",
    "Source Authorities",
    "Source Metadata Entities",
    "Recipients / Targets",
    "Instruction Recipients",
    "Instruction Concerning",
    "Covenant / Family Participants",
    "Divine / Glorified Entities",
    "Lineage Focus",
    "Participants",
    "Lineage Persons"
  ];

  function normalizeEntityRoleGroup(groupName) {
    if (groupName === "Instruction Subjects") return "Instruction Concerning";
    if (groupName === "Direct Actors") return "Semantic Entities";
    return groupName || "Other Entities";
  }

  function sortEntityGroups(groups) {
    return groups.sort((left, right) => {
      const leftIndex = ENTITY_GROUP_ORDER.indexOf(left.groupName);
      const rightIndex = ENTITY_GROUP_ORDER.indexOf(right.groupName);
      const normalizedLeft = leftIndex === -1 ? 999 : leftIndex;
      const normalizedRight = rightIndex === -1 ? 999 : rightIndex;
      return normalizedLeft - normalizedRight || left.groupName.localeCompare(right.groupName);
    });
  }

  function groupsFromEntityRoleItems(items) {
    const groups = {};

    for (const item of items || []) {
      addEntityRole(
        groups,
        normalizeEntityRoleGroup(item.roleGroup),
        item.entityName || "",
        item.confidence || "probable",
        item
      );
    }

    return sortEntityGroups(Object.entries(groups).map(([groupName, values]) => ({
      groupName,
      entities: Array.from(values.values())
    })));
  }
  function buildEntityRoleGroups() {
    if (Array.isArray(studyData.entityRoleItems) && studyData.entityRoleItems.length > 0) {
      return groupsFromEntityRoleItems(studyData.entityRoleItems);
    }

    const groups = {};

    const sourceContext = findSourceContext();
    if (sourceContext?.traditionalAuthor) {
      addEntityRole(
        groups,
        "Source Metadata Entities",
        sourceContext.traditionalAuthor,
        sourceContext.authorConfidence || "traditional-attribution",
        {
          actorReason: "believed author",
          evidence: sourceContext.authorBasis || "book/source metadata",
          eventType: "source_metadata",
          anchorText: sourceContext.authorBasis || "book/source metadata"
        }
      );
    }

    for (const actor of asArray(studyData.actorTimelines)) {
      addEntityRole(groups, "Semantic Entities", actor.actorName, "explicit");
    }

    for (const scene of asArray(studyData.sceneModels)) {
      for (const name of entityNamesFromRoles([scene.sourceAuthority, scene.orchestrator])) {
        addEntityRole(groups, "Source Authorities", name, "inferred-source");
      }
      for (const name of entityNamesFromRoles([scene.recipient, scene.target, scene.listener])) {
        addEntityRole(groups, "Recipients / Targets", name, "explicit");
      }
      for (const name of entityNamesFromRoles([scene.concerning])) {
        addEntityRole(groups, "Instruction Concerning", name, "explicit");
      }
      for (const name of asArray(scene.participants)) {
        addEntityRole(groups, "Participants", name, scene.confidence || "probable");
      }
      for (const name of entityNamesFromRoles([scene.primaryActor, scene.divineManifestation])) {
        if (/\b(JESUS|CHRIST|GOD|LORD|Father|Spirit)\b/i.test(name)) {
          addEntityRole(groups, "Divine / Glorified Entities", name, "probable");
        }
      }
      for (const name of asArray(scene.authorityChain).map(roleName)) {
        if (/\b(JESUS|CHRIST|GOD|LORD|Father|Spirit)\b/i.test(name)) {
          addEntityRole(groups, "Divine / Glorified Entities", name, "inferred-source");
        }
      }
    }

    const captureText = normalizeText(studyData.latestCapture?.text || "");
    if (/\bJesus Christ\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "JESUS CHRIST", "explicit");
    } else if (/\bJesus\b|\bChrist\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "JESUS", "explicit");
    }
    if (/\bTHE LORD\b|\bthe Lord\b|\bLord\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "THE LORD", "probable");
    }
    if (/\bMary\b/i.test(captureText)) addEntityRole(groups, "Participants", "Mary", "probable");
    if (/\bJoseph\b/i.test(captureText)) addEntityRole(groups, "Recipients / Targets", "Joseph", "probable");
    if (/\bfear not to take unto thee Mary\b|\btake unto thee Mary\b|\bMary thy wife\b/i.test(captureText)) {
      addEntityRole(groups, "Instruction Recipients", "Joseph", "explicit");
      addEntityRole(groups, "Instruction Concerning", "Mary", "explicit");
      addEntityRole(groups, "Covenant / Family Participants", "Mary", "explicit");
      addEntityRole(groups, "Covenant / Family Participants", "Joseph", "probable");
    }
    if (/\bMary\b/i.test(captureText) && /\bmother\b|\bwife\b|\bespoused\b|\btake unto thee\b/i.test(captureText)) {
      addEntityRole(groups, "Covenant / Family Participants", "Mary", "probable");
    }
    if (/\bJesus Christ\b/i.test(captureText) && /\bgeneration\b|\bbegat\b|\bson of David\b|\bson of Abraham\b/i.test(captureText)) {
      addEntityRole(groups, "Lineage Focus", "JESUS CHRIST", "explicit");
    }

    for (const name of lineagePersonsFromEvents()) {
      addEntityRole(groups, "Lineage Persons", name, "explicit");
    }

    return sortEntityGroups(Object.entries(groups).map(([groupName, values]) => ({
      groupName,
      entities: Array.from(values.values())
    })));
  }

  function entityRoleDisplayRank(item, groupName) {
    const name = normalizeText(item?.name || "").toLowerCase();
    const reason = normalizeText(item?.actorReason || item?.evidence || "").toLowerCase();

    if (groupName === "Divine / Glorified Entities") {
      if (name === "the lord" || reason.includes("source authority")) return 10;
      if (name === "angel of the lord" || reason.includes("messenger")) return 20;
      if (name === "jesus christ" || name === "jesus" || reason.includes("lineage focus") || reason.includes("attains divine title")) return 30;
      return 40;
    }

    if (groupName === "Source Authorities") {
      if (name === "the lord") return 10;
      return 20;
    }

    if (groupName === "Source Metadata Entities") {
      if (reason.includes("believed author") || reason.includes("traditional")) return 10;
      return 20;
    }

    return 50;
  }

  function sortEntityRoleItemsForDisplay(items, groupName) {
    return [...items].sort((left, right) =>
      entityRoleDisplayRank(left, groupName) - entityRoleDisplayRank(right, groupName) ||
      normalizeText(left.name).localeCompare(normalizeText(right.name))
    );
  }

  function entityRoleTypeForDisplay(groupName) {
    const normalized = normalizeText(groupName || "").toLowerCase();
    const map = new Map([
      ["semantic entities", "semanticEntity"],
      ["direct actors", "semanticEntity"],
      ["source authorities", "sourceAuthority"],
      ["source metadata entities", "sourceMetadata"],
      ["recipients / targets", "recipient"],
      ["instruction recipients", "instructionRecipient"],
      ["instruction concerning", "instructionConcerning"],
      ["covenant / family participants", "covenantFamilyParticipant"],
      ["divine / glorified entities", "divineGlorifiedEntity"],
      ["lineage focus", "lineageFocus"],
      ["participants", "participant"],
      ["lineage persons", "lineagePerson"]
    ]);

    return map.get(normalized) || normalized.replace(/\s+/g, "_") || "mentioned";
  }

  function candidateNamesForEntityClass(item = {}) {
    return [
      item.canonicalName,
      item.displayName,
      item.entityName,
      item.name,
      ...asArray(item.aliases),
      ...asArray(item.surfaceForms)
    ].map((name) => normalizeText(name).toLowerCase()).filter(Boolean);
  }

  function classifiedStoredEntityForRole(item = {}) {
    const roleName = normalizeText(item.name || item.entityName || "").toLowerCase();
    if (!roleName) return "";

    const candidates = [
      ...asArray(studyData.entityRegistry),
      ...asArray(studyData.canonicalIdentities)
    ];

    for (const entity of candidates) {
      if (!candidateNamesForEntityClass(entity).includes(roleName)) continue;
      const entityClass = classifyEntityDisplay(entity);
      if (entityClass) return entityClass;
    }

    return "";
  }

  function entityRoleClassForDisplay(item = {}, groupName = "") {
    const storedClass = classifiedStoredEntityForRole(item);
    if (storedClass) return storedClass;

    const roleType = entityRoleTypeForDisplay(groupName);
    return classifyEntityDisplay({
      ...item,
      canonicalName: item.name || item.entityName || "",
      displayName: item.name || item.entityName || "",
      roleTypes: [roleType, groupName, item.eventType].filter(Boolean),
      identityScope: item.actorReason || item.evidence || item.anchorText || "",
      relationships: item.semanticEventReference
        ? [{ relationshipType: item.eventType || roleType, evidence: item.semanticEventReference }]
        : []
    });
  }

  function entityRoleGroupDisplayName(groupName = "") {
    const normalized = normalizeText(groupName).toLowerCase();
    const labels = new Map([
      ["direct actors", "Semantic Entities"],
      ["semantic entities", "Semantic Entities"],
      ["source authorities", "Authority Entities"],
      ["instruction recipients", "Instruction Recipient Entities"],
      ["covenant / family participants", "Covenant / Family Entities"],
      ["participants", "Narrative / Scene Entities"]
    ]);

    return labels.get(normalized) || groupName || "Semantic Entities";
  }

  function entityRoleGroupMeta(groupName = "") {
    const normalized = normalizeText(groupName).toLowerCase();
    const labels = new Map([
      ["semantic entities", "ontology-aware entity presence; actor timelines remain separate"],
      ["direct actors", "ontology-aware entity presence; actor timelines remain separate"],
      ["source authorities", "authority entity presence and source/origin role"],
      ["instruction recipients", "recipient entity role within instruction/revelation path"],
      ["covenant / family participants", "covenant and family entity roles"],
      ["participants", "narrative scene entity presence"],
      ["lineage persons", "lineage graph / family tree foundation"]
    ]);

    return labels.get(normalized) || "semantic role grouping; actor timelines remain separate";
  }

  function entityRoleClassRank(entityClass) {
    const ranks = new Map([
      ["I", 1],
      ["II", 2],
      ["III", 3],
      ["IIII", 4],
      ["IIIII", 5],
      ["i", 6],
      ["AI_Actor", 7]
    ]);

    return ranks.get(entityClass) || 99;
  }

  function entityRoleClassShortLabel(entityClass) {
    if (entityClass === "AI_Actor") return "AI_Actor";
    if (entityClass === "i") return "Class i";
    return entityClass ? `Class ${entityClass}` : "";
  }

  function entityRoleHierarchySummary(items = [], groupName = "") {
    const classes = Array.from(new Set(items
      .map((item) => entityRoleClassForDisplay(item, groupName))
      .filter(Boolean)))
      .sort((left, right) => entityRoleClassRank(left) - entityRoleClassRank(right))
      .map(entityRoleClassShortLabel)
      .filter(Boolean);

    if (classes.length < 2) return "";
    return `Ontology path: ${classes.join(" -> ")}`;
  }
  function createEntityRoleCard(group) {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const list = document.createElement("div");
    const sortedEntities = sortEntityRoleItemsForDisplay(group.entities, group.groupName);
    const visible = sortedEntities.slice(0, group.groupName === "Lineage Persons" ? 8 : 5);
    const hidden = group.entities.length - visible.length;
    const displayGroupName = entityRoleGroupDisplayName(group.groupName);
    const hierarchySummary = entityRoleHierarchySummary(sortedEntities, group.groupName);

    card.className = "study-card";
    heading.textContent = renderDivineDisplayText(displayGroupName || "Semantic Entities");
    list.className = "entity-role-list";

    if (hierarchySummary) {
      const hierarchy = document.createElement("div");
      hierarchy.className = "entity-role-hierarchy";
      hierarchy.textContent = hierarchySummary;
      list.appendChild(hierarchy);
    }

    for (const item of visible) {
      const roleItem = document.createElement("div");
      const name = document.createElement("div");
      const confidence = displayAppConfidence(item.confidence || "probable");

      roleItem.className = "entity-role-item";
      name.className = "entity-role-name";
      name.textContent = renderDivineDisplayText(`${item.name} (${confidence})`);
      roleItem.appendChild(name);

      const entityClass = entityRoleClassForDisplay(item, group.groupName);
      if (entityClass) {
        const classLine = document.createElement("div");
        classLine.className = "entity-role-class";
        classLine.textContent = renderDivineDisplayText(entityClassLabel(entityClass));
        roleItem.appendChild(classLine);
      }

      if (item.actorReason) {
        const reason = document.createElement("div");
        reason.className = "entity-role-reason";
        reason.textContent = renderDivineDisplayText(`- ${displayEntityRoleReason(item.actorReason, item)}`);
        roleItem.appendChild(reason);
      }

      if (item.anchorText && item.actorReason && item.anchorText !== item.actorReason) {
        const anchor = document.createElement("div");
        anchor.className = "entity-role-anchor";
        anchor.textContent = renderDivineDisplayText(`- source phrase: ${trimText(item.anchorText, 70)}`);
        roleItem.appendChild(anchor);
      }

      list.appendChild(roleItem);
    }

    if (hidden > 0) {
      const hiddenNote = document.createElement("p");
      hiddenNote.className = "empty-state";
      hiddenNote.textContent = `${hidden} more hidden; future full lineage/entity view.`;
      list.appendChild(hiddenNote);
    }

    const metaText = document.createElement("span");
    metaText.className = "meta";
    metaText.textContent = entityRoleGroupMeta(group.groupName);

    card.append(heading, list, metaText);
    return card;
  }
  function renderEntityRoles(term) {
    const container = document.getElementById("entityRoleCards");
    const count = document.getElementById("entityRoleCount");
    const groups = buildEntityRoleGroups();
    const filtered = groups.filter((group) => includesTerm([
      group.groupName,
      entityRoleGroupDisplayName(group.groupName),
      group.entities.map((item) => item.name).join(" ")
    ].join(" "), term));
    const total = groups.reduce((sum, group) => sum + group.entities.length, 0);

    clearElement(container);
    count.textContent = `${total} total role/entity records`;

    if (filtered.length === 0) {
      appendEmpty(container, "No detected entity roles match.");
      return;
    }

    const lineageGroup = groups.find((group) => group.groupName === "Lineage Persons");
    if (lineageGroup?.entities.length > 8) {
      container.appendChild(createCard(
        "Grouped preview",
        `${total} total role/entity records. Showing grouped preview; ${lineageGroup.entities.length - 8} lineage persons hidden by preview limit.`,
        "future full lineage/entity view"
      ));
    } else {
      container.appendChild(createCard(
        "Grouped preview",
        `${total} total role/entity records. Showing grouped preview.`,
        "semantic entity groups remain separate from technical actor timelines"
      ));
    }

    for (const group of filtered.slice(0, Math.max(DISPLAY_LIMIT, 7))) {
      container.appendChild(createEntityRoleCard(group));
    }
  }
  // Roadmap only: future semantic/glorified rendering should map resolved
  // entityType -> entityClass -> renderClass. Do not classify by word alone;
  // use entity resolution, context, relationship, accuracy, and source scope.
  // I = GOD / Divine Authority
  // II = AngEL / Messenger of GOD
  // III = Human
  // IIII = Living organism / creature
  // IIIII = Non-living item/object
  // i = adversary / wicked / evil / anti-GOD; display as italic lowercase i and never visually collapse with Class I
  // AI_Actor = artificial/tool actor category
  const FUTURE_ENTITY_CLASSES = Object.freeze({
    I: Object.freeze({
      label: "GOD / Divine Authority",
      rank: 1,
      entityTypes: Object.freeze(["divine_authority", "divine_redeemer"]),
      examples: Object.freeze(["GOD", "THE LORD", "YHWH", "JESUS CHRIST"]),
      renderClass: "I"
    }),
    II: Object.freeze({
      label: "AngEL / Messenger of GOD",
      rank: 2,
      entityTypes: Object.freeze(["divine_messenger", "angelic_messenger"]),
      examples: Object.freeze(["AngEL Of THE LORD", "AngEL", "Gabriel"]),
      renderClass: "II"
    }),
    III: Object.freeze({
      label: "Human",
      rank: 3,
      entityTypes: Object.freeze(["human", "prophet", "author", "narrator", "lineage_person"]),
      examples: Object.freeze(["Joseph", "Mary", "Matthew", "Abraham"]),
      renderClass: "III"
    }),
    IIII: Object.freeze({
      label: "Living organism / creature",
      rank: 4,
      entityTypes: Object.freeze(["animal", "plant", "living_organism"]),
      examples: Object.freeze(["lamb", "dove", "fig tree"]),
      renderClass: "IIII"
    }),
    IIIII: Object.freeze({
      label: "Non-living item/object",
      rank: 5,
      entityTypes: Object.freeze(["object", "place", "artifact", "symbolic_item"]),
      examples: Object.freeze(["altar", "temple", "stone", "rod"]),
      renderClass: "IIIII"
    }),
    i: Object.freeze({
      label: "adversary / wicked / evil / anti-GOD",
      rank: 6,
      entityTypes: Object.freeze(["adversary", "anti_god", "deceiver", "wicked", "evil"]),
      examples: Object.freeze(["satan", "lucifer", "adversary", "perdition"]),
      renderClass: "i"
    }),
    AI_Actor: Object.freeze({
      label: "artificial/tool actor category",
      rank: 7,
      entityTypes: Object.freeze(["ai_actor", "artificial_actor", "tool_actor"]),
      examples: Object.freeze(["AI_Actor"]),
      renderClass: "AI_Actor"
    })
  });
  function entityClassRecord(entityClass) {
    return FUTURE_ENTITY_CLASSES[entityClass] || null;
  }

  function entityClassLabel(entityClass) {
    const record = entityClassRecord(entityClass);
    if (!record) return "Unclassified";
    if (record.renderClass === "AI_Actor") return `AI_Actor - ${record.label}`;
    if (record.renderClass === "i") return `Class i - ${record.label}`;
    return `Class ${record.renderClass} - ${record.label}`;
  }

  function classifyEntityDisplay(item = {}) {
    const canonicalName = normalizeText(item.canonicalName || item.displayName || item.entityName || item.name || "");
    const normalizedName = canonicalName.toLowerCase();
    const entityType = normalizeText(item.entityType || "").toLowerCase();
    const roleTypes = new Set(asArray(item.roleTypes).map((role) => normalizeText(role).toLowerCase()));
    const aliases = asArray(item.aliases).map((alias) => normalizeText(alias).toLowerCase());
    const surfaces = asArray(item.surfaceForms).map((surface) => normalizeText(surface).toLowerCase());
    const identityScope = normalizeText(item.identityScope || "").toLowerCase();
    const relationshipText = asArray(item.relationships)
      .map((relationship) => [relationship.relationshipType, relationship.target, relationship.evidence].join(" "))
      .join(" ")
      .toLowerCase();
    const allNames = [normalizedName, ...aliases, ...surfaces].filter(Boolean);
    const hasExactName = (names) => allNames.some((name) => names.includes(name));

    // Display-only Phase 6.5 classifier. It intentionally depends on resolved
    // entity metadata and role/context signals, not raw substrings inside words.
    if (["adversary", "anti_god", "deceiver", "wicked", "evil"].includes(entityType) ||
        hasExactName(["satan", "lucifer", "adversary", "perdition"])) {
      return "i";
    }

    if (["ai_actor", "artificial_actor", "tool_actor"].includes(entityType) || hasExactName(["ai_actor"])) {
      return "AI_Actor";
    }

    if (["divine_authority", "divine_redeemer"].includes(entityType) ||
        hasExactName(["god", "the lord", "yhwh", "jesus christ", "jesus"]) ||
        (entityType === "divine" && (roleTypes.has("divineglorifiedentity") || roleTypes.has("lineagefocus") || /retrospective identity: christ|source title: jesus christ/.test(identityScope)))) {
      return "I";
    }

    if (["divine_messenger", "angelic_messenger"].includes(entityType) ||
        hasExactName(["angel of the lord", "angel", "angel of the lord"]) ||
        /authoritysource|messenger|divine messenger/.test(relationshipText)) {
      return "II";
    }

    if (["human", "prophet", "author", "narrator", "lineage_person", "traditional_author", "source_author"].includes(entityType) ||
        roleTypes.has("traditionalauthor") || roleTypes.has("sourcemetadata") || roleTypes.has("lineageperson") || hasExactName(["scripture narrator", "narrator", "prophet", "the prophet"])) {
      return "III";
    }

    if (["animal", "plant", "living_organism"].includes(entityType)) return "IIII";
    if (["object", "place", "artifact", "symbolic_item"].includes(entityType)) return "IIIII";

    return "";
  }

  function classifiedEntityCount() {
    const keys = new Set();
    for (const item of [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]) {
      const entityClass = classifyEntityDisplay(item);
      if (!entityClass) continue;
      keys.add(`${item.canonicalName || item.displayName || item.entityName || item.name || "entity"}|${entityClass}`);
    }
    return keys.size;
  }
  // Default Study Panel order uses Source / Authority flow for passage comprehension.
  // Future display modes can offer Source / Authority Order, chronological
  // mention order, Christ-centered / redemptive order, entity type order,
  // and lineage order without changing stored semantic registry data.
  // Future identity-scope modeling should distinguish explicit source title,
  // current narrative identity, retrospective identity, and character awareness.
  function entityRegistryDisplayRank(entity) {
    const type = entity?.entityType || "entity";
    const roles = new Set(asArray(entity?.roleTypes));

    if (type === "divine_authority") return 10;
    if (type === "divine_messenger") return 20;
    if (type === "human" && (roles.has("recipient") || roles.has("instructionRecipient") || roles.has("directActor") || roles.has("covenantFamilyParticipant"))) return 30;
    if (type === "human" && (roles.has("participant") || roles.has("instructionConcerning") || roles.has("concerningEntity"))) return 40;
    if (type === "divine" && (roles.has("namedChild") || roles.has("lineageFocus") || roles.has("divineGlorifiedEntity"))) return 50;
    if (type === "divine") return 55;
    if (type === "narrator") return 60;
    if (type === "traditional_author" || type === "source_author") return 65;
    if (type === "lineage_person") return 70;
    return 90;
  }

  function sortEntityRegistryForDisplay(items) {
    return [...items].sort((left, right) =>
      entityRegistryDisplayRank(left) - entityRegistryDisplayRank(right) ||
      (asArray(right.relationships).length + asArray(right.mentions).length) -
        (asArray(left.relationships).length + asArray(left.mentions).length) ||
      normalizeText(left.canonicalName || left.displayName).localeCompare(
        normalizeText(right.canonicalName || right.displayName)
      )
    );
  }
  function renderEntityRegistry(term) {
    const container = document.getElementById("entityRegistryCards");
    const count = document.getElementById("entityRegistryCount");
    const filtered = filteredEntityRegistry(term);

    renderLimited(container, sortEntityRegistryForDisplay(filtered), count, (entity) => {
      const roleTypes = asArray(entity.roleTypes);
      const aliases = asArray(entity.aliases);
      const mentions = asArray(entity.mentions);
      const relationships = asArray(entity.relationships);
      const rolesPreview = roleTypes.slice(0, 5).join(", ") || "No roles yet";
      const roleOverflow = roleTypes.length > 5
        ? `; ${roleTypes.length - 5} more role(s)`
        : "";
      const aliasPreview = aliases.slice(0, 3).join(", ");
      const entityClass = classifyEntityDisplay(entity);
      const classLine = entityClass ? entityClassLabel(entityClass) : "Class Unclassified";

      return createCard(
        entity.displayName || entity.canonicalName || "Entity",
        [
          classLine,
          `Type: ${entity.entityType || "entity"}`,
          `Roles: ${rolesPreview}${roleOverflow}`,
          `Mentions: ${mentions.length}`,
          `Relationships: ${relationships.length}`
        ].join("\n"),
        aliasPreview ? `Aliases: ${aliasPreview}` : "derived graph node"
      );
    }, "No entity registry entries match.", "entity");
  }
  function relationshipGraphDisplayRank(edge) {
    const type = edge?.relationshipType || "relationship";
    const from = edge?.fromEntity || "";
    const to = edge?.toEntity || "";
    const pair = `${from}->${to}`.toLowerCase();

    if (type === "source_authority") return 10;
    if (type === "delegated_authority") return 15;
    if (type === "divine_message") return 20;
    if (pair.includes("joseph->mary") && type === "covenant_family_union") return 30;
    if (pair.includes("mary->jesus christ") && type === "birth") return 40;
    if (pair.includes("joseph->jesus") && type === "naming") return 45;
    if (type === "fulfillment_narration") return 55;
    if (type === "lineage_father_son") return 70;
    return 80;
  }

  function sortRelationshipGraphForDisplay(items) {
    return [...items].sort((left, right) =>
      relationshipGraphDisplayRank(left) - relationshipGraphDisplayRank(right) ||
      Number(left.sequenceOrder || 0) - Number(right.sequenceOrder || 0) ||
      normalizeText(left.fromEntity).localeCompare(normalizeText(right.fromEntity)) ||
      normalizeText(left.toEntity).localeCompare(normalizeText(right.toEntity)) ||
      normalizeText(left.relationshipType).localeCompare(normalizeText(right.relationshipType))
    );
  }
  function parseSearchTerms(term) {
    const normalized = normalizeText(term).toLowerCase();
    if (!normalized) return [];
    if (normalized.includes(",")) {
      return Array.from(new Set(normalized
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)));
    }
    const words = normalized.split(/\s+/).filter(Boolean);
    return Array.from(new Set([normalized, ...words]));
  }

  function matchesSearchQuery(value, term) {
    const terms = parseSearchTerms(term);
    if (terms.length === 0) return true;
    const searchable = normalizeText(value).toLowerCase();
    return terms.some((searchTerm) => searchable.includes(searchTerm));
  }

  function relationshipSearchText(edge) {
    return [
      edge.fromEntity,
      edge.toEntity,
      edge.relationshipType,
      edge.semanticCategory,
      edge.evidencePhrase,
      edge.confidence,
      edge.derivedFrom
    ].join(" ");
  }

  function entityRegistrySearchText(entity) {
    return [
      entity.canonicalName,
      entity.displayName,
      entity.entityType,
      asArray(entity.roleTypes).join(" "),
      asArray(entity.aliases).join(" "),
      asArray(entity.relationships).map((relationship) => [
        relationship.relationshipType,
        relationship.target,
        relationship.source
      ].join(" ")).join(" ")
    ].join(" ");
  }

  function canonicalIdentitySearchText(identity) {
    return [
      identity.canonicalName,
      identity.entityType,
      identity.identityScope,
      asArray(identity.aliases).join(" "),
      asArray(identity.surfaceForms).join(" "),
      asArray(identity.evidencePhrases).join(" "),
      identity.confidence,
      identity.notes
    ].join(" ");
  }

  function semanticEventSearchText(item) {
    return [
      item.actor,
      item.action,
      item.target,
      item.recipient,
      item.concerning,
      item.narrator,
      item.quotedSpeaker,
      item.eventType,
      item.semanticCategory,
      item.relationshipType,
      item.normalizedMeaning,
      item.anchorText,
      item.sourceSnippet,
      asArray(item.participants).join(" "),
      asArray(item.authorityChain).join(" ")
    ].join(" ");
  }

  function semanticFlowChainSearchText(chain) {
    return [
      chain.chainTitle,
      chain.chainType,
      chain.summary,
      asArray(chain.authorityChain).join(" "),
      asArray(chain.nodes).map((node) => [
        node.actor,
        node.action,
        node.target,
        node.eventType,
        node.anchorText
      ].join(" ")).join(" "),
      asArray(chain.relationships).map((relationship) => [
        relationship.relationType,
        relationship.evidenceSnippet,
        relationship.confidence
      ].join(" ")).join(" ")
    ].join(" ");
  }

  function filteredRelationshipGraph(term) {
    return sortRelationshipGraphForDisplay(asArray(studyData.relationshipGraph)
      .filter((edge) => matchesSearchQuery(relationshipSearchText(edge), term)));
  }

  function filteredEntityRegistry(term) {
    return sortEntityRegistryForDisplay(asArray(studyData.entityRegistry)
      .filter((entity) => matchesSearchQuery(entityRegistrySearchText(entity), term)));
  }

  function filteredCanonicalIdentities(term) {
    return asArray(studyData.canonicalIdentities)
      .filter((identity) => matchesSearchQuery(canonicalIdentitySearchText(identity), term));
  }

  function filteredSemanticEvents(term) {
    return asArray(studyData.semanticEvents)
      .filter((item) => matchesSearchQuery(semanticEventSearchText(item), term));
  }

  function filteredSemanticFlowChains(term) {
    return asArray(studyData.semanticFlowChains)
      .filter((chain) => matchesSearchQuery(semanticFlowChainSearchText(chain), term));
  }

  function focusedBuckets(term) {
    return {
      relationships: filteredRelationshipGraph(term),
      entities: filteredEntityRegistry(term),
      canonicalIdentities: filteredCanonicalIdentities(term),
      semanticEvents: filteredSemanticEvents(term),
      flowChains: filteredSemanticFlowChains(term)
    };
  }

  function renderFocusedGraph(term) {
    const mount = document.getElementById("focused-relationship-view");
    const mountCount = document.querySelectorAll("#focused-relationship-view").length;
    console.log("[FOCUS DEBUG] mount found", {
      found: Boolean(mount),
      mountCount
    });
    if (!mount) return;
    clearElement(mount);

    if (!term) return;

    const buckets = focusedBuckets(term);
    console.log("[FOCUS DEBUG] rendering focus view", {
      searchText: term,
      termArray: parseSearchTerms(term),
      relationshipCount: buckets.relationships.length,
      entityCount: buckets.entities.length,
      identityCount: buckets.canonicalIdentities.length,
      semanticEventCount: buckets.semanticEvents.length,
      flowChainCount: buckets.flowChains.length
    });

    const section = document.createElement("section");
    const debugBox = document.createElement("div");
    const heading = document.createElement("div");
    const title = document.createElement("h2");
    const count = document.createElement("span");
    const marker = document.createElement("p");
    const version = document.createElement("p");
    const cards = document.createElement("div");

    section.className = "study-section focused-relationship-view";
    heading.className = "section-heading";
    count.className = "count-label";
    marker.className = "focus-render-marker";
    version.className = "focus-render-marker";
    cards.className = "card-grid";
    debugBox.setAttribute("style", "border:2px solid red;padding:8px;margin-bottom:8px;background:#fff5f5;color:#8a0000;font-weight:700;");
    debugBox.textContent = "[FOCUS VIEW ACTIVE] Renderer Version: v2";

    marker.textContent = "[FOCUS VIEW ACTIVE]";
    version.textContent = "Renderer Version: v2";
    title.textContent = `Focused Relationship View: ${renderDivineDisplayText(term)}`;

    const total = buckets.relationships.length + buckets.entities.length +
      buckets.canonicalIdentities.length + buckets.semanticEvents.length + buckets.flowChains.length;
    count.textContent = `Found: ${total} focused item(s)`;

    heading.append(title, count);
    section.append(debugBox, marker, version, heading, cards);
    mount.appendChild(section);

    if (total === 0) {
      appendEmpty(cards, `No focused items found for: ${term}`);
      return;
    }

    const renderBucket = (bucketTitleText, items, renderItem) => {
      if (items.length === 0) return;
      const preview = document.createElement("article");
      const bucketTitle = document.createElement("h3");
      const list = document.createElement("div");
      preview.className = "study-card focused-bucket";
      bucketTitle.textContent = `${bucketTitleText} (${items.length})`;
      list.className = "focused-bucket-list";
      for (const item of items.slice(0, 4)) {
        const line = document.createElement("p");
        line.textContent = renderDivineDisplayText(renderItem(item));
        list.appendChild(line);
      }
      if (items.length > 4) {
        const more = document.createElement("span");
        more.className = "meta";
        more.textContent = `${items.length - 4} more hidden by preview limit.`;
        list.appendChild(more);
      }
      preview.append(bucketTitle, list);
      cards.appendChild(preview);
    };

    renderBucket("Relationships", buckets.relationships, (edge) => {
      const note = relationshipDisplayNote(edge);
      return `${edge.fromEntity || "Entity"} -> ${relationshipDisplayTarget(edge)} | ${edge.relationshipType || "relationship"} | ${edge.evidencePhrase ? `source phrase: ${trimText(edge.evidencePhrase, 80)}` : edge.derivedFrom || "derived"}${note ? ` | ${note}` : ""}`;
    });
    renderBucket("Entity Registry nodes", buckets.entities, (entity) => {
      const entityClass = classifyEntityDisplay(entity);
      return `${entity.displayName || entity.canonicalName || "Entity"} | ${entityClass ? `${entityClassLabel(entityClass)}` : "Class Unclassified"} | ${entity.entityType || "entity"} | ${asArray(entity.roleTypes).slice(0, 4).join(", ") || "No roles yet"}`;
    });
    renderBucket("Canonical Identities", buckets.canonicalIdentities, (identity) => {
      const entityClass = classifyEntityDisplay(identity);
      const distinction = isJesusChristDisplayName(identity.canonicalName || identity.displayName) ? " | Narrative NAME: JESUS; CHRIST is title/source identity" : "";
      return `${identity.canonicalName || "Canonical identity"} | ${entityClass ? `${entityClassLabel(entityClass)}` : "Class Unclassified"} | ${identity.identityScope || "source-mentioned"}${distinction}`;
    });
    renderBucket("Semantic Events", buckets.semanticEvents, (item) => {
      const target = semanticEventDisplayTarget(item);
      const note = semanticEventDisplayNote(item);
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || "acts"}${target ? ` -> ${target}` : ""} | ${item.anchorText || trimText(item.sourceSnippet, 80)}${note ? ` | ${note}` : ""}`;
    });
    renderBucket("Flow Paths", buckets.flowChains, (chain) =>
      `${chain.chainTitle || "Semantic flow path"} | ${trimText(chain.summary, 90)}`
    );

    // Phase 6.4 focus mode has one dynamic mount point. Future work can turn
    // these focused slices into clickable graph traversal, visual graph
    // navigation, timeline graph exploration, Alpha/Omega graph navigation, and
    // scoped AI_Actor awareness.
  }
  function renderRelationshipGraph(term) {
    const container = document.getElementById("relationshipGraphCards");
    const count = document.getElementById("relationshipGraphCount");
    const filtered = filteredRelationshipGraph(term);

    renderLimited(container, filtered, count, (edge) => {
      const note = relationshipDisplayNote(edge);
      const derived = [
        `${edge.fromEntity || "Entity"} -> ${relationshipDisplayTarget(edge)} | ${edge.relationshipType || "relationship"}`,
        note
      ].filter(Boolean).join("\n");
      return createCard(
        `${edge.fromEntity || "Entity"} -> ${relationshipDisplayTarget(edge)}`,
        [
          `${edge.relationshipType || "relationship"} (${displayAppConfidence(edge.confidence || "probable")})`,
          sourceDerivedDisplayBlock(edge.evidencePhrase || "", derived, { context: edge })
        ].filter(Boolean).join("\n"),
        edge.derivedFrom || "derived relationship"
      );
    }, "No relationship graph edges match.", "relationship");
  }
  function renderCanonicalIdentities(term) {
    const container = document.getElementById("canonicalIdentityCards");
    const count = document.getElementById("canonicalIdentityCount");
    const filtered = filteredCanonicalIdentities(term);

    renderLimited(container, filtered, count, (identity) => {
      const aliases = asArray(identity.aliases).slice(0, 5).join(", ") || "No aliases yet";
      const surfaces = asArray(identity.surfaceForms).slice(0, 4).join(", ");
      const entityClass = classifyEntityDisplay(identity);
      return createCard(
        identity.canonicalName || "Canonical identity",
        [
          entityClass ? `${entityClassLabel(entityClass)}` : "Class Unclassified",
          `Aliases: ${aliases}`,
          `Identity scope: ${identity.identityScope || "source-mentioned"}`,
          isJesusChristDisplayName(identity.canonicalName || identity.displayName) ? "Narrative NAME: JESUS" : "",
          isJesusChristDisplayName(identity.canonicalName || identity.displayName) ? "CHRIST appears as title/source identity, not Joseph's naming action." : "",
          surfaces ? `Surface forms: ${surfaces}` : ""
        ].filter(Boolean).join("\n"),
        `${identity.entityType || "entity"} | ${displayAppConfidence(identity.confidence || "probable")}`
      );
    }, "No canonical identities match.", "identity");
  }
  function mentionSearchText(item) {
    return [
      item.mentionText,
      item.normalizedText,
      item.mentionType,
      item.entityClass,
      item.linkedEntity,
      item.roleHint,
      item.sourcePhrase,
      item.scopePath,
      item.confidence
    ].join(" ");
  }



  function adapterModeLabel(adapter = studyData.activeAdapter || {}) {
    if (adapter?.adapterName === "lds_scripture_adapter") return "Scripture Semantic Mode";
    if (adapter?.adapterName === "generic_html_adapter") return "Generic Web Semantic Mode";
    if (adapter?.adapterName === "plain_text_adapter") return "Plain Text Semantic Mode";
    return "Unknown Semantic Mode";
  }

  function adapterModeDescription(adapter = studyData.activeAdapter || {}) {
    if (adapter?.adapterName === "lds_scripture_adapter") return "ontology-heavy, authority-aware, revelation-aware scripture analysis";
    if (adapter?.adapterName === "generic_html_adapter") return "exploratory generic HTML semantic indexing; broader and lower-certainty by design";
    if (adapter?.adapterName === "plain_text_adapter") return "minimal text capture with light semantic indexing";
    return "adapter mode not detected";
  }

  function isGenericAdapterMode() {
    return studyData.activeAdapter?.adapterName === "generic_html_adapter";
  }
  function sourceAdapterSearchText(adapter) {
    return [
      adapter?.adapterName,
      adapter?.adapterId,
      asArray(adapter?.supportedDomains).join(" "),
      asArray(adapter?.supportedPatterns).join(" "),
      asArray(adapter?.semanticCapabilities).join(" "),
      asArray(adapter?.detectedCapabilities).join(" "),
      adapter?.confidence,
      adapter?.derivedFrom,
      adapter?.sourceTitle,
      adapter?.sourceUrl
    ].join(" ");
  }

  function renderSourceAdapter(term) {
    const container = document.getElementById("sourceAdapterCards");
    const count = document.getElementById("sourceAdapterCount");
    const active = studyData.activeAdapter;
    const adapters = asArray(studyData.sourceAdapters);

    clearElement(container);

    if (!active?.adapterName) {
      count.textContent = "0 active";
      appendEmpty(container, "No source adapter detected yet.");
      return;
    }

    if (!matchesSearchQuery(sourceAdapterSearchText(active), term)) {
      count.textContent = "0 active";
      appendEmpty(container, "No source adapter matches.");
      return;
    }

    count.textContent = "1 active";
    const capabilities = asArray(active.detectedCapabilities || active.semanticCapabilities);
    container.appendChild(createCard(
      adapterModeLabel(active),
      [
        `Adapter: ${active.adapterName}`,
        `Mode: ${adapterModeDescription(active)}`,
        `Capabilities: ${capabilities.join(", ") || "none detected"}`,
        active.adapterName === "generic_html_adapter" ? `Generic indexing ${displayAppConfidence(active.confidence || "possible")}` : displayAppConfidence(active.confidence || "possible"),
        active.fallbackMode ? "Fallback mode: yes" : "Fallback mode: no",
        active.derivedFrom ? `Detected from: ${active.derivedFrom}` : "",
        active.version ? `Version: ${active.version}` : ""
      ].filter(Boolean).join("\n"),
      `${adapters.length || 0} registered adapter(s)`
    ));
  }
  function domSemanticHintSearchText(item) {
    return [
      item.hintType,
      item.text,
      item.normalizedText,
      item.verseRef,
      item.verseNumber,
      item.domId,
      item.selectorHint,
      item.confidence,
      item.source,
      item.originalText,
      item.entityClass,
      item.noHighlight ? "no-highlight" : "",
      item.scopePath,
      item.sourceContext?.book,
      item.sourceContext?.chapter
    ].join(" ");
  }

  function domHintSummary(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.hintType || "unknown";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }


  function renderScopeIntegrity(term) {
    const container = document.getElementById("scopeIntegrityCards");
    const count = document.getElementById("scopeIntegrityCount");
    const report = studyData.scopeIntegrity || {};
    const samplePaths = asArray(report.sampleScopePaths);
    const searchText = [
      report.adapterName,
      report.adapterId,
      samplePaths.join(" ")
    ].join(" ");

    clearElement(container);

    if (!report.generatedAt) {
      count.textContent = "0 scoped";
      appendEmpty(container, "No scope integrity report yet.");
      return;
    }

    if (!matchesSearchQuery(searchText, term)) {
      count.textContent = "0 scoped";
      appendEmpty(container, "No scope integrity items match.");
      return;
    }

    const layerCounts = Object.entries(report.countsByLayer || {})
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([layer, value]) => `${layer}: ${value}`);

    count.textContent = `${report.scopedItemsCount || 0} scoped`;
    container.appendChild(createCard(
      "Scope Integrity",
      [
        `Scoped items: ${report.scopedItemsCount || 0}`,
        `Missing scope: ${report.missingScopeCount || 0}`,
        report.totalItemsCount ? `Total checked: ${report.totalItemsCount}` : "",
        `Adapter: ${report.adapterName || "unknown"}`,
        report.adapterId ? `Adapter ID: ${report.adapterId}` : "",
        `Generated: ${report.generatedAt || ""}`
      ].filter(Boolean).join("\n"),
      "unified source position layer"
    ));

    if (samplePaths.length > 0) {
      container.appendChild(createCard(
        "Sample Scope Paths",
        samplePaths.slice(0, 8).join("\n"),
        "preview only"
      ));
    }

    if (layerCounts.length > 0) {
      container.appendChild(createCard(
        "Scoped Layers",
        layerCounts.join("\n"),
        "counts by derived layer"
      ));
    }
  }
  function activeScopeContext() {
    return findSourceContext() || studyData.latestCapture?.sourceContext || {};
  }

  function scopeBookSlug(value) {
    const normalized = normalizeText(value || "").toLowerCase();
    const aliases = new Map([
      ["matt", "matthew"],
      ["mt", "matthew"],
      ["matthew", "matthew"],
      ["mark", "mark"],
      ["luke", "luke"],
      ["john", "john"]
    ]);
    return aliases.get(normalized) || normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "source";
  }

  function scopeBookTitle(value) {
    const slug = scopeBookSlug(value);
    const titles = new Map([
      ["matthew", "Matthew"],
      ["mark", "Mark"],
      ["luke", "Luke"],
      ["john", "John"]
    ]);
    return titles.get(slug) || capitalizeWord(slug.replace(/-/g, " "));
  }

  function parseVerseScopeFocus(term) {
    const normalized = normalizeText(term).toLowerCase();
    if (!normalized) return null;

    const context = activeScopeContext();
    let book = context.book || "Matthew";
    let chapter = context.chapter || "";
    let verse = "";

    const fullScope = normalized.match(/\bscripture\.nt\.([^.\s]+)\.(\d+)\.(?:verse|note)\.(\d+[a-z]?)\b/i);
    if (fullScope) {
      book = fullScope[1];
      chapter = fullScope[2];
      verse = fullScope[3].match(/\d+/)?.[0] || "";
    }

    if (!verse) {
      const verseRef = normalized.match(/(?:\b([a-z]+)\s+)?\b(\d+):(\d+)\b/i);
      if (verseRef) {
        if (verseRef[1]) book = verseRef[1];
        chapter = verseRef[2];
        verse = verseRef[3];
      }
    }

    if (!verse) {
      const verseOnly = normalized.match(/\bverse[.\s:_-]*(\d+)\b/i);
      if (verseOnly) verse = verseOnly[1];
    }

    if (!verse || !chapter) return null;

    const bookSlug = scopeBookSlug(book);
    return {
      bookSlug,
      bookTitle: scopeBookTitle(book),
      chapter: String(chapter),
      verseNumber: String(verse),
      verseRef: `${chapter}:${verse}`,
      scopePath: `scripture.nt.${bookSlug}.${chapter}.verse.${verse}`,
      noteScopePrefix: `scripture.nt.${bookSlug}.${chapter}.note.${verse}`,
      displayLabel: `${scopeBookTitle(book)} ${chapter}:${verse}`
    };
  }

  function scopePathMatchesFocus(scopePath, focus) {
    const value = normalizeText(scopePath || "").toLowerCase();
    if (!value || !focus) return false;
    return value === focus.scopePath ||
      value.startsWith(`${focus.scopePath}.`) ||
      value.startsWith(focus.noteScopePrefix) ||
      value.includes(`.${focus.chapter}.verse.${focus.verseNumber}`) ||
      value.includes(`.${focus.chapter}.note.${focus.verseNumber}`);
  }

  function normalizeScopeList(value, fallbackItem = {}) {
    const scopes = [];
    const addScope = (candidate) => {
      if (!candidate) return;
      if (Array.isArray(candidate)) {
        candidate.forEach(addScope);
        return;
      }
      if (candidate instanceof Set) {
        Array.from(candidate).forEach(addScope);
        return;
      }
      if (typeof candidate === "object") {
        [
          candidate.scope,
          candidate.scopePath,
          candidate.fromScopePath,
          candidate.sourceScopePath,
          candidate.sourceContext?.scopePath
        ].forEach(addScope);
        return;
      }
      const normalized = normalizeText(String(candidate));
      if (normalized) scopes.push(normalized);
    };

    addScope(value);
    [
      fallbackItem.scope,
      fallbackItem.scopePath,
      fallbackItem.fromScopePath,
      fallbackItem.sourceScopePath,
      fallbackItem.sourceContext?.scopePath
    ].forEach(addScope);

    return Array.from(new Set(scopes));
  }

  function itemMatchesVerseFocus(item = {}, focus) {
    if (!focus) return false;
    const scopeCandidates = normalizeScopeList(item.scopes, item);
    if (scopeCandidates.some((scopePath) => scopePathMatchesFocus(scopePath, focus))) return true;

    const verseRef = normalizeText(item.verseRef || item.sourceContext?.verseRef || "");
    if (verseRef === focus.verseRef) return true;

    const verseNumber = String(item.verseNumber || item.sourceContext?.verseNumber || "");
    const chapter = String(item.chapter || item.sourceContext?.chapter || focus.chapter || "");
    const bookSlug = scopeBookSlug(item.book || item.sourceContext?.book || focus.bookSlug);
    return verseNumber === focus.verseNumber && chapter === focus.chapter && bookSlug === focus.bookSlug;
  }

  function scopedFlowNodes(focus) {
    const matches = [];
    for (const chain of asArray(studyData.semanticFlowChains)) {
      for (const node of asArray(chain.nodes)) {
        if (!itemMatchesVerseFocus(node, focus)) continue;
        matches.push({ ...node, chainTitle: chain.chainTitle || "Semantic flow path" });
      }
    }
    return matches;
  }

  function scopedBucketCard(container, title, items, previewFn, emptyText) {
    const safeItems = Array.isArray(items) ? items : [];
    if (safeItems.length === 0) {
      container.appendChild(createCard(title, emptyText, "0 items"));
      return;
    }

    const preview = safeItems.slice(0, 4).map(previewFn).join("\n");
    const hidden = safeItems.length > 4 ? `\n${safeItems.length - 4} more hidden by preview limit.` : "";
    container.appendChild(createCard(title, `${preview}${hidden}`, `${safeItems.length} item(s)`));
  }

  function renderVerseScopeFocus(term) {
    const section = document.getElementById("verseScopeFocusSection");
    const container = document.getElementById("verseScopeFocusCards");
    const count = document.getElementById("verseScopeFocusCount");
    if (!section || !container || !count) return;

    const focus = parseVerseScopeFocus(term);
    clearElement(container);

    if (!focus) {
      section.hidden = true;
      count.textContent = "0";
      return;
    }

    section.hidden = false;
    const buckets = {
      domHints: asArray(studyData.domSemanticHints).filter((item) => itemMatchesVerseFocus(item, focus)),
      mentions: asArray(studyData.mentionIndex).filter((item) => itemMatchesVerseFocus(item, focus)),
      semanticEvents: asArray(studyData.semanticEvents).filter((item) => itemMatchesVerseFocus(item, focus)),
      relationships: asArray(studyData.relationshipGraph).filter((item) => itemMatchesVerseFocus(item, focus)),
      sourceDiscovery: asArray(studyData.sourceDiscoveryIndex).filter((item) => itemMatchesVerseFocus(item, focus)),
      referenceGraph: asArray(studyData.referenceGraph).filter((item) => itemMatchesVerseFocus(item, focus)),
      flowNodes: scopedFlowNodes(focus)
    };
    const total = Object.values(buckets).reduce((sum, items) => sum + items.length, 0);
    count.textContent = `${total} scoped`;

    if (total === 0) {
      appendEmpty(container, "No verse scope focus data for current filter.");
      return;
    }

    container.appendChild(createCard(
      `Verse Scope Focus: ${focus.displayLabel}`,
      [
        `Scope: ${focus.scopePath}`,
        `DOM hints: ${buckets.domHints.length}`,
        `Mentions: ${buckets.mentions.length}`,
        `Semantic events: ${buckets.semanticEvents.length}`,
        `Relationship edges: ${buckets.relationships.length}`,
        `Source refs: ${buckets.sourceDiscovery.length}`,
        `Reference edges: ${buckets.referenceGraph.length}`,
        `Flow nodes: ${buckets.flowNodes.length}`
      ].join("\n"),
      "search-scoped source position"
    ));

    scopedBucketCard(container, "DOM Hints", buckets.domHints, (item) =>
      `${item.hintType || "hint"}: ${trimText(item.text || item.normalizedText, 74)} | ${item.scopePath || item.verseRef || "unscoped"}`,
      "No DOM hints tied to this verse scope."
    );
    scopedBucketCard(container, "Mentions", buckets.mentions, (item) =>
      `${item.mentionText || item.linkedEntity || "mention"} | ${item.mentionType || "mention"}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""}`,
      "No mentions tied to this verse scope."
    );
    scopedBucketCard(container, "Semantic Events", buckets.semanticEvents, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""} | ${item.scopePath || "unscoped"}`;
    }, "No semantic events tied to this verse scope.");
    scopedBucketCard(container, "Relationship Graph", buckets.relationships, (item) =>
      `${item.fromEntity || "Unknown"} -> ${item.toEntity || "Unknown"} | ${item.relationshipType || "relationship"} | ${item.scopePath || "unscoped"}`,
      "No relationship edges tied to this verse scope."
    );
    scopedBucketCard(container, "Source Discovery", buckets.sourceDiscovery, (item) =>
      `${item.refType || "ref"}: ${trimText(item.linkText || item.href, 78)} | ${item.scopePath || item.verseRef || "unscoped"}`,
      "No discovered refs tied to this verse scope."
    );
    scopedBucketCard(container, "Reference Graph", buckets.referenceGraph, (item) =>
      `${referenceRelationshipLabel(item.relationshipType)}: ${trimText(item.toText || item.toHref, 78)} | ${item.fromScopePath || "unscoped"}`,
      "No reference edges tied to this verse scope."
    );
    scopedBucketCard(container, "Flow Path Nodes", buckets.flowNodes, (item) =>
      `${item.chainTitle}: ${item.actor || "Unknown"} -> ${item.action || item.eventType || "event"}${item.target ? ` -> ${item.target}` : ""} | ${item.scopePath || "unscoped"}`,
      "No flow path nodes tied to this verse scope."
    );
  }
  function normalizedEntityName(value) {
    return normalizeText(value || "").toLowerCase();
  }

  function entityNameCandidates(item = {}) {
    return Array.from(new Set([
      item.canonicalName,
      item.displayName,
      item.entityName,
      item.name,
      item.linkedEntity,
      item.mentionText,
      ...asArray(item.aliases),
      ...asArray(item.surfaceForms)
    ].map(normalizedEntityName).filter(Boolean)));
  }

  function entityQueryFromSearch(term) {
    const normalized = normalizedEntityName(term);
    if (!normalized || !/[a-z]/i.test(normalized)) return "";
    if (/\b\d+:\d+\b|\bverse[.\s:_-]*\d+\b|\bscripture\.nt\./i.test(normalized)) return "";
    if (["the", "and", "of", "a", "an"].includes(normalized)) return "";
    return normalized;
  }

  function entityQueryMatchesName(query, name) {
    if (!query || !name) return false;
    return name === query || name.includes(query) || (query.includes(name) && name.length >= 4);
  }

  function bestEntityFocusMatch(term) {
    const query = entityQueryFromSearch(term);
    if (!query) return null;

    const candidates = [];
    for (const entity of asArray(studyData.entityRegistry)) {
      const names = entityNameCandidates(entity);
      if (!names.some((name) => entityQueryMatchesName(query, name))) continue;
      const exact = names.includes(query);
      candidates.push({ source: "registry", item: entity, names, score: exact ? 100 : 80 });
    }
    for (const identity of asArray(studyData.canonicalIdentities)) {
      const names = entityNameCandidates(identity);
      if (!names.some((name) => entityQueryMatchesName(query, name))) continue;
      const exact = names.includes(query);
      candidates.push({ source: "canonical", item: identity, names, score: exact ? 95 : 75 });
    }

    if (candidates.length === 0) return null;
    candidates.sort((left, right) => right.score - left.score || left.names[0].localeCompare(right.names[0]));
    const best = candidates[0];
    const displayName = best.item.displayName || best.item.canonicalName || best.item.linkedEntity || best.item.mentionText || term;
    const allNames = new Set(best.names);
    for (const candidate of candidates) {
      if (candidate.score < 70) continue;
      for (const name of candidate.names) allNames.add(name);
    }

    return {
      query,
      displayName,
      canonicalName: best.item.canonicalName || displayName,
      names: Array.from(allNames),
      registry: asArray(studyData.entityRegistry).find((entity) => entityNameCandidates(entity).some((name) => allNames.has(name))) || null,
      canonical: asArray(studyData.canonicalIdentities).find((identity) => entityNameCandidates(identity).some((name) => allNames.has(name))) || null
    };
  }

  function textContainsEntityName(text, focus) {
    const normalized = normalizedEntityName(text);
    if (!normalized || !focus) return false;
    return focus.names.some((name) => normalized === name || normalized.includes(name));
  }

  function itemNamesMatchEntity(values, focus) {
    return asArray(values).some((value) => textContainsEntityName(value, focus));
  }

  function eventMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([
      item.actor,
      item.target,
      item.recipient,
      item.concerning,
      item.narrator,
      item.quotedSpeaker,
      ...asArray(item.participants),
      ...asArray(item.authorityChain)
    ], focus);
  }

  function relationshipMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([item.fromEntity, item.toEntity, item.target], focus);
  }

  function mentionMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([item.linkedEntity, item.mentionText, item.roleHint], focus);
  }

  function flowNodeMatchesEntityFocus(node = {}, focus) {
    return itemNamesMatchEntity([
      node.actor,
      node.target,
      node.recipient,
      node.concerning,
      ...asArray(node.participants),
      ...asArray(node.authorityChain)
    ], focus);
  }

  function scopeBaseForEntityFocus(scopePath) {
    const value = normalizeText(scopePath || "").toLowerCase();
    const verse = value.match(/^(scripture\.nt\.[^.]+\.\d+)\.verse\.(\d+)/i);
    if (verse) return `${verse[1]}.verse.${verse[2]}`;
    const note = value.match(/^(scripture\.nt\.[^.]+\.\d+)\.note\.(\d+)/i);
    if (note) return `${note[1]}.verse.${note[2]}`;
    return value;
  }

  function addScopeCandidate(scopes, item = {}) {
    for (const scopePath of normalizeScopeList(item.scopes, item)) {
      const normalized = scopeBaseForEntityFocus(scopePath);
      if (normalized) scopes.add(normalized);
    }
  }

  function itemMatchesEntityScopeSet(item = {}, scopeSet) {
    if (!scopeSet || scopeSet.size === 0) return false;
    return normalizeScopeList(item.scopes, item)
      .map(scopeBaseForEntityFocus)
      .some((scopePath) => scopePath && scopeSet.has(scopePath));
  }

  function readableScopeFromBase(scopePath) {
    return referenceScopeLabel({ fromScopePath: scopePath });
  }

  function collectEntityScopeFocus(term) {
    const focus = bestEntityFocusMatch(term);
    if (!focus) return null;

    const semanticEvents = asArray(studyData.semanticEvents).filter((item) => eventMatchesEntityFocus(item, focus));
    const relationships = asArray(studyData.relationshipGraph).filter((item) => relationshipMatchesEntityFocus(item, focus));
    const directMentions = asArray(studyData.mentionIndex).filter((item) => mentionMatchesEntityFocus(item, focus));
    const flowNodes = [];

    for (const chain of asArray(studyData.semanticFlowChains)) {
      for (const node of asArray(chain.nodes)) {
        if (!flowNodeMatchesEntityFocus(node, focus)) continue;
        flowNodes.push({ ...node, chainTitle: chain.chainTitle || "Semantic flow path" });
      }
    }

    const scopeSet = new Set();
    [focus.registry, focus.canonical, ...semanticEvents, ...relationships, ...directMentions, ...flowNodes]
      .filter(Boolean)
      .forEach((item) => addScopeCandidate(scopeSet, item));

    const scopedMentions = asArray(studyData.mentionIndex).filter((item) =>
      mentionMatchesEntityFocus(item, focus) || itemMatchesEntityScopeSet(item, scopeSet)
    );
    const sourceDiscovery = asArray(studyData.sourceDiscoveryIndex).filter((item) => itemMatchesEntityScopeSet(item, scopeSet));
    const referenceGraph = asArray(studyData.referenceGraph).filter((item) => itemMatchesEntityScopeSet(item, scopeSet));

    return {
      ...focus,
      entityClass: classifyEntityDisplay(focus.canonical || focus.registry || {}),
      scopes: Array.from(scopeSet).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      semanticEvents,
      relationships,
      mentions: scopedMentions,
      sourceDiscovery,
      referenceGraph,
      flowNodes
    };
  }


  function renderEntityScopeFocus(term) {
    const section = document.getElementById("entityScopeFocusSection");
    const container = document.getElementById("entityScopeFocusCards");
    const count = document.getElementById("entityScopeFocusCount");
    if (!section || !container || !count) return;

    const focus = collectEntityScopeFocus(term);
    clearElement(container);

    if (!focus) {
      section.hidden = true;
      count.textContent = "0";
      return;
    }

    section.hidden = false;
    const focusScopes = normalizeScopeList(focus.scopes, focus);
    const total = focusScopes.length + focus.semanticEvents.length + focus.relationships.length +
      focus.mentions.length + focus.sourceDiscovery.length + focus.referenceGraph.length + focus.flowNodes.length;
    count.textContent = `${total} focused`;

    if (total === 0 && !focus.registry && !focus.canonical) {
      appendEmpty(container, "No entity scope focus data for current filter.");
      return;
    }

    const aliases = [
      ...asArray(focus.registry?.aliases),
      ...asArray(focus.canonical?.aliases),
      ...asArray(focus.canonical?.surfaceForms)
    ].filter(Boolean);
    container.appendChild(createCard(
      `Entity Scope Focus: ${focus.displayName}`,
      [
        `Canonical: ${focus.canonical?.canonicalName || focus.registry?.canonicalName || focus.canonicalName || focus.displayName}`,
        focus.entityClass ? entityClassLabel(focus.entityClass) : "Class Unclassified",
        focus.registry?.entityType || focus.canonical?.entityType ? `Type: ${focus.registry?.entityType || focus.canonical?.entityType}` : "",
        focus.canonical?.identityScope ? `Identity scope: ${focus.canonical.identityScope}` : "",
        aliases.length ? `Aliases/surfaces: ${aliases.slice(0, 8).join(", ")}` : "Aliases/surfaces: none stored"
      ].filter(Boolean).join("\n"),
      "entity identity / scope focus"
    ));

    scopedBucketCard(container, "Scope / Verse Presence", focusScopes, (scopePath) => {
      const mentionCount = focus.mentions.filter((item) => scopeBaseForEntityFocus(item.scopePath) === scopePath).length;
      return `${readableScopeFromBase(scopePath)} | ${scopePath} | mentions: ${mentionCount}`;
    }, "No scoped verse presence detected.");
    scopedBucketCard(container, "Semantic Events", focus.semanticEvents, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""} | ${item.scopePath || "unscoped"}`;
    }, "No semantic events found for this entity.");
    scopedBucketCard(container, "Relationship Graph", focus.relationships, (item) =>
      `${item.fromEntity || "Unknown"} -> ${item.toEntity || "Unknown"} | ${item.relationshipType || "relationship"} | ${item.scopePath || "unscoped"}`,
      "No relationship edges found for this entity."
    );
    scopedBucketCard(container, "Mentions", focus.mentions, (item) =>
      `${item.mentionText || item.linkedEntity || "mention"} | ${item.mentionType || "mention"}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""} | ${item.scopePath || "unscoped"}`,
      "No mention entries found for this entity."
    );
    scopedBucketCard(container, "References", [...focus.sourceDiscovery, ...focus.referenceGraph], (item) => {
      if (item.relationshipType) return `${referenceRelationshipLabel(item.relationshipType)}: ${trimText(item.toText || item.toHref, 76)} | ${item.fromScopePath || "unscoped"}`;
      return `${item.refType || "ref"}: ${trimText(item.linkText || item.href, 76)} | ${item.scopePath || "unscoped"}`;
    }, "No scoped references found for this entity.");
    scopedBucketCard(container, "Flow Paths", focus.flowNodes, (item) =>
      `${item.chainTitle}: ${item.actor || "Unknown"} -> ${item.action || item.eventType || "event"}${item.target ? ` -> ${item.target}` : ""} | ${item.scopePath || "unscoped"}`,
      "No flow-chain nodes found for this entity."
    );
  }
  function narrativeTimelinePosition(item = {}, fallback = 0) {
    const value = Number(item.timelinePosition || item.sequenceOrder || item.sequenceIndex || item.sentenceIndex || fallback + 1);
    return Number.isFinite(value) && value > 0 ? value : fallback + 1;
  }

  function narrativeTimelineSort(left, right) {
    return Number(left.timelinePosition || 0) - Number(right.timelinePosition || 0) ||
      normalizeText(left.title).localeCompare(normalizeText(right.title));
  }

  function narrativeItemScopes(item = {}) {
    return Array.from(new Set(
      normalizeScopeList(item.scopes, item)
        .map(scopeBaseForEntityFocus)
        .filter(Boolean)
    ));
  }

  function narrativeReadableScopes(scopes) {
    return scopes.length
      ? scopes.slice(0, 3).map(readableScopeFromBase).join(", ")
      : "Unscoped";
  }

  function narrativeEntityValues(item = {}) {
    return Array.from(new Set([
      item.actor,
      item.target,
      item.recipient,
      item.concerning,
      item.narrator,
      item.quotedSpeaker,
      item.fromEntity,
      item.toEntity,
      item.linkedEntity,
      item.mentionText,
      ...asArray(item.participants),
      ...asArray(item.authorityChain)
    ].map((value) => normalizeText(value)).filter(Boolean)));
  }

  function narrativeTitleFromSemanticEvent(item = {}) {
    const target = item.target || item.recipient || item.concerning || "";
    return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${renderDerivedSemanticDisplayText(target, hasDivineDisplayContext([target, item.eventType, item.action]))}` : ""}`;
  }

  function narrativeTextFromOrderedEvent(item = {}) {
    return item.eventText || item.contextSnippet || item.sourceSnippet || item.normalizedMeaning || "";
  }

  function narrativeEntryKey(position, scopes, fallback) {
    return [
      Number(position || 0).toFixed(3),
      scopes[0] || "unscoped",
      fallback || "event"
    ].join("|");
  }

  function createNarrativeEntry(position, scopes, fallbackTitle) {
    return {
      timelinePosition: position,
      scopes: new Set(scopes),
      orderedEvents: [],
      semanticEvents: [],
      relationships: [],
      flowNodes: [],
      flowLinks: [],
      entities: new Set(),
      title: fallbackTitle || "Narrative moment"
    };
  }

  function addNarrativeEntryItem(entry, item = {}, collectionName) {
    for (const scope of narrativeItemScopes(item)) entry.scopes.add(scope);
    for (const name of narrativeEntityValues(item)) entry.entities.add(name);
    if (collectionName === "orderedEvents") entry.orderedEvents.push(item);
    if (collectionName === "semanticEvents") entry.semanticEvents.push(item);
    if (collectionName === "relationships") entry.relationships.push(item);
    if (collectionName === "flowNodes") entry.flowNodes.push(item);
    if (collectionName === "flowLinks") entry.flowLinks.push(item);
  }

  function narrativeEntryEntityMatches(entry, item = {}) {
    const entityNames = narrativeEntityValues(item).map(normalizedEntityName).filter(Boolean);
    if (entityNames.length === 0 || entry.entities.size === 0) return false;
    const entryNames = Array.from(entry.entities).map(normalizedEntityName).filter(Boolean);
    return entityNames.some((name) => entryNames.some((entryName) => entityQueryMatchesName(name, entryName) || entityQueryMatchesName(entryName, name)));
  }

  function narrativeEntrySharesScope(entry, item = {}) {
    const entryScopes = normalizeScopeList(entry.scopes, entry);
    const scopes = narrativeItemScopes(item);
    return scopes.some((scope) => entry.scopes?.has?.(scope) || entryScopes.includes(scope));
  }

  function narrativeIsBroadScope(scopePath) {
    const value = normalizeText(scopePath || "").toLowerCase();
    if (!value) return true;
    return /\.chapter(?:\.|$)|\.relationship\.\d+$|\.event\.\d+$|\.identity\.\d+$|\.mention\.\d+$/.test(value);
  }

  function narrativeEntryIsLineageMoment(entry) {
    return entry.semanticEvents.some((item) =>
      item.eventType === "lineage_birth" ||
      item.semanticCategory === "lineage" ||
      item.relationshipType === "father_son"
    ) || entry.orderedEvents.some((item) => item.eventType === "lineage_record");
  }

  function narrativeRelationshipIsLineage(edge = {}) {
    return [
      edge.relationshipType,
      edge.semanticCategory,
      edge.derivedFrom,
      edge.evidencePhrase
    ].some((value) => /lineage|father_son|begat/i.test(value || ""));
  }

  function narrativeItemHasNarrowScopeMatch(entry, item = {}) {
    const entryScopes = normalizeScopeList(entry.scopes, entry).filter((scope) => !narrativeIsBroadScope(scope));
    const itemScopes = narrativeItemScopes(item).filter((scope) => !narrativeIsBroadScope(scope));
    return itemScopes.length > 0 && itemScopes.some((scope) => entryScopes.includes(scope));
  }

  function narrativeEntryHasVerseRefMatch(entry, item = {}) {
    const itemVerseRef = normalizeText(item.verseRef || item.sourceContext?.verseRef || "");
    if (!itemVerseRef) return false;
    return entry.semanticEvents.some((eventItem) =>
      normalizeText(eventItem.verseRef || eventItem.sourceContext?.verseRef || "") === itemVerseRef
    ) || entry.orderedEvents.some((eventItem) =>
      normalizeText(eventItem.verseRef || eventItem.sourceContext?.verseRef || "") === itemVerseRef
    );
  }

  function narrativeSourcePhraseOverlap(entry, item = {}) {
    const evidence = normalizeText(item.evidencePhrase || item.anchorText || item.sourceSnippet || "").toLowerCase();
    if (!evidence || evidence.length < 12) return false;
    const eventTexts = [...entry.semanticEvents, ...entry.orderedEvents]
      .map((eventItem) => normalizeText([
        eventItem.anchorText,
        eventItem.sourceSnippet,
        eventItem.normalizedMeaning,
        narrativeTextFromOrderedEvent(eventItem)
      ].filter(Boolean).join(" ")).toLowerCase())
      .filter((value) => value.length >= 12);
    return eventTexts.some((eventEvidence) =>
      eventEvidence.includes(evidence) || evidence.includes(eventEvidence)
    );
  }

  function narrativeEntryHasSpecificScopeMatch(entry, item = {}) {
    return narrativeItemHasNarrowScopeMatch(entry, item) ||
      narrativeEntryHasVerseRefMatch(entry, item) ||
      narrativeSourcePhraseOverlap(entry, item);
  }

  function narrativeEntrySemanticParticipants(entry) {
    const names = new Set();
    for (const eventItem of entry.semanticEvents) {
      for (const name of narrativeEntityValues(eventItem).map(normalizedEntityName).filter(Boolean)) {
        names.add(name);
      }
    }
    return names;
  }

  function narrativeRelationshipParticipantsPresent(entry, edge = {}) {
    const participants = narrativeEntrySemanticParticipants(entry);
    if (participants.size === 0) return false;
    const from = normalizedEntityName(edge.fromEntity || "");
    const to = normalizedEntityName(edge.toEntity || edge.target || "");
    if (!from || !to) return false;
    return participants.has(from) && participants.has(to);
  }

  function narrativeRelationshipBelongsToEntry(entry, edge = {}) {
    if (narrativeRelationshipIsLineage(edge) && !narrativeEntryIsLineageMoment(entry)) return false;
    if (narrativeEntryHasSpecificScopeMatch(entry, edge)) return true;
    if (!narrativeRelationshipParticipantsPresent(entry, edge)) return false;
    return narrativeSourcePhraseOverlap(entry, edge) || narrativeItemHasNarrowScopeMatch(entry, edge);
  }

  function narrativeEntityRecordForName(name) {
    const normalized = normalizedEntityName(name);
    if (!normalized) return null;
    return [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]
      .find((item) => entityNameCandidates(item).some((candidate) =>
        candidate === normalized || entityQueryMatchesName(normalized, candidate) || entityQueryMatchesName(candidate, normalized)
      )) || null;
  }

  function narrativeEntityDisplayName(name) {
    const record = narrativeEntityRecordForName(name);
    return renderDivineDisplayText(entityDisplayNameFromRecord(record || { displayName: name }) || name);
  }

  function narrativeEntryHasBirthNamingFocus(entry) {
    const eventText = [...entry.semanticEvents, ...entry.orderedEvents]
      .map((item) => [
        item.eventType,
        item.semanticCategory,
        item.action,
        item.normalizedMeaning,
        item.sourceSnippet,
        narrativeTextFromOrderedEvent(item)
      ].join(" "))
      .join(" ")
      .toLowerCase();
    return /birth|born|name|named|call his name|brought forth/.test(eventText);
  }

  function narrativeEntityDirectnessRank(entry, displayName) {
    const normalized = normalizedEntityName(displayName);
    if (!normalized) return 90;
    const directActors = new Set(entry.semanticEvents
      .map((item) => normalizedEntityName(item.actor || item.narrator || item.quotedSpeaker))
      .filter(Boolean));
    const directRecipients = new Set(entry.semanticEvents
      .flatMap((item) => [item.recipient, item.target, item.concerning])
      .map(normalizedEntityName)
      .filter(Boolean));
    if (directActors.has(normalized)) return 0;
    if (directRecipients.has(normalized)) return 5;
    return 20;
  }

  function narrativeEntityDisplayRank(entry, name) {
    const displayName = narrativeEntityDisplayName(name);
    const normalized = normalizedEntityName(displayName);
    const record = narrativeEntityRecordForName(name);
    const entityClass = classifyEntityDisplay(record || { displayName: name });
    const type = normalizeText(record?.entityType || "").toLowerCase();
    const roles = new Set(asArray(record?.roleTypes).map((role) => normalizeText(role).toLowerCase()));
    const directness = narrativeEntityDirectnessRank(entry, displayName);

    if (normalized === "the lord" || roles.has("authoritysource") || type === "divine_authority") return 10 + directness / 100;
    if (normalized === "angel of the lord" || entityClass === "II" || type === "divine_messenger") return 20 + directness / 100;
    if ((normalized === "jesus" || normalized === "jesus christ") && narrativeEntryHasBirthNamingFocus(entry)) return 45 + directness / 100;
    if (entityClass === "III" || type === "human" || type === "narrator" || type === "lineage_person") return 30 + directness / 100;
    if (entityClass === "I") return 50 + directness / 100;
    return 80 + directness / 100;
  }

  function sortedNarrativeEntityLabels(entry) {
    const labels = entry.entities.map((name) => ({
      displayName: narrativeEntityDisplayName(name),
      rank: narrativeEntityDisplayRank(entry, name)
    }));
    const seen = new Set();
    return labels
      .sort((left, right) => left.rank - right.rank || left.displayName.localeCompare(right.displayName))
      .filter((item) => {
        const key = normalizedEntityName(item.displayName);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => item.displayName);
  }

  function narrativeVerseNumbers(entry) {
    const numbers = new Set();
    const addVerse = (value) => {
      const match = normalizeText(value || "").match(/(?:\b\d+:)?(\d+)[a-z]?\b/);
      if (match) numbers.add(Number(match[1]));
    };
    const addScopeVerse = (value) => {
      const match = normalizeText(value || "").match(/\.(?:verse|note)\.(\d+)[a-z]?\b/i);
      if (match) numbers.add(Number(match[1]));
    };

    for (const scope of normalizeScopeList(entry.scopes, entry)) addScopeVerse(scope);
    for (const item of [...entry.semanticEvents, ...entry.orderedEvents]) {
      addVerse(item.verseRef || item.sourceContext?.verseRef);
      addVerse(item.verseNumber || item.sourceContext?.verseNumber);
      addScopeVerse(item.scopePath || item.sourceContext?.scopePath);
    }
    return Array.from(numbers)
      .filter((number) => Number.isFinite(number) && number > 0)
      .sort((a, b) => a - b);
  }

  function narrativeVerseLabel(entry) {
    const context = activeScopeContext();
    const book = scopeBookTitle(context.book || "Matthew");
    const chapter = String(context.chapter || "1");
    if (narrativeEntryIsLineageMoment(entry)) return `${book} ${chapter}:1-17`;

    const verses = narrativeVerseNumbers(entry);
    if (verses.length === 0) return narrativeReadableScopes(normalizeScopeList(entry.scopes, entry));
    const first = verses[0];
    const last = verses[verses.length - 1];
    return first === last ? `${book} ${chapter}:${first}` : `${book} ${chapter}:${first}-${last}`;
  }

  function narrativeMomentLabel(entry) {
    if (narrativeEntryIsLineageMoment(entry)) return "Genealogy / Lineage Sequence";

    const eventText = [...entry.semanticEvents, ...entry.orderedEvents]
      .map((item) => [
        item.eventType,
        item.semanticCategory,
        item.actor,
        item.narrator,
        item.action,
        item.target,
        item.recipient,
        item.concerning,
        item.normalizedMeaning,
        item.sourceSnippet,
        narrativeTextFromOrderedEvent(item)
      ].join(" "))
      .join(" ")
      .toLowerCase();

    if (/wise men|king of the jews|worship/.test(eventText)) return "Wise Men Seek and Worship JESUS";
    if (/herod|destroy him|troubled|privily/.test(eventText)) return "Herod Responds as Hostile Authority";
    if (/flee into egypt|out of egypt|departed into egypt/.test(eventText)) return "Joseph Protects CHILD / JESUS in Egypt";
    if (/warned of god|dream|angel|instruct|command|appeared|take the young child/.test(eventText)) return "Joseph Receives Protective Divine Instruction";
    if (/nazareth|nazarene|bethlehem|fulfill|fulfilled|prophet|narrator/.test(eventText)) return "Fulfillment Declared";
    if (/called his name jesus|call his name jesus|brought forth|birth|born/.test(eventText)) return "Joseph Obeys and JESUS Is Named";
    return trimText(entry.title, 64) || "Narrative Moment";
  }

  function narrativeMomentDisplayTitle(entry) {
    if (entry.displayTitle) return `${entry.verseLabel || narrativeVerseLabel(entry)} - ${entry.displayTitle}`;
    return `${narrativeVerseLabel(entry)} - ${narrativeMomentLabel(entry)}`;
  }

  function narrativeItemDisplayText(item = {}) {
    return normalizeText([
      item.eventType,
      item.semanticCategory,
      item.relationshipType,
      item.actor,
      item.narrator,
      item.action,
      item.target,
      item.recipient,
      item.concerning,
      item.normalizedMeaning,
      item.anchorText,
      item.evidencePhrase,
      item.sourceSnippet,
      narrativeTextFromOrderedEvent(item)
    ].filter(Boolean).join(" ")).toLowerCase();
  }

  function narrativeIsMatthewOneContext() {
    const context = activeScopeContext();
    const sourceText = [
      context.book,
      context.chapter,
      studyData.activeAdapter?.sourceTitle,
      studyData.latestCapture?.title,
      studyData.activeAdapter?.sourceUrl,
      studyData.latestCapture?.url
    ].join(" ").toLowerCase();
    return /matthew/.test(sourceText) && /(?:^|\D)1(?:\D|$)/.test(String(context.chapter || "1"));
  }

  function createNarrativeDisplayEntry(position, verseLabel, displayTitle, category, meaning, scopes = []) {
    return {
      timelinePosition: position,
      verseLabel,
      displayTitle,
      category,
      meaning,
      scopes: new Set(scopes),
      orderedEvents: [],
      semanticEvents: [],
      relationships: [],
      flowNodes: [],
      flowLinks: [],
      entities: new Set(),
      title: displayTitle
    };
  }

  function addNarrativeDisplayItem(entry, item = {}, collectionName) {
    for (const scope of narrativeItemScopes(item)) entry.scopes.add(scope);
    for (const name of narrativeEntityValues(item)) entry.entities.add(name);
    if (collectionName === "orderedEvents") entry.orderedEvents.push(item);
    if (collectionName === "semanticEvents") entry.semanticEvents.push(item);
    if (collectionName === "relationships") entry.relationships.push(item);
    if (collectionName === "flowNodes") entry.flowNodes.push(item);
    if (collectionName === "flowLinks") entry.flowLinks.push(item);
  }

  function addNarrativeEntityNames(entry, names) {
    for (const name of names) {
      const normalized = normalizeText(name);
      if (normalized) entry.entities.add(normalized);
    }
  }

  function narrativeSyntheticOrderedEvent(text, scopePath, verseRef) {
    return {
      eventType: "display_summary",
      eventText: text,
      normalizedMeaning: text,
      sourceSnippet: text,
      scopePath,
      verseRef
    };
  }

  function narrativeFinalizeDisplayEntries(entries) {
    return entries.map((entry) => ({
      ...entry,
      scopes: normalizeScopeList(entry.scopes, entry).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      entities: Array.from(entry.entities).sort((a, b) => a.localeCompare(b))
    }));
  }

  function itemHasVerseNumber(item, numbers) {
    const accepted = new Set(numbers.map(String));
    const scopeHit = normalizeScopeList(item.scopes, item).some((scope) => {
      const match = scope.match(/\.(?:verse|note)\.(\d+)[a-z]?\b/i);
      return match && accepted.has(match[1]);
    });
    if (scopeHit) return true;
    const verseRef = normalizeText(item.verseRef || item.sourceContext?.verseRef || "");
    const verseMatch = verseRef.match(/:(\d+)\b/);
    if (verseMatch && accepted.has(verseMatch[1])) return true;
    const verseNumber = String(item.verseNumber || item.sourceContext?.verseNumber || "");
    return accepted.has(verseNumber);
  }

  function narrativeItemMatchesAny(item, patterns) {
    const text = narrativeItemDisplayText(item);
    return patterns.some((pattern) => pattern.test(text));
  }

  function applyTemporaryMatthewOneDisplayTimeline(entries) {
    // Temporary Matthew 1 display grouping only. Future ICE_PASSAGE_FUNCTIONS /
    // ICE_NARRATIVE_PURPOSES should generalize these labels as derived data.
    if (!narrativeIsMatthewOneContext()) return entries;

    const semanticEvents = asArray(studyData.semanticEvents);
    const orderedEvents = asArray(studyData.orderedEvents);
    const relationships = asArray(studyData.relationshipGraph);
    const flowChains = asArray(studyData.semanticFlowChains);
    const lineageScopes = ["scripture.nt.matthew.1.verse.1", "scripture.nt.matthew.1.verse.17"];

    const displayEntries = [
      createNarrativeDisplayEntry(1, "Matthew 1:1-17", "Genealogy Shows JESUS as Descendant of David", "Genealogy / Prophecy Lineage", "JESUS CHRIST is shown in the lineage of David and Abraham.", lineageScopes),
      createNarrativeDisplayEntry(2, "Matthew 1:18", "Mary Is Found With Child", "Birth Context", "Mary is found with child before Joseph and Mary come together.", ["scripture.nt.matthew.1.verse.18"]),
      createNarrativeDisplayEntry(3, "Matthew 1:19-20", "Joseph Ponders What To Do", "Human Response / Discernment", "Joseph considers the matter privately.", ["scripture.nt.matthew.1.verse.19", "scripture.nt.matthew.1.verse.20"]),
      createNarrativeDisplayEntry(4, "Matthew 1:20-21", "AngEL Of THE LORD Instructs Joseph", "Divine Message / Name Revealed", "THE LORD sends AngEL Of THE LORD; Joseph is instructed to take Mary as wife and name the child JESUS.", ["scripture.nt.matthew.1.verse.20", "scripture.nt.matthew.1.verse.21"]),
      createNarrativeDisplayEntry(5, "Matthew 1:22-23", "Fulfillment Declared", "Prophecy Fulfillment", "The narrator identifies fulfillment of prophecy.", ["scripture.nt.matthew.1.verse.22", "scripture.nt.matthew.1.verse.23"]),
      createNarrativeDisplayEntry(6, "Matthew 1:24-25", "Joseph Obeys, Takes Mary To Wife, and JESUS Is Named", "Obedience / Covenant Response / Naming", "Joseph obeys the instruction, takes Mary as wife, and names the child JESUS.", ["scripture.nt.matthew.1.verse.24", "scripture.nt.matthew.1.verse.25"])
    ];
    const [lineage, maryFound, josephPonders, angelInstructs, fulfillment, josephObeys] = displayEntries;

    const addMatching = (entry, items, collectionName, predicate) => {
      for (const item of items) {
        if (predicate(item)) addNarrativeDisplayItem(entry, item, collectionName);
      }
    };

    addMatching(lineage, semanticEvents, "semanticEvents", (item) => item.eventType === "lineage_birth" || item.semanticCategory === "lineage");
    addMatching(lineage, orderedEvents, "orderedEvents", (item) => item.eventType === "lineage_record" || narrativeItemMatchesAny(item, [/genealogy|generation|begat|son of david|son of abraham/]));
    addMatching(lineage, relationships, "relationships", narrativeRelationshipIsLineage);

    addMatching(maryFound, semanticEvents, "semanticEvents", (item) => itemHasVerseNumber(item, [18]) || narrativeItemMatchesAny(item, [/found with child|with child|before they came together|holy ghost|birth of jesus christ/]));
    addMatching(maryFound, orderedEvents, "orderedEvents", (item) => itemHasVerseNumber(item, [18]) || narrativeItemMatchesAny(item, [/found with child|with child|before they came together|holy ghost|birth of jesus christ/]));

    addMatching(josephPonders, semanticEvents, "semanticEvents", (item) => item.eventType === "reflection_consideration" || narrativeItemMatchesAny(item, [/thought|considered|ponder|privily|just man|not willing|publick example/]));
    addMatching(josephPonders, orderedEvents, "orderedEvents", (item) => itemHasVerseNumber(item, [19]) || narrativeItemMatchesAny(item, [/thought|considered|ponder|privily|just man|not willing|publick example/]));

    addMatching(angelInstructs, semanticEvents, "semanticEvents", (item) => ["divine_messenger_appearance", "divine_message_speech", "instruction_concerning_person", "name_revelation", "mission_reason_declaration"].includes(item.eventType) || narrativeItemMatchesAny(item, [/angel|fear not|take unto thee mary|call his name jesus|save his people/]));
    addMatching(angelInstructs, orderedEvents, "orderedEvents", (item) => itemHasVerseNumber(item, [20, 21]) && narrativeItemMatchesAny(item, [/angel|fear not|take unto thee mary|call his name jesus|save his people/]));

    addMatching(fulfillment, semanticEvents, "semanticEvents", (item) => itemHasVerseNumber(item, [22, 23]) || narrativeItemMatchesAny(item, [/fulfill|fulfilled|prophet|emmanuel|spoken of the lord/]));
    addMatching(fulfillment, orderedEvents, "orderedEvents", (item) => itemHasVerseNumber(item, [22, 23]) || narrativeItemMatchesAny(item, [/fulfill|fulfilled|prophet|emmanuel|spoken of the lord/]));

    addMatching(josephObeys, semanticEvents, "semanticEvents", (item) => item.eventType === "covenant_family_union" || itemHasVerseNumber(item, [24, 25]) || narrativeItemMatchesAny(item, [/took unto him his wife|knew her not|brought forth|called his name|named jesus/]));
    addMatching(josephObeys, orderedEvents, "orderedEvents", (item) => itemHasVerseNumber(item, [24, 25]) || narrativeItemMatchesAny(item, [/took unto him his wife|knew her not|brought forth|called his name|named jesus/]));

    if (lineage.semanticEvents.length === 0 && lineage.orderedEvents.length === 0) {
      addNarrativeDisplayItem(lineage, narrativeSyntheticOrderedEvent(lineage.meaning, "scripture.nt.matthew.1.verse.1", "1:1"), "orderedEvents");
    }
    if (maryFound.semanticEvents.length === 0 && maryFound.orderedEvents.length === 0) {
      addNarrativeDisplayItem(maryFound, narrativeSyntheticOrderedEvent(maryFound.meaning, "scripture.nt.matthew.1.verse.18", "1:18"), "orderedEvents");
    }
    if (fulfillment.semanticEvents.length === 0 && fulfillment.orderedEvents.length === 0) {
      addNarrativeDisplayItem(fulfillment, narrativeSyntheticOrderedEvent(fulfillment.meaning, "scripture.nt.matthew.1.verse.22", "1:22"), "orderedEvents");
    }

    addNarrativeEntityNames(lineage, ["JESUS CHRIST", "David", "Abraham"]);
    addNarrativeEntityNames(maryFound, ["Mary", "JESUS CHRIST"]);
    addNarrativeEntityNames(josephPonders, ["Joseph", "Mary"]);
    addNarrativeEntityNames(angelInstructs, ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary"]);
    addNarrativeEntityNames(fulfillment, ["scripture narrator", "THE LORD", "prophet", "JESUS CHRIST"]);
    addNarrativeEntityNames(josephObeys, ["Joseph", "Mary", "JESUS"]);

    for (const entry of displayEntries) {
      for (const edge of relationships) {
        if (entry === lineage) continue;
        if (narrativeRelationshipBelongsToEntry(entry, edge)) addNarrativeDisplayItem(entry, edge, "relationships");
      }
      for (const chain of flowChains) {
        for (const node of asArray(chain.nodes)) {
          const nodeItem = { ...node, chainTitle: chain.chainTitle || "Semantic flow path" };
          if (entry.semanticEvents.some((eventItem) => eventItem.id && nodeItem.semanticEventId === eventItem.id) || narrativeItemHasNarrowScopeMatch(entry, nodeItem) || narrativeEntryHasVerseRefMatch(entry, nodeItem)) {
            addNarrativeDisplayItem(entry, nodeItem, "flowNodes");
          }
        }
        for (const link of asArray(chain.relationships)) {
          const linkItem = { ...link, chainTitle: chain.chainTitle || "Semantic flow path" };
          if (narrativeItemHasNarrowScopeMatch(entry, linkItem) || narrativeSourcePhraseOverlap(entry, linkItem)) addNarrativeDisplayItem(entry, linkItem, "flowLinks");
        }
      }
    }

    return narrativeFinalizeDisplayEntries(displayEntries);
  }

  function createNarrativeTimelineEntries() {
    const entries = new Map();
    const ensureEntry = (position, scopes, title, fallback) => {
      const key = narrativeEntryKey(position, scopes, fallback);
      if (!entries.has(key)) entries.set(key, createNarrativeEntry(position, scopes, title));
      return entries.get(key);
    };

    asArray(studyData.orderedEvents)
      .map((item, index) => ({ item, position: narrativeTimelinePosition(item, index) }))
      .sort((left, right) => left.position - right.position)
      .forEach(({ item, position }, index) => {
        const scopes = narrativeItemScopes(item);
        const entry = ensureEntry(position, scopes, trimText(narrativeTextFromOrderedEvent(item), 72) || `Ordered event ${position}`, `ordered-${index}`);
        addNarrativeEntryItem(entry, item, "orderedEvents");
      });

    asArray(studyData.semanticEvents)
      .map((item, index) => ({ item, position: narrativeTimelinePosition(item, index) }))
      .sort((left, right) => left.position - right.position)
      .forEach(({ item, position }, index) => {
        const scopes = narrativeItemScopes(item);
        const existing = Array.from(entries.values()).find((entry) =>
          Math.abs(Number(entry.timelinePosition || 0) - position) < 0.001 ||
          scopes.some((scope) => entry.scopes?.has?.(scope) || normalizeScopeList(entry.scopes, entry).includes(scope))
        );
        const entry = existing || ensureEntry(position, scopes, narrativeTitleFromSemanticEvent(item), `semantic-${index}`);
        if (!entry.semanticEvents.length && entry.orderedEvents.length === 0) entry.title = narrativeTitleFromSemanticEvent(item);
        addNarrativeEntryItem(entry, item, "semanticEvents");
      });

    for (const entry of entries.values()) {
      for (const edge of asArray(studyData.relationshipGraph)) {
        if (narrativeRelationshipBelongsToEntry(entry, edge)) {
          addNarrativeEntryItem(entry, edge, "relationships");
        }
      }

      for (const chain of asArray(studyData.semanticFlowChains)) {
        for (const node of asArray(chain.nodes)) {
          const nodeItem = { ...node, chainTitle: chain.chainTitle || "Semantic flow path" };
          const linkedToEntry = entry.semanticEvents.some((eventItem) =>
            eventItem.id && nodeItem.semanticEventId === eventItem.id
          );
          if (linkedToEntry || narrativeItemHasNarrowScopeMatch(entry, nodeItem) || narrativeEntryHasVerseRefMatch(entry, nodeItem)) {
            addNarrativeEntryItem(entry, nodeItem, "flowNodes");
          }
        }
        for (const link of asArray(chain.relationships)) {
          const linkedEventIds = new Set([
            link.fromEventId,
            link.toEventId
          ].filter(Boolean));
          const linkedToEntry = entry.semanticEvents.some((eventItem) => linkedEventIds.has(eventItem.id));
          const linkItem = { ...link, chainTitle: chain.chainTitle || "Semantic flow path" };
          if (linkedToEntry || narrativeItemHasNarrowScopeMatch(entry, linkItem) || narrativeSourcePhraseOverlap(entry, linkItem)) {
            addNarrativeEntryItem(entry, linkItem, "flowLinks");
          }
        }
      }
    }

    const normalizedEntries = Array.from(entries.values()).map((entry) => ({
      ...entry,
      scopes: normalizeScopeList(entry.scopes, entry).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      entities: Array.from(entry.entities).sort((a, b) => a.localeCompare(b))
    })).sort(narrativeTimelineSort);
    return applyTemporaryMatthewOneDisplayTimeline(normalizedEntries);
  }

  function narrativeTimelineSearchText(entry) {
    return [
      entry.title,
      entry.displayTitle,
      entry.category,
      entry.meaning,
      entry.verseLabel,
      normalizeScopeList(entry.scopes, entry).join(" "),
      entry.entities.join(" "),
      entry.orderedEvents.map(narrativeTextFromOrderedEvent).join(" "),
      entry.semanticEvents.map(semanticEventSearchText).join(" "),
      entry.relationships.map(relationshipSearchText).join(" "),
      entry.flowNodes.map((node) => [node.actor, node.action, node.target, node.eventType, node.anchorText, node.scopePath].join(" ")).join(" "),
      entry.flowLinks.map((link) => [link.relationType, link.evidenceSnippet, link.confidence].join(" ")).join(" ")
    ].join(" ");
  }

  function narrativeEntryMatchesEntityFocus(entry, focus) {
    if (!focus) return false;
    const entityHit = entry.entities.some((name) => textContainsEntityName(name, focus));
    if (entityHit) return true;
    const entryScopes = normalizeScopeList(entry.scopes, entry);
    const focusScopes = normalizeScopeList(focus.scopes, focus);
    const scopeHit = focusScopes.some((scope) => entryScopes.includes(scope));
    if (scopeHit) return true;
    return entry.semanticEvents.some((eventItem) => eventMatchesEntityFocus(eventItem, focus)) ||
      entry.relationships.some((edge) => relationshipMatchesEntityFocus(edge, focus)) ||
      entry.flowNodes.some((node) => flowNodeMatchesEntityFocus(node, focus));
  }

  function narrativeEntryMatchesFilter(entry, term) {
    if (!term) return true;
    const verseFocus = parseVerseScopeFocus(term);
    if (verseFocus) {
      const entryScopes = normalizeScopeList(entry.scopes, entry);
      return entryScopes.some((scopePath) => scopePathMatchesFocus(scopePath, verseFocus)) ||
        entry.orderedEvents.some((item) => itemMatchesVerseFocus(item, verseFocus)) ||
        entry.semanticEvents.some((item) => itemMatchesVerseFocus(item, verseFocus)) ||
        entry.relationships.some((item) => itemMatchesVerseFocus(item, verseFocus)) ||
        entry.flowNodes.some((item) => itemMatchesVerseFocus(item, verseFocus));
    }

    const entityFocus = collectEntityScopeFocus(term);
    if (entityFocus) return narrativeEntryMatchesEntityFocus(entry, entityFocus);
    return matchesSearchQuery(narrativeTimelineSearchText(entry), term);
  }

  function compactNarrativeEventPreview(entry) {
    const semanticPreview = entry.semanticEvents.slice(0, 3).map((item) => {
      const target = semanticEventDisplayTarget(item);
      const derived = `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""}`;
      return sourceDerivedDisplayBlock(item.anchorText || item.sourceSnippet || "", derived, { context: item });
    });
    if (semanticPreview.length) return semanticPreview.join("\n\n");
    return entry.orderedEvents.slice(0, 2).map((item) => sourceDerivedDisplayBlock(narrativeTextFromOrderedEvent(item), trimText(narrativeTextFromOrderedEvent(item), 120), { context: item })).join("\n\n");
  }

  function compactNarrativeClusterPreview(entry) {
    return entry.semanticEvents
      .filter((item) => item.eventType === "divine_message_cluster" && asArray(item.subEvents).length)
      .slice(0, 2)
      .map((cluster) => {
        const parts = asArray(cluster.subEvents)
          .slice(0, 4)
          .map((part) => {
            const target = semanticEventDisplayTarget(part);
            const derived = `${part.clusterType || part.eventType || "sub_event"}: ${part.actor || "Unknown"} -> ${part.action || "event"}${target ? ` -> ${target}` : ""}`;
            return sourceDerivedDisplayBlock(part.anchorText || "", derived, { context: part });
          })
          .join("\n");
        return `${renderDerivedSemanticDisplayText(cluster.normalizedMeaning || "Grouped revelation", true)}\n${parts}`;
      })
      .join("\n");
  }
  function displayedNarrativeRelationships(entry) {
    return asArray(entry.relationships).slice(0, 3);
  }

  function displayedNarrativeFlowItems(entry) {
    const links = asArray(entry.flowLinks).slice(0, 3);
    if (links.length) return links.map((item) => ({ ...item, displayKind: "link" }));
    return asArray(entry.flowNodes).slice(0, 3).map((item) => ({ ...item, displayKind: "node" }));
  }

  function compactNarrativeRelationshipPreview(entry) {
    return displayedNarrativeRelationships(entry).map((edge) => {
      const derived = `${edge.fromEntity || "Unknown"} -> ${relationshipDisplayTarget(edge)} | ${edge.relationshipType || "relationship"}`;
      return sourceDerivedDisplayBlock(edge.evidencePhrase || "", derived, { context: edge });
    }).join("\n\n");
  }

  function compactNarrativeFlowPreview(entry) {
    return displayedNarrativeFlowItems(entry).map((item) => {
      if (item.displayKind === "link") {
        return sourceDerivedDisplayBlock(item.evidenceSnippet || "", `${item.relationType || "flow_link"} (${displayAppConfidence(item.confidence || "probable")})`, { context: item });
      }
      const target = semanticEventDisplayTarget(item);
      const derived = `${item.actor || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""}`;
      return sourceDerivedDisplayBlock(item.anchorText || item.sourceSnippet || "", derived, { context: item });
    }).join("\n\n");
  }

  function createNarrativeTimelineCard(entry) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const clusterPreview = compactNarrativeClusterPreview(entry);
    const relationshipPreview = compactNarrativeRelationshipPreview(entry);
    const flowPreview = compactNarrativeFlowPreview(entry);
    const entities = sortedNarrativeEntityLabels(entry);
    const hierarchy = hierarchyEntityLines(entry.entities);
    const eventLabels = entry.semanticEvents.length
      ? entry.semanticEvents.map((item) => {
        const target = semanticEventDisplayTarget(item);
        const derived = `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""}`;
        return sourceDerivedDisplayBlock(item.anchorText || item.sourceSnippet || "", derived, { context: item });
      })
      : entry.orderedEvents.map((item) => sourceDerivedDisplayBlock(narrativeTextFromOrderedEvent(item), trimText(narrativeTextFromOrderedEvent(item), 120), { context: item }));
    const divineContext = hasDivineDisplayContext([
      entry.displayTitle,
      entry.category,
      entry.meaning,
      entry.entities,
      entry.semanticEvents.map((item) => [item.actor, item.target, item.eventType, item.anchorText]),
      entry.relationships.map((item) => [item.fromEntity, item.toEntity, item.evidencePhrase])
    ]);

    card.className = "study-card semantic-card narrative-timeline-card";
    assignSemanticCardTarget(card, "timeline", entry, entry.timelinePosition);
    header.className = "semantic-card-header";
    heading.textContent = renderIceDivineDisplayText(`Moment ${entry.timelinePosition}: ${narrativeMomentDisplayTitle(entry)}`, divineContext);
    range.className = "semantic-card-range";
    range.textContent = narrativeReadableScopes(normalizeScopeList(entry.scopes, entry));
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Meaning", entry.meaning || "No meaning summary recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Events", "", { list: eventLabels.slice(0, 3), hiddenCount: Math.max(0, eventLabels.length - 3), plainList: true, divineContext, preferHolySpirit: true }),
      eventLabels.length > 3 ? createPassageFunctionSection("Full Events", "", { collapsed: true, summaryLabel: "Show full events", list: eventLabels, plainList: true, divineContext, preferHolySpirit: true }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines({ ...entry, relatedEntities: entry.entities, plainMeaning: entry.meaning, verseRange: asArray(entry.scopes).join(", ") }, "timeline", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems({ ...entry, relatedEntities: entry.entities }, "timeline"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", narrativeReadableScopes(normalizeScopeList(entry.scopes, entry)), { collapsed: true }),
      createPassageFunctionSection("Category", entry.category || "Not categorized.", { collapsed: true }),
      createPassageFunctionSection("Clustered Revelations", "", { collapsed: true, list: clusterPreview ? clusterPreview.split("\n") : [], plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationships", "", { collapsed: true, list: relationshipPreview ? relationshipPreview.split("\n") : [], plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("NAME / Title Distinction", christIdentityDisplayNote(entry.entities), { collapsed: true, divineContext }),
      createPassageFunctionSection("Flow Path", "", { collapsed: true, list: flowPreview ? flowPreview.split("\n") : [], plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("All Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(entry.entities, [entry.displayTitle, entry.category, entry.meaning, eventLabels]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchy, plainList: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }
  function renderNarrativeTimeline(term) {
    const container = document.getElementById("narrativeTimelineCards");
    const count = document.getElementById("narrativeTimelineCount");
    if (!container || !count) return;

    const entries = createNarrativeTimelineEntries();
    const filtered = entries.filter((entry) => narrativeEntryMatchesFilter(entry, term));
    clearElement(container);
    count.textContent = `${filtered.length} moment(s)`;

    if (filtered.length === 0) {
      appendEmpty(container, "No narrative timeline data for current filter.");
      return;
    }

    const semanticCount = filtered.reduce((sum, entry) => sum + entry.semanticEvents.length, 0);
    const relationshipCount = filtered.reduce((sum, entry) => sum + displayedNarrativeRelationships(entry).length, 0);
    const flowCount = filtered.reduce((sum, entry) => sum + displayedNarrativeFlowItems(entry).length, 0);
    container.appendChild(createCard(
      term ? `Narrative Timeline: ${term}` : "Narrative Timeline",
      [
        `Timeline moments: ${filtered.length}`,
        `Semantic events: ${semanticCount}`,
        `Displayed relationship edges: ${relationshipCount}`,
        `Displayed flow path links/nodes: ${flowCount}`,
        `Filter: ${term || "all current-page narrative data"}`
      ].join("\n"),
      "scope-aware event progression"
    ));
    container.appendChild(createCard(
      "Narrative Label Note",
      "Narrative labels are display-derived from current semantic data; future passage-function layer will generalize this.",
      "temporary display layer"
    ));

    for (const entry of filtered.slice(0, DISPLAY_LIMIT)) {
      container.appendChild(createNarrativeTimelineCard(entry));
    }

    if (filtered.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${filtered.length - DISPLAY_LIMIT} more narrative moment(s) hidden by preview limit. Use entity or verse search to narrow the timeline.`);
    }
  }
  function passageFunctionSearchText(item = {}) {
    return [
      item.passageFunction,
      item.verseRange,
      item.scopePath,
      item.plainMeaning,
      item.fulfillmentMeaning,
      asArray(item.evidence).join(" "),
      asArray(item.linkedThemes).join(" "),
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedProphecies).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function passageFunctionTitle(value) {
    return normalizeText(value || "passage_function")
      .split("_")
      .filter(Boolean)
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(" ");
  }

  function passageFunctionBulletList(items, limit = 4) {
    const values = asArray(items).map((item) => normalizeText(item)).filter(Boolean);
    if (values.length === 0) return "";

    const shown = values.slice(0, limit).map((item) => `- ${item}`);
    if (values.length > limit) shown.push(`- ${values.length - limit} more evidence item(s) hidden by preview limit.`);
    return shown.join("\n");
  }

  function passageFunctionLineList(label, items, limit = 6) {
    const values = asArray(items).map((item) => normalizeText(item)).filter(Boolean);
    if (values.length === 0) return "";
    const shown = values.slice(0, limit).join(", ");
    const hidden = values.length > limit ? ` (${values.length - limit} more)` : "";
    return `${label}:\n${shown}${hidden}`;
  }

  function passageEvidenceRoleLabel(value, item = {}) {
    const text = normalizeText(value);
    const normalized = text.toLowerCase();
    const passageFunction = normalizeText(item.passageFunction || "").toLowerCase();
    const themes = asArray(item.linkedThemes).map((theme) => normalizeText(theme).toLowerCase()).join(" ");

    if (!normalized) return "";
    if (/book of the generation of jesus christ|jesus christ/.test(normalized)) return "Source identity phrase";
    if (/call his name jesus|called his name jesus|his name jesus/.test(normalized)) return "Revealed NAME instruction";
    if (/save his people from their sins|shall save/.test(normalized)) return "Mission declaration";
    if (/fulfilled|spoken of the lord|prophet/.test(normalized)) return "Fulfillment declaration";
    if (/prophet|esaias|jeremias|isaiah|jeremiah|prophecy/.test(normalized)) return "Prophecy source phrase";
    if (/son of david|david/.test(normalized)) return "Davidic lineage reference";
    if (/son of abraham/.test(normalized)) return "Abrahamic covenant lineage reference";
    if (/abraham/.test(normalized) && /covenant|abrahamic/.test(`${passageFunction} ${themes}`)) return "Abrahamic covenant lineage reference";
    if (/lineage|generation|begat|son of/.test(normalized)) return "Lineage reference";
    if (/covenant/.test(normalized)) return "Covenant lineage reference";
    return "";
  }

  function derivedMeaningFromSourcePhrase(value, item = {}) {
    const text = normalizeText(value);
    const normalized = text.toLowerCase();
    const context = normalizeText([
      item.passageFunction,
      item.referenceRole,
      item.eventType,
      item.relationshipType,
      item.semanticCategory,
      item.pathType,
      item.distinctionType,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ")).toLowerCase();

    if (!normalized) return "Derived meaning not recorded.";
    if (/call(?:ed)?\s+(?:his|His|HIS)\s+name\s+jesus/i.test(text) || /name_revelation|revealed_name|naming/.test(context)) return "called HIS NAME JESUS";
    if (/save\s+(?:his|His|HIS)\s+people\s+from\s+their\s+sins/i.test(text) || /mission_reason|mission_declaration/.test(context)) return "HE shall SAVE HIS People from their sins";
    if (/conceived.*holy ghost|conceived.*holy spirit/i.test(text) || /conception_revelation/.test(context)) return "HOLY CONCEPTION: Conceived Of THE HOLY SPIRIT";
    if (/take unto thee mary thy wife/i.test(text) || /marriage_instruction|instruction_concerning_person/.test(context)) return "Divine/HOLY instruction: Joseph is instructed to take Mary as wife";
    if (/book of the generation of jesus christ/i.test(text)) return "Canonical/source identity phrase: JESUS CHRIST";
    if (/son of david/i.test(text)) return "Davidic lineage support";
    if (/son of abraham/i.test(text)) return "Abrahamic covenant lineage support";
    if (/fulfilled|spoken of the lord|prophet/i.test(text)) return "prophecy fulfillment support";
    if (item.normalizedMeaning) return item.normalizedMeaning;
    if (item.derivedFrom) return item.derivedFrom;
    return renderDerivedSemanticDisplayText(text, hasDivineDisplayContext([text, item]));
  }

  function sourceDerivedDisplayBlock(sourcePhrase, derivedMeaning, options = {}) {
    const source = normalizeText(sourcePhrase);
    const derived = normalizeText(derivedMeaning);
    const lines = [];
    if (source) {
      lines.push("Source phrase:");
      lines.push(`"${renderIceBeingDisplayText(source, { sourceQuote: true })}"`);
    }
    if (derived) {
      lines.push("Derived meaning:");
      lines.push(renderIceBeingDisplayText(derived, {
        divineContext: options.divineContext ?? hasDivineDisplayContext([derived, options.context]),
        humanContext: options.humanContext ?? hasHumanBeingDisplayContext([derived, options.context]),
        preferHolySpirit: true
      }));
    }
    return lines.join("\n");
  }

  function passageEvidenceDisplayLine(value, item = {}, divineContext = false) {
    const label = passageEvidenceRoleLabel(value, item);
    const block = sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item });
    return label ? `${label}\n${block}` : block;
  }

  function passageFunctionEntityRecord(name) {
    const normalized = normalizedEntityName(name);
    if (!normalized) return null;
    return [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]
      .find((item) => entityNameCandidates(item).some((candidate) =>
        candidate === normalized || entityQueryMatchesName(normalized, candidate) || entityQueryMatchesName(candidate, normalized)
      )) || null;
  }

  function passageFunctionEntityDisplayName(name) {
    const record = passageFunctionEntityRecord(name);
    return renderDivineDisplayText(entityDisplayNameFromRecord(record || { displayName: name }) || name);
  }

  function passageFunctionEntityRank(name) {
    const normalized = normalizedEntityName(name);
    const record = passageFunctionEntityRecord(name);
    const entityClass = classifyEntityDisplay(record || { displayName: name });
    const type = normalizeText(record?.entityType || "").toLowerCase();
    const registryRank = record ? entityRegistryDisplayRank(record) : 90;

    if (normalized === "the lord" || type === "divine_authority") return 10;
    if (normalized === "angel of the lord" || entityClass === "II" || type === "divine_messenger") return 20;
    if (normalized === "jesus christ") return 30;
    if (normalized === "jesus") return 31;
    if (entityClass === "III" || type === "human") return 40;
    if (type === "lineage_person") return 50;
    return registryRank || 90;
  }

  function hierarchyEntityRecord(name) {
    return passageFunctionEntityRecord(name) || narrativeEntityRecordForName(name) || { displayName: name };
  }

  function hierarchyEntityClassLabel(name) {
    const record = hierarchyEntityRecord(name);
    const entityClass = classifyEntityDisplay(record || { displayName: name });
    return entityClass ? entityClassLabel(entityClass) : "Class Unclassified";
  }

  function hierarchyEntityDisplayLine(name) {
    if (semanticEntityCandidateRejected(name)) return null;
    const display = semanticEntityDisplayName(name);
    return display ? `${display}: ${hierarchyEntityClassLabel(name)}` : "";
  }

  function hierarchyEntityLines(items) {
    const seen = new Set();
    return asArray(items)
      .map((name) => hierarchyEntityDisplayLine(name))
      .filter(Boolean)
      .filter((line) => {
        const key = normalizeText(line).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }
  function passageFunctionOrderedEntities(items) {
    const seen = new Set();
    return asArray(items)
      .map((name) => ({ raw: normalizeText(name), display: passageFunctionEntityDisplayName(name), rank: passageFunctionEntityRank(name) }))
      .filter((item) => item.raw && item.display)
      .sort((left, right) => left.rank - right.rank || left.display.localeCompare(right.display))
      .filter((item) => {
        const key = normalizedEntityName(item.display);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function semanticSectionBody(content, options = {}) {
    const fragment = document.createDocumentFragment();

    if (options.navItems?.length) {
      const list = document.createElement("ul");
      list.className = "semantic-plain-list semantic-nav-list";
      for (const item of options.navItems) {
        const listItem = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "semantic-nav-button";
        button.textContent = renderIceBeingDisplayText(item.label, options);
        button.dataset.targetSection = item.targetSection || "";
        button.dataset.targetKey = item.targetKey || "";
        button.dataset.searchTerm = item.searchTerm || "";
        button.dataset.focusLabel = item.label || "";
        listItem.appendChild(button);
        list.appendChild(listItem);
      }
      fragment.appendChild(list);
    } else if (options.list?.length) {
      const list = document.createElement(options.ordered ? "ol" : "ul");
      list.className = options.plainList ? "semantic-plain-list" : "semantic-list";
      for (const item of options.list) {
        const listItem = document.createElement("li");
        listItem.textContent = options.preserveExact ? normalizeText(item) : renderIceBeingDisplayText(item, options);
        list.appendChild(listItem);
      }
      fragment.appendChild(list);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = options.preserveExact ? normalizeText(content) : renderIceBeingDisplayText(content, options);
      fragment.appendChild(paragraph);
    }

    if (options.hiddenCount > 0) {
      const hidden = document.createElement("div");
      hidden.className = "semantic-hidden-count";
      hidden.textContent = `${options.hiddenCount} more item(s) available in expanded detail.`;
      fragment.appendChild(hidden);
    }

    return fragment;
  }

  function progressiveDisclosureSummaryLabel(title) {
    const normalizedTitle = normalizeText(title).toLowerCase();
    if (/reasoning path|semantic resolution trace/.test(normalizedTitle)) return "Show Reasoning";
    if (/provenance|wording provenance|source\b|source phrase|source wording|derived meaning/.test(normalizedTitle)) return "Show Provenance";
    if (/evidence|grounding|supporting layers|supporting records|related semantic layers|semantic layers|strict layers|grounded layers|elaborate layers|technical detail|scope\b|storage|adapter/.test(normalizedTitle)) return "Show Evidence";
    return `Show ${normalizeText(title).toLowerCase()}`;
  }

  function shouldCollapseStudyDetail(title, options = {}) {
    if (options.collapsed === false || options.alwaysVisible) return false;
    const normalizedTitle = normalizeText(title).toLowerCase();
    return /source phrase|source wording|derived meaning|provenance|wording provenance|evidence weight|^evidence$|reasoning path|technical detail|supporting layers|supporting records|related semantic layers|strict layers|grounded layers|elaborate layers|grounding|source grounding|source evidence|supporting evidence|key evidence|full evidence|related evidence|grounding \/ evidence|semantic resolution trace/.test(normalizedTitle);
  }

  function createPassageFunctionSection(title, content, options = {}) {
    if (!content && !options.list?.length && !options.navItems?.length) return null;
    const bodyOptions = { ...options };
    if (bodyOptions.humanContext == null) {
      bodyOptions.humanContext = hasHumanBeingDisplayContext([title, content, options.list, asArray(options.navItems).map((item) => item.label), options.summaryLabel]);
    }
    const collapsed = Boolean(options.collapsed) || shouldCollapseStudyDetail(title, options);
    const section = document.createElement("section");
    section.className = collapsed ? "semantic-section semantic-section-collapsible" : "semantic-section";
    const normalizedTitle = normalizeText(title).toLowerCase();
    if (/source phrase|source wording/.test(normalizedTitle)) section.classList.add("ice-source-phrase");
    if (/derived meaning|semantic purpose|meaning/.test(normalizedTitle)) section.classList.add("ice-derived-meaning");
    if (/^(app accuracy|i\.c\.e\. app accuracy|accuracy)$/.test(normalizedTitle)) section.classList.add("ice-confidence", confidenceClassName(content));
    if (/provenance/.test(normalizedTitle)) section.classList.add("ice-provenance");
    if (/evidence weight/.test(normalizedTitle)) section.classList.add("ice-evidence-weight");

    if (collapsed) {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = options.summaryLabel || progressiveDisclosureSummaryLabel(title);
      details.appendChild(summary);
      details.appendChild(semanticSectionBody(content, bodyOptions));
      section.appendChild(details);
      return section;
    }

    const heading = document.createElement("h4");
    heading.textContent = title;
    heading.className = "semantic-section-title";
    section.appendChild(heading);
    section.appendChild(semanticSectionBody(content, bodyOptions));
    return section;
  }


  function semanticWordingProvenanceLines({ source, label, layer, storageKey, scopePath, generated = true, rule = "" } = {}) {
    return [
      `Source: ${source || "I.C.E. Generated"}`,
      `Label: ${normalizeText(label || "Not recorded.")}`,
      layer ? `Layer: ${layer}` : "Layer: Not recorded.",
      storageKey ? `Storage key: ${storageKey}` : "Storage key: Not recorded.",
      scopePath ? `Scope path: ${scopePath}` : "Scope path: Not recorded.",
      `Generated or source-provided: ${generated ? "I.C.E. generated display wording" : "source-provided wording"}`,
      rule ? `Rule: ${rule}` : ""
    ].filter(Boolean);
  }

  function createWordingProvenanceSection(options = {}) {
    return createPassageFunctionSection("Wording Provenance", "", {
      list: semanticWordingProvenanceLines(options),
      plainList: true,
      preserveExact: true
    });
  }


  function semanticEvidenceWeightLines({ evidenceType, evidenceStrength, sourceGrounding, supportingRecords = [], sourcePhrase = "" } = {}) {
    const records = asArray(supportingRecords).map((value) => normalizeText(value)).filter(Boolean);
    return [
      `Evidence Type: ${evidenceType || "Derived Semantic Evidence"}`,
      `Evidence Strength: ${evidenceStrength || "grounded by current semantic record"}`,
      `Source Grounding: ${normalizeText(sourceGrounding || sourcePhrase || "Not recorded.")}`,
      `Supporting Records: ${records.length ? records.slice(0, 5).join("; ") : "Not recorded."}`,
      records.length > 5 ? `Supporting Records Hidden: ${records.length - 5}` : ""
    ].filter(Boolean);
  }

  function createEvidenceWeightSection(options = {}) {
    return createPassageFunctionSection("Evidence Weight", "", {
      list: semanticEvidenceWeightLines(options),
      plainList: true,
      preserveExact: true
    });
  }

  function referenceRoleSourceProvenanceLabel(item = {}) {
    const reference = normalizeText(item.discoveredReference || "");
    const href = normalizeText(item.referenceHref || "");
    if (/^TG\b/i.test(reference) || /topical-guide/i.test(href)) return "Topical Guide";
    if (/^BD\b/i.test(reference) || /bible-dictionary/i.test(href)) return "Bible Dictionary";
    if (/cross[-\s]?reference|footnote/i.test(reference) || /#note|footnote/i.test(href)) return "Cross Reference";
    return "Cross Reference";
  }

  function semanticTraceCleanLabel(value) {
    const normalized = normalizeText(value || "");
    const layerLabels = new Map([
      ["ice_reference_roles", "Reference Role"],
      ["ice_canonical_identities", "Canonical Identity"],
      ["ice_ontology_roles", "Semantic Ontology Role"],
      ["ice_semantic_ambiguities", "Semantic Ambiguity / Contrast"],
      ["ice_semantic_distinctions", "Semantic Distinction"],
      ["ice_passage_functions", "Passage Function"],
      ["ice_revelation_patterns", "Revelation Pattern"]
    ]);
    return layerLabels.get(normalized.toLowerCase()) || renderDerivedSemanticDisplayText(passageFunctionTitle(normalized), true);
  }

  function semanticTraceHasIdentity(item = {}, extra = []) {
    const text = normalizeText([
      item.semanticItem,
      item.discoveredReference,
      item.sourceWording,
      item.sourcePhrase,
      item.derivedWording,
      item.derivedMeaning,
      item.derivedInterpretation,
      item.plainMeaning,
      item.fulfillmentMeaning,
      item.canonicalRole,
      item.narrativeRole,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle,
      asArray(item.semanticItems).join(" "),
      asArray(item.relatedEntities).join(" "),
      asArray(item.linkedEntities).join(" "),
      asArray(extra).join(" ")
    ].join(" ")).toLowerCase();
    return {
      jesus: /\bjesus\b/.test(text),
      jesusChrist: /\bjesus christ\b/.test(text),
      christ: /\bchrist\b/.test(text),
      holySpirit: /\bholy spirit\b|\bholy ghost\b/.test(text)
    };
  }

  function semanticTraceReferenceRole(item = {}) {
    const reference = normalizeText(item.discoveredReference || "");
    const commaParts = reference.split(",").map((part) => normalizeText(part)).filter(Boolean);
    if (commaParts.length > 1) return commaParts.slice(1).join(", ");
    if (item.referenceRole) return semanticTraceCleanLabel(item.referenceRole);
    return "";
  }

  function semanticTraceSourceInput(item = {}, kind = "") {
    if (kind === "ambiguity") return item.sourceWording || semanticAmbiguityDisplayTitle(item);
    if (kind === "ontology") return item.sourcePhrase || item.semanticItem || asArray(item.ontologyRoles).join(", ");
    if (kind === "reference") return item.discoveredReference || item.sourceDiscoveryId || item.referenceRole;
    if (kind === "revelation") return item.verseRange || item.revelationType || asArray(item.evidence)[0];
    if (kind === "passage") return item.verseRange || item.passageFunction || asArray(item.evidence)[0];
    if (kind === "distinction") return item.sourceWording || item.semanticItem || item.distinctionType;
    return item.sourceWording || item.sourcePhrase || item.discoveredReference || item.verseRange || item.scopePath || "";
  }

  function semanticTraceResolvedOutput(item = {}, kind = "") {
    const identity = semanticTraceHasIdentity(item);
    const lines = [];
    const role = semanticTraceReferenceRole(item);
    if (identity.jesus || identity.jesusChrist) lines.push("Resolved Being: JESUS");
    if (identity.jesusChrist) lines.push("Canonical/source identity: JESUS CHRIST");
    if (identity.christ && !identity.jesusChrist) lines.push("Title/source identity: CHRIST");
    if (identity.holySpirit) lines.push("Derived divine display: HOLY SPIRIT");
    if (role) lines.push(`Reference role: ${renderDerivedSemanticDisplayText(role, true)}`);
    if (kind === "reference") {
      const relatedCharacters = referenceRoleRelatedCharacters(item);
      if (relatedCharacters.length) lines.push(`Related Characters: ${relatedCharacters.join(", ")}`);
    }
    if (kind === "ontology" && item.semanticItem) lines.push(`Semantic item: ${renderDerivedSemanticDisplayText(item.semanticItem, true)}`);
    if (kind === "ambiguity" && item.derivedInterpretation) lines.push(trimText(renderDerivedSemanticDisplayText(item.derivedInterpretation, true), 150));
    return lines.length ? lines : ["Resolved output follows the displayed semantic card fields."];
  }

  function semanticTraceLayersUsed(item = {}, primaryLayer = "") {
    const layerLabels = new Map([
      ["reference", "Reference Role"],
      ["canonical", "Canonical Identity"],
      ["ontology", "Semantic Ontology Role"],
      ["ambiguity", "Semantic Ambiguity / Contrast"],
      ["passage", "Passage Function"],
      ["revelation", "Revelation Pattern"],
      ["distinction", "Semantic Distinction"]
    ]);
    const identity = semanticTraceHasIdentity(item);
    const layers = new Set();
    if (primaryLayer) layers.add(layerLabels.get(primaryLayer) || primaryLayer);
    for (const layer of asArray(item.relatedLayers)) layers.add(semanticTraceCleanLabel(layer));
    if (item.referenceRole || item.discoveredReference) layers.add("Reference Role");
    if (identity.jesusChrist) layers.add("Canonical Identity");
    if (item.ontologyRoles || item.authorityOriginClass) layers.add("Semantic Ontology Role");
    if (item.ambiguityType || item.distinctionType || item.resolutionStatus) layers.add("Semantic Ambiguity / Contrast");
    if (item.passageFunction || asArray(item.linkedPassageFunctions).length) layers.add("Passage Function");
    if (item.revelationType) layers.add("Revelation Pattern");
    return Array.from(layers).filter(Boolean);
  }

  function semanticTraceEvidenceUsed(item = {}) {
    const evidence = [];
    const reference = normalizeText(item.discoveredReference || item.sourceDiscoveryId || "");
    const roles = asArray(item.ontologyRoles).map((value) => semanticTraceCleanLabel(value)).filter(Boolean);
    const distinction = item.distinctionType || item.ambiguityType;
    if (reference) evidence.push(`source reference label: ${renderDerivedSemanticDisplayText(reference, true)}`);
    if (roles.length) evidence.push(`ontology role match: ${roles.slice(0, 2).join(" / ")}`);
    if (distinction) evidence.push(`semantic distinction record: ${semanticTraceCleanLabel(distinction)}`);
    else if (item.canonicalRole) evidence.push(`semantic distinction record: ${trimText(renderDerivedSemanticDisplayText(item.canonicalRole, true), 140)}`);
    else if (item.sourceGrounding) evidence.push("semantic distinction record: source grounding summary");
    for (const value of asArray(item.evidence).slice(0, 2)) {
      const text = normalizeText(value);
      if (text) evidence.push(`evidence phrase: ${renderIceBeingDisplayText(text, { divineContext: true, preferHolySpirit: true })}`);
    }
    return evidence.length ? evidence : ["display fields and source grounding already shown on this card"];
  }

  function semanticTraceAmbiguityCheck(item = {}) {
    const identity = semanticTraceHasIdentity(item);
    const status = semanticAmbiguityResolutionLabel(item.resolutionStatus || "resolved");
    const lines = [`${status.charAt(0).toUpperCase()}${status.slice(1)}:`];
    if (identity.jesus || identity.jesusChrist) lines.push("JESUS is the referenced Being.");
    if (identity.jesusChrist) lines.push("JESUS CHRIST is the canonical/source identity.");
    if (identity.christ) lines.push("CHRIST is title/source identity.");
    if (identity.holySpirit) lines.push("HOLY SPIRIT is the preferred derived display while source wording remains preserved.");
    if (lines.length === 1) lines.push("No unresolved semantic relationship problem is introduced by this display.");
    return lines;
  }

  function appendSemanticTraceBlock(container, title, values, options = {}) {
    const block = document.createElement("div");
    const heading = document.createElement("div");
    heading.className = "semantic-trace-label";
    heading.textContent = title;
    block.className = "semantic-trace-block";
    block.appendChild(heading);

    if (options.quote) {
      const quote = document.createElement("p");
      quote.className = "semantic-trace-quote";
      quote.textContent = `"${renderIceBeingDisplayText(normalizeText(values), { divineContext: true, sourceQuote: true })}"`;
      block.appendChild(quote);
    } else {
      const list = document.createElement("ul");
      list.className = "semantic-plain-list semantic-trace-list";
      for (const value of asArray(values).filter(Boolean)) {
        const item = document.createElement("li");
        item.textContent = renderIceBeingDisplayText(value, { divineContext: true, preferHolySpirit: true });
        list.appendChild(item);
      }
      block.appendChild(list);
    }
    container.appendChild(block);
  }

  function createSemanticResolutionTraceSection(item = {}, kind = "") {
    const sourceInput = semanticTraceSourceInput(item, kind);
    const section = document.createElement("section");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const body = document.createElement("div");

    section.className = "semantic-section semantic-section-collapsible semantic-resolution-trace";
    summary.textContent = "Semantic Resolution Trace";
    body.className = "semantic-trace-body";

    appendSemanticTraceBlock(body, "Source Input", sourceInput || "Current semantic card", { quote: true });
    appendSemanticTraceBlock(body, "Resolved Output", semanticTraceResolvedOutput(item, kind));
    appendSemanticTraceBlock(body, "Layers Used", semanticTraceLayersUsed(item, kind));
    appendSemanticTraceBlock(body, "Evidence Used", semanticTraceEvidenceUsed(item));
    appendSemanticTraceBlock(body, "Ambiguity Check", semanticTraceAmbiguityCheck(item));
    appendSemanticTraceBlock(body, "App accuracy", [displayConfidence(item.confidence || "probable")]);

    details.append(summary, body);
    section.appendChild(details);
    return section;
  }
  function semanticTransferActs(item = {}) {
    const acts = new Set();
    const context = normalizeText([
      item.passageFunction,
      item.revelationType,
      item.pathType,
      item.plainMeaning,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle,
      item.mission,
      item.sourceEntity,
      item.targetEntity,
      asArray(item.subEvents).map((part) => [part.clusterType, part.eventType, part.action, part.target]).join(" ")
    ].join(" ")).toLowerCase();

    if (/instruction|instruct|marriage_instruction|take mary/.test(context)) acts.add("Instruction");
    if (/revelation|reveal|conception_revelation|holy spirit|holy ghost/.test(context)) acts.add("Revelation");
    if (/conception_revelation|holy spirit|holy ghost|conceived/.test(context)) acts.add("HOLY CONCEPTION");
    if (/name|naming|revealed_name|jesus/.test(context)) acts.add("NAME revelation");
    if (/mission|save his people|save his people|mission_declaration/.test(context)) acts.add("Mission declaration");
    if (/protect|save his people|mission|child|jesus/.test(context)) acts.add("HOLY preservation/protection of the CHILD");
    return Array.from(acts);
  }

  function hasClassTransferDisplayContext(item = {}) {
    const text = normalizeText([
      item.passageFunction,
      item.revelationType,
      item.pathType,
      item.plainMeaning,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle,
      item.authoritySource,
      item.speaker,
      item.origin,
      item.messenger,
      item.recipient,
      asArray(item.relatedEntities).join(" "),
      asArray(item.subEvents).map((part) => [part.clusterType, part.eventType, part.action, part.target]).join(" ")
    ].join(" ")).toLowerCase();
    return /the lord/.test(text) && /angel of the lord/.test(text) && /joseph/.test(text) && /(instruction|instruct|revelation|reveal|message|origin|authority|name|mission)/.test(text);
  }

  function createClassTransferDisplaySection(item = {}) {
    if (!hasClassTransferDisplayContext(item)) return null;
    const section = document.createElement("section");
    const heading = document.createElement("h4");
    const path = document.createElement("div");
    const classTransfer = document.createElement("div");
    const actsTitle = document.createElement("div");
    const actsList = document.createElement("ul");
    const acts = semanticTransferActs(item);

    section.className = "semantic-section ice-derived-meaning ice-authority-path";
    heading.className = "semantic-section-title";
    heading.textContent = "Authority Path / Class Transfer";

    path.className = "ice-authority-path-line";
    path.append(
      iceClassNode("THE LORD", "Class I - GOD / Divine Authority", "ice-class-i-divine"),
      iceTransferArrow("Sends / Authorizes"),
      iceClassNode("AngEL Of THE LORD", "Class II - AngEL / Messenger of GOD", "ice-class-ii"),
      iceTransferArrow("Instructs / Reveals"),
      iceClassNode("Joseph", "Class III - Human", "ice-class-iii")
    );

    classTransfer.className = "ice-class-transfer-line";
    classTransfer.textContent = "Class Transfer: Class I -> Class II -> Class III";

    actsTitle.className = "ice-transfer-action-title";
    actsTitle.textContent = "Transferred Acts";
    actsList.className = "semantic-plain-list ice-transfer-actions";
    for (const act of acts.length ? acts : ["Instruction", "Revelation"]) {
      const itemNode = document.createElement("li");
      itemNode.className = "ice-transfer-action";
      itemNode.textContent = act;
      actsList.appendChild(itemNode);
    }

    const processTitle = document.createElement("div");
    const processList = document.createElement("ol");
    processTitle.className = "ice-transfer-action-title";
    processTitle.textContent = "HOLY Action Process";
    processList.className = "semantic-plain-list ice-transfer-process";
    [
      "Authoritative ACTOR / Origin: THE LORD (Class I / HOLY Origin)",
      "Actor / Messenger: AngEL Of THE LORD (Class II messenger / transfer)",
      "Transfer / Action: Divine/HOLY instruction, revelation, NAME revelation, HOLY CONCEPTION witness",
      "Recipient / Target: Joseph receives Instruction and protects the CHILD",
      "Result / Fulfillment: Joseph obeys; JESUS is named; mission declaration is preserved"
    ].forEach((line) => {
      const itemNode = document.createElement("li");
      itemNode.className = "ice-transfer-action";
      itemNode.textContent = renderDerivedSemanticDisplayText(line, true);
      processList.appendChild(itemNode);
    });

    section.append(heading, path, classTransfer, actsTitle, actsList, processTitle, processList);
    return section;
  }

  function iceClassNode(label, classLabel, className) {
    const node = document.createElement("div");
    const name = document.createElement("strong");
    const meta = document.createElement("span");
    node.className = `ice-class-node ${className}`;
    name.textContent = renderDerivedSemanticDisplayText(label, true);
    meta.textContent = classLabel;
    node.append(name, meta);
    return node;
  }

  function iceTransferArrow(label) {
    const node = document.createElement("div");
    node.className = "ice-transfer-action";
    node.textContent = `-> ${label}`;
    return node;
  }
  function semanticKey(type, value) {
    return `${type}:${normalizeText(value || "")}`.toLowerCase().replace(/[^a-z0-9:_-]+/g, "-");
  }

  function semanticCardKey(type, item = {}, fallback = "") {
    return semanticKey(type, item.id || item.semanticEventId || item.sourceDiscoveryId || item.passageFunction || item.referenceRole || item.chainTitle || fallback);
  }

  function assignSemanticCardTarget(card, type, item = {}, fallback = "") {
    card.dataset.semanticKey = semanticCardKey(type, item, fallback);
  }

  function semanticNavItem(label, targetSection, searchTerm = "", targetKey = "") {
    return { label: normalizeText(label), targetSection, searchTerm: normalizeText(searchTerm), targetKey };
  }

  function semanticVerseSearchTerm(item = {}) {
    const tokens = Array.from(semanticVerseTokens(item)).sort((left, right) => Number(left) - Number(right));
    const context = item.sourceContext || activeScopeContext();
    const book = scopeBookTitle(context.book || "Matthew");
    const chapter = String(context.chapter || activeScopeContext().chapter || "");
    if (tokens.length && book && chapter) return `${book} ${chapter}:${tokens[0]}`;
    const range = normalizeText(item.verseRange || item.verseRef || "");
    return range || normalizeScopeList(item.scopes, item)[0] || item.scopePath || "";
  }

  function semanticFocusKindLabel(nav = {}) {
    const label = normalizeText(nav.focusLabel || "semantic focus");
    const prefix = label.split(":")[0];
    if (/^passage function$/i.test(prefix)) return "Passage Function";
    if (/^revelation pattern$/i.test(prefix)) return "Revelation Pattern";
    if (/^reference role$/i.test(prefix)) return "Reference Role";
    if (/^semantic event$/i.test(prefix)) return "Semantic Event";
    if (/^semantic flow path$/i.test(prefix)) return "Semantic Flow Path";
    if (/^narrative timeline$/i.test(prefix)) return "Narrative Timeline";
    if (/^verse scope$/i.test(prefix)) return "Verse Scope";
    if (/^entity scope$/i.test(prefix)) return "Entity Scope";
    if (/^reference graph$/i.test(prefix)) return "Reference Graph";
    return "Semantic Focus";
  }

  function semanticFocusValueLabel(nav = {}) {
    const label = normalizeText(nav.focusLabel || nav.searchTerm || "semantic focus");
    const parts = label.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : label;
  }

  function updateSemanticFocusStatus() {
    const status = document.getElementById("semanticFocusStatus");
    const statusText = document.getElementById("semanticFocusStatusText");
    if (!status || !statusText) return;
    if (!currentSemanticFocus) {
      status.hidden = true;
      statusText.textContent = "Current semantic focus: none";
      return;
    }
    const kind = semanticFocusKindLabel(currentSemanticFocus);
    const value = semanticFocusValueLabel(currentSemanticFocus);
    status.hidden = false;
    statusText.textContent = `Current semantic focus: ${renderIceDivineDisplayText(kind, true)} -> ${renderIceDivineDisplayText(value, true)}`;
  }

  function clearSemanticFocus() {
    currentSemanticFocus = null;
    pendingSemanticFocus = null;
    const input = document.getElementById("searchInput");
    if (input) {
      semanticFocusInputUpdate = true;
      input.value = "";
      semanticFocusInputUpdate = false;
    }
    updateSemanticFocusStatus();
    renderStudy();
    document.getElementById("passageFunctionsSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function semanticSectionForNav(type) {
    return {
      passage: "passageFunctionsSection",
      revelation: "revelationPatternsSection",
      reference: "referenceRolesSection",
      distinction: "semanticDistinctionsSection",
      ontology: "ontologyRolesSection",
      ambiguity: "semanticAmbiguitiesSection",
      originAuthority: "originAuthorityPathsSection",
      relationRole: "entityRelationRolesSection",
      continuity: "semanticContinuitySection",
      movement: "movementSemanticsSection",
      causality: "semanticCausalitySection",
      teaching: "teachingSemanticsSection",
      principleRelationship: "principleRelationshipsSection",
      characterInteraction: "interactionsSection",
      studyProgression: "studyProgressionSection",
      libraryAwareness: "libraryAwarenessSection",
      knowledgeGraph: "knowledgeGraphSection",
      principleNetwork: "principleNetworksSection",
      focusLens: "focusLensSection",
      scopeLens: "scopeLensSection",
      depthLens: "depthLensSection",
      semanticQuestion: "semanticQuestionsSection",
      trustVerification: "trustVerificationSection",
      sessionContinuityReview: "sessionContinuityReviewSection",
      event: "semanticEventsSection",
      flow: "semanticFlowChainsSection",
      timeline: "narrativeTimelineSection",
      verse: "verseScopeFocusSection",
      entity: "entityScopeFocusSection",
      referenceGraph: "referenceGraphSection"
    }[type] || "";
  }

  function semanticApplyFocus() {
    if (!pendingSemanticFocus) return;
    const { targetSection, targetKey, focusLabel } = pendingSemanticFocus;
    currentSemanticFocus = pendingSemanticFocus;
    updateSemanticFocusStatus();
    pendingSemanticFocus = null;
    const target = targetKey ? Array.from(document.querySelectorAll("[data-semantic-key]")).find((element) => element.dataset.semanticKey === targetKey) : null;
    const section = document.getElementById(targetSection);
    const destination = target || section;
    if (!destination) return;
    destination.classList.add("semantic-focus-jump");
    destination.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target?.querySelector("details")) {
      target.querySelectorAll("details").forEach((details) => { details.open = true; });
    }
    if (focusLabel) destination.setAttribute("aria-label", `Semantic focus: ${focusLabel}`);
    window.setTimeout(() => destination.classList.remove("semantic-focus-jump"), 1400);
  }

  function navigateSemanticFocus(nav = {}) {
    const input = document.getElementById("searchInput");
    pendingSemanticFocus = nav;
    if (input && nav.searchTerm && input.value !== nav.searchTerm) {
      semanticFocusInputUpdate = true;
      input.value = nav.searchTerm;
      semanticFocusInputUpdate = false;
      renderStudy();
    }
    window.requestAnimationFrame(semanticApplyFocus);
  }
  function semanticUniqueLines(lines, limit = 8) {
    const seen = new Set();
    const values = [];
    for (const line of asArray(lines).map((value) => normalizeText(value)).filter(Boolean)) {
      const key = line.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      values.push(line);
    }
    if (values.length <= limit) return values;
    return [...values.slice(0, limit), `${values.length - limit} more related item(s) available in their native sections.`];
  }

  function semanticRecordEntityNames(item = {}) {
    return [
      item.relatedEntities,
      item.linkedEntities,
      item.continuingCharacters,
      item.continuingAuthorityPaths,
      item.continuingCharacterInteractions,
      item.authoritySource,
      item.speaker,
      item.recipient,
      item.actor,
      item.target,
      item.narrator,
      item.concerning,
      item.origin,
      item.messenger,
      item.response,
      item.result,
      item.mission,
      item.sourceEntity,
      item.targetEntity,
      asArray(item.subEvents).map((subEvent) => [subEvent.actor, subEvent.target]),
      asArray(item.nodes).map((node) => [node.actor, node.target]),
      asArray(item.authorityChain)
    ].flat(Infinity).map((value) => normalizedEntityName(value)).filter(Boolean);
  }

  function semanticRecognizedEntityNames(item = {}) {
    const allowed = new Set(["the lord", "angel of the lord", "joseph", "mary", "holy ghost", "holy spirit", "jesus", "jesus christ", "david", "abraham", "scripture narrator", "prophet"]);
    return semanticRecordEntityNames(item).filter((name) => allowed.has(name) || Boolean(passageFunctionEntityRecord(name)));
  }

  function semanticEntityOverlap(left = {}, right = {}) {
    const leftSet = new Set(semanticRecognizedEntityNames(left));
    if (leftSet.size === 0) return false;
    return semanticRecognizedEntityNames(right).some((name) => leftSet.has(name));
  }
  function semanticAddVerseToken(tokens, verse) {
    const value = String(verse || "").match(/\d+/)?.[0];
    if (value) tokens.add(value);
  }

  function semanticAddVerseRange(tokens, start, end) {
    const first = Number(String(start || "").match(/\d+/)?.[0] || 0);
    const last = Number(String(end || start || "").match(/\d+/)?.[0] || first);
    if (!first) return;
    for (let value = first; value <= Math.max(first, last); value += 1) tokens.add(String(value));
  }

  function semanticVerseTokensFromText(text, tokens) {
    const value = normalizeText(text || "");
    if (!value) return;

    for (const match of value.matchAll(/\b\d+:(\d+)(?:\s*(?:-|\u2013)\s*(\d+))?/g)) {
      semanticAddVerseRange(tokens, match[1], match[2] || match[1]);
    }
    for (const match of value.matchAll(/\.verse\.(\d+)(?:[-.]?(\d+))?/gi)) {
      semanticAddVerseRange(tokens, match[1], match[2] || match[1]);
    }
    for (const match of value.matchAll(/\bverse\s+(\d+)\b/gi)) {
      semanticAddVerseToken(tokens, match[1]);
    }
  }

  function semanticVerseTokens(item = {}) {
    const tokens = new Set();
    [item.scopePath, item.fromScopePath, item.sourceScopePath, item.verseRange, item.verseRef, item.verseNumber].forEach((value) => semanticVerseTokensFromText(value, tokens));
    for (const scope of normalizeScopeList(item.scopes, item)) semanticVerseTokensFromText(scope, tokens);
    for (const subEvent of asArray(item.subEvents)) [subEvent.scopePath, subEvent.verseRange, subEvent.verseRef, subEvent.verseNumber].forEach((value) => semanticVerseTokensFromText(value, tokens));
    for (const node of asArray(item.nodes)) [node.scopePath, node.verseRange, node.verseRef, node.verseNumber].forEach((value) => semanticVerseTokensFromText(value, tokens));
    return tokens;
  }

  function semanticVerseOverlap(left = {}, right = {}) {
    const leftSet = semanticVerseTokens(left);
    const rightSet = semanticVerseTokens(right);
    if (leftSet.size === 0 || rightSet.size === 0) return false;
    return Array.from(leftSet).some((value) => rightSet.has(value));
  }

  function semanticScopeLabels(item = {}) {
    const labels = [];
    if (item.verseRange) labels.push(item.verseRange);
    if (item.verseRef) labels.push(`Matthew ${item.verseRef}`);
    normalizeScopeList(item.scopes, item).forEach((scope) => labels.push(scope));
    return semanticUniqueLines(labels, 4);
  }

  function semanticEventLabel(item = {}) {
    const target = item.target || item.recipient || item.concerning || "";
    return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${renderDerivedSemanticDisplayText(target, hasDivineDisplayContext([target, item.eventType, item.action]))}` : ""}`;
  }

  function semanticFlowPathMatchesRecord(chain = {}, item = {}) {
    if (semanticVerseOverlap(chain, item) || semanticEntityOverlap(chain, item)) return true;
    const ids = new Set([
      item.id,
      item.semanticEventId,
      asArray(item.subEvents).map((subEvent) => subEvent.semanticEventId)
    ].flat(Infinity).filter(Boolean));
    return asArray(chain.nodes).some((node) => ids.has(node.semanticEventId) || semanticVerseOverlap(node, item) || semanticEntityOverlap(node, item));
  }

  function semanticNarrativeMatchesRecord(entry = {}, item = {}) {
    if (semanticVerseOverlap({ scopes: entry.scopes }, item) || semanticEntityOverlap({ relatedEntities: entry.entities }, item)) return true;
    return asArray(entry.semanticEvents).some((eventItem) => semanticVerseOverlap(eventItem, item) || semanticEntityOverlap(eventItem, item));
  }

  function semanticUniqueNavItems(items, limit = 10) {
    const seen = new Set();
    const values = [];
    for (const item of asArray(items)) {
      if (!item?.label) continue;
      const key = [item.label, item.targetSection, item.targetKey, item.searchTerm].map((value) => normalizeText(value).toLowerCase()).join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      values.push(item);
    }
    if (values.length <= limit) return values;
    return [...values.slice(0, limit), semanticNavItem(`${values.length - limit} more related item(s) available in their native sections.`, "")];
  }

  function relatedSemanticLayerNavItems(item = {}, mode = "generic") {
    const links = [];
    const itemFunction = normalizeText(item.passageFunction || item.referenceRole || "");
    const relatedFunctionKeys = new Set([
      item.passageFunction,
      asArray(item.relatedPassageFunctions),
      asArray(item.linkedPassageFunctions)
    ].flat(Infinity).map((value) => normalizeText(value)).filter(Boolean));
    const subEventIds = new Set(asArray(item.subEvents).map((subEvent) => subEvent.semanticEventId).filter(Boolean));
    const timelineEntries = createNarrativeTimelineEntries();

    if (mode !== "passage") {
      asArray(studyData.passageFunctions)
        .filter((passage) => relatedFunctionKeys.has(normalizeText(passage.passageFunction)) || semanticVerseOverlap(passage, item) || semanticEntityOverlap(passage, item))
        .forEach((passage) => links.push(semanticNavItem(
          `Passage Function: ${passageFunctionTitle(passage.passageFunction)} | ${passage.verseRange || passage.scopePath || "current scope"}`,
          semanticSectionForNav("passage"),
          passage.passageFunction || passage.verseRange || "",
          semanticCardKey("passage", passage, passage.passageFunction)
        )));
    }

    if (mode !== "revelation") {
      asArray(studyData.revelationPatterns)
        .filter((pattern) => asArray(pattern.relatedPassageFunctions).map((value) => normalizeText(value)).includes(itemFunction) || semanticVerseOverlap(pattern, item) || semanticEntityOverlap(pattern, item))
        .forEach((pattern) => links.push(semanticNavItem(
          `Revelation Pattern: ${revelationPatternTypeLabel(pattern.revelationType)} | ${pattern.verseRange || pattern.scopePath || "current scope"}`,
          semanticSectionForNav("revelation"),
          pattern.verseRange || pattern.revelationType || "",
          semanticCardKey("revelation", pattern, pattern.revelationType)
        )));
    }

    if (mode !== "reference") {
      asArray(studyData.referenceRoles)
        .filter((role) => asArray(role.linkedPassageFunctions).some((value) => relatedFunctionKeys.has(normalizeText(value)) || normalizeText(value) === itemFunction) || semanticVerseOverlap(role, item) || semanticEntityOverlap(role, item))
        .forEach((role) => {
          const resolved = referenceRoleResolvedJesusTitle(role);
          links.push(semanticNavItem(
            `Reference Role: ${trimText(referenceRoleProvenanceSummary(role), 180)}`,
            semanticSectionForNav("reference"),
            resolved?.resolvedBeing || role.discoveredReference || role.referenceRole || "",
            semanticCardKey("reference", role, role.referenceRole)
          ));
        });    }

    if (mode !== "originAuthority") {
      asArray(studyData.originAuthorityPaths)
        .filter((path) => asArray(path.relatedPassageFunctions).some((value) => relatedFunctionKeys.has(normalizeText(value)) || normalizeText(value) === itemFunction) || semanticVerseOverlap(path, item) || semanticEntityOverlap(path, item))
        .forEach((path) => links.push(semanticNavItem(
          `Origin / Authority Path: ${passageFunctionTitle(path.pathType || "origin_authority_path")} | ${path.verseRange || path.scopePath || "current scope"}`,
          semanticSectionForNav("originAuthority"),
          path.verseRange || path.pathType || "",
          semanticCardKey("originAuthority", path, path.pathType)
        )));
    }

    if (mode !== "relationRole") {
      asArray(studyData.entityRelationRoles)
        .filter((role) => asArray(role.relatedPassageFunctions).some((value) => relatedFunctionKeys.has(normalizeText(value)) || normalizeText(value) === itemFunction) || semanticVerseOverlap(role, item) || semanticEntityOverlap(role, item))
        .forEach((role) => links.push(semanticNavItem(
          `Relationship Role: ${entityRelationRoleTitle(role.semanticRole)} | ${role.sourceEntity || "source"} -> ${role.targetEntity || "target"}`,
          semanticSectionForNav("relationRole"),
          role.sourceEntity || role.targetEntity || role.semanticRole || "",
          semanticCardKey("relationRole", role, `${role.sourceEntity || ""}-${role.targetEntity || ""}-${role.semanticRole || ""}`)
        )));
    }

    if (mode === "revelation") {
      asArray(studyData.semanticEvents)
        .filter((eventItem) => subEventIds.has(eventItem.semanticEventId) || semanticVerseOverlap(eventItem, item) || semanticEntityOverlap(eventItem, item))
        .forEach((eventItem) => links.push(semanticNavItem(
          `Semantic Event: ${semanticEventLabel(eventItem)} | ${eventItem.scopePath || eventItem.verseRef || "current scope"}`,
          semanticSectionForNav("event"),
          eventItem.anchorText || eventItem.action || eventItem.eventType || "",
          semanticCardKey("event", eventItem, eventItem.semanticEventId)
        )));
    }

    if (mode !== "flow") {
      asArray(studyData.semanticFlowChains)
        .filter((chain) => semanticFlowPathMatchesRecord(chain, item))
        .forEach((chain) => links.push(semanticNavItem(
          `Semantic Flow Path: ${chain.chainTitle || "Semantic flow path"}`,
          semanticSectionForNav("flow"),
          chain.chainTitle || chain.chainType || "",
          semanticCardKey("flow", chain, chain.chainTitle)
        )));
    }

    if (mode !== "continuity") {
      asArray(studyData.semanticContinuity)
        .filter((continuity) => semanticVerseOverlap(continuity, item) || semanticEntityOverlap(continuity, item))
        .forEach((continuity) => links.push(semanticNavItem(
          `Continuity: ${continuity.continuedEntity || "semantic continuity"} | ${continuity.chapterTransition || "chapter transition"}`,
          semanticSectionForNav("continuity"),
          continuity.continuedEntity || continuity.continuityType || "",
          semanticCardKey("continuity", continuity, `${continuity.continuedEntity || ""}-${continuity.continuityType || ""}`)
        )));
    }

    if (mode !== "movement") {
      asArray(studyData.movementSemantics)
        .filter((movement) => semanticVerseOverlap(movement, item) || semanticEntityOverlap(movement, item))
        .forEach((movement) => links.push(semanticNavItem(
          `Movement / Location: ${movement.originLocation || "origin"} -> ${movement.destinationLocation || "destination"}`,
          semanticSectionForNav("movement"),
          movement.destinationLocation || movement.originLocation || movement.movementType || "",
          semanticCardKey("movement", movement, `${movement.originLocation || ""}-${movement.destinationLocation || ""}-${movement.movementType || ""}`)
        )));
    }

    if (mode !== "causality") {
      asArray(studyData.semanticCausality)
        .filter((sequence) => semanticVerseOverlap(sequence, item) || semanticEntityOverlap(sequence, item))
        .forEach((sequence) => links.push(semanticNavItem(
          `Sequence / Causality: ${sequence.initiatingCause || sequence.sequenceType || "semantic sequence"}`,
          semanticSectionForNav("causality"),
          sequence.initiatingCause || sequence.sequenceType || "",
          semanticCardKey("causality", sequence, `${sequence.sequenceType || ""}-${sequence.initiatingCause || ""}`)
        )));
    }

    if (mode !== "principleRelationship") {
      scopedSemanticRecords(studyData.principleRelationships)
        .filter((relationship) => semanticVerseOverlap(relationship, item) || semanticEntityOverlap(relationship, item) || asArray(relationship.relatedTeachingSemantics).some((id) => id && normalizeText(JSON.stringify(item)).includes(normalizeText(id))))
        .forEach((relationship) => links.push(semanticNavItem(
          `Principle Relationship: ${relationship.principle || "principle"} ${relationship.relationshipType || "related"} ${asArray(relationship.relatedPrinciples).join(", ") || "related principle"}`,
          semanticSectionForNav("principleRelationship"),
          relationship.principle || relationship.relationshipType || "",
          semanticCardKey("principleRelationship", relationship, `${relationship.principle || ""}-${relationship.relationshipType || ""}`)
        )));
    }

    if (mode !== "focusLens") {
      scopedSemanticRecords(studyData.focusLens)
        .filter((focus) => semanticVerseOverlap(focus, item) || semanticEntityOverlap(focus, item) || matchesSearchQuery(focusLensSearchText(focus), semanticRecordEntityNames(item).join(" ")))
        .forEach((focus) => links.push(semanticNavItem(
          `Focus Lens: ${focus.currentFocus || "focus"} | ${focus.focusType || "Focus"}`,
          semanticSectionForNav("focusLens"),
          focus.currentFocus || "focus lens",
          semanticCardKey("focusLens", focus, focus.currentFocus || focus.id)
        )));
    }
    if (mode !== "principleNetwork") {
      scopedSemanticRecords(studyData.principleNetworks)
        .filter((network) => semanticVerseOverlap(network, item) || semanticEntityOverlap(network, item) || matchesSearchQuery(principleNetworkSearchText(network), semanticRecordEntityNames(item).join(" ")))
        .forEach((network) => links.push(semanticNavItem(
          `Principle Network: ${network.corePrinciple || "principle"}`,
          semanticSectionForNav("principleNetwork"),
          network.corePrinciple || "principle network",
          semanticCardKey("principleNetwork", network, network.corePrinciple || network.id)
        )));
    }
    if (mode !== "characterInteraction") {
      scopedSemanticRecords(studyData.characterInteractions)
        .filter((interaction) => semanticVerseOverlap(interaction, item) || semanticEntityOverlap(interaction, item))
        .forEach((interaction) => links.push(semanticNavItem(
          `Character Interaction: ${interaction.sourceCharacter || "source"} -> ${interaction.targetCharacter || "target"} | ${interaction.interactionType || "interaction"}`,
          semanticSectionForNav("characterInteraction"),
          interaction.sourceCharacter || interaction.targetCharacter || interaction.interactionType || "",
          semanticCardKey("characterInteraction", interaction, `${interaction.sourceCharacter || ""}-${interaction.targetCharacter || ""}-${interaction.interactionType || ""}`)
        )));
    }
    if (mode !== "knowledgeGraph") {
      knowledgeGraphRecords()
        .filter((graph) => semanticEntityOverlap(graph, item) || matchesSearchQuery(knowledgeGraphSearchText(graph), semanticRecordEntityNames(item).join(" ")))
        .forEach((graph) => links.push(semanticNavItem(
          `Knowledge Graph: ${graph.node || "node"} | ${graph.type || "Semantic Node"}`,
          semanticSectionForNav("knowledgeGraph"),
          graph.node || graph.type || "knowledge graph",
          semanticCardKey("knowledgeGraph", graph, graph.node || graph.id)
        )));
    }

    if (mode !== "sessionContinuityReview") {
      sessionContinuityReviewRecords()
        .filter((review) => semanticEntityOverlap(review, item) || matchesSearchQuery(sessionContinuityReviewSearchText(review), semanticRecordEntityNames(item).join(" ")))
        .forEach((review) => links.push(semanticNavItem(
          `Session Continuity Review: ${review.sessionRange || "current session"}`,
          semanticSectionForNav("sessionContinuityReview"),
          review.sessionRange || "session continuity",
          semanticCardKey("sessionContinuityReview", review, review.sessionRange || review.id)
        )));
    }

    if (mode !== "timeline") {
      timelineEntries
        .filter((entry) => semanticNarrativeMatchesRecord(entry, item))
        .forEach((entry) => links.push(semanticNavItem(
          `Narrative Timeline: Moment ${entry.timelinePosition} | ${narrativeMomentDisplayTitle(entry)}`,
          semanticSectionForNav("timeline"),
          semanticVerseSearchTerm({ scopes: entry.scopes, semanticEvents: entry.semanticEvents }) || narrativeMomentDisplayTitle(entry),
          semanticCardKey("timeline", entry, entry.timelinePosition)
        )));
    }

    if (mode === "reference") {
      asArray(studyData.referenceGraph)
        .filter((edge) => edge.sourceDiscoveryId && edge.sourceDiscoveryId === item.sourceDiscoveryId)
        .forEach((edge) => links.push(semanticNavItem(
          `Reference Graph: ${edge.relationshipType || "reference edge"} | ${trimText(edge.toText || edge.toHref || edge.id, 80)} | sourceDiscoveryId: ${edge.sourceDiscoveryId || "not recorded"} | edge: ${edge.id || "not recorded"}`,
          semanticSectionForNav("referenceGraph"),
          edge.toText || edge.toHref || edge.relationshipType || "",
          ""
        )));
    }

    semanticScopeLabels(item).forEach((scope) => links.push(semanticNavItem(`Verse Scope: ${scope}`, semanticSectionForNav("verse"), scope)));
    passageFunctionOrderedEntities(semanticRecognizedEntityNames(item)).map((entry) => entry.display).forEach((entity) => links.push(semanticNavItem(`Entity Scope: ${entity}`, semanticSectionForNav("entity"), entity)));

    return semanticUniqueNavItems(links, 10);
  }

  function createPassageFunctionCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.passageFunction, item.relatedEntities, item.linkedThemes, item.evidence, item.sourceGrounding]);
    const shownEvidence = evidence.slice(0, 3).map((value) => passageEvidenceDisplayLine(value, item, divineContext));
    const fullEvidence = evidence.map((value) => passageEvidenceDisplayLine(value, item, divineContext));
    const themes = asArray(item.linkedThemes).map((value) => normalizeText(value)).filter(Boolean);
    const entities = revelationPatternRelatedEntities(item);
    const prophecies = asArray(item.relatedProphecies).map((value) => normalizeText(value)).filter(Boolean);
    const grounding = trimText(item.sourceGrounding || "", 190);

    card.className = "study-card semantic-card passage-function-card";
    assignSemanticCardTarget(card, "passage", item, item.passageFunction);
    header.className = "semantic-card-header";
    heading.textContent = passageFunctionTitle(item.passageFunction);
    range.className = "semantic-card-range";
    range.textContent = item.verseRange || item.scopePath || "Current scope";
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Meaning", item.plainMeaning || "", { divineContext, preferHolySpirit: true }),
            createClassTransferDisplaySection(item),
createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "passage", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createSemanticResolutionTraceSection(item, "passage"),
      createPassageFunctionSection("Key Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      createPassageFunctionSection("Fulfillment Meaning", item.fulfillmentMeaning || "", { collapsed: true, divineContext, preferHolySpirit: true }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Themes", "", { collapsed: true, list: themes }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "passage"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.passageFunction, item.verseRange, item.plainMeaning, item.fulfillmentMeaning]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("NAME / Title Distinction", christIdentityDisplayNote(entities), { collapsed: true, divineContext }),
      createPassageFunctionSection("Related Prophecies", "", { collapsed: true, list: prophecies, plainList: true }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }


  function revelationPatternSearchText(item = {}) {
    return [
      item.revelationType,
      item.verseRange,
      item.scopePath,
      item.speaker,
      item.authoritySource,
      item.recipient,
      asArray(item.subEvents).map((subEvent) => [
        subEvent.clusterType,
        subEvent.eventType,
        subEvent.action,
        subEvent.target,
        subEvent.anchorText
      ].join(" ")).join(" "),
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedPassageFunctions).join(" "),
      asArray(item.evidence).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function revelationPatternTitle(value) {
    return passageFunctionTitle(value || "revelation_pattern");
  }
  function revelationPatternTypeLabel(value) {
    const normalized = normalizeText(value || "").toLowerCase();
    if (normalized === "divine_message_revelation_pattern") return "Divine instruction / revelation cluster";
    return passageFunctionTitle(value || "revelation_pattern");
  }

  function revelationPartTitle(value) {
    const title = passageFunctionTitle(value || "revelation_part");
    return /\bName\b/.test(title) ? title.replace(/\bName\b/g, "NAME") : title;
  }

  function revelationPartDerivedMeaning(part = {}) {
    const type = normalizeText(part.clusterType || part.eventType).toLowerCase();
    const text = normalizeText(part.anchorText || part.action || "").toLowerCase();

    if (type === "marriage_instruction" || /take unto thee mary thy wife/.test(text)) {
      return "Divine/HOLY instruction: Joseph is instructed to take Mary as wife";
    }
    if (type === "conception_revelation" || /conceived.*holy ghost|conceived.*holy spirit/.test(text)) {
      return "HOLY CONCEPTION: Conceived Of THE HOLY SPIRIT";
    }
    if (type === "revealed_name_instruction" || /call.*name.*jesus/.test(text)) {
      return "call HIS NAME JESUS";
    }
    if (type === "mission_declaration" || /save.*people.*sins/.test(text)) {
      return "HE shall SAVE HIS People from their sins";
    }

    return part.action || part.anchorText || "Derived meaning not recorded.";
  }

  function createRevelationPartList(subEvents, limit = 8) {
    const values = asArray(subEvents).slice(0, limit);
    if (values.length === 0) return null;

    const list = document.createElement("ol");
    list.className = "semantic-ordered-parts";

    for (const part of values) {
      const item = document.createElement("li");
      const title = document.createElement("strong");
      const sourceLabel = document.createElement("span");
      const sourcePhrase = document.createElement("span");
      const derivedLabel = document.createElement("span");
      const derivedMeaning = document.createElement("span");
      const derivedContext = hasDivineDisplayContext([part.actor, part.target, part.eventType, part.clusterType, part.anchorText]);

      title.textContent = revelationPartTitle(part.clusterType || part.eventType);
      sourceLabel.textContent = "Source phrase:";
      sourcePhrase.textContent = part.anchorText ? `"${renderIceBeingDisplayText(part.anchorText, { sourceQuote: true })}"` : "No source phrase stored.";
      derivedLabel.textContent = "Derived meaning:";
      derivedMeaning.textContent = renderIceBeingDisplayText(revelationPartDerivedMeaning(part), {
        divineContext: derivedContext,
        humanContext: hasHumanBeingDisplayContext([part.actor, part.target, part.action, part.eventType, part.clusterType, part.anchorText]),
        preferHolySpirit: true
      });

      item.append(title, sourceLabel, sourcePhrase, derivedLabel, derivedMeaning);
      list.appendChild(item);
    }

    return list;
  }
  function createRevelationPartsSection(subEvents) {
    const list = createRevelationPartList(subEvents);
    if (!list) return null;
    const section = document.createElement("section");
    const heading = document.createElement("h4");
    heading.textContent = "Ordered Revelation Parts";
    section.className = "semantic-section";
    heading.className = "semantic-section-title";
    section.append(heading, list);
    return section;
  }

  function revelationPatternRelatedEntities(item = {}) {
    const allowed = new Set(["the lord", "angel of the lord", "joseph", "mary", "holy ghost", "holy spirit", "jesus", "jesus christ"]);
    const entities = asArray(item.relatedEntities).filter((name) => {
      const normalized = normalizedEntityName(name);
      return allowed.has(normalized) || Boolean(passageFunctionEntityRecord(name));
    });
    const hasJesus = entities.some((name) => normalizedEntityName(name) === "jesus");
    const hasJesusChrist = entities.some((name) => normalizedEntityName(name) === "jesus christ");
    if (hasJesus && !hasJesusChrist && passageFunctionEntityRecord("JESUS CHRIST")) {
      entities.push("JESUS CHRIST");
    }
    return passageFunctionOrderedEntities(entities).map((entry) => entry.display);
  }

  function createRevelationPatternCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.authoritySource, item.speaker, item.relatedEntities, item.revelationType, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = revelationPatternRelatedEntities(item);
    const grounding = trimText(item.sourceGrounding || "", 190);
    const partList = createRevelationPartList(item.subEvents);

    card.className = "study-card semantic-card revelation-pattern-card";
    assignSemanticCardTarget(card, "revelation", item, item.revelationType);
    header.className = "semantic-card-header";
    heading.textContent = "Revelation Pattern";
    range.className = "semantic-card-range";
    range.textContent = item.verseRange || item.scopePath || "Current scope";
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Authority Source", item.authoritySource || "unknown", { divineContext }),
      createPassageFunctionSection("Speaker", item.speaker || "unknown", { divineContext }),
      createPassageFunctionSection("Recipient", item.recipient || "unknown"),
      createPassageFunctionSection("Pattern Type", revelationPatternTypeLabel(item.revelationType)),
            createClassTransferDisplaySection(item),
createRevelationPartsSection(item.subEvents)
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    [
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createSemanticResolutionTraceSection(item, "revelation"),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "revelation", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "revelation"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.revelationType, item.verseRange, asArray(item.subEvents).map((part) => [part.clusterType, part.eventType, part.action, part.target, part.anchorText])]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("NAME / Title Distinction", christIdentityDisplayNote(entities), { collapsed: true, divineContext }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function revelationPatternSubEventList(subEvents, limit = 8) {
    const values = asArray(subEvents).map((item, index) => {
      const label = item.clusterType || item.eventType || "sub_event";
      const target = item.target ? ` -> ${item.target}` : "";
      const evidence = item.anchorText ? ` (${trimText(item.anchorText, 90)})` : "";
      return `${index + 1}. ${label}: ${item.action || "event"}${target}${evidence}`;
    });
    if (values.length === 0) return "";
    const shown = values.slice(0, limit);
    if (values.length > limit) shown.push(`${values.length - limit} more sub-event(s) hidden by preview limit.`);
    return shown.join("\n");
  }

  function renderRevelationPatterns(term) {
    const container = document.getElementById("revelationPatternCards");
    const count = document.getElementById("revelationPatternCount");
    const patterns = asArray(studyData.revelationPatterns);
    const filtered = patterns.filter((item) => matchesSearchQuery(revelationPatternSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} pattern(s)`;

    if (patterns.length === 0) {
      appendEmpty(container, "No revelation patterns derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No revelation patterns match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Revelation Patterns",
      [
        `Derived records: ${patterns.length}`,
        `Layer: ICE_REVELATION_PATTERNS`,
        "Purpose: structure speech/revelation blocks that contain multiple semantic parts.",
        "Review posture: inspect authority, speaker, recipient, ordered sub-events, evidence, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createRevelationPatternCard(item));
    });
  }
  function renderPassageFunctions(term) {
    const container = document.getElementById("passageFunctionCards");
    const count = document.getElementById("passageFunctionCount");
    const functions = asArray(studyData.passageFunctions);
    const filtered = functions.filter((item) => matchesSearchQuery(passageFunctionSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} function(s)`;

    if (functions.length === 0) {
      appendEmpty(container, "No passage functions derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No passage functions match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Passage Functions",
      [
        `Derived records: ${functions.length}`,
        `Layer: ICE_PASSAGE_FUNCTIONS`,
        "Purpose: why a passage or section exists, grounded in current semantic data.",
        "Review posture: inspect meaning, evidence, accuracy, and source grounding together."
      ].join("\n"),
      "derived semantic layer"
    ));
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createPassageFunctionCard(item));
    });
  }

  function referenceRoleSearchText(item = {}) {
    return [
      item.discoveredReference,
      item.referenceRole,
      referenceRoleResolutionDetails(item).join(" "),
      referenceRoleDisplayTitle(item),
      referenceRolePlainExplanation(item),
      referenceRoleWhyItMatters(item),      item.verseRange,
      item.scopePath,
      item.sourceDiscoveryId,
      asArray(item.linkedThemes).join(" "),
      asArray(item.linkedEntities).join(" "),
      asArray(item.linkedPassageFunctions).join(" "),
      asArray(item.evidence).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function referenceRoleRelatedEntities(item = {}) {
    return passageFunctionOrderedEntities(item.linkedEntities).map((entry) => entry.display);
  }

  function referenceRoleResolvedJesusTitle(item = {}) {
    const source = normalizeText(item.discoveredReference || "");
    const match = source.match(/^JESUS CHRIST\s*,\s*(.+)$/i);
    if (!match) return null;

    const rawRole = match[1].trim();
    const normalizedRole = rawRole.replace(/\s+/g, " ");
    const roleDisplay = normalizedRole
      .replace(/^mission of$/i, "Mission")
      .replace(/^atonement through$/i, "Atonement")
      .replace(/^birth of$/i, "Birth")
      .replace(/^prophecies about$/i, "Prophecies")
      .replace(/^davidic descent of$/i, "Davidic Descent");

    return {
      sourceReference: source,
      resolvedBeing: "JESUS",
      canonicalIdentity: "JESUS CHRIST",
      referenceRole: roleDisplay || normalizedRole,
      resolvedLabel: `JESUS - ${roleDisplay || normalizedRole}`
    };
  }

  function referenceRoleResolutionDetails(item = {}) {
    const resolution = referenceRoleResolvedJesusTitle(item);
    if (!resolution) return [];
    return [
      `Source: ${resolution.sourceReference}`,
      `Resolved: ${resolution.resolvedLabel}`,
      `Canonical: ${resolution.canonicalIdentity}`
    ];
  }

  function referenceRoleDisplayTitle(item = {}) {
    return referenceRoleResolvedJesusTitle(item)?.referenceRole || referenceRoleSourceTitle(item) || passageFunctionTitle(item.referenceRole || "reference_role");
  }
  function referenceRolePlainExplanation(item = {}) {
    const role = item.referenceRole || "";
    const sourceTitle = referenceRoleSourceTitle(item).toLowerCase();
    if (sourceTitle === "savior") return "This reference connects JESUS to His saving mission.";
    if (sourceTitle === "redeemer") return "This reference connects JESUS to His redeeming mission.";
    const purposes = {
      davidic_lineage_support: "This reference helps show JESUS is connected to David's lineage.",
      abrahamic_covenant_support: "This reference helps show JESUS is connected to Abraham's covenant line.",
      name_meaning_support: "This reference helps explain the meaning/significance of the NAME JESUS.",
      prophecy_fulfillment_support: "This reference helps connect the passage to fulfillment of prophecy.",
      messianic_identity_support: "This reference helps connect JESUS to messianic titles, mission, and identity."
    };
    return purposes[role] || "This reference helps explain why the source note is connected to this passage.";
  }

  function referenceRoleWhyItMatters(item = {}) {
    const role = item.referenceRole || "";
    const sourceTitle = referenceRoleSourceTitle(item).toLowerCase();
    if (sourceTitle === "savior" || sourceTitle === "redeemer") return "This helps explain that the CHILD named JESUS is connected to His role as Savior/Redeemer.";
    const purposes = {
      davidic_lineage_support: "This helps readers see the lineage connection to David without losing the focus on JESUS.",
      abrahamic_covenant_support: "This helps readers see the covenant-line connection to Abraham without collapsing it into a generic ancestry note.",
      name_meaning_support: "This helps explain why the revealed NAME JESUS is tied to His mission to save His people.",
      prophecy_fulfillment_support: "This helps readers connect the passage's events to prophecy fulfillment.",
      messianic_identity_support: "This helps explain how source titles and mission language point to JESUS while preserving JESUS CHRIST as canonical/source identity."
    };
    return purposes[role] || "This helps show why the source reference belongs with this semantic role.";
  }

  function referenceRolePrimaryReferencedBeing(item = {}) {
    if (item.primaryReferencedBeing) return item.primaryReferencedBeing;
    const resolution = referenceRoleResolvedJesusTitle(item);
    if (resolution?.resolvedBeing) return resolution.resolvedBeing;
    const entities = asArray(item.linkedEntities).map((value) => normalizedEntityName(value));
    if (entities.includes("jesus") || entities.includes("jesus christ") || /\bjesus christ\b/i.test(item.discoveredReference || "")) return "JESUS";
    return "Not recorded.";
  }

  function referenceRoleCanonicalIdentity(item = {}) {
    if (item.canonicalIdentity) return item.canonicalIdentity;
    const resolution = referenceRoleResolvedJesusTitle(item);
    if (resolution?.canonicalIdentity) return resolution.canonicalIdentity;
    const entities = asArray(item.linkedEntities).map((value) => normalizedEntityName(value));
    if (entities.includes("jesus christ") || /\bjesus christ\b/i.test(item.discoveredReference || "")) return "JESUS CHRIST";
    return "Not recorded.";
  }

  function referenceRoleRelatedCharacters(item = {}) {
    const explicitCharacters = asArray(item.relatedCharacters).map((value) => normalizeText(value)).filter(Boolean);
    if (explicitCharacters.length > 0) return explicitCharacters;
    const roleText = normalizeText([item.discoveredReference, item.referenceRole, item.verseRange, item.sourceGrounding].join(" ")).toLowerCase();
    if (/baptism/.test(roleText) && /jesus christ/.test(roleText)) return ["John", "Pharisees", "Sadducees", "multitude / people"];
    return [];
  }
  function referenceRoleSemanticPurpose(item = {}) {
    return referenceRolePlainExplanation(item);
  }
  function referenceRoleReferenceDetails(item = {}) {
    return [
      item.discoveredReference || "reference",
      referenceRoleSourceTitle(item) ? `Source title: ${referenceRoleSourceTitle(item)}` : "",
      item.verseRange ? `Verse range: ${item.verseRange}` : "",
      item.referenceHref ? `Href: ${item.referenceHref}` : ""
    ].filter(Boolean);
  }

  function referenceRoleResolvedDetails(item = {}) {
    const primary = referenceRolePrimaryReferencedBeing(item);
    const canonical = referenceRoleCanonicalIdentity(item);
    const role = referenceRoleResolvedJesusTitle(item)?.referenceRole || referenceRoleSourceTitle(item) || referenceRoleDisplayTitle(item);
    const related = referenceRoleRelatedCharacters(item);
    return [
      primary && primary !== "Not recorded." ? `Primary Referenced Being: ${primary}` : "",
      canonical && canonical !== "Not recorded." ? `Canonical/source identity: ${canonical}` : "",
      related.length ? `Related Characters: ${related.join(", ")}` : "",
      role ? `Reference role: ${role}` : ""
    ].filter(Boolean);
  }
  function referenceRoleSourceTitle(item = {}) {
    const reference = normalizeText(item.discoveredReference || "");
    const commaParts = reference.split(",").map((part) => normalizeText(part)).filter(Boolean);
    if (commaParts.length > 1) return commaParts.slice(1).join(", ");
    return "";
  }

  function referenceRoleSourceDiscoveryRecord(item = {}) {
    const sourceDiscoveryId = normalizeText(item.sourceDiscoveryId || "");
    if (!sourceDiscoveryId) return null;
    return asArray(studyData.sourceDiscoveryIndex).find((source) => normalizeText(source.id || "") === sourceDiscoveryId) || null;
  }

  function referenceRoleReferenceGraphEdge(item = {}) {
    const sourceDiscoveryId = normalizeText(item.sourceDiscoveryId || "");
    if (!sourceDiscoveryId) return null;
    return asArray(studyData.referenceGraph).find((edge) => normalizeText(edge.sourceDiscoveryId || "") === sourceDiscoveryId) || null;
  }

  function referenceRoleAdapterLabel(item = {}, source = null, edge = null) {
    const active = studyData.activeAdapter || {};
    return active.adapterName || item.adapterName || source?.adapterName || edge?.adapterName || active.adapterId || item.adapterId || source?.adapterId || edge?.adapterId || "unknown";
  }

  function referenceRoleProvenanceLines(item = {}) {
    const source = referenceRoleSourceDiscoveryRecord(item);
    const edge = referenceRoleReferenceGraphEdge(item);
    const sourceLabel = item.discoveredReference || source?.linkText || edge?.toText || "Not recorded.";
    const href = item.referenceHref || source?.href || edge?.toHref || "";
    const scopePath = item.scopePath || source?.scopePath || edge?.fromScopePath || "";
    const verseRef = source?.verseRef || item.verseRange || "";
    return [
      "Provenance: Source Discovery -> Reference Graph -> ICE_REFERENCE_ROLES",
      item.sourceDiscoveryId ? `sourceDiscoveryId: ${item.sourceDiscoveryId}` : "sourceDiscoveryId: Not recorded.",
      edge?.id ? `referenceGraph edge id: ${edge.id}` : "referenceGraph edge id: Not recorded.",
      href ? `href: ${href}` : "href: Not recorded.",
      `source label text: ${sourceLabel}`,
      scopePath ? `scopePath: ${scopePath}` : "scopePath: Not recorded.",
      verseRef ? `verseRef: ${verseRef}` : "verseRef: Not recorded.",
      `adapter: ${referenceRoleAdapterLabel(item, source, edge)}`,
      displayAppConfidence(item.confidence || source?.confidence || edge?.confidence || "probable")
    ];
  }

  function referenceRoleProvenanceSummary(item = {}) {
    const sourceTitle = referenceRoleSourceTitle(item);
    const resolution = referenceRoleResolvedJesusTitle(item);
    const source = referenceRoleSourceDiscoveryRecord(item);
    const edge = referenceRoleReferenceGraphEdge(item);
    const label = item.discoveredReference || source?.linkText || edge?.toText || item.sourceDiscoveryId || "source reference";
    const pieces = [
      sourceTitle ? `Reference role: ${sourceTitle}` : `Reference role: ${passageFunctionTitle(item.referenceRole || "reference_role")}`,
      resolution?.resolvedLabel ? `Resolved: ${resolution.resolvedLabel}` : "",
      `Source reference: ${label}`,
      "Provenance: Source Discovery -> Reference Graph -> ICE_REFERENCE_ROLES"
    ].filter(Boolean);
    if (item.sourceDiscoveryId) pieces.push(`sourceDiscoveryId: ${item.sourceDiscoveryId}`);
    if (edge?.id) pieces.push(`referenceGraph edge: ${edge.id}`);
    return pieces.join(" | ");
  }
  function createReferenceRoleCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const themes = asArray(item.linkedThemes).map((value) => normalizeText(value)).filter(Boolean);
    const entities = referenceRoleRelatedEntities(item);
    const functions = asArray(item.linkedPassageFunctions).map((value) => passageFunctionTitle(value)).filter(Boolean);
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.discoveredReference, item.referenceRole, item.linkedEntities, item.linkedThemes, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const grounding = trimText(item.sourceGrounding || "", 190);
    const resolvedDetails = referenceRoleResolvedDetails(item);

    card.className = "study-card semantic-card reference-role-card";
    assignSemanticCardTarget(card, "reference", item, item.referenceRole);
    header.className = "semantic-card-header";
    heading.textContent = "Reference Role";
    range.className = "semantic-card-range";
    range.textContent = referenceRoleDisplayTitle(item);
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createWordingProvenanceSection({ source: referenceRoleSourceProvenanceLabel(item), label: referenceRoleDisplayTitle(item), layer: "Reference Roles", storageKey: "ICE_REFERENCE_ROLES", scopePath: item.scopePath || item.sourceDiscoveryId, generated: false, rule: "The source reference wording comes from Source Discovery/Reference Graph; I.C.E. adds the role explanation and resolved being display without treating it as scripture text." }),
      createEvidenceWeightSection({ evidenceType: "Supporting Source Evidence", evidenceStrength: "supports semantic role through source/reference context", sourceGrounding: item.sourceGrounding || item.discoveredReference, supportingRecords: [...asArray(item.evidence), item.sourceDiscoveryId, item.referenceHref], sourcePhrase: item.discoveredReference }),
      createPassageFunctionSection("Reference Role", referenceRoleDisplayTitle(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("What This Reference Helps Explain", referenceRolePlainExplanation(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Reference", item.discoveredReference || "Not recorded.", { preserveExact: true }),
      createPassageFunctionSection("Primary Referenced Being", referenceRolePrimaryReferencedBeing(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Characters", "", { list: referenceRoleRelatedCharacters(item), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical/source identity", referenceRoleCanonicalIdentity(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why It Matters", referenceRoleWhyItMatters(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createSemanticResolutionTraceSection(item, "reference"),
      createPassageFunctionSection("Technical Provenance", "", { collapsed: true, summaryLabel: "Show technical provenance", list: referenceRoleProvenanceLines(item), plainList: true, preserveExact: true }),
      createPassageFunctionSection("Evidence", "", { collapsed: true, summaryLabel: "Show evidence", list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "reference"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Linked Themes", "", { collapsed: true, list: themes }),
      createPassageFunctionSection("Linked Passage Functions", "", { collapsed: true, list: functions, plainList: true }),
      createPassageFunctionSection("Linked Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.linkedEntities, [item.referenceRole, item.verseRange, item.discoveredReference, item.sourceGrounding]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("NAME / Title Distinction", christIdentityDisplayNote(entities), { collapsed: true, divineContext }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderReferenceRoles(term) {
    const container = document.getElementById("referenceRoleCards");
    const count = document.getElementById("referenceRoleCount");
    const roles = asArray(studyData.referenceRoles);
    const filtered = roles.filter((item) => matchesSearchQuery(referenceRoleSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} role(s)`;

    if (roles.length === 0) {
      appendEmpty(container, "No semantic reference roles derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No reference roles match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Reference Roles",
      [
        `Derived records: ${roles.length}`,
        `Layer: ICE_REFERENCE_ROLES`,
        "Purpose: explain why discovered references are attached to this passage or note.",
        "Review posture: inspect discovered reference, semantic role, linked themes/entities, evidence, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createReferenceRoleCard(item));
    });
  }
  function semanticDistinctionSearchText(item = {}) {
    return [
      item.semanticItem,
      item.distinctionType,
      item.narrativeRole,
      item.canonicalRole,
      item.sourceWording,
      item.derivedWording,
      item.verseRange,
      item.scopePath,
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedLayers).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function createSemanticDistinctionCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const divineContext = hasDivineDisplayContext([item.semanticItem, item.narrativeRole, item.canonicalRole, item.sourceWording, item.derivedWording, item.relatedEntities]);
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);
    const layers = asArray(item.relatedLayers).map((value) => normalizeText(value)).filter(Boolean);
    const grounding = trimText(item.sourceGrounding || "", 190);

    card.className = "study-card semantic-card semantic-distinction-card";
    assignSemanticCardTarget(card, "distinction", item, item.semanticItem || item.distinctionType);
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(item.semanticItem || "Semantic Distinction", divineContext);
    range.className = "semantic-card-range";
    range.textContent = [passageFunctionTitle(item.distinctionType || "semantic_distinction"), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Distinction Type", passageFunctionTitle(item.distinctionType || "semantic_distinction"), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Narrative Role", item.narrativeRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical Role", item.canonicalRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source phrase", item.sourceWording || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived meaning", item.derivedWording || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.semanticItem, item.distinctionType, item.narrativeRole, item.canonicalRole, item.derivedWording]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Layers", "", { collapsed: true, list: layers, plainList: true }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderSemanticDistinctions(term) {
    const container = document.getElementById("semanticDistinctionCards");
    const count = document.getElementById("semanticDistinctionCount");
    const distinctions = asArray(studyData.semanticDistinctions);
    const filtered = distinctions.filter((item) => matchesSearchQuery(semanticDistinctionSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} distinction(s)`;

    if (distinctions.length === 0) {
      appendEmpty(container, "No semantic distinctions derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No semantic distinctions match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Semantic Distinctions",
      [
        `Derived records: ${distinctions.length}`,
        `Layer: ICE_SEMANTIC_DISTINCTIONS`,
        "Purpose: prevent different concepts such as name, title, role, source phrase, and canonical identity from collapsing into one bucket.",
        "Review posture: inspect item, distinction type, narrative role, canonical role, source wording, derived wording, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createSemanticDistinctionCard(item));
    });
  }
  function ontologyRoleSearchText(item = {}) {
    return [
      item.semanticItem,
      asArray(item.ontologyRoles).join(" "),
      item.authorityOriginClass,
      item.narrativeRole,
      item.canonicalRole,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedLayers).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function createOntologyRoleCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const roles = asArray(item.ontologyRoles).map((value) => passageFunctionTitle(value)).filter(Boolean);
    const layers = asArray(item.relatedLayers).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.semanticItem, item.authorityOriginClass, item.narrativeRole, item.canonicalRole, item.derivedMeaning, item.relatedEntities]);
    const grounding = trimText(item.sourceGrounding || "", 190);

    card.className = "study-card semantic-card ontology-role-card";
    assignSemanticCardTarget(card, "ontology", item, item.semanticItem || asArray(item.ontologyRoles).join(" "));
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(item.semanticItem || "Semantic Ontology Role", divineContext);
    range.className = "semantic-card-range";
    range.textContent = [roles.slice(0, 2).join(" / ") || "Ontology role", item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Ontology Roles", "", { list: roles, plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority / Origin Class", item.authorityOriginClass || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Narrative Role", item.narrativeRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical Role", item.canonicalRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createSemanticResolutionTraceSection(item, "ontology"),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.semanticItem, item.narrativeRole, item.canonicalRole, item.derivedMeaning]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Layers", "", { collapsed: true, list: layers, plainList: true }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderOntologyRoles(term) {
    const container = document.getElementById("ontologyRoleCards");
    const count = document.getElementById("ontologyRoleCount");
    const roles = asArray(studyData.ontologyRoles);
    const filtered = roles.filter((item) => matchesSearchQuery(ontologyRoleSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} role(s)`;

    if (roles.length === 0) {
      appendEmpty(container, "No semantic ontology roles derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No semantic ontology roles match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Semantic Ontology Roles",
      [
        `Derived records: ${roles.length}`,
        `Layer: ICE_ONTOLOGY_ROLES`,
        "Purpose: distinguish NAME, title, office, role, authority, messenger, narrator, Human response, covenant role, mission role, fulfillment role, lineage role, and semantic origin role.",
        "Review posture: inspect semantic item, ontology roles, authority/origin class, narrative role, canonical role, source phrase, derived meaning, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createOntologyRoleCard(item));
    });
  }
  function entityRelationRoleSearchText(item = {}) {
    return [
      item.sourceEntity,
      item.targetEntity,
      item.semanticRole,
      item.ontologyClassPath,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedSemanticEvents).join(" "),
      asArray(item.relatedRevelationPatterns).join(" "),
      asArray(item.relatedPassageFunctions).join(" "),
      asArray(item.relatedOntologyRoles).join(" "),
      asArray(item.evidence).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function entityRelationRoleTitle(value) {
    const normalized = normalizeText(value || "semantic_relation_role").toLowerCase();
    const labels = new Map([
      ["source_authority_to_messenger", "source authority -> messenger"],
      ["revelation_messenger_to_recipient", "revelation messenger -> recipient"],
      ["obedient_response_to_revealed_name", "obedient response -> revealed NAME"],
      ["covenant_steward_to_covenant_participant", "covenant steward -> covenant participant"],
      ["divine_conception_origin_to_conception_recipient", "divine conception origin -> conception recipient"],
      ["mission_subject_to_saved_people", "mission subject -> saved people"],
      ["narrative_witness_to_divine_source", "narrative witness -> Divine source"],
      ["prophecy_witness_to_divine_source", "prophecy witness -> Divine source"]
    ]);

    return labels.get(normalized) || passageFunctionTitle(value || "semantic_relation_role");
  }

  function entityRelationRolePath(item = {}) {
    const source = renderDerivedSemanticDisplayText(item.sourceEntity || "source entity", hasDivineDisplayContext([item.sourceEntity, item.derivedMeaning]));
    const target = renderDerivedSemanticDisplayText(item.targetEntity || "target entity", hasDivineDisplayContext([item.targetEntity, item.derivedMeaning]));
    return `${source} -> ${target}`;
  }

  function createEntityRelationRoleCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const shownEvidence = evidence.slice(0, 3);
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), {
      divineContext: hasDivineDisplayContext([item.sourceEntity, item.targetEntity, item.derivedMeaning, value]),
      context: item
    }));
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);
    const divineContext = hasDivineDisplayContext([item.sourceEntity, item.targetEntity, item.semanticRole, item.sourcePhrase, item.derivedMeaning, item.relatedEntities]);
    const grounding = trimText(item.sourceGrounding || "", 190);

    card.className = "study-card semantic-card entity-relation-role-card";
    assignSemanticCardTarget(card, "relationRole", item, `${item.sourceEntity || ""}-${item.targetEntity || ""}-${item.semanticRole || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = "Semantic Relationship Role";
    range.className = "semantic-card-range";
    range.textContent = [entityRelationRoleTitle(item.semanticRole), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Relationship", entityRelationRolePath(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Role", entityRelationRoleTitle(item.semanticRole), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Ontology Class Path", item.ontologyClassPath || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item })), hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "relationRole", 8), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "relationRole"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.semanticRole, item.sourcePhrase, item.derivedMeaning]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderEntityRelationRoles(term) {
    const container = document.getElementById("entityRelationRoleCards");
    const count = document.getElementById("entityRelationRoleCount");
    const roles = asArray(studyData.entityRelationRoles);
    const filtered = roles.filter((item) => matchesSearchQuery(entityRelationRoleSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} relation role(s)`;

    if (roles.length === 0) {
      appendEmpty(container, "No semantic relationship roles derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No semantic relationship roles match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Semantic Relationship Roles",
      [
        `Derived records: ${roles.length}`,
        `Layer: ICE_ENTITY_RELATION_ROLES`,
        "Purpose: explain what kind of semantic role one entity has in relation to another.",
        "Review posture: inspect source/target entity, role, ontology class path, source phrase, derived meaning, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createEntityRelationRoleCard(item));
    });
  }
  function movementSemanticSearchText(item = {}) {
    return [
      item.movementType,
      item.originLocation,
      item.destinationLocation,
      item.movementPurpose,
      item.authorityPath,
      item.revelationInvolvement,
      item.adversarialInvolvement,
      item.fulfillmentLink,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.evidence).join(" "),
      asArray(item.relatedEntities).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function movementSemanticTypeLabel(type) {
    const normalized = normalizeText(type || "movement_location_semantic").toLowerCase();
    const labels = new Map([
      ["prophecy_location_identification", "prophecy location identification"],
      ["witness_travel_toward_child", "witness travel toward the CHILD"],
      ["protective_escape_preservation", "protective escape / preservation"],
      ["return_after_hostile_threat_removed", "return after hostile threat removed"],
      ["protective_redirection_settlement_fulfillment", "protective redirection / settlement fulfillment"]
    ]);
    return labels.get(normalized) || passageFunctionTitle(type || "movement_location_semantic");
  }

  function createMovementSemanticCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.movementPurpose, item.authorityPath, item.revelationInvolvement, item.derivedMeaning, item.relatedEntities, item.evidence]);
    const title = [item.originLocation, item.destinationLocation].filter(Boolean).join(" -> ") || "Movement / Location Semantic";
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);

    card.className = "study-card semantic-card movement-semantic-card";
    assignSemanticCardTarget(card, "movement", item, `${item.originLocation || ""}-${item.destinationLocation || ""}-${item.movementType || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(title, divineContext);
    range.className = "semantic-card-range";
    range.textContent = [movementSemanticTypeLabel(item.movementType), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Origin Location", item.originLocation || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Destination", item.destinationLocation || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Movement Purpose", item.movementPurpose || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Path", item.authorityPath || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Revelation Involvement", item.revelationInvolvement || "Not recorded.", { divineContext, preferHolySpirit: true }),
      item.adversarialInvolvement ? createPassageFunctionSection("Adversarial Involvement", item.adversarialInvolvement, { divineContext, preferHolySpirit: true }) : null,
      item.fulfillmentLink ? createPassageFunctionSection("Fulfillment Link", item.fulfillmentLink, { divineContext, preferHolySpirit: true }) : null,
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "movement", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "movement"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.movementPurpose, item.authorityPath, item.derivedMeaning]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("Semantic Grounding", trimText(item.sourceGrounding || "", 220) || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderMovementSemantics(term) {
    const container = document.getElementById("movementSemanticsCards");
    const count = document.getElementById("movementSemanticsCount");
    const records = scopedSemanticRecords(studyData.movementSemantics);
    const filtered = records.filter((item) => matchesSearchQuery(movementSemanticSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} movement record(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No movement / location semantics derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No movement / location semantic records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Movement / Location Semantics",
      [
        `Derived records: ${records.length}`,
        `Layer: ICE_MOVEMENT_SEMANTICS`,
        "Purpose: model source-grounded movement, location, purpose, protection, and fulfillment without adding unsupported geography.",
        "Review posture: inspect origin, destination, movement purpose, authority/revelation involvement, adversarial context, fulfillment linkage, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createMovementSemanticCard(item));
    });
  }
  function semanticCausalitySearchText(item = {}) {
    return [
      item.sequenceType,
      item.initiatingCause,
      item.authoritySource,
      item.messengerTransfer,
      item.humanResponse,
      item.consequenceResult,
      item.preservationFulfillmentOutcome,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.sequenceSteps).join(" "),
      asArray(item.evidence).join(" "),
      asArray(item.relatedEntities).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function semanticCausalityTypeLabel(type) {
    const normalized = normalizeText(type || "semantic_sequence_causality").toLowerCase();
    const labels = new Map([
      ["revelation_obedience_naming_sequence", "revelation -> obedience -> naming sequence"],
      ["hostile_threat_warning_preservation_sequence", "hostile threat -> warning -> preservation sequence"],
      ["threat_removed_guided_return_fulfillment_sequence", "threat removed -> guided return -> fulfillment sequence"]
    ]);
    return labels.get(normalized) || passageFunctionTitle(type || "semantic_sequence_causality");
  }

  function createSemanticCausalityCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.initiatingCause, item.authoritySource, item.messengerTransfer, item.humanResponse, item.consequenceResult, item.preservationFulfillmentOutcome, item.derivedMeaning, item.relatedEntities, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);
    const title = semanticCausalityTypeLabel(item.sequenceType);

    card.className = "study-card semantic-card semantic-causality-card";
    assignSemanticCardTarget(card, "causality", item, `${item.sequenceType || ""}-${item.initiatingCause || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = "Semantic Sequence / Causality";
    range.className = "semantic-card-range";
    range.textContent = [renderDerivedSemanticDisplayText(title, divineContext), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Initiating Cause", item.initiatingCause || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Source", item.authoritySource || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Messenger / Transfer", item.messengerTransfer || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Human Response", item.humanResponse || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Consequence / Result", item.consequenceResult || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Preservation / Fulfillment Outcome", item.preservationFulfillmentOutcome || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Sequence Steps", "", { list: asArray(item.sequenceSteps).map((value) => renderDerivedSemanticDisplayText(value, divineContext)), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "causality", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "causality"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.initiatingCause, item.messengerTransfer, item.humanResponse, item.consequenceResult, item.preservationFulfillmentOutcome]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("Semantic Grounding", trimText(item.sourceGrounding || "", 220) || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderSemanticCausality(term) {
    const container = document.getElementById("semanticCausalityCards");
    const count = document.getElementById("semanticCausalityCount");
    const records = scopedSemanticRecords(studyData.semanticCausality);
    const filtered = records.filter((item) => matchesSearchQuery(semanticCausalitySearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} sequence(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No semantic sequence / causality records derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No semantic sequence / causality records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Semantic Sequence / Causality",
      [
        `Derived records: ${records.length}`,
        `Layer: ICE_SEMANTIC_CAUSALITY`,
        "Purpose: model source-grounded cause, instruction, response, consequence, preservation, and fulfillment sequence without unsupported causal claims.",
        "Review posture: inspect initiating cause, authority source, transfer, Human response, result, preservation/fulfillment outcome, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createSemanticCausalityCard(item));
    });
  }

  function teachingSemanticSearchText(item = {}) {
    return [
      item.discourseType,
      item.speaker,
      item.canonicalIdentity,
      item.audience,
      item.teachingBlock,
      item.teachingTopic,
      item.principle,
      item.commandment,
      item.interpretation,
      item.blessing,
      item.warning,
      item.requirement,
      item.promise,
      item.contrast,
      item.example,
      item.application,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.evidence).join(" "),
      asArray(item.relatedEntities).join(" "),
      asArray(item.groupEntities).map((entry) => Object.values(entry || {}).join(" ")).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function teachingSemanticTypeLabel(type) {
    const normalized = normalizeText(type || "teaching_discourse").toLowerCase();
    const labels = new Map([
      ["teaching_block", "teaching block"],
      ["blessing", "blessing"],
      ["commandment_interpretation", "commandment / interpretation"],
      ["contrast", "contrast"]
    ]);
    return labels.get(normalized) || passageFunctionTitle(type || "teaching_discourse");
  }

  function teachingGroupEntityLines(item = {}) {
    return asArray(item.groupEntities).map((group) => {
      const name = group.entityName || "Group Entity";
      const type = group.entityType || "Group Entity";
      const range = group.currentGroundedClassRange || [group.highestObservedClass, group.lowestObservedClass].filter(Boolean).join(" -> ");
      const grounding = group.currentGrounding || "Grounding not recorded.";
      return `${name} | ${type} | Observed class range: ${range || "Not recorded."} | Current grounding: ${grounding}`;
    });
  }

  function createTeachingSemanticCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.speaker, item.teachingBlock, item.teachingTopic, item.principle, item.commandment, item.interpretation, item.blessing, item.promise, item.derivedMeaning, item.relatedEntities, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);
    const title = item.teachingTopic || item.blessing || item.commandment || item.teachingBlock || "Teaching / Discourse Structure";

    card.className = "study-card semantic-card teaching-semantic-card";
    assignSemanticCardTarget(card, "teaching", item, `${item.discourseType || ""}-${item.teachingTopic || item.blessing || item.commandment || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(title, divineContext);
    range.className = "semantic-card-range";
    range.textContent = [teachingSemanticTypeLabel(item.discourseType), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createWordingProvenanceSection({ source: "I.C.E. Teaching Classification", label: title, layer: "Teaching / Discourse Structure", storageKey: "ICE_TEACHING_SEMANTICS", scopePath: item.scopePath || item.verseRange, rule: "Teaching labels come from the derived teachingTopic, blessing, commandment, or teachingBlock field selected from grounded source text." }),
      createEvidenceWeightSection({ evidenceType: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence", evidenceStrength: item.sourcePhrase ? "directly grounded in displayed source phrase" : "derived from current teaching/discourse record", sourceGrounding: item.sourceGrounding || item.sourcePhrase, supportingRecords: evidence, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Speaker", item.speaker || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical/source identity", item.canonicalIdentity || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Audience", item.audience || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Block", item.teachingBlock || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Topic", item.teachingTopic || "Not recorded.", { divineContext, preferHolySpirit: true }),
      item.principle ? createPassageFunctionSection("Principle", item.principle, { divineContext, preferHolySpirit: true }) : null,
      item.commandment ? createPassageFunctionSection("Commandment", item.commandment, { divineContext, preferHolySpirit: true }) : null,
      item.interpretation ? createPassageFunctionSection("Interpretation", item.interpretation, { divineContext, preferHolySpirit: true }) : null,
      item.blessing ? createPassageFunctionSection("Blessing", item.blessing, { divineContext, preferHolySpirit: true }) : null,
      item.warning ? createPassageFunctionSection("Warning", item.warning, { divineContext, preferHolySpirit: true }) : null,
      item.requirement ? createPassageFunctionSection("Requirement", item.requirement, { divineContext, preferHolySpirit: true }) : null,
      item.promise ? createPassageFunctionSection("Promise", item.promise, { divineContext, preferHolySpirit: true }) : null,
      item.contrast ? createPassageFunctionSection("Contrast", item.contrast, { divineContext, preferHolySpirit: true }) : null,
      item.example ? createPassageFunctionSection("Example", item.example, { divineContext, preferHolySpirit: true }) : null,
      item.application ? createPassageFunctionSection("Application", item.application, { divineContext, preferHolySpirit: true }) : null,
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "teaching", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Group Entities", "", { list: teachingGroupEntityLines(item), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "teaching"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.speaker, item.audience, item.teachingTopic, item.derivedMeaning]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("Semantic Grounding", trimText(item.sourceGrounding || "", 220) || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderTeachingSemantics(term) {
    const container = document.getElementById("teachingSemanticsCards");
    const count = document.getElementById("teachingSemanticsCount");
    const records = scopedSemanticRecords(studyData.teachingSemantics);
    const filtered = records.filter((item) => matchesSearchQuery(teachingSemanticSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} discourse record(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No teaching / discourse structure records derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No teaching / discourse structure records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Teaching / Discourse Structure",
      [
        `Derived records: ${records.length}`,
        `Layer: ICE_TEACHING_SEMANTICS`,
        "Purpose: model source-grounded speaker, audience, teaching, principle, commandment, interpretation, blessing, warning, promise, and application language.",
        "Review posture: inspect speaker, audience, teaching category, source phrase, derived meaning, App accuracy, group entity range, and semantic grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createTeachingSemanticCard(item));
    });
  }

  function principleRelationshipSearchText(item = {}) {
    return [
      item.principle,
      asArray(item.relatedPrinciples).join(" "),
      item.relationshipType,
      item.teachingBlock,
      item.speaker,
      item.canonicalIdentity,
      item.audience,
      item.sourcePhrase,
      item.derivedMeaning,
      item.verseRange,
      item.scopePath,
      asArray(item.evidence).join(" "),
      asArray(item.relatedEntities).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function principleRelationshipTitle(item = {}) {
    const related = asArray(item.relatedPrinciples).slice(0, 2).join(", ");
    return [item.principle || "Principle", passageFunctionTitle(item.relationshipType || "related"), related].filter(Boolean).join(" | ");
  }

  function createPrincipleRelationshipCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.speaker, item.canonicalIdentity, item.principle, item.relatedPrinciples, item.derivedMeaning, item.relatedEntities, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));

    card.className = "study-card semantic-card principle-relationship-card";
    assignSemanticCardTarget(card, "principleRelationship", item, `${item.principle || ""}-${item.relationshipType || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(principleRelationshipTitle(item), divineContext);
    range.className = "semantic-card-range";
    range.textContent = ["principle relationship", item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createWordingProvenanceSection({ source: "I.C.E. Principle Relationship", label: principleRelationshipTitle(item), layer: "Principle Relationships", storageKey: "ICE_PRINCIPLE_RELATIONSHIPS", scopePath: item.scopePath || item.verseRange, rule: "Relationship labels are generated from the principle, relationshipType, and relatedPrinciples fields derived from grounded teaching/principle evidence." }),
      createEvidenceWeightSection({ evidenceType: "Relationship Inference", evidenceStrength: "inferred relationship supported by grounded teaching/principle evidence", sourceGrounding: item.sourceGrounding || item.sourcePhrase, supportingRecords: [...evidence, ...asArray(item.relatedTeachingSemantics), ...asArray(item.relatedPrinciples)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Principle", item.principle || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Principles", "", { list: asArray(item.relatedPrinciples), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationship Type", passageFunctionTitle(item.relationshipType || "related"), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Teaching Block", item.teachingBlock || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Speaker", item.speaker || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical/source identity", item.canonicalIdentity || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Audience", item.audience || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "teaching", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "principleRelationship"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Semantic Grounding", trimText(item.sourceGrounding || "", 220) || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderPrincipleRelationships(term) {
    const container = document.getElementById("principleRelationshipsCards");
    const count = document.getElementById("principleRelationshipsCount");
    const records = scopedSemanticRecords(studyData.principleRelationships);
    const filtered = records.filter((item) => matchesSearchQuery(principleRelationshipSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} relationship record(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No principle relationship records derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No principle relationship records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Principle Relationships",
      [
        `Derived records: ${records.length}`,
        `Layer: ICE_PRINCIPLE_RELATIONSHIPS`,
        "Purpose: connect source-grounded Matthew 5 principles through supports, expands, reinforces, illustrates, and related relationship types.",
        "Review posture: inspect principle, related principles, relationship type, source phrase, derived meaning, App accuracy, teaching block, speaker, audience, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createPrincipleRelationshipCard(item));
    });
  }
  function focusLensSearchText(item = {}) {
    return [
      item.currentFocus,
      item.focusType,
      item.relatedPrinciples,
      item.relatedCharacters,
      item.relatedTeachings,
      item.relatedInteractions,
      item.relatedEvidence,
      item.suggestedNextFocus,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.sourcePhrase,
      item.derivedMeaning,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function studyPathList(...groups) {
    return uniqueStudyList(groups.flatMap((group) => asArray(group)).map((value) => normalizeText(value)).filter(Boolean)).slice(0, 8);
  }

  function focusLensStudyTitle(item = {}) {
    const focus = normalizeText(item.currentFocus || "current focus");
    const focusType = normalizeText(item.focusType || "").toLowerCase();
    if (/character/.test(focusType) && /\bjesus\b/i.test(focus)) return `Study ${focus} as Teacher`;
    if (/character/.test(focusType)) return `Study ${focus} as Character`;
    if (/principle/.test(focusType)) return `Study ${focus} as Principle`;
    if (/teaching/.test(focusType)) return `Study ${focus} as Teaching`;
    if (/relationship/.test(focusType)) return `Study ${focus} as Relationship`;
    return `Study ${focus}`;
  }

  function focusLensWhy(item = {}) {
    return item.derivedMeaning || item.sourceGrounding || asArray(item.relatedEvidence)[0] || "This focus is derived from the current grounded study records.";
  }

  function focusLensRelatedPaths(item = {}) {
    return studyPathList(item.relatedTeachings, item.relatedPrinciples, item.relatedCharacters, item.relatedInteractions, item.suggestedNextFocus)
      .filter((value) => normalizeText(value).toLowerCase() !== normalizeText(item.currentFocus).toLowerCase());
  }

  function scopeLensStudyTitle(item = {}) {
    const focus = normalizeText(item.activeFocus || "Current focus");
    const scope = normalizeText(item.activeScope || "current scope");
    return `Study ${focus} within ${scope}`;
  }

  function scopeLensRelatedPaths(item = {}) {
    return studyPathList(item.scopeMeaning, item.relatedEvidence, item.includedPages).filter((value) => value !== item.activeScope);
  }

  function depthLensRelatedPaths(item = {}) {
    return studyPathList(item.enabledSemanticLayers, item.relatedEvidence).slice(0, 8);
  }

  function createFocusLensCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card focus-lens-card";
    assignSemanticCardTarget(card, "focusLens", item, item.currentFocus || item.id || "focus-lens");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = renderDerivedSemanticDisplayText(focusLensStudyTitle(item), hasDivineDisplayContext([item.currentFocus, item.relatedCharacters, item.relatedEvidence]));
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.focusType || "Focus", item.verseRange || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.currentFocus, item.relatedCharacters, item.relatedPrinciples, item.relatedTeachings, item.sourcePhrase, item.derivedMeaning, item.relatedEvidence]);
    header.append(heading, range);
    [
      createPassageFunctionSection("Main Conclusion", focusLensStudyTitle(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why", focusLensWhy(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Study Paths", "", { list: focusLensRelatedPaths(item), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Suggested Next Focus", item.suggestedNextFocus || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Focus Type", item.focusType || "Theme", { preserveExact: true }),
      createPassageFunctionSection("Related Evidence", "", { list: asArray(item.relatedEvidence).slice(0, 8), hiddenCount: Math.max(0, asArray(item.relatedEvidence).length - 8), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Focus Lens", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "focus and related records derived from current semantic layers only", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.relatedEvidence), ...asArray(item.relatedPrinciples), ...asArray(item.relatedCharacters), ...asArray(item.relatedTeachings)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show Evidence", navItems: relatedSemanticLayerNavItems(item, "focusLens"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Focus Lens", label: item.currentFocus || "Focus Lens", layer: "Focus Lens", storageKey: "ICE_FOCUS_LENS", scopePath: item.scopePath || item.verseRange, rule: "Focus Lens records infer default study focus from existing current page/session semantic records; no full selector, visual graph, crawling, or freeform answer behavior is implemented." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderFocusLens(term) {
    const container = document.getElementById("focusLensCards");
    const count = document.getElementById("focusLensCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.focusLens);
    const filtered = records.filter((item) => matchesSearchQuery(focusLensSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} focus record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No Focus Lens records derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Focus Lens",
      [
        `Derived records: ${records.length}`,
        "Layer: ICE_FOCUS_LENS",
        "Purpose: infer default current-page/session study focuses and show related records around each focus.",
        "Boundary: default focus foundation only; no visual graph, full selector, crawling, or Strong's/POS implementation."
      ].join("\n"),
      "derived focus lens layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No Focus Lens records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createFocusLensCard(item)));
  }

  function scopeLensSearchText(item = {}) {
    return [
      item.activeFocus,
      item.activeScope,
      item.scopeType,
      item.scopeMeaning,
      item.includedPages,
      item.excludedFuturePages,
      item.scopeBoundary,
      item.whyThisScopeMatters,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.sourcePhrase,
      item.derivedMeaning,
      item.relatedEvidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createScopeLensCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card scope-lens-card";
    assignSemanticCardTarget(card, "scopeLens", item, item.activeFocus || item.id || "scope-lens");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    const title = scopeLensStudyTitle(item);
    const divineContext = hasDivineDisplayContext([item.activeFocus, item.scopeMeaning, item.relatedEvidence, item.sourcePhrase, item.derivedMeaning]);
    heading.textContent = renderDerivedSemanticDisplayText(title, divineContext);
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.scopeType || "Current scope", item.activeScope || item.verseRange || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createPassageFunctionSection("Main Conclusion", scopeLensStudyTitle(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why", item.whyThisScopeMatters || item.scopeMeaning || "This focus is being read inside the current Study Scope boundary.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Study Paths", "", { list: scopeLensRelatedPaths(item), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Active Scope", item.activeScope || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Type", item.scopeType || "Current scope", { preserveExact: true }),
      createPassageFunctionSection("Included Pages", "", { list: asArray(item.includedPages), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Excluded / Future Pages", "", { list: asArray(item.excludedFuturePages), plainList: true, collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Boundary", item.scopeBoundary || "Not recorded.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Meaning", item.scopeMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Scope Lens", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "scope boundary derived from current analyzed page/session records only", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.relatedEvidence), ...asArray(item.relatedFocusLens), ...asArray(item.relatedSessionContinuityReview), ...asArray(item.relatedKnowledgeGraph)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show Evidence", navItems: relatedSemanticLayerNavItems(item, "scopeLens"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Scope Lens", label: title, layer: "Scope Lens", storageKey: "ICE_SCOPE_LENS", scopePath: item.scopePath || item.verseRange, rule: "Scope Lens records are derived only from the current Study Scope, Focus Lens, Session Continuity, Knowledge Graph, and Library Awareness context; initial support is current page/current session only and does not crawl or analyze unselected pages." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderScopeLens(term) {
    const container = document.getElementById("scopeLensCards");
    const count = document.getElementById("scopeLensCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.scopeLens);
    const filtered = records.filter((item) => matchesSearchQuery(scopeLensSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} scope record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No Scope Lens records derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Scope Lens",
      [
        `Derived records: ${records.length}`,
        "Layer: ICE_SCOPE_LENS",
        "Purpose: show which current page/session boundary each active focus is being considered within.",
        "Boundary: current page/current session only; no book, volume, library, crawling, or unselected-page analysis."
      ].join("\n"),
      "derived scope lens layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No Scope Lens records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createScopeLensCard(item)));
  }

  function depthLensSearchText(item = {}) {
    return [
      item.currentDepth,
      item.activeScope,
      item.enabledSemanticLayers,
      item.strictLayers,
      item.groundedLayers,
      item.elaborateLayers,
      item.expansionLevel,
      item.whyThisDepthMatters,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.sourcePhrase,
      item.derivedMeaning,
      item.relatedEvidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createDepthLensCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card depth-lens-card";
    assignSemanticCardTarget(card, "depthLens", item, item.currentDepth || item.id || "depth-lens");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    const title = item.currentDepth ? `${item.currentDepth} Depth` : "Depth Lens";
    const divineContext = hasDivineDisplayContext([item.enabledSemanticLayers, item.derivedMeaning, item.relatedEvidence, item.sourcePhrase]);
    heading.textContent = renderDerivedSemanticDisplayText(title, divineContext);
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.expansionLevel || "Semantic expansion", item.activeScope || item.verseRange || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createPassageFunctionSection("Main Conclusion", `${item.currentDepth || "Strict"} depth is active`, { preserveExact: true }),
      createPassageFunctionSection("Why", item.whyThisDepthMatters || "Depth Lens shows how far the current display expands beyond direct source wording.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Study Paths", "", { list: depthLensRelatedPaths(item), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Current Depth", item.currentDepth || "Strict", { preserveExact: true }),
      createPassageFunctionSection("Expansion Level", item.expansionLevel || "Minimal semantic expansion", { preserveExact: true }),
      createPassageFunctionSection("Enabled Semantic Layers", "", { list: asArray(item.enabledSemanticLayers), plainList: true, collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Strict Layers", "", { list: asArray(item.strictLayers), plainList: true, collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounded Layers", "", { list: asArray(item.groundedLayers), plainList: true, collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Elaborate Layers", "", { list: asArray(item.elaborateLayers), plainList: true, collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Depth Lens", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "depth classification derived from enabled semantic layer families", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.enabledSemanticLayers), ...asArray(item.relatedEvidence)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Depth Lens", label: title, layer: "Depth Lens", storageKey: "ICE_DEPTH_LENS", scopePath: item.scopePath || item.verseRange, rule: "Depth Lens records are display-only summaries derived from existing semantic layer availability; they do not change source records, add user controls, crawl sources, or implement Strong's/POS analysis." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderDepthLens(term) {
    const container = document.getElementById("depthLensCards");
    const count = document.getElementById("depthLensCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.depthLens);
    const filtered = records.filter((item) => matchesSearchQuery(depthLensSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} depth record(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No Depth Lens records derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Depth Lens",
      [
        `Derived records: ${records.length}`,
        "Layer: ICE_DEPTH_LENS",
        "Purpose: explain whether the current display is Strict, Grounded, or Elaborate based on enabled semantic layers.",
        "Boundary: display-only; no user controls, semantic record changes, crawling, or Strong's/POS implementation."
      ].join("\n"),
      "derived depth lens layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No Depth Lens records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createDepthLensCard(item)));
  }
  function viewLensPurpose(currentView) {
    return {
      "Guided Study": "Introduce major teachings and grounded study paths from the current scoped semantic records.",
      "Knowledge Graph": "Present current scoped entities, principles, and relationships as a structured semantic network.",
      "Summary": "Present the current Study Scope, queue opportunities, and semantic availability in a concise overview."
    }[currentView] || "Present current study information without changing the underlying semantic records.";
  }

  function viewLensWhy(currentView) {
    return {
      "Guided Study": "This view turns existing scoped semantic records into a readable starting path without changing their source grounding or evidence weight.",
      "Knowledge Graph": "This view helps expose structure between existing entities, principles, and relationships while keeping source wording separate from derived meaning.",
      "Summary": "This view keeps the active scope and available study opportunities understandable before deeper presentation modes are opened."
    }[currentView] || "The selected presentation explains existing records without creating new semantic evidence.";
  }

  function viewLensPrimaryRecords(currentView, availability = {}) {
    const records = [];
    const add = (condition, label) => {
      if (condition && !records.includes(label)) records.push(label);
    };
    if (currentView === "Guided Study") {
      add(availability.teachingSemantics, "Teaching Semantics");
      add(availability.principleNetworks, "Principle Networks");
      add(availability.knowledgeGraph, "Knowledge Graph");
      add(availability.principleRelationships, "Principle Relationships");
      add(availability.characterInteractions, "Character Interactions");
      if (!records.length) records.push("Guided Study Suggestions");
    } else if (currentView === "Knowledge Graph") {
      add(availability.knowledgeGraph, "Knowledge Graph");
      add(availability.relationshipGraph, "Relationship Graph");
      add(availability.entityRegistry, "Entity Registry");
      add(availability.principleNetworks, "Principle Networks");
      if (!records.length) records.push("Current Scoped Semantic Records");
    } else {
      records.push("Study Scope", "Queue Summary", "Semantic Coverage");
    }
    return records.slice(0, 6);
  }

  function viewLensRecords() {
    const guided = guidedStudyRecords();
    const graph = knowledgeGraphRecords();
    const teachings = scopedSemanticRecords(studyData.teachingSemantics);
    const principles = scopedSemanticRecords(studyData.principleRelationships);
    const networks = scopedSemanticRecords(studyData.principleNetworks);
    const interactions = scopedSemanticRecords(studyData.characterInteractions);
    const relationshipGraph = scopedSemanticRecords(studyData.relationshipGraph);
    const entityRegistry = scopedSemanticRecords(studyData.entityRegistry);
    const hasStudyData = Boolean(activeSourcePageRecord()) || analyzedPageHistory().length > 0 || guided.length > 0 || graph.length > 0;
    if (!hasStudyData) return [];

    const currentView = guided.length ? "Guided Study" : (graph.length ? "Knowledge Graph" : "Summary");
    const availability = {
      teachingSemantics: teachings.length,
      principleRelationships: principles.length,
      principleNetworks: networks.length,
      characterInteractions: interactions.length,
      knowledgeGraph: graph.length,
      relationshipGraph: relationshipGraph.length,
      entityRegistry: entityRegistry.length
    };
    const primaryRecords = viewLensPrimaryRecords(currentView, availability);
    const relatedViews = uniqueStudyList([
      currentView !== "Summary" ? "Summary" : "",
      currentView !== "Guided Study" && guided.length ? "Guided Study" : "",
      currentView !== "Knowledge Graph" && graph.length ? "Knowledge Graph" : "",
      interactions.length || entityRegistry.length ? "Character Focus" : "",
      principles.length || networks.length ? "Principle Focus" : "",
      relationshipGraph.length || interactions.length ? "Relationship Focus" : ""
    ]).slice(0, 6);
    const sourcePhrase = guided.find((item) => item.sourcePhrase)?.sourcePhrase ||
      teachings.find((item) => item.sourcePhrase)?.sourcePhrase ||
      principles.find((item) => item.sourcePhrase)?.sourcePhrase ||
      "No direct source phrase; View Lens is derived from existing scoped semantic records.";
    const recordCount = currentView === "Guided Study" ? guided.length : (currentView === "Knowledge Graph" ? graph.length : analyzedPageHistory().length);
    const derivedMeaning = `${currentView} is the current inferred presentation because ${recordCount} relevant scoped record(s) are available. This label changes presentation wording only; it does not change Study Scope or semantic records.`;
    return [{
      id: `view-lens-${currentView.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      currentView,
      purpose: viewLensPurpose(currentView),
      primaryRecords,
      relatedViews,
      futureAvailableViews: ["Timeline", "Character Focus", "Principle Focus", "Relationship Focus", "Authority Paths", "Study Journey"],
      whyThisViewMatters: viewLensWhy(currentView),
      activeScope: currentStudyScopeLabel(),
      sourcePhrase,
      derivedMeaning,
      provenance: "I.C.E. View Lens derived display layer",
      evidenceWeight: "Derived Semantic Evidence",
      reasoningPath: [
        "Read the current Study Scope.",
        "Count available scoped presentation records.",
        `Infer ${currentView} as the current display mode.`,
        "Preserve source records and expose future views without activating them."
      ],
      sourceGrounding: `Derived from ${primaryRecords.join(", ")} within ${currentStudyScopeLabel()}; no new semantic extraction or source mutation.`,
      confidence: currentView === "Summary" ? "possible" : "probable"
    }];
  }

  function viewLensSearchText(item = {}) {
    return [
      item.currentView,
      item.purpose,
      item.primaryRecords,
      item.relatedViews,
      item.futureAvailableViews,
      item.whyThisViewMatters,
      item.activeScope,
      item.sourcePhrase,
      item.derivedMeaning,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createViewLensCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card view-lens-card";
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = renderDerivedSemanticDisplayText(item.currentView || "Summary", hasDivineDisplayContext([item.sourcePhrase, item.derivedMeaning]));
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["Display-only View Lens", item.activeScope, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.sourcePhrase, item.derivedMeaning, item.primaryRecords, item.relatedViews]);
    header.append(heading, range);
    [
      createPassageFunctionSection("Current View", item.currentView || "Summary", { preserveExact: true }),
      createPassageFunctionSection("Purpose", item.purpose || "Present current study information.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Primary Records Used", "", { list: asArray(item.primaryRecords), plainList: true, preserveExact: true }),
      createPassageFunctionSection("Related Views", "", { list: asArray(item.relatedViews), plainList: true, preserveExact: true }),
      createPassageFunctionSection("Future Available Views", "", { list: asArray(item.futureAvailableViews), plainList: true, preserveExact: true }),
      createPassageFunctionSection("Why This View Matters", item.whyThisViewMatters || "This display explains existing records without changing them.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "No direct source phrase recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "View presentation is derived from existing semantic records.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. View Lens derived display layer", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "presentation mode inferred from existing scoped record availability", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: item.primaryRecords, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Derived from current scoped semantic records.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. View Lens", label: item.currentView || "Summary", layer: "View Lens / ICE_VIEW_LENS", storageKey: "Not persisted in Phase 9.2b", scopePath: item.activeScope, rule: "View Lens is a derived display layer only. It reuses existing scoped semantic records and does not extract, analyze, crawl, select, or modify Study Scope." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderViewLens(term) {
    const container = document.getElementById("viewLensCards");
    const count = document.getElementById("viewLensCount");
    if (!container || !count) return;
    const records = viewLensRecords();
    const filtered = records.filter((item) => matchesSearchQuery(viewLensSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} view record(s)`;
    if (!records.length) {
      appendEmpty(container, "No View Lens record is available until current study data exists.");
      return;
    }
    container.appendChild(createCard(
      "View Lens",
      [
        `Derived records: ${records.length}`,
        "Layer identifier: ICE_VIEW_LENS",
        "Purpose: describe how current scoped study information is being presented.",
        "Boundary: display-only foundation; no selectors, graph/timeline execution, new extraction, crawling, or automatic analysis."
      ].join("\n"),
      "derived view lens layer"
    ));
    if (!filtered.length) {
      appendEmpty(container, "No View Lens records match current filter.");
      return;
    }
    filtered.forEach((item) => container.appendChild(createViewLensCard(item)));
  }
  function journeyNodeCanonicalName(value = "") {
    const label = normalizeText(value);
    if (!label) return "";
    if (/^beatitude blessing$/i.test(label) || /^beatitudes?$/i.test(label)) return "Beatitudes";
    if (/law and fulfillment|law fulfillment/i.test(label)) return "Law Fulfillment";
    if (/^sermon on the mount teaching context$/i.test(label)) return "Sermon on the Mount";
    if (/^mercy$/i.test(label)) return "Mercy";
    if (/^peacemaking$/i.test(label)) return "Peacemaking";
    if (/^reconciliation$/i.test(label)) return "Reconciliation";
    if (/^righteousness$/i.test(label)) return "Righteousness";
    return label;
  }

  function journeyNodeTypeFromLabel(type = "", label = "") {
    const combined = `${normalizeText(type)} ${normalizeText(label)}`;
    if (/fulfill/i.test(combined)) return "Fulfillment";
    if (/revelation|reveals|dream|messenger|warns/i.test(combined)) return "Revelation";
    if (/teaching|discourse|blessing|beatitude|commandment/i.test(combined)) return "Teaching";
    if (/principle/i.test(combined)) return "Principle";
    if (/character|authority|ontology role|group/i.test(combined)) return "Character";
    return "Event";
  }

  function journeyNodeNameFromTeaching(item = {}) {
    const combined = [item.discourseType, item.teachingTopic, item.principle, item.blessing, item.commandment, item.derivedMeaning].map((value) => normalizeText(value)).join(" ");
    if (/blessing|beatitude/i.test(combined)) return "Beatitudes";
    if (/law and fulfillment|law fulfillment|fulfillment and righteousness/i.test(combined)) return "Law Fulfillment";
    if (/^teaching_block$/i.test(normalizeText(item.discourseType)) && item.teachingBlock) return journeyNodeCanonicalName(item.teachingBlock);
    return journeyNodeCanonicalName(item.teachingTopic || item.principle || item.commandment || item.blessing || item.teachingBlock);
  }

  function journeyNodeTypeFromTeaching(item = {}) {
    const combined = [item.discourseType, item.teachingTopic, item.principle, item.blessing, item.commandment].map((value) => normalizeText(value)).join(" ");
    if (/fulfill/i.test(combined)) return "Fulfillment";
    if (/principle/i.test(item.discourseType || "") && !item.blessing && !item.commandment) return "Principle";
    return "Teaching";
  }

  function journeyNodeNameFromInteraction(item = {}) {
    const source = normalizeText(item.sourceCharacter || "Source");
    const target = normalizeText(item.targetCharacter || "Target");
    const interaction = normalizeText(item.interactionType || "interacts with");
    const grounding = [interaction, item.sourcePhrase, item.derivedMeaning, item.verseRange].map((value) => normalizeText(value)).join(" ");
    if (/\bnames?\b/i.test(interaction) && /\bJESUS\b/i.test(target)) return "Naming of JESUS";
    if (/egypt/i.test(grounding) && /warn|command|protect|move|flee/i.test(grounding)) return "Flight into Egypt";
    if (/wise men/i.test(grounding) && /visit|worship|came|house/i.test(grounding)) return "Wise Men visit";
    if (/reveal|instruct|warn|dream|messenger/i.test(grounding) && target) return `${target} receives revelation`;
    return journeyNodeCanonicalName(`${source} ${passageFunctionTitle(interaction)} ${target}`);
  }

  function journeyNodeScopeBoundary(nodeName = "") {
    const scope = currentStudyScopeLabel();
    const lenses = journeyRetainedSemanticRecords("scopeLens");
    const match = lenses.find((item) => normalizeText(item.activeFocus).toLowerCase() === normalizeText(nodeName).toLowerCase()) || lenses[0];
    return match?.scopeBoundary || `Includes only confirmed records in ${scope}; unselected or future pages are excluded.`;
  }

  function journeySnapshotPageRecord(snapshot = {}) {
    const page = {
      sourceCaptureId: snapshot.captureId || "",
      sourceTitle: snapshot.sourceTitle || snapshot.label || [snapshot.book, snapshot.chapter].filter(Boolean).join(" ") || "Journey source",
      sourceCaptureBook: snapshot.book || "",
      sourceCaptureChapter: String(snapshot.chapter || ""),
      activeUrl: snapshot.url || "",
      activeAdapterName: snapshot.adapter || "",
      analyzedAt: snapshot.analyzedAt || "",
      updatedAt: snapshot.updatedAt || snapshot.analyzedAt || "",
      pageKey: snapshot.pageKey || snapshot.canonicalKey || ""
    };
    const reason = sourcePageValidationReason(page, { requireAnalyzed: true });
    if (reason !== "accepted") return { page: null, reason };
    if (!page.pageKey || page.pageKey !== pageRecordKey(page)) return { page: null, reason: "snapshot canonical page key does not match source metadata" };
    return { page, reason: "accepted" };
  }

  function journeySnapshotScopeState() {
    const scopePages = currentStudyScopePages();
    const activeKeys = journeyDiagnosticSnapshotKeys || new Set(
      scopePages.map((page) => page.pageKey || pageRecordKey(page)).filter(Boolean)
    );
    const retained = [];
    const excluded = [];
    asArray(studyData.journeyPageSnapshots).forEach((snapshot) => {
      const validation = journeySnapshotPageRecord(snapshot);
      const label = normalizeText(snapshot.label || [snapshot.book, snapshot.chapter].filter(Boolean).join(" ") || snapshot.pageKey || "Unknown Journey page");
      if (!validation.page) {
        excluded.push({ snapshot, label, reason: validation.reason });
        return;
      }
      if (!activeKeys.size) {
        excluded.push({ snapshot, label, reason: "no confirmed active Study Scope page key" });
        return;
      }
      if (!activeKeys.has(validation.page.pageKey)) {
        excluded.push({ snapshot, label, reason: `outside active Study Scope (${currentStudyScopeLabel()})` });
        return;
      }
      retained.push({ snapshot, page: validation.page, label });
    });
    return { retained, excluded, scopePages };
  }

  function journeyRetainedSemanticRecords(alias) {
    const snapshots = asArray(studyData.journeyPageSnapshots);
    if (!snapshots.length) return scopedSemanticRecords(studyData[alias]);
    const state = journeySnapshotScopeState();
    const records = [];
    const seen = new Set();
    state.retained.forEach(({ snapshot, page, label }) => {
      asArray(snapshot.records?.[alias]).forEach((item, index) => {
        const key = `${page.pageKey}|${normalizeText(item?.id || item?.node || item?.currentFocus || item?.principle || item?.teachingTopic || index)}`.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        records.push({
          ...item,
          journeyPageKey: page.pageKey,
          journeyPageLabel: label,
          sourceCaptureBook: item?.sourceCaptureBook || page.sourceCaptureBook,
          sourceCaptureChapter: item?.sourceCaptureChapter || page.sourceCaptureChapter,
          sourceContext: {
            ...(item?.sourceContext || {}),
            sourceTitle: item?.sourceContext?.sourceTitle || page.sourceTitle,
            sourceUrl: item?.sourceContext?.sourceUrl || page.activeUrl,
            book: item?.sourceContext?.book || page.sourceCaptureBook,
            chapter: item?.sourceContext?.chapter || page.sourceCaptureChapter,
            sourceCaptureId: item?.sourceContext?.sourceCaptureId || page.sourceCaptureId
          }
        });
      });
    });
    return scopedSemanticRecords(records);
  }

  function journeyKnowledgeGraphRecords() {
    const snapshots = asArray(studyData.journeyPageSnapshots);
    if (snapshots.length) return journeyRetainedSemanticRecords("knowledgeGraph");
    return knowledgeGraphRecords();
  }

  function journeyRecordsByPageDiagnostics() {
    const state = journeySnapshotScopeState();
    const previousKeys = journeyDiagnosticSnapshotKeys;
    try {
      return state.retained.map(({ page, label }) => {
        journeyDiagnosticSnapshotKeys = new Set([page.pageKey]);
        return {
          pageKey: page.pageKey,
          label,
          nodes: journeyNodesRecords().length,
          paths: journeyPathRecords().length,
          hubs: journeyHubRecords().length
        };
      });
    } finally {
      journeyDiagnosticSnapshotKeys = previousKeys;
    }
  }

  function journeyNodesRecords() {
    const teachings = journeyRetainedSemanticRecords("teachingSemantics");
    const networks = journeyRetainedSemanticRecords("principleNetworks");
    const graph = journeyKnowledgeGraphRecords();
    const interactions = journeyRetainedSemanticRecords("characterInteractions");
    const focuses = journeyRetainedSemanticRecords("focusLens");
    const progression = studyProgressionRecords()[0] || null;
    const nodes = new Map();

    const addNode = (candidate = {}) => {
      const nodeName = journeyNodeCanonicalName(candidate.nodeName);
      if (!nodeName) return;
      const key = nodeName.toLowerCase();
      const existing = nodes.get(key) || {
        id: `journey-node-${key.replace(/[^a-z0-9]+/g, "-")}`,
        nodeName,
        nodeType: candidate.nodeType || "Event",
        whyItMatters: "",
        relatedNodeNames: [],
        suggestedNodeNames: [],
        scopeBoundary: journeyNodeScopeBoundary(nodeName),
        activeScope: currentStudyScopeLabel(),
        sourcePhrase: "",
        derivedMeaning: "",
        provenanceSources: [],
        evidenceWeights: [],
        reasoningPath: [],
        supportingLayers: [],
        evidence: [],
        sourceGrounding: "",
        confidence: "possible"
      };
      if (existing.nodeType === "Event" && candidate.nodeType && candidate.nodeType !== "Event") existing.nodeType = candidate.nodeType;
      if (!existing.whyItMatters && candidate.whyItMatters) existing.whyItMatters = normalizeText(candidate.whyItMatters);
      if (!existing.sourcePhrase && candidate.sourcePhrase) existing.sourcePhrase = normalizeText(candidate.sourcePhrase);
      if (!existing.derivedMeaning && candidate.derivedMeaning) existing.derivedMeaning = normalizeText(candidate.derivedMeaning);
      if (!existing.sourceGrounding && candidate.sourceGrounding) existing.sourceGrounding = normalizeText(candidate.sourceGrounding);
      if (candidate.scopeBoundary) existing.scopeBoundary = normalizeText(candidate.scopeBoundary);
      if (candidate.confidence === "explicit" || (candidate.confidence === "probable" && existing.confidence === "possible")) existing.confidence = candidate.confidence;
      existing.relatedNodeNames = uniqueStudyList([...existing.relatedNodeNames, ...asArray(candidate.relatedNodeNames)]).slice(0, 14);
      existing.suggestedNodeNames = uniqueStudyList([...existing.suggestedNodeNames, ...asArray(candidate.suggestedNodeNames)]).slice(0, 8);
      existing.provenanceSources = uniqueStudyList([...existing.provenanceSources, candidate.provenance]).slice(0, 8);
      existing.evidenceWeights = uniqueStudyList([...existing.evidenceWeights, candidate.evidenceWeight]).slice(0, 6);
      existing.reasoningPath = uniqueStudyList([...existing.reasoningPath, ...asArray(candidate.reasoningPath)]).slice(0, 10);
      existing.supportingLayers = uniqueStudyList([...existing.supportingLayers, ...asArray(candidate.supportingLayers)]).slice(0, 8);
      existing.evidence = uniqueStudyList([...existing.evidence, ...asArray(candidate.evidence)]).slice(0, 8);
      nodes.set(key, existing);
    };

    teachings.forEach((item) => {
      const nodeName = journeyNodeNameFromTeaching(item);
      addNode({
        nodeName,
        nodeType: journeyNodeTypeFromTeaching(item),
        whyItMatters: item.derivedMeaning || item.sourceGrounding || `${nodeName} is a grounded teaching destination in the current scope.`,
        relatedNodeNames: [item.speaker, item.audience, item.principle, item.blessing, item.commandment, item.promise, ...asArray(item.relatedEntities)],
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        provenance: "Teaching Semantics",
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
        reasoningPath: ["Teaching record selected", "Destination name derived from grounded teaching fields", "Current Study Scope boundary applied"],
        supportingLayers: ["Teaching Semantics"],
        evidence: item.evidence,
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    networks.forEach((item) => {
      const nodeName = journeyNodeCanonicalName(item.corePrinciple);
      addNode({
        nodeName,
        nodeType: /fulfill/i.test(nodeName) ? "Fulfillment" : "Principle",
        whyItMatters: item.derivedMeaning || item.sourceGrounding || `${nodeName} connects grounded principles in the current scope.`,
        relatedNodeNames: [...asArray(item.relatedPrinciples), ...asArray(item.characterExamples)],
        sourcePhrase: item.sourcePhrase || asArray(item.evidence)[0],
        derivedMeaning: item.derivedMeaning,
        provenance: item.provenance || "Principle Networks",
        evidenceWeight: item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference",
        reasoningPath: item.reasoningPath,
        supportingLayers: ["Principle Networks", "Principle Relationships", "Knowledge Graph"],
        evidence: item.evidence,
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    interactions.forEach((item) => {
      const nodeName = journeyNodeNameFromInteraction(item);
      const nodeType = nodeName === "Flight into Egypt" ? "Event" : journeyNodeTypeFromLabel(item.interactionType, `${item.sourcePhrase || ""} ${item.derivedMeaning || ""}`);
      addNode({
        nodeName,
        nodeType,
        whyItMatters: item.derivedMeaning || item.sourceGrounding || `${nodeName} is grounded by a current-scope character interaction.`,
        relatedNodeNames: [item.sourceCharacter, item.targetCharacter, ...asArray(item.relatedEntities)],
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        provenance: "Character Interactions",
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence / Relationship Inference" : "Relationship Inference",
        reasoningPath: ["Character interaction selected", `Interaction classified as ${nodeType}`, "Destination wording derived from grounded source and interaction fields"],
        supportingLayers: ["Character Interactions", ...(asArray(item.relatedTeachingSemantics).length ? ["Teaching Semantics"] : [])],
        evidence: item.evidence,
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    graph.forEach((item) => {
      if (!/character|teaching|principle|event|revelation|fulfill/i.test(item.type || "")) return;
      const nodeName = journeyNodeCanonicalName(item.node);
      addNode({
        nodeName,
        nodeType: journeyNodeTypeFromLabel(item.type, nodeName),
        whyItMatters: item.derivedMeaning || item.sourceGrounding || `${nodeName} is connected to grounded records in the current Knowledge Graph.`,
        relatedNodeNames: [...asArray(item.relatedNodes), ...asArray(item.relatedPrinciples)],
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        provenance: "Knowledge Graph",
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence / Relationship Inference" : "Relationship Inference",
        reasoningPath: ["Knowledge Graph node selected", "Existing relationships retained", "Current Study Scope boundary applied"],
        supportingLayers: ["Knowledge Graph"],
        evidence: item.evidence,
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    focuses.forEach((item) => {
      addNode({
        nodeName: item.currentFocus,
        nodeType: journeyNodeTypeFromLabel(item.focusType, item.currentFocus),
        whyItMatters: item.derivedMeaning || item.sourceGrounding,
        relatedNodeNames: [...asArray(item.relatedCharacters), ...asArray(item.relatedPrinciples), ...asArray(item.relatedTeachings)],
        suggestedNodeNames: [item.suggestedNextFocus],
        sourcePhrase: item.sourcePhrase || asArray(item.relatedEvidence)[0],
        derivedMeaning: item.derivedMeaning,
        provenance: item.provenance || "Focus Lens",
        evidenceWeight: item.evidenceWeight || "Derived Semantic Evidence",
        reasoningPath: item.reasoningPath,
        supportingLayers: ["Focus Lens"],
        evidence: item.relatedEvidence,
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    const records = Array.from(nodes.values()).slice(0, 48);
    const names = new Map(records.map((item) => [item.nodeName.toLowerCase(), item.nodeName]));
    const resolveName = (value) => names.get(journeyNodeCanonicalName(value).toLowerCase()) || "";
    const progressionSuggestion = resolveName(progression?.suggestedNextTopic || "");
    records.forEach((item) => {
      item.relatedNodes = uniqueStudyList(item.relatedNodeNames.map(resolveName)).filter((value) => value && value.toLowerCase() !== item.nodeName.toLowerCase()).slice(0, 8);
      item.suggestedNextNodes = uniqueStudyList([
        ...item.suggestedNodeNames.map(resolveName),
        progressionSuggestion,
        ...item.relatedNodes
      ]).filter((value) => value && value.toLowerCase() !== item.nodeName.toLowerCase()).slice(0, 4);
      item.provenance = `I.C.E. Journey Nodes derived from ${item.provenanceSources.join(", ") || "current scoped semantic records"}`;
      item.evidenceWeight = item.evidenceWeights.join(" / ") || "Derived Semantic Evidence";
      item.whyItMatters = item.whyItMatters || `${item.nodeName} is a grounded destination available within ${item.activeScope}.`;
      item.derivedMeaning = item.derivedMeaning || item.whyItMatters;
      item.sourcePhrase = item.sourcePhrase || "No direct source phrase recorded; node is derived from existing scoped semantic records.";
      item.reasoningPath = uniqueStudyList([
        ...item.reasoningPath,
        "Existing semantic records reused without new extraction",
        "Related and suggested nodes limited to grounded destinations in the current scope"
      ]).slice(0, 10);
      item.sourceGrounding = item.sourceGrounding || `Derived from ${item.supportingLayers.join(", ")} within ${item.activeScope}.`;
      delete item.relatedNodeNames;
      delete item.suggestedNodeNames;
      delete item.provenanceSources;
      delete item.evidenceWeights;
    });
    return records;
  }

  function journeyNodeSearchText(item = {}) {
    return [
      item.nodeName,
      item.nodeType,
      item.whyItMatters,
      item.relatedNodes,
      item.suggestedNextNodes,
      item.scopeBoundary,
      item.activeScope,
      item.sourcePhrase,
      item.derivedMeaning,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.supportingLayers,
      item.evidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createJourneyNodeCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card journey-node-card";
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    const divineContext = hasDivineDisplayContext([item.nodeName, item.whyItMatters, item.sourcePhrase, item.derivedMeaning, item.relatedNodes]);
    heading.textContent = renderDerivedSemanticDisplayText(item.nodeName || "Journey Node", divineContext);
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.nodeType || "Event", item.activeScope, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createPassageFunctionSection("Node Name", item.nodeName || "Journey Node", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Node Type", item.nodeType || "Event", { preserveExact: true }),
      createPassageFunctionSection("Why It Matters", item.whyItMatters || "Grounded destination in the current Study Scope.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Nodes", "", { list: asArray(item.relatedNodes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Suggested Next Nodes", "", { list: asArray(item.suggestedNextNodes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Boundary", item.scopeBoundary || "Current Study Scope only.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Journey Nodes", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "journey destination derived from existing scoped semantic records", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.supportingLayers), ...asArray(item.evidence)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Derived from current scoped semantic records.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Journey Nodes", label: item.nodeName || "Journey Node", layer: "Journey Nodes / ICE_JOURNEY_NODES", storageKey: "Not persisted in Phase 9.3a", scopePath: item.activeScope, rule: "Journey Nodes are derived destination records only. They do not add navigation controls, timelines, graph visualization, crawling, automatic analysis, or scope changes." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderJourneyNodes(term) {
    const container = document.getElementById("journeyNodesCards");
    const count = document.getElementById("journeyNodesCount");
    if (!container || !count) return;
    const records = journeyNodesRecords();
    const normalizedTerm = normalizeText(term).toLowerCase();
    const filtered = records
      .filter((item) => matchesSearchQuery(journeyNodeSearchText(item), term))
      .sort((left, right) => {
        if (!normalizedTerm) return 0;
        const rank = (item) => {
          const name = normalizeText(item.nodeName).toLowerCase();
          if (name === normalizedTerm) return 0;
          if (name.includes(normalizedTerm)) return 1;
          return 2;
        };
        return rank(left) - rank(right);
      });
    clearElement(container);
    count.textContent = `${filtered.length} journey node(s)`;
    if (!records.length) {
      appendEmpty(container, "No grounded Journey Nodes are available for the current Study Scope.");
      return;
    }
    container.appendChild(createCard(
      "Journey Nodes",
      [
        `Derived records: ${records.length}`,
        "Layer identifier: ICE_JOURNEY_NODES",
        "Purpose: represent meaningful grounded study destinations that can support future journeys.",
        "Boundary: records only; no timeline, graph visualization, navigation controls, crawling, or automatic analysis."
      ].join("\n"),
      "derived journey node layer"
    ));
    if (!filtered.length) {
      appendEmpty(container, "No Journey Nodes match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createJourneyNodeCard(item)));
    if (filtered.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${filtered.length - DISPLAY_LIMIT} more journey node(s) hidden by the preview limit. Use panel search to focus a destination.`);
    }
  }
  function journeyPathRelationshipType(value = "") {
    const text = normalizeText(value).toLowerCase();
    if (/fulfill|prophecy/.test(text)) return "Fulfills";
    if (/reveal|dream|warn|messenger/.test(text)) return "Reveals";
    if (/contrast|adversar|oppos|decept/.test(text)) return "Contrasts";
    if (/explain|teach|frame|meaning/.test(text)) return "Explains";
    if (/expand|interpret|commandment|higher righteousness/.test(text)) return "Expands";
    if (/continue|support|reinforce|preserv/.test(text)) return "Continues";
    return "Leads To";
  }

  function journeyPathRecords() {
    const nodes = journeyNodesRecords();
    if (nodes.length < 2) return [];
    const nodeByName = new Map(nodes.map((item) => [journeyNodeCanonicalName(item.nodeName).toLowerCase(), item]));
    const resolveNode = (value = "") => {
      const canonical = journeyNodeCanonicalName(value);
      if (!canonical) return null;
      const exact = nodeByName.get(canonical.toLowerCase());
      if (exact) return exact;
      const aliases = [];
      if (/fulfillment and righteousness/i.test(canonical)) aliases.push("Righteousness", "Law Fulfillment");
      if (/reconciliation and inward righteousness/i.test(canonical)) aliases.push("Reconciliation", "Righteousness");
      if (/inward righteousness|kingdom righteousness|hunger and thirst after righteousness/i.test(canonical)) aliases.push("Righteousness");
      if (/peace|peacemak/i.test(canonical)) aliases.push("Peacemaking");
      if (/merciful/i.test(canonical)) aliases.push("Mercy");
      for (const alias of aliases) {
        const match = nodeByName.get(journeyNodeCanonicalName(alias).toLowerCase());
        if (match) return match;
      }
      return null;
    };
    const paths = new Map();
    const addPath = (candidate = {}) => {
      const from = resolveNode(candidate.fromNode);
      const to = resolveNode(candidate.toNode);
      if (!from || !to || from.nodeName.toLowerCase() === to.nodeName.toLowerCase()) return;
      const relationshipType = journeyPathRelationshipType(candidate.relationshipType);
      const key = [from.nodeName, relationshipType, to.nodeName].map((value) => normalizeText(value).toLowerCase()).join("|");
      const existing = paths.get(key) || {
        id: `journey-path-${key.replace(/[^a-z0-9]+/g, "-")}`,
        fromNode: from.nodeName,
        toNode: to.nodeName,
        relationshipType,
        whyConnected: "",
        supportingRecords: [],
        provenanceSources: [],
        evidenceWeights: [],
        scopeBoundary: from.scopeBoundary || to.scopeBoundary || `Current Study Scope only: ${currentStudyScopeLabel()}.`,
        activeScope: currentStudyScopeLabel(),
        sourcePhrase: "",
        derivedMeaning: "",
        reasoningPath: [],
        sourceGrounding: "",
        confidence: "possible"
      };
      if (!existing.whyConnected && candidate.whyConnected) existing.whyConnected = normalizeText(candidate.whyConnected);
      if (!existing.sourcePhrase && candidate.sourcePhrase) existing.sourcePhrase = normalizeText(candidate.sourcePhrase);
      if (!existing.derivedMeaning && candidate.derivedMeaning) existing.derivedMeaning = normalizeText(candidate.derivedMeaning);
      if (!existing.sourceGrounding && candidate.sourceGrounding) existing.sourceGrounding = normalizeText(candidate.sourceGrounding);
      if (candidate.scopeBoundary) existing.scopeBoundary = normalizeText(candidate.scopeBoundary);
      if (candidate.confidence === "explicit" || (candidate.confidence === "probable" && existing.confidence === "possible")) existing.confidence = candidate.confidence;
      existing.supportingRecords = uniqueStudyList([...existing.supportingRecords, ...asArray(candidate.supportingRecords)]).slice(0, 10);
      existing.provenanceSources = uniqueStudyList([...existing.provenanceSources, candidate.provenance]).slice(0, 8);
      existing.evidenceWeights = uniqueStudyList([...existing.evidenceWeights, candidate.evidenceWeight]).slice(0, 6);
      existing.reasoningPath = uniqueStudyList([...existing.reasoningPath, ...asArray(candidate.reasoningPath)]).slice(0, 10);
      paths.set(key, existing);
    };

    const teachings = journeyRetainedSemanticRecords("teachingSemantics");
    teachings.forEach((item) => {
      const teachingNode = journeyNodeNameFromTeaching(item);
      const blockNode = journeyNodeCanonicalName(item.teachingBlock);
      if (blockNode && teachingNode && blockNode.toLowerCase() !== teachingNode.toLowerCase()) {
        addPath({
          fromNode: blockNode,
          toNode: teachingNode,
          relationshipType: /fulfill/i.test(teachingNode) ? "Fulfills" : "Expands",
          whyConnected: `${teachingNode} is a grounded teaching destination inside ${blockNode}.`,
          supportingRecords: [item.teachingBlock, item.teachingTopic, item.verseRange, ...asArray(item.evidence)],
          provenance: "Teaching Semantics",
          evidenceWeight: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
          sourcePhrase: item.sourcePhrase,
          derivedMeaning: item.derivedMeaning,
          reasoningPath: ["Teaching block resolved to an existing Journey Node", "Teaching topic resolved to an existing Journey Node", "Current-scope teaching relationship classified"],
          sourceGrounding: item.sourceGrounding,
          confidence: item.confidence
        });
      }
      const principleTargets = uniqueStudyList([item.principle, item.blessing, item.commandment, item.promise]);
      principleTargets.forEach((target) => addPath({
        fromNode: teachingNode,
        toNode: target,
        relationshipType: /fulfill/i.test(teachingNode) ? "Expands" : "Explains",
        whyConnected: `${teachingNode} grounds or explains ${journeyNodeCanonicalName(target)} in the current teaching record.`,
        supportingRecords: [item.teachingTopic, item.principle, item.blessing, item.commandment, item.promise, item.verseRange, ...asArray(item.evidence)],
        provenance: "Teaching Semantics",
        evidenceWeight: item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        reasoningPath: ["Teaching destination selected", "Grounded teaching field resolved to an existing Journey Node", "Source and derived wording kept separate"],
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      }));
    });

    journeyRetainedSemanticRecords("principleNetworks").forEach((item) => {
      asArray(item.relatedPrinciples).forEach((related) => addPath({
        fromNode: item.corePrinciple,
        toNode: related,
        relationshipType: "Continues",
        whyConnected: `${journeyNodeCanonicalName(related)} belongs to the grounded ${journeyNodeCanonicalName(item.corePrinciple)} principle neighborhood.`,
        supportingRecords: [item.corePrinciple, ...asArray(item.relatedPrinciples), ...asArray(item.evidence)],
        provenance: item.provenance || "Principle Networks",
        evidenceWeight: item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        reasoningPath: [...asArray(item.reasoningPath), "Both principle endpoints resolved to current-scope Journey Nodes"],
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      }));
    });

    journeyKnowledgeGraphRecords().forEach((item) => {
      asArray(item.relatedNodes).forEach((related) => {
        const relationship = asArray(item.relationships).find((value) => normalizeText(value).toLowerCase().includes(normalizeText(related).toLowerCase())) || asArray(item.relationships)[0] || "related";
        addPath({
          fromNode: item.node,
          toNode: related,
          relationshipType: relationship,
          whyConnected: `${item.node} and ${journeyNodeCanonicalName(related)} are connected by the existing Knowledge Graph relationship: ${normalizeText(relationship)}.`,
          supportingRecords: [relationship, ...asArray(item.evidence)],
          provenance: "Knowledge Graph",
          evidenceWeight: item.sourcePhrase ? "Direct Source Evidence / Relationship Inference" : "Relationship Inference",
          sourcePhrase: item.sourcePhrase,
          derivedMeaning: item.derivedMeaning,
          reasoningPath: ["Knowledge Graph source node resolved", "Related graph node resolved", "Existing relationship wording classified into a Journey Path type"],
          sourceGrounding: item.sourceGrounding,
          confidence: item.confidence
        });
      });
    });

    const interactionGroups = new Map();
    journeyRetainedSemanticRecords("characterInteractions").forEach((item) => {
      const pageKey = item.journeyPageKey || "current-source";
      if (!interactionGroups.has(pageKey)) interactionGroups.set(pageKey, []);
      interactionGroups.get(pageKey).push(item);
    });
    interactionGroups.forEach((interactions) => {
      interactions.sort((left, right) => Number(left.timelinePosition || 0) - Number(right.timelinePosition || 0));
      for (let index = 0; index < interactions.length - 1; index += 1) {
        const current = interactions[index];
        const next = interactions[index + 1];
        const fromNode = journeyNodeNameFromInteraction(current);
        const toNode = journeyNodeNameFromInteraction(next);
        addPath({
          fromNode,
          toNode,
          relationshipType: "Leads To",
          whyConnected: `${fromNode} precedes ${toNode} in the grounded same-page interaction sequence.`,
          supportingRecords: [
            `${current.sourceCharacter || "Source"} -> ${current.targetCharacter || "Target"} | ${current.interactionType || "interaction"}`,
            `${next.sourceCharacter || "Source"} -> ${next.targetCharacter || "Target"} | ${next.interactionType || "interaction"}`,
            ...asArray(current.evidence),
            ...asArray(next.evidence)
          ],
          provenance: "Character Interactions",
          evidenceWeight: current.sourcePhrase && next.sourcePhrase ? "Direct Source Evidence / Relationship Inference" : "Relationship Inference",
          sourcePhrase: current.sourcePhrase,
          derivedMeaning: `${current.derivedMeaning || fromNode} ${next.derivedMeaning || toNode}`,
          reasoningPath: ["Current-scope character interactions grouped by canonical analyzed page", "Same-page interactions ordered by existing record position", "Adjacent interaction destinations resolved to Journey Nodes", "No timeline or automatic traversal created"],
          sourceGrounding: [current.sourceGrounding, next.sourceGrounding].filter(Boolean).join(" "),
          confidence: current.confidence === "explicit" && next.confidence === "explicit" ? "explicit" : "probable"
        });
      }
    });

    sessionContinuityReviewRecords().forEach((item) => {
      const continuityNodes = uniqueStudyList([...asArray(item.continuingThemes), ...asArray(item.continuingPrincipleFamilies)]).map(resolveNode).filter(Boolean);
      for (let index = 0; index < continuityNodes.length - 1; index += 1) {
        addPath({
          fromNode: continuityNodes[index].nodeName,
          toNode: continuityNodes[index + 1].nodeName,
          relationshipType: "Continues",
          whyConnected: `${continuityNodes[index].nodeName} continues toward ${continuityNodes[index + 1].nodeName} within the selected analyzed session only.`,
          supportingRecords: [item.sessionRange, ...asArray(item.teachingProgression), ...asArray(item.evidence)],
          provenance: "Session Continuity",
          evidenceWeight: "Continuity Inference",
          sourcePhrase: item.sourcePhrase,
          derivedMeaning: item.derivedMeaning,
          reasoningPath: ["Selected analyzed session confirmed", "Continuing current-scope destinations resolved", "Missing or unselected pages excluded"],
          sourceGrounding: item.sourceGrounding,
          confidence: item.confidence
        });
      }
    });

    nodes.forEach((item) => {
      const target = asArray(item.suggestedNextNodes)[0];
      if (!target) return;
      addPath({
        fromNode: item.nodeName,
        toNode: target,
        relationshipType: "Leads To",
        whyConnected: `${target} is the first grounded suggested-next destination already attached to ${item.nodeName}.`,
        supportingRecords: [item.nodeName, target, ...asArray(item.supportingLayers)],
        provenance: "Journey Nodes",
        evidenceWeight: item.evidenceWeight || "Derived Semantic Evidence",
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        reasoningPath: ["Existing Journey Node selected", "First grounded suggested-next node resolved", "Path kept informational only"],
        sourceGrounding: item.sourceGrounding,
        confidence: item.confidence
      });
    });

    return Array.from(paths.values()).slice(0, 72).map((item) => ({
      ...item,
      whyConnected: item.whyConnected || `${item.fromNode} ${item.relationshipType.toLowerCase()} ${item.toNode} through existing current-scope semantic records.`,
      provenance: `I.C.E. Journey Paths derived from ${item.provenanceSources.join(", ") || "current scoped semantic records"}`,
      evidenceWeight: item.evidenceWeights.join(" / ") || "Derived Semantic Evidence",
      derivedMeaning: item.derivedMeaning || `${item.fromNode} is connected to ${item.toNode} as ${item.relationshipType.toLowerCase()} within ${item.activeScope}.`,
      reasoningPath: uniqueStudyList([
        ...item.reasoningPath,
        "Both endpoints verified as existing Journey Nodes",
        "Path remains derived, informational, and current-scope only"
      ]).slice(0, 10),
      sourceGrounding: item.sourceGrounding || `Derived from ${item.supportingRecords.join("; ")} within ${item.activeScope}.`
    }));
  }

  function journeyPathSearchText(item = {}) {
    return [item.fromNode, item.toNode, item.relationshipType, item.whyConnected, item.supportingRecords, item.provenance, item.evidenceWeight, item.scopeBoundary, item.activeScope, item.sourcePhrase, item.derivedMeaning, item.reasoningPath, item.sourceGrounding, item.confidence]
      .flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createJourneyPathCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card journey-path-card";
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    const divineContext = hasDivineDisplayContext([item.fromNode, item.toNode, item.whyConnected, item.sourcePhrase, item.derivedMeaning]);
    heading.textContent = `${renderDerivedSemanticDisplayText(item.fromNode || "Journey Node", divineContext)} -> ${renderDerivedSemanticDisplayText(item.toNode || "Journey Node", divineContext)}`;
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.relationshipType || "Leads To", item.activeScope, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createPassageFunctionSection("From Node", item.fromNode || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("To Node", item.toNode || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationship Type", item.relationshipType || "Leads To", { preserveExact: true }),
      createPassageFunctionSection("Why Connected", item.whyConnected || "Grounded by current-scope semantic records.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Supporting Records", "", { list: asArray(item.supportingRecords), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Boundary", item.scopeBoundary || "Current Study Scope only.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Journey Paths", { preserveExact: true }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence", evidenceStrength: "path derived only after both endpoints resolved to existing Journey Nodes", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: item.supportingRecords, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Derived from current scoped semantic records.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Journey Paths", label: `${item.fromNode || "Journey Node"} -> ${item.toNode || "Journey Node"}`, layer: "Journey Paths / ICE_JOURNEY_PATHS", storageKey: "Not persisted in Phase 9.3b", scopePath: item.activeScope, rule: "Journey Paths connect existing grounded Journey Nodes only. They do not add navigation controls, visual timelines, graph rendering, automatic traversal, crawling, analysis, or scope changes." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderJourneyPaths(term) {
    const container = document.getElementById("journeyPathsCards");
    const count = document.getElementById("journeyPathsCount");
    if (!container || !count) return;
    const records = journeyPathRecords();
    const normalizedTerm = normalizeText(term).toLowerCase();
    const filtered = records
      .filter((item) => matchesSearchQuery(journeyPathSearchText(item), term))
      .sort((left, right) => {
        if (!normalizedTerm) return 0;
        const rank = (item) => {
          const endpoints = `${normalizeText(item.fromNode)} ${normalizeText(item.toNode)}`.toLowerCase();
          if (endpoints === normalizedTerm) return 0;
          if (endpoints.includes(normalizedTerm)) return 1;
          return 2;
        };
        return rank(left) - rank(right);
      });
    clearElement(container);
    count.textContent = `${filtered.length} journey path(s)`;
    if (!records.length) {
      appendEmpty(container, "No grounded Journey Paths are available between current-scope Journey Nodes.");
      return;
    }
    container.appendChild(createCard(
      "Journey Paths",
      [
        `Derived records: ${records.length}`,
        "Layer identifier: ICE_JOURNEY_PATHS",
        "Purpose: represent meaningful grounded transitions between existing Journey Nodes.",
        "Boundary: records only; no visual timeline, graph rendering, navigation controls, automatic traversal, crawling, or automatic analysis."
      ].join("\n"),
      "derived journey path layer"
    ));
    if (!filtered.length) {
      appendEmpty(container, "No Journey Paths match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createJourneyPathCard(item)));
    if (filtered.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${filtered.length - DISPLAY_LIMIT} more journey path(s) hidden by the preview limit. Use panel search to focus a transition.`);
    }
  }
  function journeyHubTypeFromLabel(type = "", label = "") {
    const combined = `${normalizeText(type)} ${normalizeText(label)}`;
    if (/fulfill|prophecy/i.test(combined)) return "Fulfillment";
    if (/revelation|reveal|dream|messenger|warn/i.test(combined)) return "Revelation";
    if (/teaching|teacher|discourse|sermon|commandment|beatitude/i.test(combined)) return "Teaching";
    if (/principle|mercy|peace|righteous/i.test(combined)) return "Principle";
    if (/character|authority|JESUS|CHRIST|Joseph|Mary|Herod/i.test(combined)) return "Character";
    return "Event";
  }

  function journeyHubRecords() {
    const nodes = journeyNodesRecords();
    const paths = journeyPathRecords();
    if (nodes.length < 2) return [];
    const graph = journeyKnowledgeGraphRecords();
    const networks = journeyRetainedSemanticRecords("principleNetworks");
    const interactions = journeyRetainedSemanticRecords("characterInteractions");
    const teachings = journeyRetainedSemanticRecords("teachingSemantics");
    const nodeByName = new Map(nodes.map((item) => [journeyNodeCanonicalName(item.nodeName).toLowerCase(), item]));
    const resolveNode = (value = "") => nodeByName.get(journeyNodeCanonicalName(value).toLowerCase()) || null;
    const pathLabel = (item = {}) => `${item.fromNode} -> ${item.toNode} | ${item.relationshipType}`;
    const relevantPaths = (names = []) => {
      const keys = new Set(asArray(names).map((value) => journeyNodeCanonicalName(value).toLowerCase()).filter(Boolean));
      return paths.filter((item) => keys.has(journeyNodeCanonicalName(item.fromNode).toLowerCase()) || keys.has(journeyNodeCanonicalName(item.toNode).toLowerCase()));
    };
    const hubs = new Map();

    const addHub = (candidate = {}) => {
      const hubName = normalizeText(candidate.hubName);
      if (!hubName) return;
      const hubKey = hubName.toLowerCase();
      const connectedNodes = uniqueStudyList(asArray(candidate.connectedNodes)
        .map((value) => resolveNode(value))
        .filter(Boolean)
        .map((item) => item.nodeName)
        .filter((value) => value.toLowerCase() !== hubKey));
      if (connectedNodes.length < 2) return;
      const suppliedPaths = asArray(candidate.connectedPaths);
      const connectedPaths = uniqueStudyList(suppliedPaths.length ? suppliedPaths : relevantPaths([hubName, ...connectedNodes]).map(pathLabel)).slice(0, 12);
      const supportingRecords = uniqueStudyList(asArray(candidate.supportingRecords)).slice(0, 12);
      const convergenceScore = connectedNodes.length * 2 + connectedPaths.length * 3 + supportingRecords.length;
      if (!candidate.aggregate && connectedPaths.length < 2 && supportingRecords.length < 2) return;
      if (candidate.aggregate && connectedNodes.length < 3 && connectedPaths.length < 2 && supportingRecords.length < 2) return;
      const existing = hubs.get(hubKey) || {
        id: `journey-hub-${hubKey.replace(/[^a-z0-9]+/g, "-")}`,
        hubName,
        hubType: candidate.hubType || "Event",
        connectedNodes: [],
        connectedPaths: [],
        whyCentral: "",
        scopeBoundary: candidate.scopeBoundary || `Current Study Scope only: ${currentStudyScopeLabel()}.`,
        activeScope: currentStudyScopeLabel(),
        sourcePhrase: "",
        derivedMeaning: "",
        provenanceSources: [],
        evidenceWeights: [],
        reasoningPath: [],
        supportingRecords: [],
        sourceGrounding: "",
        confidence: "possible",
        convergenceScore: 0
      };
      if (!existing.whyCentral && candidate.whyCentral) existing.whyCentral = normalizeText(candidate.whyCentral);
      if (!existing.sourcePhrase && candidate.sourcePhrase) existing.sourcePhrase = normalizeText(candidate.sourcePhrase);
      if (!existing.derivedMeaning && candidate.derivedMeaning) existing.derivedMeaning = normalizeText(candidate.derivedMeaning);
      if (!existing.sourceGrounding && candidate.sourceGrounding) existing.sourceGrounding = normalizeText(candidate.sourceGrounding);
      if (candidate.scopeBoundary) existing.scopeBoundary = normalizeText(candidate.scopeBoundary);
      if (existing.hubType === "Event" && candidate.hubType && candidate.hubType !== "Event") existing.hubType = candidate.hubType;
      if (candidate.confidence === "explicit" || (candidate.confidence === "probable" && existing.confidence === "possible")) existing.confidence = candidate.confidence;
      existing.connectedNodes = uniqueStudyList([...existing.connectedNodes, ...connectedNodes]).slice(0, 12);
      existing.connectedPaths = uniqueStudyList([...existing.connectedPaths, ...connectedPaths]).slice(0, 12);
      existing.supportingRecords = uniqueStudyList([...existing.supportingRecords, ...supportingRecords]).slice(0, 12);
      existing.provenanceSources = uniqueStudyList([...existing.provenanceSources, candidate.provenance]).slice(0, 8);
      existing.evidenceWeights = uniqueStudyList([...existing.evidenceWeights, candidate.evidenceWeight]).slice(0, 6);
      existing.reasoningPath = uniqueStudyList([...existing.reasoningPath, ...asArray(candidate.reasoningPath)]).slice(0, 10);
      existing.convergenceScore = Math.max(existing.convergenceScore, convergenceScore);
      hubs.set(hubKey, existing);
    };

    nodes.forEach((node) => {
      const directPaths = paths.filter((item) => item.fromNode.toLowerCase() === node.nodeName.toLowerCase() || item.toNode.toLowerCase() === node.nodeName.toLowerCase());
      const pathNeighbors = directPaths.map((item) => item.fromNode.toLowerCase() === node.nodeName.toLowerCase() ? item.toNode : item.fromNode);
      const graphSupport = graph.filter((item) => journeyNodeCanonicalName(item.node).toLowerCase() === node.nodeName.toLowerCase() || asArray(item.relatedNodes).some((value) => journeyNodeCanonicalName(value).toLowerCase() === node.nodeName.toLowerCase()));
      const networkSupport = networks.filter((item) => journeyNodeCanonicalName(item.corePrinciple).toLowerCase() === node.nodeName.toLowerCase() || asArray(item.relatedPrinciples).some((value) => journeyNodeCanonicalName(value).toLowerCase() === node.nodeName.toLowerCase()));
      const interactionSupport = interactions.filter((item) => [item.sourceCharacter, item.targetCharacter, journeyNodeNameFromInteraction(item)].some((value) => journeyNodeCanonicalName(value).toLowerCase() === node.nodeName.toLowerCase()));
      const teachingSupport = teachings.filter((item) => [item.speaker, item.canonicalIdentity, item.teachingBlock, journeyNodeNameFromTeaching(item)].some((value) => journeyNodeCanonicalName(value).toLowerCase() === node.nodeName.toLowerCase()));
      const supportLayers = [graphSupport.length ? "Knowledge Graph" : "", networkSupport.length ? "Principle Networks" : "", interactionSupport.length ? "Character Interactions" : "", teachingSupport.length ? "Teaching Semantics" : ""].filter(Boolean);
      const connectedNodeNames = uniqueStudyList([...pathNeighbors, ...asArray(node.relatedNodes)]
        .map((value) => resolveNode(value)?.nodeName)
        .filter(Boolean)
        .filter((value) => value.toLowerCase() !== node.nodeName.toLowerCase()));
      const qualifiesAsHub = directPaths.length >= 3
        || (directPaths.length >= 2 && connectedNodeNames.length >= 3)
        || (directPaths.length >= 1 && connectedNodeNames.length >= 4 && supportLayers.length >= 3);
      if (!qualifiesAsHub) return;
      addHub({
        hubName: node.nodeName,
        hubType: journeyHubTypeFromLabel(node.nodeType, node.nodeName),
        connectedNodes: connectedNodeNames,
        connectedPaths: directPaths.map(pathLabel),
        whyCentral: `${node.nodeName} is a grounded convergence point for ${connectedNodeNames.length} current-scope Journey Nodes and ${directPaths.length} Journey Paths.`,
        supportingRecords: [...asArray(node.supportingLayers), ...supportLayers],
        provenance: `Journey Nodes${directPaths.length ? " / Journey Paths" : ""}`,
        evidenceWeight: node.evidenceWeight || "Derived Semantic Evidence / Relationship Inference",
        sourcePhrase: node.sourcePhrase,
        derivedMeaning: node.derivedMeaning,
        reasoningPath: [...asArray(node.reasoningPath), "Node degree and approved semantic-layer support evaluated", "Only grounded current-scope connections retained"],
        sourceGrounding: node.sourceGrounding,
        scopeBoundary: node.scopeBoundary,
        confidence: node.confidence
      });
    });

    const teachingBlocks = new Map();
    const teachingSpeakers = new Map();
    teachings.forEach((item) => {
      const block = journeyNodeCanonicalName(item.teachingBlock);
      if (block) teachingBlocks.set(block, [...(teachingBlocks.get(block) || []), item]);
      const speaker = normalizeText(item.speaker);
      if (speaker) teachingSpeakers.set(speaker, [...(teachingSpeakers.get(speaker) || []), item]);
    });
    const teachingDestinationNames = (items = []) => uniqueStudyList(asArray(items).flatMap((item) => [journeyNodeNameFromTeaching(item), item.principle, item.blessing, item.commandment, item.promise]).map((value) => resolveNode(value)?.nodeName).filter(Boolean));

    teachingBlocks.forEach((items, blockName) => {
      const connectedNodes = teachingDestinationNames(items).filter((value) => value.toLowerCase() !== blockName.toLowerCase());
      addHub({
        hubName: blockName,
        hubType: "Teaching",
        connectedNodes,
        aggregate: true,
        whyCentral: `${blockName} gathers ${connectedNodes.length} grounded teaching and principle destinations in the current scope.`,
        supportingRecords: uniqueStudyList(items.flatMap((item) => [item.teachingTopic, item.verseRange, ...asArray(item.evidence)])),
        provenance: "Teaching Semantics / Journey Nodes / Journey Paths",
        evidenceWeight: items.some((item) => item.sourcePhrase) ? "Direct Source Evidence / Derived Semantic Evidence" : "Derived Semantic Evidence",
        sourcePhrase: items.find((item) => item.sourcePhrase)?.sourcePhrase,
        derivedMeaning: `${blockName} is central because multiple grounded teaching destinations and paths converge within the same current-scope teaching block.`,
        reasoningPath: ["Teaching block grouped from current-scope records", "Teaching destinations resolved to existing Journey Nodes", "Connected Journey Paths retained without traversal controls"],
        sourceGrounding: items.map((item) => item.sourceGrounding).filter(Boolean).join(" "),
        confidence: items.some((item) => item.confidence === "explicit") ? "explicit" : "probable"
      });
    });

    teachingSpeakers.forEach((items, speaker) => {
      const connectedNodes = teachingDestinationNames(items).filter((value) => value.toLowerCase() !== speaker.toLowerCase());
      if (items.length < 3) return;
      const canonicalIdentity = normalizeText(items.find((item) => item.canonicalIdentity)?.canonicalIdentity);
      const hubName = /^JESUS$/i.test(speaker) ? "JESUS as Teacher" : `${speaker} as Teacher`;
      addHub({
        hubName,
        hubType: "Character",
        connectedNodes,
        aggregate: true,
        whyCentral: `${speaker} is the grounded speaker across ${items.length} current-scope teaching records that connect multiple teaching and principle destinations.`,
        supportingRecords: uniqueStudyList([speaker, canonicalIdentity, ...items.flatMap((item) => [item.teachingBlock, item.teachingTopic, item.verseRange])]),
        provenance: "Teaching Semantics / Character Interactions / Journey Nodes",
        evidenceWeight: items.some((item) => item.sourcePhrase) ? "Direct Source Evidence / Derived Semantic Evidence" : "Derived Semantic Evidence",
        sourcePhrase: items.find((item) => item.sourcePhrase)?.sourcePhrase,
        derivedMeaning: `${hubName} is a derived presentation hub; source records preserve ${speaker}${canonicalIdentity ? ` and canonical identity ${canonicalIdentity}` : ""} without collapsing the distinction.`,
        reasoningPath: ["Current-scope speaker records grouped", "Teaching destinations resolved to existing Journey Nodes", "Speaker role presented as a hub without creating a new canonical identity"],
        sourceGrounding: items.map((item) => item.sourceGrounding).filter(Boolean).join(" "),
        confidence: items.some((item) => item.confidence === "explicit") ? "explicit" : "probable"
      });
    });

    const jesusChristSupport = graph.filter((item) => /^JESUS CHRIST$/i.test(normalizeText(item.node))
      || /\bJESUS CHRIST\b/i.test(`${normalizeText(item.sourcePhrase)} ${normalizeText(item.sourceGrounding)}`));
    if (jesusChristSupport.length) {
      const connectedNodes = nodes.filter((item) => /\bJESUS CHRIST\b/i.test(journeyNodeSearchText(item))).map((item) => item.nodeName);
      const connectedPaths = relevantPaths(connectedNodes);
      addHub({
        hubName: "JESUS CHRIST",
        hubType: "Character",
        connectedNodes,
        connectedPaths: connectedPaths.map(pathLabel),
        aggregate: true,
        whyCentral: `JESUS CHRIST is an exact current-scope source and canonical identity that connects ${connectedNodes.length} grounded Journey Nodes without renaming narrative references to JESUS.`,
        supportingRecords: uniqueStudyList(jesusChristSupport.flatMap((item) => [item.sourcePhrase, item.derivedMeaning, item.sourceGrounding])),
        provenance: "Knowledge Graph / Journey Nodes / Journey Paths",
        evidenceWeight: "Direct Source Evidence / Derived Semantic Evidence",
        sourcePhrase: jesusChristSupport.find((item) => /\bJESUS CHRIST\b/i.test(normalizeText(item.sourcePhrase)))?.sourcePhrase,
        derivedMeaning: "This hub preserves JESUS CHRIST as the exact source or canonical identity while retaining JESUS as a distinct narrative display form in connected records.",
        reasoningPath: ["Exact JESUS CHRIST Knowledge Graph evidence located", "Current-scope Journey Nodes with exact identity support collected", "Connected Journey Paths retained", "JESUS and JESUS CHRIST display distinction preserved"],
        sourceGrounding: jesusChristSupport.map((item) => item.sourceGrounding || item.sourcePhrase).filter(Boolean).join(" "),
        confidence: "explicit"
      });
    }

    [{ hubName: "Fulfillment", hubType: "Fulfillment", pattern: /fulfill|prophecy/i }, { hubName: "Revelation", hubType: "Revelation", pattern: /revelation|reveal|dream|messenger|warn/i }].forEach((aggregate) => {
      const connectedNodes = nodes.filter((item) => aggregate.pattern.test(journeyNodeSearchText(item))).map((item) => item.nodeName);
      const aggregatePaths = paths.filter((item) => aggregate.pattern.test(journeyPathSearchText(item)));
      const aggregateGraph = graph.filter((item) => aggregate.pattern.test([item.node, item.type, item.sourcePhrase, item.derivedMeaning, item.sourceGrounding, item.relationships, item.evidence].flat(Infinity).join(" ")));
      const aggregateGraphLabels = uniqueStudyList(aggregateGraph.flatMap((item) => [item.node, ...asArray(item.relatedNodes)]));
      aggregatePaths.forEach((item) => connectedNodes.push(item.fromNode, item.toNode));
      aggregateGraph.forEach((item) => connectedNodes.push(item.node, ...asArray(item.relatedNodes)));
      nodes.forEach((item) => {
        const nodeName = journeyNodeCanonicalName(item.nodeName).toLowerCase();
        if (aggregateGraphLabels.some((value) => {
          const graphName = journeyNodeCanonicalName(value).toLowerCase();
          return graphName.length >= 4 && (nodeName.includes(graphName) || graphName.includes(nodeName));
        })) connectedNodes.push(item.nodeName);
      });
      addHub({
        hubName: aggregate.hubName,
        hubType: aggregate.hubType,
        connectedNodes,
        connectedPaths: aggregatePaths.map(pathLabel),
        aggregate: true,
        whyCentral: `${aggregate.hubName} connects multiple grounded current-scope destinations and path relationships.`,
        supportingRecords: uniqueStudyList([
          ...aggregatePaths.flatMap((item) => item.supportingRecords),
          ...aggregateGraph.flatMap((item) => [item.sourcePhrase, item.derivedMeaning, item.sourceGrounding, ...asArray(item.evidence)])
        ]),
        provenance: "Journey Nodes / Journey Paths / Knowledge Graph",
        evidenceWeight: "Derived Semantic Evidence / Relationship Inference",
        derivedMeaning: `${aggregate.hubName} is a derived convergence label for existing grounded records; it does not add events, doctrine, or automatic traversal.`,
        reasoningPath: ["Approved hub theme selected", "Matching current-scope Journey Nodes collected", "Matching Journey Paths collected", "Minimum convergence threshold applied"],
        sourceGrounding: `Derived only from existing current-scope Journey Nodes and Journey Paths in ${currentStudyScopeLabel()}.`,
        confidence: "probable"
      });
    });

    return Array.from(hubs.values()).map((item) => ({
      ...item,
      provenance: `I.C.E. Journey Hubs derived from ${item.provenanceSources.join(", ") || "current scoped semantic records"}`,
      evidenceWeight: item.evidenceWeights.join(" / ") || "Derived Semantic Evidence / Relationship Inference",
      whyCentral: item.whyCentral || `${item.hubName} is a grounded convergence point within ${item.activeScope}.`,
      derivedMeaning: item.derivedMeaning || `${item.hubName} connects ${item.connectedNodes.length} grounded Journey Nodes through ${item.connectedPaths.length} current-scope Journey Paths.`,
      reasoningPath: uniqueStudyList([...item.reasoningPath, "Connected destinations verified as existing Journey Nodes", "Hub remains derived, informational, and current-scope only"]).slice(0, 10),
      sourceGrounding: item.sourceGrounding || `Derived from ${item.supportingRecords.join("; ")} within ${item.activeScope}.`
    })).sort((left, right) => right.convergenceScore - left.convergenceScore || left.hubName.localeCompare(right.hubName)).slice(0, 16);
  }

  function journeyHubSearchText(item = {}) {
    return [item.hubName, item.hubType, item.connectedNodes, item.connectedPaths, item.whyCentral, item.scopeBoundary, item.activeScope, item.sourcePhrase, item.derivedMeaning, item.provenance, item.evidenceWeight, item.reasoningPath, item.supportingRecords, item.sourceGrounding, item.confidence].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createJourneyHubCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card journey-hub-card";
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    const divineContext = hasDivineDisplayContext([item.hubName, item.connectedNodes, item.whyCentral, item.sourcePhrase, item.derivedMeaning]);
    heading.textContent = renderDerivedSemanticDisplayText(item.hubName || "Journey Hub", divineContext);
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = [item.hubType || "Event", `${item.connectedNodes.length} connected node(s)`, item.activeScope, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createPassageFunctionSection("Hub Name", item.hubName || "Journey Hub", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hub Type", item.hubType || "Event", { preserveExact: true }),
      createPassageFunctionSection("Connected Nodes", "", { list: asArray(item.connectedNodes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Connected Paths", "", { list: asArray(item.connectedPaths), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why Central", item.whyCentral || "Grounded convergence point in the current Study Scope.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope Boundary", item.scopeBoundary || "Current Study Scope only.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Journey Hubs", { preserveExact: true }),
      createPassageFunctionSection("Evidence Weight", "", { list: semanticEvidenceWeightLines({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference", evidenceStrength: "hub emitted only after a minimum grounded convergence threshold", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: item.supportingRecords, sourcePhrase: item.sourcePhrase }), plainList: true, preserveExact: true, summaryLabel: "Evidence Weight" }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true, summaryLabel: "Reasoning Path" }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Derived from current scoped semantic records.", { collapsed: true, summaryLabel: "Show Evidence", divineContext, preferHolySpirit: true }),
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Journey Hubs", label: item.hubName || "Journey Hub", layer: "Journey Hubs / ICE_JOURNEY_HUBS", storageKey: "Not persisted in Phase 9.3c", scopePath: item.activeScope, rule: "Journey Hubs identify grounded convergence points only. They do not add visualization, traversal controls, automatic navigation, crawling, analysis, or scope changes." })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderJourneyHubs(term) {
    const container = document.getElementById("journeyHubsCards");
    const count = document.getElementById("journeyHubsCount");
    if (!container || !count) return;
    const records = journeyHubRecords();
    const normalizedTerm = normalizeText(term).toLowerCase();
    const filtered = records.filter((item) => matchesSearchQuery(journeyHubSearchText(item), term)).sort((left, right) => {
      if (!normalizedTerm) return right.convergenceScore - left.convergenceScore;
      const rank = (item) => {
        const name = normalizeText(item.hubName).toLowerCase();
        if (name === normalizedTerm) return 0;
        if (name.includes(normalizedTerm)) return 1;
        return 2;
      };
      return rank(left) - rank(right) || right.convergenceScore - left.convergenceScore;
    });
    clearElement(container);
    count.textContent = `${filtered.length} journey hub(s)`;
    if (!records.length) {
      appendEmpty(container, "No grounded Journey Hubs meet the current-scope convergence threshold.");
      return;
    }
    container.appendChild(createCard("Journey Hubs", [`Derived records: ${records.length}`, "Layer identifier: ICE_JOURNEY_HUBS", "Purpose: identify major grounded convergence points across existing Journey Nodes and Journey Paths.", "Boundary: records only; no visualization, traversal controls, automatic navigation, crawling, or automatic analysis."].join("\n"), "derived journey hub layer"));
    if (!filtered.length) {
      appendEmpty(container, "No Journey Hubs match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createJourneyHubCard(item)));
    if (filtered.length > DISPLAY_LIMIT) appendEmpty(container, `${filtered.length - DISPLAY_LIMIT} more journey hub(s) hidden by the preview limit. Use panel search to focus a convergence point.`);
  }
  function principleNetworkSearchText(item = {}) {
    return [
      item.corePrinciple,
      item.relatedPrinciples,
      item.commands,
      item.applications,
      item.promises,
      item.warnings,
      item.consequences,
      item.themes,
      item.authorityContext,
      item.characterExamples,
      item.currentScope,
      item.futureLibraryConnections,
      item.speaker,
      item.canonicalIdentity,
      item.audience,
      item.provenance,
      item.evidenceWeight,
      item.reasoningPath,
      item.sourcePhrase,
      item.derivedMeaning,
      item.evidence,
      item.sourceGrounding,
      item.confidence
    ].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function principleNetworkTitle(item = {}) {
    return item.corePrinciple ? `${item.corePrinciple} Network` : "Principle Network";
  }

  function createPrincipleNetworkCard(item = {}) {
    const card = document.createElement("article");
    card.className = "study-card semantic-card principle-network-card";
    assignSemanticCardTarget(card, "principleNetwork", item, item.corePrinciple || item.id || "principle-network");
    const header = document.createElement("header");
    header.className = "semantic-card-header";
    const heading = document.createElement("h3");
    heading.textContent = renderDerivedSemanticDisplayText(principleNetworkTitle(item), hasDivineDisplayContext([item.speaker, item.canonicalIdentity, item.corePrinciple, item.relatedPrinciples]));
    const range = document.createElement("div");
    range.className = "semantic-card-range";
    range.textContent = ["ICE_PRINCIPLE_NETWORKS", item.verseRange || item.currentScope || item.scopePath, displayConfidence(item.confidence || "probable")].filter(Boolean).join(" | ");
    const body = document.createElement("div");
    body.className = "semantic-card-body";
    const divineContext = hasDivineDisplayContext([item.speaker, item.canonicalIdentity, item.corePrinciple, item.relatedPrinciples, item.sourcePhrase, item.derivedMeaning, item.evidence]);
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: item.provenance || "I.C.E. Principle Network", label: principleNetworkTitle(item), layer: "Principle Networks", storageKey: "ICE_PRINCIPLE_NETWORKS", scopePath: item.scopePath || item.verseRange, rule: "Principle network labels are generated from existing Teaching Semantics, Principle Relationships, Character Interactions, Knowledge Graph, Session Continuity, and Resolution Explanation records; no doctrine or future source link is invented." }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference", evidenceStrength: "network neighborhood derived from existing semantic records only", sourceGrounding: item.sourceGrounding || item.derivedMeaning, supportingRecords: [...asArray(item.evidence), ...asArray(item.relatedPrinciples), ...asArray(item.relatedTeachingSemantics), ...asArray(item.relatedPrincipleRelationships)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Core Principle", item.corePrinciple || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Principles", "", { list: asArray(item.relatedPrinciples), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Commands", "", { list: asArray(item.commands), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Applications", "", { list: asArray(item.applications), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Promises", "", { list: asArray(item.promises), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Warnings", "", { list: asArray(item.warnings), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Consequences", "", { list: asArray(item.consequences), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Themes", "", { list: asArray(item.themes), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Speaker", item.speaker || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Canonical/source identity", item.canonicalIdentity || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Audience", item.audience || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Context", item.authorityContext || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Character Examples", "", { list: asArray(item.characterExamples), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Current Scope", item.currentScope || "Current source", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Future Library Connections", item.futureLibraryConnections || "Awaiting analysis; no cross-library source links generated yet.", { preserveExact: true }),
      createPassageFunctionSection("Provenance", item.provenance || "I.C.E. Principle Network", { preserveExact: true }),
      createPassageFunctionSection("Evidence Weight", item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference", { preserveExact: true }),
      createPassageFunctionSection("Reasoning Path", "", { list: asArray(item.reasoningPath), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: asArray(item.evidence).slice(0, 8), hiddenCount: Math.max(0, asArray(item.evidence).length - 8), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "principleNetwork"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show grounding", divineContext, preferHolySpirit: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function renderPrincipleNetworks(term) {
    const container = document.getElementById("principleNetworksCards");
    const count = document.getElementById("principleNetworksCount");
    if (!container || !count) return;
    const records = scopedSemanticRecords(studyData.principleNetworks);
    const filtered = records.filter((item) => matchesSearchQuery(principleNetworkSearchText(item), term));
    clearElement(container);
    count.textContent = `${filtered.length} network(s)`;
    if (records.length === 0) {
      appendEmpty(container, "No principle network records derived yet.");
      return;
    }
    container.appendChild(createCard(
      "Principle Networks",
      [
        `Derived records: ${records.length}`,
        "Layer: ICE_PRINCIPLE_NETWORKS",
        "Purpose: review the semantic neighborhood around each principle: related principles, commands, applications, promises, warnings, consequences, themes, authority context, and character examples.",
        "Boundary: derived review layer only; uses existing semantic graph records and does not invent doctrine, crawl, or create future-library links."
      ].join("\n"),
      "derived principle network layer"
    ));
    if (filtered.length === 0) {
      appendEmpty(container, "No principle network records match current filter.");
      return;
    }
    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createPrincipleNetworkCard(item)));
  }
  function semanticContinuitySearchText(item = {}) {
    return [
      item.continuedEntity,
      item.continuityType,
      item.chapterTransition,
      item.continuedAuthorityPath,
      item.continuedRevelationPattern,
      item.continuedOntologyRole,
      item.continuedMissionPurpose,
      item.verseRange,
      item.scopePath,
      asArray(item.continuity).join(" "),
      asArray(item.authorityContinuity).join(" "),
      asArray(item.relatedEntities).join(" "),
      asArray(item.evidence).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function semanticContinuityTypeLabel(type) {
    const normalized = normalizeText(type || "semantic_continuity").toLowerCase();
    const labels = new Map([
      ["continued_authority_revelation_relationship", "continued authority / revelation relationship"],
      ["continued_child_identity_and_mission_preservation", "continued CHILD / mission preservation"],
      ["continued_prophecy_fulfillment_chain", "continued prophecy fulfillment chain"],
      ["adversarial_escalation_against_mission_preservation", "adversarial escalation / mission preservation"]
    ]);
    return labels.get(normalized) || passageFunctionTitle(type || "semantic_continuity");
  }

  function createSemanticContinuityCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.continuedEntity, item.continuedAuthorityPath, item.continuedMissionPurpose, item.relatedEntities, item.evidence]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);

    card.className = "study-card semantic-card semantic-continuity-card";
    assignSemanticCardTarget(card, "continuity", item, `${item.continuedEntity || ""}-${item.continuityType || ""}`);
    header.className = "semantic-card-header";
    heading.textContent = renderDerivedSemanticDisplayText(item.continuedEntity || "Semantic Continuity", divineContext);
    range.className = "semantic-card-range";
    range.textContent = [item.chapterTransition, semanticContinuityTypeLabel(item.continuityType), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Continued Entity", item.continuedEntity || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Chapter Transition", item.chapterTransition || "Not recorded."),
      createPassageFunctionSection("Continuity", "", { list: asArray(item.continuity).map((value) => renderDerivedSemanticDisplayText(value, divineContext)), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Continuity", item.continuedAuthorityPath || asArray(item.authorityContinuity).join(" -> ") || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Revelation Pattern", item.continuedRevelationPattern || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Ontology Role", item.continuedOntologyRole || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Mission / Purpose", item.continuedMissionPurpose || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "continuity", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "continuity"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.continuedEntity, item.continuedAuthorityPath, item.continuedMissionPurpose]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: hierarchyEntityLines(entities), plainList: true }),
      createPassageFunctionSection("Source Grounding", trimText(item.sourceGrounding || "", 220) || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderSemanticContinuity(term) {
    const container = document.getElementById("semanticContinuityCards");
    const count = document.getElementById("semanticContinuityCount");
    const records = scopedSemanticRecords(studyData.semanticContinuity);
    const filtered = records.filter((item) => matchesSearchQuery(semanticContinuitySearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} continuity record(s)`;

    if (records.length === 0) {
      appendEmpty(container, "No cross-chapter semantic continuity derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No cross-chapter semantic continuity records match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Cross-Chapter Semantic Continuity",
      [
        `Derived records: ${records.length}`,
        `Layer: ICE_SEMANTIC_CONTINUITY`,
        "Purpose: identify conservative continuity between chapter semantic layers using current source-grounded entities, authority paths, revelation patterns, ontology roles, and passage functions.",
        "Review posture: inspect continued entity, authority path, revelation pattern, ontology role, mission/purpose, transition, accuracy, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createSemanticContinuityCard(item));
    });
  }
  function semanticAmbiguitySearchText(item = {}) {
    return [
      asArray(item.semanticItems).join(" "),
      item.ambiguityType,
      item.sourceWording,
      item.derivedInterpretation,
      item.resolutionStatus,
      item.verseRange,
      item.scopePath,
      asArray(item.evidence).join(" "),
      asArray(item.relatedLayers).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function semanticAmbiguityRelationshipKind(type) {
    const normalized = normalizeText(type || "semantic_relationship").toLowerCase();
    if (normalized === "opposed_by") return "opposed by";
    if (normalized === "source_wording_for") return "source wording for";
    if (normalized === "derived_meaning_for") return "derived meaning for";
    if (normalized === "deceptive_worship_language_vs_hostile_intent") return "contrasted with";
    if (normalized === "protective_obedience_vs_hostile_deception") return "contrasted with";
    if (normalized === "title_office_not_revealed_name") return "distinguished from";
    if (normalized === "human_narration_vs_divine_authority_source") return "distinguished from";
    if (normalized === "source_wording_vs_derived_display_preference") return "source wording for";
    return "as related with";
  }

  function semanticAmbiguityRelationshipTypeLabel(type) {
    const normalized = normalizeText(type || "semantic_relationship").toLowerCase();
    if (normalized === "opposed_by") return "opposed by";
    if (normalized === "source_wording_for") return "source wording for";
    if (normalized === "derived_meaning_for") return "derived meaning for";
    if (normalized === "narrative_name_vs_canonical_identity") return "narrative NAME related with canonical/source identity";
    if (normalized === "title_office_not_revealed_name") return "title/office distinguished from revealed NAME";
    if (normalized === "source_wording_vs_derived_display_preference") return "source phrase related with derived display";
    if (normalized === "human_narration_vs_divine_authority_source") return "Human narration distinguished from Divine authority source";
    if (normalized === "pronoun_referent_requires_semantic_context") return "pronoun referent requires semantic context";
    if (normalized === "deceptive_worship_language_vs_hostile_intent") return "deceptive worship language contrasted with hostile intent";
    if (normalized === "protective_obedience_vs_hostile_deception") return "protective obedience contrasted with hostile deception";
    return passageFunctionTitle(type || "semantic_relationship");
  }

  function semanticAmbiguityDisplayTitle(item = {}) {
    const items = asArray(item.semanticItems).map((value) => normalizeText(value)).filter(Boolean);
    const type = normalizeText(item.ambiguityType || "").toLowerCase();
    if (items.length === 0) return "Semantic Relationship / Distinction";
    if (type === "narrative_name_vs_canonical_identity" && items.length >= 2) return `${items[0]} narrative NAME related with ${items[1]} canonical identity`;
    if (type === "title_office_not_revealed_name" && items.length >= 2) return `${items[0]} title distinguished from revealed NAME ${items[1]}`;
    if (type === "source_wording_vs_derived_display_preference" && items.length >= 2) return `${items[0]} source phrase related with ${items[1]} derived display`;
    if (items.length === 1) return items[0];
    return `${items[0]} ${semanticAmbiguityRelationshipKind(type)} ${items.slice(1).join(", ")}`;
  }
  function semanticAmbiguityResolutionLabel(status) {
    const normalized = normalizeText(status || "resolved").toLowerCase();
    if (normalized === "context_required") return "context required";
    if (normalized === "unresolved") return "unresolved";
    return "resolved";
  }

  function semanticAmbiguityWhyItMatters(item = {}) {
    const type = normalizeText(item.ambiguityType || "").toLowerCase();
    if (type === "narrative_name_vs_canonical_identity") return "Prevents the app from implying Joseph named JESUS CHRIST.";
    if (type === "title_office_not_revealed_name") return "Prevents CHRIST from being treated as the revealed NAME in Matthew 1:21.";
    if (type === "source_wording_vs_derived_display_preference") return "Preserves quoted source wording while allowing HOLY SPIRIT as the derived semantic display.";
    if (type === "human_narration_vs_divine_authority_source") return "Keeps scripture narrator and prophet as Class III - Human while preserving THE LORD as Divine authority source.";
    if (type === "pronoun_referent_requires_semantic_context") return "Prevents pronouns from being exalted or assigned by proximity when Joseph, Mary, and JESUS are all nearby.";
    return "Keeps semantically different items from collapsing into one generalized relationship bucket.";
  }

  function semanticAmbiguityDerivedLines(item = {}) {
    const type = normalizeText(item.ambiguityType || "").toLowerCase();
    if (type === "narrative_name_vs_canonical_identity") return [
      "JESUS = revealed NAME",
      "JESUS CHRIST = canonical/source identity"
    ];
    if (type === "title_office_not_revealed_name") return [
      "CHRIST = title/source identity and messianic office",
      "JESUS = revealed NAME Joseph is instructed to give"
    ];
    if (type === "source_wording_vs_derived_display_preference") return [
      "Holy Ghost = preserved source phrase wording",
      "HOLY SPIRIT = preferred derived semantic display"
    ];
    if (type === "human_narration_vs_divine_authority_source") return [
      "scripture narrator = Class III - Human narration",
      "THE LORD = Divine authority source"
    ];
    if (type === "pronoun_referent_requires_semantic_context") return [
      "he / him / his require semantic referent resolution",
      "do not assign pronouns by proximity alone"
    ];
    if (type === "deceptive_worship_language_vs_hostile_intent") return [
      "Herod worship language = deceptive speech in context",
      "destroy-him wording = hostile intent toward CHILD/JESUS"
    ];
    if (type === "protective_obedience_vs_hostile_deception") return [
      "protective obedience = Joseph follows Divine warning",
      "Divine preservation = CHILD/JESUS protected through movement"
    ];
    return [item.derivedInterpretation || "Not recorded."];
  }

  function createSemanticAmbiguityCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const layers = asArray(item.relatedLayers).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.semanticItems, item.sourceWording, item.derivedInterpretation, item.evidence, item.sourceGrounding]);
    const title = semanticAmbiguityDisplayTitle(item);
    const grounding = trimText(item.sourceGrounding || "", 190);
    const derivedLines = semanticAmbiguityDerivedLines(item);

    card.className = "study-card semantic-card semantic-ambiguity-card";
    assignSemanticCardTarget(card, "ambiguity", item, title);
    header.className = "semantic-card-header";
    heading.textContent = "Semantic Relationship";
    range.className = "semantic-card-range";
    range.textContent = [renderDerivedSemanticDisplayText(title, divineContext), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Relationship", title, { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Relationship Type", semanticAmbiguityRelationshipTypeLabel(item.ambiguityType), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourceWording || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", "", { list: derivedLines, plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Resolved?", semanticAmbiguityResolutionLabel(item.resolutionStatus), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Why It Matters", semanticAmbiguityWhyItMatters(item), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createSemanticResolutionTraceSection(item, "ambiguity"),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding / Evidence", "", { collapsed: true, summaryLabel: "Show grounding evidence", list: evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item })), divineContext }),
      createPassageFunctionSection("Related Layers", "", { collapsed: true, list: layers, plainList: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }
  function renderSemanticAmbiguities(term) {
    const container = document.getElementById("semanticAmbiguityCards");
    const count = document.getElementById("semanticAmbiguityCount");
    const ambiguities = asArray(studyData.semanticAmbiguities);
    const filtered = ambiguities.filter((item) => matchesSearchQuery(semanticAmbiguitySearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} relationship(s)`;

    if (ambiguities.length === 0) {
      appendEmpty(container, "No semantic ambiguities or contrasts derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No semantic ambiguities or contrasts match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Semantic Ambiguities / Contrasts",
      [
        `Derived records: ${ambiguities.length}`,
        `Layer: ICE_SEMANTIC_AMBIGUITIES`,
        "Purpose: identify relationship-aware distinctions, source/derived pairings, canonical links, and true oppositions without fabricating contradictions.",
        "Review posture: inspect semantic items, relationship type, source phrase, derived meaning, resolution status, accuracy, evidence, and grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createSemanticAmbiguityCard(item));
    });
  }
  function originAuthorityPathSearchText(item = {}) {
    return [
      item.pathType,
      item.verseRange,
      item.scopePath,
      item.origin,
      item.messenger,
      item.means,
      item.recipient,
      item.response,
      item.result,
      item.mission,
      item.sourceEntity,
      item.targetEntity,
      item.authorityClass,
      item.recipientClass,
      asArray(item.relatedEntities).join(" "),
      asArray(item.relatedSemanticEvents).join(" "),
      asArray(item.relatedRevelationPatterns).join(" "),
      asArray(item.relatedPassageFunctions).join(" "),
      asArray(item.evidence).join(" "),
      item.confidence,
      item.sourceGrounding,
      item.principleText,
      item.contextSnippet,
      item.sourceTitle
    ].join(" ");
  }

  function originAuthorityPathRelatedEntities(item = {}) {
    return passageFunctionOrderedEntities(item.relatedEntities).map((entry) => entry.display);
  }

  function originAuthorityPathLabel(value) {
    const normalized = normalizeText(value || "origin_authority_path").toLowerCase();
    if (normalized === "divine_message_to_obedient_response") return "Divine origin -> messenger -> obedient Human response";
    return passageFunctionTitle(value || "origin_authority_path");
  }

  function createOriginAuthorityPathCard(item) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.origin, item.messenger, item.result, item.mission, item.relatedEntities, item.evidence, item.sourceGrounding]);
    const shownEvidence = evidence.slice(0, 3).map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const fullEvidence = evidence.map((value) => sourceDerivedDisplayBlock(value, derivedMeaningFromSourcePhrase(value, item), { divineContext, context: item }));
    const entities = originAuthorityPathRelatedEntities(item);
    const functions = asArray(item.relatedPassageFunctions).map((value) => passageFunctionTitle(value)).filter(Boolean);
    const grounding = trimText(item.sourceGrounding || "", 190);

    card.className = "study-card semantic-card origin-authority-path-card";
    assignSemanticCardTarget(card, "originAuthority", item, item.pathType);
    header.className = "semantic-card-header";
    heading.textContent = "Origin / Authority Path";
    range.className = "semantic-card-range";
    range.textContent = [originAuthorityPathLabel(item.pathType), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
            createClassTransferDisplaySection(item),
      createPassageFunctionSection("Origin", item.origin || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Messenger / Means", [item.messenger, item.means].filter(Boolean).join(" / ") || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Recipient", item.recipient || "Not recorded."),
      createPassageFunctionSection("Response", item.response || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Result", item.result || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Mission / Fulfillment", item.mission || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Key Evidence", "", { list: shownEvidence, hiddenCount: Math.max(0, evidence.length - shownEvidence.length), divineContext }),
      evidence.length > shownEvidence.length ? createPassageFunctionSection("Full Evidence", "", { collapsed: true, summaryLabel: "Show full evidence", list: fullEvidence, divineContext }) : null,
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "originAuthority", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "originAuthority"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Hierarchy", "", { collapsed: true, list: [item.authorityClass, item.recipientClass].filter(Boolean), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Entities", "", { collapsed: true, list: primaryEntityDistinctionLines(item.relatedEntities, [item.pathType, item.verseRange, item.response, item.result, item.mission]), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Passage Functions", "", { collapsed: true, list: functions, plainList: true }),
      createPassageFunctionSection("Source Grounding", grounding || "Not recorded.", { collapsed: true, summaryLabel: "Show semantic grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderOriginAuthorityPaths(term) {
    const container = document.getElementById("originAuthorityPathCards");
    const count = document.getElementById("originAuthorityPathCount");
    const paths = asArray(studyData.originAuthorityPaths);
    const filtered = paths.filter((item) => matchesSearchQuery(originAuthorityPathSearchText(item), term));

    if (!container || !count) return;
    clearElement(container);
    count.textContent = `${filtered.length} path(s)`;

    if (paths.length === 0) {
      appendEmpty(container, "No origin / authority paths derived yet.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No origin / authority paths match current filter.");
      return;
    }

    container.appendChild(createCard(
      "Origin / Authority Paths",
      [
        `Derived records: ${paths.length}`,
        `Layer: ICE_ORIGIN_AUTHORITY_PATHS`,
        "Purpose: distinguish grammar, capitalization, origin, messenger path, Human response, and divine causality without flattening them into one action.",
        "Review posture: inspect origin, messenger/means, recipient, response, result, mission, evidence, accuracy, and source grounding."
      ].join("\n"),
      "derived semantic layer"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createOriginAuthorityPathCard(item));
    });
  }
  function sourceDiscoverySearchText(item) {
    return [
      item.refType,
      item.linkText,
      item.href,
      item.sourceElement,
      item.structuralRole,
      item.surroundingText,
      item.genericDiscoveryTier,
      item.lowValueReason,
      item.semanticUsefulnessScore,
      item.adapterMode,
      item.verseRef,
      item.scopePath,
      item.confidence
    ].join(" ");
  }

  function sourceDiscoveryTypeCounts(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.refType || "external_link";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function sourceDiscoveryPreviewRank(item = {}) {
    const refType = item.refType || "external_link";
    const scopePath = normalizeText(item.scopePath || item.fromScopePath || "").toLowerCase();
    if (item.hiddenByDefault) return 120;
    if (Number(item.semanticUsefulnessScore || 0) >= 70) return 5;
    if (refType === "study_note") return 10;
    if (/\.(?:verse|chapter)\./.test(scopePath) || item.verseRef) return 20;
    if (refType === "cross_reference") return 30;
    if (["chapter_nav", "source_collection", "table_of_contents", "related_content"].includes(refType)) return 40;
    if (refType === "media") return 80;
    return 90;
  }

  function sortSourceDiscoveryForPreview(items) {
    return [...items].sort((left, right) =>
      sourceDiscoveryPreviewRank(left) - sourceDiscoveryPreviewRank(right) ||
      normalizeText(left.scopePath || left.verseRef || "").localeCompare(normalizeText(right.scopePath || right.verseRef || ""), undefined, { numeric: true }) ||
      normalizeText(left.linkText || left.href || "").localeCompare(normalizeText(right.linkText || right.href || ""))
    );
  }

  function renderSourceDiscovery(term) {
    const container = document.getElementById("sourceDiscoveryCards");
    const count = document.getElementById("sourceDiscoveryCount");
    const refs = asArray(studyData.sourceDiscoveryIndex);
    const filtered = refs.filter((item) => matchesSearchQuery(sourceDiscoverySearchText(item), term));
    const genericMode = isGenericAdapterMode();
    const visibleFiltered = genericMode ? filtered.filter((item) => !item.hiddenByDefault) : filtered;
    const hiddenFiltered = genericMode ? filtered.filter((item) => item.hiddenByDefault) : [];
    const scopedCount = refs.filter((item) => item.scopePath).length;
    const typeCounts = sourceDiscoveryTypeCounts(genericMode ? refs.filter((item) => !item.hiddenByDefault) : refs);
    const hiddenTotal = genericMode ? refs.filter((item) => item.hiddenByDefault).length : 0;

    clearElement(container);
    count.textContent = genericMode ? `${visibleFiltered.length} shown / ${hiddenFiltered.length} collapsed` : `${filtered.length} refs`;

    if (refs.length === 0) {
      appendEmpty(container, "No current-page source references discovered.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No source discovery refs match.");
      return;
    }

    container.appendChild(createCard(
      genericMode ? "Generic Web Source Discovery" : "Source Discovery",
      [
        `Mode: ${adapterModeLabel(studyData.activeAdapter)}`,
        genericMode ? "Filtering: low-value generic media/search chrome is collapsed by default." : "Filtering: scripture/source references preserve adapter-specific behavior.",
        `Total discovered refs: ${refs.length}`,
        genericMode ? `Shown semantic refs: ${refs.length - hiddenTotal}` : "",
        genericMode ? `Collapsed low-value generic refs: ${hiddenTotal}` : "",
        `Scoped refs: ${scopedCount}`,
        `Adapter: ${studyData.activeAdapter?.adapterName || "unknown"}`,
        typeCounts.map(([type, value]) => `${type}: ${value}`).join("\n")
      ].filter(Boolean).join("\n"),
      genericMode ? "generic HTML semantic indexing" : "current-page only"
    ));

    if (genericMode && hiddenFiltered.length > 0) {
      container.appendChild(createCard(
        "Collapsed Generic Media / Search Chrome",
        hiddenFiltered.slice(0, 6).map((item) => [
          trimText(item.linkText || item.href || "generic ref", 90),
          item.refType || "external_link",
          item.lowValueReason || "low semantic usefulness",
          `score: ${item.semanticUsefulnessScore ?? "n/a"}`
        ].join(" | ")).join("\n"),
        `${hiddenFiltered.length} low-confidence generic item(s) collapsed`
      ));
    }

    sortSourceDiscoveryForPreview(visibleFiltered).slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createCard(
        item.linkText || item.href || "Source ref",
        [
          `Type: ${item.refType || "external_link"}`,
          genericMode ? `Generic semantic tier: ${item.genericDiscoveryTier || "generic_semantic_candidate"}` : "",
          genericMode ? `Semantic usefulness: ${item.semanticUsefulnessScore ?? "not scored"}` : "",
          item.structuralRole ? `Structure: ${item.structuralRole}` : "",
          item.scopePath ? `Scope: ${item.scopePath}` : "Scope: unscoped",
          item.verseRef ? `Verse: ${item.verseRef}` : "",
          `Href: ${trimText(item.href || "", 120)}`,
          item.sourceElement ? `Element: ${item.sourceElement}` : ""
        ].filter(Boolean).join("\n"),
        genericMode ? `Generic indexing ${displayAppConfidence(item.confidence || "possible")}` : displayAppConfidence(item.confidence || "possible")
      ));
    });
  }

  function capitalizeWord(value) {
    const text = normalizeText(value || "");
    if (!text) return "";
    return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
  }

  function referenceScopeLabel(item = {}) {
    const scopePath = normalizeScopeList(item.scopes, { fromScopePath: item.fromScopePath || item.scopePath || item.scope || "" })[0] || "";
    const scriptureMatch = scopePath.match(/^scripture\.nt\.([^.]+)\.(\d+)\.(?:verse|note)\.(\d+)/i);
    if (scriptureMatch) {
      return `${capitalizeWord(scriptureMatch[1])} ${scriptureMatch[2]}:${scriptureMatch[3]}`;
    }

    const chapterMatch = scopePath.match(/^scripture\.nt\.([^.]+)\.(\d+)\.chapter/i);
    if (chapterMatch) {
      return `${capitalizeWord(chapterMatch[1])} ${chapterMatch[2]} chapter navigation`;
    }

    const genericMatch = scopePath.match(/^generic\.page\.section\.(\d+)\.paragraph\.(\d+)/i);
    if (genericMatch) return `Section ${genericMatch[1]}, paragraph ${genericMatch[2]}`;

    return scopePath || trimText(item.fromText || "Current page", 70);
  }

  function referenceRelationshipLabel(type) {
    const labels = new Map([
      ["has_study_note", "study note"],
      ["has_cross_reference", "cross reference"],
      ["has_media_reference", "media reference"],
      ["has_chapter_navigation", "chapter navigation"],
      ["has_table_of_contents_link", "table of contents"],
      ["has_source_collection_link", "source collection"],
      ["has_external_reference", "external reference"]
    ]);

    return labels.get(type || "") || type || "reference";
  }

  function referenceGraphSearchText(item) {
    const scopeLabel = referenceScopeLabel(item);
    return [
      item.relationshipType,
      item.refType,
      item.fromScopePath,
      scopeLabel,
      item.fromText,
      item.toText,
      item.toHref,
      item.confidence
    ].join(" ");
  }

  function referenceGraphTypeCounts(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.relationshipType || "has_external_reference";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function groupReferenceGraphByScope(items) {
    const groups = new Map();
    for (const item of items) {
      const key = referenceScopeLabel(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }

    return Array.from(groups.entries())
      .map(([scopeLabel, edges]) => ({ scopeLabel, edges }))
      .sort((a, b) => a.scopeLabel.localeCompare(b.scopeLabel, undefined, { numeric: true }));
  }

  function referenceEdgePreview(item) {
    const target = trimText(item.toText || item.toHref || "reference", 72);
    return [
      `${referenceRelationshipLabel(item.relationshipType)}: ${target}`,
      `fromScopePath: ${item.fromScopePath || "unscoped"}`,
      `relationshipType: ${item.relationshipType || "has_external_reference"}`,
      displayAppConfidence(item.confidence || "possible")
    ].join("\n");
  }

  function renderReferenceGraph(term) {
    const container = document.getElementById("referenceGraphCards");
    const count = document.getElementById("referenceGraphCount");
    const edges = asArray(studyData.referenceGraph);
    const filtered = edges.filter((item) => matchesSearchQuery(referenceGraphSearchText(item), term));
    const relationshipCounts = referenceGraphTypeCounts(edges);
    const grouped = groupReferenceGraphByScope(filtered);

    clearElement(container);
    count.textContent = `${filtered.length} edges`;

    if (edges.length === 0) {
      appendEmpty(container, "No reference graph edges detected.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No reference graph edges match.");
      return;
    }

    container.appendChild(createCard(
      "Counts by Relationship Type",
      [
        `Total reference edges: ${edges.length}`,
        relationshipCounts.map(([type, value]) => `${type}: ${value}`).join("\n")
      ].filter(Boolean).join("\n"),
      "derived from current-page source discovery"
    ));

    grouped.slice(0, DISPLAY_LIMIT).forEach((group) => {
      const preview = group.edges.slice(0, 4)
        .map(referenceEdgePreview)
        .join("\n\n");
      const hidden = group.edges.length > 4
        ? `\n\n${group.edges.length - 4} more edge(s) hidden in this scope.`
        : "";

      container.appendChild(createCard(
        group.scopeLabel,
        `${preview}${hidden}`,
        `${group.edges.length} edge(s)`
      ));
    });

    if (grouped.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${grouped.length - DISPLAY_LIMIT} more scope group(s) hidden by preview limit.`);
    }
  }
  function renderDomSemanticHints(term) {
    const container = document.getElementById("domSemanticHintCards");
    const count = document.getElementById("domSemanticHintCount");
    const hints = asArray(studyData.domSemanticHints);
    const filtered = hints.filter((item) => matchesSearchQuery(domSemanticHintSearchText(item), term));

    clearElement(container);
    count.textContent = `${filtered.length} total`;

    if (filtered.length === 0) {
      appendEmpty(container, hints.length === 0 ? "No DOM semantic hints detected." : "No DOM semantic hints match.");
      return;
    }

    container.appendChild(createCard(
      "Hint Types",
      domHintSummary(filtered),
      "optional source DOM enrichment"
    ));

    const preview = filtered.slice(0, 5).map((item) => {
      const ref = item.verseRef || item.verseNumber || "no verse ref";
      return `${item.hintType || "hint"}: ${trimText(item.text, 70)} / ${ref} / ${item.source || "dom"} / App accuracy: ${displayConfidence(item.confidence || "source-markup")}${item.originalText ? ` / original: ${item.originalText}` : ""}${item.entityClass ? ` / Class ${item.entityClass}` : ""}`;
    }).join("\n");
    container.appendChild(createCard(
      "DOM Hint Preview",
      preview,
      `${Math.max(filtered.length - 5, 0)} more hidden by preview limit`
    ));
  }
  function mentionSummary(items, keyName) {
    const counts = new Map();
    for (const item of items) {
      const key = item[keyName] || "unclassified";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }

  function mentionClassSummary(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.entityClass ? entityClassLabel(item.entityClass) : "Unclassified";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }

  function renderMentionIndex(term) {
    const container = document.getElementById("mentionIndexCards");
    const count = document.getElementById("mentionIndexCount");
    const mentions = asArray(studyData.mentionIndex);
    const filtered = mentions.filter((item) => matchesSearchQuery(mentionSearchText(item), term));

    clearElement(container);
    count.textContent = `${filtered.length} total`;

    if (filtered.length === 0) {
      appendEmpty(container, "No mention index items match.");
      return;
    }

    container.appendChild(createCard(
      "Mention Types",
      mentionSummary(filtered, "mentionType"),
      "mentions are separate from canonical entities"
    ));
    container.appendChild(createCard(
      "Entity Classes",
      mentionClassSummary(filtered),
      "display classification only"
    ));

    const preview = filtered.slice(0, 5).map((item) => {
      const classLabel = item.entityClass ? entityClassLabel(item.entityClass) : "Unclassified";
      return `${item.mentionText} | ${item.mentionType} | ${classLabel}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""}${item.roleHint ? ` | ${item.roleHint}` : ""}`;
    }).join("\n");
    container.appendChild(createCard("Mention Preview", preview, `${Math.max(filtered.length - 5, 0)} more hidden by preview limit`));
  }
  function renderActors(term) {
    const container = document.getElementById("actorCards");
    const count = document.getElementById("actorCount");
    const actors = Array.isArray(studyData.actorTimelines)
      ? studyData.actorTimelines.map(dedupeActorActions)
      : [];
    const filtered = actors.filter((actor) => {
      const actionText = (actor.orderedActions || [])
        .map((action) => action.eventText)
        .join(" ");
      return includesTerm(`${actor.actorName} ${actionText}`, term);
    });

    renderLimited(container, filtered, count, (actor) => {
      const actions = (actor.orderedActions || [])
        .slice(0, 3)
        .map((action) => `${action.sequenceOrder}. ${trimText(action.eventText, 90)}`)
        .join(" ");

      return createCard(
        actor.actorName,
        actions || "No ordered actions yet.",
        `${actor.orderedActions?.length || 0} action(s)`
      );
    }, "No detected actors match.", "actor");
  }

  function renderOrderedEvents(term) {
    const container = document.getElementById("orderedEventCards");
    const count = document.getElementById("orderedEventCount");
    const events = Array.isArray(studyData.orderedEvents)
      ? studyData.orderedEvents
      : [];
    const filtered = events.filter((eventItem) =>
      itemMatches(eventItem, [
        "eventText",
        "orderingReason",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (eventItem) => createCard(
      `Event ${eventItem.sequenceOrder || ""}`.trim(),
      trimText(eventItem.eventText, 180),
      eventItem.orderingReason || eventItem.sourceTitle || ""
    ), "No ordered events match.");
  }

  function roleName(role) {
    return role?.actorName || "";
  }

  function formatRoleValue(label, role) {
    if (!roleName(role)) return "";
    return `${label}: ${role.actorName} (${displayAppConfidence(role.confidence || "probable")})`;
  }

  function formatRoleList(label, roles) {
    const values = asArray(roles)
      .filter((role) => roleName(role))
      .slice(0, 3)
      .map((role) => `${role.actorName} (${displayAppConfidence(role.confidence || "probable")})`);

    return values.length ? `${label}: ${values.join(", ")}` : "";
  }

  function formatPrincipleFocus(principleFocus) {
    if (!principleFocus?.principleText) return "";
    return `Principle: ${trimText(principleFocus.principleText, 90)} (${displayAppConfidence(principleFocus.confidence || "probable")})`;
  }

  function formatAuthorityChain(authorityChain) {
    const chain = asArray(authorityChain)
      .filter((role) => roleName(role))
      .map((role) => role.actorName);

    return chain.length > 1 ? `Authority: ${chain.join(" -> ")}` : "";
  }
  function sceneRoleSearchText(scene) {
    return [
      roleName(scene.primaryActor),
      roleName(scene.speaker),
      roleName(scene.listener),
      roleName(scene.recipient),
      roleName(scene.target),
      roleName(scene.divineManifestation),
      roleName(scene.concerning),
      roleName(scene.sourceAuthority),
      roleName(scene.orchestrator),
      asArray(scene.authorityChain).map(roleName).join(" "),
      asArray(scene.secondaryActors).map(roleName).join(" "),
      asArray(scene.witness).map(roleName).join(" "),
      asArray(scene.audience).map(roleName).join(" "),
      scene.principleFocus?.principleText || ""
    ].join(" ");
  }

  function formatSceneRoles(scene) {
    const recipientName = roleName(scene.recipient);
    const targetName = roleName(scene.target);

    return [
      formatRoleValue("Primary", scene.primaryActor),
      formatRoleList("Secondary", scene.secondaryActors),
      formatRoleValue("Speaker", scene.speaker),
      formatRoleValue("Listener", scene.listener),
      recipientName && recipientName !== targetName
        ? formatRoleValue("Recipient", scene.recipient)
        : "",
      formatRoleValue("Target", scene.target),
      formatRoleValue("Manifestation", scene.divineManifestation),
      formatRoleValue("Concerning", scene.concerning),
      formatRoleValue("Source", scene.sourceAuthority),
      formatAuthorityChain(scene.authorityChain),
      formatRoleList("Witness", scene.witness),
      formatRoleList("Audience", scene.audience),
      formatPrincipleFocus(scene.principleFocus)
    ].filter(Boolean).slice(0, 9).join("\n");
  }

  function formatSceneWitnesses(scene) {
    const witnesses = Array.isArray(scene.witnesses) ? scene.witnesses : [];
    if (witnesses.length === 0) return "Witnesses: none detected";
    return `Witnesses: ${witnesses.map((item) =>
      `${item.witness || "Unknown"} (${displayAppConfidence(item.confidence || "possible")})`
    ).join(", ")}`;
  }

  function renderScenes(term) {
    const container = document.getElementById("sceneCards");
    const count = document.getElementById("sceneCount");
    const scenes = Array.isArray(studyData.sceneModels)
      ? studyData.sceneModels
      : [];
    const filtered = scenes.filter((scene) =>
      includesTerm([
        scene.sceneTitle,
        scene.sceneType,
        scene.summarySnippet,
        (scene.participants || []).join(" "),
        (scene.witnesses || []).map((item) => item.witness).join(" "),
        scene.confidence,
        sceneRoleSearchText(scene)
      ].join(" "), term)
    );

    renderLimited(container, filtered, count, (scene) => {
      const participants = (scene.participants || []).join(", ") ||
        "No participants detected";
      const body = [
        trimText(scene.summarySnippet, 140),
        formatSceneRoles(scene),
        `Participants: ${participants}`,
        formatSceneWitnesses(scene)
      ].filter(Boolean).join("\n");

      return createCard(
        scene.sceneTitle || "Scene",
        body,
        `${scene.sceneType || "scene"} | ${displayAppConfidence(scene.confidence || "possible")}`
      );
    }, "No scenes match.", "scene");
  }

  function characterInteractionSearchText(item = {}) {
    return [
      item.sourceCharacter,
      item.targetCharacter,
      item.interactionType,
      item.authorityClass,
      item.sourcePhrase,
      item.derivedMeaning,
      asArray(item.evidence).join(" "),
      asArray(item.relatedEntities).join(" "),
      item.sourceGrounding,
      item.confidence,
      item.verseRange,
      item.scopePath
    ].join(" ");
  }

  function createCharacterInteractionCard(item = {}) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const evidence = asArray(item.evidence).map((value) => normalizeText(value)).filter(Boolean);
    const divineContext = hasDivineDisplayContext([item.sourceCharacter, item.targetCharacter, item.authorityClass, item.sourcePhrase, item.derivedMeaning, item.relatedEntities]);

    card.className = "study-card semantic-card character-interaction-card";
    assignSemanticCardTarget(card, "characterInteraction", item, `${item.sourceCharacter || "source"}-${item.targetCharacter || "target"}-${item.interactionType || "interaction"}`);
    header.className = "semantic-card-header";
    heading.textContent = `${item.sourceCharacter || "Unknown"} -> ${item.targetCharacter || "Unknown"}`;
    range.className = "semantic-card-range";
    range.textContent = [passageFunctionTitle(item.interactionType || "interaction"), item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createWordingProvenanceSection({ source: "I.C.E. Relationship", label: `${item.sourceCharacter || "Unknown"} -> ${item.targetCharacter || "Unknown"}`, layer: "Character Interactions", storageKey: "ICE_CHARACTER_INTERACTIONS", scopePath: item.scopePath || item.verseRange, rule: "Interaction labels are generated from grounded source character, target character, and interaction type fields." }),
      createEvidenceWeightSection({ evidenceType: "Relationship Inference", evidenceStrength: "interaction inferred from source-grounded character/action evidence", sourceGrounding: item.sourceGrounding || item.sourcePhrase, supportingRecords: [...evidence, ...asArray(item.relatedEntities)], sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Source Character", item.sourceCharacter || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Target Character", item.targetCharacter || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Interaction Type", passageFunctionTitle(item.interactionType || "semantic_interaction"), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Class", item.authorityClass || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Evidence", "", { list: evidence.slice(0, 4), hiddenCount: Math.max(0, evidence.length - 4), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "characterInteraction", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(item, "characterInteraction"), divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Grounding", item.sourceGrounding || "Not recorded.", { collapsed: true, summaryLabel: "Show grounding", divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Scope", item.scopePath || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }

  function renderInteractions(term) {
    const container = document.getElementById("interactionCards");
    const count = document.getElementById("interactionCount");
    if (!container || !count) return;
    const semanticRecords = scopedSemanticRecords(studyData.characterInteractions);
    const filteredSemantic = semanticRecords.filter((item) => matchesSearchQuery(characterInteractionSearchText(item), term));
    const legacyInteractions = Array.isArray(studyData.interactionGraph)
      ? dedupeInteractions(studyData.interactionGraph)
      : [];
    const filteredLegacy = legacyInteractions.filter((item) =>
      itemMatches(item, ["actorA", "actorB", "interactionType", "sourceSnippet", "confidence"], term)
    );

    clearElement(container);
    count.textContent = `${filteredSemantic.length} semantic record(s)`;

    if (semanticRecords.length > 0) {
      container.appendChild(createCard(
        "Character Interactions",
        [
          `Derived records: ${semanticRecords.length}`,
          "Layer: ICE_CHARACTER_INTERACTIONS",
          "Purpose: model source-grounded interactions between Characters, Groups, and Authorities.",
          "Review posture: inspect source character, target character, interaction type, authority class, source phrase, derived meaning, App accuracy, and grounding."
        ].join("\n"),
        "derived semantic layer"
      ));
      if (filteredSemantic.length === 0) {
        appendEmpty(container, "No semantic character interaction records match current filter.");
      } else {
        filteredSemantic.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createCharacterInteractionCard(item)));
      }
      if (filteredLegacy.length) {
        const legacyPreview = createPassageFunctionSection("Legacy Interaction Graph", "", { collapsed: true, summaryLabel: "Show legacy interaction graph preview", list: filteredLegacy.slice(0, 8).map((item) => `${item.actorA || "Unknown"} <-> ${item.actorB || "Unknown"} | ${item.interactionType || "interaction"}`), plainList: true });
        if (legacyPreview) container.appendChild(legacyPreview);
      }
      return;
    }

    renderLimited(container, filteredLegacy, count, (item) => createCard(
      `${item.actorA || "Unknown"} <-> ${item.actorB || "Unknown"}`,
      trimText(item.sourceSnippet, 180),
      `${item.interactionType || "interaction"} | ${displayAppConfidence(item.confidence || "probable")}`
    ), "No character interactions match.", "interaction");
  }
  function renderTimeline(term) {
    const container = document.getElementById("timelineCards");
    const count = document.getElementById("timelineCount");
    const timeline = Array.isArray(studyData.timelineItems)
      ? studyData.timelineItems
      : [];
    const filtered = timeline.filter((item) =>
      itemMatches(item, [
        "detectedDateText",
        "contextSnippet",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      item.detectedDateText || "Undated",
      trimText(item.contextSnippet, 180),
      item.sourceTitle || ""
    ), "No timeline items match.");
  }

  function createSemanticFlowPathCard(chain) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const nodes = asArray(chain.nodes);
    const authority = asArray(chain.authorityChain);
    const divineContext = hasDivineDisplayContext([chain.chainTitle, chain.summary, authority, nodes.map((node) => [node.actor, node.target, node.eventType, node.action])]);
    const nodeLabels = nodes.map((node) => {
      const target = semanticEventDisplayTarget(node);
      const note = semanticEventDisplayNote(node);
      const derived = `${node.actor || "Unknown"} -> ${node.action || node.eventType || "event"}${target ? ` -> ${target}` : ""}${note ? ` | ${note}` : ""}`;
      return sourceDerivedDisplayBlock(node.anchorText || node.sourceSnippet || "", derived, { context: node });
    });

    card.className = "study-card semantic-card semantic-flow-path-card";
    assignSemanticCardTarget(card, "flow", chain, chain.chainTitle);
    header.className = "semantic-card-header";
    heading.textContent = renderIceDivineDisplayText(chain.chainTitle || "Semantic Flow Path", divineContext);
    range.className = "semantic-card-range";
    range.textContent = [chain.chainType, displayAppConfidence(chain.confidence || "probable")].filter(Boolean).join(" | ") || "semantic flow path";
    body.className = "semantic-card-body";
    header.append(heading, range);

    [
      createPassageFunctionSection("Summary", trimText(chain.summary, 170), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Authority Flow Path", "", { list: authority, plainList: true, divineContext }),
      createPassageFunctionSection("App accuracy", displayConfidence(chain.confidence || "probable")),
      createPassageFunctionSection("Flow Nodes", "", { list: nodeLabels.slice(0, 3), hiddenCount: Math.max(0, nodeLabels.length - 3), plainList: true, divineContext, preferHolySpirit: true }),
      nodeLabels.length > 3 ? createPassageFunctionSection("Full Flow Nodes", "", { collapsed: true, summaryLabel: "Show full flow path", list: nodeLabels, plainList: true, divineContext, preferHolySpirit: true }) : null,
      createPassageFunctionSection("Related Semantic Layers", "", { collapsed: true, summaryLabel: "Show related semantic layers", navItems: relatedSemanticLayerNavItems(chain, "flow"), divineContext })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(header, body);
    return card;
  }
  function renderSemanticFlowChains(term) {
    const container = document.getElementById("semanticFlowChainCards");
    const count = document.getElementById("semanticFlowChainCount");
    const filtered = filteredSemanticFlowChains(term);

    renderLimited(container, filtered, count, (chain) => createSemanticFlowPathCard(chain), "No semantic flow paths match.", "semantic flow path");
  }
  function renderSemanticEvents(term) {
    const container = document.getElementById("semanticEventCards");
    const count = document.getElementById("semanticEventCount");
    const filtered = filteredSemanticEvents(term);

    renderLimited(container, filtered, count, (item) => {
      const target = semanticEventDisplayTarget(item);
      const distinction = semanticEventDisplayNote(item);
      const arrow = target ? ` -> ${target}` : "";
      const title = `${item.actor || item.narrator || "Unknown"} -> ${item.action || "acts"}${arrow}`;
      const anchor = item.anchorText || item.sourceSnippet || "";
      const derivedMeaning = item.normalizedMeaning || `${item.actor || item.narrator || "Unknown"} -> ${item.action || "acts"}${arrow}`;
      const body = [
        sourceDerivedDisplayBlock(anchor || item.sourceSnippet || "", derivedMeaning, { context: item }),
        item.narratorRole ? `Narrator: ${item.narratorRole}` : "",
        item.relationshipType ? `Relationship: ${item.relationshipType}` : "",
        distinction ? `NAME / Title Distinction: ${distinction}` : "",
        item.sourceSnippet && item.sourceSnippet !== anchor ? sourceDerivedDisplayBlock(item.sourceSnippet, derivedMeaning, { context: item }) : ""
      ].filter(Boolean).join("\n");
      const meta = [item.eventType, item.semanticCategory, displayAppConfidence(item.confidence || "probable")]
        .filter(Boolean)
        .join(" | ");

      const card = createCard(title, body, meta);
      assignSemanticCardTarget(card, "event", item, item.semanticEventId || title);
      return card;
    }, "No semantic events match.", "semantic event");
  }
  const PRINCIPLE_HIERARCHY_GROUPS = [
    "Core Principles",
    "Supporting Principles",
    "Teaching Themes",
    "Commandments",
    "Applications",
    "Promises",
    "Warnings / Consequences",
    "Contrasts",
    "Examples",
    "Audience Conditions"
  ];

  function principleHierarchyKey(category, label, sourcePhrase = "") {
    return [category, label, sourcePhrase].map((value) => normalizeText(value).toLowerCase()).join("|");
  }

  function principleHierarchyRecord(record = {}) {
    return {
      category: record.category || "Teaching Themes",
      label: normalizeText(record.label || "Not recorded"),
      type: record.type || record.category || "Principle / Teaching",
      sourcePhrase: record.sourcePhrase || "",
      derivedMeaning: record.derivedMeaning || "",
      speaker: record.speaker || "",
      audience: record.audience || "",
      provenance: record.provenance || "I.C.E. Teaching Classification",
      evidenceWeight: record.evidenceWeight || "Direct Source Evidence",
      confidence: record.confidence || "probable",
      scopePath: record.scopePath || "",
      verseRange: record.verseRange || "",
      sourceGrounding: record.sourceGrounding || "",
      supportingLayers: uniqueStudyList(record.supportingLayers || []),
      related: uniqueStudyList(record.related || [])
    };
  }

  function principleHierarchyRecords() {
    const records = [];
    const seen = new Set();
    const add = (record = {}) => {
      const item = principleHierarchyRecord(record);
      if (!item.label || /^not recorded$/i.test(item.label)) return;
      const key = principleHierarchyKey(item.category, item.label, item.sourcePhrase);
      if (seen.has(key)) return;
      seen.add(key);
      records.push(item);
    };
    scopedSemanticRecords(studyData.teachingSemantics).forEach((item) => {
      const common = {
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        speaker: item.speaker || "JESUS",
        audience: item.audience,
        confidence: item.confidence,
        scopePath: item.scopePath,
        verseRange: item.verseRange,
        sourceGrounding: item.sourceGrounding,
        supportingLayers: ["Teaching / Discourse Structure"]
      };
      if (item.principle) add({ ...common, category: /blessing|principle/i.test(item.discourseType || "") ? "Core Principles" : "Supporting Principles", label: item.principle, type: item.discourseType || "principle" });
      if (item.teachingTopic) add({ ...common, category: "Teaching Themes", label: item.teachingTopic, type: item.discourseType || "teaching theme" });
      if (item.commandment) add({ ...common, category: "Commandments", label: item.commandment, type: "commandment" });
      if (item.application) {
        item.application.split(/;|,/).map((value) => normalizeText(value)).filter(Boolean).forEach((label) => add({ ...common, category: "Applications", label, type: "application" }));
      }
      if (item.promise) add({ ...common, category: "Promises", label: item.promise, type: "promise" });
      if (item.warning) add({ ...common, category: "Warnings / Consequences", label: item.warning, type: "warning / consequence" });
      if (item.requirement) add({ ...common, category: /kingdom of heaven|exceeding/i.test(item.requirement) ? "Audience Conditions" : "Warnings / Consequences", label: item.requirement, type: "requirement / condition" });
      if (item.contrast) add({ ...common, category: "Contrasts", label: item.contrast, type: "contrast" });
      if (item.example) add({ ...common, category: "Examples", label: item.example, type: "example" });
      if (item.audience) add({ ...common, category: "Audience Conditions", label: item.audience, type: "audience" });
    });
    scopedSemanticRecords(studyData.principleRelationships).forEach((item) => {
      const common = {
        sourcePhrase: item.sourcePhrase,
        derivedMeaning: item.derivedMeaning,
        speaker: item.speaker || "JESUS",
        audience: item.audience,
        confidence: item.confidence,
        scopePath: item.scopePath,
        verseRange: item.verseRange,
        sourceGrounding: item.sourceGrounding,
        provenance: "I.C.E. Principle Relationship",
        evidenceWeight: "Relationship Inference",
        supportingLayers: ["Principle Relationships", "Teaching / Discourse Structure"]
      };
      if (item.principle) add({ ...common, category: "Supporting Principles", label: item.principle, type: `relationship: ${passageFunctionTitle(item.relationshipType || "related")}`, related: item.relatedPrinciples });
      asArray(item.relatedPrinciples).forEach((label) => add({ ...common, category: "Supporting Principles", label, type: `related through ${item.principle || "principle"}`, related: [item.principle] }));
    });
    return records.sort((left, right) => PRINCIPLE_HIERARCHY_GROUPS.indexOf(left.category) - PRINCIPLE_HIERARCHY_GROUPS.indexOf(right.category));
  }

  function principleHierarchySearchText(item = {}) {
    return [item.category, item.label, item.type, item.sourcePhrase, item.derivedMeaning, item.speaker, item.audience, item.provenance, item.evidenceWeight, item.scopePath, item.verseRange, item.sourceGrounding, item.supportingLayers, item.related].flat(Infinity).map((value) => normalizeText(value)).join(" ");
  }

  function createPrincipleHierarchyCard(item = {}) {
    const card = document.createElement("article");
    const header = document.createElement("header");
    const heading = document.createElement("h3");
    const range = document.createElement("div");
    const body = document.createElement("div");
    const divineContext = hasDivineDisplayContext([item.label, item.sourcePhrase, item.derivedMeaning, item.speaker, item.related]);
    card.className = "study-card semantic-card principle-card principle-hierarchy-card";
    assignSemanticCardTarget(card, "principle", item, `${item.category || "principle"}-${item.label || "label"}`);
    header.className = "semantic-card-header";
    heading.textContent = renderIceBeingDisplayText(item.label || "Principle / Teaching", { divineContext, preferHolySpirit: true });
    range.className = "semantic-card-range";
    range.textContent = [item.category, item.type, item.verseRange || item.scopePath].filter(Boolean).join(" | ");
    body.className = "semantic-card-body";
    header.append(heading, range);
    [
      createWordingProvenanceSection({ source: item.provenance, label: item.label, layer: "Principles / Teachings", storageKey: "ICE_TEACHING_SEMANTICS + ICE_PRINCIPLE_RELATIONSHIPS", scopePath: item.scopePath || item.verseRange, rule: "Principle hierarchy labels are grouped from existing teaching/discourse and principle relationship records; source phrase remains separately displayed." }),
      createEvidenceWeightSection({ evidenceType: item.evidenceWeight, evidenceStrength: item.sourcePhrase ? "directly grounded or relationship-grounded from Matthew 5 source records" : "derived from current semantic relationship records", sourceGrounding: item.sourceGrounding || item.sourcePhrase, supportingRecords: item.supportingLayers, sourcePhrase: item.sourcePhrase }),
      createPassageFunctionSection("Label", item.label || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Category / Type", [item.category, item.type].filter(Boolean).join(" | "), { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source Phrase", item.sourcePhrase || "Not recorded.", { divineContext, sourceQuote: true }),
      createPassageFunctionSection("Derived Meaning", item.derivedMeaning || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Speaker", item.speaker || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Audience", item.audience || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("App accuracy", displayConfidence(item.confidence || "probable")),
      createPassageFunctionSection("Related", "", { list: asArray(item.related), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Supporting Layers", "", { collapsed: true, summaryLabel: "Show supporting layers", list: asArray(item.supportingLayers), plainList: true }),
      createPassageFunctionSection("Scope", item.scopePath || item.verseRange || "Not scoped.", { collapsed: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));
    card.append(header, body);
    return card;
  }

  function appendPrincipleHierarchyGroup(container, category, records = []) {
    const matching = records.filter((item) => item.category === category);
    if (!matching.length) return;
    container.appendChild(createCard(category, `${matching.length} grounded item(s)`, "principle hierarchy group"));
    matching.slice(0, DISPLAY_LIMIT).forEach((item) => container.appendChild(createPrincipleHierarchyCard(item)));
    if (matching.length > DISPLAY_LIMIT) appendEmpty(container, `${matching.length - DISPLAY_LIMIT} more ${category.toLowerCase()} item(s) hidden by preview limit. Use search/filter to narrow.`);
  }
  function createPrincipleCard(item) {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const body = document.createElement("div");
    const divineContext = hasDivineDisplayContext([item.principleText, item.contextSnippet, item.sourceTitle]);
    const principleText = trimText(item.contextSnippet || item.principleText, 180);

    card.className = "study-card semantic-card principle-card";
    heading.textContent = renderIceBeingDisplayText(item.principleType || "unknown", { divineContext, preferHolySpirit: true });
    body.className = "semantic-card-body";

    [
      createPassageFunctionSection("Principle", principleText || "Not recorded.", { divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Primary Entities / Characters", "", { list: classifiedPrimaryEntityLines(item, "principle", 10), plainList: true, divineContext, preferHolySpirit: true }),
      createPassageFunctionSection("Source", item.sourceTitle || "Not recorded.", { collapsed: true, divineContext, preferHolySpirit: true })
    ].filter(Boolean).forEach((section) => body.appendChild(section));

    card.append(heading, body);
    return card;
  }
  function renderPrinciples(term) {
    const container = document.getElementById("principleCards");
    const count = document.getElementById("principleCount");
    const hierarchyRecords = principleHierarchyRecords();
    const filteredHierarchy = hierarchyRecords.filter((item) => matchesSearchQuery(principleHierarchySearchText(item), term));
    const legacyPrinciples = Array.isArray(studyData.principleItems)
      ? dedupePrincipleItems(studyData.principleItems)
      : [];
    const filteredLegacy = legacyPrinciples.filter((item) =>
      itemMatches(item, [
        "principleText",
        "principleType",
        "contextSnippet",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    if (!container || !count) return;
    clearElement(container);
    count.textContent = hierarchyRecords.length ? `${filteredHierarchy.length} hierarchy item(s)` : `${filteredLegacy.length} principle item(s)`;

    if (hierarchyRecords.length) {
      if (!filteredHierarchy.length) {
        appendEmpty(container, "No principle hierarchy items match current filter.");
        return;
      }
      container.appendChild(createCard(
        "Principle Hierarchy",
        [
          `Derived items: ${hierarchyRecords.length}`,
          "Purpose: group Matthew 5 principles and teachings by semantic type instead of flattening every item into one list.",
          "Groups: Core Principles, Supporting Principles, Teaching Themes, Commandments, Applications, Promises, Warnings / Consequences, Contrasts, Examples, Audience Conditions.",
          "Boundary: display grouping only; no doctrinal invention, no crawling, and no Strong's/POS analysis."
        ].join("\n"),
        "derived principle hierarchy"
      ));
      PRINCIPLE_HIERARCHY_GROUPS.forEach((category) => appendPrincipleHierarchyGroup(container, category, filteredHierarchy));
      return;
    }

    renderLimited(container, filteredLegacy, count, (item) => createPrincipleCard(item), "No principle or teaching items match.");
  }
  function renderProphecyLinks(term) {
    const container = document.getElementById("prophecyLinkCards");
    const count = document.getElementById("prophecyLinkCount");
    const links = Array.isArray(studyData.prophecyLinks)
      ? studyData.prophecyLinks
      : [];
    const filtered = links.filter((item) =>
      itemMatches(item, [
        "prophecyText",
        "fulfillmentText",
        "contextSnippet",
        "confidence",
        "linkType"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      displayAppConfidence(item.confidence || "prophecy-fulfillment"),
      `${trimText(item.prophecyText, 110)} -> ${trimText(item.fulfillmentText, 110)}`,
      item.linkType || "prophecy-fulfillment"
    ), "No prophecy / fulfillment links match.");
  }


  function setElementText(id, value) {
    const element = document.getElementById(id);
    if (!element) return false;
    element.textContent = value == null ? "" : String(value);
    return true;
  }

  function safeRenderSection(label, renderer, term) {
    try {
      renderer(term);
    } catch (error) {
      console.error(`I.C.E. Study Panel section render failed: ${label}`, error);
      showDiagnosticMessage(`Study Panel section render error in ${label}: ${error.message}`);
    }
  }

  function normalizeLoadedStudyData(data = {}) {
    const arrayAliases = [
      "captureHistory",
      "timelineItems",
      "eventItems",
      "orderedEvents",
      "actorTimelines",
      "interactionGraph",
      "sceneModels",
      "semanticEvents",
      "semanticFlowChains",
      "entityRegistry",
      "relationshipGraph",
      "canonicalIdentities",
      "mentionIndex",
      "domSemanticHints",
      "sourceAdapters",
      "sourceDiscoveryIndex",
      "referenceGraph",
      "passageFunctions",
      "revelationPatterns",
      "referenceRoles",
      "semanticDistinctions",
      "ontologyRoles",
      "semanticAmbiguities",
      "originAuthorityPaths",
      "entityRelationRoles",
      "semanticContinuity",
      "movementSemantics",
      "semanticCausality",
      "teachingSemantics",
      "principleRelationships",
      "characterInteractions",
      "sessionContinuityReview",
      "knowledgeGraph",
      "principleNetworks",
      "focusLens",
      "scopeLens",
      "depthLens",
      "semanticQuestions",
      "trustVerification",
      "entityRoleItems",
      "principleItems",
      "prophecyLinks",
      "analysisHistory",
      "canonicalAnalyzedPages",
      "analysisQueue",
      "analysisQueueHistory",
      "analysisQueuePageSummaries",
      "journeyPageSnapshots",
      "canonicalAnalysisTarget"
    ];
    for (const alias of arrayAliases) {
      if (!Array.isArray(data[alias])) data[alias] = [];
    }
    if (!data.analysisQueueStatus || typeof data.analysisQueueStatus !== "object" || Array.isArray(data.analysisQueueStatus)) data.analysisQueueStatus = { state: "idle" };
    if (!data.analysisQueueManifest || typeof data.analysisQueueManifest !== "object" || Array.isArray(data.analysisQueueManifest)) data.analysisQueueManifest = {};
    return data;
  }
  function studySectionRenderers() {
    return [
      { label: "Study Scope", sectionId: "volumeContextSection", renderer: renderVolumeContext },
      { label: "Queue Summary", sectionId: "queueSummarySection", renderer: renderQueueSummary },
      { label: "Guided Study", sectionId: "guidedStudySection", renderer: renderGuidedStudy },
      { label: "Study Progression", sectionId: "studyProgressionSection", renderer: renderStudyProgression },
      { label: "Focus Lens", sectionId: "focusLensSection", renderer: renderFocusLens },
      { label: "Scope Lens", sectionId: "scopeLensSection", renderer: renderScopeLens },
      { label: "Depth Lens", sectionId: "depthLensSection", renderer: renderDepthLens },
      { label: "View Lens", sectionId: "viewLensSection", renderer: renderViewLens },
      { label: "Journey Nodes", sectionId: "journeyNodesSection", renderer: renderJourneyNodes },
      { label: "Journey Paths", sectionId: "journeyPathsSection", renderer: renderJourneyPaths },
      { label: "Journey Hubs", sectionId: "journeyHubsSection", renderer: renderJourneyHubs },
      { label: "Semantic Coverage", sectionId: "semanticCoverageSection", renderer: renderSemanticCoverage },
      { label: "Semantic Resolution Explanation", sectionId: "resolutionExplanationsSection", renderer: renderResolutionExplanations },
      { label: "Session Continuity Review", sectionId: "sessionContinuityReviewSection", renderer: renderSessionContinuityReview },
      { label: "Scripture Knowledge Graph", sectionId: "knowledgeGraphSection", renderer: renderKnowledgeGraph },
      { label: "Trust & Verification", sectionId: "trustVerificationSection", renderer: renderTrustVerification },
      { label: "Semantic Questions", sectionId: "semanticQuestionsSection", renderer: renderSemanticQuestions },
      { label: "Library Awareness", sectionId: "libraryAwarenessSection", renderer: renderLibraryAwareness },
      { label: "Teaching / Discourse Structure", sectionId: "teachingSemanticsSection", renderer: renderTeachingSemantics },
      { label: "Principle Relationships", sectionId: "principleRelationshipsSection", renderer: renderPrincipleRelationships },
      { label: "Principle Networks", sectionId: "principleNetworksSection", renderer: renderPrincipleNetworks },
      { label: "Passage Functions", sectionId: "passageFunctionsSection", renderer: renderPassageFunctions },
      { label: "Revelation Patterns", sectionId: "revelationPatternsSection", renderer: renderRevelationPatterns },
      { label: "Reference Roles", sectionId: "referenceRolesSection", renderer: renderReferenceRoles },
      { label: "Semantic Distinctions", sectionId: "semanticDistinctionsSection", renderer: renderSemanticDistinctions },
      { label: "Ontology Roles", sectionId: "ontologyRolesSection", renderer: renderOntologyRoles },
      { label: "Semantic Ambiguities", sectionId: "semanticAmbiguitiesSection", renderer: renderSemanticAmbiguities },
      { label: "Origin Authority Paths", sectionId: "originAuthorityPathsSection", renderer: renderOriginAuthorityPaths },
      { label: "Entity Relation Roles", sectionId: "entityRelationRolesSection", renderer: renderEntityRelationRoles },
      { label: "Semantic Continuity", sectionId: "semanticContinuitySection", renderer: renderSemanticContinuity },
      { label: "Movement Semantics", sectionId: "movementSemanticsSection", renderer: renderMovementSemantics },
      { label: "Semantic Causality", sectionId: "semanticCausalitySection", renderer: renderSemanticCausality },
      { label: "Narrative Timeline", sectionId: "narrativeTimelineSection", renderer: renderNarrativeTimeline },
      { label: "Entity Scope Focus", sectionId: "entityScopeFocusSection", renderer: renderEntityScopeFocus },
      { label: "Verse Scope Focus", sectionId: "verseScopeFocusSection", renderer: renderVerseScopeFocus },
      { label: "Canonical Identities", sectionId: "canonicalIdentitiesSection", renderer: renderCanonicalIdentities },
      { label: "Relationship Graph", sectionId: "relationshipGraphSection", renderer: renderRelationshipGraph },
      { label: "Semantic Events", sectionId: "semanticEventsSection", renderer: renderSemanticEvents },
      { label: "Semantic Flow Chains", sectionId: "semanticFlowChainsSection", renderer: renderSemanticFlowChains },
      { label: "Reference Graph", sectionId: "referenceGraphSection", renderer: renderReferenceGraph },
      { label: "Source Discovery", sectionId: "sourceDiscoverySection", renderer: renderSourceDiscovery },
      { label: "DOM Semantic Hints", sectionId: "domSemanticHintsSection", renderer: renderDomSemanticHints },
      { label: "Focused Graph", sectionId: "focused-relationship-view", renderer: renderFocusedGraph },
      { label: "Current Page", sectionId: "currentPageSection", renderer: renderCurrentPage },
      { label: "Source Context", sectionId: "sourceContextSection", renderer: renderSourceContext },
      { label: "Source Adapter", sectionId: "sourceAdapterSection", renderer: renderSourceAdapter },
      { label: "Scope Integrity", sectionId: "scopeIntegritySection", renderer: renderScopeIntegrity },
      { label: "Entity Roles", sectionId: "entitiesSection", renderer: renderEntityRoles },
      { label: "Entity Registry", sectionId: "entityRegistrySection", renderer: renderEntityRegistry },
      { label: "Mention Index", sectionId: "mentionIndexSection", renderer: renderMentionIndex },
      { label: "Actors", sectionId: "actorsSection", renderer: renderActors },
      { label: "Scenes", sectionId: "scenesSection", renderer: renderScenes },
      { label: "Ordered Events", sectionId: "orderedEventsSection", renderer: renderOrderedEvents },
      { label: "Interactions", sectionId: "interactionsSection", renderer: renderInteractions },
      { label: "Principles", sectionId: "principlesSection", renderer: renderPrinciples },
      { label: "Prophecy Links", sectionId: "prophecyLinksSection", renderer: renderProphecyLinks },
      { label: "Timeline", sectionId: "timelineSection", renderer: renderTimeline }
    ];
  }

  function sectionEntryByLabel(label) {
    return studySectionRenderers().find((entry) => entry.label === label) || null;
  }

  function deferredSectionRecordCount(label) {
    if (!fullStudyDataLoaded) return null;
    if (label === "Guided Study") return guidedStudyRecords().length;
    if (label === "Study Progression") return studyProgressionRecords().length;
    if (label === "Semantic Coverage") return semanticCoverageRows().length;
    if (label === "Semantic Resolution Explanation") return resolutionExplanationRecords().length;
    if (label === "Scripture Knowledge Graph") return knowledgeGraphRecords().length;
    if (label === "Focus Lens") return scopedSemanticRecords(studyData.focusLens).length;
    if (label === "Scope Lens") return scopedSemanticRecords(studyData.scopeLens).length;
    if (label === "Depth Lens") return scopedSemanticRecords(studyData.depthLens).length;
    if (label === "View Lens") return viewLensRecords().length;
    if (label === "Journey Nodes") return journeyNodesRecords().length;
    if (label === "Journey Paths") return journeyPathRecords().length;
    if (label === "Journey Hubs") return journeyHubRecords().length;
    if (label === "Teaching / Discourse Structure") return scopedSemanticRecords(studyData.teachingSemantics).length;
    if (label === "Principle Relationships") return scopedSemanticRecords(studyData.principleRelationships).length;
    if (label === "Principle Networks") return scopedSemanticRecords(studyData.principleNetworks).length;
    if (label === "Semantic Continuity") return scopedSemanticRecords(studyData.semanticContinuity).length;
    if (label === "Movement Semantics") return scopedSemanticRecords(studyData.movementSemantics).length;
    if (label === "Semantic Causality") return scopedSemanticRecords(studyData.semanticCausality).length;
    if (label === "Current Page") return activeSourcePageRecord() ? 1 : 0;
    if (label === "Source Context") return findSourceContext() ? 1 : 0;
    if (label === "Source Adapter") return studyData.activeAdapter ? 1 : 0;
    if (label === "Scope Integrity") return studyData.scopeIntegrity?.generatedAt ? 1 : 0;
    const alias = DEFERRED_SECTION_COUNT_ALIASES[label];
    return alias ? countItems(studyData[alias]) : null;
  }

  function deferredSectionStatusLine(label) {
    const count = deferredSectionRecordCount(label);
    if (count == null) return "Summary visible now; expand to load details.";
    return count > 0 ? `${count} record(s) ready; expand to view details.` : "No records found for this section.";
  }

  function deferredSectionCountLabel(label) {
    const count = deferredSectionRecordCount(label);
    return count == null ? "summary" : `${count} record(s)`;
  }

  function createDeferredSectionDetails(entry, options = {}) {
    const card = document.createElement("article");
    card.className = "study-card deferred-study-section-card";
    const details = document.createElement("details");
    details.className = "deferred-study-section-details";
    if (options.open) details.open = true;

    const summary = document.createElement("summary");
    const title = document.createElement("span");
    title.className = "deferred-study-section-title";
    title.textContent = entry.label;
    const status = document.createElement("span");
    status.className = "deferred-study-section-status";
    status.textContent = deferredSectionStatusLine(entry.label);
    summary.append(title, status);

    const body = document.createElement("div");
    body.className = "deferred-study-section-body";
    if (options.loadedNodes) {
      options.loadedNodes.forEach((node) => body.appendChild(node));
    } else {
      const purpose = document.createElement("p");
      purpose.textContent = DEFERRED_SECTION_SUMMARIES[entry.label] || "Details are available on demand.";
      const note = document.createElement("p");
      note.className = "deferred-study-section-note";
      note.textContent = "Full records load when this section is opened; no background crawling or report generation runs on panel open.";
      body.append(purpose, note);
      details.addEventListener("toggle", () => {
        if (!details.open || loadedDeferredSections.has(entry.label)) return;
        note.textContent = "Loading details...";
        loadDeferredSection(entry.label).catch((error) => {
          note.textContent = `Load failed: ${error.message}`;
          showDiagnosticMessage(`Load failed: ${error.message}`);
        });
      }, { once: false });
    }

    details.append(summary, body);
    card.appendChild(details);
    return card;
  }

  function renderDeferredSectionPlaceholder(entry) {
    const section = document.getElementById(entry.sectionId);
    const container = section?.querySelector(".card-grid");
    const count = section?.querySelector(".count-label");
    if (!container) return;
    const status = deferredSectionStatusLine(entry.label);
    if (container.dataset.deferredSection === entry.label) {
      const statusElement = container.querySelector(".deferred-study-section-status");
      if (statusElement) statusElement.textContent = status;
      if (count) count.textContent = deferredSectionCountLabel(entry.label);
      return;
    }
    clearElement(container);
    container.dataset.deferredSection = entry.label;
    if (count) count.textContent = deferredSectionCountLabel(entry.label);
    container.appendChild(createDeferredSectionDetails(entry));
  }

  function renderLoadedDeferredSection(entry, term) {
    const section = document.getElementById(entry.sectionId);
    const container = section?.querySelector(".card-grid");
    if (!container) return;
    delete container.dataset.deferredSection;
    safeRenderSection(entry.label, entry.renderer, term);
    const loadedNodes = Array.from(container.childNodes);
    clearElement(container);
    container.appendChild(createDeferredSectionDetails(entry, { open: true, loadedNodes }));
  }

  function createDeferredStudyScopeDiagnosticsDetails() {
    const details = document.createElement("details");
    details.className = "study-scope-source-diagnostics";
    const summary = document.createElement("summary");
    summary.textContent = "Study Scope Sources";
    const body = document.createElement("div");
    body.className = "study-scope-source-group";
    const note = document.createElement("p");
    note.textContent = "Source diagnostics are available; expand to load accepted/rejected source details.";
    details.addEventListener("toggle", () => {
      if (!details.open || fullStudyDataLoaded) return;
      note.textContent = "Loading source diagnostics...";
      loadStudyScopeDiagnostics().catch((error) => {
        note.textContent = `Diagnostics load failed: ${error.message}`;
        showDiagnosticMessage(`Diagnostics load failed: ${error.message}`);
      });
    });
    body.appendChild(note);
    details.append(summary, body);
    return details;
  }

  function renderStudy() {
    const searchInput = document.getElementById("searchInput");
    const term = normalizeText(searchInput?.value || "").toLowerCase();
    studySectionRenderers().forEach((entry) => {
      if (STARTUP_RENDERER_LABELS.has(entry.label)) {
        const section = document.getElementById(entry.sectionId);
        const container = section?.querySelector(".card-grid");
        if (container) delete container.dataset.deferredSection;
        safeRenderSection(entry.label, entry.renderer, term);
      } else if (loadedDeferredSections.has(entry.label)) {
        renderLoadedDeferredSection(entry, term);
      } else {
        renderDeferredSectionPlaceholder(entry);
      }
    });
    if (fullStudyDataLoaded) {
      safeRenderSection("Diagnostics", renderDiagnostics, term);
    }
  }

  async function loadStudyData(options = {}) {
    const aliases = options.full ? FULL_STORAGE_ALIASES : STARTUP_STORAGE_ALIASES;
    const raw = await chrome.storage.local.get(aliases.map((alias) => STORAGE_KEYS[alias]));
    const mapped = Object.fromEntries(aliases.map((alias) => [alias, raw[STORAGE_KEYS[alias]]]));

    studyData = normalizeLoadedStudyData({
      ...studyData,
      ...mapped
    });
    if (options.full) fullStudyDataLoaded = true;

    console.debug("I.C.E. study data loaded", {
      mode: options.full ? "full" : "startup",
      keys: aliases.map((alias) => STORAGE_KEYS[alias]).filter((key) =>
        Object.prototype.hasOwnProperty.call(raw, key)
      ),
      activeAdapter: studyData.activeAdapter?.adapterName || "",
      analyzedPages: countItems(studyData.canonicalAnalyzedPages),
      lastAnalysis: studyData.analysisStatus?.analyzedAt || ""
    });
  }

  function renderDiagnostics() {
    const captureCount = (studyData.latestCapture?.text ? 1 : 0) +
      countItems(studyData.captureHistory);
    const timelineCount = countItems(studyData.timelineItems);
    const eventCount = countItems(studyData.eventItems);
    const orderedCount = countItems(studyData.orderedEvents);
    const actorCount = countItems(studyData.actorTimelines);
    const interactionCount = dedupeInteractions(studyData.interactionGraph).length;
    const sceneCount = countItems(studyData.sceneModels);
    const semanticEventCount = countItems(studyData.semanticEvents);
    const semanticFlowChainCount = countItems(studyData.semanticFlowChains);
    const entityRegistryCount = countItems(studyData.entityRegistry);
    const relationshipGraphCount = countItems(studyData.relationshipGraph);
    const canonicalIdentityCount = countItems(studyData.canonicalIdentities);
    const entityClassCount = classifiedEntityCount();
    const mentionCount = countItems(studyData.mentionIndex);
    const domHintCount = countItems(studyData.domSemanticHints);
    const sourceDiscoveryCount = countItems(studyData.sourceDiscoveryIndex);
    const referenceGraphCount = countItems(studyData.referenceGraph);
    const passageFunctionCount = countItems(studyData.passageFunctions);
    const revelationPatternCount = countItems(studyData.revelationPatterns);
    const referenceRoleCount = countItems(studyData.referenceRoles);
    const semanticDistinctionCount = countItems(studyData.semanticDistinctions);
    const ontologyRoleCount = countItems(studyData.ontologyRoles);
    const semanticAmbiguityCount = countItems(studyData.semanticAmbiguities);
    const originAuthorityPathCount = countItems(studyData.originAuthorityPaths);
    const entityRelationRoleCount = countItems(studyData.entityRelationRoles);
    const semanticContinuityCount = countItems(studyData.semanticContinuity);
    const movementSemanticsCount = countItems(studyData.movementSemantics);
    const semanticCausalityCount = countItems(studyData.semanticCausality);
    const teachingSemanticsCount = countItems(studyData.teachingSemantics);
    const principleRelationshipsCount = countItems(studyData.principleRelationships);
    const characterInteractionsCount = countItems(studyData.characterInteractions);
    const knowledgeGraphCount = countItems(knowledgeGraphRecords());
    const principleNetworksCount = countItems(studyData.principleNetworks);
    const focusLensCount = countItems(studyData.focusLens);
    const scopeLensCount = countItems(studyData.scopeLens);
    const depthLensCount = countItems(studyData.depthLens);
    const viewLensCount = countItems(viewLensRecords());
    const journeyNodesCount = countItems(journeyNodesRecords());
    const journeyPathsCount = countItems(journeyPathRecords());
    const journeyHubsCount = countItems(journeyHubRecords());
    const journeySnapshotState = journeySnapshotScopeState();
    const journeyRecordsByPage = journeyRecordsByPageDiagnostics();
    const semanticQuestionsCount = countItems(studyData.semanticQuestions);
    const trustVerificationCount = countItems(studyData.trustVerification);
    const resolutionExplanationCount = countItems(resolutionExplanationRecords());
    const activeAdapterName = studyData.activeAdapter?.adapterName || "None";
    const principleCount = countItems(studyData.principleItems);
    const prophecyLinkCount = countItems(studyData.prophecyLinks);
    const totalRenderable = captureCount + timelineCount + eventCount +
      orderedCount + actorCount + interactionCount + sceneCount + semanticEventCount + semanticFlowChainCount + entityRegistryCount + relationshipGraphCount + canonicalIdentityCount + mentionCount + domHintCount +
      principleCount + prophecyLinkCount + referenceGraphCount + passageFunctionCount + revelationPatternCount + referenceRoleCount + semanticDistinctionCount + ontologyRoleCount + semanticAmbiguityCount + originAuthorityPathCount + entityRelationRoleCount + semanticContinuityCount + movementSemanticsCount + semanticCausalityCount + teachingSemanticsCount + principleRelationshipsCount + principleNetworksCount + focusLensCount + scopeLensCount + depthLensCount + viewLensCount + journeyNodesCount + journeyPathsCount + journeyHubsCount + characterInteractionsCount + resolutionExplanationCount + knowledgeGraphCount + semanticQuestionsCount + trustVerificationCount;
    const message = document.getElementById("diagnosticMessage");

    setElementText("diagnosticCaptures", captureCount);
    setElementText("diagnosticTimeline", timelineCount);
    setElementText("diagnosticEvents", eventCount);
    setElementText("diagnosticOrderedEvents", orderedCount);
    setElementText("diagnosticActors", actorCount);
    setElementText("diagnosticInteractions", interactionCount);
    setElementText("diagnosticScenes", sceneCount);
    setElementText("diagnosticSemanticEvents", semanticEventCount);
    setElementText("diagnosticSemanticFlowChains", semanticFlowChainCount);
    setElementText("diagnosticEntityRegistry", entityRegistryCount);
    setElementText("diagnosticRelationshipGraph", relationshipGraphCount);
    setElementText("diagnosticCanonicalIdentities", canonicalIdentityCount);
    setElementText("diagnosticEntityClasses", entityClassCount);
    setElementText("diagnosticMentions", mentionCount);
    setElementText("diagnosticDomHints", domHintCount);
    setElementText("diagnosticSourceDiscovery", sourceDiscoveryCount);
    setElementText("diagnosticReferenceGraph", referenceGraphCount);
    setElementText("diagnosticPassageFunctions", passageFunctionCount);
    setElementText("diagnosticRevelationPatterns", revelationPatternCount);
    setElementText("diagnosticReferenceRoles", referenceRoleCount);
    setElementText("diagnosticSemanticDistinctions", semanticDistinctionCount);
    setElementText("diagnosticOntologyRoles", ontologyRoleCount);
    setElementText("diagnosticSemanticAmbiguities", semanticAmbiguityCount);
    setElementText("diagnosticOriginAuthorityPaths", originAuthorityPathCount);
    setElementText("diagnosticEntityRelationRoles", entityRelationRoleCount);
    setElementText("diagnosticSemanticContinuity", semanticContinuityCount);
    setElementText("diagnosticMovementSemantics", movementSemanticsCount);
    setElementText("diagnosticSemanticCausality", semanticCausalityCount);
    setElementText("diagnosticTeachingSemantics", teachingSemanticsCount);
    setElementText("diagnosticPrincipleRelationships", principleRelationshipsCount);
    setElementText("diagnosticPrincipleNetworks", principleNetworksCount);
    setElementText("diagnosticFocusLens", focusLensCount);
    setElementText("diagnosticScopeLens", scopeLensCount);
    setElementText("diagnosticDepthLens", depthLensCount);
    setElementText("diagnosticViewLens", viewLensCount);
    setElementText("diagnosticJourneyNodes", journeyNodesCount);
    setElementText("diagnosticJourneyPaths", journeyPathsCount);
    setElementText("diagnosticJourneyHubs", journeyHubsCount);
    setElementText("diagnosticJourneyRecordsByPage", journeyRecordsByPage.length
      ? journeyRecordsByPage.map((item) => `${item.label}: ${item.nodes} node(s), ${item.paths} path(s), ${item.hubs} hub(s)`).join(" | ")
      : "None");
    setElementText("diagnosticRetainedJourneyPages", journeySnapshotState.retained.length
      ? journeySnapshotState.retained.map((item) => item.label).join(", ")
      : "None");
    setElementText("diagnosticExcludedJourneyPages", journeySnapshotState.excluded.length
      ? journeySnapshotState.excluded.map((item) => item.label).join(", ")
      : "None");
    setElementText("diagnosticJourneyExclusionReason", journeySnapshotState.excluded.length
      ? journeySnapshotState.excluded.map((item) => `${item.label}: ${item.reason}`).join(" | ")
      : "None");
    setElementText("diagnosticSemanticQuestions", semanticQuestionsCount);
    setElementText("diagnosticTrustVerification", trustVerificationCount);
    setElementText("diagnosticAdapter", activeAdapterName);
    setElementText("diagnosticAnalysisReason", studyData.analysisStatus?.reason || "None");
    setElementText("diagnosticAnalysisBuild", studyData.analysisStatus?.analysisBuildMarker || "None");
    setElementText("diagnosticActiveUrl", trimText(studyData.analysisStatus?.activeUrl || studyData.latestCapture?.url || "None", 140));
    setElementText("diagnosticSourceCapture", [
      studyData.analysisStatus?.sourceCaptureTitle || studyData.latestCapture?.title || "Untitled",
      studyData.analysisStatus?.sourceCaptureBook || "",
      studyData.analysisStatus?.sourceCaptureChapter ? `chapter ${studyData.analysisStatus.sourceCaptureChapter}` : "",
      studyData.analysisStatus?.sourceCaptureId || studyData.latestCapture?.id || "no capture id"
    ].filter(Boolean).join(" | "));
    setElementText("diagnosticBuilderScope", studyData.analysisStatus?.derivedBuildersScope || "None");
    setElementText("diagnosticMatthew2Builders", String(Boolean(studyData.analysisStatus?.matthew2DerivedBuildersRan)));
    setElementText("diagnosticDerivedLayerCounts", studyData.analysisStatus?.derivedLayerCounts
      ? Object.entries(studyData.analysisStatus.derivedLayerCounts).map(([key, value]) => `${key}: ${value}`).join(" | ")
      : [
        `passageFunctions: ${passageFunctionCount}`,
        `revelationPatterns: ${revelationPatternCount}`,
        `ontologyRoles: ${ontologyRoleCount}`,
        `originAuthorityPaths: ${originAuthorityPathCount}`,
        `entityRelationRoles: ${entityRelationRoleCount}`,
        `semanticContinuity: ${semanticContinuityCount}`,
        `movementSemantics: ${movementSemanticsCount}`,
        `semanticCausality: ${semanticCausalityCount}`,
        `teachingSemantics: ${teachingSemanticsCount}`,
        `principleRelationships: ${principleRelationshipsCount}`,
        `knowledgeGraph: ${knowledgeGraphCount}`,
        `principleNetworks: ${principleNetworksCount}`,
        `focusLens: ${focusLensCount}`,
        `scopeLens: ${scopeLensCount}`,
        `depthLens: ${depthLensCount}`,
        `viewLens: ${viewLensCount}`,
        `journeyNodes: ${journeyNodesCount}`,
        `journeyPaths: ${journeyPathsCount}`,
        `journeyHubs: ${journeyHubsCount}`,
        `semanticQuestions: ${semanticQuestionsCount}`,
        `trustVerification: ${trustVerificationCount}`
      ].join(" | "));
    setElementText("diagnosticPrinciples", principleCount);
    setElementText("diagnosticProphecyLinks", prophecyLinkCount);
    setElementText("diagnosticLastAnalysis", studyData.analysisStatus?.analyzedAt || "Never");

    if (totalRenderable === 0) {
      showDiagnosticMessage("No local study data was found. Run Full Analysis from the popup, then refresh this page.");
    } else {
      showDiagnosticMessage("");
    }
  }

  function showDiagnosticMessage(messageText) {
    const message = document.getElementById("diagnosticMessage");
    if (!message) {
      if (messageText) console.warn("I.C.E. Study Panel diagnostic message missing", messageText);
      return;
    }
    message.hidden = !messageText;
    message.textContent = messageText;
  }

  async function ensureFullStudyDataLoaded() {
    if (fullStudyDataLoaded) return;
    await loadStudyData({ full: true });
  }

  async function loadDeferredSection(label) {
    const entry = sectionEntryByLabel(label);
    if (!entry) return;
    showDiagnosticMessage(`Loading ${label}...`);
    await ensureFullStudyDataLoaded();
    loadedDeferredSections.add(label);
    renderStudy();
    showDiagnosticMessage("");
  }

  async function loadStudyScopeDiagnostics() {
    showDiagnosticMessage("Loading Study Scope source diagnostics...");
    await ensureFullStudyDataLoaded();
    safeRenderSection("Study Scope", renderVolumeContext, normalizeText(document.getElementById("searchInput")?.value || "").toLowerCase());
    showDiagnosticMessage("");
  }

  function scheduleRenderStudy(delay = 140) {
    window.clearTimeout(searchRenderTimer);
    searchRenderTimer = window.setTimeout(renderStudy, delay);
  }

  async function refreshStudyData(options = {}) {
    if (refreshInFlight) {
      refreshQueued = true;
      return refreshInFlight;
    }
    refreshInFlight = (async () => {
      try {
        await loadStudyData({ full: Boolean(options.full || fullStudyDataLoaded) });
        renderStudy();
      } catch (error) {
        showDiagnosticMessage(`Study Panel load error: ${error.message}`);
        console.debug("I.C.E. study load failed", {
          error: error.message
        });
      } finally {
        refreshInFlight = null;
        if (refreshQueued) {
          refreshQueued = false;
          scheduleRefreshStudyData({ full: fullStudyDataLoaded });
        }
      }
    })();
    return refreshInFlight;
  }

  function scheduleRefreshStudyData(options = {}, delay = 180) {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refreshStudyData(options);
    }, delay);
  }
  // Phase 5 foundation: this page is the future contextual research surface.
  // Current Page Capture is a captured text preview only. Future Source
  // Metadata and Chapter Summary / Source Summary sections should display
  // extracted document metadata separately from Narrative Events.
  // Later phases can attach scripture/conference-talk source collections,
  // cross-document character indexes, reference linking, side panel hover
  // integration, and report/presentation builder features without crowding the
  // quick-control popup. Principle views can later grow into doctrine
  // taxonomy, prophecy/fulfillment linking, theme clustering,
  // scripture/conference-talk comparison, speaker/author doctrine mapping,
  // user-curated principle notes, and future-event reasoning with
  // source-grounded confidence. Source Metadata should preserve author/speaker
  // metadata separately from narrator/entity roles. Source Metadata should become a parallel
  // context layer for book/source title, author, speaker, compiler,
  // translator/version, organization/source collection, date/year, source type,
  // referenced scripture links, and context notes; it should not pollute
  // Detected Actors unless the person/entity acts inside the captured text.
  // Entity Registry is now a compact derived graph-node preview. Future work
  // can add cross-page identity, aliases, original-language references,
  // tradition-specific interpretations, lineage/family graphs, and visual
  // persona profiles without overcrowding this quick study panel.
  document.getElementById("searchInput")?.addEventListener("input", () => {
    if (!semanticFocusInputUpdate) {
      currentSemanticFocus = null;
      updateSemanticFocusStatus();
    }
    scheduleRenderStudy();
  });  document.addEventListener("click", (event) => {
    const loadButton = event.target.closest("button[data-load-study-section]");
    if (loadButton) {
      event.preventDefault();
      loadDeferredSection(loadButton.dataset.loadStudySection).catch((error) => showDiagnosticMessage(`Load failed: ${error.message}`));
      return;
    }
    const diagnosticsButton = event.target.closest("button[data-load-study-scope-diagnostics]");
    if (diagnosticsButton) {
      event.preventDefault();
      loadStudyScopeDiagnostics().catch((error) => showDiagnosticMessage(`Diagnostics load failed: ${error.message}`));
      return;
    }
    const button = event.target.closest(".semantic-nav-button");
    if (!button) return;
    event.preventDefault();
    navigateSemanticFocus({
      targetSection: button.dataset.targetSection || "",
      targetKey: button.dataset.targetKey || "",
      searchTerm: button.dataset.searchTerm || "",
      focusLabel: button.dataset.focusLabel || button.textContent || "semantic focus"
    });
  });  document.getElementById("clearSemanticFocus")?.addEventListener("click", clearSemanticFocus);
  document.getElementById("volumeContextSection")?.addEventListener("click", handleVolumeContextAction);
  document.getElementById("refreshStudyData")?.addEventListener("click", refreshStudyData);
  document.getElementById("copyCompactPanelSummary")?.addEventListener("click", () => handleExportAction("compact").catch((error) => showDiagnosticMessage(`Export failed: ${error.message}`)));
  document.getElementById("copyCurrentSection")?.addEventListener("click", () => handleExportAction("section").catch((error) => showDiagnosticMessage(`Export failed: ${error.message}`)));
  document.getElementById("copyDiagnosticSnapshot")?.addEventListener("click", () => handleExportAction("diagnostic").catch((error) => showDiagnosticMessage(`Export failed: ${error.message}`)));
  window.addEventListener("focus", () => scheduleRefreshStudyData());
  window.addEventListener("pageshow", () => scheduleRefreshStudyData());
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;
    const aliases = fullStudyDataLoaded ? FULL_STORAGE_ALIASES : STARTUP_STORAGE_ALIASES;
    const watchedKeys = new Set(aliases.map((alias) => STORAGE_KEYS[alias]));
    if (Object.keys(changes).some((key) => watchedKeys.has(key))) {
      scheduleRefreshStudyData({ full: fullStudyDataLoaded });
    }
  });  await refreshStudyData();
});

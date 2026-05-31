const DEFAULT_SETTINGS = {
  enabled: true,
  strictMode: true,
  highlightPronouns: false,
  autoCaptureOnPageLoad: true,
  showPageOverlay: false
};
const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
const TIMELINE_STORAGE_KEY = "ICE_TIMELINE_ITEMS";
const EVENT_STORAGE_KEY = "ICE_EVENT_ITEMS";
const ORDERED_EVENTS_KEY = "ICE_ORDERED_EVENTS";
const ACTOR_TIMELINES_KEY = "ICE_ACTOR_TIMELINES";
const PRINCIPLE_STORAGE_KEY = "ICE_PRINCIPLE_ITEMS";
const PROPHECY_LINKS_KEY = "ICE_PROPHECY_LINKS";
const INTERACTION_GRAPH_KEY = "ICE_INTERACTION_GRAPH";
const SCENE_MODELS_KEY = "ICE_SCENE_MODELS";
const ENTITY_ROLE_ITEMS_KEY = "ICE_ENTITY_ROLE_ITEMS";
const ENTITY_REGISTRY_KEY = "ICE_ENTITY_REGISTRY";
const RELATIONSHIP_GRAPH_KEY = "ICE_RELATIONSHIP_GRAPH";
const CANONICAL_IDENTITIES_KEY = "ICE_CANONICAL_IDENTITIES";
const MENTION_INDEX_KEY = "ICE_MENTION_INDEX";
const DOM_SEMANTIC_HINTS_KEY = "ICE_DOM_SEMANTIC_HINTS";
const SOURCE_ADAPTERS_KEY = "ICE_SOURCE_ADAPTERS";
const ACTIVE_ADAPTER_KEY = "ICE_ACTIVE_ADAPTER";
const SCOPE_INTEGRITY_KEY = "ICE_SCOPE_INTEGRITY";
const SOURCE_DISCOVERY_INDEX_KEY = "ICE_SOURCE_DISCOVERY_INDEX";
const REFERENCE_GRAPH_KEY = "ICE_REFERENCE_GRAPH";
const REFERENCE_ROLES_KEY = "ICE_REFERENCE_ROLES";
const SEMANTIC_DISTINCTIONS_KEY = "ICE_SEMANTIC_DISTINCTIONS";
const ONTOLOGY_ROLES_KEY = "ICE_ONTOLOGY_ROLES";
const SEMANTIC_AMBIGUITIES_KEY = "ICE_SEMANTIC_AMBIGUITIES";
const ORIGIN_AUTHORITY_PATHS_KEY = "ICE_ORIGIN_AUTHORITY_PATHS";
const ENTITY_RELATION_ROLES_KEY = "ICE_ENTITY_RELATION_ROLES";
const SEMANTIC_CONTINUITY_KEY = "ICE_SEMANTIC_CONTINUITY";
const MOVEMENT_SEMANTICS_KEY = "ICE_MOVEMENT_SEMANTICS";
const SEMANTIC_CAUSALITY_KEY = "ICE_SEMANTIC_CAUSALITY";
const TEACHING_SEMANTICS_KEY = "ICE_TEACHING_SEMANTICS";
const PRINCIPLE_RELATIONSHIPS_KEY = "ICE_PRINCIPLE_RELATIONSHIPS";
const CHARACTER_INTERACTIONS_KEY = "ICE_CHARACTER_INTERACTIONS";
const SESSION_CONTINUITY_REVIEW_KEY = "ICE_SESSION_CONTINUITY_REVIEW";
const KNOWLEDGE_GRAPH_KEY = "ICE_KNOWLEDGE_GRAPH";
const PASSAGE_FUNCTIONS_KEY = "ICE_PASSAGE_FUNCTIONS";
const REVELATION_PATTERNS_KEY = "ICE_REVELATION_PATTERNS";
const SEMANTIC_EVENTS_KEY = "ICE_SEMANTIC_EVENTS";
const SEMANTIC_FLOW_CHAINS_KEY = "ICE_SEMANTIC_FLOW_CHAINS";
const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
const ANALYSIS_HISTORY_KEY = "ICE_ANALYSIS_HISTORY";
const ACTIVE_SOURCE_PAGE_KEY = "ICE_ACTIVE_SOURCE_PAGE";
const PIPELINE_THROTTLE_MS = 3500;

const ACTION_PATTERN = /\b(born|died|began|ended|founded|created|built|destroyed|conquered|traveled|appeared|said|commanded|signed|wrote|rose|fell|attacked|returned|departed|arrived|ruled|became|baptized|crucified|resurrected|preached|preaching|repent)\b/i;
const GENEALOGY_PATTERN = /\b(?:begat|generation(?:s)? of|genealogy|lineage)\b/i;
const SEMANTIC_DECOMPOSITION_PATTERN = /\b(thought|appeared|saying|bidden|took|knew her not|brought forth|called his name|call his name|fear not|save his people|fulfilled|spoken of the Lord by the prophet|wise men|Herod|chief priests|scribes|young child|child|warned of God|dream|flee into Egypt|departed|another way|destroy him|Bethlehem|Egypt|Nazareth|Nazarene)\b/i;
const PRINCIPLE_PATTERN = /\b(fulfilled|written|prophet|commanded|warned|worship|revelation|dream|blessing|law|mercy|obedience|faith|covenant|kingdom|righteousness|salvation)\b/i;
const PURPOSE_PRINCIPLE_PATTERN = /\b(that it might be fulfilled|for thus it is written|that shall rule|called a Nazarene)\b/i;
const PROPHECY_CANDIDATE_PATTERN = /\b(spoken(?:\s+of\s+the\s+Lord)?\s+by\s+the\s+prophets?|it is written|thus saith)\b/i;
const FULFILLMENT_CANDIDATE_PATTERN = /\b(that it might be fulfilled|was fulfilled|to fulf(?:il|ill))\b/i;
const SOURCE_HEADING_PATTERN = /^(?:Matthew|Mark|Luke|John)\s+\d+\b/i;
const SUMMARY_SEPARATOR_PATTERN = /[\u2014\u2013]/;
const CHAPTER_SUMMARY_PATTERN = /^(?:Matthew|Mark|Luke|John)?\s*\d*\s*Chapter\s+\d+\b/i;
const FULL_DATE_PATTERN = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan\.?|Feb\.?|Mar\.?|Apr\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Sept\.?|Oct\.?|Nov\.?|Dec\.?)\s+\d{1,2},\s+(\d{3,4})\b/gi;
const YEAR_PATTERN = /\b(1[5-9]\d{2}|20\d{2})\b/g;
const ORDERING_WEIGHTS = {
  first: -20,
  "before that": -10,
  "before this": -10,
  "before then": -10,
  then: 2,
  "after that": 4,
  afterward: 6,
  next: 8,
  later: 12,
  subsequently: 14,
  finally: 20
};
const ACTOR_NORMALIZATIONS = new Map([
  ["jesus", "JESUS"],
  ["christ", "JESUS"],
  ["jesus christ", "JESUS"],
  ["the young child", "JESUS"],
  ["young child", "JESUS"],
  ["the child", "JESUS"],
  ["child", "JESUS"],
  ["lord", "THE LORD"],
  ["the lord", "THE LORD"],
  ["herod", "Herod"],
  ["joseph", "Joseph"],
  ["mary", "Mary"],
  ["john", "John the Baptist"],
  ["john the baptist", "John the Baptist"],
  ["pharisees", "Pharisees"],
  ["sadducees", "Sadducees"],
  ["pharisees and sadducees", "Pharisees and Sadducees"],
  ["people", "People / multitudes"],
  ["the people", "People / multitudes"],
  ["multitudes", "People / multitudes"],
  ["jerusalem", "People / multitudes"],
  ["judaea", "People / multitudes"],
  ["jud\u00e6a", "People / multitudes"],
  ["jordan", "People / multitudes"],
  ["father", "Father"],
  ["spirit", "Spirit of GOD"],
  ["spirit of god", "Spirit of GOD"],
  ["the spirit of god", "Spirit of GOD"],
  ["wise men", "Wise men"],
  ["the wise men", "Wise men"],
  ["angel", "Angel"],
  ["the angel", "Angel"],
  ["angel of the lord", "Angel of the Lord"],
  ["the angel of the lord", "Angel of the Lord"],
  ["chief priests and scribes", "Chief priests and scribes"]
]);
const PLURAL_ACTOR_NAMES = new Set([
  "Wise men",
  "Chief priests and scribes",
  "Pharisees",
  "Sadducees",
  "Pharisees and Sadducees",
  "People / multitudes"
]);
const ACTOR_SOURCE_PATTERN = "(John the Baptist|John|Jesus Christ|Jesus|Christ|Herod|Joseph|Mary|Pharisees and Sadducees|Pharisees|Sadducees|chief priests and scribes|wise men|the wise men|the angel of the Lord|angel of the Lord|Spirit of God|the Spirit of God|Spirit|Father|the young child|young child|the child|child|the Lord|Lord|people|multitudes|Jerusalem|Jud(?:a|\\u00e6)ea|Jordan)";
const LEADING_ACTOR_PATTERN = new RegExp(
  `^(?:\\d+[:.)]?\\s*)?(?:(?:and|but|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\\s+)*(?:the\\s+)?${ACTOR_SOURCE_PATTERN}\\b`,
  "i"
);
const POST_VERB_ACTOR_PATTERN = new RegExp(
  `^(?:cometh|came|comes|went|goeth|went out|came out)\\s+(?:the\\s+)?${ACTOR_SOURCE_PATTERN}\\b`,
  "i"
);
const PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|but|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(he|she|they)\b/i;
const PLURAL_PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|but|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(they)\b/i;
const SINGULAR_PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|but|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(he|she)\b/i;

let lastPipelineStartedAt = 0;
let pipelinePromise = null;

chrome.runtime.onInstalled.addListener(async () => {
  const keys = Object.keys(DEFAULT_SETTINGS);
  const existing = await chrome.storage.sync.get(keys);
  const missing = {};

  for (const key of keys) {
    if (typeof existing[key] === "undefined") {
      missing[key] = DEFAULT_SETTINGS[key];
    }
  }

  if (Object.keys(missing).length > 0) {
    await chrome.storage.sync.set(missing);
  }
});

function normalizeWhitespace(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function textHash(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function splitSentences(text) {
  return normalizeWhitespace(text)
    .replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\./gi, "$1<dot>")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(/<dot>/g, "."))
    .filter(Boolean);
}

function trimText(text, maxLength = 180) {
  const normalized = normalizeWhitespace(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).trim()}...`;
}

async function captureSources() {
  const data = await chrome.storage.local.get([
    CAPTURE_STORAGE_KEY,
    CAPTURE_HISTORY_KEY
  ]);
  const latest = data[CAPTURE_STORAGE_KEY];
  const history = Array.isArray(data[CAPTURE_HISTORY_KEY])
    ? data[CAPTURE_HISTORY_KEY]
    : [];

  // The full analysis pipeline powers the current Study Panel context, so it
  // must not mix older saved captures into the latest page's timeline/events.
  // Capture history remains preserved locally for future document-library and
  // cross-document analysis flows.
  if (latest?.text) return [latest];

  const fallbackCapture = history.find((capture) => capture?.text);
  return fallbackCapture ? [fallbackCapture] : [];
}

function parseScriptureBookAndChapter(capture) {
  const title = normalizeWhitespace(capture.title || "");
  const url = normalizeWhitespace(capture.url || "");
  const combined = `${title} ${url}`;
  let book = "";
  let chapter = "";

  const titleMatch = title.match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
  const urlMatch = url.match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);

  if (titleMatch) {
    book = titleMatch[1].replace(/\b\w/g, (letter) => letter.toUpperCase());
    chapter = titleMatch[2];
  } else if (urlMatch) {
    const urlBooks = {
      matt: "Matthew",
      mark: "Mark",
      luke: "Luke",
      john: "John"
    };
    book = urlBooks[urlMatch[1].toLowerCase()] || "";
    chapter = urlMatch[2];
  } else if (/\bMatthew\b/i.test(combined)) {
    book = "Matthew";
  }

  return { book, chapter };
}

// Phase 5.8 source hierarchy foundation. Future source metadata can expand
// this lightweight context into Old Testament / New Testament / Book of
// Mormon / Conference Talks collections, speaker/date metadata, author vs narrator distinctions, source and
// historical chronology, cross-document references, and semantic parent/child
// trees: Corpus -> Collection -> Source -> Chapter -> Scene -> Event -> Action.
function buildSourceContext(capture) {
  const { book, chapter } = parseScriptureBookAndChapter(capture || {});
  const url = capture?.url || "";
  const title = capture?.title || "";
  const looksScripture = /\b(Matthew|Mark|Luke|John)\b/i.test(`${title} ${url}`) ||
    /\/scriptures\//i.test(url);
  const traditionalAuthors = new Map([
    ["Matthew", "Matthew"],
    ["Mark", "Mark"],
    ["Luke", "Luke"],
    ["John", "John"]
  ]);
  const traditionalAuthor = looksScripture && book
    ? traditionalAuthors.get(book) || ""
    : "";

  return {
    sourceCaptureId: capture?.id || "",
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



function sourceAdapterRegistry() {
  return [
    {
      adapterId: "lds-scripture-v1",
      adapterName: "lds_scripture_adapter",
      supportedDomains: ["churchofjesuschrist.org", "www.churchofjesuschrist.org"],
      supportedPatterns: ["/scriptures/", "[data-eng-ref]", ".verse", ".study-note-ref", ".deity-name"],
      semanticCapabilities: ["verse_scope", "data_eng_ref", "deity_name", "study_note_ref", "scripture_metadata", "chapter_metadata"],
      confidence: "probable",
      version: "0.1.0"
    },
    {
      adapterId: "generic-html-v1",
      adapterName: "generic_html_adapter",
      supportedDomains: ["*"],
      supportedPatterns: ["article", "main", "[role='main']", "meta[name='description']", "h1", "p"],
      semanticCapabilities: ["metadata", "headings", "paragraphs", "generic_semantic_hints"],
      confidence: "possible",
      version: "0.1.0"
    },
    {
      adapterId: "plain-text-v1",
      adapterName: "plain_text_adapter",
      supportedDomains: ["*"],
      supportedPatterns: ["textContent"],
      semanticCapabilities: ["plain_text_capture", "minimal_metadata"],
      confidence: "possible",
      version: "0.1.0"
    }
  ];
}

function deriveActiveSourceAdapter(captures, domSemanticHints) {
  const capture = (captures || []).find((item) => item?.sourceAdapter) || captures?.[0] || null;
  const adapter = capture?.sourceAdapter;
  if (adapter) {
    return {
      ...adapter,
      sourceCaptureId: capture?.id || "",
      sourceTitle: capture?.title || "",
      sourceUrl: capture?.url || "",
      derivedFrom: "capture-dom-detection"
    };
  }

  const hintTypes = new Set((domSemanticHints || []).map((hint) => hint.hintType));
  const registry = sourceAdapterRegistry();
  if (hintTypes.has("verse_scope") || hintTypes.has("study_note_ref") || hintTypes.has("deity_name")) {
    const lds = registry.find((item) => item.adapterName === "lds_scripture_adapter");
    return {
      ...lds,
      detectedCapabilities: lds.semanticCapabilities.filter((capability) => {
        if (capability === "verse_scope" || capability === "data_eng_ref") return hintTypes.has("verse_scope");
        if (capability === "study_note_ref") return hintTypes.has("study_note_ref");
        if (capability === "deity_name") return hintTypes.has("deity_name");
        return true;
      }),
      sourceCaptureId: capture?.id || "",
      sourceTitle: capture?.title || "",
      sourceUrl: capture?.url || "",
      fallbackMode: false,
      derivedFrom: "dom-semantic-hints"
    };
  }

  const fallback = registry.find((item) => item.adapterName === (capture?.text ? "generic_html_adapter" : "plain_text_adapter"));
  return {
    ...fallback,
    detectedCapabilities: fallback.semanticCapabilities,
    sourceCaptureId: capture?.id || "",
    sourceTitle: capture?.title || "",
    sourceUrl: capture?.url || "",
    fallbackMode: true,
    derivedFrom: "pipeline-fallback"
  };
}

function scopeSlug(value) {
  return normalizeWhitespace(String(value || ""))
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "") || "unknown";
}

function scopeSegment(value, fallback = "unknown") {
  const slug = scopeSlug(value || fallback);
  return slug === "unknown" && fallback !== "unknown" ? scopeSlug(fallback) : slug;
}

function sourceScopePrefix(context = {}) {
  const sourceUrl = context.sourceUrl || context.sourceUri || "";
  if (context.sourceType === "scripture" || context.collection === "scripture" || /\/scriptures\//i.test(sourceUrl)) {
    const testament = /\/scriptures\/nt\//i.test(sourceUrl) ? "nt" :
      /\/scriptures\/ot\//i.test(sourceUrl) ? "ot" : "scripture";
    return [
      "scripture",
      testament,
      scopeSegment(context.book || context.sourceTitle || "source"),
      scopeSegment(context.chapter || "chapter")
    ].join(".");
  }

  return ["generic", "page"].join(".");
}

function verseNumberFromRef(verseRef) {
  const value = normalizeWhitespace(verseRef || "");
  const match = value.match(/(?:^|:)(\d{1,3})(?:[a-z])?$/i) || value.match(/\b(\d{1,3})[a-z]?$/i);
  return match?.[1] || "";
}

function noteKeyFromRef(value) {
  const text = normalizeWhitespace(value || "").toLowerCase();
  const splitMatch = text.match(/(?:note|study-note|fn|footnote|#|:)(\d{1,3})[_-]?([a-z])\b/) || text.match(/\b(\d{1,3})[_-]([a-z])\b/);
  if (splitMatch) return `${splitMatch[1]}${splitMatch[2]}`;
  const match = text.match(/(?:note|study-note|fn|footnote|#|:)(\d{1,3}[a-z])\b/) || text.match(/\b(\d{1,3}[a-z])\b/);
  return match?.[1] || "";
}

function verseNumberFromDomId(value) {
  const text = normalizeWhitespace(value || "");
  const match = text.match(/^(?:p|verse|v)?(\d{1,3})$/i) || text.match(/(?:^|[-_:])(\d{1,3})(?:[-_:]|$)/);
  return match?.[1] || "";
}

function itemVerseNumber(item = {}) {
  const attributes = item.attributes || {};
  return item.verseNumber ||
    verseNumberFromRef(item.verseRef) ||
    verseNumberFromRef(attributes["data-eng-ref"]) ||
    verseNumberFromDomId(item.domId) ||
    inferVerseNumberFromText([
      item.anchorText,
      item.sourceSnippet,
      item.evidencePhrase,
      item.text,
      item.sourcePhrase,
      item.normalizedMeaning
    ].filter(Boolean).join(" "));
}

function scopeKindForItem(item = {}, type = "item") {
  if (type === "dom_hint" && item.hintType === "study_note_ref") return "note";
  if (type === "dom_hint" && item.hintType === "source_marker") return "note";
  if (type === "dom_hint" && item.hintType === "cross_reference_ref") return "note";
  if (type === "relationship") return "relationship";
  if (type === "identity") return "identity";
  if (type === "flow_chain") return "flow_chain";
  if (type === "revelation_pattern") return "revelation_pattern";
  if (type === "reference_role") return "reference_role";
  if (type === "source_discovery") return item.refType || "source_discovery";
  return type;
}

function scopePathForItem(item, type, index, context, verseNumber, timelinePosition) {
  const prefix = sourceScopePrefix(context);
  const noteMarker = normalizeWhitespace(item.linkText || item.text || item.attributes?.marker || "").toLowerCase();
  const markerNoteKey = item.refType === "study_note" && verseNumber && /^[a-z]$/i.test(noteMarker)
    ? `${verseNumber}${noteMarker}`
    : "";
  const noteKey = markerNoteKey || noteKeyFromRef([
    item.verseRef,
    item.domId,
    item.attributes?.href,
    item.attributes?.marker,
    item.attributes?.linkedText,
    item.href,
    item.linkText,
    item.sourceElement,
    item.text
  ].filter(Boolean).join(" "));

  if (noteKey) return `${prefix}.note.${noteKey}`;
  if (verseNumber) return `${prefix}.verse.${verseNumber}`;

  if (prefix === "generic.page") {
    const section = item.section || context.section || 1;
    const paragraph = item.paragraph || item.sentenceIndex || item.sequenceIndex || timelinePosition || index + 1;
    return `generic.page.section.${scopeSegment(section)}.paragraph.${scopeSegment(paragraph)}`;
  }

  const kind = scopeKindForItem(item, type);
  return `${prefix}.${scopeSegment(kind)}.${scopeSegment(timelinePosition || index + 1)}`;
}

function enrichScopeItem(item, type, index, activeAdapter) {
  if (!item) return item;
  const context = item.sourceContext || {};
  const sourceCaptureId = item.sourceCaptureId || context.sourceCaptureId || "";
  const sourceUri = item.sourceUri || item.sourceUrl || context.sourceUrl || "";
  const chapter = item.chapter || context.chapter || "";
  const book = item.book || context.book || "";
  const verseNumber = itemVerseNumber(item);
  const timelinePosition = item.timelinePosition || item.sequenceOrder || item.sequenceIndex || item.sentenceIndex || index + 1;
  const enrichedContext = {
    ...context,
    sourceCaptureId,
    sourceUrl: sourceUri || context.sourceUrl || "",
    book,
    chapter
  };

  item.sourceContext = enrichedContext;
  item.verseNumber = verseNumber || item.verseNumber || "";
  item.verseRef = item.verseRef || (chapter && verseNumber ? `${chapter}:${verseNumber}` : "");
  item.chapter = chapter || context.chapter || "";
  item.book = book || context.book || "";
  item.sourceUri = sourceUri;
  item.sourceCaptureId = sourceCaptureId;
  item.adapterId = item.adapterId || activeAdapter?.adapterId || "";
  item.timelinePosition = timelinePosition;
  item.scopePath = (type === "reference_role" || type === "semantic_distinction" || type === "ontology_role" || type === "semantic_ambiguity" || type === "origin_authority_path") && item.scopePath
    ? item.scopePath
    : scopePathForItem(item, type, index, enrichedContext, verseNumber, timelinePosition);
  return item;
}

function enrichScopeCollection(items, type, activeAdapter) {
  for (const [index, item] of (items || []).entries()) {
    enrichScopeItem(item, type, index, activeAdapter);
  }
}

function enrichSemanticFlowChainScopes(chains, activeAdapter) {
  for (const [chainIndex, chain] of (chains || []).entries()) {
    enrichScopeItem(chain, "flow_chain", chainIndex, activeAdapter);

    for (const [nodeIndex, node] of (chain.nodes || []).entries()) {
      node.sourceContext = node.sourceContext || chain.sourceContext || {};
      node.sourceCaptureId = node.sourceCaptureId || chain.sourceCaptureId || node.sourceContext.sourceCaptureId || "";
      enrichScopeItem(node, "event", nodeIndex, activeAdapter);
      node.adapterId = node.adapterId || activeAdapter?.adapterId || "";
    }

    for (const [relationshipIndex, relationship] of (chain.relationships || []).entries()) {
      relationship.sourceContext = relationship.sourceContext || chain.sourceContext || {};
      relationship.sourceCaptureId = relationship.sourceCaptureId || chain.sourceCaptureId || relationship.sourceContext.sourceCaptureId || "";
      enrichScopeItem(relationship, "relationship", relationshipIndex, activeAdapter);
    }
  }
}

function applyScopeIntegrity(data, activeAdapter) {
  enrichScopeCollection(data.domSemanticHints, "dom_hint", activeAdapter);
  enrichScopeCollection(data.mentionIndex, "mention", activeAdapter);
  enrichScopeCollection(data.semanticEvents, "event", activeAdapter);
  enrichScopeCollection(data.relationshipGraph, "relationship", activeAdapter);
  enrichScopeCollection(data.canonicalIdentities, "identity", activeAdapter);
  enrichSemanticFlowChainScopes(data.semanticFlowChains, activeAdapter);
  enrichScopeCollection(data.sourceDiscoveryIndex, "source_discovery", activeAdapter);
  enrichScopeCollection(data.revelationPatterns, "revelation_pattern", activeAdapter);
  enrichScopeCollection(data.referenceRoles, "reference_role", activeAdapter);
  enrichScopeCollection(data.semanticDistinctions, "semantic_distinction", activeAdapter);
  enrichScopeCollection(data.ontologyRoles, "ontology_role", activeAdapter);
  enrichScopeCollection(data.semanticAmbiguities, "semantic_ambiguity", activeAdapter);
  enrichScopeCollection(data.originAuthorityPaths, "origin_authority_path", activeAdapter);
  enrichScopeCollection(data.entityRelationRoles, "entity_relation_role", activeAdapter);
  enrichScopeCollection(data.semanticContinuity, "semantic_continuity", activeAdapter);
  enrichScopeCollection(data.movementSemantics, "movement_semantic", activeAdapter);
  enrichScopeCollection(data.semanticCausality, "semantic_causality", activeAdapter);
  enrichScopeCollection(data.teachingSemantics, "teaching_semantic", activeAdapter);
  enrichScopeCollection(data.principleRelationships, "principle_relationship", activeAdapter);
  enrichScopeCollection(data.characterInteractions, "character_interaction", activeAdapter);
}

function createScopeIntegrityReport(data, activeAdapter) {
  const scopedItems = [
    ...(data.domSemanticHints || []).map((item) => ({ ...item, scopeLayer: "dom_hint" })),
    ...(data.mentionIndex || []).map((item) => ({ ...item, scopeLayer: "mention" })),
    ...(data.semanticEvents || []).map((item) => ({ ...item, scopeLayer: "semantic_event" })),
    ...(data.relationshipGraph || []).map((item) => ({ ...item, scopeLayer: "relationship" })),
    ...(data.canonicalIdentities || []).map((item) => ({ ...item, scopeLayer: "canonical_identity" })),
    ...(data.semanticFlowChains || []).map((item) => ({ ...item, scopeLayer: "semantic_flow_chain" })),
    ...(data.sourceDiscoveryIndex || []).map((item) => ({ ...item, scopeLayer: "source_discovery" })),
    ...(data.referenceGraph || []).map((item) => ({ ...item, scopePath: item.fromScopePath, scopeLayer: "reference_graph" })),
    ...(data.passageFunctions || []).map((item) => ({ ...item, scopeLayer: "passage_function" })),
    ...(data.revelationPatterns || []).map((item) => ({ ...item, scopeLayer: "revelation_pattern" })),
    ...(data.referenceRoles || []).map((item) => ({ ...item, scopeLayer: "reference_role" })),
    ...(data.semanticDistinctions || []).map((item) => ({ ...item, scopeLayer: "semantic_distinction" })),
    ...(data.ontologyRoles || []).map((item) => ({ ...item, scopeLayer: "ontology_role" })),
    ...(data.semanticAmbiguities || []).map((item) => ({ ...item, scopeLayer: "semantic_ambiguity" })),
    ...(data.originAuthorityPaths || []).map((item) => ({ ...item, scopeLayer: "origin_authority_path" })),
    ...(data.entityRelationRoles || []).map((item) => ({ ...item, scopeLayer: "entity_relation_role" })),
    ...(data.semanticContinuity || []).map((item) => ({ ...item, scopeLayer: "semantic_continuity" })),
    ...(data.movementSemantics || []).map((item) => ({ ...item, scopeLayer: "movement_semantic" })),
    ...(data.semanticCausality || []).map((item) => ({ ...item, scopeLayer: "semantic_causality" })),
    ...(data.teachingSemantics || []).map((item) => ({ ...item, scopeLayer: "teaching_semantic" })),
    ...(data.principleRelationships || []).map((item) => ({ ...item, scopeLayer: "principle_relationship" })),
    ...(data.characterInteractions || []).map((item) => ({ ...item, scopeLayer: "character_interaction" }))
  ];
  const scopedCount = scopedItems.filter((item) => item?.scopePath).length;
  const missingScopeCount = scopedItems.length - scopedCount;
  const sampleScopePaths = Array.from(new Set(scopedItems
    .map((item) => item?.scopePath)
    .filter(Boolean)))
    .slice(0, 8);
  const countsByLayer = scopedItems.reduce((counts, item) => {
    const key = item.scopeLayer || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

  return {
    scopedItemsCount: scopedCount,
    missingScopeCount,
    totalItemsCount: scopedItems.length,
    adapterId: activeAdapter?.adapterId || "",
    adapterName: activeAdapter?.adapterName || "",
    countsByLayer,
    sampleScopePaths,
    generatedAt: new Date().toISOString()
  };
}

function createDomSemanticHints(captures) {
  const hints = [];
  const seen = new Set();

  for (const capture of captures || []) {
    const sourceContext = buildSourceContext(capture || {});
    for (const hint of capture?.domSemanticHints || []) {
      const text = normalizeWhitespace(hint.text || "");
      if (!text) continue;
      const normalizedText = normalizeWhitespace(hint.normalizedText || text).toLowerCase();
      const key = [
        sourceContext.sourceCaptureId || capture?.id || "",
        hint.hintType || "unknown",
        normalizedText,
        hint.verseRef || "",
        hint.verseNumber || "",
        hint.domId || "",
        hint.selectorHint || ""
      ].join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      hints.push({
        id: hint.id || `${Date.now()}-${textHash(`dom-hint|${key}`)}`,
        sourceCaptureId: sourceContext.sourceCaptureId || capture?.id || "",
        sourceUrl: capture?.url || hint.sourceUrl || "",
        sourceContext: {
          ...sourceContext,
          ...(hint.sourceContext || {}),
          sourceCaptureId: sourceContext.sourceCaptureId || capture?.id || "",
          sourceTitle: sourceContext.sourceTitle || capture?.title || "",
          sourceUrl: sourceContext.sourceUrl || capture?.url || ""
        },
        hintType: hint.hintType || "source_marker",
        text,
        normalizedText,
        verseRef: hint.verseRef || "",
        verseNumber: hint.verseNumber || "",
        domId: hint.domId || "",
        selectorHint: hint.selectorHint || "",
        attributes: hint.attributes || {},
        confidence: hint.confidence || "source-markup",
        source: hint.source || "dom",
        originalText: hint.originalText || "",
        entityClass: hint.entityClass || "",
        noHighlight: Boolean(hint.noHighlight),
        scopePath: hint.scopePath || [
          sourceContext.collection || sourceContext.sourceType || "source",
          sourceContext.book || sourceContext.sourceTitle || "unknown-source",
          sourceContext.chapter ? `chapter:${sourceContext.chapter}` : "",
          hint.verseRef ? `verse:${hint.verseRef}` : ""
        ].filter(Boolean).join(" > ")
      });
    }
  }

  // Phase 7.2 keeps DOM metadata as optional enrichment. Future site adapters
  // can map source markup to full semantic scope paths, note graphs, and
  // cross-reference ingestion without making markup mandatory for analysis.
  return hints;
}
function genericSemanticText(value = "") {
  return normalizeWhitespace(String(value || "")).toLowerCase();
}

function genericSourceDiscoveryQuality(item = {}, activeAdapter = {}) {
  const isGeneric = activeAdapter?.adapterName === "generic_html_adapter";
  const text = genericSemanticText(item.linkText || "");
  const surrounding = genericSemanticText(item.surroundingText || "");
  const href = genericSemanticText(item.href || "");
  const sourceElement = genericSemanticText(item.sourceElement || "");
  const structuralRole = genericSemanticText(item.structuralRole || "");
  const combined = `${text} ${surrounding} ${href} ${sourceElement} ${structuralRole}`;
  let score = 40;
  const reasons = [];

  if (!isGeneric) {
    return {
      score: 100,
      tier: "scripture_adapter_reference",
      hiddenByDefault: false,
      reason: "scripture adapter preserves source discovery behavior"
    };
  }

  if (item.refType === "study_note" || item.refType === "cross_reference") score += 35;
  if (item.refType === "external_link" || item.refType === "related_content") score += 10;
  if (item.refType === "media") {
    score -= 35;
    reasons.push("generic media reference");
  }
  if (/heading_or_title|main_content/.test(structuralRole)) score += 30;
  if (/generic_result_card/.test(structuralRole)) score -= 12;
  if (/navigation_chrome/.test(structuralRole)) {
    score -= 35;
    reasons.push("navigation/search chrome");
  }
  if (/\b(ontology|semantic|architecture|relationship|class|entity|knowledge|paper|article|documentation|reference|source|schema|model|analysis)\b/.test(combined)) score += 28;
  if (/\b(images?|videos?|shopping|news|maps|books|flights|finance|all results|search tools|more results|people also search|related searches)\b/.test(text) && text.length <= 28) {
    score -= 45;
    reasons.push("generic search UI label");
  }
  if (/\b(youtube|youtu\.be|google\.com\/search|google\.com\/imgres|tbm=isch|tbm=vid|\/videos?\/|\/watch\?)/.test(href)) {
    score -= 30;
    reasons.push("generic media/search result rail");
  }
  if (text.length < 4) {
    score -= 25;
    reasons.push("very short link text");
  }
  if (text.length > 48 && /\b(ontology|semantic|architecture|relationship|class|entity|model|analysis)\b/.test(text)) score += 12;

  const tier = score >= 70 ? "high_semantic_value" : score >= 45 ? "generic_semantic_candidate" : "low_value_generic_media_or_chrome";
  return {
    score,
    tier,
    hiddenByDefault: tier === "low_value_generic_media_or_chrome",
    reason: reasons.join("; ") || (tier === "high_semantic_value" ? "generic semantically useful reference" : "generic exploratory reference")
  };
}

function shouldKeepGenericSourceDiscovery(item = {}, quality = {}) {
  if (quality.score >= 28) return true;
  return /\b(ontology|semantic|architecture|relationship|class|entity|model|analysis)\b/i.test(`${item.linkText || ""} ${item.surroundingText || ""}`);
}
function normalizeSourceDiscoveryItem(capture, link, activeAdapter, index) {
  const sourceContext = buildSourceContext(capture || {});
  const href = normalizeWhitespace(link?.href || "");
  const linkText = trimText(link?.linkText || href, 180);
  if (!href || !linkText) return null;

  const item = {
    id: link.id || `${Date.now()}-${textHash(`source-discovery|${capture?.id || ""}|${href}|${linkText}|${index}`)}`,
    sourceUrl: capture?.url || link.sourceUrl || "",
    sourceCaptureId: capture?.id || link.sourceCaptureId || "",
    adapterId: activeAdapter?.adapterId || "",
    discoveryScope: link.discoveryScope || "current_page",
    linkText,
    href,
    refType: link.refType || "external_link",
    sourceElement: link.sourceElement || "",
    structuralRole: link.structuralRole || "",
    surroundingText: trimText(link.surroundingText || "", 260),
    verseRef: link.verseRef || "",
    verseNumber: link.verseNumber || "",
    scopePath: link.scopePath || "",
    sourceContext: {
      ...sourceContext,
      sourceCaptureId: capture?.id || sourceContext.sourceCaptureId || "",
      sourceTitle: sourceContext.sourceTitle || capture?.title || "",
      sourceUrl: sourceContext.sourceUrl || capture?.url || ""
    },
    confidence: link.confidence || "possible"
  };

  const quality = genericSourceDiscoveryQuality(item, activeAdapter);
  item.semanticUsefulnessScore = quality.score;
  item.genericDiscoveryTier = quality.tier;
  item.hiddenByDefault = quality.hiddenByDefault;
  item.lowValueReason = quality.reason;
  item.adapterMode = activeAdapter?.adapterName === "generic_html_adapter" ? "generic_web_semantic_mode" : activeAdapter?.adapterName === "lds_scripture_adapter" ? "scripture_semantic_mode" : "plain_text_mode";

  return enrichScopeItem(item, "source_discovery", index, activeAdapter);
}

function createSourceDiscoveryIndex(captures, activeAdapter) {
  const index = [];
  const seen = new Set();

  for (const capture of captures || []) {
    for (const link of capture?.sourceDiscoveryLinks || []) {
      const item = normalizeSourceDiscoveryItem(capture, link, activeAdapter, index.length);
      if (!item) continue;
      if (activeAdapter?.adapterName === "generic_html_adapter" && !shouldKeepGenericSourceDiscovery(item, { score: item.semanticUsefulnessScore })) continue;
      const key = [
        item.sourceCaptureId,
        item.refType,
        item.href,
        item.linkText,
        item.scopePath
      ].join("|").toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      index.push(item);
    }
  }

  return index.sort((a, b) =>
    Number(b.semanticUsefulnessScore || 0) - Number(a.semanticUsefulnessScore || 0) ||
    a.refType.localeCompare(b.refType) ||
    (a.scopePath || "").localeCompare(b.scopePath || "") ||
    a.linkText.localeCompare(b.linkText)
  );
}

function referenceRelationshipType(refType) {
  const map = new Map([
    ["study_note", "has_study_note"],
    ["cross_reference", "has_cross_reference"],
    ["media", "has_media_reference"],
    ["chapter_nav", "has_chapter_navigation"],
    ["table_of_contents", "has_table_of_contents_link"],
    ["source_collection", "has_source_collection_link"],
    ["related_content", "has_external_reference"],
    ["external_link", "has_external_reference"]
  ]);

  return map.get(refType || "") || "has_external_reference";
}

function createReferenceGraph(sourceDiscoveryIndex, activeAdapter) {
  const graph = [];
  const seen = new Set();

  for (const [index, item] of (sourceDiscoveryIndex || []).entries()) {
    if (!item?.href) continue;
    if (activeAdapter?.adapterName === "generic_html_adapter" && item.hiddenByDefault) continue;
    const relationshipType = referenceRelationshipType(item.refType);
    const fromScopePath = item.scopePath || "";
    const key = [
      item.sourceCaptureId || "",
      fromScopePath,
      item.href,
      item.linkText || "",
      relationshipType
    ].join("|").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    graph.push({
      id: `${Date.now()}-${textHash(`reference-graph|${key}|${index}`)}`,
      sourceUrl: item.sourceUrl || item.sourceContext?.sourceUrl || "",
      sourceCaptureId: item.sourceCaptureId || item.sourceContext?.sourceCaptureId || "",
      adapterId: item.adapterId || activeAdapter?.adapterId || "",
      fromScopePath,
      fromText: item.sourceElement || item.verseRef || fromScopePath || item.sourceContext?.sourceTitle || "current page",
      toHref: item.href || "",
      toText: item.linkText || item.href || "",
      refType: item.refType || "external_link",
      relationshipType,
      confidence: item.confidence || "possible",
      sourceDiscoveryId: item.id || ""
    });
  }

  return graph.sort((a, b) =>
    a.relationshipType.localeCompare(b.relationshipType) ||
    (a.fromScopePath || "").localeCompare(b.fromScopePath || "") ||
    a.toText.localeCompare(b.toText)
  );
}

function verseRangeFromReferenceScope(scopePath = "") {
  const verseMatch = String(scopePath || "").match(/^scripture\.nt\.([^.]+)\.(\d+)\.(?:verse|note)\.(\d+)/i);
  if (verseMatch) return `${capitalizeWordForReferenceRole(verseMatch[1])} ${verseMatch[2]}:${verseMatch[3]}`;
  const chapterMatch = String(scopePath || "").match(/^scripture\.nt\.([^.]+)\.(\d+)/i);
  if (chapterMatch) return `${capitalizeWordForReferenceRole(chapterMatch[1])} ${chapterMatch[2]}`;
  return scopePath || "Current scope";
}

function capitalizeWordForReferenceRole(value) {
  const text = normalizeWhitespace(value || "");
  if (!text) return "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
}

function passageFunctionsForReferenceRole(role, passageFunctions = []) {
  const byRole = {
    davidic_lineage_support: ["genealogy_establishes_identity"],
    abrahamic_covenant_support: ["genealogy_establishes_identity"],
    messianic_identity_support: ["genealogy_establishes_identity", "divine_message_instruction"],
    prophecy_fulfillment_support: ["prophecy_fulfillment_identification"],
    name_meaning_support: ["divine_message_instruction", "obedient_response_and_naming"]
  };
  const allowed = new Set(byRole[role] || []);
  return (passageFunctions || [])
    .filter((item) => allowed.has(item.passageFunction))
    .map((item) => item.passageFunction || item.id)
    .filter(Boolean);
}

function referenceRoleConfigForItem(item = {}) {
  const linkText = normalizeWhitespace(item.linkText || "");
  const haystack = normalizeWhitespace([item.linkText, item.href, item.scopePath, item.verseRef].filter(Boolean).join(" ")).toLowerCase();
  const scopePath = item.scopePath || "";
  const weakStandaloneReference = /^(?:shalt|kill|in)$/i.test(linkText);
  if (item.refType !== "study_note" && item.refType !== "cross_reference") return null;
  if (weakStandaloneReference) return null;

  if (/\bdavid\b/i.test(linkText)) {
    return {
      referenceRole: "davidic_lineage_support",
      linkedThemes: ["Davidic kingship", "covenant lineage", "messianic identity", "fulfillment framing"],
      linkedEntities: ["David", "JESUS CHRIST"],
      confidence: "explicit"
    };
  }

  if (/\babraham\b/i.test(linkText)) {
    return {
      referenceRole: "abrahamic_covenant_support",
      linkedThemes: ["Abrahamic covenant", "covenant lineage", "messianic identity", "fulfillment framing"],
      linkedEntities: ["Abraham", "JESUS CHRIST"],
      confidence: "explicit"
    };
  }

  if (/\bjesus christ\b/i.test(linkText) && /\bbaptism\b/i.test(linkText)) {
    return {
      referenceRole: "baptism_context_support",
      linkedThemes: ["baptism", "divine manifestation", "righteousness fulfillment", "chapter context"],
      linkedEntities: ["JESUS", "JESUS CHRIST"],
      relatedCharacters: ["John", "Pharisees", "Sadducees", "multitude / people"],
      primaryReferencedBeing: "JESUS",
      canonicalIdentity: "JESUS CHRIST",
      confidence: "explicit"
    };
  }
  if (/\bjesus christ\b|\bchrist\b/i.test(linkText) || /matthew\.1\.(?:verse|note)\.1\b/i.test(scopePath)) {
    return {
      referenceRole: "messianic_identity_support",
      linkedThemes: ["messianic identity", "covenant lineage", "fulfillment framing"],
      linkedEntities: ["JESUS CHRIST", "David", "Abraham"],
      confidence: "probable"
    };
  }

  if (/fulfill|fulfilled|prophet|prophecy|esaias|isaiah|emmanuel|spoken/i.test(linkText) || /matthew\.1\.(?:verse|note)\.(?:22|23|22a|23a|23b|23c|23d)\b/i.test(scopePath)) {
    return {
      referenceRole: "prophecy_fulfillment_support",
      linkedThemes: ["prophecy fulfillment", "narrator witness", "divine speech", "Emmanuel"],
      linkedEntities: ["THE LORD", "prophet", "scripture narrator", "JESUS CHRIST"],
      confidence: /fulfill|prophet|prophecy|emmanuel/i.test(linkText) ? "explicit" : "probable"
    };
  }

  if (/\bname\b|\bjesus\b|save|sins/i.test(linkText) || /matthew\.1\.(?:verse|note)\.(?:21|21a|21b|21c|25)\b/i.test(scopePath) || haystack.includes("note21")) {
    return {
      referenceRole: "name_meaning_support",
      linkedThemes: ["name revelation", "mission meaning", "mission naming", "salvation"],
      linkedEntities: ["JESUS", "JESUS CHRIST", "Joseph", "AngEL Of THE LORD"],
      confidence: /name|jesus|save|sins/i.test(linkText) ? "explicit" : "probable"
    };
  }

  return null;
}

function createReferenceRoles(sourceDiscoveryIndex = [], referenceGraph = [], passageFunctions = [], revelationPatterns = [], canonicalIdentities = []) {
  const roles = [];
  const seen = new Set();
  const graphByDiscovery = new Map((referenceGraph || [])
    .filter((edge) => edge.sourceDiscoveryId)
    .map((edge) => [edge.sourceDiscoveryId, edge]));
  const hasCanonicalJesus = (canonicalIdentities || []).some((item) => normalizeWhitespace(item.canonicalName || "").toLowerCase() === "jesus christ");

  for (const item of sourceDiscoveryIndex || []) {
    const config = referenceRoleConfigForItem(item);
    if (!config) continue;
    const graphEdge = graphByDiscovery.get(item.id || "") || {};
    const linkedEntities = Array.from(new Set([
      ...(config.linkedEntities || []),
      ...(hasCanonicalJesus && (config.linkedEntities || []).includes("JESUS") ? ["JESUS CHRIST"] : [])
    ].filter(Boolean)));
    const linkedPassageFunctions = passageFunctionsForReferenceRole(config.referenceRole, passageFunctions);
    const key = [item.id || "", item.scopePath || "", item.linkText || "", config.referenceRole].join("|").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    roles.push({
      id: `${Date.now()}-${textHash(`reference-role|${key}`)}`,
      sourceDiscoveryId: item.id || "",
      sourceCaptureId: item.sourceCaptureId || item.sourceContext?.sourceCaptureId || "",
      sourceContext: item.sourceContext || {},
      scopePath: item.scopePath || graphEdge.fromScopePath || "",
      verseRange: verseRangeFromReferenceScope(item.scopePath || graphEdge.fromScopePath || ""),
      discoveredReference: item.linkText || graphEdge.toText || item.href || "reference",
      referenceHref: item.href || graphEdge.toHref || "",
      referenceRole: config.referenceRole,
      linkedThemes: config.linkedThemes || [],
      relatedCharacters: config.relatedCharacters || [],
      primaryReferencedBeing: config.primaryReferencedBeing || "",
      canonicalIdentity: config.canonicalIdentity || "",
      linkedPassageFunctions,
      linkedEntities,
      relatedRevelationPatterns: (revelationPatterns || [])
        .filter((pattern) => config.referenceRole === "name_meaning_support" && /Matthew 1:20-21/i.test(pattern.verseRange || ""))
        .map((pattern) => pattern.revelationType || pattern.id)
        .filter(Boolean),
      evidence: [
        item.linkText ? `discovered reference: ${item.linkText}` : "",
        item.scopePath ? `scope: ${item.scopePath}` : "",
        graphEdge.relationshipType ? `reference graph: ${graphEdge.relationshipType}` : ""
      ].filter(Boolean),
      confidence: config.confidence || item.confidence || "probable",
      sourceGrounding: "derived from current-page source discovery, reference graph edge, and matching passage-function/revelation context"
    });
  }

  return roles.sort((left, right) =>
    (left.scopePath || "").localeCompare(right.scopePath || "", undefined, { numeric: true }) ||
    left.referenceRole.localeCompare(right.referenceRole) ||
    left.discoveredReference.localeCompare(right.discoveredReference)
  );
}
function sourceCaptureText(captures) {
  return normalizeWhitespace((captures || []).map((capture) => [capture?.title, capture?.text].join(" ")).join(" "));
}

function passageFunctionRecord(config) {
  const key = [
    config.sourceCaptureId || "",
    config.scopePath || "",
    config.passageFunction || "",
    config.verseRange || ""
  ].join("|");

  return {
    id: config.id || `${Date.now()}-${textHash(`passage-function|${key}`)}`,
    sourceCaptureId: config.sourceCaptureId || "",
    scopePath: config.scopePath || "",
    verseRange: config.verseRange || "",
    passageFunction: config.passageFunction || "unknown_passage_function",
    plainMeaning: config.plainMeaning || "",
    fulfillmentMeaning: config.fulfillmentMeaning || "",
    evidence: config.evidence || [],
    linkedThemes: config.linkedThemes || [],
    relatedEntities: config.relatedEntities || [],
    relatedProphecies: config.relatedProphecies || [],
    confidence: config.confidence || "probable",
    sourceGrounding: config.sourceGrounding || "derived from current semantic data"
  };
}

function revelationPatternDisplayName(value) {
  if (/^angel of the lord$/i.test(value || "")) return "AngEL Of THE LORD";
  return value || "";
}

function revelationPatternVerseRange(cluster = {}) {
  const context = cluster.sourceContext || {};
  const book = context.book || cluster.book || "";
  const chapter = context.chapter || cluster.chapter || "";
  const subEventTypes = new Set((cluster.subEvents || []).map((item) => item.eventType || item.clusterType || ""));
  if (book === "Matthew" && String(chapter) === "1" &&
    subEventTypes.has("instruction_concerning_person") &&
    subEventTypes.has("conception_revelation") &&
    subEventTypes.has("name_revelation") &&
    subEventTypes.has("mission_reason_declaration")) {
    return "Matthew 1:20-21";
  }
  if (cluster.verseRef && book) return `${book} ${cluster.verseRef}`;
  if (book && chapter) return `${book} ${chapter}`;
  return cluster.scopePath || "Current scope";
}

function semanticDistinctionRecord(record = {}) {
  const key = [
    "semantic-distinction",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.semanticItem || "",
    record.distinctionType || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Matthew 1",
    semanticItem: record.semanticItem || "",
    distinctionType: record.distinctionType || "semantic_distinction",
    narrativeRole: record.narrativeRole || "",
    canonicalRole: record.canonicalRole || "",
    sourceWording: record.sourceWording || "",
    derivedWording: record.derivedWording || "",
    relatedEntities: record.relatedEntities || [],
    relatedLayers: record.relatedLayers || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded semantic records"
  };
}

function createSemanticDistinctions(captures = [], canonicalIdentities = [], semanticEvents = [], relationshipGraph = [], revelationPatterns = [], passageFunctions = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";

  if (!isMatthewOne) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasJesusChrist = (canonicalIdentities || []).some((item) => normalizeWhitespace(item.canonicalName || "").toLowerCase() === "jesus christ") || /JESUS CHRIST|Jesus Christ/i.test(sourceText);
  const hasJesusName = /call(?:ed)? his name JESUS|called his name JESUS|thou shalt call his name JESUS/i.test(sourceText) || (semanticEvents || []).some((item) => item.eventType === "name_revelation" || item.eventType === "naming_event");
  const hasChrist = /\bCHRIST\b|\bChrist\b/i.test(sourceText) || hasJesusChrist;
  const hasHolyGhost = /Holy Ghost/i.test(sourceText);
  const hasNarrator = (passageFunctions || []).some((item) => /narrator/i.test(`${item.plainMeaning || ""} ${item.relatedEntities || ""}`));
  const hasLord = /THE LORD|the Lord/i.test(sourceText) || (relationshipGraph || []).some((edge) => /lord/i.test(`${edge.fromEntity || ""} ${edge.toEntity || ""}`));
  const hasAngel = /angel of THE LORD|angel of the Lord/i.test(sourceText) || (revelationPatterns || []).some((item) => item.speaker === "AngEL Of THE LORD");
  const records = [];
  const add = (record) => records.push(semanticDistinctionRecord({ sourceCaptureId, sourceContext: context, ...record }));

  if (hasJesusName) add({
    scopePath: "scripture.nt.matthew.1.verse.21",
    verseRange: "Matthew 1:21, 25",
    semanticItem: "JESUS",
    distinctionType: "revealed_given_name",
    narrativeRole: "revealed/given NAME in the narrative-time naming instruction and Joseph's naming action",
    canonicalRole: "linked to JESUS CHRIST as canonical/source identity without making CHRIST the given NAME",
    sourceWording: "thou shalt call his name JESUS; called his name JESUS",
    derivedWording: "Narrative NAME: JESUS",
    relatedEntities: ["JESUS", "JESUS CHRIST", "Joseph", "AngEL Of THE LORD"],
    relatedLayers: ["ICE_SEMANTIC_EVENTS", "ICE_REVELATION_PATTERNS", "ICE_PASSAGE_FUNCTIONS", "ICE_CANONICAL_IDENTITIES"],
    confidence: "explicit",
    sourceGrounding: "Matthew 1:21 and 1:25 preserve JESUS as the revealed and given NAME"
  });

  if (hasChrist) add({
    scopePath: "scripture.nt.matthew.1.verse.1",
    verseRange: "Matthew 1:1",
    semanticItem: "CHRIST",
    distinctionType: "title_messianic_office",
    narrativeRole: "title/source identity reference, not Joseph's given-name action",
    canonicalRole: "messianic title/office within the source identity phrase JESUS CHRIST",
    sourceWording: "JESUS CHRIST",
    derivedWording: "CHRIST as title/source identity",
    relatedEntities: ["JESUS CHRIST", "JESUS"],
    relatedLayers: ["ICE_CANONICAL_IDENTITIES", "ICE_PASSAGE_FUNCTIONS"],
    confidence: hasJesusChrist ? "explicit" : "probable",
    sourceGrounding: "Matthew 1:1 uses JESUS CHRIST as source identity phrase; Matthew 1:21 and 1:25 give JESUS as NAME"
  });

  if (hasJesusChrist) add({
    scopePath: "scripture.nt.matthew.1.verse.1",
    verseRange: "Matthew 1:1",
    semanticItem: "JESUS CHRIST",
    distinctionType: "canonical_source_identity_phrase",
    narrativeRole: "retrospective/source-title identity framing for the passage",
    canonicalRole: "canonical/source identity linkage for JESUS",
    sourceWording: "The book of the generation of JESUS CHRIST",
    derivedWording: "Canonical identity: JESUS CHRIST",
    relatedEntities: ["JESUS CHRIST", "JESUS", "CHRIST"],
    relatedLayers: ["ICE_CANONICAL_IDENTITIES", "ICE_PASSAGE_FUNCTIONS"],
    confidence: "explicit",
    sourceGrounding: "Matthew 1:1 source phrase grounds JESUS CHRIST as canonical/source identity"
  });

  if (hasHolyGhost) {
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20",
      semanticItem: "HOLY SPIRIT",
      distinctionType: "preferred_derived_semantic_display",
      narrativeRole: "divine conception revelation in derived semantic display",
      canonicalRole: "Class I divine reference displayed as HOLY SPIRIT for semantic clarity",
      sourceWording: "Holy Ghost",
      derivedWording: "HOLY SPIRIT",
      relatedEntities: ["HOLY SPIRIT", "Holy Ghost", "Mary", "JESUS"],
      relatedLayers: ["ICE_SEMANTIC_EVENTS", "ICE_REVELATION_PATTERNS", "ICE_PASSAGE_FUNCTIONS"],
      confidence: "explicit",
      sourceGrounding: "Matthew 1:20 source phrase says Holy Ghost; derived display prefers HOLY SPIRIT without rewriting quoted source wording"
    });
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20",
      semanticItem: "Holy Ghost",
      distinctionType: "preserved_source_phrase_wording",
      narrativeRole: "source phrase wording preserved in direct quotations/evidence",
      canonicalRole: "alias/source wording linked to HOLY SPIRIT derived display",
      sourceWording: "that which is conceived in her is of the Holy Ghost",
      derivedWording: "Conception revelation through HOLY SPIRIT",
      relatedEntities: ["HOLY SPIRIT", "Holy Ghost", "Mary", "JESUS"],
      relatedLayers: ["ICE_SEMANTIC_EVENTS", "ICE_REVELATION_PATTERNS", "ICE_PASSAGE_FUNCTIONS"],
      confidence: "explicit",
      sourceGrounding: "direct source phrase is preserved while derived semantic cards may display HOLY SPIRIT"
    });
  }

  if (hasNarrator) add({
    scopePath: "scripture.nt.matthew.1.verse.22",
    verseRange: "Matthew 1:22-23",
    semanticItem: "scripture narrator",
    distinctionType: "narrator_human_classification",
    narrativeRole: "narrator voice reports fulfillment and source framing",
    canonicalRole: "Class III - Human; not direct divine authority",
    sourceWording: "Now all this was done, that it might be fulfilled",
    derivedWording: "scripture narrator: Class III - Human",
    relatedEntities: ["scripture narrator", "THE LORD", "prophet"],
    relatedLayers: ["ICE_PASSAGE_FUNCTIONS", "ICE_ENTITY_REGISTRY"],
    confidence: "probable",
    sourceGrounding: "fulfillment narration is distinguished from divine speech and prophetic source"
  });

  if (hasLord) add({
    scopePath: "scripture.nt.matthew.1.verse.20",
    verseRange: "Matthew 1:20-22",
    semanticItem: "THE LORD",
    distinctionType: "divine_authority_source",
    narrativeRole: "authority source behind divine message and prophecy fulfillment",
    canonicalRole: "Class I - GOD / Divine Authority",
    sourceWording: "THE LORD; spoken of THE LORD by the prophet",
    derivedWording: "THE LORD: Class I - GOD / Divine Authority",
    relatedEntities: ["THE LORD", "AngEL Of THE LORD", "prophet"],
    relatedLayers: ["ICE_REVELATION_PATTERNS", "ICE_RELATIONSHIP_GRAPH", "ICE_PASSAGE_FUNCTIONS"],
    confidence: "explicit",
    sourceGrounding: "current semantic layers distinguish THE LORD as authority source from messenger and narrator"
  });

  if (hasAngel) add({
    scopePath: "scripture.nt.matthew.1.verse.20",
    verseRange: "Matthew 1:20-21",
    semanticItem: "AngEL Of THE LORD",
    distinctionType: "divine_messenger_role",
    narrativeRole: "messenger/speaker delivering THE LORD's instruction and revelation to Joseph",
    canonicalRole: "Class II - AngEL / Messenger of GOD",
    sourceWording: "the angel of THE LORD appeared unto him",
    derivedWording: "AngEL Of THE LORD: Class II - AngEL / Messenger of GOD",
    relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph"],
    relatedLayers: ["ICE_REVELATION_PATTERNS", "ICE_RELATIONSHIP_GRAPH", "ICE_PASSAGE_FUNCTIONS"],
    confidence: "explicit",
    sourceGrounding: "revelation pattern keeps authority source THE LORD distinct from speaker AngEL Of THE LORD"
  });

  return records;
}
function ontologyRoleRecord(record = {}) {
  const key = [
    "ontology-role",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.semanticItem || "",
    (record.ontologyRoles || []).join("|")
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Matthew 1",
    semanticItem: record.semanticItem || "",
    ontologyRoles: record.ontologyRoles || [],
    authorityOriginClass: record.authorityOriginClass || "",
    narrativeRole: record.narrativeRole || "",
    canonicalRole: record.canonicalRole || "",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    relatedEntities: record.relatedEntities || [],
    relatedLayers: record.relatedLayers || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded semantic records"
  };
}

function entityRelationRoleRecord(record = {}) {
  const key = [
    "entity-relation-role",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.sourceEntity || "",
    record.targetEntity || "",
    record.semanticRole || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Matthew 1",
    sourceEntity: record.sourceEntity || "",
    targetEntity: record.targetEntity || "",
    semanticRole: record.semanticRole || "semantic_relation_role",
    ontologyClassPath: record.ontologyClassPath || "",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    confidence: record.confidence || "probable",
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    relatedSemanticEvents: record.relatedSemanticEvents || [],
    relatedRevelationPatterns: record.relatedRevelationPatterns || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded semantic entity, ontology, relationship, and authority records"
  };
}

function createEntityRelationRoles(captures = [], semanticEvents = [], revelationPatterns = [], passageFunctions = [], ontologyRoles = [], originAuthorityPaths = [], relationshipGraph = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  if (isMatthewTwo) {
    const eventIdsByType = (types) => (semanticEvents || []).filter((item) => types.includes(item.eventType || "")).map((item) => item.id || item.semanticEventId).filter(Boolean);
    const functionKeys = (keys) => (passageFunctions || []).filter((item) => keys.includes(item.passageFunction || "")).map((item) => item.passageFunction || item.id).filter(Boolean);
    const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
    const add = (record) => entityRelationRoleRecord({ sourceCaptureId, sourceContext: context, ...record });
    return [
      add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-22", sourceEntity: "THE LORD", targetEntity: "AngEL Of THE LORD", semanticRole: "source_authority_to_protective_messenger", ontologyClassPath: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD", sourcePhrase: "the angel of the Lord appeareth to Joseph in a dream", derivedMeaning: "THE LORD is preserved as source authority while AngEL Of THE LORD carries protective instruction.", evidence: ["the angel of the Lord appeareth to Joseph in a dream", "Arise, and take the young child"], relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS"], relatedSemanticEvents: eventIdsByType(["protective_instruction_revelation", "divine_message_cluster"]), relatedPassageFunctions: functionKeys(["divine_warning_revelation", "protective_obedient_response", "egypt_escape_preservation"]), relatedOntologyRoles: ontologyIds(["THE LORD", "AngEL Of THE LORD"]), confidence: "explicit", sourceGrounding: "Matthew 2 dream-instruction events ground the authority path without collapsing messenger into origin authority." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-14, 19-21", sourceEntity: "AngEL Of THE LORD", targetEntity: "Joseph", semanticRole: "protective_revelation_messenger_to_recipient", ontologyClassPath: "Class II - AngEL / Messenger of GOD -> Class III - Human", sourcePhrase: "Arise, and take the young child and his mother", derivedMeaning: "AngEL Of THE LORD gives Joseph protective movement instructions concerning CHILD/JESUS.", evidence: ["Arise, and take the young child", "flee into Egypt"], relatedEntities: ["AngEL Of THE LORD", "Joseph", "JESUS", "Mary"], relatedSemanticEvents: eventIdsByType(["protective_instruction_revelation", "divine_message_cluster"]), relatedPassageFunctions: functionKeys(["divine_warning_revelation"]), relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph"]), confidence: "explicit", sourceGrounding: "Semantic subevents preserve Joseph as recipient and the young child as the protected semantic target." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.14", verseRange: "Matthew 2:14-15, 21-23", sourceEntity: "Joseph", targetEntity: "JESUS", semanticRole: "protective_obedient_response_to_child", ontologyClassPath: "Class III - Human -> Class I - GOD / Divine Authority", sourcePhrase: "took the young child and his mother", derivedMeaning: "Joseph obediently protects and moves CHILD/JESUS after divine instruction.", evidence: ["he arose", "took the young child and his mother", "departed into Egypt"], relatedEntities: ["Joseph", "JESUS", "Mary", "Egypt", "Nazareth"], relatedSemanticEvents: eventIdsByType(["protective_obedient_response"]), relatedPassageFunctions: functionKeys(["protective_obedient_response", "egypt_escape_preservation", "messianic_location_fulfillment"]), relatedOntologyRoles: ontologyIds(["Joseph", "JESUS", "Egypt"]), confidence: "explicit", sourceGrounding: "Joseph's response is source-grounded in repeated took/departed/dwelt movement language." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.16", verseRange: "Matthew 2:3-8, 16", sourceEntity: "Herod", targetEntity: "JESUS", semanticRole: "hostile_authority_to_child_target", ontologyClassPath: "Class i - Adversarial / Oppositional -> Class I - GOD / Divine Authority", sourcePhrase: "Herod will seek the young child to destroy him; destroy him", derivedMeaning: "Herod is an adversarial authority toward CHILD/JESUS where the source states hostile intent.", evidence: ["Herod ... was troubled", "seek the young child to destroy him", "destroy him"], relatedEntities: ["Herod", "JESUS"], relatedSemanticEvents: eventIdsByType(["hostile_authority_response"]), relatedPassageFunctions: functionKeys(["hostile_authority_response"]), relatedOntologyRoles: ontologyIds(["Herod", "JESUS"]), confidence: /\bdestroy him\b/i.test(sourceCaptureText(captures)) ? "explicit" : "probable", sourceGrounding: "Adversarial relation is evidence-based and tied to destroy-him wording rather than automatic role assignment." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.11", verseRange: "Matthew 2:1-2, 11", sourceEntity: "Wise men", targetEntity: "JESUS", semanticRole: "worship_witness_to_child", ontologyClassPath: "Class III - Human -> Class I - GOD / Divine Authority", sourcePhrase: "fell down, and worshipped him", derivedMeaning: "Wise men respond to CHILD/JESUS with worship and witness language.", evidence: ["Where is he that is born King of the Jews", "come to worship him", "fell down, and worshipped him"], relatedEntities: ["Wise men", "JESUS"], relatedSemanticEvents: eventIdsByType(["wise_men_arrival", "worship_identity_witness"]), relatedPassageFunctions: functionKeys(["wise_men_arrival"]), relatedOntologyRoles: ontologyIds(["Wise men", "JESUS"]), confidence: "explicit", sourceGrounding: "Matthew 2 source phrases preserve the witness/worship response without deriving source records." })
    ];
  }
  if (!isMatthewOne) return [];
const divinePattern = (revelationPatterns || []).find((item) =>
    item.authoritySource === "THE LORD" &&
    item.speaker === "AngEL Of THE LORD" &&
    item.recipient === "Joseph"
  );
  const originPath = (originAuthorityPaths || []).find((item) =>
    item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"
  );
  const eventIdsByType = (types) => (semanticEvents || [])
    .filter((item) => types.includes(item.eventType || ""))
    .map((item) => item.semanticEventId || item.id)
    .filter(Boolean);
  const functionKeys = (keys) => (passageFunctions || [])
    .filter((item) => keys.includes(item.passageFunction || ""))
    .map((item) => item.passageFunction || item.id)
    .filter(Boolean);
  const ontologyIds = (items) => (ontologyRoles || [])
    .filter((item) => items.includes(item.semanticItem || ""))
    .map((item) => item.id || item.semanticItem)
    .filter(Boolean);
  const relationEdgeEvidence = (from, to, type = "") => (relationshipGraph || [])
    .filter((edge) =>
      (!from || normalizeWhitespace(edge.fromEntity || "").toLowerCase() === normalizeWhitespace(from).toLowerCase()) &&
      (!to || normalizeWhitespace(edge.toEntity || "").toLowerCase() === normalizeWhitespace(to).toLowerCase()) &&
      (!type || edge.relationshipType === type)
    )
    .map((edge) => edge.evidence || edge.relationshipType || "")
    .filter(Boolean);
  const add = (record) => entityRelationRoleRecord({
    sourceCaptureId,
    sourceContext: context,
    relatedRevelationPatterns: divinePattern?.id ? [divinePattern.id] : [],
    ...record
  });

  return [
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-21",
      sourceEntity: "THE LORD",
      targetEntity: "AngEL Of THE LORD",
      semanticRole: "source_authority_to_messenger",
      ontologyClassPath: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD",
      sourcePhrase: "the angel of THE LORD appeared unto him",
      derivedMeaning: "THE LORD is the origin authority; AngEL Of THE LORD is the messenger / revelation carrier.",
      evidence: ["the angel of THE LORD appeared unto him", ...relationEdgeEvidence("THE LORD", "Angel of THE LORD", "source_authority")],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD"],
      relatedSemanticEvents: eventIdsByType(["divine_messenger_appearance", "divine_message_speech", "divine_message_cluster"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction"]),
      relatedOntologyRoles: ontologyIds(["THE LORD", "AngEL Of THE LORD"]),
      confidence: divinePattern || originPath ? "explicit" : "probable",
      sourceGrounding: "Revelation pattern and origin authority path distinguish THE LORD as source authority from AngEL Of THE LORD as messenger."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-21",
      sourceEntity: "AngEL Of THE LORD",
      targetEntity: "Joseph",
      semanticRole: "revelation_messenger_to_recipient",
      ontologyClassPath: "Class II - AngEL / Messenger of GOD -> Class III - Human",
      sourcePhrase: "appeared unto him in a dream, saying",
      derivedMeaning: "AngEL Of THE LORD carries instruction and revelation to Joseph as the revelation recipient.",
      evidence: ["appeared unto him in a dream, saying", "fear not to take unto thee Mary thy wife", ...relationEdgeEvidence("Angel of THE LORD", "Joseph")],
      relatedEntities: ["AngEL Of THE LORD", "Joseph", "Mary"],
      relatedSemanticEvents: eventIdsByType(["divine_messenger_appearance", "divine_message_speech", "instruction_concerning_person", "conception_revelation", "name_revelation", "mission_reason_declaration"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction"]),
      relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph"]),
      confidence: "explicit",
      sourceGrounding: "Semantic events and revelation pattern ground Joseph as recipient while preserving AngEL Of THE LORD as messenger, not origin authority."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.24",
      verseRange: "Matthew 1:24-25",
      sourceEntity: "Joseph",
      targetEntity: "JESUS",
      semanticRole: "obedient_response_to_revealed_name",
      ontologyClassPath: "Class III - Human -> Class I - GOD / Divine Authority",
      sourcePhrase: "did as the angel of THE LORD had bidden him; called his name JESUS",
      derivedMeaning: "Joseph responds obediently and performs the narrative naming action: JESUS is the revealed NAME.",
      evidence: ["did as the angel of THE LORD had bidden him", "called his name JESUS"],
      relatedEntities: ["Joseph", "JESUS", "JESUS CHRIST", "AngEL Of THE LORD"],
      relatedSemanticEvents: eventIdsByType(["covenant_family_union", "naming_event", "name_revelation"]),
      relatedPassageFunctions: functionKeys(["obedient_response_and_naming", "divine_message_instruction"]),
      relatedOntologyRoles: ontologyIds(["Joseph", "JESUS", "JESUS CHRIST"]),
      confidence: "explicit",
      sourceGrounding: "Naming event and ontology roles preserve JESUS as narrative NAME while JESUS CHRIST remains canonical/source identity linkage."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:18-25",
      sourceEntity: "Joseph",
      targetEntity: "Mary",
      semanticRole: "covenant_steward_to_covenant_participant",
      ontologyClassPath: "Class III - Human -> Class III - Human",
      sourcePhrase: "fear not to take unto thee Mary thy wife; took unto him his wife",
      derivedMeaning: "Joseph is instructed as covenant steward; Mary remains Human covenant participant and wife.",
      evidence: ["fear not to take unto thee Mary thy wife", "took unto him his wife"],
      relatedEntities: ["Joseph", "Mary"],
      relatedSemanticEvents: eventIdsByType(["instruction_concerning_person", "covenant_family_union"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction", "obedient_response_and_naming"]),
      relatedOntologyRoles: ontologyIds(["Joseph", "Mary"]),
      confidence: "explicit",
      sourceGrounding: "Marriage instruction and obedient response events ground Joseph and Mary as Human covenant/family participants."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20",
      sourceEntity: "HOLY SPIRIT",
      targetEntity: "Mary",
      semanticRole: "divine_conception_origin_to_conception_recipient",
      ontologyClassPath: "Class I - GOD / Divine Authority -> Class III - Human",
      sourcePhrase: "that which is conceived in her is of the Holy Ghost",
      derivedMeaning: "HOLY SPIRIT is the HOLY CONCEPTION Origin; Mary is the Human recipient / target in the process path.",
      evidence: ["that which is conceived in her is of the Holy Ghost"],
      relatedEntities: ["HOLY SPIRIT", "Holy Ghost", "Mary", "JESUS"],
      relatedSemanticEvents: eventIdsByType(["conception_revelation"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction"]),
      relatedOntologyRoles: ontologyIds(["HOLY SPIRIT", "Mary", "JESUS"]),
      confidence: "explicit",
      sourceGrounding: "Conception revelation preserves Holy Ghost as source phrase while derived semantic display identifies HOLY CONCEPTION / HOLY SPIRIT."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.21",
      verseRange: "Matthew 1:21",
      sourceEntity: "JESUS",
      targetEntity: "His people",
      semanticRole: "mission_subject_to_saved_people",
      ontologyClassPath: "Class I - GOD / Divine Authority -> Class III - Human people",
      sourcePhrase: "he shall save his people from their sins",
      derivedMeaning: "JESUS is mission subject: HE shall SAVE HIS People from their sins.",
      evidence: ["he shall save his people from their sins"],
      relatedEntities: ["JESUS", "JESUS CHRIST"],
      relatedSemanticEvents: eventIdsByType(["mission_reason_declaration"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction"]),
      relatedOntologyRoles: ontologyIds(["JESUS", "JESUS CHRIST"]),
      confidence: "explicit",
      sourceGrounding: "Mission declaration grounds JESUS as mission subject and preserves the JESUS / JESUS CHRIST distinction."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      sourceEntity: "scripture narrator",
      targetEntity: "THE LORD",
      semanticRole: "narrative_witness_to_divine_source",
      ontologyClassPath: "Class III - Human -> Class I - GOD / Divine Authority",
      sourcePhrase: "Now all this was done, that it might be fulfilled which was spoken of THE LORD by the prophet",
      derivedMeaning: "scripture narrator is Human narrative witness; THE LORD remains Divine source authority.",
      evidence: ["Now all this was done", "spoken of THE LORD by the prophet"],
      relatedEntities: ["scripture narrator", "THE LORD", "quoted prophet"],
      relatedSemanticEvents: eventIdsByType(["passive_fulfillment_narration"]),
      relatedPassageFunctions: functionKeys(["prophecy_fulfillment_identification"]),
      relatedOntologyRoles: ontologyIds(["scripture narrator", "THE LORD", "quoted prophet"]),
      confidence: "probable",
      sourceGrounding: "Fulfillment narration distinguishes Human narrator/witness from Divine authority source."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      sourceEntity: "quoted prophet",
      targetEntity: "THE LORD",
      semanticRole: "prophecy_witness_to_divine_source",
      ontologyClassPath: "Class III - Human -> Class I - GOD / Divine Authority",
      sourcePhrase: "spoken of THE LORD by the prophet",
      derivedMeaning: "quoted prophet is Human prophecy witness; THE LORD is the source of what was spoken.",
      evidence: ["spoken of THE LORD by the prophet"],
      relatedEntities: ["quoted prophet", "prophet", "THE LORD", "scripture narrator"],
      relatedSemanticEvents: eventIdsByType(["passive_fulfillment_narration"]),
      relatedPassageFunctions: functionKeys(["prophecy_fulfillment_identification"]),
      relatedOntologyRoles: ontologyIds(["quoted prophet", "THE LORD", "scripture narrator"]),
      confidence: "probable",
      sourceGrounding: "Source phrase separates THE LORD as origin/source from prophet as Human prophecy witness."
    })
  ];
}
function createOntologyRoles(captures = [], semanticDistinctions = [], semanticEvents = [], revelationPatterns = [], passageFunctions = [], originAuthorityPaths = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  const isMatthewThree = context.book === "Matthew" && String(context.chapter || "") === "3";
  const isMatthewFive = context.book === "Matthew" && String(context.chapter || "") === "5";
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  if (isMatthewTwo) {
    const add = (record) => ontologyRoleRecord({ sourceCaptureId, sourceContext: context, ...record });
    const commonLayers = ["ICE_PASSAGE_FUNCTIONS", "ICE_REVELATION_PATTERNS", "ICE_ORIGIN_AUTHORITY_PATHS", "ICE_ENTITY_RELATION_ROLES"];
    return [
      add({ scopePath: "scripture.nt.matthew.2.verse.1", verseRange: "Matthew 2:1-2, 11", semanticItem: "Wise men", ontologyRoles: ["Human witness role", "worship response", "search witness"], authorityOriginClass: "Class III - Human", narrativeRole: "arrive seeking and worshipping the CHILD/JESUS", canonicalRole: "Human witness group; not origin authority", sourcePhrase: "wise men from the east; come to worship him", derivedMeaning: "Wise men: Human witness and worship response", relatedEntities: ["Wise men", "JESUS"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2 explicitly names wise men and describes their seeking/worship response." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.3", verseRange: "Matthew 2:3-8, 16", semanticItem: "Herod", ontologyRoles: ["hostile authority", "adversarial/oppositional role", "deceptive speech", "misuse of authority", "child-targeting hostility"], authorityOriginClass: "Class i - Adversarial / Oppositional", narrativeRole: "hostile ruler responding against the CHILD/JESUS through troubled response, secret inquiry, deceptive worship language, and destroy-him intent", canonicalRole: "Human authority acting oppositionally where source evidence supports it; not an automatic Class i assignment for every negative actor", sourcePhrase: "Herod ... was troubled; enquired of them diligently; that I may come and worship him also; destroy him", derivedMeaning: "Herod: evidence-grounded hostile/adversarial authority toward CHILD/JESUS", relatedEntities: ["Herod", "JESUS", "Wise men"], relatedLayers: commonLayers, confidence: /\bdestroy him\b/i.test(sourceText) ? "explicit" : "probable", sourceGrounding: "Adversarial role is assigned only from troubled response, deceptive inquiry/worship wording, and destroy-him wording in Matthew 2." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.4", verseRange: "Matthew 2:4-6", semanticItem: "Chief priests and scribes", ontologyRoles: ["Human religious authority", "scriptural knowledge witness", "prophecy location witness"], authorityOriginClass: "Class III - Human", narrativeRole: "identify the written prophecy location for Herod", canonicalRole: "Human witnesses to source-text prophecy, not divine origin authority", sourcePhrase: "chief priests and scribes ... for thus it is written", derivedMeaning: "Chief priests and scribes: Human scriptural knowledge witnesses", relatedEntities: ["Chief priests and scribes", "Bethlehem", "quoted prophet"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2:4-6 grounds this role in their gathered answer and written-prophecy citation." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.11", verseRange: "Matthew 2:11-15", semanticItem: "JESUS", ontologyRoles: ["CHILD semantic referent", "protected child", "messianic identity"], authorityOriginClass: "Class I - GOD / Divine Authority", narrativeRole: "referenced as young child/child while semantically grounded to JESUS", canonicalRole: "CHILD/JESUS remains distinct from JESUS CHRIST source identity while resolving the referent", sourcePhrase: "the young child", derivedMeaning: "CHILD / JESUS: protected messianic child", relatedEntities: ["JESUS", "JESUS CHRIST", "Joseph", "Mary"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2 repeatedly uses young child/child in scenes grounded by JESUS identity from Matthew source context." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-22", semanticItem: "AngEL Of THE LORD", ontologyRoles: ["messenger", "protective instruction carrier", "delegated authority role"], authorityOriginClass: "Class II - AngEL / Messenger of GOD", narrativeRole: "delivers protective dream instruction to Joseph", canonicalRole: "messenger role distinct from THE LORD as origin authority", sourcePhrase: "the angel of the Lord appeareth to Joseph in a dream", derivedMeaning: "AngEL Of THE LORD: protective messenger", relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2 uses AngEL Of THE LORD dream appearances for protective instruction." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-22", semanticItem: "Joseph", ontologyRoles: ["Human response", "obedient recipient", "protective steward"], authorityOriginClass: "Class III - Human", narrativeRole: "receives instruction and moves the CHILD/JESUS and Mary protectively", canonicalRole: "Human obedient recipient; not origin authority", sourcePhrase: "he arose, and took the young child and his mother", derivedMeaning: "Joseph: protective obedient steward", relatedEntities: ["Joseph", "JESUS", "Mary", "AngEL Of THE LORD"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2 repeatedly grounds Joseph response through instruction-response movement." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.5", verseRange: "Matthew 2:5-6", semanticItem: "Bethlehem", ontologyRoles: ["messianic location", "prophecy location"], authorityOriginClass: "Class IIIII - Place / Location", narrativeRole: "location identified by written prophecy", canonicalRole: "place role in fulfillment chain", sourcePhrase: "Bethlehem of Judaea", derivedMeaning: "Bethlehem: messianic prophecy location", relatedEntities: ["Bethlehem", "JESUS", "quoted prophet"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2:5-6 identifies Bethlehem through written prophecy." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-15", semanticItem: "Egypt", ontologyRoles: ["protective refuge location", "fulfillment location", "Divine preservation path location"], authorityOriginClass: "Class IIIII - Place / Location", narrativeRole: "refuge location and fulfillment location", canonicalRole: "place role in preservation and fulfillment chain", sourcePhrase: "flee into Egypt; Out of Egypt have I called my son", derivedMeaning: "Egypt: protective refuge and fulfillment location", relatedEntities: ["Egypt", "JESUS", "Joseph", "Mary"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2:13-15 grounds Egypt in both protective movement and fulfillment wording." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.1", verseRange: "Matthew 2:1-3", semanticItem: "Jerusalem", ontologyRoles: ["arrival location", "authority conflict setting"], authorityOriginClass: "Class IIIII - Place / Location", narrativeRole: "place where wise men inquiry and Herod troubled response enter the narrative", canonicalRole: "location role in adversarial/protective contrast setup", sourcePhrase: "wise men from the east to Jerusalem; Herod ... was troubled, and all Jerusalem with him", derivedMeaning: "Jerusalem: inquiry location and troubled authority setting", relatedEntities: ["Jerusalem", "Wise men", "Herod", "JESUS"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2:1-3 grounds Jerusalem as the arrival and conflict-setting location." }),
      add({ scopePath: "scripture.nt.matthew.2.verse.23", verseRange: "Matthew 2:22-23", semanticItem: "Nazareth", ontologyRoles: ["settlement location", "prophecy fulfillment location", "protective redirection location"], authorityOriginClass: "Class IIIII - Place / Location", narrativeRole: "destination after warning and avoidance of Archelaus", canonicalRole: "place role in redirected preservation and fulfillment chain", sourcePhrase: "turned aside into the parts of Galilee; dwelt in a city called Nazareth; He shall be called a Nazarene", derivedMeaning: "Nazareth: protective redirection and fulfillment location", relatedEntities: ["Nazareth", "Joseph", "JESUS", "Mary", "quoted prophet"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 2:22-23 grounds Nazareth in warning-redirection and fulfillment wording." })
    ];
  }
  if (isMatthewThree) {
    const add = (record) => ontologyRoleRecord({ sourceCaptureId, sourceContext: context, ...record });
    const commonLayers = ["ICE_PASSAGE_FUNCTIONS", "ICE_REVELATION_PATTERNS", "ICE_REFERENCE_ROLES", "ICE_ENTITY_RELATION_ROLES"];
    return [
      add({ scopePath: "scripture.nt.matthew.3.verse.13", verseRange: "Matthew 3:13-17", semanticItem: "JESUS", ontologyRoles: ["Narrative NAME", "baptism participant", "beloved Son identity"], authorityOriginClass: "Class I - GOD / Divine Authority", narrativeRole: "comes to John for baptism and is identified in the heavenly proclamation", canonicalRole: "JESUS remains the narrative NAME while JESUS CHRIST remains canonical/source identity in reference roles", sourcePhrase: "Then cometh Jesus from Galilee to Jordan unto John; This is my beloved Son", derivedMeaning: "JESUS: Narrative NAME and primary baptism participant", relatedEntities: ["JESUS", "JESUS CHRIST", "John", "HOLY SPIRIT", "THE LORD"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3 explicitly names Jesus in the baptism scene and preserves the narrative NAME distinction." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.16", verseRange: "Matthew 3:16", semanticItem: "HOLY SPIRIT", ontologyRoles: ["divine manifestation", "Spirit descending", "derived display for Spirit of God"], authorityOriginClass: "Class I - GOD / Divine Authority", narrativeRole: "appears in the baptism manifestation as the Spirit of God descending", canonicalRole: "HOLY SPIRIT preferred derived display; source wording remains Spirit of God / Holy Ghost where present", sourcePhrase: "the Spirit of God descending like a dove", derivedMeaning: "HOLY SPIRIT: Divine manifestation at baptism", relatedEntities: ["HOLY SPIRIT", "JESUS", "John"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3:16 directly describes the Spirit of God descending after JESUS is baptized." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.17", verseRange: "Matthew 3:17", semanticItem: "THE LORD", ontologyRoles: ["divine authority", "heavenly voice", "source authority"], authorityOriginClass: "Class I - GOD / Divine Authority", narrativeRole: "heavenly voice identifies JESUS as beloved Son", canonicalRole: "Divine authority/source role distinct from Human witnesses", sourcePhrase: "lo a voice from heaven, saying, This is my beloved Son", derivedMeaning: "THE LORD: Divine authority/source in heavenly proclamation", relatedEntities: ["THE LORD", "JESUS"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3:17 grounds the Divine authority role in the voice from heaven." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.1", verseRange: "Matthew 3:1-15", semanticItem: "John", ontologyRoles: ["Human preacher", "baptizer", "prophetic witness"], authorityOriginClass: "Class III - Human", narrativeRole: "preaches repentance, baptizes, warns, and participates in JESUS baptism", canonicalRole: "Human prophetic witness and baptism participant; not Divine origin authority", sourcePhrase: "John the Baptist; John forbad him; Then he suffered him", derivedMeaning: "John: Class III Human preacher and baptism witness", relatedEntities: ["John", "JESUS", "multitude / people", "Pharisees", "Sadducees"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3 repeatedly names John and grounds his Human role in preaching, baptizing, warning, and responding to JESUS." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.7", verseRange: "Matthew 3:7-10", semanticItem: "Pharisees", ontologyRoles: ["Human religious group", "warning audience", "repentance confrontation context"], authorityOriginClass: "Class III - Human", narrativeRole: "come to John's baptism and receive warning language", canonicalRole: "Human religious group; not automatically adversarial Class i from label alone", sourcePhrase: "many of the Pharisees and Sadducees come to his baptism", derivedMeaning: "Pharisees: Class III Human warning audience in Matthew 3", relatedEntities: ["Pharisees", "John", "Sadducees"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3 explicitly names Pharisees in the baptism/warning context without requiring unsupported ontology escalation." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.7", verseRange: "Matthew 3:7-10", semanticItem: "Sadducees", ontologyRoles: ["Human religious group", "warning audience", "repentance confrontation context"], authorityOriginClass: "Class III - Human", narrativeRole: "come to John's baptism and receive warning language", canonicalRole: "Human religious group; not automatically adversarial Class i from label alone", sourcePhrase: "many of the Pharisees and Sadducees come to his baptism", derivedMeaning: "Sadducees: Class III Human warning audience in Matthew 3", relatedEntities: ["Sadducees", "John", "Pharisees"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3 explicitly names Sadducees in the baptism/warning context without requiring unsupported ontology escalation." }),
      add({ scopePath: "scripture.nt.matthew.3.verse.5", verseRange: "Matthew 3:5-6", semanticItem: "multitude / people", ontologyRoles: ["Human group", "baptism recipients", "confessing response"], authorityOriginClass: "Class III - Human", narrativeRole: "people from Jerusalem, Judaea, and around Jordan come and are baptized", canonicalRole: "Human collective response group", sourcePhrase: "Then went out to him Jerusalem, and all Judaea, and all the region round about Jordan, And were baptized", derivedMeaning: "multitude / people: Class III Human baptism-response group", relatedEntities: ["multitude / people", "John"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 3:5-6 grounds the people/multitude role in the described collective movement and baptism response." })
    ];
  }
  if (isMatthewFive) {
    const add = (record) => ontologyRoleRecord({ sourceCaptureId, sourceContext: context, ...record });
    const commonLayers = ["ICE_TEACHING_SEMANTICS", "ICE_REFERENCE_ROLES", "ICE_SOURCE_DISCOVERY_INDEX"];
    return [
      add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", semanticItem: "JESUS", ontologyRoles: ["Narrative NAME", "teaching speaker", "Sermon on the Mount speaker"], authorityOriginClass: "Class I - GOD / Divine Authority", narrativeRole: "opens his mouth and teaches disciples in the multitudes context", canonicalRole: "JESUS remains the narrative NAME while JESUS CHRIST remains canonical/source identity", sourcePhrase: "he opened his mouth, and taught them", derivedMeaning: "JESUS: Class I teaching speaker in Matthew 5", relatedEntities: ["JESUS", "JESUS CHRIST", "disciples", "multitudes"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 5:1-2 grounds the discourse speaker in the immediate teaching setup." }),
      add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", semanticItem: "disciples", ontologyRoles: ["Human audience", "teaching recipients", "disciple group"], authorityOriginClass: "Class III - Human", narrativeRole: "come unto JESUS and receive the teaching discourse", canonicalRole: "Human group audience; not Divine authority", sourcePhrase: "his disciples came unto him", derivedMeaning: "disciples: Class III Human teaching audience", relatedEntities: ["disciples", "JESUS"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 5:1 directly names disciples as those who came unto him before the teaching begins." }),
      add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", semanticItem: "multitudes", ontologyRoles: ["Human group", "surrounding audience context", "Group Entity"], authorityOriginClass: "Class III - Human", narrativeRole: "visible crowd context around the mountain teaching scene", canonicalRole: "Human collective group entity", sourcePhrase: "seeing the multitudes", derivedMeaning: "multitudes: Class III Human group entity in Matthew 5 teaching context", relatedEntities: ["multitudes", "JESUS", "disciples"], relatedLayers: commonLayers, confidence: "explicit", sourceGrounding: "Matthew 5:1 directly names multitudes as the visible audience/context for the teaching setup." })
    ];
  }
  if (!isMatthewOne) return [];
const add = (record) => ontologyRoleRecord({ sourceCaptureId, sourceContext: context, ...record });
  const commonLayers = ["ICE_SEMANTIC_DISTINCTIONS", "ICE_PASSAGE_FUNCTIONS", "ICE_REVELATION_PATTERNS", "ICE_ORIGIN_AUTHORITY_PATHS"];

  return [
    add({
      scopePath: "scripture.nt.matthew.1.verse.21",
      verseRange: "Matthew 1:21, 25",
      semanticItem: "JESUS",
      ontologyRoles: ["revealed NAME", "divine identity", "salvific mission role"],
      authorityOriginClass: "Class I - GOD / Divine Authority",
      narrativeRole: "revealed NAME given in divine message and used in Joseph's naming action",
      canonicalRole: "linked to JESUS CHRIST without treating CHRIST as the given NAME",
      sourcePhrase: "thou shalt call his name JESUS; called his name JESUS",
      derivedMeaning: "JESUS: revealed NAME and salvific mission role",
      relatedEntities: ["JESUS", "JESUS CHRIST", "Joseph", "AngEL Of THE LORD"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Matthew 1:21 and 1:25 preserve JESUS as the revealed and given NAME while Matthew 1:21 gives the mission reason"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.1",
      verseRange: "Matthew 1:1",
      semanticItem: "CHRIST",
      ontologyRoles: ["title", "messianic office", "canonical reference identity"],
      authorityOriginClass: "Class I reference/title role linked to JESUS",
      narrativeRole: "title/source identity reference, not Joseph's naming action",
      canonicalRole: "messianic title/office within JESUS CHRIST",
      sourcePhrase: "JESUS CHRIST",
      derivedMeaning: "CHRIST as title/source identity and messianic office",
      relatedEntities: ["CHRIST", "JESUS CHRIST", "JESUS"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_CANONICAL_IDENTITIES", "ICE_PASSAGE_FUNCTIONS"],
      confidence: "explicit",
      sourceGrounding: "Matthew 1:1 uses JESUS CHRIST as source identity phrase; Matthew 1:21 and 1:25 give JESUS as NAME"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.1",
      verseRange: "Matthew 1:1",
      semanticItem: "JESUS CHRIST",
      ontologyRoles: ["canonical/source identity phrase", "retrospective identity linkage"],
      authorityOriginClass: "Class I canonical identity linkage",
      narrativeRole: "source-title framing for the chapter",
      canonicalRole: "canonical/source identity phrase linking JESUS and CHRIST",
      sourcePhrase: "The book of the generation of JESUS CHRIST",
      derivedMeaning: "Canonical/source identity: JESUS CHRIST",
      relatedEntities: ["JESUS CHRIST", "JESUS", "CHRIST"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_CANONICAL_IDENTITIES", "ICE_PASSAGE_FUNCTIONS"],
      confidence: "explicit",
      sourceGrounding: "Matthew 1:1 grounds JESUS CHRIST as source identity phrase"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-22",
      semanticItem: "THE LORD",
      ontologyRoles: ["authority", "semantic origin role", "divine origin authority"],
      authorityOriginClass: "Class I - GOD / Divine Authority",
      narrativeRole: "origin authority behind the message and prophecy fulfillment",
      canonicalRole: "Divine Authority source distinguished from messenger and Human response",
      sourcePhrase: "THE LORD; spoken of THE LORD by the prophet",
      derivedMeaning: "THE LORD: Class I origin authority",
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "prophet"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Revelation and origin authority layers distinguish THE LORD as authority source"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-21",
      semanticItem: "AngEL Of THE LORD",
      ontologyRoles: ["messenger", "speaker", "delegated authority role"],
      authorityOriginClass: "Class II - AngEL / Messenger of GOD",
      narrativeRole: "messenger/speaker delivering THE LORD's instruction and revelation to Joseph",
      canonicalRole: "Class II messenger role, not origin authority",
      sourcePhrase: "the angel of THE LORD appeared unto him",
      derivedMeaning: "AngEL Of THE LORD: Class II messenger role",
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Revelation pattern separates authority source THE LORD from speaker AngEL Of THE LORD"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:19-25",
      semanticItem: "Joseph",
      ontologyRoles: ["Human response", "obedient recipient", "covenant steward", "narrative responder"],
      authorityOriginClass: "Class III - Human",
      narrativeRole: "recipient of divine message who obeys, takes Mary as wife, and names the child JESUS",
      canonicalRole: "Human covenant steward; not divine origin authority",
      sourcePhrase: "Joseph... did as the angel of THE LORD had bidden him",
      derivedMeaning: "Joseph: Class III Human obedient recipient and covenant steward",
      relatedEntities: ["Joseph", "Mary", "JESUS", "AngEL Of THE LORD"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Semantic events and origin authority path distinguish Joseph's obedient Human response"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.18",
      verseRange: "Matthew 1:18-25",
      semanticItem: "Mary",
      ontologyRoles: ["Human", "mother role", "conception recipient", "covenant family participant"],
      authorityOriginClass: "Class III - Human",
      narrativeRole: "mother of JESUS and wife taken by Joseph after divine instruction",
      canonicalRole: "Human participant in birth narrative; not divine origin authority",
      sourcePhrase: "Mary thy wife; that which is conceived in her is of the Holy Ghost",
      derivedMeaning: "Mary: Class III Human mother role and conception recipient",
      relatedEntities: ["Mary", "Joseph", "JESUS", "HOLY SPIRIT"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Semantic events distinguish Mary as Human participant while conception origin is HOLY SPIRIT"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20",
      semanticItem: "HOLY SPIRIT",
      ontologyRoles: ["divine conception origin", "divine agency role"],
      authorityOriginClass: "Class I - GOD / Divine Authority",
      narrativeRole: "divine conception origin in derived semantic display",
      canonicalRole: "HOLY SPIRIT preferred derived display with Holy Ghost preserved as source phrase",
      sourcePhrase: "that which is conceived in her is of the Holy Ghost",
      derivedMeaning: "HOLY CONCEPTION: Conceived Of THE HOLY SPIRIT",
      relatedEntities: ["HOLY SPIRIT", "Holy Ghost", "Mary", "JESUS"],
      relatedLayers: commonLayers,
      confidence: "explicit",
      sourceGrounding: "Source phrase says Holy Ghost; derived semantic display prefers HOLY CONCEPTION / HOLY SPIRIT"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      semanticItem: "scripture narrator",
      ontologyRoles: ["narrator", "Human witness role", "fulfillment reporting role"],
      authorityOriginClass: "Class III - Human",
      narrativeRole: "narrator voice reports fulfillment and source framing",
      canonicalRole: "Human narrator; not direct divine speech",
      sourcePhrase: "Now all this was done, that it might be fulfilled",
      derivedMeaning: "scripture narrator: Class III Human narrative witness role",
      relatedEntities: ["scripture narrator", "THE LORD", "prophet"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_PASSAGE_FUNCTIONS"],
      confidence: "probable",
      sourceGrounding: "Fulfillment narration is distinguished from divine speech and prophetic source"
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      semanticItem: "quoted prophet",
      ontologyRoles: ["prophecy witness role", "Human quoted source", "fulfillment role"],
      authorityOriginClass: "Class III - Human",
      narrativeRole: "prophetic witness whose words are quoted through narrator fulfillment framing",
      canonicalRole: "Human prophecy witness; not the origin authority THE LORD",
      sourcePhrase: "spoken of THE LORD by the prophet",
      derivedMeaning: "quoted prophet: Class III Human prophecy witness role",
      relatedEntities: ["quoted prophet", "prophet", "THE LORD", "scripture narrator"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_PASSAGE_FUNCTIONS", "ICE_REFERENCE_ROLES"],
      confidence: "probable",
      sourceGrounding: "Matthew 1:22 distinguishes THE LORD as source from the prophet as Human witness"
    })
  ];
}
function movementSemanticRecord(record = {}) {
  const key = [
    "movement-semantic",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.movementType || "",
    record.originLocation || "",
    record.destinationLocation || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    movementType: record.movementType || "movement_location_semantic",
    originLocation: record.originLocation || "Not recorded.",
    destinationLocation: record.destinationLocation || "Not recorded.",
    movementPurpose: record.movementPurpose || "Not recorded.",
    authorityPath: record.authorityPath || "",
    revelationInvolvement: record.revelationInvolvement || "",
    adversarialInvolvement: record.adversarialInvolvement || "",
    fulfillmentLink: record.fulfillmentLink || "",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    relatedRevelationPatterns: record.relatedRevelationPatterns || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedEntityRelationRoles: record.relatedEntityRelationRoles || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded movement and location records"
  };
}

function createMovementSemantics(captures = [], passageFunctions = [], revelationPatterns = [], ontologyRoles = [], originAuthorityPaths = [], entityRelationRoles = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  if (!isMatthewTwo) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasPhrase = (pattern) => pattern.test(sourceText);
  const functionKeys = (keys) => (passageFunctions || []).filter((item) => keys.includes(item.passageFunction || "")).map((item) => item.passageFunction || item.id).filter(Boolean);
  const patternIds = (predicate) => (revelationPatterns || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
  const authorityPathIds = (predicate) => (originAuthorityPaths || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const relationRoleIds = (roles) => (entityRelationRoles || []).filter((item) => roles.includes(item.semanticRole || "")).map((item) => item.id || item.semanticRole).filter(Boolean);
  const add = (record) => movementSemanticRecord({ sourceCaptureId, sourceContext: context, ...record });
  const protectivePatternIds = patternIds((item) => item.speaker === "AngEL Of THE LORD" && item.recipient === "Joseph");
  const protectiveAuthorityPathIds = authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph");
  const records = [];

  if (hasPhrase(/Bethlehem of Judaea|for thus it is written/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.5",
      verseRange: "Matthew 2:4-6",
      movementType: "prophecy_location_identification",
      originLocation: "Jerusalem",
      destinationLocation: "Bethlehem",
      movementPurpose: "identify the written prophecy location for the CHILD / ruler expectation",
      authorityPath: "Human religious authority witnesses cite written prophecy; not origin Divine authority",
      revelationInvolvement: "written prophecy location witness",
      fulfillmentLink: "Bethlehem identified through written prophecy",
      sourcePhrase: "Bethlehem of Judaea: for thus it is written by the prophet",
      derivedMeaning: "Bethlehem is preserved as the prophecy-linked birth/location anchor in Matthew 2.",
      evidence: ["Bethlehem of Judaea", "for thus it is written by the prophet", "out of thee shall come a Governor"],
      relatedEntities: ["Bethlehem", "Jerusalem", "Chief priests and scribes", "JESUS", "quoted prophet"],
      relatedPassageFunctions: functionKeys(["prophecy_fulfillment_identification", "movement_location_prophecy_continuity"]),
      relatedOntologyRoles: ontologyIds(["Bethlehem", "Jerusalem", "Chief priests and scribes", "JESUS"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:4-6 explicitly names Bethlehem through the written-prophecy answer given in Jerusalem."
    }));
  }

  if (hasPhrase(/wise men from the east to Jerusalem|saw his star|fell down, and worshipped him/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.1",
      verseRange: "Matthew 2:1-11",
      movementType: "witness_travel_toward_child",
      originLocation: "east",
      destinationLocation: "Jerusalem -> Bethlehem / CHILD location",
      movementPurpose: "wise men travel toward the CHILD as worship witnesses",
      revelationInvolvement: "star witness and written prophecy location answer guide the travel context",
      fulfillmentLink: "movement leads to CHILD/JESUS recognition at the source-grounded location",
      sourcePhrase: "wise men from the east to Jerusalem; saw the young child; fell down, and worshipped him",
      derivedMeaning: "Wise men movement is a witness path toward CHILD/JESUS, not an authority-origin path.",
      evidence: ["wise men from the east to Jerusalem", "we have seen his star", "saw the young child", "fell down, and worshipped him"],
      relatedEntities: ["Wise men", "Jerusalem", "Bethlehem", "JESUS", "CHILD"],
      relatedPassageFunctions: functionKeys(["wise_men_arrival", "movement_location_prophecy_continuity"]),
      relatedOntologyRoles: ontologyIds(["Wise men", "Jerusalem", "Bethlehem", "JESUS"]),
      relatedEntityRelationRoles: relationRoleIds(["worship_witness_to_child"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2 directly grounds the wise men's travel, location inquiry, and worship response toward the young child."
    }));
  }

  if (hasPhrase(/flee into Egypt|departed into Egypt|Out of Egypt have I called my son/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.13",
      verseRange: "Matthew 2:13-15",
      movementType: "protective_escape_preservation",
      originLocation: "CHILD location in Judaea / Bethlehem context",
      destinationLocation: "Egypt",
      movementPurpose: "protective preservation of the CHILD",
      authorityPath: "THE LORD -> AngEL Of THE LORD -> Joseph",
      revelationInvolvement: "dream warning and protective movement command",
      adversarialInvolvement: "Herod will seek the young child to destroy him",
      fulfillmentLink: "Out of Egypt have I called my son",
      sourcePhrase: "Arise, and take the young child and his mother, and flee into Egypt",
      derivedMeaning: "Joseph moves CHILD/JESUS and Mary into Egypt as a Divine preservation path under warning.",
      evidence: ["flee into Egypt", "Herod will seek the young child to destroy him", "departed into Egypt", "Out of Egypt have I called my son"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS", "CHILD", "Mary", "Herod", "Egypt"],
      relatedPassageFunctions: functionKeys(["divine_warning_revelation", "protective_obedient_response", "egypt_escape_preservation", "messianic_location_fulfillment"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph", "JESUS", "Egypt", "Herod"]),
      relatedAuthorityPaths: protectiveAuthorityPathIds,
      relatedEntityRelationRoles: relationRoleIds(["protective_revelation_messenger_to_recipient", "protective_obedient_response_to_child", "hostile_authority_to_child_target"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:13-15 explicitly links warning, flight into Egypt, Herod's threat, Joseph's movement, and fulfillment wording."
    }));
  }

  if (hasPhrase(/they are dead which sought the young child's life|go into the land of Israel|arose, and took the young child/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.19",
      verseRange: "Matthew 2:19-21",
      movementType: "return_after_hostile_threat_removed",
      originLocation: "Egypt",
      destinationLocation: "land of Israel",
      movementPurpose: "return movement after hostile threat is removed",
      authorityPath: "THE LORD -> AngEL Of THE LORD -> Joseph",
      revelationInvolvement: "dream message after Herod's death",
      adversarialInvolvement: "those who sought the young child's life are dead",
      sourcePhrase: "Arise, and take the young child and his mother, and go into the land of Israel",
      derivedMeaning: "Joseph returns with CHILD/JESUS and Mary after a Divine message identifies the threat as removed.",
      evidence: ["the angel of the Lord appeareth in a dream to Joseph in Egypt", "go into the land of Israel", "they are dead which sought the young child's life"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS", "CHILD", "Mary", "Egypt", "land of Israel"],
      relatedPassageFunctions: functionKeys(["divine_warning_revelation", "protective_obedient_response", "repeated_guidance_preservation_cycle"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph", "JESUS", "Egypt"]),
      relatedAuthorityPaths: protectiveAuthorityPathIds,
      confidence: "explicit",
      sourceGrounding: "Matthew 2:19-21 grounds the return in a new dream message, Joseph's obedience, and the stated removal of the hostile threat."
    }));
  }

  if (hasPhrase(/turned aside into the parts of Galilee|dwelt in a city called Nazareth|called a Nazarene/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.22",
      verseRange: "Matthew 2:22-23",
      movementType: "protective_redirection_settlement_fulfillment",
      originLocation: "Judaea avoided / Galilee route",
      destinationLocation: "Nazareth",
      movementPurpose: "protective redirection and fulfillment-linked settlement",
      revelationInvolvement: "warning of God in a dream redirects travel",
      adversarialInvolvement: "Archelaus reigning in Judaea creates avoidance context",
      fulfillmentLink: "He shall be called a Nazarene",
      sourcePhrase: "being warned of God in a dream, he turned aside into the parts of Galilee; dwelt in a city called Nazareth",
      derivedMeaning: "Nazareth settlement is modeled as guided relocation with fulfillment linkage, grounded in warning and dwelling language.",
      evidence: ["being warned of God in a dream", "turned aside into the parts of Galilee", "dwelt in a city called Nazareth", "He shall be called a Nazarene"],
      relatedEntities: ["Joseph", "JESUS", "CHILD", "Mary", "Archelaus", "Judaea", "Galilee", "Nazareth", "quoted prophet"],
      relatedPassageFunctions: functionKeys(["repeated_guidance_preservation_cycle", "movement_location_prophecy_continuity", "messianic_location_fulfillment"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedOntologyRoles: ontologyIds(["Joseph", "JESUS", "Nazareth"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:22-23 explicitly grounds the redirection in warning, avoidance, Nazareth dwelling, and fulfillment wording."
    }));
  }

  return records;
}
function semanticCausalityRecord(record = {}) {
  const key = [
    "semantic-causality",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.sequenceType || "",
    record.initiatingCause || "",
    record.consequenceResult || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    sequenceType: record.sequenceType || "semantic_sequence_causality",
    initiatingCause: record.initiatingCause || "",
    authoritySource: record.authoritySource || "",
    messengerTransfer: record.messengerTransfer || "",
    humanResponse: record.humanResponse || "",
    consequenceResult: record.consequenceResult || "",
    preservationFulfillmentOutcome: record.preservationFulfillmentOutcome || "",
    sequenceSteps: record.sequenceSteps || [],
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    relatedSemanticEvents: record.relatedSemanticEvents || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    relatedRevelationPatterns: record.relatedRevelationPatterns || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedEntityRelationRoles: record.relatedEntityRelationRoles || [],
    relatedContinuity: record.relatedContinuity || [],
    relatedMovementSemantics: record.relatedMovementSemantics || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded sequence, authority, response, and fulfillment records"
  };
}

function createSemanticCausality(captures = [], semanticEvents = [], revelationPatterns = [], passageFunctions = [], ontologyRoles = [], originAuthorityPaths = [], entityRelationRoles = [], semanticContinuity = [], movementSemantics = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  if (!isMatthewOne && !isMatthewTwo) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasPhrase = (pattern) => pattern.test(sourceText);
  const eventIds = (types) => (semanticEvents || []).filter((item) => types.includes(item.eventType || "")).map((item) => item.id || item.semanticEventId).filter(Boolean);
  const functionKeys = (keys) => (passageFunctions || []).filter((item) => keys.includes(item.passageFunction || "")).map((item) => item.passageFunction || item.id).filter(Boolean);
  const patternIds = (predicate) => (revelationPatterns || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
  const authorityPathIds = (predicate) => (originAuthorityPaths || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const relationRoleIds = (roles) => (entityRelationRoles || []).filter((item) => roles.includes(item.semanticRole || "")).map((item) => item.id || item.semanticRole).filter(Boolean);
  const continuityIds = (types) => (semanticContinuity || []).filter((item) => types.includes(item.continuityType || "")).map((item) => item.id || item.continuityType).filter(Boolean);
  const movementIds = (types) => (movementSemantics || []).filter((item) => types.includes(item.movementType || "")).map((item) => item.id || item.movementType).filter(Boolean);
  const add = (record) => semanticCausalityRecord({ sourceCaptureId, sourceContext: context, ...record });
  const records = [];

  if (isMatthewOne && hasPhrase(/angel of the Lord appeareth unto him in a dream|thou shalt call his name JESUS|called his name JESUS/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-25",
      sequenceType: "revelation_obedience_naming_sequence",
      initiatingCause: "Mary is found with CHILD / JESUS context and Joseph requires revealed instruction.",
      authoritySource: "THE LORD",
      messengerTransfer: "THE LORD -> AngEL Of THE LORD -> Joseph",
      humanResponse: "Joseph obeys the revealed instruction and names JESUS.",
      consequenceResult: "JESUS is named according to the revealed NAME instruction.",
      preservationFulfillmentOutcome: "mission meaning is revealed: HE shall SAVE HIS People from their sins; fulfillment narration continues.",
      sequenceSteps: [
        "THE LORD authorizes revelation through AngEL Of THE LORD",
        "Joseph receives dream instruction",
        "Joseph obeys and takes Mary",
        "Joseph names JESUS",
        "mission meaning and fulfillment frame are preserved"
      ],
      sourcePhrase: "the angel of the Lord appeared unto him in a dream; thou shalt call his name JESUS; called his name JESUS",
      derivedMeaning: "Matthew 1 sequence links Divine authority, messenger transfer, Joseph's obedient response, JESUS naming, and mission meaning without collapsing source wording into doctrine expansion.",
      evidence: ["the angel of the Lord appeared unto him in a dream", "thou shalt call his name JESUS", "he did as the angel of the Lord had bidden him", "called his name JESUS", "he shall save his people from their sins"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "JESUS", "CHILD"],
      relatedSemanticEvents: eventIds(["divine_message_cluster", "name_revelation", "mission_reason_declaration", "covenant_family_union"]),
      relatedPassageFunctions: functionKeys(["divine_message_instruction", "obedient_response_and_naming", "prophecy_fulfillment_identification"]),
      relatedRevelationPatterns: patternIds((item) => item.speaker === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedOntologyRoles: ontologyIds(["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "JESUS"]),
      relatedAuthorityPaths: authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedEntityRelationRoles: relationRoleIds(["source_authority_to_messenger", "revelation_messenger_to_recipient", "obedient_response_to_revealed_name"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 1:20-25 explicitly sequences dream revelation, Joseph's obedience, JESUS naming, and mission/fulfillment explanation."
    }));
  }

  if (isMatthewTwo && hasPhrase(/Herod will seek the young child to destroy him|flee into Egypt|Out of Egypt have I called my son/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.13",
      verseRange: "Matthew 2:13-15",
      sequenceType: "hostile_threat_warning_preservation_sequence",
      initiatingCause: "Herod seeks the CHILD to destroy Him.",
      authoritySource: "THE LORD",
      messengerTransfer: "THE LORD -> AngEL Of THE LORD -> Joseph",
      humanResponse: "Joseph obeys and departs into Egypt with the CHILD and Mary.",
      consequenceResult: "CHILD / JESUS is preserved from hostile threat.",
      preservationFulfillmentOutcome: "Egypt movement continues prophecy/location fulfillment: Out of Egypt have I called my son.",
      sequenceSteps: [
        "Herod hostile intent creates danger for the CHILD",
        "THE LORD sends warning through AngEL Of THE LORD",
        "Joseph receives protective instruction",
        "Joseph obeys and moves CHILD / JESUS and Mary into Egypt",
        "preservation and fulfillment continuity continue"
      ],
      sourcePhrase: "Herod will seek the young child to destroy him; Arise, and take the young child and his mother, and flee into Egypt; departed into Egypt; Out of Egypt have I called my son",
      derivedMeaning: "Matthew 2 grounds a causal sequence where hostile intent is answered by Divine warning, protective obedience, CHILD preservation, and fulfillment continuity.",
      evidence: ["Herod will seek the young child to destroy him", "Arise, and take the young child", "flee into Egypt", "departed into Egypt", "Out of Egypt have I called my son"],
      relatedEntities: ["Herod", "THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "JESUS", "CHILD", "Egypt"],
      relatedSemanticEvents: eventIds(["hostile_authority_response", "protective_instruction_revelation", "protective_obedient_response", "messianic_location_fulfillment"]),
      relatedPassageFunctions: functionKeys(["hostile_authority_response", "divine_warning_revelation", "protective_obedient_response", "egypt_escape_preservation", "messianic_location_fulfillment"]),
      relatedRevelationPatterns: patternIds((item) => item.speaker === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedOntologyRoles: ontologyIds(["Herod", "AngEL Of THE LORD", "Joseph", "JESUS", "Egypt"]),
      relatedAuthorityPaths: authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedEntityRelationRoles: relationRoleIds(["hostile_authority_to_child_target", "protective_revelation_messenger_to_recipient", "protective_obedient_response_to_child"]),
      relatedContinuity: continuityIds(["continued_child_identity_and_mission_preservation", "adversarial_escalation_against_mission_preservation"]),
      relatedMovementSemantics: movementIds(["protective_escape_preservation"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:13-15 explicitly states Herod's destroy-him threat, the dream warning, Joseph's departure into Egypt, and the fulfillment formula."
    }));
  }

  if (isMatthewTwo && hasPhrase(/they are dead which sought the young child's life|being warned of God in a dream|dwelt in a city called Nazareth|called a Nazarene/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.19",
      verseRange: "Matthew 2:19-23",
      sequenceType: "threat_removed_guided_return_fulfillment_sequence",
      initiatingCause: "The hostile threat is reported removed, while Archelaus creates a renewed avoidance context.",
      authoritySource: "THE LORD / warning of God",
      messengerTransfer: "AngEL Of THE LORD dream message and later dream warning",
      humanResponse: "Joseph returns toward Israel, avoids Judaea, and settles in Nazareth.",
      consequenceResult: "CHILD / JESUS remains preserved through guided movement.",
      preservationFulfillmentOutcome: "Nazareth settlement carries fulfillment linkage: He shall be called a Nazarene.",
      sequenceSteps: [
        "threat-removal message authorizes return from Egypt",
        "Joseph obeys and goes toward Israel",
        "Archelaus reign creates cautious avoidance context",
        "warning redirects Joseph into Galilee",
        "Nazareth settlement preserves CHILD / JESUS and continues fulfillment linkage"
      ],
      sourcePhrase: "they are dead which sought the young child's life; he arose, and took the young child; being warned of God in a dream, he turned aside; dwelt in a city called Nazareth; He shall be called a Nazarene",
      derivedMeaning: "Matthew 2 continues the preservation sequence through threat removal, renewed warning, obedient redirection, and fulfillment-linked settlement.",
      evidence: ["they are dead which sought the young child's life", "he arose, and took the young child", "being warned of God in a dream", "turned aside into the parts of Galilee", "dwelt in a city called Nazareth", "He shall be called a Nazarene"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "JESUS", "CHILD", "Egypt", "land of Israel", "Archelaus", "Nazareth"],
      relatedSemanticEvents: eventIds(["protective_instruction_revelation", "protective_obedient_response", "messianic_location_fulfillment"]),
      relatedPassageFunctions: functionKeys(["divine_warning_revelation", "protective_obedient_response", "repeated_guidance_preservation_cycle", "movement_location_prophecy_continuity", "messianic_location_fulfillment"]),
      relatedRevelationPatterns: patternIds((item) => item.speaker === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph", "JESUS", "Egypt", "Nazareth"]),
      relatedAuthorityPaths: authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"),
      relatedEntityRelationRoles: relationRoleIds(["protective_revelation_messenger_to_recipient", "protective_obedient_response_to_child"]),
      relatedContinuity: continuityIds(["continued_authority_revelation_relationship", "continued_prophecy_fulfillment_chain"]),
      relatedMovementSemantics: movementIds(["return_after_hostile_threat_removed", "protective_redirection_settlement_fulfillment"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:19-23 grounds the sequence in threat-removal wording, Joseph's obedient return, warning-driven redirection, Nazareth dwelling, and fulfillment wording."
    }));
  }

  return records;
}
function teachingSemanticRecord(record = {}) {
  const key = [
    "teaching-semantic",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.discourseType || "",
    record.speaker || "",
    record.teachingTopic || record.commandment || record.blessing || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    discourseType: record.discourseType || "teaching_discourse",
    speaker: record.speaker || "",
    canonicalIdentity: record.canonicalIdentity || "",
    audience: record.audience || "",
    teachingBlock: record.teachingBlock || "",
    teachingTopic: record.teachingTopic || "",
    principle: record.principle || "",
    commandment: record.commandment || "",
    interpretation: record.interpretation || "",
    blessing: record.blessing || "",
    warning: record.warning || "",
    requirement: record.requirement || "",
    promise: record.promise || "",
    contrast: record.contrast || "",
    example: record.example || "",
    application: record.application || "",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    groupEntities: record.groupEntities || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    relatedReferenceRoles: record.relatedReferenceRoles || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded teaching/discourse records"
  };
}

function teachingGroupEntity(record = {}) {
  return {
    entityName: record.entityName || "People / multitudes",
    entityType: "Group Entity",
    highestObservedClass: record.highestObservedClass || "Class III - Human",
    lowestObservedClass: record.lowestObservedClass || "Class III - Human",
    currentGroundedClassRange: record.currentGroundedClassRange || "Class III -> Class III",
    currentGrounding: record.currentGrounding || "Human audience",
    sourcePhrase: record.sourcePhrase || "multitudes / disciples"
  };
}

function createTeachingSemantics(captures = [], passageFunctions = [], referenceRoles = [], ontologyRoles = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewFive = context.book === "Matthew" && String(context.chapter || "") === "5";
  if (!isMatthewFive) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasPhrase = (pattern) => pattern.test(sourceText);
  const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
  const functionKeys = (keys) => (passageFunctions || []).filter((item) => keys.includes(item.passageFunction || "")).map((item) => item.passageFunction || item.id).filter(Boolean);
  const referenceIds = (predicate) => (referenceRoles || []).filter(predicate).map((item) => item.id || item.referenceRole || item.sourceInput).filter(Boolean);
  const humanAudienceGroup = teachingGroupEntity({ entityName: "People / multitudes", sourcePhrase: "multitudes; disciples came unto him" });
  const add = (record) => teachingSemanticRecord({
    sourceCaptureId,
    sourceContext: context,
    teachingBlock: "Sermon on the Mount",
    speaker: "JESUS",
    canonicalIdentity: "JESUS CHRIST",
    audience: record.audience || "disciples; multitudes",
    relatedEntities: ["JESUS", "JESUS CHRIST", "disciples", "multitudes", ...(record.relatedEntities || [])],
    groupEntities: [humanAudienceGroup, ...(record.groupEntities || [])],
    relatedOntologyRoles: ontologyIds(["JESUS", "JESUS CHRIST", "disciples", "multitudes", ...(record.relatedOntologyRoleItems || [])]),
    relatedPassageFunctions: functionKeys(record.relatedPassageFunctionKeys || []),
    relatedReferenceRoles: referenceIds((item) => /JESUS|CHRIST|Sermon|Mount|disciple|multitude/i.test(`${item.sourceInput || ""} ${item.resolvedBeing || ""} ${item.referenceRole || ""}`)),
    ...record
  });
  const records = [];

  if (hasPhrase(/seeing the multitudes|his disciples came unto him|opened his mouth, and taught them/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", discourseType: "teaching_block", audience: "disciples; multitudes", teachingTopic: "Sermon on the Mount teaching context", sourcePhrase: "seeing the multitudes, he went up into a mountain; his disciples came unto him; he opened his mouth, and taught them", derivedMeaning: "JESUS is the grounded speaker for Matthew 5 teaching; disciples are the direct teaching audience with multitudes as surrounding chapter context.", evidence: ["seeing the multitudes", "his disciples came unto him", "he opened his mouth, and taught them"], confidence: "explicit", sourceGrounding: "Matthew 5:1-2 directly grounds speaker, audience, and teaching posture before the discourse content begins." }));
  }
  if (hasPhrase(/Blessed are the poor in spirit|theirs is the kingdom of heaven/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.3", verseRange: "Matthew 5:3", discourseType: "blessing", audience: "disciples; multitudes", teachingTopic: "Beatitude blessing", principle: "kingdom humility", blessing: "Blessed are the poor in spirit", promise: "theirs is the kingdom of heaven", sourcePhrase: "Blessed are the poor in spirit: for theirs is the kingdom of heaven", derivedMeaning: "The discourse presents a blessing tied to kingdom promise without treating the promise as a separate event actor.", evidence: ["Blessed are the poor in spirit", "theirs is the kingdom of heaven"], confidence: "explicit", sourceGrounding: "Matthew 5:3 directly states the blessing and its promise." }));
  }
  if (hasPhrase(/Blessed are the meek|inherit the earth/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.5", verseRange: "Matthew 5:5", discourseType: "blessing", audience: "disciples; multitudes", teachingTopic: "Beatitude blessing", principle: "meekness", blessing: "Blessed are the meek", promise: "they shall inherit the earth", sourcePhrase: "Blessed are the meek: for they shall inherit the earth", derivedMeaning: "The discourse links meekness with a stated promised result.", evidence: ["Blessed are the meek", "they shall inherit the earth"], confidence: "explicit", sourceGrounding: "Matthew 5:5 directly states both the blessing and promise." }));
  }
  if (hasPhrase(/Blessed are the merciful|obtain mercy/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.7", verseRange: "Matthew 5:7", discourseType: "blessing", audience: "disciples; multitudes", teachingTopic: "Beatitude blessing", principle: "mercy", blessing: "Blessed are the merciful", promise: "they shall obtain mercy", sourcePhrase: "Blessed are the merciful: for they shall obtain mercy", derivedMeaning: "The discourse links mercy with a stated reciprocal mercy promise.", evidence: ["Blessed are the merciful", "they shall obtain mercy"], confidence: "explicit", sourceGrounding: "Matthew 5:7 directly states the blessing and promise." }));
  }
  if (hasPhrase(/Blessed are the pure in heart|they shall see God/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.8", verseRange: "Matthew 5:8", discourseType: "blessing", audience: "disciples; multitudes", teachingTopic: "Beatitude blessing", principle: "purity", blessing: "Blessed are the pure in heart", promise: "they shall see GOD", sourcePhrase: "Blessed are the pure in heart: for they shall see God", derivedMeaning: "The discourse presents purity of heart with a stated promise of seeing GOD.", evidence: ["Blessed are the pure in heart", "they shall see God"], confidence: "explicit", sourceGrounding: "Matthew 5:8 directly states both the purity blessing and promise." }));
  }
  if (hasPhrase(/Blessed are the peacemakers|children of God/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.9", verseRange: "Matthew 5:9", discourseType: "blessing", audience: "disciples; multitudes", teachingTopic: "Beatitude blessing", principle: "peacemaking", blessing: "Blessed are the peacemakers", promise: "they shall be called the children of GOD", sourcePhrase: "Blessed are the peacemakers: for they shall be called the children of God", derivedMeaning: "The discourse presents peacemaking with a stated identity promise.", evidence: ["Blessed are the peacemakers", "children of God"], confidence: "explicit", sourceGrounding: "Matthew 5:9 directly states both the peacemaking blessing and promise." }));
  }

  if (hasPhrase(/Thou shalt not kill|But I say unto you|danger of the judgment/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.21", verseRange: "Matthew 5:21-24", discourseType: "commandment_interpretation", audience: "disciples; multitudes", teachingTopic: "commandment and interpretation", principle: "reconciliation and inward righteousness", commandment: "Thou shalt not kill", interpretation: "But I say unto you... whosoever is angry with his brother...", warning: "danger of the judgment", application: "be reconciled to thy brother", sourcePhrase: "Thou shalt not kill; But I say unto you... whosoever is angry with his brother... be reconciled to thy brother", derivedMeaning: "JESUS teaches commandment interpretation that moves from the known commandment into reconciliation and inward righteousness.", evidence: ["Thou shalt not kill", "But I say unto you", "danger of the judgment", "be reconciled to thy brother"], confidence: "explicit", sourceGrounding: "Matthew 5:21-24 directly grounds the commandment, interpretive formula, warning, and reconciliation application." }));
  }
  if (hasPhrase(/Thou shalt not commit adultery|looketh on a woman to lust/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.27", verseRange: "Matthew 5:27-30", discourseType: "commandment_interpretation", audience: "disciples; multitudes", teachingTopic: "commandment and interpretation", principle: "purity and inward righteousness", commandment: "Thou shalt not commit adultery", interpretation: "But I say unto you... looketh on a woman to lust...", warning: "offending member imagery warns against sin", sourcePhrase: "Thou shalt not commit adultery; But I say unto you, That whosoever looketh on a woman to lust after her...", derivedMeaning: "JESUS teaches commandment interpretation that treats inward desire as semantically relevant to righteousness.", evidence: ["Thou shalt not commit adultery", "But I say unto you", "looketh on a woman to lust"], confidence: "explicit", sourceGrounding: "Matthew 5:27-30 directly grounds the commandment, interpretive formula, and warning/application language." }));
  }
  if (hasPhrase(/think not that I am come to destroy the law|I am not come to destroy, but to fulfil/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.17", verseRange: "Matthew 5:17-20", discourseType: "contrast", audience: "disciples; multitudes", teachingTopic: "law and fulfillment", principle: "fulfillment and righteousness", contrast: "destroy the law contrasted with fulfil", requirement: "righteousness exceeding scribes and Pharisees context", warning: "no case enter into the kingdom of heaven", sourcePhrase: "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil", derivedMeaning: "The discourse contrasts destroying with fulfilling and frames righteousness as a teaching requirement in context.", evidence: ["not come to destroy", "but to fulfil", "except your righteousness shall exceed"], confidence: "explicit", sourceGrounding: "Matthew 5:17-20 directly states the contrast and righteousness requirement context." }));
  }
  if (hasPhrase(/Blessed are they which do hunger and thirst after righteousness|they shall be filled/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.6", verseRange: "Matthew 5:6", discourseType: "principle", teachingTopic: "righteousness teaching", principle: "hunger and thirst after righteousness", blessing: "Blessed are they which do hunger and thirst after righteousness", promise: "they shall be filled", sourcePhrase: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled", derivedMeaning: "The discourse presents righteousness as a desired teaching principle with a stated blessing and promise.", evidence: ["hunger and thirst after righteousness", "they shall be filled"], confidence: "explicit", sourceGrounding: "Matthew 5:6 directly states the righteousness blessing and promised filling." }));
  }
  if (hasPhrase(/Thou shalt not forswear thyself|swear not at all|Yea, yea; Nay, nay/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.33", verseRange: "Matthew 5:33-37", discourseType: "commandment_interpretation", teachingTopic: "oath and speech integrity", principle: "integrity of speech", commandment: "Thou shalt not forswear thyself", interpretation: "But I say unto you, Swear not at all", warning: "whatsoever is more than these cometh of evil", application: "let your communication be, Yea, yea; Nay, nay", sourcePhrase: "Thou shalt not forswear thyself... But I say unto you, Swear not at all... let your communication be, Yea, yea; Nay, nay", derivedMeaning: "JESUS teaches oath language as a commandment expansion focused on truthful speech and restrained commitment language.", evidence: ["Thou shalt not forswear thyself", "Swear not at all", "Yea, yea; Nay, nay"], confidence: "explicit", sourceGrounding: "Matthew 5:33-37 directly grounds the oath commandment citation, interpretive formula, and speech application." }));
  }
  if (hasPhrase(/An eye for an eye|resist not evil|turn to him the other also/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.38", verseRange: "Matthew 5:38-42", discourseType: "commandment_interpretation", teachingTopic: "retaliation and non-retaliation teaching", principle: "restrained response to injury", commandment: "An eye for an eye, and a tooth for a tooth", interpretation: "But I say unto you, That ye resist not evil", application: "turn to him the other also; go the second mile", sourcePhrase: "An eye for an eye... But I say unto you, That ye resist not evil... turn to him the other also", derivedMeaning: "JESUS teaches a response pattern that contrasts retaliation language with restrained non-retaliation application.", evidence: ["An eye for an eye", "resist not evil", "turn to him the other also"], confidence: "explicit", sourceGrounding: "Matthew 5:38-42 directly grounds the cited retaliation wording, interpretive formula, and application examples." }));
  }
  if (hasPhrase(/Thou shalt love thy neighbour|Love your enemies|pray for them which despitefully use you/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.43", verseRange: "Matthew 5:43-48", discourseType: "commandment_interpretation", teachingTopic: "love enemy teaching", principle: "love beyond reciprocal relationships", commandment: "Thou shalt love thy neighbour", interpretation: "But I say unto you, Love your enemies", application: "bless them that curse you; pray for them which despitefully use you", requirement: "be ye therefore perfect, even as your Father which is in heaven is perfect", sourcePhrase: "Thou shalt love thy neighbour... But I say unto you, Love your enemies... pray for them which despitefully use you", derivedMeaning: "JESUS expands love language beyond neighbor-only framing into enemy-love application, grounded in the source's command and example wording.", evidence: ["Thou shalt love thy neighbour", "Love your enemies", "pray for them which despitefully use you"], confidence: "explicit", sourceGrounding: "Matthew 5:43-48 directly grounds the love commandment citation, interpretive formula, and enemy-love application." }));
  }

  return records;
}


function characterInteractionRecord(record = {}) {
  const key = [
    "character-interaction",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.sourceCharacter || "",
    record.targetCharacter || "",
    record.interactionType || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    sourceCharacter: record.sourceCharacter || "",
    targetCharacter: record.targetCharacter || "",
    interactionType: record.interactionType || "semantic_interaction",
    authorityClass: record.authorityClass || "",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedRelationshipRoles: record.relatedRelationshipRoles || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedTeachingSemantics: record.relatedTeachingSemantics || [],
    relatedMovementSemantics: record.relatedMovementSemantics || [],
    relatedSemanticCausality: record.relatedSemanticCausality || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded character, group, authority, and relationship records"
  };
}

function createCharacterInteractions(captures = [], ontologyRoles = [], entityRelationRoles = [], originAuthorityPaths = [], teachingSemantics = [], movementSemantics = [], semanticCausality = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  const isMatthewFive = context.book === "Matthew" && String(context.chapter || "") === "5";
  if (!isMatthewOne && !isMatthewTwo && !isMatthewFive) return [];

  const hasPhrase = (pattern) => pattern.test(sourceText);
  const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
  const relationIds = (roles) => (entityRelationRoles || []).filter((item) => roles.includes(item.semanticRole || "")).map((item) => item.id || item.semanticRole).filter(Boolean);
  const authorityPathIds = (predicate) => (originAuthorityPaths || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const teachingIds = (predicate) => (teachingSemantics || []).filter(predicate).map((item) => item.id || item.teachingTopic || item.sourcePhrase).filter(Boolean);
  const movementIds = (types) => (movementSemantics || []).filter((item) => types.includes(item.movementType || "")).map((item) => item.id || item.movementType).filter(Boolean);
  const causalityIds = (types) => (semanticCausality || []).filter((item) => types.includes(item.sequenceType || "")).map((item) => item.id || item.sequenceType).filter(Boolean);
  const add = (record) => characterInteractionRecord({ sourceCaptureId, sourceContext: context, ...record });
  const records = [];

  if (isMatthewOne && hasPhrase(/angel of the Lord appeared unto him|angel of THE LORD appeared unto him|did as the angel of the Lord had bidden him|called his name JESUS/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.1.verse.20", verseRange: "Matthew 1:20-21", sourceCharacter: "THE LORD", targetCharacter: "AngEL Of THE LORD", interactionType: "authorizes messenger", authorityClass: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD", sourcePhrase: "the angel of THE LORD appeared unto him", derivedMeaning: "THE LORD is the source authority behind the messenger appearance; AngEL Of THE LORD carries the revelation path.", evidence: ["the angel of THE LORD appeared unto him"], relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph"], relatedOntologyRoles: ontologyIds(["THE LORD", "AngEL Of THE LORD"]), relatedRelationshipRoles: relationIds(["source_authority_to_messenger"]), relatedAuthorityPaths: authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD"), confidence: "probable", sourceGrounding: "Matthew 1 grounds AngEL Of THE LORD as messenger by LORD wording while origin authority is preserved through authority-path semantics." }));
    records.push(add({ scopePath: "scripture.nt.matthew.1.verse.20", verseRange: "Matthew 1:20-21", sourceCharacter: "AngEL Of THE LORD", targetCharacter: "Joseph", interactionType: "reveals / instructs", authorityClass: "Class II - AngEL / Messenger of GOD -> Class III - Human", sourcePhrase: "appeared unto him in a dream, saying, Joseph... fear not", derivedMeaning: "AngEL Of THE LORD speaks revelation and instruction to Joseph as Human recipient.", evidence: ["appeared unto him in a dream", "saying, Joseph", "fear not to take unto thee Mary thy wife"], relatedEntities: ["AngEL Of THE LORD", "Joseph", "Mary", "JESUS"], relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph"]), relatedRelationshipRoles: relationIds(["revelation_messenger_to_recipient"]), relatedAuthorityPaths: authorityPathIds((item) => item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"), confidence: "explicit", sourceGrounding: "Matthew 1:20 directly states the messenger appearance, speech, and Joseph as addressed recipient." }));
    records.push(add({ scopePath: "scripture.nt.matthew.1.verse.24", verseRange: "Matthew 1:24-25", sourceCharacter: "Joseph", targetCharacter: "Mary", interactionType: "takes as wife / covenant response", authorityClass: "Class III - Human -> Class III - Human", sourcePhrase: "took unto him his wife", derivedMeaning: "Joseph responds to revelation by taking Mary as wife, preserving the Human covenant/family interaction without collapsing Mary into process wording.", evidence: ["took unto him his wife"], relatedEntities: ["Joseph", "Mary"], relatedOntologyRoles: ontologyIds(["Joseph", "Mary"]), relatedRelationshipRoles: relationIds(["covenant_steward_to_covenant_participant"]), confidence: "explicit", sourceGrounding: "Matthew 1:24 directly grounds Joseph's response toward Mary." }));
    records.push(add({ scopePath: "scripture.nt.matthew.1.verse.25", verseRange: "Matthew 1:25", sourceCharacter: "Joseph", targetCharacter: "JESUS", interactionType: "names", authorityClass: "Class III - Human -> Class I - GOD / Divine Authority", sourcePhrase: "called his name JESUS", derivedMeaning: "Joseph names JESUS according to revealed instruction while preserving JESUS as narrative NAME and JESUS CHRIST as canonical/source identity.", evidence: ["called his name JESUS", "thou shalt call his name JESUS"], relatedEntities: ["Joseph", "JESUS", "JESUS CHRIST"], relatedOntologyRoles: ontologyIds(["Joseph", "JESUS", "JESUS CHRIST"]), relatedRelationshipRoles: relationIds(["obedient_response_to_revealed_name"]), confidence: "explicit", sourceGrounding: "Matthew 1:25 directly states Joseph called His name JESUS after the revealed instruction." }));
  }

  if (isMatthewTwo && hasPhrase(/Herod|wise men|young child|flee into Egypt|destroy him|worshipped him/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.2.verse.7", verseRange: "Matthew 2:7-8", sourceCharacter: "Herod", targetCharacter: "Wise men", interactionType: "questions / directs deceptively", authorityClass: "Class i - Adversarial / Oppositional -> Class III - Human", sourcePhrase: "Herod... privily called the wise men... that I may come and worship him also", derivedMeaning: "Herod interacts with the wise men through secret inquiry and deceptive worship language, grounded in source wording.", evidence: ["privily called the wise men", "enquired of them diligently", "that I may come and worship him also"], relatedEntities: ["Herod", "Wise men", "JESUS"], relatedOntologyRoles: ontologyIds(["Herod", "Wise men"]), relatedRelationshipRoles: relationIds(["hostile_authority_to_child_target"]), confidence: /that I may come and worship him also|destroy him/i.test(sourceText) ? "explicit" : "probable", sourceGrounding: "Matthew 2:7-8 grounds the Herod-to-wise-men interaction in private inquiry and stated direction." }));
    records.push(add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-14", sourceCharacter: "THE LORD", targetCharacter: "AngEL Of THE LORD", interactionType: "authorizes protective messenger", authorityClass: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD", sourcePhrase: "the angel of the Lord appeareth to Joseph in a dream", derivedMeaning: "THE LORD remains source authority while AngEL Of THE LORD carries protective preservation instruction.", evidence: ["the angel of the Lord appeareth to Joseph in a dream"], relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS"], relatedOntologyRoles: ontologyIds(["THE LORD", "AngEL Of THE LORD"]), relatedRelationshipRoles: relationIds(["source_authority_to_protective_messenger"]), relatedAuthorityPaths: authorityPathIds((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD"), confidence: "probable", sourceGrounding: "Matthew 2 preserves LORD wording in the messenger title; authority-path records keep origin and messenger distinct." }));
    records.push(add({ scopePath: "scripture.nt.matthew.2.verse.13", verseRange: "Matthew 2:13-14, 19-21", sourceCharacter: "AngEL Of THE LORD", targetCharacter: "Joseph", interactionType: "warns / commands protective movement", authorityClass: "Class II - AngEL / Messenger of GOD -> Class III - Human", sourcePhrase: "Arise, and take the young child and his mother, and flee into Egypt", derivedMeaning: "AngEL Of THE LORD gives Joseph protective movement instructions concerning CHILD/JESUS and Mary.", evidence: ["Arise", "take the young child", "flee into Egypt"], relatedEntities: ["AngEL Of THE LORD", "Joseph", "JESUS", "CHILD", "Mary"], relatedOntologyRoles: ontologyIds(["AngEL Of THE LORD", "Joseph", "JESUS"]), relatedRelationshipRoles: relationIds(["protective_revelation_messenger_to_recipient"]), relatedAuthorityPaths: authorityPathIds((item) => item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph"), relatedMovementSemantics: movementIds(["protective_escape_preservation", "return_after_hostile_threat_removed"]), confidence: "explicit", sourceGrounding: "Matthew 2:13 directly states the messenger command to Joseph." }));
    records.push(add({ scopePath: "scripture.nt.matthew.2.verse.14", verseRange: "Matthew 2:14-15, 21-23", sourceCharacter: "Joseph", targetCharacter: "CHILD / JESUS", interactionType: "protects / moves", authorityClass: "Class III - Human -> Class I - GOD / Divine Authority", sourcePhrase: "took the young child and his mother... departed into Egypt", derivedMeaning: "Joseph protects and moves CHILD/JESUS in obedient response to Divine warning.", evidence: ["took the young child and his mother", "departed into Egypt", "dwelt in a city called Nazareth"], relatedEntities: ["Joseph", "JESUS", "CHILD", "Mary", "Egypt", "Nazareth"], relatedOntologyRoles: ontologyIds(["Joseph", "JESUS"]), relatedRelationshipRoles: relationIds(["protective_obedient_response_to_child"]), relatedMovementSemantics: movementIds(["protective_escape_preservation", "protective_redirection_settlement_fulfillment"]), relatedSemanticCausality: causalityIds(["hostile_threat_warning_preservation_sequence", "threat_removed_guided_return_fulfillment_sequence"]), confidence: "explicit", sourceGrounding: "Matthew 2 repeatedly grounds Joseph's protective interaction in took/departed/returned/dwelt movement language." }));
    records.push(add({ scopePath: "scripture.nt.matthew.2.verse.16", verseRange: "Matthew 2:13, 16", sourceCharacter: "Herod", targetCharacter: "CHILD / JESUS", interactionType: "adversary targets", authorityClass: "Class i - Adversarial / Oppositional -> Class I - GOD / Divine Authority", sourcePhrase: "Herod will seek the young child to destroy him", derivedMeaning: "Herod is modeled as adversarial targeter of CHILD/JESUS only where destroy-him wording grounds hostile intent.", evidence: ["Herod will seek the young child to destroy him", "destroy him"], relatedEntities: ["Herod", "JESUS", "CHILD"], relatedOntologyRoles: ontologyIds(["Herod", "JESUS"]), relatedRelationshipRoles: relationIds(["hostile_authority_to_child_target"]), relatedSemanticCausality: causalityIds(["hostile_threat_warning_preservation_sequence"]), confidence: /destroy him/i.test(sourceText) ? "explicit" : "probable", sourceGrounding: "Matthew 2 grounds this interaction with direct destroy-him wording, avoiding automatic adversarial classification." }));
  }

  if (isMatthewFive && hasPhrase(/seeing the multitudes|disciples came unto him|opened his mouth, and taught them/i)) {
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", sourceCharacter: "JESUS", targetCharacter: "disciples", interactionType: "teaches", authorityClass: "Class I - GOD / Divine Authority -> Class III - Human", sourcePhrase: "his disciples came unto him; he opened his mouth, and taught them", derivedMeaning: "JESUS teaches disciples within the Sermon on the Mount discourse.", evidence: ["his disciples came unto him", "he opened his mouth, and taught them"], relatedEntities: ["JESUS", "JESUS CHRIST", "disciples"], relatedOntologyRoles: ontologyIds(["JESUS", "disciples"]), relatedTeachingSemantics: teachingIds((item) => /Sermon on the Mount teaching context|teaching/i.test(`${item.teachingTopic || ""} ${item.derivedMeaning || ""}`)), confidence: "explicit", sourceGrounding: "Matthew 5:1-2 directly grounds JESUS as speaker/teacher and disciples as teaching audience." }));
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", sourceCharacter: "JESUS", targetCharacter: "People / multitudes", interactionType: "teaches in surrounding audience context", authorityClass: "Class I - GOD / Divine Authority -> Class III - Human group", sourcePhrase: "seeing the multitudes... he opened his mouth, and taught them", derivedMeaning: "JESUS teaches with multitudes as surrounding Human audience context while disciples remain direct addressees in the source phrase.", evidence: ["seeing the multitudes", "he opened his mouth, and taught them"], relatedEntities: ["JESUS", "JESUS CHRIST", "disciples", "multitudes", "People / multitudes"], relatedOntologyRoles: ontologyIds(["JESUS", "multitudes"]), relatedTeachingSemantics: teachingIds((item) => /multitudes|disciples|audience/i.test(`${item.audience || ""} ${item.derivedMeaning || ""}`)), confidence: "probable", sourceGrounding: "Matthew 5:1-2 grounds multitudes as surrounding audience context and disciples as direct teaching recipients." }));
    records.push(add({ scopePath: "scripture.nt.matthew.5.verse.1", verseRange: "Matthew 5:1-2", sourceCharacter: "disciples", targetCharacter: "JESUS", interactionType: "come to teacher / receive teaching", authorityClass: "Class III - Human -> Class I - GOD / Divine Authority", sourcePhrase: "his disciples came unto him", derivedMeaning: "The disciples approach JESUS and become the direct grounded teaching audience.", evidence: ["his disciples came unto him"], relatedEntities: ["disciples", "JESUS", "JESUS CHRIST"], relatedOntologyRoles: ontologyIds(["disciples", "JESUS"]), relatedTeachingSemantics: teachingIds((item) => /disciples/i.test(`${item.audience || ""} ${item.sourcePhrase || ""}`)), confidence: "explicit", sourceGrounding: "Matthew 5:1 directly states that His disciples came unto Him before the teaching begins." }));
  }

  return records;
}
function sessionContinuityReviewRecord(record = {}) {
  const key = [
    "session-continuity-review",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.sessionRange || "",
    record.reviewType || "session_continuity_review"
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "session.scope.current_range",
    reviewType: record.reviewType || "session_continuity_review",
    sessionRange: record.sessionRange || "Current session",
    analyzedPages: record.analyzedPages || [],
    continuingCharacters: record.continuingCharacters || [],
    continuingThemes: record.continuingThemes || [],
    continuingAuthorityPaths: record.continuingAuthorityPaths || [],
    teachingProgression: record.teachingProgression || [],
    continuingPrincipleFamilies: record.continuingPrincipleFamilies || [],
    continuingCharacterInteractions: record.continuingCharacterInteractions || [],
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedSemanticContinuity: record.relatedSemanticContinuity || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedPrincipleRelationships: record.relatedPrincipleRelationships || [],
    relatedCharacterInteractions: record.relatedCharacterInteractions || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedTeachingSemantics: record.relatedTeachingSemantics || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from analyzed session metadata and current source-grounded semantic layers"
  };
}

function createSessionContinuityReview(captures = [], analysisHistory = [], semanticContinuity = [], ontologyRoles = [], principleRelationships = [], characterInteractions = [], originAuthorityPaths = [], teachingSemantics = [], entityRelationRoles = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const currentPage = {
    sourceCaptureBook: context.book || "",
    sourceCaptureChapter: context.chapter || "",
    sourceTitle: context.sourceTitle || capture.title || "",
    activeUrl: context.sourceUrl || capture.url || ""
  };
  const pageKey = (page = {}) => [page.sourceCaptureBook || page.book || "", page.sourceCaptureChapter || page.chapter || "", page.sourceTitle || "", page.activeUrl || page.url || ""].map((value) => normalizeWhitespace(value || "").toLowerCase()).join("|");
  const pageLabel = (page = {}) => {
    const book = page.sourceCaptureBook || page.book || "";
    const chapter = page.sourceCaptureChapter || page.chapter || "";
    if (book && chapter) return `${book} ${chapter}`;
    return page.sourceTitle || page.title || page.activeUrl || page.url || "Unknown page";
  };
  const pages = [currentPage, ...(analysisHistory || [])]
    .filter((page) => page?.sourceCaptureBook || page?.book || page?.sourceTitle || page?.activeUrl || page?.url)
    .filter((page, index, list) => list.findIndex((candidate) => pageKey(candidate) === pageKey(page)) === index)
    .sort((left, right) => Number(left.sourceCaptureChapter || left.chapter || 0) - Number(right.sourceCaptureChapter || right.chapter || 0));
  const matthewPages = pages.filter((page) => (page.sourceCaptureBook || page.book) === "Matthew" && Number(page.sourceCaptureChapter || page.chapter || 0) > 0);
  if (matthewPages.length < 2) return [];

  const chapters = new Set(matthewPages.map((page) => Number(page.sourceCaptureChapter || page.chapter || 0)).filter(Boolean));
  const hasChapter = (chapter) => chapters.has(chapter);
  const analyzedPages = matthewPages.map(pageLabel);
  const sessionRange = analyzedPages.length ? `${analyzedPages[0]} -> ${analyzedPages[analyzedPages.length - 1]}` : "Current session";
  const ids = (items = [], fallback) => (items || []).map((item) => item.id || item[fallback] || "").filter(Boolean);
  const ontologyIds = ids(ontologyRoles, "semanticItem");
  const principleIds = ids(principleRelationships, "principle");
  const interactionIds = ids(characterInteractions, "interactionType");
  const authorityPathIds = ids(originAuthorityPaths, "pathType");
  const teachingIds = ids(teachingSemantics, "teachingTopic");
  const relationIds = ids(entityRelationRoles, "semanticRole");
  const unique = (values = []) => Array.from(new Set(values.map((value) => normalizeWhitespace(value || "")).filter(Boolean)));
  const sourceText = sourceCaptureText(captures);

  const continuingCharacters = unique([
    hasChapter(1) || hasChapter(2) || hasChapter(3) || hasChapter(5) ? "JESUS" : "",
    hasChapter(1) || hasChapter(2) ? "Joseph" : "",
    hasChapter(1) || hasChapter(2) ? "Mary" : "",
    hasChapter(3) ? "John" : "",
    hasChapter(5) ? "disciples" : "",
    hasChapter(5) ? "People / multitudes" : "",
    ...(characterInteractions || []).flatMap((item) => [item.sourceCharacter, item.targetCharacter])
  ]).slice(0, 12);
  const continuingThemes = unique([
    hasChapter(1) ? "mission revealed" : "",
    hasChapter(2) ? "mission preserved" : "",
    hasChapter(3) ? "mission announced" : "",
    hasChapter(4) ? "mission prepared" : "",
    hasChapter(5) ? "mission taught" : "",
    ...(principleRelationships || []).flatMap((item) => [item.principle, ...(item.relatedPrinciples || [])]),
    ...(semanticContinuity || []).flatMap((item) => item.continuity || [])
  ]).slice(0, 14);
  const continuingAuthorityPaths = unique([
    hasChapter(1) || hasChapter(2) ? "THE LORD -> AngEL Of THE LORD -> Joseph" : "",
    hasChapter(3) ? "HOLY SPIRIT source wording / derived display continuity" : "",
    hasChapter(5) ? "JESUS -> disciples / multitudes" : "",
    ...(originAuthorityPaths || []).map((item) => [item.origin, item.messenger, item.recipient].filter(Boolean).join(" -> "))
  ]).slice(0, 8);
  const teachingProgression = [
    hasChapter(1) ? "Matthew 1: mission revealed" : "",
    hasChapter(2) ? "Matthew 2: mission preserved" : "",
    hasChapter(3) ? "Matthew 3: mission announced" : "",
    hasChapter(4) ? "Matthew 4: mission prepared" : "",
    hasChapter(5) ? "Matthew 5: mission taught" : ""
  ].filter(Boolean);
  const continuingPrincipleFamilies = unique([
    ...(principleRelationships || []).map((item) => item.principle),
    ...(teachingSemantics || []).flatMap((item) => [item.principle, item.teachingTopic, item.blessing, item.commandment]),
    hasChapter(5) ? "righteousness" : "",
    hasChapter(5) ? "kingdom" : "",
    hasChapter(5) ? "mercy" : "",
    hasChapter(1) || hasChapter(2) ? "obedience" : "",
    hasChapter(1) || hasChapter(2) ? "fulfillment" : ""
  ]).slice(0, 12);
  const continuingCharacterInteractions = unique([
    ...(characterInteractions || []).map((item) => `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"}`),
    hasChapter(3) ? "John -> people | preaches / prepares" : "",
    hasChapter(5) ? "JESUS -> disciples | teaches" : "",
    hasChapter(5) ? "JESUS -> People / multitudes | teaches in surrounding audience context" : ""
  ]).slice(0, 10);

  const evidence = unique([
    `Analyzed session pages: ${analyzedPages.join(", ")}`,
    semanticContinuity.length ? `Semantic continuity records available: ${semanticContinuity.length}` : "",
    ontologyRoles.length ? `Ontology role records available: ${ontologyRoles.length}` : "",
    principleRelationships.length ? `Principle relationship records available: ${principleRelationships.length}` : "",
    characterInteractions.length ? `Character interaction records available: ${characterInteractions.length}` : "",
    originAuthorityPaths.length ? `Authority path records available: ${originAuthorityPaths.length}` : "",
    teachingSemantics.length ? `Teaching semantic records available: ${teachingSemantics.length}` : ""
  ]);

  const records = [sessionContinuityReviewRecord({
    sourceCaptureId,
    sourceContext: context,
    scopePath: "session.scope.matthew.current_range",
    sessionRange,
    analyzedPages,
    continuingCharacters,
    continuingThemes,
    continuingAuthorityPaths,
    teachingProgression,
    continuingPrincipleFamilies,
    continuingCharacterInteractions,
    sourcePhrase: sourceText ? "Current source text plus analyzed session metadata" : "Analyzed session metadata",
    derivedMeaning: `The current study session can be reviewed as ${sessionRange}; continuity is summarized from analyzed page history and current source-grounded semantic layers without crawling or whole-book indexing.`,
    evidence,
    relatedSemanticContinuity: ids(semanticContinuity, "continuityType"),
    relatedOntologyRoles: ontologyIds,
    relatedPrincipleRelationships: principleIds,
    relatedCharacterInteractions: interactionIds,
    relatedAuthorityPaths: authorityPathIds,
    relatedTeachingSemantics: teachingIds,
    relatedEntityRelationRoles: relationIds,
    confidence: hasChapter(5) && teachingSemantics.length ? "probable" : "possible",
    sourceGrounding: "Review layer uses analyzed page history plus currently stored continuity, ontology, principle relationship, character interaction, authority path, relationship role, and teaching records. It does not crawl or infer unanalyzed pages."
  })];

  return records;
}
function knowledgeGraphRecord(record = {}) {
  const key = [
    "knowledge-graph",
    record.sourceCaptureId || "",
    record.node || "",
    record.type || "",
    record.chapterScope || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "knowledge.graph.current_scope",
    node: record.node || "",
    type: record.type || "Semantic Node",
    relationships: record.relationships || [],
    relatedNodes: record.relatedNodes || [],
    relatedPrinciples: record.relatedPrinciples || [],
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    chapterScope: record.chapterScope || "Current source",
    sessionScope: record.sessionScope || "Current session",
    evidence: record.evidence || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedRelationshipRoles: record.relatedRelationshipRoles || [],
    relatedCharacterInteractions: record.relatedCharacterInteractions || [],
    relatedPrincipleRelationships: record.relatedPrincipleRelationships || [],
    relatedTeachingSemantics: record.relatedTeachingSemantics || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedContinuity: record.relatedContinuity || [],
    relatedSessionContinuityReview: record.relatedSessionContinuityReview || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from existing source-grounded semantic layers"
  };
}

function createKnowledgeGraph(captures = [], ontologyRoles = [], entityRelationRoles = [], characterInteractions = [], principleRelationships = [], teachingSemantics = [], originAuthorityPaths = [], semanticContinuity = [], sessionContinuityReview = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const chapterScope = context.book && context.chapter ? `${context.book} ${context.chapter}` : context.sourceTitle || capture.title || "Current source";
  const sessionScope = (sessionContinuityReview || [])[0]?.sessionRange || chapterScope;
  const records = [];
  const byNode = new Map();
  const normalizeNode = (value = "") => normalizeWhitespace(value || "");
  const idList = (items = [], fallback) => (items || []).map((item) => item.id || item[fallback] || "").filter(Boolean);
  const ontologyIdsFor = (node) => (ontologyRoles || [])
    .filter((item) => normalizeNode(item.semanticItem || item.entityName || item.name).toLowerCase() === normalizeNode(node).toLowerCase())
    .map((item) => item.id || item.semanticItem)
    .filter(Boolean);
  const addNode = (node, type, update = {}) => {
    const name = normalizeNode(node);
    if (!name) return null;
    const key = `${type}|${name}`.toLowerCase();
    if (!byNode.has(key)) {
      byNode.set(key, {
        node: name,
        type,
        relationships: [],
        relatedNodes: [],
        relatedPrinciples: [],
        sourcePhrase: "",
        derivedMeaning: "",
        evidence: [],
        relatedOntologyRoles: ontologyIdsFor(name),
        relatedRelationshipRoles: [],
        relatedCharacterInteractions: [],
        relatedPrincipleRelationships: [],
        relatedTeachingSemantics: [],
        relatedAuthorityPaths: [],
        relatedContinuity: [],
        relatedSessionContinuityReview: idList(sessionContinuityReview, "reviewType"),
        confidence: "probable",
        sourceGrounding: "derived from existing source-grounded semantic layers"
      });
    }
    const item = byNode.get(key);
    const pushUnique = (field, values) => {
      for (const value of (Array.isArray(values) ? values : [values]).map((entry) => normalizeNode(entry)).filter(Boolean)) {
        if (!item[field].includes(value)) item[field].push(value);
      }
    };
    pushUnique("relationships", update.relationships || []);
    pushUnique("relatedNodes", update.relatedNodes || []);
    pushUnique("relatedPrinciples", update.relatedPrinciples || []);
    pushUnique("evidence", update.evidence || []);
    pushUnique("relatedOntologyRoles", update.relatedOntologyRoles || []);
    pushUnique("relatedRelationshipRoles", update.relatedRelationshipRoles || []);
    pushUnique("relatedCharacterInteractions", update.relatedCharacterInteractions || []);
    pushUnique("relatedPrincipleRelationships", update.relatedPrincipleRelationships || []);
    pushUnique("relatedTeachingSemantics", update.relatedTeachingSemantics || []);
    pushUnique("relatedAuthorityPaths", update.relatedAuthorityPaths || []);
    pushUnique("relatedContinuity", update.relatedContinuity || []);
    pushUnique("relatedSessionContinuityReview", update.relatedSessionContinuityReview || []);
    if (update.sourcePhrase && !item.sourcePhrase) item.sourcePhrase = update.sourcePhrase;
    if (update.derivedMeaning && !item.derivedMeaning) item.derivedMeaning = update.derivedMeaning;
    if (update.confidence === "explicit" || item.confidence !== "explicit") item.confidence = update.confidence || item.confidence;
    if (update.sourceGrounding) item.sourceGrounding = update.sourceGrounding;
    return item;
  };

  for (const interaction of characterInteractions || []) {
    const source = interaction.sourceCharacter || "";
    const target = interaction.targetCharacter || "";
    const interactionType = interaction.interactionType || "interacts with";
    const relation = `${interactionType} -> ${target}`;
    const reverseRelation = `${source} -> ${interactionType}`;
    const graphType = /multitudes|people|disciples|wise men/i.test(source) ? "Group / Character" : /THE LORD|JESUS|HOLY SPIRIT/i.test(source) ? "Authority / Character" : "Character";
    const targetType = /multitudes|people|disciples|wise men/i.test(target) ? "Group / Character" : /THE LORD|JESUS|HOLY SPIRIT|CHILD/i.test(target) ? "Authority / Character" : "Character";
    addNode(source, graphType, {
      relationships: [relation],
      relatedNodes: [target],
      sourcePhrase: interaction.sourcePhrase,
      derivedMeaning: interaction.derivedMeaning,
      evidence: interaction.evidence,
      relatedCharacterInteractions: [interaction.id || interactionType],
      relatedOntologyRoles: interaction.relatedOntologyRoles,
      relatedRelationshipRoles: interaction.relatedRelationshipRoles,
      relatedAuthorityPaths: interaction.relatedAuthorityPaths,
      relatedTeachingSemantics: interaction.relatedTeachingSemantics,
      confidence: interaction.confidence,
      sourceGrounding: interaction.sourceGrounding
    });
    addNode(target, targetType, {
      relationships: [reverseRelation],
      relatedNodes: [source],
      sourcePhrase: interaction.sourcePhrase,
      derivedMeaning: interaction.derivedMeaning,
      evidence: interaction.evidence,
      relatedCharacterInteractions: [interaction.id || interactionType],
      relatedOntologyRoles: interaction.relatedOntologyRoles,
      relatedRelationshipRoles: interaction.relatedRelationshipRoles,
      relatedAuthorityPaths: interaction.relatedAuthorityPaths,
      relatedTeachingSemantics: interaction.relatedTeachingSemantics,
      confidence: interaction.confidence,
      sourceGrounding: interaction.sourceGrounding
    });
  }

  for (const relationship of principleRelationships || []) {
    const principle = relationship.principle || "";
    const related = relationship.relatedPrinciples || [];
    addNode(principle, "Principle", {
      relationships: related.map((item) => `${relationship.relationshipType || "related"} -> ${item}`),
      relatedNodes: related,
      relatedPrinciples: related,
      sourcePhrase: relationship.sourcePhrase,
      derivedMeaning: relationship.derivedMeaning,
      evidence: relationship.evidence,
      relatedPrincipleRelationships: [relationship.id || relationship.principle],
      relatedTeachingSemantics: relationship.relatedTeachingSemantics,
      confidence: relationship.confidence,
      sourceGrounding: relationship.sourceGrounding
    });
    for (const relatedPrinciple of related) {
      addNode(relatedPrinciple, "Principle", {
        relationships: [`related with -> ${principle}`],
        relatedNodes: [principle],
        relatedPrinciples: [principle],
        sourcePhrase: relationship.sourcePhrase,
        evidence: relationship.evidence,
        relatedPrincipleRelationships: [relationship.id || relationship.principle],
        confidence: relationship.confidence,
        sourceGrounding: relationship.sourceGrounding
      });
    }
  }

  for (const teaching of teachingSemantics || []) {
    const topic = teaching.teachingTopic || teaching.blessing || teaching.commandment || teaching.principle || teaching.discourseType || "Teaching / Discourse";
    const relatedPrinciples = [teaching.principle, teaching.blessing, teaching.commandment, teaching.promise, teaching.warning]
      .map((value) => normalizeNode(value))
      .filter(Boolean);
    addNode(topic, "Teaching", {
      relationships: relatedPrinciples.map((item) => `teaches / frames -> ${item}`),
      relatedNodes: [teaching.speaker, teaching.audience, ...relatedPrinciples],
      relatedPrinciples,
      sourcePhrase: teaching.sourcePhrase,
      derivedMeaning: teaching.derivedMeaning,
      evidence: teaching.evidence,
      relatedTeachingSemantics: [teaching.id || topic],
      confidence: teaching.confidence,
      sourceGrounding: teaching.sourceGrounding
    });
    if (teaching.speaker) {
      addNode(teaching.speaker, /JESUS/i.test(teaching.speaker) ? "Authority / Character" : "Character", {
        relationships: [`teaches -> ${teaching.audience || topic}`],
        relatedNodes: [teaching.audience, topic].filter(Boolean),
        relatedPrinciples,
        sourcePhrase: teaching.sourcePhrase,
        evidence: teaching.evidence,
        relatedTeachingSemantics: [teaching.id || topic],
        confidence: teaching.confidence,
        sourceGrounding: teaching.sourceGrounding
      });
    }
  }

  for (const path of originAuthorityPaths || []) {
    const origin = path.origin || path.authoritySource || "";
    const recipient = path.recipient || path.target || path.response || "";
    addNode(origin, "Authority Path", {
      relationships: [`${path.pathType || "authority path"} -> ${recipient || path.messenger || "recipient"}`],
      relatedNodes: [path.messenger, recipient].filter(Boolean),
      sourcePhrase: path.sourcePhrase,
      derivedMeaning: path.derivedMeaning,
      evidence: path.evidence,
      relatedAuthorityPaths: [path.id || path.pathType],
      confidence: path.confidence,
      sourceGrounding: path.sourceGrounding
    });
  }

  for (const continuity of semanticContinuity || []) {
    addNode(continuity.chapterTransition || continuity.continuedEntity, "Continuity", {
      relationships: [`continues -> ${continuity.continuedEntity || "semantic continuity"}`],
      relatedNodes: [continuity.continuedEntity, ...(continuity.authorityContinuity || [])],
      sourcePhrase: continuity.sourcePhrase || continuity.chapterTransition,
      derivedMeaning: continuity.continuedMissionPurpose || continuity.continuityType,
      evidence: continuity.evidence,
      relatedContinuity: [continuity.id || continuity.continuityType],
      relatedOntologyRoles: continuity.relatedOntologyRoles,
      relatedAuthorityPaths: continuity.relatedAuthorityPaths,
      confidence: continuity.confidence,
      sourceGrounding: continuity.sourceGrounding
    });
  }

  for (const review of sessionContinuityReview || []) {
    addNode(review.sessionRange, "Session Scope", {
      relationships: [
        ...(review.continuingCharacters || []).map((item) => `continues character -> ${item}`),
        ...(review.continuingPrincipleFamilies || []).map((item) => `continues principle family -> ${item}`)
      ],
      relatedNodes: [...(review.continuingCharacters || []), ...(review.continuingThemes || [])],
      relatedPrinciples: review.continuingPrincipleFamilies,
      sourcePhrase: review.sourcePhrase,
      derivedMeaning: review.derivedMeaning,
      evidence: review.evidence,
      relatedSessionContinuityReview: [review.id || review.reviewType],
      confidence: review.confidence,
      sourceGrounding: review.sourceGrounding
    });
  }

  for (const role of ontologyRoles || []) {
    addNode(role.semanticItem || role.entityName || role.name, role.ontologyClass || role.classLabel || "Ontology Role", {
      relationships: [role.semanticRole || role.ontologyRole || role.ontologyClass || "classified as ontology role"],
      sourcePhrase: role.sourcePhrase,
      derivedMeaning: role.derivedMeaning,
      evidence: role.evidence,
      relatedOntologyRoles: [role.id || role.semanticItem],
      confidence: role.confidence,
      sourceGrounding: role.sourceGrounding
    });
  }

  for (const item of byNode.values()) {
    if (!item.relationships.length && !item.relatedNodes.length) continue;
    records.push(knowledgeGraphRecord({
      sourceCaptureId,
      sourceContext: context,
      scopePath: `knowledge.graph.${textHash(`${item.type}|${item.node}`)}`,
      chapterScope,
      sessionScope,
      ...item,
      relationships: item.relationships.slice(0, 12),
      relatedNodes: item.relatedNodes.slice(0, 12),
      relatedPrinciples: item.relatedPrinciples.slice(0, 8),
      evidence: item.evidence.slice(0, 8),
      relatedOntologyRoles: item.relatedOntologyRoles.slice(0, 12),
      relatedRelationshipRoles: item.relatedRelationshipRoles.slice(0, 12),
      relatedCharacterInteractions: item.relatedCharacterInteractions.slice(0, 12),
      relatedPrincipleRelationships: item.relatedPrincipleRelationships.slice(0, 12),
      relatedTeachingSemantics: item.relatedTeachingSemantics.slice(0, 12),
      relatedAuthorityPaths: item.relatedAuthorityPaths.slice(0, 12),
      relatedContinuity: item.relatedContinuity.slice(0, 12),
      relatedSessionContinuityReview: item.relatedSessionContinuityReview.slice(0, 12)
    }));
  }

  return records.slice(0, 80);
}
function principleRelationshipRecord(record = {}) {
  const key = [
    "principle-relationship",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.principle || "",
    record.relationshipType || "",
    (Array.isArray(record.relatedPrinciples) ? record.relatedPrinciples : []).join("|")
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    principle: record.principle || "",
    relatedPrinciples: record.relatedPrinciples || [],
    relationshipType: record.relationshipType || "related",
    teachingBlock: record.teachingBlock || "Sermon on the Mount",
    speaker: record.speaker || "JESUS",
    canonicalIdentity: record.canonicalIdentity || "JESUS CHRIST",
    audience: record.audience || "disciples; multitudes",
    sourcePhrase: record.sourcePhrase || "",
    derivedMeaning: record.derivedMeaning || "",
    evidence: record.evidence || [],
    relatedTeachingSemantics: record.relatedTeachingSemantics || [],
    relatedEntities: record.relatedEntities || ["JESUS", "JESUS CHRIST", "disciples", "multitudes"],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded principle and teaching/discourse records"
  };
}

function createPrincipleRelationships(captures = [], teachingSemantics = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewFive = context.book === "Matthew" && String(context.chapter || "") === "5";
  if (!isMatthewFive) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasPhrase = (pattern) => pattern.test(sourceText);
  const teachingIds = (predicate) => (teachingSemantics || [])
    .filter(predicate)
    .map((item) => item.id || item.teachingTopic || item.principle || item.commandment || item.blessing)
    .filter(Boolean);
  const add = (record) => principleRelationshipRecord({
    sourceCaptureId,
    sourceContext: context,
    teachingBlock: "Sermon on the Mount",
    speaker: "JESUS",
    canonicalIdentity: "JESUS CHRIST",
    audience: "disciples; multitudes",
    ...record
  });
  const records = [];

  if (hasPhrase(/Blessed are the merciful|they shall obtain mercy|Blessed are the peacemakers|children of God/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.5.principle.relationship.mercy-peacemaking",
      verseRange: "Matthew 5:7-9",
      principle: "Mercy",
      relatedPrinciples: ["Peacemaking", "forgiveness", "reconciliation"],
      relationshipType: "supports",
      sourcePhrase: "Blessed are the merciful... Blessed are the peacemakers",
      derivedMeaning: "Mercy is related with and supports the nearby peacemaking principle within the Beatitudes teaching block; forgiveness and reconciliation remain derived supporting concepts tied to mercy and peace language.",
      evidence: ["Blessed are the merciful", "they shall obtain mercy", "Blessed are the peacemakers"],
      relatedTeachingSemantics: teachingIds((item) => /merciful|mercy|reconciled|brother/i.test(`${item.blessing || ""} ${item.promise || ""} ${item.application || ""}`)),
      confidence: "probable",
      sourceGrounding: "Matthew 5:7-9 places mercy and peacemaking in the same Beatitudes sequence; reconciliation is also grounded later by Matthew 5:23-24."
    }));
  }

  if (hasPhrase(/be reconciled to thy brother|Blessed are the peacemakers/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.5.principle.relationship.reconciliation-peace",
      verseRange: "Matthew 5:9, 23-24",
      principle: "Reconciliation",
      relatedPrinciples: ["Peace", "peacemaking", "mercy"],
      relationshipType: "supports",
      sourcePhrase: "Blessed are the peacemakers... be reconciled to thy brother",
      derivedMeaning: "The reconciliation application supports the peace/peacemaking principle by grounding peace in a concrete Human response within the same discourse.",
      evidence: ["Blessed are the peacemakers", "be reconciled to thy brother"],
      relatedTeachingSemantics: teachingIds((item) => /reconciled|peacemakers|brother/i.test(`${item.sourcePhrase || ""} ${item.application || ""}`)),
      confidence: "probable",
      sourceGrounding: "Matthew 5:9 states peacemaking as a blessing, and Matthew 5:23-24 gives reconciliation as a direct application."
    }));
  }

  if (hasPhrase(/hunger and thirst after righteousness|except your righteousness shall exceed|not come to destroy, but to fulfil/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.5.principle.relationship.righteousness-fulfillment",
      verseRange: "Matthew 5:6, 17-20",
      principle: "Righteousness",
      relatedPrinciples: ["Law Fulfillment", "kingdom righteousness", "commandment expansion"],
      relationshipType: "expands",
      sourcePhrase: "hunger and thirst after righteousness... not come to destroy, but to fulfil... except your righteousness shall exceed",
      derivedMeaning: "Righteousness expands through the law/fulfillment teaching: the discourse moves from desire for righteousness into fulfillment and exceeding-righteousness instruction.",
      evidence: ["hunger and thirst after righteousness", "not come to destroy, but to fulfil", "except your righteousness shall exceed"],
      relatedTeachingSemantics: teachingIds((item) => /righteousness|fulfil|destroy/i.test(`${item.principle || ""} ${item.contrast || ""} ${item.requirement || ""}`)),
      confidence: "explicit",
      sourceGrounding: "Matthew 5 directly repeats righteousness language in verse 6 and verses 17-20, tying the principle to the law/fulfillment teaching block."
    }));
  }

  if (hasPhrase(/Thou shalt not kill|be reconciled to thy brother|Blessed are the peacemakers/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.5.principle.relationship.commandment-reconciliation",
      verseRange: "Matthew 5:9, 21-24",
      principle: "Commandment expansion",
      relatedPrinciples: ["Reconciliation", "peace", "inward righteousness"],
      relationshipType: "illustrates",
      sourcePhrase: "Thou shalt not kill... But I say unto you... be reconciled to thy brother",
      derivedMeaning: "The commandment expansion illustrates how teaching moves from a command into reconciliation and inward righteousness rather than leaving the command isolated.",
      evidence: ["Thou shalt not kill", "But I say unto you", "be reconciled to thy brother"],
      relatedTeachingSemantics: teachingIds((item) => /kill|reconciled|inward righteousness/i.test(`${item.commandment || ""} ${item.application || ""} ${item.principle || ""}`)),
      confidence: "explicit",
      sourceGrounding: "Matthew 5:21-24 directly states the commandment, interpretive formula, and reconciliation application."
    }));
  }

  if (hasPhrase(/poor in spirit|kingdom of heaven|persecuted for righteousness' sake/i)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.5.principle.relationship.kingdom-beatitudes",
      verseRange: "Matthew 5:3, 10",
      principle: "Kingdom of heaven themes",
      relatedPrinciples: ["poor in spirit", "righteousness under pressure", "Beatitude promise"],
      relationshipType: "reinforces",
      sourcePhrase: "theirs is the kingdom of heaven... persecuted for righteousness' sake: for theirs is the kingdom of heaven",
      derivedMeaning: "The kingdom-of-heaven promise reinforces the Beatitudes frame by appearing at the opening and later righteousness-under-pressure blessing.",
      evidence: ["theirs is the kingdom of heaven", "persecuted for righteousness' sake"],
      relatedTeachingSemantics: teachingIds((item) => /kingdom of heaven|poor in spirit|righteousness/i.test(`${item.sourcePhrase || ""} ${item.promise || ""} ${item.principle || ""}`)),
      confidence: "explicit",
      sourceGrounding: "Matthew 5:3 and Matthew 5:10 repeat the kingdom-of-heaven promise in the Beatitudes sequence."
    }));
  }

  return records;
}
function semanticContinuityRecord(record = {}) {
  const key = [
    "semantic-continuity",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.continuityType || "",
    record.continuedEntity || "",
    record.chapterTransition || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Current scope",
    chapterTransition: record.chapterTransition || "",
    continuityType: record.continuityType || "semantic_continuity",
    continuedEntity: record.continuedEntity || "",
    continuedAuthorityPath: record.continuedAuthorityPath || "",
    continuedRevelationPattern: record.continuedRevelationPattern || "",
    continuedOntologyRole: record.continuedOntologyRole || "",
    continuedMissionPurpose: record.continuedMissionPurpose || "",
    continuity: record.continuity || [],
    authorityContinuity: record.authorityContinuity || [],
    evidence: record.evidence || [],
    relatedEntities: record.relatedEntities || [],
    relatedSemanticEvents: record.relatedSemanticEvents || [],
    relatedRevelationPatterns: record.relatedRevelationPatterns || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    relatedOntologyRoles: record.relatedOntologyRoles || [],
    relatedAuthorityPaths: record.relatedAuthorityPaths || [],
    relatedEntityRelationRoles: record.relatedEntityRelationRoles || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from current semantic layers and source-grounded continuity anchors"
  };
}

function createSemanticContinuity(captures = [], semanticEvents = [], revelationPatterns = [], passageFunctions = [], ontologyRoles = [], originAuthorityPaths = [], entityRelationRoles = [], canonicalIdentities = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  if (!isMatthewTwo) return [];

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const eventIds = (types) => (semanticEvents || []).filter((item) => types.includes(item.eventType || "")).map((item) => item.id || item.semanticEventId).filter(Boolean);
  const patternIds = (predicate) => (revelationPatterns || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const functionKeys = (keys) => (passageFunctions || []).filter((item) => keys.includes(item.passageFunction || "")).map((item) => item.passageFunction || item.id).filter(Boolean);
  const ontologyIds = (items) => (ontologyRoles || []).filter((item) => items.includes(item.semanticItem || "")).map((item) => item.id || item.semanticItem).filter(Boolean);
  const authorityPathIds = (predicate) => (originAuthorityPaths || []).filter(predicate).map((item) => item.id).filter(Boolean);
  const relationRoleIds = (roles) => (entityRelationRoles || []).filter((item) => roles.includes(item.semanticRole || "")).map((item) => item.id || item.semanticRole).filter(Boolean);
  const hasEntity = (name) => (ontologyRoles || []).some((item) => item.semanticItem === name) || (canonicalIdentities || []).some((item) => item.canonicalName === name) || new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(sourceText);
  const add = (record) => semanticContinuityRecord({ sourceCaptureId, sourceContext: context, chapterTransition: "Matthew 1 -> Matthew 2", ...record });
  const records = [];
  const protectiveAuthorityPath = (originAuthorityPaths || []).find((item) => item.origin === "THE LORD" && item.messenger === "AngEL Of THE LORD" && item.recipient === "Joseph");
  const protectivePatternIds = patternIds((item) => item.speaker === "AngEL Of THE LORD" && item.recipient === "Joseph");

  if (hasEntity("Joseph") && protectiveAuthorityPath) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.13",
      verseRange: "Matthew 1:20-25 -> Matthew 2:13-22",
      continuityType: "continued_authority_revelation_relationship",
      continuedEntity: "Joseph",
      continuedAuthorityPath: "THE LORD -> AngEL Of THE LORD -> Joseph",
      continuedRevelationPattern: "dream / divine message continues from NAME revelation to protective warning",
      continuedOntologyRole: "revelation recipient; obedient responder; protective steward",
      continuedMissionPurpose: "JESUS / CHILD is preserved for the mission introduced in Matthew 1.",
      continuity: ["revelation recipient", "obedient responder", "protective steward"],
      authorityContinuity: ["THE LORD", "AngEL Of THE LORD", "Joseph"],
      evidence: ["the angel of the Lord appeareth to Joseph in a dream", "Arise, and take the young child", "he arose, and took the young child and his mother"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS", "Mary"],
      relatedSemanticEvents: eventIds(["protective_instruction_revelation", "protective_obedient_response"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedPassageFunctions: functionKeys(["divine_warning_revelation", "protective_obedient_response", "egypt_escape_preservation"]),
      relatedOntologyRoles: ontologyIds(["Joseph", "AngEL Of THE LORD", "JESUS"]),
      relatedAuthorityPaths: [protectiveAuthorityPath.id].filter(Boolean),
      relatedEntityRelationRoles: relationRoleIds(["source_authority_to_protective_messenger", "protective_revelation_messenger_to_recipient", "protective_obedient_response_to_child"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2 repeats the THE LORD -> AngEL Of THE LORD -> Joseph authority path already established by Matthew 1's naming revelation pattern, now as protective instruction and obedience."
    }));
  }

  if (hasEntity("JESUS") && /young child|child|Out of Egypt have I called my son/i.test(sourceText)) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.11",
      verseRange: "Matthew 1:21-25 -> Matthew 2:11-15",
      continuityType: "continued_child_identity_and_mission_preservation",
      continuedEntity: "JESUS / CHILD",
      continuedAuthorityPath: "THE LORD -> AngEL Of THE LORD -> Joseph -> CHILD / JESUS preservation",
      continuedRevelationPattern: "revealed NAME and mission context continue into CHILD protection",
      continuedOntologyRole: "JESUS remains distinct from JESUS CHRIST while CHILD resolves toward JESUS when grounded",
      continuedMissionPurpose: "The CHILD/JESUS is protected from Herod and moved through fulfillment geography.",
      continuity: ["JESUS identity", "CHILD referent", "mission preservation", "fulfillment movement"],
      authorityContinuity: ["THE LORD", "AngEL Of THE LORD", "Joseph", "JESUS"],
      evidence: ["the young child", "Herod will seek the young child to destroy him", "Out of Egypt have I called my son"],
      relatedEntities: ["JESUS", "JESUS CHRIST", "CHILD", "Joseph", "Herod", "Egypt"],
      relatedSemanticEvents: eventIds(["protective_instruction_revelation", "protective_obedient_response", "messianic_location_fulfillment"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedPassageFunctions: functionKeys(["egypt_escape_preservation", "messianic_location_fulfillment", "hostile_authority_response"]),
      relatedOntologyRoles: ontologyIds(["JESUS", "Egypt", "Herod"]),
      relatedAuthorityPaths: authorityPathIds((item) => /CHILD \/ JESUS|JESUS/i.test(`${item.result || ""} ${item.mission || ""}`)),
      relatedEntityRelationRoles: relationRoleIds(["protective_obedient_response_to_child", "hostile_authority_to_child_target"]),
      confidence: "explicit",
      sourceGrounding: "Current Matthew 2 layers ground young child/child as CHILD/JESUS and connect protection to the mission identity introduced by Matthew 1."
    }));
  }

  if ((passageFunctions || []).some((item) => item.passageFunction === "messianic_location_fulfillment")) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.15",
      verseRange: "Matthew 1:22-23 -> Matthew 2:15, 23",
      continuityType: "continued_prophecy_fulfillment_chain",
      continuedEntity: "scripture narrator / quoted prophet",
      continuedAuthorityPath: "THE LORD as fulfillment source remains distinguished from narrator and prophet witness roles",
      continuedRevelationPattern: "fulfillment narration continues across chapter transition",
      continuedOntologyRole: "prophecy witness / fulfillment reporting role",
      continuedMissionPurpose: "Matthew 2 expands fulfillment from birth/name context into Egypt and Nazareth location fulfillment.",
      continuity: ["prophecy fulfillment", "narrator witness", "location fulfillment", "messianic identity"],
      authorityContinuity: ["THE LORD", "scripture narrator", "quoted prophet"],
      evidence: ["that it might be fulfilled", "Out of Egypt have I called my son", "He shall be called a Nazarene"],
      relatedEntities: ["THE LORD", "scripture narrator", "quoted prophet", "JESUS", "Egypt", "Nazareth"],
      relatedSemanticEvents: eventIds(["messianic_location_fulfillment", "prophecy_fulfillment_identification"]),
      relatedPassageFunctions: functionKeys(["prophecy_fulfillment_identification", "messianic_location_fulfillment"]),
      relatedOntologyRoles: ontologyIds(["Bethlehem", "Egypt", "JESUS"]),
      confidence: "explicit",
      sourceGrounding: "Matthew 2 contains explicit fulfillment formulas that continue the fulfillment narration pattern established in Matthew 1."
    }));
  }

  if ((entityRelationRoles || []).some((item) => item.semanticRole === "hostile_authority_to_child_target")) {
    records.push(add({
      scopePath: "scripture.nt.matthew.2.verse.16",
      verseRange: "Matthew 2:3-8, 13, 16",
      continuityType: "adversarial_escalation_against_mission_preservation",
      continuedEntity: "Herod",
      continuedAuthorityPath: "hostile authority opposes CHILD/JESUS while divine warning preserves Him",
      continuedRevelationPattern: "warning and avoidance respond to hostile intent",
      continuedOntologyRole: "Class i - Adversarial / Oppositional where source evidence supports it",
      continuedMissionPurpose: "Herod's hostility escalates the need for protective preservation of JESUS.",
      continuity: ["hostile intent", "adversarial escalation", "child-targeting hostility", "protective warning response"],
      authorityContinuity: ["Herod", "THE LORD", "AngEL Of THE LORD", "Joseph"],
      evidence: ["Herod ... was troubled", "Herod will seek the young child to destroy him", "destroy him"],
      relatedEntities: ["Herod", "JESUS", "Joseph", "AngEL Of THE LORD"],
      relatedSemanticEvents: eventIds(["hostile_authority_response", "protective_instruction_revelation"]),
      relatedRevelationPatterns: protectivePatternIds,
      relatedPassageFunctions: functionKeys(["hostile_authority_response", "divine_warning_revelation", "egypt_escape_preservation"]),
      relatedOntologyRoles: ontologyIds(["Herod", "JESUS", "Joseph"]),
      relatedEntityRelationRoles: relationRoleIds(["hostile_authority_to_child_target", "protective_revelation_messenger_to_recipient"]),
      confidence: /destroy him/i.test(sourceText) ? "explicit" : "probable",
      sourceGrounding: "Continuity is limited to Matthew 2 evidence for Herod: troubled response, destroy-him wording, and protective warning response."
    }));
  }

  return records;
}
function semanticAmbiguityRecord(record = {}) {
  const key = [
    "semantic-ambiguity",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.ambiguityType || "",
    (record.semanticItems || []).join("|")
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Matthew 1",
    semanticItems: record.semanticItems || [],
    ambiguityType: record.ambiguityType || "semantic_contrast",
    sourceWording: record.sourceWording || "",
    derivedInterpretation: record.derivedInterpretation || "",
    resolutionStatus: record.resolutionStatus || "resolved",
    confidence: record.confidence || "probable",
    evidence: record.evidence || [],
    relatedLayers: record.relatedLayers || [],
    sourceGrounding: record.sourceGrounding || "derived from current source-grounded semantic records"
  };
}

function createSemanticAmbiguities(captures = [], semanticDistinctions = [], ontologyRoles = [], revelationPatterns = [], originAuthorityPaths = []) {
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";
  const sourceText = sourceCaptureText(captures);
  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const add = (record) => semanticAmbiguityRecord({ sourceCaptureId, sourceContext: context, ...record });

  if (isMatthewTwo) {
    return [
      add({
        scopePath: "scripture.nt.matthew.2.verse.8",
        verseRange: "Matthew 2:7-8, 13, 16",
        semanticItems: ["Herod", "Wise men", "JESUS / CHILD"],
        ambiguityType: "deceptive_worship_language_vs_hostile_intent",
        sourceWording: "that I may come and worship him also; Herod will seek the young child to destroy him; destroy him",
        derivedInterpretation: "Resolved contrast: Herod uses worship language while the broader Matthew 2 evidence grounds hostile/deceptive intent toward CHILD/JESUS.",
        resolutionStatus: "resolved",
        confidence: /\bdestroy him\b/i.test(sourceText) ? "explicit" : "probable",
        evidence: ["that I may come and worship him also", "Herod will seek the young child to destroy him", "destroy him"],
        relatedLayers: ["ICE_PASSAGE_FUNCTIONS", "ICE_ONTOLOGY_ROLES", "ICE_ENTITY_RELATION_ROLES", "ICE_SEMANTIC_CONTINUITY"],
        sourceGrounding: "Class i handling is grounded in Matthew 2 deceptive speech plus explicit destroy-him wording, not in a generic negative-actor rule."
      }),
      add({
        scopePath: "scripture.nt.matthew.2.verse.13",
        verseRange: "Matthew 2:12-23",
        semanticItems: ["protective obedience", "hostile deception", "Divine preservation"],
        ambiguityType: "protective_obedience_vs_hostile_deception",
        sourceWording: "warned of God in a dream; Arise, and take the young child; he arose, and took the young child; privily called; destroy him",
        derivedInterpretation: "Resolved contrast: dream warnings and Joseph obedience form a Divine preservation path that answers Herod hostile misuse of authority.",
        resolutionStatus: "resolved",
        confidence: "explicit",
        evidence: ["warned of God in a dream", "Arise, and take the young child", "he arose, and took the young child", "destroy him"],
        relatedLayers: ["ICE_REVELATION_PATTERNS", "ICE_ORIGIN_AUTHORITY_PATHS", "ICE_ENTITY_RELATION_ROLES", "ICE_SEMANTIC_CONTINUITY"],
        sourceGrounding: "Matthew 2 repeats warning, avoidance, and obedient movement language in contrast to Herod hostile intent."
      })
    ];
  }

  if (!isMatthewOne) return [];

  const commonLayers = ["ICE_SEMANTIC_DISTINCTIONS", "ICE_ONTOLOGY_ROLES", "ICE_REVELATION_PATTERNS", "ICE_ORIGIN_AUTHORITY_PATHS"];

  return [
    add({
      scopePath: "scripture.nt.matthew.1.verse.21",
      verseRange: "Matthew 1:1, 21, 25",
      semanticItems: ["JESUS", "JESUS CHRIST"],
      ambiguityType: "narrative_name_vs_canonical_identity",
      sourceWording: "thou shalt call his name JESUS; called his name JESUS; The book of the generation of JESUS CHRIST",
      derivedInterpretation: "Resolved contrast: JESUS is the narrative revealed NAME; JESUS CHRIST is the canonical/source identity phrase.",
      resolutionStatus: "resolved",
      confidence: "explicit",
      evidence: ["thou shalt call his name JESUS", "called his name JESUS", "The book of the generation of JESUS CHRIST"],
      relatedLayers: commonLayers,
      sourceGrounding: "Semantic distinctions and ontology roles preserve JESUS as NAME while keeping JESUS CHRIST as canonical/source identity linkage."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.1",
      verseRange: "Matthew 1:1, 21, 25",
      semanticItems: ["CHRIST", "JESUS"],
      ambiguityType: "title_office_not_revealed_name",
      sourceWording: "JESUS CHRIST; thou shalt call his name JESUS",
      derivedInterpretation: "Resolved contrast: CHRIST is title/source identity and messianic office, not the NAME Joseph is instructed to give.",
      resolutionStatus: "resolved",
      confidence: "explicit",
      evidence: ["JESUS CHRIST", "thou shalt call his name JESUS"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_ONTOLOGY_ROLES", "ICE_CANONICAL_IDENTITIES"],
      sourceGrounding: "Matthew 1:1 supplies CHRIST within the source identity phrase; Matthew 1:21 and 1:25 preserve JESUS as the given NAME."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20",
      semanticItems: ["Holy Ghost", "HOLY SPIRIT"],
      ambiguityType: "source_wording_vs_derived_display_preference",
      sourceWording: "that which is conceived in her is of the Holy Ghost",
      derivedInterpretation: "Resolved contrast: preserve Holy Ghost in quoted source wording; prefer HOLY SPIRIT in derived semantic display.",
      resolutionStatus: "resolved",
      confidence: "explicit",
      evidence: ["that which is conceived in her is of the Holy Ghost"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_ONTOLOGY_ROLES", "ICE_REVELATION_PATTERNS"],
      sourceGrounding: "Source phrase uses Holy Ghost; derived semantic records intentionally display HOLY SPIRIT for modern semantic clarity."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      semanticItems: ["scripture narrator", "divine speech", "THE LORD"],
      ambiguityType: "human_narration_vs_divine_authority_source",
      sourceWording: "Now all this was done, that it might be fulfilled which was spoken of THE LORD by the prophet",
      derivedInterpretation: "Resolved contrast: scripture narrator remains Class III - Human while THE LORD remains the Divine authority source behind fulfillment.",
      resolutionStatus: "resolved",
      confidence: "probable",
      evidence: ["Now all this was done", "spoken of THE LORD by the prophet"],
      relatedLayers: commonLayers,
      sourceGrounding: "Ontology roles classify narrator and prophet as Human roles while origin authority paths preserve THE LORD as source authority."
    }),
    add({
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-21",
      semanticItems: ["he", "him", "his", "Joseph", "Mary", "JESUS"],
      ambiguityType: "pronoun_referent_requires_semantic_context",
      sourceWording: "appeared unto him; call his name JESUS; he shall save his people from their sins",
      derivedInterpretation: "Context required: pronouns near multiple actors must be resolved by semantic role and source context, not proximity alone.",
      resolutionStatus: "context_required",
      confidence: "possible",
      evidence: ["appeared unto him", "call his name JESUS", "he shall save his people from their sins"],
      relatedLayers: ["ICE_SEMANTIC_DISTINCTIONS", "ICE_ONTOLOGY_ROLES", "ICE_RELATIONSHIP_GRAPH", "ICE_REVELATION_PATTERNS"],
      sourceGrounding: "Prior display compliance work showed him/thee/thy/her can refer to Joseph or Mary while HE/HIS in mission context refers to JESUS."
    })
  ];
}
function originAuthorityPathRecord(record = {}) {
  const key = [
    "origin-authority-path",
    record.sourceCaptureId || "",
    record.scopePath || "",
    record.origin || "",
    record.messenger || "",
    record.recipient || "",
    record.result || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: record.sourceCaptureId || "",
    sourceContext: record.sourceContext || {},
    scopePath: record.scopePath || "",
    verseRange: record.verseRange || "Matthew 1",
    pathType: record.pathType || "origin_authority_path",
    origin: record.origin || "",
    messenger: record.messenger || "",
    means: record.means || "",
    recipient: record.recipient || "",
    response: record.response || "",
    result: record.result || "",
    mission: record.mission || "",
    processPath: record.processPath || [],
    authorityClass: record.authorityClass || "",
    recipientClass: record.recipientClass || "",
    relatedEntities: record.relatedEntities || [],
    relatedSemanticEvents: record.relatedSemanticEvents || [],
    relatedRevelationPatterns: record.relatedRevelationPatterns || [],
    relatedPassageFunctions: record.relatedPassageFunctions || [],
    evidence: record.evidence || [],
    confidence: record.confidence || "probable",
    sourceGrounding: record.sourceGrounding || "derived from existing source-grounded semantic authority, messenger, response, and result records"
  };
}

function createOriginAuthorityPaths(semanticEvents = [], revelationPatterns = [], passageFunctions = [], semanticFlowChains = [], relationshipGraph = [], canonicalIdentities = []) {
  const protectivePattern = (revelationPatterns || []).find((item) =>
    item.authoritySource === "THE LORD" &&
    item.speaker === "AngEL Of THE LORD" &&
    item.recipient === "Joseph" &&
    Array.isArray(item.subEvents) &&
    item.subEvents.some((subEvent) => ["protection_instruction", "protective_obedient_response"].includes(subEvent.clusterType || subEvent.eventType || ""))
  );
  if (protectivePattern) {
    const responseEvent = (semanticEvents || []).find((item) =>
      item.eventType === "protective_obedient_response" || /took the young child|departed into Egypt|dwelt in a city called Nazareth/i.test(`${item.anchorText || ""} ${item.sourceSnippet || ""} ${item.normalizedMeaning || ""}`)
    );
    const relatedFunctions = (passageFunctions || [])
      .filter((item) => ["divine_warning_revelation", "protective_obedient_response", "egypt_escape_preservation", "messianic_location_fulfillment"].includes(item.passageFunction || ""))
      .map((item) => item.passageFunction || item.id)
      .filter(Boolean);
    const relatedEvents = [
      protectivePattern.id,
      ...(protectivePattern.subEvents || []).map((item) => item.semanticEventId || item.id || item.eventType || item.clusterType),
      responseEvent?.id || responseEvent?.semanticEventId
    ].filter(Boolean);
    const evidence = Array.from(new Set([
      ...(protectivePattern.evidence || []),
      responseEvent?.anchorText || responseEvent?.sourceSnippet || ""
    ].filter(Boolean)));

    return [originAuthorityPathRecord({
      sourceCaptureId: protectivePattern.sourceCaptureId || "",
      sourceContext: protectivePattern.sourceContext || {},
      scopePath: protectivePattern.scopePath || "scripture.nt.matthew.2.verse.13",
      verseRange: "Matthew 2:13-22",
      pathType: "protective_warning_to_obedient_response",
      origin: "THE LORD",
      messenger: "AngEL Of THE LORD",
      means: "dream / divine warning / protective instruction",
      recipient: "Joseph",
      response: "Joseph obeys protective instruction",
      result: "CHILD / JESUS is preserved and moved according to warning",
      mission: "Protect CHILD/JESUS from Herod and preserve fulfillment movement",
      processPath: [
        "Authoritative ACTOR / Origin: THE LORD (Class I / Divine preservation)",
        "Messenger / Transfer: AngEL Of THE LORD carries protective warning",
        "Human Recipient / Response: Joseph obeys and moves the CHILD and Mary",
        "Adversarial Contrast: Herod misuse of authority and destroy-him intent is avoided",
        "Result / Fulfillment: CHILD / JESUS is preserved through Egypt and Nazareth movement"
      ],
      authorityClass: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD",
      recipientClass: "Joseph: Class III - Human",
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "JESUS", "Herod", "Egypt", "Nazareth"],
      relatedSemanticEvents: Array.from(new Set(relatedEvents)),
      relatedRevelationPatterns: [protectivePattern.id].filter(Boolean),
      relatedPassageFunctions: relatedFunctions,
      evidence,
      confidence: "explicit",
      sourceGrounding: "derived from Matthew 2 dream warning / AngEL Of THE LORD instruction, Joseph protective response, and location fulfillment passage functions"
    })];
  }
  const divinePattern = (revelationPatterns || []).find((item) =>
    item.authoritySource === "THE LORD" &&
    item.speaker === "AngEL Of THE LORD" &&
    item.recipient === "Joseph" &&
    Array.isArray(item.subEvents) &&
    item.subEvents.some((subEvent) => subEvent.clusterType === "revealed_name_instruction") &&
    item.subEvents.some((subEvent) => subEvent.clusterType === "mission_declaration")
  );
  if (!divinePattern) return [];

  const namingEvent = (semanticEvents || []).find((item) =>
    (item.eventType === "naming_event" || item.eventType === "name_revelation") && /JESUS/i.test(`${item.target || ""} ${item.anchorText || ""} ${item.sourceSnippet || ""}`)
  );
  const responseEvent = (semanticEvents || []).find((item) =>
    item.eventType === "covenant_family_union" || /did as the angel|took unto him his wife/i.test(`${item.anchorText || ""} ${item.sourceSnippet || ""} ${item.normalizedMeaning || ""}`)
  );
  const missionEvent = (semanticEvents || []).find((item) =>
    item.eventType === "mission_reason_declaration" || /save.*people.*sins/i.test(`${item.anchorText || ""} ${item.sourceSnippet || ""} ${item.normalizedMeaning || ""}`)
  );
  const relevantFunctions = (passageFunctions || [])
    .filter((item) => ["divine_message_instruction", "obedient_response_and_naming"].includes(item.passageFunction))
    .map((item) => item.passageFunction || item.id)
    .filter(Boolean);
  const relatedEvents = [
    divinePattern.semanticEventId,
    ...(divinePattern.subEvents || []).map((item) => item.semanticEventId || item.id || item.eventType || item.clusterType),
    responseEvent?.semanticEventId,
    namingEvent?.semanticEventId,
    missionEvent?.semanticEventId
  ].filter(Boolean);
  const evidence = Array.from(new Set([
    ...(divinePattern.evidence || []),
    responseEvent?.anchorText || responseEvent?.sourceSnippet || "",
    namingEvent?.anchorText || namingEvent?.sourceSnippet || "",
    missionEvent?.anchorText || missionEvent?.sourceSnippet || ""
  ].filter(Boolean)));

  return [originAuthorityPathRecord({
    sourceCaptureId: divinePattern.sourceCaptureId || "",
    sourceContext: divinePattern.sourceContext || {},
    scopePath: divinePattern.scopePath || "scripture.nt.matthew.1.verse.20",
    verseRange: "Matthew 1:20-25",
    pathType: "divine_message_to_obedient_response",
    origin: "THE LORD",
    messenger: "AngEL Of THE LORD",
    means: "dream / divine message",
    recipient: "Joseph",
    response: "Joseph obeys",
    result: "JESUS is named",
    mission: "HE shall SAVE HIS People from their sins",
    processPath: [
      "Authoritative ACTOR / Origin: THE LORD (Class I / HOLY Origin)",
      "Actor / Messenger: AngEL Of THE LORD (Class II messenger / transfer)",
      "Transfer / Action: Divine/HOLY instruction, revelation, NAME revelation, HOLY CONCEPTION witness",
      "Recipient / Target: Joseph receives Instruction and protects the CHILD",
      "Result / Fulfillment: Joseph obeys; JESUS is named; mission declaration is preserved"
    ],
    authorityClass: "Class I - GOD / Divine Authority -> Class II - AngEL / Messenger of GOD",
    recipientClass: "Joseph: Class III - Human",
    relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "HOLY SPIRIT", "JESUS", "JESUS CHRIST"],
    relatedSemanticEvents: Array.from(new Set(relatedEvents)),
    relatedRevelationPatterns: [divinePattern.id].filter(Boolean),
    relatedPassageFunctions: relevantFunctions,
    evidence,
    confidence: "explicit",
    sourceGrounding: "derived from existing divine message revelation pattern, Joseph obedience/naming semantic events, passage functions, relationship graph, and source-grounded mission declaration"
  })];
}
function createRevelationPatterns(semanticEvents = [], passageFunctions = []) {
  const patterns = [];
  const clusters = semanticEvents.filter((item) =>
    item.eventType === "divine_message_cluster" && Array.isArray(item.subEvents) && item.subEvents.length > 0
  );

  for (const cluster of clusters) {
    const orderedSubEvents = [...(cluster.subEvents || [])];
    const authoritySource = cluster.authorityChain?.[0] || "THE LORD";
    const speaker = revelationPatternDisplayName(cluster.actor || "");
    const recipient = cluster.recipient || "";
    const evidence = orderedSubEvents
      .map((item) => item.anchorText || item.sourceSnippet || "")
      .filter(Boolean);
    const relatedEntities = Array.from(new Set([
      authoritySource,
      speaker,
      recipient,
      ...(cluster.participants || []),
      ...orderedSubEvents.map((item) => item.target || "")
    ].map(revelationPatternDisplayName).filter(Boolean)));
    const relatedPassageFunctions = (passageFunctions || [])
      .filter((item) => item.passageFunction === "divine_message_instruction" || item.scopePath === cluster.scopePath)
      .map((item) => item.passageFunction || item.id)
      .filter(Boolean);
    const patternKey = [
      "revelation-pattern",
      cluster.sourceCaptureId || "",
      speaker,
      recipient,
      orderedSubEvents.map((item) => `${item.clusterType || item.eventType}:${item.semanticEventId || item.anchorText || ""}`).join("|")
    ].join("|");

    patterns.push({
      id: `${Date.now()}-${textHash(patternKey)}`,
      sourceCaptureId: cluster.sourceCaptureId || "",
      sourceContext: cluster.sourceContext || {},
      scopePath: cluster.scopePath || "",
      verseRange: revelationPatternVerseRange(cluster),
      speaker,
      authoritySource,
      recipient,
      revelationType: "divine_message_revelation_pattern",
      subEvents: orderedSubEvents,
      relatedEntities,
      relatedPassageFunctions,
      evidence,
      confidence: cluster.confidence || "probable",
      sourceGrounding: "derived from source-grounded divine message cluster and its ordered semantic sub-events"
    });
  }

  return patterns;
}
function createPassageFunctions(captures, semanticEvents, relationshipGraph, prophecyLinks, canonicalIdentities) {
  const passageFunctions = [];
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  const isMatthewTwo = context.book === "Matthew" && String(context.chapter || "") === "2";

  const sourceCaptureId = capture.id || context.sourceCaptureId || "";
  const hasCanonicalJesus = (canonicalIdentities || []).some((item) =>
    normalizeWhitespace(item.canonicalName || "").toLowerCase() === "jesus christ"
  );
  const hasDavidAbrahamEvidence = /son of David/i.test(sourceText) && /son of Abraham/i.test(sourceText);
  const hasInstruction = (semanticEvents || []).some((item) => item.eventType === "instruction_concerning_person") &&
    (relationshipGraph || []).some((edge) => /Angel of THE LORD/i.test(edge.fromEntity || "") && /Joseph/i.test(edge.toEntity || ""));
  const hasFulfillment = (semanticEvents || []).some((item) => item.eventType === "passive_fulfillment_narration") ||
    (prophecyLinks || []).some((item) => /fulfill/i.test(`${item.fulfillmentText || ""} ${item.contextSnippet || ""}`));
  const hasResponseNaming = (semanticEvents || []).some((item) => item.eventType === "covenant_family_union") &&
    (semanticEvents || []).some((item) => item.eventType === "naming_event" || /called his name JESUS/i.test(`${item.anchorText || ""} ${item.sourceSnippet || ""}`));

  if (hasCanonicalJesus && hasDavidAbrahamEvidence) {
    passageFunctions.push(passageFunctionRecord({
      sourceCaptureId,
      scopePath: "scripture.nt.matthew.1.verse.1-17",
      verseRange: "Matthew 1:1-17",
      passageFunction: "genealogy_establishes_identity",
      plainMeaning: "JESUS CHRIST is presented in the lineage of David and Abraham.",
      fulfillmentMeaning: "The genealogy establishes identity and covenant lineage before the fulfillment narrative.",
      evidence: ["The book of the generation of Jesus Christ", "son of David", "son of Abraham"],
      linkedThemes: ["Davidic kingship", "Abrahamic covenant", "covenant lineage", "prophetic fulfillment"],
      relatedEntities: ["JESUS CHRIST", "David", "Abraham"],
      relatedProphecies: [],
      confidence: "probable",
      sourceGrounding: "explicit source phrases plus canonical identity record"
    }));
  }

  if (hasInstruction) {
    passageFunctions.push(passageFunctionRecord({
      sourceCaptureId,
      scopePath: "scripture.nt.matthew.1.verse.20",
      verseRange: "Matthew 1:20-21",
      passageFunction: "divine_message_instruction",
      plainMeaning: "THE LORD sends AngEL Of THE LORD to give Divine/HOLY instruction to Joseph, reveal the CHILD is Conceived Of THE HOLY SPIRIT, and reveal the NAME JESUS.",
      fulfillmentMeaning: "The name JESUS is revealed with mission meaning: He shall save His people from their sins.",
      evidence: ["the angel of THE LORD appeared unto him", "fear not to take unto thee Mary thy wife", "that which is conceived in her is of the Holy Ghost", "thou shalt call his name JESUS", "he shall save his people from their sins"],
      linkedThemes: ["divine instruction", "marriage instruction", "conception revelation", "name revelation", "mission meaning", "obedience"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "HOLY SPIRIT", "JESUS", "JESUS CHRIST"],
      relatedProphecies: [],
      confidence: "explicit",
      sourceGrounding: "semantic events distinguish Mary marriage instruction, conception revelation, JESUS name revelation, and mission reason while canonical identity links JESUS to JESUS CHRIST"
    }));
  }

  if (hasFulfillment) {
    passageFunctions.push(passageFunctionRecord({
      sourceCaptureId,
      scopePath: "scripture.nt.matthew.1.verse.22",
      verseRange: "Matthew 1:22-23",
      passageFunction: "prophecy_fulfillment_identification",
      plainMeaning: "The narrator identifies the event as fulfilling what was spoken of THE LORD by the prophet.",
      fulfillmentMeaning: "The passage connects the birth narrative to prophecy fulfillment.",
      evidence: ["that it might be fulfilled", "spoken of the Lord by the prophet"],
      linkedThemes: ["prophecy fulfillment", "narrator witness", "divine speech", "Emmanuel"],
      relatedEntities: ["scripture narrator", "THE LORD", "prophet", "JESUS CHRIST"],
      relatedProphecies: (prophecyLinks || []).map((item) => item.id).filter(Boolean),
      confidence: "explicit",
      sourceGrounding: "fulfillment semantic event or prophecy link evidence"
    }));
  }

  if (hasResponseNaming) {
    passageFunctions.push(passageFunctionRecord({
      sourceCaptureId,
      scopePath: "scripture.nt.matthew.1.verse.24",
      verseRange: "Matthew 1:24-25",
      passageFunction: "obedient_response_and_naming",
      plainMeaning: "Joseph obeys divine instruction, takes Mary as wife, and names the child JESUS.",
      fulfillmentMeaning: "The response completes the instruction and applies the revealed mission name.",
      evidence: ["did as the angel of THE LORD had bidden him", "took unto him his wife", "called his name JESUS"],
      linkedThemes: ["obedience", "covenant response", "mission naming", "family stewardship"],
      relatedEntities: ["Joseph", "Mary", "JESUS", "JESUS CHRIST"],
      relatedProphecies: [],
      confidence: "explicit",
      sourceGrounding: "semantic events preserve narrative naming surface form JESUS while canonical identity links JESUS to JESUS CHRIST"
    }));
  }


  if (isMatthewTwo) {
    const addMatthewTwoFunction = (pattern, record) => {
      if (!pattern.test(sourceText)) return;
      passageFunctions.push(passageFunctionRecord({ sourceCaptureId, ...record }));
    };

    addMatthewTwoFunction(/\bwise men from the east\b|\bWhere is he that is born King of the Jews\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.1",
      verseRange: "Matthew 2:1-2",
      passageFunction: "wise_men_arrival",
      plainMeaning: "Wise men arrive and seek the CHILD/JESUS as the one born King of the Jews.",
      fulfillmentMeaning: "The narrative introduces Gentile witness and worship language around JESUS.",
      evidence: ["wise men from the east", "Where is he that is born King of the Jews", "come to worship him"],
      linkedThemes: ["witness", "worship", "messianic identity"],
      relatedEntities: ["Wise men", "JESUS", "Jerusalem"],
      confidence: "explicit",
      sourceGrounding: "Matthew 2:1-2 explicitly introduces wise men seeking and worshipping the child identified through royal language."
    });
    addMatthewTwoFunction(/\bfor thus it is written\b|\bBethlehem of Judaea\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.5",
      verseRange: "Matthew 2:5-6",
      passageFunction: "prophecy_fulfillment_identification",
      plainMeaning: "The chief priests and scribes identify Bethlehem from written prophecy.",
      fulfillmentMeaning: "The passage connects JESUS to location fulfillment and prophetic rule language.",
      evidence: ["for thus it is written by the prophet", "Bethlehem", "that shall rule my people Israel"],
      linkedThemes: ["prophecy fulfillment", "Bethlehem", "messianic rule"],
      relatedEntities: ["Chief priests and scribes", "Bethlehem", "JESUS", "quoted prophet"],
      relatedProphecies: (prophecyLinks || []).map((item) => item.id).filter(Boolean),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:5-6 grounds the location identification in written prophecy."
    });
    addMatthewTwoFunction(/\bHerod\b.*\btroubled\b|\bHerod\b.*\bdestroy him\b|\bprivily called the wise men\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.3",
      verseRange: "Matthew 2:3-8, 16",
      passageFunction: "hostile_authority_response",
      plainMeaning: "Herod responds to the report about JESUS as a hostile authority.",
      fulfillmentMeaning: "The passage distinguishes Herod's threatened authority and later hostile intent from the worship response of the wise men.",
      evidence: ["Herod ... was troubled", "privily called the wise men", "destroy him"],
      linkedThemes: ["hostile authority", "adversarial intent", "child-targeting hostility"],
      relatedEntities: ["Herod", "Wise men", "JESUS"],
      confidence: /\bdestroy him\b/i.test(sourceText) ? "explicit" : "probable",
      sourceGrounding: "Herod's troubled response, secret inquiry, and destroy-him wording ground the adversarial reading without assigning it where the source does not support it."
    });
    addMatthewTwoFunction(/\bwarned of God in a dream\b|\bangel of the Lord appeareth.*dream\b|\bArise,? and take the young child\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.12",
      verseRange: "Matthew 2:12-13, 19-22",
      passageFunction: "divine_warning_revelation",
      plainMeaning: "Dream warnings and angelic instruction redirect people away from Herod and toward protection of the CHILD/JESUS.",
      fulfillmentMeaning: "THE LORD's warning and instruction preserve JESUS and guide Joseph's obedient response.",
      evidence: ["warned of God in a dream", "the angel of the Lord appeareth to Joseph in a dream", "Arise, and take the young child"],
      linkedThemes: ["dream warning", "divine instruction", "protection", "adversarial avoidance"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Wise men", "JESUS"],
      confidence: "explicit",
      sourceGrounding: "Matthew 2 repeatedly grounds direction in dream warnings and AngEL Of THE LORD instruction."
    });
    addMatthewTwoFunction(/\bhe arose\b.*\btook the young child\b|\bdeparted into Egypt\b|\bturned aside\b|\bdwelt in a city called Nazareth\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.14",
      verseRange: "Matthew 2:14-15, 21-23",
      passageFunction: "protective_obedient_response",
      plainMeaning: "Joseph obeys protective instruction and moves the CHILD/JESUS and Mary as directed.",
      fulfillmentMeaning: "Joseph's obedience participates in preservation and location fulfillment without becoming the origin authority.",
      evidence: ["he arose", "took the young child and his mother", "departed into Egypt", "dwelt in a city called Nazareth"],
      linkedThemes: ["obedience", "protection", "family movement"],
      relatedEntities: ["Joseph", "Mary", "JESUS", "Egypt", "Nazareth"],
      confidence: "explicit",
      sourceGrounding: "Matthew 2 grounds Joseph's role through repeated response verbs after divine instruction."
    });

    addMatthewTwoFunction(/\bwarned of God in a dream\b|\bshould not return to Herod\b|\bbeing warned of God\b|\bnotwithstanding, being warned of God in a dream\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.12",
      verseRange: "Matthew 2:12-22",
      passageFunction: "repeated_guidance_preservation_cycle",
      plainMeaning: "Matthew 2 repeats dream warnings, redirection, avoidance, and movement commands as preservation guidance cycles.",
      fulfillmentMeaning: "Divine guidance escalates as Herod hostility escalates, preserving CHILD/JESUS through redirected travel.",
      evidence: ["warned of God in a dream", "departed into their own country another way", "Arise, and take the young child", "being warned of God in a dream"],
      linkedThemes: ["revelation escalation", "dream warning", "redirected travel", "avoidance instruction", "Divine preservation"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Wise men", "Joseph", "JESUS", "Herod"],
      confidence: "explicit",
      sourceGrounding: "Matthew 2 contains repeated warning and movement instructions rather than one isolated revelation event."
    });
    addMatthewTwoFunction(/\bBethlehem\b|\bJerusalem\b|\bEgypt\b|\bNazareth\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.1",
      verseRange: "Matthew 2:1-23",
      passageFunction: "movement_location_prophecy_continuity",
      plainMeaning: "Matthew 2 moves through Jerusalem, Bethlehem, Egypt, and Nazareth while preserving CHILD/JESUS and tracking fulfillment.",
      fulfillmentMeaning: "The locations form a continuity path for inquiry, prophecy identification, protective refuge, and settlement fulfillment.",
      evidence: ["to Jerusalem", "Bethlehem of Judaea", "flee into Egypt", "dwelt in a city called Nazareth"],
      linkedThemes: ["semantic movement", "location continuity", "prophecy fulfillment", "Divine preservation paths"],
      relatedEntities: ["Jerusalem", "Bethlehem", "Egypt", "Nazareth", "JESUS", "Joseph", "Mary"],
      confidence: "explicit",
      sourceGrounding: "Matthew 2 explicitly names each movement/location anchor inside the active chapter."
    });
    addMatthewTwoFunction(/\bprivily called the wise men\b|\bthat I may come and worship him also\b|\bdestroy him\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.8",
      verseRange: "Matthew 2:7-8, 13, 16",
      passageFunction: "hostile_deception_vs_protective_obedience_contrast",
      plainMeaning: "Herod secret inquiry and worship language contrast with divine warning and Joseph protective obedience.",
      fulfillmentMeaning: "The narrative distinguishes deceptive authority from preservation-guided obedience without treating every negative actor as Class i.",
      evidence: ["privily called the wise men", "that I may come and worship him also", "destroy him", "he arose, and took the young child"],
      linkedThemes: ["deceptive authority", "hostile misuse of power", "protective obedience", "adversarial/protective contrast"],
      relatedEntities: ["Herod", "Wise men", "Joseph", "JESUS", "AngEL Of THE LORD"],
      confidence: /\bdestroy him\b/i.test(sourceText) ? "explicit" : "probable",
      sourceGrounding: "The contrast is grounded in Herod secret/deceptive wording plus explicit destroy-him intent and Joseph source-grounded protective response."
    });
    addMatthewTwoFunction(/\bflee into Egypt\b|\bOut of Egypt have I called my son\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.13",
      verseRange: "Matthew 2:13-15",
      passageFunction: "egypt_escape_preservation",
      plainMeaning: "Joseph takes the CHILD/JESUS and Mary into Egypt to preserve the child from Herod.",
      fulfillmentMeaning: "The Egypt movement is both protective escape and fulfillment framing.",
      evidence: ["flee into Egypt", "Herod will seek the young child to destroy him", "Out of Egypt have I called my son"],
      linkedThemes: ["preservation", "escape", "Egypt fulfillment"],
      relatedEntities: ["Joseph", "Mary", "JESUS", "Egypt", "Herod"],
      confidence: "explicit",
      sourceGrounding: "The warning, Joseph's action, and fulfillment wording ground the Egypt preservation layer."
    });
    addMatthewTwoFunction(/\bcalled a Nazarene\b|\bcity called Nazareth\b|\bOut of Egypt have I called my son\b/i, {
      scopePath: "scripture.nt.matthew.2.verse.15",
      verseRange: "Matthew 2:15, 23",
      passageFunction: "messianic_location_fulfillment",
      plainMeaning: "The narrator connects JESUS' locations to fulfillment language.",
      fulfillmentMeaning: "Egypt and Nazareth are treated as fulfillment locations in the narrative explanation.",
      evidence: ["Out of Egypt have I called my son", "dwelt in a city called Nazareth", "He shall be called a Nazarene"],
      linkedThemes: ["location fulfillment", "messianic identity", "narrative fulfillment explanation"],
      relatedEntities: ["JESUS", "Egypt", "Nazareth", "quoted prophet"],
      relatedProphecies: (prophecyLinks || []).map((item) => item.id).filter(Boolean),
      confidence: "explicit",
      sourceGrounding: "Matthew 2:15 and 2:23 explicitly frame movement and dwelling as fulfillment."
    });
  }

  return passageFunctions;
}
function sourceContextKey(context) {
  return [
    context?.sourceCaptureId || "",
    context?.sourceUrl || "",
    context?.book || "",
    context?.chapter || ""
  ].join("|");
}

function uniqueSourceContexts(items) {
  const seen = new Set();
  const contexts = [];

  for (const item of items || []) {
    const context = item?.sourceContext;
    if (!context) continue;
    const key = sourceContextKey(context);
    if (seen.has(key)) continue;
    seen.add(key);
    contexts.push(context);
  }

  return contexts;
}
function createTimelineItem(capture, detectedDateText, normalizedYear, contextSnippet) {
  const sourceCaptureId = capture.id || "";
  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${detectedDateText}|${contextSnippet}`)}`,
    sourceCaptureId,
    sourceTitle: capture.title || "",
    sourceUrl: capture.url || "",
    sourceContext: buildSourceContext(capture),
    detectedDateText,
    normalizedYear,
    contextSnippet,
    extractedAt: new Date().toISOString()
  };
}

function extractTimelineItemsFromCapture(capture) {
  const items = [];
  for (const sentence of splitSentences(capture.text || "")) {
    const seenFullDates = new Set();
    FULL_DATE_PATTERN.lastIndex = 0;
    YEAR_PATTERN.lastIndex = 0;

    let fullDate;
    while ((fullDate = FULL_DATE_PATTERN.exec(sentence)) !== null) {
      seenFullDates.add(fullDate.index);
      items.push(createTimelineItem(
        capture,
        fullDate[0],
        Number(fullDate[1]),
        trimText(sentence, 220)
      ));
    }

    let year;
    while ((year = YEAR_PATTERN.exec(sentence)) !== null) {
      const insideFullDate = Array.from(seenFullDates).some((index) =>
        year.index >= index && year.index <= index + 32
      );
      if (insideFullDate) continue;
      items.push(createTimelineItem(
        capture,
        year[0],
        Number(year[0]),
        trimText(sentence, 220)
      ));
    }
  }
  return items;
}

function findDateInSentence(sentence) {
  FULL_DATE_PATTERN.lastIndex = 0;
  YEAR_PATTERN.lastIndex = 0;
  const fullDate = FULL_DATE_PATTERN.exec(sentence);
  if (fullDate) {
    return { detectedDateText: fullDate[0], normalizedYear: Number(fullDate[1]) };
  }
  const year = YEAR_PATTERN.exec(sentence);
  if (year) {
    return { detectedDateText: year[0], normalizedYear: Number(year[0]) };
  }
  return { detectedDateText: "", normalizedYear: null };
}

function detectOrderingCue(sentence) {
  const normalized = normalizeWhitespace(sentence).toLowerCase();
  const startCue = normalized.match(/^(?:\d+[:.)]\s*)?(first|then|afterward|later|next|finally|subsequently)\b/);
  const startPhrase = normalized.match(/^(?:\d+[:.)]\s*)?(after that|before that|before this|before then)\b/);
  if (startPhrase) return startPhrase[1];
  if (startCue) return startCue[1];
  return "";
}

function normalizeLineagePerson(name) {
  return normalizeWhitespace(name)
    .replace(/^the\s+/i, "")
    .replace(/[^A-Za-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function extractLineagePairs(sentence) {
  const pairs = [];
  const lineagePattern = /\b([A-Z][A-Za-z]+)\s+begat\s+([A-Z][A-Za-z]+)\b/g;
  let match;

  while ((match = lineagePattern.exec(sentence)) !== null) {
    const parent = normalizeLineagePerson(match[1]);
    const child = normalizeLineagePerson(match[2]);
    if (!parent || !child) continue;
    pairs.push({
      parent,
      child,
      confidence: "explicit"
    });
  }

  return pairs;
}

function extractLineagePersons(sentence) {
  const people = [];
  const seen = new Set();

  for (const pair of extractLineagePairs(sentence)) {
    for (const name of [pair.parent, pair.child]) {
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      people.push(name);
    }
  }

  return people;
}

function inferVerseNumberFromText(text, fallback = "") {
  const match = normalizeWhitespace(text || "").match(/^(?:\u00b6\s*)?(\d{1,3})\b/);
  return match?.[1] || fallback || "";
}

function anchorHintsForPhrase(sourceSnippet, anchorText) {
  const source = normalizeWhitespace(sourceSnippet || "");
  const anchor = normalizeWhitespace(anchorText || "");
  if (!source || !anchor) {
    return { phraseStartHint: -1, phraseEndHint: -1, anchorConfidence: "possible" };
  }

  const index = source.toLowerCase().indexOf(anchor.toLowerCase());
  if (index === -1) {
    return { phraseStartHint: -1, phraseEndHint: -1, anchorConfidence: "probable" };
  }

  return {
    phraseStartHint: index,
    phraseEndHint: index + anchor.length,
    anchorConfidence: "explicit"
  };
}

function createSemanticSubEvent(capture, sequenceIndex, sourceSnippet, config) {
  const sourceCaptureId = capture?.id || "";
  const originalText = normalizeWhitespace(config.originalText || sourceSnippet || "");
  const normalizedMeaning = normalizeWhitespace(config.normalizedMeaning || originalText);
  const anchorText = normalizeWhitespace(config.anchorText || originalText);
  const fullSourceSnippet = normalizeWhitespace(sourceSnippet || originalText);
  const anchorHints = anchorHintsForPhrase(fullSourceSnippet, anchorText);
  const key = [
    sourceCaptureId,
    sequenceIndex,
    config.eventType || "semantic_event",
    config.actor || "",
    config.action || "",
    config.target || "",
    normalizedMeaning
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId,
    sourceTitle: capture?.title || "",
    sourceUrl: capture?.url || "",
    sourceContext: buildSourceContext(capture || {}),
    sourceSequenceIndex: sequenceIndex,
    sentenceIndex: sequenceIndex,
    verseNumber: config.verseNumber || inferVerseNumberFromText(fullSourceSnippet),
    originalText,
    normalizedMeaning,
    actor: config.actor || "",
    action: config.action || "",
    target: config.target || "",
    recipient: config.recipient || "",
    concerning: config.concerning || "",
    participants: config.participants || [],
    relationshipType: config.relationshipType || "",
    authorityChain: config.authorityChain || [],
    narrator: config.narrator || "",
    narratorRole: config.narratorRole || "",
    quotedSpeaker: config.quotedSpeaker || "",
    quotedProphet: config.quotedProphet || "",
    eventType: config.eventType || "semantic_event",
    semanticCategory: config.semanticCategory || "unknown",
    confidence: config.confidence || "probable",
    anchorText,
    phraseStartHint: config.phraseStartHint ?? anchorHints.phraseStartHint,
    phraseEndHint: config.phraseEndHint ?? anchorHints.phraseEndHint,
    anchorConfidence: config.anchorConfidence || anchorHints.anchorConfidence,
    sourceSnippet: trimText(config.sourceSnippet || anchorText || sourceSnippet || originalText, 260),
    interpretationNotes: config.interpretationNotes || ""
  };
}
// Phase 5.9 semantic decomposition groundwork. These small subEvents preserve
// the original sentence while recording a normalized semantic reading. Future
// work can replace these narrow patterns with subject/object role tracking,
// pronoun resolution, original-language ambiguity notes, and doctrine/profile
// aware semantic categories without flattening complex passages into one event.
// Pronoun/rendering roadmap: pronoun meaning should flow from pronoun -> entity
// resolution -> hierarchy classification -> render profile, not capitalization
// alone. Joseph-linked HIM/HIS remains human; CHRIST/GOD-linked pronouns may be
// glorified only when semantic confidence and user rendering settings support it.
// Original-language roadmap only: future reference layers may research STEPBible
// Data (https://stepbible.github.io/STEPBible-Data/), STEPBible, SWORD/CrossWire,
// API.Bible, and Bible SDK licensing for Greek/Hebrew, Strong's, morphology,
// transliteration, lexical meaning, and idiom resolution such as "knew her not".
function createSemanticSubEvents(capture, sentence, sequenceIndex) {
  const text = normalizeWhitespace(sentence);
  const subEvents = [];
  const push = (config) => subEvents.push(createSemanticSubEvent(capture, sequenceIndex, text, config));

  if (/\bJoseph\b.*\bthought\b|\bwhile he thought on these things\b/i.test(text)) {
    push({
      originalText: "Joseph thought on these things",
      anchorText: "thought on these things",
      normalizedMeaning: "Joseph considered these things",
      actor: "Joseph",
      action: "thought / considered",
      eventType: "reflection_consideration",
      semanticCategory: "thought",
      confidence: "explicit"
    });
  }

  if (/\bangel of (?:THE LORD|the Lord)\b.*\bappeared\b/i.test(text)) {
    push({
      originalText: "the angel of THE LORD appeared unto him",
      anchorText: "the angel of THE LORD appeared unto him",
      normalizedMeaning: "Angel of THE LORD appeared to Joseph",
      actor: "Angel of THE LORD",
      action: "appeared",
      target: "Joseph",
      recipient: "Joseph",
      participants: ["Angel of THE LORD", "Joseph"],
      relationshipType: "messenger_appearance",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "divine_messenger_appearance",
      semanticCategory: "appearance",
      confidence: "explicit"
    });
  }

  if (/\bangel of (?:THE LORD|the Lord)\b.*\bsaying\b.*\bJoseph\b/i.test(text)) {
    push({
      originalText: "the angel of THE LORD ... saying, Joseph",
      anchorText: "saying, Joseph",
      normalizedMeaning: "Angel of THE LORD spoke to Joseph",
      actor: "Angel of THE LORD",
      action: "spoke",
      recipient: "Joseph",
      target: "Joseph",
      participants: ["Angel of THE LORD", "Joseph"],
      relationshipType: "speaker_recipient",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "divine_message_speech",
      semanticCategory: "speech",
      confidence: "explicit"
    });
  }

  if (/\bfear not to take unto thee Mary\b|\btake unto thee Mary thy wife\b/i.test(text)) {
    push({
      originalText: "fear not to take unto thee Mary thy wife",
      anchorText: "fear not to take unto thee Mary thy wife",
      normalizedMeaning: "Joseph received instruction to take Mary as wife",
      actor: "Angel of THE LORD",
      action: "instructed to take Mary as wife",
      recipient: "Joseph",
      concerning: "Mary",
      target: "Joseph",
      participants: ["Angel of THE LORD", "Joseph", "Mary"],
      relationshipType: "instruction_recipient_concerning",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "instruction_concerning_person",
      semanticCategory: "marriage_instruction",
      confidence: "explicit"
    });
  }

  if (/\bthat which is conceived in her is of the Holy Ghost\b|\bconceived in her is of the Holy Ghost\b/i.test(text)) {
    push({
      originalText: "that which is conceived in her is of the Holy Ghost",
      anchorText: "that which is conceived in her is of the Holy Ghost",
      normalizedMeaning: "HOLY CONCEPTION: the CHILD is Conceived Of THE HOLY SPIRIT in Mary",
      actor: "Angel of THE LORD",
      action: "revealed HOLY CONCEPTION",
      recipient: "Joseph",
      target: "CHILD Conceived Of THE HOLY SPIRIT",
      concerning: "Mary",
      participants: ["Angel of THE LORD", "Joseph", "Mary", "HOLY SPIRIT", "CHILD"],
      relationshipType: "conception_revealed",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "conception_revelation",
      semanticCategory: "divine_conception_revelation",
      confidence: "explicit"
    });
  }

  if (/\bthou shalt call his name JESUS\b|\bcall his name JESUS\b/i.test(text)) {
    push({
      originalText: "thou shalt call his name JESUS",
      anchorText: "thou shalt call his name JESUS",
      normalizedMeaning: "The name JESUS was revealed to Joseph",
      actor: "Angel of THE LORD",
      action: "revealed name",
      recipient: "Joseph",
      target: "JESUS",
      participants: ["Angel of THE LORD", "Joseph", "JESUS"],
      relationshipType: "revealed_name",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "name_revelation",
      semanticCategory: "naming_identity",
      confidence: "explicit"
    });
  }

  if (/\bfor he shall save his people from their sins\b/i.test(text)) {
    push({
      originalText: "for he shall save his people from their sins",
      anchorText: "he shall save his people from their sins",
      normalizedMeaning: "The mission reason for the name JESUS was declared",
      actor: "Angel of THE LORD",
      action: "declared mission/reason",
      recipient: "Joseph",
      target: "save His people from their sins",
      participants: ["Angel of THE LORD", "Joseph", "JESUS"],
      relationshipType: "mission_reason_revealed",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "mission_reason_declaration",
      semanticCategory: "mission_revelation",
      confidence: "explicit"
    });
  }

  if (/\btook unto him his wife\b|\btake unto thee Mary thy wife\b/i.test(text)) {
    push({
      originalText: /\btook unto him his wife\b/i.test(text) ? "Joseph took unto him his wife" : "take unto thee Mary thy wife",
      anchorText: /\btook unto him his wife\b/i.test(text) ? "and took unto him his wife" : "take unto thee Mary thy wife",
      normalizedMeaning: "Joseph accepted Mary as wife",
      actor: "Joseph",
      action: "took / accepted as wife",
      target: "Mary",
      concerning: "Mary",
      participants: ["Joseph", "Mary"],
      relationshipType: "marital_covenant",
      eventType: "covenant_family_union",
      semanticCategory: "covenant_family_relationship",
      confidence: /\btook unto him his wife\b/i.test(text) ? "explicit" : "probable"
    });
  }

  if (/\bknew her not\b/i.test(text)) {
    push({
      originalText: "he knew her not",
      anchorText: "knew her not",
      normalizedMeaning: "Joseph abstained from sexual relations with Mary",
      actor: "Joseph",
      action: "abstained",
      target: "Mary",
      concerning: "Mary",
      participants: ["Joseph", "Mary"],
      relationshipType: "abstinence_within_marital_context",
      eventType: "abstinence_or_no_intercourse_relations",
      semanticCategory: "physical_sexual_relations",
      confidence: "traditional/contextual interpretation",
      interpretationNotes: "Roadmap: contextual idioms like 'knew her not' must distinguish knowledge, relational familiarity, sexual relations, and abstinence/no sexual relations while preserving the original text."
    });
  }

  if (/\bbrought forth\b.*\bson\b/i.test(text)) {
    push({
      originalText: "she brought forth her firstborn son",
      anchorText: "brought forth her firstborn son",
      normalizedMeaning: "Mary brought forth a son",
      actor: "Mary",
      action: "brought forth",
      target: "JESUS",
      participants: ["Mary", "JESUS"],
      relationshipType: "mother_son_birth",
      eventType: "birth_event",
      semanticCategory: "family_birth",
      confidence: "explicit"
    });
  }

  if (/\bcalled his name JESUS\b|\bcalled his name Jesus\b/i.test(text)) {
    push({
      originalText: "called his name JESUS",
      anchorText: "called his name JESUS",
      normalizedMeaning: "Joseph named him JESUS",
      actor: "Joseph",
      action: "named",
      target: "JESUS",
      participants: ["Joseph", "JESUS"],
      relationshipType: "namer_named",
      eventType: "naming_event",
      semanticCategory: "naming_identity",
      confidence: "explicit"
    });
  }

  if (/\bNow all this was done\b|\bthat it might be fulfilled\b|\bspoken of the Lord by the prophet\b/i.test(text)) {
    push({
      originalText: "Now all this was done, that it might be fulfilled",
      anchorText: /\bthat it might be fulfilled\b/i.test(text) ? "that it might be fulfilled" : "Now all this was done",
      normalizedMeaning: "scripture narrator frames the event as fulfillment of prophetic speech",
      actor: "scripture narrator",
      action: "narrates fulfillment",
      eventType: "passive_fulfillment_narration",
      semanticCategory: "prophecy_fulfillment_context",
      participants: ["scripture narrator", "quoted prophet"],
      relationshipType: "fulfillment_narration",
      narrator: "scripture narrator",
      narratorRole: "passive fulfillment narration",
      quotedSpeaker: /\bspoken of the Lord\b/i.test(text) ? "THE LORD" : "",
      quotedProphet: /\bprophet\b/i.test(text) ? "quoted prophet" : "",
      confidence: "explicit"
    });
  }


  if (/\bwise men from the east\b|\bthere came wise men\b/i.test(text)) {
    push({ originalText: "there came wise men from the east to Jerusalem", anchorText: "wise men from the east", normalizedMeaning: "Wise men arrive seeking the one born King of the Jews", actor: "Wise men", action: "arrived / sought", target: "JESUS", recipient: "Jerusalem", participants: ["Wise men", "JESUS", "Jerusalem"], relationshipType: "search_witness", eventType: "wise_men_arrival", semanticCategory: "arrival_search_witness", confidence: "explicit" });
  }

  if (/\bWhere is he that is born King of the Jews\b|\bcome to worship him\b/i.test(text)) {
    push({ originalText: "Where is he that is born King of the Jews? for we have seen his star ... and are come to worship him", anchorText: /\bWhere is he that is born King of the Jews\b/i.test(text) ? "Where is he that is born King of the Jews" : "come to worship him", normalizedMeaning: "Wise men identify the CHILD/JESUS by royal and worship language", actor: "Wise men", action: "testified / worshipped", target: "JESUS", participants: ["Wise men", "JESUS"], relationshipType: "worship_witness", eventType: "worship_identity_witness", semanticCategory: "messianic_identity_witness", confidence: "explicit" });
  }

  if (/\bHerod\b.*\btroubled\b|\bHerod\b.*\bprivily called\b|\bHerod\b.*\bdestroy him\b/i.test(text)) {
    push({ originalText: "Herod responds to the report concerning the young child", anchorText: /\bdestroy him\b/i.test(text) ? "destroy him" : (/\bthat I may come and worship him also\b/i.test(text) ? "that I may come and worship him also" : (/\bprivily called\b/i.test(text) ? "privily called" : "Herod ... troubled")), normalizedMeaning: /\bdestroy him\b/i.test(text) ? "Herod shows child-targeting hostile intent toward JESUS" : (/\bthat I may come and worship him also\b/i.test(text) ? "Herod uses deceptive worship language while acting as hostile authority" : "Herod acts as hostile authority in response to the report of JESUS"), actor: "Herod", action: /\bdestroy him\b/i.test(text) ? "sought to destroy" : (/\bthat I may come and worship him also\b/i.test(text) ? "used deceptive speech" : "responded as hostile authority"), target: "JESUS", participants: ["Herod", "JESUS", "Wise men"], relationshipType: "hostile_authority_response", eventType: "hostile_authority_response", semanticCategory: "adversarial_authority", confidence: /\bdestroy him\b/i.test(text) ? "explicit" : "probable" });
  }

  if (/\bchief priests and scribes\b|\bfor thus it is written\b|\bin Bethlehem of Judaea\b/i.test(text)) {
    push({ originalText: "for thus it is written by the prophet", anchorText: /\bfor thus it is written\b/i.test(text) ? "for thus it is written" : "Bethlehem of Judaea", normalizedMeaning: "Chief priests and scribes identify Bethlehem through written prophecy", actor: /\bchief priests and scribes\b/i.test(text) ? "Chief priests and scribes" : "scripture narrator", action: "identified prophecy location", target: "Bethlehem", participants: ["Chief priests and scribes", "Bethlehem", "JESUS", "quoted prophet"], relationshipType: "prophecy_location_identification", eventType: "prophecy_fulfillment_identification", semanticCategory: "prophecy_location_fulfillment", confidence: "explicit" });
  }

  if (/\bwarned of God in a dream\b|\bbeing warned of God\b/i.test(text)) {
    push({ originalText: "being warned of God in a dream", anchorText: "warned of God in a dream", normalizedMeaning: "THE LORD warned the wise men by dream to avoid Herod", actor: "THE LORD", action: "warned", recipient: "Wise men", target: "Herod", participants: ["THE LORD", "Wise men", "Herod", "JESUS"], relationshipType: "divine_warning_redirection", authorityChain: ["THE LORD", "Wise men"], eventType: "divine_warning_revelation", semanticCategory: "warning_redirection", confidence: "explicit" });
  }

  if (/\bArise\b.*\btake the young child\b|\bflee into Egypt\b|\barise\b.*\btake the young child\b|\breturn(?:ed)?\b.*\byoung child\b/i.test(text)) {
    push({ originalText: "Arise, and take the young child and his mother", anchorText: /\bflee into Egypt\b/i.test(text) ? "flee into Egypt" : "take the young child and his mother", normalizedMeaning: "AngEL Of THE LORD instructs Joseph to protect the CHILD/JESUS and His mother", actor: "Angel of THE LORD", action: /\bflee into Egypt\b/i.test(text) ? "commanded protective flight" : "commanded protective movement", recipient: "Joseph", target: "JESUS", concerning: "Mary", participants: ["Angel of THE LORD", "Joseph", "JESUS", "Mary", "Egypt"], relationshipType: "protective_instruction", authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"], eventType: "protective_instruction_revelation", semanticCategory: "protection_instruction", confidence: "explicit" });
  }

  if (/\bhe arose\b.*\btook the young child\b|\bdeparted into Egypt\b|\bturned aside\b.*\bGalilee\b|\bdwelt in a city called Nazareth\b/i.test(text)) {
    push({ originalText: "he arose, he took the young child and his mother", anchorText: /\bdeparted into Egypt\b/i.test(text) ? "departed into Egypt" : (/\bdwelt in a city called Nazareth\b/i.test(text) ? "dwelt in a city called Nazareth" : "took the young child and his mother"), normalizedMeaning: "Joseph obeys protective instruction concerning CHILD/JESUS", actor: "Joseph", action: "obeyed protective instruction", target: "JESUS", concerning: "Mary", participants: ["Joseph", "JESUS", "Mary", "Egypt", "Nazareth"], relationshipType: "protective_obedient_response", eventType: "protective_obedient_response", semanticCategory: "protective_obedience", confidence: "explicit" });
  }

  if (/\bthat it might be fulfilled\b|\bOut of Egypt have I called my son\b|\bcalled a Nazarene\b/i.test(text)) {
    push({ originalText: "that it might be fulfilled", anchorText: /\bOut of Egypt have I called my son\b/i.test(text) ? "Out of Egypt have I called my son" : (/\bcalled a Nazarene\b/i.test(text) ? "called a Nazarene" : "that it might be fulfilled"), normalizedMeaning: "scripture narrator connects the movement of CHILD/JESUS to prophecy fulfillment", actor: "scripture narrator", action: "narrates fulfillment", target: "JESUS", participants: ["scripture narrator", "quoted prophet", "JESUS", "Egypt", "Nazareth"], relationshipType: "messianic_location_fulfillment", narrator: "scripture narrator", narratorRole: "fulfillment narration", quotedProphet: "quoted prophet", eventType: "messianic_location_fulfillment", semanticCategory: "prophecy_location_fulfillment", confidence: "explicit" });
  }  return subEvents;
}

function createEventItem(capture, sentence, sequenceIndex) {
  const date = findDateInSentence(sentence);
  const eventText = normalizeWhitespace(sentence);
  const sourceCaptureId = capture.id || "";
  const isLineageRecord = GENEALOGY_PATTERN.test(eventText);
  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${sequenceIndex}|${eventText}`)}`,
    sourceCaptureId,
    sourceTitle: capture.title || "",
    sourceUrl: capture.url || "",
    sourceContext: buildSourceContext(capture),
    eventText,
    eventType: isSourceSummarySentence(eventText, sequenceIndex)
      ? "source_summary"
      : isLineageRecord
        ? "lineage_record"
        : "narrative_event",
    sequenceIndex,
    detectedDateText: date.detectedDateText,
    normalizedYear: date.normalizedYear,
    orderingCue: detectOrderingCue(sentence),
    confidence: 0.7,
    lineagePersons: isLineageRecord ? extractLineagePersons(eventText) : [],
    lineagePairs: isLineageRecord ? extractLineagePairs(eventText) : [],
    subEvents: createSemanticSubEvents(capture, eventText, sequenceIndex),
    extractedAt: new Date().toISOString()
  };
}

function isSourceSummarySentence(sentence, sequenceIndex = 0) {
  const text = normalizeWhitespace(sentence);
  const stripped = stripSourceHeading(text);
  const numericIndex = Number(sequenceIndex);

  if (!text) return false;
  if (CHAPTER_SUMMARY_PATTERN.test(text)) return true;
  if (SOURCE_HEADING_PATTERN.test(text) && /Chapter\s+\d+\b/i.test(text)) {
    return true;
  }
  if (Number.isFinite(numericIndex) && numericIndex <= 1 &&
    text === stripped &&
    SUMMARY_SEPARATOR_PATTERN.test(text)) {
    return true;
  }

  return false;
}

function extractEventItemsFromCapture(capture) {
  return splitSentences(capture.text || "")
    .map((sentence, index) => ({ sentence: normalizeWhitespace(sentence), index }))
    .filter(({ sentence, index }) =>
      sentence &&
      !isSourceSummarySentence(sentence, index) &&
      (ACTION_PATTERN.test(sentence) || GENEALOGY_PATTERN.test(sentence) ||
        SEMANTIC_DECOMPOSITION_PATTERN.test(sentence) || detectOrderingCue(sentence))
    )
    .map(({ sentence, index }) => createEventItem(capture, sentence, index));
}

function hasNormalizedYear(eventItem) {
  return eventItem.normalizedYear !== null &&
    eventItem.normalizedYear !== "" &&
    Number.isFinite(Number(eventItem.normalizedYear));
}

function orderingScore(eventItem, index) {
  return ((Number(eventItem.sequenceIndex) || index) * 100) +
    (ORDERING_WEIGHTS[eventItem.orderingCue] ?? 0);
}

function createOrderedEvents(eventItems) {
  const grouped = new Map();
  for (const item of eventItems) {
    if (item.eventType === "source_summary" ||
      item.eventType === "lineage_record" ||
      isSourceSummarySentence(item.eventText || "", item.sequenceIndex)) {
      continue;
    }
    const key = item.sourceCaptureId || item.sourceUrl || "unknown-source";
    grouped.set(key, [...(grouped.get(key) || []), item]);
  }

  const ordered = [];
  for (const group of grouped.values()) {
    group
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        if (hasNormalizedYear(a.item) && hasNormalizedYear(b.item) &&
          Number(a.item.normalizedYear) !== Number(b.item.normalizedYear)) {
          return Number(a.item.normalizedYear) - Number(b.item.normalizedYear);
        }
        return orderingScore(a.item, a.index) - orderingScore(b.item, b.index);
      })
      .forEach(({ item }, index) => {
        ordered.push({
          ...item,
          sequenceOrder: index + 1,
          orderingReason: hasNormalizedYear(item)
            ? `date/year ${item.normalizedYear}`
            : item.orderingCue
              ? `ordering cue "${item.orderingCue}"`
              : `source sequence ${item.sequenceIndex ?? 0}`,
          orderedAt: new Date().toISOString()
        });
      });
  }
  return ordered;
}

function normalizeActorName(actorText) {
  const normalized = normalizeWhitespace(actorText).replace(/[^\w\s]/g, "").toLowerCase();
  if (!normalized) return "";
  return ACTOR_NORMALIZATIONS.get(normalized) ||
    normalized.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function stripSourceHeading(sentence) {
  // Roadmap: Source Metadata should track book/source title, author, speaker,
  // compiler, translator/version, collection owner, date/year, source type,
  // referenced scripture links, and context notes separately from actors.
  // "Matthew 3" is source/chapter context, not a narrative actor.
  return normalizeWhitespace(sentence)
    .replace(/^(?:Matthew|Mark|Luke|John)\s+\d+\b[:.)]?\s*/i, "");
}

function stripLeadingSentenceNoise(sentence) {
  return stripSourceHeading(sentence)
    .replace(/^(?:(?:\d+[:.)]?)|(?:\u00b6)|[\s:.)-])+/, "")
    .replace(/^(?:(?:and|but|then|afterward|later|next|finally|subsequently|now|when),?\s+|(?:after that|before that|before this|before then),?\s+)+/i, "")
    .replace(/^(?:(?:\d+[:.)]?)|(?:\u00b6)|[\s:.)-])+/, "");
}

function leadingSubjectActor(sentence) {
  const normalized = stripLeadingSentenceNoise(sentence);
  const leadingActor = normalized.match(LEADING_ACTOR_PATTERN);
  if (leadingActor) return normalizeActorName(leadingActor[1]);
  const postVerbActor = normalized.match(POST_VERB_ACTOR_PATTERN);
  if (postVerbActor) return normalizeActorName(postVerbActor[1]);
  if (PRONOUN_SUBJECT_PATTERN.test(normalized)) return "";
  return "";
}

function explicitContextActor(eventItem) {
  const text = normalizeWhitespace(eventItem.eventText || "");

  if (/\bNow all this was done\b|\bthat it might be fulfilled\b/i.test(text)) {
    return "scripture narrator";
  }

  if (/\bvoice from heaven\b/i.test(text) || /\bmy beloved Son\b/i.test(text)) {
    return "Father";
  }

  if (/\bSpirit of God\b/i.test(text) || /\bSpirit\b.*\bdescending\b/i.test(text)) {
    return "Spirit of GOD";
  }

  // Matthew 1 divine-message scene: the sentence may begin with Joseph's
  // internal action, but the main event is the angel appearing and speaking.
  // Future sub-event parsing should split Joseph thought / angel appeared /
  // angel spoke into separate actor-target records.
  if (/\bangel of the Lord\b/i.test(text) &&
    /\bJoseph\b/i.test(text) &&
    /\b(appeared|appeareth|saying|fear not)\b/i.test(text)) {
    return "Angel of the Lord";
  }

  if (/\bJohn(?: the Baptist)?\b/i.test(text)) {
    return "John the Baptist";
  }

  if (/\bPharisees and Sadducees\b/i.test(text)) {
    return "Pharisees and Sadducees";
  }

  if (/\bPharisees\b/i.test(text) && /\bSadducees\b/i.test(text)) {
    return "Pharisees and Sadducees";
  }

  if (/\b(?:Jerusalem|Jud(?:a|\u00e6)ea|Jordan|people|multitudes)\b/i.test(text) &&
    /\b(?:went out|come|came|were baptized|baptized|confessing)\b/i.test(text)) {
    return "People / multitudes";
  }

  return "";
}

function sourceActorOverride(eventItem) {
  const text = normalizeWhitespace(eventItem.eventText || "");

  if (/\bvoice from heaven\b/i.test(text) || /\bmy beloved Son\b/i.test(text)) {
    return "Father";
  }

  if (/\bSpirit of God\b/i.test(text) || /\bSpirit\b.*\bdescending\b/i.test(text)) {
    return "Spirit of GOD";
  }

  return "";
}

function inferredNarrativeContinuityActor(text, actorMemory) {
  const normalized = stripLeadingSentenceNoise(text);

  // Inferred narrative continuity: Matthew 3 uses "he saw... he said" in a
  // baptism scene where the active speaker is John the Baptist. This is not an
  // explicit name match; future dependency parsing should replace it.
  if (/^he\b/i.test(normalized) &&
    /\bPharisees\b/i.test(normalized) &&
    /\bSadducees\b/i.test(normalized) &&
    /\bbaptism\b/i.test(normalized) &&
    /\bsaid unto them\b/i.test(normalized)) {
    return actorMemory.previousSingularActor || "John the Baptist";
  }

  // Subject/object role placeholder: in "Then he suffered him," John performs
  // the action and JESUS is the target/object. Future pronoun antecedent
  // resolution and actor-target action modeling should replace this rule.
  if (/^he suffered him\b/i.test(normalized)) {
    return "John the Baptist";
  }

  return "";
}

function actorForEvent(eventItem, actorMemory) {
  const text = eventItem.eventText || "";
  const normalized = stripLeadingSentenceNoise(text);
  const sourceActor = sourceActorOverride(eventItem);

  if (sourceActor) return sourceActor;

  const inferredActor = inferredNarrativeContinuityActor(text, actorMemory);
  if (inferredActor) return inferredActor;

  if (PLURAL_PRONOUN_SUBJECT_PATTERN.test(normalized)) {
    return actorMemory.previousPluralActor || "Unknown actor";
  }
  if (SINGULAR_PRONOUN_SUBJECT_PATTERN.test(normalized)) {
    return actorMemory.previousSingularActor || "Unknown actor";
  }
  return leadingSubjectActor(text) ||
    explicitContextActor(eventItem) ||
    "Unknown actor";
}

function createActorTimelines(orderedEvents) {
  const grouped = new Map();
  const seenByActor = new Map();
  const memoryBySource = new Map();
  for (const item of [...orderedEvents].sort((a, b) =>
    String(a.sourceCaptureId || a.sourceUrl || "").localeCompare(String(b.sourceCaptureId || b.sourceUrl || "")) ||
    Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0)
  )) {
    const sourceKey = item.sourceCaptureId || item.sourceUrl || "unknown-source";
    const memory = memoryBySource.get(sourceKey) || {
      previousSingularActor: "",
      previousPluralActor: ""
    };
    const actorName = actorForEvent(item, memory);
    const actionKey = [
      item.id || "",
      item.sequenceOrder ?? "",
      normalizeWhitespace(item.eventText || "")
    ].join("|");

    if (!grouped.has(actorName)) grouped.set(actorName, []);
    if (!seenByActor.has(actorName)) seenByActor.set(actorName, new Set());

    if (!seenByActor.get(actorName).has(actionKey)) {
      seenByActor.get(actorName).add(actionKey);
      grouped.get(actorName).push({
        sourceEventId: item.id || "",
        sequenceOrder: item.sequenceOrder,
        eventText: trimText(item.eventText || "", 180),
        orderingReason: item.orderingReason || "",
        sourceContext: item.sourceContext
      });
    }
    if (actorName !== "Unknown actor") {
      if (PLURAL_ACTOR_NAMES.has(actorName)) memory.previousPluralActor = actorName;
      else memory.previousSingularActor = actorName;
    }
    if (/\bchief priests and scribes\b/i.test(item.eventText || "")) {
      memory.previousPluralActor = "Chief priests and scribes";
    } else if (/\bPharisees\b/i.test(item.eventText || "") && /\bSadducees\b/i.test(item.eventText || "")) {
      memory.previousPluralActor = "Pharisees and Sadducees";
    } else if (/\b(?:Jerusalem|Jud(?:a|\u00e6)ea|Jordan|people|multitudes)\b/i.test(item.eventText || "")) {
      memory.previousPluralActor = "People / multitudes";
    } else if (/\bwise men\b/i.test(item.eventText || "")) {
      memory.previousPluralActor = "Wise men";
    }
    if (/\bangel of the Lord\b/i.test(item.eventText || "") && /\bJoseph\b/i.test(item.eventText || "")) {
      memory.previousSingularActor = "Joseph";
    }
    memoryBySource.set(sourceKey, memory);
  }

  return Array.from(grouped.entries()).map(([actorName, orderedActions]) => ({
    actorName,
    sourceContexts: uniqueSourceContexts(orderedActions),
    orderedActions
  }));
}

function dedupeActorTimelines(actorTimelines) {
  return actorTimelines.map((timeline) => {
    const seen = new Set();
    const orderedActions = [];

    for (const action of timeline.orderedActions || []) {
      const key = [
        timeline.actorName || "",
        action.sequenceOrder ?? "",
        normalizeWhitespace(action.eventText || "").toLowerCase()
      ].join("|");

      if (seen.has(key)) continue;
      seen.add(key);
      orderedActions.push(action);
    }

    return {
      ...timeline,
      orderedActions
    };
  });
}

function actorSetFromTimelines(actorTimelines) {
  const actorsByEvent = new Map();

  for (const timeline of actorTimelines || []) {
    const actorName = timeline.actorName || "";
    if (!actorName || actorName === "Unknown actor") continue;

    for (const action of timeline.orderedActions || []) {
      const eventId = action.sourceEventId || "";
      if (!eventId) continue;
      if (!actorsByEvent.has(eventId)) actorsByEvent.set(eventId, new Set());
      actorsByEvent.get(eventId).add(actorName);
    }
  }

  return actorsByEvent;
}

function isSummaryLikeEvent(eventItem) {
  const text = normalizeWhitespace(eventItem.eventText || "");

  if (!text) return true;
  if (eventItem.eventType === "source_summary") return true;
  if (isSourceSummarySentence(text, eventItem.sequenceIndex)) return true;

  return false;
}

function pairKey(actorA, actorB) {
  return [actorA, actorB].sort((a, b) => a.localeCompare(b)).join("|");
}

function normalizedActorPair(actorA, actorB) {
  return [actorA, actorB]
    .map((actor) => normalizeWhitespace(actor).toLowerCase())
    .sort((a, b) => a.localeCompare(b));
}

function interactionDedupKey(item) {
  const [actorA, actorB] = normalizedActorPair(item.actorA || "", item.actorB || "");

  return [
    item.sourceUrl || item.sourceTitle || item.sourceCaptureId || "",
    actorA,
    actorB,
    normalizeWhitespace(item.interactionType || "").toLowerCase(),
    normalizeWhitespace(item.sourceSnippet || "").toLowerCase()
  ].join("|");
}

function createInteractionItem(eventItem, actorA, actorB, interactionType, confidence) {
  const [orderedActorA, orderedActorB] = pairKey(actorA, actorB).split("|");
  const key = [
    eventItem.sourceCaptureId || eventItem.sourceUrl || "",
    eventItem.id || "",
    orderedActorA,
    orderedActorB,
    interactionType
  ].join("|");

  return {
    key,
    item: {
      id: `${Date.now()}-${textHash(key)}`,
      sourceCaptureId: eventItem.sourceCaptureId || "",
      sourceTitle: eventItem.sourceTitle || "",
      sourceUrl: eventItem.sourceUrl || "",
      sourceContext: eventItem.sourceContext,
      actorA: orderedActorA,
      actorB: orderedActorB,
      interactionType,
      sourceEventId: eventItem.id || "",
      sourceSnippet: trimText(eventItem.eventText || "", 220),
      sequenceOrder: eventItem.sequenceOrder,
      confidence
      // Roadmap: relationship/source grounding should eventually include
      // evidenceType, evidenceSnippet, sourceReference, linkedSources, and
      // confirmedBy. Reserve "confirmed" for relationships directly stated by
      // source text or verified by linked metadata/source references. Current
      // Phase 5.5 values intentionally stay local: explicit direct text,
      // inferred-source for source-grounded inference, probable for likely
      // scene witnesses, and possible for weaker audience inference.
    }
  };
}

function dedupeInteractionGraph(interactions) {
  const seen = new Set();
  const deduped = [];

  for (const item of interactions || []) {
    const key = interactionDedupKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped;
}

function eventPrimaryActors(eventItem, actorsByEvent) {
  return new Set(actorsByEvent.get(eventItem.id || "") || []);
}

function mentionedActorsForEvent(eventItem) {
  const text = normalizeWhitespace(eventItem.eventText || "");
  const actors = new Set();

  if (/\bJesus\b|\bChrist\b|\byoung child\b|\bthe child\b|\bmy beloved Son\b/i.test(text)) {
    actors.add("JESUS");
  }
  if (/\bJohn(?: the Baptist)?\b/i.test(text)) actors.add("John the Baptist");
  if (/\bSpirit of God\b|\bSpirit\b.*\bdescending\b/i.test(text)) {
    actors.add("Spirit of GOD");
  }
  if (/\bvoice from heaven\b|\bmy beloved Son\b|\bFather\b/i.test(text)) {
    actors.add("Father");
  }
  if (/\bPharisees and Sadducees\b/i.test(text) ||
    (/\bPharisees\b/i.test(text) && /\bSadducees\b/i.test(text))) {
    actors.add("Pharisees and Sadducees");
  }
  if (/\bpeople\b|\bmultitudes\b|\bJerusalem\b|\bJud(?:a|\u00e6)ea\b|\bJordan\b/i.test(text)) {
    actors.add("People / multitudes");
  }
  if (/\bwise men\b/i.test(text)) actors.add("Wise men");
  if (/\bHerod\b/i.test(text)) actors.add("Herod");
  if (/\bJoseph\b/i.test(text)) actors.add("Joseph");
  if (/\bMary\b|\bmother\b/i.test(text)) actors.add("Mary");
  if (/\bangel of the Lord\b/i.test(text)) actors.add("Angel of the Lord");

  return actors;
}

function sceneParticipantsForEvent(eventItem, actorsByEvent, sceneMemory) {
  const participants = new Set(sceneMemory.participants || []);

  for (const actor of eventPrimaryActors(eventItem, actorsByEvent)) {
    if (actor && actor !== "Unknown actor") participants.add(actor);
  }

  for (const actor of mentionedActorsForEvent(eventItem)) {
    if (actor && actor !== "Unknown actor") participants.add(actor);
  }

  return participants;
}

function updateSceneMemory(sceneMemory, eventItem, actorsByEvent) {
  for (const actor of sceneParticipantsForEvent(eventItem, actorsByEvent, {
    participants: []
  })) {
    sceneMemory.participants.add(actor);
  }
}

function interactionCandidatesForEvent(eventItem, actorsByEvent) {
  const text = normalizeWhitespace(eventItem.eventText || "");
  const primaryActors = eventPrimaryActors(eventItem, actorsByEvent);
  const candidates = [];
  const push = (actorA, actorB, interactionType, confidence) => {
    if (!actorA || !actorB || actorA === actorB) return;
    candidates.push(createInteractionItem(
      eventItem,
      actorA,
      actorB,
      interactionType,
      confidence
    ));
  };

  if (/\bJesus\b/i.test(text) && /\bJohn\b/i.test(text) &&
    /\bbaptiz/i.test(text)) {
    push("JESUS", "John the Baptist", "baptism", "explicit");
  }

  if (/\bSpirit of God\b/i.test(text) &&
    /\b(descending|lighting)\b/i.test(text) &&
    /\b(upon him|upon Jesus|like a dove)\b/i.test(text)) {
    push("JESUS", "Spirit of GOD", "divine manifestation", "probable");
  }

  if (/\bvoice from heaven\b/i.test(text) &&
    /\bmy beloved Son\b/i.test(text)) {
    push("Father", "JESUS", "divine proclamation", "inferred-source");
  }

  if (/\bJohn(?: the Baptist)?\b/i.test(text) &&
    (/\bPharisees and Sadducees\b/i.test(text) ||
      (/\bPharisees\b/i.test(text) && /\bSadducees\b/i.test(text))) &&
    /\b(warned|said|saying|come|came)\b/i.test(text)) {
    push("John the Baptist", "Pharisees and Sadducees", "warning", "explicit");
  }

  if ((primaryActors.has("Herod") || /\bHerod\b/i.test(text)) &&
    /\b(wise men|them)\b/i.test(text) &&
    /\b(sent|called|inquired|demanded)\b/i.test(text)) {
    push("Herod", "Wise men", "royal summons", "explicit");
  }

  if (/\bwise men\b/i.test(text) &&
    /\b(young child|the child|Jesus|Christ)\b/i.test(text) &&
    /\b(worshipped|worshiped|found|saw)\b/i.test(text)) {
    push("JESUS", "Wise men", "worship", "explicit");
  }

  if (/\bangel of the Lord\b/i.test(text) &&
    /\bJoseph\b/i.test(text) &&
    /\b(appeared|appeareth|warned|commanded|saying)\b/i.test(text)) {
    push("Angel of the Lord", "Joseph", "divine message", "explicit");
  }

  // Matthew 2 caregiving/travel scenes can create Joseph <-> JESUS movement
  // relationships, but Matthew 1 naming/birth/marital language should remain
  // semantic events rather than a direct interaction edge.
  if (/\bJoseph\b/i.test(text) &&
    /\b(young child|the child)\b/i.test(text) &&
    /\b(took|departed|returned|came|arose)\b/i.test(text) &&
    !/\b(called his name|brought forth|knew her not|wife)\b/i.test(text)) {
    push("JESUS", "Joseph", "caregiving movement", "explicit");
  }

  if (/\bJoseph\b/i.test(text) &&
    /\b(Mary|mother)\b/i.test(text) &&
    /\b(took|departed|returned|came|arose)\b/i.test(text)) {
    push("Joseph", "Mary", "family movement", "explicit");
  }

  return candidates;
}

function witnessCandidatesForEvent(eventItem, actorsByEvent, sceneMemory) {
  const text = normalizeWhitespace(eventItem.eventText || "");
  const participants = sceneParticipantsForEvent(eventItem, actorsByEvent, sceneMemory);
  const candidates = [];
  const push = (actorA, actorB, interactionType, confidence) => {
    if (!actorA || !actorB || actorA === actorB) return;
    candidates.push(createInteractionItem(
      eventItem,
      actorA,
      actorB,
      interactionType,
      confidence
    ));
  };

  if (/\bvoice from heaven\b/i.test(text) &&
    /\bmy beloved Son\b/i.test(text)) {
    if (participants.has("John the Baptist")) {
      push("Father", "John the Baptist", "witnessed proclamation", "probable");
    }
    if (participants.has("People / multitudes")) {
      push("Father", "People / multitudes", "witnessed proclamation", "possible");
    }
  }

  if ((/\bheavens? (?:opened|were opened)\b/i.test(text) ||
    /\bsaw the Spirit\b/i.test(text) ||
    /\bSpirit of God\b.*\bdescending\b/i.test(text)) &&
    participants.has("John the Baptist")) {
    push("Spirit of GOD", "John the Baptist", "witnessed manifestation", "probable");
  }


  // Phase 5.5 witness/audience MVP. Future work should track scene
  // participants explicitly, separate direct vs inferred witness edges,
  // model audience/public-private events, and keep inferred links visibly
  // lower-confidence than direct interactions.
  return candidates;
}

function createInteractionGraph(orderedEvents, actorTimelines) {
  const actorsByEvent = actorSetFromTimelines(actorTimelines);
  const interactions = [];
  const seen = new Set();
  const sceneMemoryBySource = new Map();

  for (const eventItem of orderedEvents || []) {
    if (isSummaryLikeEvent(eventItem)) continue;
    const sourceKey = eventItem.sourceCaptureId || eventItem.sourceUrl || "unknown-source";
    const sceneMemory = sceneMemoryBySource.get(sourceKey) || {
      participants: new Set()
    };

    for (const candidate of [
      ...interactionCandidatesForEvent(eventItem, actorsByEvent),
      ...witnessCandidatesForEvent(eventItem, actorsByEvent, sceneMemory)
    ]) {
      if (seen.has(candidate.key)) continue;
      seen.add(candidate.key);
      interactions.push(candidate.item);
    }

    updateSceneMemory(sceneMemory, eventItem, actorsByEvent);
    sceneMemoryBySource.set(sourceKey, sceneMemory);
  }

  // Phase 5.4/5.5 local-only MVP. Future work should add relationship graph
  // visualization, interaction/conversation counts, influence mapping,
  // doctrine relationship analysis, scene participant tracking, public/private
  // event classification, and cross-document interaction networks. Later
  // source grounding can link Conference Talks, scripture references, sermons,
  // and other documents so relationships can show where they were confirmed,
  // inferred, or merely witnessed by scene context.
  return interactions;
}

function principleTypeForSentence(sentence) {
  if (/\bflee into Egypt|take the young child|departed into Egypt|destroy him\b/i.test(sentence)) return "divine_preservation";
  if (/\bprivily called|that I may come and worship him also|Herod\b.*\btroubled\b/i.test(sentence)) return "adversarial_opposition";
  if (/\bNazareth|Bethlehem|Jerusalem|Egypt|another way|turned aside\b/i.test(sentence)) return "fulfillment_through_movement";
  if (/\bfulfilled|that it might be fulfilled\b/i.test(sentence)) return "fulfillment";
  if (/\bprophet|written|called a Nazarene|that shall rule\b/i.test(sentence)) return "prophecy";
  if (/\bcommanded|law|obedience\b/i.test(sentence)) return "commandment";
  if (/\bworship\b/i.test(sentence)) return "worship";
  if (/\bwarned\b/i.test(sentence)) return "warning";
  if (/\brevelation|dream\b/i.test(sentence)) return "revelation";
  if (/\bcovenant\b/i.test(sentence)) return "covenant";
  if (/\bkingdom|righteousness|salvation|mercy|faith|blessing\b/i.test(sentence)) return "doctrine";
  return "unknown";
}

function extractPrincipleItemsFromCapture(capture) {
  return splitSentences(capture.text || "")
    .map((sentence, index) => ({ sentence: normalizeWhitespace(sentence), index }))
    .filter(({ sentence }) => sentence && (PRINCIPLE_PATTERN.test(sentence) || PURPOSE_PRINCIPLE_PATTERN.test(sentence)))
    .map(({ sentence, index }) => ({
      id: `${Date.now()}-${textHash(`${capture.id || ""}|${index}|${sentence}`)}`,
      sourceCaptureId: capture.id || "",
      sourceTitle: capture.title || "",
      sourceUrl: capture.url || "",
      sourceContext: buildSourceContext(capture),
      principleText: sentence,
      principleType: principleTypeForSentence(sentence),
      contextSnippet: trimText(sentence, 220),
      extractedAt: new Date().toISOString()
    }));
}

function principleDedupKey(item) {
  return [
    item.sourceUrl || item.sourceTitle || "",
    normalizeWhitespace(item.principleText || "").toLowerCase(),
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

function principleSequence(item, index) {
  const idText = String(item.id || "");
  const sequenceMatch = idText.match(/\|(\d+)\|/);

  return sequenceMatch ? Number(sequenceMatch[1]) : index;
}

function principleTextKey(item) {
  return normalizeWhitespace(item?.principleText || "").toLowerCase();
}

function isSamePrincipleItem(left, right) {
  if (!left || !right) return false;
  if (left.id && right.id && left.id === right.id) return true;
  return principleTextKey(left) && principleTextKey(left) === principleTextKey(right);
}

function createProphecyLink(prophecy, fulfillment, distance) {
  if (isSamePrincipleItem(prophecy, fulfillment)) return null;

  const sourceCaptureId = fulfillment.sourceCaptureId || prophecy.sourceCaptureId || "";
  const prophecyText = prophecy.principleText || "";
  const fulfillmentText = fulfillment.principleText || "";
  if (normalizeWhitespace(prophecyText).toLowerCase() ===
    normalizeWhitespace(fulfillmentText).toLowerCase()) {
    return null;
  }

  const contextSnippet = trimText([
    prophecy.contextSnippet || prophecyText,
    fulfillment.contextSnippet || fulfillmentText
  ].filter(Boolean).join(" "), 260);

  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${prophecyText}|${fulfillmentText}`)}`,
    sourceCaptureId,
    sourceContext: fulfillment.sourceContext || prophecy.sourceContext,
    prophecyText,
    fulfillmentText,
    contextSnippet,
    linkType: "prophecy-fulfillment",
    confidence: distance <= 2 ? "explicit" : "probable"
  };
}

function createSelfContainedFulfillmentLink(item) {
  const text = item.principleText || "";
  const sourceCaptureId = item.sourceCaptureId || "";

  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|self-contained|${text}`)}`,
    sourceCaptureId,
    sourceContext: item.sourceContext,
    prophecyText: "",
    fulfillmentText: text,
    contextSnippet: trimText(item.contextSnippet || text, 260),
    linkType: "self-contained fulfillment",
    confidence: "explicit"
  };
}

function createProphecyLinks(principleItems) {
  const grouped = new Map();
  const links = [];
  const seen = new Set();

  for (const item of principleItems || []) {
    const sourceKey = item.sourceCaptureId || item.sourceUrl || "unknown-source";
    grouped.set(sourceKey, [...(grouped.get(sourceKey) || []), item]);
  }

  for (const group of grouped.values()) {
    const indexed = group.map((item, index) => ({
      item,
      sequence: principleSequence(item, index)
    }));
    const prophecies = indexed.filter(({ item }) =>
      PROPHECY_CANDIDATE_PATTERN.test(item.principleText || "")
    );
    const fulfillments = indexed.filter(({ item }) =>
      FULFILLMENT_CANDIDATE_PATTERN.test(item.principleText || "")
    );

    for (const fulfillment of fulfillments) {
      if (PROPHECY_CANDIDATE_PATTERN.test(fulfillment.item.principleText || "")) {
        const selfContained = createSelfContainedFulfillmentLink(fulfillment.item);
        const selfKey = [
          selfContained.sourceCaptureId,
          selfContained.linkType,
          normalizeWhitespace(selfContained.fulfillmentText).toLowerCase()
        ].join("|");
        if (!seen.has(selfKey)) {
          seen.add(selfKey);
          links.push(selfContained);
        }
      }

      const nearest = prophecies
        .filter((prophecy) => !isSamePrincipleItem(prophecy.item, fulfillment.item))
        .map((prophecy) => ({
          ...prophecy,
          distance: Math.abs(prophecy.sequence - fulfillment.sequence)
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      if (!nearest) continue;

      const link = createProphecyLink(
        nearest.item,
        fulfillment.item,
        nearest.distance
      );
      if (!link) continue;

      const key = [
        link.sourceCaptureId,
        normalizeWhitespace(link.prophecyText).toLowerCase(),
        normalizeWhitespace(link.fulfillmentText).toLowerCase()
      ].join("|");

      if (seen.has(key)) continue;
      seen.add(key);
      links.push(link);
    }
  }

  // Phase 5.3 local-only MVP. Future work should add cross-document linking,
  // scripture reference matching, theme clustering, and stronger confidence
  // scoring without adding AI/backend calls here.
  return links;
}

function sceneClassificationForEvent(eventItem) {
  const text = normalizeWhitespace(eventItem.eventText || "");

  if (/\bvoice from heaven\b|\bSpirit of God\b.*\bdescending\b|\bheavens? (?:opened|were opened)\b/i.test(text)) {
    return {
      sceneType: "divine manifestation",
      sceneTitle: "Baptism / divine manifestation scene"
    };
  }

  if (/\bJesus\b/i.test(text) && /\bJohn\b/i.test(text) && /\bbaptiz/i.test(text)) {
    return {
      sceneType: "baptism",
      sceneTitle: "JESUS comes to John for baptism"
    };
  }

  if (/\bhe suffered him\b/i.test(stripLeadingSentenceNoise(text)) ||
    /\bJesus\b.*\bbaptized\b/i.test(text)) {
    return {
      sceneType: "baptism",
      sceneTitle: "JESUS comes to John for baptism"
    };
  }

  if (/\bPharisees\b/i.test(text) && /\bSadducees\b/i.test(text)) {
    return {
      sceneType: "warning",
      sceneTitle: "John warns Pharisees and Sadducees"
    };
  }

  if (/\bJohn\b|\bBaptist\b/i.test(text) && /\bpreach(?:ed|ing)?\b|\brepent\b/i.test(text)) {
    return {
      sceneType: "preaching",
      sceneTitle: "John preaching repentance"
    };
  }

  if (/\bJesus\b/i.test(text) && /\btaught\b|\bteaching\b|\bkingdom of heaven\b/i.test(text)) {
    return {
      sceneType: "teaching",
      sceneTitle: "JESUS teaching discourse"
    };
  }

  if (/\bprophet\b|\bfulfilled\b|\bit is written\b|\bspoken\b/i.test(text)) {
    return {
      sceneType: "prophecy",
      sceneTitle: "Prophecy and fulfillment context"
    };
  }

  if (/\bwilderness\b/i.test(text)) {
    return {
      sceneType: "wilderness",
      sceneTitle: "Wilderness setting"
    };
  }

  if (/\bJordan\b/i.test(text)) {
    return {
      sceneType: "Jordan",
      sceneTitle: "Jordan scene"
    };
  }

  return {
    sceneType: "narrative",
    sceneTitle: "Narrative scene"
  };
}

function sceneKeyForEvent(eventItem) {
  const classification = sceneClassificationForEvent(eventItem);
  return `${eventItem.sourceCaptureId || eventItem.sourceUrl || "unknown-source"}|${classification.sceneTitle}`;
}

function sceneKeyWithProximity(eventItem, scenesByKey) {
  const baseKey = sceneKeyForEvent(eventItem);
  const sequenceOrder = Number(eventItem.sequenceOrder || 0);
  const candidates = Array.from(scenesByKey.entries())
    .filter(([key]) => key === baseKey || key.startsWith(`${baseKey}|`))
    .sort((a, b) =>
      Number(b[1].sequenceEnd || 0) - Number(a[1].sequenceEnd || 0)
    );
  const existing = candidates[0]?.[1];

  if (!existing || sequenceOrder - Number(existing.sequenceEnd || 0) <= 3) {
    return candidates[0]?.[0] || baseKey;
  }

  return `${baseKey}|${sequenceOrder}`;
}

function actorNamesByEvent(actorTimelines) {
  const byEvent = new Map();

  for (const timeline of actorTimelines || []) {
    if (!timeline.actorName || timeline.actorName === "Unknown actor") continue;
    for (const action of timeline.orderedActions || []) {
      if (!action.sourceEventId) continue;
      if (!byEvent.has(action.sourceEventId)) byEvent.set(action.sourceEventId, new Set());
      byEvent.get(action.sourceEventId).add(timeline.actorName);
    }
  }

  return byEvent;
}

function sceneMatchesText(scene, text) {
  const haystack = normalizeWhitespace([
    scene.sceneTitle,
    scene.sceneType,
    scene.summarySnippet
  ].join(" ")).toLowerCase();
  const normalized = normalizeWhitespace(text).toLowerCase();

  if (!normalized) return false;
  return normalized.split(/\s+/).some((word) =>
    word.length > 4 && haystack.includes(word)
  );
}

function attachSceneRelatedData(scene, interactions, principleItems, prophecyLinks) {
  const sourceKey = scene.sourceCaptureId || "";
  const inRange = (item) =>
    (item.sourceCaptureId || "") === sourceKey &&
    Number(item.sequenceOrder || 0) >= scene.sequenceStart &&
    Number(item.sequenceOrder || 0) <= scene.sequenceEnd;

  const sceneInteractions = (interactions || []).filter(inRange);
  const witnessTypes = new Set(["witnessed proclamation", "witnessed manifestation"]);
  const directInteractions = sceneInteractions
    .filter((item) => !witnessTypes.has(item.interactionType));

  scene.interactions = directInteractions.map((item) => ({
      actorA: item.actorA,
      actorB: item.actorB,
      interactionType: item.interactionType,
      confidence: item.confidence
    }));
  scene.witnesses = sceneInteractions
    .filter((item) => witnessTypes.has(item.interactionType))
    .map((item) => {
      const actors = [item.actorA, item.actorB];
      const source = item.interactionType === "witnessed proclamation"
        ? actors.find((actor) => actor === "Father") || item.actorA
        : actors.find((actor) => actor === "Spirit of GOD" ||
            actor === "Angel of the Lord") || item.actorA;
      const witness = actors.find((actor) => actor !== source) || item.actorB;

      return {
        witness,
        source,
        interactionType: item.interactionType,
        confidence: item.confidence
      };
    });

  for (const interaction of directInteractions) {
    for (const actor of [interaction.actorA, interaction.actorB]) {
      if (actor && actor !== "Unknown actor") scene.participants.add(actor);
    }
  }

  scene.principles = (principleItems || [])
    .filter((item) =>
      (item.sourceCaptureId || "") === sourceKey &&
      sceneMatchesText(scene, item.principleText || item.contextSnippet || "")
    )
    .slice(0, 4)
    .map((item) => ({
      principleType: item.principleType || "unknown",
      principleText: trimText(item.principleText || item.contextSnippet || "", 160)
    }));

  scene.prophecyLinks = (prophecyLinks || [])
    .filter((item) =>
      (item.sourceCaptureId || "") === sourceKey &&
      (sceneMatchesText(scene, item.prophecyText || "") ||
        sceneMatchesText(scene, item.fulfillmentText || ""))
    )
    .slice(0, 3)
    .map((item) => ({
      linkType: item.linkType || "prophecy-fulfillment",
      confidence: item.confidence || "probable",
      prophecyText: trimText(item.prophecyText || "", 120),
      fulfillmentText: trimText(item.fulfillmentText || "", 120)
    }));

  scene.participants = Array.from(scene.participants).sort((a, b) =>
    a.localeCompare(b)
  );

  return scene;
}

function roleValue(actorName, confidence = "probable", reason = "") {
  if (!actorName) return null;
  return {
    actorName,
    confidence,
    reason
  };
}

function uniqueRoleList(items) {
  const seen = new Set();
  const unique = [];

  for (const item of items || []) {
    const actorName = item?.actorName || item?.witness || item;
    if (!actorName) continue;
    const key = normalizeWhitespace(actorName).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(typeof item === "string" ? roleValue(item) : item);
  }

  return unique;
}

function actorNameFromRole(role) {
  return role?.actorName || "";
}

function mostFrequentSceneActor(scene) {
  const counts = new Map();

  for (const actor of scene.eventActors || []) {
    if (!actor || actor === "Unknown actor") continue;
    counts.set(actor, (counts.get(actor) || 0) + 2);
  }

  for (const actor of scene.participants || []) {
    if (!actor || actor === "Unknown actor") continue;
    counts.set(actor, (counts.get(actor) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
}

function sceneHasActor(scene, actorName) {
  const participants = scene.participants instanceof Set
    ? Array.from(scene.participants)
    : scene.participants || [];

  return participants.some((actor) => actor === actorName);
}

function interactionHasActor(interaction, actorName) {
  return interaction.actorA === actorName || interaction.actorB === actorName;
}

function otherInteractionActor(interaction, actorName) {
  if (interaction.actorA === actorName) return interaction.actorB;
  if (interaction.actorB === actorName) return interaction.actorA;
  return "";
}

function preferredPrincipleFocus(scene) {
  const principles = scene.principles || [];
  const focused = principles.find((item) =>
    /\bfulfil(?:l)? all righteousness\b|\brighteousness\b|\bkingdom of heaven\b/i
      .test(item.principleText || "")
  ) || principles[0];

  if (!focused) return null;
  return {
    principleType: focused.principleType || "unknown",
    principleText: trimText(focused.principleText || "", 120),
    confidence: "probable"
  };
}

function deriveSceneRoles(scene) {
  const directInteractions = scene.interactions || [];
  const witnessItems = scene.witnesses || [];
  const secondaryActors = [];
  let primaryActor = roleValue(mostFrequentSceneActor(scene), "probable", "dominant scene actor");
  let speaker = null;
  let listener = null;
  let recipient = null;
  let target = null;
  let divineManifestation = null;
  let concerning = null;
  let sourceAuthority = null;
  let orchestrator = null;
  let authorityChain = [];
  let audience = [];

  const baptism = directInteractions.find((item) =>
    item.interactionType === "baptism"
  );
  const proclamation = directInteractions.find((item) =>
    item.interactionType === "divine proclamation"
  );
  const manifestation = directInteractions.find((item) =>
    item.interactionType === "divine manifestation"
  );
  const warning = directInteractions.find((item) =>
    item.interactionType === "warning"
  );
  const divineMessage = directInteractions.find((item) =>
    item.interactionType === "divine message"
  );

  if (divineMessage && interactionHasActor(divineMessage, "Angel of the Lord")) {
    const messageRecipient = otherInteractionActor(divineMessage, "Angel of the Lord");
    primaryActor = roleValue("Angel of the Lord", divineMessage.confidence || "explicit", "divine message actor");
    if (messageRecipient) {
      secondaryActors.push(roleValue(messageRecipient, divineMessage.confidence || "explicit", "message participant"));
      recipient = roleValue(messageRecipient, divineMessage.confidence || "explicit", "message recipient");
      target = roleValue(messageRecipient, divineMessage.confidence || "explicit", "message target");
      listener = roleValue(messageRecipient, divineMessage.confidence || "explicit", "message listener");
    }
    speaker = roleValue("Angel of the Lord", divineMessage.confidence || "explicit", "message speaker");
    if (/\btake unto thee Mary\b|\bMary thy wife\b/i.test(scene.summarySnippet || "")) {
      concerning = roleValue("Mary", "explicit", "instruction concerning");
    }
    sourceAuthority = roleValue("THE LORD", "inferred-source", "Angel of the Lord source authority");
    orchestrator = roleValue("THE LORD", "inferred-source", "higher-order authority for divine messenger");
    authorityChain = uniqueRoleList([
      sourceAuthority,
      roleValue("Angel of the Lord", divineMessage.confidence || "explicit", "direct messenger"),
      messageRecipient ? roleValue(messageRecipient, divineMessage.confidence || "explicit", "message recipient") : null
    ]);
  }

  if (scene.sceneType === "baptism" || baptism) {
    primaryActor = roleValue("JESUS", "explicit", "baptism scene focus");
    secondaryActors.push(roleValue("John the Baptist", "explicit", "baptism participant"));
    target = roleValue("JESUS", "explicit", "baptism recipient");
  }

  if (scene.sceneType === "divine manifestation" || proclamation || manifestation) {
    primaryActor = roleValue("JESUS", "inferred-source", "divine manifestation target");
    secondaryActors.push(roleValue("John the Baptist", "probable", "nearby baptism participant"));
  }

  if (proclamation) {
    speaker = roleValue("Father", proclamation.confidence || "inferred-source", "voice from heaven");
    recipient = roleValue("JESUS", proclamation.confidence || "inferred-source", "beloved Son addressed");
    target = roleValue("JESUS", proclamation.confidence || "inferred-source", "proclamation target");
  }

  if (manifestation) {
    divineManifestation = roleValue(
      "Spirit of GOD",
      manifestation.confidence || "probable",
      "Spirit descending manifestation"
    );
  }

  if (warning || scene.sceneType === "warning") {
    primaryActor = roleValue("John the Baptist", "probable", "warning speaker");
    speaker = speaker || roleValue("John the Baptist", "probable", "warning speaker");
    listener = roleValue("Pharisees and Sadducees", "probable", "warning audience");
    target = target || roleValue("Pharisees and Sadducees", "probable", "warning target");
  }

  if (scene.sceneType === "preaching") {
    primaryActor = roleValue("John the Baptist", "probable", "preaching scene subject");
    speaker = speaker || roleValue("John the Baptist", "probable", "preacher");
    if (sceneHasActor(scene, "People / multitudes")) {
      audience.push(roleValue("People / multitudes", "probable", "public preaching audience"));
    }
  }

  for (const interaction of directInteractions) {
    if (interaction.interactionType === "said" || interaction.interactionType === "answered") {
      speaker = speaker || roleValue(interaction.actorA, interaction.confidence || "probable", "speech interaction");
      listener = listener || roleValue(interaction.actorB, interaction.confidence || "probable", "speech listener");
    }

    if (primaryActor && interactionHasActor(interaction, actorNameFromRole(primaryActor))) {
      const otherActor = otherInteractionActor(interaction, actorNameFromRole(primaryActor));
      if (otherActor) {
        secondaryActors.push(roleValue(
          otherActor,
          interaction.confidence || "probable",
          `${interaction.interactionType || "interaction"} participant`
        ));
      }
    }
  }

  const witness = uniqueRoleList(witnessItems.map((item) =>
    roleValue(item.witness, item.confidence || "possible", item.interactionType)
  ));
  audience = uniqueRoleList([
    ...audience,
    ...witness
      .filter((item) => item.actorName === "People / multitudes")
      .map((item) => roleValue(item.actorName, item.confidence, "witnessed audience"))
  ]);

  const primaryName = actorNameFromRole(primaryActor);
  const secondary = uniqueRoleList(secondaryActors)
    .filter((item) => item.actorName !== primaryName);

  return {
    primaryActor,
    secondaryActors: secondary,
    speaker,
    listener,
    recipient,
    target,
    witness,
    audience,
    divineManifestation,
    concerning,
    sourceAuthority,
    orchestrator,
    authorityChain,
    principleFocus: preferredPrincipleFocus(scene)
  };
}

function createSceneModels(orderedEvents, actorTimelines, interactions, principleItems, prophecyLinks) {
  const actorByEvent = actorNamesByEvent(actorTimelines);
  const scenesByKey = new Map();

  for (const eventItem of orderedEvents || []) {
    if (isSummaryLikeEvent(eventItem)) continue;

    const classification = sceneClassificationForEvent(eventItem);
    const key = sceneKeyWithProximity(eventItem, scenesByKey);
    const existing = scenesByKey.get(key);
    const sourceCaptureId = eventItem.sourceCaptureId || "";
    const sequenceOrder = Number(eventItem.sequenceOrder || 0);
    const eventActors = actorByEvent.get(eventItem.id || "") || new Set();
    const mentionedActors = mentionedActorsForEvent(eventItem);

    const scene = existing || {
      id: `${Date.now()}-${textHash(key)}`,
      sourceCaptureId,
      sourceContext: eventItem.sourceContext,
      sceneTitle: classification.sceneTitle,
      sceneType: classification.sceneType,
      sequenceStart: sequenceOrder,
      sequenceEnd: sequenceOrder,
      participants: new Set(),
      witnesses: [],
      interactions: [],
      principles: [],
      prophecyLinks: [],
      summarySnippet: "",
      confidence: classification.sceneType === "narrative" ? "possible" : "probable",
      eventActors: [],
      eventTexts: []
    };

    scene.sequenceStart = Math.min(scene.sequenceStart || sequenceOrder, sequenceOrder);
    scene.sequenceEnd = Math.max(scene.sequenceEnd || sequenceOrder, sequenceOrder);
    scene.eventTexts.push(eventItem.eventText || "");
    scene.summarySnippet = trimText(scene.eventTexts.join(" "), 240);

    for (const actor of eventActors) scene.participants.add(actor);
    for (const actor of mentionedActors) scene.participants.add(actor);
    scene.eventActors.push(...eventActors);

    scenesByKey.set(key, scene);
  }

  // Future: original-language ambiguity, scene-level source metadata,
  // public/private scene classification, cross-document scene comparison, and
  // conference-talk reference linking should enrich this scene layer without
  // moving heavy analysis into the popup. Authority/source chains should keep
  // direct actors, messengers, recipients, and orchestrators distinct instead
  // of collapsing divine messengers into GOD/THE LORD. Future Semantic Tree / Semantic
  // Markup can wrap these role assignments as paths such as G.C.S(JESUS said
  // unto John), C.A.L(John baptized JESUS at Jordan), G.W.P(FATHER proclaimed
  // JESUS), and D.P("fulfil all righteousness").
  return Array.from(scenesByKey.values())
    .map((scene) => attachSceneRelatedData(
      scene,
      interactions,
      principleItems,
      prophecyLinks
    ))
    .map((scene) => ({
      ...scene,
      ...deriveSceneRoles(scene)
    }))
    .map(({ eventActors, eventTexts, ...scene }) => scene)
    .sort((a, b) =>
      Number(a.sequenceStart || 0) - Number(b.sequenceStart || 0) ||
      a.sceneTitle.localeCompare(b.sceneTitle)
    );
}

function createEntityRoleItem(sourceContext, roleGroup, entityName, confidence = "probable", evidence = "", metadata = {}) {
  const normalizedName = normalizeWhitespace(entityName || "");
  if (!normalizedName) return null;
  const context = sourceContext || {};
  const key = [
    context.sourceCaptureId || "",
    roleGroup,
    normalizedName.toLowerCase(),
    evidence
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: context.sourceCaptureId || "",
    sourceTitle: context.sourceTitle || "",
    sourceUrl: context.sourceUrl || "",
    sourceContext: context,
    roleGroup,
    entityName: normalizedName,
    confidence,
    evidence: trimText(evidence, 160),
    actorReason: metadata.actorReason || "",
    semanticEventReference: metadata.semanticEventReference || "",
    eventType: metadata.eventType || "",
    anchorText: metadata.anchorText || ""
  };
}

function addEntityRoleItem(items, seen, sourceContext, roleGroup, entityName, confidence, evidence, metadata = {}) {
  const item = createEntityRoleItem(sourceContext, roleGroup, entityName, confidence, evidence, metadata);
  if (!item) return;
  const key = [
    item.sourceCaptureId,
    item.roleGroup,
    item.entityName.toLowerCase()
  ].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  items.push(item);
}

function addRoleFromRoleValue(items, seen, sourceContext, roleGroup, role, fallbackConfidence = "probable", evidence = "") {
  const actorName = typeof role === "string" ? role : role?.actorName;
  if (!actorName) return;
  addEntityRoleItem(
    items,
    seen,
    sourceContext,
    roleGroup,
    actorName,
    role?.confidence || fallbackConfidence,
    evidence || role?.reason || ""
  );
}

function createLineageSemanticEvent(eventItem, pair, pairIndex) {
  const sourceCaptureId = eventItem.sourceCaptureId || "";
  const parent = pair.parent || "";
  const child = pair.child || "";
  const key = [sourceCaptureId, eventItem.sequenceIndex ?? "", pairIndex, parent, child, "lineage_birth"].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId,
    sourceTitle: eventItem.sourceTitle || "",
    sourceUrl: eventItem.sourceUrl || "",
    sourceContext: eventItem.sourceContext,
    sequenceOrder: Number(eventItem.sequenceIndex ?? 0) + (pairIndex + 1) / 100,
    verseNumber: inferVerseNumberFromText(eventItem.eventText || ""),
    sentenceIndex: eventItem.sequenceIndex,
    anchorText: `${parent} begat ${child}`,
    phraseStartHint: anchorHintsForPhrase(eventItem.eventText || "", `${parent} begat ${child}`).phraseStartHint,
    phraseEndHint: anchorHintsForPhrase(eventItem.eventText || "", `${parent} begat ${child}`).phraseEndHint,
    anchorConfidence: anchorHintsForPhrase(eventItem.eventText || "", `${parent} begat ${child}`).anchorConfidence,
    eventType: "lineage_birth",
    semanticCategory: "lineage",
    actor: parent,
    action: "begat",
    target: child,
    recipient: "",
    concerning: "",
    participants: [parent, child].filter(Boolean),
    relationshipType: "father_son",
    authorityChain: [],
    sourceSnippet: trimText(eventItem.eventText || "", 260),
    normalizedMeaning: `${parent} begat ${child}`,
    confidence: pair.confidence || "explicit"
  };
}

function semanticEventDedupKey(item) {
  return [
    item.sourceCaptureId || item.sourceUrl || item.sourceTitle || "",
    item.eventType || "",
    item.semanticCategory || "",
    item.actor || "",
    item.action || "",
    item.target || "",
    normalizeWhitespace(item.anchorText || "").toLowerCase(),
    normalizeWhitespace(item.normalizedMeaning || item.sourceSnippet || "").toLowerCase()
  ].join("|");
}

function clusterPartFromEvent(eventItem) {
  const eventType = eventItem.eventType || "semantic_event";
  const clusterTypeByEvent = {
    instruction_concerning_person: "marriage_instruction",
    conception_revelation: "conception_revelation",
    name_revelation: "revealed_name_instruction",
    mission_reason_declaration: "mission_declaration",
    protective_instruction_revelation: "protection_instruction",
    divine_warning_revelation: "warning_redirection",
    protective_obedient_response: "protective_obedient_response"
  };

  return {
    semanticEventId: eventItem.id || "",
    clusterType: clusterTypeByEvent[eventType] || eventType,
    eventType,
    actor: eventItem.actor || eventItem.narrator || "",
    action: eventItem.action || "",
    target: eventItem.target || eventItem.recipient || eventItem.concerning || "",
    anchorText: eventItem.anchorText || eventItem.sourceSnippet || "",
    scopePath: eventItem.scopePath || "",
    verseRef: eventItem.verseRef || "",
    confidence: eventItem.confidence || "probable"
  };
}

function createDivineMessageClusters(semanticEvents) {
  const clusterTypes = new Set([
    "instruction_concerning_person",
    "conception_revelation",
    "name_revelation",
    "mission_reason_declaration",
    "protective_instruction_revelation",
    "divine_warning_revelation",
    "protective_obedient_response"
  ]);
  const grouped = new Map();

  for (const eventItem of semanticEvents || []) {
    if (!clusterTypes.has(eventItem.eventType || "")) continue;
    const key = [
      eventItem.sourceCaptureId || eventItem.sourceContext?.sourceCaptureId || "",
      eventItem.actor || "",
      eventItem.recipient || ""
    ].join("|");
    grouped.set(key, [...(grouped.get(key) || []), eventItem]);
  }

  const clusters = [];
  for (const [key, events] of grouped.entries()) {
    const uniqueTypes = new Set(events.map((item) => item.eventType));
    const allowsSingleEventCluster = events.some((item) => ["protective_instruction_revelation", "divine_warning_revelation"].includes(item.eventType || ""));
    if ((!allowsSingleEventCluster && events.length < 2) || (!allowsSingleEventCluster && uniqueTypes.size < 2)) continue;
    const clusterOrder = {
      instruction_concerning_person: 1,
      conception_revelation: 2,
      name_revelation: 3,
      mission_reason_declaration: 4,
      divine_warning_revelation: 1,
      protective_instruction_revelation: 2,
      protective_obedient_response: 3
    };
    const ordered = [...events].sort((left, right) =>
      (clusterOrder[left.eventType] || 99) - (clusterOrder[right.eventType] || 99) ||
      Number(left.phraseStartHint ?? left.sequenceOrder ?? 0) - Number(right.phraseStartHint ?? right.sequenceOrder ?? 0)
    );
    const sourceContext = ordered.find((item) => item.sourceContext)?.sourceContext || {};
    const sourceSnippet = ordered.map((item) => item.anchorText || item.sourceSnippet || "").filter(Boolean).join(" | ");
    const scopePath = ordered.find((item) => item.scopePath)?.scopePath || "";
    const verseRef = ordered.find((item) => item.verseRef)?.verseRef || "";

    clusters.push({
      id: `${Date.now()}-${textHash(`divine-message-cluster|${key}|${ordered.map((item) => item.id).join("|")}`)}`,
      sourceCaptureId: ordered[0]?.sourceCaptureId || "",
      sourceContext,
      originalText: "divine message cluster",
      anchorText: trimText(sourceSnippet, 220),
      normalizedMeaning: "AngEL Of THE LORD message contains multiple linked instructions/revelations",
      actor: ordered[0]?.actor || "",
      action: "grouped instruction/revelation",
      recipient: ordered[0]?.recipient || "",
      target: ordered.map((item) => item.target || item.concerning || item.recipient || "").filter(Boolean).join("; "),
      participants: Array.from(new Set(ordered.flatMap((item) => item.participants || []).filter(Boolean))),
      relationshipType: "divine_message_cluster",
      eventType: "divine_message_cluster",
      semanticCategory: "multi_instruction_revelation",
      confidence: ordered.every((item) => item.confidence === "explicit") ? "explicit" : "probable",
      sourceSnippet,
      scopePath,
      verseRef,
      subEvents: ordered.map(clusterPartFromEvent),
      sourceEventIds: ordered.map((item) => item.id).filter(Boolean),
      sourceGrounding: "derived from existing semantic sub-events in the same source message"
    });
  }

  return clusters;
}
function createSemanticEvents(eventItems, orderedEvents) {
  const sequenceByEventId = new Map(
    (orderedEvents || []).map((item) => [item.id, item.sequenceOrder])
  );
  const semanticEvents = [];
  const seen = new Set();

  const push = (item) => {
    if (!item) return;
    const key = semanticEventDedupKey(item);
    if (seen.has(key)) return;
    seen.add(key);
    semanticEvents.push(item);
  };

  for (const eventItem of eventItems || []) {
    if (eventItem.eventType === "source_summary" || isSourceSummarySentence(eventItem.eventText || "", eventItem.sequenceIndex)) {
      continue;
    }

    if (eventItem.eventType === "lineage_record") {
      (eventItem.lineagePairs || []).forEach((pair, index) => {
        push(createLineageSemanticEvent(eventItem, pair, index));
      });
      continue;
    }

    for (const subEvent of eventItem.subEvents || []) {
      push({
        ...subEvent,
        sourceContext: subEvent.sourceContext || eventItem.sourceContext,
        sequenceOrder: sequenceByEventId.get(eventItem.id) || Number(eventItem.sequenceIndex || 0) + 1,
        sourceSnippet: subEvent.sourceSnippet || trimText(eventItem.eventText || "", 260)
      });
    }
  }

  for (const cluster of createDivineMessageClusters(semanticEvents)) {
    push(cluster);
  }

  // ICE_SEMANTIC_EVENTS is intentionally a current-page derived index for now.
  // Future architecture can scale this sourceContext-aware shape across Bible,
  // conference talks, sermons, interfaith corpora, relationship graphs,
  // doctrine graphs, and query layers without making the popup do heavy corpus
  // work. Comparative layers should preserve tradition-specific differences
  // instead of forcing flattened doctrinal conclusions.
  return semanticEvents.sort((a, b) => Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0));
}
function semanticFlowNode(eventItem) {
  return {
    semanticEventId: eventItem.id || "",
    actor: eventItem.actor || eventItem.narrator || "",
    action: eventItem.action || "",
    target: eventItem.target || eventItem.recipient || eventItem.concerning || "",
    eventType: eventItem.eventType || "semantic_event",
    anchorText: eventItem.anchorText || eventItem.sourceSnippet || "",
    verseNumber: eventItem.verseNumber || "",
    confidence: eventItem.confidence || "probable"
  };
}

function semanticFlowRelationship(fromEvent, toEvent, relationType, confidence = "probable") {
  if (!fromEvent || !toEvent) return null;
  return {
    fromEventId: fromEvent.id || "",
    toEventId: toEvent.id || "",
    relationType,
    confidence,
    evidenceSnippet: trimText([
      fromEvent.anchorText || fromEvent.sourceSnippet || "",
      toEvent.anchorText || toEvent.sourceSnippet || ""
    ].filter(Boolean).join(" -> "), 220)
  };
}

function findSemanticEvent(events, eventTypes) {
  return (events || []).find((item) => eventTypes.includes(item.eventType));
}

function createSemanticFlowChains(semanticEvents, sceneModels, interactions, entityRoleItems, prophecyLinks) {
  const grouped = new Map();
  for (const item of semanticEvents || []) {
    const key = item.sourceCaptureId || item.sourceUrl || item.sourceTitle || "unknown-source";
    grouped.set(key, [...(grouped.get(key) || []), item]);
  }

  const chains = [];
  for (const [sourceKey, sourceEvents] of grouped.entries()) {
    const ordered = [...sourceEvents].sort((a, b) => Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0));
    const appearance = findSemanticEvent(ordered, ["divine_messenger_appearance"]);
    const speech = findSemanticEvent(ordered, ["divine_message_speech"]);
    const instruction = findSemanticEvent(ordered, ["instruction_concerning_person"]);
    const conception = findSemanticEvent(ordered, ["conception_revelation"]);
    const nameRevelation = findSemanticEvent(ordered, ["name_revelation"]);
    const missionReason = findSemanticEvent(ordered, ["mission_reason_declaration"]);
    const covenant = findSemanticEvent(ordered, ["covenant_family_union"]);
    const birth = findSemanticEvent(ordered, ["birth_event"]);
    const naming = findSemanticEvent(ordered, ["naming_event"]);
    const fulfillment = findSemanticEvent(ordered, ["passive_fulfillment_narration"]);
    const nodes = [appearance, speech, instruction, conception, nameRevelation, missionReason, covenant, birth, naming, fulfillment]
      .filter(Boolean);

    if (nodes.length < 2) continue;

    const relationships = [
      semanticFlowRelationship(appearance, speech || instruction, "authority_delegates_message", "inferred-source"),
      semanticFlowRelationship(speech, instruction, "message_instructs_recipient", "explicit"),
      semanticFlowRelationship(speech, conception, "message_reveals_conception", "explicit"),
      semanticFlowRelationship(conception, nameRevelation, "conception_revelation_precedes_name_revelation", "explicit"),
      semanticFlowRelationship(speech, nameRevelation, "message_reveals_name", "explicit"),
      semanticFlowRelationship(nameRevelation, missionReason, "name_reveals_mission_reason", "explicit"),
      semanticFlowRelationship(instruction, covenant, "recipient_obeys_instruction", "probable"),
      semanticFlowRelationship(instruction, covenant, "instruction_concerns_person", "explicit"),
      semanticFlowRelationship(covenant, birth, "covenant_union_occurs", "probable"),
      semanticFlowRelationship(birth, naming, "name_given", "explicit"),
      semanticFlowRelationship(naming || birth || covenant, fulfillment, "fulfillment_identified_by_narrator", "explicit")
    ].filter(Boolean);

    const authorityChain = appearance?.authorityChain?.length
      ? appearance.authorityChain
      : instruction?.authorityChain || [];
    const sequenceValues = nodes
      .map((node) => Number(node.sequenceOrder || 0))
      .filter((value) => Number.isFinite(value));
    const sourceContext = nodes.find((node) => node.sourceContext)?.sourceContext || {};
    const key = [sourceKey, "authority-message-response-fulfillment", nodes.map((node) => node.id).join("|")].join("|");

    chains.push({
      id: `${Date.now()}-${textHash(key)}`,
      sourceCaptureId: nodes[0]?.sourceCaptureId || "",
      sourceContext,
      chainType: "authority-message-response-fulfillment",
      chainTitle: "THE LORD -> Angel of THE LORD -> Joseph response -> fulfillment",
      sequenceStart: sequenceValues.length ? Math.min(...sequenceValues) : null,
      sequenceEnd: sequenceValues.length ? Math.max(...sequenceValues) : null,
      nodes: nodes.map(semanticFlowNode),
      relationships,
      authorityChain,
      summary: "THE LORD acts through Angel of THE LORD; Joseph receives instruction, takes Mary as wife, Mary brings forth a son, Joseph names Him JESUS, and the narrator identifies fulfillment.",
      confidence: relationships.some((item) => item.confidence === "inferred-source") ? "inferred-source" : "probable"
    });
  }

  // Current-page semantic flow chains are a compact bridge toward graph views.
  // Future graph visualization can connect authority, message, instruction,
  // response, fulfillment, lineage, doctrine, and source-grounded evidence
  // without creating false direct interactions such as JESUS -> Joseph in
  // Matthew 1, where JESUS is named child/result rather than message authority.
  return chains;
}
function directActorReasonFromSemanticEvents(actorName, semanticEvents) {
  const normalizedActor = normalizeWhitespace(actorName || "").toLowerCase();
  const meaningfulEvents = (semanticEvents || [])
    .filter((item) => normalizeWhitespace(item.actor || "").toLowerCase() === normalizedActor)
    .filter((item) => !["lineage_birth"].includes(item.eventType || ""));
  const preferredOrder = [
    "divine_messenger_appearance",
    "divine_message_speech",
    "instruction_concerning_person",
    "conception_revelation",
    "name_revelation",
    "mission_reason_declaration",
    "passive_fulfillment_narration",
    "covenant_family_union",
    "naming_event",
    "birth_event"
  ];

  const sorted = meaningfulEvents.sort((left, right) =>
    (preferredOrder.indexOf(left.eventType) === -1 ? 99 : preferredOrder.indexOf(left.eventType)) -
    (preferredOrder.indexOf(right.eventType) === -1 ? 99 : preferredOrder.indexOf(right.eventType)) ||
    Number(left.sequenceOrder || 0) - Number(right.sequenceOrder || 0)
  );
  const event = sorted[0];
  if (!event) return null;

  let actorReason = event.action || event.normalizedMeaning || event.eventType || "semantic action";
  if (/angel of the lord/i.test(actorName || "")) {
    actorReason = Array.from(new Set(sorted
      .filter((item) => [
        "divine_messenger_appearance",
        "divine_message_speech",
        "instruction_concerning_person",
        "conception_revelation",
        "name_revelation",
        "mission_reason_declaration"
      ].includes(item.eventType || ""))
      .map((item) => item.action)
      .filter(Boolean)))
      .slice(0, 3)
      .join(" / ") || actorReason;
  } else if (event.eventType === "covenant_family_union") {
    actorReason = "took / accepted Mary as wife";
    if (/take unto thee Mary thy wife/i.test(event.anchorText || "")) {
      const explicitCovenant = sorted.find((item) =>
        item.eventType === "covenant_family_union" &&
        /and took unto him his wife|took unto him his wife/i.test(item.anchorText || "")
      );
      if (explicitCovenant) event.anchorText = explicitCovenant.anchorText;
    }
  } else if (event.eventType === "passive_fulfillment_narration") {
    actorReason = "narrates fulfillment";
  }

  return {
    actorReason,
    semanticEventReference: event.id || "",
    eventType: event.eventType || "",
    anchorText: event.anchorText || ""
  };
}
function createEntityRoleItems(captures, eventItems, actorTimelines, sceneModels, semanticEvents = []) {
  const items = [];
  const seen = new Set();
  const fallbackContext = buildSourceContext(captures.find((capture) => capture?.text) || {});

  for (const actor of actorTimelines || []) {
    if (!actor.actorName || actor.actorName === "Unknown actor") continue;
    const directReason = directActorReasonFromSemanticEvents(actor.actorName, semanticEvents);
    addEntityRoleItem(
      items,
      seen,
      actor.sourceContexts?.[0] || fallbackContext,
      "Semantic Entities",
      actor.actorName,
      "explicit",
      directReason?.actorReason || "direct actor timeline",
      directReason || {}
    );
  }

  for (const scene of sceneModels || []) {
    const context = scene.sourceContext || fallbackContext;
    addRoleFromRoleValue(items, seen, context, "Semantic Entities", scene.sourceAuthority, "inferred-source", "origin authority entity presence");
    addRoleFromRoleValue(items, seen, context, "Semantic Entities", scene.orchestrator, "inferred-source", "orchestrating authority entity presence");
    for (const role of scene.authorityChain || []) {
      addRoleFromRoleValue(items, seen, context, "Semantic Entities", role, role.confidence || "probable", "authority path entity presence");
    }
    addRoleFromRoleValue(items, seen, context, "Source Authorities", scene.sourceAuthority, "inferred-source");
    addRoleFromRoleValue(items, seen, context, "Source Authorities", scene.orchestrator, "inferred-source");
    addRoleFromRoleValue(items, seen, context, "Recipients / Targets", scene.recipient, "explicit");
    addRoleFromRoleValue(items, seen, context, "Recipients / Targets", scene.target, "explicit");
    addRoleFromRoleValue(items, seen, context, "Recipients / Targets", scene.listener, "explicit");
    addRoleFromRoleValue(items, seen, context, "Instruction Concerning", scene.concerning, "explicit");

    for (const name of scene.participants || []) {
      addEntityRoleItem(items, seen, context, "Participants", name, scene.confidence || "probable", scene.sceneTitle || "scene participant");
    }

    for (const role of [scene.primaryActor, scene.divineManifestation, ...(scene.authorityChain || [])]) {
      if (/\b(JESUS|CHRIST|GOD|LORD|Father|Spirit)\b/i.test(role?.actorName || "")) {
        addRoleFromRoleValue(items, seen, context, "Divine / Glorified Entities", role, "probable");
      }
    }
  }

  for (const capture of captures || []) {
    const captureText = normalizeWhitespace(capture?.text || "");
    const context = buildSourceContext(capture || {});
    if (context.traditionalAuthor) {
      addEntityRoleItem(
        items,
        seen,
        context,
        "Source Metadata Entities",
        context.traditionalAuthor,
        context.authorConfidence || "traditional-attribution",
        "believed author",
        {
          actorReason: "believed author",
          eventType: "source_metadata",
          anchorText: context.authorBasis || "book/source metadata"
        }
      );
    }

    if (/\b(?:the\s+)?angel of (?:THE LORD|the Lord)\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Semantic Entities", "THE LORD", "probable", "authority source present through AngEL Of THE LORD", {
        actorReason: "origin authority present through messenger path",
        eventType: "authority_path",
        anchorText: "angel of THE LORD"
      });
      addEntityRoleItem(items, seen, context, "Semantic Entities", "AngEL Of THE LORD", "explicit", "messenger / authority-transfer role", {
        actorReason: "messenger / authority-transfer role",
        eventType: "authority_path",
        anchorText: "angel of THE LORD"
      });
    }
    if (/\bGod\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Semantic Entities", "GOD", "explicit", "source identity presence", {
        actorReason: "source identity presence",
        eventType: "source_identity",
        anchorText: "God"
      });
    }
    if (/\bJesus Christ\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Divine / Glorified Entities", "JESUS CHRIST", "explicit", "captured divine title");
    } else if (/\bJesus\b|\bChrist\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Divine / Glorified Entities", "JESUS", "explicit", "captured divine title");
    }
    if (/\bTHE LORD\b|\bthe Lord\b|\bLord\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Divine / Glorified Entities", "THE LORD", "probable", "captured divine title");
    }
    if (/\bMary\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Participants", "Mary", "probable", "captured person mention");
    }
    if (/\bJoseph\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Recipients / Targets", "Joseph", "probable", "captured person mention");
    }
    if (/\bfear not to take unto thee Mary\b|\btake unto thee Mary\b|\bMary thy wife\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Instruction Recipients", "Joseph", "explicit", "fear not to take unto thee Mary thy wife");
      addEntityRoleItem(items, seen, context, "Instruction Concerning", "Mary", "explicit", "fear not to take unto thee Mary thy wife");
      addEntityRoleItem(
        items,
        seen,
        context,
        "Covenant / Family Participants",
        "Mary",
        "explicit",
        "Mary thy wife",
        {
          actorReason: "concerning: Mary thy wife; covenant relation: wife",
          eventType: "covenant_family_union",
          anchorText: "Mary thy wife"
        }
      );
      const josephCovenantPhrase = /\btook unto him his wife\b/i.test(captureText)
        ? "instruction: take unto thee Mary thy wife; response: and took unto him his wife"
        : "instruction: take unto thee Mary thy wife";
      addEntityRoleItem(
        items,
        seen,
        context,
        "Covenant / Family Participants",
        "Joseph",
        "probable",
        josephCovenantPhrase,
        {
          actorReason: josephCovenantPhrase,
          eventType: "covenant_family_union",
          anchorText: /\btook unto him his wife\b/i.test(captureText) ? "and took unto him his wife" : "take unto thee Mary thy wife"
        }
      );
    }
    if (/\bMary\b/i.test(captureText) && /\bmother\b|\bwife\b|\bespoused\b|\btake unto thee\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Covenant / Family Participants", "Mary", "probable", "family/covenant context");
    }
    if (/\bJesus Christ\b/i.test(captureText) && /\bgeneration\b|\bbegat\b|\bson of David\b|\bson of Abraham\b/i.test(captureText)) {
      addEntityRoleItem(items, seen, context, "Lineage Focus", "JESUS CHRIST", "explicit", "generation of JESUS CHRIST");
    }
  }

  for (const item of eventItems || []) {
    if (item.eventType !== "lineage_record") continue;
    for (const name of item.lineagePersons || []) {
      addEntityRoleItem(items, seen, item.sourceContext || fallbackContext, "Lineage Persons", name, "explicit", "begat lineage record");
    }
  }

  // Entity role records are a lightweight bridge toward a semantic entity
  // registry, lineage graph, family tree view, fulfillment/revelation lineage
  // context, covenant lineage, and source-authority chain views. They should
  // not turn every entity into a direct actor timeline owner.
  return items;
}
function canonicalEntityName(name) {
  const clean = normalizeWhitespace(name || "");
  const normalized = clean.toLowerCase();
  const aliases = new Map([
    ["the lord", "THE LORD"],
    ["lord", "THE LORD"],
    ["angel of the lord", "Angel of THE LORD"],
    ["jesus", "JESUS CHRIST"],
    ["christ", "JESUS CHRIST"],
    ["jesus christ", "JESUS CHRIST"],
    ["scripture narrator", "scripture narrator"],
    ["quoted prophet", "quoted prophet"]
  ]);

  return aliases.get(normalized) || clean;
}

function entityRoleTypeFromGroup(roleGroup) {
  const normalized = normalizeWhitespace(roleGroup || "").toLowerCase();
  const map = new Map([
    ["semantic entities", "semanticEntity"],
    ["direct actors", "semanticEntity"],
    ["source authorities", "sourceAuthority"],
    ["recipients / targets", "recipient"],
    ["instruction recipients", "instructionRecipient"],
    ["instruction concerning", "instructionConcerning"],
    ["covenant / family participants", "covenantFamilyParticipant"],
    ["participants", "participant"],
    ["divine / glorified entities", "divineGlorifiedEntity"],
    ["lineage focus", "lineageFocus"],
    ["source metadata entities", "sourceMetadata"],
    ["lineage persons", "lineagePerson"]
  ]);

  return map.get(normalized) || normalized.replace(/\s+/g, "_") || "mentioned";
}

function inferEntityType(name, roleTypes = []) {
  const canonical = canonicalEntityName(name);
  const roleSet = new Set(roleTypes || []);

  if (canonical === "THE LORD") return "divine_authority";
  if (canonical === "Angel of THE LORD") return "divine_messenger";
  if (canonical === "JESUS CHRIST" || canonical === "JESUS") return "divine";
  if (/narrator/i.test(canonical)) return "narrator";
  if (roleSet.has("traditionalAuthor")) return "traditional_author";
  if (roleSet.has("sourceMetadata")) return "source_author";
  if (roleSet.has("lineagePerson") && !["Joseph", "Mary"].includes(canonical)) return "lineage_person";
  if (["Joseph", "Mary"].includes(canonical)) return "human";
  if (roleSet.has("sourceAuthority")) return "source_authority";
  return "entity";
}

function createEmptyEntityRecord(name, sourceContext = {}) {
  const canonicalName = canonicalEntityName(name);
  const key = canonicalName.toLowerCase();
  return {
    id: `${Date.now()}-${textHash(key)}`,
    canonicalName,
    displayName: canonicalName,
    entityType: "entity",
    roleTypes: [],
    aliases: [],
    sourceCaptureIds: [],
    sourceContexts: [],
    mentions: [],
    relationships: [],
    confidence: "probable"
  };
}

function addUniqueValue(list, value, keyFn = (item) => item) {
  if (!value) return;
  const key = keyFn(value);
  if (list.some((item) => keyFn(item) === key)) return;
  list.push(value);
}

function registryRecordFor(registry, name, sourceContext = {}) {
  const canonicalName = canonicalEntityName(name);
  if (!canonicalName) return null;
  const key = canonicalName.toLowerCase();
  if (!registry.has(key)) registry.set(key, createEmptyEntityRecord(canonicalName, sourceContext));
  const record = registry.get(key);
  if (name && name !== canonicalName) addUniqueValue(record.aliases, name);
  if (sourceContext?.sourceCaptureId) addUniqueValue(record.sourceCaptureIds, sourceContext.sourceCaptureId);
  if (sourceContext?.sourceCaptureId || sourceContext?.sourceUrl) {
    addUniqueValue(record.sourceContexts, sourceContext, (item) => [
      item.sourceCaptureId || "",
      item.sourceUrl || "",
      item.book || "",
      item.chapter || ""
    ].join("|"));
  }
  return record;
}

function addEntityMention(record, mention) {
  addUniqueValue(record.mentions, mention, (item) => [
    item.sourceCaptureId || "",
    item.roleType || "",
    item.semanticEventId || "",
    item.anchorText || item.evidence || ""
  ].join("|"));
}

function addEntityRelationship(record, relationship) {
  addUniqueValue(record.relationships, relationship, (item) => [
    item.relationshipType || "",
    item.target || "",
    item.sourceEventId || "",
    item.evidence || ""
  ].join("|"));
}

function addRoleType(record, roleType) {
  addUniqueValue(record.roleTypes, roleType);
}

function createEntityRegistry(entityRoleItems, semanticEvents, semanticFlowChains, interactions, sceneModels) {
  const registry = new Map();

  for (const item of entityRoleItems || []) {
    const record = registryRecordFor(registry, item.entityName, item.sourceContext || {});
    if (!record) continue;
    const roleType = entityRoleTypeFromGroup(item.roleGroup);
    addRoleType(record, roleType);
    addEntityMention(record, {
      sourceCaptureId: item.sourceCaptureId || "",
      roleType,
      evidence: item.evidence || item.actorReason || "",
      anchorText: item.anchorText || "",
      semanticEventId: item.semanticEventReference || "",
      confidence: item.confidence || "probable"
    });
    if (roleType === "sourceMetadata" && item.confidence === "traditional-attribution") {
      addRoleType(record, "traditionalAuthor");
      record.confidence = "traditional-attribution";
      addEntityRelationship(record, {
        relationshipType: "traditional_attribution",
        target: item.sourceContext?.book ? `Book: ${item.sourceContext.book}` : item.sourceTitle || "source",
        sourceEventId: item.id || "",
        evidence: item.evidence || item.sourceContext?.authorBasis || "book/source metadata",
        confidence: item.confidence
      });
    }
    if (item.confidence === "explicit") record.confidence = "explicit";
  }

  for (const event of semanticEvents || []) {
    const participants = [event.actor, event.target, event.recipient, event.concerning, ...(event.participants || [])]
      .filter(Boolean);
    for (const name of participants) {
      const record = registryRecordFor(registry, name, event.sourceContext || {});
      if (!record) continue;
      if (name === event.actor) addRoleType(record, "semanticActor");
      if (name === event.target) addRoleType(record, "semanticTarget");
      if (name === event.recipient) addRoleType(record, "recipient");
      if (name === event.concerning) addRoleType(record, "concerningEntity");
      if (event.eventType === "lineage_birth") {
        addRoleType(record, name === event.actor ? "lineageAncestor" : "lineageDescendant");
      }
      if (event.eventType === "naming_event" && name === event.target) addRoleType(record, "namedChild");
      addEntityMention(record, {
        sourceCaptureId: event.sourceCaptureId || "",
        roleType: name === event.actor ? "semanticActor" : "semanticParticipant",
        evidence: event.normalizedMeaning || event.eventType || "semantic event",
        anchorText: event.anchorText || "",
        semanticEventId: event.id || "",
        confidence: event.confidence || "probable"
      });
    }

    if (event.actor && (event.target || event.recipient || event.concerning)) {
      const actorRecord = registryRecordFor(registry, event.actor, event.sourceContext || {});
      const target = canonicalEntityName(event.target || event.recipient || event.concerning);
      if (actorRecord && target) {
        addEntityRelationship(actorRecord, {
          relationshipType: event.relationshipType || event.eventType || "semantic_relation",
          target,
          sourceEventId: event.id || "",
          evidence: event.anchorText || event.normalizedMeaning || "",
          confidence: event.confidence || "probable"
        });
      }
    }
  }

  for (const chain of semanticFlowChains || []) {
    const authorityChain = (chain.authorityChain || []).map(canonicalEntityName).filter(Boolean);
    for (let index = 0; index < authorityChain.length; index += 1) {
      const record = registryRecordFor(registry, authorityChain[index], chain.sourceContext || {});
      if (!record) continue;
      addRoleType(record, index === 0 ? "authoritativeCharacter" : "authorityChainParticipant");
      if (index + 1 < authorityChain.length) {
        addEntityRelationship(record, {
          relationshipType: index === 0 ? "authoritySource" : "authorityChainLink",
          target: authorityChain[index + 1],
          sourceEventId: chain.id || "",
          evidence: chain.chainTitle || chain.summary || "authority chain",
          confidence: chain.confidence || "probable"
        });
      }
    }
  }

  for (const item of interactions || []) {
    const actorA = registryRecordFor(registry, item.actorA, item.sourceContext || {});
    const actorBName = canonicalEntityName(item.actorB || "");
    if (actorA && actorBName) {
      addEntityRelationship(actorA, {
        relationshipType: item.interactionType || "interaction",
        target: actorBName,
        sourceEventId: item.sourceEventId || "",
        evidence: item.sourceSnippet || "",
        confidence: item.confidence || "probable"
      });
    }
    const actorB = registryRecordFor(registry, item.actorB, item.sourceContext || {});
    const actorAName = canonicalEntityName(item.actorA || "");
    if (actorB && actorAName) {
      addEntityRelationship(actorB, {
        relationshipType: item.interactionType || "interaction",
        target: actorAName,
        sourceEventId: item.sourceEventId || "",
        evidence: item.sourceSnippet || "",
        confidence: item.confidence || "probable"
      });
    }
  }

  for (const scene of sceneModels || []) {
    for (const name of scene.participants || []) {
      const record = registryRecordFor(registry, name, scene.sourceContext || {});
      if (!record) continue;
      addRoleType(record, "sceneParticipant");
    }
  }

  const records = Array.from(registry.values()).map((record) => ({
    ...record,
    entityType: inferEntityType(record.canonicalName, record.roleTypes),
    roleTypes: record.roleTypes.sort((a, b) => a.localeCompare(b)),
    aliases: record.aliases.sort((a, b) => a.localeCompare(b)),
    sourceCaptureIds: record.sourceCaptureIds.sort((a, b) => a.localeCompare(b)),
    confidence: record.confidence || "probable"
  }));

  // Phase 6.0 foundation: registry nodes remain current-page derived for now.
  // Future work can merge cross-page identities, aliases, original-language
  // references, tradition-specific interpretations, source-authority chains,
  // lineage/family graphs, and visual/persona profiles without replacing the
  // existing Detected Entities / Roles section yet.
  return records.sort((a, b) => {
    const typeRank = ["divine_authority", "divine_messenger", "divine", "narrator", "traditional_author", "source_author", "human", "lineage_person", "entity"];
    return (typeRank.indexOf(a.entityType) === -1 ? 99 : typeRank.indexOf(a.entityType)) -
      (typeRank.indexOf(b.entityType) === -1 ? 99 : typeRank.indexOf(b.entityType)) ||
      a.canonicalName.localeCompare(b.canonicalName);
  });
}
function identityScopeForCanonicalName(canonicalName) {
  if (canonicalName === "JESUS CHRIST") {
    return "source-explicit / narrative-progressive / retrospective";
  }
  if (canonicalName === "THE LORD") return "source-explicit divine authority";
  if (canonicalName === "Angel of THE LORD") return "source-explicit divine messenger";
  return "source-mentioned";
}

function createCanonicalIdentityRecord(canonicalName, entityType = "entity") {
  const key = canonicalName.toLowerCase();
  return {
    id: `${Date.now()}-${textHash(`canonical|${key}`)}`,
    canonicalName,
    aliases: [],
    surfaceForms: [],
    entityType,
    identityScope: identityScopeForCanonicalName(canonicalName),
    sourceContexts: [],
    evidencePhrases: [],
    confidence: "probable",
    notes: ""
  };
}

function identityRecordFor(identities, name, entityType = "entity") {
  const canonicalName = canonicalEntityName(name || "");
  if (!canonicalName) return null;
  const key = canonicalName.toLowerCase();
  if (!identities.has(key)) identities.set(key, createCanonicalIdentityRecord(canonicalName, entityType));
  const record = identities.get(key);
  if (entityType && record.entityType === "entity") record.entityType = entityType;
  return record;
}

function addIdentitySurface(record, surface) {
  const clean = normalizeWhitespace(surface || "");
  if (!clean) return;
  addUniqueValue(record.surfaceForms, clean, (item) => item.toLowerCase());
  if (canonicalEntityName(clean) !== record.canonicalName) {
    addUniqueValue(record.aliases, clean, (item) => item.toLowerCase());
  }
}

function addIdentityContext(record, sourceContext) {
  if (!sourceContext) return;
  addUniqueValue(record.sourceContexts, sourceContext, (item) => [
    item.sourceCaptureId || "",
    item.sourceUrl || "",
    item.book || "",
    item.chapter || ""
  ].join("|"));
}

function addIdentityEvidence(record, evidence) {
  const clean = normalizeWhitespace(evidence || "");
  if (!clean) return;
  addUniqueValue(record.evidencePhrases, clean, (item) => item.toLowerCase());
}

function enrichKnownIdentity(record) {
  if (record.canonicalName === "JESUS CHRIST") {
    for (const alias of ["JESUS", "child", "firstborn son", "CHRIST"]) addIdentitySurface(record, alias);
    record.identityScope = "source title: JESUS CHRIST; narrative identity: JESUS / child; retrospective identity: CHRIST";
    record.notes = "Preserves source-explicit, narrative-time, and retrospective/tradition-aware identity distinctions.";
    record.confidence = record.confidence === "explicit" ? "explicit" : record.confidence;
  }
  if (record.canonicalName === "THE LORD") {
    for (const alias of ["Lord", "THE LORD"]) addIdentitySurface(record, alias);
    record.entityType = "divine_authority";
    record.identityScope = "source-explicit divine authority";
  }
  if (record.canonicalName === "Angel of THE LORD") {
    for (const alias of ["angel of THE LORD", "angel of the Lord"]) addIdentitySurface(record, alias);
    record.entityType = "divine_messenger";
    record.identityScope = "source-explicit divine messenger";
  }
}

function createCanonicalIdentities(entityRegistry, relationshipGraph, semanticEvents, entityRoleItems) {
  const identities = new Map();

  for (const entity of entityRegistry || []) {
    const record = identityRecordFor(identities, entity.canonicalName, entity.entityType || "entity");
    if (!record) continue;
    addIdentitySurface(record, entity.displayName || entity.canonicalName);
    for (const alias of entity.aliases || []) addIdentitySurface(record, alias);
    for (const context of entity.sourceContexts || []) addIdentityContext(record, context);
    for (const mention of entity.mentions || []) addIdentityEvidence(record, mention.anchorText || mention.evidence || "");
    if (entity.confidence === "explicit" || entity.confidence === "traditional-attribution") record.confidence = entity.confidence;
  }

  for (const event of semanticEvents || []) {
    for (const surface of [event.actor, event.target, event.recipient, event.concerning, ...(event.participants || [])]) {
      const record = identityRecordFor(identities, surface, inferEntityType(surface, []));
      if (!record) continue;
      addIdentitySurface(record, surface);
      addIdentityContext(record, event.sourceContext || {});
      addIdentityEvidence(record, event.anchorText || event.sourceSnippet || event.normalizedMeaning || "");
      if (event.confidence === "explicit") record.confidence = "explicit";
    }
  }

  for (const role of entityRoleItems || []) {
    const record = identityRecordFor(identities, role.entityName, inferEntityType(role.entityName, [entityRoleTypeFromGroup(role.roleGroup)]));
    if (!record) continue;
    addIdentitySurface(record, role.entityName);
    addIdentityContext(record, role.sourceContext || {});
    addIdentityEvidence(record, role.anchorText || role.evidence || "");
    if (role.confidence === "explicit" || role.confidence === "traditional-attribution") record.confidence = role.confidence;
  }

  for (const edge of relationshipGraph || []) {
    for (const surface of [edge.fromEntity, edge.toEntity]) {
      const record = identityRecordFor(identities, surface, inferEntityType(surface, []));
      if (!record) continue;
      addIdentitySurface(record, surface);
      addIdentityContext(record, edge.sourceContext || {});
      addIdentityEvidence(record, edge.evidencePhrase || "");
    }
  }


  const hasMatthewFiveJesus = Array.from(identities.values()).some((record) =>
    record.canonicalName === "JESUS" &&
    (record.sourceContexts || []).some((context) => context.book === "Matthew" && String(context.chapter || "") === "5")
  );
  if (hasMatthewFiveJesus && !identities.has("jesus christ")) {
    const jesus = identities.get("jesus");
    const record = identityRecordFor(identities, "JESUS CHRIST", "divine");
    addIdentitySurface(record, "JESUS");
    addIdentitySurface(record, "CHRIST");
    addIdentityEvidence(record, "Matthew 5 teaching speaker: JESUS; canonical/source identity preserved as JESUS CHRIST");
    for (const context of jesus?.sourceContexts || []) addIdentityContext(record, context);
  }

  for (const record of identities.values()) enrichKnownIdentity(record);

  // Phase 6.3 canonical identities stay conservative: aliases do not erase
  // source/time identity scope. Future work can add stronger alias evidence,
  // original-language names, tradition-aware identity layers, and character
  // awareness by scope without collapsing identities too aggressively.
  return Array.from(identities.values()).sort((left, right) =>
    entityRegistryDisplayRankLike(left) - entityRegistryDisplayRankLike(right) ||
    left.canonicalName.localeCompare(right.canonicalName)
  );
}

function entityRegistryDisplayRankLike(entity) {
  const typeRank = ["divine_authority", "divine_messenger", "divine", "narrator", "traditional_author", "source_author", "human", "lineage_person", "entity"];
  const index = typeRank.indexOf(entity.entityType || "entity");
  return index === -1 ? 99 : index;
}
function relationshipGraphTypeForSemanticEvent(eventItem) {
  const eventType = eventItem?.eventType || "";
  const relationshipType = eventItem?.relationshipType || "";

  if (eventType === "lineage_birth" || relationshipType === "father_son") return "lineage_father_son";
  if (eventType === "covenant_family_union") return "covenant_family_union";
  if (eventType === "naming_event") return "naming";
  if (eventType === "name_revelation") return "revealed_name";
  if (eventType === "conception_revelation") return "conception_revealed";
  if (eventType === "mission_reason_declaration") return "mission_reason_revealed";
  if (eventType === "divine_message_cluster") return "divine_message_cluster";
  if (eventType === "birth_event") return "birth";
  if ([
    "divine_messenger_appearance",
    "divine_message_speech",
    "instruction_concerning_person"
  ].includes(eventType)) return "divine_message";
  if (eventType === "passive_fulfillment_narration") return "fulfillment_narration";
  return relationshipType || eventType || "semantic_relationship";
}

function relationshipTargetForSemanticEvent(eventItem) {
  if (!eventItem) return "";
  if (eventItem.eventType === "passive_fulfillment_narration") {
    return "Prophecy / Fulfillment";
  }
  return eventItem.target || eventItem.recipient || eventItem.concerning || "";
}

function createRelationshipEdge(config) {
  const fromEntity = canonicalEntityName(config.fromEntity || "");
  const rawToEntity = normalizeWhitespace(config.toEntity || "");
  const preserveNarrativeJesus = ["naming", "revealed_name"].includes(config.relationshipType || "") && rawToEntity.toLowerCase() === "jesus";
  const toEntity = preserveNarrativeJesus ? "JESUS" : canonicalEntityName(rawToEntity);
  if (!fromEntity || !toEntity || fromEntity === toEntity) return null;

  const key = [
    config.sourceCaptureId || config.sourceContext?.sourceCaptureId || "",
    fromEntity,
    toEntity,
    config.relationshipType || "relationship",
    normalizeWhitespace(config.evidencePhrase || "").toLowerCase(),
    config.derivedFrom || "derived"
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(key)}`,
    sourceCaptureId: config.sourceCaptureId || config.sourceContext?.sourceCaptureId || "",
    sourceContext: config.sourceContext || {},
    fromEntity,
    toEntity,
    relationshipType: config.relationshipType || "relationship",
    semanticCategory: config.semanticCategory || "relationship_graph",
    evidencePhrase: trimText(config.evidencePhrase || "", 180),
    confidence: config.confidence || "probable",
    derivedFrom: config.derivedFrom || "derived"
  };
}

function relationshipDedupType(edge) {
  if (["lineage_father_son", "father_son"].includes(edge.relationshipType)) {
    return "lineage_father_son";
  }
  return edge.relationshipType;
}

function relationshipEvidenceRank(edge) {
  const evidence = normalizeWhitespace(edge.evidencePhrase || "").toLowerCase();
  if (edge.relationshipType === "source_authority" && /angel of the lord appeared/.test(evidence)) return 10;
  if (edge.relationshipType === "delegated_authority" && /saying,? joseph/.test(evidence)) return 10;
  if (edge.relationshipType === "divine_message" && /saying,? joseph/.test(evidence)) return 10;
  if (/appeared/.test(evidence)) return 20;
  if (/saying|fear not|instruct/.test(evidence)) return 30;
  return 50;
}

function shouldCollapseRelationshipEvidence(edge) {
  return [
    "source_authority",
    "delegated_authority",
    "authoritySource",
    "authorityChainLink",
    "divine_message"
  ].includes(edge.relationshipType);
}

function addRelationshipEdge(edges, seen, config) {
  const edge = createRelationshipEdge(config);
  if (!edge) return;
  const sourceContextKey = edge.sourceContext?.sourceUrl || edge.sourceContext?.sourceTitle || edge.sourceCaptureId || "";
  const relationshipType = relationshipDedupType(edge);
  if (relationshipType === "lineage_father_son" && edge.relationshipType !== "lineage_father_son") {
    edge.relationshipType = "lineage_father_son";
  }
  const keyParts = [
    sourceContextKey,
    edge.fromEntity.toLowerCase(),
    edge.toEntity.toLowerCase(),
    relationshipType
  ];
  if (!shouldCollapseRelationshipEvidence(edge)) {
    keyParts.push(normalizeWhitespace(edge.evidencePhrase).toLowerCase());
  }
  const key = keyParts.join("|");
  const existingIndex = seen.get(key);
  if (existingIndex !== undefined) {
    const existing = edges[existingIndex];
    if (relationshipEvidenceRank(edge) < relationshipEvidenceRank(existing)) {
      edges[existingIndex] = edge;
    }
    return;
  }
  seen.set(key, edges.length);
  edges.push(edge);
}

function shouldCollapseOverlappingRelationshipType(edge) {
  return ["delegated_authority", "divine_message"].includes(edge.relationshipType);
}

function overlappingRelationshipPreferenceRank(edge) {
  const typeRank = {
    divine_message: 1,
    delegated_authority: 2
  };
  return typeRank[edge.relationshipType] || 99;
}

function preferRelationshipGraphEdges(edges) {
  const preferred = [];
  const seen = new Map();

  for (const edge of edges || []) {
    if (!shouldCollapseOverlappingRelationshipType(edge)) {
      preferred.push(edge);
      continue;
    }

    const sourceContextKey = edge.sourceContext?.sourceUrl || edge.sourceContext?.sourceTitle || edge.sourceCaptureId || "";
    const key = [
      sourceContextKey,
      edge.fromEntity.toLowerCase(),
      edge.toEntity.toLowerCase(),
      normalizeWhitespace(edge.evidencePhrase).toLowerCase()
    ].join("|");
    const existingIndex = seen.get(key);

    if (existingIndex === undefined) {
      seen.set(key, preferred.length);
      preferred.push(edge);
      continue;
    }

    const existing = preferred[existingIndex];
    const typeRank = overlappingRelationshipPreferenceRank(edge) - overlappingRelationshipPreferenceRank(existing);
    if (typeRank < 0 || (typeRank === 0 && relationshipEvidenceRank(edge) < relationshipEvidenceRank(existing))) {
      preferred[existingIndex] = edge;
    }
  }

  return preferred;
}
function createRelationshipGraph(entityRegistry, semanticEvents, semanticFlowChains, interactions, entityRoleItems) {
  const edges = [];
  const seen = new Map();

  for (const eventItem of semanticEvents || []) {
    const fromEntity = eventItem.actor || eventItem.narrator || eventItem.quotedSpeaker || "";
    const toEntity = relationshipTargetForSemanticEvent(eventItem);
    addRelationshipEdge(edges, seen, {
      sourceCaptureId: eventItem.sourceCaptureId || "",
      sourceContext: eventItem.sourceContext || {},
      fromEntity,
      toEntity,
      relationshipType: relationshipGraphTypeForSemanticEvent(eventItem),
      semanticCategory: eventItem.semanticCategory || "semantic_event",
      evidencePhrase: eventItem.anchorText || eventItem.sourceSnippet || eventItem.normalizedMeaning || "",
      confidence: eventItem.confidence || "probable",
      derivedFrom: "semantic_event"
    });

    const authorityChain = (eventItem.authorityChain || []).map(canonicalEntityName).filter(Boolean);
    for (let index = 0; index < authorityChain.length - 1; index += 1) {
      addRelationshipEdge(edges, seen, {
        sourceCaptureId: eventItem.sourceCaptureId || "",
        sourceContext: eventItem.sourceContext || {},
        fromEntity: authorityChain[index],
        toEntity: authorityChain[index + 1],
        relationshipType: index === 0 ? "source_authority" : "delegated_authority",
        semanticCategory: "authority_chain",
        evidencePhrase: eventItem.anchorText || eventItem.sourceSnippet || "authority chain",
        confidence: index === 0 ? "inferred-source" : eventItem.confidence || "probable",
        derivedFrom: "semantic_event_authority_chain"
      });
    }
  }

  for (const chain of semanticFlowChains || []) {
    const nodeById = new Map((chain.nodes || []).map((node) => [node.semanticEventId, node]));
    for (const relationship of chain.relationships || []) {
      const fromNode = nodeById.get(relationship.fromEventId);
      const toNode = nodeById.get(relationship.toEventId);
      addRelationshipEdge(edges, seen, {
        sourceCaptureId: chain.sourceCaptureId || "",
        sourceContext: chain.sourceContext || {},
        fromEntity: fromNode?.actor || "",
        toEntity: toNode?.actor || toNode?.target || "",
        relationshipType: relationship.relationType || "semantic_flow",
        semanticCategory: chain.chainType || "semantic_flow_chain",
        evidencePhrase: relationship.evidenceSnippet || chain.summary || "",
        confidence: relationship.confidence || chain.confidence || "probable",
        derivedFrom: "semantic_flow_chain"
      });
    }
  }

  for (const interaction of interactions || []) {
    addRelationshipEdge(edges, seen, {
      sourceCaptureId: interaction.sourceCaptureId || "",
      sourceContext: interaction.sourceContext || {},
      fromEntity: interaction.actorA || "",
      toEntity: interaction.actorB || "",
      relationshipType: interaction.interactionType || "interaction",
      semanticCategory: "character_interaction",
      evidencePhrase: interaction.sourceSnippet || "",
      confidence: interaction.confidence || "probable",
      derivedFrom: "interaction_graph"
    });
  }

  for (const entity of entityRegistry || []) {
    for (const relationship of entity.relationships || []) {
      addRelationshipEdge(edges, seen, {
        sourceCaptureId: entity.sourceCaptureIds?.[0] || "",
        sourceContext: entity.sourceContexts?.[0] || {},
        fromEntity: entity.canonicalName || "",
        toEntity: relationship.target || "",
        relationshipType: relationship.relationshipType || "entity_relationship",
        semanticCategory: "entity_registry",
        evidencePhrase: relationship.evidence || "",
        confidence: relationship.confidence || entity.confidence || "probable",
        derivedFrom: "entity_registry"
      });
    }
  }

  // Phase 6.1 keeps this current-page-only relationship graph lightweight.
  // Future work can add visualization, weighted graph traversal, cross-page
  // identity merging, doctrine graph links, source chronology, and confidence
  // evidence views without replacing the existing semantic/event sections.
  return preferRelationshipGraphEdges(edges).sort((a, b) =>
    (a.sourceCaptureId || "").localeCompare(b.sourceCaptureId || "") ||
    a.fromEntity.localeCompare(b.fromEntity) ||
    a.relationshipType.localeCompare(b.relationshipType) ||
    a.toEntity.localeCompare(b.toEntity)
  );
}
const HUMAN_ROLE_MENTION_PATTERN = /\b(prophet|husband|wife|mother|virgin)\b/gi;
const HUMAN_GROUP_MENTION_PATTERN = /\b(people|brethren|generations)\b/gi;
const DIVINE_TITLE_MENTION_PATTERN = /\b(JESUS CHRIST|Jesus Christ|Holy Ghost|Holy Spirit|THE LORD|the Lord|GOD with us|God with us|Emmanuel|God)\b/g;
const ANGEL_MENTION_PATTERN = /\b(?:the\s+)?angel of (?:THE LORD|the Lord)\b/gi;
const PRONOUN_MENTION_PATTERN = /\b(He|Him|His|he|him|his)\b/g;

function entityClassForMention({ mentionText = "", mentionType = "", entityType = "", roleHint = "" } = {}) {
  const text = normalizeWhitespace(mentionText).toLowerCase();
  const type = normalizeWhitespace(entityType).toLowerCase();
  const role = normalizeWhitespace(roleHint).toLowerCase();

  if (["adversary", "anti_god", "deceiver", "wicked", "evil"].includes(type) || ["satan", "lucifer", "adversary", "perdition"].includes(text)) return "i";
  if (["divine_authority", "divine_redeemer", "divine"].includes(type) ||
      ["god", "the lord", "yhwh", "jesus christ", "jesus", "holy ghost", "holy spirit", "emmanuel", "god with us"].includes(text)) return "I";
  if (["divine_messenger", "angelic_messenger"].includes(type) || /angel of (?:the )?lord/i.test(mentionText)) return "II";
  if (["human", "prophet", "author", "narrator", "lineage_person", "traditional_author", "source_author"].includes(type) ||
      ["named_entity", "role_title", "group_collective", "lineage_person"].includes(mentionType) ||
      /human|author|narrator|lineage|recipient|participant|wife|mother|virgin|people|brethren/.test(role)) return "III";
  if (["animal", "plant", "living_organism"].includes(type)) return "IIII";
  if (["object", "place", "artifact", "symbolic_item"].includes(type) || ["object_item", "place", "symbolic_reference"].includes(mentionType)) return "IIIII";
  return "";
}

function mentionTypeForEntity(entity = {}) {
  const entityType = entity.entityType || "";
  const roles = new Set((entity.roleTypes || []).map((role) => normalizeWhitespace(role).toLowerCase()));
  if (["divine_authority", "divine", "divine_redeemer"].includes(entityType)) return "divine_title";
  if (["divine_messenger", "angelic_messenger"].includes(entityType)) return "named_entity";
  if (entityType === "lineage_person" || roles.has("lineageperson")) return "lineage_person";
  return "named_entity";
}

function createMentionRecord(capture, config) {
  const sourceContext = config.sourceContext || buildSourceContext(capture || {});
  const mentionText = normalizeWhitespace(config.mentionText || "");
  if (!mentionText) return null;
  const mentionType = config.mentionType || "named_entity";
  const entityClass = config.entityClass || entityClassForMention({
    mentionText,
    mentionType,
    entityType: config.entityType || "",
    roleHint: config.roleHint || ""
  });
  const key = [
    sourceContext.sourceCaptureId || config.sourceCaptureId || capture?.id || "",
    mentionText.toLowerCase(),
    mentionType,
    config.linkedEntity || "",
    config.sentenceIndex ?? "",
    config.sourcePhrase || ""
  ].join("|");

  return {
    id: `${Date.now()}-${textHash(`mention|${key}`)}`,
    sourceCaptureId: sourceContext.sourceCaptureId || config.sourceCaptureId || capture?.id || "",
    sourceContext,
    mentionText,
    normalizedText: mentionText.toLowerCase(),
    mentionType,
    entityClass,
    linkedEntity: config.linkedEntity || "",
    roleHint: config.roleHint || "",
    sourcePhrase: trimText(config.sourcePhrase || mentionText, 180),
    verseNumber: config.verseNumber || inferVerseNumberFromText(config.sourcePhrase || mentionText),
    sentenceIndex: typeof config.sentenceIndex === "number" ? config.sentenceIndex : "",
    scopePath: config.scopePath || [
      sourceContext.collection || sourceContext.sourceType || "source",
      sourceContext.book || sourceContext.sourceTitle || "unknown-source",
      sourceContext.chapter ? `chapter:${sourceContext.chapter}` : ""
    ].filter(Boolean).join(" > "),
    confidence: config.confidence || "probable"
  };
}

function addMention(mentions, seen, capture, config) {
  const item = createMentionRecord(capture, config);
  if (!item) return;
  const key = [
    item.sourceCaptureId,
    item.normalizedText,
    item.mentionType,
    item.linkedEntity,
    item.sentenceIndex,
    normalizeWhitespace(item.sourcePhrase).toLowerCase()
  ].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  mentions.push(item);
}

function addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, pattern, configForMatch) {
  pattern.lastIndex = 0;
  let match;
  while ((match = pattern.exec(sentence)) !== null) {
    addMention(mentions, seen, capture, {
      ...configForMatch(match[0], match),
      sourcePhrase: sentence,
      sentenceIndex,
      verseNumber: inferVerseNumberFromText(sentence)
    });
  }
}

function createMentionIndex(captures, eventItems, entityRoleItems, entityRegistry, canonicalIdentities, domSemanticHints = []) {
  const mentions = [];
  const seen = new Set();
  const captureById = new Map((captures || []).map((capture) => [capture.id || "", capture]));
  const fallbackCapture = captures?.[0] || {};

  for (const hint of domSemanticHints || []) {
    if (!["deity_name", "uppercase_title"].includes(hint.hintType)) continue;
    const capture = captureById.get(hint.sourceCaptureId || "") || fallbackCapture;
    addMention(mentions, seen, capture, {
      sourceContext: hint.sourceContext || buildSourceContext(capture),
      mentionText: hint.text,
      mentionType: "divine_title",
      linkedEntity: canonicalEntityName(hint.text || ""),
      roleHint: `source DOM markup: ${hint.hintType}`,
      sourcePhrase: hint.text,
      verseNumber: hint.verseNumber || inferVerseNumberFromText(hint.text || ""),
      scopePath: hint.scopePath || "",
      confidence: hint.confidence || "source-markup"
    });
  }

  for (const entity of entityRegistry || []) {
    const context = entity.sourceContexts?.[0] || buildSourceContext(fallbackCapture);
    addMention(mentions, seen, fallbackCapture, {
      sourceContext: context,
      mentionText: entity.displayName || entity.canonicalName,
      mentionType: mentionTypeForEntity(entity),
      entityType: entity.entityType || "",
      linkedEntity: entity.canonicalName || "",
      roleHint: (entity.roleTypes || []).slice(0, 4).join(", "),
      sourcePhrase: entity.mentions?.[0]?.anchorText || entity.mentions?.[0]?.evidence || entity.canonicalName || "",
      confidence: entity.confidence || "probable"
    });
  }

  for (const identity of canonicalIdentities || []) {
    const context = identity.sourceContexts?.[0] || buildSourceContext(fallbackCapture);
    addMention(mentions, seen, fallbackCapture, {
      sourceContext: context,
      mentionText: identity.canonicalName,
      mentionType: ["divine_authority", "divine", "divine_redeemer"].includes(identity.entityType) ? "divine_title" : "named_entity",
      entityType: identity.entityType || "",
      linkedEntity: identity.canonicalName || "",
      roleHint: identity.identityScope || "canonical identity",
      sourcePhrase: identity.evidencePhrases?.[0] || identity.canonicalName || "",
      confidence: identity.confidence || "probable"
    });
  }

  for (const role of entityRoleItems || []) {
    const capture = captureById.get(role.sourceCaptureId || "") || fallbackCapture;
    addMention(mentions, seen, capture, {
      sourceContext: role.sourceContext || buildSourceContext(capture),
      mentionText: role.entityName,
      mentionType: role.roleGroup === "Lineage Persons" ? "lineage_person" : "named_entity",
      linkedEntity: canonicalEntityName(role.entityName || ""),
      roleHint: role.roleGroup || "entity role",
      sourcePhrase: role.anchorText || role.evidence || role.entityName || "",
      confidence: role.confidence || "probable"
    });
  }

  for (const item of eventItems || []) {
    const capture = captureById.get(item.sourceCaptureId || "") || fallbackCapture;
    for (const name of item.lineagePersons || []) {
      addMention(mentions, seen, capture, {
        sourceContext: item.sourceContext || buildSourceContext(capture),
        mentionText: name,
        mentionType: "lineage_person",
        linkedEntity: canonicalEntityName(name),
        roleHint: "lineage person",
        sourcePhrase: item.eventText || name,
        sentenceIndex: item.sequenceIndex,
        verseNumber: inferVerseNumberFromText(item.eventText || ""),
        confidence: "explicit"
      });
    }
  }

  for (const capture of captures || []) {
    splitSentences(capture.text || "").forEach((sentence, sentenceIndex) => {
      addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, DIVINE_TITLE_MENTION_PATTERN, (mentionText) => ({
        mentionText,
        mentionType: "divine_title",
        linkedEntity: canonicalEntityName(mentionText),
        roleHint: "divine title/reference",
        confidence: "probable"
      }));
      addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, ANGEL_MENTION_PATTERN, (mentionText) => ({
        mentionText,
        mentionType: "named_entity",
        entityType: "divine_messenger",
        linkedEntity: "Angel of THE LORD",
        roleHint: "divine messenger",
        confidence: "explicit"
      }));
      addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, HUMAN_ROLE_MENTION_PATTERN, (mentionText) => ({
        mentionText,
        mentionType: "role_title",
        roleHint: "human role/title",
        confidence: "probable"
      }));
      addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, HUMAN_GROUP_MENTION_PATTERN, (mentionText) => ({
        mentionText,
        mentionType: "group_collective",
        roleHint: "human group/collective",
        confidence: "probable"
      }));
      addRegexMentions(mentions, seen, capture, sentence, sentenceIndex, PRONOUN_MENTION_PATTERN, (mentionText) => ({
        mentionText,
        mentionType: "pronoun",
        roleHint: "unresolved pronoun; future pronoun resolution should link entity/class by scope",
        confidence: "possible"
      }));
    });
  }

  // Phase 7.1 keeps mentions separate from canonical identities. Future work can
  // add pronoun resolution, title-aware SON of David rendering, role/group
  // distinction, and scope-aware AI_Actor knowledge without promoting every word
  // into the Entity Registry.
  return mentions.sort((a, b) =>
    (a.sourceCaptureId || "").localeCompare(b.sourceCaptureId || "") ||
    Number(a.sentenceIndex || 0) - Number(b.sentenceIndex || 0) ||
    a.mentionType.localeCompare(b.mentionType) ||
    a.normalizedText.localeCompare(b.normalizedText)
  );
}
async function runFullAnalysisPipeline(reason = "manual") {
  const now = Date.now();
  if (pipelinePromise) return pipelinePromise;
  if (now - lastPipelineStartedAt < PIPELINE_THROTTLE_MS) {
    return chrome.storage.local.get(ANALYSIS_STATUS_KEY);
  }

  lastPipelineStartedAt = now;
  pipelinePromise = (async () => {
    const captures = await captureSources();
    const timelineItems = [];
    const eventItems = [];
    const principleItems = [];
    const seenTimeline = new Set();
    const seenEvents = new Set();
    const seenPrinciples = new Set();

    for (const capture of captures) {
      for (const item of extractTimelineItemsFromCapture(capture)) {
        const key = `${item.sourceCaptureId}|${item.detectedDateText}|${item.contextSnippet}`;
        if (!seenTimeline.has(key)) {
          seenTimeline.add(key);
          timelineItems.push(item);
        }
      }
      for (const item of extractEventItemsFromCapture(capture)) {
        const key = `${item.sourceCaptureId}|${item.sequenceIndex}|${item.eventText}`;
        if (!seenEvents.has(key)) {
          seenEvents.add(key);
          eventItems.push(item);
        }
      }
      for (const item of extractPrincipleItemsFromCapture(capture)) {
        const key = principleDedupKey(item);
        if (!seenPrinciples.has(key)) {
          seenPrinciples.add(key);
          principleItems.push(item);
        }
      }
    }

    const domSemanticHints = createDomSemanticHints(captures);
    const sourceAdapters = sourceAdapterRegistry();
    const activeAdapter = deriveActiveSourceAdapter(captures, domSemanticHints);
    const sourceDiscoveryIndex = createSourceDiscoveryIndex(captures, activeAdapter);
    const referenceGraph = createReferenceGraph(sourceDiscoveryIndex, activeAdapter);
    const dedupedPrincipleItems = dedupePrincipleItems(principleItems);
    const prophecyLinks = createProphecyLinks(dedupedPrincipleItems);
    const orderedEvents = createOrderedEvents(eventItems);
    const actorTimelines = dedupeActorTimelines(createActorTimelines(orderedEvents));
    const semanticEvents = createSemanticEvents(eventItems, orderedEvents);
    const interactionGraph = createInteractionGraph(orderedEvents, actorTimelines);
    const dedupedInteractionGraph = dedupeInteractionGraph(interactionGraph);
    const sceneModels = createSceneModels(
      orderedEvents,
      actorTimelines,
      dedupedInteractionGraph,
      dedupedPrincipleItems,
      prophecyLinks
    );
    const entityRoleItems = createEntityRoleItems(
      captures,
      eventItems,
      actorTimelines,
      sceneModels,
      semanticEvents
    );
    const semanticFlowChains = createSemanticFlowChains(
      semanticEvents,
      sceneModels,
      dedupedInteractionGraph,
      entityRoleItems,
      prophecyLinks
    );
    const entityRegistry = createEntityRegistry(
      entityRoleItems,
      semanticEvents,
      semanticFlowChains,
      dedupedInteractionGraph,
      sceneModels
    );
    const relationshipGraph = createRelationshipGraph(
      entityRegistry,
      semanticEvents,
      semanticFlowChains,
      dedupedInteractionGraph,
      entityRoleItems
    );
    const canonicalIdentities = createCanonicalIdentities(
      entityRegistry,
      relationshipGraph,
      semanticEvents,
      entityRoleItems
    );
    const mentionIndex = createMentionIndex(
      captures,
      eventItems,
      entityRoleItems,
      entityRegistry,
      canonicalIdentities,
      domSemanticHints
    );
    const passageFunctions = createPassageFunctions(
      captures,
      semanticEvents,
      relationshipGraph,
      prophecyLinks,
      canonicalIdentities
    );
    const revelationPatterns = createRevelationPatterns(
      semanticEvents,
      passageFunctions
    );
    const referenceRoles = createReferenceRoles(
      sourceDiscoveryIndex,
      referenceGraph,
      passageFunctions,
      revelationPatterns,
      canonicalIdentities
    );
    const semanticDistinctions = createSemanticDistinctions(
      captures,
      canonicalIdentities,
      semanticEvents,
      relationshipGraph,
      revelationPatterns,
      passageFunctions
    );
    const originAuthorityPaths = createOriginAuthorityPaths(
      semanticEvents,
      revelationPatterns,
      passageFunctions,
      semanticFlowChains,
      relationshipGraph,
      canonicalIdentities
    );
    const ontologyRoles = createOntologyRoles(
      captures,
      semanticDistinctions,
      semanticEvents,
      revelationPatterns,
      passageFunctions,
      originAuthorityPaths
    );
    const semanticAmbiguities = createSemanticAmbiguities(
      captures,
      semanticDistinctions,
      ontologyRoles,
      revelationPatterns,
      originAuthorityPaths
    );
    const entityRelationRoles = createEntityRelationRoles(
      captures,
      semanticEvents,
      revelationPatterns,
      passageFunctions,
      ontologyRoles,
      originAuthorityPaths,
      relationshipGraph
    );
    const semanticContinuity = createSemanticContinuity(
      captures,
      semanticEvents,
      revelationPatterns,
      passageFunctions,
      ontologyRoles,
      originAuthorityPaths,
      entityRelationRoles,
      canonicalIdentities
    );
    const movementSemantics = createMovementSemantics(
      captures,
      passageFunctions,
      revelationPatterns,
      ontologyRoles,
      originAuthorityPaths,
      entityRelationRoles
    );
    const semanticCausality = createSemanticCausality(
      captures,
      semanticEvents,
      revelationPatterns,
      passageFunctions,
      ontologyRoles,
      originAuthorityPaths,
      entityRelationRoles,
      semanticContinuity,
      movementSemantics
    );
    const teachingSemantics = createTeachingSemantics(
      captures,
      passageFunctions,
      referenceRoles,
      ontologyRoles
    );
    const principleRelationships = createPrincipleRelationships(
      captures,
      teachingSemantics
    );
    const characterInteractions = createCharacterInteractions(
      captures,
      ontologyRoles,
      entityRelationRoles,
      originAuthorityPaths,
      teachingSemantics,
      movementSemantics,
      semanticCausality
    );
    const storedAnalysisHistory = await chrome.storage.local.get(ANALYSIS_HISTORY_KEY);
    const previousAnalysisHistory = Array.isArray(storedAnalysisHistory[ANALYSIS_HISTORY_KEY])
      ? storedAnalysisHistory[ANALYSIS_HISTORY_KEY]
      : [];
    const sessionContinuityReview = createSessionContinuityReview(
      captures,
      previousAnalysisHistory,
      semanticContinuity,
      ontologyRoles,
      principleRelationships,
      characterInteractions,
      originAuthorityPaths,
      teachingSemantics,
      entityRelationRoles
    );
    const knowledgeGraph = createKnowledgeGraph(
      captures,
      ontologyRoles,
      entityRelationRoles,
      characterInteractions,
      principleRelationships,
      teachingSemantics,
      originAuthorityPaths,
      semanticContinuity,
      sessionContinuityReview
    );
    applyScopeIntegrity({
      domSemanticHints,
      mentionIndex,
      semanticEvents,
      relationshipGraph,
      canonicalIdentities,
      semanticFlowChains,
      sourceDiscoveryIndex,
      referenceGraph,
      passageFunctions,
      revelationPatterns,
      referenceRoles,
      semanticDistinctions,
      ontologyRoles,
      semanticAmbiguities,
      originAuthorityPaths,
      entityRelationRoles,
      semanticContinuity,
      movementSemantics,
      semanticCausality,
      teachingSemantics,
      principleRelationships,
      characterInteractions,
      sessionContinuityReview,
      knowledgeGraph
    }, activeAdapter);
    const scopeIntegrity = createScopeIntegrityReport({
      domSemanticHints,
      mentionIndex,
      semanticEvents,
      relationshipGraph,
      canonicalIdentities,
      semanticFlowChains,
      sourceDiscoveryIndex,
      referenceGraph,
      passageFunctions,
      revelationPatterns,
      referenceRoles,
      semanticDistinctions,
      ontologyRoles,
      semanticAmbiguities,
      originAuthorityPaths,
      entityRelationRoles,
      semanticContinuity,
      movementSemantics,
      semanticCausality,
      teachingSemantics,
      principleRelationships,
      characterInteractions,
      sessionContinuityReview,
      knowledgeGraph
    }, activeAdapter);
    const latestCapture = captures.find((capture) => capture?.text) || {};
    const latestCaptureContext = buildSourceContext(latestCapture);

    if (latestCaptureContext.book === "Matthew" && String(latestCaptureContext.chapter || "") === "5" && teachingSemantics.length && !canonicalIdentities.some((item) => item.canonicalName === "JESUS CHRIST")) {
      const teachingIdentity = createCanonicalIdentityRecord("JESUS CHRIST", "divine");
      addIdentitySurface(teachingIdentity, "JESUS");
      addIdentitySurface(teachingIdentity, "CHRIST");
      addIdentityContext(teachingIdentity, latestCaptureContext);
      addIdentityEvidence(teachingIdentity, "Matthew 5 teaching speaker: JESUS; canonical/source identity preserved as JESUS CHRIST");
      enrichKnownIdentity(teachingIdentity);
      canonicalIdentities.push(teachingIdentity);
    }
    const derivedLayerCounts = {
      passageFunctions: passageFunctions.length,
      revelationPatterns: revelationPatterns.length,
      referenceRoles: referenceRoles.length,
      semanticDistinctions: semanticDistinctions.length,
      ontologyRoles: ontologyRoles.length,
      semanticAmbiguities: semanticAmbiguities.length,
      originAuthorityPaths: originAuthorityPaths.length,
      entityRelationRoles: entityRelationRoles.length,
      semanticContinuity: semanticContinuity.length,
      movementSemantics: movementSemantics.length,
      semanticCausality: semanticCausality.length,
      teachingSemantics: teachingSemantics.length,
      principleRelationships: principleRelationships.length,
      characterInteractions: characterInteractions.length,
      sessionContinuityReview: sessionContinuityReview.length,
      knowledgeGraph: knowledgeGraph.length
    };
    const status = {
      reason,
      captureCount: captures.length,
      timelineCount: timelineItems.length,
      eventCount: eventItems.length,
      orderedEventCount: orderedEvents.length,
      actorTimelineCount: actorTimelines.length,
      principleCount: dedupedPrincipleItems.length,
      prophecyLinkCount: prophecyLinks.length,
      interactionCount: dedupedInteractionGraph.length,
      sceneCount: sceneModels.length,
      entityRoleCount: entityRoleItems.length,
      semanticEventCount: semanticEvents.length,
      semanticFlowChainCount: semanticFlowChains.length,
      entityRegistryCount: entityRegistry.length,
      relationshipGraphCount: relationshipGraph.length,
      canonicalIdentityCount: canonicalIdentities.length,
      mentionCount: mentionIndex.length,
      domHintCount: domSemanticHints.length,
      activeAdapterName: activeAdapter?.adapterName || "",
      activeUrl: latestCapture.url || "",
      sourceCaptureId: latestCapture.id || "",
      sourceCaptureTitle: latestCapture.title || "",
      sourceCaptureChapter: latestCaptureContext.chapter || "",
      sourceCaptureBook: latestCaptureContext.book || "",
      latestCaptureWordCount: latestCapture.wordCount || 0,
      derivedBuildersScope: latestCaptureContext.book && latestCaptureContext.chapter ? `${latestCaptureContext.book} ${latestCaptureContext.chapter}` : latestCaptureContext.sourceTitle || "unknown",
      matthew2DerivedBuildersRan: latestCaptureContext.book === "Matthew" && String(latestCaptureContext.chapter || "") === "2",
      matthew5TeachingBuildersRan: latestCaptureContext.book === "Matthew" && String(latestCaptureContext.chapter || "") === "5",
      analysisBuildMarker: "phase-8.6-knowledge-graph-foundation",
      derivedLayerCounts,
      sourceDiscoveryCount: sourceDiscoveryIndex.length,
      referenceGraphCount: referenceGraph.length,
      passageFunctionCount: passageFunctions.length,
      revelationPatternCount: revelationPatterns.length,
      referenceRoleCount: referenceRoles.length,
      semanticDistinctionCount: semanticDistinctions.length,
      ontologyRoleCount: ontologyRoles.length,
      semanticAmbiguityCount: semanticAmbiguities.length,
      originAuthorityPathCount: originAuthorityPaths.length,
      entityRelationRoleCount: entityRelationRoles.length,
      semanticContinuityCount: semanticContinuity.length,
      movementSemanticsCount: movementSemantics.length,
      semanticCausalityCount: semanticCausality.length,
      teachingSemanticsCount: teachingSemantics.length,
      principleRelationshipCount: principleRelationships.length,
      characterInteractionCount: characterInteractions.length,
      sessionContinuityReviewCount: sessionContinuityReview.length,
      knowledgeGraphCount: knowledgeGraph.length,
      scopedItemsCount: scopeIntegrity.scopedItemsCount,
      missingScopeCount: scopeIntegrity.missingScopeCount,
      analyzedAt: new Date().toISOString()
    };
    const activeSourcePage = {
      sourceCaptureId: status.sourceCaptureId,
      sourceTitle: status.sourceCaptureTitle,
      sourceCaptureBook: status.sourceCaptureBook,
      sourceCaptureChapter: status.sourceCaptureChapter,
      activeUrl: status.activeUrl,
      activeAdapterName: status.activeAdapterName,
      capturedAt: latestCapture.capturedAt || "",
      updatedAt: status.analyzedAt
    };
    const analysisHistoryEntry = {
      sourceCaptureId: status.sourceCaptureId,
      sourceTitle: status.sourceCaptureTitle,
      sourceCaptureBook: status.sourceCaptureBook,
      sourceCaptureChapter: status.sourceCaptureChapter,
      activeUrl: status.activeUrl,
      activeAdapterName: status.activeAdapterName,
      analyzedAt: status.analyzedAt,
      reason: status.reason
    };
    const analysisHistory = [analysisHistoryEntry, ...previousAnalysisHistory]
      .filter((item) => item?.sourceTitle || item?.sourceCaptureBook || item?.activeUrl)
      .filter((item, index, items) => {
        const key = [item.sourceCaptureBook, item.sourceCaptureChapter, item.sourceTitle, item.activeUrl]
          .map((value) => normalizeWhitespace(value || "").toLowerCase())
          .join("|");
        return key && items.findIndex((candidate) => [candidate.sourceCaptureBook, candidate.sourceCaptureChapter, candidate.sourceTitle, candidate.activeUrl]
          .map((value) => normalizeWhitespace(value || "").toLowerCase())
          .join("|") === key) === index;
      })
      .slice(0, 12);
    await chrome.storage.local.set({
      [TIMELINE_STORAGE_KEY]: timelineItems,
      [EVENT_STORAGE_KEY]: eventItems,
      [ORDERED_EVENTS_KEY]: orderedEvents,
      [ACTOR_TIMELINES_KEY]: actorTimelines,
      [PRINCIPLE_STORAGE_KEY]: dedupedPrincipleItems,
      [PROPHECY_LINKS_KEY]: prophecyLinks,
      [INTERACTION_GRAPH_KEY]: dedupedInteractionGraph,
      [SCENE_MODELS_KEY]: sceneModels,
      [ENTITY_ROLE_ITEMS_KEY]: entityRoleItems,
      [SEMANTIC_EVENTS_KEY]: semanticEvents,
      [SEMANTIC_FLOW_CHAINS_KEY]: semanticFlowChains,
      [ENTITY_REGISTRY_KEY]: entityRegistry,
      [RELATIONSHIP_GRAPH_KEY]: relationshipGraph,
      [CANONICAL_IDENTITIES_KEY]: canonicalIdentities,
      [MENTION_INDEX_KEY]: mentionIndex,
      [DOM_SEMANTIC_HINTS_KEY]: domSemanticHints,
      [SOURCE_DISCOVERY_INDEX_KEY]: sourceDiscoveryIndex,
      [REFERENCE_GRAPH_KEY]: referenceGraph,
      [PASSAGE_FUNCTIONS_KEY]: passageFunctions,
      [REVELATION_PATTERNS_KEY]: revelationPatterns,
      [REFERENCE_ROLES_KEY]: referenceRoles,
      [SEMANTIC_DISTINCTIONS_KEY]: semanticDistinctions,
      [ONTOLOGY_ROLES_KEY]: ontologyRoles,
      [SEMANTIC_AMBIGUITIES_KEY]: semanticAmbiguities,
      [ORIGIN_AUTHORITY_PATHS_KEY]: originAuthorityPaths,
      [ENTITY_RELATION_ROLES_KEY]: entityRelationRoles,
      [SEMANTIC_CONTINUITY_KEY]: semanticContinuity,
      [MOVEMENT_SEMANTICS_KEY]: movementSemantics,
      [SEMANTIC_CAUSALITY_KEY]: semanticCausality,
      [TEACHING_SEMANTICS_KEY]: teachingSemantics,
      [PRINCIPLE_RELATIONSHIPS_KEY]: principleRelationships,
      [CHARACTER_INTERACTIONS_KEY]: characterInteractions,
      [SESSION_CONTINUITY_REVIEW_KEY]: sessionContinuityReview,
      [KNOWLEDGE_GRAPH_KEY]: knowledgeGraph,
      [SOURCE_ADAPTERS_KEY]: sourceAdapters,
      [ACTIVE_ADAPTER_KEY]: activeAdapter,
      [SCOPE_INTEGRITY_KEY]: scopeIntegrity,
      [ANALYSIS_STATUS_KEY]: status,
      [ANALYSIS_HISTORY_KEY]: analysisHistory,
      [ACTIVE_SOURCE_PAGE_KEY]: activeSourcePage
    });

    return status;
  })();

  try {
    return await pipelinePromise;
  } finally {
    pipelinePromise = null;
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "ICE_RUN_FULL_ANALYSIS_PIPELINE") return false;

  runFullAnalysisPipeline(message.reason || "message")
    .then((status) => sendResponse({ ok: true, status }))
    .catch((error) => sendResponse({ ok: false, error: error.message }));

  return true;
});

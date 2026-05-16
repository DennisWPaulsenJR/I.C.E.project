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
const PASSAGE_FUNCTIONS_KEY = "ICE_PASSAGE_FUNCTIONS";
const SEMANTIC_EVENTS_KEY = "ICE_SEMANTIC_EVENTS";
const SEMANTIC_FLOW_CHAINS_KEY = "ICE_SEMANTIC_FLOW_CHAINS";
const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
const PIPELINE_THROTTLE_MS = 3500;

const ACTION_PATTERN = /\b(born|died|began|ended|founded|created|built|destroyed|conquered|traveled|appeared|said|commanded|signed|wrote|rose|fell|attacked|returned|departed|arrived|ruled|became|baptized|crucified|resurrected|preached|preaching|repent)\b/i;
const GENEALOGY_PATTERN = /\b(?:begat|generation(?:s)? of|genealogy|lineage)\b/i;
const SEMANTIC_DECOMPOSITION_PATTERN = /\b(thought|appeared|saying|bidden|took|knew her not|brought forth|called his name|call his name|fear not|save his people|fulfilled|spoken of the Lord by the prophet)\b/i;
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
  item.scopePath = scopePathForItem(item, type, index, enrichedContext, verseNumber, timelinePosition);
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
    ...(data.passageFunctions || []).map((item) => ({ ...item, scopeLayer: "passage_function" }))
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

  return enrichScopeItem(item, "source_discovery", index, activeAdapter);
}

function createSourceDiscoveryIndex(captures, activeAdapter) {
  const index = [];
  const seen = new Set();

  for (const capture of captures || []) {
    for (const link of capture?.sourceDiscoveryLinks || []) {
      const item = normalizeSourceDiscoveryItem(capture, link, activeAdapter, index.length);
      if (!item) continue;
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

function createPassageFunctions(captures, semanticEvents, relationshipGraph, prophecyLinks, canonicalIdentities) {
  const passageFunctions = [];
  const capture = (captures || [])[0] || {};
  const context = buildSourceContext(capture);
  const sourceText = sourceCaptureText(captures);
  const isMatthewOne = context.book === "Matthew" && String(context.chapter || "") === "1";
  if (!isMatthewOne) return passageFunctions;

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
      plainMeaning: "THE LORD sends AngEL Of THE LORD to instruct Joseph, reveal the child is conceived of the Holy Ghost, and reveal the name JESUS.",
      fulfillmentMeaning: "The name JESUS is revealed with mission meaning: He shall save His people from their sins.",
      evidence: ["the angel of THE LORD appeared unto him", "fear not to take unto thee Mary thy wife", "that which is conceived in her is of the Holy Ghost", "thou shalt call his name JESUS", "he shall save his people from their sins"],
      linkedThemes: ["divine instruction", "marriage instruction", "conception revelation", "name revelation", "mission meaning", "obedience"],
      relatedEntities: ["THE LORD", "AngEL Of THE LORD", "Joseph", "Mary", "Holy Ghost", "JESUS", "JESUS CHRIST"],
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
      relatedEntities: ["Scripture narrator", "THE LORD", "prophet", "JESUS CHRIST"],
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
      normalizedMeaning: "The child conceived in Mary is of the Holy Ghost",
      actor: "Angel of THE LORD",
      action: "revealed divine conception",
      recipient: "Joseph",
      target: "child conceived of the Holy Ghost",
      concerning: "Mary",
      participants: ["Angel of THE LORD", "Joseph", "Mary", "Holy Ghost", "child"],
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
      normalizedMeaning: "Scripture narrator frames the event as fulfillment of prophetic speech",
      actor: "Scripture narrator",
      action: "narrates fulfillment",
      eventType: "passive_fulfillment_narration",
      semanticCategory: "prophecy_fulfillment_context",
      participants: ["Scripture narrator", "Quoted prophet"],
      relationshipType: "fulfillment_narration",
      narrator: "Scripture narrator",
      narratorRole: "passive fulfillment narration",
      quotedSpeaker: /\bspoken of the Lord\b/i.test(text) ? "THE LORD" : "",
      quotedProphet: /\bprophet\b/i.test(text) ? "Quoted prophet" : "",
      confidence: "explicit"
    });
  }

  return subEvents;
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
    return "Scripture narrator";
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

  if (/\bpreach(?:ed|ing)?\b|\brepent\b|\bkingdom of heaven\b/i.test(text)) {
    return {
      sceneType: "preaching",
      sceneTitle: "John preaching repentance"
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
  if (!role?.actorName) return;
  addEntityRoleItem(
    items,
    seen,
    sourceContext,
    roleGroup,
    role.actorName,
    role.confidence || fallbackConfidence,
    evidence || role.reason || ""
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
    mission_reason_declaration: "mission_declaration"
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
    "mission_reason_declaration"
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
    if (events.length < 2 || uniqueTypes.size < 2) continue;
    const clusterOrder = {
      instruction_concerning_person: 1,
      conception_revelation: 2,
      name_revelation: 3,
      mission_reason_declaration: 4
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
      "Direct Actors",
      actor.actorName,
      "explicit",
      directReason?.actorReason || "direct actor timeline",
      directReason || {}
    );
  }

  for (const scene of sceneModels || []) {
    const context = scene.sourceContext || fallbackContext;
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
    ["scripture narrator", "Scripture narrator"],
    ["quoted prophet", "Quoted prophet"]
  ]);

  return aliases.get(normalized) || clean;
}

function entityRoleTypeFromGroup(roleGroup) {
  const normalized = normalizeWhitespace(roleGroup || "").toLowerCase();
  const map = new Map([
    ["direct actors", "directActor"],
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

  if (["adversary", "anti_god", "deceiver"].includes(type) || ["satan", "lucifer", "adversary", "perdition"].includes(text)) return "IIIIII";
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
    applyScopeIntegrity({
      domSemanticHints,
      mentionIndex,
      semanticEvents,
      relationshipGraph,
      canonicalIdentities,
      semanticFlowChains,
      sourceDiscoveryIndex,
      referenceGraph,
      passageFunctions
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
      passageFunctions
    }, activeAdapter);
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
      sourceDiscoveryCount: sourceDiscoveryIndex.length,
      referenceGraphCount: referenceGraph.length,
      passageFunctionCount: passageFunctions.length,
      scopedItemsCount: scopeIntegrity.scopedItemsCount,
      missingScopeCount: scopeIntegrity.missingScopeCount,
      analyzedAt: new Date().toISOString()
    };

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
      [SOURCE_ADAPTERS_KEY]: sourceAdapters,
      [ACTIVE_ADAPTER_KEY]: activeAdapter,
      [SCOPE_INTEGRITY_KEY]: scopeIntegrity,
      [ANALYSIS_STATUS_KEY]: status
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

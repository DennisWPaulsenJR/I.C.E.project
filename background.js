const DEFAULT_SETTINGS = {
  enabled: true,
  strictMode: true,
  highlightPronouns: false,
  autoCaptureOnPageLoad: true
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
const SEMANTIC_EVENTS_KEY = "ICE_SEMANTIC_EVENTS";
const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
const PIPELINE_THROTTLE_MS = 3500;

const ACTION_PATTERN = /\b(born|died|began|ended|founded|created|built|destroyed|conquered|traveled|appeared|said|commanded|signed|wrote|rose|fell|attacked|returned|departed|arrived|ruled|became|baptized|crucified|resurrected|preached|preaching|repent)\b/i;
const GENEALOGY_PATTERN = /\b(?:begat|generation(?:s)? of|genealogy|lineage)\b/i;
const SEMANTIC_DECOMPOSITION_PATTERN = /\b(thought|appeared|saying|bidden|took|knew her not|brought forth|called his name|fear not)\b/i;
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
// Mormon / Conference Talks collections, speaker/date metadata, source and
// historical chronology, cross-document references, and semantic parent/child
// trees: Corpus -> Collection -> Source -> Chapter -> Scene -> Event -> Action.
function buildSourceContext(capture) {
  const { book, chapter } = parseScriptureBookAndChapter(capture || {});
  const url = capture?.url || "";
  const title = capture?.title || "";
  const looksScripture = /\b(Matthew|Mark|Luke|John)\b/i.test(`${title} ${url}`) ||
    /\/scriptures\//i.test(url);

  return {
    sourceCaptureId: capture?.id || "",
    sourceTitle: title,
    sourceUrl: url,
    sourceType: looksScripture ? "scripture" : "unknown",
    collection: looksScripture ? "scripture" : "unknown",
    book,
    chapter,
    section: "",
    explicitDate: "",
    inferredDate: "",
    timeRange: "",
    confidence: looksScripture ? "probable" : "possible"
  };
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

function createSemanticSubEvent(capture, sequenceIndex, sourceSnippet, config) {
  const sourceCaptureId = capture?.id || "";
  const originalText = normalizeWhitespace(config.originalText || sourceSnippet || "");
  const normalizedMeaning = normalizeWhitespace(config.normalizedMeaning || originalText);
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
    eventType: config.eventType || "semantic_event",
    semanticCategory: config.semanticCategory || "unknown",
    confidence: config.confidence || "probable",
    sourceSnippet: trimText(sourceSnippet || originalText, 260),
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
      normalizedMeaning: "Joseph received instruction concerning Mary",
      actor: "Angel of THE LORD",
      action: "instructed",
      recipient: "Joseph",
      concerning: "Mary",
      target: "Joseph",
      participants: ["Angel of THE LORD", "Joseph", "Mary"],
      relationshipType: "instruction_recipient_concerning",
      authorityChain: ["THE LORD", "Angel of THE LORD", "Joseph"],
      eventType: "instruction_concerning_person",
      semanticCategory: "instruction",
      confidence: "explicit"
    });
  }

  if (/\btook unto him his wife\b|\btake unto thee Mary thy wife\b/i.test(text)) {
    push({
      originalText: /\btook unto him his wife\b/i.test(text) ? "Joseph took unto him his wife" : "take unto thee Mary thy wife",
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

  if (/\bJoseph\b/i.test(text) &&
    /\b(young child|the child|Jesus|Christ)\b/i.test(text) &&
    /\b(took|departed|returned|came|arose)\b/i.test(text)) {
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

function createEntityRoleItem(sourceContext, roleGroup, entityName, confidence = "probable", evidence = "") {
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
    evidence: trimText(evidence, 160)
  };
}

function addEntityRoleItem(items, seen, sourceContext, roleGroup, entityName, confidence, evidence) {
  const item = createEntityRoleItem(sourceContext, roleGroup, entityName, confidence, evidence);
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
    normalizeWhitespace(item.normalizedMeaning || item.sourceSnippet || "").toLowerCase()
  ].join("|");
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

  // ICE_SEMANTIC_EVENTS is intentionally a current-page derived index for now.
  // Future architecture can scale this sourceContext-aware shape across Bible,
  // conference talks, sermons, interfaith corpora, relationship graphs,
  // doctrine graphs, and query layers without making the popup do heavy corpus
  // work. Comparative layers should preserve tradition-specific differences
  // instead of forcing flattened doctrinal conclusions.
  return semanticEvents.sort((a, b) => Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0));
}
function createEntityRoleItems(captures, eventItems, actorTimelines, sceneModels) {
  const items = [];
  const seen = new Set();
  const fallbackContext = buildSourceContext(captures.find((capture) => capture?.text) || {});

  for (const actor of actorTimelines || []) {
    if (!actor.actorName || actor.actorName === "Unknown actor") continue;
    addEntityRoleItem(
      items,
      seen,
      actor.sourceContexts?.[0] || fallbackContext,
      "Direct Actors",
      actor.actorName,
      "explicit",
      "direct actor timeline"
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
      addEntityRoleItem(items, seen, context, "Covenant / Family Participants", "Mary", "explicit", "Mary thy wife");
      addEntityRoleItem(items, seen, context, "Covenant / Family Participants", "Joseph", "probable", "take unto thee Mary thy wife");
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
      sceneModels
    );
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

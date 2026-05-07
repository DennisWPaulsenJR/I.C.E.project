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
const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
const PIPELINE_THROTTLE_MS = 3500;

const ACTION_PATTERN = /\b(born|died|began|ended|founded|created|built|destroyed|conquered|traveled|appeared|said|commanded|signed|wrote|rose|fell|attacked|returned|departed|arrived|ruled|became|baptized|crucified|resurrected)\b/i;
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

function createTimelineItem(capture, detectedDateText, normalizedYear, contextSnippet) {
  const sourceCaptureId = capture.id || "";
  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${detectedDateText}|${contextSnippet}`)}`,
    sourceCaptureId,
    sourceTitle: capture.title || "",
    sourceUrl: capture.url || "",
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

function createEventItem(capture, sentence, sequenceIndex) {
  const date = findDateInSentence(sentence);
  const eventText = normalizeWhitespace(sentence);
  const sourceCaptureId = capture.id || "";
  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${sequenceIndex}|${eventText}`)}`,
    sourceCaptureId,
    sourceTitle: capture.title || "",
    sourceUrl: capture.url || "",
    eventText,
    eventType: isSourceSummarySentence(eventText, sequenceIndex)
      ? "source_summary"
      : "narrative_event",
    sequenceIndex,
    detectedDateText: date.detectedDateText,
    normalizedYear: date.normalizedYear,
    orderingCue: detectOrderingCue(sentence),
    confidence: 0.7,
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
      (ACTION_PATTERN.test(sentence) || detectOrderingCue(sentence))
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
        orderingReason: item.orderingReason || ""
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
  if (/\bHerod\b|\bthe king\b/i.test(text)) actors.add("Herod");
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

  if ((primaryActors.has("Herod") || /\bHerod\b|\bthe king\b/i.test(text)) &&
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

  if (/\bappeared unto\b|\bappeareth to\b/i.test(text)) {
    if (participants.has("Joseph") && /\bangel of the Lord\b/i.test(text)) {
      push("Angel of the Lord", "Joseph", "witnessed manifestation", "probable");
    }
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

function createProphecyLink(prophecy, fulfillment, distance) {
  const sourceCaptureId = fulfillment.sourceCaptureId || prophecy.sourceCaptureId || "";
  const prophecyText = prophecy.principleText || "";
  const fulfillmentText = fulfillment.principleText || "";
  const contextSnippet = trimText([
    prophecy.contextSnippet || prophecyText,
    fulfillment.contextSnippet || fulfillmentText
  ].filter(Boolean).join(" "), 260);

  return {
    id: `${Date.now()}-${textHash(`${sourceCaptureId}|${prophecyText}|${fulfillmentText}`)}`,
    sourceCaptureId,
    prophecyText,
    fulfillmentText,
    contextSnippet,
    linkType: "prophecy-fulfillment",
    confidence: distance <= 2 ? "explicit" : "probable"
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
      const nearest = prophecies
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
    const interactionGraph = createInteractionGraph(orderedEvents, actorTimelines);
    const dedupedInteractionGraph = dedupeInteractionGraph(interactionGraph);
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

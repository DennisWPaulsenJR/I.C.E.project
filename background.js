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
const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
const PIPELINE_THROTTLE_MS = 3500;

const ACTION_PATTERN = /\b(born|died|began|ended|founded|created|built|destroyed|conquered|traveled|appeared|said|commanded|signed|wrote|rose|fell|attacked|returned|departed|arrived|ruled|became|baptized|crucified|resurrected)\b/i;
const PRINCIPLE_PATTERN = /\b(fulfilled|written|prophet|commanded|warned|worship|revelation|dream|blessing|law|mercy|obedience|faith|covenant|kingdom|righteousness|salvation)\b/i;
const PURPOSE_PRINCIPLE_PATTERN = /\b(that it might be fulfilled|for thus it is written|that shall rule|called a Nazarene)\b/i;
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
  `^(?:\\d+[:.)]?\\s*)?(?:(?:and|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\\s+)*(?:the\\s+)?${ACTOR_SOURCE_PATTERN}\\b`,
  "i"
);
const PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(he|she|they)\b/i;
const PLURAL_PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(they)\b/i;
const SINGULAR_PRONOUN_SUBJECT_PATTERN = /^(?:\d+[:.)]?\s*)?(?:(?:and|then|afterward|later|next|finally|subsequently|after that|before that|before this|before then|now|when)\s+)*(he|she)\b/i;

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
  const seen = new Set();
  const sources = [];

  for (const capture of [latest, ...history]) {
    if (!capture?.text) continue;
    const key = [
      capture.id || "",
      capture.url || "",
      textHash(capture.text || "")
    ].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push(capture);
  }

  return sources;
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
    sequenceIndex,
    detectedDateText: date.detectedDateText,
    normalizedYear: date.normalizedYear,
    orderingCue: detectOrderingCue(sentence),
    confidence: 0.7,
    extractedAt: new Date().toISOString()
  };
}

function extractEventItemsFromCapture(capture) {
  return splitSentences(capture.text || "")
    .map((sentence, index) => ({ sentence: normalizeWhitespace(sentence), index }))
    .filter(({ sentence }) => sentence && (ACTION_PATTERN.test(sentence) || detectOrderingCue(sentence)))
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

function stripLeadingSentenceNoise(sentence) {
  return normalizeWhitespace(sentence)
    .replace(/^(?:\d+[:.)]?\s*)?/, "")
    .replace(/^(?:and|then|afterward|later|next|finally|subsequently|now|when),?\s+/i, "")
    .replace(/^(?:after that|before that|before this|before then),?\s+/i, "");
}

function leadingSubjectActor(sentence) {
  const normalized = stripLeadingSentenceNoise(sentence);
  const leadingActor = normalized.match(LEADING_ACTOR_PATTERN);
  if (leadingActor) return normalizeActorName(leadingActor[1]);
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

function actorForEvent(eventItem, actorMemory) {
  const text = eventItem.eventText || "";
  const normalized = stripLeadingSentenceNoise(text);
  const sourceActor = sourceActorOverride(eventItem);

  if (sourceActor) return sourceActor;

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
        const key = `${item.sourceCaptureId}|${item.principleType}|${item.principleText}`;
        if (!seenPrinciples.has(key)) {
          seenPrinciples.add(key);
          principleItems.push(item);
        }
      }
    }

    const orderedEvents = createOrderedEvents(eventItems);
    const actorTimelines = dedupeActorTimelines(createActorTimelines(orderedEvents));
    const status = {
      reason,
      captureCount: captures.length,
      timelineCount: timelineItems.length,
      eventCount: eventItems.length,
      orderedEventCount: orderedEvents.length,
      actorTimelineCount: actorTimelines.length,
      principleCount: principleItems.length,
      analyzedAt: new Date().toISOString()
    };

    await chrome.storage.local.set({
      [TIMELINE_STORAGE_KEY]: timelineItems,
      [EVENT_STORAGE_KEY]: eventItems,
      [ORDERED_EVENTS_KEY]: orderedEvents,
      [ACTOR_TIMELINES_KEY]: actorTimelines,
      [PRINCIPLE_STORAGE_KEY]: principleItems,
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

document.addEventListener("DOMContentLoaded", async () => {
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
  const TIMELINE_STORAGE_KEY = "ICE_TIMELINE_ITEMS";
  const EVENT_STORAGE_KEY = "ICE_EVENT_ITEMS";
  const ORDERED_EVENTS_KEY = "ICE_ORDERED_EVENTS";
  const FORMATTER_STATUS_KEY = "ICE_FORMATTER_STATUS";
  const ACTION_INDICATORS = [
    "born",
    "died",
    "began",
    "ended",
    "founded",
    "created",
    "built",
    "destroyed",
    "conquered",
    "traveled",
    "appeared",
    "said",
    "commanded",
    "signed",
    "wrote",
    "rose",
    "fell",
    "attacked",
    "returned",
    "departed",
    "arrived",
    "ruled",
    "became",
    "baptized",
    "crucified",
    "resurrected"
  ];
  const ORDERING_CUES = [
    "first",
    "then",
    "after that",
    "afterward",
    "before that",
    "before this",
    "before then",
    "later",
    "next",
    "finally",
    "subsequently"
  ];
  const ACTION_PATTERN = new RegExp(
    `\\b(${ACTION_INDICATORS.join("|")})\\b`,
    "i"
  );
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
  const MONTH_PATTERN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Jan\\.?",
    "Feb\\.?",
    "Mar\\.?",
    "Apr\\.?",
    "Jun\\.?",
    "Jul\\.?",
    "Aug\\.?",
    "Sep\\.?",
    "Sept\\.?",
    "Oct\\.?",
    "Nov\\.?",
    "Dec\\.?"
  ].join("|");
  const FULL_DATE_PATTERN = new RegExp(
    `\\b(?:${MONTH_PATTERN})\\s+\\d{1,2},\\s+(\\d{3,4})\\b`,
    "gi"
  );
  const YEAR_PATTERN = /\b(1[5-9]\d{2}|20\d{2})\b/g;
  const defaults = {
    enabled: true,
    strictMode: true,
    highlightPronouns: false
  };

  const settings = await chrome.storage.sync.get(defaults);

  for (const [key, value] of Object.entries(settings)) {
    const input = document.getElementById(key);
    if (input) input.checked = value;
  }

  async function saveSetting(id) {
    const value = document.getElementById(id).checked;
    await chrome.storage.sync.set({
      [id]: value
    });
  }

  async function rerunOnActiveTab(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: "ICE_RERUN_FORMATTER"
      });
    } catch (_error) {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["engine.js", "content.js"]
      });
    }
  }

  async function sendMessageToActiveTab(message) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab?.id) {
      throw new Error("No active tab found.");
    }

    try {
      return await chrome.tabs.sendMessage(tab.id, message);
    } catch (_error) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["engine.js", "content.js"]
      });

      return chrome.tabs.sendMessage(tab.id, message);
    }
  }

  function setCaptureStatus(message) {
    document.getElementById("captureStatus").textContent = message;
  }

  function trimText(text, maxLength = 120) {
    const normalized = normalizeWhitespace(text);
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 3).trim()}...`;
  }

  function shortTitle(title) {
    return trimText(title || "Untitled source", 42);
  }

  function renderCapture(capture) {
    const hasCapture = Boolean(capture?.text);

    document.getElementById("captureSummary").hidden = !hasCapture;
    document.getElementById("copyCapture").disabled = !hasCapture;
    document.getElementById("clearCapture").disabled = !hasCapture;

    document.getElementById("captureTitle").textContent = capture?.title || "";
    document.getElementById("captureWords").textContent = capture?.wordCount ?? 0;
    document.getElementById("captureCharacters").textContent =
      capture?.characterCount ?? 0;
    document.getElementById("captureDivineRefs").textContent =
      capture?.divineReferenceCount ?? 0;
  }

  function renderHistoryCount(history) {
    const count = Array.isArray(history) ? history.length : 0;

    document.getElementById("historyCount").textContent = count;
    document.getElementById("clearHistory").disabled = count === 0;
    document.getElementById("extractTimeline").disabled = count === 0;
    document.getElementById("extractEvents").disabled = count === 0;
  }

  function renderFormatterStatus(status) {
    document.getElementById("formatterMatchCount").textContent =
      status?.matchCount ?? 0;
  }

  function renderTimeline(items) {
    const timelineItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("timelineSnippets");

    document.getElementById("timelineCount").textContent = timelineItems.length;
    document.getElementById("clearTimeline").disabled = timelineItems.length === 0;
    document.getElementById("copyTimelineItems").disabled =
      timelineItems.length === 0;
    snippets.textContent = "";

    // Phase 3.5 review preview. Future work should add event ordering,
    // confidence scoring UI, manual correction/editing, and a visual timeline
    // graph without changing the local storage contract below.
    for (const item of timelineItems.slice(0, 5)) {
      const li = document.createElement("li");
      const date = document.createElement("strong");
      const source = document.createElement("span");
      const context = document.createElement("p");

      date.textContent = item.detectedDateText || "Undated";
      source.textContent = shortTitle(item.sourceTitle);
      context.textContent = trimText(item.contextSnippet);

      li.append(date, source, context);
      snippets.appendChild(li);
    }
  }

  function renderEvents(items) {
    const eventItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("eventSnippets");

    document.getElementById("eventCount").textContent = eventItems.length;
    document.getElementById("clearEvents").disabled = eventItems.length === 0;
    document.getElementById("copyEventItems").disabled = eventItems.length === 0;
    document.getElementById("orderEvents").disabled = eventItems.length === 0;
    snippets.textContent = "";

    // Phase 3.5 read-only event review. Future work should add event ordering,
    // confidence scoring UI, manual correction/editing, and a visual timeline
    // graph once review needs are clearer.
    for (const item of eventItems.slice(0, 5)) {
      const li = document.createElement("li");
      const eventText = document.createElement("p");
      const meta = document.createElement("span");

      eventText.textContent = trimText(item.eventText);
      meta.textContent = item.orderingCue
        ? `Cue: ${item.orderingCue}`
        : shortTitle(item.sourceTitle);

      li.append(eventText, meta);
      snippets.appendChild(li);
    }
  }

  function renderOrderedEvents(items) {
    const orderedItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("orderedEventSnippets");

    document.getElementById("orderedEventCount").textContent = orderedItems.length;
    document.getElementById("clearOrderedEvents").disabled =
      orderedItems.length === 0;
    document.getElementById("copyOrderedEvents").disabled =
      orderedItems.length === 0;
    snippets.textContent = "";

    for (const item of orderedItems.slice(0, 5)) {
      const li = document.createElement("li");
      const eventText = document.createElement("p");
      const reason = document.createElement("span");

      eventText.textContent = `${item.sequenceOrder}. ${trimText(item.eventText)}`;
      reason.textContent = item.orderingReason;

      li.append(eventText, reason);
      snippets.appendChild(li);
    }
  }

  function textHash(text) {
    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
      hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function createHistoryEntry(capture) {
    const hash = textHash(capture.text || "");
    const capturedAt = capture.capturedAt || new Date().toISOString();

    return {
      id: `${Date.now()}-${hash}`,
      title: capture.title || "",
      url: capture.url || "",
      capturedAt,
      wordCount: capture.wordCount || 0,
      charCount: capture.characterCount || capture.charCount || 0,
      divineReferenceCount: capture.divineReferenceCount || 0,
      text: capture.text || "",
      textHash: hash
    };
  }

  async function getCaptureHistory() {
    const data = await chrome.storage.local.get(CAPTURE_HISTORY_KEY);
    return Array.isArray(data[CAPTURE_HISTORY_KEY])
      ? data[CAPTURE_HISTORY_KEY]
      : [];
  }

  async function loadCaptureHistory() {
    renderHistoryCount(await getCaptureHistory());
  }

  async function loadFormatterStatus() {
    const data = await chrome.storage.local.get(FORMATTER_STATUS_KEY);
    renderFormatterStatus(data[FORMATTER_STATUS_KEY]);
  }

  async function getTimelineItems() {
    const data = await chrome.storage.local.get(TIMELINE_STORAGE_KEY);
    return Array.isArray(data[TIMELINE_STORAGE_KEY])
      ? data[TIMELINE_STORAGE_KEY]
      : [];
  }

  async function loadTimelineItems() {
    renderTimeline(await getTimelineItems());
  }

  async function getEventItems() {
    const data = await chrome.storage.local.get(EVENT_STORAGE_KEY);
    return Array.isArray(data[EVENT_STORAGE_KEY])
      ? data[EVENT_STORAGE_KEY]
      : [];
  }

  async function loadEventItems() {
    renderEvents(await getEventItems());
  }

  async function getOrderedEvents() {
    const data = await chrome.storage.local.get(ORDERED_EVENTS_KEY);
    return Array.isArray(data[ORDERED_EVENTS_KEY])
      ? data[ORDERED_EVENTS_KEY]
      : [];
  }

  async function loadOrderedEvents() {
    renderOrderedEvents(await getOrderedEvents());
  }

  async function loadLatestCapture() {
    const data = await chrome.storage.local.get(CAPTURE_STORAGE_KEY);
    renderCapture(data[CAPTURE_STORAGE_KEY]);
  }

  async function saveLatestCapture(capture) {
    await chrome.storage.local.set({
      [CAPTURE_STORAGE_KEY]: capture
    });

    renderCapture(capture);
  }

  async function saveCaptureToHistory(capture) {
    if (!capture?.text) {
      return { saved: false, duplicate: false, history: await getCaptureHistory() };
    }

    const entry = createHistoryEntry(capture);
    const history = await getCaptureHistory();
    const duplicate = history.some((item) =>
      item.url === entry.url && item.textHash === entry.textHash
    );

    if (duplicate) {
      return { saved: false, duplicate: true, history };
    }

    // Phase 2.5/3.7 foundation: captures are automatically persisted locally
    // as future input for document library, timeline extraction, and historical
    // comparison. No backend or upload path is attached.
    const nextHistory = [entry, ...history];
    await chrome.storage.local.set({
      [CAPTURE_HISTORY_KEY]: nextHistory
    });

    return { saved: true, duplicate: false, history: nextHistory };
  }

  async function captureActivePage() {
    setCaptureStatus("Capturing...");

    const response = await sendMessageToActiveTab({
      type: "ICE_CAPTURE_PAGE_TEXT"
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Capture failed.");
    }

    await saveLatestCapture(response.capture);

    const result = await saveCaptureToHistory(response.capture);
    renderHistoryCount(result.history);
    setCaptureStatus(result.duplicate
      ? "Captured; duplicate already saved."
      : "Captured and saved."
    );
  }

  async function copyLatestCapture() {
    const data = await chrome.storage.local.get(CAPTURE_STORAGE_KEY);
    const capture = data[CAPTURE_STORAGE_KEY];

    if (!capture?.text) return;

    await navigator.clipboard.writeText(capture.text);
    setCaptureStatus("Copied.");
  }

  async function clearLatestCapture() {
    await chrome.storage.local.remove(CAPTURE_STORAGE_KEY);
    renderCapture(null);
    setCaptureStatus("Cleared.");
  }

  async function clearCaptureHistory() {
    await chrome.storage.local.remove(CAPTURE_HISTORY_KEY);
    renderHistoryCount([]);
    setCaptureStatus("History cleared.");
  }

  function normalizeWhitespace(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function cleanCopiedText(text) {
    return normalizeWhitespace(text)
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function splitSentences(text) {
    const protectedText = normalizeWhitespace(text)
      .replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\./gi, "$1<dot>");

    return protectedText
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.replace(/<dot>/g, "."))
      .filter(Boolean);
  }

  function contextForMatch(sentence, matchIndex, matchLength) {
    const normalized = normalizeWhitespace(sentence);

    if (normalized.length <= 220) return normalized;

    const center = matchIndex + Math.floor(matchLength / 2);
    const start = Math.max(0, center - 100);
    const end = Math.min(normalized.length, center + 120);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < normalized.length ? "..." : "";

    return `${prefix}${normalized.slice(start, end).trim()}${suffix}`;
  }

  function createTimelineItem(capture, detectedDateText, normalizedYear, contextSnippet) {
    const sourceCaptureId = capture.id || "";
    const hashInput = [
      sourceCaptureId,
      capture.url || "",
      detectedDateText,
      contextSnippet
    ].join("|");

    return {
      id: `${Date.now()}-${textHash(hashInput)}`,
      sourceCaptureId,
      sourceTitle: capture.title || "",
      sourceUrl: capture.url || "",
      detectedDateText,
      normalizedYear,
      contextSnippet,
      extractedAt: new Date().toISOString()
    };
  }

  function findDateInSentence(sentence) {
    FULL_DATE_PATTERN.lastIndex = 0;
    YEAR_PATTERN.lastIndex = 0;

    const fullDate = FULL_DATE_PATTERN.exec(sentence);
    if (fullDate) {
      return {
        detectedDateText: fullDate[0],
        normalizedYear: Number(fullDate[1])
      };
    }

    const year = YEAR_PATTERN.exec(sentence);
    if (year) {
      return {
        detectedDateText: year[0],
        normalizedYear: Number(year[0])
      };
    }

    return {
      detectedDateText: "",
      normalizedYear: null
    };
  }

  function confidenceForEvent(hasAction, hasOrderingCue, hasDate) {
    let confidence = 0.45;

    if (hasAction) confidence += 0.25;
    if (hasOrderingCue) confidence += 0.15;
    if (hasDate) confidence += 0.15;

    return Math.min(0.95, Number(confidence.toFixed(2)));
  }

  function detectOrderingCue(sentence) {
    const normalized = normalizeWhitespace(sentence).toLowerCase();
    const startCue = normalized.match(
      /^(?:\d+[:.)]\s*)?(first|then|afterward|later|next|finally|subsequently)\b/
    );
    const startPhrase = normalized.match(
      /^(?:\d+[:.)]\s*)?(after that|before that|before this|before then)\b/
    );
    const clauseCue = normalized.match(
      /(?:^|[.;:]\s+|\s(?:and|but)\s+)(then|afterward|later|next|finally|subsequently)\b/
    );
    const clausePhrase = normalized.match(
      /(?:^|[.;:]\s+|\s(?:and|but)\s+)(after that|before that|before this|before then)\b/
    );

    if (startPhrase) return startPhrase[1];
    if (startCue) return startCue[1];
    if (clausePhrase && clausePhrase.index <= 40) return clausePhrase[1];
    if (clauseCue && clauseCue.index <= 40) return clauseCue[1];

    return "";
  }

  function createEventItem(capture, sentence, sequenceIndex) {
    const orderingCue = detectOrderingCue(sentence);
    const actionMatch = sentence.match(ACTION_PATTERN);
    const date = findDateInSentence(sentence);
    const eventText = normalizeWhitespace(sentence);
    const sourceCaptureId = capture.id || "";
    const hashInput = [
      sourceCaptureId,
      sequenceIndex,
      eventText
    ].join("|");

    return {
      id: `${Date.now()}-${textHash(hashInput)}`,
      sourceCaptureId,
      sourceTitle: capture.title || "",
      sourceUrl: capture.url || "",
      eventText,
      sequenceIndex,
      detectedDateText: date.detectedDateText,
      normalizedYear: date.normalizedYear,
      orderingCue,
      confidence: confidenceForEvent(
        Boolean(actionMatch),
        Boolean(orderingCue),
        Boolean(date.detectedDateText)
      ),
      extractedAt: new Date().toISOString()
    };
  }

  function extractEventItemsFromCapture(capture) {
    const sentences = splitSentences(capture.text || "");
    const items = [];

    sentences.forEach((sentence, index) => {
      const normalized = normalizeWhitespace(sentence);
      if (!normalized) return;

      const hasAction = ACTION_PATTERN.test(normalized);
      const hasOrderingCue = Boolean(detectOrderingCue(normalized));

      if (!hasAction && !hasOrderingCue) return;

      ACTION_PATTERN.lastIndex = 0;
      items.push(createEventItem(capture, normalized, index));
    });

    return items;
  }

  function extractTimelineItemsFromCapture(capture) {
    const items = [];
    const sentences = splitSentences(capture.text || "");

    for (const sentence of sentences) {
      const seenInSentence = new Set();

      FULL_DATE_PATTERN.lastIndex = 0;
      YEAR_PATTERN.lastIndex = 0;

      let dateMatch;
      while ((dateMatch = FULL_DATE_PATTERN.exec(sentence)) !== null) {
        const detectedDateText = dateMatch[0];
        const normalizedYear = Number(dateMatch[1]);
        const contextSnippet = contextForMatch(
          sentence,
          dateMatch.index,
          detectedDateText.length
        );

        seenInSentence.add(`${dateMatch.index}:${detectedDateText}`);
        items.push(createTimelineItem(
          capture,
          detectedDateText,
          normalizedYear,
          contextSnippet
        ));
      }

      let yearMatch;
      while ((yearMatch = YEAR_PATTERN.exec(sentence)) !== null) {
        const detectedDateText = yearMatch[0];
        const fullDateAlreadyCaptured = Array.from(seenInSentence).some((key) => {
          const [indexText] = key.split(":");
          const index = Number(indexText);
          return yearMatch.index >= index && yearMatch.index <= index + 32;
        });

        if (fullDateAlreadyCaptured) continue;

        items.push(createTimelineItem(
          capture,
          detectedDateText,
          Number(detectedDateText),
          contextForMatch(sentence, yearMatch.index, detectedDateText.length)
        ));
      }
    }

    return items;
  }

  async function extractTimeline() {
    const history = await getCaptureHistory();

    if (history.length === 0) {
      setCaptureStatus("No saved captures to extract.");
      return;
    }

    const seen = new Set();
    const timelineItems = [];

    for (const capture of history) {
      for (const item of extractTimelineItemsFromCapture(capture)) {
        const key = [
          item.sourceCaptureId,
          item.detectedDateText,
          item.contextSnippet
        ].join("|");

        if (seen.has(key)) continue;
        seen.add(key);
        timelineItems.push(item);
      }
    }

    // Phase 3 local MVP. Phase 4 should add timeline review UI, event editing,
    // source comparison, and AI-assisted extraction on top of these local items.
    await chrome.storage.local.set({
      [TIMELINE_STORAGE_KEY]: timelineItems
    });

    renderTimeline(timelineItems);
    setCaptureStatus(`Extracted ${timelineItems.length} timeline item(s).`);
  }

  async function clearTimeline() {
    await chrome.storage.local.remove(TIMELINE_STORAGE_KEY);
    renderTimeline([]);
    setCaptureStatus("Timeline cleared.");
  }

  function formatTimelineItemsForCopy(items) {
    return items.map((item, index) => [
      `${index + 1}. ${item.detectedDateText || "Undated"}`,
      `Source: ${item.sourceTitle || "Untitled source"}`,
      `URL: ${item.sourceUrl || ""}`,
      `Context: ${item.contextSnippet || ""}`
    ].map(cleanCopiedText).join("\n")).join("\n\n");
  }

  async function copyTimelineItems() {
    const items = await getTimelineItems();

    if (items.length === 0) return;

    await navigator.clipboard.writeText(formatTimelineItemsForCopy(items));
    setCaptureStatus("Timeline items copied.");
  }

  async function extractEvents() {
    const history = await getCaptureHistory();

    if (history.length === 0) {
      setCaptureStatus("No saved captures to extract.");
      return;
    }

    const seen = new Set();
    const eventItems = [];

    for (const capture of history) {
      for (const item of extractEventItemsFromCapture(capture)) {
        const key = [
          item.sourceCaptureId,
          item.sequenceIndex,
          item.eventText
        ].join("|");

        if (seen.has(key)) continue;
        seen.add(key);
        eventItems.push(item);
      }
    }

    // Phase 3.1 local event candidates. Future work should add a timeline
    // ordering engine, "what happened first?" reasoning, event graph
    // visualization, and AI-assisted event cleanup.
    await chrome.storage.local.set({
      [EVENT_STORAGE_KEY]: eventItems
    });

    renderEvents(eventItems);
    setCaptureStatus(`Extracted ${eventItems.length} event candidate(s).`);
  }

  async function clearEvents() {
    await chrome.storage.local.remove(EVENT_STORAGE_KEY);
    renderEvents([]);
    setCaptureStatus("Events cleared.");
  }

  function sourceIndexForEvent(eventItem, index) {
    const baseIndex = Number.isFinite(Number(eventItem.sequenceIndex))
      ? Number(eventItem.sequenceIndex)
      : index;

    return baseIndex;
  }

  function hasNormalizedYear(eventItem) {
    return eventItem.normalizedYear !== null &&
      eventItem.normalizedYear !== "" &&
      Number.isFinite(Number(eventItem.normalizedYear));
  }

  function orderingScore(eventItem, index) {
    const sourceIndex = sourceIndexForEvent(eventItem, index);
    const cueWeight = ORDERING_WEIGHTS[eventItem.orderingCue] ?? 0;

    return (sourceIndex * 100) + cueWeight;
  }

  function orderingReasonForEvent(eventItem) {
    if (hasNormalizedYear(eventItem)) {
      return `date/year ${eventItem.normalizedYear}`;
    }

    if (eventItem.orderingCue) {
      return `ordering cue "${eventItem.orderingCue}"`;
    }

    return `source sequence ${eventItem.sequenceIndex ?? 0}`;
  }

  function createOrderedEvents(eventItems) {
    const grouped = new Map();

    for (const item of eventItems) {
      const key = item.sourceCaptureId || item.sourceUrl || "unknown-source";
      const existing = grouped.get(key) || [];
      existing.push(item);
      grouped.set(key, existing);
    }

    const ordered = [];

    for (const group of grouped.values()) {
      const indexedGroup = group.map((item, index) => ({ item, index }));
      const sorted = indexedGroup.sort((a, b) => {
        const aHasYear = hasNormalizedYear(a.item);
        const bHasYear = hasNormalizedYear(b.item);

        if (aHasYear && bHasYear &&
          Number(a.item.normalizedYear) !== Number(b.item.normalizedYear)) {
          return Number(a.item.normalizedYear) - Number(b.item.normalizedYear);
        }

        const aScore = orderingScore(a.item, a.index);
        const bScore = orderingScore(b.item, b.index);

        if (aScore !== bScore) return aScore - bScore;
        return sourceIndexForEvent(a.item, a.index) -
          sourceIndexForEvent(b.item, b.index);
      });

      sorted.forEach(({ item }, index) => {
        ordered.push({
          ...item,
          sequenceOrder: index + 1,
          orderingReason: orderingReasonForEvent(item),
          orderedAt: new Date().toISOString()
        });
      });
    }

    return ordered;
  }

  async function orderEvents() {
    const eventItems = await getEventItems();

    if (eventItems.length === 0) {
      setCaptureStatus("No event candidates to order.");
      return;
    }

    // Phase 4 MVP: this assigns local sequence order only. Phase 4.5 actor
    // grouping remains roadmap-only and should not be implemented here.
    const orderedEvents = createOrderedEvents(eventItems);

    await chrome.storage.local.set({
      [ORDERED_EVENTS_KEY]: orderedEvents
    });

    renderOrderedEvents(orderedEvents);
    setCaptureStatus(`Ordered ${orderedEvents.length} event(s).`);
  }

  async function clearOrderedEvents() {
    await chrome.storage.local.remove(ORDERED_EVENTS_KEY);
    renderOrderedEvents([]);
    setCaptureStatus("Ordered events cleared.");
  }

  function formatEventItemsForCopy(items) {
    return items.map((item, index) => [
      `${index + 1}. ${item.eventText || ""}`,
      `Source: ${item.sourceTitle || "Untitled source"}`,
      `URL: ${item.sourceUrl || ""}`,
      item.orderingCue ? `Ordering cue: ${item.orderingCue}` : "",
      item.detectedDateText ? `Date: ${item.detectedDateText}` : ""
    ].filter(Boolean).map(cleanCopiedText).join("\n")).join("\n\n");
  }

  async function copyEventItems() {
    const items = await getEventItems();

    if (items.length === 0) return;

    await navigator.clipboard.writeText(formatEventItemsForCopy(items));
    setCaptureStatus("Event items copied.");
  }

  function formatOrderedEventsForCopy(items) {
    return items.map((item) => [
      `${item.sequenceOrder}. ${item.eventText || ""}`,
      `Reason: ${item.orderingReason || ""}`,
      `Source: ${item.sourceTitle || "Untitled source"}`,
      `URL: ${item.sourceUrl || ""}`,
      item.detectedDateText ? `Date: ${item.detectedDateText}` : ""
    ].filter(Boolean).map(cleanCopiedText).join("\n")).join("\n\n");
  }

  async function copyOrderedEvents() {
    const items = await getOrderedEvents();

    if (items.length === 0) return;

    await navigator.clipboard.writeText(formatOrderedEventsForCopy(items));
    setCaptureStatus("Ordered events copied.");
  }

  document.getElementById("enabled")
    .addEventListener("change", () => saveSetting("enabled"));

  document.getElementById("strictMode")
    .addEventListener("change", () => saveSetting("strictMode"));

  document.getElementById("highlightPronouns")
    .addEventListener("change", () => saveSetting("highlightPronouns"));

  document.getElementById("rerun")
    .addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      if (tab?.id) {
        await rerunOnActiveTab(tab.id);
      }

      window.close();
    });

  document.getElementById("capture")
    .addEventListener("click", () => {
      captureActivePage().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyCapture")
    .addEventListener("click", () => {
      copyLatestCapture().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearHistory")
    .addEventListener("click", () => {
      clearCaptureHistory().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("extractTimeline")
    .addEventListener("click", () => {
      extractTimeline().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearTimeline")
    .addEventListener("click", () => {
      clearTimeline().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyTimelineItems")
    .addEventListener("click", () => {
      copyTimelineItems().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("extractEvents")
    .addEventListener("click", () => {
      extractEvents().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearEvents")
    .addEventListener("click", () => {
      clearEvents().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyEventItems")
    .addEventListener("click", () => {
      copyEventItems().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("orderEvents")
    .addEventListener("click", () => {
      orderEvents().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearOrderedEvents")
    .addEventListener("click", () => {
      clearOrderedEvents().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyOrderedEvents")
    .addEventListener("click", () => {
      copyOrderedEvents().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearCapture")
    .addEventListener("click", () => {
      clearLatestCapture().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  // Phase 2 foundation: latest capture stays local for the future document
  // library, timeline extraction, and historical analysis flows.
  await loadLatestCapture();
  await loadCaptureHistory();
  await loadTimelineItems();
  await loadEventItems();
  await loadOrderedEvents();
  await loadFormatterStatus();
});

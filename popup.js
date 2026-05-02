document.addEventListener("DOMContentLoaded", async () => {
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
  const TIMELINE_STORAGE_KEY = "ICE_TIMELINE_ITEMS";
  const EVENT_STORAGE_KEY = "ICE_EVENT_ITEMS";
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
    "after",
    "afterward",
    "before",
    "later",
    "next",
    "finally",
    "subsequently"
  ];
  const ACTION_PATTERN = new RegExp(
    `\\b(${ACTION_INDICATORS.join("|")})\\b`,
    "i"
  );
  const ORDERING_PATTERN = new RegExp(
    `\\b(${ORDERING_CUES.join("|")})\\b`,
    "i"
  );
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

  function renderCapture(capture) {
    const hasCapture = Boolean(capture?.text);

    document.getElementById("captureSummary").hidden = !hasCapture;
    document.getElementById("copyCapture").disabled = !hasCapture;
    document.getElementById("saveCapture").disabled = !hasCapture;
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

  function renderTimeline(items) {
    const timelineItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("timelineSnippets");

    document.getElementById("timelineCount").textContent = timelineItems.length;
    document.getElementById("clearTimeline").disabled = timelineItems.length === 0;
    snippets.textContent = "";

    for (const item of timelineItems.slice(0, 3)) {
      const li = document.createElement("li");
      li.textContent = `${item.detectedDateText}: ${item.contextSnippet}`;
      snippets.appendChild(li);
    }
  }

  function renderEvents(items) {
    const eventItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("eventSnippets");

    document.getElementById("eventCount").textContent = eventItems.length;
    document.getElementById("clearEvents").disabled = eventItems.length === 0;
    snippets.textContent = "";

    for (const item of eventItems.slice(0, 3)) {
      const li = document.createElement("li");
      li.textContent = item.eventText;
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

  async function captureActivePage() {
    setCaptureStatus("Capturing...");

    const response = await sendMessageToActiveTab({
      type: "ICE_CAPTURE_PAGE_TEXT"
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Capture failed.");
    }

    await saveLatestCapture(response.capture);
    setCaptureStatus("Captured.");
  }

  async function saveCaptureToHistory() {
    const data = await chrome.storage.local.get(CAPTURE_STORAGE_KEY);
    const capture = data[CAPTURE_STORAGE_KEY];

    if (!capture?.text) {
      setCaptureStatus("No capture to save.");
      return;
    }

    const entry = createHistoryEntry(capture);
    const history = await getCaptureHistory();
    const duplicate = history.some((item) =>
      item.url === entry.url && item.textHash === entry.textHash
    );

    if (duplicate) {
      setCaptureStatus("Duplicate skipped: this page text is already saved.");
      return;
    }

    // Phase 2.5 foundation: this local history array is future input for a
    // document library, timeline extraction, and historical comparison.
    const nextHistory = [entry, ...history];
    await chrome.storage.local.set({
      [CAPTURE_HISTORY_KEY]: nextHistory
    });

    renderHistoryCount(nextHistory);
    setCaptureStatus("Capture saved.");
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

  function createEventItem(capture, sentence, sequenceIndex) {
    const orderingMatch = sentence.match(ORDERING_PATTERN);
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
      orderingCue: orderingMatch?.[1]?.toLowerCase() || "",
      confidence: confidenceForEvent(
        Boolean(actionMatch),
        Boolean(orderingMatch),
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
      const hasOrderingCue = ORDERING_PATTERN.test(normalized);

      if (!hasAction && !hasOrderingCue) return;

      ACTION_PATTERN.lastIndex = 0;
      ORDERING_PATTERN.lastIndex = 0;
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

  document.getElementById("saveCapture")
    .addEventListener("click", () => {
      saveCaptureToHistory().catch((error) => {
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
});

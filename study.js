document.addEventListener("DOMContentLoaded", async () => {
  const STORAGE_KEYS = {
    latestCapture: "ICE_LATEST_CAPTURE",
    captureHistory: "ICE_CAPTURE_HISTORY",
    timelineItems: "ICE_TIMELINE_ITEMS",
    eventItems: "ICE_EVENT_ITEMS",
    orderedEvents: "ICE_ORDERED_EVENTS",
    actorTimelines: "ICE_ACTOR_TIMELINES",
    principleItems: "ICE_PRINCIPLE_ITEMS",
    analysisStatus: "ICE_ANALYSIS_STATUS"
  };
  const DISPLAY_LIMIT = 5;

  let studyData = {};

  function normalizeText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function trimText(text, maxLength = 160) {
    const normalized = normalizeText(text);
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 3).trim()}...`;
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

  function createCard(title, body, meta = "") {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const content = document.createElement("p");

    card.className = "study-card";
    heading.textContent = title || "Untitled";
    content.textContent = body || "No detail available.";

    card.append(heading, content);

    if (meta) {
      const metaText = document.createElement("span");
      metaText.className = "meta";
      metaText.textContent = meta;
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

  function renderCurrentPage(term) {
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
      `${capture.wordCount || 0} words | ${capture.characterCount || 0} chars | ${capture.divineReferenceCount || 0} divine refs`
    ));

    if (history.length > 0) {
      container.appendChild(createCard(
        "Saved capture library",
        "Local captures are ready for document library, source collections, and historical comparison.",
        `${history.length} saved capture(s)`
      ));
    }
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

  function renderPrinciples(term) {
    const container = document.getElementById("principleCards");
    const count = document.getElementById("principleCount");
    const principles = Array.isArray(studyData.principleItems)
      ? studyData.principleItems
      : [];
    const filtered = principles.filter((item) =>
      itemMatches(item, [
        "principleText",
        "principleType",
        "contextSnippet",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      item.principleType || "unknown",
      trimText(item.contextSnippet || item.principleText, 180),
      item.sourceTitle || ""
    ), "No principle or teaching items match.");
  }

  function renderStudy() {
    try {
      const term = normalizeText(document.getElementById("searchInput").value)
        .toLowerCase();

      renderDiagnostics();
      renderCurrentPage(term);
      renderActors(term);
      renderOrderedEvents(term);
      renderPrinciples(term);
      renderTimeline(term);
    } catch (error) {
      showDiagnosticMessage(`Study Panel render error: ${error.message}`);
      console.debug("I.C.E. study render failed", {
        error: error.message
      });
    }
  }

  async function loadStudyData() {
    const raw = await chrome.storage.local.get(Object.values(STORAGE_KEYS));

    studyData = Object.fromEntries(
      Object.entries(STORAGE_KEYS).map(([alias, storageKey]) => [
        alias,
        raw[storageKey]
      ])
    );

    console.debug("I.C.E. study data loaded", {
      keys: Object.values(STORAGE_KEYS).filter((key) =>
        Object.prototype.hasOwnProperty.call(raw, key)
      ),
      captures: (studyData.latestCapture?.text ? 1 : 0) +
        countItems(studyData.captureHistory),
      timeline: countItems(studyData.timelineItems),
      events: countItems(studyData.eventItems),
      orderedEvents: countItems(studyData.orderedEvents),
      actorTimelines: countItems(studyData.actorTimelines),
      principles: countItems(studyData.principleItems),
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
    const principleCount = countItems(studyData.principleItems);
    const totalRenderable = captureCount + timelineCount + eventCount +
      orderedCount + actorCount + principleCount;
    const message = document.getElementById("diagnosticMessage");

    document.getElementById("diagnosticCaptures").textContent = captureCount;
    document.getElementById("diagnosticTimeline").textContent = timelineCount;
    document.getElementById("diagnosticEvents").textContent = eventCount;
    document.getElementById("diagnosticOrderedEvents").textContent = orderedCount;
    document.getElementById("diagnosticActors").textContent = actorCount;
    document.getElementById("diagnosticPrinciples").textContent = principleCount;
    document.getElementById("diagnosticLastAnalysis").textContent =
      studyData.analysisStatus?.analyzedAt || "Never";

    if (totalRenderable === 0) {
      showDiagnosticMessage("No local study data was found. Run Full Analysis from the popup, then refresh this page.");
    } else {
      showDiagnosticMessage("");
    }
  }

  function showDiagnosticMessage(messageText) {
    const message = document.getElementById("diagnosticMessage");

    message.hidden = !messageText;
    message.textContent = messageText;
  }

  async function refreshStudyData() {
    try {
      await loadStudyData();
      renderStudy();
    } catch (error) {
      showDiagnosticMessage(`Study Panel load error: ${error.message}`);
      console.debug("I.C.E. study load failed", {
        error: error.message
      });
    }
  }

  // Phase 5 foundation: this page is the future contextual research surface.
  // Later phases can attach scripture/conference-talk source collections,
  // cross-document character indexes, reference linking, side panel hover
  // integration, and report/presentation builder features without crowding the
  // quick-control popup. Principle views can later grow into doctrine
  // taxonomy, prophecy/fulfillment linking, theme clustering,
  // scripture/conference-talk comparison, speaker/author doctrine mapping,
  // user-curated principle notes, and future-event reasoning with
  // source-grounded confidence.
  await refreshStudyData();

  document.getElementById("searchInput").addEventListener("input", renderStudy);
  document.getElementById("refreshStudyData").addEventListener("click", refreshStudyData);
});

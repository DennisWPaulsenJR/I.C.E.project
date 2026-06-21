document.addEventListener("DOMContentLoaded", async () => {
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
  const TIMELINE_STORAGE_KEY = "ICE_TIMELINE_ITEMS";
  const EVENT_STORAGE_KEY = "ICE_EVENT_ITEMS";
  const PRINCIPLE_STORAGE_KEY = "ICE_PRINCIPLE_ITEMS";
  const PROPHECY_LINKS_KEY = "ICE_PROPHECY_LINKS";
  const ORDERED_EVENTS_KEY = "ICE_ORDERED_EVENTS";
  const ACTOR_TIMELINES_KEY = "ICE_ACTOR_TIMELINES";
  const INTERACTION_GRAPH_KEY = "ICE_INTERACTION_GRAPH";
  const SCENE_MODELS_KEY = "ICE_SCENE_MODELS";
  const FORMATTER_STATUS_KEY = "ICE_FORMATTER_STATUS";
  const ANALYSIS_STATUS_KEY = "ICE_ANALYSIS_STATUS";
  const ANALYSIS_HISTORY_KEY = "ICE_ANALYSIS_HISTORY";
  const CANONICAL_ANALYZED_PAGES_KEY = "ICE_CANONICAL_ANALYZED_PAGES";
  const CANONICAL_ANALYSIS_TARGET_KEY = "ICE_CANONICAL_ANALYSIS_TARGET";
  const CROSS_REFERENCE_SET_KEY = "ICE_CROSS_REFERENCE_SET";
  const ACTIVE_SOURCE_PAGE_KEY = "ICE_ACTIVE_SOURCE_PAGE";
  const SELECTED_RANGE_KEY = "ICE_SELECTED_RANGE";
  const PANEL_UI_STATE_KEY = "ICE_PANEL_UI_STATE";
  const ACTIVE_ADAPTER_KEY = "ICE_ACTIVE_ADAPTER";
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
  const PRINCIPLE_INDICATORS = [
    "fulfilled",
    "written",
    "prophet",
    "commanded",
    "warned",
    "worship",
    "revelation",
    "dream",
    "blessing",
    "law",
    "mercy",
    "obedience",
    "faith",
    "covenant",
    "kingdom",
    "righteousness",
    "salvation"
  ];
  const PRINCIPLE_PATTERN = new RegExp(
    `\\b(${PRINCIPLE_INDICATORS.join("|")})\\b`,
    "i"
  );
  const PURPOSE_PRINCIPLE_PATTERN = /\b(that it might be fulfilled|for thus it is written|that shall rule|called a Nazarene)\b/i;
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
    ["king", "King"],
    ["the king", "King"],
    ["people", "People"],
    ["the people", "People"],
    ["priests", "Priests"],
    ["chief priests", "Chief priests"],
    ["chief priests and scribes", "Chief priests and scribes"],
    ["the chief priests and scribes", "Chief priests and scribes"],
    ["scribes", "Scribes"]
  ]);
  const SUBJECT_FALLBACK_STOP_WORDS = new Set([
    "a",
    "an",
    "and",
    "as",
    "but",
    "departed",
    "for",
    "from",
    "he",
    "her",
    "him",
    "his",
    "it",
    "its",
    "of",
    "said",
    "saying",
    "she",
    "that",
    "the",
    "their",
    "them",
    "they",
    "then",
    "this",
    "to",
    "was",
    "were",
    "when",
    "where",
    "now",
    "matthew",
    "chapter"
  ]);
  const INVALID_ACTOR_NAMES = new Set([
    "And",
    "But",
    "Chapter",
    "Matthew",
    "Now",
    "Said",
    "Saying",
    "Then",
    "When",
    "Were",
    "Were Departed"
  ]);
  const PLURAL_ACTOR_NAMES = new Set([
    "Wise men",
    "Chief priests",
    "Chief priests and scribes",
    "Priests",
    "Scribes",
    "People",
    "People / multitudes",
    "Pharisees",
    "Sadducees",
    "Pharisees and Sadducees"
  ]);
  const ACTOR_SOURCE_PATTERN = "(John the Baptist|John|Jesus Christ|Jesus|Christ|Herod|Joseph|Mary|Pharisees and Sadducees|Pharisees|Sadducees|chief priests and scribes|chief priests|wise men|the wise men|the angel of the Lord|angel of the Lord|the angel|angel|Spirit of God|the Spirit of God|Spirit|Father|the young child|young child|the child|child|the Lord|Lord|priests|scribes|the king|king|the people|people|multitudes|Jerusalem|Jud(?:a|\\u00e6)ea|Jordan)";
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
    highlightPronouns: false,
    autoCaptureOnPageLoad: true,
    showPageOverlay: false
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
    if (id === "showPageOverlay") {
      await applyPageOverlaySetting(value);
    }
  }

  async function applyPageOverlaySetting(showPageOverlay) {
    try {
      await sendMessageToActiveTab({
        type: "ICE_SET_PAGE_OVERLAY",
        showPageOverlay
      });
      setCaptureStatus(showPageOverlay ? "Page overlay shown." : "Page overlay hidden.");
    } catch (error) {
      setCaptureStatus(`Overlay setting saved. Reload the active page if overlay did not update: ${error.message}`);
    }
  }

  function pageRecordKey(page = {}) {
    return [page.sourceCaptureBook || page.book, page.sourceCaptureChapter || page.chapter, page.sourceTitle || page.title, page.activeUrl || page.url]
      .map((value) => normalizeWhitespace(value || "").toLowerCase())
      .join("|");
  }

  function sourceMatchFromUrl(url = "") {
    const match = normalizeWhitespace(url).match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);
    const books = { matt: "Matthew", mark: "Mark", luke: "Luke", john: "John" };
    return match ? { book: books[match[1].toLowerCase()], chapter: match[2] } : null;
  }

  function sourceMatchFromTitle(title = "") {
    const match = normalizeWhitespace(title).match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
    return match ? { book: match[1], chapter: match[2] } : null;
  }

  function pageRecordFromTab(tab = {}) {
    const urlMatch = sourceMatchFromUrl(tab.url || "");
    const titleMatch = sourceMatchFromTitle(tab.title || "");
    const book = urlMatch?.book || titleMatch?.book || "";
    const chapter = urlMatch?.chapter || titleMatch?.chapter || "";
    if (!book || !chapter || !tab.url) return null;
    return {
      sourceCaptureId: "",
      sourceTitle: `${book} ${chapter}`,
      sourceCaptureBook: book,
      sourceCaptureChapter: String(chapter),
      activeUrl: tab.url,
      activeAdapterName: "lds_scripture_adapter",
      pageKey: [book, chapter, `${book} ${chapter}`, tab.url].map((value) => normalizeWhitespace(value).toLowerCase()).join("|"),
      analyzedAt: ""
    };
  }

  function pageRecordFromStatus(status = {}) {
    if (!status?.sourceCaptureTitle && !status?.sourceCaptureBook && !status?.sourceCaptureUrl && !status?.activeUrl) return null;
    return {
      sourceCaptureId: status.sourceCaptureId || "",
      sourceTitle: status.sourceCaptureTitle || "Current source",
      sourceCaptureBook: status.sourceCaptureBook || "",
      sourceCaptureChapter: status.sourceCaptureChapter || "",
      activeUrl: status.sourceCaptureUrl || status.activeUrl || "",
      activeAdapterName: status.activeAdapterName || "",
      analyzedAt: status.analyzedAt || "",
      pageKey: ""
    };
  }

  function pageRecordFromCanonicalMarker(marker = {}) {
    if (!marker?.pageKey) return null;
    return {
      sourceCaptureId: marker.captureId || marker.sourceCaptureId || "",
      sourceTitle: marker.sourceTitle || "Current source",
      sourceCaptureBook: marker.sourceCaptureBook || "",
      sourceCaptureChapter: marker.sourceCaptureChapter || "",
      activeUrl: marker.url || marker.activeUrl || "",
      activeAdapterName: marker.adapter || marker.activeAdapterName || "",
      analyzedAt: marker.analysisTimestamp || marker.analyzedAt || "",
      pageKey: marker.pageKey || "",
      buildMarker: marker.buildMarker || ""
    };
  }

  function canonicalMarkerFromPage(page = {}, buildMarker = "popup-manual-page-workflow") {
    const analyzedAt = page.analyzedAt || new Date().toISOString();
    const normalized = {
      sourceCaptureId: page.sourceCaptureId || "",
      sourceTitle: page.sourceTitle || "Current source",
      sourceCaptureBook: page.sourceCaptureBook || "",
      sourceCaptureChapter: page.sourceCaptureChapter || "",
      activeUrl: page.activeUrl || "",
      activeAdapterName: page.activeAdapterName || "",
      analyzedAt,
      pageKey: page.pageKey || pageRecordKey(page)
    };
    if (!normalized.sourceCaptureBook || !normalized.sourceCaptureChapter || !normalized.activeUrl || !normalized.analyzedAt) return null;
    return {
      pageKey: normalized.pageKey,
      url: normalized.activeUrl,
      adapter: normalized.activeAdapterName,
      captureId: normalized.sourceCaptureId,
      sourceTitle: normalized.sourceTitle,
      sourceCaptureBook: normalized.sourceCaptureBook,
      sourceCaptureChapter: normalized.sourceCaptureChapter,
      analysisTimestamp: normalized.analyzedAt,
      buildMarker
    };
  }

  function pageChapterNumber(page = {}) {
    const value = Number(page.sourceCaptureChapter || page.chapter || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function pageBookName(page = {}) {
    return normalizeWhitespace(page.sourceCaptureBook || page.book || "");
  }

  function volumePageLabel(page = {}) {
    const book = pageBookName(page);
    const chapter = normalizeWhitespace(page.sourceCaptureChapter || page.chapter || "");
    if (book && chapter) return `${book} ${chapter}`;
    return normalizeWhitespace(page.sourceTitle || page.title || page.activeUrl || page.url || "Unknown page");
  }

  function sortedAnalyzedPages(pages = []) {
    return (Array.isArray(pages) ? pages : [])
      .filter(Boolean)
      .slice()
      .sort((left, right) => pageBookName(left).localeCompare(pageBookName(right)) || pageChapterNumber(left) - pageChapterNumber(right));
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
    const missing = [];
    for (let chapter = Math.min(...chapters); chapter <= Math.max(...chapters); chapter += 1) {
      if (!present.has(chapter)) missing.push(`${book} ${chapter}`);
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
    const rangeLabel = volumePageLabel(start) === volumePageLabel(end) ? volumePageLabel(start) : `${volumePageLabel(start)} -> ${volumePageLabel(end)}`;
    return {
      start,
      end,
      pages: sorted,
      labels,
      isContiguous,
      missingLabels,
      sessionType: sorted.length < 2 ? "Single analyzed page" : (isContiguous ? "Contiguous selected pages" : "Non-contiguous selected pages"),
      sessionLabel: sorted.length < 2 ? labels[0] : (isContiguous ? rangeLabel : labels.join(" + "))
    };
  }

  function analyzedPageKeys(pages = []) {
    return new Set((Array.isArray(pages) ? pages : []).map((page) => page.pageKey || pageRecordKey(page)).filter(Boolean));
  }

  function crossReferenceRecordFromPage(page = {}, canonicalPages = []) {
    const book = pageBookName(page);
    const chapter = normalizeWhitespace(page.sourceCaptureChapter || page.chapter || "");
    const url = normalizeWhitespace(page.activeUrl || page.url || "");
    const label = volumePageLabel(page);
    if (!book || !chapter || !url) return null;
    const canonicalKey = page.pageKey || pageRecordKey(page);
    const analyzedKeys = analyzedPageKeys(canonicalPages);
    const analyzedPage = (Array.isArray(canonicalPages) ? canonicalPages : []).find((candidate) => (candidate.pageKey || pageRecordKey(candidate)) === canonicalKey) || null;
    const analyzed = analyzedKeys.has(canonicalKey);
    return {
      id: canonicalKey,
      label,
      url,
      book,
      chapter: String(chapter),
      canonicalKey,
      addedAt: page.addedAt || new Date().toISOString(),
      source: "manual",
      analyzed,
      analyzedAt: analyzedPage?.analyzedAt || page.analyzedAt || "",
      analysisPageKey: analyzed ? canonicalKey : ""
    };
  }

  function pageRecordFromCrossReferenceRecord(record = {}) {
    if (!record?.canonicalKey && !record?.url) return null;
    return {
      sourceCaptureId: "",
      sourceTitle: record.label || [record.book, record.chapter].filter(Boolean).join(" ") || "Selected page",
      sourceCaptureBook: record.book || "",
      sourceCaptureChapter: record.chapter || "",
      activeUrl: record.url || "",
      activeAdapterName: "lds_scripture_adapter",
      pageKey: record.canonicalKey || record.id || "",
      analyzedAt: record.analyzedAt || ""
    };
  }

  function normalizedCrossReferenceSet(records = [], canonicalPages = []) {
    return (Array.isArray(records) ? records : [])
      .map(pageRecordFromCrossReferenceRecord)
      .map((page) => page ? crossReferenceRecordFromPage(page, canonicalPages) : null)
      .filter(Boolean)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.canonicalKey === item.canonicalKey) === index)
      .sort((left, right) => pageBookName(pageRecordFromCrossReferenceRecord(left)).localeCompare(pageBookName(pageRecordFromCrossReferenceRecord(right))) || Number(left.chapter || 0) - Number(right.chapter || 0));
  }

  function crossReferenceSetLine(records = []) {
    const pages = records.map(pageRecordFromCrossReferenceRecord).filter(Boolean);
    const scope = selectedSessionScopeFromPages(pages);
    if (!scope) return "No cross-reference pages selected yet.";
    const status = records.map((record) => `${record.label}: ${record.analyzed ? "Analyzed" : "Not analyzed yet"}`).join("; ");
    if (scope.isContiguous) return `Cross-reference selected pages: ${scope.sessionLabel}. ${status}`;
    return `Cross-reference set: ${scope.labels.join(" + ")} (non-contiguous selected pages; missing intermediate pages are not analyzed: ${scope.missingLabels.join(", ") || "none"}). ${status}`;
  }

  function pageNavigationTarget(page = {}, delta = 0) {
    const url = normalizeWhitespace(page.activeUrl || page.url || "");
    if (!url) return null;
    const urlMatch = sourceMatchFromUrl(url);
    const chapter = Number(urlMatch?.chapter || pageChapterNumber(page));
    const targetChapter = chapter + delta;
    if (!chapter || targetChapter < 1) return null;
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/");
      const chapterIndex = parts.findIndex((part) => part === String(chapter));
      if (chapterIndex < 0) return null;
      parts[chapterIndex] = String(targetChapter);
      parsed.pathname = parts.join("/");
      parsed.hash = "";
      const book = urlMatch?.book || pageBookName(page) || "Page";
      return {
        label: `${book} ${targetChapter}`,
        url: parsed.toString(),
        page: {
          ...page,
          sourceCaptureId: "",
          sourceTitle: `${book} ${targetChapter}`,
          sourceCaptureChapter: String(targetChapter),
          activeUrl: parsed.toString(),
          url: parsed.toString(),
          pageKey: [book, targetChapter, `${book} ${targetChapter}`, parsed.toString()].map((value) => normalizeWhitespace(value).toLowerCase()).join("|"),
          analyzedAt: ""
        }
      };
    } catch (_error) {
      return null;
    }
  }
  function fallbackNavigationTarget(page = {}, delta = 0) {
    const url = page.activeUrl || page.url || "";
    const match = String(url).match(/^(.*\/)(\d+)([/?#].*)?$/);
    const chapter = Number(match?.[2] || page.sourceCaptureChapter || page.chapter || 0);
    const targetChapter = chapter + delta;
    if (!match || !chapter || targetChapter < 1) return null;
    const book = pageBookName(page) || sourceMatchFromUrl(url)?.book || "Page";
    const targetUrl = `${match[1]}${targetChapter}${match[3] || ""}`;
    return {
      label: `${book} ${targetChapter}`,
      url: targetUrl,
      page: {
        ...page,
        sourceCaptureId: "",
        sourceTitle: `${book} ${targetChapter}`,
        sourceCaptureChapter: String(targetChapter),
        activeUrl: targetUrl,
        url: targetUrl,
        pageKey: [book, targetChapter, `${book} ${targetChapter}`, targetUrl].map((value) => normalizeWhitespace(value).toLowerCase()).join("|"),
        analyzedAt: ""
      }
    };
  }
  function firstNavigationTarget(delta, ...pages) {
    for (const page of pages) {
      const target = pageNavigationTarget(page || {}, delta) || fallbackNavigationTarget(page || {}, delta);
      if (target?.url) return target;
    }
    return null;
  }
  async function rerunOnActiveTab(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: "ICE_RERUN_FORMATTER"
      });
      return true;
    } catch (_error) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["engine.js", "content.js"]
        });
        return true;
      } catch (_scriptError) {
        return false;
      }
    }
  }

  async function runPipeline(reason) {
    const response = await chrome.runtime.sendMessage({
      type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
      reason
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Analysis pipeline failed.");
    }

    return response.status;
  }

  async function activeTabPageRecord() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return { tab, page: pageRecordFromTab(tab || {}) };
  }

  async function storedPageWorkflowState() {
    const data = await chrome.storage.local.get([
      ACTIVE_SOURCE_PAGE_KEY,
      ANALYSIS_STATUS_KEY,
      CANONICAL_ANALYZED_PAGES_KEY,
      CANONICAL_ANALYSIS_TARGET_KEY,
      CROSS_REFERENCE_SET_KEY,
      ACTIVE_ADAPTER_KEY
    ]);
    const { tab, page: tabPage } = await activeTabPageRecord();
    const statusPage = pageRecordFromStatus(data[ANALYSIS_STATUS_KEY] || {});
    const activePage = data[ACTIVE_SOURCE_PAGE_KEY] || pageRecordFromCanonicalMarker(data[CANONICAL_ANALYSIS_TARGET_KEY]) || statusPage || tabPage;
    const canonicalPages = Array.isArray(data[CANONICAL_ANALYZED_PAGES_KEY])
      ? data[CANONICAL_ANALYZED_PAGES_KEY].map(pageRecordFromCanonicalMarker).filter(Boolean)
      : [];
    const crossReferenceSet = normalizedCrossReferenceSet(data[CROSS_REFERENCE_SET_KEY], canonicalPages);
    return { tab, tabPage, activePage, statusPage, canonicalPages, crossReferenceSet, activeAdapter: data[ACTIVE_ADAPTER_KEY] || null };
  }

  async function navigatePopupPage(delta, actionName) {
    const state = await storedPageWorkflowState();
    const target = firstNavigationTarget(delta, state.tabPage, state.activePage, state.canonicalPages.at(-1));
    if (!target?.url) {
      setCaptureStatus(delta < 0 ? "No previous page is available." : "No next page is available.");
      return;
    }
    if (state.tab?.id && !/^chrome-extension:/i.test(state.tab.url || "")) {
      await chrome.tabs.update(state.tab.id, { url: target.url, active: true });
    } else {
      await chrome.tabs.create({ url: target.url, active: true });
    }
    await chrome.storage.local.set({
      [ACTIVE_SOURCE_PAGE_KEY]: target.page,
      [PANEL_UI_STATE_KEY]: { lastAction: actionName, updatedAt: new Date().toISOString() }
    });
    setCaptureStatus(`Opened ${target.label}. Analyze manually when ready; navigation did not run analysis.`);
  }

  async function openSuggestedNextFromPopup() {
    const state = await storedPageWorkflowState();
    const scope = selectedSessionScopeFromPages(state.canonicalPages);
    const target = firstNavigationTarget(1, state.tabPage, state.activePage, scope?.end);
    if (!target?.url) {
      setCaptureStatus("No suggested next page is available.");
      return;
    }
    if (state.tab?.id && !/^chrome-extension:/i.test(state.tab.url || "")) {
      await chrome.tabs.update(state.tab.id, { url: target.url, active: true });
    } else {
      await chrome.tabs.create({ url: target.url, active: true });
    }
    await chrome.storage.local.set({
      [ACTIVE_SOURCE_PAGE_KEY]: target.page,
      [PANEL_UI_STATE_KEY]: { lastAction: "popup_open_suggested_next", updatedAt: new Date().toISOString() }
    });
    setCaptureStatus(`Opened ${target.label}. Analyze manually when ready; navigation did not run analysis.`);
  }

  async function addAnalyzedPageToStoredSessionFromPopup() {
    const data = await chrome.storage.local.get([ANALYSIS_STATUS_KEY, CANONICAL_ANALYZED_PAGES_KEY]);
    const statusPage = pageRecordFromStatus(data[ANALYSIS_STATUS_KEY] || {});
    if (!statusPage?.analyzedAt) {
      setCaptureStatus("Analyze this page before adding it to the stored analyzed session.");
      return;
    }
    const marker = canonicalMarkerFromPage(statusPage, data[ANALYSIS_STATUS_KEY]?.analysisBuildMarker || "popup-manual-page-workflow");
    if (!marker) {
      setCaptureStatus("Current analyzed page is not a supported scripture/source page.");
      return;
    }
    const existingMarkers = Array.isArray(data[CANONICAL_ANALYZED_PAGES_KEY]) ? data[CANONICAL_ANALYZED_PAGES_KEY] : [];
    const nextMarkers = [marker, ...existingMarkers]
      .filter((item, index, items) => items.findIndex((candidate) => candidate.pageKey === item.pageKey) === index)
      .slice(0, 24);
    const nextPages = nextMarkers.map(pageRecordFromCanonicalMarker).filter(Boolean);
    const range = selectedSessionScopeFromPages(nextPages);
    const history = nextMarkers.map((item) => ({
      sourceCaptureId: item.captureId || "",
      sourceTitle: item.sourceTitle || "Current source",
      sourceCaptureBook: item.sourceCaptureBook || "",
      sourceCaptureChapter: item.sourceCaptureChapter || "",
      activeUrl: item.url || "",
      activeAdapterName: item.adapter || "",
      analyzedAt: item.analysisTimestamp || "",
      pageKey: item.pageKey || ""
    }));
    await chrome.storage.local.set({
      [CANONICAL_ANALYZED_PAGES_KEY]: nextMarkers,
      [ANALYSIS_HISTORY_KEY]: history,
      [ACTIVE_SOURCE_PAGE_KEY]: statusPage,
      [SELECTED_RANGE_KEY]: range,
      [PANEL_UI_STATE_KEY]: { lastAction: "popup_add_page_to_stored_session", updatedAt: new Date().toISOString() }
    });
    setCaptureStatus(`${volumePageLabel(statusPage)} added to stored analyzed session. ${range?.isContiguous ? "Stored pages are contiguous." : "Stored pages are non-contiguous; missing pages are not analyzed."}`);
    await loadAllSummaries();
  }

  async function addPageToCrossReferenceSetFromPopup() {
    const state = await storedPageWorkflowState();
    const page = state.tabPage || state.activePage || state.statusPage;
    const record = crossReferenceRecordFromPage(page || {}, state.canonicalPages);
    if (!record) {
      setCaptureStatus("Open or select a supported scripture/source page before adding it to the cross-reference set.");
      return;
    }
    const nextSet = [record, ...state.crossReferenceSet]
      .filter((item, index, items) => items.findIndex((candidate) => candidate.canonicalKey === item.canonicalKey) === index)
      .slice(0, 48);
    await chrome.storage.local.set({
      [CROSS_REFERENCE_SET_KEY]: nextSet,
      [ACTIVE_SOURCE_PAGE_KEY]: page,
      [PANEL_UI_STATE_KEY]: { lastAction: "popup_add_page_to_cross_reference_set", updatedAt: new Date().toISOString() }
    });
    setCaptureStatus(`${record.label} selected for cross-reference. ${record.analyzed ? "Analyzed" : "Not analyzed yet"}.`);
    await loadAllSummaries();
  }

  async function analyzeThisPageFromPopup() {
    await runFullAnalysisFromPopup();
  }

  async function analyzeAndAddPageFromPopup() {
    await runFullAnalysisFromPopup();
    await addAnalyzedPageToStoredSessionFromPopup();
  }

  async function showCrossReferenceSetFromPopup() {
    const state = await storedPageWorkflowState();
    setCaptureStatus(crossReferenceSetLine(state.crossReferenceSet));
  }

  async function clearCrossReferenceSetFromPopup() {
    await chrome.storage.local.set({
      [CROSS_REFERENCE_SET_KEY]: [],
      [PANEL_UI_STATE_KEY]: { lastAction: "popup_clear_cross_reference_set", updatedAt: new Date().toISOString() }
    });
    setCaptureStatus("Cross-reference set cleared. Stored analyzed session data was not changed.");
    await loadAllSummaries();
  }
  async function runFullAnalysisFromPopup() {
    setCaptureStatus("Running full analysis...");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (tab?.id) {
      const pageUpdated = await rerunOnActiveTab(tab.id);
      await runPipeline(pageUpdated ? "popup-full-analysis" : "popup-full-analysis-restricted-page");
    } else {
      await runPipeline("popup-full-analysis");
    }

    await loadAllSummaries();
    setCaptureStatus("Full analysis complete.");
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
    document.getElementById("extractPrinciples").disabled = count === 0;
  }

  function compactLabelList(labels = []) {
    const uniqueLabels = [...new Set(labels.map(normalizeWhitespace).filter(Boolean))];
    if (!uniqueLabels.length) return "none";
    const visible = uniqueLabels.slice(0, 5).join(", ");
    return uniqueLabels.length > 5 ? `${visible}, +${uniqueLabels.length - 5} more` : visible;
  }

  function captureHistoryLabel(entry = {}) {
    const match = sourceMatchFromUrl(entry.url || "") || sourceMatchFromTitle(entry.title || "");
    if (match?.book && match?.chapter) return `${match.book} ${match.chapter}`;
    return shortTitle(entry.title || entry.url || "Captured page");
  }

  function renderStudyStateSummary(history = [], canonicalMarkers = [], crossReferenceRecords = []) {
    const capturedLabels = (Array.isArray(history) ? history : []).map(captureHistoryLabel);
    const canonicalPages = Array.isArray(canonicalMarkers)
      ? canonicalMarkers.map(pageRecordFromCanonicalMarker).filter(Boolean)
      : [];
    const sessionScope = selectedSessionScopeFromPages(canonicalPages);
    const crossReferenceSet = normalizedCrossReferenceSet(crossReferenceRecords, canonicalPages);
    const crossReferencePages = crossReferenceSet.map(pageRecordFromCrossReferenceRecord).filter(Boolean);

    document.getElementById("capturedPagesLine").textContent = capturedLabels.length
      ? `Raw captured page snapshots: ${compactLabelList(capturedLabels)}. Captures can be retained even when they are not part of the stored session.`
      : "No raw captured page snapshots saved.";

    document.getElementById("storedSessionPageCount").textContent = canonicalPages.length;
    document.getElementById("storedSessionPagesLine").textContent = canonicalPages.length
      ? `Analyzed/stored session pages: ${compactLabelList(canonicalPages.map(volumePageLabel))}.`
      : "No analyzed pages are stored in the current session.";

    document.getElementById("activeStudyScopeLine").textContent = sessionScope
      ? `${sessionScope.sessionLabel} (${sessionScope.sessionType})`
      : "No active analyzed scope";

    document.getElementById("crossReferencePageCount").textContent = crossReferenceSet.length;
    document.getElementById("crossReferencePagesLine").textContent = crossReferenceSet.length
      ? `${compactLabelList(crossReferencePages.map(volumePageLabel))}. Cross-reference pages are selected separately and may be analyzed or not analyzed yet.`
      : "No cross-reference pages selected.";
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

  function renderPrinciples(items) {
    const principleItems = Array.isArray(items) ? items : [];

    document.getElementById("principleCount").textContent =
      principleItems.length;
    document.getElementById("copyPrinciples").disabled =
      principleItems.length === 0;
    document.getElementById("clearPrinciples").disabled =
      principleItems.length === 0;
  }

  function renderOrderedEvents(items) {
    const orderedItems = Array.isArray(items) ? items : [];
    const snippets = document.getElementById("orderedEventSnippets");

    document.getElementById("orderedEventCount").textContent = orderedItems.length;
    document.getElementById("clearOrderedEvents").disabled =
      orderedItems.length === 0;
    document.getElementById("copyOrderedEvents").disabled =
      orderedItems.length === 0;
    document.getElementById("buildActorTimelines").disabled =
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

  function renderActorTimelines(timelines) {
    const actorTimelines = Array.isArray(timelines) ? timelines : [];
    const snippets = document.getElementById("actorTimelineSnippets");

    document.getElementById("actorTimelineCount").textContent =
      actorTimelines.length;
    document.getElementById("clearActorTimelines").disabled =
      actorTimelines.length === 0;
    document.getElementById("copyActorTimelines").disabled =
      actorTimelines.length === 0;
    snippets.textContent = "";

    // Phase 4.5 MVP preview only. Future work should add pronoun-to-actor
    // linking, cross-document actor merging, relationship graphing, and
    // movement/location tracking on a larger presentation page.
    for (const timeline of actorTimelines.slice(0, 3)) {
      const li = document.createElement("li");
      const actor = document.createElement("strong");
      const actions = document.createElement("ol");

      actor.textContent = timeline.actorName;

      for (const action of timeline.orderedActions.slice(0, 3)) {
        const actionItem = document.createElement("li");
        actionItem.textContent =
          `${action.sequenceOrder}. ${trimText(action.eventText, 90)}`;
        actions.appendChild(actionItem);
      }

      li.append(actor, actions);
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
    const data = await chrome.storage.local.get([
      CAPTURE_HISTORY_KEY,
      CANONICAL_ANALYZED_PAGES_KEY,
      CROSS_REFERENCE_SET_KEY
    ]);
    const history = Array.isArray(data[CAPTURE_HISTORY_KEY])
      ? data[CAPTURE_HISTORY_KEY]
      : [];
    renderHistoryCount(history);
    renderStudyStateSummary(
      history,
      data[CANONICAL_ANALYZED_PAGES_KEY],
      data[CROSS_REFERENCE_SET_KEY]
    );
  }

  async function loadFormatterStatus() {
    const data = await chrome.storage.local.get(FORMATTER_STATUS_KEY);
    renderFormatterStatus(data[FORMATTER_STATUS_KEY]);
  }

  async function loadAnalysisStatus() {
    const data = await chrome.storage.local.get(ANALYSIS_STATUS_KEY);
    const status = data[ANALYSIS_STATUS_KEY];

    document.getElementById("analysisStatus").textContent = status
      ? "Ready"
      : "Not run";
    document.getElementById("lastAnalysisAt").textContent =
      status?.analyzedAt || "Never";
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

  async function getPrincipleItems() {
    const data = await chrome.storage.local.get(PRINCIPLE_STORAGE_KEY);
    return Array.isArray(data[PRINCIPLE_STORAGE_KEY])
      ? data[PRINCIPLE_STORAGE_KEY]
      : [];
  }

  async function loadPrincipleItems() {
    renderPrinciples(await getPrincipleItems());
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

  async function getActorTimelines() {
    const data = await chrome.storage.local.get(ACTOR_TIMELINES_KEY);
    return Array.isArray(data[ACTOR_TIMELINES_KEY])
      ? data[ACTOR_TIMELINES_KEY]
      : [];
  }

  async function loadActorTimelines() {
    renderActorTimelines(await getActorTimelines());
  }

  async function loadInteractionCount() {
    const data = await chrome.storage.local.get(INTERACTION_GRAPH_KEY);
    const interactions = Array.isArray(data[INTERACTION_GRAPH_KEY])
      ? data[INTERACTION_GRAPH_KEY]
      : [];

    document.getElementById("interactionCount").textContent =
      interactions.length;
  }

  async function loadSceneCount() {
    const data = await chrome.storage.local.get(SCENE_MODELS_KEY);
    const scenes = Array.isArray(data[SCENE_MODELS_KEY])
      ? data[SCENE_MODELS_KEY]
      : [];

    document.getElementById("sceneCount").textContent = scenes.length;
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
    await runPipeline("manual-capture");
    renderHistoryCount(result.history);
    await loadAllSummaries();
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

  async function clearPageData() {
    await chrome.storage.local.remove([
      CAPTURE_STORAGE_KEY,
      CAPTURE_HISTORY_KEY,
      TIMELINE_STORAGE_KEY,
      EVENT_STORAGE_KEY,
      ORDERED_EVENTS_KEY,
      ACTOR_TIMELINES_KEY,
      PRINCIPLE_STORAGE_KEY,
      PROPHECY_LINKS_KEY,
      INTERACTION_GRAPH_KEY,
      SCENE_MODELS_KEY,
      ANALYSIS_STATUS_KEY
    ]);

    await loadAllSummaries();
    setCaptureStatus("Page data cleared.");
  }


  async function clearAllIceData() {
    const confirmed = window.confirm(
      "Clear all I.C.E. stored study data and analyzed pages?\n\nThis cannot be undone."
    );
    if (!confirmed) return;

    const localData = await chrome.storage.local.get(null);
    const iceKeys = Object.keys(localData).filter((key) => key.startsWith("ICE_"));
    if (iceKeys.length) {
      await chrome.storage.local.remove(iceKeys);
    }

    await loadAllSummaries();
    setCaptureStatus("All I.C.E. study data cleared.");
  }
  function normalizeWhitespace(text) {
    return String(text ?? "").replace(/\s+/g, " ").trim();
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

  function principleTypeForSentence(sentence) {
    if (/\bfulfilled|that it might be fulfilled\b/i.test(sentence)) {
      return "fulfillment";
    }

    if (/\bprophet|written|called a Nazarene|that shall rule\b/i.test(sentence)) {
      return "prophecy";
    }

    if (/\bcommanded|law|obedience\b/i.test(sentence)) {
      return "commandment";
    }

    if (/\bworship\b/i.test(sentence)) {
      return "worship";
    }

    if (/\bwarned\b/i.test(sentence)) {
      return "warning";
    }

    if (/\brevelation|dream\b/i.test(sentence)) {
      return "revelation";
    }

    if (/\bcovenant\b/i.test(sentence)) {
      return "covenant";
    }

    if (/\bkingdom|righteousness|salvation|mercy|faith|blessing\b/i.test(sentence)) {
      return "doctrine";
    }

    return "unknown";
  }

  function createPrincipleItem(capture, sentence, sequenceIndex) {
    const principleText = normalizeWhitespace(sentence);
    const sourceCaptureId = capture.id || "";
    const hashInput = [
      sourceCaptureId,
      sequenceIndex,
      principleText
    ].join("|");

    return {
      id: `${Date.now()}-${textHash(hashInput)}`,
      sourceCaptureId,
      sourceTitle: capture.title || "",
      sourceUrl: capture.url || "",
      principleText,
      principleType: principleTypeForSentence(principleText),
      contextSnippet: trimText(principleText, 220),
      extractedAt: new Date().toISOString()
    };
  }

  function extractPrincipleItemsFromCapture(capture) {
    const sentences = splitSentences(capture.text || "");
    const items = [];

    sentences.forEach((sentence, index) => {
      const normalized = normalizeWhitespace(sentence);
      if (!normalized) return;

      if (!PRINCIPLE_PATTERN.test(normalized) &&
        !PURPOSE_PRINCIPLE_PATTERN.test(normalized)) {
        return;
      }

      items.push(createPrincipleItem(capture, normalized, index));
    });

    return items;
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

  async function principleCaptureSources() {
    const history = await getCaptureHistory();
    const data = await chrome.storage.local.get(CAPTURE_STORAGE_KEY);
    const latest = data[CAPTURE_STORAGE_KEY];
    const sources = [];
    const seen = new Set();

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

  async function extractPrinciples() {
    const captures = await principleCaptureSources();

    if (captures.length === 0) {
      setCaptureStatus("No captures to extract principles.");
      return;
    }

    const seen = new Set();
    const principleItems = [];

    for (const capture of captures) {
      for (const item of extractPrincipleItemsFromCapture(capture)) {
        const key = principleDedupKey(item);

        if (seen.has(key)) continue;
        seen.add(key);
        principleItems.push(item);
      }
    }

    // Phase 5.1 local principle/teaching candidates. Future work should add
    // doctrine taxonomy, prophecy/fulfillment linking, theme clustering,
    // scripture/conference-talk comparison, speaker/author doctrine mapping,
    // user-curated notes, and future-event reasoning with source-grounded
    // confidence.
    const dedupedPrincipleItems = dedupePrincipleItems(principleItems);

    await chrome.storage.local.set({
      [PRINCIPLE_STORAGE_KEY]: dedupedPrincipleItems
    });

    renderPrinciples(dedupedPrincipleItems);
    setCaptureStatus(`Extracted ${dedupedPrincipleItems.length} principle item(s).`);
  }

  async function clearPrinciples() {
    await chrome.storage.local.remove(PRINCIPLE_STORAGE_KEY);
    renderPrinciples([]);
    setCaptureStatus("Principles cleared.");
  }

  function formatPrinciplesForCopy(items) {
    return dedupePrincipleItems(items).map((item, index) => [
      `${index + 1}. ${item.principleType || "unknown"}`,
      item.principleText || "",
      `Source: ${item.sourceTitle || "Untitled source"}`,
      `URL: ${item.sourceUrl || ""}`
    ].filter(Boolean).map(cleanCopiedText).join("\n")).join("\n\n");
  }

  async function copyPrinciples() {
    const items = await getPrincipleItems();

    if (items.length === 0) return;

    await navigator.clipboard.writeText(formatPrinciplesForCopy(items));
    setCaptureStatus("Principles copied.");
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
    await chrome.storage.local.remove(ACTOR_TIMELINES_KEY);
    renderActorTimelines([]);
    await chrome.storage.local.remove(INTERACTION_GRAPH_KEY);
    await loadInteractionCount();
    await loadSceneCount();
    setCaptureStatus(`Ordered ${orderedEvents.length} event(s).`);
  }

  async function clearOrderedEvents() {
    await chrome.storage.local.remove([
      ORDERED_EVENTS_KEY,
      ACTOR_TIMELINES_KEY,
      INTERACTION_GRAPH_KEY,
      SCENE_MODELS_KEY
    ]);
    renderOrderedEvents([]);
    renderActorTimelines([]);
    await loadInteractionCount();
    await loadSceneCount();
    setCaptureStatus("Ordered events cleared.");
  }

  function normalizeActorName(actorText) {
    const normalized = normalizeWhitespace(actorText)
      .replace(/[^\w\s]/g, "")
      .toLowerCase();

    if (!normalized) return "";
    if (SUBJECT_FALLBACK_STOP_WORDS.has(normalized)) return "";

    const actorName = ACTOR_NORMALIZATIONS.get(normalized) ||
      normalized.replace(/\b\w/g, (letter) => letter.toUpperCase());

    return INVALID_ACTOR_NAMES.has(actorName) ? "" : actorName;
  }

  function isPluralActor(actorName) {
    return PLURAL_ACTOR_NAMES.has(actorName);
  }

  function stripSourceHeading(sentence) {
    // Roadmap: Source Metadata should track book/source title, author, speaker,
    // compiler, translator/version, organization/source collection, date/year,
    // source type, referenced scripture links, and context notes separately
    // from Detected Actors. Matthew as author/source belongs there unless
    // Matthew is actually acting inside the captured text.
    return normalizeWhitespace(sentence)
      .replace(/^(?:Matthew|Mark|Luke|John)\s+\d+\b[:.)]?\s*/i, "");
  }

  function isSourceSummaryEvent(eventItem) {
    const text = normalizeWhitespace(eventItem?.eventText || "");

    return eventItem?.eventType === "source_summary" ||
      /^(?:Matthew|Mark|Luke|John)?\s*\d*\s*Chapter\s+\d+\b/i.test(text) ||
      /^(?:Matthew|Mark|Luke|John)\s+\d+\b.*\bChapter\s+\d+\b/i.test(text);
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
    if (leadingActor) return leadingActor[1];
    const postVerbActor = normalized.match(POST_VERB_ACTOR_PATTERN);
    if (postVerbActor) return postVerbActor[1];
    if (PRONOUN_SUBJECT_PATTERN.test(normalized)) return "";

    const earlyClause = normalized
      .split(/[,:;]/)[0]
      .replace(/\b(?:of|from|unto|to|for|by)\s+[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)?\b/g, "")
      .slice(0, 80);
    const properMatch = earlyClause.match(
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/
    );

    return properMatch ? properMatch[1] : "";
  }

  function pronounSubjectActor(sentence, actorMemory) {
    const normalized = stripLeadingSentenceNoise(sentence);

    if (PLURAL_PRONOUN_SUBJECT_PATTERN.test(normalized)) {
      return actorMemory.previousPluralActor || "";
    }

    if (SINGULAR_PRONOUN_SUBJECT_PATTERN.test(normalized)) {
      return actorMemory.previousSingularActor || "";
    }

    return "";
  }

  function fallbackSubjectActor(sentence) {
    const normalized = stripLeadingSentenceNoise(sentence);
    const nearStart = normalized.slice(0, 80);
    const roleMatch = nearStart.match(
      /^(?:the\s+)?(child|king|people|multitudes|priests|scribes|angel|wise men|pharisees|sadducees)\b/i
    );

    if (roleMatch) return roleMatch[0];

    const subjectMatches = nearStart.matchAll(
      /\b([A-Za-z][A-Za-z'-]{2,})(?:\s+([A-Za-z][A-Za-z'-]{2,}))?/g
    );

    for (const subjectMatch of subjectMatches) {
      const words = [subjectMatch[1], subjectMatch[2]]
        .filter(Boolean)
        .filter((word) =>
          !SUBJECT_FALLBACK_STOP_WORDS.has(word.toLowerCase())
        );

      if (words.length > 0) return words.join(" ");
    }

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

    if (/\bchief priests and scribes\b/i.test(text)) {
      return "Chief priests and scribes";
    }

    if (/\bwise men\b/i.test(text)) {
      return "Wise men";
    }

    if (/\bangel of the Lord\b/i.test(text)) {
      return "Angel of the Lord";
    }

    if (/\bJoseph\b/i.test(text)) {
      return "Joseph";
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
    // baptism scene where the active speaker is John the Baptist. This is not
    // an explicit name match; future dependency parsing should replace it.
    if (/^he\b/i.test(normalized) &&
      /\bPharisees\b/i.test(normalized) &&
      /\bSadducees\b/i.test(normalized) &&
      /\bbaptism\b/i.test(normalized) &&
      /\bsaid unto them\b/i.test(normalized)) {
      return actorMemory.previousSingularActor || "John the Baptist";
    }

    // Subject/object role placeholder: in "Then he suffered him," John
    // performs the action and JESUS is the target/object. Future pronoun
    // antecedent resolution and actor-target action modeling should replace
    // this rule.
    if (/^he suffered him\b/i.test(normalized)) {
      return "John the Baptist";
    }

    return "";
  }

  function actorForEvent(eventItem, actorMemory) {
    const text = eventItem.eventText || "";
    const sourceActor = sourceActorOverride(eventItem);
    if (sourceActor) return sourceActor;

    const inferredActor = inferredNarrativeContinuityActor(text, actorMemory);
    if (inferredActor) return normalizeActorName(inferredActor);
    const pronounActor = pronounSubjectActor(text, actorMemory);
    if (pronounActor) return normalizeActorName(pronounActor);
    if (PRONOUN_SUBJECT_PATTERN.test(stripLeadingSentenceNoise(text))) {
      return "Unknown actor";
    }

    const actor = leadingSubjectActor(text) ||
      explicitContextActor(eventItem) ||
      fallbackSubjectActor(text);

    return normalizeActorName(actor) || "Unknown actor";
  }

  function updateActorMemoryFromEvent(actorMemory, actorName, eventText) {
    if (actorName !== "Unknown actor") {
      if (isPluralActor(actorName)) {
        actorMemory.previousPluralActor = actorName;
      } else {
        actorMemory.previousSingularActor = actorName;
      }
    }

    // Mentions like "gathered chief priests and scribes" establish the next
    // likely plural referent for "they said" without making them the actor of
    // Herod's gathering action.
    if (/\bchief priests and scribes\b/i.test(eventText)) {
      actorMemory.previousPluralActor = "Chief priests and scribes";
    } else if (/\bPharisees\b/i.test(eventText) && /\bSadducees\b/i.test(eventText)) {
      actorMemory.previousPluralActor = "Pharisees and Sadducees";
    } else if (/\b(?:Jerusalem|Jud(?:a|\u00e6)ea|Jordan|people|multitudes)\b/i.test(eventText)) {
      actorMemory.previousPluralActor = "People / multitudes";
    } else if (/\bwise men\b/i.test(eventText)) {
      actorMemory.previousPluralActor = "Wise men";
    }

    // When the angel addresses Joseph, the next "he arose" is usually Joseph,
    // not the angel. Future dependency parsing should replace this heuristic.
    if (/\bangel of the Lord\b/i.test(eventText) && /\bJoseph\b/i.test(eventText)) {
      actorMemory.previousSingularActor = "Joseph";
    }
  }

  function createActorTimelines(orderedEvents) {
    const grouped = new Map();
    const seenByActor = new Map();
    const actorMemoryBySource = new Map();
    const sourceOrderedEvents = [...orderedEvents].sort((a, b) => {
      const sourceA = a.sourceCaptureId || a.sourceUrl || "";
      const sourceB = b.sourceCaptureId || b.sourceUrl || "";
      if (sourceA !== sourceB) return sourceA.localeCompare(sourceB);
      return Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0);
    });

    for (const eventItem of sourceOrderedEvents) {
      if (isSourceSummaryEvent(eventItem)) continue;

      const sourceKey = eventItem.sourceCaptureId ||
        eventItem.sourceUrl ||
        "unknown-source";
      const actorMemory = actorMemoryBySource.get(sourceKey) || {
        previousSingularActor: "",
        previousPluralActor: ""
      };
      const actorName = actorForEvent(
        eventItem,
        actorMemory
      );
      const action = {
        sourceEventId: eventItem.id || "",
        sequenceOrder: eventItem.sequenceOrder,
        eventText: trimText(eventItem.eventText || "", 180),
        orderingReason: eventItem.orderingReason || ""
      };
      const actionKey = [
        action.sourceEventId,
        action.sequenceOrder ?? "",
        normalizeWhitespace(action.eventText)
      ].join("|");

      if (!grouped.has(actorName)) grouped.set(actorName, []);
      if (!seenByActor.has(actorName)) seenByActor.set(actorName, new Set());

      if (!seenByActor.get(actorName).has(actionKey)) {
        seenByActor.get(actorName).add(actionKey);
        grouped.get(actorName).push(action);
      }

      updateActorMemoryFromEvent(actorMemory, actorName, eventItem.eventText || "");
      actorMemoryBySource.set(sourceKey, actorMemory);
    }

    return Array.from(grouped.entries())
      .map(([actorName, orderedActions]) => ({
        actorName,
        orderedActions: orderedActions.sort((a, b) =>
          Number(a.sequenceOrder || 0) - Number(b.sequenceOrder || 0)
        )
      }))
      .sort((a, b) => {
        const firstA = Number(a.orderedActions[0]?.sequenceOrder || 0);
        const firstB = Number(b.orderedActions[0]?.sequenceOrder || 0);
        return firstA - firstB || a.actorName.localeCompare(b.actorName);
      });
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

  async function buildActorTimelines() {
    const orderedEvents = await getOrderedEvents();

    if (orderedEvents.length === 0) {
      setCaptureStatus("No ordered events to group.");
      return;
    }

    // Advanced / QA builders must stay aligned with the main background
    // pipeline so manual QA does not resurrect stale actor extraction rules.
    // Phase 4.5 local actor/action grouping. This intentionally avoids
    // advanced NLP, backend calls, and AI. The current memory keeps singular
    // and plural actors separate so "they" does not inherit Herod when a plural
    // actor like wise men is nearby; richer actor resolution belongs in future
    // dependency parsing, AI actor resolution, pronoun linking, and
    // cross-document entity merging work.
    const actorTimelines = dedupeActorTimelines(createActorTimelines(orderedEvents));

    await chrome.storage.local.set({
      [ACTOR_TIMELINES_KEY]: actorTimelines
    });
    await chrome.storage.local.remove(INTERACTION_GRAPH_KEY);

    renderActorTimelines(actorTimelines);
    await loadInteractionCount();
    await loadSceneCount();
    setCaptureStatus(`Built ${actorTimelines.length} actor timeline(s).`);
  }

  async function clearActorTimelines() {
    await chrome.storage.local.remove([
      ACTOR_TIMELINES_KEY,
      INTERACTION_GRAPH_KEY,
      SCENE_MODELS_KEY
    ]);
    renderActorTimelines([]);
    await loadInteractionCount();
    await loadSceneCount();
    setCaptureStatus("Actor timelines cleared.");
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

  function formatActorTimelinesForCopy(timelines) {
    return timelines.map((timeline) => {
      const actions = timeline.orderedActions.map((action) => [
        `${action.sequenceOrder}. ${action.eventText || ""}`,
        action.orderingReason ? `Reason: ${action.orderingReason}` : ""
      ].filter(Boolean).map(cleanCopiedText).join("\n"));

      return [
        `Actor: ${timeline.actorName}`,
        actions.join("\n")
      ].filter(Boolean).join("\n");
    }).join("\n\n");
  }

  async function copyActorTimelines() {
    const timelines = await getActorTimelines();

    if (timelines.length === 0) return;

    await navigator.clipboard.writeText(formatActorTimelinesForCopy(timelines));
    setCaptureStatus("Actor timelines copied.");
  }

  document.getElementById("enabled")
    .addEventListener("change", () => saveSetting("enabled"));

  document.getElementById("strictMode")
    .addEventListener("change", () => saveSetting("strictMode"));

  document.getElementById("highlightPronouns")
    .addEventListener("change", () => saveSetting("highlightPronouns"));

  document.getElementById("autoCaptureOnPageLoad")
    .addEventListener("change", () => saveSetting("autoCaptureOnPageLoad"));

  document.getElementById("showPageOverlay")
    .addEventListener("change", () => {
      saveSetting("showPageOverlay").catch((error) => setCaptureStatus(error.message));
    });

  document.getElementById("previousPage")
    .addEventListener("click", () => {
      navigatePopupPage(-1, "popup_previous_page_navigation").catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("nextPage")
    .addEventListener("click", () => {
      navigatePopupPage(1, "popup_next_page_navigation").catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("openSuggestedNext")
    .addEventListener("click", () => {
      openSuggestedNextFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("analyzeThisPage")
    .addEventListener("click", () => {
      analyzeThisPageFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("analyzeAndAddPage")
    .addEventListener("click", () => {
      analyzeAndAddPageFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("addPageToCrossReference")
    .addEventListener("click", () => {
      addPageToCrossReferenceSetFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("showCrossReferenceSet")
    .addEventListener("click", () => {
      showCrossReferenceSetFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearCrossReferenceSet")
    .addEventListener("click", () => {
      clearCrossReferenceSetFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });
  document.getElementById("runFullAnalysis")
    .addEventListener("click", () => {
      runFullAnalysisFromPopup().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("openStudyPanel")
    .addEventListener("click", () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL("study.html")
      });
    });

  document.getElementById("clearPageData")
    .addEventListener("click", () => {
      clearPageData().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearAllIceData")
    .addEventListener("click", () => {
      clearAllIceData().catch((error) => {
        setCaptureStatus(error.message || "Failed to clear all I.C.E. data.");
      });
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

  document.getElementById("extractPrinciples")
    .addEventListener("click", () => {
      extractPrinciples().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyPrinciples")
    .addEventListener("click", () => {
      copyPrinciples().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearPrinciples")
    .addEventListener("click", () => {
      clearPrinciples().catch((error) => {
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

  document.getElementById("buildActorTimelines")
    .addEventListener("click", () => {
      buildActorTimelines().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("copyActorTimelines")
    .addEventListener("click", () => {
      copyActorTimelines().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearActorTimelines")
    .addEventListener("click", () => {
      clearActorTimelines().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  document.getElementById("clearCapture")
    .addEventListener("click", () => {
      clearLatestCapture().catch((error) => {
        setCaptureStatus(error.message);
      });
    });

  async function loadAllSummaries() {
    await loadLatestCapture();
    await loadCaptureHistory();
    await loadTimelineItems();
    await loadEventItems();
    await loadPrincipleItems();
    await loadOrderedEvents();
    await loadActorTimelines();
    await loadInteractionCount();
    await loadSceneCount();
    await loadFormatterStatus();
    await loadAnalysisStatus();
  }

  // Phase 5.2 summary surface: the popup stays focused on primary controls
  // while the automatic local pipeline feeds the Study Panel.
  await loadAllSummaries();
});

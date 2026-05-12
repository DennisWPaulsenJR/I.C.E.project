(function () {
  if (window.__ICE_FORMATTER_CONTENT__) return;
  window.__ICE_FORMATTER_CONTENT__ = true;

  const DEFAULT_SETTINGS = {
    enabled: true,
    strictMode: true,
    highlightPronouns: false,
    autoCaptureOnPageLoad: true
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "CODE", "PRE"]);
  const CAPTURE_SKIP_TAGS = new Set([
    ...SKIP_TAGS,
    "NAV",
    "HEADER",
    "ASIDE",
    "FOOTER",
    "FORM",
    "IFRAME",
    "BUTTON",
    "SELECT",
    "OPTION",
    "NOSCRIPT",
    "SVG",
    "CANVAS"
  ]);
  const CAPTURE_BLOCK_TAGS = new Set([
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "BR",
    "DIV",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "LI",
    "MAIN",
    "P",
    "SECTION"
  ]);
  const CAPTURE_ROOT_SELECTORS = [
    "article",
    "main",
    "[role='main']",
    ".body-block",
    ".scripture-block",
    ".content",
    "#content"
  ];
  const CAPTURE_EXCLUDE_SELECTOR = [
    "header",
    "nav",
    "aside",
    "footer",
    "form",
    "button",
    "select",
    "input",
    "textarea",
    "iframe",
    "[role='navigation']",
    "[role='banner']",
    "[role='contentinfo']",
    "[aria-hidden='true']"
  ].join(",");
  const FORMATTER_CLASS = "ice-sacred-reference";
  const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS);
  const FORMATTER_SETTING_KEYS = [
    "enabled",
    "strictMode",
    "highlightPronouns"
  ];
  const FORMATTER_STATUS_KEY = "ICE_FORMATTER_STATUS";
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
  const DOM_HINT_LIMIT = 250;

  let engine;
  let settings = { ...DEFAULT_SETTINGS };
  let observer;
  let initPromise;
  let scheduled = false;
  let isApplying = false;
  let autoCaptureCompleted = false;
  let contextDebugLogged = false;

  function logContextUnavailableOnce() {
    if (contextDebugLogged) return;
    contextDebugLogged = true;
    console.debug("I.C.E. extension context unavailable; reload page after extension update.");
  }

  function isExtensionContextValid() {
    try {
      return Boolean(
        globalThis.chrome &&
        chrome.runtime &&
        chrome.runtime.id &&
        chrome.storage &&
        chrome.storage.local &&
        chrome.storage.sync
      );
    } catch (_error) {
      return false;
    }
  }

  async function safeStorageLocalGet(keys) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return {};
    }

    try {
      return await chrome.storage.local.get(keys);
    } catch (_error) {
      logContextUnavailableOnce();
      return {};
    }
  }

  async function safeStorageLocalSet(data) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return false;
    }

    try {
      await chrome.storage.local.set(data);
      return true;
    } catch (_error) {
      logContextUnavailableOnce();
      return false;
    }
  }

  async function safeStorageSyncGet(defaults) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return defaults || {};
    }

    try {
      return await chrome.storage.sync.get(defaults);
    } catch (_error) {
      logContextUnavailableOnce();
      return defaults || {};
    }
  }

  async function safeRuntimeSendMessage(message) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return null;
    }

    try {
      return await chrome.runtime.sendMessage(message);
    } catch (_error) {
      logContextUnavailableOnce();
      return null;
    }
  }

  function safeAddStorageListener(callback) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return false;
    }

    try {
      chrome.storage.onChanged.addListener(callback);
      return true;
    } catch (_error) {
      logContextUnavailableOnce();
      return false;
    }
  }

  function safeAddRuntimeMessageListener(callback) {
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return false;
    }

    try {
      chrome.runtime.onMessage.addListener(callback);
      return true;
    } catch (_error) {
      logContextUnavailableOnce();
      return false;
    }
  }

  function shouldSkipNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (SKIP_TAGS.has(node.tagName)) return true;
    if (node.isContentEditable) return true;
    return Boolean(node.closest?.("[contenteditable='true'], .ice-sacred-reference"));
  }

  function collectTextNodes(root) {
    const nodes = [];
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || shouldSkipNode(parent)) return NodeFilter.FILTER_REJECT;
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let current;
    while ((current = walker.nextNode())) {
      nodes.push(current);
    }

    return nodes;
  }

  function createFormattedNode(match) {
    const span = document.createElement("span");
    span.className = [
      FORMATTER_CLASS,
      match.className,
      match.visualHighlight === false ? "ice-no-highlight" : ""
    ].filter(Boolean).join(" ");
    span.dataset.iceFormatted = "true";
    span.dataset.originalText = match.text;
    span.textContent = match.render;
    span.title = match.render;
    return span;
  }

  function formatTextNode(textNode) {
    const text = textNode.nodeValue;
    const matches = engine.findMatches(text, settings);

    if (matches.length === 0) return 0;

    const fragment = document.createDocumentFragment();
    let cursor = 0;

    for (const match of matches) {
      if (match.start > cursor) {
        fragment.appendChild(document.createTextNode(text.slice(cursor, match.start)));
      }

      fragment.appendChild(createFormattedNode(match));
      cursor = match.end;
    }

    if (cursor < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(cursor)));
    }

    textNode.replaceWith(fragment);
    return matches.length;
  }

  function clearFormatting(root = document.body) {
    isApplying = true;
    try {
      for (const span of root.querySelectorAll?.(`.${FORMATTER_CLASS}`) || []) {
        span.replaceWith(document.createTextNode(span.dataset.originalText || span.textContent));
      }

      root.normalize?.();
    } finally {
      isApplying = false;
    }
  }

  function persistFormatterStatus(matchCount, status) {
    safeStorageLocalSet({
      [FORMATTER_STATUS_KEY]: {
        status,
        matchCount,
        title: document.title || "",
        url: location.href,
        strictMode: settings.strictMode,
        highlightPronouns: settings.highlightPronouns,
        formattedAt: new Date().toISOString()
      }
    });
  }

  function textHash(text) {
    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
      hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function captureAllowedForPage() {
    return /^(https?:|file:)/.test(location.protocol);
  }

  async function getCaptureHistory() {
    const data = await safeStorageLocalGet(CAPTURE_HISTORY_KEY);
    return Array.isArray(data[CAPTURE_HISTORY_KEY])
      ? data[CAPTURE_HISTORY_KEY]
      : [];
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
      domSemanticHints: capture.domSemanticHints || [],
      textHash: hash
    };
  }

  async function persistCapture(capture) {
    if (!capture?.text) {
      return { saved: false, duplicate: false };
    }

    const entry = createHistoryEntry(capture);
    const history = await getCaptureHistory();
    const duplicate = history.some((item) =>
      item.url === entry.url && item.textHash === entry.textHash
    );

    const latestSaved = await safeStorageLocalSet({
      [CAPTURE_STORAGE_KEY]: capture
    });
    if (!latestSaved) return { saved: false, duplicate };

    if (duplicate) {
      return { saved: false, duplicate: true };
    }

    const historySaved = await safeStorageLocalSet({
      [CAPTURE_HISTORY_KEY]: [entry, ...history]
    });

    return { saved: historySaved, duplicate: false };
  }

  function applyFormatting(root = document.body) {
    if (!engine || !root) return 0;

    if (!settings.enabled) {
      persistFormatterStatus(0, "disabled");
      return 0;
    }

    let matchCount = 0;

    isApplying = true;
    try {
      for (const textNode of collectTextNodes(root)) {
        matchCount += formatTextNode(textNode);
      }
    } finally {
      isApplying = false;
    }

    console.debug("I.C.E. formatter run", {
      matches: matchCount,
      strictMode: settings.strictMode,
      highlightPronouns: settings.highlightPronouns
    });

    persistFormatterStatus(matchCount, "formatted");
    return matchCount;
  }

  function scheduleApply(root = document.body) {
    if (scheduled || !settings.enabled) return;

    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyFormatting(root);
    });
  }

  function observePage() {
    observer?.disconnect();

    observer = new MutationObserver((mutations) => {
      if (isApplying || !settings.enabled) return;

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            scheduleApply(node.parentElement);
            return;
          }

          if (node.nodeType === Node.ELEMENT_NODE && !shouldSkipNode(node)) {
            scheduleApply(node);
            return;
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  async function loadSettings() {
    settings = {
      ...DEFAULT_SETTINGS,
      ...(await safeStorageSyncGet(DEFAULT_SETTINGS))
    };
  }

  async function rerunFormatter() {
    await loadSettings();
    reprocessPage();
  }

  function reprocessPage() {
    observer?.disconnect();
    clearFormatting();
    applyFormatting();
    observePage();
  }

  function isHiddenForCapture(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
    if (element.hidden || element.getAttribute("aria-hidden") === "true") return true;

    const style = window.getComputedStyle(element);
    return (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0"
    );
  }

  function normalizeCapturedText(text) {
    return text
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function collectReadableText(root = document.body) {
    const chunks = [];

    function appendBreak() {
      const last = chunks[chunks.length - 1];
      if (last && last !== "\n") chunks.push("\n");
    }

    function walk(node) {
      if (!node) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const value = node.nodeValue.replace(/\s+/g, " ").trim();
        if (value) chunks.push(value);
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (CAPTURE_SKIP_TAGS.has(node.tagName)) return;
      if (node.closest?.(CAPTURE_EXCLUDE_SELECTOR)) return;
      if (node.isContentEditable || isHiddenForCapture(node)) return;

      if (node.classList?.contains(FORMATTER_CLASS)) {
        chunks.push(node.dataset.originalText || node.textContent || "");
        return;
      }

      if (CAPTURE_BLOCK_TAGS.has(node.tagName)) appendBreak();

      for (const child of node.childNodes) {
        walk(child);
      }

      if (CAPTURE_BLOCK_TAGS.has(node.tagName)) appendBreak();
    }

    walk(root);
    return normalizeCapturedText(chunks.join(" "));
  }

  function textLengthForCaptureRoot(root) {
    return collectReadableText(root).length;
  }

  function findCaptureRoot() {
    for (const selector of CAPTURE_ROOT_SELECTORS) {
      const candidates = Array.from(document.querySelectorAll(selector))
        .filter((element) =>
          element &&
          !element.closest?.(CAPTURE_EXCLUDE_SELECTOR) &&
          !isHiddenForCapture(element)
        )
        .map((element) => ({
          element,
          length: textLengthForCaptureRoot(element)
        }))
        .filter((candidate) => candidate.length >= 120)
        .sort((a, b) => b.length - a.length);

      if (candidates[0]) return candidates[0].element;
    }

    return document.body;
  }


  function domSelectorHint(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return "";
    if (element.id) return `#${CSS.escape(element.id)}`;

    const parts = [];
    let current = element;
    while (current && current.nodeType === Node.ELEMENT_NODE && parts.length < 4) {
      let part = current.tagName.toLowerCase();
      const className = Array.from(current.classList || []).slice(0, 2).join(".");
      if (className) part += `.${className}`;
      parts.unshift(part);
      current = current.parentElement;
    }
    return parts.join(" > ");
  }

  function nearestVerseScope(element) {
    return element?.closest?.("[data-eng-ref], .verse, p[id^='p']");
  }

  function verseRefFromScope(scope) {
    if (!scope) return "";
    return scope.getAttribute("data-eng-ref") || "";
  }

  function verseNumberFromScope(scope) {
    const verseRef = verseRefFromScope(scope);
    const refMatch = verseRef.match(/(?:^|:)(\d+)$/);
    if (refMatch) return refMatch[1];

    const idMatch = (scope?.id || "").match(/^p?(\d+)$/i);
    return idMatch ? idMatch[1] : "";
  }

  function sourceDomPathForScope(scope) {
    const verseRef = verseRefFromScope(scope);
    const verseNumber = verseNumberFromScope(scope);
    if (verseRef) return `verse:${verseRef}`;
    if (verseNumber) return `verse:${verseNumber}`;
    return scope ? domSelectorHint(scope) : "";
  }

  function elementText(element) {
    return normalizeCapturedText(element?.textContent || "");
  }

  function hintAttributes(element, names) {
    const attributes = {};
    for (const name of names) {
      const value = element?.getAttribute?.(name);
      if (value) attributes[name] = value;
    }
    return attributes;
  }

  function createDomSemanticHint(capture, hintType, element, text, metadata = {}) {
    const verseScope = nearestVerseScope(element);
    const verseRef = metadata.verseRef || verseRefFromScope(verseScope);
    const verseNumber = metadata.verseNumber || verseNumberFromScope(verseScope);
    const normalizedText = normalizeCapturedText(text || elementText(element));
    if (!normalizedText) return null;

    return {
      id: `${Date.now()}-${textHash([
        capture.id || capture.url || "",
        hintType,
        verseRef,
        verseNumber,
        normalizedText,
        domSelectorHint(element)
      ].join("|"))}`,
      sourceCaptureId: capture.id || "",
      sourceUrl: capture.url || location.href,
      sourceContext: {
        sourceCaptureId: capture.id || "",
        sourceTitle: capture.title || document.title || "",
        sourceUrl: capture.url || location.href,
        sourceType: /\/scriptures\//i.test(location.href) ? "scripture" : "unknown",
        collection: /\/scriptures\//i.test(location.href) ? "scripture" : "unknown"
      },
      hintType,
      text: normalizedText,
      normalizedText: normalizedText.toLowerCase(),
      verseRef,
      verseNumber,
      domId: metadata.domId || element?.id || verseScope?.id || "",
      selectorHint: metadata.selectorHint || domSelectorHint(element),
      attributes: metadata.attributes || {},
      confidence: metadata.confidence || "source-markup",
      source: metadata.source || "dom",
      scopePath: metadata.scopePath || sourceDomPathForScope(verseScope),
      originalText: metadata.originalText || "",
      entityClass: metadata.entityClass || "",
      noHighlight: Boolean(metadata.noHighlight)
    };
  }

  function pushDomHint(hints, seen, capture, hintType, element, text, metadata = {}) {
    if (!element || hints.length >= DOM_HINT_LIMIT) return;
    const hint = createDomSemanticHint(capture, hintType, element, text, metadata);
    if (!hint) return;
    const key = [
      hint.hintType,
      hint.normalizedText,
      hint.verseRef,
      hint.verseNumber,
      hint.domId,
      hint.selectorHint
    ].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    hints.push(hint);
  }

  function extractDomSemanticHints(capture) {
    const hints = [];
    const seen = new Set();

    // Phase 7.2 optional DOM enrichment. Future site adapters can refine this
    // into LDS scripture, BibleGateway, conference talk, generic article, and
    // DOM-to-scopePath ingestion without replacing the plain-text fallback.
    for (const verse of Array.from(document.querySelectorAll("[data-eng-ref], p.verse, .verse")).slice(0, DOM_HINT_LIMIT)) {
      pushDomHint(hints, seen, capture, "verse_scope", verse, elementText(verse), {
        domId: verse.id || "",
        selectorHint: domSelectorHint(verse),
        attributes: hintAttributes(verse, ["id", "class", "data-eng-ref"]),
        confidence: "source-markup",
        scopePath: sourceDomPathForScope(verse)
      });
    }

    for (const deity of Array.from(document.querySelectorAll(".deity-name")).slice(0, DOM_HINT_LIMIT)) {
      pushDomHint(hints, seen, capture, "deity_name", deity, elementText(deity), {
        attributes: hintAttributes(deity, ["id", "class", "data-eng-ref"]),
        confidence: "source-markup"
      });
    }

    for (const uppercase of Array.from(document.querySelectorAll(".deity-name .uppercase, .uppercase")).slice(0, DOM_HINT_LIMIT)) {
      pushDomHint(hints, seen, capture, "uppercase_title", uppercase, elementText(uppercase), {
        attributes: hintAttributes(uppercase, ["id", "class", "data-eng-ref"]),
        confidence: "source-markup"
      });
    }

    for (const note of Array.from(document.querySelectorAll("a.study-note-ref")).slice(0, DOM_HINT_LIMIT)) {
      const href = note.getAttribute("href") || "";
      const linkedText = elementText(note);
      const labelText = note.getAttribute("aria-label") || note.getAttribute("title") || "";
      const attributes = {
        ...hintAttributes(note, ["id", "class", "href", "aria-label", "title"]),
        marker: linkedText,
        linkedText,
        labelText
      };
      pushDomHint(hints, seen, capture, "study_note_ref", note, linkedText || labelText, {
        domId: note.id || "",
        attributes,
        confidence: "source-markup"
      });
      pushDomHint(hints, seen, capture, "source_marker", note, linkedText || labelText, {
        domId: note.id || "",
        attributes,
        confidence: "source-markup"
      });
      if (/cross|ref/i.test(href) || /cross|ref/i.test(note.className || "")) {
        pushDomHint(hints, seen, capture, "cross_reference_ref", note, linkedText || labelText, {
          domId: note.id || "",
          attributes,
          confidence: "source-markup"
        });
      }
    }

    for (const rendered of Array.from(document.querySelectorAll(`.${FORMATTER_CLASS}`)).slice(0, DOM_HINT_LIMIT)) {
      pushDomHint(hints, seen, capture, "ice_rendered_reference", rendered, elementText(rendered), {
        attributes: hintAttributes(rendered, ["id", "class", "title", "data-original-text"]),
        originalText: rendered.dataset.originalText || "",
        entityClass: Array.from(rendered.classList || []).find((name) => /^I+$/.test(name)) || "",
        noHighlight: rendered.classList?.contains("ice-no-highlight") || false,
        confidence: "render-debug",
        source: "ice-render"
      });
    }

    return hints;
  }
  function wordCount(text) {
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }

  function buildCapturePageText() {
    const capturedText = collectReadableText(findCaptureRoot());

    // Phase 2 foundation: this local capture object is the future input for a
    // document library, timeline extraction, and historical analysis. No
    // backend, AI calls, or timeline UI are attached in Phase 2.
    const capture = {
      id: `${Date.now()}-${textHash(`${location.href}|${capturedText}`)}`,
      title: document.title || "",
      url: location.href,
      text: capturedText,
      wordCount: wordCount(capturedText),
      characterCount: capturedText.length,
      divineReferenceCount: engine.countDivineReferences(capturedText),
      capturedAt: new Date().toISOString()
    };
    capture.domSemanticHints = extractDomSemanticHints(capture);
    return capture;
  }

  async function capturePageText() {
    await initPromise;
    return buildCapturePageText();
  }

  async function maybeAutoCapture(reason, options = {}) {
    const force = Boolean(options.force);
    const bypassAutoSetting = Boolean(options.bypassAutoSetting);

    if (!settings.enabled) return;
    if (!settings.autoCaptureOnPageLoad && !bypassAutoSetting) return;
    if (!captureAllowedForPage()) return;
    if (!isExtensionContextValid()) {
      logContextUnavailableOnce();
      return;
    }
    if (autoCaptureCompleted && !force) return;

    autoCaptureCompleted = true;

    try {
      const capture = buildCapturePageText();
      const result = await persistCapture(capture);

      console.debug("I.C.E. capture persisted", {
        reason,
        saved: result.saved,
        duplicate: result.duplicate,
        wordCount: capture.wordCount
      });

      await safeRuntimeSendMessage({
        type: "ICE_RUN_FULL_ANALYSIS_PIPELINE",
        reason
      });
    } catch (error) {
      console.debug("I.C.E. auto capture skipped", {
        reason,
        error: error.message
      });
    }
  }

  safeAddStorageListener((changes, areaName) => {
    if (areaName !== "sync") return;
    if (!SETTINGS_KEYS.some((key) => changes[key])) return;

    for (const key of SETTINGS_KEYS) {
      if (changes[key]) settings[key] = changes[key].newValue;
    }

    console.debug("I.C.E. settings changed", { ...settings });

    if (FORMATTER_SETTING_KEYS.some((key) => changes[key])) {
      reprocessPage();
    }
  });

  safeAddRuntimeMessageListener((message, _sender, sendResponse) => {
    if (message?.type === "ICE_RERUN_FORMATTER") {
      rerunFormatter()
        .then(() => maybeAutoCapture("manual-rerun", {
          force: true,
          bypassAutoSetting: true
        }))
        .then(() => sendResponse({ ok: true }))
        .catch((error) => sendResponse({ ok: false, error: error.message }));

      return true;
    }

    if (message?.type === "ICE_CAPTURE_PAGE_TEXT") {
      capturePageText()
        .then((capture) => sendResponse({ ok: true, capture }))
        .catch((error) => sendResponse({ ok: false, error: error.message }));

      return true;
    }

    return false;
  });

  async function init() {
    if (!document.body) return;

    engine = await window.ICESacredFormatterEngine.create();
    if (isExtensionContextValid()) {
      await loadSettings();
    } else {
      logContextUnavailableOnce();
    }
    applyFormatting();
    observePage();
    if (isExtensionContextValid()) {
      maybeAutoCapture("page-load");
    }

    // Phase 2 capture foundation lives in capturePageText(). Future document
    // library, timeline extraction, and historical analysis should consume the
    // local capture object instead of coupling to DOM formatting.
  }

  initPromise = init().catch((error) => {
    if (/Extension context invalidated/i.test(error?.message || "")) {
      logContextUnavailableOnce();
      return;
    }
    console.error("I.C.E. formatter failed to initialize", error);
  });
})();

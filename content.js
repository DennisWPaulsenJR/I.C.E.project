(function () {
  if (window.__ICE_FORMATTER_CONTENT__) return;
  window.__ICE_FORMATTER_CONTENT__ = true;

  const DEFAULT_SETTINGS = {
    enabled: true,
    strictMode: true,
    highlightPronouns: false,
    autoCaptureOnPageLoad: true,
    showPageOverlay: false
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
  const PAGE_OVERLAY_ID = "ice-page-overlay";
  const PAGE_OVERLAY_STYLE_ID = "ice-page-overlay-style";
  const FORMATTER_STATUS_KEY = "ICE_FORMATTER_STATUS";
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
  const CROSS_REFERENCE_SET_KEY = "ICE_CROSS_REFERENCE_SET";
  const PANEL_UI_STATE_KEY = "ICE_PANEL_UI_STATE";
  const ACTIVE_ADAPTER_KEY = "ICE_ACTIVE_ADAPTER";
  const MANUAL_SELECTION_OVERLAY_ID = "ice-manual-selection-overlay";
  const MANUAL_SELECTION_STYLE_ID = "ice-manual-selection-overlay-style";
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

  function normalizeWhitespace(text) {
    return String(text ?? "").replace(/\s+/g, " ").trim();
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
      sourceAdapter: capture.sourceAdapter || null,
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

  function ensurePageOverlayStyle() {
    if (document.getElementById(PAGE_OVERLAY_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = PAGE_OVERLAY_STYLE_ID;
    style.textContent = `
      #${PAGE_OVERLAY_ID} {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 2147483647;
        max-width: min(320px, calc(100vw - 32px));
        padding: 10px 12px;
        border: 1px solid rgba(15, 23, 42, .18);
        border-radius: 8px;
        background: rgba(255, 255, 255, .96);
        color: #1f2937;
        box-shadow: 0 12px 30px rgba(15, 23, 42, .18);
        font: 12px/1.35 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        pointer-events: none;
      }
      #${PAGE_OVERLAY_ID} strong {
        display: block;
        margin-bottom: 2px;
        font-size: 13px;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function updatePageOverlay() {
    const existing = document.getElementById(PAGE_OVERLAY_ID);
    if (!settings.showPageOverlay) {
      existing?.remove();
      return;
    }

    ensurePageOverlayStyle();
    const overlay = existing || document.createElement("aside");
    overlay.id = PAGE_OVERLAY_ID;
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <strong>I.C.E. page overlay</strong>
      <span>${settings.enabled ? "Highlighting enabled" : "Highlighting disabled"} | ${settings.strictMode ? "Strict mode" : "Flexible mode"}</span>
    `;
    if (!existing) document.documentElement.appendChild(overlay);
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
    updatePageOverlay();
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

  function absoluteHref(href) {
    try {
      return href ? new URL(href, location.href).href : "";
    } catch (_error) {
      return href || "";
    }
  }

  function sourceDiscoveryRefType(link) {
    const href = link.getAttribute("href") || "";
    const text = normalizeCapturedText([
      link.textContent || "",
      link.getAttribute("aria-label") || "",
      link.getAttribute("title") || "",
      link.className || "",
      href
    ].join(" ")).toLowerCase();
    const pathname = (() => {
      try {
        return new URL(href, location.href).pathname.toLowerCase();
      } catch (_error) {
        return href.toLowerCase();
      }
    })();

    if (link.matches("a.study-note-ref") || /study-note|footnote|note\s*\d+[a-z]?/.test(text)) return "study_note";
    if (link.matches("a.scripture-ref") || /cross.?ref|cross-reference|footnote|fn|\b(?:gen|ex|num|deut|ruth|sam|chr|isa|matt|mark|luke|john)\.?\s+\d+[:]/i.test(text)) return "cross_reference";
    if (/media|video|audio|image|download|watch|listen/.test(text) || /\/media\//.test(pathname)) return "media";
    if (/table of contents|contents|toc/.test(text) || /\/study\/scriptures(?:\?|$|\/[^/]*$)/.test(pathname)) return "table_of_contents";
    if (/chapter|next|previous|matthew\s+\d+/.test(text) || /\/scriptures\/[^/]+\/[^/]+\/\d+/.test(pathname)) return "chapter_nav";
    if (/related|also see|see also/.test(text)) return "related_content";
    if (/\/study\/scriptures\//.test(pathname)) return "source_collection";
    return "external_link";
  }


  function sourceDiscoveryStructuralRole(link) {
    if (!link) return "unknown";
    if (link.closest("nav, header, footer, aside, [role='navigation'], [aria-label*='nav' i], [class*='nav' i], [class*='menu' i]")) return "navigation_chrome";
    if (link.closest("article, main, [role='main']")) return "main_content";
    if (link.closest("h1, h2, h3, h4, [class*='title' i], [class*='heading' i]")) return "heading_or_title";
    if (link.closest("[class*='card' i], [class*='result' i], [data-testid*='result' i]")) return "generic_result_card";
    return "generic_link";
  }

  function sourceDiscoverySurroundingText(link) {
    const container = link?.closest("article, main, section, li, div, p") || link;
    return normalizeCapturedText(container?.textContent || "").slice(0, 260);
  }
  function sourceDiscoveryConfidence(link, refType) {
    if (link.matches("a.study-note-ref") || refType === "study_note") return "source-markup";
    if (["chapter_nav", "table_of_contents", "source_collection"].includes(refType)) return "probable";
    return "possible";
  }

  function extractSourceDiscoveryLinks(capture) {
    const links = [];
    const seen = new Set();

    for (const link of Array.from(document.querySelectorAll("a[href]")).slice(0, DOM_HINT_LIMIT * 3)) {
      const rawHref = link.getAttribute("href") || "";
      const href = absoluteHref(rawHref);
      const linkText = normalizeCapturedText(link.textContent || link.getAttribute("aria-label") || link.getAttribute("title") || rawHref);
      if (!href || !linkText) continue;

      const verseScope = nearestVerseScope(link);
      const verseRef = verseRefFromScope(verseScope);
      const verseNumber = verseNumberFromScope(verseScope);
      const refType = sourceDiscoveryRefType(link);
      const sourceElement = domSelectorHint(link);
      const key = [refType, href, linkText, verseRef, verseNumber, sourceElement].join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      links.push({
        id: `${Date.now()}-${textHash(`source-discovery|${key}`)}`,
        sourceUrl: capture.url || location.href,
        sourceCaptureId: capture.id || "",
        discoveryScope: "current_page",
        linkText: linkText.slice(0, 180),
        href,
        refType,
        sourceElement,
        structuralRole: sourceDiscoveryStructuralRole(link),
        surroundingText: sourceDiscoverySurroundingText(link),
        verseRef,
        verseNumber,
        scopePath: sourceDomPathForScope(verseScope),
        confidence: sourceDiscoveryConfidence(link, refType)
      });
    }

    return links;
  }

  function metaDescriptionText() {
    return normalizeCapturedText(document.querySelector("meta[name='description'], meta[property='og:description']")?.getAttribute("content") || "");
  }

  function chapterHeadingCandidates() {
    return Array.from(document.querySelectorAll("[data-testid*='heading' i], [class*='chapterHeading' i], [class*='studyIntro' i], [class*='summary' i], .study-summary, .chapter-summary, h1, h2")).filter((element) => {
      if (!element || element.closest?.(CAPTURE_EXCLUDE_SELECTOR)) return false;
      const text = elementText(element);
      if (!text || text.length < 8 || text.length > 500) return false;
      if (/^(Matthew|Mark|Luke|John)\s+\d+$/i.test(text)) return false;
      return /\b(Jesus|John|baptiz|Holy Ghost|Spirit|Pharisees|Sadducees|repent|kingdom|heaven|fulfill|wise men|Joseph|child|Herod|Egypt|Nazareth)\b/i.test(text);
    });
  }
  function extractDomSemanticHints(capture) {
    const hints = [];
    const seen = new Set();

    const metaDescription = metaDescriptionText();
    if (metaDescription) {
      const isLdsScripturePage = /\/study\/scriptures\//i.test(location.pathname || "");
      pushDomHint(hints, seen, capture, isLdsScripturePage ? "chapter_heading" : "page_description", document.documentElement, metaDescription, {
        selectorHint: "meta[name='description']",
        confidence: "source-markup",
        source: isLdsScripturePage ? "lds-chapter-heading" : "page-metadata",
        scopePath: isLdsScripturePage ? "source.chapter_heading" : "source.description"
      });
    }

    for (const heading of chapterHeadingCandidates().slice(0, 4)) {
      pushDomHint(hints, seen, capture, "chapter_heading", heading, elementText(heading), {
        attributes: hintAttributes(heading, ["id", "class", "data-testid"]),
        confidence: "source-markup",
        source: "lds-chapter-heading",
        scopePath: "source.chapter_heading",
        noHighlight: true
      });
    }
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

  function detectActiveSourceAdapter() {
    const hostname = location.hostname || "";
    const pathname = location.pathname || "";
    const hasLdsDomain = /(?:^|\.)churchofjesuschrist\.org$/i.test(hostname);
    const hasScripturePath = /\/scriptures\//i.test(pathname);
    const hasVerseMarkup = Boolean(document.querySelector("[data-eng-ref], .verse"));
    const hasStudyNotes = Boolean(document.querySelector("a.study-note-ref"));
    const hasDeityMarkup = Boolean(document.querySelector(".deity-name"));
    const hasGenericMain = Boolean(document.querySelector("article, main, [role='main'], h1, p"));
    const registry = sourceAdapterRegistry();

    if (hasLdsDomain || hasScripturePath || hasVerseMarkup || hasStudyNotes || hasDeityMarkup) {
      const adapter = registry.find((item) => item.adapterName === "lds_scripture_adapter");
      return {
        ...adapter,
        detectedCapabilities: adapter.semanticCapabilities.filter((capability) => {
          if (capability === "verse_scope" || capability === "data_eng_ref") return hasVerseMarkup;
          if (capability === "study_note_ref") return hasStudyNotes;
          if (capability === "deity_name") return hasDeityMarkup;
          return true;
        }),
        detectionSignals: {
          hostname,
          hasLdsDomain,
          hasScripturePath,
          hasVerseMarkup,
          hasStudyNotes,
          hasDeityMarkup
        },
        fallbackMode: false,
        detectedAt: new Date().toISOString()
      };
    }

    if (hasGenericMain) {
      const adapter = registry.find((item) => item.adapterName === "generic_html_adapter");
      return {
        ...adapter,
        detectedCapabilities: adapter.semanticCapabilities,
        detectionSignals: { hostname, hasGenericMain },
        fallbackMode: true,
        detectedAt: new Date().toISOString()
      };
    }

    const adapter = registry.find((item) => item.adapterName === "plain_text_adapter");
    return {
      ...adapter,
      detectedCapabilities: adapter.semanticCapabilities,
      detectionSignals: { hostname },
      fallbackMode: true,
      detectedAt: new Date().toISOString()
    };
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
      capturedAt: new Date().toISOString(),
      sourceAdapter: detectActiveSourceAdapter()
    };
    capture.domSemanticHints = extractDomSemanticHints(capture);
    capture.sourceDiscoveryLinks = extractSourceDiscoveryLinks(capture);
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
    if (changes.showPageOverlay || changes.enabled || changes.strictMode) {
      updatePageOverlay();
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

    if (message?.type === "ICE_SET_PAGE_OVERLAY") {
      settings.showPageOverlay = Boolean(message.showPageOverlay);
      updatePageOverlay();
      sendResponse({ ok: true, showPageOverlay: settings.showPageOverlay });
      return false;
    }

    if (message?.type === "ICE_CAPTURE_PAGE_TEXT") {
      capturePageText()
        .then((capture) => sendResponse({ ok: true, capture }))
        .catch((error) => sendResponse({ ok: false, error: error.message }));

      return true;
    }

    if (message?.type === "ICE_GET_VISIBLE_SELECTION") {
      try {
        const snapshot = manualSelectionSnapshot();
        sendResponse({
          ok: true,
          selection: snapshot ? {
            text: snapshot.text,
            title: snapshot.title,
            url: snapshot.url,
            selectionType: snapshot.selectionType,
            canonicalReference: snapshot.canonicalReference,
            sourceScope: snapshot.sourceScope,
            scopePath: snapshot.scopePath,
            capturedAt: snapshot.capturedAt,
            provenance: snapshot.provenance
          } : null
        });
      } catch (error) {
        sendResponse({ ok: false, error: error.message });
      }

      return false;
    }

    if (message?.type === "ICE_START_MANUAL_SELECTION_MODE") {
      try {
        sendResponse({ ok: true, selectionMode: startManualSelectionMode() });
      } catch (error) {
        sendResponse({ ok: false, error: error.message });
      }
      return false;
    }

    if (message?.type === "ICE_CANCEL_MANUAL_SELECTION_MODE") {
      stopManualSelectionMode("Manual selection canceled.");
      sendResponse({ ok: true });
      return false;
    }

    return false;
  });

  const manualSelectionState = {
    active: false,
    updateTimer: 0,
    lastSnapshot: null,
    handlersBound: false
  };

  function trimDisplayText(text = "", maxLength = 180) {
    const value = normalizeWhitespace(text);
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 1).trim()}...`;
  }

  function visibleSelectionRange() {
    const selection = window.getSelection?.();
    if (!selection || !selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    const root = document.body;
    if (!root?.contains(range.commonAncestorContainer)) return null;
    const element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    if (!element || element.closest?.("script, style, input, textarea, select, option, noscript, [aria-hidden='true']")) return null;
    return range;
  }

  function selectionTypeForText(text = "") {
    const normalized = normalizeWhitespace(text);
    if (!normalized) return "unresolved";
    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length <= 1) return "word";
    if (words.length <= 12) return "phrase";
    if (words.length <= 28) return "line or short passage";
    if (/\b\d+[:.]\d+\b/.test(normalized) || words.length > 40) return "passage";
    return "visible selection";
  }

  function sourceMatchFromLocation(url = location.href) {
    const match = String(url || "").match(/\/scriptures\/(?:[^/]+\/)*([^/?#]+)\/(\d+)\b/i);
    if (!match) return null;
    const books = {
      matt: "Matthew", mark: "Mark", luke: "Luke", john: "John", acts: "Acts", rom: "Romans",
      "1-cor": "1 Corinthians", "2-cor": "2 Corinthians", gal: "Galatians", eph: "Ephesians",
      phil: "Philippians", col: "Colossians", heb: "Hebrews", rev: "Revelation"
    };
    const slug = match[1].toLowerCase();
    const book = books[slug] || slug.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" ");
    return { book, chapter: match[2] };
  }

  function manualSelectionSnapshot() {
    const selection = window.getSelection?.();
    const text = normalizeWhitespace(selection?.toString?.() || "");
    const range = text ? visibleSelectionRange() : null;
    if (!text || !range) return null;
    const element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    const verseScope = nearestVerseScope(element);
    const verseRef = verseRefFromScope(verseScope);
    const verseNumber = verseNumberFromScope(verseScope);
    const source = sourceMatchFromLocation();
    const canonicalReference = verseRef || (source?.book && source?.chapter && verseNumber ? `${source.book} ${source.chapter}:${verseNumber}` : "");
    return {
      text,
      preview: trimDisplayText(text, 260),
      title: document.title || "",
      url: location.href,
      selectionType: selectionTypeForText(text),
      canonicalReference,
      verseRef,
      verseNumber,
      sourceScope: canonicalReference || (source?.book && source?.chapter ? `${source.book} ${source.chapter}` : ""),
      scopePath: sourceDomPathForScope(verseScope),
      capturedAt: new Date().toISOString(),
      provenance: "visible user selection"
    };
  }

  function ensureManualSelectionStyle() {
    if (document.getElementById(MANUAL_SELECTION_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = MANUAL_SELECTION_STYLE_ID;
    style.textContent = `
      #${MANUAL_SELECTION_OVERLAY_ID} {
        position: fixed;
        z-index: 2147483647;
        right: 16px;
        bottom: 16px;
        width: min(340px, calc(100vw - 32px));
        padding: 14px;
        border: 1px solid #b7c6dc;
        border-radius: 12px;
        background: #ffffff;
        color: #101a33;
        box-shadow: 0 18px 50px rgba(20, 32, 55, .24);
        font: 14px/1.4 Arial, sans-serif;
      }
      #${MANUAL_SELECTION_OVERLAY_ID} * { box-sizing: border-box; }
      #${MANUAL_SELECTION_OVERLAY_ID} h2 { margin: 0 0 6px; font-size: 16px; }
      #${MANUAL_SELECTION_OVERLAY_ID} p { margin: 0 0 8px; }
      #${MANUAL_SELECTION_OVERLAY_ID} .ice-selection-preview {
        max-height: 96px;
        overflow: auto;
        padding: 8px;
        border: 1px solid #dce3ef;
        border-radius: 8px;
        background: #f6f8fc;
        white-space: pre-wrap;
      }
      #${MANUAL_SELECTION_OVERLAY_ID} .ice-selection-meta { color: #59657a; font-size: 12px; }
      #${MANUAL_SELECTION_OVERLAY_ID} .ice-selection-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
      #${MANUAL_SELECTION_OVERLAY_ID} button {
        min-height: 36px;
        border: 1px solid #dce3ef;
        border-radius: 8px;
        background: #fff;
        color: #101a33;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }
      #${MANUAL_SELECTION_OVERLAY_ID} button.primary { border-color: #0f62fe; background: #0f62fe; color: #fff; }
      #${MANUAL_SELECTION_OVERLAY_ID} button:focus-visible { outline: 3px solid #8ab4ff; outline-offset: 2px; }
      #${MANUAL_SELECTION_OVERLAY_ID} button:disabled { opacity: .55; cursor: not-allowed; }
      @media (prefers-reduced-motion: reduce) { #${MANUAL_SELECTION_OVERLAY_ID} { scroll-behavior: auto; } }
    `;
    document.documentElement.appendChild(style);
  }

  function manualSelectionOverlay() {
    ensureManualSelectionStyle();
    let panel = document.getElementById(MANUAL_SELECTION_OVERLAY_ID);
    if (!panel) {
      panel = document.createElement("aside");
      panel.id = MANUAL_SELECTION_OVERLAY_ID;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-label", "I.C.E. manual selection");
      panel.setAttribute("aria-live", "polite");
      document.documentElement.appendChild(panel);
    }
    return panel;
  }

  function renderManualSelectionOverlay(message = "") {
    if (!manualSelectionState.active) return;
    const snapshot = manualSelectionState.lastSnapshot;
    const panel = manualSelectionOverlay();
    panel.textContent = "";
    const heading = document.createElement("h2");
    heading.textContent = "Manual Select";
    const status = document.createElement("p");
    status.textContent = message || (snapshot ? "Selection detected. Add it to Current Study when ready." : "Waiting for visible selection.");
    panel.append(heading, status);
    if (snapshot) {
      const preview = document.createElement("p");
      preview.className = "ice-selection-preview";
      preview.textContent = snapshot.preview;
      const meta = document.createElement("p");
      meta.className = "ice-selection-meta";
      meta.textContent = [
        `Type: ${snapshot.selectionType}`,
        snapshot.canonicalReference ? `Reference: ${snapshot.canonicalReference}` : "Reference: unresolved",
        "Context: selection evidence / limited context"
      ].join(" | ");
      panel.append(preview, meta);
    }
    const actions = document.createElement("div");
    actions.className = "ice-selection-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "primary";
    add.textContent = "Add";
    add.disabled = !snapshot;
    add.addEventListener("click", () => addManualSelectionSnapshot().catch((error) => renderManualSelectionOverlay(error.message || "Selection add failed.")));
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => stopManualSelectionMode("Manual selection canceled."));
    actions.append(add, cancel);
    panel.appendChild(actions);
  }

  function scheduleManualSelectionUpdate() {
    if (!manualSelectionState.active) return;
    window.clearTimeout(manualSelectionState.updateTimer);
    manualSelectionState.updateTimer = window.setTimeout(() => {
      const next = manualSelectionSnapshot();
      const previousKey = manualSelectionState.lastSnapshot ? `${manualSelectionState.lastSnapshot.text}|${manualSelectionState.lastSnapshot.canonicalReference}` : "";
      const nextKey = next ? `${next.text}|${next.canonicalReference}` : "";
      manualSelectionState.lastSnapshot = next;
      if (previousKey !== nextKey) renderManualSelectionOverlay();
    }, 120);
  }

  function manualSelectionKey(record = {}) {
    return record.id || record.selectionId || [record.sourceUrl || record.url, record.exactText || record.selectedText].join("|");
  }

  async function addManualSelectionSnapshot() {
    const snapshot = manualSelectionState.lastSnapshot || manualSelectionSnapshot();
    if (!snapshot?.text) {
      renderManualSelectionOverlay("No visible selection is ready to add.");
      return;
    }
    const data = await safeStorageLocalGet([CROSS_REFERENCE_SET_KEY, PANEL_UI_STATE_KEY, ACTIVE_ADAPTER_KEY]);
    const ui = data[PANEL_UI_STATE_KEY] || {};
    const adapter = data[ACTIVE_ADAPTER_KEY] || {};
    const record = {
      id: `manual-selection|${textHash(`${snapshot.url}|${snapshot.canonicalReference}|${snapshot.text}`)}`,
      itemType: "manual_selection",
      label: snapshot.canonicalReference || snapshot.sourceScope || snapshot.title || "Manual selection",
      sourceTitle: snapshot.title || "Manual selection",
      sourceUrl: snapshot.url,
      exactText: snapshot.text,
      selectedText: snapshot.text,
      preview: snapshot.preview,
      selectionType: snapshot.selectionType,
      canonicalReference: snapshot.canonicalReference,
      sourceReference: snapshot.canonicalReference,
      sourceScope: snapshot.sourceScope,
      scopePath: snapshot.scopePath,
      activeAdapter: adapter.adapterName || adapter.adapterId || ui.selectedAdapterForNewAnalysis || "current source adapter",
      activeLenses: Array.isArray(ui.selectedLensesForNewAnalysis) ? ui.selectedLensesForNewAnalysis : (ui.selectedLensForNewAnalysis ? [ui.selectedLensForNewAnalysis] : []),
      contextDistance: "limited_context_selection",
      origin: "manual_selection_overlay",
      state: snapshot.canonicalReference ? "SELECTION EVIDENCE" : "UNRESOLVED REFERENCE",
      analysisState: "PENDING ANALYSIS",
      unresolved: !snapshot.canonicalReference,
      analyzed: false,
      addedAt: new Date().toISOString(),
      provenance: {
        source: "visible user selection",
        sourceUrl: snapshot.url,
        capturedBy: "content_manual_selection_overlay",
        canonicalReference: snapshot.canonicalReference || "unresolved"
      }
    };
    const existing = Array.isArray(data[CROSS_REFERENCE_SET_KEY]) ? data[CROSS_REFERENCE_SET_KEY] : [];
    const nextSet = [record, ...existing]
      .filter((item, index, items) => items.findIndex((candidate) => manualSelectionKey(candidate) === manualSelectionKey(item)) === index)
      .slice(0, 64);
    await safeStorageLocalSet({
      [CROSS_REFERENCE_SET_KEY]: nextSet,
      [PANEL_UI_STATE_KEY]: {
        ...ui,
        lastAction: "manual_selection_overlay_add",
        updatedAt: new Date().toISOString()
      }
    });
    renderManualSelectionOverlay("Selection added to Current Study. Popup reopening is not required.");
    window.setTimeout(() => stopManualSelectionMode(""), 900);
  }

  function handleManualSelectionKeydown(event) {
    if (event.key === "Escape" && manualSelectionState.active) {
      event.preventDefault();
      stopManualSelectionMode("Manual selection canceled.");
    }
  }

  function handleManualSelectionPageHide() {
    stopManualSelectionMode("");
  }

  function bindManualSelectionListeners() {
    if (manualSelectionState.handlersBound) return;
    manualSelectionState.handlersBound = true;
    document.addEventListener("selectionchange", scheduleManualSelectionUpdate, { passive: true });
    document.addEventListener("mouseup", scheduleManualSelectionUpdate, { passive: true });
    document.addEventListener("keyup", scheduleManualSelectionUpdate, { passive: true });
    document.addEventListener("keydown", handleManualSelectionKeydown, true);
    window.addEventListener("pagehide", handleManualSelectionPageHide, { once: true });
  }

  function unbindManualSelectionListeners() {
    if (!manualSelectionState.handlersBound) return;
    manualSelectionState.handlersBound = false;
    document.removeEventListener("selectionchange", scheduleManualSelectionUpdate);
    document.removeEventListener("mouseup", scheduleManualSelectionUpdate);
    document.removeEventListener("keyup", scheduleManualSelectionUpdate);
    document.removeEventListener("keydown", handleManualSelectionKeydown, true);
    window.removeEventListener("pagehide", handleManualSelectionPageHide);
  }

  function startManualSelectionMode() {
    manualSelectionState.active = true;
    manualSelectionState.lastSnapshot = manualSelectionSnapshot();
    bindManualSelectionListeners();
    renderManualSelectionOverlay();
    scheduleManualSelectionUpdate();
    return { active: true, hasSelection: Boolean(manualSelectionState.lastSnapshot) };
  }

  function stopManualSelectionMode(message = "") {
    manualSelectionState.active = false;
    manualSelectionState.lastSnapshot = null;
    window.clearTimeout(manualSelectionState.updateTimer);
    unbindManualSelectionListeners();
    document.getElementById(MANUAL_SELECTION_OVERLAY_ID)?.remove();
    if (message) console.debug(`I.C.E. ${message}`);
  }

  async function init() {
    if (!document.body) return;

    engine = await window.ICESacredFormatterEngine.create();
    if (isExtensionContextValid()) {
      await loadSettings();
    } else {
      logContextUnavailableOnce();
    }
    applyFormatting();
    updatePageOverlay();
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

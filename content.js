(function () {
  if (window.__ICE_FORMATTER_CONTENT__) return;
  window.__ICE_FORMATTER_CONTENT__ = true;

  const DEFAULT_SETTINGS = {
    enabled: true,
    strictMode: true,
    highlightPronouns: false
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "CODE", "PRE"]);
  const CAPTURE_SKIP_TAGS = new Set([
    ...SKIP_TAGS,
    "NAV",
    "FOOTER",
    "FORM",
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
  const FORMATTER_CLASS = "ice-sacred-reference";
  const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS);
  const FORMATTER_STATUS_KEY = "ICE_FORMATTER_STATUS";

  let engine;
  let settings = { ...DEFAULT_SETTINGS };
  let observer;
  let initPromise;
  let scheduled = false;
  let isApplying = false;

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
    chrome.storage.local.set({
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
      ...(await chrome.storage.sync.get(DEFAULT_SETTINGS))
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

  function wordCount(text) {
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }

  async function capturePageText() {
    await initPromise;

    const capturedText = collectReadableText();

    // Phase 2 foundation: this local capture object is the future input for a
    // document library, timeline extraction, and historical analysis. No
    // backend, AI calls, or timeline UI are attached in Phase 2.
    return {
      title: document.title || "",
      url: location.href,
      text: capturedText,
      wordCount: wordCount(capturedText),
      characterCount: capturedText.length,
      divineReferenceCount: engine.countDivineReferences(capturedText),
      capturedAt: new Date().toISOString()
    };
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;
    if (!SETTINGS_KEYS.some((key) => changes[key])) return;

    for (const key of SETTINGS_KEYS) {
      if (changes[key]) settings[key] = changes[key].newValue;
    }

    console.debug("I.C.E. settings changed", { ...settings });

    reprocessPage();
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "ICE_RERUN_FORMATTER") {
      rerunFormatter()
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
    await loadSettings();
    applyFormatting();
    observePage();

    // Phase 2 capture foundation lives in capturePageText(). Future document
    // library, timeline extraction, and historical analysis should consume the
    // local capture object instead of coupling to DOM formatting.
  }

  initPromise = init().catch((error) => {
    console.error("I.C.E. formatter failed to initialize", error);
  });
})();

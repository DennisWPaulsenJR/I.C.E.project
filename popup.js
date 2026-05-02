document.addEventListener("DOMContentLoaded", async () => {
  const CAPTURE_STORAGE_KEY = "ICE_LATEST_CAPTURE";
  const CAPTURE_HISTORY_KEY = "ICE_CAPTURE_HISTORY";
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
});

(function () {
  if (window.__ICE_PAGE_OVERLAY__) return;
  window.__ICE_PAGE_OVERLAY__ = true;

  const SYNC_DEFAULTS = {
    showPageOverlay: false
  };
  const STORAGE_KEYS = {
    analysisStatus: "ICE_ANALYSIS_STATUS",
    actorTimelines: "ICE_ACTOR_TIMELINES",
    sceneModels: "ICE_SCENE_MODELS",
    orderedEvents: "ICE_ORDERED_EVENTS",
    interactionGraph: "ICE_INTERACTION_GRAPH",
    latestCapture: "ICE_LATEST_CAPTURE"
  };
  const WATCHED_LOCAL_KEYS = new Set(Object.values(STORAGE_KEYS));
  const HOST_ID = "ice-page-overlay-host";
  const MAX_PREVIEW_ITEMS = 3;

  let enabled = false;
  let host = null;
  let overlayRoot = null;
  let latestData = {};

  function isExtensionContextValid() {
    try {
      return Boolean(
        chrome?.runtime?.id &&
        chrome.storage?.local &&
        chrome.storage?.sync
      );
    } catch (_error) {
      return false;
    }
  }

  async function safeSyncGet(defaults) {
    if (!isExtensionContextValid()) return defaults;

    try {
      return await chrome.storage.sync.get(defaults);
    } catch (_error) {
      return defaults;
    }
  }

  async function safeSyncSet(data) {
    if (!isExtensionContextValid()) return false;

    try {
      await chrome.storage.sync.set(data);
      return true;
    } catch (_error) {
      return false;
    }
  }

  async function safeLocalGet(keys) {
    if (!isExtensionContextValid()) return {};

    try {
      return await chrome.storage.local.get(keys);
    } catch (_error) {
      return {};
    }
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function trimText(text, maxLength = 120) {
    const value = String(text || "").replace(/\s+/g, " ").trim();
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 1).trim()}...`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatCount(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number.toLocaleString() : "0";
  }

  function formatDate(value) {
    if (!value) return "Never";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return date.toLocaleString();
  }

  function statusCount(status, key, fallback) {
    const value = status?.[key];
    if (typeof value === "number") return value;
    return Array.isArray(fallback) ? fallback.length : 0;
  }

  function actorActionCount(actor) {
    return (
      asArray(actor?.orderedActions).length ||
      asArray(actor?.actions).length ||
      asArray(actor?.events).length ||
      0
    );
  }

  function sceneTitle(scene) {
    return trimText(
      scene?.sceneTitle ||
      scene?.title ||
      scene?.sceneType ||
      scene?.sourceSnippet ||
      scene?.summary ||
      "Untitled scene",
      90
    );
  }

  function eventTitle(eventItem) {
    return trimText(
      eventItem?.orderedText ||
      eventItem?.eventText ||
      eventItem?.summary ||
      eventItem?.sourceSnippet ||
      "Untitled event",
      90
    );
  }

  function getStudyUrl() {
    if (!isExtensionContextValid()) return "#";

    try {
      return chrome.runtime.getURL("study.html");
    } catch (_error) {
      return "#";
    }
  }

  function createHost() {
    if (host && overlayRoot) return;

    host = document.getElementById(HOST_ID);
    if (!host) {
      host = document.createElement("aside");
      host.id = HOST_ID;
      host.setAttribute("data-ice-page-overlay", "true");
      host.setAttribute("aria-label", "I.C.E. page analysis overlay");
      document.documentElement.appendChild(host);
    }

    overlayRoot = host.shadowRoot || host.attachShadow({ mode: "open" });
  }

  function removeHost() {
    host?.remove();
    host = null;
    overlayRoot = null;
  }

  function renderList(items, emptyText) {
    if (items.length === 0) {
      return `<p class="empty">${escapeHtml(emptyText)}</p>`;
    }

    return `
      <ol>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    `;
  }

  function render() {
    if (!enabled) {
      removeHost();
      return;
    }

    createHost();

    const status = latestData[STORAGE_KEYS.analysisStatus] || {};
    const actors = asArray(latestData[STORAGE_KEYS.actorTimelines]);
    const scenes = asArray(latestData[STORAGE_KEYS.sceneModels]);
    const orderedEvents = asArray(latestData[STORAGE_KEYS.orderedEvents]);
    const interactions = asArray(latestData[STORAGE_KEYS.interactionGraph]);
    const latestCapture = latestData[STORAGE_KEYS.latestCapture] || {};

    const actorItems = actors
      .slice(0, MAX_PREVIEW_ITEMS)
      .map((actor) => `<strong>${escapeHtml(trimText(actor.actorName || "Unknown actor", 45))}</strong> <span>${formatCount(actorActionCount(actor))} actions</span>`);
    const sceneItems = scenes
      .slice(0, MAX_PREVIEW_ITEMS)
      .map((scene) => escapeHtml(sceneTitle(scene)));
    const eventItems = orderedEvents
      .slice(0, MAX_PREVIEW_ITEMS)
      .map((eventItem, index) => escapeHtml(`${eventItem.sequenceOrder || index + 1}. ${eventTitle(eventItem)}`));
    const studyUrl = getStudyUrl();

    overlayRoot.innerHTML = `
      <style>
        :host {
          all: initial;
          color-scheme: light;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .panel {
          position: fixed;
          z-index: 2147483647;
          right: 16px;
          top: 72px;
          width: min(320px, calc(100vw - 32px));
          max-height: calc(100vh - 96px);
          overflow: auto;
          box-sizing: border-box;
          padding: 14px;
          border: 1px solid rgba(67, 56, 202, 0.28);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.22);
          color: #172033;
          font-size: 13px;
          line-height: 1.35;
          backdrop-filter: blur(8px);
        }

        header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        h2, h3, p, ol, dl {
          margin: 0;
        }

        h2 {
          color: #312e81;
          font-size: 14px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .source {
          margin-top: 3px;
          color: #64748b;
          font-size: 11px;
        }

        button {
          border: 0;
          border-radius: 999px;
          background: #eef2ff;
          color: #3730a3;
          cursor: pointer;
          font: inherit;
          font-weight: 700;
          height: 26px;
          line-height: 1;
          min-width: 26px;
        }

        .counts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin: 10px 0 12px;
        }

        .count-card {
          border-radius: 12px;
          background: #f8fafc;
          padding: 8px;
          text-align: center;
        }

        .count-card dt {
          color: #64748b;
          font-size: 10px;
          text-transform: uppercase;
        }

        .count-card dd {
          margin: 2px 0 0;
          color: #1e1b4b;
          font-size: 16px;
          font-weight: 800;
        }

        section {
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
          margin-top: 10px;
        }

        h3 {
          color: #334155;
          font-size: 12px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        ol {
          padding-left: 20px;
        }

        li + li {
          margin-top: 5px;
        }

        .meta,
        .empty {
          color: #64748b;
          font-size: 11px;
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        a {
          display: inline-flex;
          flex: 1;
          justify-content: center;
          border-radius: 999px;
          background: #4338ca;
          color: #fff;
          font-weight: 700;
          padding: 8px 10px;
          text-decoration: none;
        }
      </style>
      <div class="panel" role="complementary" aria-label="I.C.E. live analysis summary">
        <header>
          <div>
            <h2>I.C.E. Live Summary</h2>
            <p class="source">${escapeHtml(trimText(latestCapture.title || document.title || "Current page", 80))}</p>
          </div>
          <button type="button" id="iceOverlayClose" aria-label="Hide I.C.E. page overlay">x</button>
        </header>

        <dl class="counts">
          <div class="count-card"><dt>Actors</dt><dd>${formatCount(statusCount(status, "actorTimelineCount", actors))}</dd></div>
          <div class="count-card"><dt>Scenes</dt><dd>${formatCount(statusCount(status, "sceneCount", scenes))}</dd></div>
          <div class="count-card"><dt>Events</dt><dd>${formatCount(statusCount(status, "orderedEventCount", orderedEvents))}</dd></div>
          <div class="count-card"><dt>Links</dt><dd>${formatCount(status.prophecyLinkCount)}</dd></div>
          <div class="count-card"><dt>Timeline</dt><dd>${formatCount(status.timelineCount)}</dd></div>
          <div class="count-card"><dt>Talks</dt><dd>${formatCount(statusCount(status, "interactionCount", interactions))}</dd></div>
        </dl>

        <p class="meta">Last analysis: ${escapeHtml(formatDate(status.analyzedAt || status.lastAnalyzedAt || status.updatedAt))}</p>

        <section>
          <h3>Actors</h3>
          ${renderList(actorItems, "No actor timelines stored yet.")}
        </section>

        <section>
          <h3>Scenes</h3>
          ${renderList(sceneItems, "No scene models stored yet.")}
        </section>

        <section>
          <h3>Ordered events</h3>
          ${renderList(eventItems, "No ordered events stored yet.")}
        </section>

        <div class="actions">
          <a href="${escapeHtml(studyUrl)}" target="_blank" rel="noreferrer">Open Study Panel</a>
        </div>
      </div>
    `;

    overlayRoot.getElementById("iceOverlayClose")?.addEventListener("click", async () => {
      enabled = false;
      removeHost();
      await safeSyncSet({ showPageOverlay: false });
    });
  }

  async function refreshData() {
    latestData = await safeLocalGet(Object.values(STORAGE_KEYS));
    render();
  }

  async function initialize() {
    const settings = await safeSyncGet(SYNC_DEFAULTS);
    enabled = Boolean(settings.showPageOverlay);
    if (enabled) await refreshData();
  }

  if (isExtensionContextValid()) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "sync" && changes.showPageOverlay) {
        enabled = Boolean(changes.showPageOverlay.newValue);
        if (enabled) {
          refreshData();
        } else {
          removeHost();
        }
        return;
      }

      if (areaName === "local" && Object.keys(changes).some((key) => WATCHED_LOCAL_KEYS.has(key))) {
        refreshData();
      }
    });
  }

  initialize();
})();
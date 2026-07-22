const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const popupHtml = fs.readFileSync(path.join(root, "popup.html"), "utf8");
const popupJs = fs.readFileSync(path.join(root, "popup.js"), "utf8");
const studyJs = fs.readFileSync(path.join(root, "study.js"), "utf8");
const backgroundJs = fs.readFileSync(path.join(root, "background.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractFunctionSource(source, functionName) {
  const match = new RegExp(`(?:async\\s+)?function\\s+${functionName}\\s*\\(`).exec(source);
  let start = match?.index ?? -1;
  assert(start >= 0, `Missing function ${functionName}.`);
  const paramsEnd = source.indexOf(")", start);
  assert(paramsEnd >= 0, `Missing function parameters for ${functionName}.`);
  const bodyStart = source.indexOf("{", paramsEnd);
  assert(bodyStart >= 0, `Missing function body for ${functionName}.`);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unclosed function body for ${functionName}.`);
}

function createClearAllHarness(options = {}) {
  const clearAllSource = extractFunctionSource(popupJs, "clearAllIceData");
  const preservedSource = extractFunctionSource(popupJs, "preservedPanelUiState");
  const fallbackSource = extractFunctionSource(popupJs, "clearAllIceDataFallback");
  const removeKnownSource = extractFunctionSource(popupJs, "removeKnownStudyKeysFromStorageArea");
  const harness = `
    const PANEL_UI_STATE_KEY = "ICE_PANEL_UI_STATE";
    const CLEAR_ALL_STUDY_DATA_KEYS = clearAllKeys;
    let statusMessage = "";
    let summariesLoaded = 0;
    const window = { confirm: () => confirmResult };
    const storageArea = (store) => ({
      async get(key) {
        if (key === null) return { ...store };
        const list = Array.isArray(key) ? key : [key];
        return Object.fromEntries(list.map((item) => [item, store[item]]));
      },
      async remove(keys) {
        if (removeFailure) throw new Error("simulated storage remove failure");
        const list = Array.isArray(keys) ? keys : [keys];
        removedKeys.push(...list);
        list.forEach((key) => delete store[key]);
      },
      async set(values) {
        Object.assign(store, values);
      }
    });
    const chrome = {
      runtime: {
        async sendMessage(message) {
          runtimeMessages.push(message);
          if (runtimeFailure) throw new Error("simulated runtime failure");
          if (message?.type === "ICE_CLEAR_ALL_STUDY_DATA") {
            const list = Array.from(new Set(CLEAR_ALL_STUDY_DATA_KEYS));
            list.forEach((key) => {
              delete storage[key];
              delete sessionStorageData[key];
            });
            storage[PANEL_UI_STATE_KEY] = {
              selectedAdapterForNewAnalysis: message.preservedPanelUiState?.selectedAdapterForNewAnalysis,
              selectedLensForNewAnalysis: message.preservedPanelUiState?.selectedLensForNewAnalysis,
              selectedLensesForNewAnalysis: message.preservedPanelUiState?.selectedLensesForNewAnalysis,
              lastAction: "popup_clear_all_ice_data",
              clearAllGeneration: 1,
              updatedAt: "qa"
            };
            return { ok: true, removedLocalKeys: list, removedSessionKeys: list, preservedKeys: [PANEL_UI_STATE_KEY] };
          }
          return { ok: false, error: "unexpected message" };
        }
      },
      storage: {
        local: storageArea(storage),
        session: storageArea(sessionStorageData)
      }
    };
    async function loadAllSummaries() {
      summariesLoaded += 1;
    }
    function setCaptureStatus(message) {
      statusMessage = message;
    }
    ${preservedSource}
    ${removeKnownSource}
    ${fallbackSource}
    ${clearAllSource}
    return {
      clearAllIceData,
      getStorage: () => ({ ...storage }),
      getSessionStorage: () => ({ ...sessionStorageData }),
      getRemovedKeys: () => removedKeys.slice(),
      getRuntimeMessages: () => runtimeMessages.slice(),
      getStatus: () => statusMessage,
      getSummariesLoaded: () => summariesLoaded
    };
  `;
  return Function(
    "storage",
    "sessionStorageData",
    "removedKeys",
    "runtimeMessages",
    "confirmResult",
    "removeFailure",
    "runtimeFailure",
    "clearAllKeys",
    harness
  )(
    { ...(options.storage || {}) },
    { ...(options.sessionStorage || {}) },
    [],
    [],
    options.confirmResult !== false,
    Boolean(options.removeFailure),
    Boolean(options.runtimeFailure),
    clearAllStudyDataKeysFromPopup()
  );
}

function clearAllStudyDataKeysFromPopup() {
  const match = popupJs.match(/const CLEAR_ALL_STUDY_DATA_KEYS = \[([\s\S]*?)\];/);
  assert(match, "Missing popup CLEAR_ALL_STUDY_DATA_KEYS.");
  return Array.from(match[1].matchAll(/(?:const\s+)?([A-Z_]+_KEY)|"([^"]+)"/g))
    .map((item) => {
      if (item[2]) return item[2];
      const constName = item[1];
      const constMatch = popupJs.match(new RegExp(`const ${constName} = "([^"]+)"`));
      return constMatch?.[1] || "";
    })
    .filter(Boolean);
}

function reconstructedChapterMarkers(storage = {}) {
  const values = [
    storage.ICE_CANONICAL_ANALYZED_PAGES,
    storage.ICE_ANALYSIS_HISTORY,
    storage.ICE_SELECTED_RANGE?.pages,
    storage.ICE_JOURNEY_PAGE_SNAPSHOTS,
    storage.ICE_CROSS_REFERENCE_SET,
    storage.ICE_ORDERED_EVENTS,
    storage.ICE_RELATIONSHIP_GRAPH,
    storage.ICE_SESSION_CONTINUITY_REVIEW
  ].flat(Infinity).filter(Boolean);
  return Array.from(new Set(values.map((record) => {
    const text = [
      record.sourceTitle,
      record.label,
      record.sourceReference,
      record.sourceScope,
      record.verseRange,
      record.scopePath,
      record.chapter,
      record.sourceCaptureChapter,
      record.pageKey
    ].filter(Boolean).join(" ");
    const match = text.match(/\bMatthew\s+(\d+)\b/i) || text.match(/\bmatthew\|(\d+)\b/i) || text.match(/\bmatthew\|[^\|]*\|matthew\s+(\d+)\b/i);
    return match ? `Matthew ${match[1]}` : "";
  }).filter(Boolean))).sort((left, right) => Number(left.match(/\d+/)?.[0] || 0) - Number(right.match(/\d+/)?.[0] || 0));
}

function matthewStorageFixture() {
  const chapters = [1, 3, 5, 7, 9];
  const page = (chapter) => ({
    pageKey: `matthew|${chapter}|matthew ${chapter}|https://www.churchofjesuschrist.org/study/scriptures/nt/matt/${chapter}?lang=eng`,
    sourceTitle: `Matthew ${chapter}`,
    sourceCaptureBook: "Matthew",
    sourceCaptureChapter: String(chapter),
    url: `https://www.churchofjesuschrist.org/study/scriptures/nt/matt/${chapter}?lang=eng`,
    analysisTimestamp: "2026-07-20T00:00:00.000Z"
  });
  return {
    ICE_CANONICAL_ANALYZED_PAGES: chapters.map(page),
    ICE_ANALYSIS_HISTORY: chapters.map((chapter) => ({ sourceTitle: `Matthew ${chapter}`, sourceCaptureBook: "Matthew", sourceCaptureChapter: String(chapter) })),
    ICE_ACTIVE_SOURCE_PAGE: { sourceTitle: "Matthew 9", sourceCaptureBook: "Matthew", sourceCaptureChapter: "9" },
    ICE_SELECTED_RANGE: { sessionLabel: "Matthew 1 -> Matthew 10", pages: chapters.map(page) },
    ICE_CROSS_REFERENCE_SET: chapters.map((chapter) => ({ id: `matthew-${chapter}`, label: `Matthew ${chapter}`, analyzed: true })),
    ICE_ANALYSIS_QUEUE: [{ id: "matthew-10", label: "Matthew 10" }],
    ICE_ORDERED_EVENTS: chapters.map((chapter) => ({ eventId: `matthew-${chapter}-event`, sourceReference: `Matthew ${chapter}:1` })),
    ICE_RELATIONSHIP_GRAPH: chapters.map((chapter) => ({ relationshipId: `matthew-${chapter}-relationship`, sourceReference: `Matthew ${chapter}:1` })),
    ICE_JOURNEY_PAGE_SNAPSHOTS: chapters.map((chapter) => ({ pageKey: page(chapter).pageKey, label: `Matthew ${chapter}` })),
    ICE_SESSION_CONTINUITY_REVIEW: [{ analyzedPages: chapters.map((chapter) => `Matthew ${chapter}`) }],
    ICE_PANEL_UI_STATE: {
      selectedAdapterForNewAnalysis: "lds_scripture_adapter",
      selectedLensForNewAnalysis: "recommended",
      selectedLensesForNewAnalysis: ["recommended"],
      lastAction: "before_clear"
    },
    NON_ICE_SETTING: { preserved: true }
  };
}

const checks = [
  {
    name: "Clear All button is wired to full stored-study removal",
    run: () => {
      assert(/id="clearCurrentStudy"[^>]*>Clear All<\/button>/.test(popupHtml), "Popup Clear All button is missing.");
      assert(/title="Clear all stored I\.C\.E\. study data and analyzed pages"/.test(popupHtml), "Clear All button does not document full stored-study deletion.");
      assert(/bindClick\("clearCurrentStudy", clearAllIceData\)/.test(popupJs), "Clear All button is not bound to clearAllIceData.");
      const bindingBlock = popupJs.match(/bindClick\("clearCurrentStudy"[\s\S]*?\);/);
      assert(bindingBlock && !/clearCrossReferenceSetFromPopup/.test(bindingBlock[0]), "Clear All still uses the cross-reference-only clear path.");
    }
  },
  {
    name: "Stored Matthew-shaped study exists before Clear All",
    run: () => {
      const fixture = matthewStorageFixture();
      const markers = reconstructedChapterMarkers(fixture);
      assert(markers.join(",") === "Matthew 1,Matthew 3,Matthew 5,Matthew 7,Matthew 9", `Fixture lacks multi-chapter stored markers: ${markers.join(", ")}`);
      assert(/Matthew 1 -> Matthew 10/.test(fixture.ICE_SELECTED_RANGE.sessionLabel), "Fixture lacks stored-session Matthew 1 -> Matthew 10 scope.");
      assert(fixture.ICE_CROSS_REFERENCE_SET.length === 5, "Fixture lacks Current Study records.");
      assert(fixture.ICE_ORDERED_EVENTS.length === 5, "Fixture lacks graphable semantic records.");
    }
  },
  {
    name: "Confirmed Clear All removes persisted study records and resets Current Study",
    run: async () => {
      const harness = createClearAllHarness({ storage: matthewStorageFixture(), confirmResult: true });
      const result = await harness.clearAllIceData();
      const storage = harness.getStorage();
      const sessionStorage = harness.getSessionStorage();
      assert(result.canceled === false, "Confirmed Clear All should not report canceled.");
      assert(!storage.ICE_CANONICAL_ANALYZED_PAGES, "Stored canonical analyzed pages were not removed.");
      assert(!storage.ICE_ANALYSIS_HISTORY, "Analysis history was not removed.");
      assert(!storage.ICE_ACTIVE_SOURCE_PAGE, "Active source page was not removed.");
      assert(!storage.ICE_SELECTED_RANGE, "Selected range was not removed.");
      assert(!storage.ICE_CROSS_REFERENCE_SET, "Current Study/cross-reference set was not removed.");
      assert(!storage.ICE_ANALYSIS_QUEUE, "Analysis queue was not removed.");
      assert(!storage.ICE_ORDERED_EVENTS, "Graphable stored semantic records were not removed.");
      assert(!storage.ICE_RELATIONSHIP_GRAPH, "Relationship graph records were not removed.");
      assert(!storage.ICE_JOURNEY_PAGE_SNAPSHOTS, "Journey page snapshots were not removed.");
      assert(!storage.ICE_SESSION_CONTINUITY_REVIEW, "Session continuity records were not removed.");
      assert(Object.keys(sessionStorage).length === 0, "Session storage study data was not removed.");
      assert(storage.NON_ICE_SETTING?.preserved, "Unrelated non-I.C.E. local setting was removed.");
      assert(storage.ICE_PANEL_UI_STATE?.selectedAdapterForNewAnalysis === "lds_scripture_adapter", "Adapter preference was not preserved.");
      assert(storage.ICE_PANEL_UI_STATE?.selectedLensForNewAnalysis === "recommended", "Lens preference was not preserved.");
      assert(storage.ICE_PANEL_UI_STATE?.lastAction === "popup_clear_all_ice_data", "Clear All did not record its last action.");
      assert(harness.getRuntimeMessages().some((message) => message.type === "ICE_CLEAR_ALL_STUDY_DATA"), "Popup did not request background/runtime cache invalidation.");
      assert(reconstructedChapterMarkers(storage).length === 0, "Fresh Study Panel reconstruction still finds Matthew markers after Clear All.");
      assert(harness.getSummariesLoaded() === 1, "Clear All did not refresh popup summaries.");
      assert(harness.getStatus() === "All I.C.E. study data cleared.", "Clear All did not report success.");
    }
  },
  {
    name: "Graph route reaches intentional empty state after clearing",
    run: () => {
      assert(/No graphable records are available for the current study\./.test(studyJs), "Graph empty-state message is missing.");
      assert(/if \(!model\.nodeCount\)\s*\{\s*renderScopeSnapshotEmptyState/.test(studyJs), "Graph route does not use intentional empty state for zero records.");
    }
  },
  {
    name: "Reopening Study Panel cannot restore deleted storage records",
    run: async () => {
      const harness = createClearAllHarness({ storage: matthewStorageFixture(), confirmResult: true });
      await harness.clearAllIceData();
      const reopenedStorage = harness.getStorage();
      const restoredStudyKeys = Object.keys(reopenedStorage).filter((key) => key !== "ICE_PANEL_UI_STATE" && key.startsWith("ICE_"));
      assert(restoredStudyKeys.length === 0, `Deleted records remain after reopen simulation: ${restoredStudyKeys.join(", ")}`);
      assert(reconstructedChapterMarkers(reopenedStorage).length === 0, "Reopened Study Panel would still reconstruct Matthew chapter markers.");
    }
  },
  {
    name: "Background reset and stale pipeline guard are present",
    run: () => {
      assert(/ICE_CLEAR_ALL_STUDY_DATA/.test(backgroundJs), "Background does not receive explicit Clear All reset messages.");
      assert(/clearAllStudyDataGeneration \+= 1/.test(backgroundJs), "Background clear generation is not incremented.");
      assert(/pipelineClearGeneration !== clearAllStudyDataGeneration/.test(backgroundJs), "Pipeline stale-write guard is missing.");
      assert(/staleWritePrevented: true/.test(backgroundJs), "Pipeline stale-write result is not diagnosable.");
      assert(/clearAllGeneration/.test(studyJs), "Study Panel does not observe Clear All generation state.");
      assert(/resetStudyPanelAfterClearAll/.test(studyJs), "Study Panel does not reset in-memory state after Clear All.");
      assert(/loadedDeferredSections\.clear\(\)/.test(studyJs), "Study Panel does not clear loaded deferred section state.");
      assert(/copyRenderSelections = \[\]/.test(studyJs), "Study Panel does not clear session-local Copy Render selections.");
    }
  },
  {
    name: "Fallback Clear All removes known study keys without wildcard sweep",
    run: async () => {
      const fixture = matthewStorageFixture();
      const harness = createClearAllHarness({
        storage: fixture,
        sessionStorage: { ICE_ORDERED_EVENTS: [{ eventId: "session-event" }] },
        confirmResult: true,
        runtimeFailure: true
      });
      const result = await harness.clearAllIceData();
      const storage = harness.getStorage();
      assert(result.backgroundReset === false, "Runtime failure should use local fallback.");
      assert(!/startsWith\("ICE_"\)/.test(extractFunctionSource(popupJs, "clearAllIceData")), "Clear All should not use a broad ICE_ wildcard sweep.");
      assert(!storage.ICE_CANONICAL_ANALYZED_PAGES, "Fallback did not remove canonical pages.");
      assert(!harness.getSessionStorage().ICE_ORDERED_EVENTS, "Fallback did not clear session study keys.");
      assert(storage.NON_ICE_SETTING?.preserved, "Fallback removed unrelated local setting.");
      assert(storage.ICE_PANEL_UI_STATE?.selectedAdapterForNewAnalysis === "lds_scripture_adapter", "Fallback did not preserve adapter preference.");
    }
  },
  {
    name: "Repeated Clear All is idempotent",
    run: async () => {
      const harness = createClearAllHarness({ storage: matthewStorageFixture(), confirmResult: true });
      await harness.clearAllIceData();
      await harness.clearAllIceData();
      const storage = harness.getStorage();
      const remainingStudyKeys = Object.keys(storage).filter((key) => key !== "ICE_PANEL_UI_STATE" && key.startsWith("ICE_"));
      assert(remainingStudyKeys.length === 0, "Repeated Clear All recreated study records.");
      assert(reconstructedChapterMarkers(storage).length === 0, "Repeated Clear All restored chapter markers.");
      assert(harness.getStatus() === "All I.C.E. study data cleared.", "Repeated Clear All did not remain successful.");
    }
  },
  {
    name: "Cancellation leaves records intact",
    run: async () => {
      const harness = createClearAllHarness({ storage: matthewStorageFixture(), confirmResult: false });
      const result = await harness.clearAllIceData();
      const storage = harness.getStorage();
      assert(result.canceled === true, "Canceled Clear All did not report cancellation.");
      assert(storage.ICE_CANONICAL_ANALYZED_PAGES?.length === 5, "Canceled Clear All removed stored analyzed pages.");
      assert(storage.ICE_CROSS_REFERENCE_SET?.length === 5, "Canceled Clear All removed Current Study records.");
      assert(harness.getStatus() === "Clear All canceled.", "Canceled Clear All did not report cancellation.");
    }
  },
  {
    name: "Storage failure does not falsely report success",
    run: async () => {
      const harness = createClearAllHarness({ storage: matthewStorageFixture(), confirmResult: true, removeFailure: true, runtimeFailure: true });
      let failed = false;
      try {
        await harness.clearAllIceData();
      } catch (error) {
        failed = /simulated storage remove failure/.test(error.message);
      }
      assert(failed, "Storage failure did not surface as a controlled error.");
      assert(harness.getStatus() !== "All I.C.E. study data cleared.", "Storage failure falsely reported success.");
    }
  }
];

(async () => {
  const failures = [];
  for (const check of checks) {
    try {
      await check.run();
    } catch (error) {
      failures.push(`${check.name}: ${error.message}`);
    }
  }

  if (failures.length) {
    console.error("FAIL: Clear All storage QA");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log("PASS: Clear All storage QA");
  checks.forEach((check) => console.log(`- ${check.name}`));
})();

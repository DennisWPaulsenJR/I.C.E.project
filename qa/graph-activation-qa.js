const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const studyHtml = fs.readFileSync(path.join(root, "study.html"), "utf8");
const studyJs = fs.readFileSync(path.join(root, "study.js"), "utf8");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function includes(pattern, text = studyJs) {
  return pattern.test(text);
}

function extractFunctionSource(functionName) {
  const start = studyJs.indexOf(`function ${functionName}`);
  assert(start >= 0, `Missing function ${functionName}.`);
  const paramsEnd = studyJs.indexOf(")", start);
  assert(paramsEnd >= 0, `Missing function parameters for ${functionName}.`);
  const bodyStart = studyJs.indexOf("{", paramsEnd);
  assert(bodyStart >= 0, `Missing function body for ${functionName}.`);
  let depth = 0;
  for (let index = bodyStart; index < studyJs.length; index += 1) {
    const char = studyJs[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return studyJs.slice(start, index + 1);
  }
  throw new Error(`Unclosed function body for ${functionName}.`);
}

function sourceScopePredicate() {
  const source = extractFunctionSource("isSourceScopeCurrentStudyRecord");
  return Function(`${source}; return isSourceScopeCurrentStudyRecord;`)();
}

function graphFailureLogger() {
  const source = extractFunctionSource("logScopeSnapshotRendererFailure");
  const harness = `
    const scopeSnapshotViewState = { rendererStage: "qa-stage", rendererInvocationCount: 7 };
    const capturedErrors = [];
    const console = { error: (...args) => capturedErrors.push(args) };
    function scopeSnapshotRouteState() {
      return {
        graphHostConnected: true,
        graphHostWidth: 640,
        graphHostHeight: 360,
        nodeElementCount: 2,
        edgeElementCount: 1
      };
    }
    function scopeSnapshotSourceCollectionCounts() {
      return { fallbackCollection: 3 };
    }
    ${source}
    return { logScopeSnapshotRendererFailure, capturedErrors };
  `;
  return Function(harness)();
}

function makeElement(tagName) {
  return {
    tagName,
    className: "",
    textContent: "",
    disabled: false,
    dataset: {},
    children: [],
    attributes: {},
    classList: { add() {} },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    append(...children) {
      this.children.push(...children);
    }
  };
}

function scopeSnapshotLayerControlsHarness() {
  const source = extractFunctionSource("createScopeSnapshotLayerControls");
  const harness = `
    const created = [];
    const document = {
      createElement(tagName) {
        const element = makeElement(tagName);
        created.push(element);
        return element;
      }
    };
    const scopeSnapshotViewState = { layerPreset: "recommended" };
    const SCOPE_SNAPSHOT_LAYER_PRESETS = {
      recommended: { label: "Recommended" },
      all: { label: "All Layers" },
      custom: { label: "Custom" }
    };
    function asArray(value) {
      return Array.isArray(value) ? value : [];
    }
    ${source}
    return { createScopeSnapshotLayerControls, created };
  `;
  return Function("makeElement", harness)(makeElement);
}

const checks = [
  {
    name: "Graph button has stable activation hook",
    run: () => {
      assert(/id="openScopeSnapshot"/.test(studyHtml), "Missing openScopeSnapshot button id.");
      assert(/data-open-scope-snapshot="true"/.test(studyHtml), "Missing delegated graph activation data hook.");
      assert(/aria-label="Open Linear Scope Snapshot graph"/.test(studyHtml), "Missing explicit Graph aria label.");
    }
  },
  {
    name: "Delegated mouse activation is registered",
    run: () => {
      assert(includes(/event\.target\.closest\("button\[data-open-scope-snapshot\], #openScopeSnapshot"\)/), "Missing delegated Graph button selector.");
      assert(includes(/openScopeSnapshotPanel\(event\)/), "Graph click path does not invoke openScopeSnapshotPanel(event).");
    }
  },
  {
    name: "Keyboard activation is registered",
    run: () => {
      assert(includes(/function handleOpenScopeSnapshotKeydown\(event\)/), "Missing Graph keydown handler.");
      assert(includes(/event\.key !== "Enter" && event\.key !== " "/), "Graph keydown handler does not guard Enter/Space.");
      assert(includes(/getElementById\("openScopeSnapshot"\)\?\.addEventListener\("keydown", handleOpenScopeSnapshotKeydown\)/), "Graph keydown listener is not registered.");
    }
  },
  {
    name: "Activation renders Snapshot directly",
    run: () => {
      const fn = studyJs.match(/async function openScopeSnapshotPanel[\s\S]*?\n  function handleOpenScopeSnapshotKeydown/);
      assert(fn, "openScopeSnapshotPanel function block was not found.");
      assert(/activateScopeSnapshotPresentationRoute\("openScopeSnapshotPanel:start"\)/.test(fn[0]), "Graph activation does not enter the graph presentation route before loading data.");
      assert(/await ensureFullStudyDataLoaded\(\)/.test(fn[0]), "Graph activation does not ensure full study data.");
      assert(/activateScopeSnapshotPresentationRoute\("openScopeSnapshotPanel:afterDataLoad"\)/.test(fn[0]), "Graph activation does not re-apply the graph route after data load.");
      assert(/safeRenderSection\("Linear Scope Snapshot", renderScopeSnapshot, currentSearchTerm\(\)\)/.test(fn[0]), "Graph activation does not directly render the Snapshot.");
      assert(!/loadDeferredSection\("Linear Scope Snapshot"\)/.test(fn[0]), "Graph activation still depends on the deferred wrapper.");
    }
  },
  {
    name: "Graph route makes diagnostics inactive",
    run: () => {
      const fn = studyJs.match(/function activateScopeSnapshotPresentationRoute[\s\S]*?\n  function scopeSnapshotScrollIntoView/);
      assert(fn, "activateScopeSnapshotPresentationRoute function block was not found.");
      assert(/selectedPresentationModules = new Set\(\["overview", "snapshot"\]\)/.test(fn[0]), "Graph route does not select a graph-only presentation module set.");
      assert(/updatePresentationModuleControls\(\)/.test(fn[0]), "Graph route does not synchronize presentation controls.");
      assert(/diagnostics\.hidden = true/.test(fn[0]), "Graph route does not hide diagnostics.");
      assert(/section\.hidden = false/.test(fn[0]), "Graph route does not unhide the Snapshot section.");
      assert(/section\.dataset\.graphRouteState = "active"/.test(fn[0]), "Graph route does not mark Snapshot as active.");
      assert(/diagnostics\.dataset\.graphRouteState = "inactive"/.test(fn[0]), "Graph route does not mark diagnostics inactive.");
    }
  },
  {
    name: "Graph route diagnostics observe live host",
    run: () => {
      assert(includes(/function scopeSnapshotRouteState/), "Missing graph route state diagnostics.");
      assert(includes(/graphHostConnected/), "Graph route diagnostics do not report host connection.");
      assert(includes(/graphHostWidth/), "Graph route diagnostics do not report host width.");
      assert(includes(/graphHostHeight/), "Graph route diagnostics do not report host height.");
      assert(includes(/nodeElementCount/), "Graph route diagnostics do not report rendered node elements.");
      assert(includes(/rendererInvocationCount/), "Graph route diagnostics do not count renderer invocations.");
      assert(includes(/recordScopeSnapshotRouteDiagnostic\("renderScopeSnapshot:mounted"/), "Mounted graph render is not route-diagnosed.");
    }
  },
  {
    name: "Source-scope predicate is executable and globally visible",
    run: () => {
      const firstPredicateIndex = studyJs.indexOf("function isSourceScopeCurrentStudyRecord");
      const domReadyIndex = studyJs.indexOf("document.addEventListener(\"DOMContentLoaded\"");
      assert(firstPredicateIndex >= 0, "Missing isSourceScopeCurrentStudyRecord definition.");
      assert(firstPredicateIndex < domReadyIndex, "Source-scope predicate must be defined before the DOMContentLoaded closure.");
      assert((studyJs.match(/function isSourceScopeCurrentStudyRecord/g) || []).length === 1, "Source-scope predicate should have one canonical definition.");
      const predicate = sourceScopePredicate();
      assert(typeof predicate === "function", "Source-scope predicate is not callable.");
      ["url_source", "source_unit", "range_request", "volume_scope_request"].forEach((itemType) => {
        assert(predicate({ itemType }), `${itemType} should be recognized as a source-scope Current Study record.`);
      });
      assert(!predicate({ itemType: "manual_selection" }), "Manual selections should not be treated as source-scope records.");
      assert(!predicate({ itemType: "chapter_page" }), "Unrelated page records should not be treated as source-scope records.");
    }
  },
  {
    name: "Source-scope predicate is used by startup and graph paths",
    run: () => {
      const renderStudyScope = studyJs.match(/function createStudyScopeCard[\s\S]*?\n  function renderVolumeContext/);
      const renderQueueSummary = studyJs.match(/function renderQueueSummary[\s\S]*?\n  function handleVolumeContextAction/);
      const currentStudyRecords = studyJs.match(/function crossReferenceSetRecords[\s\S]*?\n  function crossReferenceSetPages/);
      const sourceCounts = studyJs.match(/function scopeSnapshotSourceCollectionCounts[\s\S]*?\n  function scopeSnapshotSharedEventRecords/);
      assert(renderStudyScope, "Study Scope renderer block was not found.");
      assert(renderQueueSummary, "Queue Summary renderer block was not found.");
      assert(currentStudyRecords, "Current Study/source-scope record block was not found.");
      assert(sourceCounts, "Snapshot source-count block was not found.");
      assert(/crossReferenceSetRecords\(\)/.test(renderStudyScope[0]), "Study Scope renderer does not use Current Study records.");
      assert(/crossReferenceSetLine\(\)/.test(renderQueueSummary[0]), "Queue Summary renderer does not use the Current Study status line.");
      assert(/isSourceScopeCurrentStudyRecord\(record\)/.test(currentStudyRecords[0]), "Current Study normalization does not call source-scope predicate.");
      assert(/isSourceScopeCurrentStudyRecord\(record\)/.test(sourceCounts[0]), "Snapshot source-count path does not call source-scope predicate.");
    }
  },
  {
    name: "Renderer error summary uses a defined local object",
    run: () => {
      const fn = studyJs.match(/function recordScopeSnapshotRendererError[\s\S]*?\n  function logScopeSnapshotRendererFailure/);
      assert(fn, "recordScopeSnapshotRendererError function block was not found.");
      assert(/const rendererErrorSummary = \{/.test(fn[0]), "Renderer error summary object is not explicitly named.");
      assert(/lastRendererError = rendererErrorSummary/.test(fn[0]), "Renderer error state does not use the named summary object.");
      assert(/return rendererErrorSummary/.test(fn[0]), "Renderer error function does not return the named summary object.");
      assert(!/\bsummary\b/.test(fn[0]), "Renderer error path still contains a bare summary reference.");
    }
  },
  {
    name: "Graph failure logger is defensive and executable",
    run: () => {
      const fn = studyJs.match(/function logScopeSnapshotRendererFailure[\s\S]*?\n  function activateScopeSnapshotPresentationRoute/);
      assert(fn, "logScopeSnapshotRendererFailure function block was not found.");
      assert(/const rendererErrorSummary =/.test(fn[0]), "Graph failure logger does not normalize details into rendererErrorSummary.");
      assert(!/(^|[^\w$.])errorSummary\b/.test(fn[0]), "Graph failure logger still references an unbound errorSummary identifier.");
      assert(!/\bsummary\b/.test(fn[0]), "Graph failure logger still references a bare summary identifier.");
      const { logScopeSnapshotRendererFailure, capturedErrors } = graphFailureLogger();
      const cases = [
        [
          new Error("complete"),
          {
            stage: "projection",
            name: "TypeError",
            message: "complete details",
            stack: "stack",
            routeState: {
              graphHostConnected: false,
              graphHostWidth: 10,
              graphHostHeight: 20,
              nodeElementCount: 4,
              edgeElementCount: 5
            },
            sourceCollections: { completeCollection: 9 }
          }
        ],
        [new Error("undefined details"), undefined],
        [new Error("malformed source collections"), { sourceCollections: null, routeState: null }],
        [undefined, { sourceCollections: "bad-shape", routeState: { graphHostWidth: 4 } }],
        [new Error("real instance"), { rendererErrorSummary: { sourceCollections: { nestedDetails: 2 } } }]
      ];
      cases.forEach(([error, details]) => {
        logScopeSnapshotRendererFailure(error, details);
      });
      assert(capturedErrors.length === cases.length, "Graph failure logger did not emit one diagnostic for each case.");
      capturedErrors.forEach((entry, index) => {
        assert(entry[0] === "[I.C.E. Graph Render Failure]", `Diagnostic ${index + 1} used an unexpected label.`);
        assert(entry.length === 3, `Diagnostic ${index + 1} should preserve the original Error as the second console argument after the object.`);
        assert(entry[1] && typeof entry[1] === "object", `Diagnostic ${index + 1} did not emit a structured object.`);
        assert(Object.prototype.hasOwnProperty.call(entry[1], "stage"), `Diagnostic ${index + 1} is missing stage.`);
      });
    }
  },
  {
    name: "Layer controls render from explicit model data",
    run: () => {
      const fn = studyJs.match(/function createScopeSnapshotLayerControls[\s\S]*?\n  function createCopyRenderPanel/);
      assert(fn, "createScopeSnapshotLayerControls function block was not found.");
      assert(/function createScopeSnapshotLayerControls\(model = \{\}\)/.test(fn[0]), "Layer controls should receive the Snapshot projection model explicitly.");
      assert(/const layerStatus = document\.createElement\("p"\)/.test(fn[0]), "Layer controls do not create a local layer status element.");
      assert(/panel\.append\(layerStatus, presetRow, layerGroups, note\)/.test(fn[0]), "Layer controls still append the wrong header binding.");
      assert(!/(^|[^\w$."'-])summary\b/.test(fn[0]), "Layer controls still reference an undeclared bare summary identifier.");
      const caller = studyJs.match(/function createScopeSnapshotCard[\s\S]*?\n  function renderScopeSnapshot/);
      assert(caller, "createScopeSnapshotCard function block was not found.");
      assert(/createScopeSnapshotLayerControls\(model\)/.test(caller[0]), "Snapshot card does not pass the projection model into layer controls.");

      const { createScopeSnapshotLayerControls } = scopeSnapshotLayerControlsHarness();
      const normalPanel = createScopeSnapshotLayerControls({
        hiddenLayerNodes: 4,
        layerModel: {
          activeLayerIds: ["characters", "events"],
          recommendedLayerIds: ["characters"],
          availability: [
            { id: "characters", group: "Core", label: "Characters", available: true, recommendationReason: "range relevant", unresolvedCount: 0 },
            { id: "events", group: "Core", label: "Events", available: true, recommendationReason: "range relevant", unresolvedCount: 1 },
            { id: "technical", group: "Debug", label: "Technical", available: false, dependencyUnavailable: true, recommendationReason: "not loaded", unresolvedCount: 0 }
          ]
        }
      });
      assert(normalPanel.tagName === "section", "Layer controls did not return a section.");
      assert(normalPanel.children.length === 4, "Layer controls should render status, presets, groups, and note.");
      assert(/Layers: 2 active/.test(normalPanel.children[0].textContent), "Layer status does not reflect active layer count.");

      const emptyPanel = createScopeSnapshotLayerControls({});
      assert(emptyPanel.children.length === 4, "Empty layer controls should still render safely.");
      assert(/available 0/.test(emptyPanel.children[0].textContent), "Empty layer controls did not degrade safely.");
    }
  },
  {
    name: "Empty graph state is explicit",
    run: () => {
      assert(includes(/No graphable records are available for the current study\./), "Missing required empty graph message.");
      assert(includes(/function renderScopeSnapshotEmptyState/), "Missing graph empty-state renderer.");
      assert(includes(/if \(!model\.nodeCount\)/), "renderScopeSnapshot does not route zero graphable records to empty state.");
    }
  },
  {
    name: "Renderer failure is visible",
    run: () => {
      assert(includes(/function renderScopeSnapshotFailure/), "Missing graph failure renderer.");
      assert(includes(/Graph could not be displayed\./), "Missing visible graph failure message.");
      assert(includes(/catch \(error\) \{\s*renderScopeSnapshotFailure\(error, "openScopeSnapshotPanel"\);/), "Graph activation lacks a narrow error boundary.");
      assert(includes(/catch \(error\) \{\s*renderScopeSnapshotFailure\(error, `renderScopeSnapshot:\$\{scopeSnapshotViewState\.rendererStage \|\| "unknown"\}`\);/), "Graph render lacks a stage-aware narrow error boundary.");
      assert(includes(/recordScopeSnapshotRendererError\(error, context\)/), "Graph failure does not capture renderer-stage diagnostics.");
      assert(includes(/\[I\.C\.E\. Graph Render Failure\]/), "Graph failure does not emit the exact structured console diagnostic label.");
      assert(includes(/console\.error\("\[I\.C\.E\. Graph Render Failure\]", \{/), "Graph failure diagnostic is not structured as the first console argument.");
      assert(includes(/\}, error\);/), "Graph failure diagnostic does not preserve the original Error object as a second console argument.");
    }
  },
  {
    name: "Projection normalization degrades safely",
    run: () => {
      assert(includes(/function scopeSnapshotSafeRecord/), "Missing safe presentation record normalization.");
      assert(includes(/display_normalized/), "Malformed display records are not marked as normalized.");
      assert(includes(/function scopeSnapshotRecordProjectionDiagnostic/), "Missing projection skip diagnostics.");
      assert(includes(/scopeSnapshotSafeRecord\(record, fallback, sourceCollection\)/), "Node projection does not normalize records before reading optional fields.");
      assert(includes(/status: "skipped"/), "Malformed projection records are not diagnosable as skipped.");
      assert(includes(/baseId = normalizeText\(baseId\) \|\| `snapshot-node-\$\{nodes\.length \+ 1\}`/), "Missing fallback stable presentation key.");
    }
  },
  {
    name: "Renderer stages are observable",
    run: () => {
      assert(includes(/function recordScopeSnapshotRendererStage/), "Missing renderer stage diagnostics.");
      [
        "full-study-load",
        "source-resolution",
        "projection",
        "normalization",
        "host-resolution",
        "layout",
        "svg-create",
        "node-render",
        "edge-render",
        "focus-init",
        "post-render"
      ].forEach((stage) => {
        assert(studyJs.includes(`"${stage}"`), `Missing renderer stage: ${stage}.`);
      });
      assert(includes(/scopeSnapshotSourceCollectionCounts/), "Missing source collection counts.");
    }
  },
  {
    name: "Repeated activation avoids duplicate click listeners",
    run: () => {
      const directClickCount = (studyJs.match(/getElementById\("openScopeSnapshot"\)\?\.addEventListener\("click"/g) || []).length;
      assert(directClickCount === 0, "Direct Graph click listener should not duplicate delegated activation.");
      const delegatedClickCount = (studyJs.match(/button\[data-open-scope-snapshot\], #openScopeSnapshot/g) || []).length;
      assert(delegatedClickCount === 1, "Graph delegated activation selector should be registered once.");
    }
  },
  {
    name: "Semantic boundary preserved",
    run: () => {
      const changedRegion = [
        "openScopeSnapshotPanel",
        "activateScopeSnapshotPresentationRoute",
        "scopeSnapshotRouteState",
        "renderScopeSnapshotEmptyState",
        "renderScopeSnapshotFailure",
        "handleOpenScopeSnapshotKeydown"
      ].every((token) => studyJs.includes(token));
      assert(changedRegion, "Expected presentation-only graph repair functions are missing.");
      assert(!/chrome\.storage\.local\.set\([^)]*scopeSnapshot/i.test(studyJs), "Snapshot graph repair appears to add storage writes.");
    }
  }
];

const failures = [];
checks.forEach((check) => {
  try {
    check.run();
  } catch (error) {
    failures.push(`${check.name}: ${error.message}`);
  }
});

if (failures.length) {
  console.error("FAIL: Graph activation QA");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS: Graph activation QA");
checks.forEach((check) => console.log(`- ${check.name}`));

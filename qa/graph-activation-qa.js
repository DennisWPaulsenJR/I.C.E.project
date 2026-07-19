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
      assert(/await ensureFullStudyDataLoaded\(\)/.test(fn[0]), "Graph activation does not ensure full study data.");
      assert(/safeRenderSection\("Linear Scope Snapshot", renderScopeSnapshot, currentSearchTerm\(\)\)/.test(fn[0]), "Graph activation does not directly render the Snapshot.");
      assert(!/loadDeferredSection\("Linear Scope Snapshot"\)/.test(fn[0]), "Graph activation still depends on the deferred wrapper.");
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
      assert(includes(/catch \(error\) \{\s*renderScopeSnapshotFailure\(error, "renderScopeSnapshot"\);/), "Graph render lacks a narrow error boundary.");
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

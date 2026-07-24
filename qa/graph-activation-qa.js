const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const studyHtml = fs.readFileSync(path.join(root, "study.html"), "utf8");
const studyJs = fs.readFileSync(path.join(root, "study.js"), "utf8");
const backgroundJs = fs.readFileSync(path.join(root, "background.js"), "utf8");

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

function unresolvedPresentationHarness() {
  const source = extractFunctionSource("scopeSnapshotUnresolvedPresentationRecords");
  const harness = `
    function toDisplayText(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      if (Array.isArray(value)) return value.map(toDisplayText).filter(Boolean).join(", ");
      if (value && typeof value === "object") {
        for (const key of ["label", "name", "title", "displayName", "canonicalName", "id"]) {
          if (value[key] != null) return toDisplayText(value[key]);
        }
        return JSON.stringify(value);
      }
      return String(value);
    }
    function normalizeText(text) {
      return toDisplayText(text).replace(/\\s+/g, " ").trim();
    }
    function asArray(value) {
      return Array.isArray(value) ? value : value == null ? [] : [value];
    }
    function scopeSnapshotHash(value = "") {
      const text = normalizeText(value);
      let hash = 0;
      for (let index = 0; index < text.length; index += 1) {
        hash = ((hash << 5) - hash) + text.charCodeAt(index);
        hash |= 0;
      }
      return Math.abs(hash).toString(36);
    }
    function currentStudyScopeLabel() {
      return "Matthew 7";
    }
    ${source}
    return { scopeSnapshotUnresolvedPresentationRecords };
  `;
  return Function(harness)();
}

function scopeSnapshotAxisHarness(options = {}) {
  const axisSource = extractFunctionSource("scopeSnapshotAxisBounds");
  const requestedSource = extractFunctionSource("scopeSnapshotRequestedBounds");
  const boundarySource = extractFunctionSource("scopeSnapshotBoundaryDifference");
  const harness = `
    const requestedPages = pages;
    const activePage = active;
    function toDisplayText(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return String(value);
    }
    function normalizeText(text) {
      return toDisplayText(text).replace(/\\s+/g, " ").trim();
    }
    function asArray(value) {
      return Array.isArray(value) ? value : value == null ? [] : [value];
    }
    function sourceVerseBookTitle(value = "") {
      return normalizeText(value).replace(/\\b\\w/g, (char) => char.toUpperCase());
    }
    function scopeSnapshotScopePages() {
      return requestedPages;
    }
    function activeSourcePageRecord() {
      return activePage;
    }
    function scopeSnapshotCurrentModeLabel() {
      return modeLabel;
    }
    ${axisSource}
    ${requestedSource}
    ${boundarySource}
    return { scopeSnapshotAxisBounds, scopeSnapshotRequestedBounds, scopeSnapshotBoundaryDifference };
  `;
  return Function("pages", "active", "modeLabel", harness)(
    options.pages || [],
    options.active || null,
    options.modeLabel || "Selected Scope"
  );
}

function scopeSnapshotReferenceHarness(options = {}) {
  const sources = [
    "sourceVerseBookTitle",
    "recognizedSourceVerseBook",
    "recognizedSourceVerseBookTitle",
    "sourceVerseNumbers",
    "sourceVersePartsFromText",
    "sourceVerseLabel",
    "scopeSnapshotSafeRecord",
    "scopeSnapshotRawReferenceFields",
    "scopeSnapshotReferenceDiagnostics",
    "scopeSnapshotRecordReference"
  ].map(extractFunctionSource).join("\n");
  const harness = `
    const activePage = active;
    function toDisplayText(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      if (Array.isArray(value)) return value.map(toDisplayText).filter(Boolean).join(", ");
      return String(value);
    }
    function normalizeText(text) {
      return toDisplayText(text).replace(/\\s+/g, " ").trim();
    }
    function asArray(value) {
      return Array.isArray(value) ? value : value == null ? [] : [value];
    }
    function recordStudyGeneration(record = {}) {
      return Number(record.studyGeneration || record.clearAllGeneration || 0);
    }
    function resolveSourceVerseReference() {
      return null;
    }
    function activeSourcePageRecord() {
      return activePage;
    }
    ${sources}
    return { scopeSnapshotRecordReference, scopeSnapshotReferenceDiagnostics };
  `;
  return Function("active", harness)(options.active || null);
}

function normalizeLoadedStudyDataHarness() {
  const source = extractFunctionSource("normalizeLoadedStudyData");
  const harness = `
    const STORAGE_KEYS = {
      orderedEvents: "ICE_ORDERED_EVENTS",
      relationshipGraph: "ICE_RELATIONSHIP_GRAPH",
      teachingSemantics: "ICE_TEACHING_SEMANTICS",
      principleRelationships: "ICE_PRINCIPLE_RELATIONSHIPS",
      principleNetworks: "ICE_PRINCIPLE_NETWORKS",
      principleItems: "ICE_PRINCIPLE_ITEMS",
      analysisHistory: "ICE_ANALYSIS_HISTORY",
      canonicalAnalyzedPages: "ICE_CANONICAL_ANALYZED_PAGES",
      journeyPageSnapshots: "ICE_JOURNEY_PAGE_SNAPSHOTS",
      crossReferenceSet: "ICE_CROSS_REFERENCE_SET",
      crossReferenceRelationships: "ICE_CROSS_REFERENCE_RELATIONSHIPS"
    };
    function asArray(value) {
      return Array.isArray(value) ? value : value == null ? [] : [value];
    }
    function normalizeStudyGeneration(value) {
      const number = Number(value || 0);
      return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
    }
    function activeStudyGenerationFromData(data = {}) {
      return normalizeStudyGeneration(data.ICE_STUDY_GENERATION || data.studyGeneration || data.analysisStatus?.studyGeneration);
    }
    function recordStudyGeneration(record = {}) {
      return normalizeStudyGeneration(record.studyGeneration ?? record.clearAllGeneration);
    }
    function recordMatchesStudyGeneration(record = {}, generation = activeStudyGenerationFromData()) {
      const recordGeneration = recordStudyGeneration(record);
      if (generation <= 0) return recordGeneration === 0;
      return recordGeneration === generation;
    }
    function filterRecordsForStudyGeneration(records = [], generation = activeStudyGenerationFromData(), sourceKey = "unknown") {
      return asArray(records).filter((record) => recordMatchesStudyGeneration(record, generation));
    }
    ${source}
    return { normalizeLoadedStudyData };
  `;
  return Function(harness)();
}

function scopeSnapshotEventContextHarness() {
  const sources = [
    "scopeSnapshotRawField",
    "scopeSnapshotExistingContextValue",
    "scopeSnapshotRecordedParticipants",
    "scopeSnapshotRecordedActionPhrase",
    "scopeSnapshotSequenceContextLines",
    "scopeSnapshotNarrativeEventContext",
    "scopeSnapshotDetailSummaryText"
  ].map(extractFunctionSource).join("\n");
  const harness = `
    function toDisplayText(value) {
      if (value == null) return "";
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") return String(value);
      if (Array.isArray(value)) return value.map(toDisplayText).filter(Boolean).join(", ");
      if (value && typeof value === "object") {
        for (const key of ["label", "name", "title", "displayName", "canonicalName", "id"]) {
          if (value[key] != null) return toDisplayText(value[key]);
        }
        return JSON.stringify(value);
      }
      return String(value);
    }
    function normalizeText(text) {
      return toDisplayText(text).replace(/\\s+/g, " ").trim();
    }
    function asArray(value) {
      return Array.isArray(value) ? value : value == null ? [] : [value];
    }
    function trimText(value = "", limit = 120) {
      const text = normalizeText(value);
      return text.length > limit ? text.slice(0, limit - 1).trimEnd() + "…" : text;
    }
    function uniqueStudyList(values = []) {
      return Array.from(new Set(asArray(values).flat(Infinity).map(normalizeText).filter(Boolean)));
    }
    ${sources}
    return { scopeSnapshotNarrativeEventContext, scopeSnapshotDetailSummaryText };
  `;
  return Function(harness)();
}

const checks = [
  {
    name: "Unresolved graph records are distinguishable and deduped conservatively",
    run: () => {
      const fn = extractFunctionSource("scopeSnapshotUnresolvedPresentationRecords");
      assert(/Scope Snapshot presentation-only unresolved deduplication/.test(fn), "Unresolved dedupe must be presentation-only.");
      assert(!/resolvedEntity\s*:/.test(fn), "Unresolved presentation helper must not synthesize resolved referents.");
      assert(/candidateEntities/.test(fn), "Unresolved presentation helper should preserve candidate metadata.");
      assert(/rejectedCandidates/.test(fn), "Unresolved presentation helper should preserve rejection metadata.");
      assert(/sourceUnavailable/.test(fn), "Unresolved presentation helper should expose source-unavailable state.");
      const caller = studyJs.match(/function scopeSnapshotSourceNodes[\s\S]*?\n  function scopeSnapshotSourceCollectionCounts/);
      assert(caller, "scopeSnapshotSourceNodes function block was not found.");
      assert(/scopeSnapshotUnresolvedPresentationRecords\(\[/.test(caller[0]), "Unresolved lane does not use the presentation dedupe helper.");

      const { scopeSnapshotUnresolvedPresentationRecords } = unresolvedPresentationHarness();
      const fixture = [
        {
          pronoun: "he",
          tokenId: "language.0.12",
          sourceReference: "Matthew 7:1",
          status: "unresolved",
          resolutionType: "unresolved",
          evidence: "No grounded candidate found.",
          rejectedCandidates: [{ value: "", reason: "empty candidate" }],
          provenance: "I.C.E. conservative pronoun resolution v2 preview"
        },
        {
          pronoun: "they",
          tokenId: "language.0.18",
          sourceReference: "Matthew 7:2",
          status: "unresolved",
          resolutionType: "unresolved",
          evidence: "No grounded candidate found.",
          rejectedCandidates: [{ value: "crowd", reason: "candidate does not match plural pronoun constraints" }],
          provenance: "I.C.E. conservative pronoun resolution v2 preview"
        },
        {
          sourceReference: "Matthew 7",
          status: "unresolved",
          resolutionType: "unresolved",
          evidence: "No candidate survived conservative pronoun resolution rules; rejected=blank (empty candidate).",
          rejectedCandidates: [{ value: "", reason: "empty candidate" }],
          provenance: "I.C.E. conservative pronoun resolution v2 preview"
        },
        {
          sourceReference: "Matthew 7",
          status: "unresolved",
          resolutionType: "unresolved",
          evidence: "No candidate survived conservative pronoun resolution rules; rejected=blank (empty candidate).",
          rejectedCandidates: [{ value: "", reason: "empty candidate" }],
          provenance: "I.C.E. conservative pronoun resolution v2 preview"
        },
        {
          sourceReference: "Matthew 7",
          status: "unresolved",
          resolutionType: "unresolved",
          evidence: "No candidate survived conservative pronoun resolution rules; rejected=blank (empty candidate).",
          rejectedCandidates: [{ value: "", reason: "empty candidate" }],
          provenance: "I.C.E. conservative pronoun resolution v2 preview"
        }
      ];
      const records = scopeSnapshotUnresolvedPresentationRecords(fixture);
      assert(records.length === 3, "Duplicate blank unresolved placeholders should collapse into one presentation record.");
      assert(records.some((record) => /"he" unresolved pronoun/.test(record.label)), "Distinct unresolved pronoun token 'he' should remain distinguishable.");
      assert(records.some((record) => /"they" unresolved pronoun/.test(record.label)), "Distinct unresolved pronoun token 'they' should remain distinguishable.");
      const grouped = records.find((record) => /source-unavailable unresolved pronoun \(3\)/.test(record.label));
      assert(grouped, "Blank source-unavailable placeholders should be grouped with a visible count.");
      assert(grouped.diagnosticRecordCount === 3, "Grouped unresolved placeholder count should be preserved.");
      assert(/Source text unavailable/.test(grouped.evidence), "Source-unavailable state should be visible in evidence.");
      assert(/empty candidate/.test(grouped.evidence), "Rejection reasons should remain visible.");
      assert(/presentation-only unresolved deduplication/.test(grouped.provenance), "Presentation dedupe provenance should be preserved.");
      assert(records.every((record) => record.status === "unresolved"), "Unresolved records must remain unresolved.");
      assert(records.every((record) => !record.resolvedEntity), "No unresolved graph record should infer a referent.");
      const secondPass = scopeSnapshotUnresolvedPresentationRecords(fixture);
      assert(secondPass.map((record) => record.graphPresentationKey).join("|") === records.map((record) => record.graphPresentationKey).join("|"), "Unresolved presentation keys should be stable across repeated projection.");
    }
  },
  {
    name: "Generic Event 1 ordinals never become Matthew 1 coordinates",
    run: () => {
      const { scopeSnapshotRecordReference, scopeSnapshotReferenceDiagnostics } = scopeSnapshotReferenceHarness({
        active: { book: "Matthew", chapter: "3", sourceCaptureBook: "Matthew", sourceCaptureChapter: "3" }
      });
      const genericOrdinal = {
        principleId: "principle-preview-explicit-prophetic-principle",
        principleName: "Explicit prophetic principle",
        sourceReference: "Event 1",
        sourceScope: "Event 1",
        supportingEvents: ["Event 1"],
        eventId: "event-1",
        eventIndex: 1,
        sequence: 1,
        studyGeneration: 4
      };
      const reference = scopeSnapshotRecordReference(genericOrdinal);
      const diagnostics = scopeSnapshotReferenceDiagnostics(genericOrdinal, reference, "principleExtractionRecords");
      assert(reference === null, `Generic Event 1 should be unpositioned, got ${JSON.stringify(reference)}.`);
      assert(diagnostics.normalizedReference.includes("Event 1"), "Diagnostics should preserve the raw Event 1 ordinal.");
      assert(diagnostics.positioningReference === "", "Diagnostics should not invent a positioning reference for Event 1.");

      const matthewThreePrinciple = {
        ...genericOrdinal,
        sourceReference: "Matthew 3",
        sourceScope: "Matthew 3",
        supportingEvents: ["Event 1"],
        studyGeneration: 5
      };
      const matthewThreeReference = scopeSnapshotRecordReference(matthewThreePrinciple);
      assert(matthewThreeReference?.book === "Matthew" && matthewThreeReference.chapter === 3, `Matthew 3 scoped Event 1 principle should position at Matthew 3, got ${JSON.stringify(matthewThreeReference)}.`);

      const genuineMatthewOne = scopeSnapshotRecordReference({ sourceReference: "Matthew 1:1", label: "Real Matthew 1 record" });
      assert(genuineMatthewOne?.book === "Matthew" && genuineMatthewOne.chapter === 1, "A genuine Matthew 1 reference should still render at Matthew 1.");
    }
  },
  {
    name: "Old-generation principle and relationship feeds are rejected on load",
    run: () => {
      const { normalizeLoadedStudyData } = normalizeLoadedStudyDataHarness();
      const data = normalizeLoadedStudyData({
        ICE_STUDY_GENERATION: 7,
        analysisStatus: { studyGeneration: 7 },
        activeSourcePage: { sourceCaptureBook: "Matthew", sourceCaptureChapter: "3", studyGeneration: 7 },
        canonicalAnalyzedPages: [{ sourceCaptureBook: "Matthew", sourceCaptureChapter: "3", studyGeneration: 7 }],
        principleRelationships: [
          { principle: "stale prophetic principle", sourceReference: "Matthew 1", studyGeneration: 6 },
          { principle: "current prophetic principle", sourceReference: "Matthew 3", studyGeneration: 7 }
        ],
        principleNetworks: [
          { corePrinciple: "stale relationship-supported principle", verseRange: "Matthew 1", studyGeneration: 6 },
          { corePrinciple: "current relationship-supported principle", verseRange: "Matthew 3", studyGeneration: 7 }
        ],
        teachingSemantics: [
          { teachingTopic: "current teaching", sourceReference: "Matthew 3", studyGeneration: 7 }
        ],
        relationshipGraph: [
          { relationshipId: "old-rel", sourceReference: "Matthew 1", studyGeneration: 6 },
          { relationshipId: "current-rel", sourceReference: "Matthew 3", studyGeneration: 7 }
        ],
        orderedEvents: [
          { eventId: "old-event-1", sourceReference: "Matthew 1", studyGeneration: 6 },
          { eventId: "current-event-1", sourceReference: "Matthew 3", studyGeneration: 7 }
        ]
      });
      assert(data.principleRelationships.length === 1 && data.principleRelationships[0].sourceReference === "Matthew 3", "Old-generation principle relationships should be filtered.");
      assert(data.principleNetworks.length === 1 && data.principleNetworks[0].verseRange === "Matthew 3", "Old-generation principle networks should be filtered.");
      assert(data.relationshipGraph.length === 1 && data.relationshipGraph[0].relationshipId === "current-rel", "Old-generation relationship graph records should be filtered.");
      assert(data.orderedEvents.length === 1 && data.orderedEvents[0].eventId === "current-event-1", "Old-generation ordered events should be filtered.");
    }
  },
  {
    name: "Generated principle and relationship feeds are generation-stamped at write time",
    run: () => {
      assert(/function withStudyGenerationRecords/.test(backgroundJs), "Background writer is missing the array study-generation stamping helper.");
      [
        "ORDERED_EVENTS_KEY",
        "RELATIONSHIP_GRAPH_KEY",
        "TEACHING_SEMANTICS_KEY",
        "PRINCIPLE_RELATIONSHIPS_KEY",
        "PRINCIPLE_NETWORKS_KEY",
        "PRINCIPLE_STORAGE_KEY"
      ].forEach((key) => {
        const pattern = new RegExp(`\\[${key}\\]: withStudyGenerationRecords\\(`);
        assert(pattern.test(backgroundJs), `${key} is not generation-stamped before storage.`);
      });
    }
  },
  {
    name: "Focused narrative event card uses existing event context",
    run: () => {
      assert(/scopeSnapshotNarrativeEventContext/.test(studyJs), "Missing Snapshot narrative event context helper.");
      assert(/scope-snapshot-event-context/.test(studyJs), "Focused Snapshot detail card does not render event context.");
      assert(/Presentation Type/.test(studyJs), "Focused card should keep technical presentation type separately visible.");
      const { scopeSnapshotNarrativeEventContext, scopeSnapshotDetailSummaryText } = scopeSnapshotEventContextHarness();
      const selected = {
        recordType: "orderedEvent",
        semanticCategory: "Event",
        presentationType: "narrative_event",
        confidence: "explicit",
        status: "resolved",
        provenance: "I.C.E. ordered event source sequence",
        primaryReference: "Matthew 3:1",
        reference: { label: "Matthew 3:1" },
        sourceText: "In those days came John the Baptist, preaching in the wilderness of Judaea,",
        record: {
          id: "event-matthew-3-1",
          eventType: "narrative_event",
          eventDisplayLabel: "Narrative Event",
          eventClassification: "Narrative Event",
          eventText: "In those days came John the Baptist, preaching in the wilderness of Judaea,",
          sequenceOrder: 1,
          orderingReason: "source sequence 1",
          verseRef: "3:1",
          sourceContext: { book: "Matthew", chapter: "3" },
          subEvents: [
            { actor: "John", action: "preaching", target: "people", participants: ["John", "people", "wilderness of Judaea"] }
          ]
        }
      };
      const context = scopeSnapshotNarrativeEventContext(selected, { activeScope: "Matthew 3" });
      assert(/John the Baptist/.test(context.summary), "Narrative event summary should use recorded event text instead of only the type label.");
      assert(context.summary !== "narrative_event", "Narrative event summary must not collapse to the technical type identifier.");
      assert(/John/.test(context.participants) && /people/.test(context.participants), "Participants should be copied from existing sub-event fields.");
      assert(/Matthew 3:1/.test(context.sourceReference), "Primary reference should remain visible in event context.");
      assert(context.sequenceLines.some((line) => /Sequence: 1/.test(line)), "Sequence context should use recorded sequence data.");
      assert(/John the Baptist/.test(scopeSnapshotDetailSummaryText(selected, { activeScope: "Matthew 3" })), "Focused detail summary should use the narrative context text.");

      const genericSelected = {
        recordType: "orderedEvent",
        semanticCategory: "Event",
        presentationType: "narrative_event",
        primaryReference: "Matthew 3",
        record: { eventType: "narrative_event" }
      };
      const genericContext = scopeSnapshotNarrativeEventContext(genericSelected, { activeScope: "Matthew 3" });
      assert(/Narrative event at Matthew 3/.test(genericContext.summary), "Generic event fallback should mention the source reference.");
      assert(/event classification recorded/i.test(genericContext.summary), "Generic event fallback should disclose that only classification/source availability is recorded.");
    }
  },
  {
    name: "Matthew 3-only graph nodes produce Matthew 3-only rendered extent",
    run: () => {
      const { scopeSnapshotAxisBounds, scopeSnapshotRequestedBounds, scopeSnapshotBoundaryDifference } = scopeSnapshotAxisHarness({
        pages: [
          { book: "Matthew", chapter: "1", sourceCaptureBook: "Matthew", sourceCaptureChapter: "1" },
          { book: "Matthew", chapter: "2", sourceCaptureBook: "Matthew", sourceCaptureChapter: "2" },
          { book: "Matthew", chapter: "3", sourceCaptureBook: "Matthew", sourceCaptureChapter: "3" }
        ],
        active: { book: "Matthew", chapter: "3", sourceCaptureBook: "Matthew", sourceCaptureChapter: "3" },
        modeLabel: "Selected Scope"
      });
      const nodes = [
        { reference: { book: "Matthew", chapter: 3, verses: [1], label: "Matthew 3:1" } },
        { reference: { book: "Matthew", chapter: 3, verses: [7], label: "Matthew 3:7" } },
        { reference: { book: "Matthew", chapter: 3, verses: [17], label: "Matthew 3:17" } }
      ];
      const bounds = scopeSnapshotAxisBounds(nodes);
      const requested = scopeSnapshotRequestedBounds();
      assert(bounds.minChapter === 3 && bounds.maxChapter === 3, `Rendered extent should be Matthew 3 only, got ${bounds.minChapter}-${bounds.maxChapter}.`);
      assert(requested.minChapter === 1 && requested.maxChapter === 3, "Requested scope fixture should remain Matthew 1-3.");
      assert(scopeSnapshotBoundaryDifference(bounds, requested), "Boundary difference should be explicit when requested scope is wider than rendered records.");
      assert(!/pageChapters[\s\S]*nodeChapters[\s\S]*chapters = \[\.\.\.pageChapters/.test(extractFunctionSource("scopeSnapshotAxisBounds")), "Axis bounds must not union requested page chapters with node chapters.");
    }
  },
  {
    name: "Real Matthew 1-3 node data still renders Matthew 1-3 extent",
    run: () => {
      const { scopeSnapshotAxisBounds } = scopeSnapshotAxisHarness({
        pages: [
          { book: "Matthew", chapter: "1" },
          { book: "Matthew", chapter: "2" },
          { book: "Matthew", chapter: "3" }
        ]
      });
      const bounds = scopeSnapshotAxisBounds([
        { reference: { book: "Matthew", chapter: 1, verses: [1], label: "Matthew 1:1" } },
        { reference: { book: "Matthew", chapter: 2, verses: [1], label: "Matthew 2:1" } },
        { reference: { book: "Matthew", chapter: 3, verses: [1], label: "Matthew 3:1" } }
      ]);
      assert(bounds.minChapter === 1 && bounds.maxChapter === 3, `Multi-page rendered data should remain Matthew 1-3, got ${bounds.minChapter}-${bounds.maxChapter}.`);
    }
  },
  {
    name: "Snapshot range presentation distinguishes rendered and requested scope",
    run: () => {
      assert(/Rendered records:/.test(studyJs), "Snapshot subtitle should label rendered data extent.");
      assert(/Requested scope/.test(studyJs), "Snapshot should expose requested scope separately when it differs.");
      assert(/rendered_extent_with_separate_requested_scope/.test(studyJs), "Graph model should record separated rendered/requested boundary mode.");
      assert(/scopeSnapshotRenderedReferenceDiagnostics/.test(studyJs), "Graph projection diagnostics should include rendered reference boundaries.");
    }
  },
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

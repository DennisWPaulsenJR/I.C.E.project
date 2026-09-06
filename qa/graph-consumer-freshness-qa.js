const assert = require("node:assert/strict");

function normalizeStudyGeneration(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? Math.floor(numeric) : 0;
}

function recordMatchesStudyGeneration(record = {}, generation = 0) {
  const recordGeneration = normalizeStudyGeneration(record.studyGeneration ?? record.clearAllGeneration);
  if (generation <= 0) return recordGeneration === 0;
  return recordGeneration === generation;
}

function filterRecordsForStudyGeneration(records = [], generation = 0) {
  return (Array.isArray(records) ? records : []).filter((record) =>
    recordMatchesStudyGeneration(record, generation)
  );
}

function assertGenerationFiltering(label, records, generation, expectedCount) {
  assert.equal(
    filterRecordsForStudyGeneration(records, generation).length,
    expectedCount,
    `${label} should retain only the active generation`
  );
}

const mixedInteractionRecords = [
  { id: "interaction-current", studyGeneration: 7 },
  { id: "interaction-stale", studyGeneration: 6 },
  { id: "interaction-missing" }
];
const mixedSceneRecords = [
  { id: "scene-current", studyGeneration: 7 },
  { id: "scene-stale", studyGeneration: 6 },
  { id: "scene-missing" }
];

assertGenerationFiltering("current interaction records", [{ studyGeneration: 7 }], 7, 1);
assertGenerationFiltering("stale interaction records", [{ studyGeneration: 6 }], 7, 0);
assertGenerationFiltering("mixed interaction records", mixedInteractionRecords, 7, 1);
assertGenerationFiltering("missing-generation interaction records", [{ id: "missing" }], 7, 0);
assertGenerationFiltering("current scene records", [{ studyGeneration: 7 }], 7, 1);
assertGenerationFiltering("stale scene records", [{ studyGeneration: 6 }], 7, 0);
assertGenerationFiltering("mixed scene records", mixedSceneRecords, 7, 1);
assertGenerationFiltering("missing-generation scene records", [{ id: "missing" }], 7, 0);

assert.equal(filterRecordsForStudyGeneration([{ id: "legacy" }], 0).length, 1);
assert.equal(filterRecordsForStudyGeneration([{ studyGeneration: 0 }], 0).length, 1);
assert.equal(filterRecordsForStudyGeneration([{ studyGeneration: 1 }], 0).length, 0);

console.log("graph-consumer-freshness-qa: PASS");

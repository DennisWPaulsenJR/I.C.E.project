const fs = require("fs");

const study = fs.readFileSync("study.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(study.includes("function selectedRangeEligibility("), "eligibility seam missing");
assert(study.includes("recordMatchesStudyGeneration(persistedRange, activeGeneration)"), "generation validation missing");
assert(study.includes("const pagesByKey = new Map(canonicalPages.map((page) => [pageRecordKey(page), page]))"), "canonical membership projection missing");
assert(study.includes("if (!start || !end) return null"), "endpoint validation missing");
assert(study.includes("persistedMembers.some((page) => !pagesByKey.has(pageRecordKey(page)))"), "persisted member validation missing");
assert(study.includes("return selectedRangeEligibility(selected, analyzedPages, activeStudyGenerationFromData())"), "reconstruction integration missing");
assert(!study.includes("[STORAGE_KEYS.selectedRange]: selectedRangeEligibility"), "eligibility seam must not persist state");

console.log("selected-range-eligibility-qa: PASS");

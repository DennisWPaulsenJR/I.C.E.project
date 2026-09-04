const fs = require("fs");

const popup = fs.readFileSync("popup.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(popup.includes("const canonicalTargetPage = pageRecordFromCanonicalMarker(data[CANONICAL_ANALYSIS_TARGET_KEY]);"), "canonical target projection missing");
assert(popup.includes("const validCanonicalTarget = canonicalTargetPage?.pageKey && recordMatchesStudyGeneration(canonicalTargetPage, studyGeneration)"), "canonical target currentness guard missing");
assert(popup.includes("const activePageCandidate = validCanonicalTarget || data[ACTIVE_SOURCE_PAGE_KEY] || statusPage || tabPage;"), "canonical target precedence missing");
assert(popup.includes("type: \"ICE_ADMIT_CANONICAL_ANALYZED_PAGE\""), "canonical admission contract missing");
assert(!popup.includes("[CANONICAL_ANALYSIS_TARGET_KEY]:"), "popup must not persist canonical target");
assert(!popup.includes("[CANONICAL_ANALYZED_PAGES_KEY]: nextMarkers"), "popup must not persist canonical membership");

console.log("popup-source-precedence-qa: PASS");

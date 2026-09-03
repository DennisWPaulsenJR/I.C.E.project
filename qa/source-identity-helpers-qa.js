const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const helperSource = fs.readFileSync(require.resolve("../study-source-identity-helpers.js"), "utf8");
const context = { console };
vm.createContext(context);
vm.runInContext(helperSource, context);
const helpers = context.ICESourceIdentityHelpers;

const base = {
  activeUrl: "https://example.test/matthew/7",
  activeAdapterName: "lds_scripture_adapter",
  sourceCaptureBook: "Matthew",
  sourceCaptureChapter: "7",
  sourceTitle: "Matthew 7",
  pageKey: "matthew|7|matthew 7|https://example.test/matthew/7"
};

assert.strictEqual(helpers.compare(base, { ...base }), "same_source_page");
assert.strictEqual(helpers.compare(base, { ...base, activeUrl: "https://example.test/matthew/8" }), "different_source_page");
assert.strictEqual(helpers.compare(base, { ...base, activeAdapterName: "other_adapter" }), "different_source_page");
assert.strictEqual(helpers.compare(base, { ...base, sourceCaptureBook: "Mark" }), "different_source_page");
assert.strictEqual(helpers.compare(base, { ...base, sourceCaptureChapter: "8" }), "different_source_page");
assert.strictEqual(helpers.compare(base, { ...base, pageKey: "matthew|7|different|https://example.test/matthew/7" }), "different_source_page");
assert.strictEqual(helpers.compare(base, { ...base, activeAdapterName: "" }), "insufficient_identity");
assert.strictEqual(helpers.compare(base, { ...base, sourceTitle: "Different supporting title", pageKey: base.pageKey }), "same_source_page");

const first = { ...base };
const second = { ...base };
assert.strictEqual(helpers.compare(first, second), "same_source_page");
assert.deepStrictEqual(first, base);
assert.deepStrictEqual(second, base);

assert.match(fs.readFileSync(require.resolve("../background.js"), "utf8"), /function validStudyScopePageRecord/);
assert.match(fs.readFileSync(require.resolve("../popup.js"), "utf8"), /ICESourceIdentityHelpers\.identityKey\(page\)/);
assert.match(fs.readFileSync(require.resolve("../study.js"), "utf8"), /ICESourceIdentityHelpers\.identityKey\(page\)/);
assert.doesNotMatch(helperSource, /chrome\.|storage|document\./);

console.log("source identity helper QA passed");

const fs = require("fs");
const path = require("path");

const input = process.argv[2] || path.join("qa-output", "latest-matthew5-qa-bundle.json");
const output = process.argv[3] || path.join("QA_REPORTS", "latest-study-panel-report.md");

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function count(value) {
  return Array.isArray(value) ? value.length : value && typeof value === "object" ? 1 : 0;
}

function clean(value = "") {
  return String(value || "")
    .replace(/[\u2190\u2192\u2194]/g, "->")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function list(lines, fallback = "none recorded") {
  const values = asArray(lines).map(clean).filter(Boolean);
  return values.length ? values.map((line) => `- ${line}`) : [`- ${fallback}`];
}

function loadBundle(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function reportFromBundle(bundle) {
  const samples = bundle.samples || {};
  const counts = bundle.counts || {};
  const activeAdapter = samples.activeAdapter || {};
  const teaching = asArray(samples.teachingSemantics);
  const relationships = asArray(samples.principleRelationships);
  const source = teaching[0]?.sourceContext || {};
  const activeTitle = source.sourceTitle || bundle.pageTitle || "Matthew 5";
  const activeUrl = source.sourceUrl || bundle.url || "Not recorded";
  const evidence = [
    ...teaching.slice(0, 4).map((item) => `${item.sourcePhrase || item.teachingTopic || "Teaching"} | ${item.derivedMeaning || "derived meaning not recorded"}`),
    ...relationships.slice(0, 3).map((item) => `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")} | ${item.sourcePhrase || "source phrase not recorded"}`)
  ];

  return [
    "# I.C.E. GPT Review Report",
    "",
    "## Source",
    `Active source page: ${clean(activeTitle)}`,
    `URL: ${clean(activeUrl)}`,
    `Adapter: ${clean(activeAdapter.adapterName || "lds_scripture_adapter")}`,
    `Analysis timestamp: ${clean(bundle.testedAt || "Not recorded")}`,
    "Current page/chapter type: Teaching / discourse heavy",
    "",
    "## Study Scope",
    "Range: Matthew 5",
    "Analyzed pages: Matthew 5",
    "Continuity: no cross-page continuity in standalone QA bundle",
    "",
    "## Layer Counts",
    `DOM hints: ${counts.domSemanticHints || 0}`,
    `Source Discovery: ${counts.sourceDiscovery || 0}`,
    `Reference Graph: ${counts.referenceGraph || 0}`,
    `Reference Roles: ${counts.referenceRoles || 0}`,
    `Ontology Roles: ${counts.ontologyRoles || 0}`,
    `Teaching / Discourse: ${counts.teachingSemantics || 0}`,
    `Principle Relationships: ${counts.principleRelationships || 0}`,
    "",
    "## Semantic Coverage",
    ...list([
      counts.teachingSemantics ? "Teaching / Discourse Structure: Primary semantic layer for this chapter; grounded records found" : "Teaching / Discourse Structure: Primary semantic layer for this chapter; awaiting grounding",
      counts.principleRelationships ? "Principle Relationships: Pilot layer; grounded records found" : "Principle Relationships: Pilot layer; no grounded records found",
      "Movement / Location Semantics: Not applicable to current chapter",
      "Cross-Chapter Continuity: Available when session scope spans multiple pages"
    ]),
    "",
    "## Top Warnings / Issues",
    ...list(bundle.failures || [], "none detected in compact review snapshot"),
    "",
    "## Top Derived Sections",
    ...list([
      ...teaching.slice(0, 6).map((item) => `${item.teachingTopic || item.blessing || item.commandment || item.principle || item.discourseType} | ${item.verseRange || item.scopePath || "current scope"} | App accuracy: ${item.confidence || "probable"}`),
      ...relationships.slice(0, 5).map((item) => `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")} | App accuracy: ${item.confidence || "probable"}`)
    ], "no derived teaching/principle summaries available"),
    "",
    "## Selected Evidence",
    ...(evidence.length ? evidence.slice(0, 5).map((line, index) => `${index + 1}. ${clean(line)}`) : ["1. No compact evidence lines available."]),
    "",
    "## QA-Style Summary",
    `pass: ${Boolean(bundle.pass)}`,
    `latestCapture: ${counts.latestCapture || 0}`,
    `domSemanticHints: ${counts.domSemanticHints || 0}`,
    `teachingSemantics: ${counts.teachingSemantics || 0}`,
    `principleRelationships: ${counts.principleRelationships || 0}`,
    "",
    "## Excluded From This Report",
    "- full Source Discovery",
    "- full Reference Graph",
    "- huge DOM hints",
    "- full raw mention index",
    "",
    "## Review Notes",
    "This report is generated from local QA output. GPT reviews this artifact; it does not control the browser or crawl pages."
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

const bundle = loadBundle(input);
const report = reportFromBundle(bundle);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report, "utf8");
console.log(`Wrote ${output}`);
console.log(`Characters: ${report.length}`);

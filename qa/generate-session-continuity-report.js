const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const output = process.argv[2] || path.join("QA_REPORTS", "latest-study-panel-report.md");
const inputs = process.argv.slice(3).length ? process.argv.slice(3) : [
  path.join("qa-output", "latest-qa-bundle.json"),
  path.join("qa-output", "latest-matthew2-qa-bundle.json"),
  path.join("qa-output", "latest-matthew3-qa-bundle.json"),
  path.join("qa-output", "latest-matthew5-qa-bundle.json")
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
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

function unique(values = []) {
  const seen = new Set();
  return asArray(values).map(clean).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function currentGitAnchor() {
  try {
    return execSync("git log --oneline -1", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (_error) {
    return "not available";
  }
}

function loadBundle(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function pageLabel(bundle) {
  const title = clean(bundle.pageTitle || bundle.samples?.analysisStatus?.sourceCaptureTitle || "");
  const match = title.match(/Matthew\s+(\d+)/i) || clean(bundle.url).match(/matt\/(\d+)/i);
  return match ? `Matthew ${match[1]}` : title || clean(bundle.url) || "Unknown page";
}

function pageChapter(label) {
  return Number(String(label || "").match(/Matthew\s+(\d+)/i)?.[1] || 0);
}

function progressionForChapter(chapter) {
  return {
    1: "Matthew 1: mission revealed",
    2: "Matthew 2: mission preserved",
    3: "Matthew 3: mission announced",
    4: "Matthew 4: mission prepared",
    5: "Matthew 5: mission taught"
  }[chapter] || "";
}

function reportFromBundles(bundles) {
  const sorted = bundles
    .map((bundle) => ({ bundle, label: pageLabel(bundle), chapter: pageChapter(pageLabel(bundle)) }))
    .filter((entry) => entry.label)
    .sort((left, right) => (left.chapter || 999) - (right.chapter || 999));
  const labels = unique(sorted.map((entry) => entry.label));
  const chapters = new Set(sorted.map((entry) => entry.chapter).filter(Boolean));
  const has = (chapter) => chapters.has(chapter);
  const range = labels.length ? `${labels[0]} -> ${labels[labels.length - 1]}` : "No session range";
  const counts = sorted.reduce((acc, entry) => {
    for (const [key, value] of Object.entries(entry.bundle.counts || {})) acc[key] = (acc[key] || 0) + Number(value || 0);
    return acc;
  }, {});
  const samples = sorted.flatMap((entry) => {
    const bundleSamples = entry.bundle.samples || {};
    return [
      ...asArray(bundleSamples.semanticContinuity).map((item) => `Continuity: ${item.continuedEntity || "entity"} | ${item.chapterTransition || entry.label}`),
      ...asArray(bundleSamples.characterInteractions).map((item) => `Interaction: ${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"}`),
      ...asArray(bundleSamples.teachingSemantics).map((item) => `Teaching: ${item.teachingTopic || item.blessing || item.commandment || "teaching"} | ${item.sourcePhrase || entry.label}`),
      ...asArray(bundleSamples.principleRelationships).map((item) => `Principle: ${item.principle || "principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).slice(0, 3).join(", ")}`),
      ...asArray(bundleSamples.knowledgeGraph).map((item) => `Knowledge Graph: ${item.node || "Node"} | ${item.type || "Semantic Node"} | ${asArray(item.relationships).slice(0, 2).join("; ")}`)
    ];
  });
  const continuingCharacters = unique([
    has(1) || has(2) || has(3) || has(5) ? "JESUS" : "",
    has(1) || has(2) ? "Joseph" : "",
    has(1) || has(2) ? "Mary" : "",
    has(3) ? "John" : "",
    has(5) ? "disciples" : "",
    has(5) ? "People / multitudes" : ""
  ]);
  const continuingThemes = unique([
    has(1) ? "mission revealed" : "",
    has(2) ? "mission preserved" : "",
    has(3) ? "mission announced" : "",
    has(4) ? "mission prepared" : "",
    has(5) ? "mission taught" : "",
    has(5) ? "kingdom" : "",
    has(5) ? "righteousness" : "",
    has(5) ? "mercy" : "",
    has(1) || has(2) ? "obedience" : "",
    has(1) || has(2) ? "fulfillment" : ""
  ]);
  const authorityPaths = unique([
    has(1) || has(2) ? "THE LORD -> AngEL Of THE LORD -> Joseph" : "",
    has(3) ? "HOLY SPIRIT source wording / derived display continuity" : "",
    has(5) ? "JESUS -> disciples / multitudes" : ""
  ]);
  const progression = unique([1, 2, 3, 4, 5].filter(has).map(progressionForChapter));

  return [
    "# I.C.E. GPT Review Report",
    "",
    "## Repo Context",
    `Current canonical anchor: ${clean(currentGitAnchor())}`,
    "Report generated by: GPT Review Mode / session continuity review command",
    "QA command: npm.cmd run review:matthew-session",
    "",
    "## Review Prompt",
    "Current Review Question: Does Matthew 1 -> Matthew 5 preserve grounded session continuity across narrative, protection, baptism/preaching, preparation, and teaching layers?",
    "User Observed Issue: Not provided in QA bundle. Add the user's observed issue before requesting architectural review.",
    "",
    "## Source",
    `Active source page: ${labels[labels.length - 1] || "Not recorded"}`,
    "Adapter: lds_scripture_adapter",
    `Analysis timestamp: ${new Date().toISOString()}`,
    "Current page/chapter type: Session / range review",
    "",
    "## Study Scope",
    `Range: ${range}`,
    `Analyzed pages: ${labels.join(", ") || "none recorded"}`,
    "Continuity: session continuity review generated from separate local QA bundles; no auto-crawling performed",
    "",
    "## Scripture Knowledge Graph",
    `Graph foundation nodes: ${counts.knowledgeGraph || 0}`,
    "Purpose: connect existing semantic layers into reviewable graph node summaries; no visual graph rendering yet.",
    "",
    "## Session Continuity Review",
    `Session Range: ${range}`,
    ...list(continuingCharacters.map((item) => `Continuing Character: ${item}`)),
    ...list(continuingThemes.map((item) => `Continuing Theme: ${item}`)),
    ...list(authorityPaths.map((item) => `Continuing Authority Path: ${item}`)),
    ...list(progression.map((item) => `Teaching Progression: ${item}`)),
    "",
    "## Layer Counts",
    `Semantic Continuity: ${counts.semanticContinuity || 0}`,
    `Ontology Roles: ${counts.ontologyRoles || 0}`,
    `Authority Paths: ${counts.originAuthorityPaths || 0}`,
    `Teaching / Discourse: ${counts.teachingSemantics || 0}`,
    `Principle Relationships: ${counts.principleRelationships || 0}`,
    `Character Interactions: ${counts.characterInteractions || 0}`,
    `Scripture Knowledge Graph: ${counts.knowledgeGraph || 0}`,
    "Session Continuity Review: 1",
    "",
    "## Semantic Coverage",
    "- Scripture Knowledge Graph: Graph foundation; uses grounded semantic layers when available",
    "- Session Continuity Review: Pilot layer; grounded review generated from analyzed QA bundles",
    "- Cross-Chapter Continuity: Available from Matthew 2 and session range metadata",
    "- Teaching / Discourse Structure: Primary semantic layer for Matthew 5",
    "- Library Awareness: Framework only; current-source records remain source grounded",
    "",
    "## Top Concern Auto-Detection",
    ...list(sorted.flatMap((entry) => asArray(entry.bundle.failures)).concat(labels.length < 2 ? ["Session range has fewer than two analyzed pages."] : []), "none detected in compact review snapshot"),
    "",
    "## GPT Recommended Review Focus",
    "- check session range and analyzed pages",
    "- check continuing characters are grounded to analyzed chapter anchors",
    "- check teaching progression does not include unanalyzed pages",
    "- check current semantic layers support continuity claims",
    "- check knowledge graph nodes do not imply ungrounded visual relationships",
    "",
    "## Selected Evidence",
    ...(unique(samples).slice(0, 8).map((line, index) => `${index + 1}. ${line}`)),
    "",
    "## Excluded From This Report",
    "- full Source Discovery",
    "- full Reference Graph",
    "- huge DOM hints",
    "- full raw mention index",
    "",
    "## Review Notes",
    "This report is generated from local QA outputs. GPT reviews this artifact; it does not control the browser or crawl pages."
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

const bundles = inputs.filter((file) => fs.existsSync(file)).map(loadBundle);
if (!bundles.length) {
  throw new Error("No QA bundle inputs found for session continuity report.");
}
const report = reportFromBundles(bundles);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report, "utf8");
console.log(`Wrote ${output}`);
console.log(`Characters: ${report.length}`);
const fs = require("fs");

const background = fs.readFileSync("background.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const start = background.indexOf("function createCanonicalIdentities(");
const end = background.indexOf("function entityRegistryDisplayRankLike", start);
assert(start >= 0 && end > start, "canonical identity builder missing");

const builder = background.slice(start, end);

assert(builder.includes("const registryIdentityKeys = new Set"), "registry membership set missing");
assert(builder.includes("canonicalEntityName(entity.canonicalName || \"\").toLowerCase()"), "registry membership uses the canonical normalization contract");
assert(builder.includes("if (!canonicalName || !registryIdentityKeys.has(canonicalName.toLowerCase())) return null;"), "non-registry identity admission guard missing");
assert(builder.includes("registryIdentityRecordFor(entity.canonicalName"), "registry entities do not seed canonical identities");
assert(builder.includes("registryIdentityRecordFor(surface, inferEntityType(surface, []))"), "semantic and relationship enrichment is not registry bounded");
assert(builder.includes("registryIdentityRecordFor(role.entityName"), "role enrichment is not registry bounded");
assert(builder.includes("registryIdentityRecordFor(\"JESUS CHRIST\", \"divine\")"), "known-identity enrichment is not registry bounded");
assert(builder.includes("for (const entity of entityRegistry || [])"), "registry base creation loop missing");
assert(background.includes("[ENTITY_REGISTRY_KEY]: withStudyGenerationRecords(entityRegistry, pipelineStudyGeneration)"), "entity registry generation persistence changed");
assert(background.includes("[RELATIONSHIP_GRAPH_KEY]: withStudyGenerationRecords(relationshipGraph, pipelineStudyGeneration)"), "relationship graph generation persistence changed");
assert(!builder.includes("identityRecordFor(identities, surface"), "unbounded surface identity creation remains");
assert(!builder.includes("identityRecordFor(identities, role.entityName"), "unbounded role identity creation remains");

console.log("entity-identity-admission-authority-qa: PASS");

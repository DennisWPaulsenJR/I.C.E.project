const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const backgroundJs = fs.readFileSync(path.join(root, "background.js"), "utf8");
const studyJs = fs.readFileSync(path.join(root, "study.js"), "utf8");
const studyHtml = fs.readFileSync(path.join(root, "study.html"), "utf8");
const architectureIndex = fs.readFileSync(path.join(root, "THREAD_ARCHIVE", "ARCHITECTURE_INDEX.md"), "utf8");
const observationDoc = fs.readFileSync(path.join(root, "THREAD_ARCHIVE", "OBSERVATION_ENGINE_PHASE_1.md"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractFunctionSource(source, functionName) {
  const start = source.indexOf(`function ${functionName}`);
  assert(start >= 0, `Missing function ${functionName}.`);
  const paramsEnd = source.indexOf(")", start);
  assert(paramsEnd >= 0, `Missing function parameters for ${functionName}.`);
  const bodyStart = source.indexOf("{", paramsEnd);
  assert(bodyStart >= 0, `Missing function body for ${functionName}.`);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unclosed function body for ${functionName}.`);
}

function includes(source, pattern, message) {
  assert(pattern.test(source), message);
}

const createObservationRecordSource = extractFunctionSource(backgroundJs, "createObservationRecord");
const createObservationRecordsSource = extractFunctionSource(backgroundJs, "createObservationRecords");
const renderObservationEngineSource = extractFunctionSource(studyJs, "renderObservationEngine");
const pipelineSource = extractFunctionSource(studyJs, "integratedSemanticPipelineStages");
const architectureNodesSource = extractFunctionSource(studyJs, "architectureGraphNodes");
const architectureEdgesSource = extractFunctionSource(studyJs, "architectureGraphEdges");

includes(backgroundJs, /const\s+OBSERVATION_RECORDS_KEY\s*=\s*"ICE_OBSERVATION_RECORDS"/, "Missing ICE_OBSERVATION_RECORDS storage key.");
includes(backgroundJs, /\[OBSERVATION_RECORDS_KEY\]\s*:\s*withStudyGenerationRecords\(observationRecords,\s*pipelineStudyGeneration\)/, "Observation records are not generation-stamped into storage output.");
includes(backgroundJs, /enrichScopeCollection\(data\.observationRecords,\s*"observation"/, "Observation records are not scope-integrity enriched.");
includes(backgroundJs, /const\s+observationRecords\s*=\s*createObservationRecords\(eventItems,\s*orderedEvents\)/, "Observation records are not created from event candidates and ordered events.");
includes(backgroundJs, /observationCount:\s*observationRecords\.length/, "Observation count is not reported in analysis status.");

[
  "observationId",
  "observationType",
  "sourceScope",
  "sourceReference",
  "scopePath",
  "sourceCaptureId",
  "sourceText",
  "matchedText",
  "observedSubject",
  "observedAction",
  "observedObject",
  "observedLocation",
  "participants",
  "eventId",
  "candidateSource",
  "extractionRule",
  "contextRule",
  "creationReason",
  "evidence",
  "evidenceDistance",
  "inferenceLevel",
  "confidence",
  "provenance",
  "boundary"
].forEach((field) => includes(createObservationRecordSource, new RegExp(`${field}\\s*[:,]`), `Observation record missing ${field}.`));

includes(createObservationRecordSource, /inferenceLevel:\s*"direct_observation"/, "Observation records must remain direct observations.");
includes(createObservationRecordSource, /no doctrine\/theme\/motive\/symbolism\/application inference/, "Observation provenance must preserve no-interpretation boundary.");
includes(createObservationRecordSource, /Observation records preserve explicit source presentation/, "Observation boundary text is missing.");
includes(createObservationRecordSource, /!isLocationEntityName\(value\)/, "Observation participants must filter location entities.");
includes(createObservationRecordsSource, /isSourceSummarySentence/, "Observation creation should skip source summaries.");
includes(createObservationRecordsSource, /\/explicit\/i\.test/, "Sub-event observations must require explicit confidence.");
includes(createObservationRecordsSource, /seen\.has\(key\)/, "Observation creation must deduplicate repeated emissions.");

[
  "person_speaking",
  "person_moving",
  "object_mentioned",
  "place_named",
  "event_occurring",
  "command_spoken",
  "promise_spoken",
  "question_asked",
  "relationship_expressed",
  "temporal_transition_stated"
].forEach((type) => includes(backgroundJs, new RegExp(type), `Missing observation type ${type}.`));

includes(studyHtml, /id="observationEngineSection"/, "Study Panel missing Observation Engine section.");
includes(studyHtml, /id="diagnosticObservationRecords"/, "Study diagnostics missing Observation Records count.");
includes(studyJs, /observationRecords:\s*"ICE_OBSERVATION_RECORDS"/, "Study Panel missing observation storage alias.");
includes(studyJs, /"Observation Engine":\s*"observationRecords"/, "Deferred section counts missing Observation Engine alias.");
includes(studyJs, /sectionId:\s*"observationEngineSection",\s*renderer:\s*renderObservationEngine/, "Observation Engine renderer is not registered.");
includes(renderObservationEngineSource, /scopedSemanticRecords\(studyData\.observationRecords\)/, "Observation renderer must use scoped records.");
includes(studyJs, /no doctrine,\s*theme,\s*motive,\s*symbolism,\s*application,\s*fulfillment,\s*or semantic authority/i, "Observation display boundary missing no-interpretation rule.");
includes(studyJs, /scopeSnapshotAddNode\(nodes,\s*"happenings",\s*record,\s*"Observation"/, "Linear Scope Snapshot does not project observation display nodes.");
includes(studyJs, /observationRecords:\s*safeCount\(\(\)\s*=>\s*scopedSemanticRecords\(studyData\.observationRecords\)\.length\)/, "Snapshot diagnostics missing observation source count.");

includes(pipelineSource, /Stage 3 - Observation Layer/, "Integrated pipeline missing Observation Layer stage.");
includes(pipelineSource, /direct source-text occurrences before semantic interpretation/, "Pipeline observation stage missing direct-source boundary.");
includes(architectureNodesSource, /"observation_records",\s*"Observation Records"/, "Architecture graph missing Observation Records node.");
includes(architectureEdgesSource, /"primary_observation"/, "Architecture graph missing primary-to-observation edge.");
includes(architectureEdgesSource, /"observations_entities"/, "Architecture graph missing observation-to-entity edge.");

includes(architectureIndex, /OBSERVATION_ENGINE_PHASE_1\.md/, "Architecture Index does not link Observation Engine Phase 1.");
includes(observationDoc, /Source Text\s*->\s*Capture\s*->\s*Candidate Extraction\s*->\s*Context Resolution\s*->\s*Observation\s*->\s*Graph Projection\s*->\s*Higher-Level Semantic Layers/s, "Observation architecture document missing required flow.");
includes(observationDoc, /Observation records may not:/, "Observation architecture document missing prohibited behavior section.");

console.log("Observation Engine QA passed.");

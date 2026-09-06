const fs = require("fs");

const study = fs.readFileSync("study.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(/function queueItemFromPage\([\s\S]*?studyGeneration: activeStudyGenerationFromData\(\)/.test(study), "queue creation does not bind the active Study generation");
assert(/function analysisQueueRecords\([\s\S]*?filter\(\(item\) => recordMatchesStudyGeneration\(item, activeGeneration\)\)/.test(study), "active queue filtering is missing");
assert(/data\.analysisQueue = filterRecordsForStudyGeneration\(data\.analysisQueue, activeGeneration, STORAGE_KEYS\.analysisQueue\)/.test(study), "persisted queue normalization filtering is missing");
assert(/studyGeneration: recordStudyGeneration\(item\)/.test(study), "queue records do not preserve generation metadata");
assert(!/ICE_ANALYSIS_QUEUE[\s\S]{0,300}studyGeneration.*\+ 1/.test(study), "queue must not advance Study generation");
assert(!/function (queue|analysisQueue)[\s\S]{0,300}(recordStudyGeneration|activeStudyGenerationFromData)[\s\S]{0,300}(set|advance|reset|select).*studyGeneration/.test(study), "queue must not own generation lifecycle");
assert(/function retryFailedQueueItems\([\s\S]*?analysisQueueRecords\(\)/.test(study), "retry path is not using the active queue projection");

console.log("queue-generation-freshness-qa: PASS");

# Agent Activity Log

Compact ongoing activity log for multi-agent I.C.E. work.

Actor labels:
- `gpt` = PC/browser GPT orchestration lane
- `mgpt` = mobile GPT orchestration lane
- `pcdx` = PC/desktop Codex implementation lane
- `mcdx` = mobile/web Codex implementation lane

Entry format:

```text
## YYYY-MM-DD HH:MM - actor - short task name
Summary:
Files touched:
Checks:
Commit:
Status:
```

Keep this file concise. Use `PROJECT_LOG.md` for milestone summaries and `PROJECT_STATE.md` for current operational truth.

## 2026-05-31 00:00 - pcdx - Refine principle hierarchy
Summary:
- Added grouped Principle Hierarchy display inside Principles / Teachings.
- Groups include Core Principles, Supporting Principles, Teaching Themes, Commandments, Applications, Promises, Warnings / Consequences, Contrasts, Examples, and Audience Conditions.
- Added grounded Matthew 5 pure-in-heart and peacemaking teaching records and compact report output.

Files touched:
- `background.js`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew5` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew5` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Refine principle hierarchy`

Status:
- Implemented and validated.
## 2026-05-31 00:00 - pcdx - Fix suggested next page processing
Summary:
- Fixed Study Scope so Suggested Next remains display-only and cannot become analyzed/selected range state.
- Analyzed page history now excludes stale analysis status records that do not match the active source target.
- Selected range display now validates that both endpoints are already analyzed before using stored range state.
- Fixed missing report-generator `unique()` helper found during `review:matthew5`.

Files touched:
- `study.js`
- `qa/generate-study-panel-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew5` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Fix suggested next page processing`

Status:
- Implemented and validated; manual browser smoke not run in this headless turn.
## 2026-05-31 00:00 - pcdx - Add study progression engine
Summary:
- Added Study Progression section for current focus, explored topics, related topics, not-yet-explored topics, and suggested next topic.
- Progression records are derived from existing semantic layers only and show provenance, evidence weight, supporting layers, App accuracy, and session scope.
- Added compact Study Progression output to GPT review reports.

Files touched:
- `study.html`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Add study progression engine`

Status:
- Implemented and validated.

## 2026-05-30 00:00 - pcdx - Refine guided study UI
Summary:
- Added Guided Study section with readable Suggested Study Path cards.
- Suggestions are grounded in existing semantic records and show why they appear, related items, evidence, source/provenance, evidence weight, and App accuracy.
- Added compact Guided Study suggestions to GPT review reports.

Files touched:
- `study.html`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Refine guided study UI`

Status:
- Implemented and validated.

## 2026-05-30 00:00 - pcdx - Add semantic resolution explanations
Summary:
- Added derived `ICE_RESOLUTION_EXPLANATIONS` Study Panel layer.
- Explanation cards show result, source/supporting evidence, ontology role, relationship inputs, teaching inputs, reasoning path, evidence weight, provenance, source phrase, derived meaning, App accuracy, and scope.
- Added compact Semantic Resolution Explanations to GPT review reports.

Files touched:
- `study.html`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Add semantic resolution explanations`

Status:
- Implemented and validated.

## 2026-05-30 00:00 - pcdx - Add semantic evidence weighting
Summary:
- Added Evidence Weight display beside provenance for source-supported and I.C.E.-generated semantic records.
- Distinguished direct source evidence, supporting source evidence, derived semantic evidence, relationship inference, continuity inference, and library awareness classification.
- Added Evidence Weights to compact GPT review reports.

Files touched:
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Add semantic evidence weighting`

Status:
- Implemented and validated.

## 2026-05-30 00:00 - pcdx - Add universal provenance labels
Summary:
- Added visible Wording Provenance blocks for generated semantic labels across Study Panel semantic cards.
- Distinguished I.C.E. generated classifications, relationships, continuity labels, library families, knowledge graph nodes, coverage labels, and source/reference wording.
- Added Provenance Labels sections to compact GPT review reports.

Files touched:
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Add universal provenance labels`

Status:
- Implemented and validated.

## 2026-05-30 00:00 - pcdx - Add scripture knowledge graph foundation
Summary:
- Added `ICE_KNOWLEDGE_GRAPH` derived graph foundation for reviewable semantic nodes and relationships.
- Derived graph nodes from Character Interactions, Principle Relationships, Teaching Semantics, Authority Paths, Semantic Continuity, Session Continuity Review, and Ontology Roles.
- Added Study Panel Scripture Knowledge Graph cards plus compact GPT/repo report and QA bundle support.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `node --check qa/matthew2-extension-qa.js` passed
- `node --check qa/matthew3-extension-qa.js` passed
- `node --check qa/matthew5-extension-qa.js` passed
- `git diff --check` passed

Commit:
- `pcdx: Add scripture knowledge graph foundation`

Status:
- Implementation ready for Matthew QA/review validation.
## 2026-05-30 00:00 - pcdx - Add session continuity review
Summary:
- Added `ICE_SESSION_CONTINUITY_REVIEW` as a derived review layer for analyzed page ranges.
- Added Study Panel Session Continuity Review cards for session range, analyzed pages, continuing characters/themes/authority paths, teaching progression, principle families, character interactions, App accuracy, evidence, and grounding.
- Added compact GPT/repo report support and `npm.cmd run review:matthew-session` for Matthew 1 -> Matthew 5 review artifacts.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `package.json`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/generate-session-continuity-report.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `node --check qa/matthew2-extension-qa.js` passed
- `node --check qa/matthew3-extension-qa.js` passed
- `node --check qa/matthew5-extension-qa.js` passed
- `python -m json.tool package.json` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- `npm.cmd run qa:matthew2` passed
- `npm.cmd run qa:matthew3` passed
- `npm.cmd run qa:matthew5` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew5` passed
- `npm.cmd run review:matthew-session` passed

Commit:
- `pcdx: Add session continuity review`

Status:
- Implementation validated and ready to commit.

## 2026-05-30 00:00 - pcdx - Add character interaction architecture
Summary:
- Added `ICE_CHARACTER_INTERACTIONS` derived layer for source-grounded Character / Group / Authority interactions.
- Added Matthew 1, Matthew 2, and Matthew 5 pilot interaction records with authority class paths, source phrases, derived meanings, App accuracy, evidence, and grounding.
- Updated Study Panel Character Interactions, QA bundles, and GPT Review Report output.

Files touched:
- `background.js`
- `study.js`
- `qa/generate-study-panel-report.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `node --check qa/matthew2-extension-qa.js` passed
- `node --check qa/matthew3-extension-qa.js` passed
- `node --check qa/matthew5-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- `npm.cmd run qa:matthew2` passed
- `npm.cmd run qa:matthew3` passed
- `npm.cmd run qa:matthew5` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run review:matthew5` passed

Commit:
- Pending: `pcdx: Add character interaction architecture`

Status:
- Ready to commit.
## 2026-05-30 00:00 - pcdx - Add library awareness foundation
Summary:
- Added framework-only Library Awareness to the Study Panel and GPT Review Report path.
- Derived current-source principle/teaching/doctrine families from existing teaching semantics and principle relationships.
- Preserved no-crawl/no-auto-index boundaries and labeled future sources as awaiting analysis.

Files touched:
- `study.html`
- `study.css`
- `study.js`
- `qa/generate-study-panel-report.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/latest-study-panel-report.md`

Checks:
- `node --check study.js` passed
- `node --check qa/generate-study-panel-report.js` passed
- `git diff --check` passed
- `npm.cmd run review:matthew5` passed
- `npm.cmd run qa:matthew-pages` passed

Commit:
- `pcdx: Add library awareness foundation`

Status:
- Completed locally; ready for commit/push verification.

## 2026-05-29 02:45 - pcdx - Add teaching discourse semantics
Summary:
- Added `ICE_TEACHING_SEMANTICS` for Matthew 5 teaching/discourse structure with JESUS as grounded speaker, disciples/multitudes audience, Beatitude blessings, commandment interpretations, law/fulfillment contrast, and Group Entity audience range display.
- Added Study Panel Teaching / Discourse Structure cards and diagnostics.
- Added Matthew 5 ontology/canonical identity support and `qa:matthew5`; tightened John-preaching scene classification to avoid Matthew 3 leakage into Matthew 5.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `package.json`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew5-extension-qa.js` passed
- `python -m json.tool package.json` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- `npm.cmd run qa:matthew2` passed
- `npm.cmd run qa:matthew3` passed
- `npm.cmd run qa:matthew-pages` passed
- `npm.cmd run qa:matthew5` passed

Commit:
- This commit

Status:
- Implemented


## 2026-05-22 17:20 - pcdx - Make reference roles user intuitive
Summary:
- Updated Reference Role cards to show user-facing role titles, plain explanations, exact source references, resolved being, canonical/source identity, why-it-matters text, and confidence before technical details.
- Kept Technical Provenance collapsed by default and preserved the existing Source Discovery -> Reference Graph -> ICE_REFERENCE_ROLES trace.
- Added optional Page Summary / Source Description display from existing current-page metadata/DOM/source capture when available, without inventing fallback summaries.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 16:55 - pcdx - Add reference role provenance trace
Summary:
- Added compact expandable provenance details for Reference Role source titles such as `Redeemer`.
- Provenance now shows Source Discovery -> Reference Graph -> ICE_REFERENCE_ROLES plus sourceDiscoveryId, referenceGraph edge id, href, source label text, scopePath, verseRef, adapter, and confidence when available.
- Related Semantic Layers labels for Reference Roles and Reference Graph edges now carry compact provenance context.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 16:20 - pcdx - Refine semantic resolution trace display
Summary:
- Added compact expandable Semantic Resolution Trace blocks to Passage Functions, Revelation Patterns, Reference Roles, Semantic Ontology Roles, and Semantic Ambiguities / Contrasts.
- Trace blocks now show Source Input, Resolved Output, Layers Used, Evidence Used, Ambiguity Check, and Confidence using existing semantic data only.
- Preserved source phrase vs derived meaning split, divine display compliance, HOLY SPIRIT preference, Class hierarchy, and JESUS / JESUS CHRIST / CHRIST distinction.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-21 17:38 - pcdx - Add semantic confidence styling
Summary:
- Added restrained visual confidence styling for explicit, probable, possible, attributed, and unresolved confidence levels.
- Implemented section-level hooks on existing Study Panel `Confidence` sections without changing semantic records or confidence text.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- Manual smoke: reviewed CSS diff for readable, restrained, non-alarming confidence styling

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 21:22 - pcdx - Add semantic visual ontology styling
Summary:
- Added restrained visual ontology styling for source phrases, derived meanings, Divine Class I, Class II messenger, Class III Human, adversarial Class ÃƒÆ’Ã‚Â°Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“, and authority transfer paths.
- Kept styling accessible and low-contrast enough to support review without overwhelming semantic cards.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- Manual smoke: reviewed CSS diff for readable, restrained source/derived and class-transfer styling

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 20:24 - pcdx - Correct Class ÃƒÆ’Ã‚Â°Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ hierarchy display
Summary:
- Corrected adversarial hierarchy display to italic lowercase `Class ÃƒÆ’Ã‚Â°Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“` so it cannot visually collapse with Divine `Class I`.
- Updated class-transfer CSS hooks to use `ice-class-i-divine` and added `ice-class-i-adversary` for future visual hierarchy styling.
- Updated project state hierarchy notes.

Files touched:
- `background.js`
- `study.js`
- `study.css`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 20:17 - pcdx - Add class transfer display
Summary:
- Added derived Authority Path / Class Transfer display for THE LORD -> AngEL Of THE LORD -> Joseph and Class I -> Class II -> Class III.
- Mounted the display on Divine Message Instruction, Revelation Pattern, and Origin / Authority Path cards.
- Added CSS hooks for class-level and transfer-action styling while keeping the visual treatment restrained.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 19:19 - pcdx - Refine divine CHILD display
Summary:
- Added contextual derived-display handling so revealed/divine CHILD references render as `CHILD` when connected to JESUS, HOLY SPIRIT conception, mission, or NAME context.
- Preserved quoted source phrase casing and avoided global child capitalization.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 19:12 - pcdx - Refine semantic ambiguity display
Summary:
- Refined Study Panel `Semantic Ambiguities / Contrasts` cards with readable contrast labels, source phrase, derived meaning, resolved status, why-it-matters summary, confidence, source grounding, and expandable evidence.
- Kept the change display-only and preserved all `ICE_SEMANTIC_AMBIGUITIES` records.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `semanticAmbiguities: 5`

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 18:57 - pcdx - Add semantic ambiguity layer
Summary:
- Added Phase 8.2o `ICE_SEMANTIC_AMBIGUITIES` derived layer for resolved semantic contrasts and context-required interpretation points.
- Added Matthew 1 pilot contrasts for JESUS / JESUS CHRIST, CHRIST / revealed NAME, Holy Ghost / HOLY SPIRIT, scripture narrator / divine authority source, and pronoun referent context.
- Added Study Panel `Semantic Ambiguities / Contrasts` cards and Matthew 1 QA coverage.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `semanticAmbiguities: 5`

Commit:
- This commit

Status:
- Implemented
## 2026-05-20 18:48 - pcdx - Add semantic ontology roles
Summary:
- Added Phase 8.2n `ICE_ONTOLOGY_ROLES` derived layer for ontology-aware roles such as NAME, title, office, authority, messenger, Human response, mission role, fulfillment role, lineage role, and semantic origin role.
- Added Matthew 1 pilot records for JESUS, CHRIST, JESUS CHRIST, THE LORD, AngEL Of THE LORD, Joseph, Mary, HOLY SPIRIT, scripture narrator, and quoted prophet.
- Added Study Panel `Semantic Ontology Roles` cards and Matthew 1 QA coverage.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `ontologyRoles: 10`

Commit:
- This commit

Status:
- Implemented
## 2026-05-12 - pcdx - Add multi-agent identity/logging convention

Summary:
- Recorded naming convention for PC/mobile GPT and Codex lanes.
- Added repo-visible activity logging protocol so separate contexts can coordinate through repository files.

Files touched:
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- Pending `git diff --check`

Commit:
- Not committed yet

Status:
- Implemented

## 2026-05-12 - pcdx - Add standing repo-memory read/write instruction

Task:
- Record standing instruction that all I.C.E. actors read project memory before work and append meaningful work updates afterward.

Files changed:
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `git diff --check` passed

Commit:
- This commit

Next recommended step:
- Push/pull repo so `mcdx`, `gpt`, and `mgpt` can read the standing instruction from repo memory.

Status:
- Committed
## 2026-05-12 - pcdx - Investigate mcdx find-me file path negotiation

Task:
- Look for a new mcdx-created "find me" file and verify whether desktop and mobile Codex are seeing the same repo path/remote state.

Files changed:
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- Checked local git status/log.
- Fetched `origin`.
- Checked remote branches and searched tracked remote files for find/mcdx/mobile markers.

Commit:
- Not committed yet

Next recommended step:
- Push pcdx commits to origin so mcdx can see repo memory files, then ask mcdx for its branch/commit hash if the "find me" file still does not appear.

Status:
- Investigated; file not found locally or on `origin/master`
## 2026-05-12 - pcdx - Record mcdx shell proxy limitation

Task:
- Record current MCDX repo/network status after mobile Codex confirmed local repo-memory access but shell GitHub operations remain blocked.

Files changed:
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- User-provided MCDX status confirms local branch `work`, latest local commit `8ea1156`, repo-memory files present locally, and origin URL correct.
- MCDX shell commands `git ls-remote`, `git fetch`, `git pull`, `git push`, and raw GitHub curl fail due proxy HTTPS CONNECT 403.

Commit:
- This commit

Next recommended step:
- Continue using manual patch bridge for MCDX shell work until proxy allows HTTPS CONNECT to GitHub endpoints. PCDX remains desktop push/pull bridge.

Status:
- Documented
## 2026-05-13 03:00 - mcdx - Add optional live page overlay

Task:
- Implement the previously planned lightweight page overlay/sidebar without replacing `content.js` or `engine.js`.

Files changed:
- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `pageOverlay.js`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check background.js content.js engine.js popup.js study.js pageOverlay.js qa/matthew1-extension-qa.js` passed via individual checks in MCDX.
- `git diff --check` passed in MCDX.
- `npm run qa:matthew1` blocked because Playwright is not installed in MCDX.
- `npm install` blocked by npm registry/proxy 403 for `playwright` in MCDX.

Commit:
- MCDX local commit `da46522`; bridged by PCDX in this desktop commit.

Next recommended step:
- PCDX should validate and push because MCDX shell GitHub push remains blocked by proxy 403.

Status:
- Implemented locally by MCDX and bridged by PCDX.
## 2026-05-12 - pcdx - Bridge mcdx optional page overlay

Task:
- Apply MCDX local commit `da46522` through the desktop patch bridge, validate it, and prepare it for GitHub push.

Files changed:
- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `pageOverlay.js`
- `package-lock.json`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check` passed for `background.js`, `content.js`, `engine.js`, `popup.js`, `study.js`, `pageOverlay.js`, and `qa/matthew1-extension-qa.js`.
- `manifest.json` and `package.json` JSON parse checks passed.
- `git diff --check` passed.
- Installed Playwright dependencies with `npm.cmd install` and `npx.cmd playwright install chromium`.
- `npm.cmd run qa:matthew1` passed on PCDX with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1.

Commit:
- This commit

Next recommended step:
- Push to `origin/master`, then have MCDX read the GitHub repo-browser copy because MCDX shell GitHub access remains proxy-blocked.

Status:
- Validated and ready to push
## 2026-05-13 - mcdx - Report Playwright QA readiness

Task:
- Improve the Matthew 1 QA harness so missing Playwright still writes a structured QA bundle and reports setup readiness cleanly.

Files changed:
- `qa/matthew1-extension-qa.js`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- MCDX local commit `7165634` reported the change locally, but MCDX shell GitHub push remains blocked by proxy 403.
- PCDX recreated the described harness behavior from the MCDX status report.

Commit:
- MCDX local commit `7165634`; bridged by PCDX in this desktop commit.

Next recommended step:
- PCDX should validate and push the QA-readiness harness update to `origin/master`.

Status:
- Implemented locally by MCDX and bridged by PCDX.
## 2026-05-13 - mcdx - Add direct agent outbox

Task:
- Create a quick direct-message lane for actor-to-actor handoffs, especially MCDX-to-PCDX instructions.

Files changed:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- MCDX reported `git diff --check` passed locally.
- MCDX local commit `e8c9567` created the outbox, but MCDX shell GitHub push remains blocked by proxy 403.
- PCDX recreated and bridged the described outbox convention on desktop.

Commit:
- MCDX local commit `e8c9567`; bridged by PCDX in this desktop commit.

Next recommended step:
- Use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for short direct handoff messages and keep `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` for completed work history.

Status:
- Implemented locally by MCDX and bridged by PCDX.
## 2026-05-13 05:20 - mcdx - Add repo-visible QA status snapshot

Task:
- Add a concise QA readiness snapshot so `gpt`, `mgpt`, `pcdx`, and `mcdx` can quickly see current QA commands, supported QA, latest known desktop validation, blockers, and bridge workflow.

Files changed:
- `QA status.MD`
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- MCDX reported `node --check background.js content.js engine.js popup.js study.js pageOverlay.js qa/matthew1-extension-qa.js` passed via individual checks.
- MCDX reported `python3 -m json.tool manifest.json` passed.
- MCDX reported `python3 -m json.tool package.json` passed.
- MCDX reported `git diff --check` passed.
- MCDX reported `npm run qa:matthew1` wrote `qa-output/latest-qa-bundle.json` and exited with `failureType: missing-playwright` because Playwright is not installed in MCDX.

Commit:
- MCDX local commit `7f48316`; bridged by PCDX in this desktop commit.

Next recommended step:
- PCDX should bridge this commit to GitHub if MCDX shell GitHub access remains blocked by proxy CONNECT 403.

Status:
- Implemented locally by MCDX and bridged by PCDX.

## 2026-05-14 - pcdx - Add mgpt orchestration roadmap

Task:
- Add a repo-readable onboarding and roadmap file for `mgpt` so mobile GPT can plan and instruct `mcdx` without needing full original thread context.

Files changed:
- `THREAD_ARCHIVE/MGPT_ORCHESTRATION_ROADMAP.md`
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`, and `THREAD_ARCHIVE/AGENT_OUTBOX.md` first.
- `git diff --check` passed.

Commit:
- This commit

Next recommended step:
- Have `mgpt` and `mcdx` read `THREAD_ARCHIVE/MGPT_ORCHESTRATION_ROADMAP.md` before drafting mobile-side tasks.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add scope integrity layer

Task:
- Begin Phase 7.4 ScopePath + Verse Position Integrity by strengthening the derived scope layer across DOM hints, mentions, semantic events, relationships, canonical identities, and semantic flow chains.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`, and `THREAD_ARCHIVE/AGENT_OUTBOX.md` first.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- First `npm run qa:matthew1` was blocked by PowerShell execution policy; reran with `npm.cmd`.
- First sandboxed `npm.cmd run qa:matthew1` was blocked by network access; reran with web access.
- One QA pass exposed a numeric scope slug bug; fixed and reran.
- Final `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, scope integrity 503 scoped items and 0 missing scope.

Commit:
- This commit

Next recommended step:
- Review `qa-output/latest-qa-bundle.json` locally if detailed scope samples are needed, but keep generated QA output uncommitted.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add current-page source discovery index

Task:
- Begin Phase 7.5 Current-Page Source Discovery Index by adding adapter-aware current-page link/reference discovery without broad crawling.

Files changed:
- `content.js`
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check content.js` passed.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- Initial `npm.cmd run qa:matthew1` found 136 source discovery refs but failed the exact `note.20a` assertion; fixed LDS note scope parsing for `#note20_a` and reran.
- Final `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, scope integrity 639 scoped items and 0 missing scope.

Commit:
- This commit

Next recommended step:
- Use `ICE_SOURCE_DISCOVERY_INDEX` for current-page reference inventory only; future crawling/fetching should remain explicitly scoped as a separate task.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add entity class labels to role groups

Task:
- Begin Phase 7.5a Entity Class Display Refinement by showing existing entity class labels inside Detected Entities / Roles cards.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136.

Commit:
- This commit

Next recommended step:
- Keep future formalized exaltation rendering separate; this change only surfaces existing display classification in role groups.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add reference graph layer

Task:
- Begin Phase 7.7 Reference Graph Layer by deriving graph-style current-page reference edges from `ICE_SOURCE_DISCOVERY_INDEX`.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.
- Reference graph QA sample counts: has_cross_reference 42, has_study_note 36, has_chapter_navigation 32, has_source_collection_link 23, has_table_of_contents_link 3.

Commit:
- This commit

Next recommended step:
- Keep reference graph current-page only until a separately scoped cross-document fetch/crawl phase is approved.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add reference graph focus view

Task:
- Begin Phase 7.8 Reference Graph Focus / Navigation View by grouping and filtering existing `ICE_REFERENCE_GRAPH` edges in the Study Panel.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Next recommended step:
- Keep Reference Graph navigation current-page only; linked-page fetching/crawling should remain a separately scoped future phase.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Record repo-visible result summary convention

Task:
- Record Dennis's standing instruction that PCDX should paste future task results into repo memory in the same concise final-summary format so GPT can review them directly in the repository.

Files changed:
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `git diff --check` passed.

Commit:
- This commit

Next recommended step:
- After future PCDX task completions, keep final result summaries in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` and place current direct handoffs in `THREAD_ARCHIVE/AGENT_OUTBOX.md`.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add verse scope focus view

Task:
- Begin Phase 7.9 Verse Scope Focus View by adding a Study Panel section that appears for verse/scope searches and groups all matching scoped data buckets.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added `Verse Scope Focus` in the Study Panel for verse/scope searches such as `1:20`, `1:21`, `verse.20`, `Matthew 1:20`, and `scripture.nt.matthew.1.verse.20`.
- The focus view groups DOM hints, mentions, semantic events, relationship graph edges, source discovery refs, reference graph edges, and semantic flow-chain nodes tied to the matching scope.
- No extraction logic, crawling, linked-page fetches, or existing panel rewrites were added.

Next recommended step:
- Use the focus view to inspect Matthew 1 verse scopes, especially verse 20 and verse 21, before adding any cross-document reference fetching.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Add entity scope focus view

Task:
- Begin Phase 8.0 Scope-Aware Entity/Reference Focus by adding a Study Panel section that appears for entity/canonical/mention searches and groups related scoped data.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added `Entity Scope Focus` in the Study Panel for entity searches such as `Joseph`, `JESUS`, `THE LORD`, `Angel of THE LORD`, `Mary`, and `Matthew`.
- The focus view shows identity/canonical data, class label, aliases/surface forms, scope/verse presence, semantic events, relationship graph edges, mention entries, scoped source/reference edges, and semantic flow-chain nodes.
- Source Discovery and Reference Graph entries are connected by shared normalized verse/note scope paths; no linked-page fetching or crawling was added.
- `Verse Scope Focus` remains unchanged.

Next recommended step:
- Use entity searches for Joseph, Angel of THE LORD, and JESUS to inspect whether entity-scoped references and pronoun mentions are sufficiently useful before adding deeper pronoun/entity resolution.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Post Phase 8.0 approval request

Task:
- Post the Phase 8.0 Scope-Aware Entity/Reference Focus approval request into repo-visible memory so Dennis and GPT can review it without chat repaste.

Files changed:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `git diff --check` passed.

Commit:
- This commit

Result summary for repo review:
- Added a top `pcdx -> Dennis/gpt` outbox request asking for approval of Phase 8.0 as the completed entity-focus layer.
- Included the commit, files changed, validation results, QA counts, no-crawl/no-render-change caveats, and recommended review searches.

Next recommended step:
- Dennis/GPT should approve Phase 8.0 or request targeted refinements based on searches for Joseph, Angel of THE LORD, and JESUS.

Status:
- Posted by PCDX.

## 2026-05-14 - pcdx - Add narrative timeline layer

Task:
- Begin Phase 8.1 Scope-Aware Narrative Timeline Layer by adding a Study Panel section that shows event progression and semantic causality from existing ordered/semantic data.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Read `PROJECT_STATE.md`, `PROJECT_LOG.md`, `QA status.MD`, `THREAD_ARCHIVE/AGENT_OUTBOX.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` first.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added `Narrative Timeline` in the Study Panel to show current-page event progression from ordered events and semantic events.
- Timeline steps include scope labels, entity presence, semantic event previews, relationship graph edges, and semantic flow-chain links/nodes where available.
- Entity and verse/scope searches filter the timeline by reusing the existing Entity Scope Focus and Verse Scope Focus matching helpers.
- No extraction logic, crawling, linked-page fetches, page rendering changes, or existing panel rewrites were added.

Next recommended step:
- Review Matthew 1 timeline searches for `Joseph`, `Angel of THE LORD`, `JESUS`, and `1:20` before deciding whether to add deeper pronoun/entity resolution or timeline-specific QA assertions.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Refine narrative timeline display wording

Task:
- Refine Phase 8.1 Narrative Timeline wording and relationship attachment after QA review.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Changed Narrative Timeline display wording from `Step` to `Moment`, including `Timeline moments` and `Moment N` titles.
- Removed position-only relationship attachment that could leak lineage edges such as Abia -> Asa into unrelated narrative moments.
- Relationship edges now attach to a narrative moment only through specific scope/verse/evidence matches or when both edge participants appear in that moment's semantic events.
- Internal timeline identifiers remain unchanged; extraction, crawling, linked-page fetching, page rendering, and existing panels were not changed.

Next recommended step:
- Recheck Matthew 1 narrative moments for Joseph, Angel of THE LORD, JESUS, and lineage/genealogy separation before adding timeline-specific QA assertions.

Status:
- Implemented by PCDX.

## 2026-05-14 - pcdx - Fix scope normalization in timeline views

Task:
- Fix critical Study Panel render error where scope-aware timeline code assumed `entry.scopes` was always an array.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added `normalizeScopeList()` to normalize undefined, null, string, Set, array, and object-shaped scope values at render/helper boundaries.
- Applied scope normalization across Verse Scope Focus, Entity Scope Focus, Narrative Timeline, Reference Graph scope labels, entity scope matching, and narrative scope matching.
- Preserved scope values from `scope`, `scopePath`, `fromScopePath`, `sourceScopePath`, and `sourceContext.scopePath` instead of silently dropping them.
- Confirmed previous QA refinement remains in place: Narrative Timeline displays `Moment`, not `Step`, and relationship attachment no longer uses position-only matching that leaked lineage edges.

Next recommended step:
- Reopen Study Panel and verify searches for `Joseph`, `Angel of THE LORD`, `JESUS`, and `1:20` render without scope errors.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Tighten narrative timeline relevance

Task:
- Refine Phase 8.1 Narrative Timeline relationship and flow attachment so each Moment only shows relationships and flow nodes relevant to that narrative moment.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added broad-scope filtering so chapter/relationship/event/identity/mention scope paths cannot attach relationships to narrative moments by themselves.
- Added lineage isolation so lineage/father-son relationships remain out of non-lineage moments.
- Tightened relationship attachment to require narrow scope, verse ref, source phrase overlap, or participant match backed by narrow scope/source phrase relevance.
- Tightened flow node/link attachment to prefer linked semantic event IDs, narrow scope, verse ref, or source phrase overlap.
- Preserved `Moment` wording and existing extraction/page rendering behavior.

Next recommended step:
- Recheck Study Panel Narrative Timeline for `Joseph`, `Angel of THE LORD`, `JESUS`, and `1:20`, with special attention to Moment 1 relationship counts and genealogy separation.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Refine narrative timeline counts

Task:
- Refine Phase 8.1 Narrative Timeline count consistency so displayed relationship/flow counts match the compact preview items actually shown.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Narrative Timeline summary now reports displayed relationship edges and displayed flow links/nodes.
- Per-Moment metadata now counts the displayed compact relationship/flow preview items rather than larger attached candidate arrays.
- Existing relevance tightening remains in place: lineage isolation, no broad chapter leakage, and `Moment` display wording preserved.
- No extraction logic, crawling, linked-page fetching, page rendering rewrite, or existing panel rewrite was added.

Next recommended step:
- Recheck Moment 1, Moment 2, and Moment 3 in the Study Panel to confirm displayed counts match the visible compact relationships and flow previews.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Refine source preview and canonical display

Task:
- Refine Study Panel Source Discovery preview priority and Angel canonical display consistency.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with unchanged counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Source Discovery preview now prioritizes `study_note`, scoped verse/chapter refs, `cross_reference`, navigation/source refs, then external/other refs.
- Preview order changed only in Study Panel display; stored source discovery records and counts are unchanged.
- Added a conservative canonical display helper for angel labels, preferring existing Entity Registry / Canonical Identity display when available and normalizing safe angel display variants to `Angel of THE LORD`.
- No source phrase data, extraction logic, page rendering, crawling/fetching, or theological inference was changed.

Next recommended step:
- Recheck Study Panel Source Discovery and entity/relationship displays for Matthew 1 to confirm study notes appear first and Angel naming is consistent.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Add hierarchy ordering to narrative timeline

Task:
- Refine Narrative Timeline display with readable moment labels and hierarchy-aware entity ordering.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with unchanged counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Narrative Timeline cards now use readable labels such as scoped Matthew verse/range plus a compact moment topic.
- Entity previews now sort display labels by authority hierarchy: THE LORD/source authority first, Angel of THE LORD/divine messenger second, human actors and recipients next, with birth/naming focus handled separately.
- Existing canonical Angel display remains `Angel of THE LORD`.
- No extraction logic, stored entity arrays, page rendering, crawling/fetching, or existing panel rewrite was added.

Next recommended step:
- Recheck Matthew 1 Narrative Timeline cards for `1:20`, `Joseph`, `Angel of THE LORD`, and `JESUS` to confirm the visual order and moment labels match the intended review flow.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Refine AngEL Of THE LORD display spelling

Task:
- Update Study Panel display spelling for the Angel of THE LORD to Dennis's preferred `AngEL Of THE LORD` casing.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with unchanged counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Study Panel canonical angel display now renders safe variants as `AngEL Of THE LORD`.
- Class II example display now uses `AngEL Of THE LORD`.
- This is display-only; extraction logic, source phrases, stored semantic records, page rendering, crawling/fetching, and QA assertions were not changed.

Next recommended step:
- Recheck Study Panel role groups, Entity Scope Focus, and Narrative Timeline for `AngEL Of THE LORD` display consistency.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Refine narrative timeline meaning

Task:
- Refine Narrative Timeline display so Matthew 1 reads in readable narrative meaning order instead of raw technical grouping.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with unchanged counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Matthew 1 Narrative Timeline now presents six readable display-derived moments: genealogy, Mary found with child, Joseph pondering, AngEL Of THE LORD instruction, fulfillment declared, and Joseph obedience/naming.
- Moment cards now include `Category` and `Meaning` above the compact technical Events / Relationships / Flow / Entities details.
- The AngEL instruction moment explicitly carries hierarchy-aware entity display with `THE LORD`, `AngEL Of THE LORD`, `Joseph`, and `Mary` visible.
- Generic timeline behavior remains available for other pages/chapters.
- No extraction logic, stored source phrases, page rendering, crawling/fetching, or QA expectations were changed.

Next recommended step:
- Recheck Study Panel Narrative Timeline for Matthew 1 with no filter, then search `1:20`, `Joseph`, and `AngEL Of THE LORD` to confirm the display order matches the intended review flow.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Document passage function layer roadmap

Task:
- Add roadmap documentation for future Phase 8.2 Passage Function / Narrative Purpose Layer without implementing the layer yet.

Files changed:
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `git diff --check` passed.

Commit:
- This commit

Result summary for repo review:
- Documented future derived storage key options: `ICE_PASSAGE_FUNCTIONS` or `ICE_NARRATIVE_PURPOSES`.
- Captured the proposed record shape, Matthew 1 examples, reusable passage function types, and implementation direction.
- Clarified that the layer should identify why a passage exists, not only what events occur.
- Clarified that this should become a reusable derived semantic layer, not hard-coded cards for every passage.
- No application code, extraction logic, QA behavior, source phrases, page rendering, crawling/fetching, or storage writes were changed.

Next recommended step:
- Use this roadmap when GPT/mgpt/pcdx next define Phase 8.2 implementation scope and QA assertions.

Status:
- Documented by PCDX.

## 2026-05-15 - pcdx - Clarify narrative timeline display layer

Task:
- Mark current readable Narrative Timeline labels as temporary display-derived labels until the future Passage Function / Narrative Purpose Layer is implemented.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with unchanged counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit:
- This commit

Result summary for repo review:
- Added a visible Study Panel note under Narrative Timeline: `Narrative labels are display-derived from current semantic data; future passage-function layer will generalize this.`
- Renamed the Matthew 1 display helper to make its temporary/presentation-only purpose clear for future agents.
- Kept current readable labels and generic fallback behavior intact.
- No extraction logic, source phrases, stored semantic records, page rendering, crawling/fetching, or QA count expectations were changed.

Next recommended step:
- Treat current Matthew 1 labels as useful review scaffolding until Phase 8.2 implements reusable `ICE_PASSAGE_FUNCTIONS` or `ICE_NARRATIVE_PURPOSES` records.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Close Phase 8.1 and document passage function layer

Task:
- Close/supersede the old Phase 8.1 Narrative Timeline outbox directive and confirm the next Phase 8.2 roadmap direction is documented.

Files changed:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `git diff --check` passed.

Commit:
- This commit

Result summary for repo review:
- Marked the old Phase 8.1 Narrative Timeline outbox item as done / superseded.
- Added an outbox completion note summarizing the completed Phase 8.1 refinement path: narrative timeline layer, Moment wording, scope normalization, relationship relevance tightening, displayed count consistency, source preview/canonical display refinement, hierarchy-aware entity ordering, and AngEL Of THE LORD display spelling.
- Confirmed the latest AngEL Of THE LORD display spelling activity entry is complete and not truncated.
- Confirmed Phase 8.2 Passage Function / Narrative Purpose Layer is already documented as roadmap only with potential keys `ICE_PASSAGE_FUNCTIONS` or `ICE_NARRATIVE_PURPOSES`.
- No application code, extraction logic, QA behavior, source phrases, page rendering, crawling/fetching, or storage writes were changed.

Next recommended step:
- Use the Phase 8.2 roadmap to define a reusable passage-purpose derived layer before replacing the current display-derived Matthew 1 labels.

Status:
- Completed by PCDX.

## 2026-05-15 - pcdx - Add passage function scaffolding

Task:
- Begin Phase 8.2 by adding the `ICE_PASSAGE_FUNCTIONS` structural derived-layer foundation without generalized theological reasoning, crawling/fetching, extraction rewrites, or Narrative Timeline rewrites.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 172
- Entity registry: 46
- Relationship graph: 61
- Canonical identities: 48
- Semantic events: 48
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Scope integrity: 779 scoped items, 0 missing scope

Commit:
- This commit

Result summary for repo review:
- Added `ICE_PASSAGE_FUNCTIONS` as a derived storage key and status count.
- Added four conservative Matthew 1 pilot records grounded in existing source/semantic data: genealogy identity, divine message instruction, prophecy fulfillment identification, and obedient response/naming.
- Added the Study Panel `Passage Functions` section and diagnostics count.
- Added QA assertions that each pilot record has scope, verse range, meaning, evidence, confidence, and source grounding.
- Included passage functions in scope integrity as a derived layer.
- Did not add broad AI reasoning, crawling/fetching, extraction rewrites, page rendering changes, or permanent hard-coded passage cards.

Next recommended step:
- Review the pilot records in `qa-output/latest-qa-bundle.json` and the Study Panel, then decide how Phase 8.2 should generalize passage functions beyond Matthew 1.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Add Study Panel review snapshot

Task:
- Create a repo-readable text snapshot of the current Matthew 1 Study Panel / QA data so Dennis and GPT can review it without copying the full UI panel by hand.

Files changed:
- `THREAD_ARCHIVE/STUDY_PANEL_REVIEW_SNAPSHOT.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `npm.cmd run qa:matthew1` passed before snapshot generation.
- `git diff --check` passed.

QA counts:
- DOM hints: 173
- Mention index: 172
- Entity registry: 46
- Relationship graph: 61
- Canonical identities: 48
- Semantic events: 48
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Scope integrity: 779 scoped items, 0 missing scope

Commit:
- This commit

Result summary for repo review:
- Added a committed markdown snapshot generated from `qa-output/latest-qa-bundle.json`.
- Included copy-format summary, counts, failures, active adapter, analysis status, scope integrity, passage functions, key semantic samples, source discovery, reference graph, and HTML samples.
- Left generated `qa-output/` uncommitted.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Add passage function evidence view

Task:
- Begin Phase 8.2c by making `ICE_PASSAGE_FUNCTIONS` visibly evidence-centered in the Study Panel.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 172
- Entity registry: 46
- Relationship graph: 61
- Canonical identities: 48
- Semantic events: 48
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4

Commit:
- This commit

Result summary for repo review:
- Passage Function cards now show meaning, fulfillment meaning, evidence bullets, themes, related entities, confidence, source grounding, and scope.
- This is display-only: existing pilot records, extraction logic, QA counts, source phrases, crawling/fetching behavior, and reasoning scope are unchanged.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Add passage function search focus

Task:
- Begin Phase 8.2d by integrating `ICE_PASSAGE_FUNCTIONS` into the Study Panel search/filter experience.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 172
- Entity registry: 46
- Relationship graph: 61
- Canonical identities: 48
- Semantic events: 48
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4

Commit:
- This commit

Result summary for repo review:
- Passage Function search now includes `passageFunction`, `verseRange`, `scopePath`, `plainMeaning`, `fulfillmentMeaning`, `evidence`, `linkedThemes`, `relatedEntities`, `relatedProphecies`, `confidence`, and `sourceGrounding`.
- No-search view still shows all Passage Function cards.
- Empty filtered state now says `No passage functions match current filter.`
- This is display/search integration only; records, reasoning scope, extraction, crawling/fetching, and QA counts are unchanged.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Preserve JESUS naming distinction

Task:
- Correct Matthew 1 naming/instruction semantics so narrative-time naming and name revelation preserve `JESUS`, while canonical identity may remain `JESUS CHRIST`.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 174
- Entity registry: 48
- Relationship graph: 64
- Canonical identities: 50
- Semantic events: 50
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Scope integrity: 788 scoped items, 0 missing scope

Commit:
- This commit

Result summary for repo review:
- Added `name_revelation` and `mission_reason_declaration` semantic events for Matthew 1:21.
- Kept marriage instruction distinct from name revelation and mission reason.
- Preserved relationship display targets as `JESUS` for narrative naming/name-revelation edges while canonical identity linking to `JESUS CHRIST` remains available.
- Updated `divine_message_instruction` Passage Function wording/evidence to say AngEL Of THE LORD instructs Joseph to take Mary as wife and call the child JESUS, with mission meaning: He shall save His people from their sins.
- QA now asserts the name revelation preserves `JESUS`, mission reason is scoped to Matthew 1:21, and Joseph naming targets `JESUS`.

Status:
- Implemented by PCDX.

## 2026-05-15 - pcdx - Add revelation sub-event clustering

Task:
- Resume Phase 8.2e Multi-Instruction / Multi-Revelation Separation after crash/relaunch and verified D: repo realignment.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- Confirmed repo root `D:/Documents/I.C.E.project`, branch `master`, remote `DennisWPaulsenJR/I.C.E.project`, and HEAD `cfbc800 pcdx: Preserve JESUS naming distinction` before resuming.
- Recovered interrupted partial edits in `background.js`, `study.js`, and `qa/matthew1-extension-qa.js`; kept and completed them.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Scope integrity: 800 scoped items, 0 missing scope

Result summary for repo review:
- Added `conception_revelation` for `that which is conceived in her is of the Holy Ghost`.
- Added derived `divine_message_cluster` semantic events with sub-events ordered as marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Preserved narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display wording, confidence, and source grounding.
- Study Panel Narrative Timeline now shows compact clustered revelation previews.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Add revelation pattern layer

Task:
- Implement Phase 8.2f Revelation Pattern / Speech Structure Layer.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Validation:
- Confirmed repo root `D:/Documents/I.C.E.project`, branch `master`, remote `DennisWPaulsenJR/I.C.E.project`, and HEAD `58331d0 pcdx: Add revelation sub-event clustering` before starting.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Scope integrity: 801 scoped items, 0 missing scope

Result summary for repo review:
- Added `ICE_REVELATION_PATTERNS` as a derived semantic layer for structured speech/revelation blocks.
- Matthew 1 pilot pattern records THE LORD as authority source, AngEL Of THE LORD as speaker, Joseph as recipient, and four ordered sub-events: marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Study Panel now includes a compact `Revelation Patterns` section with authority, speaker, recipient, verse range, ordered sub-events, evidence, confidence, and source grounding.
- No crawling/fetching, broad NLP rewrite, page rendering rewrite, or canonical identity collapse was added.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Refine passage function display

Task:
- Refine Study Panel Passage Functions into readable semantic cards.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1

Result summary for repo review:
- Passage Function cards now render with clear sections for meaning, fulfillment meaning, themes, key evidence, related entities, related prophecies, confidence, source grounding, and scope.
- Related entities are display-sorted in hierarchy-aware order while preserving `JESUS` and `JESUS CHRIST` as distinct labels when present.
- Evidence is displayed as bullets with hidden-count support.
- This is display-only; no semantic data, extraction, reasoning, crawling/fetching, evidence, confidence, or source grounding was removed.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Refine revelation pattern display

Task:
- Refine Study Panel Revelation Patterns into readable semantic cards.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1

Result summary for repo review:
- Revelation Pattern cards now render with clear sections for authority source, speaker, recipient, pattern type, ordered revelation parts, evidence, related entities, confidence, and source grounding.
- Ordered revelation parts show numbered semantic parts with source phrases.
- Related entities are hierarchy-aware and preserve the display distinction between revealed `JESUS` and canonical `JESUS CHRIST` where relevant.
- This is display-only; no semantic records, extraction, reasoning, crawling/fetching, evidence, confidence, or source grounding changed.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Add semantic reference roles

Task:
- Begin Phase 8.2g Semantic Reference Role Layer.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Recovered partial changes:
- Reused the interrupted `background.js` reference-role scaffold.
- Removed one duplicate `ICE_REFERENCE_ROLES` declaration left by the partial edit.
- Preserved role scope paths during scope-integrity enrichment.
- No partial work was discarded.

Result summary for repo review:
- `ICE_REFERENCE_ROLES` now explains why selected discovered references are attached to Matthew 1 scopes.
- The pilot includes davidic lineage support, Abrahamic covenant support, prophecy fulfillment support, messianic identity support, and name meaning support.
- Study Panel now includes Reference Roles cards with discovered reference, semantic role, themes, entities, passage functions, evidence, confidence, source grounding, and scope.
- This is a derived layer only; no crawling/fetching or broad extraction rewrite was added.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Refine divine display compliance

Task:
- Apply I.C.E. display capitalization compliance for divine pronouns/titles in Study Panel derived layers.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 151
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20
- Scope integrity: 799 scoped items, 0 missing scope

Result summary for repo review:
- Study Panel derived cards now apply context-gated divine display compliance for divine mission/name phrasing such as `HE shall SAVE HIS People from their sins` and `HIS name JESUS`.
- The pass covers Passage Functions, Revelation Patterns, Reference Roles, and Narrative Timeline display previews.
- Stored source text, extracted phrases, semantic records, source grounding, crawling/fetching behavior, and page rendering behavior were not changed.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - pcdx - Refine reference roles display

Task:
- Refine Study Panel Reference Role cards into readable semantic sections.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Result summary for repo review:
- Reference Role cards now show Role, Reference, Semantic Purpose, Linked Themes, Linked Passage Functions, Linked Entities, Evidence, Confidence, Source Grounding, and Scope.
- Semantic purpose text is display-only and derived from existing role values.
- Stored `ICE_REFERENCE_ROLES` records, source text, hrefs, counts, and divine display compliance were preserved.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - pcdx - Clarify CHRIST title distinction

Task:
- Correct Study Panel display wording so CHRIST / JESUS CHRIST appears as title/source/canonical identity, not Joseph's narrative naming action.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 151
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Result summary for repo review:
- Derived Study Panel cards now explicitly distinguish narrative name `JESUS` from canonical/source-title identity `JESUS CHRIST`.
- Relationship and semantic-event previews avoid implying Joseph named the child `JESUS CHRIST`; Joseph naming displays as `JESUS` with canonical identity notes where needed.
- Stored semantic data, source phrases, extraction logic, source grounding, divine display compliance, and counts were preserved.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - pcdx - Reorder study panel review flow

Task:
- Reorder Study Panel sections into a coherent semantic investigation hierarchy.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Result summary for repo review:
- Study Panel now opens with semantic interpretation layers before technical extraction/debug sections.
- Existing sections remain intact; the change is ordering/display only.
- Render order now matches the DOM review hierarchy.
- No semantic data, extraction logic, counts, divine display compliance, or JESUS / JESUS CHRIST distinction behavior changed.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - pcdx - Rename semantic flow paths display

Task:
- Rename Study Panel display terminology from Semantic Flow Chains to Semantic Flow Paths.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow paths: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Result summary for repo review:
- Study Panel visible terminology now says Semantic Flow Paths / flow path.
- Internal `ICE_SEMANTIC_FLOW_CHAINS` storage and `semanticFlowChains` data alias remain unchanged for compatibility.
- No semantic data, extraction logic, flow relationships, scope integrity behavior, QA semantics, counts, divine display compliance, or JESUS / JESUS CHRIST distinction behavior changed.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - pcdx - Refine hierarchy compliance display

Task:
- Refine Study Panel hierarchy/exaltation formatting for narrator and semantic displays.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

QA counts:
- DOM hints: 173
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow paths: 1
- Source discovery: 136
- Reference graph: 136
- Passage functions: 4
- Revelation patterns: 1
- Reference roles: 20

Result summary for repo review:
- Study Panel hierarchy labels now use the required `Class I - ...` format.
- `Scripture narrator`, `narrator`, `prophet`, and `the prophet` display as `Class III - Human` in fallback related-entity contexts.
- Derived semantic displays now include hierarchy lines so narrator, prophet, THE LORD, AngEL Of THE LORD, JESUS, and JESUS CHRIST remain visually distinct.
- Stored semantic data, extraction logic, source grounding, divine display compliance, JESUS / JESUS CHRIST distinction behavior, and QA counts were preserved.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 21:30 - pcdx - Add semantic card compression
Summary:
- Added progressive-detail semantic cards so Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline, and Semantic Flow Paths keep compact default summaries while preserving expandable exhaustive detail.
- Preserved semantic data, extraction behavior, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST distinction.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-18 00:20 - pcdx - Add cross-layer semantic links
Summary:
- Added display-level related semantic layer buckets for Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline, and Semantic Flow Paths.
- Links are derived only from existing scope, verse, entity, passage-function, semantic-event, source-discovery, and reference-graph evidence.
- Preserved semantic data, extraction behavior, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST distinction.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 00:00 - pcdx - Add semantic navigation focus jumps
Summary:
- Converted related semantic layer entries into clickable Study Panel navigation buttons.
- Added focus jumps that can scroll to/open matching semantic cards or activate Verse Scope / Entity Scope focus through the existing search filter.
- Preserved semantic data, extraction behavior, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST distinction.

Files touched:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 14:05 - pcdx - Fix study panel navigation render error
Summary:
- Fixed Study Panel render crash caused by display helpers receiving object-shaped navigation/focus values after Phase 8.2j.
- Added object-safe display normalization before `.replace` display compliance paths.
- Preserved semantic navigation focus jumps and all semantic data behavior.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- Manual Study Panel reload smoke passed with Passage Functions 4, Revelation Patterns 1, Reference Roles 20, adapter `lds_scripture_adapter`, and no render error

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 14:40 - pcdx - Refine semantic navigation focus UX
Summary:
- Added a visible current semantic focus status line near the top of the Study Panel.
- Added Clear semantic focus reset behavior.
- Preserved normal search behavior by clearing semantic-focus status on manual search input.
- Confirmed semantic navigation clicks update status/search, scroll/highlight destinations, and reset cleanly.

Files touched:
- `study.html`
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- Manual Study Panel live-button smoke passed for Related Semantic Layers focus/highlight/reset behavior

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 15:10 - pcdx - Refine exaltation display compliance
Summary:
- Refined display-only exaltation wording for JESUS as revealed divine NAME.
- Rendered divine-context phrases such as `call HIS NAME JESUS` and `HE shall SAVE HIS People` while preserving human Class III display.
- Preserved JESUS / JESUS CHRIST / CHRIST distinction, AngEL Of THE LORD display, semantic records, source phrases, extraction logic, and QA counts.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- Manual Study Panel smoke passed with nonzero counts, `HIS NAME JESUS`, `HE shall SAVE HIS People`, and `Class III - Human`

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 15:45 - pcdx - Add semantic distinction layer
Summary:
- Added `ICE_SEMANTIC_DISTINCTIONS` as a derived semantic contrast/distinction layer.
- Added Matthew 1 pilot distinctions for JESUS, CHRIST, JESUS CHRIST, HOLY SPIRIT, Holy Ghost, Scripture narrator, THE LORD, and AngEL Of THE LORD.
- Added a Study Panel `Semantic Distinctions` section and Matthew 1 QA assertions.
- Preserved source text, extraction logic, source grounding, confidence, hierarchy formatting, divine display compliance, and narrative-time/canonical distinctions.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `npm.cmd run qa:matthew1` passed with `semanticDistinctions: 8`
- `git diff --check` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 16:05 - pcdx - Normalize naming and reference display
Summary:
- Lowercased generic narrator/prophet labels in current generated semantic/display records, including `scripture narrator` and `quoted prophet`.
- Updated derived HOLY SPIRIT summaries/entities while preserving direct `Holy Ghost` source phrase/evidence wording.
- Kept section headings and approved exalted/I.C.E. terms intact.
- Reviewed risky file rename candidates and left files in place; proposed a future coordinated rename pass for `QA status.MD`, `Rules.json`, and `DIVINE_TITLES.json`.

Files touched:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `semanticDistinctions: 8`

Commit:
- This commit

Status:
- Implemented

## 2026-05-19 16:35 - pcdx - Add origin authority paths
Summary:
- Added `ICE_ORIGIN_AUTHORITY_PATHS` as a derived semantic origin/authority path layer.
- Added Matthew 1 pilot path: THE LORD -> AngEL Of THE LORD -> Joseph -> obedient response -> JESUS is named.
- Displayed Origin / Authority Paths in the Study Panel with origin, messenger/means, recipient, response, result, mission, hierarchy, evidence, confidence, source grounding, and related semantic navigation.
- Preserved Class III - Human for Joseph and preserved divine display compliance, HOLY SPIRIT preference, and JESUS / JESUS CHRIST / CHRIST distinction.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `originAuthorityPaths: 1`

Commit:
- This commit

Status:
- Implemented
## 2026-05-19 17:20 - pcdx - Standardize source and derived displays
Summary:
- Added reusable source phrase / derived meaning display blocks in `study.js`.
- Applied the pattern across Passage Functions, Reference Roles, Semantic Events, Relationship Graph, Narrative Timeline snippets, Semantic Flow Paths, Origin / Authority Paths, and Semantic Distinctions.
- Preserved source quote casing and kept I.C.E. compliance in derived meaning lines.
- Preserved Human referents, JESUS / JESUS CHRIST / CHRIST distinction, HOLY SPIRIT derived preference, and stored semantic data.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with stable semantic counts

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 - pcdx - Refine semantic entity labeling
Summary:
- Replaced behavior-first Direct Actors terminology with Semantic Entities for the ontology/entity role display.
- Kept Direct Actors backward compatible as a legacy role group while rendering it as Semantic Entities.
- Added THE LORD, GOD, and AngEL Of THE LORD entity presence where authority/source context supports the semantic role.
- Added compact ontology path display for entity role cards and renamed lower technical Detected Actors to Actor Timelines.

Files touched:
- `background.js`
- `study.js`
- `study.css`
- `study.html`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed
- `node --check background.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with stable semantic counts

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 - pcdx - Add semantic relationship roles
Summary:
- Added `ICE_ENTITY_RELATION_ROLES` as a conservative Matthew 1 derived layer.
- Added 8 relationship-role records distinguishing source authority, messenger, recipient, obedient response, covenant participant, conception recipient, mission subject, narrative witness, and prophecy witness.
- Added Study Panel cards for Semantic Relationship Roles and connected the layer to scope integrity, diagnostics, cross-layer navigation, and QA.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `entityRelationRoles: 8`

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 - pcdx - Stabilize Matthew 2 semantic layers
Summary:
- Began Matthew 2 semantic stabilization after Study Panel review showed empty derived semantic layers despite timeline moments rendering.
- Added Matthew 2 semantic subevents and evidence-gated derived records for wise men, Herod, chief priests/scribes, CHILD/JESUS, AngEL Of THE LORD, Joseph, Bethlehem, and Egypt.
- Generalized divine message clustering for warning/protective instruction patterns.
- Added Matthew 2 Passage Functions, Revelation Patterns, Origin / Authority Paths, Ontology Roles, and Semantic Relationship Roles.
- Tightened Study Panel timeline labels to remove Matthew 1 naming fallback leakage.
- Added Matthew 2 QA harness and npm script.

Files touched:
- `background.js`
- `study.js`
- `package.json`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed`r`n- `node --check study.js` passed`r`n- `node --check qa/matthew2-extension-qa.js` passed`r`n- `git diff --check` passed`r`n- `npm.cmd run qa:matthew1` passed`r`n- `npm.cmd run qa:matthew2` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-23 - pcdx - Add cross-chapter semantic continuity
Summary:
- Added `ICE_SEMANTIC_CONTINUITY` as a conservative derived semantic layer for Matthew 1 -> Matthew 2 continuity.
- Derived Matthew 2 continuity records for Joseph, JESUS / CHILD, scripture narrator / quoted prophet, and Herod based on current semantic events, passage functions, ontology roles, authority paths, revelation patterns, relationship roles, and canonical identities.
- Added Cross-Chapter Semantic Continuity Study Panel section and diagnostics.
- Updated QA harness bundle counts/samples and Matthew 2 assertions.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `node --check qa/matthew2-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- `npm.cmd run qa:matthew2` passed

Commit:
- This commit

Status:
- Implemented

## 2026-05-23 - pcdx - Fix live Matthew 2 derived layer mismatch
Summary:
- Investigated live Study Panel mismatch where QA showed populated Matthew 2 derived semantic layers but live display showed zeros.
- Confirmed QA and live use the same background pipeline/storage keys; likely failure mode was stale extension/service-worker/content-script/storage state or popup completion before a reliable background pipeline run.
- Hardened popup full analysis so the background pipeline always runs after active-tab recapture.
- Added live diagnostics to analysis status, Study Panel diagnostics, and QA bundles.

Files touched:
- `background.js`
- `popup.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed
- `node --check popup.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `node --check qa/matthew2-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed
- `npm.cmd run qa:matthew2` passed

Manual live check needed after commit:
- Reload extension, reload Matthew 2, rerun analysis, open Study Panel, and compare diagnostic derived counts with QA.

Commit:
- This commit

Status:
- Implemented

## 2026-05-26 - pcdx - Add HOLY action process display consistency
- Refined Phase 8.3 derived semantic displays so Class I / HOLY-origin processes show HOLY ontology emphasis.
- Added process-path display for THE LORD -> AngEL Of THE LORD -> Joseph -> Instruction -> CHILD protection / fulfillment.
- Preserved source phrases, source truth distinction, app confidence wording, HOLY SPIRIT preference, JESUS / JESUS CHRIST distinction, CHILD display, and Class I / Class ÃƒÆ’Ã‚Â°Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ distinction.
## 2026-05-27 - pcdx - Refine Matthew 2 adversarial semantics
Summary:
- Implemented Phase 8.3a Matthew 2 adversarial/protective semantic refinement.
- Grounded Herod Class i semantics in troubled response, secret inquiry, deceptive worship wording, misuse of authority, and destroy-him intent.
- Added protective obedience / Divine preservation path details, repeated guidance cycles, location movement continuity, and Matthew 2 semantic contrast records.

Files touched:
- `background.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 - pcdx - Refine semantic contrast wording
Summary:
- Refined Study Panel Semantic Ambiguities / Contrasts wording from generic `vs` display to relationship-aware wording.
- Added readable display categories for related with, distinguished from, contrasted with, opposed by, source wording for, and derived meaning for.
- Preserved source phrase / derived meaning separation, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, Class I / Class i distinction, and underlying semantic records.

Files touched:
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 - pcdx - Add movement location semantics
Summary:
- Implemented Phase 8.3b Matthew 2 Movement / Location Semantic Layer.
- Added `ICE_MOVEMENT_SEMANTICS` as a derived semantic layer for movement, location, purpose, protection, and fulfillment.
- Added Study Panel Movement / Location Semantics display and diagnostics count.
- Added QA storage/count/sample support and Matthew 2 assertions for five grounded movement/location records.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 - pcdx - Refine primary entity classification
Summary:
- Replaced narrow flat Primary Entities display with shared classified Primary Entities / Characters rendering.
- Grouped entities by ontology hierarchy and added semantic role plus local evidence role text.
- Applied the display refinement across passage, revelation, relationship, authority path, principle, movement, continuity, and narrative timeline surfaces.

Files touched:
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 - pcdx - Fix ontology role separation
Summary:
- Fixed Primary Entities / Characters ontology-role separation.
- Replaced fuzzy classified display entity matching with exact entity matching plus explicit canonical/entity display handling.
- Added filtering for process, action, mission, and semantic summary strings before they can render as entity labels.
- Added class-consistent role rendering so THE LORD remains Class I source authority / HOLY origin and AngEL Of THE LORD remains Class II messenger / revelation carrier.

Files touched:
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Manual smoke checks passed for THE LORD role separation and entity candidate filtering.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 20:35 - pcdx - Rename app confidence to app accuracy
Summary:
- Refined Study Panel user-facing semantic accuracy wording to `App accuracy` across cards, traces, previews, and review posture text.
- Preserved stored confidence values, internal field names, CSS styling hooks, semantic records, source phrase / derived meaning separation, and ontology hierarchy.
- Clarified repo memory that App accuracy estimates I.C.E. semantic resolution accuracy, not source truth.

Files touched:
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Manual smoke search found no remaining targeted user-facing prior confidence-oriented wording.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-27 21:27 - pcdx - Add semantic causality layer
Summary:
- Implemented Phase 8.3c Semantic Sequence / Causality as `ICE_SEMANTIC_CAUSALITY`.
- Added Matthew 1 sequence for Divine revelation -> Joseph obedience -> JESUS naming -> mission/fulfillment meaning.
- Added Matthew 2 sequences for Herod threat -> Divine warning -> Joseph obedience -> CHILD preservation -> Egypt fulfillment, and threat-removal / warning -> guided return -> Nazareth fulfillment linkage.
- Added Study Panel cards, diagnostics, scope integrity, QA bundle counts/samples, and QA assertions for the new derived layer.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with semanticCausality: 1.
- `npm.cmd run qa:matthew2` passed with semanticCausality: 2.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-27 22:15 - pcdx - Refine generic adapter filtering
Summary:
- Refined `generic_html_adapter` Source Discovery so generic web pages display as Generic Web Semantic Mode instead of scripture-style semantic mode.
- Added structural context and semantic usefulness scoring for generic source refs.
- Collapsed low-value generic media/search chrome by default and kept those collapsed refs out of generic reference graph edges.
- Preserved LDS scripture adapter source discovery/reference graph behavior and App accuracy wording.

Files touched:
- `content.js`
- `background.js`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check content.js` passed.
- `node --check background.js` passed.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Manual synthetic generic/search smoke confirmed Images/Videos/YouTube collapse and ontology/semantic documentation remains visible.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-27 23:24 - pcdx - Refine semantic grounding wording
Summary:
- Refined App accuracy display wording from raw confidence values to semantic grounding language.
- Display translations now render explicit -> clear, probable -> highly grounded, possible -> grounded, weak/limited -> lightly grounded, attributed -> source-attributed, and unresolved -> unresolved / still evaluating.
- Preserved stored values, QA semantics, App accuracy labeling, source/derived separation, and semantic styling hooks.

Files touched:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Checks:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Manual smoke search found no direct user-facing raw App accuracy labels for probable/possible/explicit/source-markup in Study Panel source.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-27 23:55 - pcdx - Add volume session context
Summary:
- Added top-of-panel Volume Context display for active source/page, adapter, current/stale/not analyzed state, current chapter/page, previous analyzed pages, continuity, suggested next page, last analyzed time, and Matthew 1 + Matthew 2 QA baseline.
- Added `ICE_ANALYSIS_HISTORY` metadata so prior analyzed pages can be shown without rewriting or blending semantic records.
- Added user-driven Study Panel actions for analysis rerun, current analysis clear, all session data clear, analyzed-page navigation, and continuity-map navigation.

Files touched:
- `background.js`
- `study.html`
- `study.css`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `node --check background.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Manual structural smoke verified Volume Context render/action/storage wiring.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-28 00:40 - pcdx - Refine Matthew 3 study panel context and volume navigation
Summary:
- Added Matthew 3 baptism reference-role context that keeps Primary Referenced Being `JESUS`, canonical/source identity `JESUS CHRIST`, and related characters separate.
- Added transparent LDS chapter heading/page description provenance display as contextual guidance only, not scripture text or direct semantic evidence.
- Added Matthew 3 ontology roles for Class I and Class III entities in the baptism/preaching context.
- Refined Volume Context action labels and analysis target warning wording.
- Added `qa:matthew3` and expanded `qa:matthew-pages` to Matthew 1 -> Matthew 2 -> Matthew 3.

Files touched:
- `background.js`
- `content.js`
- `study.js`
- `package.json`
- `qa/matthew3-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check background.js` passed.
- `node --check content.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew-pages` passed.

Status:
- Implemented and validated

## 2026-05-28 01:20 - pcdx - Add study range session scope
Summary:
- Reworked top Study Panel context into Study Scope architecture.
- Added separate session concepts for active source page, analyzed pages, selected range, session continuity, and panel UI state.
- Added `ICE_ACTIVE_SOURCE_PAGE`, `ICE_SELECTED_RANGE`, and `ICE_PANEL_UI_STATE` session keys.
- Clear session and clear active page analysis preserve the active source target when available, so analysis target remains visible after session data is cleared.
- Added controlled Study Scope actions and future-ready range/book/volume controls without enabling automatic crawling.

Files touched:
- `background.js`
- `study.html`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Checks:
- `node --check study.js` passed.
- `node --check background.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Structural smoke verified active source target/session range separation and no Study Panel DOM source targeting path.

Status:
- Implemented and validated

## 2026-05-29 - Stabilize Matthew 5 Teaching Context

Instruction summary:
- Stabilize Matthew 5 Teaching / Discourse Semantics around speaker, audience, teaching blocks, source heading transparency, reference-role filtering, Study Scope safety, and connector rendering.

Codex action summary:
- Added canonical/source identity to Matthew 5 teaching semantic records and Study Panel cards.
- Expanded Matthew 5 teaching records from 7 to 11 with source-grounded righteousness, oath/speech integrity, retaliation/non-retaliation, and love-enemy teaching sections.
- Preserved the Group Entity audience model as People / multitudes with Class III -> Class III and Human audience grounding.
- Filtered weak standalone references such as `shalt`, `kill`, and `in` before they can be promoted into NAME meaning support.
- Strengthened Matthew 5 QA for canonical identity, weak reference filtering, chapter heading hints, Matthew 3 leakage prevention, and connector-symbol safety.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed after sandbox network approval.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-29 - Add Principle Relationships

Instruction summary:
- Begin Phase 8.4b Principle Relationship Architecture by deriving source-grounded relationships between Matthew 5 principles.

Codex action summary:
- Added `ICE_PRINCIPLE_RELATIONSHIPS` as a derived semantic layer.
- Built Matthew 5 pilot relationship records for Mercy / Peacemaking, Reconciliation / Peace, Righteousness / Law Fulfillment, Commandment expansion / Reconciliation, and Kingdom of heaven Beatitudes reinforcement.
- Added Study Panel Principle Relationships cards with principle, related principles, relationship type, source phrase, derived meaning, teaching block, speaker, audience, App accuracy, evidence, and grounding.
- Added storage, scope integrity, diagnostics, search, clearing, and related-layer navigation support for the new layer.
- Expanded Matthew 5 QA to assert principle relationship records and counts.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew5-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew5` passed with Principle Relationships: 5.
- `npm.cmd run qa:matthew-pages` passed after a clean rerun following a transient Playwright browser-context closure.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-29 - Add Compact Study Panel Exports

Instruction summary:
- Add compact Study Panel copy/export modes so GPT review handoffs avoid huge source discovery, reference graph, DOM hint, mention index, and repeated UI dumps.

Codex action summary:
- Added Study Panel header controls for Compact Panel Summary, Current Section Only, Diagnostic Snapshot, and GPT Handoff Summary.
- Added structured report builders that summarize active source page, study scope, adapter, derived layer counts, warnings, major entities, teaching summaries, principle relationships, diagnostics, and handoff context.
- Added export text normalization for safer plain text, including ASCII arrow output and quote/dash normalization.
- Added clipboard write support with a textarea fallback and diagnostic copied-character status messages.
- Kept full Study Panel data accessible while avoiding raw noisy sections in compact exports.

Files changed:
- `study.html`
- `study.css`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- Export smoke verified by code path: copy controls are wired, report builders are capped/readable, and compact exports omit raw noisy Source Discovery / Reference Graph dumps.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-30 - Refine GPT Handoff Export

Instruction summary:
- Refine Copy GPT Handoff Summary into a structured issue-review format for cdx/GPT review.

Codex action summary:
- Reworked the GPT handoff export into a fixed `I.C.E. GPT Handoff` format.
- Added explicit Active Source, URL, Study Scope, Analyzed Pages, Adapter, Relevant Section, Observed Issue, Likely Issue, Layer Counts, Top Evidence, Suggested Review, Data To Review, and Do Not Paste blocks.
- Added helpers that infer the relevant section, summarize nonzero layer counts, select the top compact evidence lines, and suggest review checks based on the section.
- Kept the handoff concise and capped, with existing export normalization preserving ASCII arrows and avoiding raw Source Discovery / Reference Graph / DOM Hints / raw Mention Index dumps.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed after a clean rerun following a transient Matthew 2 page-load timeout.
- Manual smoke by code path: Copy GPT Handoff Summary now emits the structured short issue-review format and includes Do Not Paste guardrails.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-30 - Add Semantic Coverage Awareness

Instruction summary:
- Add Semantic Coverage / Applicability status so users understand whether empty sections mean no grounded records, not applicable, pilot/future layer, or session-scoped availability.

Codex action summary:
- Added a new Study Panel `Semantic Coverage` section near the top of the panel.
- Added chapter-type awareness for Matthew 1, Matthew 2, Matthew 3, and Matthew 5.
- Added per-layer status rows for Passage Functions, Revelation Patterns, Movement / Location Semantics, Teaching / Discourse Structure, Principle Relationships, Semantic Sequence / Causality, Cross-Chapter Continuity, Semantic Ontology Roles, Reference Roles, and a future Strong's / POS layer.
- Coverage rows show layer name, status, and record count without creating or changing semantic records.
- Added responsive styling for the new coverage card.

Files changed:
- `study.html`
- `study.css`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew3` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-30 - Add GPT Review Mode

Instruction summary:
- Design and implement GPT Review Mode so I.C.E. can generate a compact review artifact for GPT/cdx without copying the full Study Panel.

Codex action summary:
- Added Study Panel controls for Run GPT Review Snapshot, Copy GPT Review Report, Save GPT Review Report, and Open Latest GPT Review Report.
- Added a compact Markdown GPT Review Report builder from structured `studyData`, covering active source page, URL, adapter, analysis timestamp, study scope/range, layer counts, semantic coverage, top warnings/issues, top derived sections, selected evidence, chapter type, and QA-style summary.
- Stored latest GPT Review Report in extension storage for copy/save/open workflows.
- Added browser-side save/open support via Markdown blob download/open; full panel data remains accessible.
- Added local generator `qa/generate-study-panel-report.js` for repo-visible review artifacts from QA bundles.
- Added `npm.cmd run review:matthew5`, which runs Matthew 5 QA and regenerates `QA_REPORTS/latest-study-panel-report.md`.

Files changed:
- `study.html`
- `study.js`
- `package.json`
- `qa/generate-study-panel-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check study.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `python -m json.tool package.json` passed.
- `git diff --check` passed.
- `npm.cmd run review:matthew5` passed and regenerated the compact report artifact.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-30 - Refine GPT Review Report

Instruction summary:
- Make GPT Review Mode the standard repo bridge for local browser testing and GPT architectural review.

Codex action summary:
- Added Current Review Question and User Observed Issue fields to the generated GPT review report.
- Added Top Concern Auto-Detection for likely review risks, including unclassified entities, empty primary layers, stale/target risks, missing continuity, generic adapter on scripture-like pages, and large diagnostic sections.
- Added GPT Recommended Review Focus bullets generated from report context.
- Added Repo Context with canonical anchor availability, report generator identity, and target QA command.
- Added `review:matthew1` and `review:matthew3` command variants alongside `review:matthew5`.
- Regenerated `QA_REPORTS/latest-study-panel-report.md` with the refined compact format.

Files changed:
- `study.js`
- `package.json`
- `qa/generate-study-panel-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check study.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `python -m json.tool package.json` passed.
- `git diff --check` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-31 - Add Semantic Question Framework

Instruction summary:
- Begin Phase 9.2 Semantic Question Framework as a question-oriented review layer for current page/current session semantic records.

Codex action summary:
- Added persisted derived `ICE_SEMANTIC_QUESTIONS` records in the background analysis pipeline.
- Built grounded Who/What/When/Where/Why/How answers from existing Teaching Semantics, Principle Relationships, Character Interactions, Knowledge Graph, Session Continuity, Movement Semantics, and Authority Path records.
- Added Study Panel rendering for Semantic Questions with provenance, source phrase, derived meaning, evidence weighting, App accuracy, grounding layers, answer construction, and related semantic records.
- Added Semantic Questions counts/samples to Matthew QA bundles and GPT/session review reports.
- Preserved no-crawling, no full-library querying, no Strong's/POS, and no freeform AI answer boundaries.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-31 - Refine Semantic Question Suggestions

Instruction summary:
- Refine Phase 9.2 so Semantic Questions also derive contextual inquiry suggestions from passage context, semantic graph, teaching structure, principles, character interactions, and expandable relationships.

Codex action summary:
- Added contextual inquiry suggestions to `ICE_SEMANTIC_QUESTIONS` using `questionKind: suggested` while preserving answered question records separately.
- Suggestions include question, reason suggested, supporting layer, source grounding, evidence weight, provenance, App accuracy, and related semantic record references.
- Added Matthew 5 grounded suggestions for righteousness teaching, mercy and peacemaking, Beatitude promises, But I say unto you command expansions, Sermon audience, and core/application principle review.
- Updated Study Panel rendering to split Semantic Questions into Answered Questions and Suggested Next Questions.
- Updated QA and report generators so suggestions remain separate from answers and are not presented as freeform answers.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-31 - Document Study Journey Roadmap

Instruction summary:
- Add Phase 9.3 roadmap for Comprehensive Study Journey / Hyperlinked Semantic Navigation.

Codex action summary:
- Documented a roadmap-only architecture for factual, grounded, user-directed study journeys.
- Defined future architecture names: `ICE_STUDY_JOURNEYS`, `ICE_SEMANTIC_LINKS`, `ICE_FOCUS_PATHS`, `ICE_SCOPE_EXPANSION`, and `ICE_RECENT_SOURCE_CONTEXT`.
- Captured intended journey flow: Big Picture View -> choose focus -> choose range -> traverse related records -> expand/narrow -> follow semantic links.
- Captured future controls such as Expand scope, Narrow scope, Follow this theme, Follow this character, Follow this authority path, Show all related appearances, and Show fulfillment timeline.
- Captured future LDS content provenance expectations for Church talks/new material without implementing ingestion.
- Preserved explicit boundaries: no crawling, no automatic external fetches, no live talk ingestion, no near-real-time ingestion, no unsupported doctrine, source provenance always visible, and scripture text distinct from headings/talks/I.C.E. derivations.

Files changed:
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `git diff --check` passed.

Commit:
- This commit

Status:
- Roadmap documented; no runtime implementation added

## 2026-05-31 - Add Trust Verification Architecture

Instruction summary:
- Begin Phase 9.3 Trust & Verification Architecture so I.C.E. demonstrates trustworthiness through visible source basis, provenance, evidence weight, reasoning path, supporting records, conflicts, and unresolved areas.

Codex action summary:
- Added persisted derived `ICE_TRUST_VERIFICATION` records in the background analysis pipeline.
- Built trust verification records from existing source-grounded semantic layers, including canonical identity/name records, Principle Relationships, Teaching Semantics, Knowledge Graph, Session Continuity, and Semantic Questions.
- Added descriptive Trust Signals: Direct Source Grounding, Multiple Supporting Records, Consistent Session Continuity, Consistent Knowledge Graph, Derived Only, and Awaiting Additional Evidence.
- Added Study Panel Trust & Verification section with Source Basis, Provenance, Evidence Weight, Reasoning Path, Supporting Records, Conflicting Records, Unresolved Areas, Trust Signals, source phrase, derived meaning, App accuracy, related semantic records, and scope.
- Added QA bundle/report support for `ICE_TRUST_VERIFICATION`, including Matthew 5 assertions for Mercy supports Peacemaking and grounded teaching/review prompt trust records.
- Preserved boundaries: no truth scoring, no doctrinal ranking, no belief scoring, no speculative confidence metrics, no unsupported doctrine, no crawling, and no new ingestion behavior.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-31 - Harden Study Scope Page Validation

Instruction summary:
- Fix the Critical Study Scope contamination bug where non-scripture pages and suggestion-only pages could pollute analyzed pages, current session, selected range, and continuity.

Codex action summary:
- Added strict source-page validators in `study.js` and `background.js` for approved adapter, valid source URL, source title/book/chapter agreement, analyzed status, panel UI exclusion, and ChatGPT/unrelated browser page exclusion.
- Hardened `analyzedPageHistory()` so only confirmed analyzed source records enter Study Scope analyzed pages.
- Hardened background persistence so `ICE_ANALYSIS_HISTORY`, `ICE_ACTIVE_SOURCE_PAGE`, and session continuity only use valid source page records.
- Changed Add active page to session to require the current analyzed status record instead of adding an unconfirmed active tab target.
- Kept Suggested Next display-only by deriving range/continuity from analyzed pages only.
- Expanded Clear session analysis cleanup for stale analyzed/session/range entries, semantic question/trust review data, and GPT review report state.

Files changed:
- `background.js`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `node --check background.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-31 - Add Canonical Analyzed Page State

Instruction summary:
- Fix persistent Study Scope contamination after reload by introducing canonical confirmed analyzed page state and deeper diagnostics.

Codex action summary:
- Added `ICE_CANONICAL_ANALYZED_PAGES` as the canonical source for Study Scope analyzed pages.
- Added per-page confirmed analysis markers with pageKey, URL, adapter, captureId, analysis timestamp, and build marker.
- Updated background persistence so analysis history is regenerated from canonical markers and session continuity uses only prior canonical markers.
- Updated Study Scope rendering so analyzed pages, current range, and continuity come only from canonical confirmed markers.
- Added collapsed Study Scope Sources diagnostics with accepted/rejected source buckets and rejection reasons for analysis history, selected range, latest/active captures, capture history, session continuity records, and GPT review report state.
- Ensured clear current page/session/all data paths clear or rewrite canonical analyzed page state.

Files changed:
- `background.js`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `node --check background.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented and validated

## 2026-05-31 - Refine Study Panel Action Controls

Instruction summary:
- Reduce visual noise in the Study Panel top controls while preserving GPT review and export functionality.

Codex action summary:
- Grouped top actions into Primary, GPT Review, and collapsed Export / Advanced sections.
- Added GPT-safe helper text directing users to run a snapshot, then copy the GPT Review Report.
- Kept Refresh Study Data and Run GPT Review Snapshot visible as primary controls.
- Kept GPT review report copy/save/open controls visible as their own group.
- Moved compact, current section, diagnostic, and legacy handoff exports under Export / Advanced.
- Renamed Copy GPT Handoff Summary to Copy Legacy GPT Handoff Summary and updated its copy label while preserving the existing export function.
- Updated Study Panel action styling for normal and mobile layouts.

Files changed:
- `study.html`
- `study.css`
- `study.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.
- Browser visual check not run because the in-app browser execution tool was unavailable in this session.

Commit:
- This commit

Status:
- Implemented and validated
## 2026-05-31 - pcdx - Add Principle Network Architecture

Task:
- Begin Phase 9.1b: Principle Network Architecture.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added derived `ICE_PRINCIPLE_NETWORKS` records for current-page/session principle neighborhoods.
- Derived networks from existing Teaching Semantics, Principle Relationships, Character Interactions, Knowledge Graph, Session Continuity, and Resolution Explanation inputs only.
- Added Study Panel Principle Networks display with provenance, evidence weight, source phrase, derived meaning, App accuracy, reasoning path, speaker, audience, authority context, and future-library boundary text.
- Added QA/report support and Matthew 5 assertions for Mercy and righteousness principle networks.

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed after rerunning a transient Matthew 1 adapter/page-load failure.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit: `pcdx: Add principle network architecture`
## 2026-05-31 - pcdx - Add Focus Lens Foundation

Task:
- Begin Phase 9.1c: Focus Lens Foundation.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added derived `ICE_FOCUS_LENS` records for inferred current-page/session focus review.
- Derived default focus records from existing Teaching Semantics, Principle Relationships, Principle Networks, Character Interactions, Knowledge Graph, and Session Continuity Review records.
- Added Study Panel Focus Lens display with current focus, focus type, related principles, characters, teachings, interactions, evidence, suggested next focus, provenance, evidence weight, App accuracy, source phrase, derived meaning, and reasoning path.
- Added QA/report support and Matthew 5 assertions for JESUS, Mercy, and Righteousness focus records.

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit: `pcdx: Add focus lens foundation`

## 2026-06-01 - pcdx - Add Scope Lens Foundation

Task:
- Begin Phase 9.1d: Scope Lens Foundation.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added derived `ICE_SCOPE_LENS` records for current page/current session scope-aware focus review.
- Derived scope boundaries from existing Study Scope, Focus Lens, Session Continuity Review, Knowledge Graph, and current analyzed page/session state only.
- Added Study Panel Scope Lens display with Active Focus, Active Scope, Scope Type, Included Pages, Excluded / Future Pages, Scope Boundary, Why this scope matters, Provenance, Evidence Weight, App accuracy, source phrase, derived meaning, and reasoning path.
- Added QA/report support and Matthew 5 assertions for JESUS and Mercy scope records.

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit: `pcdx: Add scope lens foundation`

## 2026-06-01 - pcdx - Add Depth Lens Foundation

Task:
- Begin Phase 9.1e: Depth Lens Foundation.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `qa/matthew3-extension-qa.js`
- `qa/matthew5-extension-qa.js`
- `qa/generate-study-panel-report.js`
- `qa/generate-session-continuity-report.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added derived `ICE_DEPTH_LENS` records for current semantic expansion depth review.
- Classified active display depth as Strict, Grounded, or Elaborate from existing semantic layer availability only.
- Added Study Panel Depth Lens display with Current Depth, Enabled Semantic Layers, Expansion Level, Why This Depth Matters, Provenance, Evidence Weight, App accuracy, source phrase, derived meaning, and reasoning path.
- Added QA/report support and Matthew 5 assertions for active Depth Lens expansion.

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `node --check qa/matthew3-extension-qa.js` passed.
- `node --check qa/matthew5-extension-qa.js` passed.
- `node --check qa/generate-study-panel-report.js` passed.
- `node --check qa/generate-session-continuity-report.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.
- `npm.cmd run review:matthew-session` passed.

Commit:
- This commit: `pcdx: Add depth lens foundation`

## 2026-06-01 - pcdx - Fix Study Panel Runtime Failure

Task:
- Diagnose and harden the Study Panel after a runtime failure left only section headers/count stubs visible and made top action buttons appear inactive.

Files changed:
- `study.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added per-section safe render wrappers so Scope Lens, Depth Lens, diagnostics, or any malformed section cannot stop the entire panel render.
- Normalized loaded Study Panel storage aliases to safe empty arrays when missing or malformed.
- Bound Study Panel search, action, export, and GPT review buttons before the initial refresh/render path runs.
- Made diagnostic counter/message writes null-safe.
- Ran a local Playwright extension Study Panel smoke. The fresh profile produced no page-level console error/stack to capture, and the fixed panel captured zero errors with top buttons enabled and GPT Review Snapshot click intact.

Validation:
- `node --check study.js` passed.
- `node --check background.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.

Commit:
- This commit: `pcdx: Fix study panel runtime failure`

## 2026-06-01 - pcdx - Add Progressive Disclosure UI

Task:
- Begin Phase 9.1f: Progressive Disclosure UI.

Files changed:
- `study.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added presentation-only progressive disclosure helpers for Study Panel semantic sections.
- Collapsed Source Phrase, Derived Meaning, Provenance, Evidence Weight, Supporting Layers, Reasoning Path, grounding, and technical semantic layer detail by default.
- Reordered Study Progression, Focus Lens, Scope Lens, and Depth Lens cards around Main Conclusion, Why, and Related Study Paths.
- Preserved semantic data, provenance, evidence weighting, trust architecture, and GPT Review report structure.

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run review:matthew5` passed.

Commit:
- This commit: `pcdx: Add progressive disclosure UI`

## 2026-06-01 - pcdx - Isolate Source Pages for Lenses

Task:
- Fix critical source contamination where Gmail could appear in derived study lens records.

Files changed:
- `background.js`
- `study.js`
- `QA_REPORTS/latest-study-panel-report.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Implementation:
- Added source isolation rejection for Gmail, ChatGPT, extension UI pages, and non-scripture URLs.
- Changed capture selection to use only valid scripture/source captures for derived analysis, with rejected source diagnostics preserved.
- Gated Focus Lens, Scope Lens, and Depth Lens builders so invalid/browser captures return no records.
- Removed Scope Lens fallback that could manufacture `Current chapter | Gmail` from a browser title.
- Updated Study Panel active source preference and warning display for ignored non-source browser pages.

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew5` passed.
- `npm.cmd run qa:matthew-pages` passed.
- `npm.cmd run review:matthew5` passed.
- Targeted Playwright smoke passed with Gmail rejected and Matthew 5 retained as the only Scope Lens included page.

Commit:
- This commit: `pcdx: Isolate source pages for lenses`

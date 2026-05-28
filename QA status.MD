# Current QA Status

Purpose: lightweight repo-visible QA readiness snapshot for `gpt`, `mgpt`, `pcdx`, and `mcdx`.

Last updated: 2026-05-16 by `pcdx`.

Current operational state:
- Matthew 1 Playwright QA is the primary end-to-end extension readiness check.
- QA harness path: `qa/matthew1-extension-qa.js`.
- QA output path: `qa-output/latest-qa-bundle.json`.
- Generated `qa-output/` files should remain uncommitted unless explicitly requested.
- Current desktop status from `pcdx`: `npm.cmd run qa:matthew1` passed after the divine display compliance refinement.
- Latest successful desktop bridge commits reported by `pcdx`:
  - `985f1b3 pcdx: Bridge mcdx optional page overlay`
  - `e049ddb pcdx: Bridge mcdx QA readiness`
  - `7270d68 pcdx: Bridge mcdx direct agent outbox`
  - `f32e2d2 pcdx: Add mgpt orchestration roadmap`
  - `12cb9e4 pcdx: Add scope integrity layer`
  - `467a9ce pcdx: Add current page source discovery index`
  - `18050ca pcdx: Add entity class labels to role groups`
  - Phase 7.7 reference graph layer
  - Phase 8.2 passage function scaffolding: this commit

Latest successful Matthew 1 QA counts reported by `pcdx`:
- DOM hints: 151
- Mention index: 178
- Entity registry: 52
- Relationship graph: 66
- Canonical identities: 54
- Semantic events: 52
- Semantic flow chains: 1
- Source discovery: 136 current-page refs
- Reference graph: 136 current-page edges
- Passage functions: 4 derived records
- Revelation patterns: 1 derived speech/revelation record
- Reference roles: 20 derived semantic role records
- Scope integrity: 799 scoped items, 0 missing scope
## Validation Commands

Run syntax checks:

```bash
node --check background.js
node --check content.js
node --check engine.js
node --check popup.js
node --check study.js
node --check pageOverlay.js
node --check qa/matthew1-extension-qa.js
git diff --check
```

Run JSON checks:

```bash
python3 -m json.tool manifest.json >/tmp/manifest.json.check
python3 -m json.tool package.json >/tmp/package.json.check
```

Install browser QA dependencies when network access permits:

```bash
npm install
npx playwright install chromium
```

Run Matthew 1 QA:

```bash
npm run qa:matthew1
```

Direct QA harness run:

```bash
node qa/matthew1-extension-qa.js
```

Patch bridge commands for MCDX when shell GitHub access remains blocked:

```bash
git diff --patch --no-ext-diff --no-color
git show --patch --no-ext-diff --decorate --no-color HEAD
```

## Known Limitations

- `mcdx` shell GitHub access is still blocked by environment proxy: `CONNECT tunnel failed, response 403`.
- `mcdx` shell npm/Playwright install can be blocked by proxy/registry `403`, so full Playwright browser QA may need `pcdx` desktop.
- `mcdx` can still run syntax checks, create local commits, update repo-visible files, and generate patches.
- If `mcdx` cannot push/fetch, use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for quick handoffs and paste patch output for `pcdx` to bridge.
- Do not commit generated `qa-output/` bundles unless Dennis explicitly requests it.

## Current Supported QA

Current adapter support tracked in repo memory:
- `lds_scripture_adapter`
- `generic_html_adapter`
- `plain_text_adapter`

Current Matthew 1 harness validates:
- active LDS scripture adapter detection
- DOM semantic hints
- mention index
- entity registry
- relationship graph
- canonical identities, including `JESUS CHRIST`
- expected Matthew 1 relationship edges
- semantic events
- semantic flow chains
- scope integrity export samples
- explicit ScopePath assertions for Matthew 1 verse 20, verse 21, Joseph instruction at verse 20, and Joseph response at verse 24
- current-page source discovery assertions for study notes, navigation/source refs, and scoped note `scripture.nt.matthew.1.note.20a`
- reference graph assertions for study-note edges, navigation/source edges, and scoped note edge `scripture.nt.matthew.1.note.20a`
- passage function assertions for grounded Matthew 1 pilot records: `genealogy_establishes_identity`, `divine_message_instruction`, `prophecy_fulfillment_identification`, and `obedient_response_and_naming`
- Matthew 1 naming distinction assertions for name revelation preserving `JESUS`, conception revelation, mission reason declaration, and Joseph naming `JESUS` while canonical identity remains `JESUS CHRIST`
- revelation pattern assertions for AngEL Of THE LORD speech to Joseph with THE LORD as authority source and four ordered sub-events
- reference role assertions for davidic lineage support, Abrahamic covenant support, prophecy fulfillment support, messianic identity support, and name meaning support
- QA bundle creation at `qa-output/latest-qa-bundle.json`
- structured failure reporting for:
  - `missing-playwright`
  - `assertion-failure`
  - `runtime-error`
- page overlay disabled during Matthew 1 QA setup with `showPageOverlay: false`.

## QA Goals

Keep concise and operational:
- Keep this file as the quick QA readiness snapshot.
- Keep detailed completed work in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.
- Keep quick actor-to-actor QA handoffs in `THREAD_ARCHIVE/AGENT_OUTBOX.md`.
- Keep `PROJECT_STATE.md` as the broader operational source of truth.
- Prefer additive QA checks that preserve current formatter, capture, study panel, storage keys, and semantic pipeline behavior.
- Before committing application changes, run syntax checks and `git diff --check`.
- Run `npm run qa:matthew1` when Playwright is installed and network/browser environment permits.
- If MCDX cannot run Playwright, commit only after local feasible checks and send patch/outbox handoff to PCDX for desktop validation.
## 2026-05-22 - Matthew 2 Semantic Stabilization QA

New QA harness:
- `qa/matthew2-extension-qa.js`
- npm script: `npm.cmd run qa:matthew2`
- Output path: `qa-output/latest-matthew2-qa-bundle.json`

Matthew 2 expected checks:
- Passage Functions > 0
- Revelation Patterns > 0
- Semantic Ontology Roles > 0
- Semantic Relationship Roles > 0
- Origin / Authority Paths > 0
- Required Matthew 2 passage functions present:
  - wise_men_arrival
  - prophecy_fulfillment_identification
  - hostile_authority_response
  - divine_warning_revelation
  - protective_obedient_response
  - egypt_escape_preservation
  - messianic_location_fulfillment
- Herod adversarial role remains evidence-based and tied to hostile/destroy-him source wording.
- CHILD / JESUS resolution is represented in derived roles without rewriting source records.
- Matthew 1 naming timeline label should not leak into Matthew 2 stored semantic data.

Validation result:
- `node --check background.js` passed`r`n- `node --check study.js` passed`r`n- `node --check qa/matthew2-extension-qa.js` passed`r`n- `git diff --check` passed`r`n- `npm.cmd run qa:matthew1` passed`r`n- `npm.cmd run qa:matthew2` passed

## 2026-05-23 - Phase 8.2x Continuity QA

New layer:
- `ICE_SEMANTIC_CONTINUITY`

QA bundle updates:
- `qa/matthew1-extension-qa.js` now reports `semanticContinuity` counts and samples.
- `qa/matthew2-extension-qa.js` now reports and asserts Matthew 2 continuity records.

Latest validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `semanticContinuity: 0`.
- `npm.cmd run qa:matthew2` passed with `semanticContinuity: 4`.

Matthew 2 continuity assertions:
- Joseph / continued_authority_revelation_relationship.
- JESUS / CHILD / continued_child_identity_and_mission_preservation.
- scripture narrator / quoted prophet / continued_prophecy_fulfillment_chain.
- Herod / adversarial_escalation_against_mission_preservation.

## 2026-05-23 - Live Matthew 2 Mismatch Diagnostics

Issue investigated:
- `qa:matthew2` reported populated Matthew 2 semantic layers while live Study Panel showed stale/empty derived counts.

Diagnostic additions:
- `ICE_ANALYSIS_STATUS.activeUrl`
- `ICE_ANALYSIS_STATUS.sourceCaptureId`
- `ICE_ANALYSIS_STATUS.sourceCaptureTitle`
- `ICE_ANALYSIS_STATUS.sourceCaptureBook`
- `ICE_ANALYSIS_STATUS.sourceCaptureChapter`
- `ICE_ANALYSIS_STATUS.derivedBuildersScope`
- `ICE_ANALYSIS_STATUS.matthew2DerivedBuildersRan`
- `ICE_ANALYSIS_STATUS.analysisBuildMarker`
- `ICE_ANALYSIS_STATUS.derivedLayerCounts`

Study Panel diagnostics now show:
- active URL
- source capture title/book/chapter/id
- analysis reason
- analysis build marker
- builder scope
- Matthew 2 builders ran flag
- derived layer counts

Expected live Matthew 2 after extension reload and rerun:
- analysis build: `phase-8.2x-live-derived-diagnostics`
- builder scope: `Matthew 2`
- Matthew 2 builders ran: `true`
- derived counts matching QA:
  - Passage Functions: 8
  - Revelation Patterns: 2
  - Reference Roles: 3
  - Ontology Roles: 8
  - Origin / Authority Paths: 1
  - Semantic Relationship Roles: 5
  - Semantic Continuity: 4

Validation:
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
## 2026-05-27 - Phase 8.3a Matthew 2 Adversarial / Protective QA

New Matthew 2 assertions:
- repeated_guidance_preservation_cycle passage function
- movement_location_prophecy_continuity passage function
- hostile_deception_vs_protective_obedience_contrast passage function
- Jerusalem authority conflict setting ontology role
- Nazareth protective redirection ontology role
- protective origin / authority path process path
- deceptive worship language vs hostile intent semantic contrast
- protective obedience vs hostile deception semantic contrast

Validation:
- `node --check background.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Latest Matthew 2 Phase 8.3a counts:
- Passage functions: 11
- Revelation patterns: 2
- Ontology roles: 10
- Semantic ambiguities / contrasts: 2
- Origin / authority paths: 1
- Semantic relationship roles: 5
- Semantic continuity: 4

## 2026-05-27 - Semantic Contrast Wording QA

Display refinement:
- Semantic Ambiguities / Contrasts cards now avoid generic `vs` wording for non-oppositional source/derived and canonical identity relationships.
- Relationship type labels now distinguish related-with, distinguished-from, source/derived, and true contrasted-with display cases.
- Matthew 2 adversarial/protective records keep grounded stronger contrast wording.

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Latest QA counts:
- Matthew 1 semantic ambiguities / relationships: 5
- Matthew 2 semantic ambiguities / relationships: 2
- Matthew 2 semantic continuity: 4

## 2026-05-27 - Phase 8.3b Movement / Location Semantics QA

New QA coverage:
- `ICE_MOVEMENT_SEMANTICS` is cleared, collected, counted, and sampled in Matthew QA bundles.
- Matthew 2 now asserts grounded movement/location records for:
  - prophecy_location_identification -> Bethlehem
  - witness_travel_toward_child -> Jerusalem
  - protective_escape_preservation -> Egypt
  - return_after_hostile_threat_removed -> land of Israel
  - protective_redirection_settlement_fulfillment -> Nazareth

Validation:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Latest counts:
- Matthew 1 movement semantics: 0
- Matthew 2 movement semantics: 5
- Matthew 2 semantic continuity: 4

## 2026-05-27 - Primary Entity Classification Display QA

Display refinement:
- Primary Entities now render as Primary Entities / Characters with ontology grouping, role labels, local evidence roles, and authority/source relevance.
- Applied across Passage Functions, Revelation Patterns, Semantic Relationship Roles, Origin / Authority Paths, Semantic Principles, Movement / Location Semantics, Semantic Continuity, and Narrative Timeline.

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Latest QA counts:
- Matthew 1 semantic ambiguities / relationships: 5
- Matthew 2 movement semantics: 5
- Matthew 2 semantic continuity: 4

## 2026-05-27 - Ontology Role Separation QA

Display fix:
- Primary Entities / Characters now prevents Class I THE LORD / GOD from inheriting messenger/revelation-carrier roles.
- Entity candidate filtering blocks mission/process/action phrases from rendering as entity labels.
- AngEL Of THE LORD remains Class II messenger / revelation carrier.

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Manual smoke:
- THE LORD messenger/carrier display pattern: not found.
- Process strings are filtered from entity candidates while remaining available in derived meaning/process displays.

## 2026-05-27 - App Accuracy Wording QA

Display refinement:
- User-facing semantic labels now use `App accuracy` instead of prior confidence-oriented display wording.
- Stored confidence values and styling hooks are preserved.

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Manual smoke:
- Targeted search found no remaining user-facing the old targeted confidence-oriented display labels.
- Remaining `confidence` matches are internal field names, stored semantic values, CSS hooks, or historical log text.

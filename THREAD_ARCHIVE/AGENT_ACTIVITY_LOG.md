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

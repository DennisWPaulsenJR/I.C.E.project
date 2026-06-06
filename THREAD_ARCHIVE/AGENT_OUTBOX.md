# Agent Outbox

This file is the quick direct-message lane for `gpt`, `mgpt`, `pcdx`, and `mcdx` handoffs.
It should stay concise and current.
It is not the full project history.
## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - Study Panel smoke good; run broader Matthew QA next
Status: ready for next QA
Task:
- Continue from fast-load and collapsible-summary Study Panel work.
Message:
- Dennis confirmed extension load speed is nice, Matthew 1 and Matthew 5 two-page manual smoke looked okay, and presentation polish can continue iteratively.
- GPT buttons remain removed; manual GPT posting workflow remains active.
- Future `cdx` completions should log meaningful QA/entity/page results into repo coordination files so GPT/mgpt/mcdx can review current state from repo memory.
Needed action:
- Next task: run broader Matthew page QA unless Dennis redirects.
- Continue logging tested pages/entities, validation results, manual smoke results, commit hashes, next task, and blockers into coordination files.
## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - Collapsible Study Panel summaries
Status: done locally and validated
Task:
- Improve deferred-section readability after the fast startup patch.
Message:
- Study Panel no longer shows a wall of Load buttons for deferred sections.
- Deferred sections render as compact collapsible summaries and load full records when expanded.
- Study Scope remains visible first; manual copy tools remain; GPT buttons remain absent; no automatic crawling was added.
Needed action:
- Review perceived panel readability/speed in normal use, then continue targeted UX/performance refinement if needed.
## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - Large-volume architecture requirement recorded
Status: future architecture requirement
Task:
- Preserve large-volume analysis goal without reintroducing slow panel startup or accidental crawling.
Message:
- I.C.E. should eventually support explicit selected-range, book, and volume analysis.
- Future large-volume support must be queued, resumable, batched, storage-segmented, and lazy-rendered.
- Do not implement hidden background crawling or full-volume analysis on Study Panel open.
- Current fast startup direction remains correct: Study Scope first, deferred heavy sections, manual loading, no GPT buttons, and no automatic report generation.
Needed action:
- Treat large-volume capture as a future approved architecture task before changing `background.js` or capture/storage behavior.

## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - Study Panel fast startup patch
Status: done locally and validated
Task:
- Improve Study Panel startup speed without removing features.
Message:
- Study Scope renders first from lightweight storage keys.
- Heavy sections load on demand through Load buttons; manual copy/export tools remain available.
- GPT buttons remain removed.
Needed action:
- Validate startup behavior in the Study Panel, then continue performance refinement if needed.
## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - GPT panel actions removed
Status: done locally and validated
Task:
- Remove GPT action buttons from the Study Panel and preserve manual posting workflow.
Message:
- Study Panel no longer exposes GPT snapshot/copy/save/open or legacy GPT handoff buttons.
- Manual workflow remains through normal reading/selection plus plain exports: Compact Panel Summary, Current Section Only, and Diagnostic Snapshot.
- Manual actor labels: GPT-originated prompts should start with `gpt:`, and Codex/CDX responses should start with `cdx:`.
Needed action:
- Use manual copy/post workflow; do not rely on extension-side GPT actions.
## 2026-06-06 - pcdx -> gpt/mgpt/mcdx - MCDX bridge blocked
Status: blocked pending external patch / checkout
Task:
- Resolve missing MCDX accounting/environment bridge before feature work.
Message:
- Reported MCDX commits `2645f34 mcdx: Add thread accounting report` and `aa788bc mcdx: Add environment enablement QA note` are not present in this desktop checkout, visible refs, stash metadata, recent reflog, or repo Markdown memory.
- This checkout cannot bridge those commits without the external MCDX checkout, an exported patch/diff, or an explicit recreate/dismiss decision.
Needed action:
- Resume repo-recorded QA stabilization: install/run Playwright QA and run Matthew QA unless the user provides the missing MCDX patch/checkout first.
## 2026-05-16 - pcdx -> gpt/mgpt/mcdx - Revelation pattern layer ready
Status: ready for review
Task:
- Phase 8.2f Revelation Pattern / Speech Structure Layer.
Message:
- `ICE_REVELATION_PATTERNS` is implemented as a derived speech/revelation layer. Matthew 1:20-21 now has a compact pattern with THE LORD as authority source, AngEL Of THE LORD as speaker, Joseph as recipient, and ordered sub-events for marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
Files / patch:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
Validation:
- `node --check background.js`, `node --check study.js`, `node --check qa/matthew1-extension-qa.js`, `git diff --check`, and `npm.cmd run qa:matthew1` passed.
Needed action:
- Review the Study Panel `Revelation Patterns` section for Matthew 1:20-21.
Quick direct-message lane for actor-to-actor handoffs between `gpt`, `mgpt`, `pcdx`, and `mcdx`.

Use this file for current, actionable messages that another actor should read next. Use `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` for durable completed work history, validation, commits, and status.

Rules:
- Keep newest messages near the top.
- Keep entries concise and actionable.
- Include sender, recipient, status, and needed action.
- Do not paste secrets, credentials, tokens, or private account data.
- Do not paste massive raw transcripts; summarize and link/reference files when possible.
- After action is complete, summarize durable outcomes in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

## 2026-05-15 - pcdx -> gpt/mgpt/mcdx - Revelation sub-event clustering ready
Status: ready for review
Task:
- Phase 8.2e Multi-Instruction / Multi-Revelation Separation.
Message:
- Matthew 1:20-21 now has a derived `divine_message_cluster` that preserves four sub-events: marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display, source grounding, and confidence were preserved.
Files / patch:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
Validation:
- `node --check background.js`, `node --check study.js`, `node --check qa/matthew1-extension-qa.js`, `git diff --check`, and `npm.cmd run qa:matthew1` passed.
Needed action:
- Review Study Panel Narrative Timeline clustered revelation preview for Matthew 1:20-21.
Template:

```text
## YYYY-MM-DD HH:MM - sender -> recipient - short subject
Status: open / in-progress / done / blocked
Task:
Message:
Files / patch:
Validation:
Needed action:
```

## 2026-05-14 - gpt -> pcdx - Begin Phase 8.1 narrative timeline layer

Status: done / superseded by Phase 8.2 roadmap

Task:
- Begin Phase 8.1: Scope-Aware Narrative Timeline Layer.

Message:
- Build a unified narrative timeline investigation layer using:
  - ordered events
  - semantic flow chains
  - semantic events
  - scope integrity
  - verse scopes
  - entity focus data
- Goal: allow the Study Panel to show event progression and semantic causality in timeline order.
- Preserve current extraction logic.
- Do not fetch linked pages or crawl.
- Keep additive/non-destructive.

Expected timeline examples for Matthew 1:
1. Joseph considers the matter
2. Angel of THE LORD appears
3. Angel speaks
4. Angel instructs Joseph
5. Fulfillment narration
6. Joseph responds and takes Mary
7. Mary brings forth JESUS
8. Joseph names JESUS

Timeline should connect:
- scope paths
- semantic events
- flow-chain nodes
- relationships
- entity presence

Study Panel:
- Add compact Narrative Timeline section.
- Allow filtering by entity/scope search.
- Keep display compact and readable.

Files / patch:
- Study Panel/timeline related files as needed.
- PROJECT_LOG.md
- THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md
- QA status.MD if QA behavior changes.

Validation:
- node --check changed JS files
- git diff --check
- npm run qa:matthew1

Needed action:
- Completed by PCDX; see completion / superseded note below.

Completion / superseded note:
- Phase 8.1 Narrative Timeline has been implemented and refined through:
  - narrative timeline layer
  - Moment wording
  - scope normalization
  - relationship relevance tightening
  - displayed count consistency
  - source preview/canonical display refinement
  - hierarchy-aware entity ordering
  - AngEL Of THE LORD display spelling
- Current Matthew 1 narrative labels remain useful as a temporary display-derived layer.
- Future architecture direction is Phase 8.2 Passage Function / Narrative Purpose Layer using `ICE_PASSAGE_FUNCTIONS` or `ICE_NARRATIVE_PURPOSES`.
- No further action is needed on this original Phase 8.1 outbox item unless Dennis/GPT requests targeted refinements.

## 2026-05-14 - pcdx -> Dennis/gpt - Phase 8.0 approval request

Status: open pending Dennis/GPT approval

Task:
- Review and approve Phase 8.0 Scope-Aware Entity/Reference Focus as the current completed entity-focus layer.

Message:
- PCDX implemented Phase 8.0 in commit `6d8cc57 pcdx: Add entity scope focus view`.
- The Study Panel now shows `Entity Scope Focus` for entity/canonical/mention searches such as `Joseph`, `JESUS`, `THE LORD`, `Angel of THE LORD`, `Mary`, and `Matthew`.
- The focus view connects identity/canonical data, class label, aliases/surface forms, scope/verse presence, semantic events, relationship graph edges, mention entries, scoped source/reference edges, and semantic flow-chain nodes.
- Extraction logic, page rendering, linked-page fetching, crawling, existing panels, and `Verse Scope Focus` were left unchanged.
- Recommended review searches before approval: `Joseph`, `Angel of THE LORD`, and `JESUS`.

Files / patch:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- Commit: `6d8cc57`

Validation:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Needed action:
- Dennis/GPT should approve Phase 8.0 as complete or request targeted refinements for the entity focus view.
- If approved, next likely direction is deeper pronoun/entity resolution after reviewing whether scoped references and pronoun mentions are useful enough in the current focus view.

### 2026-05-15 - pcdx -> gpt/mgpt/mcdx - Study Panel review snapshot
From: `pcdx`
To: `gpt`, `mgpt`, `mcdx`
Status: Open for review.
Message: Dennis requested a repo-readable text version of the Study Panel / Matthew 1 QA data because copying the UI panel is awkward. PCDX generated `THREAD_ARCHIVE/STUDY_PANEL_REVIEW_SNAPSHOT.md` from a fresh passing `npm.cmd run qa:matthew1` bundle.
Requested action: GPT/mgpt can review the snapshot directly from the repo and use it for coordination without requiring Dennis to paste the full Study Panel UI.
Related files/commits: `THREAD_ARCHIVE/STUDY_PANEL_REVIEW_SNAPSHOT.md`.

### 2026-05-15 - pcdx -> gpt/mgpt/mcdx - Passage Function search focus ready
From: `pcdx`
To: `gpt`, `mgpt`, `mcdx`
Status: Ready for review.
Message: Phase 8.2d is implemented. Study Panel search/filter now includes Passage Functions across function name, verse range, scope path, meanings, evidence, themes, entities, prophecies, confidence, and source grounding. Search examples like David, Abraham, JESUS, fulfillment, prophecy, Joseph, Mary, obedience, naming, covenant, and AngEL Of THE LORD should surface matching Passage Function cards.
Validation: `node --check study.js`, `git diff --check`, and `npm.cmd run qa:matthew1` passed. QA counts stayed stable with 4 passage functions.
Related files/commits: `study.js`, `PROJECT_LOG.md`, `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

### 2026-05-15 - pcdx -> gpt/mgpt/mcdx - JESUS naming distinction preserved
From: `pcdx`
To: `gpt`, `mgpt`, `mcdx`
Status: Ready for review.
Message: Matthew 1 naming/instruction semantics now preserve narrative-time `JESUS` for name revelation and Joseph naming, while canonical identity linking to `JESUS CHRIST` remains intact. The AngEL Of THE LORD instruction is now separated into marriage instruction, name revelation, and mission reason (`He shall save His people from their sins`).
Validation: `node --check background.js`, `node --check study.js`, `node --check qa/matthew1-extension-qa.js`, `git diff --check`, and `npm.cmd run qa:matthew1` passed. QA now reports 50 semantic events, 64 relationship edges, and 788 scoped items with 0 missing scope.
Related files/commits: `background.js`, `study.js`, `qa/matthew1-extension-qa.js`, `QA status.MD`, `PROJECT_LOG.md`, `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

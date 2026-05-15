# I.C.E. Project Log

Chronological implementation and decision log. Entries are reverse chronological. Keep this summarized; do not paste raw chat transcripts here.
## 2026-05-14 - Phase 7.9 Verse Scope Focus View

Instruction summary:
- Make `scopePath` and `verseRef` useful in the Study Panel by showing everything tied to a searched verse or scope.
- Activate only when search includes a verse/scope term such as `1:20`, `verse.20`, `Matthew 1:20`, or `scripture.nt.matthew.1.verse.20`.
- Do not change extraction logic, fetch linked pages, crawl, or rewrite existing panels.

Codex action summary:
- Added a compact Study Panel `Verse Scope Focus` section that is hidden until the search term contains a verse/scope target.
- Added verse/scope parsing for full scripture scope paths, chapter:verse searches, and `verse.N` searches using the active source context when needed.
- Grouped matching data into buckets for DOM hints, mentions, semantic events, relationship graph edges, source discovery refs, reference graph edges, and flow-chain nodes.
- Preserved exact `scopePath` / `fromScopePath` details in compact previews while showing readable focus labels such as `Matthew 1:20`.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-14 - Phase 7.8 Reference Graph Focus / Navigation View

Instruction summary:
- Make `ICE_REFERENCE_GRAPH` easier to use in the Study Panel by grouping and filtering reference edges by scope, verse, and relationship type.
- Do not fetch linked pages, crawl, rewrite source discovery, or change extraction logic.

Codex action summary:
- Refined the Study Panel Reference Graph renderer to show counts by relationship type first.
- Added readable scope grouping such as `Matthew 1:20` while preserving exact `fromScopePath` in each edge preview.
- Expanded Reference Graph search text so relationship type, ref type, scope label, scope path, target text, href, and confidence all participate in filtering.
- Added compact grouped edge previews showing target text/href, `fromScopePath`, `relationshipType`, and confidence.
- Updated the empty state to `No reference graph edges detected.`

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-14 - Phase 7.7 Reference Graph Layer

Instruction summary:
- Convert current-page source discovery records into graph-style reference edges.
- Do not fetch linked pages, crawl, or mutate the Source Discovery Index.
- Add compact Study Panel Reference Graph visibility and Matthew 1 QA coverage.

Codex action summary:
- Added derived `ICE_REFERENCE_GRAPH` records from `ICE_SOURCE_DISCOVERY_INDEX`.
- Mapped discovery ref types to relationship types such as `has_study_note`, `has_cross_reference`, `has_chapter_navigation`, `has_source_collection_link`, and `has_table_of_contents_link`.
- Preserved current-page scope via `fromScopePath` and linked each edge back to `sourceDiscoveryId`.
- Added Study Panel Reference Graph section with total edges, counts by relationship type, and sample edges.
- Added Matthew 1 QA assertions for reference graph count, study-note edges, navigation/source edges, and scoped note edge `scripture.nt.matthew.1.note.20a`.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js`
- `node --check study.js`
- `node --check qa/matthew1-extension-qa.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.
- Reference graph relationship types in QA sample: has_cross_reference 42, has_study_note 36, has_chapter_navigation 32, has_source_collection_link 23, has_table_of_contents_link 3.
- Scope integrity: 775 scoped items, 0 missing scope.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-14 - Phase 7.5a Entity Class Display Refinement

Instruction summary:
- Make entity class / exaltation hierarchy visible in Detected Entities / Roles.
- Keep the change display-only, preserve role grouping/order, and avoid extraction or page-text rendering changes.

Codex action summary:
- Added Study Panel role-card class labels using existing entity classification helpers.
- Reused stored Entity Registry / Canonical Identity classification where available before falling back to role metadata.
- Added compact `Class: ...` lines for classified role/entity cards such as divine authorities, messengers, humans, lineage persons, and source metadata entities.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-14 - Phase 7.5 Current-Page Source Discovery Index

Instruction summary:
- Create a current-page, adapter-aware discovery index for links/references on the active source page.
- Do not implement broad crawling or recursive fetching.
- Add compact Study Panel Source Discovery section and Matthew 1 QA coverage.

Codex action summary:
- Added content-side current-page link discovery for anchors on the active page only.
- Added derived `ICE_SOURCE_DISCOVERY_INDEX` in the background pipeline.
- Standardized discovery records with source URL/capture, adapter ID, discovery scope, link text, href, ref type, source element, verse ref, scope path, and confidence.
- Classified refs as study notes, cross references, chapter/source navigation, table of contents, source collection, media, related content, or external links.
- Added Study Panel Source Discovery section with total refs, scoped refs, counts by ref type, and sample refs.
- Added Matthew 1 QA assertions for source discovery count, study notes, navigation refs, and `scripture.nt.matthew.1.note.20a`.

Files changed:
- `content.js`
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check content.js`
- `node --check background.js`
- `node --check study.js`
- `node --check qa/matthew1-extension-qa.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136.
- Source discovery ref types in QA sample: chapter_nav 32, cross_reference 42, source_collection 23, study_note 36, table_of_contents 3.
- Scope integrity: 639 scoped items, 0 missing scope.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-14 - Phase 7.4 ScopePath + Verse Position Integrity Refinement

Instruction summary:
- Standardize positional/scope fields across DOM hints, mentions, semantic events, relationships, canonical identities, and semantic flow chains.
- Prefer DOM/verse scope where available, preserve generic fallbacks, and keep this as a derived integrity layer.
- Add/confirm Study Panel Scope Integrity visibility and Matthew 1 QA assertions.

Codex action summary:
- Reworked scope enrichment to derive stable `scopePath`, `verseRef`, `verseNumber`, `chapter`, `book`, `sourceUri`, `sourceCaptureId`, `adapterId`, and `timelinePosition` fields after extraction.
- Standardized scripture paths such as `scripture.nt.matthew.1.verse.20` and generic fallbacks such as `generic.page.section.N.paragraph.N`.
- Enriched nested semantic flow-chain nodes and relationships.
- Expanded Scope Integrity Study Panel display with total checked, missing scope, adapter ID, sample paths, and layer counts.
- Updated Matthew 1 QA to explicitly require scope integrity report, verse 20/21 DOM scopes, Joseph instruction at verse 20, and Joseph response at verse 24.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js`
- `node --check study.js`
- `node --check qa/matthew1-extension-qa.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1.
- Scope integrity: 503 scoped items, 0 missing scope.

Commit hash:
- This commit

Status:
- Implemented

## 2026-05-12 - Repo Memory / Archive Structure

Instruction summary:
- Create repo-based project memory readable from any device/thread.
- Split operational memory, implementation log, and raw thread archive guidance.

Codex action summary:
- Condensed `PROJECT_STATE.md` into operational project memory.
- Created `PROJECT_LOG.md` for chronological implementation decisions.
- Created `THREAD_ARCHIVE/README.md`.
- Created compact architecture note placeholder in `THREAD_ARCHIVE/2026-05-project-architecture-notes.md`.

Files changed:
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/2026-05-project-architecture-notes.md`

Validation run:
- `git diff --check`

Commit hash:
- Not committed yet

Status:
- Implemented

## 2026-05-12 - Project State File

Instruction summary:
- Create persistent `PROJECT_STATE.md` as stable memory for Codex/GPT across devices, threads, and sessions.
- Expand it into a current reference plus ongoing work log and instruction history.

Codex action summary:
- Added project identity, architecture, storage keys, QA workflow, active instructions, open items, roadmap, and caution rules.
- Later split long work-log content into `PROJECT_LOG.md`.

Files changed:
- `PROJECT_STATE.md`

Validation run:
- `git diff --check`

Commit hash:
- Not committed yet

Status:
- Implemented

## 2026-05-12 - Dev QA Automation Harness

Instruction summary:
- Create Playwright-based development-only harness to launch Chromium with the unpacked extension, open Matthew 1, wait for scripture content, read extension storage, verify expected graph outputs, and export a QA bundle.

Codex action summary:
- Added minimal valid `package.json` with `qa:matthew1` script.
- Added `qa/matthew1-extension-qa.js`.
- Added `qa-output/` and `node_modules/` to `.gitignore`.
- Harness clears test storage, enables extension settings, loads Matthew 1, waits for analysis, reads storage via MV3 service worker, validates adapter/hints/mentions/relationships/canonical identity, and writes `qa-output/latest-qa-bundle.json`.

Files changed:
- `.gitignore`
- `package.json`
- `qa/matthew1-extension-qa.js`

Validation run:
- `package.json` parse check
- QA harness syntax check
- `git diff --check`
- Live QA deferred because Playwright is not installed yet

Commit hash:
- Not committed yet

Status:
- Implemented; live QA pending setup

## 2026-05-11 - Phase 7.4 ScopePath + Verse Position Integrity

Instruction summary:
- Create unified positional/scope fields for DOM hints, mentions, semantic events, relationships, canonical identities, and semantic flow chains.
- Add Study Panel Scope Integrity section.

Codex action summary:
- Added `ICE_SCOPE_INTEGRITY`.
- Added scope enrichment pass in background pipeline.
- Standardized safe fields: `scopePath`, `verseRef`, `verseNumber`, `chapter`, `book`, `sourceUri`, `sourceCaptureId`, `adapterId`, `timelinePosition`.
- Added Scope Integrity Study Panel section with counts and sample scope paths.

Files changed:
- `background.js`
- `study.html`
- `study.js`

Validation run:
- background/study/content syntax checks
- `git diff --check`

Commit hash:
- `a0a6c0d` Add scope integrity layer

Status:
- Committed

## 2026-05-11 - Phase 7.3 Source Adapter Foundation

Instruction summary:
- Create lightweight adapter registry and active adapter detection.
- Initial adapters: LDS scripture, generic HTML, plain text.
- Add Source Adapter Study Panel section.

Codex action summary:
- Added `ICE_SOURCE_ADAPTERS` and `ICE_ACTIVE_ADAPTER`.
- Added content-side adapter detection and background-side derivation.
- Added Source Adapter Study Panel section and diagnostic.

Files changed:
- `background.js`
- `content.js`
- `study.html`
- `study.js`

Validation run:
- content/background/study syntax checks
- `git diff --check`

Commit hash:
- `7a77877` Add source adapter foundation

Status:
- Committed

## 2026-05-11 - Phase 7.2 DOM Semantic Hints

Instruction summary:
- Capture optional semantic DOM metadata while preserving plain-text fallback.
- Use churchofjesuschrist.org scripture markup such as `.verse`, `data-eng-ref`, `.deity-name`, `.uppercase`, and `.study-note-ref`.

Codex action summary:
- Added DOM hint extraction in `content.js`.
- Added `ICE_DOM_SEMANTIC_HINTS` in pipeline.
- Added DOM Semantic Hints Study Panel section.
- Refined study-note refs to use visible linked text.
- Added I.C.E. render diagnostic hints as `source: ice-render`.

Files changed:
- `background.js`
- `content.js`
- `study.html`
- `study.js`

Validation run:
- content/background/study syntax checks
- `git diff --check`

Commit hash:
- `57ad26a` Add mention index and DOM semantic hints

Status:
- Committed

## 2026-05-11 - Phase 7.1 Mention Index

Instruction summary:
- Create `ICE_MENTION_INDEX` to track mentions without promoting every role/word into canonical entities.
- Wire entity class hierarchy into current display.

Codex action summary:
- Added mention indexing across registry entities, canonical identities, entity roles, lineage persons, divine titles, angel references, human role/group mentions, and pronouns.
- Added Study Panel Mention Index section and diagnostics.
- Added entity class display classification for registry/identity output.

Files changed:
- `background.js`
- `study.html`
- `study.js`

Validation run:
- syntax checks
- `git diff --check`

Commit hash:
- `40b96b2` Add entity class display classification
- Mention index included in `57ad26a` alongside DOM hints

Status:
- Committed

## 2026-05-11 - Phase 6.5 Entity Class Classification

Instruction summary:
- Wire future entity class hierarchy into current entity display as safe classification layer.
- Do not alter extraction or page-text rendering.

Codex action summary:
- Added class labels for Entity Registry and Canonical Identities.
- Used hierarchy I through IIIIII for display classification.
- Kept classification display-only.

Files changed:
- `study.js`
- related graph/display files as needed

Validation run:
- syntax checks
- `git diff --check`

Commit hash:
- `40b96b2` Add entity class display classification

Status:
- Committed

## 2026-05-11 - Phase 6.x Graph and Identity Foundations

Instruction summary:
- Build entity registry, relationship graph, focused relationship view, canonical identities, source metadata author/narrator distinction, and hierarchy ordering refinements.

Codex action summary:
- Added entity registry, relationship graph, canonical identities, relationship preference/deduping, source metadata entities, and focused relationship view debug path.
- Preserved distinction between Matthew as believed author metadata and Scripture narrator as narrative voice.

Files changed:
- Primarily `background.js`, `study.html`, `study.js`

Validation run:
- syntax checks and `git diff --check` per phase

Commit hash examples:
- `ddf4319` Add focused relationship view debug renderer
- Earlier Phase 6 commits are in git history

Status:
- Committed

## 2026-05-10 and earlier - Phase 1 through Phase 5.9 Foundations

Instruction summary:
- Build stable MV3 extension formatter, capture/history, timeline/event extraction, actor timelines, interactions, principles, prophecy links, scenes, semantic event decomposition, and semantic flow chains.

Codex action summary:
- Refactored formatter/capture/popup/study architecture.
- Added local-only analysis pipeline.
- Added Study Panel.
- Added Matthew 1/2/3-specific QA-driven refinements for actor attribution, relationships, lineage, prophecy/fulfillment, covenant roles, narrator modeling, and semantic flow chains.

Files changed:
- `manifest.json`
- `background.js`
- `content.js`
- `engine.js`
- `popup.html`
- `popup.js`
- `study.html`
- `study.js`
- `study.css`
- `styles.css`

Validation run:
- syntax checks and manual Chrome extension QA across phases

Commit hash examples:
- `Phase 3 add local timeline and event extraction`
- Multiple later commits in git history

Status:
- Committed through prior milestones
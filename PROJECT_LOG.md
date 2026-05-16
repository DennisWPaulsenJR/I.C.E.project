# I.C.E. Project Log

Chronological implementation and decision log. Entries are reverse chronological. Keep this summarized; do not paste raw chat transcripts here.
## 2026-05-15 - Phase 8.2d Passage Function Search Focus

Instruction summary:
- Make `ICE_PASSAGE_FUNCTIONS` participate in the Study Panel search/filter system.
- Match search terms against function name, verse range, scope path, meanings, evidence, linked themes, related entities, related prophecies, confidence, and source grounding.
- Keep the change display/search only with no new records, reasoning expansion, extraction changes, crawling, or fetching.

Codex action summary:
- Extended Passage Function search text to include `scopePath` and `relatedProphecies` in addition to the existing meaning, evidence, themes, entities, confidence, and grounding fields.
- Kept the no-search view showing all Passage Function cards.
- Updated the filtered empty state to `No passage functions match current filter.`
- Added related prophecies to cards when present.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Validation run:
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

Status:
- Implemented by PCDX.

## 2026-05-15 - Phase 8.2c Passage Function Evidence Review View

Instruction summary:
- Make `ICE_PASSAGE_FUNCTIONS` transparent, reviewable, and evidence-centered in the Study Panel.
- Show what each function claim is, why the app believes it, what evidence supports it, confidence, and source grounding.
- Keep the change display-only with no reasoning broadening, crawling/fetching, extraction rewrite, or pilot-record changes.

Codex action summary:
- Refined the Study Panel `Passage Functions` card body to show verse range, meaning, fulfillment meaning, evidence bullets, linked themes, related entities, confidence, source grounding, and scope.
- Added compact list helpers for evidence and line-list fields so long arrays stay reviewable.
- Preserved existing `ICE_PASSAGE_FUNCTIONS` records and QA counts.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Status:
- Implemented by PCDX.

## 2026-05-15 - Phase 8.2 Passage Function Scaffolding

Instruction summary:
- Create the structural `ICE_PASSAGE_FUNCTIONS` derived-layer foundation without generalized theological reasoning or broad hard-coded passage cards.
- Add Matthew 1 pilot records only where grounded in current source phrases, semantic events, relationship graph, prophecy links, or canonical identities.
- Add a compact Study Panel `Passage Functions` section and QA-safe assertions.

Codex action summary:
- Added `ICE_PASSAGE_FUNCTIONS` storage, status count, and scope-integrity inclusion.
- Added future-safe passage function records with `sourceCaptureId`, `scopePath`, `verseRange`, `passageFunction`, meanings, evidence, themes, related entities/prophecies, confidence, and source grounding.
- Added four Matthew 1 pilot records: `genealogy_establishes_identity`, `divine_message_instruction`, `prophecy_fulfillment_identification`, and `obedient_response_and_naming`.
- Added Study Panel display for function name, verse range, meaning, themes, fulfillment note, evidence, and confidence.
- Extended Matthew 1 QA to assert grounded passage function records.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
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

Status:
- Implemented by PCDX.

## 2026-05-15 - Repo Coordination Cleanup: Close Phase 8.1 Narrative Timeline Handoff

Instruction summary:
- Mark the old Phase 8.1 Narrative Timeline outbox directive as completed or superseded.
- Confirm the AngEL Of THE LORD display spelling activity entry is complete.
- Keep Phase 8.2 Passage Function / Narrative Purpose Layer documented as roadmap only.

Codex action summary:
- Updated `THREAD_ARCHIVE/AGENT_OUTBOX.md` to mark the original Phase 8.1 Narrative Timeline directive as done / superseded.
- Added a concise completion note listing the Phase 8.1 refinement path: narrative timeline layer, Moment wording, scope normalization, relationship relevance tightening, displayed count consistency, source preview/canonical display refinement, hierarchy-aware entity ordering, and AngEL Of THE LORD display spelling.
- Confirmed the latest AngEL Of THE LORD display spelling entry in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` is complete and not truncated.
- Confirmed Phase 8.2 roadmap documentation already exists in `PROJECT_STATE.md`, `PROJECT_LOG.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

Files changed:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `git diff --check`

QA result:
- Documentation/coordination only; browser QA not required.

Commit hash:
- This commit

Status:
- Completed
## 2026-05-15 - Phase 8.1 Cleanup: Narrative Timeline Display Layer Clarification

Instruction summary:
- Keep the readable Matthew 1 Narrative Timeline useful while making clear it is temporary display-derived labeling, not final semantic architecture.
- Do not remove current labels, change extraction logic, or change QA counts.

Codex action summary:
- Added a Study Panel `Narrative Label Note` under Narrative Timeline: narrative labels are display-derived from current semantic data and the future passage-function layer will generalize this.
- Renamed the Matthew 1 helper to `applyTemporaryMatthewOneDisplayTimeline` and added a code comment pointing future agents toward `ICE_PASSAGE_FUNCTIONS` / `ICE_NARRATIVE_PURPOSES`.
- Preserved current readable Matthew 1 labels and generic fallback behavior.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts unchanged: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented
## 2026-05-15 - Phase 8.2 Roadmap: Passage Function / Narrative Purpose Layer

Instruction summary:
- Document a future derived layer that identifies why a passage or section exists, not only what events occur.
- Do not implement yet.

Codex action summary:
- Added Phase 8.2 roadmap notes for a future `ICE_PASSAGE_FUNCTIONS` or `ICE_NARRATIVE_PURPOSES` layer.
- Captured the proposed record shape with scope, verse range, passage function, meanings, evidence, linked themes, entities, prophecies, confidence, and source grounding.
- Documented Matthew 1 examples and reusable passage function types.
- Clarified that this should not become hard-coded cards for every passage; it should become a reusable source-grounded derived semantic layer.

Files changed:
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `git diff --check`

QA result:
- Documentation only; browser QA not required.

Commit hash:
- This commit

Status:
- Roadmap documented
## 2026-05-15 - Narrative Timeline Refinement: Readable Narrative Meaning Order

Instruction summary:
- Refine Narrative Timeline so Matthew 1 reads in intuitive narrative order instead of raw technical grouping.
- Promote genealogy to the first major moment, add Mary found with child, separate Joseph pondering from the AngEL instruction, and keep fulfillment and Joseph response/naming distinct.
- Preserve display-only behavior with no extraction, source phrase, page rendering, crawling, or linked-page fetching changes.

Codex action summary:
- Added a Matthew 1 display-derived timeline grouping layer with six readable moments: genealogy, Mary found with child, Joseph pondering, AngEL Of THE LORD instruction, fulfillment, and Joseph obedience/naming.
- Added compact `Category` and `Meaning` lines above technical Events / Relationships / Flow / Entities details.
- Kept generic fallback timeline behavior for other pages and chapters.
- Ensured the AngEL instruction moment explicitly includes `THE LORD`, `AngEL Of THE LORD`, `Joseph`, and `Mary` in hierarchy-aware entity display.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts unchanged: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented
## 2026-05-15 - Study Panel Display Refinement: AngEL Of THE LORD Casing

Instruction summary:
- Update the Study Panel canonical angel display spelling to `AngEL Of THE LORD` when the Angel of THE LORD appears.
- Keep the change display-only and do not alter extracted source phrases or stored semantic data.

Codex action summary:
- Updated the conservative canonical display helper to render safe angel label variants as `AngEL Of THE LORD`.
- Updated the Class II example label to match the preferred display spelling.
- Did not change extraction logic, source text storage, page rendering, crawling, or QA expectations.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts unchanged: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented
## 2026-05-15 - Narrative Timeline Display Refinement: Hierarchical Entity Ordering

Instruction summary:
- Add readable narrative moment labels such as Matthew 1:20 instruction, Matthew 1:1-17 lineage, Matthew 1:22-23 fulfillment, and Matthew 1:24-25 response/naming.
- Display entities inside Narrative Timeline moments in sacred/authority hierarchy order without changing stored extraction data.
- Keep Angel display canonical as `Angel of THE LORD` and keep the timeline compact.

Codex action summary:
- Added display-only Narrative Timeline helpers for moment verse labels and concise moment topics.
- Added hierarchy-aware entity label sorting for moment previews: divine authority first, divine messenger second, human actors/recipients next, and birth/naming focus entities handled without flattening the authority order.
- Reused existing Entity Registry / Canonical Identity classification and Angel canonical display helpers where available.
- Did not change extraction logic, stored entity arrays, page rendering, crawling, linked-page fetching, or existing panel structure.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts unchanged: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented
## 2026-05-15 - Study Panel Refinement: Source Preview Priority and Angel Display

Instruction summary:
- Reorder Source Discovery preview so immediate study-note refs appear before broad cross references and navigation/external refs.
- Refine Study Panel display labels so angel entity naming/casing is consistent as `Angel of THE LORD` where safe.
- Keep the change display-only with no extraction, source phrase storage, page rendering, crawling, or count changes.

Codex action summary:
- Added preview-only Source Discovery ranking: study notes first, then current scoped verse/chapter refs, cross references, navigation/source refs, and external/other refs.
- Applied the preview sort only to displayed Source Discovery cards; stored `ICE_SOURCE_DISCOVERY_INDEX` order and counts are unchanged.
- Added a conservative canonical display helper that uses existing Entity Registry / Canonical Identity angel labels where available and normalizes angel display casing to `Angel of THE LORD`.
- Avoided broad alias promotion or theological inference; this is Study Panel display text only.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js`
- `git diff --check`
- `npm.cmd run qa:matthew1`

QA result:
- PASS. Counts unchanged: DOM hints 173, mentions 172, entity registry 46, relationship graph 61, canonical identities 48, semantic events 48, semantic flow chains 1, source discovery 136, reference graph 136.

Commit hash:
- This commit

Status:
- Implemented
## 2026-05-15 - Phase 8.1 QA Refinement: Narrative Timeline Count Consistency

Instruction summary:
- Make Narrative Timeline relationship and flow counts match the relationships and flow items actually displayed in each compact Moment card.
- Preserve current narrative separation improvements, including lineage isolation and no broad chapter leakage.

Codex action summary:
- Added displayed relationship/flow helper functions for Narrative Timeline cards.
- Updated Narrative Timeline summary counts to report displayed relationship edges and displayed flow links/nodes.
- Updated per-Moment metadata to count the displayed relationship/flow preview items rather than the larger attached candidate arrays.
- Kept compact display, `Moment` wording, scope normalization, extraction logic, page rendering, linked-page fetching, crawling, and existing panel behavior unchanged.

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
## 2026-05-15 - Phase 8.1 QA Refinement: Narrative Timeline Relevance Tightening

Instruction summary:
- Tighten Narrative Timeline relationship and flow attachment so each Moment shows relationships/flow nodes truly relevant to that narrative moment.
- Prefer exact verse/scope matches, participant matches within the moment's semantic events, and source phrase overlap.
- Do not attach broad chapter-scope relationships unless no narrower scope exists, and keep lineage/genealogy isolated to lineage moments.

Codex action summary:
- Added narrow-scope checks that ignore broad chapter, relationship, event, identity, and mention scope paths as standalone attachment evidence.
- Added lineage detection so lineage/father-son relationship edges are rejected from non-lineage narrative moments.
- Tightened relationship attachment so participant overlap must also have narrow scope or source phrase overlap.
- Tightened flow node/link attachment to prefer linked semantic event IDs, narrow scope, verse ref, or source phrase overlap.
- Kept `Moment` wording, scope normalization, extraction logic, page rendering, linked-page fetching, crawling, and existing panels unchanged.

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
## 2026-05-14 - Critical QA Fix: Scope Normalization in Timeline Views

Instruction summary:
- Fix Study Panel render error: `entry.scopes.includes is not a function`.
- Normalize scope values before `.includes`, `.map`, `.some`, `.join`, or iteration in scope-aware render paths.
- Preserve existing scope values and keep previous Narrative Timeline QA refinement: `Step` -> `Moment` and stricter relationship attachment.

Codex action summary:
- Added a shared `normalizeScopeList()` helper that accepts undefined, null, string, Set, array, and object-shaped scope values.
- Routed Verse Scope Focus, Entity Scope Focus, Narrative Timeline, Reference Graph scope labels, entity scope matching, and narrative scope matching through normalized scope lists.
- Preserved scope values from `scope`, `scopePath`, `fromScopePath`, `sourceScopePath`, and `sourceContext.scopePath`.
- Kept the Phase 8.1 display wording as `Moment` and retained stricter relationship attachment to prevent lineage leakage.

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
## 2026-05-14 - Phase 8.1 QA Refinement: Narrative Timeline Wording and Relationship Attachment

Instruction summary:
- Change Narrative Timeline display wording from `Step` to `Moment` so the view does not imply a procedure/instruction list.
- Prevent unrelated lineage relationship edges from appearing inside Joseph/Angel/fulfillment narrative moments.
- Keep genealogy available as its own lineage/grouped material without polluting dream, fulfillment, or response moments.

Codex action summary:
- Updated display text from `Timeline steps` / `Step N` to `Timeline moments` / `Moment N`.
- Removed position-only relationship attachment from Narrative Timeline entries.
- Refined relationship attachment so edges join a moment only through specific scope/verse/evidence matches or when both relationship participants are present in that moment's semantic events.
- Preserved internal timeline identifiers and kept the change display/refinement-only.

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

## 2026-05-14 - Phase 8.1 Scope-Aware Narrative Timeline Layer

Instruction summary:
- Build a unified narrative timeline investigation layer using ordered events, semantic flow chains, semantic events, scope integrity, verse scopes, and entity focus data.
- Allow the Study Panel to show event progression and semantic causality in timeline order.
- Preserve extraction logic, avoid linked-page fetching or crawling, and keep the change additive/non-destructive.

Codex action summary:
- Added a compact Study Panel `Narrative Timeline` section near the scope/entity focus views.
- Built timeline entries from existing ordered events and semantic events, grouped by timeline position and shared scope where available.
- Annotated each timeline step with scope labels, linked entities, semantic event previews, relationship graph edges, and semantic flow-chain links/nodes.
- Added filtering support for entity searches such as `Joseph` and scope searches such as `1:20` by reusing the existing entity and verse focus helpers.
- Kept extraction logic, page rendering, linked-page fetching, crawling, and existing panels unchanged.

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

## 2026-05-14 - Phase 8.0 Scope-Aware Entity/Reference Focus

Instruction summary:
- Make entity searches useful as a unified investigation view connecting identity, class, scopes, events, relationships, mentions, references, and flow-chain nodes.
- Activate only when the search/filter matches an entity, canonical identity, or mention.
- Do not change extraction logic, fetch linked pages, crawl, rewrite existing panels, or change page rendering.

Codex action summary:
- Added a compact Study Panel `Entity Scope Focus` section that is hidden until an entity-like search matches stored entity/canonical data.
- Added entity focus matching across Entity Registry and Canonical Identities, including aliases and surface forms.
- Built focused buckets for identity/class, scope/verse presence, semantic events, relationship graph edges, mentions, scoped references, and flow-chain nodes.
- Connected source discovery and reference graph edges by the same normalized verse/note scope paths where the entity appears.
- Kept `Verse Scope Focus` unchanged and left extraction/rendering untouched.

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

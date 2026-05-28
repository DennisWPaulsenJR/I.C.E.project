# I.C.E. Project Log

Chronological implementation and decision log. Entries are reverse chronological. Keep this summarized; do not paste raw chat transcripts here.

## 2026-05-27 - Phase 8.3a Matthew 2 Adversarial / Protective Semantics

Instruction summary:
- Refine Matthew 2 around adversarial intent, protective obedience, preservation of the CHILD, deceptive authority, hostile misuse of power, Divine preservation paths, movement/location continuity, revelation escalation, semantic contrasts, and principle-layer themes.

Codex action summary:
- Tightened Herod Class i handling with evidence-grounded deceptive speech, misuse of authority, child-targeting hostility, and destroy-him intent.
- Added Matthew 2 passage functions for repeated guidance preservation cycles, movement/location prophecy continuity, and hostile deception vs protective obedience contrast.
- Expanded Matthew 2 ontology roles for Jerusalem and Nazareth and refined Egypt as a Divine preservation path location.
- Added Matthew 2 semantic ambiguity/contrast records for deceptive worship language vs hostile intent and protective obedience vs hostile deception.
- Added a process path to the protective origin/authority record: THE LORD -> AngEL Of THE LORD -> Joseph -> CHILD / JESUS preservation.
- Updated principle classification for Divine preservation, adversarial opposition, and fulfillment through movement.

Files changed:
- `background.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-22 - Reference Roles User-Intuitive Display

Instruction summary:
- Begin Reference Roles user-intuitive display refinement.
- Add normal-user explanations for technical roles such as Messianic Identity Support, Name Meaning Support, Davidic Lineage Support, Abrahamic Covenant Support, and Prophecy Fulfillment Support.
- Add optional Page Summary / Source Description near the top of the Study Panel when current-page metadata/DOM/source capture provides one.
- Preserve exact source labels, technical provenance, source phrase vs derived meaning separation, JESUS / JESUS CHRIST / CHRIST distinction, HOLY SPIRIT preference, hierarchy formatting, and display-only behavior.

Codex action summary:
- Reworked Reference Role card display order to lead with Reference Role, What This Reference Helps Explain, Source Reference, Resolved Being, Canonical/source identity, Why It Matters, and Confidence.
- Kept Technical Provenance collapsed by default and preserved exact source labels through a display-only exact-text option.
- Added optional Page Summary / Source Description rendering from existing current-page metadata, adapter fields, source context fields, or DOM semantic hints only when such description text exists.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-22 - Reference Role Provenance Trace

Instruction summary:
- Add Reference Role provenance trace for source titles such as `Redeemer`.
- Show where source/reference titles came from across Source Discovery, Reference Graph, and `ICE_REFERENCE_ROLES`.
- Preserve exact source labels, resolved display, source records, and compact expandable behavior.

Codex action summary:
- Added display-only Reference Role provenance helpers that look up the existing source discovery record and reference graph edge by `sourceDiscoveryId`.
- Added an expandable `Reference Role Provenance` block showing sourceDiscoveryId, referenceGraph edge id, href, source label text, scopePath, verseRef, adapter, and confidence.
- Enriched Related Semantic Layers labels for Reference Role and Reference Graph links with compact provenance details.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-22 - Semantic Resolution Trace Display Refinement

Instruction summary:
- Begin Phase 8.2w Semantic Resolution Trace Display Refinement.
- Make Semantic Resolution Trace sections compact, expandable, and readable for users across Passage Functions, Revelation Patterns, Reference Roles, Semantic Ontology Roles, and Semantic Ambiguities / Contrasts.
- Preserve source phrase vs Derived meaning separation, hierarchy formatting, divine display compliance, JESUS / JESUS CHRIST / CHRIST distinction, HOLY SPIRIT preference, Class hierarchy, and existing extraction behavior.

Codex action summary:
- Added a shared display-only Semantic Resolution Trace renderer with Source Input, Resolved Output, Layers Used, Evidence Used, Ambiguity Check, and Confidence blocks.
- Attached the trace to the five requested semantic card sections without changing extracted semantic records or crawl/fetch behavior.
- Added compact trace styling that keeps details collapsed by default and preserves source quote and derived display treatment.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-21 - Semantic Confidence Visualization

Instruction summary:
- Add Phase 8.2s restrained semantic confidence visualization.
- Make explicit, probable, possible, attributed, and unresolved confidence levels visually distinguishable without treating confidence as truth styling.
- Preserve semantic records, source phrases, source phrase vs Derived meaning separation, hierarchy formatting, divine display compliance, and semantic-card compression.

Codex action summary:
- Added section-level confidence CSS hooks in `study.js` for existing `Confidence` sections.
- Added restrained CSS classes: `ice-confidence-explicit`, `ice-confidence-probable`, `ice-confidence-possible`, `ice-confidence-attributed`, and `ice-confidence-unresolved`.
- Kept confidence rendering textual and stable while adding low-noise grounding visibility in semantic cards.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- Manual smoke: reviewed CSS diff for readable, restrained, non-alarming confidence styling.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Semantic Visual Ontology Styling

Instruction summary:
- Add Phase 8.2r restrained semantic visual hierarchy styling.
- Use existing ontology/class CSS hooks to differentiate Divine Origin, messenger/transfer, Human response, adversarial Class 𝑖, source wording, and derived meaning.
- Preserve semantic records, source phrases, source phrase vs Derived meaning separation, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, CHILD display, and Class hierarchy.

Codex action summary:
- Added source phrase and derived meaning section classes from the Study Panel section helper.
- Refined `ice-authority-path` styling so THE LORD -> AngEL Of THE LORD -> Joseph reads as origin -> transfer -> recipient without flashy treatment.
- Tuned class hooks for Divine Class I, Class II messenger, Class III Human, and adversarial Class 𝑖 so Class 𝑖 remains visually distinct from Class I.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- Manual smoke: CSS diff reviewed for restrained colors, stable spacing, and readable class transfer/source-derived styling.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Class 𝑖 Hierarchy Correction

Instruction summary:
- Correct adversarial hierarchy display from uppercase sequence class to italic lowercase `Class 𝑖`.
- Ensure Class 𝑖 never visually collapses with Divine `Class I` before future semantic visual hierarchy styling.

Codex action summary:
- Updated display classification so adversary / wicked / evil / anti-GOD resolves to `Class 𝑖`.
- Renamed the Divine Class I CSS hook in the class-transfer display to `ice-class-i-divine` and added `ice-class-i-adversary` for future distinct styling.
- Updated project state hierarchy notes and current class-transfer CSS hook references.

Files changed:
- `background.js`
- `study.js`
- `study.css`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Class Transfer Display

Instruction summary:
- Refine HOLY Origin / class-transfer display so instruction and revelation show as class-mediated authority transfer.
- Display THE LORD -> AngEL Of THE LORD -> Joseph and Class I -> Class II -> Class III without implying AngEL Of THE LORD is origin authority.
- Preserve source phrases, source phrase vs Derived meaning split, JESUS / JESUS CHRIST / CHRIST distinction, HOLY SPIRIT preference, CHILD display, and hierarchy formatting.

Codex action summary:
- Added reusable Study Panel Authority Path / Class Transfer display blocks in `study.js`.
- Mounted the class transfer display on Divine Message Instruction, Revelation Pattern, and Origin / Authority Path cards when THE LORD, AngEL Of THE LORD, and Joseph are present in semantic context.
- Added CSS hooks/classes for class transfer display: `ice-class-i-divine`, `ice-class-i-adversary`, `ice-class-ii`, `ice-class-iii`, `ice-transfer-action`, `ice-authority-path`, and `ice-derived-meaning`.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Divine CHILD Display Refinement

Instruction summary:
- Refine derived semantic display so CHILD is exalted only when child references point to the revealed/divine CHILD connected to JESUS.
- Preserve source phrase casing, Human references, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, and hierarchy formatting.

Codex action summary:
- Added contextual derived-display helpers in `study.js` that render `child` as `CHILD` only when divine/revealed CHILD context is present.
- Kept source-quote rendering unchanged so quoted source phrases preserve original wording.
- Scoped the refinement to derived display paths used by Passage Functions, Revelation Patterns, Narrative Timeline, Semantic Events, Semantic Flow Paths, and Origin / Authority Paths.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Semantic Ambiguity Display Refinement

Instruction summary:
- Refine Study Panel `Semantic Ambiguities / Contrasts` into readable semantic cards.
- Keep the change display-only while preserving source phrase vs Derived meaning, divine display compliance, hierarchy formatting, and JESUS / JESUS CHRIST / CHRIST distinctions.

Codex action summary:
- Updated `study.js` ambiguity cards to show `Semantic Contrast`, readable contrast type, source phrase, derived meaning, resolved status, why-it-matters summary, confidence, source grounding, expandable evidence, related layers, and scope.
- Added display label helpers for the five Matthew 1 pilot contrast types without changing stored ambiguity records.
- Kept grounding evidence expandable to reduce visual load while preserving review detail.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `semanticAmbiguities: 5`.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Semantic Ambiguity / Contrast Layer

Instruction summary:
- Add Phase 8.2o Semantic Contradiction / Ambiguity Detection Layer.
- Teach I.C.E. to recognize resolved contrasts and context-required interpretation points without fabricating contradictions.
- Preserve source phrase vs Derived meaning separation, ontology roles, hierarchy formatting, divine display compliance, and source grounding.

Codex action summary:
- Added `ICE_SEMANTIC_AMBIGUITIES` as a derived semantic layer generated from existing source-grounded semantic records.
- Added Matthew 1 pilot contrasts for JESUS versus JESUS CHRIST, CHRIST versus revealed NAME, Holy Ghost versus HOLY SPIRIT, scripture narrator versus divine authority source, and pronoun referent context requirements.
- Added Study Panel `Semantic Ambiguities / Contrasts` cards showing semantic items, ambiguity/contrast type, source phrase, derived meaning, resolution status, confidence, evidence, source grounding, and related layers.
- Added storage, scope integrity, diagnostics, and Matthew 1 QA coverage for the new layer.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `semanticAmbiguities: 5`.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-20 - Semantic Ontology Role Layer

Instruction summary:
- Add Phase 8.2n Semantic Ontology / Role Classification Expansion.
- Formalize role categories beyond simple entity grouping while preserving source phrase vs Derived meaning separation.
- Keep Matthew 1 pilot conservative and evidence-backed.

Codex action summary:
- Added `ICE_ONTOLOGY_ROLES` as a derived semantic layer generated from existing source-grounded semantic records.
- Added Matthew 1 pilot records for JESUS, CHRIST, JESUS CHRIST, THE LORD, AngEL Of THE LORD, Joseph, Mary, HOLY SPIRIT, scripture narrator, and quoted prophet.
- Added Study Panel `Semantic Ontology Roles` cards showing ontology roles, authority/origin class, narrative role, canonical role, source phrase, derived meaning, confidence, source grounding, related entities, and related layers.
- Added scope integrity, storage, diagnostics, and Matthew 1 QA coverage for the new layer.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `ontologyRoles: 10`.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-19 - Source and Derived Display Standardization

Instruction summary:
- Standardize Study Panel display so semantic interpretation separates preserved source wording from derived I.C.E. meaning.
- Apply the Revelation Pattern source phrase / derived meaning display pattern across major semantic layers.
- Preserve source quote casing, Human referents, JESUS / JESUS CHRIST / CHRIST distinction, and HOLY SPIRIT derived preference.

Codex action summary:
- Added reusable source phrase / derived meaning display helpers in `study.js`.
- Applied source/derived blocks to Passage Function evidence, Revelation Pattern evidence, Reference Role evidence, Origin / Authority Path evidence, Semantic Event previews, Relationship Graph previews, Narrative Timeline event/relationship/flow snippets, and Semantic Flow Path nodes.
- Standardized Semantic Distinctions section labels to `Source phrase` and `Derived meaning`.
- Kept stored source phrases and semantic records unchanged.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `passageFunctions: 4`, `revelationPatterns: 1`, `referenceRoles: 20`, `semanticDistinctions: 8`, and `originAuthorityPaths: 1`.

Commit:
- This commit

Status:
- Implemented by PCDX.
## 2026-05-19 - Origin Authority Path Layer

Instruction summary:
- Add Phase 8.2m Semantic Origin / Authority Path Layer.
- Formalize the distinction between grammar, capitalization, semantic authority, origin, messenger path, Human response, and divine causality.
- Keep Matthew 1 pilot conservative, source-grounded, and derived from existing semantic layers.

Codex action summary:
- Added `ICE_ORIGIN_AUTHORITY_PATHS` as a derived semantic layer generated from existing revelation patterns, semantic events, passage functions, semantic flow paths, relationship graph, and canonical identities.
- Added a Matthew 1 pilot path: THE LORD -> AngEL Of THE LORD -> Joseph -> obedient response -> JESUS is named, with mission `HE shall SAVE HIS People from their sins`.
- Added Study Panel `Origin / Authority Paths` cards showing origin, messenger/means, recipient, response, result, mission/fulfillment, hierarchy, evidence, confidence, source grounding, and related semantic navigation.
- Added Matthew 1 QA coverage for the new storage key and grounded pilot path.
- Preserved source text, extraction logic, hierarchy formatting, divine display compliance, HOLY SPIRIT preference, and JESUS / JESUS CHRIST / CHRIST distinctions.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `originAuthorityPaths: 1`.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-19 - Naming and Reference Display Normalization

Instruction summary:
- Normalize file/reference/display naming against I.C.E. naming instructions.
- Keep general/common names lower case unless used as section headings or approved exalted/I.C.E. terms.
- Preserve GOD, THE LORD, JESUS, JESUS CHRIST, CHRIST, HOLY SPIRIT, AngEL Of THE LORD, NAME, class labels, and actor lane names.

Codex action summary:
- Lowercased generic narrator/prophet-derived labels in current generated semantic records and semantic distinction references, including `scripture narrator` and `quoted prophet`.
- Updated derived HOLY SPIRIT semantic summaries/entities while preserving direct `Holy Ghost` quoted source phrases/evidence and source-wording distinction records.
- Tightened the displayed `narrative NAME: JESUS` wording in entity-role display text.
- Reviewed repo filename candidates and did not rename files because `QA status.MD`, `Rules.json`, and `DIVINE_TITLES.json` have existing references or manifest/engine coupling; proposed coordinated future renames instead.

Proposed future rename review:
- `QA status.MD` -> `qa-status.md` after updating repo memory references.
- `Rules.json` -> `rules.json` after updating `manifest.json` and `engine.js`.
- `DIVINE_TITLES.json` -> `divine-titles.json` after updating `manifest.json` and `engine.js`.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with `semanticDistinctions: 8`.

Commit:
- This commit

Status:
- Implemented by PCDX.


## 2026-05-19 - Semantic Distinction Layer

Instruction summary:
- Add Phase 8.2l Semantic Contrast / Distinction Layer.
- Prevent distinct concepts such as name, title, role, office, narrator, authority, messenger, source phrase, derived meaning, canonical identity, revealed identity, narrative-time identity, and retrospective identity from collapsing into one meaning bucket.
- Keep Matthew 1 pilot conservative and evidence-backed.

Codex action summary:
- Added `ICE_SEMANTIC_DISTINCTIONS` as a derived semantic layer generated from existing Matthew 1 semantic records.
- Added 8 pilot distinction records for JESUS, CHRIST, JESUS CHRIST, HOLY SPIRIT, Holy Ghost, Scripture narrator, THE LORD, and AngEL Of THE LORD.
- Added Study Panel `Semantic Distinctions` cards showing semantic item, distinction type, narrative role, canonical role, source wording, derived wording, confidence, and source grounding.
- Added Matthew 1 QA coverage for the new storage key and pilot distinction records.
- Preserved source text, extraction logic, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST / CHRIST distinctions.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `npm.cmd run qa:matthew1` passed with `semanticDistinctions: 8`.
- `git diff --check` passed

Commit:
- This commit

Status:
- Implemented by PCDX.






## 2026-05-19 - Exaltation Display Compliance Refinement

Instruction summary:
- Refine Study Panel/app display compliance for JESUS as revealed divine NAME.
- Exalt display wording for JESUS-related references such as `HIS NAME JESUS` and `HE shall SAVE HIS People`.
- Preserve human references as human and keep narrator, prophet, Joseph, and Mary as `Class III - Human` unless evidence says otherwise.
- Preserve JESUS / JESUS CHRIST / CHRIST distinction and AngEL Of THE LORD display.

Codex action summary:
- Updated Study Panel display compliance helper so divine-context phrases render `call HIS NAME JESUS`, `called HIS NAME JESUS`, `HIS NAME JESUS`, and `HE shall SAVE HIS People`.
- Updated JESUS name/title distinction display strings from `Narrative name` to `Narrative NAME`.
- Updated JESUS-related section labels to `NAME / Title Distinction` and revelation part labels to preserve `NAME` where the revealed NAME JESUS is in view.
- Did not alter stored source text, extracted source phrases, semantic records, extraction logic, hierarchy classification, or QA counts.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- Manual Study Panel smoke passed: no render error, Passage Functions 4, Revelation Patterns 1, Reference Roles 20, `HIS NAME JESUS` present, old `HIS name JESUS` absent, `HE shall SAVE HIS People` present, and `Class III - Human` visible.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-19 - Semantic Navigation Usability Pass

Instruction summary:
- Improve UX feedback for Phase 8.2j semantic navigation focus jumps.
- Add a visible current semantic focus status line and a clear/reset control.
- Preserve normal search behavior, semantic data, extraction logic, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST distinction.

Codex action summary:
- Added a compact `Current semantic focus` status panel near the top of the Study Panel.
- Added `Clear semantic focus` to reset search-driven semantic focus and return to the normal full Study Panel view.
- Updated semantic navigation clicks to populate the status line, preserve focused search terms, scroll to the destination, open destination details when targeting a card, and apply a temporary highlight.
- Updated manual search input behavior so ordinary typing clears semantic-focus status and remains a normal filter action.
- Did not change semantic records, extraction logic, stored source phrases, or QA counts.

Files changed:
- `study.html`
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- Manual Study Panel smoke passed: clicked live Related Semantic Layers buttons, confirmed focus status, search focus text, destination highlight, and clear/reset behavior.

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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-19 - Study Panel Navigation Render Error Fix

Instruction summary:
- Fix Study Panel render crash after Phase 8.2j: `(text || "").replace is not a function`.
- Preserve semantic navigation focus jumps, semantic data, divine display compliance, JESUS / JESUS CHRIST distinction, and hierarchy formatting.

Codex action summary:
- Added object-safe `toDisplayText` normalization ahead of `normalizeText` so arrays, numbers, booleans, object labels, entity records, scope objects, and navigation payloads become strings before display helpers call `.replace`.
- Kept Phase 8.2j navigation buttons and focus-jump behavior intact.
- Did not change semantic records, extraction logic, stored source phrases, or QA counts.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- Manual Study Panel reload smoke passed: no render error, adapter `lds_scripture_adapter`, Passage Functions 4, Revelation Patterns 1, Reference Roles 20.

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-19 - Semantic Navigation / Focus Jump UI

Instruction summary:
- Make related semantic layers navigable instead of only visually related.
- Allow Study Panel users to jump from related semantic buckets into Passage Functions, Revelation Patterns, Reference Roles, Semantic Events, Semantic Flow Paths, Narrative Timeline, Verse Scope Focus, Entity Scope Focus, and Reference Graph sections.
- Preserve semantic data, extraction logic, hierarchy formatting, divine display compliance, and JESUS / JESUS CHRIST distinction.

Codex action summary:
- Converted collapsed `Related Semantic Layers` entries from static text into lightweight navigation buttons.
- Added semantic card target keys for Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline cards, Semantic Flow Path cards, and Semantic Event cards.
- Added focus-jump behavior that updates the Study Panel search/filter when needed, opens focused semantic cards, scrolls to the destination, and applies a temporary focus highlight.
- Added Verse Scope and Entity Scope jump behavior by reusing the existing search-driven focus sections.
- Kept links display-only and derived from existing cross-layer evidence; no semantic records or extraction behavior changed.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-18 - Cross-Layer Semantic Linking

Instruction summary:
- Add display-level cross-links so major semantic layers connect without being merged into one generic layer.
- Link Passage Functions, Revelation Patterns, Reference Roles, Semantic Flow Paths, Narrative Timeline, Entity Scope Focus, and Verse Scope Focus through existing evidence only.
- Preserve hierarchy formatting, divine display compliance, JESUS / JESUS CHRIST distinction, semantic data, and extraction logic.

Codex action summary:
- Added a display-only related-layer resolver that matches records through shared verse scope, scope path evidence, related passage function keys, recognized entity overlap, semantic event IDs, reference discovery IDs, and reference graph edges.
- Added collapsed `Related Semantic Layers` buckets to Passage Function, Revelation Pattern, Reference Role, Narrative Timeline, and Semantic Flow Path cards.
- Kept cross-layer references compact, leaving each semantic layer in its native section rather than flattening records together.
- Restricted entity-scope links to recognized entity records and established Matthew 1 entities so meaning phrases are not presented as entity links.
- Did not change extraction logic, stored semantic records, source phrases, source grounding data, semantic counts, or storage keys.

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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - Semantic Card Compression / Progressive Detail

Instruction summary:
- Add compact progressive-detail behavior for semantic cards while preserving exhaustive semantic review ability.
- Focus Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline, and Semantic Flow Paths.
- Preserve hierarchy formatting, divine display compliance, JESUS / JESUS CHRIST distinction, and all semantic data.

Codex action summary:
- Added reusable collapsible semantic sections backed by native `details` / `summary` controls.
- Compressed Passage Function, Revelation Pattern, and Reference Role cards so highest-value meaning, primary entities, confidence, and short evidence stay visible by default.
- Moved long evidence, source grounding, scope, hierarchy, related lists, and technical semantic detail behind expandable rows.
- Converted Narrative Timeline and Semantic Flow Path cards to the same semantic-card structure with compact visible summaries and expandable full detail.
- Did not change extraction logic, stored semantic records, source phrases, source grounding data, QA counts, or semantic storage keys.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - Hierarchy Compliance Display Refinement

Instruction summary:
- Refine Study Panel hierarchy/exaltation formatting so narrator and semantic displays consistently reflect I.C.E. entity classes.
- Ensure `Scripture narrator` displays as `Class III - Human` and is not visually elevated into divine authority.
- Preserve distinctions between narrator, prophet, divine speech, THE LORD, and AngEL Of THE LORD.

Codex action summary:
- Updated class display labels to the required `Class I - ...`, `Class II - ...`, `Class III - Human`, `Class IIII - Living organism / creature`, `Class IIIII - Non-living item/object`, `Class 𝑖 - adversary / wicked / evil / anti-GOD`, and `AI_Actor - artificial/tool actor category` wording.
- Added display fallback classification for `Scripture narrator`, `narrator`, `prophet`, and `the prophet` as `Class III - Human` when they appear as related display entities without a full registry record.
- Added hierarchy lines to derived semantic displays, including Passage Functions, Revelation Patterns, Reference Roles, and Narrative Timeline entity previews.
- Removed duplicated `Class:` prefixing in entity, canonical identity, focus, and role displays so hierarchy labels are visually consistent.
- Did not change stored semantic data, extraction logic, source grounding, divine display compliance, JESUS / JESUS CHRIST distinction behavior, or QA semantics.

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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - Semantic Flow Paths Display Rename

Instruction summary:
- Rename Study Panel and display terminology from Semantic Flow Chains to Semantic Flow Paths.
- Preserve existing semantic flow data, storage keys, scope integrity, QA semantics, and counts.

Codex action summary:
- Updated Study Panel section headers, diagnostics labels, bucket labels, empty states, compact summaries, card fallback text, and Narrative Timeline flow wording to use `Semantic Flow Paths` / `flow path` terminology.
- Kept the internal `ICE_SEMANTIC_FLOW_CHAINS` storage key and `semanticFlowChains` data alias intact for backward compatibility.
- Did not change extraction logic, semantic data, flow relationships, scope integrity behavior, or QA assertions.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - Study Panel Review Flow Ordering

Instruction summary:
- Reorder Study Panel sections so semantic meaning appears before technical extraction/debug detail.
- Preserve all existing sections, data, counts, divine display compliance, and JESUS / JESUS CHRIST distinction.

Codex action summary:
- Reordered `study.html` sections to lead with Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline, entity/verse focus, Canonical Identities, Relationship Graph, Semantic Events, Semantic Flow Chains, Reference Graph, Source Discovery, and DOM Semantic Hints.
- Moved capture/source/adapter/scope integrity and raw extraction preview sections later as supporting review/debug material.
- Moved the diagnostic count panel to the lower QA/debug area while preserving its content and behavior.
- Aligned `renderStudy()` call order with the same semantic-first review flow.
- Did not change extraction logic, stored semantic data, counts, divine display compliance, or identity/title distinction behavior.

Files changed:
- `study.html`
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-17 - CHRIST Title Distinction Display Correction

Instruction summary:
- Clarify Study Panel display wording so `CHRIST` / `JESUS CHRIST` is shown as title/source/canonical identity, not Joseph's given-name action.
- Preserve narrative-time `JESUS`, canonical `JESUS CHRIST`, divine display compliance, stored source phrases, and semantic records.

Codex action summary:
- Added display-only helpers that distinguish narrative name `JESUS` from canonical/source-title identity `JESUS CHRIST`.
- Added Name / Title Distinction notes to Passage Function, Revelation Pattern, Reference Role, and Narrative Timeline derived displays when `JESUS` / `JESUS CHRIST` appears.
- Updated Canonical Identity displays to state that `CHRIST` is title/source identity and not Joseph's naming action.
- Updated Relationship Graph, focused relationship buckets, Semantic Event previews, and Semantic Flow node previews so Joseph naming displays as `JESUS` while retaining canonical linkage notes where relevant.
- No stored source text, extracted source phrases, semantic records, crawling/fetching behavior, or broad extraction logic changed.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Reference Roles Display Refinement

Instruction summary:
- Make `ICE_REFERENCE_ROLES` readable like Passage Functions and Revelation Patterns.
- Keep the pass display-only, preserving counts, stored reference role data, source text, hrefs, divine display compliance, and source grounding.

Codex action summary:
- Refined Reference Role cards to lead with a clear `Reference Role` heading and role display name.
- Added compact sections for Role, Reference, Semantic Purpose, Linked Themes, Linked Passage Functions, Linked Entities, Evidence, Confidence, Source Grounding, and Scope.
- Added display-only semantic purpose text derived from the existing `referenceRole` value without changing stored records.
- Preserved hierarchy-aware entity ordering and context-gated divine display compliance.

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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Divine Display Compliance Refinement

Instruction summary:
- Apply display-only I.C.E. capitalization compliance for divine pronouns/titles in Study Panel derived layers.
- Focus derived displays such as Passage Functions, Revelation Patterns, Reference Roles, Narrative Timeline, and safe evidence/source phrase previews.
- Preserve stored source text, extracted phrases, narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display, and source grounding.

Codex action summary:
- Added a context-gated divine display formatter in `study.js` that only upgrades pronoun/mission phrasing when surrounding semantic data already identifies divine context.
- Applied display compliance to Passage Function, Revelation Pattern, Reference Role, and Narrative Timeline card text/evidence previews.
- Targeted cases such as `HE shall SAVE HIS People from their sins`, `HIS name JESUS`, `THE LORD`, `AngEL Of THE LORD`, `JESUS`, `JESUS CHRIST`, and Holy Ghost display contexts.
- Kept this as display-only; no stored semantic records, extraction, source phrases, crawling/fetching, or page rendering behavior changed.

Files changed:
- `study.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Semantic Reference Role Layer

Instruction summary:
- Add a lightweight derived layer that explains why discovered references are attached to a scope.
- Use existing Source Discovery, Reference Graph, Passage Functions, Revelation Patterns, Canonical Identities, and Themes.
- Preserve source grounding, confidence, narrative-time `JESUS`, canonical `JESUS CHRIST`, and existing extraction behavior.

Codex action summary:
- Added `ICE_REFERENCE_ROLES` as a derived semantic role layer generated from current-page discovered references.
- Added conservative Matthew 1 pilot roles for davidic lineage support, Abrahamic covenant support, prophecy fulfillment support, messianic identity support, and name meaning support.
- Linked roles back to source discovery ids, scope paths, verse ranges, themes, passage functions, entities, evidence, confidence, and source grounding.
- Added Reference Roles cards to the Study Panel with discovered reference, semantic role, linked themes/entities/functions, evidence, confidence, grounding, and scope.
- Extended Matthew 1 QA to validate grounded reference roles and include reference-role counts/samples.
- Recovered and completed the partial `background.js` work from the interrupted session; no partial changes were discarded.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Revelation Patterns Display Refinement: Readable Semantic Cards

Instruction summary:
- Make Revelation Patterns as readable and intuitive as the refined Passage Function cards.
- Preserve semantic records, narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display, evidence, confidence, and source grounding.

Codex action summary:
- Replaced flattened Revelation Pattern text blocks with structured semantic cards in the Study Panel.
- Added distinct sections for authority source, speaker, recipient, pattern type, ordered revelation parts, evidence, related entities, confidence, and source grounding.
- Rendered ordered revelation parts as numbered items with source phrases for marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Reused hierarchy-aware entity ordering and display-only canonical linkage so `JESUS` and `JESUS CHRIST` remain visible where relevant.
- Added compact CSS for ordered revelation parts.
- Did not change stored semantic records, extraction, reasoning scope, crawling/fetching, evidence, confidence, or source grounding.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Passage Functions Display Refinement: Readable Semantic Cards

Instruction summary:
- Make Passage Functions intuitive, readable, hierarchical, and quickly scannable.
- Preserve semantic data, evidence, confidence, source grounding, narrative-time `JESUS`, canonical `JESUS CHRIST`, and existing extraction behavior.

Codex action summary:
- Replaced flattened Passage Function text blocks with structured semantic cards in the Study Panel.
- Added distinct card sections for meaning, fulfillment meaning, themes, key evidence, related entities, related prophecies, confidence, source grounding, and scope.
- Added hierarchy-aware related entity ordering while preserving the visible `JESUS` / `JESUS CHRIST` distinction where records contain both.
- Added compact semantic-card CSS for spacing, section headers, lists, and hidden evidence count display.
- Did not change stored semantic data, extraction, reasoning scope, crawling/fetching, or QA counts.

Files changed:
- `study.js`
- `study.css`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-16 - Phase 8.2f Revelation Pattern / Speech Structure Layer

Instruction summary:
- Create a reusable derived layer for structured speech/revelation blocks.
- Preserve narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display, source grounding, confidence, and current extraction stability.
- Add a compact Study Panel `Revelation Patterns` section.

Codex action summary:
- Added `ICE_REVELATION_PATTERNS` as a derived storage key and scope-integrity layer.
- Derived Revelation Pattern records from existing `divine_message_cluster` semantic events instead of broadening extraction.
- Added the Matthew 1 pilot pattern: THE LORD as authority source, AngEL Of THE LORD as speaker, Joseph as recipient, and ordered sub-events for marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Added Study Panel rendering for authority source, speaker, recipient, verse range, revelation type, ordered sub-events, evidence, related entities, related passage functions, confidence, and source grounding.
- Added Matthew 1 QA assertions for the Revelation Pattern layer.

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

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-15 - Phase 8.2e Multi-Instruction / Multi-Revelation Separation

Instruction summary:
- Prevent Matthew 1:20-21 complex revelation from collapsing into one generic instruction event.
- Separate AngEL Of THE LORD message into marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Preserve narrative-time `JESUS`, canonical `JESUS CHRIST`, AngEL Of THE LORD display, source grounding, and confidence.

Codex action summary:
- Recovered useful interrupted work in `background.js`, `study.js`, and `qa/matthew1-extension-qa.js` after relaunch.
- Added a source-grounded `conception_revelation` semantic event for `that which is conceived in her is of the Holy Ghost`.
- Added derived `divine_message_cluster` events that group related sub-events as marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Added compact Study Panel cluster preview in Narrative Timeline cards.
- Added Matthew 1 QA assertions for the conception revelation and four-part divine message cluster.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Commit:
- This commit

Status:
- Implemented by PCDX.

## 2026-05-15 - Semantic Correction: Preserve JESUS Naming Distinction

Instruction summary:
- Preserve the Matthew 1 narrative-time distinction between the revealed/given name `JESUS` and canonical identity `JESUS CHRIST`.
- Keep canonical identity linking to `JESUS CHRIST`, but do not imply Joseph names Him CHRIST in Matthew 1:25.
- Distinguish the AngEL Of THE LORD instruction to take Mary as wife from the revealed-name instruction and mission reason.

Codex action summary:
- Added explicit semantic events for `name_revelation` and `mission_reason_declaration` from Matthew 1:21.
- Updated the marriage instruction event wording/category so it remains distinct from the name revelation.
- Preserved narrative relationship targets as `JESUS` for naming/revealed-name relationships while canonical identity still links `JESUS` to `JESUS CHRIST`.
- Updated Passage Function wording/evidence for `divine_message_instruction` to include marriage instruction, JESUS name revelation, and mission meaning.
- Updated QA assertions for the new distinction.

Files changed:
- `background.js`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `QA status.MD`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
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

Status:
- Implemented by PCDX.

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
- `QA status.MD`
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
- `QA status.MD`
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
- `QA status.MD`
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
- Used hierarchy I through 𝑖 for display classification, with italic lowercase Class 𝑖 distinct from Divine Class I.
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

## 2026-05-22 - pcdx - Refine semantic entity labeling

Instruction summary:
- Replace behavior-first Direct Actors terminology with ontology-aware Semantic Entities language in the Study Panel.
- Ensure THE LORD / GOD can appear as semantic entity presence when authority is mediated through AngEL Of THE LORD.
- Keep actor timelines as a separate technical/debug view.

Codex action summary:
- Renamed the generated Direct Actors role group to Semantic Entities while keeping Direct Actors backward compatible in display maps.
- Added authority path entity presence for THE LORD, GOD, and AngEL Of THE LORD where source/context supports it.
- Added compact ontology path display for entity role cards, such as Class I -> Class II -> Class III.
- Renamed the lower technical Detected Actors section to Actor Timelines.

Files changed:
- `background.js`
- `study.js`
- `study.css`
- `study.html`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check study.js` passed
- `node --check background.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with stable semantic counts

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 - pcdx - Add semantic relationship roles

Instruction summary:
- Add Phase 8.2t Semantic Entity Relationship Roles as a conservative derived layer.
- Expand Semantic Entities beyond presence into explicit relationship-role meaning while preserving ontology, hierarchy, source phrase vs Derived meaning, and JESUS / JESUS CHRIST distinctions.

Codex action summary:
- Added `ICE_ENTITY_RELATION_ROLES` with 8 Matthew 1 pilot records.
- Modeled roles for THE LORD -> AngEL Of THE LORD, AngEL Of THE LORD -> Joseph, Joseph -> JESUS, Joseph -> Mary, HOLY SPIRIT -> Mary, JESUS -> His people, scripture narrator -> THE LORD, and quoted prophet -> THE LORD.
- Added Study Panel Semantic Relationship Roles cards with relationship, role, ontology class path, source phrase, derived meaning, evidence, confidence, related semantic layers, related entities, hierarchy, source grounding, and scope.
- Wired the layer into scope integrity, diagnostics, cross-layer semantic navigation, and Matthew 1 QA output/assertions.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation run:
- `node --check background.js` passed
- `node --check study.js` passed
- `node --check qa/matthew1-extension-qa.js` passed
- `git diff --check` passed
- `npm.cmd run qa:matthew1` passed with `entityRelationRoles: 8`

Commit:
- This commit

Status:
- Implemented

## 2026-05-22 - Matthew 2 Semantic Stabilization

Instruction summary:
- Begin Matthew 2 semantic stabilization phase after Study Panel review showed zero Passage Functions, Revelation Patterns, Semantic Ontology Roles, Semantic Relationship Roles, and Origin / Authority Paths.
- Remove Matthew 1-specific timeline fallback leakage such as `Joseph Obeys and JESUS Is Named` on unrelated Matthew 2 moments.
- Generalize semantic layers for Matthew 2 while preserving Matthew 1 behavior, source phrase vs derived meaning separation, ontology hierarchy, Class I / Class i distinction, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, and semantic traceability.

Codex action summary:
- Added Matthew 2 source-grounded semantic subevents for wise men arrival/worship, Herod hostile authority response, prophecy location identification, dream warnings, protective instruction, Joseph protective obedience, and location fulfillment.
- Generalized divine message clustering so warning/protective instruction events can create Revelation Patterns beyond the Matthew 1 naming message.
- Added Matthew 2 Passage Functions, Ontology Roles, Origin / Authority Path, and Semantic Relationship Roles with evidence-based Herod Class i handling.
- Tightened Study Panel narrative timeline labels so Matthew 1 naming labels no longer trigger from generic `took/wife/name` fallback patterns in Matthew 2.
- Added `qa:matthew2` and `qa/matthew2-extension-qa.js` for Matthew 2 stabilization checks.

Matthew 2 QA snapshot:
- Expected semantic layer recovery: Passage Functions, Revelation Patterns, Ontology Roles, Origin / Authority Paths, and Semantic Relationship Roles should now be nonzero on Matthew 2.
- Stabilized labels: wise men, Herod, Egypt/protective movement, divine warning, and fulfillment moments receive context-specific labels.
- Semantic failure notes addressed: Matthew 1 hardcoded fallback leakage, Matthew 2 empty derived layers, and missing protective authority path.

Recommended next architecture gaps:
- Replace remaining chapter-specific derived-record branches with a reusable rule registry keyed by source evidence patterns and semantic event types.
- Add stronger pronoun/referent resolution for `he`, `him`, `his`, `young child`, and `child` across verse windows.
- Add a generic place/location ontology class helper instead of hand-written Bethlehem/Egypt/Nazareth records.

Files changed:
- `background.js`
- `study.js`
- `package.json`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.`r`n- `node --check study.js` passed.`r`n- `node --check qa/matthew2-extension-qa.js` passed.`r`n- `git diff --check` passed.`r`n- `npm.cmd run qa:matthew1` passed.`r`n- `npm.cmd run qa:matthew2` passed.

Commit:
- This commit

Status:
- Implemented

## 2026-05-23 - Matthew 1 to Matthew 2 Cross-Chapter Semantic Continuity

Instruction summary:
- Begin Phase 8.2x: Matthew 1 <-> Matthew 2 Cross-Chapter Semantic Continuity.
- Add a derived semantic continuity layer that recognizes conservative continuity of entities, authority paths, revelation patterns, ontology roles, mission context, prophecy fulfillment, protection/preservation, and adversarial escalation.
- Preserve source phrase vs derived meaning separation, hierarchy formatting, divine display compliance, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, CHILD display, and Class I / Class i distinction.

Codex action summary:
- Added `ICE_SEMANTIC_CONTINUITY` as a derived current-page semantic layer.
- Derived Matthew 2 continuity records for Joseph, JESUS / CHILD, scripture narrator / quoted prophet fulfillment continuity, and Herod adversarial escalation where current Matthew 2 semantic layers provide grounding.
- Wired continuity through scope integrity, analysis status, Chrome storage, QA bundles, and Study Panel diagnostics.
- Added a compact Study Panel section: Cross-Chapter Semantic Continuity.
- Added continuity cards showing continued entity, chapter transition, continuity, authority continuity, revelation pattern, ontology role, mission/purpose, confidence, evidence, related layers, hierarchy, grounding, and scope.
- Added Matthew 2 QA assertions for continuity records.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed with semanticContinuity: 0.
- `npm.cmd run qa:matthew2` passed with semanticContinuity: 4.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-23 - Live Matthew 2 Derived Layer Mismatch Diagnostics

Instruction summary:
- Investigate why `qa:matthew2` reported populated Matthew 2 derived layers while the live Study Panel showed zeros for Passage Functions, Revelation Patterns, Ontology Roles, Relationship Roles, Origin / Authority Paths, and Semantic Continuity.
- Add live/study-panel diagnostics if helpful without adding new semantic features or weakening Matthew 1.

Findings:
- QA and live analysis use the same background `runFullAnalysisPipeline` and the same storage keys.
- The likely live mismatch mode was stale extension/service-worker/content-script/storage state: the popup forced active-tab content recapture and trusted the content script to trigger the background pipeline. If a live content script had a stale extension context, the popup could report completion while the Study Panel still showed old derived-layer storage.
- Study Panel already refreshes on local storage changes, focus, pageshow, and manual refresh, so stale displayed counts primarily indicate stale storage or stale extension code rather than a separate QA-only semantic path.

Codex action summary:
- Hardened popup full-analysis flow so the popup always invokes the background analysis pipeline after active-tab recapture, instead of relying only on content-script dispatch.
- Added live analysis diagnostics to `ICE_ANALYSIS_STATUS`: active URL, sourceCaptureId, capture title/book/chapter, word count, analysis reason, build marker, builder scope, Matthew 2 builder flag, and derived-layer counts.
- Added Study Panel diagnostic fields for active URL, source capture, analysis reason, analysis build marker, builder scope, Matthew 2 builders-ran flag, and derived layer counts.
- Added the same live diagnostics to QA output bundles for comparison with live Study Panel state.

Manual live reload checklist:
- Reload extension.
- Reload Matthew 2 page.
- Run full analysis from the popup.
- Open or refresh Study Panel.
- Confirm diagnostics show `analysisBuildMarker: phase-8.2x-live-derived-diagnostics`, Builder scope `Matthew 2`, Matthew 2 builders ran `true`, and derived counts matching QA expectations.

Files changed:
- `background.js`
- `popup.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check popup.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.
## 2026-05-26 - Phase 8.3 HOLY Action / HOLY Reference Consistency
- Added derived-display HOLY action emphasis for Class I / HOLY-origin semantic processes while preserving quoted source phrases.
- Added HOLY action process rendering to authority/class-transfer displays: origin, messenger/actor, transfer/action, recipient/target, and result/fulfillment.
- Updated Matthew 1 derived records for HOLY CONCEPTION / Conceived Of THE HOLY SPIRIT while preserving Holy Ghost source wording, confidence labels, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, CHILD display, and Class I / Class 𝑖 distinction.

## 2026-05-27 - Refine Semantic Contrast Wording

Instruction summary:
- Refine Semantic Ambiguities / Contrasts display wording so relationship, distinction, source/derived pairing, canonical linkage, and true opposition are not all shown as generic `vs` language.

Codex action summary:
- Added relationship-aware Study Panel wording helpers for related with, distinguished from, contrasted with, opposed by, source wording for, and derived meaning for categories.
- Updated semantic ambiguity card headings, title text, relationship type labels, count label, trace fallback wording, and overview copy.
- Preserved underlying semantic ambiguity records and traceability while keeping stronger contrast wording for grounded adversarial Matthew 2 relationships.

Files changed:
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
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-27 - Phase 8.3b Matthew 2 Movement / Location Semantics

Instruction summary:
- Formalize Matthew 2 movement, travel, escape, location fulfillment, protective relocation, adversarial pursuit, and guided travel as a derived semantic layer.

Codex action summary:
- Added `ICE_MOVEMENT_SEMANTICS` storage and scope-integrity coverage.
- Added conservative Matthew 2 movement/location records for Bethlehem, Jerusalem, Egypt, Nazareth, wise men travel, Joseph protective flight, return from Egypt, and Nazareth redirection.
- Added Study Panel Movement / Location Semantics cards with origin, destination, movement purpose, authority/revelation involvement, adversarial involvement, fulfillment linkage, source phrase, derived meaning, App confidence, evidence, related layers, and grounding.
- Updated Matthew QA bundles/counts/samples and Matthew 2 assertions for the new layer.

Files changed:
- `background.js`
- `study.html`
- `study.js`
- `qa/matthew1-extension-qa.js`
- `qa/matthew2-extension-qa.js`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA status.MD`

Validation run:
- `node --check background.js` passed.
- `node --check study.js` passed.
- `node --check qa/matthew1-extension-qa.js` passed.
- `node --check qa/matthew2-extension-qa.js` passed.
- `git diff --check` passed.
- `npm.cmd run qa:matthew1` passed.
- `npm.cmd run qa:matthew2` passed with `movementSemantics: 5`.
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-27 - Refine Primary Entity Classification

Instruction summary:
- Refine Primary Entities into classified semantic character/entity display ordered by ontology hierarchy and enriched with semantic role, local evidence role, and authority/source relevance.

Codex action summary:
- Added a shared Study Panel helper for Primary Entities / Characters classification.
- The helper combines direct card entities with scoped ontology roles, semantic relationship roles, origin / authority paths, revelation patterns, movement semantics, semantic continuity, and passage/narrative context.
- Updated Passage Functions, Revelation Patterns, Semantic Relationship Roles, Origin / Authority Paths, Movement / Location Semantics, Semantic Continuity, Semantic Principles, and Narrative Timeline displays.
- Kept lineage entities as support while preserving JESUS / JESUS CHRIST identity distinction and THE LORD / AngEL Of THE LORD authority/messenger display.

Files changed:
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
- `npm.cmd run qa:matthew-pages` passed.

Commit:
- This commit

Status:
- Implemented by pcdx.

## 2026-05-27 - Fix Primary Entity Ontology Role Separation

Instruction summary:
- Fix Primary Entities / Characters display so ontology roles do not merge across classes and process/action/mission strings do not render as entities.

Codex action summary:
- Tightened classified Primary Entities lookup to exact entity-record matching instead of fuzzy substring matching.
- Added entity-candidate rejection for mission/process/action strings before display aggregation.
- Added class-consistent role rendering so Class I THE LORD / GOD cannot display messenger or carrier roles.
- Preserved AngEL Of THE LORD as Class II messenger / revelation carrier / authority transfer participant.
- Preserved Joseph/Mary Class III roles, JESUS / JESUS CHRIST distinction, HOLY SPIRIT preference, CHILD display, source/derived separation, and ontology hierarchy.

Files changed:
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
- `npm.cmd run qa:matthew-pages` passed.
- Manual smoke: no `THE LORD` messenger/carrier display pattern found; process/mission phrases remain only in derived meaning/process display code and are blocked by the entity-candidate rejection filter.

Commit:
- This commit

Status:
- Implemented by pcdx.

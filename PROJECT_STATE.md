# I.C.E. Project State

Living operational memory for Codex/GPT across devices, threads, and sessions.

Active source of truth:

`D:\Documents\I.C.E.project`

Do not assume the old C: project path is current.

## Project Identity

I.C.E. is a Manifest V3 browser extension and semantic religious intelligence / comprehension framework.

Current focus:
- scripture ingestion
- semantic graphing
- entity and mention modeling
- DOM semantic hints
- source adapters
- scope/path integrity
- QA automation

## Current Phase

Current working area:
- Phase 7.x ingestion, source adapter, scope integrity, mention/index, and QA automation foundations.

Recently completed foundations:
- Phase 7.1 Mention Index
- Phase 7.2 DOM Semantic Ingestion Layer
- Phase 7.3 Source Adapter Foundation
- Phase 7.4 ScopePath + Verse Position Integrity
- Dev QA Automation Harness

Next planned phase:
- Install/run Playwright QA and stabilize results from `npm run qa:matthew1`.


Latest pcdx update:
- Phase 8.3d Volume / Session Context Interface implemented.
- Study Panel now starts with a Volume Context section showing active source/page, active adapter, current/stale/not analyzed status, current chapter/page, previously analyzed pages, continuity detected, suggested next page, last analyzed time, and the Matthew 1 + Matthew 2 QA baseline.
- New session metadata key: `ICE_ANALYSIS_HISTORY`.
- Volume Context actions are user-driven only: analyze current page, clear current page analysis, clear all I.C.E. session data, show analyzed pages, and show continuity map.
- No semantic record rewrites, auto-crawling, or auto-analysis behavior was added.


Latest pcdx update:
- Matthew 3 Study Panel semantic/UX refinement implemented.
- Reference Roles now distinguish Primary Referenced Being from related chapter characters for Matthew 3 baptism references.
- LDS scripture page meta descriptions are surfaced as transparent Chapter Heading / Source Heading context with Church-provided provenance, contextual-use language, and explicit Not Scripture Text / Not Direct Semantic Evidence wording.
- Matthew 3 ontology baseline now includes Class I roles for JESUS, HOLY SPIRIT, and THE LORD, plus Class III roles for John, Pharisees, Sadducees, and multitude / people.
- Volume Context now shows Analysis Target and clearer user-driven action labels.
- `qa:matthew3` is available; `qa:matthew-pages` now runs Matthew 1, Matthew 2, and Matthew 3.
- Matthew 3 deeper derived layers remain future work beyond this stabilization pass.


Latest pcdx update:
- Study Range / Session Scope architecture implemented.
- Top Study Panel section is now Study Scope rather than Volume Context.
- Session state is separated into active source page, analyzed pages, selected range, session continuity, and panel UI state.
- New session keys: `ICE_ACTIVE_SOURCE_PAGE`, `ICE_SELECTED_RANGE`, and `ICE_PANEL_UI_STATE`.
- Study Scope shows active source target, current session, analyzed page chips, continuity, suggested next page, and start/end range when analyzed pages exist.
- Clearing session analysis preserves the active source target when available, so Analyze remains grounded to the source page and not the panel DOM.
- Future range/book/volume controls are represented in UI architecture without enabling auto-crawling.

## Active Systems

- Sacred reference formatter
- Local capture and capture history
- Date timeline extraction
- Narrative event extraction
- Ordered events
- Actor timelines
- Character interactions and witnesses
- Principles / teachings extraction
- Prophecy / fulfillment links
- Scene models
- Semantic events
- Semantic flow chains
- Entity role groupings
- Entity registry
- Relationship graph
- Canonical identities
- Mention index
- DOM semantic hints
- Source adapters
- Entity classes
- Source metadata and believed author handling
- Narrator/author distinction
- Authority chains
- Covenant instruction/response pairing
- Identity scope
- ScopePath / verse position integrity
- Current-page source discovery index
- Reference graph layer
- Development QA automation harness

Current derived layer foundation:
- Phase 8.2 Passage Function / Narrative Purpose Layer
- Active key: `ICE_PASSAGE_FUNCTIONS`
- Status: foundation scaffolding implemented with Matthew 1 pilot records grounded in existing source phrases, semantic events, relationship graph, prophecy links, and canonical identities.
- Goal: identify why a passage or section exists, not only what events occur.
- Future direction: generalize the layer beyond Matthew 1 using source phrases, semantic events, relationship graph, canonical identities, scope paths, prophecy links, reference graph, confidence, and evidence.
- Do not implement as hard-coded cards for every passage.


Current speech/revelation derived layer:
- Phase 8.2f Revelation Pattern / Speech Structure Layer
- Active key: `ICE_REVELATION_PATTERNS`
- Status: Matthew 1 pilot implemented from existing `divine_message_cluster` semantic events.
- Goal: structure one speech/revelation block into ordered semantic parts such as command, warning, promise, revealed name, mission declaration, identity revelation, fulfillment declaration, covenant instruction, or prophecy explanation.
- Matthew 1 pilot: THE LORD authorizes AngEL Of THE LORD speaking to Joseph, with ordered sub-events for marriage instruction, conception revelation, revealed-name instruction, and mission declaration.
- Keep this as a derived semantic layer; do not broaden extraction or crawl/fetch sources for it.

Current semantic reference role layer:
- Phase 8.2g Semantic Reference Role Layer
- Active key: `ICE_REFERENCE_ROLES`
- Status: Matthew 1 pilot implemented from existing source discovery, reference graph, passage functions, revelation patterns, canonical identities, and themes.
- Goal: explain why a discovered reference is attached to a passage, note, theme, fulfillment, entity, lineage, covenant, or revelation context.
- Matthew 1 pilot roles: davidic_lineage_support, abrahamic_covenant_support, prophecy_fulfillment_support, messianic_identity_support, and name_meaning_support.
- Keep this as a derived semantic layer; do not broaden extraction, crawl/fetch sources, or replace source grounding/confidence.

Current semantic distinction layer:
- Phase 8.2l Semantic Contrast / Distinction Layer
- Active key: `ICE_SEMANTIC_DISTINCTIONS`
- Status: Matthew 1 pilot implemented from existing canonical identities, semantic events, relationship graph, revelation patterns, and passage functions.
- Goal: prevent distinct concepts such as name, title, role, office, narrator, authority, messenger, source phrase, derived meaning, canonical identity, revealed identity, narrative-time identity, and retrospective identity from collapsing into one generic meaning bucket.
- Matthew 1 pilot distinctions: JESUS as revealed/given NAME, CHRIST as title/messianic office/source identity, JESUS CHRIST as canonical/source identity phrase, HOLY SPIRIT as preferred derived semantic display, Holy Ghost as preserved source phrase wording, scripture narrator as Class III - Human, THE LORD as Class I - GOD / Divine Authority, and AngEL Of THE LORD as Class II - AngEL / Messenger of GOD.
- Keep this as a derived semantic layer; preserve source text, confidence, hierarchy formatting, divine display compliance, and narrative-time versus canonical distinctions.

Current semantic ontology role layer:
- Phase 8.2n Semantic Ontology / Role Classification Expansion
- Active key: `ICE_ONTOLOGY_ROLES`
- Status: Matthew 1 pilot implemented from existing semantic distinctions, semantic events, revelation patterns, passage functions, origin / authority paths, and source grounding.
- Goal: distinguish NAME, title, office, role, authority, messenger, narrator, Human response, covenant role, mission role, fulfillment role, lineage role, and semantic origin role without collapsing them into generic entity grouping.
- Matthew 1 pilot roles include JESUS as revealed NAME / divine identity / salvific mission role; CHRIST as title and messianic office; JESUS CHRIST as canonical/source identity phrase; THE LORD as Class I origin authority; AngEL Of THE LORD as Class II messenger; Joseph, Mary, scripture narrator, and quoted prophet as Class III - Human roles; and HOLY SPIRIT as divine conception origin.
- Keep this as a derived semantic layer; preserve source phrase vs Derived meaning separation, source text, confidence, hierarchy formatting, divine display compliance, HOLY SPIRIT preference, and JESUS / JESUS CHRIST / CHRIST distinctions.
Current semantic relationship role layer:
- Phase 8.2t Semantic Entity Relationship Roles
- Active key: `ICE_ENTITY_RELATION_ROLES`
- Status: Matthew 1 pilot implemented from existing semantic events, revelation patterns, passage functions, ontology roles, origin / authority paths, relationship graph, and source grounding.
- Goal: distinguish explicit relationship-role meaning between entities, including source authority, messenger, revelation recipient, obedient responder, covenant participant, conception recipient, mission subject, narrative witness, and prophecy witness.
- Matthew 1 pilot roles include THE LORD -> AngEL Of THE LORD as source authority to messenger; AngEL Of THE LORD -> Joseph as revelation messenger to recipient; Joseph -> JESUS as obedient response to revealed NAME; Joseph -> Mary as covenant steward to covenant participant; HOLY SPIRIT -> Mary as divine conception origin to Human conception recipient; JESUS -> His people as mission subject; scripture narrator -> THE LORD as narrative witness to Divine source; and quoted prophet -> THE LORD as prophecy witness to Divine source.
- Keep this as a derived semantic layer; preserve source phrase vs Derived meaning separation, source text, evidence, confidence, hierarchy formatting, divine display compliance, HOLY SPIRIT preference, Class i distinction, Human classification, and JESUS / JESUS CHRIST / CHRIST distinctions.
Current semantic ambiguity / contrast layer:
- Phase 8.2o Semantic Contradiction / Ambiguity Detection Layer
- Active key: `ICE_SEMANTIC_AMBIGUITIES`
- Status: Matthew 1 pilot implemented from existing semantic distinctions, ontology roles, revelation patterns, origin / authority paths, and source grounding.
- Goal: identify resolved contrasts and context-required interpretation points such as unresolved referents, overlapping titles, narrative-time versus retrospective identity tension, uncertain ontology roles, ambiguous pronouns, possible semantic conflicts, and uncertain source grounding without fabricating contradictions.
- Matthew 1 pilot contrasts: JESUS versus JESUS CHRIST as narrative NAME versus canonical/source identity; CHRIST as title/office and not revealed NAME; Holy Ghost versus HOLY SPIRIT as preserved source wording versus derived semantic preference; scripture narrator versus divine speech as Human narration versus Divine authority source; and pronoun referents requiring semantic context.
- Keep this as a derived semantic layer; preserve source phrase vs Derived meaning separation, source text, evidence, confidence, hierarchy formatting, divine display compliance, ontology roles, HOLY SPIRIT preference, and JESUS / JESUS CHRIST / CHRIST distinctions.
Current semantic origin / authority path layer:
- Phase 8.2m Semantic Origin / Authority Path Layer
- Active key: `ICE_ORIGIN_AUTHORITY_PATHS`
- Status: Matthew 1 pilot implemented from existing revelation patterns, semantic events, passage functions, semantic flow paths, relationship graph, canonical identities, and source grounding.
- Goal: distinguish grammar, capitalization, semantic authority, origin, messenger path, Human response, result, and divine causality without flattening them into one generic action.
- Matthew 1 pilot path: THE LORD -> AngEL Of THE LORD -> Joseph -> obedient response -> JESUS is named; mission: HE shall SAVE HIS People from their sins.
- Joseph, Mary, narrator, and prophet remain Class III - Human where applicable; originating authority remains Divine through THE LORD and AngEL Of THE LORD.
- Keep this as a derived semantic layer; preserve source text, evidence, confidence, hierarchy formatting, divine display compliance, HOLY SPIRIT preference, and JESUS / JESUS CHRIST / CHRIST distinctions.

## Current Architecture

Architecture direction:
- Popup remains quick controls.
- Study Panel is the contextual research/comprehension interface.
- Derived semantic layers should stay separate from extraction.
- Keep current-page analysis scoped unless explicitly building cross-document features.
- Preserve original source text, source phrases, confidence, and scope.
- Prefer additive, non-destructive changes.

## Current Storage Keys

Core keys:
- `ICE_LATEST_CAPTURE`
- `ICE_ACTIVE_ADAPTER`
- `ICE_SOURCE_ADAPTERS`
- `ICE_DOM_SEMANTIC_HINTS`
- `ICE_MENTION_INDEX`
- `ICE_ENTITY_REGISTRY`
- `ICE_RELATIONSHIP_GRAPH`
- `ICE_CANONICAL_IDENTITIES`
- `ICE_SEMANTIC_EVENTS`
- `ICE_SEMANTIC_FLOW_CHAINS`
- `ICE_ANALYSIS_STATUS`
- `ICE_SCOPE_INTEGRITY`
- `ICE_SOURCE_DISCOVERY_INDEX`
- `ICE_REFERENCE_GRAPH`
- `ICE_PASSAGE_FUNCTIONS`
- `ICE_REVELATION_PATTERNS`
- `ICE_REFERENCE_ROLES`
- `ICE_SEMANTIC_DISTINCTIONS`
- `ICE_ONTOLOGY_ROLES`
- `ICE_SEMANTIC_AMBIGUITIES`
- `ICE_ORIGIN_AUTHORITY_PATHS`
- `ICE_ENTITY_RELATION_ROLES`
- `ICE_QA_LATEST_EXPORT`

Other active local/derived keys:
- `ICE_CAPTURE_HISTORY`
- `ICE_TIMELINE_ITEMS`
- `ICE_EVENT_ITEMS`
- `ICE_ORDERED_EVENTS`
- `ICE_ACTOR_TIMELINES`
- `ICE_PRINCIPLE_ITEMS`
- `ICE_PROPHECY_LINKS`
- `ICE_INTERACTION_GRAPH`
- `ICE_SCENE_MODELS`
- `ICE_ENTITY_ROLE_ITEMS`
- `ICE_FORMATTER_STATUS`

## QA Workflow

Initial setup:

```powershell
npm install
npx playwright install chromium
```

Run Matthew 1 extension QA:

```powershell
npm run qa:matthew1
```

Direct run:

```powershell
node qa/matthew1-extension-qa.js
```

The QA harness exports:

`D:\Documents\I.C.E.project\qa-output\latest-qa-bundle.json`

Quick repo-visible QA snapshot:

`QA status.MD`

Generated `qa-output/` files should remain uncommitted unless intentionally requested.


## Collaboration Identity Map

Use these labels in responses, repo logs, and commit messages so parallel desktop/mobile work can be traced:

- `gpt` = PC/browser GPT orchestration lane
- `mgpt` = mobile GPT orchestration lane
- `pcdx` = PC/desktop Codex implementation lane
- `mcdx` = mobile/web Codex implementation lane

Commit message convention:
- Prefix commits with the actor label when feasible, e.g. `pcdx: Add scope integrity layer` or `mcdx: Verify mobile repo workflow`.

Repo memory convention:
- Use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for short current direct handoff messages between actors.
- Before starting any I.C.E. task, read `PROJECT_STATE.md`, `PROJECT_LOG.md`, and `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.
- Significant instructions, decisions, implementation actions, QA results, and commits should be summarized in repo memory.
- After completing meaningful work, append an entry to `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.
- Activity entries should use actor label `pcdx`, `mcdx`, `gpt`, or `mgpt`.
- Activity entries should include task, files changed, validation, commit hash if committed, and next recommended step.
- `PROJECT_STATE.md` remains concise current operational truth.
- `PROJECT_LOG.md` remains milestone/decision history.
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` records ongoing multi-agent activity updates.
- `THREAD_ARCHIVE/AGENT_OUTBOX.md` records quick current handoff messages and should not replace durable activity logging.
- Do not paste full chat transcripts unless explicitly requested.

## Phase 8.3a Matthew 2 Adversarial / Protective Semantic Refinement

Status: implemented in the derived Matthew 2 semantic builders.

Refinements:
- Herod Class i handling is grounded in Matthew 2 evidence: troubled response, secret inquiry, deceptive worship wording, misuse of authority, and destroy-him intent.
- Protective preservation path now records THE LORD -> AngEL Of THE LORD -> Joseph -> CHILD / JESUS preservation with process-path steps.
- Matthew 2 movement continuity now tracks Jerusalem, Bethlehem, Egypt, and Nazareth as scoped location roles.
- Revelation handling now includes repeated guidance / preservation cycles for dream warning, redirection, avoidance, and protective movement.
- Semantic Ambiguities / Contrasts now includes Matthew 2 protective obedience vs hostile deception records.
- Principle typing now recognizes Divine preservation, adversarial opposition, and fulfillment through movement.

Preserve:
- source phrase vs derived meaning
- App accuracy wording
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class i distinction
- source-grounded, non-theatrical display language
## Standing Rules

- Run syntax checks after implementation.
- Run `npm run qa:matthew1` when feasible.
- Report PASS/FAIL.
- Do not commit failed QA unless approved.
- Preserve source grounding.
- Preserve source phrases and confidence.
- Avoid blind regex/glorification.
- Keep derived layers separate from extraction.
- Prefer additive/non-destructive changes.
- Do not broad crawl or scrape unless explicitly requested and bounded.
- Do not mutate stored source text for display-only semantic rendering.
- Keep generated `qa-output/` uncommitted.
- Leave unrelated untracked helper files untouched unless explicitly requested.

Known untracked helper files normally left alone:
- `GOD IS GOOD read ME and Me.txt`
- `I.C.E.project.code-workspace`
- `git-sync.sh`

## Source Adapter Direction

Current adapters:
- `lds_scripture_adapter`
- `generic_html_adapter`
- `plain_text_adapter`

Future adapters:
- BibleGateway
- Conference Talk
- PDF
- EPUB
- Wikipedia
- Academic paper

Future capabilities:
- semantic section hierarchy
- footnote graph ingestion
- translation metadata
- original-language linkage
- commentary graphing
- cross-reference graphing

## Entity Class Hierarchy

- `I` = GOD / Divine Authority
- `II` = AngEL / Messenger of GOD
- `III` = Human
- `IIII` = Living organism / creature / natural life
- `IIIII` = Non-living item/object
- `Ã°Ââ€˜â€“` = adversary / wicked / evil / anti-GOD
- `AI_Actor` = artificial/tool actor category

Class I is Divine Origin Authority. Class Ã°Ââ€˜â€“ is adversarial / anti-origin opposition. Class Ã°Ââ€˜â€“ uses an italicized lowercase i and must NEVER visually collapse with Class I.

Do not classify by word alone. Use entity resolution, context, relationship, confidence, and scope.

Do not treat substrings as meaning by default. Example: `EL` should not be glorified inside words like hotel, shell, travel, or element.

## Current Roadmap

Near-term:
- Install Playwright dependencies.
- Run `npm run qa:matthew1`.
- Stabilize any QA failures.
- Continue ScopePath / verse integrity refinements.

Future:
- current-page source discovery index
- current-page reference inventory
- reference graph
- commentary graph
- AI_Actor scoped awareness
- dependency/consequence modeling
- semantic render engine
- Alpha-to-Omega source mapping
- original-language references
- cross-reference graph
- source discovery index
- collection-level ingestion
- source-grounded devotional/study dialogue modes

## Known Cautions

Avoid:
- broad crawling
- blind pronoun glorification
- regex-only rendering
- `document.body.innerHTML` replacement
- over-promoting role words into canonical entities
- collapsing author, narrator, actor, and source authority into one concept
- treating source metadata as narrative actors
- making AI/persona modes claim literal divine or historical identity

Preserve:
- source phrases
- original text
- confidence labels
- scope paths
- author/narrator distinction
- direct actor vs source authority distinction
- messenger vs GOD/source authority distinction
- current extraction stability when adding derived layers

Important product principle:
I.C.E. should support human agency, personal interpretation, faith development, independent study, and source-grounded comprehension. It should not replace individual revelation, conscience, prayer, clergy, scripture, or human judgment.

## Phase 8.2 Roadmap: Passage Function / Narrative Purpose Layer

Status: foundation scaffolding implemented; generalized reasoning is not implemented yet.

Goal:
- Create a derived semantic layer that identifies why a passage or section exists, not only what events occur.

Potential storage key:
- `ICE_PASSAGE_FUNCTIONS`
- or `ICE_NARRATIVE_PURPOSES`

Example record shape:

```json
{
  "id": "purpose-matthew-1-lineage",
  "sourceCaptureId": "...",
  "scopePath": "scripture.nt.matthew.1.verse.1-17",
  "verseRange": "Matthew 1:1-17",
  "passageFunction": "messianic_lineage_establishment",
  "plainMeaning": "JESUS CHRIST is presented as son of David and son of Abraham.",
  "fulfillmentMeaning": "The lineage establishes covenant and messianic identity before the fulfillment narrative.",
  "evidence": ["son of David", "son of Abraham"],
  "linkedThemes": ["Davidic kingship", "Abrahamic promise", "covenant lineage", "fulfillment"],
  "relatedEntities": ["JESUS CHRIST", "David", "Abraham"],
  "relatedProphecies": [],
  "confidence": "probable",
  "sourceGrounding": "explicit phrase plus scoped scripture context"
}
```

Matthew 1 examples:
- Genealogy / lineage: `messianic_lineage_establishment`; JESUS CHRIST is presented as son of David and son of Abraham; themes include Davidic kingship, Abrahamic promise, covenant lineage, and fulfillment.
- Mary found with child: `birth_context_establishment`; the birth is introduced as divine in origin before Joseph and Mary come together.
- AngEL Of THE LORD instructs Joseph: `divine_instruction_and_name_revelation`; THE LORD sends AngEL Of THE LORD to instruct Joseph and reveal the name JESUS.
- Fulfillment declared: `prophecy_fulfillment_identification`; the narrator identifies the event as fulfilling prophecy.
- Joseph obeys and JESUS is named: `obedient_response_and_mission_naming`; Joseph obeys divine instruction and the child is named JESUS.

Reusable passage function types:
- `genealogy_establishes_identity`
- `prophecy_fulfillment_identification`
- `divine_message_instruction`
- `covenant_response`
- `naming_reveals_mission`
- `miracle_reveals_authority`
- `temptation_tests_identity`
- `teaching_declares_doctrine`
- `warning_declares_consequence`
- `witness_confirms_truth`

Important implementation direction:
- This should not become hard-coded cards for every passage.
- Keep it source-grounded, scope-aware, confidence-bearing, and derived from existing semantic layers.
- Inputs should include source phrases, semantic events, relationship graph, canonical identities, scope paths, prophecy links, reference graph, confidence, and evidence.

## Current Matthew 2 Stabilization State - 2026-05-22

Phase: Matthew 2 semantic stabilization.

Status:
- Matthew 2 is now treated as a semantic stress test, not as a Matthew 1-shaped display fallback.
- `ICE_PASSAGE_FUNCTIONS`, `ICE_REVELATION_PATTERNS`, `ICE_ONTOLOGY_ROLES`, `ICE_ORIGIN_AUTHORITY_PATHS`, and `ICE_ENTITY_RELATION_ROLES` have Matthew 2 source-grounded recovery paths.
- Narrative Timeline labels now prefer Matthew 2 evidence such as wise men, Herod, protective Egypt movement, dream warnings, and location fulfillment before Matthew 1 naming labels.

Matthew 2 semantic coverage added:
- wise_men_arrival
- prophecy_fulfillment_identification
- hostile_authority_response
- divine_warning_revelation
- protective_obedient_response
- egypt_escape_preservation
- messianic_location_fulfillment

Known next architecture gaps:
- Generalize derived-record construction into reusable semantic rule tables.
- Improve cross-verse CHILD/JESUS and pronoun resolution.
- Promote location ontology roles into shared helpers.

## Current Semantic Continuity State - 2026-05-23

Phase: 8.2x Matthew 1 <-> Matthew 2 Cross-Chapter Semantic Continuity.

Status:
- `ICE_SEMANTIC_CONTINUITY` is now a derived semantic layer.
- The pilot is conservative and currently derives Matthew 2 continuity only when current Matthew 2 semantic layers ground the record.
- Matthew 1 remains stable and does not fabricate future continuity records when Matthew 2 evidence is not in the active capture.

Pilot continuity records:
- Joseph: continued authority / revelation relationship.
- JESUS / CHILD: continued child identity and mission preservation.
- scripture narrator / quoted prophet: continued prophecy fulfillment chain.
- Herod: adversarial escalation against mission preservation.

Study Panel:
- New section: Cross-Chapter Semantic Continuity.
- Cards display continued entity, chapter transition, continuity, authority continuity, revelation pattern, ontology role, mission/purpose, confidence, evidence, related semantic layers, hierarchy, grounding, and scope.

Next architecture gaps:
- Persist or compare prior chapter semantic snapshots instead of relying only on current-page continuity anchors.
- Promote continuity rules into reusable rule registry entries.
- Add shared cross-page entity identity IDs beyond current-page canonical names.
## Phase 8.3 Semantic Principles: HOLY Action / HOLY Reference Consistency

Status: display refinement implemented for Matthew 1 derived semantic layers.

Principle:
- Source phrase preserves source wording.
- Derived meaning applies I.C.E. semantic display.
- When a derived semantic action/process originates from or directly concerns Class I / HOLY authority, derived displays should use HOLY ontology emphasis.

Process model:
1. Authoritative ACTOR / Origin
2. Actor / Messenger or Human participant
3. Transfer / Action
4. Recipient / Target
5. Result / Fulfillment

Matthew 1 pilot:
- THE LORD -> AngEL Of THE LORD -> Joseph -> receives Instruction -> protects the CHILD.
- HOLY CONCEPTION / Conceived Of THE HOLY SPIRIT is derived display; Holy Ghost remains preserved as source phrase where quoted.
- Class I / HOLY Origin remains strongest; Class II messenger/transfer remains medium; Class III Human actor/response remains readable; Class Ã°Ââ€˜â€“ remains adversarial/opposition and visually distinct.

Preserve:
- App accuracy wording
- source truth distinction
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class Ã°Ââ€˜â€“ distinction
- no unsupported doctrine

## Phase 8.3b Semantic Contrast Wording Refinement

Status: Study Panel display refinement implemented.

Display behavior:
- Semantic Ambiguities / Contrasts cards now use relationship-aware wording instead of generic `vs` titles.
- Non-oppositional records display as related, distinguished, source/derived, or canonical linkage language.
- Truly adversarial Matthew 2 records retain stronger contrast wording where grounded by source evidence.

Preserved:
- underlying ambiguity / contrast records
- semantic traceability
- source phrase vs derived meaning separation
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class i distinction
- ontology hierarchy

## Phase 8.3b Matthew 2 Movement / Location Semantic Layer

Status: implemented and validated.

New derived layer:
- `ICE_MOVEMENT_SEMANTICS`

Matthew 2 pilot records:
- Jerusalem -> Bethlehem prophecy location identification.
- east -> Jerusalem -> Bethlehem / CHILD location witness travel.
- CHILD location in Judaea / Bethlehem context -> Egypt protective escape / preservation.
- Egypt -> land of Israel return after hostile threat removed.
- Judaea avoided / Galilee route -> Nazareth protective redirection and fulfillment-linked settlement.

Study Panel:
- Added compact Movement / Location Semantics section.
- Cards show origin location, destination, movement purpose, authority path, revelation involvement, adversarial involvement where grounded, fulfillment linkage, source phrase, derived meaning, App accuracy, evidence, related layers/entities, hierarchy, semantic grounding, and scope.

Preserved:
- source phrase vs derived meaning
- App accuracy wording
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class i distinction
- ontology hierarchy
- conservative, source-grounded Matthew 2 pilot only

## Primary Entities / Characters Classification Display

Status: implemented and validated.

Display refinement:
- Primary entity display now uses a shared classified helper instead of a narrow flat evidence list.
- Entities are grouped by ontology hierarchy and include semantic role plus local evidence role.
- The helper draws from card entities, ontology roles, semantic relationship roles, origin / authority paths, revelation patterns, movement semantics, semantic continuity, and narrative timeline context where scoped.

Applied to:
- Passage Functions
- Revelation Patterns
- Semantic Relationship Roles
- Origin / Authority Paths
- Semantic Principles
- Movement / Location Semantics
- Semantic Continuity
- Narrative Timeline

Preserved:
- JESUS / JESUS CHRIST distinction
- THE LORD / GOD entity display
- AngEL Of THE LORD messenger entity display
- Joseph / Mary as Human narrative participants where scoped
- lineage support for Abraham / David without forcing them into unrelated narrow cards
- source phrase vs derived meaning
- App accuracy wording
- Class I / Class i distinction

## Primary Entities Ontology-Role Separation Fix

Status: implemented and validated.

Display fix:
- Primary Entities / Characters now uses exact entity matching for classified display to prevent THE LORD from resolving through AngEL Of THE LORD metadata.
- Class I role display is class-safe: THE LORD / GOD renders as source authority, HOLY origin, Divine authority, and revelation origin, never messenger / revelation carrier.
- AngEL Of THE LORD remains Class II and carries messenger / revelation carrier / authority transfer participant roles.
- Mission, process, action, and semantic-summary phrases are filtered before entity rendering.

Filtered from entity labels:
- SAVE HIS People from their sins
- Conceived Of THE HOLY SPIRIT
- obedient_response_to_revealed_name
- divine_message_to_obedient_response
- other process/path/mission/derived-meaning strings

Preserved:
- source phrase vs derived meaning separation
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class i distinction
- ontology hierarchy

## App Accuracy Display Wording

Status: implemented and validated.

Display refinement:
- User-facing semantic accuracy labels now render as `App accuracy`.
- The wording clarifies that the value estimates I.C.E. semantic resolution accuracy, not scripture/source truth.
- Stored values remain unchanged: explicit, probable, possible, attributed, and unresolved.

Applied to:
- Passage Functions
- Revelation Patterns
- Reference Roles
- Semantic Ontology Roles
- Semantic Relationship Roles
- Semantic Ambiguities / Contrasts
- Origin / Authority Paths
- Semantic Continuity
- Movement / Location Semantics
- Semantic Resolution Trace
- Narrative Timeline
- Semantic Principles
- provenance / relationship previews

Preserved:
- stored semantic records and confidence values
- source phrase vs derived meaning separation
- semantic styling
- ontology hierarchy
- Class I / Class i distinction

## Phase 8.3c Semantic Sequence / Causality Layer

Status: implemented and validated.

New derived layer:
- `ICE_SEMANTIC_CAUSALITY`

Purpose:
- Model why source-grounded events happen in sequence: cause -> instruction/warning -> response -> consequence/result -> preservation/fulfillment.
- Keep causality inspectable without adding unsupported claims.

Matthew 1 pilot record:
- Divine revelation -> Joseph receives instruction -> Joseph obeys -> JESUS is named -> mission meaning / fulfillment frame is preserved.

Matthew 2 pilot records:
- Herod seeks the CHILD -> Divine warning through AngEL Of THE LORD -> Joseph obeys and flees into Egypt -> CHILD / JESUS is preserved -> Egypt fulfillment continuity continues.
- Threat removed / renewed avoidance context -> dream guidance -> Joseph returns and redirects toward Nazareth -> CHILD / JESUS remains preserved -> Nazareth fulfillment linkage continues.

Study Panel:
- Added compact Semantic Sequence / Causality section.
- Cards show initiating cause, authority source, messenger / transfer, Human response, consequence / result, preservation / fulfillment outcome, sequence steps, source phrase, derived meaning, App accuracy, evidence, primary entities, related semantic layers, hierarchy, semantic grounding, and scope.

Preserved:
- source phrase vs derived meaning
- App accuracy wording
- JESUS / JESUS CHRIST distinction
- HOLY SPIRIT preference
- CHILD display
- Class I / Class i distinction
- ontology hierarchy
- conservative, source-grounded causality only

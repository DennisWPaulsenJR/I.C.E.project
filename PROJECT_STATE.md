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
- Development QA automation harness

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
- `IIII` = Other living organisms
- `IIIII` = Non-living items / objects
- `IIIIII` = Anti-GOD / adversary

Do not classify by word alone. Use entity resolution, context, relationship, confidence, and scope.

Do not treat substrings as meaning by default. Example: `EL` should not be glorified inside words like hotel, shell, travel, or element.

## Current Roadmap

Near-term:
- Install Playwright dependencies.
- Run `npm run qa:matthew1`.
- Stabilize any QA failures.
- Continue ScopePath / verse integrity refinements.

Future:
- source discovery / site inquisition
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
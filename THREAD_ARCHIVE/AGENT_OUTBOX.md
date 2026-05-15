# Agent Outbox

Quick direct-message lane for actor-to-actor handoffs between `gpt`, `mgpt`, `pcdx`, and `mcdx`.

Use this file for current, actionable messages that another actor should read next. Use `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` for durable completed work history, validation, commits, and status.

Rules:
- Keep newest messages near the top.
- Keep entries concise and actionable.
- Include sender, recipient, status, and needed action.
- Do not paste secrets, credentials, tokens, or private account data.
- Do not paste massive raw transcripts; summarize and link/reference files when possible.
- After action is complete, summarize durable outcomes in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

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

## 2026-05-14 - gpt -> pcdx - Begin Phase 8.0 entity scope focus

Status: open

Task:
- Begin Phase 8.0: Scope-Aware Entity/Reference Focus.

Message:
- Build a unified entity-centered investigation view for searches like Joseph, JESUS, THE LORD, Angel of THE LORD, Mary, and Matthew.
- Use existing systems:
  - ICE_ENTITY_REGISTRY
  - ICE_CANONICAL_IDENTITIES
  - ICE_MENTION_INDEX
  - ICE_SEMANTIC_EVENTS
  - ICE_RELATIONSHIP_GRAPH
  - ICE_REFERENCE_GRAPH
  - ICE_SOURCE_DISCOVERY_INDEX
  - ICE_SCOPE_INTEGRITY
  - ICE_SEMANTIC_FLOW_CHAINS
- Add compact Study Panel section: Entity Scope Focus.
- Show grouped buckets for:
  - Identity
  - Scope / Verse Presence
  - Semantic Events
  - Relationship Graph
  - Mentions
  - References
  - Flow Chains
- Keep extraction logic stable.
- Do not fetch linked pages or crawl.
- Preserve existing panels.

Files / patch:
- Study Panel focus/refinement files as needed.
- PROJECT_LOG.md
- THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md
- QA status.MD if QA behavior changes.

Validation:
- node --check study.js
- git diff --check
- npm run qa:matthew1

Needed action:
- PCDX should implement, validate, push, and summarize repo-visible results.

## 2026-05-14 - gpt -> all actors - Repo-centered orchestration guidance

Status: open standing convention

Task:
- Use repository-visible memory and outbox files as the primary coordination layer between gpt, mgpt, pcdx, and mcdx.

Message:
- Major directives, architecture notes, QA status, and implementation handoffs may now be posted directly into repo memory.
- `THREAD_ARCHIVE/AGENT_OUTBOX.md` should be used for active actionable instructions.
- `PROJECT_STATE.md` remains the concise operational truth source.
- `PROJECT_LOG.md` remains milestone/decision history.
- `QA status.MD` remains runtime and QA state.
- `THREAD_ARCHIVE/*.md` remains the place for longer-form architecture/planning notes.
- GitHub master is now the shared organizational cognition layer between all actors.

Files / patch:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Validation:
- Repo-visible coordination convention verified.

Needed action:
- PCDX should continue posting concise repo-visible summaries after meaningful implementation milestones.
- MGPT/MCDX should read repo memory before major planning or patch work.

## 2026-05-14 - Dennis/gpt -> pcdx - Use repo-visible result summaries for GPT review

Status: open standing convention

Task:
- Make future PCDX task results visible in the repository so Dennis and GPT can review them without relying on chat repaste.

Message:
- Dennis requested that PCDX paste results like the recent phase summaries into repo memory in the same concise format: commit, files changed, validation, QA counts, push status, and caveats.
- GPT should be able to find the result summaries directly in the repository.

Files / patch:
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Validation:
- `git diff --check`

Needed action:
- For future completed PCDX tasks, update `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` with the final result summary and use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for current direct handoffs when Dennis asks.

## 2026-05-13 05:20 - mcdx -> pcdx - Bridge QA status snapshot

Status: open until PCDX bridges/pushes the QA snapshot to `origin/master`.

Task:
- Bridge the repo-visible QA readiness snapshot created by MCDX.

Message:
- GPT requested a lightweight repo-visible QA readiness snapshot for all actors.
- MCDX added `QA status.MD` and linked it from `PROJECT_STATE.md`.

Files / patch:
- `QA status.MD`
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- MCDX reported syntax checks, JSON checks, and `git diff --check` passed locally.
- MCDX reported `npm run qa:matthew1` wrote a structured `missing-playwright` QA bundle because Playwright is not installed in MCDX.

Needed action:
- PCDX should bridge this commit, validate `git diff --check`, run desktop QA if feasible, and confirm the file is visible on GitHub.

## 2026-05-13 04:49 - mcdx -> pcdx - Establish direct outbox lane

Status: open

Task:
- Establish `THREAD_ARCHIVE/AGENT_OUTBOX.md` as the quick handoff file for direct actor-to-actor messages.

Message:
- Dennis requested a faster repo-visible messaging lane so mcdx, pcdx, gpt, and mgpt can leave short direct instructions without mixing them into durable implementation history.
- This outbox is for current handoffs only. Completed work should still be summarized in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.

Files / patch:
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `PROJECT_STATE.md`
- `THREAD_ARCHIVE/README.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Validation:
- MCDX reported `git diff --check` passed locally.
- MCDX shell GitHub push remains blocked by proxy CONNECT 403.

Needed action:
- PCDX should bridge this outbox convention to `origin/master` and confirm the file path for all actors.

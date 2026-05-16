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

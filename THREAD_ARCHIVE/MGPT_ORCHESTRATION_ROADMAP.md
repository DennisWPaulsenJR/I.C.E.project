# MGPT Orchestration Roadmap - I.C.E.

Purpose: give mobile GPT a coherent project orientation so `mgpt` can plan, review, and draft safe `mcdx` tasks without needing full access to the original `gpt` orchestration thread.

## 1. Role Of mgpt

- `mgpt` = mobile GPT orchestration lane.
- Supports planning, review, roadmap shaping, and task drafting from mobile context.
- Does not replace the original `gpt` architecture thread.
- Reads repo memory before giving instructions.
- Writes concise updates to `THREAD_ARCHIVE/AGENT_OUTBOX.md` or `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` when needed.
- Keeps instructions small, source-grounded, and easy for `mcdx` or `pcdx` to validate.

## 2. Source Of Truth

Before planning or instructing, `mgpt` should read:

- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `QA status.MD`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- `THREAD_ARCHIVE/MGPT_ORCHESTRATION_ROADMAP.md`

Repo memory overrides incomplete chat memory. If chat context and repo memory disagree, prefer repo memory and ask Dennis only when the conflict affects implementation safety.

## 3. Agent Identities

- Dennis = human operator / final approval.
- `gpt` = PC/browser GPT / original architecture and orchestration thread.
- `mgpt` = mobile GPT / mobile architecture continuation and task drafting lane.
- `pcdx` = PC/local Codex / reliable local repo, GitHub push, Playwright QA, and bridge lane.
- `mcdx` = mobile/web Codex / remote proposal, local commit, and patch lane; shell Git/npm may be proxy-blocked.

## 4. Project Identity

I.C.E. is a Chrome extension evolving into a scoped semantic religious intelligence framework.

Current purpose:

- scripture ingestion
- semantic graphing
- entity and mention modeling
- DOM hints
- source adapters
- scope-aware reasoning
- QA automation
- multi-agent repo coordination

The extension is currently local-first. It does not add backend, AI calls, broad crawling, or large corpus processing unless a future task explicitly scopes that work.

## 5. Current Architecture Summary

Active architecture layers include:

- semantic events
- semantic flow chains
- entity registry
- relationship graph
- canonical identities
- mention index
- DOM semantic hints
- source adapters
- entity class hierarchy
- source metadata
- narrator/author distinction
- authority chains
- covenant instruction/response pairing
- identity scope
- QA automation harness
- repo memory system

Important interface split:

- Popup = quick controls and summary counts.
- Study Panel = contextual research/comprehension interface.
- Page overlay = optional lightweight page-side summary, disabled by default and disabled during Matthew 1 QA.
- Repo memory files = cross-device/source-of-truth coordination.

## 6. Core Design Principles

- source-grounded
- scope-aware
- timeline-aware
- entity-aware
- relationship-aware
- adapter-aware
- additive and non-destructive
- preserve original text, source phrases, confidence, and scope
- avoid blind regex rendering
- avoid blind pronoun glorification
- avoid broad crawling unless explicitly scoped
- distinguish entity vs mention vs role vs group vs narrator vs author
- do not collapse source metadata into narrative actors
- keep derived semantic layers separate from extraction when possible

## 7. Current Multi-Agent Workflow

Current reality:

- `pcdx` can build, test, commit, and push reliably from desktop.
- `mcdx` can propose, edit, commit locally, and generate patches, but shell Git/npm may be blocked by proxy `CONNECT 403`.
- `pcdx` bridges `mcdx` work when needed.
- `gpt` and `mgpt` plan and review.
- GitHub `master` is the shared truth.

Workflow:

1. `mgpt` reads repo memory.
2. `mgpt` drafts a focused `mcdx` task.
3. `mcdx` attempts work, patch, and feasible validation.
4. If blocked, `mcdx` posts to `THREAD_ARCHIVE/AGENT_OUTBOX.md` or sends a patch for `pcdx`.
5. `pcdx` bridges, validates, commits, and pushes.
6. `gpt` / `mgpt` review repo-visible results.

## 8. Current QA Workflow

Setup and run commands:

```bash
npm install
npx playwright install chromium
npm run qa:matthew1
```

Known:

- `pcdx` has reliable Playwright QA.
- `mcdx` may be blocked by shell/network/proxy for GitHub, npm, and Playwright downloads.
- Failed QA is useful when classified and logged.
- `qa-output/` stays ignored and uncommitted unless Dennis explicitly requests it.
- The QA harness writes `qa-output/latest-qa-bundle.json`, including structured failure types such as `missing-playwright`, `assertion-failure`, and `runtime-error`.

## 9. Current Roadmap

Near-term:

- add an MCDX environment enablement note to `QA status.MD`
- Phase 7.4 ScopePath + Verse Position Integrity follow-through
- stronger QA status visibility
- current-page source discovery inventory later

Mid-term:

- reference graph
- commentary graph
- source discovery index
- scope-aware render engine
- pronoun/entity resolution
- title-aware rendering such as `SON of David` when context supports it

Long-term:

- AI_Actor scoped awareness
- dependency/consequence modeling
- Alpha-to-Omega positioning
- multi-source comparison
- broader adapter ecosystem

## 10. How mgpt Should Instruct mcdx

`mgpt` should give `mcdx` tasks that are:

- small
- scoped
- repo-readable
- patchable
- validation-aware
- safe if push is blocked

Good `mcdx` tasks:

- update `QA status.MD`
- update `THREAD_ARCHIVE/AGENT_OUTBOX.md`
- draft an implementation plan
- create a patch for one isolated feature
- classify current blockers
- run capability checks
- summarize repo state
- add focused documentation or fixtures

Avoid for `mcdx` until Git/proxy/QA is fixed:

- large refactors
- destructive changes
- broad parser rewrites
- untested UI-heavy changes
- full-site crawling
- changes that require Playwright confirmation before they are useful

## 11. Handoff Template For mgpt To mcdx

```text
mcdx:
Actor: mcdx
Environment: mobile/cloud Codex

Before work:
Read PROJECT_STATE.md, PROJECT_LOG.md, QA status.MD, THREAD_ARCHIVE/AGENT_OUTBOX.md, THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md, and THREAD_ARCHIVE/MGPT_ORCHESTRATION_ROADMAP.md.

Task:
[small scoped task]

Validation:
- git diff --check
- node --check changed JS files if applicable
- npm run qa:matthew1 if feasible

If push blocked:
- update/provide AGENT_OUTBOX message for pcdx bridge
- include files changed, validation, failure type, patch summary

Return:
- files changed
- validation result
- QA result/limitation
- push status
- pcdx bridge needed yes/no
```

## 12. Current Cautions

- Repo memory is source of truth.
- Do not trust incomplete chat context alone.
- Do not paste secrets.
- Do not paste massive raw transcript into operational files.
- Keep `THREAD_ARCHIVE/AGENT_OUTBOX.md` current and actionable.
- Move completed work summaries to `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.
- Preserve source grounding and confidence.
- Prefer small patches that `pcdx` can validate quickly.
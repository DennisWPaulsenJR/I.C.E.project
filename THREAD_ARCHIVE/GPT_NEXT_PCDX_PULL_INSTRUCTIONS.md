# GPT Next PCDX Pull Instructions

From: `gpt...`
To: `pcdx`
Status: open / authorization required
Date: 2026-06-09

Dennis asked GPT to place these instructions in the repo. Dennis will instruct PCDX after this file is committed.

## PCDX action

1. Pull latest from `origin/master`.
2. Read:
   - `THREAD_ARCHIVE/GPT_NEXT_PCDX_PULL_INSTRUCTIONS.md`
   - `THREAD_ARCHIVE/GPT_HANDOFF_ACTIVE_WIP_AUTH_REQUEST.md`
3. Report repo state.
4. Request authorization before editing any files.

## Task after authorization

Documentation-only update for Active WIP coordination:

- Add an `Active WIP` section to `PROJECT_STATE.md`.
- Keep `THREAD_ARCHIVE/AGENT_OUTBOX.md` as the short handoff lane.
- Keep `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` as the completed-task log.
- Do not create `THREAD_ARCHIVE/AGENT_WIP.md` yet.
- Clarify roles for `gpt...`, `pcdx`, `mgpt`, and `mcdx`.
- Clarify that `mcdx` can provide repo-readable handoffs or patches when it cannot push directly.
- Record current Active WIP as: settle/push the queue scaffold and GPT handoff merge state, then design Phase 2 queue execution architecture.
- Do not implement queue execution until design is approved.

## Required report before implementation

PCDX should report:

- Current HEAD and branch state.
- Whether `4337379`, `b091c12`, and `dd40b47` are in branch history.
- Whether this remains documentation-only.
- Exact files planned for editing.
- A direct request for authorization.

## Rules

- Do not change code.
- Do not implement queue execution.
- Do not edit files until authorized.
- Do not touch untracked user-owned files.
- Do not run `git clean`.
- Do not create `THREAD_ARCHIVE/AGENT_WIP.md` in this task.

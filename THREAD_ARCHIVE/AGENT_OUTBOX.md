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

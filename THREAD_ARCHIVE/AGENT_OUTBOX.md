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
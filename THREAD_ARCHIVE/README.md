# Thread Archive

This folder is for raw or semi-raw conversation exports and long context notes.

Guidelines:
- Raw thread exports belong here.
- Do not use raw thread dumps as primary operational memory.
- Prefer summarized architectural memory in `PROJECT_STATE.md`.
- Prefer chronological implementation decisions in `PROJECT_LOG.md`.
- Raw archives are for recovery, context, and research.
- Do not commit generated `qa-output/` files here.
- Do not paste massive raw transcripts unless explicitly provided or requested.

Recommended naming:
- `YYYY-MM-topic.md`
- `YYYY-MM-DD-thread-export.md`
- `YYYY-MM-phase-notes.md`
Activity logging:
- Use `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` for compact ongoing action updates from `gpt`, `mgpt`, `pcdx`, and `mcdx`.
- Keep entries concise: actor, timestamp, summary, files touched, checks, commit hash if any, and status.
Direct-message outbox:
- Use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for quick current handoff messages between `gpt`, `mgpt`, `pcdx`, and `mcdx`.
- Keep outbox entries short, actionable, and free of secrets.
- Move durable completed work summaries into `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` after action is complete.
Mobile GPT onboarding:
- Use `THREAD_ARCHIVE/MGPT_ORCHESTRATION_ROADMAP.md` as the mobile GPT onboarding roadmap for `mgpt` planning and `mcdx` task drafting.
Result reporting convention:
- After PCDX completes a requested task, paste the concise final result summary into repo memory in the same operational format used in chat: commit, files changed, validation, QA counts, push status, and remaining caveats.
- Use `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md` for durable completed-task summaries.
- Use `THREAD_ARCHIVE/AGENT_OUTBOX.md` when Dennis asks for a quick current handoff that `gpt`, `mgpt`, `pcdx`, or `mcdx` should review next.
- Keep summaries concise and link/reference the relevant repo files instead of pasting long raw transcripts.

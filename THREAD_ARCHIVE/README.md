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
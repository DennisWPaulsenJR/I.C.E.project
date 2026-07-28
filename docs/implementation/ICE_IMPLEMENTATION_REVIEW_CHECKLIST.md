# I.C.E. Implementation Review Checklist

**Task ID:** ICE-IMP-0007
**Status:** Standard review checklist
**Scope:** Documentation only

## Purpose

This checklist defines the required review checkpoints every future runtime implementation task must satisfy before GPT approval.

## Architecture Compliance

- Governing architecture documents are cited.
- The task does not create new architecture silently.
- The task does not supersede approved architecture.
- Phase I boundaries are preserved.
- ALIGN remains adjacent.
- P.A.S.S. remains separate.

## Ownership Compliance

- Runtime owner is identified.
- Architectural owner is identified.
- Producer and consumer responsibilities are identified.
- Shared ownership is explicitly called out.
- Cross-component transitions are documented.

## Storage Compliance

- Affected storage families are listed.
- Affected keys are listed.
- Authority classification is identified.
- Generation dependency is identified.
- Cleanup/Clear All impact is identified.
- New durable keys satisfy admission standard.
- Runtime caches remain non-authoritative.

## QA Readiness

- Existing automated QA is listed.
- Existing manual QA is listed.
- Missing QA is listed.
- Required new QA is listed when behavior changes.
- QA does not become semantic authority.
- Generated reports are treated as review artifacts, not runtime truth.

## Traceability

- Source evidence impact is stated.
- Provenance impact is stated.
- Context impact is stated.
- Observation impact is stated.
- Confidence/reliability impact is stated.
- Explanation impact is stated.
- Consumer presentation impact is stated.

## Documentation Updates

- Implementation docs updated if ownership, storage, or QA responsibility changes.
- Architecture docs updated only when architecture task authorizes it.
- Project log/state updates are scoped and truthful.
- No repository structure consolidation occurs without approval.

## Validation

- `git diff --check` run.
- Syntax checks run for changed runtime files.
- Targeted QA run.
- Broader QA run when cross-component or semantic behavior changes.
- Manual validation performed for visual/user-facing changes.

## Git Hygiene

- User-owned untracked files are not touched.
- `.gitignore` is not modified unless explicitly authorized.
- `git clean` is not run.
- Only intended files are staged.
- Commit message matches approved instruction.
- Push occurs only when explicitly authorized.

## Approval Gate

The task may proceed only when:

- User authorization is explicit.
- GPT Review Gate approval is satisfied where required.
- The implementation scope is narrow enough to review.
- Stop conditions have been checked.

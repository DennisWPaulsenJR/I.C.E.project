# I.C.E. Rollback and Recovery Standard

**Task ID:** ICE-IMP-0007
**Status:** Rollback and recovery standard
**Scope:** Documentation only

## Purpose

This document defines minimum rollback and recovery expectations for future runtime implementation tasks.

## Rollback Principle

Every runtime change should have a known recovery path before implementation begins. Rollback planning is required even when rollback is expected to be simple.

## Trigger Conditions

Rollback or recovery should be considered if:

- Tests fail after implementation.
- Manual verification reveals user-facing regression.
- Clear All no longer removes intended records.
- Stale records repopulate.
- Semantic records are rewritten unexpectedly.
- Presentation or diagnostics become semantic authority.
- Queue processing occurs without authorization.
- Storage corruption or migration failure occurs.
- Extension fails to load.
- Study Panel or graph cannot render.

## Rollback Authority

Rollback requires explicit user instruction unless the active task already authorizes recovery steps. Destructive Git operations still require care and must not erase user-owned unrelated work.

## Rollback Planning Requirements

Before implementation, document:

- Files expected to change.
- Storage keys affected.
- Whether storage migration is involved.
- Whether data cleanup is required.
- How to restore previous behavior.
- QA to run after rollback.
- Manual verification after rollback.
- Documentation updates needed.

## Recovery Strategies

Possible recovery strategies include:

- Revert the targeted commit.
- Apply a forward fix.
- Disable newly added presentation behavior.
- Restore previous storage read/write path.
- Preserve user settings while clearing invalid runtime state.
- Regenerate QA report after recovery.

The correct strategy depends on the approved task and must not be guessed if it risks user data.

## Validation After Rollback

After rollback or recovery:

- Run `git diff --check`.
- Run syntax checks for affected runtime files.
- Run targeted QA.
- Run broader QA if cross-component behavior changed.
- Confirm final tracked status.
- Report what was restored and what remains changed.

## Documentation Updates

If rollback changes the implementation state, update the relevant project log/state or task report only when authorized. Do not rewrite architecture to match a failed implementation.

## Boundary

This standard does not authorize rollback, reset, checkout, storage deletion, or runtime changes by itself.

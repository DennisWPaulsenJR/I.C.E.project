# I.C.E. Runtime Refactor Governance

**Task ID:** ICE-IMP-0007
**Status:** Runtime implementation governance standard
**Scope:** Documentation only

## Purpose

This document defines the governance framework every future I.C.E. runtime implementation or refactor task must follow before code changes begin.

It does not authorize runtime implementation.

## Governance Principle

No runtime change should begin until the task identifies what it changes, why it changes, who owns it, what architecture governs it, what storage it touches, how it is verified, and how it can be safely reversed or recovered.

## Minimum Planning Information

Every future runtime implementation task must document:

- Task ID.
- Reason for change.
- Expected behavior.
- Runtime owner.
- Architectural owner.
- Affected files.
- Affected storage families.
- Affected storage keys.
- Affected architecture domains.
- Affected QA assets.
- Existing verification coverage.
- Required new verification.
- Manual verification.
- Success criteria.
- Known risks.
- Rollback or recovery strategy.
- Documentation updates required.
- GPT Review Gate approval requirement.

## Runtime Owner Requirement

The task must identify the current runtime owner being changed:

- `content.js`
- `engine.js`
- `pageOverlay.js`
- `popup.js`
- `background.js`
- `study.js`
- `manifest.json`
- `qa/*.js`
- storage behavior
- runtime cache behavior
- generated reports
- documentation only

If multiple owners are affected, the task is cross-component and requires stronger review.

## Architectural Owner Requirement

The task must identify the conceptual owner:

- Evidence Intake
- Context Management
- Observation
- Semantic Processing
- Provenance
- Confidence
- Reliability
- Rule Governance
- Explanation
- Consumer Presentation
- Queue
- Configuration
- Extension Boundary
- Verification

Current service ownership boundaries are planning boundaries only. They do not imply services already exist in code.

## Storage Impact Requirement

Any task touching storage must identify:

- Storage family.
- Storage keys.
- Producer.
- Consumer.
- Authority classification.
- Generation dependency.
- Deletion authority.
- Clear All impact.
- QA coverage.

No new durable key may be added unless it satisfies `ICE_DURABLE_KEY_ADMISSION_STANDARD.md`.

## QA Requirement

Every runtime task must list:

- Existing automated QA to run.
- Existing manual verification to perform.
- Missing QA coverage.
- New QA required, if behavior changes.
- Report artifacts expected.

QA verifies implementation behavior. QA does not own semantic meaning, evidence, storage authority, architecture policy, or runtime behavior.

## Approval Requirement

Runtime changes require explicit user authorization and GPT Review Gate approval according to the current orchestration workflow. Codex must not infer approval from adjacent documentation work.

## Stop Conditions

Stop before runtime work if:

- Runtime owner is unclear.
- Storage authority is unclear.
- QA coverage is insufficient for the risk.
- Clear All impact is unknown.
- The task changes semantic authority without explicit approval.
- The task adds a durable key without the durable-key admission standard.
- The task would process queues, crawl, or ingest external data without approval.

## Boundary

This standard does not modify code, storage, QA, schemas, APIs, or repository structure.

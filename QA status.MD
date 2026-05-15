# Current QA Status

Purpose: lightweight repo-visible QA readiness snapshot for `gpt`, `mgpt`, `pcdx`, and `mcdx`.

Last updated: 2026-05-14 by `pcdx`.

Current operational state:
- Matthew 1 Playwright QA is the primary end-to-end extension readiness check.
- QA harness path: `qa/matthew1-extension-qa.js`.
- QA output path: `qa-output/latest-qa-bundle.json`.
- Generated `qa-output/` files should remain uncommitted unless explicitly requested.
- Current desktop status from `pcdx`: `npm.cmd run qa:matthew1` passed after adding the Phase 7.7 Reference Graph Layer.
- Latest successful desktop bridge commits reported by `pcdx`:
  - `985f1b3 pcdx: Bridge mcdx optional page overlay`
  - `e049ddb pcdx: Bridge mcdx QA readiness`
  - `7270d68 pcdx: Bridge mcdx direct agent outbox`
  - `f32e2d2 pcdx: Add mgpt orchestration roadmap`
  - `12cb9e4 pcdx: Add scope integrity layer`
  - `467a9ce pcdx: Add current page source discovery index`
  - `18050ca pcdx: Add entity class labels to role groups`
  - Phase 7.7 reference graph layer: this commit

Latest successful Matthew 1 QA counts reported by `pcdx`:
- DOM hints: 173
- Mention index: 172
- Entity registry: 46
- Relationship graph: 61
- Canonical identities: 48
- Semantic events: 48
- Semantic flow chains: 1
- Source discovery: 136 current-page refs
- Reference graph: 136 current-page edges
- Scope integrity: 775 scoped items, 0 missing scope

## Validation Commands

Run syntax checks:

```bash
node --check background.js
node --check content.js
node --check engine.js
node --check popup.js
node --check study.js
node --check pageOverlay.js
node --check qa/matthew1-extension-qa.js
git diff --check
```

Run JSON checks:

```bash
python3 -m json.tool manifest.json >/tmp/manifest.json.check
python3 -m json.tool package.json >/tmp/package.json.check
```

Install browser QA dependencies when network access permits:

```bash
npm install
npx playwright install chromium
```

Run Matthew 1 QA:

```bash
npm run qa:matthew1
```

Direct QA harness run:

```bash
node qa/matthew1-extension-qa.js
```

Patch bridge commands for MCDX when shell GitHub access remains blocked:

```bash
git diff --patch --no-ext-diff --no-color
git show --patch --no-ext-diff --decorate --no-color HEAD
```

## Known Limitations

- `mcdx` shell GitHub access is still blocked by environment proxy: `CONNECT tunnel failed, response 403`.
- `mcdx` shell npm/Playwright install can be blocked by proxy/registry `403`, so full Playwright browser QA may need `pcdx` desktop.
- `mcdx` can still run syntax checks, create local commits, update repo-visible files, and generate patches.
- If `mcdx` cannot push/fetch, use `THREAD_ARCHIVE/AGENT_OUTBOX.md` for quick handoffs and paste patch output for `pcdx` to bridge.
- Do not commit generated `qa-output/` bundles unless Dennis explicitly requests it.

## Current Supported QA

Current adapter support tracked in repo memory:
- `lds_scripture_adapter`
- `generic_html_adapter`
- `plain_text_adapter`

Current Matthew 1 harness validates:
- active LDS scripture adapter detection
- DOM semantic hints
- mention index
- entity registry
- relationship graph
- canonical identities, including `JESUS CHRIST`
- expected Matthew 1 relationship edges
- semantic events
- semantic flow chains
- scope integrity export samples
- explicit ScopePath assertions for Matthew 1 verse 20, verse 21, Joseph instruction at verse 20, and Joseph response at verse 24
- current-page source discovery assertions for study notes, navigation/source refs, and scoped note `scripture.nt.matthew.1.note.20a`
- reference graph assertions for study-note edges, navigation/source edges, and scoped note edge `scripture.nt.matthew.1.note.20a`
- QA bundle creation at `qa-output/latest-qa-bundle.json`
- structured failure reporting for:
  - `missing-playwright`
  - `assertion-failure`
  - `runtime-error`
- page overlay disabled during Matthew 1 QA setup with `showPageOverlay: false`.

## QA Goals

Keep concise and operational:
- Keep this file as the quick QA readiness snapshot.
- Keep detailed completed work in `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`.
- Keep quick actor-to-actor QA handoffs in `THREAD_ARCHIVE/AGENT_OUTBOX.md`.
- Keep `PROJECT_STATE.md` as the broader operational source of truth.
- Prefer additive QA checks that preserve current formatter, capture, study panel, storage keys, and semantic pipeline behavior.
- Before committing application changes, run syntax checks and `git diff --check`.
- Run `npm run qa:matthew1` when Playwright is installed and network/browser environment permits.
- If MCDX cannot run Playwright, commit only after local feasible checks and send patch/outbox handoff to PCDX for desktop validation.
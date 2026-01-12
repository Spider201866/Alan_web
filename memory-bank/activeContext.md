<!-- Alan UI - activeContext.md | Updated 12th January 2026, Cline -->

# Active Context

## Current Work Focus
- Maintain a stable, accessible PWA for LMIC users (eye/skin/ear health chatbot + guides).
- Prefer **small, low-risk maintenance** changes and keep documentation accurate.
- Avoid architectural churn; preserve existing orchestrator/module patterns.

## Recent Work (Jan 2026)
- CI/build stability improvements (build/idempotence + reduced log noise).
- Environment-driven client logging (build injects `<meta name="alanui-env" content="production">`).
- Build-stamped service worker cache name (stamped into `dist/service-worker.js` during build).
- Flowise proxy reliability improvements (`/flowise` proxy mounted early; safer abort behavior).

## Developer Workflow Hygiene (12 Jan 2026)
- Repo now enforces PowerShell-safe command patterns via `.clinerules/reminders.md`.
- New skill: `.clinerules/skills/powershell-sanity-checklist/SKILL.md`
  - Quick checks for PowerShell pitfalls (curl alias), Git metadata (`.git` vs `.git_disabled`), etc.
- Updated Git troubleshooting skill: `.clinerules/skills/windows-git-sanity/SKILL.md`
  - Includes `.git_disabled` and env override (`GIT_DIR/GIT_WORK_TREE`) gotchas.
- If terminal capture is flaky, prefer Cline **Terminal Execution Mode → Background Exec**.

## Current Decisions / Guardrails
- Keep environment-aware static serving: `public/` in dev, `dist/` in production.
- Keep admin SW bypass for `view-records.html`.
- Keep CSP directives centralized in `config/index.js`.

## Next Steps
- Confirm Railway deployment is picking up latest builds and clients refresh caches as expected.
- Ensure `.gitignore` covers local DBs and `dist/`.
- Optional: clean up any legacy/stale docs references (e.g. missing scripts referenced in old notes).

## Where to Look for Details
- Architecture & patterns: `systemPatterns.md`
- Technologies & tooling: `techContext.md`
- Historical changelog and backlog: `progress.md`

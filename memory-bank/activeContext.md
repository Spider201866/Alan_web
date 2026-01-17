<!-- Alan UI - activeContext.md | Updated 16th January 2026, Cline -->

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

## Recent Work (14 Jan 2026)
- **Frontend injection hardening**
  - Replaced unsafe `innerHTML` patterns across UI scripts.
  - Added `public/scripts/trusted-html.js` (`setTrustedHtml`) for *app-controlled* markup (translations/templates) with basic sanitization.
  - Enforced safer external links opened in a new tab (`rel="noopener noreferrer"`).
- **Admin security + reliability**
  - Admin session cookie hardened: 15 min TTL; production uses `__Host-alan_admin_session`.
  - Service worker avoids caching `/api/*` and reduces console noise behind a DEBUG flag.
- **Server hardening headers**
  - Added Permissions-Policy and additional low-risk security headers (CORP/COOP/OAC, etc.).
- **Test suite maintenance**
  - Added `tests/api/security-headers.test.js` to prevent header regressions.
  - Made `tests/api/build.test.js` less brittle.
  - A11y runner no longer prints canvas warnings (JSDOM canvas stub).

## Recent Work (16 Jan 2026)
- **CSRF handling refinements**
  - Updated CSRF enforcement so `/api/record-info` performs validation **before** CSRF checks.
  - Global CSRF middleware now skips `/api/record-info`, and the route applies CSRF **per-route** after validation.
  - Tests updated to include `csrf_token` cookie + `x-csrf-token` header for `/api/record-info` and admin delete flows; test file formatted for Prettier.

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
- Optional: reduce remaining test log noise (dotenv tips / experimental warnings) if desired.

## Where to Look for Details
- Architecture & patterns: `systemPatterns.md`
- Technologies & tooling: `techContext.md`
- Historical changelog and backlog: `progress.md`

<!-- Alan UI - activeContext.md | Updated 6th February 2026, Codex -->

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

## Recent Work (6 Feb 2026)
- Production top-gap root cause was traced to a hidden `U+FEFF` character between `<!doctype html>` and `<html>` in built/minified HTML (`dist/home.html` observed).
- `scripts/build.js` now strips `U+FEFF` from HTML content before patching and again before/after minification writes.
- This prevents a phantom top line-box (~19px on affected mobile Chrome) from appearing above `.page-container`.
- Added UI regression tests:
  - `tests/ui/layout-regressions.test.js` (home top-gap guardrails + instructions mobile 3-button single-row).
  - `tests/ui/copy-regressions.test.js` (`uvLightHeading` exact value + instructions intro typo guard).
- Added encoding-regression guardrails for popup glyph corruption:
  - `scripts/check-docs-sync.cjs` now fails CI if tracked text files contain `U+FFFD` replacement chars or the common mojibake byte-sequence form.
  - `tests/ui/copy-regressions.test.js` now asserts home popup close markup remains `&times;` and free of replacement-char mojibake.
- Documentation sync updates:
  - Updated `README.md`, `tests/README.md`, `AGENTS.md`, and regenerated `folderList.txt`.
  - Updated `public/sitemap.xml` `lastmod` values to `2026-02-06`.
  - Added release/docs automation scripts:
    - `scripts/sync-release-metadata.cjs`
    - `scripts/check-docs-sync.cjs`
  - Added `.gitattributes` for consistent line-ending normalization.

## Recent Work (5 Feb 2026)
- Frontend duplication reduction:
  - Added shared exam page initializer: `public/scripts/exam-page-init.js`.
  - Refactored `public/scripts/eye.js`, `public/scripts/ear.js`, and `public/scripts/skin.js` to config-driven page translation setup.
- Language menu consistency:
  - Added canonical language source module: `public/scripts/language-options.js`.
  - Home/index language menus now render from shared options.
- Muted page fragment reuse:
  - Added `public/partials/muted-buttons.html` plus `mountMutedButtons()` in `public/scripts/muted.js`.
  - Home and muted pages now consume the same muted buttons fragment.
- Index page style cleanup:
  - Moved key inline styles from `public/index.html` into `public/styles/styles_index.css`.

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

## Recent Work (17 Jan 2026)
- **Backend refactor + admin caching hardening**
  - Centralised admin "no-store" response headers in `middleware/admin-no-store.js` and applied them consistently (admin APIs + `/view-records.html`).
  - Introduced shared cookie parsing helper `utils/cookies.js` (safe decode) and reused it in admin-session + CSRF middleware.
- **CSRF + Flowise proxy hardening**
  - CSRF middleware tightened (double-submit cookie; sets token on safe methods and enforces header/cookie match on mutating requests).
  - Flowise proxy (`middleware/flowiseProxy.js`) hardened:
    - aborts upstream only on real client disconnect (avoids `req.close` false positives)
    - blocks absolute/`//` proxy targets + origin mismatch
    - strips sensitive headers (cookie/authorization/origin/etc.)
    - supports streaming responses (SSE) via `Readable.fromWeb()`
- **Frontend reliability helpers**
  - Added `public/scripts/sw-ready.js` (`whenSwReady`) with a timeout fallback to avoid first-load races.
  - Added `public/scripts/storage.js` helpers (`getStoredString`, `getStoredNumber`, `ensureSessionId`) to standardise localStorage access.
  - Added `public/scripts/csrf.js` helper to read `csrf_token` and attach `x-csrf-token` headers (`withCsrfHeaders`).
- **UX tweaks (mobile + PWA install)**
  - Added mobile swipe-to-close gestures for the side menu and popup (`home-ui-handlers.js`).
  - Prevented install button flashing by default-hiding it (`#install-btn { display: none; }`) and only showing it after `beforeinstallprompt`.
- **API route cleanup + tests**
  - Reduced duplication in `routes/api.js` via shared handlers (fetch-records/history) and consistent admin no-store headers.
  - Updated/added tests for CSRF flows (`tests/api/validation.test.js`, `tests/api/admin-csrf.test.js`).
- **Repo process**
  - Added/updated `AGENTS.md` with repo tool/workflow rules.
  - Updated `public/scripts/aboutalan.js` header date.

## Recent Work (18 Jan 2026)
- **History ordering normalization**
  - Added `dateTimeEpoch` column and backfill in `services/data-service.js` for reliable SQL ordering.
  - Client record-info payloads now send ISO timestamps; admin UI formats date/time consistently.
- **Shared admin IP allowlist**
  - Extracted `middleware/admin-ip-allowlist.js` and reused it in `server.js` and `routes/api.js`.
- **Client record-info helper**
  - Centralized payload assembly and posting in `public/scripts/record-info.js` (used by auth/home data flows).

## Developer Workflow Hygiene (12 Jan 2026)
- Repo now enforces PowerShell-safe command patterns via `.clinerules/reminders.md`.
- New skill: `.clinerules/skills/powershell-sanity-checklist/SKILL.md`
  - Quick checks for PowerShell pitfalls (curl alias), Git metadata (`.git` vs `.git_disabled`), etc.
- Updated Git troubleshooting skill: `.clinerules/skills/windows-git-sanity/SKILL.md`
  - Includes `.git_disabled` and env override (`GIT_DIR/GIT_WORK_TREE`) gotchas.
- If terminal capture is flaky, prefer Cline **Terminal Execution Mode -> Background Exec**.

## Current Decisions / Guardrails
- Keep environment-aware static serving: `public/` in dev, `dist/` in production.
- Keep admin SW bypass for `view-records.html`.
- Keep CSP directives centralized in `config/index.js`.
- Keep build-time BOM sanitization for HTML outputs in `scripts/build.js` (do not remove without replacing with equivalent sanitization).

## Next Steps
- Confirm Railway deployment is picking up latest builds and clients refresh caches as expected.
- Ensure `.gitignore` covers local DBs and `dist/`.
- Optional: unify SW_READY gating usage across pages (prefer `whenSwReady` helper) where it reduces duplication.
- Optional: keep monitoring Flowise proxy behaviour for streaming/SSE edge cases on Railway.

## Where to Look for Details
- Architecture & patterns: `systemPatterns.md`
- Technologies & tooling: `techContext.md`
- Historical changelog and backlog: `progress.md`

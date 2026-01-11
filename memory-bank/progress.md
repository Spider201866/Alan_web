<!-- Alan UI - progress.md | Updated 15th September 2025, Cline -->

# Progress

## September 2025 Review & Documentation Update (15 Sep 2025)
A comprehensive codebase review and mapping was completed to validate architecture, security posture, PWA behavior, and developer workflows. The Memory Bank has been updated with expanded detail and confirmed patterns:
- Updated files: activeContext.md, systemPatterns.md, techContext.md, productContext.md.
- This file (progress.md) now documents the outcomes, current status, and next steps.

### Verified Architecture and Behavior
- Backend
  - Express 5 app factory (`createApp`) with environment-aware static serving:
    - Development: serves `public/`
    - Production: serves `dist/` after `npm run build`
  - Helmet CSP and security headers configured in `server.js`:
    - CSP: restrictive sources with allowances for Flowise, ipinfo, BigDataCloud, Google Fonts, and CDNs (jsdelivr/cdnjs/unpkg); OSM tiles allowed in img-src.
    - HSTS (1 year, includeSubDomains), Referrer-Policy `no-referrer`, Frameguard `deny`, and `noSniff` enabled.
  - Rate limiting via express-rate-limit:
    - general: 100 requests / 15 minutes / IP
    - sensitive: 10 requests / 15 minutes / IP
  - CSRF middleware (optional): simple, process-local token; GET replies with `X-CSRF-Token`; mutating requests require `x-csrf-token` unless on skipPaths; disabled by default via env.
  - SQLite persistence (better-sqlite3):
    - Tables: `history` and `active_record`
    - Transactions for upsert/delete; ensures atomicity and consistency
    - Dev/test DBs in project root; prod DB at `/data/alan-data.db` (Railway volume), directory auto-created when absent
  - Routes:
    - POST `/api/record-info` (validated public write): upserts record and sets active
    - POST `/api/fetch-records` (protected): returns single active record as array
    - POST `/api/fetch-history` (protected): returns full history (desc by date)
    - DELETE `/api/delete-record` (protected): deletes by sessionId, clears active pointer if necessary

- Frontend
  - Orchestrator pattern:
    - `index.js`: onboarding, password verification, language init, form handling
    - `home.js`: UI init, translations, muted snippet, Flowise chatbot init, service worker handshake (SW_READY)
  - Chatbot integration:
    - Flowise web component (via jsdelivr) with sessionId persistence and themed UI
    - Marquee hiding logic triggered robustly when the chat input gains focus (MutationObserver within Flowise shadow DOM)
  - Client-side chat history:
    - `listener-module.js`: observes Flowise shadow DOM for guest/host messages
    - De-duplicates streaming bot messages, persists sessions to localStorage, supports copy/export affordances and Reset Chat detection
  - i18n:
    - Dynamic JSON loading (22 languages), `languageChanged` event and page translators
    - Translation consistency checker script (`scripts/check-translations.cjs`)
  - UI/a11y:
    - Focus-trap for modals and side menus, skip-to-content link, ARIA labeling across key controls
    - Side menu layout, user info popup with “flash-blue” updates after geolocation changes

- PWA
  - Service worker (public/service-worker.js):
    - Pre-caches core assets; network-first for navigations (offline fallback to `offline.html`); cache-first for static assets
    - Bypasses `view-records.html` to avoid SW interference on admin/records flows
    - On activate: cleans old caches and posts `SW_READY` to clients, then `clients.claim()` for fast control

- Build & Tooling
  - `scripts/build.js`: copies `public/` → `dist/`, injects build timestamp into HTML, rewrites relative assets to absolute paths, minifies JS (terser), CSS (clean-css CLI), and HTML (html-minifier-terser)
  - `scripts/test-a11y.mjs`: runs axe-core on `dist/*.html`, fails on violations; prints selectors/snippets for debugging
  - `scripts/process-images.js`: sharp-based conversion to WebP and generation of responsive variants for heavy assets (e.g., atomsblue, logos Q/AP); animated GIF → animated WebP supported
  - `scripts/check-translations.cjs`: validates translation keys (missing/extra/placeholder) vs English baseline
  - `generate-hash.cjs`: PBKDF2 hashing (100k, SHA256, 32-byte) aligned with middleware; updates `.env` MASTER_PASSWORD_HASH in-place

### Security Posture
- Authentication:
  - PBKDF2-SHA256(100k) with salt; master hash and one-time hashes supported; OTP consumed upon use
  - `generate-hash.cjs` ensures hash derivation matches middleware
- CSP:
  - Strict, explicit sources for scripts/styles/fonts/images/connect
  - Two CSP definitions currently exist (server inline and config cspOptions); consolidation recommended to prevent drift
- CORS:
  - Allowlist-based; credentials enabled; null-origin requests are accepted
- CSRF:
  - Optional, simple token model; disabled by default; can be enabled for production with minimal client changes

### Documentation Outcomes
- Memory Bank files have been expanded with:
  - Recently confirmed patterns (SW bypass for admin, SW_READY handshake, observer-based chat capture)
  - Technical details (DB path per env, CSP sources, specific external APIs)
  - Operational guidance (service worker cache versioning, CSRF enablement, logging strategy)
- This progress entry records the completed review and the prioritized backlog (below).

### Backlog / Action Items (Prioritized)
1. Consolidate CSP single source of truth
   - Choose authoritative CSP (prefer config/index.js) and have server.js consume it, or remove dead config to avoid drift
2. Client logging strategy
   - Replace hostname-based silencing in `public/scripts/log.js` with environment-driven toggle or an allowlist
3. .gitignore hygiene
   - Ensure local DBs (`alan-data.db`, `test-alan-data.db`) and `dist/` are excluded from version control
4. Consider enabling CSRF in production
   - Set `ENABLE_CSRF=true` and add `x-csrf-token` to state-changing requests (skipPaths already in place for `/api/fetch-records`)
5. Service worker cache versioning
   - Adopt a build-stamped cache name or a disciplined bump schedule to avoid stale assets
6. Remove or wire unused config
   - `config.cspOptions` appears unused; either wire it or remove it
7. Validate optional envs
   - Evaluate removal of unused envs (`API_BASE_URL`, `SENTRY_DSN`, `SENTRY_FRONTEND_DSN`) to reduce noise
8. UX consistency
   - Ensure there is a single handler path for `instructions-button` (avoid duplication across modules)
9. CI checks
   - Confirm CI invokes translation check and a11y checks (build then axe), alongside unit/integration tests

---

## What Works (Confirmed)
- PWA & Performance:
  - Fully functional PWA with offline fallback, core asset pre-cache, and cache-first strategy for static assets
  - Performance improvements via modern image formats (WebP) and on-demand loading for heavy libraries (html2canvas)
- Core Functionality:
  - Session/user metadata capture and persistence in SQLite
  - Consistent app bar + shared page template; robust navigation patterns
  - Focus traps for a11y; language system with 22 locales; event-driven updates
- Security:
  - Rate limiting; strict CSP; optional CSRF; no user account complexity
- Development & Testing:
  - Structured build pipeline; translation consistency checks; a11y test script for dist; Jest + JSDOM setup

## Current Status
The AlanUI Web Chatbot remains stable, accessible, and well-documented as a PWA. The September 2025 review confirms architectural soundness and identifies targeted improvements (mostly configuration hygiene and environment concerns). Memory Bank has been synchronized with current implementation details.

## Known Issues (Unchanged)
- Intermittent `EBUSY` during test database cleanup; non-blocking and does not affect outcomes
- Deprecation warnings for sub-dependencies; accepted for now

---

## January 2026 Maintenance (11 Jan 2026)

### Fixed
- `npm audit --audit-level=moderate` now passes (0 vulnerabilities). The previously reported advisory for `qs < 6.14.1` is resolved with `qs@6.14.1` in the dependency tree.
- Flowise proxy reliability:
  - `/flowise` is mounted **before** `express.json()` and CSRF so the proxy can forward request streams.
  - Proxy abort logic fixed: abort upstream fetch only on genuine client disconnect (`req.aborted` or `res.close` when response not finished).

### PWA
- Service worker cache name bumped to `alanui-v3`.
- Service worker bypasses `/flowise/` GET requests to avoid caching/stream interference.

### Verification
- Local verification: POST to `/flowise/api/v1/prediction/<chatflowid>` returns HTTP 200 and valid JSON response.
- Test suite: `npm test` passes (build + format check + translations + a11y + jest).

---

## Recent Improvements (July 2025)
- **Records Page Fixes (July 10):** Repaired the "View Records" page by fixing the date display format and updating the Content Security Policy to allow map tiles and markers to be loaded correctly.
- **UI Fix (July 6):** Fixed a bug where the scrolling marquee of example prompts was not disappearing when the user clicked into the chatbot input field by replacing an unreliable `setTimeout` with a robust `MutationObserver`.
- **Screenshot Functionality Fix (July 6):** Repaired the screenshot button by replacing a faulty dynamic import of `html2canvas` with a promise-based script loading function.
- **Authentication Fix (July 6):** Resolved a critical authentication bug by aligning the hashing algorithm in `generate-hash.cjs` (`pbkdf2Sync`) with the verification logic in the `auth` middleware.
- **Performance Optimisations (July 3):** Replaced all remaining `.jpg` `.gif` and `.png` images with `.webp`, prevented a triple-fetch of data on chatbot initialisation, and implemented on-demand loading for the `html2canvas` library.
- **Offline Experience Improvements (July 2):** Enhanced the PWA's offline reliability by ensuring assets are cached before page rendering, adding "Retry" and "Go Back" buttons to the offline page, and expanding the cache to include all side menu pages.

---

## What Worked Previously (From June 2025)
- **PWA & Performance:**
  - Robust offline experience and pre-caching
  - Optimized images, reduced redundant fetches, on-demand heavy libraries
- **Core Functionality:**
  - Persistent SQLite storage for session/history metadata
  - Modular, consistent frontend with shared app bar and focus trap
  - Dynamic language loading system for 22 languages
- **Security:**
  - Rate limiting and Helmet CSP configuration
- **Development & Testing:**
  - Automated tests for UI, accessibility, and backend aspects
  - Clear build process and CI/CD with GitHub Actions
- **Security Hardening (June 29, 2025):**
  - Removed vulnerable debug route (`/__debug-list-dist`) from production
- **Comprehensive Code Documentation (June 28, 2025):**
  - JSDoc across logical JS files and file-level overviews
- **Repository Reset (June 28, 2025):**
  - Reset to clean stable baseline and updated README
- **UI Improvements (June 25, 2025):**
  - Centered table cell content and red trash icon in records table
- **Full CSP Compliance and Bug Fixes (June 22, 2025):**
  - Removed inline scripts; fixed non-numeric lat/long error
- **Deployment 404 Error Fixed (June 22, 2025):**
  - Environment-aware static serving from dist in production
- **Accessibility Audit & Fixes (June 22, 2025):**
  - Addressed issues and improved overall accessibility
- **Code Health and Stability (June 22, 2025):**
  - Updated dependencies and stabilized test suite

<details>
<summary>Archived Progress (pre-June 22, 2025)</summary>

- **Deployment Issue Diagnosed (June 22, 2025):**
  - Live deployment on Railway was serving a stale version
- **Performance Optimisation (June 22, 2025):**
  - Implemented image optimization, asset minification, and Gzip compression
  - Removed "Critical CSS" optimization due to build failures
- **CI/CD Pipeline (June 21, 2025):**
  - Automated build step in GitHub Actions
- **Server Refactor & Data Persistence (June 20, 2025):**
  - Modular server and persistent SQLite database

</details>

---

## Condensed Roadmap (Sep 2025) — Prioritized
1) Production caching + SW versioning
- Cache-Control: public, max-age=31536000, immutable for /dist assets; HTML no-cache.
- Keep explicit SW CACHE_NAME bump (or inject build version in SW).

2) Image stability + lazy load
- Ensure width/height (or aspect-ratio) on all images; continue <picture>/srcset WebP.
- Add loading="lazy" to below-the-fold images.

3) Bandwidth-aware prefetch (desktop/4g/idle only)
- On hover + requestIdleCallback + effectiveType === '4g', prefetch likely-next pages into SW cache.

4) Targeted dynamic imports
- Keep page orchestrators; convert heavy, optional modules to import() on user path (beyond html2canvas).

5) CSP single source + env-driven logging
- One CSP config consumed by server.js; replace hostname-based client logging with env-driven flag.

6) CI enforcement
- Ensure pipeline runs: build → translation check → a11y on dist → jest; fail on violations.

Optional later:
- Fingerprinted asset filenames in build.
- Selective pjax/Turbo/HTMX on a couple of routes (no SPA refactor).

### Acceptance Signals
- Repeat loads: fresh HTML, cached static assets; no “stale app” complaints post-release.
- CLS ≈ 0.01 on key pages; fewer initial image requests.
- Desktop/4g navs feel instant; no data growth on 2g/3g.
- Reduced JS transfer/exec where code-split.
- Single CSP source; production logs quiet regardless of domain.
- CI fails on missing i18n keys or a11y issues; green builds are trustworthy.

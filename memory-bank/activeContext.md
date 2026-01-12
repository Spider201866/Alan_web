<!-- Alan UI - activeContext.md | Updated 12th January 2026, Cline -->

# Active Context

## Current Work Focus
The application remains stable, fully documented, and feature-complete as a Progressive Web App (PWA). The present focus is routine maintenance, minor enhancements, and documentation accuracy. On 15 Sep 2025, a comprehensive codebase review and mapping was completed to validate architecture, identify minor risks, and surface practical improvements that preserve existing patterns.

## Latest Work (11 Jan 2026)
- Fixed CI failure from `npm audit --audit-level=moderate` by ensuring dependencies resolve to `qs@6.14.1` and audit reports 0 vulnerabilities.
- Stabilized Flowise proxying by proxying the Flowise API through the app at `/flowise`.
  - `server.js` mounts `/flowise` **before** `express.json()` and CSRF so request streams remain readable.
  - `middleware/flowiseProxy.js` now aborts upstream fetch only on genuine client disconnect (`req.aborted` or `res.close` while not ended). Previously, aborting on `req.close` could fire on normal completion and hang requests.
- Confirmed local Flowise calls work: POST to `/flowise/api/v1/prediction/<chatflowid>` returns HTTP 200 with JSON content.
- PWA: bumped service worker cache name to `alanui-v3` and bypassed `/flowise/` GET requests to avoid caching/stream interference.

## Recent Actions (15 Sep 2025)
A full read-through of backend, frontend, PWA, build tooling, tests setup, and Memory Bank was performed. Key confirmations and findings:

- Backend
  - Express app factory (`createApp`) with environment-aware static serving (public in dev, dist in prod).
  - Helmet CSP configured inline in `server.js` with explicit allowlists for Flowise, ipinfo.io, BigDataCloud, fonts, and CDNs. Additional security headers: HSTS, referrerPolicy, frameguard, noSniff.
  - Rate limiters: general (100/15m) and sensitive (10/15m).
  - CSRF middleware: simple, process-local token; enabled via `ENABLE_CSRF` env, with skipPaths supported.
  - SQLite persistence via `better-sqlite3` with automatic table init and transactional upsert/delete (`services/data-service.js`).
  - Routes:
    - POST `/api/record-info` (public, validated) upserts record and marks active.
    - POST `/api/fetch-records` (protected) returns active record as array.
    - POST `/api/fetch-history` (protected) returns full history.
    - DELETE `/api/delete-record` (protected) removes record, clears active if needed.
- Frontend
  - Orchestrators: `index.js` (onboarding/auth/language), `home.js` (UI, translator, muted snippet, Flowise chatbot init, SW_READY handshake).
  - Chatbot: Flowise web component initialized via jsdelivr CDN (`agent1-chatbot-module.js`), session persistence, custom theme/CSS, marquee-hiding logic bound to input focus.
  - Listener for chat history (`listener-module.js`) monitors Flowise shadow DOM, stores per-session history in localStorage with copy/export UX.
  - i18n: dynamic language loading with fallback to English; `languageChanged` custom event; 22 languages supported; consistency checker script.
  - UI: `home-ui.js` consolidates side-menu, popup, geolocation UX, language controls, focus-trap for a11y. Clear-history path supported.
  - Data: `home-data.js` safely pushes to server only when a user name exists and geo data present; reverse geocoding via BigDataCloud; muted buttons fetched from `muted.html`.
  - Location: `location-service.js` uses ipinfo.io; LMIC classification via ISO2 lookup.
- PWA
  - `public/service-worker.js`:
    - Cache `alanui-v3`; pre-caches core assets.
    - Network-first for navigations with offline fallback to `offline.html`.
    - Cache-first for static assets.
    - Bypass SW handling for `view-records.html` to avoid admin friction.
    - Bypass `/flowise/` requests to avoid caching/stream interference.
    - On activate, posts `SW_READY`, clients claim, old caches deleted.
- Build & Tooling
  - `scripts/build.js`: copies public → dist; injects build timestamp; rewrites relative asset URLs to root-absolute; minifies JS (terser), CSS (clean-css CLI via npx), HTML (html-minifier-terser).
  - `scripts/test-a11y.mjs`: runs axe on dist/*.html; fails CI on violations.
  - `scripts/process-images.js`: sharp-based WebP conversions and responsive variants.
  - `scripts/check-translations.cjs`: compares translation keys against en.json, flags missing/extra/placeholders.
- Security & Privacy
  - PBKDF2-SHA256(100k) matches `generate-hash.cjs` flow; master hash + one-time hashes supported.
  - CSP strict, tailored to external dependencies (Flowise, maps, geolocation, CDNs).
  - Rate limiting across API; CORS allowlist.
- Documentation
  - Memory Bank files consistent with repo state; minor enhancements identified below.

## Decisions & Considerations
- Keep environment-aware static serving as-is (public in dev, dist in prod) and the SW_READY handshake on pages that depend on SW for asset availability.
- Maintain the admin `view-records.html` SW bypass to avoid caching pitfalls on sensitive/admin workflows.
- Preserve existing front-end orchestrator + modular single-responsibility module pattern; it is clear and testable.
- CSRF: current simple token-in-memory approach is acceptable for single-process deployments; multi-process would require a shared store if enabled.

## Pending Tasks & Next Steps (Prioritized)
- Deploy the latest changes to Railway and confirm clients refresh their service worker cache (production builds stamp a unique cache name into `dist/service-worker.js`, which should force refresh).
- Configuration hygiene and consistency
  1. Consolidate CSP single source of truth. (Completed Jan 2026)
     - CSP directives are defined in `config/index.js` as `cspDirectives` and consumed by `server.js`.
  2. Client logging toggle strategy. (Completed Jan 2026)
     - `public/scripts/log.js` now reads a build-injected meta tag (`<meta name="alanui-env" content="production">`) rather than checking a hostname.
     - `scripts/build.js` injects this meta tag into `dist/*.html` during production builds.
     - Optional debug override: `localStorage.setItem('alanui:debug', '1')` re-enables info/debug logging.
  3. .gitignore coverage for database and build outputs.
     - Ensure `alan-data.db`, `test-alan-data.db`, and `dist/` are ignored to prevent accidental commits.
- Security and robustness
  4. Consider enabling CSRF in production (`ENABLE_CSRF=true`) and verify front-end includes `x-csrf-token` header for state-changing requests (already supported by `csrf.js`, skipPaths maintained for `/api/fetch-records`).
  5. Service worker cache versioning strategy. (Completed Jan 2026)
     - `scripts/build.js` now stamps a unique cache name into `dist/service-worker.js` per build.
     - This removes the need for manual `CACHE_NAME` bumps for production releases.
     - Source `public/service-worker.js` remains readable/maintainable; stamping only happens in `dist/`.
- Cleanup & dead code
  6. Remove or wire CSP duplicate config (Completed Jan 2026)
     - No duplicate CSP config remains; CSP is centralized via `cspDirectives`.
  7. `scripts/resize-favicon.js` is referenced in editor tabs but not present; either restore (if needed) or remove stale references/documentation.
  8. Validate if `API_BASE_URL`, `SENTRY_DSN`, `SENTRY_FRONTEND_DSN` are used; if not, prune to reduce environment noise.
- UX and minor consistency
  9. Ensure no duplicate/conflicting handlers for `instructions-button` (home-ui vs home-navigation). Prefer one source.
  10. Verify all buttons/controls maintain clear or translated labels/aria-labels (most do).
- Documentation & CI
  11. Update Memory Bank (this change) and keep Progress updated per changes shipped.
  12. Ensure CI runs translation and a11y checks (Completed Jan 2026)
      - `.github/workflows/ci-cd.yml` now runs `npm test` on push and pull_request to main.
      - This enforces: build → Prettier check → translations check → a11y checks → Jest.

## Important Patterns & Preferences (affirmed)
- Orchestrator pattern on each major page script delegating to small modules.
- `languageChanged` event for decoupled translation updates.
- `Flowise` embed with session management and isolated UI theme overrides.
- `listener-module` uses shadow DOM observers to capture messages for local history across sessions.
- Backend app factory enables testing and modularity.
- Database transactions for upsert/delete ensure consistency and atomicity.
- PWA SW_READY handshake to avoid race conditions on first load.

## Learnings & Project Insights
- Keeping a tight, explicit CSP is feasible even with third-party embeds and maps; two sources of truth risk drift—consolidation will improve reliability.
- Hostname-based client logging silencing works but is fragile under domain changes; an environment-derived toggle is more portable.
- The simple CSRF token model is a pragmatic fit here; enabling it in production is low-cost if front-end headers are added for state-changing endpoints.
- The service worker’s explicit bypass for the admin page is a practical pattern to avoid stale UIs on critical admin flows.

---

## Condensed Roadmap — Historical Snapshot (Created Sep 2025, Updated Jan 2026)
1) Production caching + SW versioning
- Cache-Control: public, max-age=31536000, immutable for /dist assets; HTML no-cache.
- SW cache versioning is now build-stamped in `dist/service-worker.js`.

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

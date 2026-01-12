<!-- Alan UI - techContext.md | Updated 12th January 2026, Cline -->

# Technology Stack and Tooling

This document provides a detailed overview of the technologies, dependencies, configuration, and operational constraints used in this project. Originally expanded after a full codebase review on 15 Sep 2025; most recently updated Jan 2026.

---

## Core Technologies

- Backend
  - Node.js 20.x (ESM) with Express 5.x for routing and middleware.
  - Security: Helmet 8.x for CSP and security headers; express-rate-limit 7.x.
  - Validation: express-validator 7.x for input validation and sanitization.
  - Persistence: SQLite via better-sqlite3 (synchronous and simple).
  - Compression: compression middleware for gzip responses.
  - CORS: cors with allowlist and credentials support.
  - CSRF: custom, simple token middleware (optional, env-controlled).
- Frontend
  - Vanilla HTML/CSS/JS (ES modules). No SPA framework.
  - Flowise chat via jsdelivr Flowise Embed web component.
  - Leaflet.js mapping (OSM tiles).
  - Dynamic translation via JSON files (22 languages).
  - Accessibility-first with focus-trap, skip links, ARIA labels.
- PWA
  - Service Worker with pre-cache and runtime caching.
  - Web App Manifest for installability.

---

## Network, Security, and CSP

- Helmet CSP (server.js)
  - default-src: 'self'
  - script-src: 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com
  - style-src: 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com
  - font-src: 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com
  - img-src: 'self' data: *.tile.openstreetmap.org raw.githubusercontent.com
  - connect-src: 'self' https://flowiseai-railway-production-fecf.up.railway.app https://api.bigdatacloud.net https://ipinfo.io https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com
- CSP single source of truth
  - CSP directives are defined in `config/index.js` as `cspDirectives` and consumed by `server.js` (merged into Helmet defaults).
- Additional headers: HSTS (1y, includeSubDomains), Referrer-Policy no-referrer, X-Frame-Options deny, X-Content-Type-Options nosniff.

---

## Environment Configuration

- Validation via envalid (config/validateEnv.js)
  - PORT (default 3000)
  - PASSWORD_SALT (required)
  - MASTER_PASSWORD_HASH (required)
  - ONE_TIME_PASSWORD_HASHES (comma-separated, optional)
  - CORS_ALLOWED_ORIGINS (comma-separated, default empty)
  - ENABLE_CORS ('true'|'false', default 'true')
  - ENABLE_CSRF ('true'|'false', default 'false')
  - (Removed Jan 2026) Previously documented placeholders: API_BASE_URL, SENTRY_DSN, SENTRY_FRONTEND_DSN.
- CORS
  - Allowlist is read from env; credentials enabled; null-origin allowed for apps/tools.
- CSRF
  - Simple per-process token; GET/HEAD/OPTIONS returns X-CSRF-Token header; mutating requests must send x-csrf-token unless on skipPaths; disabled by default.

---

## Persistence and Data Paths

- Database (better-sqlite3)
  - dev: <project-root>/alan-data.db
  - test: <project-root>/test-alan-data.db
  - prod: /data/alan-data.db (Railway volume; directory auto-created if missing)
- Tables initialized at module load (services/data-service.js):
  - history (sessionId PK, user and meta fields, refreshCount)
  - active_record (id=1, sessionId pointer)
- Transactions used for upsert and delete; active_record updated atomically.
- Sanitization/validation enforced at route layer (express-validator).

---

## Authentication and Secrets

- Password verification
  - PBKDF2-SHA256 with 100,000 iterations and 32-byte keylen; salt from PASSWORD_SALT.
  - MASTER_PASSWORD_HASH is compared to generatedHash; also supports one-time hashes (OTP set) that are consumed on first use.
- Hash generation
  - script: generate-hash.cjs; uses dotenv and updates .env MASTER_PASSWORD_HASH in place.
  - Usage: node generate-hash.cjs <new_password>
- Secret handling best practices
  - Prefer alphanumeric secrets (hex-64) to avoid shell parsing issues.
  - If special characters are needed, store Base64 and decode at runtime.

---

## External Integrations

- Flowise Embed (Chat)
  - CDN: jsdelivr; chatflowid is configured; apiHost points to Railway Flowise deployment.
  - Session management: sessionId persisted in localStorage; passed to Flowise for history.
- Geolocation and reverse geocoding
  - ipinfo.io for IP-derived country/city and approximate lat/long.
  - api.bigdatacloud.net reverse-geocode-client for human-readable area from lat/long.
- Mapping
  - Leaflet.js with OSM tiles at https://{s}.tile.openstreetmap.org; CSP permits this.

---

## Frontend Architecture

- Orchestrators
  - index.js: onboarding, password gate (fetch-records), language init, form validations.
  - home.js: UI wiring, translator, muted snippet, chatbot init; SW_READY handshake to avoid races.
- Modules
  - home-ui.js: side menu, popup, focus traps, geolocation UI driver, language dropdown, history clear.
  - home-translator.js: applies home page translations; uses getTranslation; updates marquee lines and buttons.
  - home-data.js: fetch muted snippet; reverse geocoding; pushes localStorage to server only when meaningful (name present and geo info available).
  - location-service.js: ipinfo lookup; LMIC classification via ISO2 code set.
  - onboarding-form.js: input masks, aims multi-select toggling, validation enabling accept button.
  - auth-flow.js: password verification flow, splash → password → instruction flow, accept button triggers record post and transition to home.
  - agent1-chatbot-module.js: Flowise initialisation and theme; mutation observer to hide marquee on first input focus; one-time guard to avoid duplicates.
  - listener-module.js: observes Flowise shadow DOM for messages; de-dup for streamed messages; persists sessions with copy/export affordances.
  - page-template.js: app bar injected; back arrow; listens to languageChanged to update titles; cross-tab support via storage event.
  - focus-trap.js: reusable accessibility utility.
  - view-records.js: protected view; password gate; active record (highlighted) and history tables; “Show Map” (Leaflet marker); delete with confirmation.
  - Various page scripts (instructions/about/weblinks/ear/eye/skin/atoms/triangle/referral) use page-template and translation helpers where applicable.

---

## PWA Architecture

- Service Worker (public/service-worker.js)
  - CACHE_NAME: source file uses a stable name for development; production builds stamp a unique cache name per build into `dist/service-worker.js`.
  - on install: caches CORE_ASSETS with logging; skipWaiting.
  - on activate: deletes non-matching caches, clients.claim, posts { type: 'SW_READY' } to all clients.
  - on fetch:
    - If navigate: network-first, fallback to cached or offline.html on error.
    - For assets: cache-first; on network failure returns 408 text response (not offline page).
    - Bypass: if request URL or referrer includes /view-records.html, do nothing to avoid SW interference on admin page.
    - Bypass: if request URL includes /flowise/, do nothing to avoid caching/stream interference.
  - Push event: demo notification for debugging/lab use.
- Install prompt handled in home.js with install button and Notification permission prompt as a secondary UX.

---

## Build and Optimisation

- scripts/build.js
  - Clears dist/, copies public → dist.
  - Injects build timestamp comment into each HTML HEAD.
  - Rewrites relative asset links to absolute (/styles, /scripts, /images, /favicons) to avoid path issues.
  - Minifies JS with terser, CSS with clean-css (CLI via npx), HTML with html-minifier-terser.
- scripts/process-images.js
  - Sharp converts images to WebP; responsive variants for heavy assets (atomsblue, Q/AP logos) including animated GIF conversion to animated WebP.
- scripts/test-a11y.mjs
  - Runs axe-core on dist/*.html; reports violations with selectors and snippets; fails with non-zero exit if issues exist.
- scripts/check-translations.cjs
  - Flattens en.json and compares with other languages for missing/extra keys and placeholder values; emits reports.

---

## Testing and QA

- Jest 30.x with ESM support (NODE_OPTIONS=--experimental-vm-modules).
- jest-environment-jsdom, jsdom for UI tests; supertest for API tests (present in devDependencies).
- UI and API tests under tests/ with helpers.
- A11y checks run against built dist output via axe-core script.
- Recommendation: Ensure CI pipeline calls build → test:a11y against dist artifacts and runs translation check.

---

## NPM Scripts (package.json)

- dev: node -r dotenv/config server.js (serves public/ in dev mode).
- build: node scripts/build.js (copy, patch, minify).
- start: npm run build && cross-env NODE_ENV=production node server.js (serves dist/).
- test: npm run build && prettier check && translations check && a11y && jest (vm-modules).
- test:ci: jest with vm-modules (when build is provided by CI step).
- format (write/check) via Prettier; lint via ESLint.

---

## Constraints and Decisions

- Performance and simplicity
  - No frontend frameworks; small ES module files; defers heavy libs until needed.
  - Images optimized to WebP; responsive variants for large assets.
- Reliability and offline
  - PWA approach optimized for low-connectivity regions; explicit offline fallback page.
- Security posture
  - Strict CSP with explicit sources; rate limiting; optional CSRF; PBKDF2-based auth; no user accounts.
- Data handling
  - Stores minimal session and user metadata in SQLite (name, aim(s), experience, location, contact, classification, agent, date/time, refresh count).
  - UI clarifies responsibilities and avoids capturing sensitive PII beyond simple meta fields.
- Logging
  - Client-side logging is environment-driven via a build-injected meta tag (`alanui-env=production`) rather than domain-gated.

---

## Operational Notes and Recommendations

- CSP single source of truth
  - CSP directives are centralized in `config/index.js` as `cspDirectives` and consumed by `server.js`.
- Client logging toggle
  - Production logging is controlled via the build-injected `alanui-env` meta tag.
  - Debug override: `localStorage.setItem('alanui:debug', '1')`.
- Git ignore hygiene
  - Ensure local DBs and dist/ are ignored.
- CSRF
  - Consider ENABLE_CSRF=true in production; add x-csrf-token header on state-changing requests (frontend call sites already centralized).
- SW cache versioning
  - Cache version is stamped into `dist/service-worker.js` at build time (no manual bump needed for production).

## Windows / PowerShell Developer Workflow (Repo Guardrails)
- Target shell: **PowerShell**.
- Avoid CMD-only syntax and PowerShell alias pitfalls:
  - `curl` is an alias for `Invoke-WebRequest` (can prompt for `Uri`). Prefer `curl.exe` or `Invoke-WebRequest -Method Head -Uri ...`.
- Repo sanity skill:
  - `.clinerules/skills/powershell-sanity-checklist/SKILL.md`
    - Quick checks for PWD, curl alias, git metadata (`.git` vs `.git_disabled`).
- If Git behaves oddly on Windows:
  - Use `.clinerules/skills/windows-git-sanity/SKILL.md`.
- If VS Code integrated terminal output capture is flaky in Cline, prefer **Background Exec** mode.

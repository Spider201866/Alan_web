# AlanUI Web Chatbot

A web-based chatbot focused on Eye, Ear, and Skin health information, designed for users in Low- and Middle-Income Countries (LMICs). The app is performance-conscious, accessible, and fully offline-capable as a Progressive Web App (PWA).

Updated: 6 Feb 2026

For deep architecture and context, see the Memory Bank:
- memory-bank/projectbrief.md
- memory-bank/productContext.md
- memory-bank/systemPatterns.md
- memory-bank/techContext.md
- memory-bank/activeContext.md
- memory-bank/progress.md

---

## Get the Code (from GitHub)

Option A — Clone with Git (Recommended)
- Using VS Code (or another terminal)
  1) Open VS Code
  2) View → Terminal (or press Ctrl+`)
  3) In the terminal, run these commands one per line:
     ```powershell
     git clone https://github.com/Spider201866/Alan_web.git
     cd Alan_web
     npm install
     npm run dev
     ```
  4) Open http://localhost:3000

- Optional (if you want to verify/copy the URL or choose SSH instead of HTTPS):  
  Open https://github.com/Spider201866/Alan_web.git → click “Code” to copy the URL you prefer.

- macOS/Linux note: Open Terminal and run the same commands (replace PowerShell with your shell). Node 20.x is still required.

Option B — Download ZIP (No Git required)
1) On the GitHub page: Code → Download ZIP  
2) Extract the ZIP (e.g., to C:\Users\YourName\Downloads\Alan_web\)  
3) Open PowerShell in that folder and run:
   ```powershell
   npm install
   npm run dev
   ```

Option C — GitHub Desktop
1) GitHub Desktop → File → Clone repository… → paste:
   https://github.com/Spider201866/Alan_web.git
2) After cloning, open a terminal at the project folder and run:
   ```powershell
   npm install
   npm run dev
   ```

Notes (Windows PowerShell)
- Run commands one per line (avoid chaining with &&).
- Ensure Node.js 20.x is installed (see “Environment Configuration” below).

---

## Quick Start

Prerequisites
- Node.js 20.x (see .nvmrc)
- npm (bundled with Node)

Install and run (development)
```powershell
npm install
npm run dev
```
App runs at http://localhost:3000 and serves raw files from public/.

Windows restart tip (dev)
If you don’t see changes due to caching, restart Node:
```powershell
taskkill /F /IM node.exe
npm run dev
```

Build (production)
```powershell
npm run build
```
Outputs to dist/ (copied and minified from public/).

Start (production)
```powershell
npm start
```
Serves built files from dist/ with NODE_ENV=production.

---

## NPM Scripts

- dev: Start development server (serves public/)
- build: Copy and optimize into dist/ (JS/CSS/HTML minified; asset URLs normalized; build timestamp injected)
- start: Build then start production server (serves dist/)
- sync:release-metadata: Refresh `public/sitemap.xml` `lastmod` values and regenerate `folderList.txt`
- check:docs: Validate key docs remain synchronized (`README.md`, memory-bank headers, `tests/README.md`, `AGENTS.md`, `folderList.txt`) and fail on encoding-corrupted source text (e.g., replacement-character mojibake)
- test: Full suite
  - build
  - format:check (Prettier)
  - check:docs (docs drift guard)
  - check-translations (translation coverage)
  - test:a11y (axe-core on dist/*.html)
  - jest (API/UI tests)
- test:ci: Jest only (assumes dist already built)
- format / format:check: Prettier write/check
- lint: ESLint check

---

## Environment Configuration

Validated via envalid (config/validateEnv.js):

Required
- PASSWORD_SALT: Salt for PBKDF2 hashing
- MASTER_PASSWORD_HASH: Hash to validate admin password (generate via script below)

Optional
- PORT (default 3000)
- ONE_TIME_PASSWORD_HASHES: Comma-separated list of OTP hashes (consumed once)
- CORS_ALLOWED_ORIGINS: Comma-separated list of allowed origins
- ADMIN_ALLOWED_IPS: Comma-separated list of allowed admin IPs (restricts /view-records.html and admin APIs when set)
- ENABLE_CORS (default 'true')
- ENABLE_CSRF (default 'false')
- (Removed Jan 2026) Previously documented placeholders: API_BASE_URL, SENTRY_DSN, SENTRY_FRONTEND_DSN.

Secrets best practices
- Prefer alphanumeric secrets (e.g., crypto.randomBytes(32).toString('hex')) to avoid quoting/parsing issues across environments.
- If special characters are needed, store Base64-encoded and decode at runtime.

Generate/update password hash
```powershell
node generate-hash.cjs <password>
```
- Uses PASSWORD_SALT from .env
- Updates MASTER_PASSWORD_HASH in .env

---

## Architecture Overview

Backend (Node/Express)
- App factory: server.js exports createApp(config)
- Static serving:
  - Development: public/
  - Production: dist/ (after npm run build)
- Flowise proxy:
  - The server mounts a same-origin proxy at `/flowise` which forwards to the Railway Flowise deployment.
  - This avoids browser CORS issues. Frontend Flowise embed should use `apiHost: '/flowise'`.
- Security:
  - Helmet CSP + security headers (HSTS, Referrer-Policy no-referrer, Frameguard deny, noSniff)
  - express-rate-limit (general 100/15m; sensitive 10/15m)
  - CORS with allowlist, credentials true
  - CSRF (optional): simple per-process token; GET/HEAD/OPTIONS return X-CSRF-Token; mutating requests require x-csrf-token (skipPaths supported)
  - Optional admin IP allowlist for /view-records.html and admin APIs (ADMIN_ALLOWED_IPS)
- API routes (routes/api.js):
  - POST /api/record-info (validated, public) – upserts record and sets active
  - POST /api/fetch-records (protected) – returns active record as array
  - POST /api/fetch-history (protected) – returns full history
  - DELETE /api/delete-record (protected) – deletes by sessionId, clears active pointer if needed
- Persistence: better-sqlite3
  - DB paths:
    - dev: <project-root>/alan-data.db
    - test: <project-root>/test-alan-data.db
    - prod: /data/alan-data.db (Railway volume)
  - Schema:
    - history(sessionId PK, user/meta fields, dateTime, dateTimeEpoch, refreshCount)
    - active_record(id=1, sessionId)

Frontend (Vanilla JS ES modules)
- Orchestrators:
  - public/scripts/index.js – onboarding, password gate, language init
  - public/scripts/home.js – UI setup, translator, muted snippet, chatbot init; waits for SW_READY
- Modules:
  - UI: home-ui.js (side menu, popup with focus trap, geolocation UI, language dropdown)
  - Data: home-data.js (push localStorage to server when meaningful; reverse geocoding via BigDataCloud)
  - Record info: record-info.js (builds/posts /api/record-info payloads)
  - Location: location-service.js (ipinfo.io; LMIC classification)
  - Onboarding: onboarding-form.js (input masks, validation), auth-flow.js (password verify, transitions)
  - Chatbot: agent1-chatbot-module.js (Flowise embed via jsdelivr; sessionId; theme overrides)
  - Chat history: listener-module.js (observes Flowise shadow DOM; dedupes streaming updates; localStorage sessions; copy support)
  - i18n: language.js + language-loader.js (dynamic JSON; 22 languages; languageChanged event)
  - Page template: page-template.js (app bar + back arrow; title translation updates)
  - Feature pages: instructions/aboutalan/weblinks/ear/eye/skin/atoms/triangle/referral with dedicated scripts
  - Records view: view-records.js (password gate, active record highlight, history table, Leaflet map, delete)

PWA (Service Worker)
- public/service-worker.js:
  - Pre-caches core assets; network-first for HTML navigations (offline fallback offline.html); cache-first for static assets
  - Bypasses /view-records.html to avoid admin caching issues
  - On activate: cleans old caches, clients.claim(), posts { type: 'SW_READY' } to clients
- Install prompt: handled in home.js (with Notification permission prompt on user gesture)

Build and Optimization
- scripts/build.js:
  - Copies public/ → dist/
  - Injects build timestamp comment into HTML
  - Rewrites relative asset paths to absolute (/styles, /scripts, /images, /favicons)
  - Minifies JS (terser), CSS (clean-css CLI), HTML (html-minifier-terser)
- scripts/process-images.js:
  - Sharp conversions to WebP, responsive variants for heavy assets; GIF → animated WebP supported

External services/CDNs
- Flowise (chat) via jsdelivr (apiHost points to Railway Flowise deployment)
- Flowise API calls are proxied through the app at `/flowise` (recommended) to avoid CORS.
- ipinfo.io (IP-derived location)
- api.bigdatacloud.net (reverse geocoding)
- Leaflet.js with OSM tiles (https://{s}.tile.openstreetmap.org)
- Google Fonts, jsdelivr/cdnjs/unpkg (CSP whitelisted)

CSP notes
- CSP is enforced by Helmet in `server.js`.
- **Single source of truth**: the directives live in `config/index.js` as `cspDirectives` and are merged into Helmet’s defaults in `server.js`.

---

## Data Model (Summary)

history
- sessionId (PK)
- name, role, experience, contactInfo
- latitude, longitude, country, iso2, classification, area
- version, selectedAgent, dateTime (ISO 8601 UTC), dateTimeEpoch (epoch ms for ordering)
- refreshCount (defaults 1; incremented on update)

active_record
- id (always 1)
- sessionId

Client-side (localStorage)
- sessionId, name, selectedJobRole, selectedExperience, contactInfo
- latitude, longitude, area, country, iso2, classification
- verified (for index flow), language preference
- Chat history (alan-chat-history-v2)

---

## Security and Privacy

- Password auth via PBKDF2-SHA256(100k, 32 bytes) with env salt; hashes generated using generate-hash.cjs
- Optional one-time passwords (hashed) supported; consumed on first valid use
- Rate limiting on all endpoints; stricter for sensitive endpoints
- Strict CSP with explicit sources (Flowise, OSM tiles, ipinfo, BigDataCloud, CDNs, Google Fonts)
- CORS allowlist
- CSRF (optional) – enable with ENABLE_CSRF=true and add x-csrf-token to mutating requests

Recent hardening (Jan 2026)
- Trusted HTML helper for app-controlled markup: `public/scripts/trusted-html.js` (basic sanitization + safer external links)
- Additional security headers: Permissions-Policy, CORP/COOP/Origin-Agent-Cluster, etc.
- Admin session cookie hardened (shorter TTL; production cookie uses `__Host-` prefix)

PII and scope
- Minimal metadata is captured (name, aims/role, experience, contact, approximate location info) to aid UX and aggregated insights
- No user accounts or detailed clinical records are stored; the app is not a medical record system

---

## Testing & QA

Run tests
```powershell
npm test
```
What runs:
- Build (ensures dist/ exists for a11y tests)
- Prettier format check
- Translation coverage check (scripts/check-translations.cjs)
- Accessibility tests against dist/*.html (scripts/test-a11y.mjs with axe-core)
- Jest tests (API/UI) with JSDOM and supertest

Recent test maintenance (Jan 2026)
- `scripts/test-a11y.mjs` stubs canvas context to avoid noisy warnings.
- Added `tests/api/security-headers.test.js` to prevent security header regressions.
- `tests/api/build.test.js` now checks for expected output files rather than brittle size comparisons.

Recent regression guards (Feb 2026)
- Added `tests/ui/layout-regressions.test.js` to lock home top-gap guardrails and instructions mobile 3-button single-row behavior.
- Added `tests/ui/copy-regressions.test.js` to enforce `uvLightHeading` = `Wood's lamp` across all locales and prevent regressions in the instructions intro spelling.
- Pre-push is gated by `.husky/pre-push` running `npm test`.

CI/CD (overview)
- On push to main: install, test, build, deploy (Railway)
- GitHub Actions runs the full quality gate via `npm test` (build + Prettier + translations + a11y + jest).

---

## Operational Notes

- Logging: `public/scripts/log.js` silences info/debug in production **based on a build-injected meta tag** (`<meta name="alanui-env" content="production">`).
  - Debug override: `localStorage.setItem('alanui:debug', '1')` re-enables info/debug.
- Service Worker: production builds stamp a unique `CACHE_NAME` into `dist/service-worker.js` per build (no manual version bump needed).
- CSP: keep CSP directives centralized in `config/index.js` (`cspDirectives`).
- Admin/records: SW bypass for /view-records.html is intentional to keep data fresh.

Repo hygiene
- One-off debug pages and vendored copies of third-party libraries are intentionally not kept in the repo. The app loads those libraries from CDNs where needed.

---

## Troubleshooting

- I changed something but don’t see it locally:
  - Restart Node (Windows): `taskkill /F /IM node.exe` then `npm run dev`
  - Clear browser cache or unregister SW from DevTools (Application → Service Workers)
- CSP blocked something:
  - Check server.js Helmet CSP directives; confirm needed domains are whitelisted (scripts/styles/fonts/connect/img)
- Admin page shows stale data:
  - Ensure you’re on /view-records.html (SW bypasses it); if still stale, hard refresh (Ctrl+F5)

---

## Contributing

- Follow existing patterns:
  - Keep frontend modules small and single-responsibility
  - Orchestrate per-page initialization from a single entry module
  - Use the languageChanged event for translation updates
  - Avoid inline scripts to remain CSP-compliant
- Write JSDoc for logical modules and functions
- Run tests and checks before pushing:
  ```powershell
  npm run build
  npm test
  ```

---

## License

MIT

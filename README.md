# AlanUI Web Chatbot

A web-based chatbot focused on Eye, Ear, and Skin health information, designed for users in Low- and Middle-Income Countries (LMICs). The app is performance-conscious, accessible, and fully offline-capable as a Progressive Web App (PWA).

Updated: 15 Sep 2025

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
- test: Full suite
  - build
  - format:check (Prettier)
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
- ENABLE_CORS (default 'true')
- ENABLE_CSRF (default 'false')
- API_BASE_URL, SENTRY_DSN, SENTRY_FRONTEND_DSN (reserved; currently unused)

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
- Security:
  - Helmet CSP + security headers (HSTS, Referrer-Policy no-referrer, Frameguard deny, noSniff)
  - express-rate-limit (general 100/15m; sensitive 10/15m)
  - CORS with allowlist, credentials true
  - CSRF (optional): simple per-process token; GET/HEAD/OPTIONS return X-CSRF-Token; mutating requests require x-csrf-token (skipPaths supported)
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
    - history(sessionId PK, user/meta fields, refreshCount)
    - active_record(id=1, sessionId)

Frontend (Vanilla JS ES modules)
- Orchestrators:
  - public/scripts/index.js – onboarding, password gate, language init
  - public/scripts/home.js – UI setup, translator, muted snippet, chatbot init; waits for SW_READY
- Modules:
  - UI: home-ui.js (side menu, popup with focus trap, geolocation UI, language dropdown)
  - Data: home-data.js (push localStorage to server when meaningful; reverse geocoding via BigDataCloud)
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
- ipinfo.io (IP-derived location)
- api.bigdatacloud.net (reverse geocoding)
- Leaflet.js with OSM tiles (https://{s}.tile.openstreetmap.org)
- Google Fonts, jsdelivr/cdnjs/unpkg (CSP whitelisted)

CSP notes
- CSP is enforced by Helmet with an explicit allowlist (server.js).
- A similar CSP definition exists in config/index.js (cspOptions) for centralization; ensure only a single source of truth is used to avoid drift.

---

## Data Model (Summary)

history
- sessionId (PK)
- name, role, experience, contactInfo
- latitude, longitude, country, iso2, classification, area
- version, selectedAgent, dateTime
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

CI/CD (overview)
- On push to main: install, test, build, deploy (Railway)
- Ensure your CI calls translation and a11y checks (dist-based) along with unit/integration tests

---

## Operational Notes

- Logging: public/scripts/log.js silences info/debug in production when hosted on alan.up.railway.app. Consider moving to an env-driven toggle if domains change.
- Service Worker: increment CACHE_NAME (in public/service-worker.js) per release or adopt a build-stamped versioning strategy to avoid stale caches.
- CSP: maintain a single authoritative definition to avoid drift.
- Admin/records: SW bypass for /view-records.html is intentional to keep data fresh.

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

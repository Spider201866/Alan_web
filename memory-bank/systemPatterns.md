<!-- Alan UI - systemPatterns.md | Updated 18th January 2026, Cline -->

# System Architecture and Patterns

This document outlines the high-level architecture and key design patterns used in the project. The content has been augmented following a full codebase review on 15 Sep 2025 to capture additional confirmed patterns and guardrails.

---

## High-Level Architecture

The application is a traditional Node.js/Express server that serves a static frontend. For production a build step is introduced to optimise assets.

```mermaid
graph TD
    subgraph "Development (Local)"
        A[Developer] -- Works on --> B(public/);
        B -- Served by --> C{Dev Server (npm run dev)};
    end

    subgraph "CI/CD Pipeline (GitHub Actions)"
        D[Push to main] --> E{npm test};
        E -- On success --> F{npm run build};
        F -- Creates --> G[dist/];
    end

    subgraph "Production (Railway)"
        H[User] -- Requests --> I{Prod Server (npm start)};
        I -- Serves files from --> G;
    end

    style "Development (Local)" fill:#cde,stroke:#333,stroke-width:2px
    style "CI/CD Pipeline (GitHub Actions)" fill:#f9f,stroke:#333,stroke-width:2px
    style "Production (Railway)" fill:#cfc,stroke:#333,stroke-width:2px
```

---

## Key Design Patterns

-   **Build/Deployment Pattern**: Source code lives in `public/` and the `npm run build` script generates an optimised version in `dist/`. The CI/CD pipeline automates this process for production deployments.

-   **App Factory Pattern (Backend)**: `server.js` exports a `createApp(config)` function. This allows for the creation of configurable Express app instances which is essential for creating isolated environments for testing.

-   **Modular Backend**: The backend code is organised into distinct modules with clear responsibilities:
    -   `config/`: For application configuration.
    -   `routes/`: For API and web route definitions.
    -   `middleware/`: For request-handling logic (e.g. auth validation).
    -   `services/`: For business logic and database interaction.

-   **Frontend Orchestrator Pattern**: Main page scripts (`index.js`, `home.js`) act as orchestrators. They import and initialise specialised single-responsibility modules for tasks like UI management, data fetching, PWA concerns, and translation.

-   **Shared Frontend Content Modules**
    -   Repeated UI content should be centralized into shared modules/partials where possible:
        -   language options registry (`public/scripts/language-options.js`)
        -   exam page translation initializer (`public/scripts/exam-page-init.js`)
        -   reusable muted buttons partial (`public/partials/muted-buttons.html`) mounted via `public/scripts/muted.js`

-   **Shared Backend Helpers (Security/Consistency)**
    -   Use small shared helpers for repetitive security concerns rather than duplicating per route:
        -   `middleware/admin-no-store.js` centralises admin “no-store/no-cache/noindex” headers.
        -   `utils/cookies.js` centralises cookie parsing (`parseCookies`) with safe decoding.

-   **Event-Driven Frontend**: Custom DOM events (e.g. `languageChanged`) are used for decoupled communication between frontend modules.

-   **Conditional Logging**: A custom logging module (`public/scripts/log.js`) wraps `console` methods to provide environment-aware logging (e.g. silencing debug messages in production). See “Client Logging Strategy” below.

-   **Trusted HTML Insertion (Frontend)**
    - Use `public/scripts/trusted-html.js` (`setTrustedHtml`) when the app must render *app-controlled* markup (e.g. translations containing `<strong>`, `<br>`, links).
    - Prefer `textContent` for user-provided data and plain strings.
    - The trusted HTML helper applies basic sanitization (removes scripts, inline events, and javascript: URLs) and adds `rel="noopener noreferrer"` to `<a target="_blank">`.

-   **UI Table Consistency**: All table cell content in the "View Records" page is centred both vertically and horizontally for readability. The delete (trash can) icon is always red to clearly indicate destructive actions.
-   **Comprehensive Documentation**: All logical JavaScript files are documented with JSDoc comments for functions and file-level overviews to explain the purpose of each module.

-   **Secure Secret Handling**: To prevent environment-specific parsing issues with special characters, secrets are either alphanumeric or Base64-encoded when necessary. PBKDF2 details below.

-   **Authentication & Hashing**:
    -   Hashing Algorithm: `pbkdf2Sync` with 100,000 iterations and a SHA256 digest as defined in `middleware/auth.js`.
    -   Hash Generation: The stored `MASTER_PASSWORD_HASH` in `.env` must be generated using the exact same algorithm. The `generate-hash.cjs` script is provided for this purpose.
    -   Updating the Password:
        ```bash
        node generate-hash.cjs <new_password>
        ```
        This script uses `PASSWORD_SALT` from `.env` and updates `MASTER_PASSWORD_HASH` accordingly.

-   **PWA Implementation**: The application functions as a Progressive Web App enabled by a service worker (`public/service-worker.js`).
    -   Caching Strategy: Network-first for HTML navigations; cache-first for static assets.
    -   Offline Fallback: `offline.html` with “Retry” and “Go Back”.
    -   Cache Management: Versioned by `CACHE_NAME` (e.g. `alanui-v3`) and cleans older caches on activate.
    -   Reliable Initialisation: Page scripts can wait for a `SW_READY` message from the service worker before initialising to avoid races.

-   **SW_READY Helper (Frontend)**
    -   Prefer `public/scripts/sw-ready.js` (`whenSwReady`) for gating initialisation on SW readiness.
    -   Includes a small timeout fallback (defaults ~800ms) so initialisation proceeds even if SW messaging is delayed/unsupported.

-   **Performance Patterns**:
    -   Image Optimisation: Prefer WebP; responsive variants for heavy assets via `sharp`.
    -   On-Demand Script Loading: Heavy libs (e.g. `html2canvas`) are dynamically loaded only when needed.
    -   Singleton Initialisation: Modules that should only initialise once (e.g. chatbot) guard against re-entry (e.g. `isChatbotInitialized`).

---

## Additional Confirmed Patterns & Guardrails (Sep 2025)

-   **CSP Configuration (Single Source of Truth)**
    -   CSP directives are defined in `config/index.js` as `cspDirectives` and consumed by `server.js` (merged into Helmet defaults). This is the single source of truth.

-   **Service Worker Bypass for Admin**
    -   The SW `fetch` handler bypasses `view-records.html` and its assets to avoid caching-induced admin issues. This is a deliberate pattern to keep admin experience fresh and reliable.

-   **Service Worker Bypass for API Responses**
    -   The SW `fetch` handler bypasses `/api/*` entirely to avoid caching sensitive/session-bound responses and to prevent stale API behavior.

-   **SW_READY Handshake**
    -   Pages that depend on SW-managed asset availability listen for `SW_READY` from the service worker before initialising critical flows. This reduces first-load race conditions.

-   **Client Logging Strategy**
    -   `log.js` now silences `info`/`debug` based on a build-injected meta tag (`<meta name="alanui-env" content="production">`) rather than a hostname.

-   **Database Path Strategy**
    -   DB location varies by environment:
        -   dev: `<project-root>/alan-data.db`
        -   test: `<project-root>/test-alan-data.db`
        -   prod: `/data/alan-data.db` (Railway volume); ensures `/data` exists.
      This is simple and predictable. Ensure `.gitignore` excludes dev/test DBs.
    -   History records store `dateTime` (display string) alongside `dateTimeEpoch` (epoch ms) so ordering uses SQLite `ORDER BY dateTimeEpoch` reliably.

-   **API Rate Limiting**
    -   `generalLimiter`: 100/15m.
    -   `sensitiveLimiter`: 10/15m for protected routes like authentication and record retrieval/deletion.

-   **CSRF (Optional)**
    -   Simple per-process token model. Enabled via env (`ENABLE_CSRF=true`) and uses a **double-submit cookie**:
        - `csrf_token` cookie is set on safe requests (GET/HEAD/OPTIONS), along with an `X-CSRF-Token` response header.
        - Mutating requests must include `x-csrf-token` header matching the `csrf_token` cookie value.
    -   Supports `skipPaths` and/or `includePathPrefixes`.
    -   **Current enforcement pattern**:
        - Global CSRF middleware is enabled/disabled at app level and can skip specific endpoints.
        - `/api/record-info` is skipped globally and applies CSRF **per-route** (after validation) to ensure validation errors are returned as `400` even when CSRF is missing/invalid.
        - Admin CSRF token can be fetched via `GET /api/admin/csrf` (requires valid admin session cookie).
    -   Suitable for single-process deployments.

-   **Flowise Reverse Proxy Pattern**
    -   The app proxies Flowise under `/flowise` to avoid browser CORS issues.
    -   Proxy is mounted **before** JSON body parsing and CSRF middleware.
    -   Proxy hardening guardrails:
        - Reject absolute and protocol-relative upstream targets.
        - Strip sensitive headers (cookie/authorization/origin).
        - Abort upstream only when the client truly disconnects.
        - Preserve streaming responses (text/event-stream).

-   **Build Pipeline Behavioral Patterns**
    -   Build timestamp is injected into each HTML head as a comment for release tracing.
    -   Relative asset links are rewritten to root-absolute to avoid pathing issues.
    -   Minification: JS via `terser`, CSS via `clean-css` CLI, HTML via `html-minifier-terser`.

-   **Translations Consistency**
    -   `scripts/check-translations.cjs` flattens JSON, reports missing/extra keys and placeholder values across languages vs `en.json`. Intended for CI to keep i18n robust.

-   **Observer-based Chat History Capture**
    -   `listener-module.js` attaches observers to the Flowise shadow DOM for both host and guest messages, dedupes streaming updates, and persists sessions (incrementing `sessionCounter` per page load/reset).

---

## Critical Workflows

-   **Development**: A developer runs `npm run dev` to start a local server that serves the raw un-optimised files from the `public` directory for easy debugging.

-   **Server Restart Procedure (Development)**: Due to caching issues the Node.js server may need to be forcefully restarted to see changes.
    1.  Kill all running Node.js processes: `taskkill /F /IM node.exe`
    2.  Restart the development server: `npm run dev`

-   **PowerShell-first workflow (Windows)**
    - The repo assumes PowerShell usage; avoid CMD-only syntax.
    - If commands behave oddly, run the repo sanity skill:
      - `.clinerules/skills/powershell-sanity-checklist/SKILL.md`
    - If Git reports “not a git repository”, follow:
      - `.clinerules/skills/windows-git-sanity/SKILL.md`
    - Repo gotcha: `.git` can be temporarily renamed to `.git_disabled` which will break Git until restored.

-   **Production Deployment**:
    1.  A push to the `main` branch triggers the GitHub Actions workflow.
    2.  The workflow installs dependencies (`npm ci`) runs tests (`npm test`) and creates a production build (`npm run build`).
    3.  Railway detects the successful CI run and deploys the application.
    4.  The Railway server uses `npm start` to run the Node.js server which is configured to serve the optimised static files from the `dist` directory.

---

## Risks and Mitigations

-   **Configuration Drift (CSP)**
    -   Risk: CSP can drift if updated ad-hoc in multiple places. Mitigation: keep `cspDirectives` in `config/index.js` as the single source of truth.

-   **Domain-Coupled Logging**
    -   Risk: Production logging silencing tied to specific hostname. Mitigation: Use environment-driven toggle.

-   **Service Worker Cache Versioning**
    -   Risk: Stale assets if `CACHE_NAME` doesn’t change. Mitigation: `scripts/build.js` stamps a unique `CACHE_NAME` into `dist/service-worker.js` per build.

-   **Build Script Output Noise**
    -   Risk: CI logs become noisy and failures are harder to diagnose. Mitigation: gate verbose build output behind `BUILD_DEBUG=true`.

-   **Scaling CSRF**
    -   Risk: Simple CSRF token isn’t multi-process aware. Mitigation: Keep disabled or move to shared store if scaling.

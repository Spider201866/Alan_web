<!-- Alan UI - activeContext.md | 20th June 2025, WJW -->

# Active Context

## Current Work Focus
The CI/CD pipeline has been set up and documented. The next step is to ensure all memory bank files are updated to reflect this change.

## Recent Changes
- **CI/CD Pipeline Setup (June 21, 2025):**
    *   Created a GitHub Actions workflow at `.github/workflows/ci-cd.yml`.
    *   The pipeline automatically runs tests on every push to the `main` branch.
    *   If tests pass, it deploys the application to the `mucho-spoon` service on Railway.
    *   Updated `README.md` with a "Contributing" section, a troubleshooting guide for Railway deployment, and documentation for the new CI/CD pipeline.
    *   Fixed a minor ESLint error in `tests/ui.test.js`.
- **Test Server Lifecycle Management & EBUSY Solution (June 20, 2025):**
    *   The test suite now uses a centralized server management pattern for all API, Rate Limiting, and 404 tests, with a single server instance shared across these suites.
    *   The OTP logic tests use a separate, isolated server instance to ensure a clean environment for sensitive tests.
    *   All server instances are gracefully shut down in their respective `afterAll` hooks, and the global `afterAll` reliably closes the database connection and deletes the test database file.
    *   This approach eliminates the EBUSY error and ensures robust test isolation and cleanup.
    *   All tests (API, UI, and chatbot) are now passing.
- **API Test Refactor for SQLite Backend (June 20, 2025):**
    *   Refactored `tests/api.test.js` to work with the new SQLite database via `services/data-service.js`.
    *   Updated test setup, teardown (including global `afterAll` for DB connection closing and file deletion), and assertions to use database operations instead of file system checks.
    *   All API tests (14 tests) are passing with the new backend.
    *   The full test suite (`npm test`), including UI and chatbot tests (total 47 tests), also passes.
    *   A minor `EBUSY` error during test database file deletion in the global `afterAll` hook of `tests/api.test.js` is noted but does not affect test correctness.
- **Persistent Data Storage with SQLite (June 20, 2025):**
    *   Migrated backend data storage from JSON files (`user-info.json`, `user-history.json`) to an SQLite database using the `better-sqlite3` library.
    *   Created `services/data-service.js` to handle all database interactions (initialization, CRUD operations).
    *   Updated `routes/api.js` to use `data-service.js` for `/record-info`, `/fetch-records`, and `/fetch-history` endpoints.
    *   Added `better-sqlite3` to `package.json` dependencies.
    *   Updated `.gitignore` to exclude `*.db` and `*.db-journal` files.
    *   Removed old `services/records.js` and JSON data files (`user-info.json`, `user-history.json`).
    *   Modified `services/data-service.js` to attempt creation of the `/data` directory in production environments (for Railway volume compatibility).
    *   Updated CSP in `config/index.js` to allow necessary resources for Leaflet maps (scripts, styles from `unpkg.com`; map tiles from `*.tile.openstreetmap.org`; marker icons from `unpkg.com` and `raw.githubusercontent.com`).
    *   Refactored `public/view-records.html` to use JavaScript event listeners for "Show Map" buttons, resolving CSP `script-src-attr` issues.
    *   Corrected JavaScript error in `public/view-records.html` related to Leaflet library (`L`) not being defined at the time of custom icon creation by moving icon definition into `DOMContentLoaded`.
    *   Modified `public/view-records.html` to use a custom red marker icon for map pins.
- **Conditional Logging Implementation (June 20, 2025):**
    *   Created `public/scripts/log.js`, a new module providing conditional logging (`log.info`, `log.debug`, `log.warn`, `log.error`). `log.info` and `log.debug` are silenced in production (when `window.location.hostname === 'alan.up.railway.app'`), while `log.warn` and `log.error` remain active.
    *   Integrated `log.js` into `public/index.html` and `public/home.html` by adding `<script type="module" src="scripts/log.js" defer></script>` before other custom scripts.
    *   Refactored all relevant client-side JavaScript files in `public/scripts/` to import and use the new `log.*` methods instead of direct `console.*` calls. This includes: `agent1-chatbot-module.js`, `auth-flow.js`, `home-data.js`, `home-translator.js`, `home-ui.js`, `home.js`, `index.js`, `language-loader.js`, `language.js`, `listener-module.js`, `location-service.js`, `muted.js`, `onboarding-form.js`, and `page-template.js`.
    *   Corrected an issue where `public/scripts/muted.js` was not loaded as a module, causing an import error. Added `type="module"` to its script tag in `public/home.html`.
    *   Fixed the initialization of "muted buttons" by exporting `initMutedButtons` from `muted.js` and importing/calling it directly in `home-data.js`, as module functions are not global.
- **Frontend Orchestrator Refactor (June 20, 2025):**
    *   Refactored `public/scripts/home.js` and `public/scripts/index.js` into orchestrator patterns.
    *   **For `home.js`:**
        *   Created `public/scripts/home-ui.js` for UI management, interactions, and popups.
        *   Created `public/scripts/home-data.js` for data fetching and server communication.
        *   Created `public/scripts/home-translator.js` for language and text updates.
        *   `home.js` now imports and initializes these modules, orchestrating their interactions.
    *   **For `index.js`:**
        *   Created `public/scripts/location-service.js` for IP-based location and classification.
        *   Created `public/scripts/auth-flow.js` for managing splash screen, password verification, and final "Accept" flow.
        *   Created `public/scripts/onboarding-form.js` for interactive state and validation of the onboarding form.
        *   `index.js` now imports and initializes these modules, orchestrating their interactions and managing page-specific language controls.
    *   This modularization improves code organization, separation of concerns, and maintainability for the main frontend scripts.
- **API Endpoint Clarification (June 20, 2025):**
    *   Client-side scripts (`home-data.js`, `auth-flow.js`) updated to use local API endpoints (`/api/record-info`, `/api/fetch-records`) instead of a previously hardcoded external URL (`https://alan.up.railway.app/record-info`) which was found to be unavailable. This aligns with the project's self-contained backend for these functions.
- **Server Refactor (June 20, 2025):**
    *   Refactored the monolithic `server.cjs` into a modular structure using ES Modules.
    *   Created new directories: `config/`, `routes/`, `middleware/`, and `services/`.
    *   New main server entry point is `server.js`.
    *   Relevant logic moved into:
        *   `config/index.js` (environment variables, paths, CSP options)
        *   `routes/api.js` (API routes)
        *   `routes/web.js` (frontend page routes)
        *   `middleware/auth.js` (authentication logic)
        *   `middleware/validation.js` (request validation logic)
        *   `middleware/error.js` (error handling and 404 middleware)
        *   `services/records.js` (file I/O helpers for JSON data - now deleted)
    *   Updated `package.json` start script from `node server.cjs` to `node server.js`.
    *   Deleted the old `server.cjs` file.
- **Translation Consistency Verified (June 20, 2025):**
    *   The `scripts/check-translations.cjs` script was created and executed.
    *   The script confirmed that all language files (`public/translations/*.json`) have no missing keys, no extra keys, and no placeholder values when compared against `en.json`. This verifies the completion of the translation task.
    *   The `test` script in `package.json` was updated to include `npm run check-translations`, ensuring translation consistency is checked automatically with `npm test`.
- **Script Loading Optimization (June 20, 2025):**
    - Reviewed all HTML files in `public/` to ensure external JavaScripts consistently use the `defer` attribute to avoid render-blocking.
- **Meta Description Verification (June 20, 2025):**
    - Verified that all main HTML pages have appropriate `<meta name="description">` tags.
- **HTML Accessibility & Cleanup (June 20, 2025):**
    - Minor cleanups and style centralizations.
- **Build/Lint Process Fixes (June 20, 2025):**
    - Migrated ESLint configuration to `eslint.config.js`.
    - Addressed various linting issues and ensured `npm test` (including format and lint checks) passes.
- **CSS Centralization and Refinements (June 20, 2025):**
    - Consolidated styles into `public/styles/styles.css`.
- **Dynamic Language Loading System Implementation (June 20, 2025):**
    - Implemented on-demand loading of language JSON files.
- **Header/Appbar Height Consistency (June 20, 2025):**
    - Ensured visual consistency of headers.
- **CSP Troubleshooting & Resolution (June 19, 2025):**
    - Resolved various CSP issues.

## Next Steps (New Tasks for "Tomorrow")
1.  **Update Memory Bank:**
    *   **Goal**: Ensure all memory bank files (`progress.md`, `systemPatterns.md`, `techContext.md`) are updated to reflect the new CI/CD pipeline.
2.  **Implement PWA Service Worker for Install Prompt:**
    *   **Goal**: Enable PWA features, primarily allowing users to "install" the web app on desktop and mobile.
    *   **Details**:
        *   Create/correct `public/service-worker.js`.
        *   Implement basic caching strategies.
        *   Ensure the service worker correctly handles `fetch` events.
        *   Register the service worker.
        *   Verify `public/favicons/manifest.json` is PWA-ready.
    *   **Considerations**: Test install prompt; ensure offline capabilities.
3.  **Refine API Test Cleanup (Future Consideration):**
    *   Investigate and resolve the `EBUSY` error during the deletion of `test-alan-data.db` in the global `afterAll` hook of `tests/api.test.js`. This likely involves ensuring all `supertest` server instances are properly closed.
4.  **Explore Component-Based Architecture (Future Consideration):**
    *   **Goal**: Improve modularity, reusability, and maintainability of frontend code.
    *   **Options to Consider**: Native Web Components or a lightweight framework like Svelte.

## Active Decisions and Considerations
- The migration to SQLite is a significant improvement for data persistence and Railway deployment.
- CSP has been updated to support Leaflet maps fully.
- Event handling in `public/view-records.html` now uses `addEventListener` for map buttons.
- The `NODE_ENV=production` variable is critical for correct database pathing on Railway.

## Important Patterns and Preferences
- (Existing patterns remain relevant)
- **SQLite Integration**: Data is managed via `services/data-service.js` using `better-sqlite3`. Test environment uses `test-alan-data.db`. Production (Railway) uses `/data/alan-data.db`.
- **API Test Structure**: API tests in `tests/api.test.js` use a shared `testDb` instance for setup and assertions, with table clearing in `beforeEach` for isolation and a global `afterAll` for final DB connection closing and file cleanup.

## Learnings and Project Insights
- (Existing learnings remain relevant)
- **Database Test Cleanup**: Ensuring database connections used by test suites (especially when multiple `supertest` app instances are created) are properly closed before attempting to delete database files is crucial to avoid `EBUSY` errors. A global `afterAll` hook for the entire test file is a good place for final cleanup.
- **`write_to_file` as Fallback**: When `replace_in_file` proves difficult for complex, multi-part changes in large files, `write_to_file` with the complete intended content is a reliable alternative, though it requires careful construction of the full file content.

<!-- Alan UI - progress.md | 19th June 2025, WJW -->

# Progress

## What Works
- **CI/CD Pipeline (June 21, 2025):**
    - A GitHub Actions workflow is configured at `.github/workflows/ci-cd.yml`.
    - The pipeline automatically runs `npm test` on every push to the `main` branch.
    - On successful test completion, it deploys the application to Railway.
    - Documentation for contributing and the CI/CD pipeline has been added to `README.md`.
- **Server Refactor (June 20, 2025):**
    - The server has been successfully refactored from a monolithic `server.cjs` into a modular ES Module structure.
    - The new main entry point is `server.js`.
    - Configuration is centralized in `config/index.js`.
    - Routes are split into `routes/api.js` and `routes/web.js`.
    - Middleware functions are organized in `middleware/auth.js`, `middleware/validation.js`, and `middleware/error.js`.
    - Data service functions for SQLite interaction are in `services/data-service.js` (using `better-sqlite3`). The old `services/records.js` and JSON data files have been removed.
    - The `package.json` start script now correctly uses `node server.js`.
    - The old `server.cjs` file has been deleted.
- **Persistent Data Storage (June 20, 2025):**
    - Successfully migrated backend data storage from JSON files to an SQLite database using `better-sqlite3`.
    - `services/data-service.js` handles all database operations.
    - API routes in `routes/api.js` now use the new data service.
    - `.gitignore` updated for database files.
    - Logic added to `services/data-service.js` to attempt creation of `/data` directory in production (for Railway).
- The server successfully starts (`node server.js`) and serves static files from the `public/` directory, including a custom 404 page for unknown routes (now handled by `middleware/error.js` and `routes/web.js`).
- Server endpoints are protected by `express-rate-limit` (configured in `server.js`).
- Security headers are applied using `helmet`, with a meticulously configured Content Security Policy (CSP) sourced from `config/index.js` and applied in `server.js`. This CSP correctly allows all necessary external resources, including for Leaflet maps (scripts, styles, tiles, and marker icons).
- Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at startup (now within `config/index.js`).
- **Build and Linting Process (June 20, 2025):**
    - ESLint configuration migrated to `eslint.config.js` for ESLint v9+.
    - `package.json` updated with `"type": "module"`; utility scripts like `generate-hash.js` renamed to `.cjs` extension. The main server `server.js` is now an ES Module.
    - `npm run lint` passes with 0 errors (minor acceptable warnings for prefixed unused variables).
    - The test suite now uses a centralized server management pattern for all API, Rate Limiting, and 404 tests, with a single server instance shared across these suites. The OTP logic tests use a separate, isolated server instance. All server instances are gracefully shut down in their respective `afterAll` hooks, and the global `afterAll` reliably closes the database connection and deletes the test database file. This approach eliminates the EBUSY error and ensures robust test isolation and cleanup.
    - `npm test` (including Prettier checks and translation consistency check) passes successfully. All tests (API, UI, and chatbot) are now passing.
    - Old `.eslintrc.js` file deleted.
- **HTML Accessibility & Cleanup (June 20, 2025):**
    - Deleted the `img#condition-image` element from `public/home.html` as it was deemed unnecessary.
    - Moved inline styles for a logo in `public/index.html` to `public/styles/styles_index.css`.
    - Removed a stale HTML comment from `public/home.html`.
    - Verified that all relevant HTML pages have appropriate `<meta name="description">` tags.
- **Script Loading Optimization (June 20, 2025):**
    - Ensured all external JavaScripts in HTML files consistently use the `defer` attribute to prevent render-blocking and improve loading performance.
- **View Records Page Functionality (June 20, 2025):**
    - `public/view-records.html` correctly fetches and displays data from the new SQLite backend.
    - Map functionality (Leaflet) is working, including display of red marker pins, after CSP updates and JavaScript fixes for event handling and library loading order.
- Frontend pages utilize a shared appbar pattern (`#appBar` on sub-pages) and a distinct main header (`.chatbot-header` on `home.html`). Both are styled via `public/styles/styles.css` with specific adjustments (padding, font declarations, viewport meta tags) to ensure visually consistent rendered heights across different pages and in various (emulated) viewing environments.
- `public/referral.html` now correctly links to `public/styles/styles.css` and has its local appbar styles removed.
- The viewport meta tag in `public/home.html` was updated (removed `user-scalable=no`) for rendering consistency.
- Inline event handlers (e.g., `onclick`) in `public/home.html` have been refactored to use `element.addEventListener()` for improved CSP compliance and modern JavaScript practices.
- A reusable focus trap system is implemented for modals and side menus, enhancing keyboard accessibility.
- Accessibility requirements for marquee content (`aria-hidden="true"`), icon-only buttons (`aria-label`), and "skip to content" links are enforced.
- External script loading is optimized using the `defer` attribute in HTML pages (verified and updated June 20, 2025). Problematic/unnecessary preload links for fonts and favicons were removed from `public/index.html` and `public/home.html`.
- API data fetching includes graceful error handling to provide user feedback when location data is unavailable or errors occur.
- Comprehensive automated test suite covers UI and accessibility. The `npm test` script now includes a pre-test formatting check (`npm run format:check`) and linting (`npm run lint`) hooks, all of which pass after recent changes.
- Code formatting is enforced using Prettier and EditorConfig.
- ESLint is configured for code quality checks.
- The Node.js version is specified in `package.json` and `.nvmrc` for consistent development environments.
- The duplicate `html2canvas` script has been removed from `public/home.html`.
- The core chatbot functionality for eye, skin, and ear queries is implemented on the frontend (`public/scripts/agent1-chatbot-module.js`), which interacts with the external "Alan" chatbot agent managed via Flowise. This "Alan" agent is powered by Google Gemini 2.5 Flash (a static LLM) and incorporates advanced intelligence, role, logic, memory, and security features within its prompt. This codebase focuses on the interface, not the "secret sauce" of the agent itself.
- All recent CSP and event handler issues have been resolved.
- Header/appbar height consistency across `home.html` and sub-pages has been achieved through targeted CSS and HTML adjustments.
- Documentation and memory bank files are up to date reflecting these UI consistency improvements.
- **Dynamic Language Loading System (June 20, 2025):**
    - Implemented `public/scripts/language-loader.js` to dynamically fetch language JSON files from `public/translations/`.
    - Refactored `public/scripts/language.js` to use the new loader, manage the current language state, and provide `setLanguage` and `getTranslation` functions.
    - Updated `public/scripts/page-template.js` to use the new translation system for page titles and to trigger updates on language change.
    - Refactored `public/index.html` (via `public/scripts/index.js`) and `public/home.html` (via `public/scripts/home.js`) to use the new system for their language selection UI and content translation.
    - Refactored content pages (`aboutalan.html`, `eye.html`, `ear.html`, `skin.html`, `instructions.html`, `atoms.html`, `referral.html`, `weblinks.html`) to remove embedded translations and use the new dynamic system.
- **CSS Centralization and Refinements (June 20, 2025):** All local and inline styles from `aboutalan.html`, `home.html`, `atoms.html`, `ear.html`, `eye.html`, `instructions.html`, `skin.html`, and `weblinks.html` have been successfully moved to `public/styles/styles.css`. Common styles for exam pages were consolidated using the `.exam-content-container` class. Utility classes were grouped. The "How to use" button text visibility on `home.html` (styled with yellow background and black text) and the `lang.jpg` 404 error were resolved. Spacing for the ">Practice often<" line on exam pages was adjusted using the `.practice-often-spacing` class with `margin-top: 30px;`. Empty/commented page-specific style sections in `styles.css` were cleaned up.
- **Frontend Orchestrator Refactor (June 20, 2025):**
    *   Successfully refactored `public/scripts/home.js` and `public/scripts/index.js` into orchestrator patterns.
    *   Created and integrated new modules:
        *   For `home.js`: `home-ui.js`, `home-data.js`, `home-translator.js`.
        *   For `index.js`: `location-service.js`, `auth-flow.js`, `onboarding-form.js`.
    *   This modularization enhances code organization and maintainability.
- **API Endpoint Usage Corrected (June 20, 2025):**
    *   Client-side scripts now correctly target local API endpoints (`/api/record-info`, `/api/fetch-records`) for data submission and authentication, resolving previous 404 errors related to an unavailable external URL.
- **Conditional Logging Implementation (June 20, 2025):**
    *   Successfully created and integrated `public/scripts/log.js` for conditional client-side logging.
    *   All relevant client-side scripts in `public/scripts/` were refactored to use the new `log.*` methods.
    *   `log.info` and `log.debug` messages are now silenced in production, while `log.warn` and `log.error` remain active.
    *   Resolved issues related to ES module loading for `muted.js` and the initialization of its buttons.

## What's Left to Build (New Tasks for "Tomorrow")
1.  **Implement PWA Service Worker for Install Prompt:**
    *   Create/correct `public/service-worker.js` to enable PWA features, focusing on the "Install app" prompt.
    *   Configure caching strategies and ensure `manifest.json` is PWA-ready.
2.  **Update API Tests for SQLite Backend**:
    *   Modify `tests/api.test.js` to correctly set up and tear down test data using the new SQLite database (`test-alan-data.db`) via `services/data-service.js`. This will ensure backend tests remain valid after the data storage migration.
3.  **Explore Component-Based Architecture (Future Consideration):**
    *   **Goal**: Improve modularity, reusability, and maintainability of frontend code.
    *   **Options to Consider**:
        *   **Native Web Components**: Refactor reusable UI pieces (e.g., Muted Buttons bar, Side Menu) into native Web Components.
        *   **Lightweight Framework**: Evaluate a lightweight framework like Svelte.

## Current Status
The AlanUI Web Chatbot is functional and stable. Recent work focused on:
- Resolving CSP/event handler issues.
- Achieving visual consistency in header/appbar heights.
- Implementing a new dynamic language loading system using external JSON files.
- Centralizing all page-specific CSS into `public/styles/styles.css` and making targeted consolidations.
- **Server Refactor & Test Fixes (June 20, 2025):**
    *   Successfully modularized the server from `server.cjs` to `server.js` (using an app factory pattern) and multiple supporting ES modules in `config/`, `routes/`, `middleware/`, and `services/`.
    *   Updated `package.json` start script to `node server.js` and test script to use `NODE_OPTIONS=--experimental-vm-modules` for Jest.
    *   Refactored `tests/api.test.js`, `tests/ui.test.js`, and `tests/chatbot.test.js` to correctly use ES module syntax, import Jest globals, and leverage the app factory for isolated test configurations.
    *   All 47 tests across 3 suites are now passing. (Note: API tests will need updating for SQLite).
- **Persistent Data Storage Migration (June 20, 2025):**
    *   Successfully migrated backend data storage from JSON files to SQLite using `better-sqlite3`.
    *   Updated `services/data-service.js`, `routes/api.js`, CSP in `config/index.js`, and `public/view-records.html` (including map functionality and pin color).
    *   Addressed deployment issues on Railway related to directory creation for the database.
- **Fixing the build and linting pipeline**: Migrated to ESLint v9+ with `eslint.config.js`, updated `package.json` for ES modules, renamed utility CommonJS files to `.cjs` (server is now ES Module `server.js`), and resolved all linting errors. `npm test` and `npm run lint` now pass.
- **Minor HTML hygiene, accessibility, and performance improvements** (image deletion, removed inline styles, removed stale comment, verified meta descriptions, ensured consistent script deferral).
- **All translations finalized and verified.**
- **Conditional Logging**: Implemented a client-side conditional logging wrapper (`public/scripts/log.js`) to reduce console noise in production environments. All client scripts refactored to use this logger.
Core scripts and HTML pages have been refactored to support these enhancements. Documentation and memory bank files are updated. The project is now poised for PWA capabilities.

## Known Issues
- The server logic has been refactored out of a single file, addressing the previous concern. The new modular structure should be more maintainable.
- API tests in `tests/api.test.js` need to be updated to work with the new SQLite backend.
- Reliance on external Flowise services and the "Alan" agent means the chatbot's performance and availability are dependent on these external components. (Note: The prompt engineering and maintenance of the "Alan" agent are external to this codebase and will be ignored for now as per user feedback.)

## Evolution of Project Decisions
- The project's core purpose evolved to be a web chatbot for health information, moving away from a "secure record server" concept.
- **Data Persistence (June 20, 2025):** Migrated from JSON file storage to a persistent SQLite database using `better-sqlite3` to improve data integrity, enable persistent storage on platforms like Railway (using volumes), and simplify data management. This addresses a previous "out of scope" item.
- Key decision to integrate with Flowise to manage the "Alan" chatbot agent, which is powered by Google Gemini 2.5 Flash (a static LLM). This allows the "Alan" agent to incorporate advanced AI capabilities (role, logic, memory, security) via its prompt, while keeping the core codebase focused on the interface. (Note: The prompt engineering and agent maintenance are external to this codebase and will be ignored for now as per user feedback.)
- Recent decisions (June 2025) focused on improving user experience, security, and maintainability:
    - Implemented shared appbar and centralized styling for UI consistency and maintainability.
    - Introduced focus trap for enhanced keyboard accessibility, reflecting a commitment to inclusive design.
    - Integrated `express-rate-limit` to bolster server security against common attack vectors.
    - Added `helmet` for comprehensive security headers and configured CSP to allow all necessary resources (including for Leaflet maps).
    - Expanded automated testing to cover new features and enforce accessibility standards, ensuring quality and reliability, including pre-test formatting and linting hooks.
    - Maintained separate CSS files (`styles.css` for shared UI, `styles_index.css` for specific pages) for better organization.
    - Added `.editorconfig` for consistent code style across editors.
    - Switched from `body-parser` to `express.json()` for efficiency.
    - Cleaned up debug `console.log` statements.
    - Validated critical environment variables at startup.
    - Implemented a custom 404 page for better user experience on unknown routes.
    - Improved API error handling on the frontend to provide clear user feedback.
    - Added `defer` attribute to external scripts and preloaded favicons for performance optimization.
    - Documented `.env` setup and cleanup procedures in `README.md`.
    - Specified Node.js version for consistent development environments.
    - Removed duplicate `html2canvas` script.
    - Noted that the manual image compression process (ref `compress_and_convert_images_instructions.txt`) is currently low priority due to the limited number of project images and their current state.
- The decision to exclude complex backend features like user registration and account management is intentional, aimed at keeping the project simple and democratizing its eventual open-source release. This design choice emphasizes the interface's role in providing accessible health information, with the "secret sauce" of the AI agent being managed externally.
- Browser caching of CSP headers and server process state were identified as significant challenges during development, requiring forceful server restarts (e.g., `taskkill /F /IM node.exe /T ; node server.js`) and meticulous browser cache/service worker clearing (including Incognito/Private windows and inspecting raw HTTP headers) to ensure changes to CSP (now in `config/index.js` and applied by `server.js`) were correctly applied and received by the browser.
- Refactoring inline event handlers to `addEventListener` proved to be a key solution for `script-src-attr 'none'` errors, making the frontend more robust against restrictive CSPs.
- **ESLint v9 Migration**: Successfully migrated to `eslint.config.js` (flat config). Ensured project uses ES modules by default (`"type": "module"` in `package.json`). The main server `server.js` is an ES module, and utility CommonJS files (like `generate-hash.cjs`) use the `.cjs` extension. Integrated `eslint-plugin-jest` for test file linting.

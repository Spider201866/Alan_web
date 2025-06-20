<!-- Alan UI - progress.md | 19th June 2025, WJW -->

# Progress

## What Works
- The server successfully starts and serves static files from the `public/` directory, including a custom 404 page for unknown routes.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests.
- Security headers are applied using `helmet`, with a meticulously configured Content Security Policy (CSP) in `server.cjs` (formerly `server.js`). This CSP now correctly allows all necessary external resources (CDNs, Flowise backend, Google Fonts, IP API) for scripts, styles, fonts, and connections. The `scriptSrcAttr: ["'unsafe-inline'"]` directive is also correctly configured to allow inline event handlers if needed, though many have been refactored.
- Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup.
- **Build and Linting Process (June 20, 2025):**
    - ESLint configuration migrated to `eslint.config.js` for ESLint v9+.
    - `package.json` updated with `"type": "module"`; `server.js` and `generate-hash.js` renamed to `.cjs` extensions.
    - `npm run lint` passes with 0 errors (minor acceptable warnings for prefixed unused variables).
    - `npm test` (including Prettier checks and translation consistency check) passes successfully.
    - Old `.eslintrc.js` file deleted.
- **HTML Accessibility & Cleanup (June 20, 2025):**
    - Deleted the `img#condition-image` element from `public/home.html` as it was deemed unnecessary.
    - Moved inline styles for a logo in `public/index.html` to `public/styles/styles_index.css`.
    - Removed a stale HTML comment from `public/home.html`.
    - Verified that all relevant HTML pages have appropriate `<meta name="description">` tags.
- **Script Loading Optimization (June 20, 2025):**
    - Ensured all external JavaScripts in HTML files consistently use the `defer` attribute to prevent render-blocking and improve loading performance.
- JSON data files (`user-info.json`, `user-history.json`) are written with a trailing newline.
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

## What's Left to Build (New Tasks for "Tomorrow")
1.  **Implement Conditional Logging Wrapper:**
    *   **Goal**: Reduce console noise in production while retaining `warn` and `error` logs.
    *   **Method**:
        *   Create `public/scripts/log.js` with a wrapper around `console` methods.
        *   The wrapper will check `window.location.hostname` against `'alan.up.railway.app'`.
        *   If production, `log.debug()` and `log.info()` become no-ops. `log.warn()` and `log.error()` will still call the real `console` methods.
        *   In development, all `log.*` methods will map directly to `console.*`.
        *   Include `log.js` in `index.html` and `home.html` before other scripts.
        *   Refactor existing `console.*` calls in client-side JavaScript files to use `log.*` equivalents.
2.  **Refine Data Storage and Legacy API (Future Consideration):**
    *   **Security**: Investigate moving data files (`user-info.json`, `user-history.json`) written by the application outside the webroot (e.g., to a dedicated data directory like `../alan_data/`).
    *   **Deprecate/Refactor Legacy API**: Develop a plan to phase out or refactor the legacy record-keeping API routes in `server.cjs`, considering more robust storage (e.g., SQLite or cloud service) to replace flat files and `async-mutex`.
3.  **Explore Component-Based Architecture (Future Consideration):**
    *   **Goal**: Improve modularity, reusability, and maintainability of frontend code.
    *   **Options to Consider**:
        *   **Native Web Components**: Refactor reusable UI pieces (e.g., Muted Buttons bar, Side Menu) into native Web Components.
        *   **Lightweight Framework**: Evaluate a lightweight framework like Svelte.
4.  **Implement PWA Service Worker for Install Prompt:**
    *   Create/correct `public/service-worker.js` to enable PWA features, focusing on the "Install app" prompt.
    *   Configure caching strategies and ensure `manifest.json` is PWA-ready.

## Current Status
The AlanUI Web Chatbot is functional and stable. Recent work focused on:
- Resolving CSP/event handler issues.
- Achieving visual consistency in header/appbar heights.
- Implementing a new dynamic language loading system using external JSON files.
- Centralizing all page-specific CSS into `public/styles/styles.css` and making targeted consolidations.
- **Fixing the build and linting pipeline**: Migrated to ESLint v9+ with `eslint.config.js`, updated `package.json` for ES modules, renamed CommonJS files to `.cjs`, and resolved all linting errors. `npm test` and `npm run lint` now pass.
- **Minor HTML hygiene, accessibility, and performance improvements** (image deletion, removed inline styles, removed stale comment, verified meta descriptions, ensured consistent script deferral).
- **All translations finalized and verified.**
Core scripts and HTML pages have been refactored to support these enhancements. Documentation and memory bank files are updated. The project is now poised for PWA capabilities and conditional logging.

## Current Status
The AlanUI Web Chatbot is functional and stable. Recent work focused on:
- Resolving CSP/event handler issues.
- Achieving visual consistency in header/appbar heights.
- Implementing a new dynamic language loading system using external JSON files.
- Centralizing all page-specific CSS into `public/styles/styles.css` and making targeted consolidations.
- **Fixing the build and linting pipeline**: Migrated to ESLint v9+ with `eslint.config.js`, updated `package.json` for ES modules, renamed CommonJS files to `.cjs`, and resolved all linting errors. `npm test` (now including translation consistency check) and `npm run lint` now pass.
- **Minor HTML hygiene, accessibility, and performance improvements** (image deletion, removed inline styles, removed stale comment, verified meta descriptions, ensured consistent script deferral).
Core scripts and HTML pages have been refactored to support these enhancements. Documentation and memory bank files are updated. The project is now poised for PWA capabilities and conditional logging.

## Known Issues
- All server logic is in a single `server.cjs` file (formerly `server.js`), which could become unwieldy for larger projects.
- Reliance on external Flowise services and the "Alan" agent means the chatbot's performance and availability are dependent on these external components. (Note: The prompt engineering and maintenance of the "Alan" agent are external to this codebase and will be ignored for now as per user feedback.)

## Evolution of Project Decisions
- The project's core purpose evolved to be a web chatbot for health information, moving away from a "secure record server" concept.
- Key decision to integrate with Flowise to manage the "Alan" chatbot agent, which is powered by Google Gemini 2.5 Flash (a static LLM). This allows the "Alan" agent to incorporate advanced AI capabilities (role, logic, memory, security) via its prompt, while keeping the core codebase focused on the interface. (Note: The prompt engineering and agent maintenance are external to this codebase and will be ignored for now as per user feedback.)
- Recent decisions (June 2025) focused on improving user experience, security, and maintainability:
    - Implemented shared appbar and centralized styling for UI consistency and maintainability.
    - Introduced focus trap for enhanced keyboard accessibility, reflecting a commitment to inclusive design.
    - Integrated `express-rate-limit` to bolster server security against common attack vectors.
    - Added `helmet` for comprehensive security headers and configured CSP to allow all necessary resources.
    - Expanded automated testing to cover new features and enforce accessibility standards, ensuring quality and reliability, including pre-test formatting and linting hooks.
    - Maintained separate CSS files (`styles.css` for shared UI, `styles_index.css` for specific pages) for better organization.
    - Added `.editorconfig` for consistent code style across editors.
    - Switched from `body-parser` to `express.json()` for efficiency.
    - Cleaned up debug `console.log` statements.
    - Validated critical environment variables at startup.
    - Ensured JSON files have trailing newlines.
    - Implemented a custom 404 page for better user experience on unknown routes.
    - Improved API error handling on the frontend to provide clear user feedback.
    - Added `defer` attribute to external scripts and preloaded favicons for performance optimization.
    - Documented `.env` setup and cleanup procedures in `README.md`.
    - Specified Node.js version for consistent development environments.
    - Removed duplicate `html2canvas` script.
    - Noted that the manual image compression process (ref `compress_and_convert_images_instructions.txt`) is currently low priority due to the limited number of project images and their current state.
- The decision to exclude complex backend features like user registration, account management, and external database integration is intentional, aimed at keeping the project simple and democratizing its eventual open-source release. This design choice emphasizes the interface's role in providing accessible health information, with the "secret sauce" of the AI agent being managed externally.
- Browser caching of CSP headers and server process state were identified as significant challenges during development, requiring forceful server restarts (e.g., `taskkill /F /IM node.exe /T ; node server.cjs`) and meticulous browser cache/service worker clearing (including Incognito/Private windows and inspecting raw HTTP headers) to ensure changes to CSP in `server.cjs` were correctly applied and received by the browser.
- Refactoring inline event handlers to `addEventListener` proved to be a key solution for `script-src-attr 'none'` errors, making the frontend more robust against restrictive CSPs.
- **ESLint v9 Migration**: Successfully migrated to `eslint.config.js` (flat config). Ensured project uses ES modules by default (`"type": "module"` in `package.json`) and CommonJS files (`server.cjs`, `generate-hash.cjs`) use the `.cjs` extension. Integrated `eslint-plugin-jest` for test file linting.

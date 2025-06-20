<!-- Alan UI - progress.md | 19th June 2025, WJW -->

# Progress

## What Works
- The server successfully starts and serves static files from the `public/` directory, including a custom 404 page for unknown routes.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests.
- Security headers are applied using `helmet`, with a meticulously configured Content Security Policy (CSP) in `server.js`. This CSP now correctly allows all necessary external resources (CDNs, Flowise backend, Google Fonts, IP API) for scripts, styles, fonts, and connections. The `scriptSrcAttr: ["'unsafe-inline'"]` directive is also correctly configured to allow inline event handlers if needed, though many have been refactored.
- Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup.
- JSON data files (`user-info.json`, `user-history.json`) are written with a trailing newline.
- Frontend pages utilize a shared appbar pattern (`#appBar` on sub-pages) and a distinct main header (`.chatbot-header` on `home.html`). Both are styled via `public/styles/styles.css` with specific adjustments (padding, font declarations, viewport meta tags) to ensure visually consistent rendered heights across different pages and in various (emulated) viewing environments.
- `public/referral.html` now correctly links to `public/styles/styles.css` and has its local appbar styles removed.
- The viewport meta tag in `public/home.html` was updated (removed `user-scalable=no`) for rendering consistency.
- Inline event handlers (e.g., `onclick`) in `public/home.html` have been refactored to use `element.addEventListener()` for improved CSP compliance and modern JavaScript practices.
- A reusable focus trap system is implemented for modals and side menus, enhancing keyboard accessibility.
- Accessibility requirements for marquee content (`aria-hidden="true"`), icon-only buttons (`aria-label`), and "skip to content" links are enforced.
- External script loading is optimized using the `defer` attribute in HTML pages. Problematic/unnecessary preload links for fonts and favicons were removed from `public/index.html` and `public/home.html`.
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

## What's Left to Build (New Tasks for "Tomorrow")
1.  **Finalize and Verify All Translations:**
    *   Ensure all necessary translation keys are present in all 22 JSON language files in `public/translations/`.
    *   Thoroughly test all pages in various languages to confirm all static and dynamic text elements are correctly translated and displayed.
    *   Refine any remaining dynamic text updates within JavaScript files (e.g., parts of `referral.html`'s `initializeForm`) to use `getTranslation`.
2.  **Implement PWA Service Worker for Install Prompt:**
    *   Create/correct `public/service-worker.js` to enable PWA features, focusing on the "Install app" prompt.
    *   Configure caching strategies and ensure `manifest.json` is PWA-ready.
3.  **Refactor CSS - Move More to `styles.css`:**
    *   Centralize more styling into `public/styles/styles.css` from other CSS files or inline styles to improve maintainability.

## Current Status
The AlanUI Web Chatbot is functional and stable. Recent work focused on resolving CSP/event handler issues, achieving visual consistency in header/appbar heights, and implementing a new dynamic language loading system using external JSON files. Core scripts (`language.js`, `page-template.js`, `index.js`, `home.js`) and all relevant HTML pages have been refactored to support this. Documentation and memory bank files are updated. The project is now poised for translation key completion/verification, PWA capabilities, and further CSS organization.

## Known Issues
- All server logic is in a single `server.js` file, which could become unwieldy for larger projects.
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
- The decision to exclude complex backend features like user registration, account management, and external database integration is intentional, aimed at keeping the project simple and democratizing its eventual open-source release. This design choice emphasizes the interface's role in providing accessible health information, with the "secret sauce" of the AI agent being managed externally.
- Browser caching of CSP headers and server process state were identified as significant challenges during development, requiring forceful server restarts (e.g., `taskkill /F /IM node.exe /T ; node server.js`) and meticulous browser cache/service worker clearing (including Incognito/Private windows and inspecting raw HTTP headers) to ensure changes to CSP in `server.js` were correctly applied and received by the browser.
- Refactoring inline event handlers to `addEventListener` proved to be a key solution for `script-src-attr 'none'` errors, making the frontend more robust against restrictive CSPs.

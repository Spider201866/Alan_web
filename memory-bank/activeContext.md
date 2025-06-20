<!-- Alan UI - activeContext.md | 19th June 2025, WJW -->

# Active Context

## Current Work Focus
The dynamic language loading system has been implemented. Current focus is on ensuring all translation keys are correctly populated in the JSON files and thorough testing of the internationalization features. Upcoming tasks include PWA service worker implementation and further CSS refactoring.

## Recent Changes
- **Dynamic Language Loading System Implementation (June 20, 2025):**
    - Replaced the single, large `language.js` file (which embedded all translations) with a new system.
    - Created `public/scripts/language-loader.js` to dynamically fetch individual language JSON files from `public/translations/` on demand, with caching.
    - Refactored `public/scripts/language.js` to manage the current language, use the loader, and provide `setLanguage(langCode)` and `getTranslation(key)` functions. It dispatches a `languageChanged` event on language updates.
    - Updated `public/scripts/page-template.js` to use `getTranslation` for page titles and to listen for `languageChanged` to re-translate page content via callbacks.
    - Refactored all HTML pages (`index.html`, `home.html`, and all sub-pages like `aboutalan.html`, `referral.html`, etc.) to remove embedded translation objects and adapt their scripts to use the new `getTranslation` and `initPage` (with translation keys).
    - Updated language selection UI in `index.html` and `home.html` to call the new `setLanguage` function.
    - Ensured `index.html`'s main script tag uses `type="module"`.
    - Corrected translation logic for marquee boxes in `home.js`.
    - Updated `README.md` and Memory Bank files to reflect this new system.
- **Header/Appbar Height Consistency (June 20, 2025):**
    - Investigated and resolved discrepancies in rendered heights between the main `.chatbot-header` on `public/home.html` and the shared `#appBar` on sub-pages (e.g., `public/referral.html`).
    - Ensured `public/referral.html` correctly links to `public/styles/styles.css` and removed its local appbar styles.
    - Updated the viewport meta tag in `public/home.html` by removing `user-scalable=no` to align with other pages, which influenced consistent rendering in specific emulations.
    - Fine-tuned `padding-bottom` of `.chatbot-subtitle` in `public/styles/styles.css` to `13.5px` to achieve a rendered height of ~72px for the `home.html` header, matching other page appbars in the target emulation environment.
    - Made the `font-family` for the `.back-arrow` in `#appBar` explicit with `!important` in `public/styles/styles.css` for consistent arrow rendering.
- **Memory Bank Update (June 19, 2025):** All core memory bank files (`activeContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`, `projectbrief.md`, `productContext.md`) reviewed and updated to reflect recent CSP troubleshooting, HTML refactoring, and documentation changes.
- **CSP Troubleshooting & Resolution (June 19, 2025):**
    - Addressed multiple CSP violations related to `font-src`, `connect-src`, and `script-src-attr`.
    - Updated `server.js` `helmet` configuration to correctly allow necessary external domains (CDNs, Flowise, Google Fonts, IP API).
    - Specifically added `https://cdnjs.cloudflare.com` to `fontSrc` and `https://flowiseai-railway-production-fecf.up.railway.app` to `connectSrc`.
    - Ensured `scriptSrcAttr: ["'unsafe-inline'"]` is correctly configured in `helmet` as a top-level option.
    - Removed problematic `<link rel="preload">` tags for fonts and favicons from `public/index.html` and `public/home.html`.
    - Refactored inline `onclick` event handlers in `public/home.html` to use `addEventListener` for better CSP compliance and modern JavaScript practices. This was a key step in resolving persistent "script-src-attr 'none'" errors.
- **Documentation Updates (June 19, 2025):**
    - Updated `folderList.txt` with the complete current project file structure.
    - Updated the "Project Structure" section in the main `README.md` to be more comprehensive and refer to `folderList.txt`.
    - Added a detailed "Troubleshooting" section to `README.md` documenting the CSP issues, diagnostic steps, and final resolution.
- **Build Process & Testing (June 19, 2025):**
    - Used `npm run format` to fix Prettier code style issues in several files.
    - Confirmed all tests pass (`npm test -- --verbose`) after the CSP and `home.html` refactoring changes.
- **Previous Server Enhancements (June 2025):**
    - Integrated `helmet` security middleware in `server.js`.
    - Implemented a custom 404 route in `server.js`.
    - Improved API error handling in `public/scripts/index.js`.
    - Switched from `body-parser` to `express.json()`.
    - Wrapped debug `console.log` statements in `server.js` behind a `NODE_ENV` check.
    - Validated critical environment variables at server startup.
    - Ensured JSON data files are written with a trailing newline.
- **Previous Frontend & Build Process Enhancements:**
    - Added `.editorconfig`.
    - Added `defer` attribute to script tags.
    - Updated `package.json` with `format:check` and `lint` scripts.
    - Installed ESLint and created `.eslintrc.js`.
    - Specified Node.js version in `package.json` and `.nvmrc`.
    - Updated `test` script to include `format:check`.

## Next Steps (New Tasks for "Tomorrow")
1.  **Split Language Translations into Separate Files:**
    *   **Goal**: Refactor the current translation system (likely embedded in HTML or a single JS object) into individual JSON files per language (e.g., `locales/en.json`, `locales/es.json`).
    *   **Details**:
        *   Create a `locales/` directory within `public/`.
        *   Move translations for each of the 22 languages into its own JSON file.
        *   Implement a JavaScript function (likely in `public/scripts/language.js` or a new module) to dynamically fetch and apply the correct language JSON file based on user selection (e.g., from `localStorage`).
        *   Update existing language switching logic to use this new system.
    *   **Considerations**: Ensure no FOUC (Flash of Unstyled Content/Untranslated Text). Ensure all existing translated elements are covered. Maintain performance.
2.  **Implement PWA Service Worker for Install Prompt:**
    *   **Goal**: Enable PWA features, primarily allowing users to "install" the web app on desktop and mobile.
    *   **Details**:
        *   Create/correct `public/service-worker.js`.
        *   Implement basic caching strategies (e.g., cache-first for static assets, network-first for dynamic content).
        *   Ensure the service worker correctly handles `fetch` events.
        *   Register the service worker in the main JavaScript entry point (e.g., `public/scripts/index.js` or `public/scripts/home.js`).
        *   Verify `public/favicons/manifest.json` is correctly configured for PWA installability (e.g., `start_url`, `display`, icons).
    *   **Considerations**: Test install prompt on various platforms/browsers. Ensure offline capabilities are as intended (if any).
3.  **Refactor CSS - Move More to `styles.css`:**
    *   **Goal**: Centralize more styling into `public/styles/styles.css` to improve maintainability and reduce redundancy from other CSS files or inline styles.
    *   **Details**:
        *   Identify common styles currently in `public/styles/styles_index.css` or potentially in page-specific `<style>` tags (though these should be minimal).
        *   Move shared, reusable styles to `styles.css`.
        *   Ensure `styles_index.css` primarily contains styles unique to `index.html` or `home.html` if they differ significantly from other pages.
    *   **Considerations**: Perform thorough visual regression testing to ensure no layouts are broken. Maintain the distinction between global styles (`styles.css`) and page-specific overrides.

## Active Decisions and Considerations
- The refactoring of `home.html` to use `addEventListener` is a good pattern to continue.
- The `fontSrc` in `server.js` was reverted to `["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com']` after the wildcard `*` helped diagnose issues; this more specific configuration is now working.
- Maintaining separation of `styles.css` and `styles_index.css` is still the plan, but with more shared elements moving to `styles.css`.
- Maintaining separation of `styles.css` and `styles_index.css`.
- Adherence to shared appbar pattern and accessibility guidelines.
- **Visual Consistency**: Striving for pixel-perfect (or as close as practically possible) visual consistency across pages, especially for shared elements like headers/appbars, even if it requires fine-tuning CSS based on observed rendering in specific (emulated) environments.
- **Internationalization (i18n)**: Translations are managed via external JSON files per language, loaded dynamically.

## Important Patterns and Preferences
- **Dynamic Language Loading**:
    - Translations are stored in `public/translations/{langCode}.json`.
    - `language-loader.js` fetches these files.
    - `language.js` orchestrates loading, caching (via loader), stores current translations in `window.currentTranslations`, manages `localStorage` for `preferredLanguage`, and dispatches a `languageChanged` event.
    - `page-template.js` and individual page scripts use `getTranslation(key)` and listen to `languageChanged` for UI updates.
    - HTML pages call `initPage('pageTitleKey', optionalCallback)` where `optionalCallback` handles page-specific text.
- **Header/Appbar Styling**:
    - Shared `#appBar` on sub-pages is styled via `public/styles/styles.css`. Sub-pages must link to this stylesheet and not contain local appbar styles.
    - The unique `.chatbot-header` on `public/home.html` is also styled in `public/styles/styles.css`, with specific padding adjustments (e.g., `.chatbot-subtitle`) to align its rendered height with the shared `#appBar` in target viewing environments.
    - Viewport meta tags should be consistent across pages to avoid unexpected rendering differences.
- **CSP Configuration**: Manage CSP via `helmet` in `server.js`. Be mindful of `scriptSrcAttr` for inline event handlers and prefer `addEventListener`.
- **Event Handling**: Prefer `addEventListener` over inline attributes (`onclick`, etc.) for better CSP compatibility and code organization.
- **Shared Appbar Pattern**: All new main pages should use `initPage` from `page-template.js`.
- **Focus Trap Implementation**: Use `FocusTrap` class for modals/menus.
- **Accessibility Best Practices**: `aria-hidden` for duplicated content, `aria-label` for icon-only buttons, "Skip to content" links.
- **Code Formatting & Quality**: Use Prettier (`npm run format`) and ESLint (`npm run lint`).
- **Testing**: `npm test`. Ensure new features have test coverage.
- **Troubleshooting CSP**: Involves checking `server.js`, HTML files for preloads, forceful server restarts, and meticulous browser cache/service worker clearing. Inspecting raw HTTP headers is key.
- **Command Line Operations**:
    - Avoid using `&&` for command chaining in PowerShell as it's not supported; use separate commands or PowerShell specific syntax (e.g., semicolon `;`) if chaining is essential.
- **Server Management & Page Viewing**:
    - After making changes, I will typically stop any running Node.js server (using `taskkill /F /IM node.exe /T` if necessary) and then restart it with `node server.js` to ensure changes are applied.
    - However, per user preference, I will generally *not* automatically use the `open` command in `attempt_completion` to view the page in a browser. The user will typically manage when to view the application. I should only use the `open` command if specifically requested for a particular test or verification step.

## Learnings and Project Insights
- **CSP Debugging**: Can be complex due to interactions between server configuration (`helmet`), HTML content (preloads, inline handlers), and aggressive browser/service worker caching. Forceful server restarts and comprehensive cache clearing (including incognito/different browsers) are essential diagnostic tools.
- **`script-src-attr`**: This CSP directive can be particularly tricky. If the browser reports `script-src-attr 'none'` despite server configuration aiming for `'unsafe-inline'`, it can indicate deep caching issues or subtle interactions with other CSP directives or `helmet` defaults. Refactoring to `addEventListener` is a more robust solution than relying on `'unsafe-inline'` for event handlers.
- **Server Process State & Cache Busting**: Ensuring the running Node.js process reflects the latest saved file changes is critical. Standard terminal restarts (Ctrl+C and `node server.js`) may not always be sufficient if old processes linger. Forcefully terminating all Node.js processes (e.g., using `taskkill /F /IM node.exe /T` on Windows or `pkill -f node` on macOS/Linux) before restarting the server is a key troubleshooting step for issues where server-side changes (like CSP headers in `server.js`) don't seem to apply. This, combined with thorough browser cache clearing (including service workers and using incognito mode), is often necessary to resolve persistent caching problems.
- **JavaScript Modules**: Using ES6 modules (`import`/`export`) for better code organization. Ensure `<script type="module">` is used in HTML when loading scripts that use these features.
- **Event-Driven UI Updates**: Using custom events (e.g., `languageChanged`) to decouple components and trigger UI updates.
- The project prioritizes consistency, accessibility, and security.
- Vanilla JavaScript and simple structure are by design.
</content>

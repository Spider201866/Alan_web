<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
The application is now a fully functional Progressive Web App (PWA). The immediate focus is on ensuring all documentation is updated to reflect this major enhancement.

## Recent Changes
- **Performance Optimizations (July 3, 2025):**
    - Replaced all `.jpg`, `.gif`, and `.png` images with their existing `.webp` counterparts to reduce file sizes.
    - Refactored the chatbot initialization to prevent a triple fetch of the same data packet.
    - Refactored the screenshot functionality to load the `html2canvas.js` library on demand, instead of on every page load.
- **Offline Experience Improvements (July 2, 2025):**
    - Refactored all page initialization scripts to use a flag to prevent multiple initializations, and to wait for a "ready" message from the service worker, ensuring that all assets are cached before the page attempts to render. This resolves the issue of the missing app bar on offline pages.
    - Added a `.catch()` block to the service worker's static asset fetch handler to prevent "Failed to fetch" errors in offline mode.
    - Fixed a bug where the app bar was missing on the offline referral page by adding the `page-template.js` script to `referral.html`.
    - Updated the service worker cache name to `alanui-v2` to ensure all offline assets are updated correctly.
    - Added "Retry" and "Go Back" buttons to the offline page to improve usability.
    - Updated the service worker to cache all side menu pages, the referral page, and their associated scripts, including the shared `page-template.js` and its dependencies (`language.js`, `log.js`) for the app bar, making the app much more functional offline.
- **PWA Install and Notification Flow (July 2, 2025):**
    - Refactored the PWA installation flow to prevent a `NotAllowedError` by ensuring the `prompt()` method is called directly within a user gesture.
    - The notification permission is now requested in the background after the install prompt is shown.
    - Implemented a robust, single-click flow for the "Install" button that correctly handles both notification permission and app installation prompts.
    - The event listener is now attached with the `{ once: true }` option to prevent multiple clicks and ensure a clean user experience.
    - The "Install" button is now correctly hidden after the app is installed or if it's already running in standalone mode.
- **Content Security Policy Update (July 2, 2025):**
    - Updated the Content Security Policy to allow connections to `cdn.jsdelivr.net`, `cdnjs.cloudflare.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, and `unpkg.com`. This resolves errors related to fetching resources from these domains.
- **Service Worker POST Request Bug (July 2, 2025):**
    - Fixed a bug in the service worker that caused an error when trying to cache POST requests. The service worker now only caches GET requests.
- **Install Button Styling (June 30, 2025):**
    - Created a dedicated CSS rule for the `#install-btn` to allow for independent styling.
    - Removed inline styles from the button in `home.html` and moved them to `styles.css` for better maintainability.
- **PWA Implementation and Documentation (June 30, 2025):**
    - Implemented a service worker (`public/service-worker.js`) and web app manifest (`public/favicons/manifest.json`) to make the application installable and offline-capable (commit `[commit_hash]`).
    - Updated all relevant documentation, including `README.md` and the memory bank, to reflect the new PWA features and system patterns.
- **Documentation Update (June 30, 2025):**
    - Updated `README.md`, `techContext.md`, and `systemPatterns.md` with best practices for handling environment variables and secrets. This was prompted by a debugging session related to special characters in secrets causing deployment issues.
- **Security Hardening (June 29, 2025):**
    - Removed the `/__debug-list-dist` route from `server.js`. This route was previously exposed in production and posed a security risk by revealing the contents of the `dist` directory.
- **Comprehensive Code Documentation (June 28, 2025):**
    - Added JSDoc comments and file-level overviews to all logical JavaScript files across the project, including server-side code, client-side scripts, and tests.
    - Updated the main `README.md` to reflect the new documentation standards.
    - Fixed several minor ESLint errors that were identified during the documentation process.
- **Repository Reset (June 28, 2025):**
    - The local and remote repositories were reset to the `fish15-dep` commit to establish a clean, stable baseline.
    - This involved a force push to the `main` branch on GitHub, which permanently removed several non-functional commits.
- **UI Improvements (June 25, 2025):**
    - All table cell content in the "View Records" page is now centered both vertically and horizontally for improved readability.
    - The delete (trash can) icon in the records table is now red for better visibility and user experience.
- **Full CSP Compliance and Bug Fixes (June 22, 2025):**
    - Refactored all HTML pages to remove inline scripts, ensuring full Content Security Policy (CSP) compliance.
    - Created individual JavaScript files for each page to handle its specific logic.
    - Fixed a bug where non-numeric latitude and longitude values were sent to the backend, causing a 400 Bad Request error.
    - Updated backend validation to gracefully handle null values for geolocation data.
- **CSP and Favicon Errors Fixed (June 22, 2025):**
    - Resolved a Content Security Policy violation by removing inline `onload` event handlers from 13 HTML files.
    - Fixed `net::ERR_CONNECTION_REFUSED` errors for favicons by simplifying `routes/web.js` to prevent conflicts with the `express.static` middleware.
    - Documented the server restart procedure (`taskkill /F /IM node.exe`) in `systemPatterns.md` to address development server caching issues.
- **Deployment 404 Error Fixed (June 22, 2025):**
    - Resolved a critical bug where the production server was not serving files from the `dist` directory.
    - The `routes/web.js` file was updated to correctly determine the base path for assets based on the `NODE_ENV`, ensuring the `dist` directory is used in production.
- **Final Diagnosis of Deployment Issue (June 22, 2025):**
    - After extensive debugging, it was confirmed that the Railway deployment was serving a stale version of the application.
- **Accessibility Audit & Fixes (June 22, 2025):**
    - A full accessibility audit was performed and all identified issues were resolved.
- **Code Health and Stability (June 22, 2025):**
    - All dependencies were updated and the test suite was stabilized.

<details>
<summary>Archived Changes & Learnings</summary>

- **Documentation Refactor (June 22, 2025):** Pruned and refactored all documentation for clarity.
- **Build Fix (June 22, 2025):** The `critical` CSS optimization was temporarily removed to debug build failures.
- **Learnings and Project Insights**:
    - **Route vs. Static Middleware Precedence**: A specific route handler (like `router.get('/')`) will always take precedence over `express.static()` middleware. This was the root cause of the 404 error in production.
    - **Deployment Environment Parity**: Build processes can fail in CI/CD even if they work locally.
    - **Pragmatic Retreat**: It's sometimes better to remove a problematic optimization to ensure stability.
    - **Test Environment Management**: Proper test setup and teardown are critical.

</details>

## Next Steps
- There are no major features left to build. The focus is now on maintenance and incremental improvements.

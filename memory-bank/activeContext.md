<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
All known issues have been resolved. The project is now stable, accessible, optimized, and ready for the next phase of development.

## Recent Changes
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
1.  **Implement PWA Service Worker for Install Prompt.**
2.  **Re-evaluate Critical CSS implementation.** (Future task)

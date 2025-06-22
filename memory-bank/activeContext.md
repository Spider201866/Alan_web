<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
All known issues have been resolved. The project is now stable, accessible, optimized, and ready for the next phase of development.

## Recent Changes
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

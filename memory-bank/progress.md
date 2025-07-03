<!-- Alan UI - progress.md | 22nd June 2025, WJW -->

# Progress

## What Works

- **PWA & Performance:**
    - The application is a fully functional Progressive Web App with a robust offline experience. All pages and necessary assets are pre-cached for offline use, and the offline page provides clear user controls.
    - Page load performance has been significantly improved by replacing large images with optimized WebP versions, preventing redundant data fetches, and loading heavy libraries on demand.
- **Core Functionality:**
    - User session and history data are stored in a persistent SQLite database.
    - Static frontend files are served, with a shared appbar pattern for consistent navigation.
    - A reusable focus trap system is implemented for modals and side menus.
    - The application features a dynamic language loading system for 22 languages.
- **Security:**
    - Server endpoints are protected by `express-rate-limit`.
    - Content Security Policy (CSP) is configured using Helmet.
- **Development & Testing:**
    - Automated tests cover UI, accessibility, and backend aspects.
    - Code formatting is enforced using Prettier, and code quality is checked with ESLint.
    - The project has a clear build process and is set up for CI/CD with GitHub Actions.
- **Security Hardening (June 29, 2025):**
    - Removed a vulnerable debug route (`/__debug-list-dist`) that was exposed in the production environment, enhancing the application's security posture.
- **Comprehensive Code Documentation (June 28, 2025):**
    - All logical JavaScript files across the project have been documented with JSDoc comments and file-level overviews, significantly improving code clarity and maintainability.
- **Repository Reset (June 28, 2025):**
    - The local and remote repositories were reset to a clean, stable baseline (`fish15-dep`), and the `README.md` was updated to reflect the current project state.
- **UI Improvements (June 25, 2025):**
    - All table cell content in the "View Records" page is now centered both vertically and horizontally for improved readability.
    - The delete (trash can) icon in the records table is now red for better visibility and user experience.
- **Full CSP Compliance and Bug Fixes (June 22, 2025):**
    - Refactored all HTML pages to remove inline scripts, ensuring full Content Security Policy (CSP) compliance.
    - Fixed a bug where non-numeric latitude and longitude values were sent to the backend, causing a 400 Bad Request error.
- **Deployment 404 Error Fixed (June 22, 2025):**
    - Resolved a critical bug where the production server was not serving files from the `dist` directory by updating `routes/web.js` to be environment-aware.
- **Accessibility Audit & Fixes (June 22, 2025):**
    - A full accessibility audit was performed and all identified issues were resolved.
- **Code Health and Stability (June 22, 2025):**
    - All dependencies were updated and the test suite was stabilized.

<details>
<summary>Archived Progress (pre-June 22, 2025)</summary>

- **Deployment Issue Diagnosed (June 22, 2025):**
    - After extensive debugging, confirmed that the live deployment on Railway was serving a stale version of the application.
- **Performance Optimization (June 22, 2025):**
    - Implemented a build pipeline for image optimization, asset minification, and Gzip compression. The "Critical CSS" optimization was removed due to build failures.
- **CI/CD Pipeline (June 21, 2025):**
    - The CI/CD pipeline is fully functional and includes an automated build step.
- **Server Refactor & Data Persistence (June 20, 2025):**
    - The server is modular, and data is stored in a persistent SQLite database.

</details>

## What's Left to Build
- There are no major features left to build. The focus is now on maintenance and incremental improvements.

## Current Status
The AlanUI Web Chatbot is functional, stable, accessible, and now comprehensively documented as a Progressive Web App. All known issues have been resolved.

## Known Issues
- The `EBUSY` error during test database cleanup still occurs intermittently but does not affect test outcomes.
- Deprecation warnings for sub-dependencies persist as an accepted issue.

## Evolution of Project Decisions
- **Route vs. Static Middleware Precedence (June 22, 2025)**: The root cause of the production 404 error was identified as a route handler taking precedence over the `express.static` middleware. The routing logic was updated to be environment-aware.
- **Accessibility First (June 22, 2025)**: A manual audit was performed to ensure the application meets a high standard of accessibility.
- **Pragmatic Retreat on Critical CSS (June 22, 2025)**: The critical CSS optimization was removed to ensure the application could be successfully deployed.

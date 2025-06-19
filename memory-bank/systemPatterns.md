<!-- Alan UI - systemPatterns.md | 19th June 2025, WJW -->

# System Patterns

## System Architecture
The AlanUI Web Chatbot is built as a Node.js application using Express.js. It follows a monolithic architecture where server-side logic, including routing and static file serving, resides within a single `server.js` file. The primary functionality is frontend-driven, providing a web chatbot experience.

## Key Technical Decisions
- **Static File Serving**: Express.js serves static HTML, CSS, and JavaScript files from the `public/` directory.
- **No Backend Data Storage**: The project does not involve complex backend record storage or external databases; data handling is primarily for chatbot interaction.
- **Rate Limiting**: `express-rate-limit` is used on server endpoints (100 requests per 15 minutes per IP) to prevent abuse.
- **Security Headers**: `Helmet` is used in `server.js` to set various HTTP response headers. The Content Security Policy (CSP) is meticulously configured to allow necessary external resources (CDNs, Flowise backend, Google Fonts, IP API) while aiming for security. This includes specific directives for `scriptSrc`, `styleSrc`, `fontSrc`, `connectSrc`, and `scriptSrcAttr` (to manage inline event handlers).
- **Environment Variable Validation**: Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup.
- **JSON File Integrity**: JSON data files (`user-info.json`, `user-history.json`) are ensured to have a trailing newline character.
- **Frontend Consistency & Performance**: Shared appbar pattern, centralized styling, and deferred script loading for consistent UI and improved performance. Problematic/unnecessary preload links for fonts and favicons were removed from HTML files.
- **Accessibility**: Implementation of focus traps for modals/menus, `aria-hidden` for duplicated marquee content, `aria-label` for icon-only buttons, and "skip to content" links.
    - **Event Handling**: Inline event handlers (e.g., `onclick`) in HTML are being refactored to use `element.addEventListener()` in JavaScript (as done in `public/home.html`) for better CSP compatibility and modern practices.
- **Automated Testing & Code Quality**: Comprehensive test suite covering UI and accessibility, with pre-test formatting and linting hooks. ESLint is configured for code quality.
- **API Error Handling**: Frontend API calls include graceful error handling to provide user feedback.
- **Custom 404 Page**: A dedicated 404 route and page are implemented for unhandled paths.
- **Node.js Version Specification**: The required Node.js version is specified for consistent development environments.
- **Advanced Chatbot Integration**: The project integrates with Flowise to manage the "Alan" chatbot agent, powered by Google Gemini 2.5 Flash (a static LLM), incorporating advanced role, logic, memory, and security features within its prompt. This codebase primarily handles the interface and surrounding functionalities.

## Design Patterns in Use
- **Middleware Pattern**: Express.js middleware is used for rate limiting, serving static files, applying security headers (`Helmet`), and handling 404 routes.
- **Module Pattern (Frontend)**: Frontend JavaScript files in `public/scripts/` use modules to organize code (e.g., `page-template.js`, `focus-trap.js`, `agent1-chatbot-module.js`).
- **Event Listener Pattern (Frontend)**: Replacing inline event handlers (e.g., `onclick`) with `addEventListener` in JavaScript for improved CSP compliance and separation of concerns (e.g., in `public/home.html`).
- **Shared Component Pattern (Frontend)**: Centralized appbar logic and styling for consistent UI elements across multiple pages.
- **Focus Trap Pattern (Frontend)**: Reusable class for managing keyboard focus within modals and side menus.
- **External Agent Integration Pattern**: The frontend (`agent1-chatbot-module.js`) interacts with an externally managed chatbot agent ("Alan" via Flowise) for its core intelligence.
- **Graceful Degradation (API Errors)**: Frontend API calls are designed to handle failures gracefully and inform the user.

## Component Relationships
- `server.js`: Central hub, handles incoming requests, rate limiting, serves static files, applies security headers (including detailed CSP via `helmet`), and manages 404 routes.
- `public/`: Contains all frontend assets (HTML, CSS, JS, images, favicons).
    - `public/home.html`, `public/index.html`: Main landing and onboarding pages. `home.html` now uses `addEventListener` for navigation button event handling. Preload links for fonts/favicons removed.
    - `public/404.html`: Custom page for unknown routes.
    - `public/agent1-chatbot-module.js`: Contains the core chatbot logic, responsible for interacting with the external "Alan" agent.
    - `public/page-template.js`: Provides `initPage` function for shared appbar injection.
    - `public/focus-trap.js`: Provides `FocusTrap` class for keyboard accessibility.
    - `public/scripts/`: Other frontend JavaScript logic, including improved API error handling in `index.js`.
    - `public/styles/styles.css`: Centralized styles for shared UI elements like the appbar and "skip to content" link.
    - `public/styles/styles_index.css`: Specific styles for home/index pages.
    - `public/boxes.html`: Contains marquee content with `aria-hidden` attributes for accessibility.
- `tests/`: Contains automated tests for UI and accessibility.
- `.editorconfig`: Enforces consistent code style across editors.
- `.eslintrc.js`: ESLint configuration for code quality.
- `.nvmrc`: Specifies the recommended Node.js version.
- `package.json`: Manages dependencies, scripts (including `format:check` and `lint`), and specifies Node.js engine version.
- **Flowise/Google Gemini 2.5 Flash (External)**: Provides the core intelligence for the "Alan" chatbot agent, which is accessed by `agent1-chatbot-module.js`.

## Critical Implementation Paths
- **All Incoming Requests**:
    1. Request hits `server.js`.
    2. `Helmet` middleware applies security headers, including the detailed CSP.
    3. `express-rate-limit` middleware checks request rate (for specific routes).
    4. If within limits, proceeds to next middleware/route handler.
    5. If route is not found, the 404 handler serves `public/404.html`.
- **Frontend Page Rendering**:
    1. HTML page loads.
    2. `page-template.js`'s `initPage` function is called to inject the shared appbar.
    3. `styles.css` applies consistent styling to the appbar and other shared elements, including the hidden "skip to content" link.
    4. External scripts are downloaded in parallel and executed after HTML parsing due to `defer` attribute.
    5. External resources (scripts, styles, fonts) are loaded according to the CSP.
    6. Event handlers (e.g., for navigation buttons in `home.html`) are attached via JavaScript using `addEventListener`.
- **Chatbot Interaction**:
    1. User inputs query on the frontend.
    2. `agent1-chatbot-module.js` sends the query to the external "Alan" agent (via Flowise).
    3. The "Alan" agent (powered by Gemini 2.5 Flash) processes the query, applies its role, logic, memory, and security features based on its prompt.
    4. The "Alan" agent generates a response.
    5. `agent1-chatbot-module.js` receives the response and displays it to the user.
- **API Data Fetching (e.g., IP-based location)**:
    1. Frontend initiates a fetch request.
    2. If the request fails or returns empty data, the `catch` block or `else` condition in the `.then` block displays a user-friendly error message in the UI.
- **Modal/Menu Interaction**:
    1. Modal/menu opens.
    2. `FocusTrap` instance is activated, moving focus to the first element.
    3. Tab/Shift+Tab keys cycle focus within the trapped area.
    4. Escape key closes the modal/menu and returns focus to the trigger.
- **Automated Testing & Code Quality Execution**:
    1. `npm test` command is run.
    2. `npm run format:check` is executed first to ensure code formatting.
    3. `jest` executes test files, including accessibility checks for UI elements and API tests for rate limiting, JSON file integrity, and environment variable validation (manual verification for `process.exit` behavior).
    4. `npm run lint` can be run separately to check code quality with ESLint.
- **Automated Testing & Code Quality**: Comprehensive test suite covering UI and accessibility, with pre-test formatting and linting hooks. ESLint is configured for code quality.
- **API Error Handling**: Frontend API calls include graceful error handling to provide user feedback.
- **Custom 404 Page**: A dedicated 404 route and page are implemented for unhandled paths.
- **Node.js Version Specification**: The required Node.js version is specified for consistent development environments.
- **Advanced Chatbot Integration**: The project integrates with Flowise to manage the "Alan" chatbot agent, powered by Google Gemini 2.5 Flash (a static LLM), incorporating advanced role, logic, memory, and security features within its prompt. This codebase primarily handles the interface and surrounding functionalities.

## Design Patterns in Use
- **Middleware Pattern**: Express.js middleware is used for rate limiting, serving static files, applying security headers (`Helmet`), and handling 404 routes.
- **Module Pattern (Frontend)**: Frontend JavaScript files in `public/scripts/` use modules to organize code (e.g., `page-template.js`, `focus-trap.js`, `agent1-chatbot-module.js`).
- **Shared Component Pattern (Frontend)**: Centralized appbar logic and styling for consistent UI elements across multiple pages.
- **Focus Trap Pattern (Frontend)**: Reusable class for managing keyboard focus within modals and side menus.
- **External Agent Integration Pattern**: The frontend (`agent1-chatbot-module.js`) interacts with an externally managed chatbot agent ("Alan" via Flowise) for its core intelligence.
- **Graceful Degradation (API Errors)**: Frontend API calls are designed to handle failures gracefully and inform the user.

## Component Relationships
- `server.js`: Central hub, handles incoming requests, rate limiting, serves static files, applies security headers, and manages 404 routes.
- `public/`: Contains all frontend assets (HTML, CSS, JS, images, favicons).
    - `public/home.html`, `public/index.html`: Main landing and onboarding pages, now include deferred scripts and favicon preloading.
    - `public/404.html`: Custom page for unknown routes.
    - `public/agent1-chatbot-module.js`: Contains the core chatbot logic, responsible for interacting with the external "Alan" agent.
    - `public/page-template.js`: Provides `initPage` function for shared appbar injection.
    - `public/focus-trap.js`: Provides `FocusTrap` class for keyboard accessibility.
    - `public/scripts/`: Other frontend JavaScript logic, including improved API error handling in `index.js`.
    - `public/styles/styles.css`: Centralized styles for shared UI elements like the appbar and "skip to content" link.
    - `public/styles/styles_index.css`: Specific styles for home/index pages.
    - `public/boxes.html`: Contains marquee content with `aria-hidden` attributes for accessibility.
- `tests/`: Contains automated tests for UI and accessibility.
- `.editorconfig`: Enforces consistent code style across editors.
- `.eslintrc.js`: ESLint configuration for code quality.
- `.nvmrc`: Specifies the recommended Node.js version.
- `package.json`: Manages dependencies, scripts (including `format:check` and `lint`), and specifies Node.js engine version.
- **Flowise/Google Gemini 2.5 Flash (External)**: Provides the core intelligence for the "Alan" chatbot agent, which is accessed by `agent1-chatbot-module.js`.

## Critical Implementation Paths
- **All Incoming Requests**:
    1. Request hits `server.js`.
    2. `Helmet` middleware applies security headers, including CSP.
    3. `express-rate-limit` middleware checks request rate (for specific routes).
    4. If within limits, proceeds to next middleware/route handler.
    5. If route is not found, the 404 handler serves `public/404.html`.
- **Frontend Page Rendering**:
    1. HTML page loads.
    2. Favicon is preloaded for faster display.
    3. `page-template.js`'s `initPage` function is called to inject the shared appbar.
    4. `styles.css` applies consistent styling to the appbar and other shared elements, including the hidden "skip to content" link.
    5. External scripts are downloaded in parallel and executed after HTML parsing due to `defer` attribute.
    6. External resources (scripts, styles, fonts) are loaded according to the CSP.
- **Chatbot Interaction**:
    1. User inputs query on the frontend.
    2. `agent1-chatbot-module.js` sends the query to the external "Alan" agent (via Flowise).
    3. The "Alan" agent (powered by Gemini 2.5 Flash) processes the query, applies its role, logic, memory, and security features based on its prompt.
    4. The "Alan" agent generates a response.
    5. `agent1-chatbot-module.js` receives the response and displays it to the user.
- **API Data Fetching (e.g., IP-based location)**:
    1. Frontend initiates a fetch request.
    2. If the request fails or returns empty data, the `catch` block or `else` condition in the `.then` block displays a user-friendly error message in the UI.
- **Modal/Menu Interaction**:
    1. Modal/menu opens.
    2. `FocusTrap` instance is activated, moving focus to the first element.
    3. Tab/Shift+Tab keys cycle focus within the trapped area.
    4. Escape key closes the modal/menu and returns focus to the trigger.
- **Automated Testing & Code Quality Execution**:
    1. `npm test` command is run.
    2. `npm run format:check` is executed first to ensure code formatting.
    3. `jest` executes test files, including accessibility checks for UI elements and API tests for rate limiting, JSON file integrity, and environment variable validation (manual verification for `process.exit` behavior).
    4. `npm run lint` can be run separately to check code quality with ESLint.

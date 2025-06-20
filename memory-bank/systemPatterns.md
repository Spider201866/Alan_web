<!-- Alan UI - systemPatterns.md | 19th June 2025, WJW -->

# System Patterns

## System Architecture
The AlanUI Web Chatbot is built as a Node.js application using Express.js. The server-side logic has been refactored from a single monolithic `server.cjs` file into a modular structure with `server.js` as the main entry point. Configuration, routes, middleware, and services are now separated into their own modules within respective directories (`config/`, `routes/`, `middleware/`, `services/`). The primary functionality remains frontend-driven, providing a web chatbot experience.

## Key Technical Decisions
- **Static File Serving**: Express.js serves static HTML, CSS, and JavaScript files from the `public/` directory.
- **No Backend Data Storage**: The project does not involve complex backend record storage or external databases; data handling is primarily for chatbot interaction.
- **Rate Limiting**: `express-rate-limit` is used on server endpoints (100 requests per 15 minutes per IP) to prevent abuse.
- **Security Headers**: `Helmet` is used in `server.js`, configured with options from `config/index.js`, to set various HTTP response headers. The Content Security Policy (CSP) is meticulously configured to allow necessary external resources (CDNs, Flowise backend, Google Fonts, IP API) while aiming for security. This includes specific directives for `scriptSrc`, `styleSrc`, `fontSrc`, `connectSrc`, and `scriptSrcAttr` (to manage inline event handlers).
- **Environment Variable Validation**: Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated within `config/index.js` during application startup.
- **JSON File Integrity**: JSON data files (`user-info.json`, `user-history.json`) are ensured to have a trailing newline character.
- **Frontend Consistency & Performance**:
    - Shared appbar pattern (`#appBar`) and the unique main header on `home.html` (`.chatbot-header`) are styled via `public/styles/styles.css`.
    - Specific padding adjustments (e.g., `.chatbot-subtitle`) and viewport meta tag consistency are used to ensure visually consistent rendered heights for these headers across different pages and in various (emulated) viewing environments.
    - Explicit `font-family` with `!important` is used for elements like `.back-arrow` to ensure consistent rendering.
    - Deferred script loading for improved performance. Problematic/unnecessary preload links for fonts and favicons were removed from HTML files.
    - Local styles from individual HTML pages (inline or `<style>` blocks) have been centralized into `public/styles/styles.css`.
    - Common styling for exam content pages (eye, ear, skin) is handled by the `.exam-content-container` class and its descendant selectors in `styles.css`.
    - Utility classes (colors, layout helpers like `.block`) are grouped in `styles.css`.
    - **Dynamic Language Loading**: Translations are stored in individual JSON files (`public/translations/`) and loaded on demand, with caching.
- **Accessibility**: Implementation of focus traps for modals/menus, `aria-hidden` for duplicated marquee content, `aria-label` for icon-only buttons, and "skip to content" links.
    - **Event Handling**: Inline event handlers (e.g., `onclick`) in HTML are being refactored to use `element.addEventListener()` in JavaScript (as done in `public/home.html`) for better CSP compatibility and modern practices.
- **Automated Testing & Code Quality**: Comprehensive test suite covering UI and accessibility, with pre-test formatting and linting hooks. ESLint is configured for code quality.
- **API Error Handling**: Frontend API calls include graceful error handling to provide user feedback.
- **Custom 404 Page**: A dedicated 404 route and page are implemented for unhandled paths.
- **Node.js Version Specification**: The required Node.js version is specified for consistent development environments.
- **Advanced Chatbot Integration**: The project integrates with Flowise to manage the "Alan" chatbot agent, powered by Google Gemini 2.5 Flash (a static LLM), incorporating advanced role, logic, memory, and security features within its prompt. This codebase primarily handles the interface and surrounding functionalities.

## Design Patterns in Use
- **Middleware Pattern**: Express.js middleware is used for rate limiting, serving static files, applying security headers (`Helmet`), and handling 404 routes. These are now more organized, with specific middleware functions in the `middleware/` directory (e.g., `middleware/auth.js`, `middleware/validation.js`, `middleware/error.js`).
- **Module Pattern (Backend & Frontend)**:
    - **Backend**: The server-side code now extensively uses ES modules. `server.js` exports a `createApp(config)` factory function, making the application instance configurable for different environments (like testing). The main execution block in `server.js` uses this factory with the default config for normal operation. Modules are organized into `config/`, `routes/`, `middleware/`, and `services/`.
    - **Frontend**: Frontend JavaScript files in `public/scripts/` use modules to organize code. This now includes:
        *   Core utility modules: `page-template.js`, `focus-trap.js`, `language.js`, `language-loader.js`.
        *   Chatbot interaction: `agent1-chatbot-module.js`.
        *   **Orchestrator Pattern Modules (New):**
            *   `home.js` and `index.js` act as orchestrators.
            *   `home-ui.js`, `home-data.js`, `home-translator.js` (for `home.js`).
            *   `location-service.js`, `auth-flow.js`, `onboarding-form.js` (for `index.js`).
- **Frontend Orchestrator Pattern (New)**:
    *   Main page scripts (`home.js`, `index.js`) are orchestrators.
    *   They import and initialize specialized, single-responsibility modules.
    *   Responsibilities are clearly delegated: UI interactions, data operations, translation, authentication flow, form validation, and location services are handled by dedicated modules.
    *   Orchestrators manage the "wiring" by passing callbacks or references, making dependencies explicit and improving modularity.
- **App Factory Pattern (Backend)**: `server.js` exports a `createApp(customConfig)` function, allowing the creation of Express app instances with specific configurations. This is crucial for test isolation, enabling tests in `tests/api.test.js` to initialize the server with modified configurations (e.g., temporary file paths, specific OTP settings).
- **Event Listener Pattern (Frontend)**:
    - Replacing inline event handlers (e.g., `onclick`) with `addEventListener` in JavaScript for improved CSP compliance and separation of concerns (e.g., in `public/home.html`).
    - Using custom DOM events (e.g., `languageChanged`) for decoupled communication between modules (e.g., `language.js` dispatches, `page-template.js`, `index.js`, `home.js` listen).
- **Shared Component Pattern (Frontend)**:
    - Centralized appbar (`#appBar`) logic (`page-template.js`) and styling (`styles.css`) for consistent UI elements across sub-pages.
    - The main header on `home.html` (`.chatbot-header`) is also styled in `styles.css`, with fine-tuned padding to match the perceived height of the shared appbar.
    - Further CSS centralization has moved most page-specific styles from HTML files into `public/styles/styles.css`. Common patterns, like exam page content, are styled via shared classes (e.g., `.exam-content-container`).
- **Dynamic Content Loading Pattern (Frontend)**:
    - `language-loader.js` fetches language-specific JSON files from `public/translations/` on demand.
    - Caching of loaded translations to avoid redundant network requests.
- **Focus Trap Pattern (Frontend)**: Reusable class for managing keyboard focus within modals and side menus.
- **External Agent Integration Pattern**: The frontend (`agent1-chatbot-module.js`) interacts with an externally managed chatbot agent ("Alan" via Flowise) for its core intelligence.
- **Graceful Degradation (API Errors)**: Frontend API calls are designed to handle failures gracefully and inform the user.

## Component Relationships
- `server.js`: Main server entry point. Initializes Express, applies global middleware (Helmet, CORS, JSON parsing, static file serving from `config.paths.public`), sets up rate limiting, and mounts routers from `routes/api.js` and `routes/web.js`. Also incorporates 404 and global error handlers from `middleware/error.js`.
- `config/index.js`: Manages all server configuration, including port, file paths, security settings (salt, master hash, OTPs), and CSP options. Validates critical environment variables.
- `routes/`:
    - `api.js`: Defines API routes (e.g., `/record-info`, `/fetch-records`, `/fetch-history`). Uses middleware from `middleware/validation.js` and `middleware/auth.js`, and services from `services/records.js`.
    - `web.js`: Defines routes for serving frontend HTML pages (e.g., `/`, `/view-records`).
- `middleware/`:
    - `auth.js`: Contains `validatePassword` middleware and `hashPassword` helper.
    - `validation.js`: Contains `validateRecord` middleware.
    - `error.js`: Contains `handleErrors` async wrapper, `notFound` 404 handler, and `globalErrorHandler`.
- `services/`:
    - `records.js`: Contains `readJsonFile` and `appendToHistory` functions for interacting with `user-info.json` and `user-history.json`. Uses `async-mutex`. These services support the local `/api/record-info` and `/api/fetch-records` endpoints.
- `public/`: Contains all frontend assets (HTML, CSS, JS, images, favicons).
    - `public/home.html`, `public/index.html`: Main landing and onboarding pages. `home.html` now uses `addEventListener` for navigation button event handling. Preload links for fonts/favicons removed.
    - `public/404.html`: Custom page for unknown routes.
    - `public/agent1-chatbot-module.js`: Contains the core chatbot logic, responsible for interacting with the external "Alan" agent.
    - `public/page-template.js`: Provides `initPage` function for shared appbar injection and coordinates page-level translation updates.
    - `public/focus-trap.js`: Provides `FocusTrap` class for keyboard accessibility.
    - `public/scripts/language-loader.js`: Fetches individual language JSON files.
    - `public/scripts/language.js`: Manages current language, uses loader, provides translation functions, and dispatches `languageChanged` event.
    - `public/scripts/index.js`, `public/scripts/home.js`: Act as orchestrators. They initialize their respective modules and manage page-specific logic, including UI updates in response to `languageChanged` event (often delegated to a translator module or handled directly for page-specific elements).
        - `home-ui.js`, `home-data.js`, `home-translator.js`: Modules for `home.js`.
        - `location-service.js`, `auth-flow.js`, `onboarding-form.js`: Modules for `index.js`.
    - `public/translations/`: Directory containing individual language JSON files.
    - `public/styles/styles.css`: Centralized stylesheet for all shared UI elements, page-specific layouts, component styles, and utility classes. All styles previously in HTML `<style>` blocks or inline attributes have been moved here. Includes specific rules for `#appBar`, `.chatbot-header`, `.exam-content-container`, and various page/component-specific selectors.
    - `public/styles/styles_index.css`: Specific styles for home/index pages (remains separate for now, but its role might diminish further).
    - `public/boxes.html`: Contains marquee content with `aria-hidden` attributes for accessibility (though marquee content is now directly in `home.html`).
- `tests/`: Contains automated tests for UI and accessibility.
- `.editorconfig`: Enforces consistent code style across editors.
- `eslint.config.js`: ESLint flat configuration for code quality. (Replaced `.eslintrc.js`)
- `.nvmrc`: Specifies the recommended Node.js version.
- `package.json`: Manages dependencies, scripts (including `format:check` and `lint`), and specifies Node.js engine version.
- **Flowise/Google Gemini 2.5 Flash (External)**: Provides the core intelligence for the "Alan" chatbot agent, which is accessed by `agent1-chatbot-module.js`.

## Critical Implementation Paths
- **All Incoming Requests**:
    1. For normal operation, `server.js` calls `createApp` with default configuration. For tests, `createApp` is called with a test-specific configuration.
    2. An Express `app` instance is created by `createApp`.
    3. Global middleware is applied by `createApp`: `Helmet` (with CSP from the provided config), CORS, `express.json()`, `express.static()`.
    4. Request is routed via `app.use('/api', apiRoutesFactory(limiter, configToUse))` or `app.use('/', webRoutesFactory(configToUse))`. The route factories receive the active configuration.
    5. For API routes (e.g., `/api/record-info`, `/api/fetch-records`), the router returned by `apiRoutesFactory` handles the request, potentially using specific middleware like `validateRecord` or `validatePassword`. These routes use the config passed to `apiRoutesFactory` for path lookups and interact with services in `services/records.js`.
    6. For web routes, the router returned by `webRoutesFactory` handles serving HTML files, using the config passed to it.
    7. If no route matches, `notFound` middleware from `middleware/error.js` serves `public/404.html`.
    7. If an error occurs in a route handler (especially async ones wrapped with `handleErrors`), it's passed to `globalErrorHandler` from `middleware/error.js`.
- **Frontend Page Rendering**:
    1. HTML page loads (e.g., `home.html`, `index.html`, `referral.html`). Viewport meta tags are consistent. Scripts like `language.js` (with `type="module"`) initialize.
    2. `language.js` loads the preferred/default language JSON using `language-loader.js` and dispatches `languageChanged`.
    3. For sub-pages (not `index.html` or `home.html`), `page-template.js`'s `initPage` function is called. It builds the header (translating title using `getTranslation`) and sets up listeners for `languageChanged`.
    4. For `index.html` and `home.html`, their respective orchestrator scripts (`index.js`, `home.js`) are loaded (`type="module"`).
        - These orchestrators initialize their dedicated UI, data, translation, auth, form, and location modules.
        - They also set up listeners for `languageChanged` to trigger translation updates (often via their translator module or directly for page-specific elements).
    5. `public/styles/styles.css` applies styling. This includes rules for the `#appBar` (sub-pages) and the `.chatbot-header` (`home.html`), with specific padding for `.chatbot-subtitle` and font styles for `.back-arrow` to ensure their rendered heights are consistent in target environments.
    6. Other external scripts are downloaded in parallel and executed after HTML parsing due to `defer` attribute.
    7. External resources (scripts, styles, fonts) are loaded according to the CSP.
    8. Event handlers (e.g., for navigation buttons in `home.html`) are attached via JavaScript using `addEventListener`.
- **Language Change**:
    1. User interacts with a language selection UI (e.g., dropdown in `home.html` side menu).
    2. The UI event handler calls `await setLanguage(newLangCode)` from `language.js`.
    3. `setLanguage` updates `localStorage`, fetches the new language JSON (via `language-loader.js`), updates `window.currentTranslations`, and dispatches the `languageChanged` event.
    4. All active listeners for `languageChanged` (in `page-template.js`, `index.js`, `home.js`, etc.) execute their callbacks to re-translate relevant UI elements.
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
    3. `jest` executes test files, including accessibility checks for UI elements and API tests for rate limiting, JSON file integrity, and environment variable validation (now handled in `config/index.js`, `process.exit` behavior still needs manual/specific test verification if critical).
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

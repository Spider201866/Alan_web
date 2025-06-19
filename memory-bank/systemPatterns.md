<!-- Alan UI - systemPatterns.md | 19th June 2025, WJW -->

# System Patterns

## System Architecture
The AlanUI Web Chatbot is built as a Node.js application using Express.js. It follows a monolithic architecture where server-side logic, including routing and static file serving, resides within a single `server.js` file. The primary functionality is frontend-driven, providing a web chatbot experience.

## Key Technical Decisions
- **Static File Serving**: Express.js serves static HTML, CSS, and JavaScript files from the `public/` directory.
- **No Backend Data Storage**: The project does not involve complex backend record storage or external databases; data handling is primarily for chatbot interaction.
- **Rate Limiting**: `express-rate-limit` is used on server endpoints (100 requests per 15 minutes per IP) to prevent abuse.
- **Security Headers**: `Helmet` is used to set various HTTP response headers, including a Content Security Policy (CSP) configured to allow necessary external resources and inline scripts/styles/fonts.
- **Environment Variable Validation**: Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup.
- **JSON File Integrity**: JSON data files (`user-info.json`, `user-history.json`) are ensured to have a trailing newline character.
- **Frontend Consistency**: Shared appbar pattern and centralized styling for consistent UI across pages.
- **Accessibility**: Implementation of focus traps for modals/menus, `aria-hidden` for duplicated marquee content, and `aria-label` for icon-only buttons.
- **Automated Testing**: Comprehensive test suite covering UI and accessibility, with a pre-test formatting hook.
- **Advanced Chatbot Integration**: The project integrates with Flowise to manage the "Alan" chatbot agent, powered by Google Gemini 2.5 Flash (a static LLM), incorporating advanced role, logic, memory, and security features within its prompt. This codebase primarily handles the interface and surrounding functionalities.

## Design Patterns in Use
- **Middleware Pattern**: Express.js middleware is used for rate limiting, serving static files, and applying security headers (`Helmet`).
- **Module Pattern (Frontend)**: Frontend JavaScript files in `public/scripts/` use modules to organize code (e.g., `page-template.js`, `focus-trap.js`, `agent1-chatbot-module.js`).
- **Shared Component Pattern (Frontend)**: Centralized appbar logic and styling for consistent UI elements across multiple pages.
- **Focus Trap Pattern (Frontend)**: Reusable class for managing keyboard focus within modals and side menus.
- **External Agent Integration Pattern**: The frontend (`agent1-chatbot-module.js`) interacts with an externally managed chatbot agent ("Alan" via Flowise) for its core intelligence.

## Component Relationships
- `server.js`: Central hub, handles incoming requests, rate limiting, serves static files, and applies security headers.
- `public/`: Contains all frontend assets (HTML, CSS, JS, images, favicons).
    - `public/home.html`: Main landing page.
    - `public/agent1-chatbot-module.js`: Contains the core chatbot logic, responsible for interacting with the external "Alan" agent.
    - `public/page-template.js`: Provides `initPage` function for shared appbar injection.
    - `public/focus-trap.js`: Provides `FocusTrap` class for keyboard accessibility.
    - `public/scripts/`: Other frontend JavaScript logic.
    - `public/styles/styles.css`: Centralized styles for shared UI elements like the appbar.
    - `public/styles/styles_index.css`: Specific styles for home/index pages.
    - `public/boxes.html`: Contains marquee content with `aria-hidden` attributes for accessibility.
- `tests/`: Contains automated tests for UI and accessibility.
- `.editorconfig`: Enforces consistent code style across editors.
- **Flowise/Google Gemini 2.5 Flash (External)**: Provides the core intelligence for the "Alan" chatbot agent, which is accessed by `agent1-chatbot-module.js`.

## Critical Implementation Paths
- **All Incoming Requests**:
    1. Request hits `server.js`.
    2. `Helmet` middleware applies security headers, including CSP.
    3. `express-rate-limit` middleware checks request rate (for specific routes).
    4. If within limits, proceeds to next middleware/route handler.
- **Frontend Page Rendering**:
    1. HTML page loads.
    2. `page-template.js`'s `initPage` function is called to inject the shared appbar.
    3. `styles.css` applies consistent styling to the appbar and other shared elements.
    4. External resources (scripts, styles, fonts) are loaded according to the CSP.
- **Chatbot Interaction**:
    1. User inputs query on the frontend.
    2. `agent1-chatbot-module.js` sends the query to the external "Alan" agent (via Flowise).
    3. The "Alan" agent (powered by Gemini 2.5 Flash) processes the query, applies its role, logic, memory, and security features based on its prompt.
    4. The "Alan" agent generates a response.
    5. `agent1-chatbot-module.js` receives the response and displays it to the user.
- **Modal/Menu Interaction**:
    1. Modal/menu opens.
    2. `FocusTrap` instance is activated, moving focus to the first element.
    3. Tab/Shift+Tab keys cycle focus within the trapped area.
    4. Escape key closes the modal/menu and returns focus to the trigger.
- **Automated Testing Execution**:
    1. `npm test` command is run.
    2. `npm run format` is executed first to ensure code formatting.
    3. Jest executes test files, including accessibility checks for UI elements and API tests for rate limiting, JSON file integrity, and environment variable validation (manual verification for `process.exit` behavior).

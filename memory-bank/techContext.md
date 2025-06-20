<!-- Alan UI - techContext.md | 19th June 2025, WJW -->

# Tech Context

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (vanilla JS)
- **Chatbot Integration**: Flowise (for managing chatbot agents)
- **Large Language Model (LLM)**: Google Gemini 2.5 Flash (30k token agent, static)
- **Chatbot Agent**: "Alan" (managed via Flowise, incorporates role, logic, memory, and security in its prompt)
- **Environment Variables**: `dotenv` package for loading `.env` files.
- **Rate Limiting**: `express-rate-limit`
- **Security Headers**: `helmet` is used for setting various HTTP security headers. Its Content Security Policy (CSP) is configured in `server.cjs` to specify allowed sources for scripts (`scriptSrc`), styles (`styleSrc`), fonts (`fontSrc`), connections (`connectSrc`), images (`imgSrc`), and to manage inline event handlers (`scriptSrcAttr`).
- **Code Formatting**: Prettier (config in `.prettierrc`), EditorConfig (config in `.editorconfig`).
- **Code Quality**: ESLint (v9+ using flat config `eslint.config.js`). Project `package.json` has `"type": "module"`.
- **Testing**: Jest, JSDOM, `eslint-plugin-jest`.
- **Performance**:
    - Deferred script loading (`defer` attribute). Problematic/unnecessary preload links for fonts and favicons were removed from HTML.
    - Consistent viewport meta tags across HTML files (e.g., `user-scalable=no` removed from `home.html` for consistent rendering).
- **UI Consistency**:
    - Centralized CSS (`public/styles/styles.css`) for all shared elements, page-specific layouts, and utility classes. Local styles from HTML pages have been moved here. Common patterns like exam page content use shared classes (e.g., `.exam-content-container`).
    - Fine-tuned padding (e.g., `.chatbot-subtitle`) and font properties (e.g., `.back-arrow` with `!important`) to achieve visually consistent rendered heights in specific emulation environments.
    - **Dynamic Language Loading**: Translations are stored in individual JSON files (`public/translations/`) and loaded on demand, with caching.
- **Error Handling**: Custom 404 page, graceful API error handling.
- **Event Handling**: Refactoring inline event handlers (e.g., `onclick`) to use `element.addEventListener()` in JavaScript for improved CSP compatibility and modern practices (e.g., in `public/home.html`).

## Development Setup
- **Node.js**: Version specified in `package.json` (`engines`) and `.nvmrc` (e.g., `>=20.0.0`).
- **npm**: Package manager for installing dependencies.
- **Environment Variables**: `.env` file for configuration, with critical variables validated at startup. Instructions for setup are in `README.md`.
- **Project Structure**:
    - `server.cjs` (formerly `server.js`): Main server application (CommonJS module), configures `helmet` for CSP, includes 404 route.
    - `generate-hash.cjs` (formerly `generate-hash.js`): Script to generate password hashes (CommonJS module).
    - `eslint.config.js`: ESLint flat configuration file (replaces `.eslintrc.js`).
    - `public/`: Static assets (HTML, CSS, JS, images, favicons).
        - `public/home.html`, `public/index.html`: Main pages with deferred scripts and consistent viewport meta tags. `home.html` now uses `addEventListener` for navigation button event handling. Preload links removed.
        - `public/referral.html`: Example of a sub-page that correctly links to `styles/styles.css` and relies on it for appbar styling.
        - `public/404.html`: Custom 404 page.
        - `public/page-template.js`: Shared appbar logic and coordinates page-level translation updates.
        - `public/focus-trap.js`: Focus trap system for accessibility.
        - `public/scripts/agent1-chatbot-module.js`: Core chatbot logic, integrating with Flowise/Gemini.
        - `public/scripts/index.js`: Handles logic for `index.html`, including onboarding and language selection.
        - `public/scripts/home.js`: Handles logic for `home.html`, including side menu and language selection.
        - `public/scripts/language.js`: Manages current language, uses loader, provides translation functions.
        - `public/scripts/language-loader.js`: Fetches individual language JSON files.
        - `public/translations/`: Directory containing `{langCode}.json` translation files.
        - `public/styles/styles.css`: Main centralized stylesheet for all global, component, page-specific, and utility styles.
        - `public/styles/styles_index.css`: Legacy styles primarily for `index.html` (role may diminish).
    - `user-info.json`, `user-history.json`: JSON data files (ensured to have trailing newlines).
    - `package.json`: Defines project metadata, dependencies, and scripts (including `"type": "module"`).
    - `.prettierrc`: Prettier configuration file.
    - `.editorconfig`: EditorConfig configuration file.
    - `.eslintrc.js`: (Deleted, replaced by `eslint.config.js`).
    - `.nvmrc`: Node Version Manager configuration.
    - `tests/`: Contains automated test files.

## Technical Constraints
- **No Backend Data Storage**: The project does not involve complex backend record storage or external databases; data handling is primarily for chatbot interaction.
- **Single Server File**: All server logic is currently in `server.cjs`, which could become a maintenance challenge as the project grows.
- **No Frontend Framework**: Frontend is intentionally built with vanilla HTML, CSS, and JavaScript. This decision aligns with the project's goal of simplicity and democratizing access, as the system is designed to remain small (one main page and a few sidebar pages) and will not grow significantly in complexity.
- **External Chatbot Agent Dependency**: Reliance on an external Flowise agent (powered by Gemini 2.5 Flash) means the chatbot's performance and availability are dependent on these external services. The prompt engineering and maintenance for the "Alan" agent are handled within Flowise, external to this codebase.

## Dependencies
- `express`: Web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `express-rate-limit`: Middleware for rate limiting.
- `helmet`: Security middleware for setting HTTP headers.
- `eslint`: JavaScript linter for code quality (v9+).
- `@eslint/js`: Official ESLint JavaScript plugin.
- `globals`: For defining global variables in ESLint flat config.
- `eslint-plugin-jest`: ESLint plugin for Jest.
- `jest`: JavaScript testing framework.
- `jsdom`: JavaScript implementation of the DOM and HTML standards.
- `prettier`: Code formatter.
- (Implicit) Flowise client-side integration or API calls from `agent1-chatbot-module.js`.

## Tool Usage Patterns
- **`npm install`**: To set up project dependencies.
- **`node server.cjs`**: To start the server.
- **`npm run format`**: To automatically format code using Prettier.
- **`npm run format:check`**: To check code formatting without writing changes (used in CI/CD).
- **`npm run lint`**: To run ESLint for code quality checks.
- **`npm test`**: To run the full test suite (includes `format:check`).
- **`npx jest tests/ui.test.js`**: To run specific UI/accessibility tests.
- **Flowise UI/API**: For configuring and managing the "Alan" chatbot agent (external to this project's codebase).
- **Cleanup Procedures**: Documented in `README.md` for resetting local data and test artifacts.

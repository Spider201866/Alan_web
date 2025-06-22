<!-- Alan UI - README.md | 19th June 2025, WJW -->

# Project Overview & Recent Updates

---

## Setup & Testing

To set up the project and run the tests:

1. Install dependencies (required for Jest and all other packages):
   ```bash
   npm install
   ```

2. Run the test suite (this command now includes `NODE_OPTIONS=--experimental-vm-modules` for ES Module support in Jest, as defined in `package.json`):
   ```bash
   npm test
   ```

Or, to run a specific test file (e.g., accessibility/UI tests):
   ```bash
   npx jest tests/ui.test.js
   ```

### Test Coverage & Isolation

- All backend, authentication, rate limiting, and one-time password (OTP) logic is covered by automated tests.
- **Server instances for tests are now managed centrally**:
    - A single server instance is used for most API, Rate Limiting, and 404 tests.
    - A separate, isolated server instance is used specifically for OTP logic tests, ensuring a clean environment for sensitive tests.
- This new server management strategy ensures robust test isolation and reliable cleanup of test resources.
- All major user flows, UI elements, and backend logic are covered.
- Accessibility requirements are enforced by automated tests in `ui.test.js`.

---

## Code Formatting

This project uses [Prettier](https://prettier.io/) for consistent code formatting.  
- Configuration is defined in `.prettierrc` at the project root.
- To automatically format all JavaScript, JSON, CSS, and HTML files, run:
  ```
  npm run format
  ```
  (Available in both the root and `Alan_web` directories.)
- To check code quality and identify potential issues, run:
  ```bash
  npm run lint
  ```
- An `.editorconfig` file is also included to enforce consistent indentation and line endings across different editors.

## Security

- **Rate Limiting:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is configured in `server.js` (via the `createApp` factory) and applied to API routes to protect specific API endpoints. Each IP is limited to 100 requests per 15 minutes.
- **Security Headers:** [Helmet](https://helmetjs.github.io/) is used in `server.js` (via the `createApp` factory), with Content Security Policy (CSP) options defined in `config/index.js`. This enhances security against common web vulnerabilities. The CSP is configured to allow necessary external resources (including for Leaflet maps) and inline scripts/styles where appropriate. `X-Content-Type-Options: nosniff` header is also enabled.
- **Environment Variable Validation:** Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup within `config/index.js`.
- **Data Persistence:** User session and history data are now stored in an SQLite database (`alan-data.db` locally, `/data/alan-data.db` in production on Railway) managed by `better-sqlite3`. The old JSON file-based storage (`user-info.json`, `user-history.json`) has been removed.
- **Robots.txt:** A `robots.txt` file is provided in the `public/` directory to control search engine crawling behavior.
- **Sitemap.xml:** A `sitemap.xml` file is provided in the `public/` directory to help search engines discover and crawl important pages.

### Environment Variables (.env)

This project uses environment variables for sensitive information and configuration. A `.env.example` file is provided as a template.

To set up your environment variables:
1. Create a new file named `.env` in the root directory of the project.
2. Copy the contents of `.env.example` into your new `.env` file.
3. Replace the placeholder values with your actual credentials and configurations.

Example `.env.example`:  
```
MASTER_PASSWORD_HASH=your_master_password_hash_here
PASSWORD_SALT=your_password_salt_here
ONE_TIME_PASSWORD_HASHES=
PORT=3000  
```

**Important:** Do not commit your `.env` file to version control. It is already included in `.gitignore`.

## Project Structure

The project is organized as follows. For a complete list of all files, see `folderList.txt`.

```
.
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── compress_and_convert_images_instructions.txt (Note: Manual image optimization process, currently low priority)
├── eslint.config.js (ESLint v9+ configuration)
├── folderList.txt
├── generate-hash.cjs (Note: Renamed from .js, now a CommonJS module)
├── package-lock.json
├── package.json (Note: Includes "type": "module", start script uses `node server.js`)
├── README.md
├── reset-locally-from-github.md
├── server.js (Main application entry point, ES Module, uses app factory pattern)
├── alan-data.db (SQLite database file, created locally if not present. In .gitignore)
├── config/
│   └── index.js (Centralized configuration, including paths and CSP)
├── memory-bank/
│   ├── activeContext.md
│   ├── productContext.md
│   ├── progress.md
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   └── techContext.md
├── middleware/
│   ├── auth.js
│   ├── error.js
│   └── validation.js
├── public/
│   ├── 404.html
│   ├── aboutalan.html
│   ├── atoms.html
│   ├── ear.html
│   ├── eye.html
│   ├── home.html
│   ├── index.html
│   ├── instructions.html
│   ├── muted.html
│   ├── referral.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── skin.html
│   ├── triangle.html
│   ├── view-records.html
│   ├── weblinks.html
│   ├── favicons/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-icon-60x60.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── manifest.json
│   ├── images/
│   │   ├── allergic_conjunctivitis.jpg
│   │   ├── AP.png
│   │   ├── atomsblue.jpg
│   │   ├── bigredt.png
│   │   ├── eyeor.gif
│   │   ├── howtouseeye.png
│   │   ├── iritis.jpg
│   │   ├── lang.jpg
│   │   ├── Q.png
│   │   └── triangle.png
│   ├── scripts/
│   │   ├── agent1-chatbot-module.js
│   │   ├── auth-flow.js (Manages auth & page flow for index.html)
│   │   ├── closer.js
│   │   ├── faviconAndMeta.js
│   │   ├── focus-trap.js
│   │   ├── home.js (Orchestrator for home.html)
│   │   ├── home-data.js (Data operations for home.html)
│   │   ├── home-translator.js (Translation logic for home.html)
│   │   ├── home-ui.js (UI management for home.html)
│   │   ├── index.js (Orchestrator for index.html)
│   │   ├── language.js
│   │   ├── language-loader.js (Handles dynamic loading of translation JSON files)
│   │   ├── listener-module.js
│   │   ├── location-service.js (Location fetching for index.html)
│   │   ├── muted.js
│   │   ├── onboarding-form.js (Form validation for index.html)
│   │   └── page-template.js
│   └── styles/
│       ├── styles_index.css
│       └── styles.css
│   └── translations/ (Contains individual language JSON files e.g. en.json, es.json)
├── routes/
│   ├── api.js
│   └── web.js
├── services/
│   └── data-service.js (Manages SQLite database interactions)
├── tests/
│   ├── .gitkeep
│   ├── api.test.js
│   ├── chatbot.test.js
│   ├── README.md
│   └── ui.test.js
└── vscode-alanui-launcher/
    ├── .vscodeignore
    ├── INSTALLATION_STEPS.md
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── src/
        └── extension.ts
```

---

## Contributing

We welcome contributions to improve the AlanUI Web Chatbot. Please follow these guidelines to ensure a smooth process.

### Running the Project Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Set Up Environment Variables:**
    - Copy the `.env.example` file to a new file named `.env`.
    - Fill in the required variables, such as `MASTER_PASSWORD_HASH` and `PASSWORD_SALT`. You can generate a new hash using the provided script:
      ```bash
      node generate-hash.cjs your_password_here
      ```
3.  **Start the Server:**
    ```bash
    node server.js
    ```
    The application will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### Running Tests

To ensure your changes haven't broken existing functionality, please run the full test suite:
```bash
npm test
```
This command will also check for code formatting and linting issues.

### Submitting Improvements

1.  **Fork the Repository:** Create your own fork of the project on GitHub.
2.  **Create a Branch:** Create a new branch for your feature or bug fix.
3.  **Make Your Changes:** Implement your changes, ensuring you follow the existing code style and patterns.
4.  **Test Your Changes:** Run `npm test` to ensure all tests pass.
5.  **Submit a Pull Request:** Push your changes to your fork and submit a pull request to the main repository. Please provide a clear description of the changes you have made.

---

## CI/CD with GitHub Actions and Railway

This project uses a modern CI/CD setup where GitHub Actions and Railway's native deployment work together.

### Workflow Overview

The process ensures that code is automatically tested before it is deployed:
1.  **Push to GitHub:** When you push a commit to the `main` branch, two things happen simultaneously.
2.  **GitHub Actions (CI):**
    - A workflow defined in `.github/workflows/ci-cd.yml` starts running.
    - Its only job is to run all the tests (`npm test`) in a clean environment.
    - It reports a "pass" (green check) or "fail" (red X) status back to GitHub.
3.  **Railway (CD):**
    - Railway's native GitHub integration sees the new commit.
    - It is configured to **"Wait for CI"**. It will wait until the GitHub Actions test job reports its status.
    - If the test fails, Railway cancels the deployment.
    - If the test passes, Railway begins its own build and deployment process, using your commit message as the deployment name.

This setup provides the best of both worlds: the safety of automated testing from GitHub Actions and the efficient, correctly-named deployments from Railway's native integration.

### Railway Configuration

For this process to work, your Railway service must be configured correctly:
1.  In your Railway service settings, go to the **"Source"** tab.
2.  Connect your GitHub repository and select the `main` branch.
3.  Ensure the **"Wait for CI"** toggle is enabled. This tells Railway to wait for the green check from GitHub Actions before deploying.

### Required GitHub Secrets for Testing

For the GitHub Actions test job to run, you must configure the following secrets in your repository settings under **Settings > Secrets and variables > Actions**:

-   `TEST_MASTER_PASSWORD_HASH`: A mock password hash for the test suite.
-   `TEST_PASSWORD_SALT`: A mock salt for the test suite.
-   `TEST_ONE_TIME_PASSWORD_HASHES`: Mock OTP hashes for the test suite.

---

## Appbar and Page Layout Consistency (June 2025)

### Shared Appbar Pattern

- All main pages now use a **shared appbar** (header with back arrow and page title) injected by the `initPage` function from `public/page-template.js`.
- The appbar, back arrow, and page title are styled **centrally** in `public/styles.css` for full consistency:
  - Font family: `'Calibri Light', Arial, sans-serif`
  - Appbar font size: 16px
  - Back arrow: 32px, bold, white, consistent padding
  - Page title: 24px, normal weight, centered
  - Appbar height and layout are uniform across all pages

### Pages Using the Shared Appbar

The following pages use the shared appbar and are visually/structurally consistent:
- `aboutalan.html`
- `atoms.html`
- `ear.html`
- `eye.html`
- `instructions.html`
- `referral.html`
- `skin.html`
- `weblinks.html`

### Main Content Justification

- The main content of the About Alan, Eye, Ear, and Skin pages uses `text-align: justify;` for edge-to-edge word wrapping.
- The instructions page uses a main content container with reduced top padding for a visually balanced layout.

### No Extraneous Code

- All appbar-related CSS and markup have been removed from individual HTML files.
- Only the shared template and stylesheet are used for the appbar, ensuring maintainability and consistency.

### CSS File Organization

- We will **keep both** `styles.css` and `styles_index.css` in the project.
- This separation makes it easier to understand and maintain styles, and avoids a single "monster" CSS file.
- Use `styles.css` for shared UI elements (like the appbar), all page-specific styles (previously in HTML files), common component styles, and utility classes. `styles_index.css` contains legacy styles primarily for `index.html` and its role may diminish further.

### How to Add a New Page with Appbar

1. Import and call `initPage` from `page-template.js` in your HTML file.
2. Ensure `<link rel="stylesheet" href="styles.css">` is included in the `<head>`.
3. Do **not** add local appbar/back-arrow/pageTitle CSS or markup.
4. For justified main content, use `text-align: justify;` on your main content container.

### Header Height Consistency (June 20, 2025)
- The main header on `public/home.html` (class `.chatbot-header`) and the shared appbar (`#appBar`) on sub-pages are designed to appear visually consistent.
- Due to differences in their content structure and how browsers might render them in specific emulations (e.g., phone screens in Chrome DevTools), fine-tuning was required.
- The `padding-bottom` of the `.chatbot-subtitle` (within `.chatbot-header`) in `public/styles/styles.css` was adjusted to `13.5px`. This ensures that the rendered height of the `home.html` header closely matches the rendered height of the `#appBar` on other pages (observed as ~72px in a specific phone emulation).
- The viewport meta tag in `public/home.html` was also updated to remove `user-scalable=no`, aligning it with other pages and contributing to consistent rendering.
- The `font-family` for the `.back-arrow` in `#appBar` was made explicit with `!important` in `public/styles/styles.css` to ensure consistent arrow rendering.

These micro-adjustments aim for perceptual consistency across different page headers/appbars in various viewing environments.

---

## Dynamic Language Loading System (June 20, 2025)

The application now features a dynamic language loading system to improve performance and maintainability.

- **External JSON Files**: Translations for 22 languages are stored in individual JSON files within the `public/translations/` directory (e.g., `en.json`, `es.json`, `cy.json`).
- **On-Demand Loading**:
    - `public/scripts/language-loader.js` handles fetching these JSON files. It includes an in-memory cache to avoid re-fetching already loaded languages.
    - On initial app load, only the user's preferred language (from `localStorage`) or English (default) is loaded.
    - Other languages are fetched only when selected by the user.
- **Core Language Module (`public/scripts/language.js`)**:
    - This module orchestrates the language system.
    - It imports `loadLanguage` from `language-loader.js`.
    - Provides `setLanguage(langCode)` to change the current language. This function updates `localStorage`, fetches the new translations (via `loadLanguage`), stores them in a global `window.currentTranslations` object, and dispatches a `languageChanged` custom event.
    - Provides `getTranslation(key, fallbackText)` for components to retrieve translated strings.
    - Initializes the language on startup based on `localStorage` or defaults to English.
- **Page Integration (`public/scripts/page-template.js`)**:
    - The `initPage(pageTitleKey, applyPageSpecificTranslationsCallback)` function now uses `getTranslation` for the page title.
    - It listens for the `languageChanged` event to re-translate the page title and call the page-specific translation callback.
- **HTML Page Refactoring**:
    - All HTML pages (`index.html`, `home.html`, `aboutalan.html`, `eye.html`, `ear.html`, `skin.html`, `instructions.html`, `atoms.html`, `referral.html`, `weblinks.html`) have been updated:
        - Removed any embedded `window.translations` script blocks.
        - Their respective JavaScript logic now imports `getTranslation` and uses it within their `applyPageSpecificTranslations` (or equivalent) functions.
        - Calls to `initPage` now use translation keys for titles.
- **UI Controls Updated**:
    - Language selection UI in `public/index.html` (via `scripts/index.js`) and `public/home.html` (via `scripts/home.js`) now correctly call `setLanguage` to trigger the new system.
- **Error Handling**: The loader includes basic fallback to English if a selected language file is not found or fails to load.
- **Module Usage**: `public/index.html`'s main script tag (`scripts/index.js`) was updated to `type="module"` to support `import` statements.

This refactor significantly improves the previous system of embedding all translations in a single large JavaScript file.

---

## Keyboard Accessibility: Focus Trap

A reusable focus trap system is implemented for all modals and side menus to ensure keyboard users can navigate the app efficiently.

- The `public/focus-trap.js` module provides a `FocusTrap` class.
- This is used in `home.js` to trap focus within the user info popup and the side menu when they are open.
- The trap:
  - Moves focus to the first focusable element when the modal/menu opens.
  - Cycles focus with Tab/Shift+Tab within the modal/menu.
  - Closes the modal/menu with Escape and returns focus to the trigger.
- To use for new modals, instantiate `new FocusTrap(yourModalElement)` and call `.activate()`/`.deactivate()` on open/close.

This feature significantly improves accessibility and user experience for keyboard and assistive technology users.

---

## Accessibility

### Marquee Content

- All duplicated marquee content (used for seamless scrolling) in `boxes.html` must have `aria-hidden="true"` on the duplicated elements (IDs ending in "b"). This ensures screen readers do not read the same content twice.

### Icon-only Buttons

- All icon-only buttons (buttons with no visible text, only an icon or image) must have an appropriate `aria-label` attribute describing their action. This applies to language selection, clear history, and similar buttons in `home.html`, `index.html`, and elsewhere.
- Navigation buttons like "Eye," "Ear," "Skin," "Tools," "Videos," and "Atoms" in `home.html` now have explicit `aria-label` attributes to clarify their purpose for screen readers.

### "Skip to Content" Link

- A "skip to content" link is implemented in `home.html` and styled in `styles.css` to allow keyboard users and screen readers to bypass repetitive navigation and jump directly to the main content.

## Performance Optimizations

- **Lazy Loading Images/Iframes:** `loading="lazy"` attribute is applied to offscreen images (e.g., logos in `index.html`, `eyeor.gif` in `home.html`) and iframes (e.g., `triangleFrame` in `index.html`) to defer their loading until they are near the viewport, improving initial page load times.
- **Favicon Preload:** A `<link rel="preload" as="image">` tag is used for the favicon in `home.html` to ensure it loads as early as possible.
- **Font Preload:** Google Fonts are preloaded using `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `home.html` and `index.html` to reduce Flash of Unstyled Text (FOUT).
- **Deferred Script Loading:** The `defer` attribute is added to external `<script>` tags in `home.html` and `index.html` to prevent render-blocking, allowing HTML parsing to continue while scripts download in the background.

---

## Accessibility Testing

Automated accessibility tests are included in `tests/ui.test.js` to enforce these requirements.

- **Marquee Accessibility:** Tests verify that all duplicated marquee elements in `boxes.html` have `aria-hidden="true"`.
- **Icon-only Button Accessibility:** Tests verify that all icon-only buttons in `home.html` and `index.html` have the correct `aria-label` attributes.

### Running the Accessibility Tests

To run the accessibility and UI tests:

```bash
npx jest tests/ui.test.js
```

These tests use [Jest](https://jestjs.io/) and [jsdom](https://github.com/jsdom/jsdom). Make sure both are installed in your project dependencies.

---

## Cleanup & Reset

To reset local data or clean up test files:

- **Resetting User Data:** User data is now stored in an SQLite database.
    - **Locally:** Delete `alan-data.db` from the project root. It will be recreated on the next server startup.
    - **Test Environment:** The `test-alan-data.db` file is now reliably deleted by the automated test suite's global `afterAll` hook after all tests complete.
    - **Production (Railway):** Data is stored on a persistent volume (`/data/alan-data.db`). Resetting this would typically involve accessing the volume directly or implementing a specific API endpoint for data clearing (not currently implemented).
- **Resetting One-Time Passwords:** One-time passwords are managed in the `.env` file. To reset them, modify the `ONE_TIME_PASSWORD_HASHES` variable in your `.env` file.
- **Cleaning Test Artifacts:** The automated test suite now reliably cleans up `test-alan-data.db` and other temporary resources.

---

## Troubleshooting

### Persistent Content Security Policy (CSP) / Font Loading Errors (June 2025)

**Symptoms:**
- Browser console shows errors like "Refused to load the font '<URL>' because it violates the following Content Security Policy directive: 'font-src 'self' <URL>'" or "Refused to connect to '<URL>' because it violates ... 'connect-src'..."
- These errors persist even after:
    - Verifying `config/index.js` (for `cspOptions`) and `server.js` (for applying Helmet) have the correct CSP directives.
    - Removing problematic `<link rel="preload">` tags from HTML files (`index.html`, `home.html`).
    - Forcefully restarting the Node.js server (`node server.js`).
    - Performing thorough browser cache clearing (including unregistering service workers, clearing all site data for `localhost:3000`, disabling cache in network tools).
    - Testing in a new Incognito/Private window or even a different browser.

**Diagnosis & Resolution:**
This highly persistent issue indicates that the browser is receiving an outdated CSP header, or the Node.js server process is not serving the latest version of the configuration/server code despite restarts.

1.  **Verify Server-Side CSP**: The `cspOptions` object in `config/index.js` should define the correct domains. `server.js` then applies these options via `app.use(helmet(configToUse.cspOptions));` within the `createApp` function. Example snippet from `config/index.js`:
    ```javascript
    // Inside config/index.js
    const cspOptions = {
      contentSecurityPolicy: {
        directives: {
          // ... other directives
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
          connectSrc: [
            "'self'",
            'https://alan.up.railway.app',
            'https://ipapi.co',
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com',
            'https://fonts.googleapis.com',
            'https://flowiseai-railway-production-fecf.up.railway.app',
            'https://api.bigdatacloud.net',
          ],
          // ... other directives
        },
      },
      scriptSrcAttr: ["'unsafe-inline'"],
      noSniff: true,
    };
    // This cspOptions object is then part of the default export.
    ```
2.  **Ensure Server is Running Latest Code**: The most critical step is to ensure the Node.js server process is *actually* running the latest saved versions of `server.js` and `config/index.js`. Standard restarts might not be sufficient if an old process is lingering.
    - **CRITICAL: Use `taskkill /F /IM node.exe /T` (Windows) or `pkill -f node` / `killall node` (macOS/Linux) to FORCEFULLY TERMINATE ALL Node.js processes before restarting the server (`node server.js`). Standard restarts (e.g., Ctrl+C in the terminal and rerunning `node server.js`) MAY NOT BE SUFFICIENT if a stale process is lingering.**
3.  **Thorough Browser Cache Annihilation**:
    - Close ALL browser windows/tabs related to `localhost:3000`.
    - Restart your browser completely.
    - Open Developer Tools (F12) -> Application tab -> Service Workers -> Unregister ALL for `localhost:3000`.
    - Application tab -> Storage -> Clear site data for `localhost:3000`.
    - Network tab -> Check "Disable cache".
    - Open `http://localhost:3000/` in a **new Incognito/Private window**.
4.  **Inspect HTTP Headers**: If issues persist, in the Incognito window's Developer Tools (Network tab), load `http://localhost:3000/`. Click on the very first request (e.g., `localhost` or `index.html`). Go to the "Response Headers" section and verify the `Content-Security-Policy` header being sent by the server matches the configuration in `config/index.js`.

If the browser *still* reports an outdated CSP in the console logs, it points to an issue where the server process itself is not reflecting the file changes on disk, or a very stubborn browser cache.
    - **Refactoring Inline Event Handlers**: For "Refused to execute inline event handler" errors (often due to `script-src-attr 'none'`), refactoring HTML elements with `onclick="..."` attributes to use `element.addEventListener('click', ...)` in JavaScript is a robust solution. This was done for `public/home.html`.
    - **Final CSP configuration is in `config/index.js` (as of June 20, 2025)**.

This combination of server-side CSP configuration (now in `config/index.js`), HTML refactoring, and client-side cache clearing ultimately resolved the issues.

### Deployment: SQLite Path on Railway

**Symptom:**
- The application fails to start or crashes on Railway with an error related to `better-sqlite3` and being unable to open the database file, often mentioning a path like `/app/alan-data.db`.

**Diagnosis & Resolution:**
- Railway uses ephemeral filesystems. Any files written to the standard project directory (`/app`) will be lost on restart or redeployment. For persistent data like an SQLite database, you must use a **persistent volume**.
- The application is configured in `services/data-service.js` to use `/data/alan-data.db` when `NODE_ENV` is set to `production`.

**Steps to Fix:**
1.  **Add a Volume in Railway:**
    - In your Railway project settings, go to the "Volumes" tab.
    - Add a new volume and set the "Mount Path" to `/data`.
2.  **Set `NODE_ENV`:**
    - In your Railway service settings, go to the "Variables" tab.
    - Ensure you have a variable named `NODE_ENV` with the value `production`.
3.  **Redeploy:**
    - Trigger a new deployment.

With these settings, `data-service.js` will correctly point to the persistent volume at `/data/alan-data.db`, and the database will persist across deployments.

---

## API Endpoint Usage

- **Local API Endpoints**: The application primarily uses its own backend API endpoints, prefixed with `/api/`.
    - `/api/record-info`: Used for submitting user onboarding data and subsequent updates from the home page. Data is now persisted to the SQLite database. Client-side calls in `public/scripts/home-data.js` and `public/scripts/auth-flow.js` target this local endpoint.
    - `/api/fetch-records`: Used for password verification and fetching the active record from the SQLite database. Client-side calls in `public/scripts/auth-flow.js` and `public/view-records.html` target this local endpoint.
    - `/api/fetch-history`: Used for fetching all historical records from the SQLite database. Client-side calls in `public/view-records.html` target this local endpoint.
- Other external APIs are used for specific functionalities:
    - `https://ipapi.co/json/`: For IP-based geolocation.
    - `https://api.bigdatacloud.net/data/reverse-geocode-client`: For reverse geocoding.
    - Flowise endpoint (configured externally): For chatbot interactions.

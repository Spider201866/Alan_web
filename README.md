<!-- Alan UI - README.md | 19th June 2025, WJW -->

# Project Overview & Recent Updates

---

## Setup & Testing

To set up the project and run the tests:

1. Install dependencies (required for Jest and all other packages):
   ```bash
   npm install
   ```

2. Run the test suite:
   ```bash
   npm test
   ```

Or, to run a specific test file (e.g., accessibility/UI tests):
   ```bash
   npx jest tests/ui.test.js
   ```

### Test Coverage & Isolation

- All backend, authentication, rate limiting, and one-time password (OTP) logic is covered by automated tests.
- OTP and rate limiting tests are fully isolated in their own temp directories and server instances to prevent data pollution between suites.
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

- **Rate Limiting:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is used in `server.js` to protect specific API endpoints from excessive or abusive requests. Each IP is limited to 100 requests per 15 minutes, helping prevent basic denial-of-service attacks and abuse.
- **Security Headers:** [Helmet](https://helmetjs.github.io/) is used in `server.js` to set various HTTP response headers, enhancing the application's security against common web vulnerabilities like XSS, clickjacking, and insecure connections. The Content Security Policy (CSP) is configured to allow necessary external resources (CDNs, Flowise backend, IP API) and inline scripts/styles. `X-Content-Type-Options: nosniff` header is also enabled to prevent MIME-sniffing.
- **Environment Variable Validation:** Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup in `server.js` to prevent the server from running with missing credentials.
- **JSON File Integrity:** JSON data files (`user-info.json`, `user-history.json`) are ensured to have a trailing newline character for improved compatibility with various tools.
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
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── compress_and_convert_images_instructions.txt
├── folderList.txt
├── generate-hash.js
├── package-lock.json
├── package.json
├── README.md
├── reset-locally-from-github.md
├── server.js
├── user-history.json
├── user-info.json
├── memory-bank/
│   ├── activeContext.md
│   ├── productContext.md
│   ├── progress.md
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   └── techContext.md
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
│   │   ├── closer.js
│   │   ├── faviconAndMeta.js
│   │   ├── focus-trap.js
│   │   ├── home.js
│   │   ├── index.js
│   │   ├── language.js
│   │   ├── listener-module.js
│   │   ├── muted.js
│   │   └── page-template.js
│   └── styles/
│       ├── styles_index.css
│       └── styles.css
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
- Use `styles.css` for shared UI elements (like the appbar) and `styles_index.css` for home/index-specific or other specialized styles.

### How to Add a New Page with Appbar

1. Import and call `initPage` from `page-template.js` in your HTML file.
2. Ensure `<link rel="stylesheet" href="styles.css">` is included in the `<head>`.
3. Do **not** add local appbar/back-arrow/pageTitle CSS or markup.
4. For justified main content, use `text-align: justify;` on your main content container.

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

- **Resetting User Data:** To clear `user-info.json` and `user-history.json` (used by the legacy record server), you can simply delete these files from the project root. They will be recreated as empty files on the next server startup or data submission.
- **Resetting One-Time Passwords:** One-time passwords are managed in the `.env` file. To reset them, modify the `ONE_TIME_PASSWORD_HASHES` variable in your `.env` file.
- **Cleaning Test Artifacts:** Automated tests are designed to clean up after themselves. If any temporary test files persist, they are typically located in `tests/temp/` and can be safely deleted.

---

## Troubleshooting

### Persistent Content Security Policy (CSP) / Font Loading Errors (June 2025)

**Symptoms:**
- Browser console shows errors like "Refused to load the font '<URL>' because it violates the following Content Security Policy directive: 'font-src 'self' <URL>'" or "Refused to connect to '<URL>' because it violates ... 'connect-src'..."
- These errors persist even after:
    - Verifying `server.js` has the correct CSP directives (e.g., `fontSrc` includes `https://fonts.gstatic.com` and `https://cdnjs.cloudflare.com`, `connectSrc` includes necessary API endpoints).
    - Removing problematic `<link rel="preload">` tags from HTML files (`index.html`, `home.html`).
    - Forcefully restarting the Node.js server.
    - Performing thorough browser cache clearing (including unregistering service workers, clearing all site data for `localhost:3000`, disabling cache in network tools).
    - Testing in a new Incognito/Private window or even a different browser.

**Diagnosis & Resolution:**
This highly persistent issue indicates that the browser is receiving an outdated CSP header, or the Node.js server process is not serving the latest version of `server.js` despite restarts.

1.  **Verify Server-Side CSP**: The `server.js` file should have the correct domains in the `helmet` configuration. For example:
    ```javascript
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            // ... other directives
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com', '*'], // Wildcard '*' was added as a final diagnostic step.
            connectSrc: [
              "'self'",
              'https://alan.up.railway.app',
              'https://ipapi.co',
              'https://cdn.jsdelivr.net',
              'https://cdnjs.cloudflare.com',
              'https://fonts.googleapis.com',
              'https://flowiseai-railway-production-fecf.up.railway.app',
            ],
            // ... other directives
          },
        },
      })
    );
    ```
2.  **Ensure Server is Running Latest Code**: The most critical step is to ensure the Node.js server process is *actually* running the latest saved version of `server.js`. Standard restarts might not be sufficient if an old process is lingering.
    - Use `taskkill /F /IM node.exe /T` (Windows) or `pkill -f node` / `killall node` (macOS/Linux) to forcefully terminate all Node.js processes before restarting the server (`node server.js`).
3.  **Thorough Browser Cache Annihilation**:
    - Close ALL browser windows/tabs related to `localhost:3000`.
    - Restart your browser completely.
    - Open Developer Tools (F12) -> Application tab -> Service Workers -> Unregister ALL for `localhost:3000`.
    - Application tab -> Storage -> Clear site data for `localhost:3000`.
    - Network tab -> Check "Disable cache".
    - Open `http://localhost:3000/` in a **new Incognito/Private window**.
4.  **Inspect HTTP Headers**: If issues persist, in the Incognito window's Developer Tools (Network tab), load `http://localhost:3000/`. Click on the very first request (e.g., `localhost` or `index.html`). Go to the "Response Headers" section and verify the `Content-Security-Policy` header being sent by the server matches the configuration in `server.js`.

If the browser *still* reports an outdated CSP in the console logs (e.g., `font-src` missing `https://cdnjs.cloudflare.com` or the wildcard `*`, or `script-src-attr 'none'` when `'unsafe-inline'` is expected), it points to an issue where the server process itself is not reflecting the file changes on disk, or a very stubborn browser cache. The wildcard `*` in `fontSrc` was added as a last resort for font loading and proved effective.
    - **Refactoring Inline Event Handlers**: For "Refused to execute inline event handler" errors (often due to `script-src-attr 'none'`), refactoring HTML elements with `onclick="..."` attributes to use `element.addEventListener('click', ...)` in JavaScript is a robust solution. This was done for `public/home.html`.
    - **Final `server.js` CSP state (as of June 19, 2025)**:
      ```javascript
      app.use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: [
                "'self'",
                'https://cdn.jsdelivr.net',
                'https://alan.up.railway.app',
                'https://ipapi.co',
                'https://cdnjs.cloudflare.com',
                "'unsafe-inline'", // For inline <script> tags and fallback for event handlers
              ],
              styleSrc: [
                "'self'",
                'https://cdnjs.cloudflare.com',
                'https://fonts.googleapis.com',
                "'unsafe-inline'",
              ],
              fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'], // Wildcard removed after fixing other issues
              imgSrc: ["'self'", 'data:'],
              connectSrc: [
                "'self'",
                'https://alan.up.railway.app',
                'https://ipapi.co',
                'https://cdn.jsdelivr.net',
                'https://cdnjs.cloudflare.com',
                'https://fonts.googleapis.com',
                'https://flowiseai-railway-production-fecf.up.railway.app',
              ],
            },
          },
          scriptSrcAttr: ["'unsafe-inline'"], // Explicitly allows inline event attributes like onclick
          noSniff: true,
        })
      );
      ```
This combination of server-side CSP configuration, HTML refactoring, and client-side cache clearing ultimately resolved the issues.

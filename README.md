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
- An `.editorconfig` file is also included to enforce consistent indentation and line endings across different editors.

## Security

- **Rate Limiting:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is used in `server.js` to protect specific API endpoints from excessive or abusive requests. Each IP is limited to 100 requests per 15 minutes, helping prevent basic denial-of-service attacks and abuse.
- **Security Headers:** [Helmet](https://helmetjs.github.io/) is used in `server.js` to set various HTTP response headers, enhancing the application's security against common web vulnerabilities like XSS, clickjacking, and insecure connections. The Content Security Policy (CSP) is configured to allow necessary external resources (CDNs, Flowise backend, IP API) and inline scripts/styles.
- **Environment Variable Validation:** Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup in `server.js` to prevent the server from running with missing credentials.
- **JSON File Integrity:** JSON data files (`user-info.json`, `user-history.json`) are ensured to have a trailing newline character for improved compatibility with various tools.

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

The main public directory is organized as follows:
```
aboutalan.html
atoms.html
ear.html
eye.html
home.html
index.html
instructions.html
muted.html
referral.html
skin.html
triangle.html
view-records.html
weblinks.html
favicons/
  favicons/android-chrome-192x192.png
  favicons/android-chrome-512x512.png
  favicons/apple-icon-60x60.png
  favicons/apple-touch-icon.png
  favicons/favicon-16x16.png
  favicons/favicon-32x32.png
  favicons/manifest.json
images/
  images/allergic_conjunctivitis.jpg
  images/AP.png
  images/atomsblue.jpg
  images/bigredt.png
  images/eyeor.gif
  images/howtouseeye.png
  images/iritis.jpg
  images/lang.jpg
  images/Q.png
  images/triangle.png
scripts/
  scripts/agent1-chatbot-module.js
  scripts/closer.js
  scripts/faviconAndMeta.js
  scripts/focus-trap.js
  scripts/home.js
  scripts/index.js
  scripts/language.js
  scripts/listener-module.js
  scripts/muted.js
  scripts/page-template.js
styles/
  styles/styles_index.css
  styles/styles.css
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

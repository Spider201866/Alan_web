<!-- Alan UI - tests/README.md | 19th June 2025, WJW -->

# Alan Webapp Test Suite

## Formatting

All test files (and the rest of the codebase) are formatted using [Prettier](https://prettier.io/) for consistency.
- To automatically format all test files, run:
  ```bash
  npm run format
  ```
  (Available from the project root.)
- To check formatting without writing changes (useful for CI/CD pipelines), run:
  ```bash
  npm run format:check
  ```

---

This folder contains automated tests for the Alan webapp, covering backend API, frontend chatbot logic, and UI/UX integration.

## Structure

- `api.test.js` — Backend API, authentication (legacy), rate limiting, and helper function tests (Jest + Supertest)
  - Isolated test data (no pollution of real files; rate limiting tests use separate temp directories and server instances for full isolation)
  - **Tests:**
    1. Accepts a valid record and writes to user-info.json and user-history.json (legacy)
    2. Rejects invalid records (legacy)
    3. Rejects requests with invalid password (/fetch-records) (legacy)
    4. Accepts valid password and returns user-info.json (legacy)
    5. Requires a valid password (/fetch-history) (legacy)
    6. `readJsonFile` returns `[]` for missing file (legacy)
    7. `appendToHistory` can be called with a record (legacy)
    8. Rate limiting: returns 429 after exceeding allowed requests
    9. One-Time Password (OTP) logic (legacy):
       - Accepts a valid OTP for /fetch-records (single-use)
       - Rejects reuse of an OTP
       - Rejects invalid, empty, or malformed OTPs
    10. All major authentication (legacy), rate limiting, and edge case flows are covered
    11. Verifies JSON files (`user-info.json`, `user-history.json`) are written with a trailing newline.
    12. Confirms `body-parser` is no longer a dependency and `express.json()` is used.
    13. Returns 404 for unknown routes, serving the custom 404 page.
    (Note: The server has critical checks at startup to ensure important settings like `MASTER_PASSWORD_HASH` and `PASSWORD_SALT` are present. If they're missing, the server is designed to stop immediately. Automating tests for this specific "server-stopping" behavior is complex in our current test setup. Therefore, these critical startup checks should be **manually verified** by developers when setting up or deploying the server, by intentionally trying to run it without these settings to confirm it exits as expected.)

- `chatbot.test.js` — Frontend chatbot and sidebar logic (Jest + jsdom)
  - **Tests:**
    1. Deduplicates and truncates chat history
    2. Persists chat history to localStorage
    3. Restores chat history from localStorage
    4. Updates sidebar when new chatbot message arrives

- `ui.test.js` — UI/UX integration and user flow tests (Jest + jsdom)
  - **Tests:**
    1. Toggles the side menu when menu icon is clicked
    2. Shows and hides language dropdown
    3. Updates all UI fields for each language selection (covers all fields for each language)
    4. Updates translations on language change
    5. Opens and closes the user info popup
    6. Handles geolocation button click
    7. Shows the sliding boxes iframe
    8. Shows buttons below the chatbox entry
    9. Opens and closes the popup and updates geolocation info
    10. Shows sidebar and all navigation buttons, simulates back arrow/page navigation
    11. Shows all navigation and language links/buttons
    12. Shows splash screen on load and auto-hide after timeout
    13. Shows the logo and footer
    14. Animates Alan logo spin on greeting
    15. Shows Good History and Examine Well text
    16. Includes the user name in the greeting
    17. Triggers Images, Help, Screenshot, and Refer button actions
    18. Shows password entry UI and accepts input
    19. Shows onboarding screen and accepts user details
    20. Shows popup with correct user info from localStorage
    21. **Accessibility:**
        - Verifies all duplicated marquee elements in `boxes.html` (IDs ending in "b") have `aria-hidden="true"`.
        - Verifies all icon-only buttons in `home.html` and `index.html` have the correct `aria-label` attributes.
        - Has a "skip to content" link that targets the main content and becomes visible on focus.
    22. **API Error Handling:**
        - Displays an error message if IP-based location data is unavailable.
        - Displays an error message if fetching IP-based location fails.

## Setup

1. **Install dependencies (from project root):**
   ```bash
   npm install
   ```
   (This will install `jest`, `supertest`, `jsdom`, `eslint`, and `prettier` as dev dependencies.)

2. **Node.js Version:**
   - Ensure you are using Node.js version 20.0.0 or higher. You can use `nvm` (Node Version Manager) and `nvm use` in the project root, as specified in the `.nvmrc` file.

## Running Tests

- To run all tests in detail (recommended):
  ```bash
  npm test
  ```
  (This script also runs `format:check` before executing tests.)
- To run a specific test file:
  ```bash
  npx jest tests/api.test.js
  npx jest tests/chatbot.test.js
  npx jest tests/ui.test.js
  ```
- To run ESLint for code quality checks:
  ```bash
  npm run lint
  ```

## Notes

- Backend tests use a temporary directory for all data, so your real files are never touched.
- Rate limiting tests are fully isolated in their own temp directories and server instances to prevent data pollution between suites.
- Frontend and UI tests use jsdom to simulate the DOM and localStorage.
- All major user flows, UI elements, rate limiting, and backend logic are covered. Legacy authentication and record handling tests are still present but noted as such.
- **Accessibility requirements are enforced by automated tests in `ui.test.js`.**
- For full browser/E2E automation, consider Playwright or Cypress.

## Expanding the Suite

- Add more tests for edge cases, error handling, and new features as you develop.
- Keep tests in sync with your codebase for best results.
- Consider adding tests for rate limiting and other security middleware if your use case requires it.

---

<!-- Alan UI - tests/README.md | 19th June 2025, WJW -->

# Alan Webapp Test Suite

## Formatting

All test files (and the rest of the codebase) are formatted using [Prettier](https://prettier.io/) for consistency.
- To automatically format all test files, run:
  ```
  npm run format
  ```
  (Available in both the root and `Alan_web` directories.)

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
    4. Opens and closes the user info popup
    5. Handles geolocation button click
    6. Shows the sliding boxes iframe
    7. Shows buttons below the chatbox entry
    8. Opens and closes the popup and updates geolocation info
    9. Shows sidebar and all navigation buttons, simulates back arrow/page navigation
    10. Shows all navigation and language links/buttons
    11. Shows splash screen on load and auto-hide after timeout
    12. Shows the logo and footer
    13. Animates Alan logo spin on greeting
    14. Shows Good History and Examine Well text
    15. Includes the user name in the greeting
    16. Triggers Images, Help, Screenshot, and Refer button actions
    17. Shows password entry UI and accepts input
    18. Shows onboarding screen and accepts user details
    19. Shows popup with correct user info from localStorage
    20. **Accessibility:**
        - Verifies all duplicated marquee elements in `boxes.html` (IDs ending in "b") have `aria-hidden="true"`.
        - Verifies all icon-only buttons in `home.html` and `index.html` have the correct `aria-label` attributes.

## Setup

1. **Install dependencies (from project root):**
   ```bash
   npm install --save-dev jest supertest jsdom
   ```

2. **(Optional) Add a test script to your package.json:**
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

## Running Tests

- To run all tests in detail (recommended):
  ```bash
  npx jest --verbose
  ```
- To run a specific test file:
  ```bash
  npx jest --verbose tests/api.test.js
  npx jest --verbose tests/chatbot.test.js
  npx jest --verbose tests/ui.test.js
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

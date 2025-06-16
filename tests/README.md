# Alan Webapp Test Suite

This folder contains automated tests for the Alan webapp, covering backend API, frontend chatbot logic, and UI/UX integration.

## Structure

- `api.test.js` — Backend API and helper function tests (Jest + Supertest)
  - Isolated test data (no pollution of real files)
  - **Tests:**
    1. Accepts a valid record and writes to user-info.json and user-history.json
    2. Rejects invalid records
    3. Rejects requests with invalid password (/fetch-records)
    4. Accepts valid password and returns user-info.json
    5. Requires a valid password (/fetch-history)
    6. readJsonFile returns [] for missing file
    7. appendToHistory can be called with a record

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
- Frontend and UI tests use jsdom to simulate the DOM and localStorage.
- All major user flows, UI elements, and backend logic are covered.
- For full browser/E2E automation, consider Playwright or Cypress.

## Expanding the Suite

- Add more tests for edge cases, error handling, and new features as you develop.
- Keep tests in sync with your codebase for best results.

---

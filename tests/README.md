# Alan Webapp Test Suite

This directory contains all automated tests for the AlanUI project.

## Running Tests

-   **Run all tests (including formatting, translation, and accessibility checks):**
    ```bash
    npm test
    ```
-   **Run a specific test file or directory:**
    ```bash
    npm test -- tests/api/auth.test.js
    npm test -- tests/ui/
    ```

## Test Structure

The test suite is divided into two main projects, defined in `jest.config.cjs`:

-   **`api`**: Backend tests that run in a Node.js environment.
-   **`ui`**: Frontend tests that run in a JSDOM environment to simulate a browser.

Tests are further broken down by function.

### API Tests (`tests/api/`)

-   **`auth.test.js`**: Tests authentication, including master password and One-Time Password (OTP) logic.
-   **`endpoints.test.js`**: Tests the functionality of core API endpoints like `/api/record-info` and `/api/fetch-history`.
-   **`security.test.js`**: Tests security features like headers and rate limiting.
-   **`cors.test.js`**: Contains specific tests for the CORS middleware.
-   **`validation.test.js`**: Tests the request body validation middleware.
-   **`build.test.js`**: Tests the production build process (`npm run build`).
-   **`helpers/test-server.js`**: A shared helper to create and tear down test server instances for API tests.
-   **`teardown.mjs`**: A global teardown script that runs once after all API tests to clean up the test database.

### UI Tests (`tests/ui/`)

-   **`accessibility.test.js`**: Contains tests for specific accessibility features like ARIA attributes and "skip to content" links.
-   **`i18n.test.js`**: Tests internationalization features, ensuring UI text is updated correctly on language change.
-   **`interaction.test.js`**: Tests general user interactions like showing/hiding elements, form submissions, and error handling.
-   **`chatbot.test.js`**: Contains tests related to the chatbot frontend module.
-   **`view-records.test.js`**: Tests the functionality of the "View Records" page.
-   **`helpers/setup.js`**: A shared helper that creates and tears down a JSDOM environment for all UI tests.

## Automated Accessibility Checks

As part of the main `npm test` command, a script (`scripts/test-a11y.js`) runs `axe-core` on all built HTML files. This acts as a CI gate to prevent basic accessibility regressions from being merged.

<!-- Alan UI - tests/README.md | 20th June 2025, WJW -->

# Alan Webapp Test Suite

This directory contains automated tests for the Alan UI web application.

## Running Tests

-   **Run all tests (including formatting checks and translation checks):**
    ```bash
    npm test
    ```
    This command is defined in `package.json` and uses `jest --verbose` with appropriate Node options for ES Module support.

-   **Run a specific test file (e.g., API tests):**
    ```bash
    npx jest tests/api.test.js --verbose
    ```
    (Or `tests/ui.test.js`, `tests/chatbot.test.js`)

## Test Environment

-   Tests are configured to run with `NODE_ENV=test`.
-   For API tests (`tests/api.test.js`), this ensures that `services/data-service.js` uses a dedicated test database (`test-alan-data.db`) which is created in the project root and cleaned up after tests.
-   Environment variables for testing (e.g., `MASTER_PASSWORD_HASH`, `PASSWORD_SALT`, `ONE_TIME_PASSWORD_HASHES`) are set programmatically within the test files (primarily `tests/api.test.js`) to ensure isolated and predictable test runs. Original environment variables are restored after tests.

## Test Suite Structure & Reliability

-   The test suite now uses a centralized server management pattern for all API, Rate Limiting, and 404 tests, with a single server instance shared across these suites.
-   The OTP logic tests use a separate, isolated server instance to ensure a clean environment for sensitive tests.
-   All server instances are gracefully shut down in their respective `afterAll` hooks, and the global `afterAll` reliably closes the database connection and deletes the test database file.
-   This approach eliminates the EBUSY error and ensures robust test isolation and cleanup.
-   All tests (API, UI, and chatbot) are now passing.

## Test Files

### 1. `tests/api.test.js`

-   **Purpose**: Tests backend API endpoints, authentication, rate limiting, and data persistence logic.
-   **Key Features Tested**:
    -   `/api/record-info`: Valid record submission, invalid record rejection, data storage in SQLite, and upsert logic (refresh count).
    -   `/api/fetch-records`: Password validation (master and OTP), fetching active records from SQLite.
    -   `/api/fetch-history`: Password validation, fetching full history from SQLite, correct ordering.
    -   Rate limiting on API endpoints.
    -   One-Time Password (OTP) generation, usage, and invalidation.
    -   404 handling for unknown API routes.
-   **Setup & Teardown**:
    -   Uses `supertest` for HTTP requests.
    -   Uses a single server instance for all API, Rate Limiting, and 404 tests, and a separate server instance for OTP logic tests.
    -   All server instances are gracefully shut down in their respective `afterAll` hooks.
    -   The `test-alan-data.db` SQLite database is used. Tables are cleared before each test in the main API suite (`beforeEach`) to ensure isolation.
    -   A global `afterAll` hook closes the test database connection and attempts to delete the `test-alan-data.db` file. This approach eliminates the EBUSY error and ensures robust test isolation and cleanup. All tests (API, UI, and chatbot) are now passing.

### 2. `tests/ui.test.js`

-   **Purpose**: Tests frontend UI elements, accessibility features, and basic page interactions.
-   **Key Features Tested**:
    -   Accessibility of marquee content (`aria-hidden`).
    -   Accessibility of icon-only buttons (`aria-label`).
    -   Presence and functionality of "skip to content" links.
    -   Correct rendering of shared appbar and page titles.
    -   Basic UI interactions and element presence on key pages.
-   **Setup**: Uses `jsdom` to simulate a browser environment for testing static HTML files.

### 3. `tests/chatbot.test.js`

-   **Purpose**: Contains placeholder or basic tests related to the chatbot interaction module. (Further development might be needed here depending on how testable the external Flowise integration is).

## Code Formatting & Quality

-   All test files (and the rest of the codebase) are formatted using [Prettier](https://prettier.io/).
    -   Run `npm run format` to automatically format files.
    -   Run `npm run format:check` (part of `npm test`) to check formatting.
-   ESLint is used for code quality, configured via `eslint.config.js`.
    -   Run `npm run lint` to check for linting issues.

## Dependencies

-   [Jest](https://jestjs.io/): JavaScript testing framework.
-   [supertest](https://github.com/ladjs/supertest): HTTP assertion library for testing Node.js HTTP servers.
-   [jsdom](https://github.com/jsdom/jsdom): A JavaScript implementation of many web standards, for use with Node.js (used in `ui.test.js`).

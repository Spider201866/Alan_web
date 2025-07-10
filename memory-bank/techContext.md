<!-- Alan UI - techContext.md | 10th July 2025, WJW -->

# Technology Stack and Tooling

This document provides a detailed overview of the technologies dependencies and tools used in this project.

---

## Core Technologies

-   **Backend**: Node.js (`20.x`) with the Express.js framework for routing and middleware.
-   **Frontend**: Vanilla HTML CSS and JavaScript (ES Modules). No frontend frameworks are used to ensure maximum performance and simplicity.
-   **Database**: SQLite, accessed via the `better-sqlite3` library for synchronous and straightforward database operations.
-   **Chatbot Integration**: The application communicates with an external Flowise instance which orchestrates a Google Gemini 2.5 Flash Large Language Model.
-   **Geolocation**: User location data is gathered using the `ipinfo.io` service.
-   **Mapping**: Interactive maps are rendered using the Leaflet.js library with map tiles provided by OpenStreetMap.

---

## PWA Components

The application's Progressive Web App functionality is enabled by the following key components:

-   **Service Worker (`public/service-worker.js`)**: Manages caching offline functionality and network request interception.
-   **Web App Manifest (`public/favicons/manifest.json`)**: Provides metadata for the PWA such as its name icons and display mode making it installable.
-   **Registration Script (`public/index.html`)**: A script within the main HTML file that registers the service worker with the browser.

---

## Build and Optimisation

-   **Image Processing**: The `sharp` library is used in the build script to convert and resize images into the modern WebP format for better compression.
-   **JS/CSS Minification**: `terser` and `css-minify` are used to minify JavaScript and CSS files for the production build reducing file sizes.
-   **On-Demand Script Loading**: Heavy libraries like `html2canvas.js` are loaded dynamically using a promise-based script loader only when the user interacts with a feature that requires them.
-   **Gzip Compression**: The `compression` Express middleware is used to apply Gzip compression to server responses further reducing network payload size.

---

## Development Tools

-   **Package Manager**: npm is used for managing all project dependencies.
-   **Testing**: The project uses Jest as its testing framework with JSDOM to simulate a browser environment for UI tests.
-   **Code Quality**: ESLint and Prettier are used to enforce a consistent code style and catch potential errors.
-   **CI/CD**: GitHub Actions automates the testing and build process on every push to the `main` branch.
-   **Deployment**: The application is deployed on the Railway platform.
-   **Cross-Platform Scripts**: `cross-env` is used in npm scripts to ensure compatibility between Windows and Linux/macOS environments.

---

## Key Dependencies

### Production Dependencies
- `better-sqlite3`
- `compression`
- `cors`
- `dotenv`
- `express`
- `express-rate-limit`
- `helmet`
- `nodemailer`

### Development Dependencies
- `cross-env`
- `css-minify`
- `eslint`
- `jest`
- `jsdom`
- `prettier`
- `sharp`
- `supertest`
- `terser`

---

## NPM Scripts

-   `npm run dev`: Starts the local development server serving un-optimised files from `public/`.
-   `npm test`: Runs the full test suite including formatting checks and accessibility tests.
-   `npm run build`: Creates an optimised production build in the `dist/` directory.
-   `npm start`: Starts the server in production mode serving optimised files from `dist/`.
-   `npm run format`: Formats all code according to Prettier rules.
-   `npm run lint`: Lints the codebase with ESLint.

---

## Environment Variable Handling

A significant challenge encountered during development was the handling of special characters in environment variables which caused a "works on my machine" bug. The root cause was the different ways operating systems and libraries parse strings.

-   **On Railway (and most Linux shells)**: The `$` character is used for variable substitution. To treat it as a literal the value must be wrapped in single quotes (`'...'`).
-   **Locally (with `dotenv`)**: The `#` character is treated as a comment. To include it in a value the entire string must be wrapped in double quotes (`"..."`).

### Best Practices for Secrets

To prevent this issue in the future the following best practices have been adopted for handling secrets like API keys salts or other sensitive strings:

1.  **The Simple Way (Highly Recommended)**: Generate secrets using only **alphanumeric characters** (a-z A-Z 0-9). A 64-character hex string is ideal because it has no special characters and is safe to use in any environment without quoting.
    -   *Example Generation*: `crypto.randomBytes(32).toString('hex')`

2.  **The Bulletproof Way (For Complex Secrets)**: If special characters are unavoidable **encode the secret in Base64**. The Base64 string is stored as the environment variable and the application decodes it at runtime. This is the industry-standard method for safely transmitting complex data through text-based systems.

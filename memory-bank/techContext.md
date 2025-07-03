<!-- Alan UI - techContext.md | 22nd June 2025, WJW -->

# Tech Stack & Tooling

This document provides a high-level overview of the technologies, dependencies, and tools used in this project.

---

## Core Technologies

- **Backend**: Node.js (`20.x`), Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript (ES Modules)
- **Database**: SQLite (via `better-sqlite3`)
- **Chatbot Integration**: Flowise (external)
- **Geolocation**: `ipinfo.io`

---

## PWA Components

The application's Progressive Web App functionality is enabled by the following key components:

-   **Service Worker (`public/service-worker.js`)**: Manages caching, offline functionality, and network request interception.
-   **Web App Manifest (`public/favicons/manifest.json`)**: Provides metadata for the PWA, such as its name, icons, and display mode, making it installable.
-   **Registration Script (`public/index.html`)**: A script within the main HTML file that registers the service worker with the browser.

---

## Build & Optimization

- **Image Processing**: `sharp` for converting and resizing images.
- **JS/CSS Minification**: `terser`, `css-minify`.
- **On-Demand Script Loading**: Heavy libraries like `html2canvas.js` are loaded dynamically using `import()` to improve initial page load times.
- **Gzip Compression**: `compression` (Express middleware).

---

## Development Tools

- **Package Manager**: npm
- **Testing**: Jest, JSDOM
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Railway
- **Cross-Platform Scripts**: `cross-env`

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

- `npm run dev`: Starts the local development server (serves from `public/`).
- `npm test`: Runs the full test suite.
- `npm run build`: Creates an optimized production build in `dist/`.
- `npm start`: Starts the server in production mode (serves from `dist/`).
- `npm run format`: Formats all code.
- `npm run lint`: Lints the codebase.

---

## Environment Variable Handling

A significant challenge encountered during development was the handling of special characters in environment variables, which caused a "works on my machine" bug. The root cause was the different ways operating systems and libraries parse strings.

-   **On Railway (and most Linux shells)**: The `$` character is used for variable substitution. To treat it as a literal, the value must be wrapped in single quotes (`'...'`).
-   **Locally (with `dotenv`)**: The `#` character is treated as a comment. To include it in a value, the entire string must be wrapped in double quotes (`"..."`).

### Best Practices for Secrets

To prevent this issue in the future, the following best practices have been adopted for handling secrets like API keys, salts, or other sensitive strings:

1.  **The Simple Way (Highly Recommended)**: Generate secrets using only **alphanumeric characters** (a-z, A-Z, 0-9). A 64-character hex string is ideal because it has no special characters and is safe to use in any environment without quoting.
    -   *Example Generation*: `crypto.randomBytes(32).toString('hex')`

2.  **The Bulletproof Way (For Complex Secrets)**: If special characters are unavoidable, **encode the secret in Base64**. The Base64 string is stored as the environment variable, and the application decodes it at runtime. This is the industry-standard method for safely transmitting complex data through text-based systems.

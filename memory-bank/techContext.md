<!-- Alan UI - techContext.md | 22nd June 2025, WJW -->

# Tech Stack & Tooling

This document provides a high-level overview of the technologies, dependencies, and tools used in this project.

---

## Core Technologies

- **Backend**: Node.js (`20.x`), Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript (ES Modules)
- **Database**: SQLite (via `better-sqlite3`)
- **Chatbot Integration**: Flowise (external)

---

## Build & Optimization

- **Critical CSS**: `critical` for extracting and inlining above-the-fold CSS.
- **Image Processing**: `sharp` for converting and resizing images.
- **JS/CSS Minification**: `terser`, `css-minify`.
- **Gzip Compression**: `compression` (Express middleware).

---

## Development Tools

- **Package Manager**: npm
- **Testing**: Jest, JSDOM
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Railway (build environment configured via `nixpacks.toml`)
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
- `critical`
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
- `npm run build`: Creates a fully optimized production build in `dist/`, including critical CSS.
- `npm start`: Starts the server in production mode (serves from `dist/`).
- `npm run format`: Formats all code.
- `npm run lint`: Lints the codebase.

# AlanUI Secure Record Server

A secure, local-first backend and static frontend for collecting, storing, and retrieving sensitive user records. Designed for medical, research, or privacy-focused applications, AlanUI ensures robust authentication, data validation, and user privacy without external databases or user accounts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Security & Authentication](#security--authentication)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Public Directory Contents](#public-directory-contents)
- [Development & Testing](#development--testing)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

AlanUI Secure Record Server provides a secure backend for collecting, storing, and retrieving user records, with robust authentication and data validation. It is designed to protect user privacy and data integrity, supporting both admin and user flows with appropriate access controls.

## Features

- Accepts user record submissions via HTTP endpoints or frontend UI
- Stores the most recent record and maintains a full history
- Authenticates sensitive endpoints using a master password or one-time passwords (OTPs)
- Securely stores authentication credentials (SHA-256 hashes only)
- Validates all incoming record data for correct types and structure
- Serves static frontend files for user interaction and record viewing
- Simple, local deployment—no external database or user account management

## Security & Authentication

- **All authentication is server-side**: No sensitive data is exposed to the frontend.
- **Passwords are never stored or transmitted in plain text**: Only SHA-256 hashes are used, stored in the `.env` file.
- **Sensitive endpoints require authentication**: Access to records/history is protected by a master password or OTP, both verified via hash comparison.
- **No user registration or account management**: All access is controlled via environment variables.

## Prerequisites

- Node.js >=16 (tested with v22.16.0)
- npm

## Installation

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the project root with the following variables:

```
MASTER_PASSWORD_HASH=your_sha256_hash
OTP_HASHES=comma,separated,sha256,hashes
```

- **MASTER_PASSWORD_HASH**: SHA-256 hash of your chosen master password.
- **OTP_HASHES**: Comma-separated list of SHA-256 hashes for one-time passwords (optional, for temporary access).

**Note:** Never store or transmit plain-text passwords. Use a tool like `echo -n "yourpassword" | sha256sum` to generate hashes.

## Running the Server

Start the server:

```bash
npm start
```

The server will be available at [http://localhost:3000/](http://localhost:3000/).

## API Endpoints

### `POST /record-info`

- **Description:** Submit a new user record.
- **Request Body:** JSON object with required fields (validated for type/structure).
- **Authentication:** Not required.
- **Effect:** Stores the record in `user-info.json` and appends to `user-history.json`.

### `POST /fetch-records`

- **Description:** Retrieve the most recent user record.
- **Request Body:** `{ "password": "your_password" }`
- **Authentication:** Required (master password or valid OTP).
- **Effect:** Returns the contents of `user-info.json`. OTPs are consumed on use.

### `POST /fetch-history`

- **Description:** Retrieve the full record history.
- **Request Body:** `{ "password": "your_password" }`
- **Authentication:** Required (master password or valid OTP).
- **Effect:** Returns the contents of `user-history.json`.

#### Example Request

```bash
curl -X POST http://localhost:3000/fetch-records \
  -H "Content-Type: application/json" \
  -d '{"password":"your_password"}'
```

## Project Structure

```
AlanUI/
├── public/                # Static frontend files (HTML, JS, CSS, images)
├── server.js              # Main Express server
├── user-info.json         # Stores the most recent record
├── user-history.json      # Stores the full record history
├── .env                   # Environment variables (hashed credentials)
├── package.json           # Project metadata and scripts
├── README.md              # Project documentation
└── memory-bank/           # Project context and documentation
```

## Public Directory Contents

## Frontend Code Quality & Consistency

- All HTML files use semantic HTML5 structure: <header>, <main>, <nav>, <section>, and <button> are used appropriately for accessibility and clarity.
- Every HTML file begins with a slimline file-level comment including the date: `<!-- Alan UI - filename | 18th June 2025, WJW -->`
- Comments are neat, informative, and consistent—no placeholders or unnecessary comments remain.
- All back buttons use a standardized `.back-arrow` class and consistent event binding with `document.addEventListener('DOMContentLoaded', ...)`.
- All JavaScript event binding uses `DOMContentLoaded` for reliability and consistency.
- Navigation and quick action areas use <nav> where appropriate.
- The codebase is fully accessible, maintainable, and follows modern HTML5 and documentation best practices.


The `public/` directory contains the following files and folders:

```
aboutalan.html
agent1-chatbot-module.js
atoms.html
boxes.html
closer.js
ear.html
eye.html
faviconAndMeta.js
home.html
index.html
instructions.html
language.js
listener-module.js
muted.html
muted.js
referral.html
skin.html
styles_index.css
styles.css
triangle.html
view-records.html
weblinks.html
favicons/
    android-chrome-192x192.png
    android-chrome-512x512.png
    apple-icon-60x60.png
    apple-touch-icon.png
    favicon-16x16.png
    favicon-32x32.png
    manifest.json
images/
    allergic_conjunctivitis.jpg
    AP.png
    atomsblue.jpg
    bigredt.png
    eyeor.gif
    howtouseeye.png
    iritis.jpg
    lang.jpg
    Q.png
    triangle.png
```

## Development & Testing

- All server logic is in `server.js`.
- Data is stored locally in JSON files; no external database required.
- To run tests (if available):

```bash
npm test
```

- See `tests/` for example test files.

## Contributing

1. Fork the repository and create a new branch.
2. Make your changes, following the existing code patterns and style.
3. Add or update tests as needed.
4. Submit a pull request with a clear description of your changes.

## License

This project is provided for educational and research purposes. See LICENSE file if present.

---

_Last updated: 2025-06-18_

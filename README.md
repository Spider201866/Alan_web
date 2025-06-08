# Alan Web Server

This project hosts the server and frontend for the **Alan** web
application. It uses Node.js with Express to serve static HTML files and
expose a few API endpoints for recording and retrieving user session
information.

## Prerequisites

- Node.js (version 18 or newer is recommended)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The application will run on port `3000` by default.

## Available Pages

- `GET /` &ndash; serves `public/index.html` which is the main entry page.
- `GET /view-records` &ndash; serves `public/view-records.html` for viewing
  stored user sessions.

## API Endpoints

All endpoints accept and return JSON. Endpoints that fetch data require a
password which can be the master password or one of the one‑time
passwords defined in `server.js`.

### `POST /record-info`

Saves a single active record. The request body should contain fields such
as `sessionId`, `name`, `role`, `experience`, `focus`, location
information and other details. The payload overwrites `user-info.json`
with the provided record and appends the entry to
`user-history.json`.

Example request:

```bash
curl -X POST http://localhost:3000/record-info \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "123", "name": "Alice"}'
```

### `POST /fetch-records`

Returns the single active record stored in `user-info.json`. The request
body must include a `password` field.

Example request:

```bash
curl -X POST http://localhost:3000/fetch-records \
  -H "Content-Type: application/json" \
  -d '{"password": "<your-password>"}'
```

### `POST /fetch-history`

Returns the entire history stored in `user-history.json`. Like
`/fetch-records`, the body must contain a `password` field.

Example request:

```bash
curl -X POST http://localhost:3000/fetch-history \
  -H "Content-Type: application/json" \
  -d '{"password": "<your-password>"}'
```

## Project Structure

```
public/        Static HTML, CSS and client-side JavaScript
server.js      Express server defining the API endpoints
package.json   Node.js dependencies and npm scripts
```

## Notes

- Records are stored locally in JSON files. Running the server will
  create `user-info.json` and `user-history.json` in the project root.
- Passwords for the fetch endpoints are currently stored in plain text in
  `server.js`.

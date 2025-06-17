# Alan Web Server

This project provides a simple Express server with endpoints for recording and retrieving user information.

## Prerequisites

- Node.js >=16 (tested with v22.16.0)
- npm to install packages

## Installation

Run `npm install` to install the Node dependencies. This downloads Express, body-parser, and other packages from package.json.

```bash
npm install
```

If your environment restricts network access the install may fail, in which case ensure all packages are available locally.

## Running the server

Start the Express application with:

```bash
npm start
```

This runs `node server.js` and serves the site at [http://localhost:3000/](http://localhost:3000/).

## Endpoints

### POST /record-info

Stores a single "active" record in `user-info.json` and appends or updates the entry in `user-history.json`.

### POST /fetch-records

Returns the single record from `user-info.json`. The request must include a valid password. One-time passwords are consumed on use.

### POST /fetch-history

Returns the full contents of `user-history.json` after validating the supplied password. Useful for viewing the complete log of sessions.

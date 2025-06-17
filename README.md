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

## Environment Variables

Create a `.env` file or set the following variables before starting the server:

```
MASTER_PASSWORD_HASH=<sha256 hash of your master password>
ONE_TIME_PASSWORD_HASHES=<comma-separated sha256 hashes of one-time passwords>
```

An example file is provided at `.env.example`.

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

## Public Directory Structure

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
images/
```

_Last updated: 2025-06-17 (referral.html added to reflect new content)._

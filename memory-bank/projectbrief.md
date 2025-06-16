# Project Brief

## Project Name
AlanUI Secure Record Server

## Purpose
To provide a secure backend server for collecting, storing, and retrieving user records, with robust authentication and data validation.

## Core Requirements
- Accept user record submissions via HTTP endpoints.
- Store the most recent record and maintain a history of all records.
- Authenticate access to sensitive endpoints using a master password or one-time passwords.
- Store authentication credentials securely (hashed, not plain-text).
- Validate incoming record data for correct types and structure.
- Serve static frontend files for user interaction and record viewing.

## Goals
- Ensure user data is protected through secure authentication and validation.
- Prevent unauthorized access to sensitive data (records/history).
- Maintain a clean, maintainable, and extensible codebase.
- Provide clear error handling and feedback for invalid requests.
- Support both admin and user flows with appropriate access controls.

## Out of Scope
- No user registration or account management (passwords are managed via environment variables).
- No external database integration (data is stored in local JSON files).
- No frontend authentication (all security is handled server-side).

## Current Status
- Server authenticates using SHA-256 hashed passwords stored in environment variables.
- Record submissions are validated for expected data types.
- All routes and middleware are implemented in a single server.js file.
- .env file contains only hashed credentials, never plain-text passwords.

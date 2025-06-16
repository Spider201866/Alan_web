# Product Context

## Why This Project Exists
AlanUI Secure Record Server was created to securely collect, store, and manage sensitive user records for medical or research applications. The system is designed to ensure that only authorized users can access or modify records, protecting user privacy and data integrity.

## Problems It Solves
- Prevents unauthorized access to sensitive user data by requiring hashed password authentication.
- Eliminates the risk of plain-text password exposure by storing only SHA-256 hashes in environment variables.
- Ensures data consistency and integrity by validating all incoming record submissions for correct types and structure.
- Provides a simple, local solution for record management without the complexity of external databases or user accounts.

## How It Should Work
- Users submit records via a frontend interface or API endpoint.
- The server validates the structure and types of submitted data before accepting it.
- Sensitive endpoints (fetching records/history) require authentication using a master password or a one-time password, both verified via SHA-256 hash comparison.
- The most recent record is stored in user-info.json, and all records are appended to user-history.json.
- Admins can view the full history after authenticating.

## User Experience Goals
- Fast, reliable record submission and retrieval.
- Clear error messages for invalid data or failed authentication.
- No need for users to manage accounts; access is controlled via secure passwords.
- Simple, intuitive frontend for both users and admins.
- Minimal configuration required for deployment and operation.

## Security and Privacy
- All authentication is handled server-side; no sensitive data is exposed to the frontend.
- Passwords are never stored or transmitted in plain text.
- Only authorized users can access or modify records.

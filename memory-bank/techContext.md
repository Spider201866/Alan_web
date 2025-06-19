<!-- Alan UI - techContext.md | 19th June 2025, WJW -->

# Tech Context

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (vanilla JS)
- **Chatbot Integration**: Flowise (for managing chatbot agents)
- **Large Language Model (LLM)**: Google Gemini 2.5 Flash (30k token agent, static)
- **Chatbot Agent**: "Alan" (managed via Flowise, incorporates role, logic, memory, and security in its prompt)
- **Environment Variables**: `dotenv` package for loading `.env` files (for general environment configuration).
- **Rate Limiting**: `express-rate-limit`
- **Security Headers**: `helmet`
- **Code Formatting**: Prettier, EditorConfig
- **Testing**: Jest, JSDOM

## Development Setup
- **Node.js**: Required to run the server.
- **npm**: Package manager for installing dependencies.
- **Environment Variables**: `.env` file may be used for general configuration. Critical variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at startup.
- **Project Structure**:
    - `server.js`: Main server application.
    - `public/`: Static assets (HTML, CSS, JS, images).
        - `public/page-template.js`: Shared appbar logic.
        - `public/focus-trap.js`: Focus trap system for accessibility.
        - `public/scripts/agent1-chatbot-module.js`: Core chatbot logic, likely integrating with Flowise/Gemini.
    - `user-info.json`, `user-history.json`: JSON data files (ensured to have trailing newlines).
    - `package.json`: Defines project metadata and dependencies.
    - `.prettierrc`: Prettier configuration file.
    - `.editorconfig`: EditorConfig configuration file.
    - `tests/`: Contains automated test files.

## Technical Constraints
- **No Backend Data Storage**: The project does not involve complex backend record storage or external databases; data handling is primarily for chatbot interaction.
- **Single Server File**: All server logic is currently in `server.js`, which could become a maintenance challenge as the project grows.
- **No Frontend Framework**: Frontend is intentionally built with vanilla HTML, CSS, and JavaScript. This decision aligns with the project's goal of simplicity and democratizing access, as the system is designed to remain small (one main page and a few sidebar pages) and will not grow significantly in complexity.
- **External Chatbot Agent Dependency**: Reliance on an external Flowise agent (powered by Gemini 2.5 Flash) means the chatbot's performance and availability are dependent on these external services. The prompt engineering and maintenance for the "Alan" agent are handled within Flowise, external to this codebase.

## Dependencies
- `express`: Web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `express-rate-limit`: Middleware for rate limiting.
- `helmet`: Security middleware for setting HTTP headers.
- `jest`: JavaScript testing framework.
- `jsdom`: JavaScript implementation of the DOM and HTML standards.
- (Implicit) Flowise client-side integration or API calls from `agent1-chatbot-module.js`.

## Tool Usage Patterns
- **`npm install`**: To set up project dependencies.
- **`node server.js`**: To start the server.
- **`npm run format`**: To automatically format code using Prettier (also run as a pre-test hook).
- **`npm test`**: To run the full test suite.
- **`npx jest tests/ui.test.js`**: To run specific UI/accessibility tests.
- **Flowise UI/API**: For configuring and managing the "Alan" chatbot agent (external to this project's codebase).

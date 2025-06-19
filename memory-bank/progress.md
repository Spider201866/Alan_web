<!-- Alan UI - progress.md | 19th June 2025, WJW -->

# Progress

## What Works
- The server successfully starts and serves static files from the `public/` directory.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests.
- Security headers are applied using `helmet`, with a configured Content Security Policy (CSP) that allows necessary external resources (CDNs, Flowise backend, IP API) and inline scripts/styles/fonts.
- Critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) are validated at server startup.
- JSON data files (`user-info.json`, `user-history.json`) are written with a trailing newline.
- Frontend pages utilize a shared appbar pattern for consistent navigation and layout, with centralized styling.
- A reusable focus trap system is implemented for modals and side menus, enhancing keyboard accessibility.
- Accessibility requirements for marquee content (`aria-hidden="true"`) and icon-only buttons (`aria-label`) are enforced.
- Comprehensive automated test suite covers UI and accessibility, with a pre-test formatting hook (`npm run format` before `npm test`).
- Code formatting is enforced using Prettier and EditorConfig.
- The core chatbot functionality for eye, skin, and ear queries is implemented on the frontend (`public/scripts/agent1-chatbot-module.js`), which interacts with the external "Alan" chatbot agent managed via Flowise. This "Alan" agent is powered by Google Gemini 2.5 Flash (a static LLM) and incorporates advanced intelligence, role, logic, memory, and security features within its prompt. This codebase focuses on the interface, not the "secret sauce" of the agent itself.

## What's Left to Build
- No specific features are currently pending. The project meets its core requirements as a web chatbot with advanced LLM integration and enhanced security/maintainability.

## Current Status
The AlanUI Web Chatbot is functional, robust, and provides accessible health information for eye, skin, and ear users. It leverages an intelligent external chatbot agent ("Alan") for its core AI, with this codebase focusing on a consistent, accessible user interface and foundational server security. All identified improvements have been implemented.

## Known Issues
- All server logic is in a single `server.js` file, which could become unwieldy for larger projects.
- Reliance on external Flowise services and the "Alan" agent means the chatbot's performance and availability are dependent on these external components. (Note: The prompt engineering and maintenance of the "Alan" agent are external to this codebase and will be ignored for now as per user feedback.)

## Evolution of Project Decisions
- The project's core purpose evolved to be a web chatbot for health information, moving away from a "secure record server" concept.
- Key decision to integrate with Flowise to manage the "Alan" chatbot agent, which is powered by Google Gemini 2.5 Flash (a static LLM). This allows the "Alan" agent to incorporate advanced AI capabilities (role, logic, memory, security) via its prompt, while keeping the core codebase focused on the interface. (Note: The prompt engineering and agent maintenance are external to this codebase and will be ignored for now as per user feedback.)
- Recent decisions (June 2025) focused on improving user experience, security, and maintainability:
    - Implemented shared appbar and centralized styling for UI consistency and maintainability.
    - Introduced focus trap for enhanced keyboard accessibility, reflecting a commitment to inclusive design.
    - Integrated `express-rate-limit` to bolster server security against common attack vectors.
    - Added `helmet` for comprehensive security headers and configured CSP to allow all necessary resources.
    - Expanded automated testing to cover new features and enforce accessibility standards, ensuring quality and reliability, including a pre-test formatting hook.
    - Maintained separate CSS files (`styles.css` for shared UI, `styles_index.css` for specific pages) for better organization.
    - Added `.editorconfig` for consistent code style across editors.
    - Switched from `body-parser` to `express.json()` for efficiency.
    - Cleaned up debug `console.log` statements.
    - Validated critical environment variables at startup.
    - Ensured JSON files have trailing newlines.
- The decision to exclude complex backend features like user registration, account management, and external database integration is intentional, aimed at keeping the project simple and democratizing its eventual open-source release. This design choice emphasizes the interface's role in providing accessible health information, with the "secret sauce" of the AI agent being managed externally.
- Browser caching of CSP headers was identified as a significant challenge during development, requiring hard refreshes and cache clearing to apply changes.

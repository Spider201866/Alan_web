<!-- Alan UI - activeContext.md | 19th June 2025, WJW -->

# Active Context

## Current Work Focus
Updating all memory bank files to reflect recent codebase changes and discussions.

## Recent Changes
- **Server Enhancements (June 2025):**
    - Integrated `helmet` security middleware in `server.js` to set various HTTP response headers, enhancing security.
    - Configured Helmet's Content Security Policy (CSP) to allow necessary external resources (CDNs like `cdn.jsdelivr.net`, `unpkg.com`, `cdnjs.cloudflare.com`; Flowise backend `https://backend.flowiseai.com`, `https://flowiseai-railway-production-fecf.up.railway.app`; IP API `https://ipapi.co`; and `https://alan.up.railway.app`) and inline scripts/styles/fonts.
    - Switched from `body-parser` to `express.json()` for parsing JSON request bodies in `server.js`.
    - Wrapped debug `console.log` statements in `server.js` behind a `NODE_ENV` check to keep production logs clean.
    - Validated critical environment variables (`MASTER_PASSWORD_HASH`, `PASSWORD_SALT`) at server startup in `server.js` to prevent running with missing credentials.
    - Ensured JSON data files (`user-info.json`, `user-history.json`) are written with a trailing newline character for improved compatibility.
- **Frontend & Build Process Enhancements:**
    - Added an `.editorconfig` file to the project root to enforce consistent indentation and line endings across different editors.
    - Updated the `test` script in `package.json` to run `npm run format` (Prettier) before executing tests, ensuring code is formatted before each test run.
- **Chatbot Specifics (from user feedback):**
    - The chatbot leverages a Flowise agent powered by Google Gemini 2.5 Flash (a 30k token LLM).
    - This agent incorporates advanced role, logic, memory, and security features within its prompt.

## Next Steps
Ensure `systemPatterns.md`, `techContext.md`, and `progress.md` are fully updated with these changes.

## Active Decisions and Considerations
- Maintaining separation of `styles.css` (shared UI) and `styles_index.css` (home/index-specific) for better organization.
- Ensuring all new pages adhere to the shared appbar pattern and accessibility guidelines.
- The decision to use vanilla JavaScript for the frontend is intentional, as the system is designed to remain simple (one main page and a few sidebar pages) and is not expected to grow significantly in complexity.
- The project's core purpose is a web chatbot for health information, with this codebase primarily focusing on the user interface and surrounding functionalities, while the core intelligence ("Alan" agent) is managed externally via Flowise.
- Prompt engineering and agent maintenance for the "Alan" agent are external to this codebase and will be ignored for now as per user feedback.

## Important Patterns and Preferences
- **Shared Appbar Pattern**: All new main pages should use `initPage` from `page-template.js` and link `styles.css`. No local appbar CSS/markup.
- **Focus Trap Implementation**: For new modals/menus, use `new FocusTrap(element)` and call `activate()`/`deactivate()`.
- **Accessibility Best Practices**:
    - Duplicated marquee content must have `aria-hidden="true"`.
    - Icon-only buttons must have descriptive `aria-label` attributes.
- **Code Formatting**: Adhere to Prettier configuration (`.prettierrc`). Use `npm run format` to auto-format. `.editorconfig` also contributes to consistent formatting.
- **Testing**: Utilize `npm test` for full suite or `npx jest tests/ui.test.js` for UI/accessibility tests. Ensure new features have test coverage. Critical environment variable validation at startup should be manually verified.
- **Security**: Be mindful of rate limiting patterns and ensure `helmet` is correctly configured for security headers and CSP.
- **Chatbot Architecture**: Integration with Flowise for the "Alan" chatbot agent, which is powered by Google Gemini 2.5 Flash (a static LLM).

## Learnings and Project Insights
- The project prioritizes consistency in UI/UX through shared components and centralized styling.
- Strong emphasis on accessibility, with automated tests to enforce standards.
- Security measures like rate limiting and security headers (`helmet`) are in place to protect server endpoints and the application.
- Testing strategy includes pre-test formatting and isolation for critical components.
- The project's core purpose is a web chatbot for health information, with this codebase primarily focusing on the user interface and surrounding functionalities, while the core intelligence ("Alan" agent) is managed externally via Flowise.
- The choice of vanilla JavaScript and a simple page structure is a deliberate design decision to keep the project lightweight and easy to maintain, aligning with its goal of democratized access and limited future growth.
- Browser caching of CSP headers can cause persistent issues, requiring hard refreshes or cache clearing during development.
</content>

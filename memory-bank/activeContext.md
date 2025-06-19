# Active Context

## Current Work Focus
Refining memory bank files based on user feedback, specifically incorporating details about the Flowise chatbot agent and Gemini 2.5 Flash LLM.

## Recent Changes
- **June 2025 Updates (from README.md):**
    - Implemented a shared appbar pattern across main HTML pages using `public/page-template.js` and `public/styles.css` for consistent header and navigation.
    - Centralized appbar styling in `public/styles.css` to ensure uniformity (font family, size, back arrow, page title, height, layout).
    - Removed appbar-related CSS and markup from individual HTML files to reduce duplication and improve maintainability.
    - Introduced a reusable focus trap system (`public/focus-trap.js`) for modals and side menus to enhance keyboard accessibility. This is currently used in `home.js`.
    - Enforced accessibility requirements for marquee content (`aria-hidden="true"` for duplicated elements) and icon-only buttons (`aria-label` attributes).
    - Integrated `express-rate-limit` in `server.js` to limit requests to 100 per 15 minutes per IP, improving server security.
- **Chatbot Specifics (from user feedback):**
    - The chatbot leverages a Flowise agent powered by Google Gemini 2.5 Flash (a 30k token LLM).
    - This agent incorporates advanced role, logic, memory, and security features within its prompt.

## Next Steps
Review and update `systemPatterns.md` and `progress.md` to accurately reflect the integration of Flowise and Gemini 2.5 Flash, and adjust the critical review accordingly.

## Active Decisions and Considerations
- Maintaining separation of `styles.css` (shared UI) and `styles_index.css` (home/index-specific) for better organization.
- Ensuring all new pages adhere to the shared appbar pattern and accessibility guidelines.
- Emphasizing the advanced capabilities of the chatbot due to LLM integration.
- The decision to use vanilla JavaScript for the frontend is intentional, as the system is designed to remain simple (one main page and a few sidebar pages) and is not expected to grow significantly in complexity.

## Important Patterns and Preferences
- **Shared Appbar Pattern**: All new main pages should use `initPage` from `page-template.js` and link `styles.css`. No local appbar CSS/markup.
- **Focus Trap Implementation**: For new modals/menus, use `new FocusTrap(element)` and call `activate()`/`deactivate()`.
- **Accessibility Best Practices**:
    - Duplicated marquee content must have `aria-hidden="true"`.
    - Icon-only buttons must have descriptive `aria-label` attributes.
- **Code Formatting**: Adhere to Prettier configuration (`.prettierrc`). Use `npm run format` to auto-format.
- **Testing**: Utilize `npm test` for full suite or `npx jest tests/ui.test.js` for UI/accessibility tests. Ensure new features have test coverage.
- **Security**: Be mindful of rate limiting patterns.
- **Chatbot Architecture**: Integration with Flowise for the "Alan" chatbot agent, which is powered by Google Gemini 2.5 Flash (a static LLM). The "Alan" agent's prompt incorporates role, logic, memory, and security features, and its maintenance is external to this codebase. (Note: Prompt engineering and agent maintenance are external to this codebase and will be ignored for now as per user feedback.)

## Learnings and Project Insights
- The project prioritizes consistency in UI/UX through shared components and centralized styling.
- Strong emphasis on accessibility, with automated tests to enforce standards.
- Security measures like rate limiting are in place to protect server endpoints.
- Testing strategy includes isolation for critical components like rate limiting to ensure reliability.
- The project's core purpose is a web chatbot for health information, with this codebase primarily focusing on the user interface and surrounding functionalities, while the core intelligence ("Alan" agent) is managed externally via Flowise.
- The choice of vanilla JavaScript and a simple page structure is a deliberate design decision to keep the project lightweight and easy to maintain, aligning with its goal of democratized access and limited future growth.
</content>

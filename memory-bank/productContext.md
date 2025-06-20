<!-- Alan UI - productContext.md | 19th June 2025, WJW -->

# Product Context

## Why This Project Exists
The AlanUI Web Chatbot was created to provide accessible and relevant health information, specifically for eye, skin, and ear conditions, to users in Low and Middle-Income Countries (LMICs). It aims to serve as a readily available resource for basic health queries.

## Problems It Solves
- Provides immediate access to health information for users in LMICs who may have limited access to healthcare professionals.
- Offers a simple, web-based interface for health queries without requiring complex setups or accounts.
- Ensures information is presented in an accessible manner, catering to diverse user needs.
- Protects the server from abuse through rate limiting.

## How It Should Work
- Users interact with the chatbot via a static frontend interface.
- The chatbot leverages a Flowise agent powered by Google Gemini 2.5 Flash (a 30k token LLM) to process user queries related to eye, skin, and ear health. This agent incorporates advanced role, logic, memory, and security features within its prompt to provide relevant and intelligent information.
- Frontend pages utilize a shared appbar pattern (`public/page-template.js` and `public/styles.css`) for consistent navigation and layout.
- The application supports dynamic language loading for 22 languages, with translations stored in external JSON files and loaded on demand.
- Modals and side menus implement a focus trap system (`public/focus-trap.js`) to ensure keyboard accessibility.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests.
- A custom 404 page is served for unknown routes, providing a better user experience.
- API data fetching includes robust error handling to inform users of issues gracefully.
- The test suite uses a centralized server management pattern for all API, Rate Limiting, and 404 tests, with a single server instance shared across these suites. The OTP logic tests use a separate, isolated server instance. All server instances are gracefully shut down in their respective `afterAll` hooks, and the global `afterAll` reliably closes the database connection and deletes the test database file. All tests (API, UI, and chatbot) are now passing.

## User Experience Goals
- Fast, reliable, and intuitive chatbot interaction, powered by an advanced LLM for more nuanced responses.
- Clear, accurate, and easy-to-understand health information, with the ability to maintain context and apply complex logic.
- Simple, consistent, and accessible frontend for all users, with a shared appbar, uniform page layouts, and "skip to content" links.
- Enhanced keyboard accessibility for all interactive elements, including modals and menus.
- Page load performance is optimized through deferred script loading; problematic favicon preload links were removed, relying on standard browser mechanisms for favicon fetching.
- Minimal configuration required for deployment and operation, with clear environment variable setup instructions.

## Security and Privacy
- The project focuses on providing information. While it does not handle user authentication or highly sensitive Personal Identifiable Information (PII), it now stores user interaction/session data (like name, role, experience, location if provided, and interaction metadata) in a persistent SQLite database for history and context purposes.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests (100 requests per 15 minutes per IP).
- Content Security Policy (CSP) is enforced via Helmet to mitigate XSS and other injection attacks, whitelisting necessary external resources (including for Leaflet maps).
- Frontend accessibility ensures sensitive content (e.g., duplicated marquee content) is hidden from screen readers where appropriate, and interactive elements have proper `aria-label` attributes.

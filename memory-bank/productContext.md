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
- Modals and side menus implement a focus trap system (`public/focus-trap.js`) to ensure keyboard accessibility.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests.

## User Experience Goals
- Fast, reliable, and intuitive chatbot interaction, powered by an advanced LLM for more nuanced responses.
- Clear, accurate, and easy-to-understand health information, with the ability to maintain context and apply complex logic.
- Simple, consistent, and accessible frontend for all users, with a shared appbar and uniform page layouts.
- Enhanced keyboard accessibility for all interactive elements, including modals and menus.
- Minimal configuration required for deployment and operation.

## Security and Privacy
- The project focuses on providing information and does not handle sensitive user records or authentication.
- Server endpoints are protected by `express-rate-limit` to prevent excessive or abusive requests (100 requests per 15 minutes per IP).
- Frontend accessibility ensures sensitive content (e.g., duplicated marquee content) is hidden from screen readers where appropriate, and interactive elements have proper `aria-label` attributes.

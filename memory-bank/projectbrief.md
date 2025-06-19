<!-- Alan UI - projectbrief.md | 19th June 2025, WJW -->

# Project Brief

## Project Name
AlanUI Web Chatbot

## Purpose
To provide a web-based chatbot for users, especially in Low and Middle-Income Countries (LMICs), focusing on eye, skin, and ear health information.

## Core Requirements
- Serve static frontend files for user interaction.
- Provide chatbot functionality for eye, skin, and ear related queries.
- Ensure accessibility for users, including keyboard navigation and screen reader compatibility.
- Maintain a consistent and intuitive user interface across all pages.
- Implement robust security measures, including Content Security Policy (CSP) and rate limiting.

## Goals
- Deliver accurate and helpful information to users regarding eye, skin, and ear health.
- Ensure a smooth, accessible, and performant user experience.
- Maintain a clean, maintainable, and extensible codebase with clear development guidelines.
- Provide clear error handling and user feedback for API interactions, invalid requests, or server issues.
- Support easy deployment and minimal configuration, with specified development environment requirements.

## Out of Scope
- No user registration or account management.
- No external database integration (data is primarily static or handled by the chatbot logic).
- No complex backend record storage (the focus is on the chatbot interaction).
- No advanced AI/ML for chatbot responses (responses are likely rule-based or pre-defined).

## Current Status
- Static frontend files are served.
- Frontend pages utilize a shared appbar pattern for consistent navigation and layout.
- A reusable focus trap system is implemented for modals and side menus, enhancing keyboard accessibility.
- Accessibility requirements for marquee content, icon-only buttons, and "skip to content" links are enforced.
- Server endpoints are protected by `express-rate-limit`.
- Content Security Policy (CSP) is configured using Helmet for enhanced security.
- Automated tests cover UI, accessibility, and backend aspects.
- Code formatting is enforced using Prettier, with check and write scripts.
- ESLint is configured for code quality checks.
- Node.js version is specified for consistent development environments.
- API error handling has been improved for user-facing feedback.
- A custom 404 page is implemented for unknown routes.
- Favicon preloading is implemented for performance.

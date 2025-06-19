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
- Implement basic security measures like rate limiting for server endpoints.

## Goals
- Deliver accurate and helpful information to users regarding eye, skin, and ear health.
- Ensure a smooth and accessible user experience.
- Maintain a clean, maintainable, and extensible codebase.
- Provide clear error handling and feedback for invalid requests or server issues.
- Support easy deployment and minimal configuration.

## Out of Scope
- No user registration or account management.
- No external database integration (data is primarily static or handled by the chatbot logic).
- No complex backend record storage (the focus is on the chatbot interaction).
- No advanced AI/ML for chatbot responses (responses are likely rule-based or pre-defined).

## Current Status
- Static frontend files are served.
- Frontend pages utilize a shared appbar pattern for consistent navigation and layout.
- A reusable focus trap system is implemented for modals and side menus, enhancing keyboard accessibility.
- Accessibility requirements for marquee content and icon-only buttons are enforced.
- Server endpoints are protected by `express-rate-limit`.
- Automated tests cover UI and accessibility aspects.
- Code formatting is enforced using Prettier.

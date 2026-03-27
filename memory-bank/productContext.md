<!-- Alan UI - productContext.md | Updated 27th March 2026, Codex -->

# Product Context

## Why This Project Exists
The AlanUI Web Chatbot provides accessible, relevant health information focused on eye, skin, and ear conditions for users in Low and Middle-Income Countries (LMICs). It aims to serve as a readily available resource for basic health queries with a strong emphasis on offline access, low bandwidth, and accessibility.

## Problems It Solves
- Immediate access to trusted health guidance for users with limited access to healthcare professionals.
- Simple web interface with no account setup; designed for low-connectivity contexts.
- Accessibility-first UI for keyboard and screen reader users; consistent UX patterns across pages.
- Abuse resistance via rate limiting; no complex server state or user accounts to manage.

## How It Should Work (Confirmed Sep 2025)
- Users land on `index.html`, complete a password gate (for internal/demo use), then capture minimal onboarding info (name, aims, experience, contact). This data is stored locally and pushed to the server when meaningful.
- Public onboarding verifies the access code via `POST /api/verify-access`; administrative record access uses a separate admin credential when configured.
- Users are transitioned to `home.html` which hosts the Flowise chatbot (Google Gemini via Flowise), navigation side menu, language selector, and example prompts.
- The Flowise chatbot persists per-user sessionId (localStorage), and embeds a themed chat UI loaded via jsdelivr CDN. A sidebar records chat history by observing the Flowise component (shadow DOM) and stores across sessions locally.
- Pages use a shared app bar template (`page-template.js`) for title and back navigation; translations are applied on `languageChanged` events.
- PWA and caching provide offline resilience. Service worker pre-caches core assets, uses network-first for nav requests (with offline fallback), and cache-first for static assets.

## User Experience Goals (Expanded)
- Fast, reliable, intuitive chatbot interaction with context retention and robust UI affordances (copy, reset, history).
- Accessible: 
  - Skip links, focus-trap on popups/menus, ARIA labels, and keyboard-friendly controls.
  - Reduced-motion considerations (animations and marquee).
- Consistent UI:
  - Side menu patterns, app bar across content pages, consistent button design, and translated textual content.
- Offline-first mindset:
  - Installable PWA, offline page with “Retry” and “Go Back”, SW_READY handshake to ensure deterministic initialisation.

## Key Screens and Journeys
- Landing/Onboarding (`index.html`)
  - Splash -> Password gate -> Instruction screen -> Form capture (name, aims, experience, contact) -> Transition with animated triangle overlay -> `home.html`.
  - Language selection on landing via accessible dropdown; translations loaded dynamically and persisted in localStorage.
- Home (`home.html`)
  - Chatbot container with Flowise embed (`flowise-fullchatbot`).
  - A one-time delayed first-use coaching card can appear after roughly 10 seconds on first visit with brief tips on writing clearly, keeping prompts concise, and refreshing after a finished case; the card is translation-backed and supports localhost force-open via `?tip=1` during UI work.
  - Side menu: Navigation to Eye, Ear, Skin guides, Videos (YouTube), Atoms image page, Tools/Links, About; language dropdown; Clear chat history.
  - Marquee example prompts (eyes and ears) that auto-hide when the user engages with the chat input (robust focus listener).
  - Compact quick-action row for Images, Help, Screenshot, and Refer; labels are translation-backed via the shared muted-buttons partial, screenshot uses dynamic loading of html2canvas from CDN, and Images toggles curated external links.
  - Geolocation button (blue flash/feedback), info popup, and IP-based initial classification displayed in a popup with focus trap.
- Admin/Records (`view-records.html`)
  - Password-protected page to fetch active and historical records from SQLite.
  - Tables centered and accessible; active record highlighted; “Show Map” uses Leaflet/OSM (with red marker); Delete record support with confirmation.
  - Service worker deliberately bypasses this page to avoid caching issues during administrative workflows.

## Chatbot Integration
- Flowise Embed via jsdelivr; configured with chatflowid and apiHost (Railway Flowise).
- Theme customizations applied (bubbles, icons, input styles).
- Session persistence:
  - sessionId read from localStorage or created; passed to Flowise to maintain history.
  - `listener-module.js`:
    - Observes Flowise shadow DOM for both guest and host messages.
    - De-duplicates streamed updates, persists messages per session, and provides “copy” button.
    - Supports session resets tied to Flowise’s “Reset Chat”.

## Internationalization (i18n)
- 22 languages supported; translations stored in `public/translations/*.json`.
- `language.js` loads JSON dynamically and dispatches `languageChanged`.
- Page translators (e.g., `home-translator.js`) update UI text reactively; placeholders and page-specific translation keys are used consistently.
- `scripts/check-translations.cjs` validates translation coverage against English (flags missing/extra/placeholder values).
- `scripts/audit-translations.cjs` now complements that coverage check by flagging exact English carryovers in non-English locale files, so translation regressions can be caught before release.

## Data Handling & Privacy (Expanded)
- No user accounts or sensitive medical records stored. Minimal session/user metadata persisted:
  - name, selected aims/role (with simple role class heuristic), experience, contact, latitude/longitude (optional), country (ISO2), LMIC classification, area (city), selected agent/version, date/time, refresh count.
- Data is pushed via POST `/api/record-info` only when meaningful:
  - Guard: name must exist; and either geo info or area must be present; else skip push.
- `location-service.js` uses ipinfo.io to seed approximate location and classification; `home-data.js` can reverse geocode precise coordinates via BigDataCloud if user clicks “Check Location”.
- Rate limiting protects all endpoints; sensitive endpoints are further limited, with public access verification separated from admin record access.

## Security and Privacy
- PBKDF2-SHA256 (100k iterations) with salt for password; public and admin credentials can be configured separately, and `generate-hash.cjs` can update either `MASTER_PASSWORD_HASH` or `ADMIN_PASSWORD_HASH`. OTP hash list is supported for the public access code (consumed upon use).
- Helmet CSP tailored to external resources (Flowise, OSM tiles, ipinfo, BigDataCloud, CDNs, Google Fonts).
- CORS allowlist enforced; CSRF middleware available (disabled by default) with header-based token validation and skip paths where needed.
- No inline script dependencies in HTML (CSP-compliant); ES module scripts and external CDNs are whitelisted.

## PWA and Offline
- Service worker:
  - Pre-caches core assets; network-first for HTML navigations, offline fallback to `offline.html`.
  - Cache-first for static assets; old caches cleaned on activate.
  - Broadcasts `SW_READY` to clients so orchestrators can avoid race conditions before init.
  - Bypass logic for `/view-records.html` to ensure fresh admin data and avoid SW-induced cache issues.
- Install prompt management on `home.html`; Notification permission is requested only upon user gesture.

## Content Pages (Guides)
- Eye, Ear, Skin guides with structured, translated instructional content and consistent semantics.
- Atoms image viewer with responsive images and perf-friendly markup.
- Triangle animation page with anime.js; considers reduced motion.

## Notable UX Details
- Marquee example prompts duplicated DOM for continuous scroll; second set is `aria-hidden`.
- Clear chat history button purges localStorage history and resets sidebar (with dynamic import of the listener module).
- Popup (user info) shows current captured metadata with visual “blue flash” updates when location info changes.
- “Images” quick-links present curated external sites (ophthalmology/ENT/dermatology) with consistent styling and target=_blank.
- On narrow screens, the four quick-action buttons stay on one compact translated row with equal heights; a few locale strings are shortened slightly to preserve fit without truncation.

## Known Constraints / Considerations
- Client log silencing is environment-driven via a build-injected meta tag (`alanui-env=production`), not domain-based.
- Service worker cache name for production is build-stamped (no manual bump needed).
- CSRF disabled by default; can be enabled for production with coordinated header updates on client.

## Current Status
- Functional, stable, accessible PWA with comprehensive documentation and tests.
- Full codebase review completed 15 Sep 2025; Memory Bank updated; improvement backlog captured in Active Context and System Patterns.

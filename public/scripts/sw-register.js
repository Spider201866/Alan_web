// Alan UI - sw-register.js | 14th January 2026, WJW
// public/scripts/sw-register.js
// Centralized Service Worker registration.
//
// Many pages previously had duplicate inline registration blocks.
// Keeping this as a standalone module avoids duplication and helps CSP hygiene.

// Note: this script may run inside an onboarding transition iframe (triangle.html).
// A service worker is per-origin; registering from an iframe is redundant and can
// cause extra update checks / console noise during the transition.
let runningInIframe = false;
try {
  runningInIframe = window.self !== window.top;
} catch {
  // If cross-origin framing ever occurs, treat as framed.
  runningInIframe = true;
}

if (!runningInIframe && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ SW registered with scope', reg.scope);
      console.log('Controller:', navigator.serviceWorker.controller);
    } catch (err) {
      console.error('❌ SW registration failed:', err);
    }
  });
}

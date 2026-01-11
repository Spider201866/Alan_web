// public/scripts/sw-register.js
// Centralized Service Worker registration.
//
// Many pages previously had duplicate inline registration blocks.
// Keeping this as a standalone module avoids duplication and helps CSP hygiene.

if ('serviceWorker' in navigator) {
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

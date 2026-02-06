// Alan UI - sw-ready.js
// Helper to run callbacks once the service worker is ready (or immediately if unsupported).

export function whenSwReady(callback, options = {}) {
  let called = false;
  const runOnce = () => {
    if (called) return;
    called = true;
    callback();
  };

  const timeoutMs = Number.isFinite(options.timeoutMs) ? options.timeoutMs : 800;

  if (!('serviceWorker' in navigator)) {
    runOnce();
    return;
  }

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_READY') {
      runOnce();
    }
  });

  if (navigator.serviceWorker.controller) {
    runOnce();
  }

  if (timeoutMs > 0) {
    setTimeout(runOnce, timeoutMs);
  }
}

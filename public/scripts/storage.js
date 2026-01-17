// Alan UI - storage.js | 16th January 2026, WJW
// Shared localStorage helpers to keep key access consistent.

export function getStoredString(key, fallback = null) {
  const value = localStorage.getItem(key);
  if (value === null || value === '') return fallback;
  return value;
}

export function getStoredNumber(key) {
  const raw = localStorage.getItem(key);
  const value = Number.parseFloat(raw);
  return Number.isNaN(value) ? null : value;
}

export function ensureSessionId() {
  let sessionId = getStoredString('sessionId');
  if (!sessionId) {
    sessionId = `user-${Date.now()}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

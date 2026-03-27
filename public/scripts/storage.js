// Alan UI - storage.js
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

export function createSessionId() {
  return `user-${Date.now()}`;
}

export function ensureSessionId() {
  let sessionId = getStoredString('sessionId');
  if (!sessionId) {
    sessionId = createSessionId();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function replaceSessionId() {
  const sessionId = createSessionId();
  localStorage.setItem('sessionId', sessionId);
  return sessionId;
}

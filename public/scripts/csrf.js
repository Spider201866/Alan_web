// public/scripts/csrf.js
// Simple helper for CSRF token extraction from the csrf cookie.

const CSRF_COOKIE_NAME = 'csrf_token';

export function getCsrfToken() {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function withCsrfHeaders(headers = {}) {
  const token = getCsrfToken();
  if (!token) return headers;
  return {
    ...headers,
    'x-csrf-token': token,
  };
}

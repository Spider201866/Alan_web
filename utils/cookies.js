// utils/cookies.js
// Shared cookie parsing helper (safe decode).

export function parseCookies(cookieHeader) {
  const result = {};
  if (!cookieHeader) return result;

  cookieHeader.split(';').forEach((part) => {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rest.join('=');

    if (!value) {
      result[key] = '';
      return;
    }

    try {
      result[key] = decodeURIComponent(value);
    } catch {
      result[key] = value;
    }
  });

  return result;
}

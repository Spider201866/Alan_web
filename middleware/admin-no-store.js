// middleware/admin-no-store.js
// Shared helper to apply no-store headers for admin responses.

export function applyAdminNoStoreHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
}

import crypto from 'crypto';
import { parseCookies } from '../utils/cookies.js';

/**
 * Simple CSRF protection middleware.
 * Uses a double-submit cookie: token stored in a cookie and echoed in a header.
 */
export default function csrfProtection(options = {}) {
  const { skipPaths = [], includePathPrefixes = [], enable = true } = options;
  const cookieName = 'csrf_token';

  const getCookieToken = (req) => {
    const cookies = parseCookies(req.headers.cookie);
    return cookies[cookieName] || null;
  };

  const shouldSetSecureCookie = (req) =>
    Boolean(req.secure) || req.headers['x-forwarded-proto'] === 'https';

  return function csrfMiddleware(req, res, next) {
    if (!enable) return next();
    if (skipPaths.includes(req.path)) return next();

    if (Array.isArray(includePathPrefixes) && includePathPrefixes.length > 0) {
      const included = includePathPrefixes.some((prefix) => req.path.startsWith(prefix));
      if (!included) return next();
    }

    const method = req.method.toUpperCase();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      const existingToken = getCookieToken(req);
      const token = existingToken || crypto.randomBytes(16).toString('hex');
      const cookieParts = [`${cookieName}=${encodeURIComponent(token)}`, 'Path=/', 'SameSite=Lax'];
      if (shouldSetSecureCookie(req)) cookieParts.push('Secure');
      res.append('Set-Cookie', cookieParts.join('; '));
      res.setHeader('X-CSRF-Token', token);
      return next();
    }
    const headerToken = req.get('x-csrf-token');
    const cookieToken = getCookieToken(req);
    if (headerToken && cookieToken && headerToken === cookieToken) {
      return next();
    }
    res.status(403).send('CSRF token mismatch');
  };
}

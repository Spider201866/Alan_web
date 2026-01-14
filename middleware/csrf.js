import crypto from 'crypto';

/**
 * Simple CSRF protection middleware.
 * Generates a token on GET requests and validates it on state-changing requests.
 * Token is shared globally and stored in memory.
 */
export default function csrfProtection(options = {}) {
  const { skipPaths = [], includePathPrefixes = [], enable = true } = options;
  const token = crypto.randomBytes(16).toString('hex');

  return function csrfMiddleware(req, res, next) {
    if (!enable) return next();
    if (skipPaths.includes(req.path)) return next();

    if (Array.isArray(includePathPrefixes) && includePathPrefixes.length > 0) {
      const included = includePathPrefixes.some((prefix) => req.path.startsWith(prefix));
      if (!included) return next();
    }

    const method = req.method.toUpperCase();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      res.setHeader('X-CSRF-Token', token);
      return next();
    }
    const headerToken = req.get('x-csrf-token');
    if (headerToken && headerToken === token) {
      return next();
    }
    res.status(403).send('CSRF token mismatch');
  };
}

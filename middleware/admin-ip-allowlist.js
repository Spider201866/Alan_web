/**
 * Builds an admin IP allowlist middleware.
 * When the allowlist is empty, the middleware is a no-op.
 */
export function createAdminIpAllowlistMiddleware(adminAllowedIps = []) {
  const allowlist = Array.isArray(adminAllowedIps) ? adminAllowedIps : [];
  const enabled = allowlist.length > 0;

  const isIpAllowed = (ip) => {
    if (!ip) return false;
    // Express can provide IPv4 as ::ffff:1.2.3.4
    const normalized = ip.startsWith('::ffff:') ? ip.slice('::ffff:'.length) : ip;
    return allowlist.includes(normalized);
  };

  return function enforceAdminIpAllowlist(req, res, next) {
    if (!enabled) return next();
    if (isIpAllowed(req.ip)) return next();
    return res.status(403).send('Forbidden');
  };
}

import crypto from 'crypto';

// Use the __Host- prefix in production for best-practice cookie scoping.
// Requirements: Secure + Path=/ + no Domain attribute (we satisfy these).
const COOKIE_NAME_DEV = 'alan_admin_session';
const COOKIE_NAME_PROD = '__Host-alan_admin_session';

const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getCookieName() {
  return process.env.NODE_ENV === 'production' ? COOKIE_NAME_PROD : COOKIE_NAME_DEV;
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8');
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToString(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  const withPadding = padded + '='.repeat(padLen);
  return Buffer.from(withPadding, 'base64').toString('utf8');
}

function timingSafeEqual(a, b) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getSigningSecret(config) {
  // We avoid introducing a new required env var by deriving a stable secret
  // from existing server-side secrets.
  const salt = config?.security?.salt || '';
  const masterHash = config?.security?.masterHash || '';

  if (!salt || !masterHash) {
    // Fallback: random secret per process (sessions invalidated on restart).
    // This is still better than failing hard in dev.
    return crypto.randomBytes(32);
  }

  return crypto.createHash('sha256').update(`${salt}:${masterHash}`).digest();
}

function signPayload(payloadB64, secret) {
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

function createSessionToken({ ttlMs = DEFAULT_TTL_MS } = {}, secret) {
  const now = Date.now();
  const payload = {
    iat: now,
    exp: now + ttlMs,
    n: base64UrlEncode(crypto.randomBytes(16)),
  };

  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const sig = signPayload(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

function parseCookies(cookieHeader) {
  const result = {};
  if (!cookieHeader) return result;

  cookieHeader.split(';').forEach((part) => {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rest.join('=');
    result[key] = decodeURIComponent(value);
  });

  return result;
}

function buildSetCookieHeader(value, { maxAgeSeconds }, { secure }) {
  const cookieName = getCookieName();
  const parts = [
    `${cookieName}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
  ];

  if (secure) parts.push('Secure');
  if (typeof maxAgeSeconds === 'number') parts.push(`Max-Age=${maxAgeSeconds}`);

  return parts.join('; ');
}

export function setAdminSessionCookie(res, config, { ttlMs = DEFAULT_TTL_MS } = {}) {
  const secret = getSigningSecret(config);
  const token = createSessionToken({ ttlMs }, secret);

  const secure = process.env.NODE_ENV === 'production';
  const maxAgeSeconds = Math.floor(ttlMs / 1000);
  res.setHeader('Set-Cookie', buildSetCookieHeader(token, { maxAgeSeconds }, { secure }));
}

export function clearAdminSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', buildSetCookieHeader('', { maxAgeSeconds: 0 }, { secure }));
}

export function requireAdminSession(config) {
  const secret = getSigningSecret(config);

  return function requireAdminSessionMiddleware(req, res, next) {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies[getCookieName()];
      if (!token) return res.status(401).send('Unauthorized');

      const [payloadB64, sig] = token.split('.');
      if (!payloadB64 || !sig) return res.status(401).send('Unauthorized');

      const expected = signPayload(payloadB64, secret);
      if (!timingSafeEqual(sig, expected)) return res.status(401).send('Unauthorized');

      const payload = JSON.parse(base64UrlDecodeToString(payloadB64));
      if (!payload?.exp || typeof payload.exp !== 'number')
        return res.status(401).send('Unauthorized');
      if (Date.now() > payload.exp) return res.status(401).send('Session expired');

      return next();
    } catch {
      return res.status(401).send('Unauthorized');
    }
  };
}

// Exposed for tests.
export const __testOnly = {
  COOKIE_NAME_DEV,
  COOKIE_NAME_PROD,
};

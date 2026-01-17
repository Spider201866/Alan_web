import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import simpleCors from './middleware/cors.js';
import rateLimit from 'express-rate-limit';
import csrfProtection from './middleware/csrf.js';
import flowiseProxy from './middleware/flowiseProxy.js';
import defaultConfig from './config/index.js';
import apiRoutesFactory from './routes/api.js';
// import webRoutesFactory from './routes/web.js'; // No longer needed
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { globalErrorHandler, notFound } from './middleware/error.js';
import { flowiseLimiter, osmTilesLimiter, recordInfoLimiter } from './middleware/rateLimiters.js';
import { applyAdminNoStoreHeaders } from './middleware/admin-no-store.js';

// Backward-compatible general limiter (100 requests / 15 min)
// Also used as a fallback if a per-endpoint limiter isn't provided.
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(configToUse) {
  const app = express();

  const adminAllowedIps = Array.isArray(configToUse.adminAllowedIps)
    ? configToUse.adminAllowedIps
    : [];

  const adminIpAllowlistEnabled = adminAllowedIps.length > 0;

  const isIpAllowed = (ip) => {
    if (!ip) return false;
    // Express can provide IPv4 as ::ffff:1.2.3.4
    const normalized = ip.startsWith('::ffff:') ? ip.slice('::ffff:'.length) : ip;
    return adminAllowedIps.includes(normalized);
  };

  const enforceAdminIpAllowlist = (req, res, next) => {
    if (!adminIpAllowlistEnabled) return next();
    const ip = req.ip;
    if (isIpAllowed(ip)) return next();
    return res.status(403).send('Forbidden');
  };

  // Security headers & compression
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(compression());

  // Content Security Policy
  // Single source of truth: config/index.js -> config.cspDirectives
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        ...(configToUse.cspDirectives || {}),
      },
    })
  );

  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());

  // Additional low-risk security headers.
  // (Helmet doesn't set all of these by default.)
  app.use((req, res, next) => {
    // Prevent other origins from reading our resources in a cross-origin context.
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    // Provide cross-origin isolation for better browser protections.
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    // Opt into origin-keyed agent clusters.
    res.setHeader('Origin-Agent-Cluster', '?1');
    // Disable DNS prefetch.
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    // Adobe crossdomain.xml / Flash / PDF permissions.
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    // IE download security.
    res.setHeader('X-Download-Options', 'noopen');
    next();
  });

  // Permissions-Policy (feature policy)
  // Keep geolocation enabled for this origin (the app uses it), deny other sensitive features.
  app.use((req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      [
        'geolocation=(self)',
        'camera=()',
        'microphone=()',
        'payment=()',
        'usb=()',
        'xr-spatial-tracking=()',
        // Fullscreen can still be useful in some UIs.
        'fullscreen=(self)',
      ].join(', ')
    );
    next();
  });

  // CORS, JSON bodies & CSRF
  const corsOrigins = ['http://localhost:3000', ...(configToUse.allowedOrigins || [])];
  app.use(
    simpleCors({
      enable: Boolean(configToUse.enableCors),
      allowedOrigins: corsOrigins,
    })
  );

  // Proxy Flowise API through our own server to avoid browser CORS issues.
  // IMPORTANT: This must be mounted BEFORE body parsers / CSRF so the raw request
  // stream is still available for forwarding (especially for streaming/EventSource).
  // Frontend should use apiHost: '/flowise'.
  app.use(
    '/flowise',
    flowiseLimiter,
    flowiseProxy({ targetBaseUrl: 'https://flowiseai-railway-production-fecf.up.railway.app' })
  );

  app.use(express.json());
  app.use(
    csrfProtection({
      enable: Boolean(configToUse.enableCsrf),
      skipPaths: ['/api/admin-login', '/api/admin-logout', '/api/record-info'],
    })
  );

  // OSM tile proxy (used by the admin View Records map).
  // Some browsers/extensions block cross-site map tiles; proxying makes it same-origin.
  app.get('/osm-tiles/:z/:x/:y.png', osmTilesLimiter, async (req, res, next) => {
    try {
      const z = Number(req.params.z);
      const x = Number(req.params.x);
      const y = Number(req.params.y);

      // Basic bounds to avoid abuse / pathological requests.
      if (!Number.isInteger(z) || z < 0 || z > 19) return res.status(400).send('Invalid z');
      if (!Number.isInteger(x) || x < 0) return res.status(400).send('Invalid x');
      if (!Number.isInteger(y) || y < 0) return res.status(400).send('Invalid y');

      const upstreamUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
      const upstream = await fetch(upstreamUrl, {
        headers: {
          // OSM tile usage policy prefers a descriptive UA
          'User-Agent': 'AlanUI/1.0 (admin records map tile proxy)',
        },
      });

      if (!upstream.ok) {
        return res.status(upstream.status).send('Failed to fetch tile');
      }

      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');

      if (!upstream.body) {
        return res.status(502).send('Tile response missing body');
      }

      Readable.fromWeb(upstream.body).pipe(res);
    } catch (err) {
      next(err);
    }
  });

  if (process.env.NODE_ENV === 'production') {
    // Production serving logic...
    console.log('Serving from dist directory');
    const distDir = path.join(__dirname, 'dist');

    // Admin page should not be cached or indexed.
    app.get('/view-records.html', enforceAdminIpAllowlist, (req, res) => {
      applyAdminNoStoreHeaders(res);
      res.sendFile(path.join(distDir, 'view-records.html'));
    });

    app.get('/', (req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
    app.use(express.static(distDir));
  } else {
    // Development serving logic...
    console.log('Serving from public directory');
    const publicDir = path.join(__dirname, 'public');

    // Admin page should not be cached or indexed.
    app.get('/view-records.html', enforceAdminIpAllowlist, (req, res) => {
      applyAdminNoStoreHeaders(res);
      res.sendFile(path.join(publicDir, 'view-records.html'));
    });

    app.use(express.static(publicDir));
  }

  // Mount routes
  app.use(
    '/api',
    apiRoutesFactory(
      {
        generalLimiter,
        recordInfoLimiter,
      },
      configToUse
    )
  );
  // app.use('/', webRoutesFactory()); // This is not needed and was causing issues with asset loading.

  // 404 & error handlers
  app.use(notFound);
  app.use(globalErrorHandler);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createApp(defaultConfig);
  app.listen(defaultConfig.port, () => {
    console.log(`Listening on http://localhost:${defaultConfig.port}`);
  });
}

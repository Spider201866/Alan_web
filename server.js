import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import simpleCors from './middleware/cors.js';
import rateLimit from 'express-rate-limit';
import csrfProtection from './middleware/csrf.js';
import defaultConfig from './config/index.js';
import apiRoutesFactory from './routes/api.js';
import webRoutesFactory from './routes/web.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { globalErrorHandler, notFound } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(configToUse) {
  const app = express();

  // Security headers & compression
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(compression());

  // A corrected Content Security Policy that allows all necessary resources.
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdnjs.cloudflare.com',
          'https://unpkg.com',
        ],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://unpkg.com',
        ],
        // --- THIS IS THE FINAL FIX ---
        // Add ipinfo.io to the list of allowed connection sources
        'connect-src': [
          "'self'",
          'https://flowiseai-railway-production-fecf.up.railway.app',
          'https://api.bigdatacloud.net',
          'https://ipinfo.io',
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'https://unpkg.com',
        ],
      },
    })
  );
  // --- END OF FIX ---

  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());

  // CORS, JSON bodies & CSRF
  const corsOrigins = ['http://localhost:3000', ...(configToUse.allowedOrigins || [])];
  app.use(
    simpleCors({
      enable: Boolean(configToUse.enableCors),
      allowedOrigins: corsOrigins,
    })
  );

  app.use(express.json());
  app.use(
    csrfProtection({
      enable: Boolean(configToUse.enableCsrf),
      skipPaths: ['/api/fetch-records'],
    })
  );

  if (process.env.NODE_ENV === 'production') {
    // Production serving logic...
    console.log('Serving from dist directory');
    const distDir = path.join(__dirname, 'dist');
    app.get('/', (req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
    app.use(express.static(distDir));
  } else {
    // Development serving logic...
    console.log('Serving from public directory');
    const publicDir = path.join(__dirname, 'public');
    app.use(express.static(publicDir));
  }

  // Rate limiting for API
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Mount routes
  app.use('/api', apiRoutesFactory(limiter, configToUse));
  app.use('/', webRoutesFactory());

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

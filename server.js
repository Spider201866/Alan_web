import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import simpleCors from './middleware/cors.js';
import rateLimit from 'express-rate-limit';
import csrfProtection from './middleware/csrf.js';
// path is not directly used here anymore for express.static, config handles it.
import defaultConfig from './config/index.js'; // Renamed for clarity
import apiRoutesFactory from './routes/api.js';
import webRoutesFactory from './routes/web.js';
import { globalErrorHandler, notFound } from './middleware/error.js';

/**
 * Creates and configures the Express application.
 * This function sets up all global middleware, routes, and error handlers.
 * @param {Object} configToUse - The application configuration object.
 * @returns {import('express').Application} The configured Express application instance.
 */
export function createApp(configToUse) {
  const app = express();

  // Disable the X-Powered-By header for security
  app.disable('x-powered-by');

  // Enable trust proxy for Railway/production reverse proxy environments
  app.set('trust proxy', 1);

  // global middleware
  app.use(compression());
  app.use(helmet(configToUse.cspOptions));
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());
  app.use(
    simpleCors({
      enable: Boolean(configToUse.enableCors),
      allowedOrigins: configToUse.allowedOrigins,
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
    console.log('Serving from dist directory');
    app.use(express.static('dist'));
  } else {
    app.use(express.static(configToUse.paths.public));
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Pass the config to the route factories
  app.use('/api', apiRoutesFactory(limiter, configToUse));
  app.use('/', webRoutesFactory());

  app.use(notFound);
  app.use(globalErrorHandler);

  return app;
}

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const app = createApp(defaultConfig); // Use default config for normal run
  app.listen(defaultConfig.port, () =>
    console.log(`Listening on http://localhost:${defaultConfig.port}`)
  );
}

// For testing, we export createApp so tests can pass their own config
// The direct export of 'app' is removed as it's created by createApp

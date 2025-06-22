import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
// path is not directly used here anymore for express.static, config handles it.
import defaultConfig from './config/index.js'; // Renamed for clarity
import apiRoutesFactory from './routes/api.js';
import webRoutesFactory from './routes/web.js';
import { globalErrorHandler, notFound } from './middleware/error.js';

export function createApp(configToUse) {
  const app = express();

  // global middleware
  app.use(compression());
  app.use(helmet(configToUse.cspOptions));
  app.use(cors());
  app.use(express.json());
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

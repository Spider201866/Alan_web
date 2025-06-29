// config/index.js
// Central configuration file for the application. It validates and exports all environment variables and constants.

import { fileURLToPath } from 'url';
import path from 'path';
import validateEnv from './validateEnv.js'; // Import the validation function

// Call validateEnv to get the validated environment variables
const env = validateEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');

const cspOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://cdn.jsdelivr.net',
        'https://alan.up.railway.app',
        'https://cdnjs.cloudflare.com',
        'https://unpkg.com',
      ],
      styleSrc: [
        "'self'",
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://unpkg.com',
        "'unsafe-inline'",
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: [
        "'self'",
        'data:',
        'https://*.tile.openstreetmap.org',
        'https://unpkg.com',
        'https://raw.githubusercontent.com',
      ],
      connectSrc: [
        "'self'",
        'https://alan.up.railway.app',
        'https://ipinfo.io',
        'https://unpkg.com',
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://flowiseai-railway-production-fecf.up.railway.app',
        'https://api.bigdatacloud.net',
      ],
    },
  },
};

const config = {
  port: env.PORT,
  paths: {
    public: path.join(root, 'public'),
    userInfo: path.join(root, 'user-info.json'),
    userHistory: path.join(root, 'user-history.json'),
  },
  security: {
    salt: env.PASSWORD_SALT,
    masterHash: env.MASTER_PASSWORD_HASH,
    otpHashes: new Set((env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)),
  },
  allowedOrigins: (env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean),
  enableCsrf: env.ENABLE_CSRF === 'true',
  cspOptions: cspOptions,
};

export default config;

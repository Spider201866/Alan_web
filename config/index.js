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

// CSP directives (consumed by server.js). Keep this as the single source of truth.
// NOTE: `server.js` will merge these into Helmet's default directives.
// We use dashed directive names here to match Helmet.
const cspDirectives = {
  'default-src': ["'self'"],
  'img-src': ["'self'", 'data:', '*.tile.openstreetmap.org', 'raw.githubusercontent.com'],
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
  enableCors: env.ENABLE_CORS !== 'false',
  enableCsrf: env.ENABLE_CSRF === 'true',
  cspDirectives,
};

export default config;

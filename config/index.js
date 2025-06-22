import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');

function envVar(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`CRITICAL: Missing environment variable: ${name}. Exiting.`);
    process.exit(1);
  }
  return v;
}

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
  port: process.env.PORT || 3000,
  paths: {
    public: path.join(root, 'public'),
    userInfo: path.join(root, 'user-info.json'),
    userHistory: path.join(root, 'user-history.json'),
  },
  security: {
    salt: envVar('PASSWORD_SALT'),
    masterHash: envVar('MASTER_PASSWORD_HASH'),
    otpHashes: new Set((process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)),
  },
  cspOptions: cspOptions,
};

export default config;

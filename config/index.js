import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assuming config/index.js is in AlanUI/config/index.js
// __dirname will be AlanUI/config
// root will be AlanUI/
const root = path.resolve(__dirname, '..');

function envVar(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`CRITICAL: Missing environment variable: ${name}. Exiting.`);
    process.exit(1); // Stop the server if critical env var is missing
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
        'https://unpkg.com', // Added for Leaflet
      ],
      styleSrc: [
        "'self'",
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://unpkg.com', // Added for Leaflet
        "'unsafe-inline'",
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: [
        "'self'",
        'data:',
        'https://*.tile.openstreetmap.org',
        'https://unpkg.com',
        'https://raw.githubusercontent.com',
      ], // Added for Leaflet map tiles & custom red icons
      connectSrc: [
        "'self'",
        'https://alan.up.railway.app',
        'https://ipinfo.io', // Geolocation service
        'https://unpkg.com', // Added for Leaflet (though not strictly connect, good to have if it makes other sub-requests)
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://flowiseai-railway-production-fecf.up.railway.app',
        'https://api.bigdatacloud.net',
      ],
    },
  },
  noSniff: true, // From original helmet config in server.cjs
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
  cspOptions: cspOptions, // Exporting cspOptions to be used in server.js
};

export default config;

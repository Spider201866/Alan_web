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

// A very permissive CSP for debugging purposes.
// This is NOT secure and should be rebuilt carefully.
const cspOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'data:',
        'https://*',
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

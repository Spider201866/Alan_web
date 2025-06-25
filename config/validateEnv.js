import { cleanEnv, str, port } from 'envalid';
import dotenv from 'dotenv';

// Export a function that takes processEnv and an optional dotenvConfig function
export default function validateEnv(processEnv = process.env, dotenvConfig = dotenv.config) {
  dotenvConfig(); // Load .env file using the provided or default dotenv.config

  const env = cleanEnv(processEnv, {
    PORT: port({ default: 3000 }),
    PASSWORD_SALT: str(),
    MASTER_PASSWORD_HASH: str(),
    ONE_TIME_PASSWORD_HASHES: str({ default: '' }),
    CORS_ALLOWED_ORIGINS: str({ default: '' }),
    API_BASE_URL: str({ default: '' }), // Assuming this might be used elsewhere
    SENTRY_DSN: str({ default: '' }), // Assuming this might be used elsewhere
    SENTRY_FRONTEND_DSN: str({ default: '' }), // Assuming this might be used elsewhere
  });

  return env;
}

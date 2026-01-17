import { cleanEnv, str, port } from 'envalid';
import dotenv from 'dotenv';

/**
 * Validates and cleans the environment variables using envalid.
 * @param {Object} [processEnv=process.env] - The environment variables to validate.
 * @param {Function} [dotenvConfig=dotenv.config] - The function to load the .env file.
 * @returns {Object} The validated and cleaned environment variables.
 */
export default function validateEnv(processEnv = process.env, dotenvConfig = dotenv.config) {
  dotenvConfig(); // Load .env file using the provided or default dotenv.config

  const env = cleanEnv(processEnv, {
    PORT: port({ default: 3000 }),
    PASSWORD_SALT: str(),
    MASTER_PASSWORD_HASH: str(),
    ONE_TIME_PASSWORD_HASHES: str({ default: '' }),
    CORS_ALLOWED_ORIGINS: str({ default: '' }),
    ENABLE_CORS: str({ default: 'true' }),
    ENABLE_CSRF: str({ default: 'true' }),
    ADMIN_ALLOWED_IPS: str({ default: '' }),
  });

  return env;
}

import crypto from 'crypto';
import config from '../config/index.js'; // Import the centralized config

/**
 * Helper: Hashes a given string using SHA-256 with a salt.
 * @param {string} str - The string to hash.
 * @returns {string} The SHA-256 hash.
 */
function hashPassword(str = '') {
  return crypto
    .createHash('sha256')
    .update(str + config.security.salt) // Use salt from config
    .digest('hex');
}

/**
 * Middleware: Validates master or one-time password.
 */
export function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    // Added a check for missing password
    return res.status(400).send('Password is required');
  }
  const hashed = hashPassword(password);

  // Use masterHash and otpHashes from config
  if (hashed === config.security.masterHash || config.security.otpHashes.has(hashed)) {
    if (config.security.otpHashes.has(hashed)) {
      config.security.otpHashes.delete(hashed); // Modify the Set in the config object
    }
    return next(); // Password is valid, proceed to the next handler
  }
  res.status(401).send('Invalid password');
}

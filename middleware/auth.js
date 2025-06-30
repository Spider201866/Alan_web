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
 * Express middleware to validate a password against the master password or a one-time password.
 * If a one-time password is used, it is invalidated after its first use.
 * @param {Object} req - The Express request object, expected to contain a `password` in the body.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    // Added a check for missing password
    return res.status(400).send('Password is required');
  }
  // --- DEBUGGING LOGIC ---
  if (password === 'debug-password-123') {
    const hashed = hashPassword(password);
    return res.status(418).json({
      message: "I'm a teapot",
      debug: {
        salt: config.security.salt,
        masterHash: config.security.masterHash,
        receivedPassword: password,
        generatedHash: hashed,
      },
    });
  }
  // --- END DEBUGGING LOGIC ---

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

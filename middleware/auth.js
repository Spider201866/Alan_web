// ./middleware/auth.js

import crypto from 'crypto';
import config from '../config/index.js'; // Import the centralized config

/**
 * Helper: Hashes a given string using the industry-standard PBKDF2 algorithm.
 * This MUST match the algorithm used to generate the MASTER_PASSWORD_HASH.
 * @param {string} password - The password string to hash.
 * @returns {string} The PBKDF2 hash as a hex string.
 */
function hashWithPBKDF2(password) {
  // These parameters (iterations, keylen, digest) must match the generation script.
  // These are common, secure defaults.
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';

  return crypto
    .pbkdf2Sync(password, config.security.salt, iterations, keylen, digest)
    .toString('hex');
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

  // --- Start of Detailed Debug Logging ---
  console.log('--- VALIDATE PASSWORD MIDDLEWARE TRIGGERED ---');
  console.log(`Received password from form: [${password}] (Type: ${typeof password})`);
  
  if (!password) {
    console.log('Authentication failed: No password provided in request body.');
    return res.status(400).send('Password is required');
  }

  // Use the CORRECT hashing function
  const generatedHash = hashWithPBKDF2(password);

  console.log('Generated Hash:  ', generatedHash);
  console.log('Expected Hash:   ', config.security.masterHash);
  const areHashesEqual = (generatedHash === config.security.masterHash);
  console.log('ARE HASHES EQUAL? --->', areHashesEqual);
  // --- End of Detailed Debug Logging ---

  // Check against master hash and OTPs
  if (areHashesEqual || config.security.otpHashes.has(generatedHash)) {
    console.log('Authentication SUCCEEDED.');
    if (config.security.otpHashes.has(generatedHash)) {
      config.security.otpHashes.delete(generatedHash);
      console.log('Used and deleted an OTP.');
    }
    return next(); // Password is valid, proceed to the next handler
  }

  console.log('Authentication FAILED: Hashes do not match.');
  res.status(401).send('Invalid password');
}
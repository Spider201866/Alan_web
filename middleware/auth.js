// ./middleware/auth.js

import crypto from 'crypto';
import config from '../config/index.js'; // Import the centralized config

function hashWithPBKDF2(password) {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';

  // --- THIS IS THE CRITICAL LINE ---
  // We are logging the salt right before it is used by the crypto function.
  console.log('Salt being used by crypto:', config.security.salt);
  
  return crypto
    .pbkdf2Sync(password, config.security.salt, iterations, keylen, digest)
    .toString('hex');
}

export function validatePassword(req, res, next) {
  const { password } = req.body;

  console.log('--- VALIDATE PASSWORD MIDDLEWARE TRIGGERED ---');
  console.log(`Received password from form: [${password}] (Type: ${typeof password})`);
  
  if (!password) {
    console.log('Authentication failed: No password provided.');
    return res.status(400).send('Password is required');
  }

  const generatedHash = hashWithPBKDF2(password);

  console.log('Generated Hash:  ', generatedHash);
  console.log('Expected Hash:   ', config.security.masterHash);
  const areHashesEqual = (generatedHash === config.security.masterHash);
  console.log('ARE HASHES EQUAL? --->', areHashesEqual);

  if (areHashesEqual || config.security.otpHashes.has(generatedHash)) {
    console.log('Authentication SUCCEEDED.');
    if (config.security.otpHashes.has(generatedHash)) {
      config.security.otpHashes.delete(generatedHash);
      console.log('Used and deleted an OTP.');
    }
    return next();
  }

  console.log('Authentication FAILED: Hashes do not match.');
  res.status(401).send('Invalid password');
}
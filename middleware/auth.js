import crypto from 'crypto';
import config from '../config/index.js';

function hashWithPBKDF2(password) {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';

  return crypto
    .pbkdf2Sync(password, config.security.salt, iterations, keylen, digest)
    .toString('hex');
}

export function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).send('Password is required');
  }

  const generatedHash = hashWithPBKDF2(password);

  if (generatedHash === config.security.masterHash || config.security.otpHashes.has(generatedHash)) {
    if (config.security.otpHashes.has(generatedHash)) {
      config.security.otpHashes.delete(generatedHash);
    }
    return next();
  }

  res.status(401).send('Invalid password');
}
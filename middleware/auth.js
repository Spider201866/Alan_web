import crypto from 'crypto';
import config from '../config/index.js';

export function validatePasswordWithConfig(configToUse) {
  return function validatePassword(req, res, next) {
    const { password } = req.body;

    if (!password) {
      return res.status(400).send('Password is required');
    }

    const iterations = 100000;
    const keylen = 32;
    const digest = 'sha256';

    const generatedHash = crypto
      .pbkdf2Sync(password, configToUse.security.salt, iterations, keylen, digest)
      .toString('hex');

    if (
      generatedHash === configToUse.security.masterHash ||
      configToUse.security.otpHashes.has(generatedHash)
    ) {
      if (configToUse.security.otpHashes.has(generatedHash)) {
        configToUse.security.otpHashes.delete(generatedHash);
      }
      return next();
    }

    res.status(401).send('Invalid password');
  };
}

export function validatePassword(req, res, next) {
  return validatePasswordWithConfig(config)(req, res, next);
}

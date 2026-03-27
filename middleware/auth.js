import crypto from 'crypto';
import config from '../config/index.js';

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
}

function createPasswordValidatorWithConfig(configToUse, { hashSelector, allowOtp = false } = {}) {
  return function validatePassword(req, res, next) {
    const { password } = req.body;

    if (!password) {
      return res.status(400).send('Password is required');
    }

    const generatedHash = hashPassword(password, configToUse.security.salt);
    const expectedHash = hashSelector(configToUse.security || {});

    if (generatedHash === expectedHash) {
      return next();
    }

    if (allowOtp && configToUse.security.otpHashes.has(generatedHash)) {
      configToUse.security.otpHashes.delete(generatedHash);
      return next();
    }

    res.status(401).send('Invalid password');
  };
}

export function validatePublicPasswordWithConfig(configToUse) {
  return createPasswordValidatorWithConfig(configToUse, {
    hashSelector: (security) => security.publicHash || security.masterHash,
    allowOtp: true,
  });
}

export function validateAdminPasswordWithConfig(configToUse) {
  return createPasswordValidatorWithConfig(configToUse, {
    hashSelector: (security) => security.adminHash || security.publicHash || security.masterHash,
  });
}

export function validatePasswordWithConfig(configToUse) {
  return validatePublicPasswordWithConfig(configToUse);
}

export function validatePassword(req, res, next) {
  return validatePublicPasswordWithConfig(config)(req, res, next);
}

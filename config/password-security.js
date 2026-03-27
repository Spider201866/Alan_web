import crypto from 'crypto';

export function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
}

export function resolvePasswordHashes(env) {
  const publicHash = env.AUTH_PASSWORD
    ? hashPassword(env.AUTH_PASSWORD, env.PASSWORD_SALT)
    : env.MASTER_PASSWORD_HASH;

  const adminHash =
    env.ADMIN_PASSWORD_HASH ||
    (env.ADMIN_PASSWORD ? hashPassword(env.ADMIN_PASSWORD, env.PASSWORD_SALT) : publicHash);

  return {
    publicHash,
    adminHash,
  };
}

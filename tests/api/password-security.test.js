/* eslint-env jest */

import crypto from 'crypto';
import { resolvePasswordHashes } from '../../config/password-security.js';

describe('password security config', () => {
  it('prefers AUTH_PASSWORD over legacy MASTER_PASSWORD_HASH for public access', () => {
    const salt = 'test-salt';
    const authPassword = 'public-123456';
    const legacyHash = crypto
      .pbkdf2Sync('old-public-password', salt, 100000, 32, 'sha256')
      .toString('hex');

    const { publicHash } = resolvePasswordHashes({
      PASSWORD_SALT: salt,
      AUTH_PASSWORD: authPassword,
      MASTER_PASSWORD_HASH: legacyHash,
      ADMIN_PASSWORD: '',
      ADMIN_PASSWORD_HASH: '',
    });

    const expectedHash = crypto
      .pbkdf2Sync(authPassword, salt, 100000, 32, 'sha256')
      .toString('hex');

    expect(publicHash).toBe(expectedHash);
    expect(publicHash).not.toBe(legacyHash);
  });
});

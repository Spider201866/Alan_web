// Alan UI - generate-hash.cjs
// This script now uses pbkdf2Sync to match the authentication middleware.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SALT = process.env.PASSWORD_SALT;
const passwordToHash = process.argv[2]; // Get password from command line argument
const targetKey = process.argv[3] || 'MASTER_PASSWORD_HASH';
const allowedKeys = new Set(['MASTER_PASSWORD_HASH', 'ADMIN_PASSWORD_HASH']);

if (!passwordToHash) {
  console.error('Please provide the password as a command-line argument.');
  console.error('Usage: node generate-hash.cjs <password> [MASTER_PASSWORD_HASH|ADMIN_PASSWORD_HASH]');
  process.exit(1);
}

if (!allowedKeys.has(targetKey)) {
  console.error(`Unsupported target key: ${targetKey}`);
  console.error('Use MASTER_PASSWORD_HASH or ADMIN_PASSWORD_HASH.');
  process.exit(1);
}

if (!SALT) {
  console.error('Please define PASSWORD_SALT in your .env file first.');
} else {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';

  const hash = crypto
    .pbkdf2Sync(passwordToHash, SALT, iterations, keylen, digest)
    .toString('hex');

  console.log('Your new PBKDF2 hash is:');
  console.log(hash);

  const envPath = path.resolve(__dirname, '.env');
  let envContent = fs.readFileSync(envPath, 'utf8');

  const hashRegex = new RegExp(`^${targetKey}=.*$`, 'm');

  if (hashRegex.test(envContent)) {
    envContent = envContent.replace(hashRegex, `${targetKey}=${hash}`);
  } else {
    envContent += `\n${targetKey}=${hash}`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log(`.env file updated successfully with ${targetKey}.`);
}

// Alan UI - generate-hash.cjs
// This script now uses pbkdf2Sync to match the authentication middleware.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SALT = process.env.PASSWORD_SALT;
const passwordToHash = process.argv[2]; // Get password from command line argument

if (!passwordToHash) {
  console.error('Please provide the password as a command-line argument.');
  console.error('Usage: node generate-hash.cjs <password>');
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

  const hashKey = 'MASTER_PASSWORD_HASH';
  const hashRegex = new RegExp(`^${hashKey}=.*$`, 'm');

  if (hashRegex.test(envContent)) {
    envContent = envContent.replace(hashRegex, `${hashKey}=${hash}`);
  } else {
    envContent += `\n${hashKey}=${hash}`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log('.env file updated successfully with the new hash.');
}

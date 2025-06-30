// Alan UI - generate-hash.js | 19th June 2025, WJW
// generate-hash.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SALT = process.env.PASSWORD_SALT;
const passwordToHash = '662023'; // <-- Put your desired password here

if (!SALT) {
  console.error('Please define PASSWORD_SALT in your .env file first.');
} else {
  const hash = crypto
    .createHash('sha256')
    .update(passwordToHash + SALT)
    .digest('hex');

  console.log('Your new salted hash is:');
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
  console.log('.env file updated successfully.');
}

// generate-hash.js
const crypto = require('crypto');
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
}

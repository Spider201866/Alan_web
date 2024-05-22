const { Redis } = require('@upstash/redis');

// Replace the URL and token with your actual Upstash Redis credentials
const redis = new Redis({
  url: 'https://sacred-turkey-52125.upstash.io',
  token: 'AcudAAIncDFhMmJhZDJhMTUwYTE0ZjQ5OTY5YWIwZjhkMTBkNzU2ZnAxNTIxMjU',
});

module.exports = redis;

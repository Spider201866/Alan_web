const { Redis } = require('@upstash/redis');

// Replace the URL and token with your actual Upstash Redis credentials
const redis = new Redis({
  url: 'https://sacred-turkey-52125.upstash.io',
  token: 'AcudAAIncDFhMmJhZDJhMTUwYTE0ZjQ5OTY5YWIwZjhkMTBkNzU2ZnAxNTIxMjU',
});

async function getChatData(chatId) {
  try {
    const data = await redis.lrange(chatId, 0, -1); // Retrieve all elements in the list
    console.log(`Data retrieved from Redis for chatId ${chatId}: ${data}`);
    return data;
  } catch (error) {
    console.error(`Error retrieving data from Redis for chatId ${chatId}:`, error);
    throw error;
  }
}

module.exports = {
  get: getChatData,
};

require('dotenv').config();
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
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

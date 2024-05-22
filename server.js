const express = require('express');
const redis = require('./redisClient.js'); // Import the Redis client

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the public directory

// API endpoint to fetch chat sessions from Redis
app.get('/api/getChatSession', async (req, res) => {
  const chatId = req.query.chatId;
  try {
    const chatData = await redis.get(chatId); // Fetch chat data from Redis
    res.json(chatData);
  } catch (error) {
    console.error('Error fetching chat session:', error);
    res.status(500).json({ error: 'Failed to fetch chat session' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

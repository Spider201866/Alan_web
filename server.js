const express = require('express');
const path = require('path');
const redis = require('./public/redisClient.js'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getChatSession', async (req, res) => {
  const chatId = req.query.chatId;
  console.log(`Fetching chat session for ID: ${chatId}`);
  try {
    const chatData = await redis.get(chatId); // Fetch chat data from Redis
    console.log(`Fetched data from Redis: ${JSON.stringify(chatData)}`);
    if (chatData && chatData.length > 0) {
      res.json(chatData); // Directly send the retrieved data as JSON
    } else {
      console.log('No data found for the given chatId');
      res.json(null);
    }
  } catch (error) {
    console.error('Error fetching chat session:', error.message);
    res.status(500).json({ error: 'Failed to fetch chat session', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

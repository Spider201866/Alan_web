const express = require('express');
const path = require('path');
const redis = require('./public/redisClient.js'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000; // Use the port from the environment or default to 3000

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

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

// Default route to serve the homepage or a message
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html from public folder
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

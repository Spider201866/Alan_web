const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve your static site

// Middleware to log IP addresses
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Access from IP: ${ip}`);
  fs.appendFile('access.log', `Access from IP: ${ip}\n`, (err) => {
    if (err) throw err;
  });
  next();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

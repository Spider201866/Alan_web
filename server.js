const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// IP address logging middleware
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Access from IP: ${ip}`);
  fs.appendFile('access.log', `Access from IP: ${ip}\n`, err => {
    if (err) {
      console.error('Error writing to access.log', err);
    }
  });
  next();
});

// Serve your static site
app.use(express.static('public'));

// Example of another route
app.get('/another-route', (req, res) => {
  res.send('Response from another route');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

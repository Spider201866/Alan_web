const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the 'trust proxy' setting
app.set('trust proxy', true);

// Serve your static site
app.use(express.static('public'));

// Ensure access.log file exists
const logFilePath = path.join(__dirname, 'access.log');
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '', { flag: 'a' });
  console.log('Created access.log file');
}

// IP address logging middleware with additional debugging
app.use((req, res, next) => {
  console.log('Headers:', req.headers);  // Log all headers to debug
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Access from IP: ${ip}`);
  fs.appendFile(logFilePath, `Access from IP: ${ip}\n`, err => {
    if (err) {
      console.error('Error writing to access.log', err);
    } else {
      console.log('Logged IP to access.log');
    }
  });
  next();
});

// Example of another route
app.get('/another-route', (req, res) => {
  res.send('Response from another route');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

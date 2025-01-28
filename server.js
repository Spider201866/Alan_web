const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Change this to your desired password, or rely on an environment variable
const PASSWORD = process.env.AUTH_PASSWORD || '662023';
console.log("Configured password:", PASSWORD); // For debugging

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main onboarding page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the view-records page
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

// 1) Endpoint to record user information
app.post('/record-info', (req, res) => {
  /**
   * Expecting body fields from the onboarding:
   * sessionId (optional if you use it)
   * name, role, experience, focus (array),
   * latitude, longitude, country, iso2, classification, area,
   * contactInfo, dateTime, version, selectedAgent, etc.
   */
  const {
    sessionId,
    name,
    role,
    experience,
    focus,             // array of strings
    latitude,
    longitude,
    country,
    iso2,
    classification,
    area,
    contactInfo,
    dateTime,
    version,
    selectedAgent
  } = req.body;

  // Build an object to store
  const userInfo = {
    sessionId,     // if null or undefined, it just remains empty
    name,
    role,
    experience,
    focus,
    latitude,
    longitude,
    country,
    iso2,
    classification,
    area,
    contactInfo,
    dateTime,
    version,
    selectedAgent
  };

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    let json = [];
    if (!err) {
      json = JSON.parse(data);
    }

    // If you are using sessionId to detect existing user, do that here:
    let existingUserIndex = -1;
    if (sessionId) {
      existingUserIndex = json.findIndex(record => record.sessionId === sessionId);
    }

    if (existingUserIndex !== -1) {
      // If user already exists, increment refreshCount
      if (!json[existingUserIndex].refreshCount) {
        json[existingUserIndex].refreshCount = 1;
      }
      json[existingUserIndex].refreshCount += 1;

      // Optionally update other fields if needed:
      json[existingUserIndex] = { 
        ...json[existingUserIndex],
        ...userInfo 
      };
    } else {
      // If new user
      userInfo.refreshCount = 1;
      json.push(userInfo);
    }

    fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing user info:", writeErr);
        return res.status(500).send('Error saving data');
      }
      // End the response
      res.send('OK');
    });
  });
});

// 2) Endpoint to fetch records with password protection
app.post('/fetch-records', (req, res) => {
  const { password } = req.body;
  console.log("Received password:", password); // debug log

  if (password !== PASSWORD) {
    return res.status(401).send('Invalid password');
  }

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If file doesn't exist, return empty array
        return res.json([]);
      } else {
        console.error("Error reading user-info.json:", err);
        return res.status(500).send('Error reading user info');
      }
    }

    const records = JSON.parse(data);
    // Return them as JSON
    res.json(records);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

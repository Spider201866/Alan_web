const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Change this to your own desired password, or rely on an environment variable
const PASSWORD = process.env.AUTH_PASSWORD || '662023';
console.log("Configured password:", PASSWORD);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve view-records.html on GET /view-records
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

// 1) Store user info (POST /record-info)
app.post('/record-info', (req, res) => {
  // Extract fields sent by the onboarding page
  let {
    sessionId,
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
  } = req.body;

  // If no sessionId is provided, generate one
  if (!sessionId) {
    sessionId = `anon-${Date.now()}`;
  }

  // Build the new/updated record
  const userInfo = {
    sessionId,
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
    let records = [];
    if (!err) {
      try {
        records = JSON.parse(data);
      } catch (parseErr) {
        console.error("Could not parse user-info.json:", parseErr);
      }
    }

    // Find if this sessionId already exists
    const existingIndex = records.findIndex(r => r.sessionId === sessionId);

    if (existingIndex !== -1) {
      // Update existing record
      // Keep existing refreshCount, or set to 1 if missing
      const existingRecord = records[existingIndex];
      const currentCount = existingRecord.refreshCount || 1;

      records[existingIndex] = {
        ...existingRecord,
        ...userInfo,
        refreshCount: currentCount + 1
      };
    } else {
      // Create a new record
      userInfo.refreshCount = 1;
      records.push(userInfo);
    }

    // Write back to file
    fs.writeFile(filePath, JSON.stringify(records, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing user-info.json:", writeErr);
        return res.status(500).send('Error saving data');
      }
      res.send('OK');
    });
  });
});

// 2) Fetch records with password protection (POST /fetch-records)
app.post('/fetch-records', (req, res) => {
  const { password } = req.body;
  console.log("Received password:", password);

  if (password !== PASSWORD) {
    return res.status(401).send('Invalid password');
  }

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file does not exist, return an empty array
      if (err.code === 'ENOENT') {
        return res.json([]);
      }
      console.error("Error reading user-info.json:", err);
      return res.status(500).send('Error reading user info');
    }

    let records;
    try {
      records = JSON.parse(data);
    } catch (parseErr) {
      console.error("Could not parse user-info.json:", parseErr);
      // If file is corrupted, fallback to empty array
      return res.json([]);
    }

    // Return the array
    res.json(records);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

/*********************************************/
/* 1) Your list of valid passwords           */
/*********************************************/
const VALID_PASSWORDS = [
  "662023",          // 1
  "slitlamp286",     // 2
  "fundus512",       // 3
  "retina728",       // 4
  "cornea203",       // 5
  "jobson892",       // 6
  "otoscope414",     // 7
  "earcare917",      // 8
  "auricle345",      // 9
  "skincheck112",    // 10
  "dermatol559",     // 11
  "sunhat192",       // 12
  "uvprotect789",    // 13
  "dermascope245",   // 14
  "macula009",       // 15
  "hearing095",      // 16
  "earhealth770",    // 17
  "visual556",       // 18
  "skinshield356",   // 19
  "redreflex609",    // 20
  "pinna304"         // 21
];

/*********************************************/
/* 2) Standard Setup                         */
/*********************************************/
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // Serve the main onboarding page
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/view-records', (req, res) => {
  // Serve the view-records page
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/*********************************************/
/* 3) Storing User Info (POST /record-info)  */
/*********************************************/
app.post('/record-info', (req, res) => {
  // Extract fields from the request body
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

  // Generate a sessionId if none is provided
  if (!sessionId) {
    sessionId = `anon-${Date.now()}`;
  }

  // Build record object
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

    // Find existing record by sessionId
    const existingIndex = records.findIndex(r => r.sessionId === sessionId);

    if (existingIndex !== -1) {
      // Update existing record, increment refreshCount
      const existingRecord = records[existingIndex];
      const currentCount = existingRecord.refreshCount || 1;
      records[existingIndex] = {
        ...existingRecord,
        ...userInfo,
        refreshCount: currentCount + 1
      };
    } else {
      // Create new record
      userInfo.refreshCount = 1;
      records.push(userInfo);
    }

    fs.writeFile(filePath, JSON.stringify(records, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing user-info.json:", writeErr);
        return res.status(500).send('Error saving data');
      }
      res.send('OK');
    });
  });
});

/*********************************************/
/* 4) Fetch Records (POST /fetch-records)    */
/*********************************************/
app.post('/fetch-records', (req, res) => {
  const { password } = req.body;

  // If password is not in the VALID_PASSWORDS array, deny access
  if (!VALID_PASSWORDS.includes(password)) {
    return res.status(401).send('Invalid password');
  }

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file doesn't exist, return empty array
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
      // Fallback to empty if corrupted
      return res.json([]);
    }

    // Return all records
    res.json(records);
  });
});

/*********************************************/
/* 5) Start the server                       */
/*********************************************/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

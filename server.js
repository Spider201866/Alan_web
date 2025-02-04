const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

/*********************************************/
/* 1) Master password + one-time set         */
/*********************************************/
const MASTER_PASSWORD = "662023"; // never changes

// A set of one-time passwords. Each is valid exactly once
let ONE_TIME_PASSWORDS = new Set([
  "slitlamp286",
  "fundus512",
  "retina728",
  "cornea203",
  "jobson892",
  "otoscope414",
  "earcare917",
  "auricle345",
  "skincheck112",
  "dermatol559",
  "sunhat192",
  "uvprotect789",
  "dermascope245",
  "macula009",
  "hearing095",
  "earhealth770",
  "visual556",
  "skinshield356",
  "redreflex609",
  "pinna304"
]);
// Once an item is used, we remove it from this set, so it cannot be reused.

/*********************************************/
/* 2) Standard Setup                         */
/*********************************************/
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/*********************************************/
/* 3) Storing User Info (POST /record-info)  */
/*********************************************/
app.post('/record-info', (req, res) => {
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

  // If no sessionId, generate one
  if (!sessionId) {
    sessionId = `anon-${Date.now()}`;
  }

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

    // find existing
    const existingIndex = records.findIndex(r => r.sessionId === sessionId);
    if (existingIndex !== -1) {
      const existingRecord = records[existingIndex];
      const currentCount = existingRecord.refreshCount || 1;
      records[existingIndex] = {
        ...existingRecord,
        ...userInfo,
        refreshCount: currentCount + 1
      };
    } else {
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
  // Log the entire request body for debugging
  console.log("Received in /fetch-records:", req.body);

  const { password, sessionId } = req.body;

  // 1) If password matches master, allow
  if (password === MASTER_PASSWORD) {
    // proceed
  }
  // 2) Else if the password is in the one-time set
  else if (ONE_TIME_PASSWORDS.has(password)) {
    ONE_TIME_PASSWORDS.delete(password);
    // proceed
  }
  // 3) Otherwise deny
  else {
    return res.status(401).send('Invalid password');
  }

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json([]); // no file => empty array
      }
      console.error("Error reading user-info.json:", err);
      return res.status(500).send('Error reading user info');
    }

    let records;
    try {
      records = JSON.parse(data);
    } catch (parseErr) {
      console.error("Could not parse user-info.json:", parseErr);
      return res.json([]);
    }

    if (sessionId) {
      // Show filtering step
      console.log(`Filtering records by sessionId: '${sessionId}'`);
      records = records.filter(record => record.sessionId === sessionId);
      console.log("Filtered records:", records);
    }

    res.json(records);
  });
});

/*********************************************/
/* 5) Start the server                       */
/*********************************************/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

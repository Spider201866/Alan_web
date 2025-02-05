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

// If you no longer need one-time passwords, you can remove this section
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
/**
 * This endpoint overwrites user-info.json with ONE single record.
 * Any new POST to /record-info replaces the existing record.
 */
app.post('/record-info', (req, res) => {
  let {
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

  // We don't use sessionId in this approach, so we omit it or just store a fixed "single-session"
  const userInfo = {
    sessionId: "SINGLE-RECORD", // not strictly needed, but can keep it as a marker
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
    selectedAgent,
    refreshCount: 1 // or track however you like
  };

  const filePath = path.join(__dirname, 'user-info.json');

  // We always overwrite with a single-element array
  fs.writeFile(filePath, JSON.stringify([userInfo], null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing user-info.json:", writeErr);
      return res.status(500).send('Error saving data');
    }
    res.send('OK');
  });
});

/*********************************************/
/* 4) Fetch Records (POST /fetch-records)    */
/*********************************************/
/**
 * This endpoint checks the password, then returns
 * the single record in user-info.json (if it exists).
 */
app.post('/fetch-records', (req, res) => {
  console.log("Received in /fetch-records:", req.body);

  const { password } = req.body;

  // Validate password
  if (password === MASTER_PASSWORD) {
    // proceed
  } else if (ONE_TIME_PASSWORDS.has(password)) {
    ONE_TIME_PASSWORDS.delete(password);
    // proceed
  } else {
    return res.status(401).send('Invalid password');
  }

  const filePath = path.join(__dirname, 'user-info.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If no file yet, return empty array
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
      return res.json([]);
    }

    // We always store exactly one record in the array, so just return it
    res.json(records);
  });
});

/*********************************************/
/* 5) Start the server                       */
/*********************************************/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

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

// Serve main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/*********************************************/
/* 3) SINGLE RECORD in user-info.json        */
/*********************************************/
/**
 * POST /record-info
 * Overwrites user-info.json with ONE single record.
 * Also appends each new record to user-history.json for historical tracking.
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

  // Build the single record
  const singleRecord = {
    sessionId: "SINGLE-RECORD",
    name,
    role,
    experience,
    focus,          // e.g. array or string
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
    refreshCount: 1
  };

  const filePath = path.join(__dirname, 'user-info.json');

  // Always overwrite with a single-element array
  fs.writeFile(filePath, JSON.stringify([singleRecord], null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing user-info.json:", writeErr);
      return res.status(500).send('Error saving data');
    }

    // Append this record to user-history.json
    appendToHistory(singleRecord);

    res.send('OK');
  });
});

/*********************************************/
/* 4) SINGLE RECORD FETCH: /fetch-records    */
/*********************************************/
/**
 * POST /fetch-records
 * Validates password, returns the single record in user-info.json (if it exists).
 * Flowise or your custom tool uses this to see the "active" record.
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
        return res.json([]); // no file => empty
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

    // We always store exactly one record in that array
    res.json(records);
  });
});

/*********************************************/
/* 5) HISTORY (optional): /fetch-history     */
/*********************************************/
/**
 * POST /fetch-history
 * Validates password, returns *all* records from user-history.json.
 * This is separate from the single active record. The custom tool can ignore it.
 */
app.post('/fetch-history', (req, res) => {
  console.log("Received in /fetch-history:", req.body);

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

  const historyPath = path.join(__dirname, 'user-history.json');
  fs.readFile(historyPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If no file yet, return an empty array
        return res.json([]);
      }
      console.error("Error reading user-history.json:", err);
      return res.status(500).send('Error reading user history');
    }

    let fullHistory;
    try {
      fullHistory = JSON.parse(data);
    } catch (parseErr) {
      console.error("Could not parse user-history.json:", parseErr);
      return res.json([]);
    }

    res.json(fullHistory);
  });
});

/*********************************************/
/* 6) Start the server                       */
/*********************************************/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

/*********************************************/
/* HELPER: Append each single record to
   user-history.json for multi-record log    */
/*********************************************/
function appendToHistory(newRecord) {
  const historyPath = path.join(__dirname, 'user-history.json');

  fs.readFile(historyPath, (err, data) => {
    let historyArray = [];
    if (!err) {
      try {
        historyArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("Could not parse user-history.json:", parseErr);
        historyArray = [];
      }
    }
    // Add the new record
    historyArray.push(newRecord);

    fs.writeFile(historyPath, JSON.stringify(historyArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing user-history.json:", writeErr);
      } else {
        console.log("Appended to user-history.json");
      }
    });
  });
}

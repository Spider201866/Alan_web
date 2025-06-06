require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

/*********************************************/
/* 1) Master password + optional one-time    */
/*********************************************/
const MASTER_PASSWORD = process.env.MASTER_PASSWORD || '662023';

let ONE_TIME_PASSWORDS;
if (process.env.ONE_TIME_PASSWORDS) {
  ONE_TIME_PASSWORDS = new Set(
    process.env.ONE_TIME_PASSWORDS.split(',').map((p) => p.trim()).filter(Boolean)
  );
} else {
  ONE_TIME_PASSWORDS = new Set([
    'slitlamp286',
    'fundus512',
    'pinna304',
    'slitlamp286',
    'fundus512',
    'retina728',
    'cornea203',
    'jobson892',
    'otoscope414',
    'earcare917',
    'auricle345',
    'skincheck112',
    'dermatol559',
  ]);
}

/*********************************************/
/* 2) Standard Setup                         */
/*********************************************/
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve your main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/*********************************************/
/* 3) Storing Single Active Record           */
/*    (POST /record-info)                    */
/*********************************************/
/**
 * This endpoint overwrites user-info.json with ONE single "active" record.
 * Then it also appends or merges that record into user-history.json.
 */
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

  // If no sessionId is provided, create a fallback
  if (!sessionId) {
    sessionId = `fallback-${Date.now()}`;
  }

  // Build the single record
  const singleRecord = {
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
    selectedAgent,
    refreshCount: 1
  };

  const filePath = path.join(__dirname, 'user-info.json');

  // 1) Overwrite user-info.json with exactly one record
  fs.writeFile(filePath, JSON.stringify([singleRecord], null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing user-info.json:", writeErr);
      return res.status(500).send('Error saving data');
    }

    // 2) Append or update user-history.json for the full log
    appendToHistory(singleRecord);

    res.send('OK');
  });
});

/*********************************************/
/* 4) Fetch Single Active Record (POST)      */
/*    /fetch-records                         */
/*********************************************/
/**
 * Validates the password, then returns the single-element array
 * from user-info.json (the "active" record).
 * Flowise uses this to see just the one current record.
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

    // Return whatever is in that file (usually 1 record in an array)
    res.json(records);
  });
});

/*********************************************/
/* 5) Fetch Full History (POST)              */
/*    /fetch-history                         */
/*********************************************/
/**
 * Validates the password, then returns the entire array
 * from user-history.json. This is for your 'view-records.html' or
 * admin page to see the full log of all sessions.
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
        // If no history file yet, return empty
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
/* HELPER: Append or Update user-history.json*/
/*********************************************/
/**
 * If we find an existing record with the same sessionId, we increment refreshCount
 * and update fields. If not, we push a new entry.
 */
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

    // Find an item with the same sessionId
    const existingIndex = historyArray.findIndex(
      (item) => item.sessionId === newRecord.sessionId
    );

    if (existingIndex >= 0) {
      // We found an existing record => increment refreshCount
      const existingItem = historyArray[existingIndex];
      existingItem.refreshCount = (existingItem.refreshCount || 1) + 1;
      // Optionally update fields with the new data
      existingItem.dateTime     = newRecord.dateTime;
      existingItem.latitude     = newRecord.latitude;
      existingItem.longitude    = newRecord.longitude;
      existingItem.area         = newRecord.area;
      // etc. if you want them refreshed
    } else {
      // Different session => push a new entry
      historyArray.push(newRecord);
    }

    fs.writeFile(historyPath, JSON.stringify(historyArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing user-history.json:", writeErr);
      } else {
        console.log("Appended/updated user-history.json");
      }
    });
  });
}

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

// If you still want one-time passwords, keep them here; otherwise remove
let ONE_TIME_PASSWORDS = new Set([
  "slitlamp286",
  "fundus512",
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
/* 3) Storing Single Active Record           */
/*    (POST /record-info)                    */
/*********************************************/
/**
 * This endpoint overwrites user-info.json with ONE single "active" record
 * for Flowise. Then it appends or updates user-history.json with the same data
 * for multi-record logging.
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

  // You keep "SINGLE-RECORD" or use a sessionId from req.body if you want
  const singleRecord = {
    sessionId: sessionId || `fallback-${Date.now()}`,
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
    refreshCount: 1 // By default
  };

  const filePath = path.join(__dirname, 'user-info.json');
  
  // 1) Overwrite user-info.json with this single record
  fs.writeFile(filePath, JSON.stringify([singleRecord], null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing user-info.json:", writeErr);
      return res.status(500).send('Error saving data');
    }
    
    // 2) Also append/update the multi-record user-history.json
    appendToHistory(singleRecord);

    res.send('OK');
  });
});

/*********************************************/
/* 4) Fetch Single Active Record (POST)      */
/*    /fetch-records                         */
/*********************************************/
/**
 * This is what Flowise or your custom tool calls to get the single record
 * from user-info.json. Validates password, returns the single-element array.
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

    // Return the single record array
    res.json(records);
  });
});

/*********************************************/
/* 5) NEW: Fetch Full History (POST)         */
/*    /fetch-history                         */
/*********************************************/
/**
 * This new endpoint returns the multi-record log stored in user-history.json,
 * allowing you to show a "Full History" in view-records.html
 */
app.post('/fetch-history', (req, res) => {
  console.log("Received in /fetch-history:", req.body);

  const { password } = req.body;

  // Validate password (same logic as /fetch-records)
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
 * If the last entry has the same sessionId, we increment refreshCount,
 * otherwise we add a new entry.
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

    if (historyArray.length > 0) {
      const lastItem = historyArray[historyArray.length - 1];

      // If it's the same "sessionId", we consider it a refresh
      if (lastItem.sessionId === newRecord.sessionId) {
        lastItem.refreshCount = (lastItem.refreshCount || 1) + 1;
        lastItem.dateTime     = newRecord.dateTime;
        // Optionally also update lastItem.latitude, lastItem.longitude, etc:
        lastItem.latitude  = newRecord.latitude;
        lastItem.longitude = newRecord.longitude;
        lastItem.area      = newRecord.area;
        // ... any other fields you want to keep current ...
      } else {
        // Different session => push a new item
        historyArray.push(newRecord);
      }
    } else {
      // If file was empty, just push
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

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use the promise-based version of fs
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();
const SALT = process.env.PASSWORD_SALT;
if (!SALT) {
  console.error('CRITICAL: PASSWORD_SALT is not defined in the .env file. Exiting.');
  process.exit(1); // Stop the server if the salt is missing
}
const { Mutex } = require('async-mutex');
const fileWriteMutex = new Mutex();
const rateLimit = require('express-rate-limit');

// --- 1. CONFIGURATION ---
const app = express();
const port = process.env.PORT || 3000;

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
if (process.env.NODE_ENV !== 'test') {
  app.use(limiter);
}
const MASTER_PASSWORD_HASH = process.env.MASTER_PASSWORD_HASH || '';
let ONE_TIME_PASSWORDS = new Set(
  (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
);

// --- 2. MIDDLEWARE ---
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()); // Enable pre-flight requests

/**
 * Middleware: Validates master or one-time password.
 */
function hashPassword(str = '') {
  return crypto
    .createHash('sha256')
    .update(str + SALT)
    .digest('hex');
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  const hashed = hashPassword(password);
  if (hashed === MASTER_PASSWORD_HASH || ONE_TIME_PASSWORDS.has(hashed)) {
    if (ONE_TIME_PASSWORDS.has(hashed)) {
      ONE_TIME_PASSWORDS.delete(hashed);
    }
    return next(); // Password is valid, proceed to the next handler
  }
  res.status(401).send('Invalid password');
}

/**
 * Middleware: A simple error handler for async routes.
 */
const handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function validateRecord(req, res, next) {
  const r = req.body;
  const errors = [];
  if (r.latitude !== undefined && isNaN(parseFloat(r.latitude)))
    errors.push('latitude must be numeric');
  if (r.longitude !== undefined && isNaN(parseFloat(r.longitude)))
    errors.push('longitude must be numeric');
  if (r.sessionId !== undefined && typeof r.sessionId !== 'string')
    errors.push('sessionId must be a string');
  if (r.dateTime !== undefined && typeof r.dateTime !== 'string')
    errors.push('dateTime must be a string');
  if (r.area !== undefined && typeof r.area !== 'string') errors.push('area must be a string');
  if (errors.length) return res.status(400).json({ errors });
  next();
}

// --- 3. ROUTES ---
// Serve main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/**
 * Route: Overwrite the active record and append/update the history.
 */
app.post(
  '/record-info',
  validateRecord,
  handleErrors(async (req, res) => {
    const record = { ...req.body, refreshCount: 1 };
    if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

    await fs.writeFile(path.join(__dirname, 'user-info.json'), JSON.stringify([record], null, 2));
    await appendToHistory(record);
    res.send('OK');
  })
);

/**
 * Route: Fetch the single active record. Used by Flowise.
 */
app.post(
  '/fetch-records',
  (req, res, next) => {
    console.log('FETCH-RECORDS BODY:', req.body);
    next();
  },
  validatePassword,
  handleErrors(async (req, res) => {
    res.json(await readJsonFile(path.join(__dirname, 'user-info.json')));
  })
);

/**
 * Route: Fetch the full user history. Used for admin view.
 */
app.post(
  '/fetch-history',
  validatePassword,
  handleErrors(async (req, res) => {
    res.json(await readJsonFile(path.join(__dirname, 'user-history.json')));
  })
);

// --- 4. START SERVER ---
if (require.main === module) {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
}

// --- 5. HELPER FUNCTIONS ---
/**
 * Helper: Reads a JSON file safely, returning [] if it doesn't exist or is invalid.
 * @param {string} filePath - Path to the JSON file.
 */
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return []; // File not found, return empty array.
    console.error(`Error reading or parsing ${filePath}:`, err);
    return []; // Invalid JSON or other read error, return empty array.
  }
}

/**
 * Helper: Appends a new record to history or updates an existing one.
 * @param {object} newRecord - The record to add or update.
 */
async function appendToHistory(newRecord) {
  const release = await fileWriteMutex.acquire();
  try {
    const historyPath = path.join(__dirname, 'user-history.json');
    const history = await readJsonFile(historyPath);

    const existingIndex = history.findIndex((item) => item.sessionId === newRecord.sessionId);

    if (existingIndex >= 0) {
      // Update existing record: increment refreshCount and update key fields.
      const existing = history[existingIndex];
      existing.refreshCount = (existing.refreshCount || 1) + 1;
      Object.assign(existing, {
        dateTime: newRecord.dateTime,
        latitude: newRecord.latitude,
        longitude: newRecord.longitude,
        area: newRecord.area,
      });
    } else {
      // Add new record to history.
      history.push(newRecord);
    }

    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
    console.log('Appended/updated user-history.json');
  } finally {
    release();
  }
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('GLOBAL ERROR:', err);
  res.status(400).send('Bad Request: ' + err.message);
});

// Export app and helpers for testing
module.exports = { app, readJsonFile, appendToHistory };

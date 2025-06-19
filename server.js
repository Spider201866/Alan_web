const express = require('express');
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
const helmet = require('helmet');

// --- Configuration ---
const app = express();
const port = process.env.PORT || 3000;

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
const MASTER_PASSWORD_HASH = process.env.MASTER_PASSWORD_HASH;
if (!MASTER_PASSWORD_HASH) {
  console.error('CRITICAL: MASTER_PASSWORD_HASH is not defined in the .env file. Exiting.');
  process.exit(1); // Stop the server if the master password hash is missing
}
let ONE_TIME_PASSWORDS = new Set(
  (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
);

// --- Global Middleware ---
app.use(
  helmet({
    contentSecurityPolicy: false, // Temporarily disable CSP to debug
    scriptSrcAttr: ["'unsafe-inline'"], // Explicitly allow inline event handlers
  })
);
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()); // Enable pre-flight requests

// --- Authentication Middleware (Legacy) ---
/**
 * Helper: Hashes a given string using SHA-256 with a salt.
 * @param {string} str - The string to hash.
 * @returns {string} The SHA-256 hash.
 */
function hashPassword(str = '') {
  return crypto
    .createHash('sha256')
    .update(str + SALT)
    .digest('hex');
}

/**
 * Middleware: Validates master or one-time password.
 * This middleware is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
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

// --- Utility Middleware ---
/**
 * Middleware: A simple error handler for async routes.
 * Catches errors from async route handlers and passes them to the global error handler.
 */
const handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Middleware: Validates the structure and types of incoming record data.
 * This middleware is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
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

// --- Routes ---
// Serve main frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/view-records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

/**
 * Route: Overwrite the active record and append/update the history.
 * This route is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
app.post(
  '/record-info',
  limiter, // Apply rate limiting to this specific route
  validateRecord,
  handleErrors(async (req, res) => {
    const record = { ...req.body, refreshCount: 1 };
    if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

    await fs.writeFile(
      path.join(__dirname, 'user-info.json'),
      JSON.stringify([record], null, 2) + '\n'
    );
    await appendToHistory(record);
    res.send('OK');
  })
);

/**
 * Route: Fetch the single active record. Used by Flowise (legacy functionality).
 * This route is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
app.post(
  '/fetch-records',
  limiter, // Apply rate limiting to this specific route
  (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('FETCH-RECORDS BODY:', req.body);
    }
    next();
  },
  validatePassword,
  handleErrors(async (req, res) => {
    res.json(await readJsonFile(path.join(__dirname, 'user-info.json')));
  })
);

/**
 * Route: Fetch the full user history. Used for admin view (legacy functionality).
 * This route is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
app.post(
  '/fetch-history',
  limiter, // Apply rate limiting to this specific route
  validatePassword,
  handleErrors(async (req, res) => {
    res.json(await readJsonFile(path.join(__dirname, 'user-history.json')));
  })
);

// --- Server Initialization ---
if (require.main === module) {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
}

// --- Helper Functions (Legacy Data Handling) ---
/**
 * Helper: Reads a JSON file safely, returning [] if it doesn't exist or is invalid.
 * This helper is part of the legacy "Secure Record Server" functionality.
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
 * This helper is part of the legacy "Secure Record Server" functionality.
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

    await fs.writeFile(historyPath, JSON.stringify(history, null, 2) + '\n');
    if (process.env.NODE_ENV !== 'production') {
      console.log('Appended/updated user-history.json');
    }
  } finally {
    release();
  }
}

// --- Global Error Handling ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('GLOBAL ERROR:', err);
  res.status(400).send('Bad Request: ' + err.message);
});

// --- Exports for Testing ---
module.exports = { app, readJsonFile, appendToHistory };

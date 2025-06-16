const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use the promise-based version of fs
const path = require('path');
const cors = require('cors');

// --- 1. CONFIGURATION ---
const app = express();
const port = process.env.PORT || 3000;
const MASTER_PASSWORD = "662023";
let ONE_TIME_PASSWORDS = new Set([
  "slitlamp286", "fundus512", "pinna304", "retina728", "cornea203",
  "jobson892", "otoscope414", "earcare917", "auricle345", "skincheck112",
  "dermatol559",
]);

// --- 2. MIDDLEWARE ---
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()); // Enable pre-flight requests

/**
 * Middleware: Validates master or one-time password.
 */
function validatePassword(req, res, next) {
  const { password } = req.body;
  if (password === MASTER_PASSWORD || ONE_TIME_PASSWORDS.has(password)) {
    if (ONE_TIME_PASSWORDS.has(password)) {
      ONE_TIME_PASSWORDS.delete(password);
    }
    return next(); // Password is valid, proceed to the next handler
  }
  res.status(401).send('Invalid password');
}

/**
 * Middleware: A simple error handler for async routes.
 */
const handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// --- 3. ROUTES ---
// Serve main pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/view-records', (req, res) => res.sendFile(path.join(__dirname, 'public', 'view-records.html')));

/**
 * Route: Overwrite the active record and append/update the history.
 */
app.post('/record-info', handleErrors(async (req, res) => {
  const record = { ...req.body, refreshCount: 1 };
  if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

  await fs.writeFile(path.join(__dirname, 'user-info.json'), JSON.stringify([record], null, 2));
  await appendToHistory(record);
  res.send('OK');
}));

/**
 * Route: Fetch the single active record. Used by Flowise.
 */
app.post('/fetch-records', validatePassword, handleErrors(async (req, res) => {
  res.json(await readJsonFile(path.join(__dirname, 'user-info.json')));
}));

/**
 * Route: Fetch the full user history. Used for admin view.
 */
app.post('/fetch-history', validatePassword, handleErrors(async (req, res) => {
  res.json(await readJsonFile(path.join(__dirname, 'user-history.json')));
}));

// --- 4. START SERVER ---
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));

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
  const historyPath = path.join(__dirname, 'user-history.json');
  const history = await readJsonFile(historyPath);

  const existingIndex = history.findIndex(item => item.sessionId === newRecord.sessionId);

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
  console.log("Appended/updated user-history.json");
}
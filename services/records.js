import fs from 'fs/promises';
import path from 'path'; // Keep path for potential future use, though not directly in these functions
import { Mutex } from 'async-mutex';
// config is not directly used here, paths are passed as arguments

const fileWriteMutex = new Mutex();

/**
 * Helper: Reads a JSON file safely, returning [] if it doesn't exist or is invalid.
 * @param {string} filePath - Path to the JSON file.
 */
export async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8'); // Specify encoding
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
 * @param {string} historyFilePath - The full path to the user history JSON file.
 */
export async function appendToHistory(newRecord, historyFilePath) {
  const release = await fileWriteMutex.acquire();
  try {
    const history = await readJsonFile(historyFilePath);

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

    await fs.writeFile(historyFilePath, JSON.stringify(history, null, 2) + '\n');
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Appended/updated ${path.basename(historyFilePath)}`);
    }
  } finally {
    release();
  }
}

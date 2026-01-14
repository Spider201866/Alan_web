// services/data-service.js
import path from 'path';
import fs from 'fs'; // Import fs module
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// Simple logger that respects NODE_ENV=test
const log = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message);
  }
};

const __filename = fileURLToPath(import.meta.url);
// Assuming services/data-service.js, so '..' goes to the project root
const __projectRoot = path.resolve(path.dirname(__filename), '..');

let dbPath;
if (process.env.NODE_ENV === 'production') {
  dbPath = '/data/alan-data.db'; // Railway volume
  log('Connecting to PRODUCTION database at /data/alan-data.db');
  // Ensure the /data directory exists in production
  const dataDir = path.dirname(dbPath); // This will be /data
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      log(`Created directory: ${dataDir}`);
    } catch (err) {
      console.error(`Error creating directory ${dataDir}:`, err);
      // Potentially throw the error or handle it if directory creation is critical and fails
      throw err;
    }
  }
} else if (process.env.NODE_ENV === 'test') {
  dbPath = path.join(__projectRoot, 'test-alan-data.db');
  log(`Connecting to TEST database at: ${dbPath}`);
} else {
  dbPath = path.join(__projectRoot, 'alan-data.db'); // For local dev
  log(`Connecting to DEVELOPMENT database at: ${dbPath}`);
}

const db = new Database(dbPath);
log(`Database connected successfully at: ${dbPath}`);

/**
 * Initializes the database by creating the necessary tables if they don't already exist.
 * This function is executed automatically when the module is first loaded.
 */
function initDatabase() {
  log('Initializing database schema...');
  const historyTableStmt = `
        CREATE TABLE IF NOT EXISTS history (
            sessionId TEXT PRIMARY KEY,
            name TEXT,
            role TEXT,
            experience TEXT,
            focus TEXT,
            latitude REAL,
            longitude REAL,
            country TEXT,
            iso2 TEXT,
            classification TEXT,
            roleClassification TEXT,
            area TEXT,
            contactInfo TEXT,
            version TEXT,
            selectedAgent TEXT,
            dateTime TEXT,
            refreshCount INTEGER DEFAULT 1
        );
    `;
  const activeRecordTableStmt = `
        CREATE TABLE IF NOT EXISTS active_record (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            sessionId TEXT
        );
    `;
  db.exec(historyTableStmt);
  db.exec(activeRecordTableStmt);
  log('Database tables are ready.');
}

initDatabase(); // Run this setup once when the module is loaded.

// --- Service Functions ---

/**
 * Retrieves the currently active record from the history table.
 * The active record is identified by the sessionId stored in the active_record table.
 * @returns {Array<Object>} An array containing the active record, or an empty array if no active record is found.
 */
function getActiveRecord() {
  const getSessionIdStmt = db.prepare('SELECT sessionId FROM active_record WHERE id = 1');
  const activeSession = getSessionIdStmt.get();

  if (!activeSession || !activeSession.sessionId) {
    return [];
  }

  const recordStmt = db.prepare('SELECT * FROM history WHERE sessionId = ?');
  const record = recordStmt.get(activeSession.sessionId);

  if (record && record.dateTime) {
    record.dateTime = record.dateTime.replace(/&#x2F;/g, '/');
  }

  return record ? [record] : []; // Return as an array to match old API behavior
}

/**
 * Retrieves all records from the history table, sorted in descending order by dateTime.
 *
 * Note: `dateTime` is stored as a string (often via `toLocaleString('en-GB')`), so
 * a plain SQLite `ORDER BY dateTime` does not reliably return most-recent-first.
 * We therefore sort in JS using a tolerant date parser.
 * @returns {Array<Object>} An array of all history records.
 */
function getFullHistory() {
  const records = db.prepare('SELECT * FROM history').all();

  records.forEach((record) => {
    if (record.dateTime) {
      record.dateTime = record.dateTime.replace(/&#x2F;/g, '/');
    }
  });

  records.sort((a, b) => parseDateTimeToEpochMs(b.dateTime) - parseDateTimeToEpochMs(a.dateTime));
  return records;
}

/**
 * Best-effort parser for the various date formats present in the DB.
 * Returns epoch ms (UTC). Unknown/invalid dates sort last.
 *
 * Supported:
 * - ISO strings (new Date().toISOString())
 * - en-GB locale strings (e.g. "14/01/2026, 14:52:20")
 * - "YYYY-MM-DD HH:mm:ss" (legacy)
 *
 * @param {string | null | undefined} value
 */
function parseDateTimeToEpochMs(value) {
  if (!value || typeof value !== 'string') return 0;
  const trimmed = value.trim();
  if (!trimmed) return 0;

  // en-GB: dd/mm/yyyy, HH:MM(:SS)?
  const gbMatch = trimmed.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?/
  );
  if (gbMatch) {
    const [, dd, mm, yyyy, hh, min, ss] = gbMatch;
    return Date.UTC(
      Number(yyyy),
      Number(mm) - 1,
      Number(dd),
      Number(hh),
      Number(min),
      Number(ss || 0)
    );
  }

  // ISO 8601 (or anything Date.parse understands reliably).
  // IMPORTANT: must come *after* the en-GB check above, because Date.parse("12/01/2026")
  // is interpreted as mm/dd/yyyy in many JS engines.
  const isoMs = Date.parse(trimmed);
  if (!Number.isNaN(isoMs)) return isoMs;

  // Legacy: YYYY-MM-DD HH:MM:SS
  const legacyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (legacyMatch) {
    const [, yyyy, mm, dd, hh, min, ss] = legacyMatch;
    return Date.UTC(
      Number(yyyy),
      Number(mm) - 1,
      Number(dd),
      Number(hh),
      Number(min),
      Number(ss || 0)
    );
  }

  return 0;
}

/**
 * Inserts a new record into the history table or updates an existing one if the sessionId already exists.
 * It also sets the given record as the currently active record.
 * @param {Object} inputRecord - The record object to be upserted. Must contain a `sessionId`.
 */
function upsertRecord(inputRecord) {
  // Ensure all fields expected by the SQL query are present, defaulting if necessary.
  const recordForDb = {
    sessionId: inputRecord.sessionId,
    name: inputRecord.name || null,
    role: inputRecord.role || null,
    experience: inputRecord.experience || null,
    focus: inputRecord.focus || null,
    latitude: inputRecord.latitude || null,
    longitude: inputRecord.longitude || null,
    country: inputRecord.country || null,
    iso2: inputRecord.iso2 || null,
    classification: inputRecord.classification || null,
    roleClassification: inputRecord.roleClassification || null,
    area: inputRecord.area || null,
    contactInfo: inputRecord.contactInfo || null,
    version: inputRecord.version || null,
    selectedAgent: inputRecord.selectedAgent || null,
    dateTime: inputRecord.dateTime || new Date().toISOString(),
  };

  const transaction = db.transaction(() => {
    const upsertHistoryStmt = db.prepare(`
            INSERT INTO history (sessionId, name, role, experience, focus, latitude, longitude, country, iso2, classification, roleClassification, area, contactInfo, version, selectedAgent, dateTime, refreshCount)
            VALUES (@sessionId, @name, @role, @experience, @focus, @latitude, @longitude, @country, @iso2, @classification, @roleClassification, @area, @contactInfo, @version, @selectedAgent, @dateTime, 1)
            ON CONFLICT(sessionId) DO UPDATE SET
                name = excluded.name,
                role = excluded.role,
                experience = excluded.experience,
                focus = excluded.focus,
                latitude = excluded.latitude,
                longitude = excluded.longitude,
                country = excluded.country,
                iso2 = excluded.iso2,
                classification = excluded.classification,
                roleClassification = excluded.roleClassification,
                area = excluded.area,
                contactInfo = excluded.contactInfo,
                version = excluded.version,
                selectedAgent = excluded.selectedAgent,
                dateTime = excluded.dateTime,
                refreshCount = refreshCount + 1;
        `);
    upsertHistoryStmt.run(recordForDb);

    const setActiveStmt = db.prepare(`
            INSERT INTO active_record (id, sessionId) VALUES (1, @sessionId) 
            ON CONFLICT(id) DO UPDATE SET sessionId = excluded.sessionId;
        `);
    setActiveStmt.run({ sessionId: recordForDb.sessionId });
  });
  transaction();
}

const dataService = {
  getActiveRecord,
  getFullHistory,
  upsertRecord,
  deleteRecord, // Add new function
  initDatabase,
  db,
};

export default dataService;

/**
 * Deletes a record from the history table based on its sessionId.
 * If the deleted record was the active record, it also clears the active record entry.
 * @param {string} sessionId - The unique identifier of the record to be deleted.
 */
function deleteRecord(sessionId) {
  const transaction = db.transaction(() => {
    // Delete from history table
    const deleteHistoryStmt = db.prepare('DELETE FROM history WHERE sessionId = ?');
    deleteHistoryStmt.run(sessionId);

    // If the deleted record was the active record, clear the active_record table
    const getActiveSessionIdStmt = db.prepare('SELECT sessionId FROM active_record WHERE id = 1');
    const activeSession = getActiveSessionIdStmt.get();
    if (activeSession && activeSession.sessionId === sessionId) {
      const clearActiveRecordStmt = db.prepare('DELETE FROM active_record WHERE id = 1');
      clearActiveRecordStmt.run();
    }
  });
  transaction();
}

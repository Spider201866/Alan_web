// services/data-service.js
import path from 'path';
import fs from 'fs'; // Import fs module
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
// Assuming services/data-service.js, so '..' goes to the project root
const __projectRoot = path.resolve(path.dirname(__filename), '..'); 

let dbPath;
if (process.env.NODE_ENV === 'production') {
    dbPath = '/data/alan-data.db'; // Railway volume
    console.log('Connecting to PRODUCTION database at /data/alan-data.db');
    // Ensure the /data directory exists in production
    const dataDir = path.dirname(dbPath); // This will be /data
    if (!fs.existsSync(dataDir)) {
        try {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log(`Created directory: ${dataDir}`);
        } catch (err) {
            console.error(`Error creating directory ${dataDir}:`, err);
            // Potentially throw the error or handle it if directory creation is critical and fails
            throw err; 
        }
    }
} else if (process.env.NODE_ENV === 'test') {
    dbPath = path.join(__projectRoot, 'test-alan-data.db');
    console.log(`Connecting to TEST database at: ${dbPath}`);
} else {
    dbPath = path.join(__projectRoot, 'alan-data.db'); // For local dev
    console.log(`Connecting to DEVELOPMENT database at: ${dbPath}`);
}
    
const db = new Database(dbPath);
console.log(`Database connected successfully at: ${dbPath}`);

function initDatabase() {
    console.log('Initializing database schema...');
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
    console.log('Database tables are ready.');
}

initDatabase(); // Run this setup once when the module is loaded.

// --- Service Functions ---

function getActiveRecord() {
    const getSessionIdStmt = db.prepare('SELECT sessionId FROM active_record WHERE id = 1');
    const activeSession = getSessionIdStmt.get();
    
    if (!activeSession || !activeSession.sessionId) {
        // console.log('No active session ID found in active_record.');
        return [];
    }
    
    const recordStmt = db.prepare('SELECT * FROM history WHERE sessionId = ?');
    const record = recordStmt.get(activeSession.sessionId);
    
    // if (record) {
        // console.log('Active record found:', record);
    // } else {
        // console.log(`No history record found for active session ID: ${activeSession.sessionId}`);
    // }
    return record ? [record] : []; // Return as an array to match old API behavior
}

function getFullHistory() {
    const records = db.prepare('SELECT * FROM history ORDER BY dateTime DESC').all();
    // console.log(`Full history retrieved: ${records.length} records.`);
    return records;
}

function upsertRecord(inputRecord) {
    // Ensure all fields expected by the SQL query are present, defaulting if necessary.
    const recordForDb = {
        sessionId: inputRecord.sessionId, // Assuming sessionId is always present or handled by caller
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
        dateTime: inputRecord.dateTime || new Date().toISOString(), // Default to current time if not provided
    };
    // refreshCount is handled by SQL (default 1 or increment)

    // console.log('Upserting record for DB:', recordForDb);
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
        // console.log('History table upserted.');

        const setActiveStmt = db.prepare(`
            INSERT INTO active_record (id, sessionId) VALUES (1, @sessionId) 
            ON CONFLICT(id) DO UPDATE SET sessionId = excluded.sessionId;
        `);
        setActiveStmt.run({ sessionId: recordForDb.sessionId });
        // console.log('Active record table updated.');
    });
    transaction();
    // console.log('Upsert transaction completed.');
}

const dataService = {
    getActiveRecord,
    getFullHistory,
    upsertRecord,
    initDatabase, // Exporting for potential external use, though called on load
    db // Export db instance for testing cleanup
};

export default dataService;

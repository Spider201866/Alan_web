/*
 * Remove legacy roleClassification (M)/(P) from persisted data.
 *
 * This updates the local SQLite DBs (dev/test) by setting roleClassification to NULL.
 *
 * Note: Production DB path differs; we intentionally do not touch it here.
 */

const path = require('path');
const Database = require('better-sqlite3');

const dbPaths = [
  path.join(process.cwd(), 'alan-data.db'),
  path.join(process.cwd(), 'test-alan-data.db'),
];

function run(dbPath) {
  const db = new Database(dbPath, { fileMustExist: false });
  try {
    const table = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='history'"
      )
      .get();
    if (!table) {
      // eslint-disable-next-line no-console
      console.log(`Skipping ${dbPath} (no history table)`);
      return;
    }
    const info = db.prepare('PRAGMA table_info(history)').all();
    const hasCol = info.some((c) => c.name === 'roleClassification');
    if (!hasCol) {
      // eslint-disable-next-line no-console
      console.log(`Skipping ${dbPath} (no roleClassification column)`);
      return;
    }
    const res = db.prepare('UPDATE history SET roleClassification = NULL').run();
    // eslint-disable-next-line no-console
    console.log(`Updated ${dbPath}: cleared roleClassification for ${res.changes} rows`);
  } finally {
    db.close();
  }
}

for (const p of dbPaths) run(p);


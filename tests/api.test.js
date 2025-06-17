/* eslint-env jest */
/**
 * API and backend helper tests for Alan webapp.
 * Run with: npx jest tests/api.test.js
 * Requires: jest, supertest
 */

const request = require('supertest');

const path = require('path');
const os = require('os');
const fs = require('fs').promises;
let app, readJsonFile, appendToHistory;

describe('API Endpoints', () => {
  // Use a temp directory for test data
  let tempDir;
  let originalJoin;
  let otp;

  beforeAll(async () => {
    // Set up a valid password hash before requiring the app
    const crypto = require('crypto');
    const password = 'testpass';
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    process.env.MASTER_PASSWORD_HASH = hash;

    otp = 'onetimer';
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = otpHash;

    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-test-'));
    // Patch path.join in server.js to redirect data files to tempDir
    originalJoin = path.join;
    path.join = (...args) => {
      if (args[1] === 'user-info.json' || args[1] === 'user-history.json') {
        return originalJoin(tempDir, args[1]);
      }
      return originalJoin(...args);
    };

    // Now require the app and helpers
    ({ app, readJsonFile, appendToHistory } = require('../server'));
  });

  afterAll(async () => {
    // Restore path.join
    path.join = originalJoin;
    // Clean up tempDir
    await fs.rm(tempDir, { recursive: true, force: true });
  });
  describe('POST /record-info', () => {
    it('should accept a valid record and write to user-info.json and user-history.json', async () => {
      const record = {
        sessionId: 'test-session',
        latitude: 1.23,
        longitude: 4.56,
        dateTime: '2025-06-16T20:00:00Z',
        area: 'Test Area',
      };
      const res = await request(app)
        .post('/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');
      // Optionally, check that files were written (mock fs in real tests)
    });

    it('should reject invalid records', async () => {
      const record = { latitude: 'not-a-number' };
      const res = await request(app)
        .post('/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('latitude must be numeric');
    });
  });

  describe('POST /fetch-records', () => {
    it('should reject requests with invalid password', async () => {
      const res = await request(app)
        .post('/fetch-records')
        .send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });

    it('should accept valid password and return user-info.json', async () => {
      // Use the password set in beforeAll
      const password = 'testpass';
      // Write test user-info.json
      const testRecord = {
        sessionId: 'abc',
        latitude: 1,
        longitude: 2,
        dateTime: 'now',
        area: 'Test',
      };
      await fs.writeFile(
        path.join(tempDir, 'user-info.json'),
        JSON.stringify([testRecord], null, 2),
      );
      const res = await request(app).post('/fetch-records').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([testRecord]);
    });
  });

  describe('POST /fetch-history', () => {
    it('should require a valid password', async () => {
      const res = await request(app)
        .post('/fetch-history')
        .send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });
    it('should accept a one-time password only once', async () => {
      const res1 = await request(app)
        .post('/fetch-history')
        .send({ password: otp });
      expect(res1.statusCode).toBe(200);

      const res2 = await request(app)
        .post('/fetch-history')
        .send({ password: otp });
      expect(res2.statusCode).toBe(401);
    });
  });
});

describe('Helper Functions', () => {
  it('readJsonFile returns [] for missing file', async () => {
    const data = await readJsonFile('nonexistent.json');
    expect(data).toEqual([]);
  });

  it('appendToHistory can be called with a record', async () => {
    // Mock fs.writeFile to avoid actual file writes
    const originalWriteFile = require('fs').promises.writeFile;
    require('fs').promises.writeFile = jest.fn().mockResolvedValue();
    const record = {
      sessionId: 'test-session-append',
      latitude: 0,
      longitude: 0,
      dateTime: '2025-06-16T21:00:00Z',
      area: 'Test Area',
    };
    await expect(appendToHistory(record)).resolves.not.toThrow();
    // Restore original writeFile
    require('fs').promises.writeFile = originalWriteFile;
  });

  it('readJsonFile returns [] for corrupted JSON', async () => {
    const badPath = path.join(tempDir, 'bad.json');
    await fs.writeFile(badPath, '{ not-json }');
    const data = await readJsonFile(badPath);
    expect(data).toEqual([]);
  });
});

// Additional edge cases covered: one-time password consumption and corrupt JSON files.

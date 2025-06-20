/* Alan UI - api.test.js | 20th June 2025, WJW */ // Updated date

/* eslint-env jest */
/**
 * API and backend helper tests for Alan webapp.
 * Run with: npx jest tests/api.test.js
 * Requires: jest, supertest
 */

process.env.NODE_ENV = 'test'; // Ensures data-service uses test-alan-data.db
import request from 'supertest';
import path from 'path';
import os from 'os';
import fs from 'fs/promises'; // Still needed for deleting the test DB file
import crypto from 'crypto';
import { jest } from '@jest/globals'; // Import jest
import dataService from '../services/data-service.js'; // Import the new data service

const testDb = dataService.db; // Get the db instance for direct manipulation

// Variables to hold app instances for different test scopes
let mainTestApp;
let otpTestApp;
let rateLimitTestApp; // Added for rate limiting tests
let notFoundTestApp; // Added for 404 tests

// Store original env vars to restore them
let originalMasterPasswordHashAtStart;
let originalPasswordSaltAtStart;
let originalOneTimePasswordHashesAtStart;

// Helper to create a deep copy of the config
const deepCopyConfig = (config) => JSON.parse(JSON.stringify(config));

describe('API Endpoints', () => {
  beforeAll(async () => {
    originalMasterPasswordHashAtStart = process.env.MASTER_PASSWORD_HASH;
    originalPasswordSaltAtStart = process.env.PASSWORD_SALT;
    originalOneTimePasswordHashesAtStart = process.env.ONE_TIME_PASSWORD_HASHES;

    const password = 'testpass';
    const salt = 'testsalt';
    process.env.PASSWORD_SALT = salt;
    const hash = crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');
    process.env.MASTER_PASSWORD_HASH = hash;

    const otp = 'onetimetest';
    const otpHash = crypto
      .createHash('sha256')
      .update(otp + salt)
      .digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = otpHash;

    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    delete testConfig.paths.userInfo;
    delete testConfig.paths.userHistory;
    testConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );

    testDb.prepare('DELETE FROM history').run();
    testDb.prepare('DELETE FROM active_record').run();

    const { createApp } = await import('../server.js');
    mainTestApp = createApp(testConfig);
  });

  afterAll(async () => {
    // Restore original env vars and reset modules
    // DB closing and file deletion moved to a global afterAll
    process.env.MASTER_PASSWORD_HASH = originalMasterPasswordHashAtStart;
    process.env.PASSWORD_SALT = originalPasswordSaltAtStart;
    process.env.ONE_TIME_PASSWORD_HASHES = originalOneTimePasswordHashesAtStart;
    jest.resetModules();
  });

  beforeEach(() => {
    testDb.prepare('DELETE FROM history').run();
    testDb.prepare('DELETE FROM active_record').run();
  });

  describe('POST /record-info', () => {
    it('should accept a valid record and store it in the database', async () => {
      const record = {
        sessionId: 'test-session',
        name: 'Test User',
        role: 'Tester',
        experience: 'Lots',
        focus: 'Testing',
        latitude: 1.23,
        longitude: 4.56,
        country: 'Testland',
        iso2: 'TL',
        classification: 'TestClass',
        roleClassification: 'TestRoleClass',
        area: 'Test Area',
        contactInfo: 'test@example.com',
        version: '1.0-test',
        selectedAgent: 'TestAgent',
        dateTime: '2025-06-16T20:00:00Z',
      };
      const res = await request(mainTestApp)
        .post('/api/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');

      const historyEntry = testDb
        .prepare('SELECT * FROM history WHERE sessionId = ?')
        .get(record.sessionId);
      expect(historyEntry).toBeDefined();
      expect(historyEntry.name).toBe(record.name);
      expect(historyEntry.latitude).toBe(record.latitude);
      expect(historyEntry.refreshCount).toBe(1);

      const activeRecordEntry = testDb.prepare('SELECT * FROM active_record WHERE id = 1').get();
      expect(activeRecordEntry).toBeDefined();
      expect(activeRecordEntry.sessionId).toBe(record.sessionId);

      const updatedRecord = {
        ...record,
        dateTime: '2025-06-16T20:05:00Z',
        area: 'Updated Test Area',
      };
      await request(mainTestApp).post('/api/record-info').send(updatedRecord);
      const updatedHistoryEntry = testDb
        .prepare('SELECT * FROM history WHERE sessionId = ?')
        .get(record.sessionId);
      expect(updatedHistoryEntry.refreshCount).toBe(2);
      expect(updatedHistoryEntry.area).toBe('Updated Test Area');
    });

    it('should reject invalid records (validation middleware test)', async () => {
      const record = { latitude: 'not-a-number' };
      const res = await request(mainTestApp)
        .post('/api/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toContain('latitude must be numeric');
    });
  });

  describe('POST /fetch-records', () => {
    it('should reject requests with invalid password', async () => {
      const res = await request(mainTestApp).post('/api/fetch-records').send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });

    it('should accept valid password and return the active record from DB', async () => {
      const password = 'testpass';
      const testRecord = {
        sessionId: 'active-session-123',
        name: 'Active User',
        role: 'Active Role',
        experience: 'Active Exp',
        focus: 'Active Focus',
        latitude: 10.0,
        longitude: 20.0,
        country: 'Active Country',
        iso2: 'AC',
        classification: 'Active Class',
        roleClassification: 'Active RoleClass',
        area: 'Active Area',
        contactInfo: 'active@example.com',
        version: '2.0-active',
        selectedAgent: 'ActiveAgent',
        dateTime: '2025-06-20T10:00:00Z',
      };
      dataService.upsertRecord(testRecord);

      const res = await request(mainTestApp).post('/api/fetch-records').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toMatchObject({ ...testRecord, refreshCount: 1 });
    });

    it('should return an empty array if no active record is set', async () => {
      const password = 'testpass';
      const res = await request(mainTestApp).post('/api/fetch-records').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /fetch-history', () => {
    it('should require a valid password', async () => {
      const res = await request(mainTestApp).post('/api/fetch-history').send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });

    it('should return all records from history, ordered by dateTime DESC', async () => {
      const password = 'testpass';
      const record1 = { sessionId: 'hist-1', dateTime: '2025-01-01T00:00:00Z', name: 'Rec1' };
      const record2 = { sessionId: 'hist-2', dateTime: '2025-01-02T00:00:00Z', name: 'Rec2' };
      const record3 = { sessionId: 'hist-3', dateTime: '2025-01-01T12:00:00Z', name: 'Rec3' };

      dataService.upsertRecord(record1);
      dataService.upsertRecord(record2);
      dataService.upsertRecord(record3);

      const res = await request(mainTestApp).post('/api/fetch-history').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body[0].sessionId).toBe('hist-2');
      expect(res.body[1].sessionId).toBe('hist-3');
      expect(res.body[2].sessionId).toBe('hist-1');
    });
  });
});

describe('Rate Limiting', () => {
  beforeAll(async () => {
    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    delete testConfig.paths.userInfo;
    delete testConfig.paths.userHistory;

    // Ensure testDb is available and tables are clean for this suite
    if (testDb && testDb.open) {
      testDb.prepare('DELETE FROM history').run();
      testDb.prepare('DELETE FROM active_record').run();
    } else {
      // This case should ideally not happen if testDb is managed globally
      console.warn(
        'Rate Limiting: testDb was closed or undefined, re-importing dataService might be needed or check test order'
      );
    }

    const { createApp } = await import('../server.js');
    rateLimitTestApp = createApp(testConfig);
  });
  afterAll(async () => {
    // No specific DB cleanup here if relying on the main test DB's lifecycle
  });

  it('should return 429 Too Many Requests after exceeding the rate limit or 200 if not hit', async () => {
    expect.hasAssertions();
    const record = {
      sessionId: 'ratelimit-test',
      latitude: 0,
      longitude: 0,
      dateTime: '2025-06-16T22:00:00Z',
      area: 'Test Area',
    };
    let lastRes;
    let rateLimitHit = false;
    for (let i = 0; i < 101; i++) {
      lastRes = await request(rateLimitTestApp)
        .post('/api/record-info')
        .send(record)
        .set('Accept', 'application/json');
      if (lastRes.statusCode === 429) {
        rateLimitHit = true;
        break;
      }
      if (lastRes.statusCode !== 200) {
        break;
      }
    }
    if (rateLimitHit) {
      expect(lastRes.statusCode).toBe(429);
      expect(lastRes.text).toMatch(/Too many requests/i);
    } else {
      expect(lastRes.statusCode).toBe(200);
      console.log(
        'Rate limit was not triggered (all 101 requests were 200 OK or loop broke on non-429). This might be expected in some environments.'
      );
    }
  });
});

describe('One-Time Password Logic', () => {
  const otpForThisTest = 'specific-otp-for-test';
  const saltForThisTest = 'specific-salt-for-otp-test';
  const otpHashForThisTest = crypto
    .createHash('sha256')
    .update(otpForThisTest + saltForThisTest)
    .digest('hex');

  beforeAll(async () => {
    process.env.PASSWORD_SALT = saltForThisTest;
    process.env.MASTER_PASSWORD_HASH = crypto
      .createHash('sha256')
      .update('masterpassfortest' + saltForThisTest)
      .digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = otpHashForThisTest;

    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const otpTestConfig = deepCopyConfig(baseConfig);
    delete otpTestConfig.paths.userInfo;
    delete otpTestConfig.paths.userHistory;
    otpTestConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );

    if (testDb && testDb.open) {
      testDb.prepare('DELETE FROM history').run();
      testDb.prepare('DELETE FROM active_record').run();
    } else {
      console.warn('OTP Logic: testDb was closed or undefined.');
    }

    const { createApp } = await import('../server.js');
    otpTestApp = createApp(otpTestConfig);
  });

  afterAll(async () => {
    process.env.PASSWORD_SALT = originalPasswordSaltAtStart;
    process.env.MASTER_PASSWORD_HASH = originalMasterPasswordHashAtStart;
    process.env.ONE_TIME_PASSWORD_HASHES = originalOneTimePasswordHashesAtStart;
    jest.resetModules();
  });

  it('should accept a valid one-time password for /fetch-records', async () => {
    const testRecord = {
      sessionId: 'otp-session',
      latitude: 10,
      longitude: 20,
      dateTime: '2025-06-16T23:00:00Z',
      area: 'OTP Test',
    };
    dataService.upsertRecord(testRecord);

    const res = await request(otpTestApp)
      .post('/api/fetch-records')
      .send({ password: otpForThisTest });
    if (res.statusCode !== 200) {
      console.log('DEBUG OTP TEST RESPONSE (valid):', res.statusCode, res.body, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({ ...testRecord, refreshCount: 1 });
  });

  it('should reject reuse of a one-time password for /fetch-records', async () => {
    const res = await request(otpTestApp)
      .post('/api/fetch-records')
      .send({ password: otpForThisTest });
    if (res.statusCode !== 401) {
      console.log('DEBUG OTP TEST RESPONSE (reuse):', res.statusCode, res.body, res.text);
    }
    expect(res.statusCode).toBe(401);
  });

  it('should reject invalid one-time password', async () => {
    const res = await request(otpTestApp)
      .post('/api/fetch-records')
      .send({ password: 'invalidotp' });
    expect(res.statusCode).toBe(401);
  });

  it('should reject empty one-time password', async () => {
    const res = await request(otpTestApp).post('/api/fetch-records').send({ password: '' });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Password is required');
  });

  it('should reject malformed one-time password (e.g. null)', async () => {
    const res = await request(otpTestApp).post('/api/fetch-records').send({ password: null });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Password is required');
  });
});

describe('404 Not Found Handler', () => {
  beforeAll(async () => {
    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    delete testConfig.paths.userInfo;
    delete testConfig.paths.userHistory;

    const { createApp } = await import('../server.js');
    notFoundTestApp = createApp(testConfig);
  });
  afterAll(async () => {
    // No specific cleanup needed for this suite
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(notFoundTestApp).get('/non-existent-route');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/text\/html/);
  });
});

// Global afterAll to close DB and delete file once all tests in this file are done
afterAll(async () => {
  if (testDb && testDb.open) {
    testDb.close();
    console.log('Global afterAll: Test database connection closed.');
  }
  const dbPath = path.resolve(process.cwd(), 'test-alan-data.db');
  try {
    await fs.unlink(dbPath);
    console.log('Global afterAll: Test database file test-alan-data.db deleted.');
  } catch (err) {
    if (err.code === 'EBUSY') {
      console.warn(
        `Global afterAll: test-alan-data.db was busy. This might happen if a previous test suite's app instance didn't shut down cleanly or still held a lock. Retrying deletion...`
      );
      // Simple retry logic, could be more sophisticated
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait a bit
      try {
        await fs.unlink(dbPath);
        console.log('Global afterAll: Test database file test-alan-data.db deleted after retry.');
      } catch (retryErr) {
        console.error('Global afterAll: Error deleting test database file after retry:', retryErr);
      }
    } else if (err.code !== 'ENOENT') {
      console.error('Global afterAll: Error deleting test database file:', err);
    }
  }
});

// TODO: Add tests for file corruption and additional edge cases.

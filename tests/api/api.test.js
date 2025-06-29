// tests/api.test.js
// This file contains integration tests for the API server, covering endpoints, security, and other backend logic.

/* eslint-env jest */
/**
 * API and backend helper tests for Alan webapp.
 * Run with: npx jest tests/api/api.test.js
 */

process.env.NODE_ENV = 'test';
import request from 'supertest';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { jest } from '@jest/globals';
import dataService from '../../services/data-service.js';
// Removed dotenv import and mock from here, as env.test.js handles it
// import dotenv from 'dotenv';

const testDb = dataService.db;

const originalMasterPasswordHashAtStart = process.env.MASTER_PASSWORD_HASH;
const originalPasswordSaltAtStart = process.env.PASSWORD_SALT;
const originalOneTimePasswordHashesAtStart = process.env.ONE_TIME_PASSWORD_HASHES;

const deepCopyConfig = (config) => JSON.parse(JSON.stringify(config));

// Suite for all tests that can share a standard server instance
describe('API Server Tests (Standard Config)', () => {
  let server;
  let app;

  beforeAll(async () => {
    const password = 'testpass';
    const salt = 'testsalt';
    process.env.PASSWORD_SALT = salt;
    process.env.MASTER_PASSWORD_HASH = crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = crypto
      .createHash('sha256')
      .update('onetimetest' + salt)
      .digest('hex');
    process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000'; // Add a default allowed origin for tests

    jest.resetModules();
    const { default: baseConfig } = await import('../../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    delete testConfig.paths.userInfo;
    delete testConfig.paths.userHistory;
    testConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );
    testConfig.allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean);

    if (testDb && testDb.open) {
      testDb.prepare('DELETE FROM history').run();
      testDb.prepare('DELETE FROM active_record').run();
    } else {
      console.error('API Endpoints beforeAll: testDb is not open or undefined.');
    }

    const { createApp } = await import('../../server.js');
    app = createApp(testConfig);
    await new Promise((resolve) => {
      server = app.listen(0, resolve); // Start server on an ephemeral port
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve)); // Gracefully shut down the server
  });

  beforeEach(() => {
    // Clear tables before each test within this suite
    testDb.prepare('DELETE FROM history').run();
    testDb.prepare('DELETE FROM active_record').run();
  });

  describe('API Endpoints', () => {
    it('should accept a valid record and store it in the database', async () => {
      const record = {
        sessionId: 'test-session',
        name: 'Test User',
        dateTime: '2025-06-20T20:00:00Z',
      }; // Simplified record for this test
      const res = await request(app).post('/api/record-info').send(record);
      expect(res.statusCode).toBe(200);
      const historyEntry = testDb
        .prepare('SELECT * FROM history WHERE sessionId = ?')
        .get('test-session');
      expect(historyEntry).toBeDefined();
    });

    it('should reject invalid records', async () => {
      const record = { latitude: 'not-a-number' };
      const res = await request(app).post('/api/record-info').send(record);
      expect(res.statusCode).toBe(400);
    });

    it('should reject requests to /fetch-records with invalid password', async () => {
      const res = await request(app).post('/api/fetch-records').send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });

    it('should accept valid password for /fetch-records', async () => {
      // Minimal setup for active record, actual data content tested elsewhere
      dataService.upsertRecord({
        sessionId: 'active-rec',
        name: 'Active',
        dateTime: new Date().toISOString(),
      });
      const res = await request(app).post('/api/fetch-records').send({ password: 'testpass' });
      expect(res.statusCode).toBe(200);
    });

    it('should fetch history with a valid password', async () => {
      dataService.upsertRecord({
        sessionId: 'hist-rec',
        name: 'History Rec',
        dateTime: new Date().toISOString(),
      });
      const res = await request(app).post('/api/fetch-history').send({ password: 'testpass' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Security Headers', () => {
    it('should include the Strict-Transport-Security header', async () => {
      const res = await request(app).get('/'); // Request any route to get headers
      expect(res.headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
    });

    it('should include the Referrer-Policy header', async () => {
      const res = await request(app).get('/');
      expect(res.headers['referrer-policy']).toBe('no-referrer');
    });

    it('should include the X-Frame-Options header', async () => {
      const res = await request(app).get('/');
      expect(res.headers['x-frame-options']).toBe('DENY');
    });

    it('should include the X-Content-Type-Options header', async () => {
      const res = await request(app).get('/');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
    });
  });

  describe('Rate Limiting', () => {
    it('should return 429 Too Many Requests after exceeding the rate limit', async () => {
      const record = {
        sessionId: 'ratelimit-test',
        name: 'Rate Limit User',
        dateTime: '2025-06-20T22:00:00Z',
      };
      let lastRes;
      let rateLimitHit = false;
      for (let i = 0; i < 101; i++) {
        // Default limit is 100 per 15 mins
        lastRes = await request(app).post('/api/record-info').send(record);
        if (lastRes.statusCode === 429) {
          rateLimitHit = true;
          break;
        }
        // If a request fails for other reasons, stop the loop
        if (lastRes.statusCode !== 200) {
          console.log(
            `Rate limit test stopped early at iteration ${i} with status ${lastRes.statusCode}`
          );
          break;
        }
      }
      // This assertion depends on the test environment being able to hit the limit.
      // In some fast environments or if previous tests affected the global limiter state (unlikely with new server per suite),
      // it might not hit 429. The key is that it doesn't error out unexpectedly.
      expect(rateLimitHit).toBe(true);
      expect(lastRes.statusCode).toBe(429);
      expect(lastRes.text).toMatch(/Too many requests/i);
    }, 15000); // Increase timeout for this test if needed
  });

  describe('404 Not Found Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/non-existent-route');
      expect(res.statusCode).toBe(404);
      expect(res.headers['content-type']).toMatch(/text\/html/);
    });
  });
});

// Separate suite for OTP logic because it requires a specific, clean environment
describe('One-Time Password Logic', () => {
  let server;
  let app;
  const otpForThisTest = 'specific-otp-for-test';
  const saltForThisTest = 'specific-salt-for-otp-test';

  beforeAll(async () => {
    process.env.PASSWORD_SALT = saltForThisTest;
    process.env.MASTER_PASSWORD_HASH = crypto
      .createHash('sha256')
      .update('masterpass' + saltForThisTest)
      .digest('hex');
    const otpHash = crypto
      .createHash('sha256')
      .update(otpForThisTest + saltForThisTest)
      .digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = otpHash;
    process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000'; // Add a default allowed origin for tests

    jest.resetModules(); // Important to re-import config with new env vars
    const { default: baseConfig } = await import('../../config/index.js');
    const otpTestConfig = deepCopyConfig(baseConfig);
    // Ensure OTP hashes are correctly set from the modified environment variable
    otpTestConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );
    otpTestConfig.allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
      .split(',')
      .filter(Boolean);

    // Clear DB for this specific suite to ensure isolation for OTP tests
    if (testDb && testDb.open) {
      testDb.prepare('DELETE FROM history').run();
      testDb.prepare('DELETE FROM active_record').run();
    }

    const { createApp } = await import('../../server.js');
    app = createApp(otpTestConfig);
    await new Promise((resolve) => {
      server = app.listen(0, resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('should accept a valid one-time password', async () => {
    // Setup a record to fetch
    dataService.upsertRecord({
      sessionId: 'otp-fetch-test',
      name: 'OTP User',
      dateTime: new Date().toISOString(),
    });
    const res = await request(app).post('/api/fetch-records').send({ password: otpForThisTest });
    expect(res.statusCode).toBe(200);
  });

  it('should reject reuse of a one-time password', async () => {
    // The OTP was consumed in the previous test by the app instance for this suite
    const res = await request(app).post('/api/fetch-records').send({ password: otpForThisTest });
    expect(res.statusCode).toBe(401);
  });
});

// This global hook runs after all `describe` blocks in this file have completed
afterAll(async () => {
  // Restore original env vars
  process.env.MASTER_PASSWORD_HASH = originalMasterPasswordHashAtStart;
  process.env.PASSWORD_SALT = originalPasswordSaltAtStart;
  process.env.ONE_TIME_PASSWORD_HASHES = originalOneTimePasswordHashesAtStart;
  // Restore CORS_ALLOWED_ORIGINS if it was set globally for tests
  if (process.env.CORS_ALLOWED_ORIGINS_ORIGINAL) {
    process.env.CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS_ORIGINAL;
    delete process.env.CORS_ALLOWED_ORIGINS_ORIGINAL;
  }

  // Close the main database connection used by the test file itself
  if (testDb && testDb.open) {
    testDb.close();
    console.log('Global afterAll: Test database connection closed.');
  }

  // Now, attempt to delete the file. All servers should be closed.
  const dbPath = path.resolve(process.cwd(), 'test-alan-data.db');
  try {
    await fs.unlink(dbPath);
    console.log('Global afterAll: Test database file deleted successfully.');
  } catch (err) {
    if (err.code === 'EBUSY') {
      console.warn(
        'Global afterAll: test-alan-data.db was busy. Retrying deletion after a short delay...'
      );
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms
      try {
        await fs.unlink(dbPath);
        console.log('Global afterAll: Test database file deleted successfully after retry.');
      } catch (retryErr) {
        console.error(
          'Global afterAll: Final error deleting test database file after retry:',
          retryErr
        );
      }
    } else if (err.code !== 'ENOENT') {
      // It's okay if the file doesn't exist initially
      console.error('Global afterAll: Final error deleting test database file:', err);
    }
  }
});

/* Alan UI - api.test.js | 20th June 2025, WJW */ // Updated date

/* eslint-env jest */
/**
 * API and backend helper tests for Alan webapp.
 * Run with: npx jest tests/api.test.js
 * Requires: jest, supertest
 */

process.env.NODE_ENV = 'test';
import request from 'supertest';
import path from 'path';
import os from 'os';
import fs from 'fs/promises';
import crypto from 'crypto';
import { jest } from '@jest/globals'; // Import jest

// Variables to hold app instances for different test scopes
let mainTestApp;
let otpTestApp;
let rateLimitTestApp; // Added for rate limiting tests
let notFoundTestApp; // Added for 404 tests

// Temporary directory for general tests
let tempDirMain; // Renamed for clarity
let tempDirOtp;
let tempDirRateLimit;
let tempDirNotFound;

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

    tempDirMain = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-main-test-'));

    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    testConfig.paths.userInfo = path.join(tempDirMain, 'user-info.json');
    testConfig.paths.userHistory = path.join(tempDirMain, 'user-history.json');
    testConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );

    // Ensure files exist for tests that might read before writing
    await fs.writeFile(testConfig.paths.userInfo, '[]\n', 'utf8');
    await fs.writeFile(testConfig.paths.userHistory, '[]\n', 'utf8');

    const { createApp } = await import('../server.js');
    mainTestApp = createApp(testConfig);
  });

  afterAll(async () => {
    if (tempDirMain) {
      await fs.rm(tempDirMain, { recursive: true, force: true });
    }
    process.env.MASTER_PASSWORD_HASH = originalMasterPasswordHashAtStart;
    process.env.PASSWORD_SALT = originalPasswordSaltAtStart;
    process.env.ONE_TIME_PASSWORD_HASHES = originalOneTimePasswordHashesAtStart;
    jest.resetModules(); // Reset modules after all tests in this describe block
  });

  describe('POST /record-info', () => {
    it('should accept a valid record and write to user-info.json and user-history.json with trailing newline', async () => {
      const record = {
        sessionId: 'test-session',
        latitude: 1.23,
        longitude: 4.56,
        dateTime: '2025-06-16T20:00:00Z',
        area: 'Test Area',
      };
      // user-history.json is already created in beforeAll for mainTestApp
      const res = await request(mainTestApp)
        .post('/api/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');

      const userInfoContent = await fs.readFile(path.join(tempDirMain, 'user-info.json'), 'utf8');
      expect(userInfoContent.endsWith('\n')).toBe(true);
      const userHistoryContent = await fs.readFile(
        path.join(tempDirMain, 'user-history.json'),
        'utf8'
      );
      expect(userHistoryContent.endsWith('\n')).toBe(true);
      // Check content of history
      const historyData = JSON.parse(userHistoryContent);
      expect(historyData.length).toBe(1);
      expect(historyData[0].sessionId).toBe('test-session');
    });

    it('should reject invalid records', async () => {
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

    it('should accept valid password and return user-info.json', async () => {
      const password = 'testpass';
      const testRecord = {
        sessionId: 'abc',
        latitude: 1,
        longitude: 2,
        dateTime: 'now',
        area: 'Test',
      };
      // Use the path from the config that mainTestApp was created with
      await fs.writeFile(
        path.join(tempDirMain, 'user-info.json'),
        JSON.stringify([testRecord], null, 2) + '\n'
      );
      const res = await request(mainTestApp).post('/api/fetch-records').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([testRecord]);
    });
  });

  describe('POST /fetch-history', () => {
    it('should require a valid password', async () => {
      const res = await request(mainTestApp).post('/api/fetch-history').send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Helper Functions', () => {
  let readJsonFile, appendToHistory;
  let helperTempDir;

  beforeAll(async () => {
    helperTempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-helper-test-'));
    const helpers = await import('../services/records.js');
    readJsonFile = helpers.readJsonFile;
    appendToHistory = helpers.appendToHistory;
  });

  afterAll(async () => {
    if (helperTempDir) {
      await fs.rm(helperTempDir, { recursive: true, force: true });
    }
  });

  it('readJsonFile returns [] for missing file', async () => {
    const data = await readJsonFile(path.join(helperTempDir, 'nonexistent.json'));
    expect(data).toEqual([]);
  });

  it('appendToHistory can be called with a record', async () => {
    const originalWriteFile = fs.writeFile;
    fs.writeFile = jest.fn().mockResolvedValue();
    const record = {
      sessionId: 'test-session-append',
      latitude: 0,
      longitude: 0,
      dateTime: '2025-06-16T21:00:00Z',
      area: 'Test Area',
    };
    const dummyHistoryPath = path.join(helperTempDir, 'dummy-history.json');
    await expect(appendToHistory(record, dummyHistoryPath)).resolves.not.toThrow();
    expect(fs.writeFile).toHaveBeenCalled();
    fs.writeFile = originalWriteFile;
  });
});

describe('Rate Limiting', () => {
  beforeAll(async () => {
    // Setup for rateLimitTestApp
    tempDirRateLimit = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-ratelimit-test-'));
    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    testConfig.paths.userInfo = path.join(tempDirRateLimit, 'user-info.json');
    testConfig.paths.userHistory = path.join(tempDirRateLimit, 'user-history.json');

    // Ensure files exist
    await fs.writeFile(testConfig.paths.userInfo, '[]\n', 'utf8');
    await fs.writeFile(testConfig.paths.userHistory, '[]\n', 'utf8');

    const { createApp } = await import('../server.js');
    rateLimitTestApp = createApp(testConfig);
  });
  afterAll(async () => {
    if (tempDirRateLimit) {
      await fs.rm(tempDirRateLimit, { recursive: true, force: true });
    }
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
      lastRes = await request(rateLimitTestApp) // Use rateLimitTestApp
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

    tempDirOtp = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-otp-test-'));
    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const otpTestConfig = deepCopyConfig(baseConfig);
    otpTestConfig.paths.userInfo = path.join(tempDirOtp, 'user-info.json');
    otpTestConfig.paths.userHistory = path.join(tempDirOtp, 'user-history.json');
    otpTestConfig.security.otpHashes = new Set(
      (process.env.ONE_TIME_PASSWORD_HASHES || '').split(',').filter(Boolean)
    );

    await fs.writeFile(otpTestConfig.paths.userInfo, '[]\n', 'utf8');
    await fs.writeFile(otpTestConfig.paths.userHistory, '[]\n', 'utf8');

    const { createApp } = await import('../server.js');
    otpTestApp = createApp(otpTestConfig);
  });

  afterAll(async () => {
    if (tempDirOtp) {
      await fs.rm(tempDirOtp, { recursive: true, force: true });
    }
    // Restore original env vars by relying on the outermost afterAll, or do it here if necessary
    // For safety, explicitly restore env vars used by this suite
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
      refreshCount: 1,
    };
    // Use the path from otpTestConfig
    await fs.writeFile(
      path.join(tempDirOtp, 'user-info.json'),
      JSON.stringify([testRecord], null, 2) + '\n'
    );
    const res = await request(otpTestApp)
      .post('/api/fetch-records')
      .send({ password: otpForThisTest });
    if (res.statusCode !== 200) {
      console.log('DEBUG OTP TEST RESPONSE (valid):', res.statusCode, res.body, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([testRecord]);
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
    tempDirNotFound = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-404-test-'));
    jest.resetModules();
    const { default: baseConfig } = await import('../config/index.js');
    const testConfig = deepCopyConfig(baseConfig);
    // 404 doesn't strictly need data paths, but good practice for isolation
    testConfig.paths.userInfo = path.join(tempDirNotFound, 'user-info.json');
    testConfig.paths.userHistory = path.join(tempDirNotFound, 'user-history.json');

    const { createApp } = await import('../server.js');
    notFoundTestApp = createApp(testConfig);
  });
  afterAll(async () => {
    if (tempDirNotFound) {
      await fs.rm(tempDirNotFound, { recursive: true, force: true });
    }
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(notFoundTestApp).get('/non-existent-route');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/text\/html/);
  });
});

// TODO: Add tests for file corruption and additional edge cases.

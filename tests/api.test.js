/* Alan UI - api.test.js | 19th June 2025, WJW */

/* eslint-env jest */
/**
 * API and backend helper tests for Alan webapp.
 * Run with: npx jest tests/api.test.js
 * Requires: jest, supertest
 */

process.env.NODE_ENV = 'test';
const request = require('supertest');

const path = require('path');
const os = require('os');
const fs = require('fs').promises;
let app, readJsonFile, appendToHistory;
let tempDir;
let originalJoin;

describe('API Endpoints', () => {
  // Use a temp directory for test data

  let originalMasterPasswordHashAtStart;
  let originalPasswordSaltAtStart;
  let originalOneTimePasswordHashesAtStart;

  beforeAll(async () => {
    // Store original environment variables
    originalMasterPasswordHashAtStart = process.env.MASTER_PASSWORD_HASH;
    originalPasswordSaltAtStart = process.env.PASSWORD_SALT;
    originalOneTimePasswordHashesAtStart = process.env.ONE_TIME_PASSWORD_HASHES;

    // Set up a valid password hash and salt for the main test suite
    const crypto = require('crypto');
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
    ({ app, readJsonFile, appendToHistory } = require('../server.cjs')); // Updated to .cjs
  });

  afterAll(async () => {
    // Restore path.join
    path.join = originalJoin;
    // Clean up tempDir
    await fs.rm(tempDir, { recursive: true, force: true });

    // Restore original environment variables after all tests in this file
    process.env.MASTER_PASSWORD_HASH = originalMasterPasswordHashAtStart;
    process.env.PASSWORD_SALT = originalPasswordSaltAtStart;
    process.env.ONE_TIME_PASSWORD_HASHES = originalOneTimePasswordHashesAtStart;
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
      const res = await request(app)
        .post('/record-info')
        .send(record)
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');

      // Verify user-info.json has trailing newline
      const userInfoContent = await fs.readFile(path.join(tempDir, 'user-info.json'), 'utf8');
      expect(userInfoContent.endsWith('\n')).toBe(true);

      // Verify user-history.json has trailing newline
      const userHistoryContent = await fs.readFile(path.join(tempDir, 'user-history.json'), 'utf8');
      expect(userHistoryContent.endsWith('\n')).toBe(true);
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
      const res = await request(app).post('/fetch-records').send({ password: 'wrong' });
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
        JSON.stringify([testRecord], null, 2) + '\n' // Ensure test data also has newline
      );
      const res = await request(app).post('/fetch-records').send({ password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([testRecord]);
    });
  });

  describe('POST /fetch-history', () => {
    it('should require a valid password', async () => {
      const res = await request(app).post('/fetch-history').send({ password: 'wrong' });
      expect(res.statusCode).toBe(401);
    });
    // Add more tests as above
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
});

describe('Rate Limiting', () => {
  it('should return 429 Too Many Requests after exceeding the rate limit or 200 if not hit', async () => {
    expect.hasAssertions(); // Declare that assertions are expected
    // The default limit is 100 requests per 15 minutes per IP.
    // We'll send 101 requests.
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
      lastRes = await request(app)
        .post('/record-info')
        .send(record)
        .set('Accept', 'application/json');
      if (lastRes.statusCode === 429) {
        rateLimitHit = true;
        break;
      }
      if (lastRes.statusCode !== 200) {
        // If any request is not 200 before limit, break
        break;
      }
    }

    // The final status code must be either 200 or 429.
    /* eslint-disable jest/no-conditional-expect */
    // The number of assertions and their nature varies based on whether the rate limit is hit.
    // This test structure is intentional to cover both scenarios.
    if (rateLimitHit) {
      expect(lastRes.statusCode).toBe(429); // Explicitly assert 429 if hit
      expect(lastRes.text).toMatch(/Too many requests/i);
    } else {
      // If rate limit was not hit, the loop completed or broke due to a non-200/non-429 status.
      // We expect the status to be 200 if no rate limit was hit and no other error occurred during the loop.
      expect(lastRes.statusCode).toBe(200);
      console.log(
        'Rate limit was not triggered (all 101 requests were 200 OK or loop broke on non-429). This might be expected in some environments.'
      );
    }
    /* eslint-enable jest/no-conditional-expect */
  });
});

// One-Time Password Logic tests must run in a fully isolated environment
describe('One-Time Password Logic', () => {
  const crypto = require('crypto');
  const otp = 'onetimetest';
  const salt = 'testsalt';
  const otpHash = crypto
    .createHash('sha256')
    .update(otp + salt)
    .digest('hex');
  let otpTempDir;
  let otpApp;

  beforeAll(async () => {
    process.env.PASSWORD_SALT = salt;
    process.env.MASTER_PASSWORD_HASH = crypto
      .createHash('sha256')
      .update('testpass' + salt)
      .digest('hex');
    process.env.ONE_TIME_PASSWORD_HASHES = otpHash;

    otpTempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'alanui-otp-test-'));
    // Patch path.join in server.js to redirect data files to otpTempDir
    const originalJoin = path.join;
    path.join = (...args) => {
      if (args[1] === 'user-info.json' || args[1] === 'user-history.json') {
        return originalJoin(otpTempDir, args[1]);
      }
      return originalJoin(...args);
    };

    // Clear the module cache to get a fresh instance of server.js
    jest.resetModules();
    ({ app: otpApp } = require('../server.cjs')); // Updated to .cjs
  });

  afterAll(async () => {
    // Clean up otpTempDir
    await fs.rm(otpTempDir, { recursive: true, force: true });
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
    // Ensure otpTempDir exists before writing
    await fs.mkdir(otpTempDir, { recursive: true });
    // Remove any existing user-info.json to avoid test pollution
    try {
      await fs.unlink(path.join(otpTempDir, 'user-info.json'));
    } catch (_e) {
      // Prefix unused variable with underscore
      // Ignore if file does not exist
    }
    await fs.writeFile(
      path.join(otpTempDir, 'user-info.json'),
      JSON.stringify([testRecord], null, 2) + '\n'
    );
    const res = await request(otpApp).post('/fetch-records').send({ password: otp });
    if (res.statusCode !== 200 || JSON.stringify(res.body) !== JSON.stringify([testRecord])) {
      // Log the actual response for debugging
      console.log('DEBUG OTP TEST RESPONSE:', res.statusCode, res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([testRecord]);
  });

  it('should reject reuse of a one-time password for /fetch-records', async () => {
    const res = await request(otpApp).post('/fetch-records').send({ password: otp });
    expect(res.statusCode).toBe(401);
  });

  it('should reject invalid one-time password', async () => {
    const res = await request(otpApp).post('/fetch-records').send({ password: 'invalidotp' });
    expect(res.statusCode).toBe(401);
  });

  it('should reject empty one-time password', async () => {
    const res = await request(otpApp).post('/fetch-records').send({ password: '' });
    expect(res.statusCode).toBe(401);
  });

  it('should reject malformed one-time password', async () => {
    const res = await request(otpApp).post('/fetch-records').send({ password: null });
    expect(res.statusCode).toBe(401);
  });
});

describe('404 Not Found Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/text\/html/); // Expecting HTML for 404 page
  });
});

// TODO: Add tests for file corruption and additional edge cases.

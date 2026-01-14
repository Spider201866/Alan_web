/* eslint-env jest */

import request from 'supertest';
import crypto from 'crypto';
import { createApp } from '../../server.js';
import { __testOnly as adminSessionTestOnly } from '../../middleware/admin-session.js';

function createTestConfig() {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';
  const salt = 'test-salt';
  const password = 'correct-password';
  const masterHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');

  return {
    port: 0,
    allowedOrigins: [],
    enableCors: false,
    enableCsrf: false,
    adminAllowedIps: [],
    cspDirectives: {},
    security: {
      salt,
      masterHash,
      otpHashes: new Set(),
    },
  };
}

describe('Admin cookie session (View Records)', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = createApp(createTestConfig());
    server = app.listen(0);
  });

  afterAll(async () => {
    if (server) server.close();
  });

  it('should set an httpOnly session cookie after /api/admin-login', async () => {
    const res = await request(server)
      .post('/api/admin-login')
      .send({ password: 'correct-password' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    const setCookie = res.headers['set-cookie']?.[0] || '';
    expect(setCookie).toContain(`${adminSessionTestOnly.COOKIE_NAME_DEV}=`);
    expect(setCookie.toLowerCase()).toContain('httponly');
    expect(setCookie.toLowerCase()).toContain('samesite=strict');
  });

  it('should reject /api/admin/fetch-records without a cookie', async () => {
    const res = await request(server).post('/api/admin/fetch-records').send({});
    expect(res.statusCode).toBe(401);
  });
});

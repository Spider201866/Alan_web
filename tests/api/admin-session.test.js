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
  const publicPassword = 'public-password';
  const adminPassword = 'correct-admin-password';
  const publicHash = crypto
    .pbkdf2Sync(publicPassword, salt, iterations, keylen, digest)
    .toString('hex');
  const adminHash = crypto
    .pbkdf2Sync(adminPassword, salt, iterations, keylen, digest)
    .toString('hex');

  return {
    port: 0,
    allowedOrigins: [],
    enableCors: false,
    enableCsrf: false,
    adminAllowedIps: [],
    cspDirectives: {},
    security: {
      salt,
      publicHash,
      adminHash,
      masterHash: publicHash,
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

  it('should allow /api/verify-access with the public password', async () => {
    const res = await request(server)
      .post('/api/verify-access')
      .send({ password: 'public-password' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('should reject admin login with the public password', async () => {
    const res = await request(server)
      .post('/api/admin-login')
      .send({ password: 'public-password' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(401);
  });

  it('should set an httpOnly session cookie after /api/admin-login', async () => {
    const res = await request(server)
      .post('/api/admin-login')
      .send({ password: 'correct-admin-password' })
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

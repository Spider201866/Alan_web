/* eslint-env jest */

import request from 'supertest';
import crypto from 'crypto';
import { createApp } from '../../server.js';

function createTestConfig() {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';
  const salt = 'csrf-test-salt';
  const password = 'correct-password';
  const masterHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');

  return {
    port: 0,
    allowedOrigins: [],
    enableCors: false,
    enableCsrf: true,
    adminAllowedIps: [],
    cspDirectives: {},
    security: {
      salt,
      masterHash,
      otpHashes: new Set(),
    },
  };
}

describe('Admin CSRF (when ENABLE_CSRF=true)', () => {
  let server;

  beforeAll(async () => {
    const app = createApp(createTestConfig());
    server = app.listen(0);
  });

  afterAll(async () => {
    if (server) server.close();
  });

  it('should reject admin delete without CSRF token', async () => {
    // 1) login to get session cookie
    const loginRes = await request(server)
      .post('/api/admin-login')
      .send({ password: 'correct-password' })
      .set('Content-Type', 'application/json');

    expect(loginRes.statusCode).toBe(200);
    const cookie = loginRes.headers['set-cookie']?.[0];
    expect(cookie).toBeTruthy();

    // 2) try delete without CSRF header
    const delRes = await request(server)
      .delete('/api/admin/delete-record')
      .set('Cookie', cookie)
      .send({ sessionId: 'abc' });

    expect(delRes.statusCode).toBe(403);
    expect(delRes.text).toContain('CSRF');
  });

  it('should allow admin delete with CSRF token', async () => {
    // 1) login
    const loginRes = await request(server)
      .post('/api/admin-login')
      .send({ password: 'correct-password' })
      .set('Content-Type', 'application/json');

    expect(loginRes.statusCode).toBe(200);
    const cookie = loginRes.headers['set-cookie']?.[0];
    expect(cookie).toBeTruthy();

    // 2) fetch csrf token (requires cookie)
    const csrfRes = await request(server).get('/api/admin/csrf').set('Cookie', cookie);
    expect(csrfRes.statusCode).toBe(200);
    expect(csrfRes.body?.csrfToken).toBeTruthy();

    // 3) delete with token
    const delRes = await request(server)
      .delete('/api/admin/delete-record')
      .set('Cookie', cookie)
      .set('x-csrf-token', csrfRes.body.csrfToken)
      .send({ sessionId: 'abc' });

    // The record may or may not exist, but it should NOT be blocked by CSRF.
    expect([200, 400]).toContain(delRes.statusCode);
  });
});

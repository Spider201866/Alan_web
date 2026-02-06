/* eslint-env jest */

import request from 'supertest';
import crypto from 'crypto';
import { createApp } from '../../server.js';
import dataService from '../../services/data-service.js';

function createTestConfig() {
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';
  const salt = 'test-salt';
  const password = 'legacy-password';
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

describe('Legacy /fetch-records compatibility', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = createApp(createTestConfig());
    server = app.listen(0);

    dataService.upsertRecord({
      sessionId: `legacy-fetch-${Date.now()}`,
      name: 'Legacy Tool User',
      role: 'Eyes',
      experience: 'Primary',
      dateTime: new Date().toISOString(),
    });
  });

  afterAll(async () => {
    if (server) server.close();
  });

  it('returns active record without requiring CSRF token', async () => {
    const res = await request(server)
      .post('/fetch-records')
      .set('Content-Type', 'application/json')
      .send({ password: 'legacy-password' });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toBeDefined();
    expect(res.body[0].name).toBe('Legacy Tool User');
  });

  it('still enforces password validation', async () => {
    const res = await request(server)
      .post('/fetch-records')
      .set('Content-Type', 'application/json')
      .send({ password: 'wrong-password' });

    expect(res.statusCode).toBe(401);
  });
});

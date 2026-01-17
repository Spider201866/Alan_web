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

describe('History ordering and epoch normalization', () => {
  let app;
  let server;
  let adminCookie;

  beforeAll(async () => {
    app = createApp(createTestConfig());
    server = app.listen(0);

    const loginRes = await request(server)
      .post('/api/admin-login')
      .send({ password: 'correct-password' })
      .set('Content-Type', 'application/json');

    expect(loginRes.statusCode).toBe(200);
    adminCookie = loginRes.headers['set-cookie']?.[0]?.split(';')[0];
    expect(adminCookie).toBeTruthy();
  });

  afterAll(async () => {
    if (server) server.close();
  });

  it('returns history ordered by dateTimeEpoch descending', async () => {
    const suffix = Date.now();
    const pastSessionId = `test-epoch-${suffix}-past`;
    const futureSessionId = `test-epoch-${suffix}-future`;

    await request(server)
      .post('/api/record-info')
      .send({
        sessionId: pastSessionId,
        name: 'Past User',
        dateTime: '1999-01-01T00:00:00Z',
      })
      .set('Content-Type', 'application/json');

    await request(server)
      .post('/api/record-info')
      .send({
        sessionId: futureSessionId,
        name: 'Future User',
        dateTime: '2099-12-31T23:59:59Z',
      })
      .set('Content-Type', 'application/json');

    const historyRes = await request(server)
      .post('/api/admin/fetch-history')
      .set('Cookie', adminCookie)
      .send({});

    expect(historyRes.statusCode).toBe(200);
    const history = historyRes.body;
    const futureIndex = history.findIndex((row) => row.sessionId === futureSessionId);
    const pastIndex = history.findIndex((row) => row.sessionId === pastSessionId);

    expect(futureIndex).toBeGreaterThanOrEqual(0);
    expect(pastIndex).toBeGreaterThanOrEqual(0);
    expect(futureIndex).toBeLessThan(pastIndex);
    expect(history[futureIndex].dateTimeEpoch).toEqual(expect.any(Number));
  });

  it('backfills missing dateTimeEpoch values on init', () => {
    const sessionId = `test-epoch-backfill-${Date.now()}`;
    dataService.upsertRecord({
      sessionId,
      name: 'Backfill User',
      dateTime: '2001-01-01T00:00:00Z',
    });

    dataService.db
      .prepare('UPDATE history SET dateTimeEpoch = NULL WHERE sessionId = ?')
      .run(sessionId);

    dataService.initDatabase();

    const row = dataService.db
      .prepare('SELECT dateTimeEpoch FROM history WHERE sessionId = ?')
      .get(sessionId);

    expect(row.dateTimeEpoch).toEqual(expect.any(Number));
    expect(row.dateTimeEpoch).toBeGreaterThan(0);
  });
});

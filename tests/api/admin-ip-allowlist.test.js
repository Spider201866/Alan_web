/* eslint-env jest */

import express from 'express';
import request from 'supertest';
import { createAdminIpAllowlistMiddleware } from '../../middleware/admin-ip-allowlist.js';

describe('Admin IP allowlist middleware', () => {
  function createAppWithAllowlist(allowlist) {
    const app = express();
    app.set('trust proxy', true);
    app.use(createAdminIpAllowlistMiddleware(allowlist));
    app.get('/secure', (req, res) => res.status(200).send('OK'));
    return app;
  }

  it('allows requests when the allowlist is empty', async () => {
    const app = createAppWithAllowlist([]);
    const res = await request(app).get('/secure');
    expect(res.statusCode).toBe(200);
  });

  it('allows requests from allowlisted IPs', async () => {
    const app = createAppWithAllowlist(['10.0.0.1']);
    const res = await request(app).get('/secure').set('X-Forwarded-For', '10.0.0.1');
    expect(res.statusCode).toBe(200);
  });

  it('blocks requests from non-allowlisted IPs', async () => {
    const app = createAppWithAllowlist(['10.0.0.1']);
    const res = await request(app).get('/secure').set('X-Forwarded-For', '10.0.0.2');
    expect(res.statusCode).toBe(403);
  });
});

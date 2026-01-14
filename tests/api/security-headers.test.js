/* eslint-env jest */

import request from 'supertest';
import { createApp } from '../../server.js';
import config from '../../config/index.js';

describe('Security headers (server defaults)', () => {
  let server;

  beforeAll(async () => {
    const app = createApp(config);
    server = app.listen(0);
  });

  afterAll(async () => {
    if (server) server.close();
  });

  it('should include the expected security headers on /', async () => {
    const res = await request(server).get('/');

    // Helmet / core security headers
    expect(res.headers['x-frame-options']).toBeTruthy();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['referrer-policy']).toBe('no-referrer');
    expect(res.headers['strict-transport-security']).toBeTruthy();
    expect(res.headers['content-security-policy']).toBeTruthy();

    // Our additional hardening
    expect(res.headers['cross-origin-resource-policy']).toBe('same-origin');
    expect(res.headers['cross-origin-opener-policy']).toBe('same-origin');
    expect(res.headers['origin-agent-cluster']).toBe('?1');
    expect(res.headers['x-dns-prefetch-control']).toBe('off');
    expect(res.headers['x-permitted-cross-domain-policies']).toBe('none');
    expect(res.headers['x-download-options']).toBe('noopen');
    expect(res.headers['permissions-policy']).toContain('geolocation=(self)');

    // Express hygiene
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

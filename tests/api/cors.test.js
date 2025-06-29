/* eslint-env jest */
/**
 * Tests for the CORS middleware.
 * Run with: npx jest tests/api/cors.test.js
 */

process.env.NODE_ENV = 'test';
import request from 'supertest';
import { jest } from '@jest/globals';

const deepCopyConfig = (config) => JSON.parse(JSON.stringify(config));

describe('CORS Middleware Functionality', () => {
  let server;
  let app;
  const allowedOrigin = 'http://test-origin.com';
  const disallowedOrigin = 'http://disallowed-origin.com';

  beforeAll(async () => {
    // Set env vars for this specific test suite
    process.env.ENABLE_CORS = 'true';
    process.env.CORS_ALLOWED_ORIGINS = allowedOrigin;
    // Disable CSRF for this test as it's not relevant
    process.env.ENABLE_CSRF = 'false';

    // Reset modules to ensure new config is loaded
    jest.resetModules();
    const { default: baseConfig } = await import('../../config/index.js');
    const { createApp } = await import('../../server.js');

    const testConfig = deepCopyConfig(baseConfig);
    // Override config directly for clarity
    testConfig.enableCors = true;
    testConfig.allowedOrigins = [allowedOrigin];

    app = createApp(testConfig);
    await new Promise((resolve) => {
      server = app.listen(0, resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    // It's good practice to restore env vars, though in a separate file it's less critical
    delete process.env.ENABLE_CORS;
    delete process.env.CORS_ALLOWED_ORIGINS;
    delete process.env.ENABLE_CSRF;
  });

  it('should set Access-Control-Allow-Origin header for allowed origins', async () => {
    const res = await request(app).get('/').set('Origin', allowedOrigin);
    expect(res.headers['access-control-allow-origin']).toBe(allowedOrigin);
  });

  it('should NOT set Access-Control-Allow-Origin header for disallowed origins', async () => {
    const res = await request(app).get('/').set('Origin', disallowedOrigin);
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('should handle requests without an Origin header gracefully', async () => {
    const res = await request(app).get('/');
    // For requests without an origin (e.g. server-to-server), the header should not be set
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });
});

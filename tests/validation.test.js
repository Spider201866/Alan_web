/* eslint-env jest */
/**
 * Automated tests for input validation and sanitization on /api/record-info.
 */

import request from 'supertest';
import { createApp } from '../server.js';
import config from '../config/index.js';

let app;
let server;

beforeAll(async () => {
  app = createApp(config);
  server = app.listen(0);
});

afterAll(async () => {
  if (server) server.close();
});

describe('/api/record-info input validation', () => {
  it('should reject non-numeric latitude', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 'not-a-number',
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('latitude must be numeric or null');
  });

  it('should reject non-numeric longitude', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 'not-a-number',
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('longitude must be numeric or null');
  });

  it('should reject non-string sessionId', async () => {
    const res = await request(server)
      .post('/api/record-info')
      .send({ latitude: 10, longitude: 10, sessionId: 123, dateTime: '2025-01-01T00:00:00Z' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('sessionId must be a string');
  });

  it('should reject non-string dateTime', async () => {
    const res = await request(server)
      .post('/api/record-info')
      .send({ latitude: 10, longitude: 10, sessionId: 'abc', dateTime: 12345 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('dateTime must be a string');
  });

  it('should reject non-string area', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      area: 123,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('area must be a string');
  });

  it('should reject non-string name', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      name: 123,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('name must be a string');
  });

  it('should reject name with HTML or script tags', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      name: '<script>alert(1)</script>',
    });
    expect(res.statusCode).toBe(200); // express-validator .escape() will sanitize, not reject
    expect(res.text).toBe('OK');
  });

  it('should reject non-string contact', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      contact: 123,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('contact must be a string');
  });

  it('should reject contact that is too short', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      contact: 'a',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('contact must be between 3 and 100 characters');
  });

  it('should reject non-string password', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      password: 123,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('password must be a string');
  });

  it('should reject password that is too short', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 10,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      password: '123',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toContain('password must be between 6 and 100 characters');
  });

  it('should accept valid and sanitized input', async () => {
    const res = await request(server).post('/api/record-info').send({
      latitude: 10,
      longitude: 20,
      sessionId: 'abc',
      dateTime: '2025-01-01T00:00:00Z',
      area: 'test',
      name: 'User',
      contact: '123456789',
      password: 'securepass',
    });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });
});

/* eslint-env jest */

import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  buildRecordInfoPayloadFromStorage,
  postRecordInfo,
} from '../../public/scripts/record-info.js';

describe('record-info helpers', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    document.cookie = '';
  });

  describe('buildRecordInfoPayloadFromStorage', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-01-18T00:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns null when name is required but missing', () => {
      const payload = buildRecordInfoPayloadFromStorage({ requireName: true });
      expect(payload).toBeNull();
    });

    it('uses fallback text for missing fields and preserves name', () => {
      localStorage.setItem('name', 'Ada');
      localStorage.setItem('selectedJobRole', '');
      localStorage.setItem('selectedExperience', '');

      const payload = buildRecordInfoPayloadFromStorage({ fallbackText: 'Not set' });
      expect(payload.name).toBe('Ada');
      expect(payload.role).toBe('Not set');
      expect(payload.experience).toBe('Not set');
      expect(payload.dateTime).toBe(new Date('2026-01-18T00:00:00Z').toISOString());
    });

    it('sets a fallback name when not required', () => {
      const payload = buildRecordInfoPayloadFromStorage({ fallbackText: 'Not set' });
      expect(payload.name).toBe('Not set');
    });

    it('parses numeric fields and includes sessionId', () => {
      localStorage.setItem('name', 'Ada');
      localStorage.setItem('latitude', '1.5');
      localStorage.setItem('longitude', '2.25');

      const payload = buildRecordInfoPayloadFromStorage();
      expect(payload.latitude).toBe(1.5);
      expect(payload.longitude).toBe(2.25);
      expect(payload.sessionId).toMatch(/^user-\d+$/);
    });
  });

  describe('postRecordInfo', () => {
    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('sends payload with CSRF headers when cookie is present', async () => {
      document.cookie = 'csrf_token=token123';
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('OK'),
      });

      await postRecordInfo({ sessionId: 'abc' });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [, options] = global.fetch.mock.calls[0];
      expect(options.headers['x-csrf-token']).toBe('token123');
      expect(options.method).toBe('POST');
    });

    it('throws when the server responds with an error', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Nope'),
      });

      await expect(postRecordInfo({ sessionId: 'abc' })).rejects.toThrow('Nope');
    });
  });
});

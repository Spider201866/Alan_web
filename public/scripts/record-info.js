// Alan UI - record-info.js | 18th January 2026, WJW
// Shared helpers for assembling and posting record-info payloads.

import { withCsrfHeaders } from './csrf.js';
import { ensureSessionId, getStoredNumber, getStoredString } from './storage.js';

export function buildRecordInfoPayloadFromStorage(options = {}) {
  const { fallbackText = null, requireName = false } = options;

  const rawName = getStoredString('name', null);
  if (requireName && !rawName) return null;
  const name = rawName ?? fallbackText;

  const payload = {
    sessionId: ensureSessionId(),
    name,
    role: getStoredString('selectedJobRole', fallbackText),
    experience: getStoredString('selectedExperience', fallbackText),
    country: getStoredString('country', fallbackText),
    iso2: getStoredString('iso2', fallbackText),
    classification: getStoredString('classification', fallbackText),
    contactInfo: getStoredString('contactInfo', null),
    version: '1.0',
    dateTime: new Date().toISOString(),
  };

  const area = getStoredString('area', fallbackText);
  if (area !== null) payload.area = area;

  const latitude = getStoredNumber('latitude');
  const longitude = getStoredNumber('longitude');
  if (latitude !== null) payload.latitude = latitude;
  if (longitude !== null) payload.longitude = longitude;

  return payload;
}

export function postRecordInfo(payload) {
  return fetch('/api/record-info', {
    method: 'POST',
    headers: withCsrfHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  }).then((resp) => {
    if (!resp.ok) {
      return resp.text().then((text) => {
        throw new Error(text || `Server error: ${resp.status}`);
      });
    }
    return resp.text();
  });
}

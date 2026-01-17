// Alan UI - home-data.js | 14th January 2026, WJW
// public/scripts/home-data.js
// Handles data fetching and server communication for the home page.

import log from './log.js';
import { initMutedButtons } from './muted.js';
import { setTrustedHtml } from './trusted-html.js';
import { buildRecordInfoPayloadFromStorage, postRecordInfo } from './record-info.js';

/**
 * Fetches the HTML snippet for the muted buttons, injects it into the DOM, and initializes the buttons.
 * @returns {Promise<void>} A promise that resolves when the snippet is fetched and initialized.
 */
export function fetchMutedSnippet() {
  return fetch('muted.html')
    .then((res) => (res.ok ? res.text() : Promise.reject('File not found')))
    .then((html) => {
      const mutedContainer = document.getElementById('muted-buttons');
      if (mutedContainer) setTrustedHtml(mutedContainer, html);
      initMutedButtons();
    })
    .catch((err) => {
      log.error('Error fetching muted.html:', err);
      throw err;
    });
}

/**
 * Fetches a human-readable area name (e.g., city) from latitude and longitude coordinates using the BigDataCloud API.
 * @param {number} lat - The latitude.
 * @param {number} lng - The longitude.
 * @returns {Promise<string>} A promise that resolves with the area name or 'Unknown' if an error occurs.
 */
export async function fetchAreaFromLatLong(lat, lng) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const errorData = await resp.text();
      log.error('BigDataCloud API Error:', errorData);
      throw new Error(`API request failed with status ${resp.status}`);
    }
    const data = await resp.json();
    return data.city || data.locality || data.principalSubdivision || 'Unknown';
  } catch (err) {
    log.error('Error fetching area from lat/long:', err);
    return 'Unknown';
  }
}

/**
 * Gathers user data from local storage and pushes it to the server.
 * This is typically called when new information (like geolocation) is available.
 * @returns {Promise<string>} A promise that resolves with the server's response text on success.
 */
export function pushLocalStorageToServer() {
  // --- THIS IS THE FIX ---
  // If the user's name isn't set yet, don't try to send data to the server.
  const payload = buildRecordInfoPayloadFromStorage({ requireName: true });
  if (!payload) {
    log.info('Skipping push to server: name is not yet set in localStorage.');
    return Promise.resolve('No name to push.'); // Exit the function gracefully.
  }
  // --- END OF FIX ---

  // The original check for geo data is still useful.
  if (
    payload.latitude === undefined &&
    payload.longitude === undefined &&
    (!payload.area || payload.area.trim() === '')
  ) {
    return Promise.resolve('[Info] No new geo data – skipping server push.');
  }

  return postRecordInfo(payload)
    .then((data) => data)
    .catch((err) => {
      log.error('Error pushing data to server:', err);
      throw err;
    });
}

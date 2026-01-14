// Alan UI - home-data.js | 14th January 2026, WJW
// public/scripts/home-data.js
// Handles data fetching and server communication for the home page.

import log from './log.js';
import { initMutedButtons } from './muted.js';
import { setTrustedHtml } from './trusted-html.js';

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
  const name = localStorage.getItem('name');
  if (!name) {
    log.info('Skipping push to server: name is not yet set in localStorage.');
    return Promise.resolve('No name to push.'); // Exit the function gracefully.
  }
  // --- END OF FIX ---

  const sessionId = localStorage.getItem('sessionId') || `user-${Date.now()}`;

  const payload = {
    sessionId,
    name: name, // Use the name variable we just checked
    role: localStorage.getItem('selectedJobRole') || null,
    experience: localStorage.getItem('selectedExperience') || null,
    country: localStorage.getItem('country') || null,
    iso2: localStorage.getItem('iso2') || null,
    classification: localStorage.getItem('classification') || null,
    contactInfo: localStorage.getItem('contactInfo') || null,
    version: '1.0',
    dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
  };

  const lat = localStorage.getItem('latitude');
  const lon = localStorage.getItem('longitude');
  const area = localStorage.getItem('area');

  if (lat && !isNaN(parseFloat(lat))) payload.latitude = +lat;
  if (lon && !isNaN(parseFloat(lon))) payload.longitude = +lon;
  if (area && area.trim() !== '') payload.area = area;

  // The original check for geo data is still useful.
  if (!payload.latitude && !payload.longitude && !payload.area) {
    return Promise.resolve('[Info] No new geo data – skipping server push.');
  }

  return fetch('/api/record-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) =>
      res.ok
        ? res.text()
        : res.text().then((t) => {
            log.error('Server error response when pushing data:', t);
            throw new Error(t || `Server responded with status ${res.status}`);
          })
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      log.error('Error pushing data to server:', err);
      throw err;
    });
}

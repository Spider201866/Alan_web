// public/scripts/home-data.js
// Handles data fetching and server communication for the home page.

export function fetchMutedSnippet() {
  return fetch('muted.html') // Return the promise
    .then((res) => (res.ok ? res.text() : Promise.reject('File not found')))
    .then((html) => {
      const mutedContainer = document.getElementById('muted-buttons');
      if (mutedContainer) mutedContainer.innerHTML = html;
      if (typeof window.initMutedButtons === 'function') {
        window.initMutedButtons();
      }
      // Translations will be handled by the languageChanged event in the orchestrator
    })
    .catch((err) => {
      console.error('Error fetching muted.html:', err);
      // Optionally re-throw or return a specific error object
      throw err;
    });
}

export async function fetchAreaFromLatLong(lat, lng) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    const resp = await fetch(url);
    if (!resp.ok) {
      // Check if response is ok
      const errorData = await resp.text();
      console.error('BigDataCloud API Error:', errorData);
      throw new Error(`API request failed with status ${resp.status}`);
    }
    const data = await resp.json();
    return data.city || data.locality || data.principalSubdivision || 'Unknown';
  } catch (err) {
    // Renamed _err to err for clarity
    console.error('Error fetching area from lat/long:', err);
    return 'Unknown'; // Return a default value on error
  }
}

export function pushLocalStorageToServer() {
  const sessionId = localStorage.getItem('sessionId') || `user-${Date.now()}`;

  const payload = {
    sessionId,
    name: localStorage.getItem('name') || null,
    role: localStorage.getItem('selectedJobRole') || null,
    experience: localStorage.getItem('selectedExperience') || null,
    country: localStorage.getItem('country') || null,
    iso2: localStorage.getItem('iso2') || null,
    classification: localStorage.getItem('classification') || null,
    roleClassification: localStorage.getItem('roleClassification') || null,
    contactInfo: localStorage.getItem('contactInfo') || null,
    version: '1.0',
    dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
  };

  const lat = localStorage.getItem('latitude');
  const lon = localStorage.getItem('longitude');
  const area = localStorage.getItem('area');

  if (lat && !isNaN(parseFloat(lat))) payload.latitude = +lat; // Ensure conversion from string
  if (lon && !isNaN(parseFloat(lon))) payload.longitude = +lon; // Ensure conversion from string
  if (area && area.trim() !== '') payload.area = area;

  // Only send if there's meaningful data beyond just session ID and basic local storage items
  // For instance, if new geo data is present or if certain critical fields are updated.
  // The original logic was to bail out if no geo data. We can refine this if needed.
  if (!payload.latitude && !payload.longitude && !payload.area) {
    // console.log('[Info] No new geo data – skipping server push for now.'); // Keep or remove log as preferred
    return Promise.resolve('[Info] No new geo data – skipping server push.'); // Return a resolved promise
  }

  return fetch('/api/record-info', {
    // Changed to local API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) =>
      res.ok
        ? res.text()
        : res.text().then((t) => {
            // Log the error text from server before throwing
            console.error('Server error response when pushing data:', t);
            throw new Error(t || `Server responded with status ${res.status}`);
          })
    )
    .then((data) => {
      // console.log('Server data pushed successfully:', data); // Keep or remove log
      return data; // Return data on success
    })
    .catch((err) => {
      console.error('Error pushing data to server:', err);
      throw err; // Re-throw to allow orchestrator to handle if needed
    });
}

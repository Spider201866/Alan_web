// public/scripts/home.js (New Orchestrator Version)
// Orchestrates UI, data, and translation modules for the home page.

import log from './log.js';
import { faviconAndMetaSetup } from './faviconAndMeta.js';
import { initChatbot } from './agent1-chatbot-module.js';
// import { setLanguage, getTranslation } from './language.js'; // No longer directly used here, handled by translator or UI
import './closer.js'; // Handles generic click-outside-to-close behaviors
import './listener-module.js'; // Handles chat history sidebar and other listeners

import { initUI } from './home-ui.js';
import { fetchMutedSnippet, fetchAreaFromLatLong, pushLocalStorageToServer } from './home-data.js';
import { initTranslator } from './home-translator.js';

document.addEventListener('DOMContentLoaded', main);

/**
 * The main entry point for the home page, executed when the DOM is fully loaded.
 * It orchestrates the initialization of UI components, data fetching, and other modules.
 */
function main() {
  // 1. Initialize all UI components.
  // Pass the orchestrator's data-handling function to the UI module.
  initUI({
    onGeolocationClick: fetchAndDisplayLocation,
  });

  // 2. Initialize the language system and apply initial translations.
  initTranslator();

  // 3. Load initial data snippets (e.g., muted.html content).
  fetchMutedSnippet().catch((err) => log.error('Initial fetchMutedSnippet failed:', err));

  // 4. Initialize the chatbot.
  // Ensure sessionId is available or generated if not.
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `user-${Date.now()}`;
    localStorage.setItem('sessionId', sessionId);
  }
  initChatbot(sessionId);

  // 5. Setup favicon and meta tags.
  faviconAndMetaSetup();

  // Other global initializations if any.
}

/**
 * Orchestrates the process of fetching location data and updating the server.
 * This function is passed as a callback to the UI module to be triggered on geolocation events.
 * @param {number} latitude - The user's latitude.
 * @param {number} longitude - The user's longitude.
 */
async function fetchAndDisplayLocation(latitude, longitude) {
  try {
    // home-ui.js has already stored latitude and longitude in localStorage.
    const areaName = await fetchAreaFromLatLong(latitude, longitude);
    localStorage.setItem('area', areaName || 'Unknown'); // Ensure 'Unknown' if null/undefined

    // Trigger a push of all local storage data to the server.
    await pushLocalStorageToServer();

    // UI updates like flashing blue or refreshing popup content are handled within home-ui.js
    // after this async function completes or as part of its internal logic.
    log.info('fetchAndDisplayLocation: Area fetched and data pushed.');
  } catch (error) {
    log.error('Error in fetchAndDisplayLocation (orchestrator):', error);
    // Optionally, communicate this error back to the UI if a mechanism is set up.
  }
}

// Event Listeners from original home.js, adapted for the new structure
window.addEventListener('pageshow', (event) => {
  // Side menu should be closed by default on page show, handled by initUI's initial state.
  // Push data to server on page show.
  pushLocalStorageToServer().catch((err) =>
    log.error('pushLocalStorageToServer on pageshow failed:', err)
  );

  if (event.persisted) {
    // If the page is loaded from cache, re-fetch dynamic content.
    fetchMutedSnippet().catch((err) =>
      log.error('fetchMutedSnippet on pageshow (persisted) failed:', err)
    );
    // Consider if a full reload is always necessary or if targeted updates are better.
    // window.location.reload(); // This was in the original, evaluate if still needed.
  }
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // When the tab becomes visible again, push data.
    pushLocalStorageToServer().catch((err) =>
      log.error('pushLocalStorageToServer on visibilitychange failed:', err)
    );
  }
});

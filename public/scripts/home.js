// public/scripts/home.js (New Orchestrator Version)
// Orchestrates UI, data, and translation modules for the home page.

import log from './log.js';

import { initChatbot } from './agent1-chatbot-module.js';
// import { setLanguage, getTranslation } from './language.js'; // No longer directly used here, handled by translator or UI
import './closer.js'; // Handles generic click-outside-to-close behaviors
import { initChatHistory } from './listener-module.js'; // Handles chat history sidebar and other listeners

import { initUI } from './home-ui.js';
import { fetchMutedSnippet, fetchAreaFromLatLong, pushLocalStorageToServer } from './home-data.js';
import { initTranslator } from './home-translator.js';

document.addEventListener('DOMContentLoaded', () => {
  let mainHasRun = false;
  const runMain = () => {
    if (!mainHasRun) {
      main();
      mainHasRun = true;
    }
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SW_READY') {
        runMain();
      }
    });

    if (navigator.serviceWorker.controller) {
      runMain();
    }
  } else {
    runMain();
  }
});

/**
 * The main entry point for the home page, executed when the DOM is fully loaded.
 * It orchestrates the initialization of UI components, data fetching, and other modules.
 */
function main() {
  initChatHistory();

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
  // --- START: Marquee Hiding Logic (Corrected) ---
  // Hides the marquee section only when the user focuses on the chatbot.

  const marqueeSection = document.getElementById('boxes-marquee-section');
  const chatbotContainer = document.querySelector('.chatbot-container');

  if (marqueeSection && chatbotContainer) {
    const onChatbotFocus = () => {
      log.info('Chatbot focused, hiding marquee.');
      // Add the 'hidden' class to hide the marquee via CSS.
      if (!marqueeSection.classList.contains('hidden')) {
        marqueeSection.classList.add('hidden');
      }
    };

    // Listen for the first focus event on the chatbot container.
    chatbotContainer.addEventListener('focusin', onChatbotFocus, { once: true });
  }
  // --- END: Marquee Hiding Logic (Corrected) ---

  // 6. PWA Install prompt handling
  let deferredPrompt;
  const installBtn = document.getElementById('install-btn');

  // Hide install button if app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    log.info('beforeinstallprompt event fired. deferredPrompt is set.');
    if (installBtn) {
      installBtn.style.display = 'block';

      const installHandler = () => {
        if (deferredPrompt) {
          // Show the install prompt immediately on user gesture
          deferredPrompt.prompt();

          // Handle the user's choice
          deferredPrompt.userChoice.then((choiceResult) => {
            log.info(`Install outcome: ${choiceResult.outcome}`);
            deferredPrompt = null;
            installBtn.style.display = 'none';
          });

          // Request notification permission in the background
          if (Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
              log.info(`Notification permission: ${permission}`);
            });
          }
        }
      };

      installBtn.addEventListener('click', installHandler, { once: true });
    }
  });

  window.addEventListener('appinstalled', () => {
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  });

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

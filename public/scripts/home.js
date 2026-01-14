// Alan UI - home.js | 14th January 2026, WJW
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

// -----------------------------
// PWA Install prompt handling
// -----------------------------
// NOTE:
// - `beforeinstallprompt` can fire before our SW_READY gating runs.
// - It also won’t fire if the app is already installed.
// So we wire this up outside of `main()` and keep the button hidden unless
// installation is actually available.
let deferredPrompt = null;
let installBtn = null;

const setInstallButtonVisible = (visible) => {
  if (!installBtn) return;
  installBtn.style.display = visible ? 'block' : 'none';
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  log.info('beforeinstallprompt event fired. deferredPrompt is set.');
  setInstallButtonVisible(true);
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('alanui:installed', '1');
  deferredPrompt = null;
  setInstallButtonVisible(false);
});

document.addEventListener('DOMContentLoaded', () => {
  installBtn = document.getElementById('install-btn');
  if (installBtn) {
    // Hide by default.
    // We only show when the browser explicitly tells us installation is possible
    // via the `beforeinstallprompt` event.
    setInstallButtonVisible(false);

    // In the installed app window, never show Install.
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstallButtonVisible(false);
    }

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      log.info(`Install outcome: ${choiceResult.outcome}`);

      // `beforeinstallprompt` can only be used once.
      deferredPrompt = null;
      setInstallButtonVisible(false);

      // Request notification permission only after an explicit user gesture.
      if (Notification?.permission === 'default') {
        try {
          const permission = await Notification.requestPermission();
          log.info(`Notification permission: ${permission}`);
        } catch {
          // ignore
        }
      }
    });
  }

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
    // Ensure the marquee is visible on initial load.
    // (If a previous SW-cached JS run hid it via class or inline styles, undo that.)
    marqueeSection.classList.remove('hidden');
    marqueeSection.style.display = '';

    // Hide the marquee only on *actual user interaction* with the chat UI.
    // This avoids Flowise programmatic focus during init hiding the marquee.
    const hideMarquee = () => {
      log.info('Chatbot interacted with, hiding marquee.');
      marqueeSection.classList.add('hidden');
    };

    // Use click (not pointerdown): if we hide on pointerdown, the layout shift can
    // cause the subsequent click to land on a different element (e.g. the Instructions
    // button), triggering unwanted navigation.
    chatbotContainer.addEventListener('click', hideMarquee, { once: true, capture: true });

    // Keyboard users: hide once they start typing while focus is inside the chat area.
    const onKeyDown = (event) => {
      if (event && event.isTrusted === false) return;
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
      const isWithinChat = path.includes(chatbotContainer);
      if (!isWithinChat) return;
      hideMarquee();
      document.removeEventListener('keydown', onKeyDown, { capture: true });
    };
    document.addEventListener('keydown', onKeyDown, { capture: true });
  }
  // --- END: Marquee Hiding Logic (Corrected) ---

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

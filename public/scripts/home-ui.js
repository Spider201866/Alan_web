// public/scripts/home-ui.js
// Manages UI elements, interactions, and popups for the home page.
//
// This file is intentionally kept small as an orchestrator that wires together
// single-responsibility modules.

import { createHomeUIState } from './home-ui-state.js';
import { setupNameIcon } from './home-ui-popup.js';
import { wireHomeUIHandlers } from './home-ui-handlers.js';

/**
 * Initializes all UI components and event listeners for the home page.
 * This is the main entry point for this module.
 * @param {Object} [options={}] - An options object.
 * @param {Function} [options.onGeolocationClick] - A callback function to handle geolocation data.
 */
export function initUI(options = {}) {
  const state = createHomeUIState();
  setupNameIcon(state);
  wireHomeUIHandlers(state, options);
}

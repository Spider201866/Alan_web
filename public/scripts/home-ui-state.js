// public/scripts/home-ui-state.js
// Queries and stores the DOM elements used by the home UI module.

import { FocusTrap } from './focus-trap.js';

/**
 * @typedef {object} HomeUIState
 * @property {HTMLElement|null} menuIcon
 * @property {HTMLElement|null} sideMenu
 * @property {HTMLElement|null} instructionsButton
 * @property {HTMLElement|null} languageButton
 * @property {HTMLElement|null} languageDropdown
 * @property {HTMLElement|null} popup
 * @property {HTMLElement|null} popupClose
 * @property {HTMLElement|null} overlay
 * @property {HTMLElement|null} geolocationButton
 * @property {HTMLElement|null} locationInfo
 * @property {HTMLElement|null} geoInfoButton
 * @property {HTMLElement|null} geoInfoPopup
 * @property {HTMLElement|null} chatbotContainer
 * @property {HTMLElement|null} boxesFrame
 * @property {HTMLElement|null} chatbotTitle
 * @property {FocusTrap|null} popupFocusTrap
 * @property {FocusTrap|null} sideMenuFocusTrap
 */

/**
 * Queries and initializes all DOM elements and focus traps required by the home UI.
 * @returns {HomeUIState}
 */
export function createHomeUIState() {
  const state = {
    menuIcon: document.querySelector('.menu-icon'),
    sideMenu: document.querySelector('.side-menu'),
    instructionsButton: document.getElementById('instructions-button'),
    languageButton: document.getElementById('language-button'),
    languageDropdown: document.getElementById('language-dropdown'),
    popup: document.getElementById('popup'),
    popupClose: document.querySelector('.popup-close'),
    overlay: document.getElementById('modal-overlay'),
    geolocationButton: document.getElementById('geolocation-button'),
    locationInfo: document.getElementById('location-info'),
    geoInfoButton: document.getElementById('geo-info-button'),
    geoInfoPopup: document.getElementById('geo-info-popup'),
    chatbotContainer: document.querySelector('.chatbot-container'),
    boxesFrame: document.getElementById('boxesFrame'),
    chatbotTitle: document.querySelector('.chatbot-title'),
    popupFocusTrap: null,
    sideMenuFocusTrap: null,
  };

  if (state.popup) state.popupFocusTrap = new FocusTrap(state.popup);

  if (state.sideMenu) {
    state.sideMenuFocusTrap = new FocusTrap(state.sideMenu);
    // Ensure it's hidden initially (consistent with closeAllPopups)
    state.sideMenu.style.left = '-370px';
  }

  return state;
}

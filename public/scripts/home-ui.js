// public/scripts/home-ui.js
// Manages UI elements, interactions, and popups for the home page.

import log from './log.js';
import { FocusTrap } from './focus-trap.js';
import { getTranslation, setLanguage } from './language.js'; // setLanguage needed for language controls

// DOM Elements (these will be passed in or queried within functions if not passed)
let menuIcon,
  sideMenu,
  instructionsButton,
  languageButton,
  languageDropdown,
  popup,
  popupClose,
  overlay;
let geolocationButton, locationInfo, geoInfoButton, geoInfoPopup; // Elements for geo functions
let chatbotContainer, boxesFrame, chatbotTitle; // Elements for chatbot interaction

// Focus traps (initialized if elements are present)
let popupFocusTrap;
let sideMenuFocusTrap;

/**
 * Queries and assigns all necessary DOM elements to module-level variables.
 * This avoids repeated DOM queries and centralizes element selection.
 */
function queryDOMElements() {
  menuIcon = document.querySelector('.menu-icon');
  sideMenu = document.querySelector('.side-menu');
  instructionsButton = document.getElementById('instructions-button');
  languageButton = document.getElementById('language-button');
  languageDropdown = document.getElementById('language-dropdown');
  popup = document.getElementById('popup');
  popupClose = document.querySelector('.popup-close');
  overlay = document.getElementById('modal-overlay');
  geolocationButton = document.getElementById('geolocation-button');
  locationInfo = document.getElementById('location-info');
  geoInfoButton = document.getElementById('geo-info-button');
  geoInfoPopup = document.getElementById('geo-info-popup');
  chatbotContainer = document.querySelector('.chatbot-container');
  boxesFrame = document.getElementById('boxesFrame');
  chatbotTitle = document.querySelector('.chatbot-title');

  if (popup) popupFocusTrap = new FocusTrap(popup);
  if (sideMenu) {
    sideMenuFocusTrap = new FocusTrap(sideMenu);
    sideMenu.style.left = '-370px'; // Ensure it's hidden initially consistent with closeAllPopups
  }
}

/**
 * Closes all popups, side menus, and the modal overlay to ensure a clean UI state.
 * It also deactivates any active focus traps.
 */
function closeAllPopups() {
  if (sideMenu && sideMenu.style.left === '0px') {
    if (menuIcon) menuIcon.classList.remove('open');
    sideMenu.style.left = '-370px';
    if (sideMenuFocusTrap) sideMenuFocusTrap.deactivate();
  }

  if (popup && popup.style.right === '0px') {
    popup.style.right = '-350px';
    if (popupFocusTrap) popupFocusTrap.deactivate();
  }

  if (overlay) overlay.style.display = 'none';
}

/**
 * Opens the main user information popup.
 * It ensures all other popups are closed first, builds the content, and activates the focus trap.
 */
function openPopup() {
  closeAllPopups(); // Close any other popups first

  const popupContent = document.getElementById('popup-content');
  if (popupContent) popupContent.innerHTML = buildPopupContent();
  if (popup) popup.style.right = '0';
  if (overlay) overlay.style.display = 'block';
  if (popupFocusTrap) popupFocusTrap.activate();
}

/**
 * Closes the main user information popup by calling the general close function.
 */
function closePopup() {
  closeAllPopups();
}

/**
 * Toggles the visibility of the main user information popup.
 */
function togglePopup() {
  if (popup) {
    popup.style.right === '0px' ? closePopup() : openPopup();
  }
}

/**
 * Builds the HTML content for the user information popup by retrieving data from local storage.
 * @returns {string} The HTML string to be injected into the popup.
 */
function buildPopupContent() {
  const name = localStorage.getItem('name') || 'Not set';
  const role = localStorage.getItem('selectedJobRole') || 'Not set';
  const experienceValue = localStorage.getItem('selectedExperience') || 'Not set';
  const latitude = (parseFloat(localStorage.getItem('latitude')) || 0).toFixed(6);
  const longitude = (parseFloat(localStorage.getItem('longitude')) || 0).toFixed(6);
  const country = localStorage.getItem('country') || 'Not set';
  const iso2 = localStorage.getItem('iso2') || 'Not set';
  const classification = localStorage.getItem('classification') || 'Unknown';
  const roleClass = localStorage.getItem('roleClassification') || '';
  const area = localStorage.getItem('area') || 'Not set';
  const contactInfo = localStorage.getItem('contactInfo') || 'Not set';
  const experienceKeyMap = {
    'Student / refresher': 'experienceStudentRefresher',
    'Confident core knowledge': 'experienceConfidentCore',
    Expert: 'experienceExpert',
  };
  const translatedExperience = getTranslation(experienceKeyMap[experienceValue], experienceValue);
  const now = new Date();
  const currDT = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return `<h2>${getTranslation('userInfoTitle', 'User Information')}</h2>
<p><strong>${getTranslation('userName', 'Name')}:</strong> ${name}</p>
<p><strong>${getTranslation('userContact', 'Contact')}:</strong> ${contactInfo}</p>
<p><strong>${getTranslation('userAimsPopupLabel', 'Aims')}:</strong> ${role}${roleClass ? ', ' + roleClass : ''}</p> 
<p><strong>${getTranslation('userExperiencePopupLabel', 'Experience')}:</strong> ${translatedExperience}</p>
<p id="latLongSection" style="color: grey;"><strong>${getTranslation('userLatLong', 'Lat/Long')}:</strong> ${latitude}, ${longitude}</p>
<p id="areaSection" style="color: grey;"><strong>${getTranslation('userArea', 'Area')}:</strong> ${area}</p>
<p id="countrySection" style="color: grey;"><strong>${getTranslation('userCountry', 'Country')}:</strong> ${country}, ${iso2}, ${classification}</p>
<p style="color: grey;"><em><strong>${getTranslation('userVersion', 'Version')}:</strong> 1.0</em></p>
<p style="color: grey;"><em><strong>${getTranslation('userDateTime', 'Date/Time')}:</strong> ${currDT}</em></p>`;
}

/**
 * Sets up the event listener for the main menu icon to toggle the side menu.
 */
function setupMenuIcon() {
  if (!menuIcon || !sideMenu || !overlay || !sideMenuFocusTrap) return;
  menuIcon.addEventListener('click', function () {
    const isCurrentlyOpen = this.classList.contains('open');
    closeAllPopups();
    if (!isCurrentlyOpen) {
      this.classList.add('open');
      sideMenu.style.left = '0px';
      overlay.style.display = 'block';
      sideMenuFocusTrap.activate();
    }
  });
}

/**
 * Updates the style of a button after it has been clicked, typically to indicate a completed action.
 * @param {HTMLElement} button - The button element to be styled.
 */
function updateButtonStyle(button) {
  if (!button) return;
  button.classList.remove('pulse');
  button.style.backgroundColor = 'grey';
  button.style.color = 'white';
}

/**
 * Sets up the event listener for the instructions button to navigate to the instructions page.
 */
function setupInstructionsButton() {
  if (!instructionsButton) return;
  instructionsButton.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.setItem('instructionsClicked', 'true');
    updateButtonStyle(this);
    setTimeout(() => (window.location.href = 'instructions.html'), 300);
  });
}

/**
 * Creates and sets up the user's name icon in the header, which toggles the user info popup.
 */
function setupNameIcon() {
  const storedName = localStorage.getItem('name') || 'User';
  const nameIconElement = document.createElement('div');
  nameIconElement.className = 'name-icon';
  nameIconElement.textContent = storedName.charAt(0).toUpperCase();
  const header = document.querySelector('.chatbot-header');
  if (header) header.appendChild(nameIconElement);
  nameIconElement.addEventListener('click', togglePopup);
  if (popupClose) popupClose.addEventListener('click', closePopup);
}

/**
 * Sets up the event listener for the geolocation info button to toggle the visibility of the info popup.
 */
function setupGeoInfoButton() {
  if (!geoInfoButton || !geoInfoPopup) return;
  geoInfoButton.addEventListener('click', (event) => {
    event.stopPropagation();
    geoInfoPopup.style.display =
      geoInfoPopup.style.display === 'none' || geoInfoPopup.style.display === '' ? 'block' : 'none';
  });
  document.addEventListener('click', (event) => {
    if (
      geoInfoPopup.style.display === 'block' &&
      !geoInfoPopup.contains(event.target) &&
      event.target !== geoInfoButton
    ) {
      geoInfoPopup.style.display = 'none';
    }
  });
}

/**
 * Flashes the background of specific UI elements to indicate that they have been updated.
 */
function flashBlueOnUpdate() {
  ['latLongSection', 'areaSection', 'countrySection'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('flash-blue');
      setTimeout(() => el.classList.remove('flash-blue'), 2000);
    }
  });
}

// The onGeolocationClick callback will be passed from the orchestrator (home.js)
/**
 * Sets up the geolocation button, including the click handler to fetch and process the user's location.
 * @param {Function} onGeolocationClick - A callback function to be executed with the latitude and longitude when the location is successfully retrieved.
 */
function setupGeolocationButton(onGeolocationClick) {
  if (!geolocationButton || !locationInfo) return;
  geolocationButton.addEventListener('click', async () => {
    geolocationButton.style.backgroundColor = 'blue';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Store immediately for other UI parts that might read it
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());

          locationInfo.innerText = `Updated location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          locationInfo.style.display = 'block';

          // Call the data handling function passed from the orchestrator
          if (typeof onGeolocationClick === 'function') {
            await onGeolocationClick(latitude, longitude); // Pass lat/long
          }

          // Refresh popup content after data operations
          const popupContent = document.getElementById('popup-content');
          if (popupContent) popupContent.innerHTML = buildPopupContent();
          flashBlueOnUpdate(); // UI feedback

          setTimeout(() => {
            geolocationButton.style.backgroundColor = 'grey';
            locationInfo.style.display = 'none';
          }, 3000);
        },
        (error) => {
          const errorMessages = {
            [error.PERMISSION_DENIED]: 'User denied geolocation.',
            [error.POSITION_UNAVAILABLE]: 'Location info unavailable.',
            [error.TIMEOUT]: 'Request timed out.',
          };
          locationInfo.innerText = errorMessages[error.code] || 'An unknown error occurred.';
          locationInfo.style.display = 'block';
          setTimeout(() => {
            geolocationButton.style.backgroundColor = 'grey';
            locationInfo.style.display = 'none';
          }, 3000);
        }
      );
    } else {
      locationInfo.innerText = 'Geolocation not supported.';
      locationInfo.style.display = 'block';
      setTimeout(() => {
        geolocationButton.style.backgroundColor = 'grey';
        locationInfo.style.display = 'none';
      }, 3000);
    }
  });
}

/**
 * Sets up the language selection dropdown and its event listeners.
 */
function setupLanguageControls() {
  if (!languageButton || !languageDropdown) return;
  languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.style.display = languageDropdown.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', () => (languageDropdown.style.display = 'none'));
  languageDropdown.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', async () => {
      const chosenLang = item.getAttribute('data-value');
      localStorage.setItem('preferredLanguage', chosenLang);
      await setLanguage(chosenLang); // This will trigger 'languageChanged' event
      languageDropdown.style.display = 'none';
    });
  });
}

/**
 * Sets up interactions related to the chatbot container, such as hiding other elements on click.
 */
function setupChatbotInteraction() {
  if (chatbotContainer && boxesFrame) {
    chatbotContainer.addEventListener('click', () => {
      boxesFrame.style.display = 'none';
    });
  }
  if (chatbotTitle) {
    chatbotTitle.classList.remove('flip-horizontally');
    void chatbotTitle.offsetWidth; // Trigger reflow
    chatbotTitle.classList.add('flip-horizontally');
  }
}

/**
 * Initializes all UI components and event listeners for the home page.
 * This is the main entry point for this module.
 * @param {Object} [options={}] - An options object.
 * @param {Function} [options.onGeolocationClick] - A callback function to handle geolocation data.
 */
export function initUI(options = {}) {
  queryDOMElements(); // Ensure all DOM elements are queried

  setupMenuIcon();
  setupInstructionsButton();
  setupNameIcon();
  setupGeoInfoButton();

  // Pass the data fetching/handling function to setupGeolocationButton
  if (typeof options.onGeolocationClick === 'function') {
    setupGeolocationButton(options.onGeolocationClick);
  } else {
    // Fallback or error if the crucial callback isn't provided
    log.warn('initUI: onGeolocationClick callback not provided for geolocation button.');
    // Setup geolocation button without the data fetching part if no callback
    setupGeolocationButton(() => {
      log.info('Geolocation clicked, but no data handler provided to UI module.');
    });
  }

  setupLanguageControls();
  setupChatbotInteraction();

  // Add overlay and Escape key event listeners for closing popups/menus
  if (overlay) {
    overlay.addEventListener('click', closeAllPopups);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  });

  // Clear history button - specific to home.html structure
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (!confirm('Delete all saved chat sessions?')) return;

      localStorage.removeItem('alan-chat-history-v2');
      const side = document.getElementById('chatHistorySidebar');
      if (side) side.innerHTML = '';

      // Dynamically import listener-module to call resetSidebarHistory
      // This assumes listener-module.js is in the same directory
      import('./listener-module.js')
        .then((mod) => {
          if (typeof mod.resetSidebarHistory === 'function') mod.resetSidebarHistory();
        })
        .catch((err) => log.error('Failed to load listener-module for history reset:', err));
    });
  }
}

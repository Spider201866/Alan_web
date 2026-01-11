// public/scripts/home-ui-popup.js
// Popup-related behaviors (user info panel).

import { getTranslation } from './language.js';
import { closeAllPopups } from './home-ui-core.js';

/**
 * Builds the HTML content for the user information popup by retrieving data from local storage.
 * @returns {string}
 */
export function buildPopupContent() {
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
 * Opens the main user information popup.
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function openPopup(state) {
  closeAllPopups(state);

  const popupContent = document.getElementById('popup-content');
  if (popupContent) popupContent.innerHTML = buildPopupContent();
  if (state.popup) state.popup.style.right = '0';
  if (state.overlay) state.overlay.style.display = 'block';
  if (state.popupFocusTrap) state.popupFocusTrap.activate();
}

/**
 * Closes the main user information popup.
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function closePopup(state) {
  closeAllPopups(state);
}

/**
 * Toggles the main user information popup.
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function togglePopup(state) {
  if (!state.popup) return;
  state.popup.style.right === '0px' ? closePopup(state) : openPopup(state);
}

/**
 * Creates and sets up the user's name icon in the header, which toggles the user info popup.
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function setupNameIcon(state) {
  const storedName = localStorage.getItem('name') || 'User';
  const nameIconElement = document.createElement('div');
  nameIconElement.className = 'name-icon';
  nameIconElement.textContent = storedName.charAt(0).toUpperCase();

  const header = document.querySelector('.chatbot-header');
  if (header) header.appendChild(nameIconElement);

  nameIconElement.addEventListener('click', () => togglePopup(state));
  if (state.popupClose) state.popupClose.addEventListener('click', () => closePopup(state));
}

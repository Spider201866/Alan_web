// Alan UI - home-ui-popup.js | 14th January 2026, WJW
// public/scripts/home-ui-popup.js
// Popup-related behaviors (user info panel).

import { getTranslation } from './language.js';
import { closeAllPopups } from './home-ui-core.js';
import { setTrustedHtml } from './trusted-html.js';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
  const area = localStorage.getItem('area') || 'Not set';
  const experienceKeyMap = {
    // New canonical values
    Primary: 'experienceStudentRefresher',
    Intermediate: 'experienceConfidentCore',
    Advanced: 'experienceExpert',

    // Backward compat (older localStorage / older records)
    'Student / refresher': 'experienceStudentRefresher',
    'Confident core knowledge': 'experienceConfidentCore',
    Expert: 'experienceExpert',
  };
  const translatedExperience = getTranslation(experienceKeyMap[experienceValue], experienceValue);

  // Translate stored aims (we store canonical values like "Eyes"/"Ears"/"Skin" in localStorage)
  // so the popup respects the currently selected UI language.
  const aimsKeyMap = {
    Eyes: 'aimsEyes',
    Ears: 'aimsEars',
    Skin: 'aimsSkin',
    Veterinary: 'aimsVeterinary',
    'Child/Maternal': 'aimsChildMaternal',
  };
  const translatedAims =
    role && role !== 'Not set'
      ? role
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((aim) => getTranslation(aimsKeyMap[aim], aim))
          .join(', ')
      : role;
  const now = new Date();
  const currDT = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  // Ensure that user-controlled values cannot inject markup.
  const safeName = escapeHtml(name);
  const safeAims = escapeHtml(translatedAims);
  const safeExperience = escapeHtml(translatedExperience);
  const safeLatLong = escapeHtml(`${latitude}, ${longitude}`);
  const safeArea = escapeHtml(area);
  const safeCountry = escapeHtml(`${country}, ${iso2}, ${classification}`);
  const safeDateTime = escapeHtml(currDT);

  return `<h2>${escapeHtml(getTranslation('userInfoTitle', 'User Information'))}</h2>
<p><strong>${escapeHtml(getTranslation('userName', 'Name'))}:</strong> ${safeName}</p>
<p><strong>${escapeHtml(getTranslation('userAimsPopupLabel', 'Interests'))}:</strong> ${safeAims}</p>
<p><strong>${escapeHtml(getTranslation('experiencePlaceholder', 'Experience'))}:</strong> ${safeExperience}</p>
<p id="latLongSection" style="color: grey;"><strong>${escapeHtml(getTranslation('userLatLong', 'Lat/Long'))}:</strong> ${safeLatLong}</p>
<p id="areaSection" style="color: grey;"><strong>${escapeHtml(getTranslation('userArea', 'Area'))}:</strong> ${safeArea}</p>
<p id="countrySection" style="color: grey;"><strong>${escapeHtml(getTranslation('userCountry', 'Country'))}:</strong> ${safeCountry}</p>
<p style="color: grey;"><em><strong>${escapeHtml(getTranslation('userVersion', 'Version'))}:</strong> 1.0</em></p>
<p style="color: grey;"><em><strong>${escapeHtml(getTranslation('userDateTime', 'Date/Time'))}:</strong> ${safeDateTime}</em></p>`;
}

/**
 * Opens the main user information popup.
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function openPopup(state) {
  closeAllPopups(state);

  const popupContent = document.getElementById('popup-content');
  if (popupContent) setTrustedHtml(popupContent, buildPopupContent());
  if (state.popup) state.popup.classList.add('is-open');
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
  state.popup.classList.contains('is-open') ? closePopup(state) : openPopup(state);
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

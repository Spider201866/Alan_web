// NOTE: This script depends on external modules:
// - language.js (for `translations`)
// - faviconAndMeta.js (for `faviconAndMetaSetup`)
// - agent1-chatbot-module.js (for `initChatbot`)
// - closer.js and listener-module.js (for event listeners)
import { faviconAndMetaSetup } from './faviconAndMeta.js';
import { initChatbot } from './agent1-chatbot-module.js';
import './closer.js';
import './listener-module.js';
import { FocusTrap } from './focus-trap.js';

// DOM Elements
const menuIcon = document.querySelector('.menu-icon');
const sideMenu = document.querySelector('.side-menu');
const instructionsButton = document.getElementById('instructions-button');
const languageButton = document.getElementById('language-button');
const languageDropdown = document.getElementById('language-dropdown');
const popup = document.getElementById('popup');
const popupClose = document.querySelector('.popup-close');
const overlay = document.getElementById('modal-overlay');

// Accessibility: Focus traps for modal and side menu
const popupFocusTrap = new FocusTrap(popup);
const sideMenuFocusTrap = new FocusTrap(sideMenu);

// Core Functions
function main() {
  fetchMutedSnippet();
  const storedLang = localStorage.getItem('preferredLanguage') || 'en';
  updateAllLanguage(storedLang);

  faviconAndMetaSetup();
  initChatbot();
  setupMenuIcon();
  setupInstructionsButton();
  setupNameIcon();
  setupGeolocationButton();
  setupGeoInfoButton();
  setupLanguageControls();
  setupChatbotInteraction();

  if (localStorage.getItem('instructionsClicked') === 'true') {
    updateButtonStyle(instructionsButton);
  }

  // Add overlay and Escape key event listeners for closing popups/menus
  overlay.addEventListener('click', closeAllPopups);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  });
}

function fetchMutedSnippet() {
  fetch('muted.html')
    .then(res => res.ok ? res.text() : Promise.reject('File not found'))
    .then(html => {
      const mutedContainer = document.getElementById('muted-buttons');
      if (mutedContainer) mutedContainer.innerHTML = html;
      if (typeof window.initMutedButtons === 'function') {
        window.initMutedButtons();
      }
      const storedLang = localStorage.getItem('preferredLanguage') || 'en';
      updateAllLanguage(storedLang);
    })
    .catch(err => console.error('Error fetching muted.html:', err));
}

function updateAllLanguage(lang) {
  if (!window.translations || !window.translations[lang]) {
    console.warn(`Translations for '${lang}' not found. Check language.js.`);
    return;
  }
  const t = window.translations[lang];
  const elementTranslations = {
      '.chatbot-subtitle': 'eyesEars', '#good-history': 'goodHistory', '#examine-well': 'examineWell',
      '#use-arclight': 'useArclight', '.chatbot-version': 'alanMistakes', '#instructions-button': 'instructionsButton',
      '#eye-button': 'eyeButton', '#ear-button': 'earButton', '#skin-button': 'skinButton', '#videos-button': 'videosButton',
      '#atoms-button': 'atomsButton', '#tools-button': 'toolsButton', '#arclight-project-button': 'arclightProjectButton',
      '#links-button': 'linksButton', '#about-button': 'aboutButton'
  };
  for(const [selector, key] of Object.entries(elementTranslations)) {
      const el = document.querySelector(selector);
      if(el) el.textContent = t[key];
  }
  const geoInfoTextEl = document.getElementById('geoInfoText');
  if (geoInfoTextEl) {
      geoInfoTextEl.textContent = t.geoInfoPopupText || "Location data helps us understand usage and improve Alan. Your IP address provides an approximate country/city on first load. You can optionally provide more precise GPS data using the 'Check Location' button. This data is handled as per our privacy guidelines.";
  }
  showGreeting();
  const mutedButtonTranslations = {
    '#images .text-part': 'images', '#help .text-part': 'help', '#screenshot .text-part': 'screenshot',
    '#refer .text-part': 'refer', '#refer-popup': 'comingSoon'
  };
  for(const [selector, key] of Object.entries(mutedButtonTranslations)) {
    const el = document.querySelector(selector);
    if(el) el.textContent = t[key];
  }
  const boxesFrame = document.getElementById('boxesFrame');
  if (boxesFrame && boxesFrame.contentDocument) {
    const boxesDoc = boxesFrame.contentDocument;
    const marqueeLines = ['eyeMarqueeLine1', 'eyeMarqueeLine2', 'eyeMarqueeLine3', 'eyeMarqueeLine4', 'eyeMarqueeLine5', 'eyeMarqueeLine6', 'eyeMarqueeLine7', 'earMarqueeLine1', 'earMarqueeLine2', 'earMarqueeLine3', 'earMarqueeLine4', 'earMarqueeLine5', 'earMarqueeLine6', 'earMarqueeLine7'];
    marqueeLines.forEach(lineKey => {
      const elA = boxesDoc.getElementById(`${lineKey}a`); if (elA) elA.textContent = t[lineKey];
      const elB = boxesDoc.getElementById(`${lineKey}b`); if (elB) elB.textContent = t[lineKey];
    });
  }
}

function showGreeting() {
    const name = localStorage.getItem('name');
    const subTextEl = document.getElementById('sub-text');
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    if (!window.translations || !window.translations[lang]) return;
    const t = window.translations[lang];
    if (name) {
        let firstName = name.split(' ')[0];
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        subTextEl.innerText = `${firstName}, ${t.howCanIHelp}`;
    } else {
        subTextEl.innerText = t.howCanIHelp;
    }
}

function pushLocalStorageToServer() {
  const sessionId = localStorage.getItem('sessionId') || `user-${Date.now()}`;

  /* core fields – always present */
  const payload = {
    sessionId,
    name:               localStorage.getItem('name')                 || null,
    role:               localStorage.getItem('selectedJobRole')      || null,
    experience:         localStorage.getItem('selectedExperience')   || null,
    country:            localStorage.getItem('country')              || null,
    iso2:               localStorage.getItem('iso2')                 || null,
    classification:     localStorage.getItem('classification')       || null,
    roleClassification: localStorage.getItem('roleClassification')   || null,
    contactInfo:        localStorage.getItem('contactInfo')          || null,
    version: '1.0',
    dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
  };

  /* optional geo fields – only add when valid */
  const lat  = localStorage.getItem('latitude');
  const lon  = localStorage.getItem('longitude');
  const area = localStorage.getItem('area');

  if (lat && !isNaN(lat))           payload.latitude  = +lat;   // number
  if (lon && !isNaN(lon))           payload.longitude = +lon;   // number
  if (area && area.trim() !== '')   payload.area      = area;   // string

  /* nothing to send?  bail out rather than hit the API */
  if (!payload.latitude && !payload.longitude && !payload.area) {
    console.log('[Info] No geo data yet – skipping server push');
    return;
  }

  fetch('https://alan.up.railway.app/record-info', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  })
    .then(res => res.ok ? res.text() : res.text().then(t => { throw t; }))
    .then(data => console.log('Server data pushed:', data))
    .catch(err  => console.error('Error pushing data:', err));
}

// UI Setup Functions
/**
 * Closes all active popups and the overlay. This is our central cleanup function.
 */
function closeAllPopups() {
  // Close side menu if it's open
  if (sideMenu.style.left === '0px') {
    menuIcon.classList.remove('open');
    sideMenu.style.left = '-370px';
    sideMenuFocusTrap.deactivate();
  }

  // Close user info popup if it's open
  if (popup.style.right === '0px') {
    popup.style.right = '-350px';
    popupFocusTrap.deactivate();
  }
  
  // Hide the overlay
  overlay.style.display = 'none';
}

// NEW openPopup function
function openPopup() {
  // Close any other popups first
  closeAllPopups();
  
  document.getElementById('popup-content').innerHTML = buildPopupContent();
  popup.style.right = '0';
  overlay.style.display = 'block';
  popupFocusTrap.activate();
}

// NEW closePopup function
function closePopup() {
  closeAllPopups();
}

// NEW setupMenuIcon function
function setupMenuIcon() {
  menuIcon.addEventListener('click', function() {
    const isCurrentlyOpen = this.classList.contains('open');
    
    // Always close everything first to reset the state
    closeAllPopups();
    
    // If it was closed, now we open it
    if (!isCurrentlyOpen) {
      this.classList.add('open');
      sideMenu.style.left = '0px';
      overlay.style.display = 'block';
      sideMenuFocusTrap.activate();
    }
  });
}

function setupInstructionsButton() {
  instructionsButton.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('instructionsClicked', 'true');
    updateButtonStyle(this);
    setTimeout(() => window.location.href = 'instructions.html', 300);
  });
}

function updateButtonStyle(button) {
  button.classList.remove('pulse');
  button.style.backgroundColor = 'grey';
  button.style.color = 'white';
}

function setupNameIcon() {
  const storedName = localStorage.getItem('name') || 'User';
  const nameIcon = document.createElement('div');
  nameIcon.className = 'name-icon';
  nameIcon.textContent = storedName.charAt(0).toUpperCase();
  const header = document.querySelector('.chatbot-header');
  if (header) header.appendChild(nameIcon);
  nameIcon.addEventListener('click', togglePopup);
  if (popupClose) popupClose.addEventListener('click', closePopup);
}

function togglePopup() { popup.style.right === '0px' ? closePopup() : openPopup(); }

function buildPopupContent() {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  if (!window.translations || !window.translations[lang]) return '';
  const t = window.translations[lang];
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
  const experienceKeyMap = { 'Student / refresher': 'experienceStudentRefresher', 'Confident core knowledge': 'experienceConfidentCore', 'Expert': 'experienceExpert' };
  const experience = t[experienceKeyMap[experienceValue]] || experienceValue;
  const now = new Date();
  const currDT = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  return `<h2>${t.userInfoTitle || 'User Information'}</h2><p><strong>${t.userName || 'Name'}:</strong> ${name}</p><p><strong>${t.userContact || 'Contact'}:</strong> ${contactInfo}</p><p><strong>${t.userAimsPopupLabel || 'Aims'}:</strong> ${role}${roleClass ? ', ' + roleClass : ''}</p> <p><strong>${t.userExperiencePopupLabel || 'Experience'}:</strong> ${experience}</p><p id="latLongSection" style="color: grey;"><strong>${t.userLatLong || 'Lat/Long'}:</strong> ${latitude}, ${longitude}</p><p id="areaSection" style="color: grey;"><strong>${t.userArea || 'Area'}:</strong> ${area}</p><p id="countrySection" style="color: grey;"><strong>${t.userCountry || 'Country'}:</strong> ${country}, ${iso2}, ${classification}</p><p style="color: grey;"><em><strong>${t.userVersion || 'Version'}:</strong> 1.0</em></p><p style="color: grey;"><em><strong>${t.userDateTime || 'Date/Time'}:</strong> ${currDT}</em></p>`;
}

function setupGeoInfoButton() {
  const geoInfoButton = document.getElementById('geo-info-button');
  const geoInfoPopup = document.getElementById('geo-info-popup');
  if (geoInfoButton && geoInfoPopup) {
    geoInfoButton.addEventListener('click', (event) => {
      event.stopPropagation();
      geoInfoPopup.style.display = (geoInfoPopup.style.display === 'none' || geoInfoPopup.style.display === '') ? 'block' : 'none';
    });
    document.addEventListener('click', (event) => {
      if (geoInfoPopup.style.display === 'block' && !geoInfoPopup.contains(event.target) && event.target !== geoInfoButton) {
        geoInfoPopup.style.display = 'none';
      }
    });
  }
}

function setupGeolocationButton() {
  const geolocationButton = document.getElementById('geolocation-button');
  const locationInfo = document.getElementById('location-info');
  if (!geolocationButton) return;
  geolocationButton.addEventListener('click', () => {
    geolocationButton.style.backgroundColor = 'blue';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);
          locationInfo.innerText = `Updated location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          locationInfo.style.display = 'block';
          const areaName = await fetchAreaFromLatLong(latitude, longitude);
          localStorage.setItem('area', areaName);
          document.getElementById('popup-content').innerHTML = buildPopupContent();
          flashBlueOnUpdate();
          pushLocalStorageToServer();
          setTimeout(() => { geolocationButton.style.backgroundColor = 'grey'; locationInfo.style.display = 'none'; }, 3000);
        },
        (error) => {
          const errorMessages = { [error.PERMISSION_DENIED]: 'User denied geolocation.', [error.POSITION_UNAVAILABLE]: 'Location info unavailable.', [error.TIMEOUT]: 'Request timed out.' };
          locationInfo.innerText = errorMessages[error.code] || 'An unknown error occurred.';
          locationInfo.style.display = 'block';
          setTimeout(() => { geolocationButton.style.backgroundColor = 'grey'; locationInfo.style.display = 'none'; }, 3000);
        }
      );
    } else {
      locationInfo.innerText = 'Geolocation not supported.';
      locationInfo.style.display = 'block';
      setTimeout(() => { geolocationButton.style.backgroundColor = 'grey'; locationInfo.style.display = 'none'; }, 3000);
    }
  });
}

async function fetchAreaFromLatLong(lat, lng) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.city || data.locality || data.principalSubdivision || 'Unknown';
  } catch (err) { return 'Unknown'; }
}

function flashBlueOnUpdate() {
  ['latLongSection', 'areaSection', 'countrySection'].forEach(id => {
    const el = document.getElementById(id);
    if(el) { el.classList.add('flash-blue'); setTimeout(() => el.classList.remove('flash-blue'), 2000); }
  });
}

function setupLanguageControls() {
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.style.display = (languageDropdown.style.display === 'none') ? 'block' : 'none';
    });
    document.addEventListener('click', () => languageDropdown.style.display = 'none');
    languageDropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const chosenLang = item.getAttribute('data-value');
        localStorage.setItem('preferredLanguage', chosenLang);
        updateAllLanguage(chosenLang); 
        languageDropdown.style.display = 'none';
      });
    });
}

function setupChatbotInteraction() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const boxesFrame = document.getElementById('boxesFrame');
    if (chatbotContainer && boxesFrame) {
        chatbotContainer.addEventListener('click', () => { boxesFrame.style.display = 'none'; });
    }
    const chatbotTitle = document.querySelector('.chatbot-title');
    if (chatbotTitle) {
        chatbotTitle.classList.remove('flip-horizontally');
        void chatbotTitle.offsetWidth; 
        chatbotTitle.classList.add('flip-horizontally');
    }
}

/* clear-history bin button */
document.getElementById('clearHistoryBtn')
        ?.addEventListener('click', () => {
  if (!confirm('Delete all saved chat sessions?')) return;

  /* wipe localStorage entry and DOM */
  localStorage.removeItem('alan-chat-history-v2');
  const side = document.getElementById('chatHistorySidebar');
  if (side) side.innerHTML = '';

  /* reset in-memory objects used by listener-module */
  import('./listener-module.js').then(mod => {
    if (typeof mod.resetSidebarHistory === 'function') mod.resetSidebarHistory();
  });
});


// Event Listeners
window.addEventListener('pageshow', (event) => {
  sideMenu.style.left = '-370px';
  menuIcon.classList.remove('open');
  pushLocalStorageToServer();
  if (event.persisted) { fetchMutedSnippet(); }
  if (event.persisted) { window.location.reload(); }
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) pushLocalStorageToServer();
});

// Initialize
document.addEventListener('DOMContentLoaded', main);

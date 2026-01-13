// public/scripts/home-translator.js
// Manages UI text updates based on language changes for the home page.

import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the home page.
 * This function is called initially and whenever the language is changed.
 */
function applyHomeTranslations() {
  // log.info('home-translator.js: Applying translations.');
  const elementTranslations = {
    '.chatbot-subtitle': 'eyesEars',
    '#install-btn': 'installButton',
    '#good-history': 'goodHistory',
    '#examine-well': 'examineWell',
    '#use-arclight': 'useArclight',
    '#instructions-button': 'instructionsButton',
    '#eye-button': 'eyeButton',
    '#ear-button': 'earButton',
    '#skin-button': 'skinButton',
    '#videos-button': 'videosButton',
    '#atoms-button': 'atomsButton',
    '#tools-button': 'toolsButton',
    '#geolocation-button': 'geolocationButton',
    '#arclight-project-button': 'arclightProjectButton',
    '#links-button': 'linksButton',
    '#about-button': 'aboutButton',
  };
  for (const [selector, key] of Object.entries(elementTranslations)) {
    const el = document.querySelector(selector);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }

  // Footer: append the current month/year (m/yy) automatically.
  // We strip any existing trailing m/yy from the translation string so we can keep
  // translations simple and avoid manual date updates.
  const chatbotVersionEl = document.querySelector('.chatbot-version');
  if (chatbotVersionEl) {
    const translated = getTranslation('alanMistakes', chatbotVersionEl.textContent);
    chatbotVersionEl.textContent = `${stripTrailingMonthYear(translated)} ${getCurrentMonthYear()}`;
  }

  const instructionsBtn = document.getElementById('instructions-button');
  if (instructionsBtn) {
    instructionsBtn.textContent = getTranslation('instructionsButton', 'How to use');
  }

  const geoInfoTextEl = document.getElementById('geoInfoText');
  if (geoInfoTextEl) {
    // Translation key is geoInfoText (matches en.json and other language files).
    geoInfoTextEl.textContent = getTranslation(
      'geoInfoText',
      'Clicking "Geolocation" will share a more accurate location (lat/long). This helps offer better guidance and choices.'
    );
  }
  showGreeting(); // This will now use getTranslation internally

  const mutedButtonTranslations = {
    '#images .text-part': 'images',
    '#help .text-part': 'help',
    '#screenshot .text-part': 'screenshot',
    '#refer .text-part': 'refer',
  };
  for (const [selector, key] of Object.entries(mutedButtonTranslations)) {
    const el = document.querySelector(selector);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }

  const referPopupEl = document.getElementById('refer-popup');
  if (referPopupEl) {
    referPopupEl.textContent = getTranslation('comingSoon', 'Coming Soon...');
  }

  const marqueeLines = [
    'eyeMarqueeLine1',
    'eyeMarqueeLine2',
    'eyeMarqueeLine3',
    'eyeMarqueeLine4',
    'eyeMarqueeLine5',
    'eyeMarqueeLine6',
    'eyeMarqueeLine7',
    'earMarqueeLine1',
    'earMarqueeLine2',
    'earMarqueeLine3',
    'earMarqueeLine4',
    'earMarqueeLine5',
    'earMarqueeLine6',
    'earMarqueeLine7',
  ];
  marqueeLines.forEach((lineKey) => {
    const elA = document.getElementById(`${lineKey}a`);
    if (elA) elA.textContent = getTranslation(lineKey, elA.textContent);
    const elB = document.getElementById(`${lineKey}b`);
    if (elB) elB.textContent = getTranslation(lineKey, elB.textContent);
  });
}

function getCurrentMonthYear() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const yy = String(now.getFullYear()).slice(-2);
  return `${month}/${yy}`;
}

function stripTrailingMonthYear(text) {
  // Matches trailing dates like "7/25" or "6/25," or "6/25،" with optional whitespace.
  return String(text)
    .replace(/\s*\d{1,2}\/\d{2}\s*[،,]?\s*$/u, '')
    .trim();
}

/**
 * Displays a personalized greeting message to the user based on the name stored in local storage.
 */
function showGreeting() {
  const name = localStorage.getItem('name');
  const subTextEl = document.getElementById('sub-text');
  if (!subTextEl) return; // Guard clause if element doesn't exist

  const howCanIHelpText = getTranslation('howCanIHelp', 'what can I help with?');
  if (name) {
    let firstName = name.split(' ')[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    subTextEl.innerText = `${firstName}, ${howCanIHelpText}`;
  } else {
    subTextEl.innerText = howCanIHelpText;
  }
}

/**
 * Initializes the translator for the home page.
 * It applies the initial translations and sets up a listener for language changes.
 */
export function initTranslator() {
  // Apply translations immediately on initialization
  applyHomeTranslations();
  // Listen for language changes to re-apply translations
  document.addEventListener('languageChanged', applyHomeTranslations);
}

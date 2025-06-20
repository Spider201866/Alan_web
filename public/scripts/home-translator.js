// public/scripts/home-translator.js
// Manages UI text updates based on language changes for the home page.

import log from './log.js';
import { getTranslation } from './language.js';

function applyHomeTranslations() {
  // log.info('home-translator.js: Applying translations.');
  const elementTranslations = {
    '.chatbot-subtitle': 'eyesEars',
    '#good-history': 'goodHistory',
    '#examine-well': 'examineWell',
    '#use-arclight': 'useArclight',
    '.chatbot-version': 'alanMistakes',
    '#instructions-button': 'instructionsButton',
    '#eye-button': 'eyeButton',
    '#ear-button': 'earButton',
    '#skin-button': 'skinButton',
    '#videos-button': 'videosButton',
    '#atoms-button': 'atomsButton',
    '#tools-button': 'toolsButton',
    '#arclight-project-button': 'arclightProjectButton',
    '#links-button': 'linksButton',
    '#about-button': 'aboutButton',
  };
  for (const [selector, key] of Object.entries(elementTranslations)) {
    const el = document.querySelector(selector);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }

  const instructionsBtn = document.getElementById('instructions-button');
  if (instructionsBtn) {
    instructionsBtn.textContent = getTranslation('instructionsButton', 'How to use');
  }

  const geoInfoTextEl = document.getElementById('geoInfoText');
  if (geoInfoTextEl) {
    geoInfoTextEl.textContent = getTranslation(
      'geoInfoPopupText',
      "Location data helps us understand usage and improve Alan. Your IP address provides an approximate country/city on first load. You can optionally provide more precise GPS data using the 'Check Location' button. This data is handled as per our privacy guidelines."
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

export function initTranslator() {
  // Apply translations immediately on initialization
  applyHomeTranslations();
  // Listen for language changes to re-apply translations
  document.addEventListener('languageChanged', applyHomeTranslations);
}

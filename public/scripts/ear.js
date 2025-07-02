import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the 'How to Examine Ear' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  document.getElementById('allAroundEarHeading').textContent = getTranslation(
    'allAroundEarHeading',
    'All around ear'
  );
  document.getElementById('allAroundEarText').innerHTML = getTranslation(
    'allAroundEarText',
    'Default all around ear text.'
  );
  document.getElementById('earCanalHeading').textContent = getTranslation(
    'earCanalHeading',
    'Ear canal'
  );
  document.getElementById('earCanalText').innerHTML = getTranslation(
    'earCanalText',
    'Default ear canal text.'
  );
  document.getElementById('tympanicMembraneHeading').textContent = getTranslation(
    'tympanicMembraneHeading',
    'Tympanic membrane'
  );
  document.getElementById('tympanicMembraneText').innerHTML = getTranslation(
    'tympanicMembraneText',
    'Default tympanic membrane text.'
  );
  // Assuming "additionalText" should be "additionalText_ear" for consistency
  document.getElementById('additionalText').innerHTML = getTranslation(
    'additionalText_ear',
    'Default additional ear text.'
  );
}

// Initialize the page with its title key and its specific translation function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('pageTitle_howToExamineEar', applyPageSpecificTranslations);
    pageHasInitialized = true;
  }
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_READY') {
      runInitPage();
    }
  });

  if (navigator.serviceWorker.controller) {
    runInitPage();
  }
} else {
  runInitPage();
}

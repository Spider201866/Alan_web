// Alan UI - ear.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

/**
 * Applies all necessary translations to the elements on the 'How to Examine Ear' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  setText('allAroundEarHeading', 'allAroundEarHeading', 'All around ear');
  setTrustedHtml(
    document.getElementById('allAroundEarText'),
    getTranslation('allAroundEarText', 'Default all around ear text.')
  );
  setText('earCanalHeading', 'earCanalHeading', 'Ear canal');
  setTrustedHtml(
    document.getElementById('earCanalText'),
    getTranslation('earCanalText', 'Default ear canal text.')
  );
  setText('tympanicMembraneHeading', 'tympanicMembraneHeading', 'Tympanic membrane');
  setTrustedHtml(
    document.getElementById('tympanicMembraneText'),
    getTranslation('tympanicMembraneText', 'Default tympanic membrane text.')
  );
  // Assuming "additionalText" should be "additionalText_ear" for consistency
  setTrustedHtml(
    document.getElementById('additionalText'),
    getTranslation('additionalText_ear', 'Default additional ear text.')
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

// Alan UI - skin.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

/**
 * Applies all necessary translations to the elements on the 'How to Examine Skin' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  setText('generalObservationHeading', 'generalObservationHeading', 'General observation');
  setTrustedHtml(
    document.getElementById('generalObservationText'),
    getTranslation('generalObservationText', 'Default general observation text.')
  );
  setText('uvLightHeading', 'uvLightHeading', 'UV (Wood’s) light');
  setTrustedHtml(
    document.getElementById('uvLightText'),
    getTranslation('uvLightText', 'Default UV light text.')
  );
  setText('dermoscopyHeading', 'dermoscopyHeading', 'Dermoscopy');
  setTrustedHtml(
    document.getElementById('dermoscopyText'),
    getTranslation('dermoscopyText', 'Default dermoscopy text.')
  );
  // Assuming "additionalText" should be "additionalText_skin" for consistency
  setTrustedHtml(
    document.getElementById('additionalText'),
    getTranslation('additionalText_skin', 'Default additional skin text.')
  );
}

// Initialize the page with its title key and its specific translation function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('pageTitle_howToExamineSkin', applyPageSpecificTranslations);
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

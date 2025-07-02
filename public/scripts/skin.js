import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the 'How to Examine Skin' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  document.getElementById('generalObservationHeading').textContent = getTranslation(
    'generalObservationHeading',
    'General observation'
  );
  document.getElementById('generalObservationText').innerHTML = getTranslation(
    'generalObservationText',
    'Default general observation text.'
  );
  document.getElementById('uvLightHeading').textContent = getTranslation(
    'uvLightHeading',
    'UV (Wood’s) light'
  );
  document.getElementById('uvLightText').innerHTML = getTranslation(
    'uvLightText',
    'Default UV light text.'
  );
  document.getElementById('dermoscopyHeading').textContent = getTranslation(
    'dermoscopyHeading',
    'Dermoscopy'
  );
  document.getElementById('dermoscopyText').innerHTML = getTranslation(
    'dermoscopyText',
    'Default dermoscopy text.'
  );
  // Assuming "additionalText" should be "additionalText_skin" for consistency
  document.getElementById('additionalText').innerHTML = getTranslation(
    'additionalText_skin',
    'Default additional skin text.'
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

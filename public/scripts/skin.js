import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

// This is the function that knows how to translate THIS specific page
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
initPage('pageTitle_howToExamineSkin', applyPageSpecificTranslations);

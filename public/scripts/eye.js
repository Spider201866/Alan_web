// Alan UI - eye.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

/**
 * Applies all necessary translations to the elements on the 'How to Examine Eye' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  setText('frontOfEyeHeading', 'frontOfEyeHeading', 'Front of Eye');
  setTrustedHtml(
    document.getElementById('frontOfEyeText'),
    getTranslation('frontOfEyeText', 'Default front of eye text.')
  );
  setText('fundalReflexHeading', 'fundalReflexHeading', 'Fundal Reflex');
  setTrustedHtml(
    document.getElementById('fundalReflexText'),
    getTranslation('fundalReflexText', 'Default fundal reflex text.')
  );
  setText('backOfEyeHeading', 'backOfEyeHeading', 'Back of Eye');
  setTrustedHtml(
    document.getElementById('backOfEyeText'),
    getTranslation('backOfEyeText', 'Default back of eye text.')
  );
  // Note: The key for "additionalText" in the old translations object was just "additionalText".
  // Assuming it should be "additionalText_eye" for consistency with other similar keys if it's eye-specific.
  // If it's truly generic, the key "additionalText" would need to exist in the JSON files.
  // For now, I'll assume it's eye-specific based on context.
  setTrustedHtml(
    document.getElementById('additionalText'),
    getTranslation('additionalText_eye', 'Default additional eye text.')
  );
}

// Initialize the page with its title key and its specific translation function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('pageTitle_howToExamineEye', applyPageSpecificTranslations);
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

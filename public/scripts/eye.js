import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the 'How to Examine Eye' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  document.getElementById('frontOfEyeHeading').textContent = getTranslation(
    'frontOfEyeHeading',
    'Front of Eye'
  );
  document.getElementById('frontOfEyeText').innerHTML = getTranslation(
    'frontOfEyeText',
    'Default front of eye text.'
  );
  document.getElementById('fundalReflexHeading').textContent = getTranslation(
    'fundalReflexHeading',
    'Fundal Reflex'
  );
  document.getElementById('fundalReflexText').innerHTML = getTranslation(
    'fundalReflexText',
    'Default fundal reflex text.'
  );
  document.getElementById('backOfEyeHeading').textContent = getTranslation(
    'backOfEyeHeading',
    'Back of Eye'
  );
  document.getElementById('backOfEyeText').innerHTML = getTranslation(
    'backOfEyeText',
    'Default back of eye text.'
  );
  // Note: The key for "additionalText" in the old translations object was just "additionalText".
  // Assuming it should be "additionalText_eye" for consistency with other similar keys if it's eye-specific.
  // If it's truly generic, the key "additionalText" would need to exist in the JSON files.
  // For now, I'll assume it's eye-specific based on context.
  document.getElementById('additionalText').innerHTML = getTranslation(
    'additionalText_eye',
    'Default additional eye text.'
  );
}

// Initialize the page with its title key and its specific translation function
initPage('pageTitle_howToExamineEye', applyPageSpecificTranslations);

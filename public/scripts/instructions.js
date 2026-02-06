// Alan UI - instructions.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

/**
 * Applies initial translations to the page and then calls toggleContent to set the
 * dynamic content based on the default selected radio button.
 */
function applyTranslationsAndToggle() {
  // Page title is handled by initPage using getTranslation('instructionsPageTitle')
  setText('introText', 'instructionsIntro', 'Default intro text.');
  setText('patientPrompt', 'instructionsPatientPrompt', "Tell Alan about your patient's:");
  setText('patientDetail1', 'instructionsPatientDetail1', 'problem & onset');
  setText('patientDetail2', 'instructionsPatientDetail2', 'what you see');
  setText('patientDetail4', 'instructionsPatientDetail4', 'age, sex, medication');

  toggleContent(); // Initial call to set content based on default checked radio
}

/**
 * Toggles the displayed content based on the selected radio button (Eye, Ear, or Skin).
 * It updates the text and background color to match the selected option.
 */
function toggleContent() {
  var option = document.querySelector('input[name="option"]:checked').value;

  setText('labelTooLittle', 'instructionsLabelTooLittle', 'Too little');
  setText('labelJustRight', 'instructionsLabelJustRight', 'Just right');
  setText('labelTooMuch', 'instructionsLabelTooMuch', 'Too much');

  let patientDetail3TextKey = 'instructionsPatientDetail3'; // Default for Eye
  let useArclightKey = 'instructionsUseArclight_eye';
  let tooLittleKey = 'instructionsTooLittle_eye';
  let justRightKey = 'instructionsJustRight_eye';
  let tooMuchKey = 'instructionsTooMuch_eye';
  let additionalQueryKey = 'instructionsAdditionalQuery_eye';
  let backgroundColorKey = 'instructionsBackground_eye';

  if (option === 'eye') {
    // Keys are already set to eye defaults
  } else if (option === 'ear') {
    patientDetail3TextKey = 'instructionsPatientDetail3_ear_specific';
    useArclightKey = 'instructionsUseArclight_ear';
    tooLittleKey = 'instructionsTooLittle_ear';
    justRightKey = 'instructionsJustRight_ear';
    tooMuchKey = 'instructionsTooMuch_ear';
    additionalQueryKey = 'instructionsAdditionalQuery_ear';
    backgroundColorKey = 'instructionsBackground_ear';
  } else if (option === 'skin') {
    patientDetail3TextKey = 'instructionsPatientDetail3_skin_specific';
    useArclightKey = 'instructionsUseArclight_skin';
    tooLittleKey = 'instructionsTooLittle_skin';
    justRightKey = 'instructionsJustRight_skin';
    tooMuchKey = 'instructionsTooMuch_skin';
    additionalQueryKey = 'instructionsAdditionalQuery_skin';
    backgroundColorKey = 'instructionsBackground_skin';
  }

  document.getElementById('content').style.backgroundColor = getTranslation(
    backgroundColorKey,
    '#ffffff'
  ); // Default to white

  // NOTE: Some translation strings include markup (e.g. <strong>, <em>). Keep innerHTML
  // for these specific fields, but they are NOT user-controlled.
  setTrustedHtml(
    document.getElementById('useArclight'),
    getTranslation(useArclightKey, 'Use Arclight.')
  );
  setTrustedHtml(
    document.getElementById('additionalQuery'),
    getTranslation(additionalQueryKey, 'Default additional query.')
  );

  setText('tooLittle', tooLittleKey, 'Default too little example.');
  setText('justRight', justRightKey, 'Default just right example.');
  setText('tooMuch', tooMuchKey, 'Default too much example.');

  setText('patientDetail3', patientDetail3TextKey, 'vision & pupils');
}

document.querySelectorAll('input[name="option"]').forEach(function (radio) {
  radio.addEventListener('change', toggleContent);
});

// Initialize the page with its title key and its specific translation/toggle function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('instructionsPageTitle', applyTranslationsAndToggle);
    pageHasInitialized = true;
  }
};

runInitPage();

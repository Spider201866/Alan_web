import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies initial translations to the page and then calls toggleContent to set the
 * dynamic content based on the default selected radio button.
 */
function applyTranslationsAndToggle() {
  // Page title is handled by initPage using getTranslation('instructionsPageTitle')
  document.getElementById('introText').innerHTML = getTranslation(
    'instructionsIntro',
    'Default intro text.'
  );
  document.getElementById('patientPrompt').textContent = getTranslation(
    'instructionsPatientPrompt',
    "Tell Alan about your patient's:"
  );

  document.getElementById('patientDetail1').innerHTML =
    `<span class="listText">${getTranslation('instructionsPatientDetail1', 'problem & onset')}</span>`;
  document.getElementById('patientDetail2').innerHTML =
    `<span class="listText">${getTranslation('instructionsPatientDetail2', 'what you see')}</span>`;
  document.getElementById('patientDetail4').innerHTML =
    `<span class="listText">${getTranslation('instructionsPatientDetail4', 'age, sex, medication')}</span>`;

  toggleContent(); // Initial call to set content based on default checked radio
}

/**
 * Toggles the displayed content based on the selected radio button (Eye, Ear, or Skin).
 * It updates the text and background color to match the selected option.
 */
function toggleContent() {
  var option = document.querySelector('input[name="option"]:checked').value;

  document.getElementById('labelTooLittle').textContent = getTranslation(
    'instructionsLabelTooLittle',
    'Too little'
  );
  document.getElementById('labelJustRight').textContent = getTranslation(
    'instructionsLabelJustRight',
    'Just right'
  );
  document.getElementById('labelTooMuch').textContent = getTranslation(
    'instructionsLabelTooMuch',
    'Too much'
  );

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
  document.getElementById('useArclight').innerHTML = getTranslation(
    useArclightKey,
    'Use Arclight.'
  );
  document.getElementById('tooLittle').textContent = getTranslation(
    tooLittleKey,
    'Default too little example.'
  );
  document.getElementById('justRight').textContent = getTranslation(
    justRightKey,
    'Default just right example.'
  );
  document.getElementById('tooMuch').textContent = getTranslation(
    tooMuchKey,
    'Default too much example.'
  );
  document.getElementById('additionalQuery').innerHTML = getTranslation(
    additionalQueryKey,
    'Default additional query.'
  );

  document.getElementById('patientDetail3').innerHTML =
    `<span class="listText">${getTranslation(patientDetail3TextKey, 'vision & pupils')}</span>`;
}

document.querySelectorAll('input[name="option"]').forEach(function (radio) {
  radio.addEventListener('change', toggleContent);
});

// Initialize the page with its title key and its specific translation/toggle function
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_READY') {
      initPage('instructionsPageTitle', applyTranslationsAndToggle);
    }
  });

  if (navigator.serviceWorker.controller) {
    initPage('instructionsPageTitle', applyTranslationsAndToggle);
  }
} else {
  initPage('instructionsPageTitle', applyTranslationsAndToggle);
}

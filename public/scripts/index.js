// Alan UI - index.js | 20th June 2025, WJW (Refactored for new language system)
import { setLanguage, getTranslation } from './language.js'; // Assuming language.js auto-initializes and dispatches 'languageChanged'

/*********************************************/
/*           SETUP & INITIALIZATION          */
/*********************************************/

// DOM Element References
const passwordScreen = document.getElementById('passwordScreen');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmitBtn = document.getElementById('passwordSubmitBtn');
const passwordError = document.getElementById('passwordError');
const splashScreenRef = document.querySelector('.splash-screen');
const instructionRef = document.querySelector('.instruction-screen');
const blackScreen = document.getElementById('blackScreen');
const nameInput = document.getElementById('nameInput');
const jobSelectElement = document.getElementById('job-role-select');
const checkboxesContainer = jobSelectElement.querySelector('.checkboxes');
const aimsSelectText = document.getElementById('aims-select-text');
const experienceSelect = document.getElementById('experience-select');
const contactInput = document.getElementById('contactInput');
const acceptButton = document.getElementById('acceptButton');

// State
let aimsDropdownExpanded = false;
const classificationLookup = {
  /* Data unchanged */
  HI: [
    'QA',
    'MO',
    'LU',
    'SG',
    'BN',
    'IE',
    'NO',
    'KW',
    'AE',
    'CH',
    'HK',
    'SM',
    'US',
    'SA',
    'NL',
    'IS',
    'BH',
    'SE',
    'DE',
    'AU',
    'TW',
    'DK',
    'AT',
    'CA',
    'BE',
    'OM',
    'FI',
    'GB',
    'FR',
    'JP',
    'MT',
    'KR',
    'NZ',
    'ES',
    'IT',
    'PR',
    'CY',
    'IL',
    'CZ',
  ],
  MI: [
    'GQ',
    'SI',
    'SK',
    'LT',
    'EE',
    'TT',
    'PT',
    'PL',
    'HU',
    'MY',
    'SC',
    'RU',
    'GR',
    'LV',
    'KN',
    'AG',
    'TR',
    'KZ',
    'BS',
    'CL',
    'PA',
    'HR',
    'RO',
    'UY',
    'MU',
    'BG',
    'AR',
    'IR',
    'MX',
    'LB',
    'GA',
    'MV',
    'TM',
    'BY',
    'BW',
    'TH',
    'CN',
    'BR',
    'ZA',
    'IN',
  ],
  LI: [
    'BB',
    'ME',
    'AZ',
    'CR',
    'IQ',
    'DO',
    'PW',
    'MK',
    'RS',
    'DZ',
    'GD',
    'CO',
    'SR',
    'LC',
    'PE',
    'LK',
    'EG',
    'MN',
    'JO',
    'AL',
    'VE',
    'ID',
    'DM',
    'XK',
    'NR',
    'TN',
    'VC',
    'NA',
    'BA',
    'EC',
    'GE',
    'SZ',
    'FJ',
    'LY',
    'PY',
    'JM',
    'AM',
    'SV',
    'BT',
    'UA',
    'MA',
    'BZ',
    'GY',
    'PH',
    'GT',
    'BO',
    'LA',
    'UZ',
    'CV',
    'VN',
    'PK',
  ],
  VLI: [
    'AO',
    'CG',
    'MM',
    'NG',
    'NI',
    'WS',
    'MD',
    'TO',
    'HN',
    'TL',
    'GH',
    'SD',
    'BD',
    'MR',
    'KH',
    'ZM',
    'LS',
    'CI',
    'TV',
    'PG',
    'KG',
    'DJ',
    'KE',
    'MH',
    'FM',
    'CM',
    'TZ',
    'ST',
    'TJ',
    'VU',
    'NP',
    'SN',
    'TD',
    'UG',
    'YE',
    'ZW',
    'BJ',
    'ML',
    'SB',
    'ET',
    'RW',
    'GN',
    'KI',
    'AF',
    'BF',
    'HT',
    'GW',
    'SL',
    'GM',
    'SS',
    'TG',
    'KM',
    'MG',
    'ER',
    'MZ',
    'MW',
    'NE',
    'LR',
    'BI',
    'CD',
    'CF',
  ],
};

// Entry Point
document.addEventListener('DOMContentLoaded', main);

function main() {
  showSplashScreenAndThen();
  fetchIPBasedLocation();
  initEventListeners();
  initLanguageControls(); // Sets up listeners for language UI on this page
  // applyIndexTranslations(); // Initial translation application
  // The 'languageChanged' event from language.js's initial load should trigger applyIndexTranslations.
  document.addEventListener('languageChanged', applyIndexTranslations);
}

/*********************************************/
/*         PAGE FLOW & TRANSITIONS           */
/*********************************************/

function showSplashScreenAndThen() {
  splashScreenRef.classList.remove('hidden');
  splashScreenRef.classList.add('visible');
  const logo1 = document.getElementById('logo1');
  const logo2 = document.getElementById('logo2');
  logo1.style.transform = 'scale(0.8)';
  logo2.style.transform = 'rotateX(-90deg)';

  setTimeout(() => {
    logo1.style.transform = 'scale(1)';
    logo2.style.transform = 'rotateX(0deg)';
  }, 100);

  setTimeout(() => {
    splashScreenRef.classList.remove('visible');
    splashScreenRef.classList.add('hidden');
    if (localStorage.getItem('verified') === 'true') {
      instructionRef.classList.remove('hidden');
      instructionRef.classList.add('visible');
    } else {
      passwordScreen.classList.remove('hidden');
      passwordScreen.classList.add('visible');
    }
  }, 4000); // Splash screen duration
}

function handleAccept() {
  const rawName = nameInput.value.trim();
  const checkedAims = Array.from(checkboxesContainer.querySelectorAll('input:checked')).map(
    (cb) => cb.value
  );
  let roleClass = '(P)';
  if (checkedAims.length > 0 && !checkedAims.includes('Veterinary')) {
    roleClass = '(M)';
  }

  // Store data in localStorage
  localStorage.setItem('name', rawName);
  localStorage.setItem('selectedJobRole', checkedAims.join(', '));
  localStorage.setItem('selectedExperience', experienceSelect.value);
  localStorage.setItem('contactInfo', contactInput.value);
  localStorage.setItem('roleClassification', roleClass);
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', `user-${Date.now()}`);
  }

  // Push data to server
  pushDataToServer(rawName, checkedAims, roleClass);

  // Animate out and redirect
  blackScreen.style.visibility = 'visible';
  blackScreen.style.opacity = 1;
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 6250);
}

/*********************************************/
/*          DATA & API INTERACTIONS          */
/*********************************************/

function fetchIPBasedLocation() {
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        localStorage.setItem('latitude', data.latitude || 'Not set');
        localStorage.setItem('longitude', data.longitude || 'Not set');
        localStorage.setItem('country', data.country_name || 'Not set');
        localStorage.setItem('area', data.city || 'Not set');
        const iso2 = (data.country || 'Not set').toUpperCase();
        localStorage.setItem('iso2', iso2);
        storeClassifications(iso2);
      } else {
        // If data is null or empty, display a message to the user
        const locationInfoDiv = document.getElementById('locationInfo');
        if (locationInfoDiv) {
          locationInfoDiv.textContent = 'Could not determine your location.';
          locationInfoDiv.style.display = 'block';
          locationInfoDiv.style.color = 'red';
          locationInfoDiv.style.textAlign = 'center';
          locationInfoDiv.style.marginTop = '10px';
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching IP-based location:', error);
      const locationInfoDiv = document.getElementById('locationInfo');
      if (locationInfoDiv) {
        locationInfoDiv.textContent = 'Could not determine your location due to an error.';
        locationInfoDiv.style.display = 'block';
        locationInfoDiv.style.color = 'red';
        locationInfoDiv.style.textAlign = 'center';
        locationInfoDiv.style.marginTop = '10px';
      }
    });
}

function storeClassifications(iso2) {
  let classification = 'Unknown';
  for (const [key, values] of Object.entries(classificationLookup)) {
    if (values.includes(iso2)) {
      classification = key;
      break;
    }
  }
  localStorage.setItem('classification', classification);
}

function verifyPassword() {
  const enteredPassword = passwordInput.value.trim();
  fetch('/fetch-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: enteredPassword }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Invalid password');
      localStorage.setItem('verified', 'true');
      passwordScreen.classList.add('hidden');
      instructionRef.classList.remove('hidden');
    })
    .catch((error) => {
      console.error('Error verifying password:', error);
      passwordError.style.display = 'block';
      passwordInput.value = '';
      passwordSubmitBtn.disabled = true;
      setTimeout(() => {
        passwordError.style.display = 'none';
      }, 3000);
    });
}

function pushDataToServer(name, aims, roleClass) {
  const userInfo = {
    sessionId: localStorage.getItem('sessionId'),
    name: name,
    role: aims.join(', '),
    experience: experienceSelect.value,
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude'),
    country: localStorage.getItem('country'),
    iso2: localStorage.getItem('iso2'),
    classification: localStorage.getItem('classification'),
    roleClassification: roleClass,
    area: localStorage.getItem('area'),
    contactInfo: contactInput.value,
    version: '1.0',
    dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
  };
  fetch('https://alan.up.railway.app/record-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  })
    .then((resp) => resp.text())
    .then((data) => console.log('Record saved:', data))
    .catch((error) => {
      console.error('Error pushing data to server:', error);
    });
}

/*********************************************/
/*        EVENT LISTENERS & VALIDATION       */
/*********************************************/

function initEventListeners() {
  nameInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z'\- ]/g, '').substring(0, 20);
    checkSelections();
  });

  jobSelectElement.addEventListener('click', (e) => {
    e.stopPropagation();
    checkboxesContainer.style.display = aimsDropdownExpanded ? 'none' : 'block';
    aimsDropdownExpanded = !aimsDropdownExpanded;
  });

  document.addEventListener('click', () => {
    if (aimsDropdownExpanded) {
      checkboxesContainer.style.display = 'none';
      aimsDropdownExpanded = false;
    }
  });

  checkboxesContainer.addEventListener('change', () => {
    const checkedItems = Array.from(checkboxesContainer.querySelectorAll('input:checked'));
    const selectedTexts = checkedItems.map((item) => item.parentElement.textContent.trim());
    aimsSelectText.textContent =
      selectedTexts.length > 0
        ? selectedTexts.join(', ')
        : window.translations?.en?.aimsPlaceholder || 'Aims';
    checkSelections();
  });

  experienceSelect.addEventListener('change', checkSelections);
  contactInput.addEventListener('input', checkSelections);
  acceptButton.addEventListener('click', handleAccept);

  passwordInput.addEventListener('input', () => {
    passwordSubmitBtn.disabled = passwordInput.value.trim() === '';
    passwordError.style.display = 'none';
  });
  passwordSubmitBtn.addEventListener('click', verifyPassword);

  checkSelections(); // Initial check
}

function checkSelections() {
  const anyAimChecked = checkboxesContainer.querySelectorAll('input:checked').length > 0;
  jobSelectElement.classList.toggle('is-active', anyAimChecked);

  const experienceSelected = !!experienceSelect.value;
  experienceSelect.classList.toggle('is-active', experienceSelected);

  const nameEntered = /^[A-Za-z'\- ]{2,20}$/.test(nameInput.value.trim());
  nameInput.classList.toggle('is-active', nameEntered);

  const contactEntered = !!contactInput.value.trim();
  contactInput.classList.toggle('is-active', contactEntered);

  acceptButton.disabled = !(nameEntered && anyAimChecked && experienceSelected && contactEntered);
}

/*********************************************/
/*          LANGUAGE & UI UPDATES            */
/*********************************************/

function initLanguageControls() {
  const indexLangButton = document.getElementById('index-language-button');
  const indexLangDropdown = document.getElementById('index-language-dropdown');
  indexLangButton.addEventListener('click', (e) => {
    e.stopPropagation();
    indexLangDropdown.style.display =
      indexLangDropdown.style.display === 'none' || indexLangDropdown.style.display === ''
        ? 'block'
        : 'none';
  });
  document.addEventListener('click', () => {
    if (indexLangDropdown.style.display === 'block') {
      indexLangDropdown.style.display = 'none';
    }
  });
  indexLangDropdown.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', async () => {
      // Make the event listener async
      const chosenLang = item.getAttribute('data-value');
      localStorage.setItem('preferredLanguage', chosenLang); // Keep this for cross-tab/session persistence
      // updateIndexLanguageDisplays(chosenLang); // Old direct update
      await setLanguage(chosenLang); // New way: triggers 'languageChanged' event
      indexLangDropdown.style.display = 'none';
    });
  });
}

function applyIndexTranslations() {
  console.log('index.js: Applying translations based on current language.');
  // Translate simple text content
  const elementTranslations = {
    'password-title': 'passwordTitle',
    passwordError: 'passwordErrorMsg',
    passwordSubmitBtn: 'passwordSubmitBtn',
    'instruction-text': 'instructionText',
    'good-luck': 'goodLuck',
    acceptButton: 'acceptButton',
    // Splash screen text - assuming the <p> tag inside .splash-screen needs a unique ID or more specific selector
    // For now, let's assume it's the only <p> in .splash-screen or add an ID like 'splashScreenText'
  };
  for (const [id, key] of Object.entries(elementTranslations)) {
    const el = document.getElementById(id);
    if (el) el.textContent = getTranslation(key, el.textContent); // Keep existing text as fallback
  }

  const splashScreenTextElement = splashScreenRef?.querySelector('p');
  if (splashScreenTextElement) {
    splashScreenTextElement.textContent = getTranslation(
      'splashScreenText',
      'Eye, Ear, Skin AI Assistant'
    );
  }

  // Translate placeholders and dynamic text
  const passwordInputEl = document.getElementById('passwordInput');
  if (passwordInputEl)
    passwordInputEl.placeholder = getTranslation('passwordPlaceholder', 'Password');

  const noCodeLineEl = document.getElementById('noCodeLine');
  if (noCodeLineEl)
    noCodeLineEl.innerHTML = getTranslation(
      'noCodeLine',
      "No or incorrect code? Contact us <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>here</a>"
    );

  const nameInputEl = document.getElementById('nameInput');
  if (nameInputEl) nameInputEl.placeholder = getTranslation('namePlaceholder', 'Name');

  const contactInputEl = document.getElementById('contactInput');
  if (contactInputEl)
    contactInputEl.placeholder = getTranslation('contactPlaceholder', 'Contact (email/phone)');

  if (checkboxesContainer.querySelectorAll('input:checked').length === 0) {
    aimsSelectText.textContent = getTranslation('aimsPlaceholder', 'Aims');
  }

  // Translate checkbox labels
  const aimsTranslations = {
    Eyes: 'aimsEyes',
    Ears: 'aimsEars',
    Skin: 'aimsSkin',
    Veterinary: 'aimsVeterinary',
    'Child/Maternal': 'aimsChildMaternal',
  };
  checkboxesContainer.querySelectorAll('label').forEach((label) => {
    const checkbox = label.querySelector('input');
    if (checkbox) {
      const translationKey = aimsTranslations[checkbox.value];
      // Assuming the text node is the second child of the label, after the input
      if (
        label.childNodes &&
        label.childNodes.length > 1 &&
        label.childNodes[1].nodeType === Node.TEXT_NODE
      ) {
        label.childNodes[1].nodeValue = ' ' + getTranslation(translationKey, checkbox.value); // Fallback to value
      }
    }
  });

  // Translate select options
  const experienceSelectDisabledOption = document.querySelector(
    '#experience-select option[disabled]'
  );
  if (experienceSelectDisabledOption)
    experienceSelectDisabledOption.textContent = getTranslation(
      'experiencePlaceholder',
      'Experience'
    );

  const expOptionsMapping = {
    'Student / refresher': 'experienceStudentRefresher',
    'Confident core knowledge': 'experienceConfidentCore', // Note: Key in JSON is 'experienceConfidentCore'
    Expert: 'experienceExpert',
  };
  document.querySelectorAll('#experience-select option:not([disabled])').forEach((option) => {
    const translationKey = expOptionsMapping[option.value];
    if (translationKey) {
      option.textContent = getTranslation(translationKey, option.value); // Fallback to original value
    }
  });
  // Translate language selector text
  const langSelectorText = document.getElementById('language-selector-text');
  if (langSelectorText) {
    langSelectorText.textContent = getTranslation(
      'languageSelectorText',
      '中文, हिन्दी, Español, العربية, Français...'
    );
  }
}

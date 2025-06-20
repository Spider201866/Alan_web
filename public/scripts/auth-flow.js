// public/scripts/auth-flow.js
// Manages the user authentication and onboarding flow.

import log from './log.js';
// DOM element references will be passed to initAuthFlow
let passwordScreenEl, passwordInputEl, passwordSubmitBtnEl, passwordErrorEl;
let splashScreenRefEl, instructionRefEl, blackScreenEl;
let nameInputEl, jobSelectElementEl, experienceSelectEl, contactInputEl, acceptButtonEl; // For handleAccept

function pushDataToServer(name, aims, roleClass, experience, contact) {
  const userInfo = {
    sessionId: localStorage.getItem('sessionId') || `user-${Date.now()}`, // Ensure sessionID exists
    name: name,
    role: aims.join(', '),
    experience: experience,
    latitude: localStorage.getItem('latitude') || 'Not set',
    longitude: localStorage.getItem('longitude') || 'Not set',
    country: localStorage.getItem('country') || 'Not set',
    iso2: localStorage.getItem('iso2') || 'Not set',
    classification: localStorage.getItem('classification') || 'Not set',
    roleClassification: roleClass,
    area: localStorage.getItem('area') || 'Not set',
    contactInfo: contact,
    version: '1.0',
    dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
  };

  return fetch('/api/record-info', {
    // Changed to local API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  })
    .then((resp) => {
      if (!resp.ok) {
        return resp.text().then((text) => {
          throw new Error(text || `Server error: ${resp.status}`);
        });
      }
      return resp.text();
    })
    .then((data) => log.info('Record saved:', data))
    .catch((error) => {
      log.error('Error pushing data to server:', error);
      // Potentially re-throw or handle more gracefully if needed by the caller
    });
}

function verifyPassword() {
  if (
    !passwordInputEl ||
    !passwordSubmitBtnEl ||
    !passwordErrorEl ||
    !passwordScreenEl ||
    !instructionRefEl
  )
    return;

  const enteredPassword = passwordInputEl.value.trim();
  passwordSubmitBtnEl.disabled = true; // Disable button during verification

  fetch('/api/fetch-records', {
    // Added /api prefix
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: enteredPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        // Use response.text() to get more detailed error message if available
        return response.text().then((text) => {
          throw new Error(text || 'Invalid password');
        });
      }
      return response.json(); // Or response.text() if not expecting JSON
    })
    .then(() => {
      // Assuming success if no error was thrown
      localStorage.setItem('verified', 'true');
      passwordScreenEl.classList.add('hidden');
      passwordScreenEl.classList.remove('visible');
      instructionRefEl.classList.remove('hidden');
      instructionRefEl.classList.add('visible');
    })
    .catch((error) => {
      log.error('Error verifying password:', error.message);
      passwordErrorEl.textContent = error.message.includes('password')
        ? getTranslation('passwordErrorMsg', 'Incorrect password. Please try again.')
        : getTranslation('serverErrorMsg', 'Server error. Please try again later.');
      passwordErrorEl.style.display = 'block';
      passwordInputEl.value = '';
      // Re-enable submit button on error, but it will be disabled by input listener if field is empty
      passwordSubmitBtnEl.disabled = passwordInputEl.value.trim() === '';
      setTimeout(() => {
        passwordErrorEl.style.display = 'none';
      }, 3000);
    });
}

function handleAccept() {
  if (
    !nameInputEl ||
    !jobSelectElementEl ||
    !experienceSelectEl ||
    !contactInputEl ||
    !blackScreenEl
  ) {
    log.error('Missing DOM elements for handleAccept');
    return;
  }
  const checkboxesContainer = jobSelectElementEl.querySelector('.checkboxes');
  if (!checkboxesContainer) {
    log.error('Missing checkboxes container within jobSelectElementEl');
    return;
  }

  const rawName = nameInputEl.value.trim();
  const checkedAims = Array.from(checkboxesContainer.querySelectorAll('input:checked')).map(
    (cb) => cb.value
  );
  let roleClass = '(P)'; // Default to Paramedic/Professional
  if (checkedAims.length > 0 && !checkedAims.includes('Veterinary')) {
    roleClass = '(M)'; // Medical if not Veterinary
  }

  localStorage.setItem('name', rawName);
  localStorage.setItem('selectedJobRole', checkedAims.join(', '));
  localStorage.setItem('selectedExperience', experienceSelectEl.value);
  localStorage.setItem('contactInfo', contactInputEl.value);
  localStorage.setItem('roleClassification', roleClass);
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', `user-${Date.now()}`);
  }

  pushDataToServer(rawName, checkedAims, roleClass, experienceSelectEl.value, contactInputEl.value);

  if (blackScreenEl) {
    blackScreenEl.style.visibility = 'visible';
    blackScreenEl.style.opacity = 1;
  }
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 6250); // Duration for black screen fade and transition
}

function showSplashScreenAndThen() {
  if (!splashScreenRefEl || !instructionRefEl || !passwordScreenEl) return;

  splashScreenRefEl.classList.remove('hidden');
  splashScreenRefEl.classList.add('visible');
  const logo1 = document.getElementById('logo1'); // These are specific IDs, query directly
  const logo2 = document.getElementById('logo2');

  if (logo1) logo1.style.transform = 'scale(0.8)';
  if (logo2) logo2.style.transform = 'rotateX(-90deg)';

  setTimeout(() => {
    if (logo1) logo1.style.transform = 'scale(1)';
    if (logo2) logo2.style.transform = 'rotateX(0deg)';
  }, 100); // Short delay for initial animation

  setTimeout(() => {
    splashScreenRefEl.classList.remove('visible');
    splashScreenRefEl.classList.add('hidden');
    if (localStorage.getItem('verified') === 'true') {
      instructionRefEl.classList.remove('hidden');
      instructionRefEl.classList.add('visible');
    } else {
      passwordScreenEl.classList.remove('hidden');
      passwordScreenEl.classList.add('visible');
      if (passwordInputEl) passwordInputEl.focus(); // Focus password input
    }
  }, 4000); // Splash screen duration
}

export function initAuthFlow(elements) {
  // Store references to DOM elements passed from the orchestrator
  passwordScreenEl = elements.passwordScreen;
  passwordInputEl = elements.passwordInput;
  passwordSubmitBtnEl = elements.passwordSubmitBtn;
  passwordErrorEl = elements.passwordError;
  splashScreenRefEl = elements.splashScreen;
  instructionRefEl = elements.instructionScreen;
  blackScreenEl = elements.blackScreen;

  // Elements needed for handleAccept, passed from orchestrator
  nameInputEl = elements.nameInput;
  jobSelectElementEl = elements.jobSelectElement; // The main container for aims
  experienceSelectEl = elements.experienceSelect;
  contactInputEl = elements.contactInput;
  acceptButtonEl = elements.acceptButton; // Passed for attaching event listener

  // Initial screen display logic
  showSplashScreenAndThen();

  // Event listeners
  if (passwordInputEl && passwordSubmitBtnEl) {
    passwordInputEl.addEventListener('input', () => {
      passwordSubmitBtnEl.disabled = passwordInputEl.value.trim() === '';
      if (passwordErrorEl) passwordErrorEl.style.display = 'none';
    });
  }
  if (passwordSubmitBtnEl) {
    passwordSubmitBtnEl.addEventListener('click', verifyPassword);
  }
  if (acceptButtonEl) {
    // Accept button is part of the onboarding form, but its action is part of auth flow
    acceptButtonEl.addEventListener('click', handleAccept);
  }
}

// Helper for translations, if needed directly within this module (e.g., for passwordErrorEl.textContent)
// This assumes language.js is available and getTranslation works globally or is passed in.
// For simplicity, direct text is used now, but can be refactored.
import { getTranslation } from './language.js';

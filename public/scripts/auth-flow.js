// public/scripts/auth-flow.js
// Manages the user authentication and onboarding flow.

import log from './log.js';
import { getTranslation } from './language.js';

// DOM element references will be passed to initAuthFlow
let passwordScreenEl, passwordInputEl, passwordSubmitBtnEl, passwordErrorEl;
let splashScreenRefEl, instructionRefEl, blackScreenEl;
let nameInputEl, jobSelectElementEl, experienceSelectEl, contactInputEl, acceptButtonEl;

/**
 * Sends user information to the server to be recorded.
 */
function pushDataToServer(name, aims, roleClass, experience, contact) {
  const userInfo = {
    sessionId: localStorage.getItem('sessionId') || `user-${Date.now()}`,
    name: name,
    role: aims.join(', '),
    experience: experience,
    latitude: parseFloat(localStorage.getItem('latitude')) || null,
    longitude: parseFloat(localStorage.getItem('longitude')) || null,
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
    });
}

/**
 * Verifies the entered password with the server.
 */
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
  passwordSubmitBtnEl.disabled = true;

  fetch('/api/fetch-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: enteredPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || 'Invalid password');
        });
      }
      return response.json();
    })
    .then(() => {
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
      passwordErrorEl.focus();
      passwordInputEl.value = '';
      passwordSubmitBtnEl.disabled = true; // Keep it disabled until user types again
      setTimeout(() => {
        passwordErrorEl.style.display = 'none';
      }, 3000);
    });
}

/**
 * Handles the submission of the onboarding form.
 */
function handleAccept() {
  if (!nameInputEl || !jobSelectElementEl || !experienceSelectEl || !blackScreenEl) {
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
  let roleClass = '(P)';
  if (checkedAims.length > 0 && !checkedAims.includes('Veterinary')) {
    roleClass = '(M)';
  }

  localStorage.setItem('name', rawName);
  localStorage.setItem('selectedJobRole', checkedAims.join(', '));
  localStorage.setItem('selectedExperience', experienceSelectEl.value);
  localStorage.setItem('contactInfo', contactInputEl ? contactInputEl.value : '');
  localStorage.setItem('roleClassification', roleClass);
  if (!localStorage.getItem('sessionId')) {
    localStorage.setItem('sessionId', `user-${Date.now()}`);
  }

  pushDataToServer(
    rawName,
    checkedAims,
    roleClass,
    experienceSelectEl.value,
    contactInputEl ? contactInputEl.value : ''
  );

  if (blackScreenEl) {
    blackScreenEl.style.visibility = 'visible';
    blackScreenEl.style.opacity = 1;
  }
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 6250);
}

/**
 * Manages the display of the initial splash screen and then transitions.
 */
function showSplashScreenAndThen() {
  if (!splashScreenRefEl || !instructionRefEl || !passwordScreenEl) return;

  splashScreenRefEl.classList.remove('hidden');
  splashScreenRefEl.classList.add('visible');
  const logo1 = document.getElementById('logo1');
  const logo2 = document.getElementById('logo2');

  if (logo1) logo1.style.transform = 'scale(0.8)';
  if (logo2) logo2.style.transform = 'rotateX(-90deg)';

  setTimeout(() => {
    if (logo1) logo1.style.transform = 'scale(1)';
    if (logo2) logo2.style.transform = 'rotateX(0deg)';
  }, 100);

  setTimeout(() => {
    splashScreenRefEl.classList.remove('visible');
    splashScreenRefEl.classList.add('hidden');
    if (localStorage.getItem('verified') === 'true') {
      instructionRefEl.classList.remove('hidden');
      instructionRefEl.classList.add('visible');
    } else {
      passwordScreenEl.classList.remove('hidden');
      passwordScreenEl.classList.add('visible');
      if (passwordInputEl) passwordInputEl.focus();
    }
  }, 4000);
}

/**
 * Initializes the entire authentication and onboarding flow.
 */
export function initAuthFlow(elements) {
  // Store references to DOM elements
  passwordScreenEl = elements.passwordScreen;
  passwordInputEl = elements.passwordInput;
  passwordSubmitBtnEl = elements.passwordSubmitBtn;
  passwordErrorEl = elements.passwordError;
  splashScreenRefEl = elements.splashScreen;
  instructionRefEl = elements.instructionScreen;
  blackScreenEl = elements.blackScreen;
  nameInputEl = elements.nameInput;
  jobSelectElementEl = elements.jobSelectElement;
  experienceSelectEl = elements.experienceSelect;
  contactInputEl = elements.contactInput;
  acceptButtonEl = elements.acceptButton;

  // Initial screen display logic
  showSplashScreenAndThen();

  // --- THIS IS THE FIX ---
  // Get the form element and listen for its 'submit' event.
  // This handles both button clicks and pressing Enter.
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop the page from reloading
      verifyPassword(); // Call the password verification logic
    });
  }
  // --- END OF FIX ---

  // Add listener to enable/disable submit button based on input
  if (passwordInputEl && passwordSubmitBtnEl) {
    passwordInputEl.addEventListener('input', () => {
      passwordSubmitBtnEl.disabled = passwordInputEl.value.trim() === '';
      if (passwordErrorEl) passwordErrorEl.style.display = 'none';
    });
  }

  // Add listener for the 'Accept' button on the next screen
  if (acceptButtonEl) {
    acceptButtonEl.addEventListener('click', handleAccept);
  }
}

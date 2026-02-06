// Alan UI - index.js | 14th January 2026, WJW
// public/scripts/index.js (New Orchestrator Version)
// Orchestrates location, auth, form, and language modules for the index page.

import { setLanguage, getTranslation } from './language.js';
import { initializeLocation } from './location-service.js';
import { initAuthFlow } from './auth-flow.js';
import { initOnboardingForm } from './onboarding-form.js';
import { getLanguageSelectorPreview, renderLanguageOptions } from './language-options.js';
import { setTrustedHtml } from './trusted-html.js';

// --- DOM Element References (Queried once in main) ---
let passwordScreen, passwordInput, passwordSubmitBtn, passwordError;
let splashScreen, instructionScreen, blackScreen;
let nameInput, jobSelectElement, experienceSelect, experienceSelectUi, contactInput, acceptButton;
let indexLangButton, indexLangDropdown, aimsSelectText, checkboxesContainer; // For language and form specifics

document.addEventListener('DOMContentLoaded', main);

/**
 * The main entry point for the index page, executed when the DOM is fully loaded.
 * It queries all necessary DOM elements and orchestrates the initialization of various modules.
 */
function main() {
  // --- Query all necessary DOM Elements ---
  passwordScreen = document.getElementById('passwordScreen');
  passwordInput = document.getElementById('passwordInput');
  passwordSubmitBtn = document.getElementById('passwordSubmitBtn');
  passwordError = document.getElementById('passwordError');
  splashScreen = document.querySelector('.splash-screen');
  instructionScreen = document.querySelector('.instruction-screen');
  blackScreen = document.getElementById('blackScreen');
  if (blackScreen) {
    // Defensive reset: prevents stale cached CSS from showing the transition overlay on initial load.
    blackScreen.style.visibility = 'hidden';
    blackScreen.style.opacity = '0';
  }
  nameInput = document.getElementById('nameInput');
  jobSelectElement = document.getElementById('job-role-select'); // The container for aims dropdown
  if (jobSelectElement) {
    // Query internal parts if jobSelectElement exists
    checkboxesContainer = jobSelectElement.querySelector('.checkboxes');
    aimsSelectText = jobSelectElement.querySelector('#aims-select-text');
  }
  experienceSelect = document.getElementById('experience-select');
  experienceSelectUi = document.getElementById('experience-select-ui');
  contactInput = document.getElementById('contactInput');
  acceptButton = document.getElementById('acceptButton');
  indexLangButton = document.getElementById('index-language-button');
  indexLangDropdown = document.getElementById('index-language-dropdown');
  const langSelectorText = document.getElementById('language-selector-text');
  const passwordForm = document.getElementById('passwordForm');

  // Add event listeners to replace inline handlers
  if (langSelectorText) {
    langSelectorText.addEventListener('click', () => {
      indexLangButton.click();
    });
  }
  if (passwordForm) {
    passwordForm.addEventListener('submit', (event) => {
      event.preventDefault();
      passwordSubmitBtn.click();
    });
  }

  // 1. Start fetching location data in the background.
  initializeLocation();

  // 2. Set up the user authentication and page flow logic.
  initAuthFlow({
    passwordScreen,
    passwordInput,
    passwordSubmitBtn,
    passwordError,
    splashScreen,
    instructionScreen,
    blackScreen,
    nameInput,
    jobSelectElement,
    experienceSelect,
    contactInput,
    acceptButton, // Pass all form els needed by handleAccept
  });

  // 3. Set up the onboarding form validation and interaction logic.
  initOnboardingForm({
    nameInput,
    jobSelectElement,
    experienceSelect,
    experienceSelectUi,
    contactInput,
    acceptButton,
  });

  // 4. Initialize language controls and translation updates for this page.
  initLanguageControls();
  document.addEventListener('languageChanged', applyIndexTranslations);
  // Initial call to apply translations if language is already set (e.g. from localStorage by language.js)
  if (window.currentTranslations) {
    // Check if translations are loaded
    applyIndexTranslations();
  }
}

/**
 * Initializes the language selection controls, including the dropdown menu and its event listeners.
 */
function initLanguageControls() {
  if (!indexLangButton || !indexLangDropdown) return;
  const languageList = indexLangDropdown.querySelector('ul');
  renderLanguageOptions(languageList, { addRoleOption: true });

  indexLangButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = indexLangButton.getAttribute('aria-expanded') === 'true';
    indexLangDropdown.style.display = isExpanded ? 'none' : 'block';
    indexLangButton.setAttribute('aria-expanded', !isExpanded);
  });
  document.addEventListener('click', () => {
    // Close dropdown on click outside
    if (indexLangDropdown.style.display === 'block') {
      indexLangDropdown.style.display = 'none';
      indexLangButton.setAttribute('aria-expanded', 'false');
    }
  });
  indexLangDropdown.querySelectorAll('li').forEach((item) => {
    item.setAttribute('tabindex', '0'); // Make it focusable
    item.addEventListener('click', async () => {
      selectLanguage(item);
    });
    item.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLanguage(item);
      }
    });
  });

  async function selectLanguage(item) {
    const chosenLang = item.getAttribute('data-value');
    localStorage.setItem('preferredLanguage', chosenLang);
    await setLanguage(chosenLang); // Triggers 'languageChanged' event
    indexLangDropdown.style.display = 'none';
    indexLangButton.setAttribute('aria-expanded', 'false');
    indexLangButton.focus(); // Return focus to the button
  }
}

/**
 * Applies all necessary translations to the elements on the index page.
 * This function is called initially and whenever the language is changed.
 */
function applyIndexTranslations() {
  // console.log('index.js orchestrator: Applying translations.');
  const elementTranslations = {
    'password-title': 'passwordTitle',
    passwordError: 'passwordErrorMsg', // ID of password error message display
    passwordSubmitBtn: 'passwordSubmitBtn',
    'instruction-text': 'instructionText',
    'good-luck': 'goodLuck',
    acceptButton: 'acceptButton',
  };
  for (const [id, key] of Object.entries(elementTranslations)) {
    const el = document.getElementById(id);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }

  const splashScreenTextElement = splashScreen?.querySelector('p');
  if (splashScreenTextElement) {
    splashScreenTextElement.textContent = getTranslation('splashScreenText', 'Eye, Ear, Skin AI');
  }

  if (passwordInput) passwordInput.placeholder = getTranslation('passwordPlaceholder', 'Password');

  const noCodeLineEl = document.getElementById('noCodeLine');
  if (noCodeLineEl) {
    setTrustedHtml(
      noCodeLineEl,
      getTranslation(
        'noCodeLine',
        "No or incorrect code? Contact us <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>here</a>"
      )
    );
  }

  if (nameInput) nameInput.placeholder = getTranslation('namePlaceholder', 'Name');
  if (contactInput) {
    contactInput.placeholder = getTranslation('contactPlaceholder', 'Contact (email/phone)');
  }

  // Update aims dropdown placeholder text if no aims are selected
  if (
    aimsSelectText &&
    checkboxesContainer &&
    checkboxesContainer.querySelectorAll('input:checked').length === 0
  ) {
    aimsSelectText.textContent = getTranslation('aimsPlaceholder', 'Interests');
  }

  // Translate checkbox labels within job-role-select
  const aimsTranslations = {
    Eyes: 'aimsEyes',
    Ears: 'aimsEars',
    Skin: 'aimsSkin',
    Veterinary: 'aimsVeterinary',
    'Child/Maternal': 'aimsChildMaternal',
  };
  if (checkboxesContainer) {
    checkboxesContainer.querySelectorAll('label').forEach((label) => {
      const checkbox = label.querySelector('input');
      if (checkbox && checkbox.value) {
        const translationKey = aimsTranslations[checkbox.value];
        const textNode = Array.from(label.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
        );
        if (textNode && translationKey) {
          textNode.nodeValue = ' ' + getTranslation(translationKey, checkbox.value);
        }
      }
    });
  }

  // Translate experience select options
  const experienceSelectDisabledOption = experienceSelect?.querySelector('option[disabled]');
  if (experienceSelectDisabledOption) {
    experienceSelectDisabledOption.textContent = getTranslation(
      'experiencePlaceholder',
      'Experience'
    );
  }
  const expOptionsMapping = {
    // New canonical values
    Primary: 'experienceStudentRefresher',
    Intermediate: 'experienceConfidentCore',
    Advanced: 'experienceExpert',

    // Backward compat (older localStorage / older records)
    'Student / refresher': 'experienceStudentRefresher',
    'Confident core knowledge': 'experienceConfidentCore',
    Expert: 'experienceExpert',
  };
  experienceSelect?.querySelectorAll('option:not([disabled])').forEach((option) => {
    const translationKey = expOptionsMapping[option.value];
    if (translationKey) {
      option.textContent = getTranslation(translationKey, option.value);
    }
  });

  // Sync the custom Experience dropdown UI (to match Aims styling)
  const experienceSelectTextEl = document.getElementById('experience-select-text');
  const experienceOptionEls = document.querySelectorAll('#experience-options [data-value]');
  if (experienceSelect && (experienceSelectTextEl || experienceOptionEls.length > 0)) {
    const optionTextByValue = {};
    experienceSelect.querySelectorAll('option').forEach((opt) => {
      if (opt.value) optionTextByValue[opt.value] = opt.textContent;
    });

    experienceOptionEls.forEach((labelEl) => {
      const value = labelEl.getAttribute('data-value');
      if (!value) return;
      if (optionTextByValue[value]) {
        labelEl.textContent = optionTextByValue[value];
      }
    });

    if (experienceSelectTextEl) {
      if (experienceSelect.value && optionTextByValue[experienceSelect.value]) {
        experienceSelectTextEl.textContent = optionTextByValue[experienceSelect.value];
      } else {
        experienceSelectTextEl.textContent = getTranslation('experiencePlaceholder', 'Experience');
      }
    }
  }

  const langSelectorText = document.getElementById('language-selector-text');
  if (langSelectorText) {
    langSelectorText.textContent = getTranslation(
      'languageSelectorText',
      getLanguageSelectorPreview()
    );
  }
}

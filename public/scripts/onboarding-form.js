// public/scripts/onboarding-form.js
// Manages the interactive state and validation of the onboarding form fields.

import log from './log.js';
// DOM element references will be passed to initOnboardingForm
let nameInputEl, jobSelectElementEl, experienceSelectEl, contactInputEl, acceptButtonEl;
let checkboxesContainerEl, aimsSelectTextEl; // Specific to jobSelectElementEl interactions

// State for aims dropdown
let aimsDropdownExpanded = false;

function checkSelections() {
  if (
    !nameInputEl ||
    !jobSelectElementEl ||
    !checkboxesContainerEl ||
    !experienceSelectEl ||
    !contactInputEl ||
    !acceptButtonEl
  ) {
    // log.warn("checkSelections: One or more DOM elements are not available.");
    return;
  }

  const anyAimChecked = checkboxesContainerEl.querySelectorAll('input:checked').length > 0;
  jobSelectElementEl.classList.toggle('is-active', anyAimChecked);

  const experienceSelected = !!experienceSelectEl.value; // True if a value is selected (not empty string)
  experienceSelectEl.classList.toggle('is-active', experienceSelected);

  // Name validation: allow letters, apostrophes, hyphens, and spaces, between 2 and 20 chars.
  const nameEntered = /^[A-Za-z'\- ]{2,20}$/.test(nameInputEl.value.trim());
  nameInputEl.classList.toggle('is-active', nameEntered);

  const contactEntered = !!contactInputEl.value.trim(); // True if contact info is not empty
  contactInputEl.classList.toggle('is-active', contactEntered);

  // Enable accept button only if all conditions are met
  acceptButtonEl.disabled = !(nameEntered && anyAimChecked && experienceSelected && contactEntered);
}

export function initOnboardingForm(elements) {
  // Store references to DOM elements
  nameInputEl = elements.nameInput;
  jobSelectElementEl = elements.jobSelectElement; // This is the clickable div for the dropdown
  experienceSelectEl = elements.experienceSelect;
  contactInputEl = elements.contactInput;
  acceptButtonEl = elements.acceptButton; // This is controlled by this module's validation

  // Derived elements within jobSelectElement
  if (jobSelectElementEl) {
    checkboxesContainerEl = jobSelectElementEl.querySelector('.checkboxes');
    aimsSelectTextEl = jobSelectElementEl.querySelector('#aims-select-text'); // Assuming this ID is within jobSelectElement
  }

  if (
    !nameInputEl ||
    !jobSelectElementEl ||
    !checkboxesContainerEl ||
    !aimsSelectTextEl ||
    !experienceSelectEl ||
    !contactInputEl ||
    !acceptButtonEl
  ) {
    log.error(
      'initOnboardingForm: Could not initialize all required DOM elements. Some functionality may be impaired.'
    );
    return; // Prevent further execution if critical elements are missing
  }

  // Event Listeners
  nameInputEl.addEventListener('input', (e) => {
    // Allow letters, apostrophes, hyphens, and spaces. Max 20 chars.
    e.target.value = e.target.value.replace(/[^A-Za-z'\- ]/g, '').substring(0, 20);
    checkSelections();
  });

  jobSelectElementEl.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document listener immediately
    checkboxesContainerEl.style.display = aimsDropdownExpanded ? 'none' : 'block';
    aimsDropdownExpanded = !aimsDropdownExpanded;
  });

  // Global click listener to close aims dropdown if open
  document.addEventListener('click', () => {
    if (aimsDropdownExpanded) {
      checkboxesContainerEl.style.display = 'none';
      aimsDropdownExpanded = false;
    }
  });

  checkboxesContainerEl.addEventListener('change', () => {
    const checkedItems = Array.from(checkboxesContainerEl.querySelectorAll('input:checked'));
    const selectedTexts = checkedItems.map((item) => item.parentElement.textContent.trim());

    // Update the display text for selected aims. Fallback to a placeholder if language/translations not ready.
    // The placeholder text itself should be managed by the main index.js translation logic.
    aimsSelectTextEl.textContent =
      selectedTexts.length > 0
        ? selectedTexts.join(', ')
        : window.getTranslation
          ? getTranslation('aimsPlaceholder', 'Aims')
          : 'Aims';
    checkSelections();
  });

  experienceSelectEl.addEventListener('change', checkSelections);
  contactInputEl.addEventListener('input', checkSelections);
  // The acceptButton's click listener is handled by auth-flow.js as it triggers a page transition.
  // This module only controls its 'disabled' state.

  // Initial validation check on load
  checkSelections();
}

// If getTranslation is needed for aimsSelectTextEl placeholder, ensure it's available.
// This might mean importing it or relying on it being globally available via language.js.
// For now, assuming window.getTranslation might exist or using a hardcoded fallback.
import { getTranslation } from './language.js'; // For the placeholder text

// Alan UI - onboarding-form.js
// public/scripts/onboarding-form.js
// Manages the interactive state and validation of the onboarding form fields.

import log from './log.js';
// DOM element references will be passed to initOnboardingForm
let nameInputEl,
  jobSelectElementEl,
  experienceSelectEl,
  experienceSelectUiEl,
  experienceOptionsEl,
  experienceSelectTextEl,
  contactInputEl,
  acceptButtonEl;
let checkboxesContainerEl, aimsSelectTextEl; // Specific to jobSelectElementEl interactions

// State for aims dropdown
let aimsDropdownExpanded = false;

// Auto-close timers
let aimsAutoCloseTimer = null;
let experienceAutoCloseTimer = null;

// State for experience dropdown (single-select)
let experienceDropdownExpanded = false;

function closeAimsDropdown() {
  if (!checkboxesContainerEl) return;
  checkboxesContainerEl.style.display = 'none';
  aimsDropdownExpanded = false;
  jobSelectElementEl?.setAttribute('aria-expanded', 'false');
}

function scheduleAimsAutoClose(delayMs = 650) {
  if (!aimsDropdownExpanded) return;
  if (aimsAutoCloseTimer) clearTimeout(aimsAutoCloseTimer);
  aimsAutoCloseTimer = setTimeout(() => {
    closeAimsDropdown();
    aimsAutoCloseTimer = null;
  }, delayMs);
}

function closeExperienceDropdown() {
  if (!experienceOptionsEl) return;
  experienceOptionsEl.style.display = 'none';
  experienceDropdownExpanded = false;
  experienceSelectUiEl?.setAttribute('aria-expanded', 'false');
}

function scheduleExperienceAutoClose(delayMs = 350) {
  if (!experienceDropdownExpanded) return;
  if (experienceAutoCloseTimer) clearTimeout(experienceAutoCloseTimer);
  experienceAutoCloseTimer = setTimeout(() => {
    closeExperienceDropdown();
    experienceAutoCloseTimer = null;
  }, delayMs);
}

/**
 * Checks the state of all form inputs and enables or disables the accept button based on validation rules.
 * It also toggles the 'is-active' class on inputs to provide visual feedback.
 */
function checkSelections() {
  if (
    !nameInputEl ||
    !jobSelectElementEl ||
    !checkboxesContainerEl ||
    !experienceSelectEl ||
    !acceptButtonEl
  ) {
    // log.warn("checkSelections: One or more DOM elements are not available.");
    return;
  }

  const anyAimChecked = checkboxesContainerEl.querySelectorAll('input:checked').length > 0;
  jobSelectElementEl.classList.toggle('is-active', anyAimChecked);

  const experienceSelected = !!experienceSelectEl.value; // True if a value is selected (not empty string)
  (experienceSelectUiEl || experienceSelectEl).classList.toggle('is-active', experienceSelected);

  // Name validation: allow letters, apostrophes, hyphens, and spaces, between 2 and 20 chars.
  const nameEntered = /^[A-Za-z'\- ]{2,20}$/.test(nameInputEl.value.trim());
  nameInputEl.classList.toggle('is-active', nameEntered);

  // Contact is optional (field may be removed/commented out in HTML).
  const contactEntered = contactInputEl ? !!contactInputEl.value.trim() : true;
  if (contactInputEl) {
    contactInputEl.classList.toggle('is-active', contactEntered);
  }

  // Enable accept button only if all conditions are met
  acceptButtonEl.disabled = !(nameEntered && anyAimChecked && experienceSelected && contactEntered);
}

function syncExperienceUiFromSelect() {
  if (!experienceSelectUiEl || !experienceSelectEl || !experienceSelectTextEl) return;

  const selectedValue = experienceSelectEl.value;
  experienceOptionsEl?.querySelectorAll('[data-value]').forEach((optionEl) => {
    const value = optionEl.getAttribute('data-value');
    optionEl.setAttribute('aria-selected', value === selectedValue ? 'true' : 'false');
  });

  if (!selectedValue) return;
  const selectedOption = experienceSelectEl.querySelector(`option[value="${selectedValue}"]`);
  if (selectedOption) {
    experienceSelectTextEl.textContent = selectedOption.textContent;
  }
}

/**
 * Initializes the onboarding form by setting up DOM element references and attaching all necessary event listeners.
 * @param {Object} elements - An object containing references to the form's DOM elements.
 */
export function initOnboardingForm(elements) {
  // Store references to DOM elements
  nameInputEl = elements.nameInput;
  jobSelectElementEl = elements.jobSelectElement; // This is the clickable div for the dropdown
  experienceSelectEl = elements.experienceSelect;
  experienceSelectUiEl = elements.experienceSelectUi;
  contactInputEl = elements.contactInput;
  acceptButtonEl = elements.acceptButton; // This is controlled by this module's validation

  // Derived elements within jobSelectElement
  if (jobSelectElementEl) {
    checkboxesContainerEl = jobSelectElementEl.querySelector('.checkboxes');
    aimsSelectTextEl = jobSelectElementEl.querySelector('#aims-select-text'); // Assuming this ID is within jobSelectElement
  }

  // Derived elements within experience select UI
  if (experienceSelectUiEl) {
    experienceOptionsEl = experienceSelectUiEl.querySelector('.checkboxes');
    experienceSelectTextEl = experienceSelectUiEl.querySelector('#experience-select-text');
  }

  if (
    !nameInputEl ||
    !jobSelectElementEl ||
    !checkboxesContainerEl ||
    !aimsSelectTextEl ||
    !experienceSelectEl ||
    !acceptButtonEl
  ) {
    log.error(
      'initOnboardingForm: Could not initialize all required DOM elements. Some functionality may be impaired.'
    );
    return; // Prevent further execution if critical elements are missing
  }

  if (experienceSelectUiEl && (!experienceOptionsEl || !experienceSelectTextEl)) {
    log.error(
      'initOnboardingForm: Experience dropdown UI is present but missing required internal elements.'
    );
    return;
  }

  // Event Listeners
  nameInputEl.addEventListener('input', (e) => {
    // Allow letters, apostrophes, hyphens, and spaces. Max 20 chars.
    e.target.value = e.target.value.replace(/[^A-Za-z'\- ]/g, '').substring(0, 20);
    checkSelections();
  });

  jobSelectElementEl.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document listener immediately
    aimsDropdownExpanded = !aimsDropdownExpanded;
    checkboxesContainerEl.style.display = aimsDropdownExpanded ? 'block' : 'none';
    jobSelectElementEl.setAttribute('aria-expanded', aimsDropdownExpanded);

    // If the user re-opens the dropdown, cancel any pending auto-close.
    if (aimsAutoCloseTimer) {
      clearTimeout(aimsAutoCloseTimer);
      aimsAutoCloseTimer = null;
    }
  });

  // Global click listener to close aims dropdown if open
  document.addEventListener('click', () => {
    if (aimsDropdownExpanded) {
      closeAimsDropdown();
      if (aimsAutoCloseTimer) {
        clearTimeout(aimsAutoCloseTimer);
        aimsAutoCloseTimer = null;
      }
    }

    if (experienceDropdownExpanded && experienceOptionsEl) {
      closeExperienceDropdown();
      if (experienceAutoCloseTimer) {
        clearTimeout(experienceAutoCloseTimer);
        experienceAutoCloseTimer = null;
      }
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
        : getTranslation('aimsPlaceholder', 'Interests');
    checkSelections();

    // Auto-close shortly after the last change to reduce “stuck open” feeling
    // while still allowing quick multi-select.
    scheduleAimsAutoClose();
  });

  experienceSelectEl.addEventListener('change', () => {
    syncExperienceUiFromSelect();
    checkSelections();
  });

  // Experience custom dropdown wiring (single-select)
  if (experienceSelectUiEl && experienceOptionsEl && experienceSelectTextEl) {
    experienceSelectUiEl.addEventListener('click', (e) => {
      e.stopPropagation();
      experienceDropdownExpanded = !experienceDropdownExpanded;
      experienceOptionsEl.style.display = experienceDropdownExpanded ? 'block' : 'none';
      experienceSelectUiEl.setAttribute('aria-expanded', String(experienceDropdownExpanded));

      // Cancel pending auto-close when user interacts.
      if (experienceAutoCloseTimer) {
        clearTimeout(experienceAutoCloseTimer);
        experienceAutoCloseTimer = null;
      }
    });

    experienceSelectUiEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        experienceSelectUiEl.click();
      }
    });

    experienceOptionsEl.querySelectorAll('[data-value]').forEach((optionEl) => {
      optionEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = optionEl.getAttribute('data-value');
        if (!value) return;
        experienceSelectEl.value = value;
        experienceSelectEl.dispatchEvent(new Event('change', { bubbles: true }));

        // Auto-close shortly after selection for a smoother UX.
        scheduleExperienceAutoClose();
      });

      optionEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          optionEl.click();
        }
      });
    });
  }
  if (contactInputEl) {
    contactInputEl.addEventListener('input', checkSelections);
  }
  // The acceptButton's click listener is handled by auth-flow.js as it triggers a page transition.
  // This module only controls its 'disabled' state.

  // Initial validation check on load
  syncExperienceUiFromSelect();
  checkSelections();
}

// If getTranslation is needed for aimsSelectTextEl placeholder, ensure it's available.
// This might mean importing it or relying on it being globally available via language.js.
// For now, assuming window.getTranslation might exist or using a hardcoded fallback.
import { getTranslation } from './language.js'; // For the placeholder text

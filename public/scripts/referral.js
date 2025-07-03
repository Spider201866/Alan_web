import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary static translations to the elements on the referral page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  // Labels for top input group
  document.querySelector('label[for="ref-id"]').textContent = getTranslation('refIdLabel', 'ID');
  document.querySelector('label[for="ref-tel"]').textContent = getTranslation(
    'refTelLabel',
    'Telephone'
  );
  document.querySelector('label[for="ref-age"]').textContent = getTranslation('refAgeLabel', 'Age');
  document.querySelector('label[for="ref-sex"]').textContent = getTranslation('refSexLabel', 'M/F');

  // Screening switch label
  // Note: The text "Screening: No problems" or "Screening: Fail" is dynamically set by initializeForm's updateScreeningLabel.
  // We might need to translate "Screening: " part and then append "Pass" / "Fail" (which also might need translation).
  // For now, let's assume updateScreeningLabel will be refactored to use getTranslation for "Screening: " and "Pass"/"Fail".
  // So, no direct translation here for the dynamic part.

  // Priority label
  document.querySelector('label[for="ref-priority"]').textContent = getTranslation(
    'refPriorityLabel',
    'Priority'
  );
  // Priority select options might also need translation if their text is static.
  // For now, assuming their values/text are handled or are language-agnostic.

  // Provisional diagnosis label and button
  document.querySelector('label[for="ref-dx"].dx-label').textContent = getTranslation(
    'refDxLabel',
    'Provisional diagnosis (free text)'
  );
  document.getElementById('btnLoadExample').textContent = getTranslation(
    'refLoadExampleBtn',
    'Example'
  );

  // Textarea placeholder
  const refDxTextarea = document.getElementById('ref-dx');
  if (refDxTextarea) {
    refDxTextarea.placeholder = getTranslation(
      'refDxPlaceholder',
      'eg SUB-CONJUNTIVAL HAEMORRHAGE – sudden, bright-red patch, no pain or vision change. {problem & onset; what you saw; vision & pupils/hearing/odour; medication} D Smith (Hightown Clinic)'
    );
  }

  // Preview section title
  // Assuming the h3 element for "Text Preview:" can be targeted or given an ID if needed.
  // For now, let's find it by its current text content if it's unique enough, or add an ID.
  // This is brittle; adding an ID would be better.
  const previewTitleElement = Array.from(document.querySelectorAll('h3')).find((h3) =>
    h3.textContent.includes('Text Preview:')
  );
  if (previewTitleElement) {
    previewTitleElement.textContent = getTranslation('refPreviewTitle', 'Text Preview:');
  }

  // The char count info is dynamically generated, its template string in JS will need translation.
}

let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('refer', applyPageSpecificTranslations);
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

// initializeForm will need to be refactored to use getTranslation for its dynamic text.
// For now, the static HTML text is handled by applyPageSpecificTranslations.
// The dynamic parts within initializeForm (like screenLabel, char count messages) will be addressed later.
document.addEventListener('DOMContentLoaded', function () {
  // applyPageSpecificTranslations is called by initPage after DOMContentLoaded and language init.
  // So, we only need to call initializeForm here.
  initializeForm();
});

/**
 * Initializes the referral form, setting up all event listeners and dynamic behaviors.
 */
function initializeForm() {
  const refIdInput = document.getElementById('ref-id');
  const refTelInput = document.getElementById('ref-tel');
  const refAgeInput = document.getElementById('ref-age');
  const refSexSelect = document.getElementById('ref-sex');
  const screenSwitch = document.getElementById('screen-switch');
  const screenLabel = document.getElementById('screen-label');
  const refPrioritySelect = document.getElementById('ref-priority');
  const refDxTextarea = document.getElementById('ref-dx');
  const textPreviewContentEl = document.getElementById('textPreviewContent');
  const textPreviewCharCountInfoEl = document.getElementById('textPreviewCharCountInfo');
  const copyPreviewTextBtn = document.getElementById('copyPreviewText');
  const btnLoadExample = document.getElementById('btnLoadExample');

  /**
   * Updates the background color of the priority dropdown based on the selected value.
   */
  function updateReferralPriorityColor() {
    const selectedValue = refPrioritySelect.value;
    refPrioritySelect.classList.remove('priority-green', 'priority-orange', 'priority-red');
    if (selectedValue === 'Managed' || selectedValue === 'Routine') {
      refPrioritySelect.classList.add('priority-green');
    } else if (selectedValue === 'Soon') {
      refPrioritySelect.classList.add('priority-orange');
    } else if (selectedValue === 'Emergency') {
      refPrioritySelect.classList.add('priority-red');
    }
  }

  /**
   * Generates a compact, single-line text representation of the referral form's data.
   * @returns {string} The compacted referral text.
   */
  function generateCompactReferralText() {
    const idVal = refIdInput.value.trim() || 'N/A';
    const telVal = refTelInput.value.trim().replace(/\s+/g, '') || 'N/A';
    const ageVal = refAgeInput.value.trim() || 'N/A';
    const sexVal = refSexSelect.value || '';
    const screeningValue = screenSwitch.checked ? 'Fail' : 'Pass';

    let priorityDisplay = 'N/A';
    if (refPrioritySelect.value && refPrioritySelect.options[refPrioritySelect.selectedIndex]) {
      const selectedOption = refPrioritySelect.options[refPrioritySelect.selectedIndex];
      if (selectedOption.value) {
        const fullText = selectedOption.text.trim();
        const timeframeMatch = fullText.match(/\((weeks|days|today)\)/i);
        priorityDisplay = timeframeMatch
          ? fullText.replace(timeframeMatch[0], `(${timeframeMatch[1].toUpperCase()})`)
          : selectedOption.value;
      }
    }

    const dxVal =
      refDxTextarea.value
        .trim()
        .replace(/(\r\n|\n|\r)+/g, ' ')
        .replace(/\s\s+/g, ' ') || 'N/A';

    return [
      `ID:${idVal}`,
      `T:${telVal}`,
      `A:${ageVal}${sexVal}`,
      screeningValue,
      priorityDisplay,
      `Dx: ${dxVal}`,
    ].join('; ');
  }

  /**
   * Updates the text preview area with the compacted referral text and provides feedback on its length.
   */
  function updateTextPreview() {
    const compactText = generateCompactReferralText();
    textPreviewContentEl.textContent = compactText;

    const len = compactText.length;
    const smsLimitSingle = 160;
    let message = `[${len} character${len === 1 ? '' : 's'}`;

    if (len <= smsLimitSingle) {
      message += ` - fits in 1 text message]`;
      textPreviewCharCountInfoEl.style.color = 'var(--green-dark)';
    } else {
      message += ` - exceeds ${smsLimitSingle} chars, may use multiple SMS]`;
      textPreviewCharCountInfoEl.style.color = 'var(--red-dark)';
    }
    textPreviewCharCountInfoEl.textContent = message;
  }

  /**
   * Provides visual feedback when the 'copy' button is clicked by changing the icon.
   * @param {HTMLElement} element - The icon element to provide feedback on.
   */
  function showCopyFeedback(element) {
    if (!element) return;
    element.classList.remove('fa-copy');
    element.classList.add('fa-check');
    element.style.color = 'var(--green-dark)';
    setTimeout(() => {
      element.classList.remove('fa-check');
      element.classList.add('fa-copy');
      element.style.color = 'var(--primary)';
    }, 1500);
  }

  /**
   * Updates the label for the screening switch based on its checked state.
   */
  function updateScreeningLabel() {
    screenLabel.textContent = 'Screening: ' + (screenSwitch.checked ? 'Fail' : 'Pass');
  }

  /**
   * Populates the form with example data to demonstrate its usage.
   */
  function loadExampleData() {
    refIdInput.value = '2772';
    refTelInput.value = '07445 667 2111';
    refAgeInput.value = '67';
    refSexSelect.value = 'F';
    screenSwitch.checked = true;
    refPrioritySelect.value = 'Routine';
    refDxTextarea.value =
      'CATARACT. Reflex dark; VA hazy yrs 6/18 R+L, N12; Pupils black + react; No meds. \n\nD Smith (Hightown)';
    updateScreeningLabel();
    updateReferralPriorityColor();
    updateTextPreview();
  }

  [
    refIdInput,
    refTelInput,
    refAgeInput,
    refDxTextarea,
    refSexSelect,
    refPrioritySelect,
    screenSwitch,
  ].forEach((element) => {
    element.addEventListener('input', updateTextPreview);
    element.addEventListener('change', updateTextPreview);
  });
  screenSwitch.addEventListener('change', updateScreeningLabel);
  refPrioritySelect.addEventListener('change', updateReferralPriorityColor);
  copyPreviewTextBtn.addEventListener('click', () => {
    navigator.clipboard
      .writeText(textPreviewContentEl.textContent)
      .then(() => showCopyFeedback(copyPreviewTextBtn))
      .catch(() => alert('Failed to copy text.'));
  });
  btnLoadExample.addEventListener('click', loadExampleData);

  updateScreeningLabel();
  updateReferralPriorityColor();
  updateTextPreview();
}

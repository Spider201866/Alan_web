// Alan UI - referral.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { whenSwReady } from './sw-ready.js';

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

  // Preview section title
  const previewTitleElement = document.getElementById('textPreviewTitle');
  if (previewTitleElement) {
    previewTitleElement.textContent = getTranslation('refPreviewTitle', 'Text Preview:');
  }
}

let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('refer', applyPageSpecificTranslations);
    pageHasInitialized = true;
  }
};

whenSwReady(runInitPage);

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
  const SMS_SINGLE_SEGMENT_LIMIT_GSM = 160;
  const SMS_SINGLE_SEGMENT_LIMIT_UCS2 = 70;

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
    const idVal = refIdInput.value.trim();
    const telRaw = refTelInput.value.trim();
    const telVal = telRaw ? telRaw.replace(/\s+/g, '') : '';
    const ageVal = refAgeInput.value.trim();
    const sexVal = refSexSelect.value || '';
    const screeningValue = getScreeningStatusLabel();
    const ageSexVal = ageVal || sexVal ? `${ageVal}${sexVal}` : '';

    let priorityDisplay = '';
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

    const dxRaw = refDxTextarea.value.trim();
    const dxVal = dxRaw ? dxRaw.replace(/(\r\n|\n|\r)+/g, ' ').replace(/\s\s+/g, ' ') : '';

    const fields = [];
    if (idVal) fields.push(idVal);
    if (telVal) fields.push(telVal);
    if (ageSexVal) fields.push(ageSexVal);
    fields.push(screeningValue);
    if (priorityDisplay) fields.push(priorityDisplay);
    if (dxVal) fields.push(dxVal);

    return fields.join('; ');
  }

  const GSM7_BASIC_CHARS =
    '@\u00A3$\u00A5\u00E8\u00E9\u00F9\u00EC\u00F2\u00C7\n\u00D8\u00F8\r\u00C5\u00E5\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039E' +
    ' !\"#\u00A4%&\'()*+,-./' +
    '0123456789:;<=>?' +
    '\u00A1' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '\u00C4\u00D6\u00D1\u00DC\u00A7' +
    '\u00BF' +
    'abcdefghijklmnopqrstuvwxyz' +
    '\u00E4\u00F6\u00F1\u00FC\u00E0';
  const GSM7_BASIC_SET = new Set(GSM7_BASIC_CHARS.split(''));
  const GSM7_EXT_SET = new Set(['^', '{', '}', '\\', '[', ']', '~', '|', '\u20AC', '\f']);

  function getGsmCharCost(char) {
    if (GSM7_BASIC_SET.has(char)) return 1;
    if (GSM7_EXT_SET.has(char)) return 2;
    return null;
  }

  function getGsmLength(text) {
    let gsmLength = 0;
    for (const char of text) {
      const cost = getGsmCharCost(char);
      if (cost === null) return null;
      gsmLength += cost;
    }
    return gsmLength;
  }

  function getSingleSegmentInfo(text) {
    const gsmLength = getGsmLength(text);
    if (gsmLength === null) {
      return {
        encoding: 'UCS-2',
        length: text.length,
        limit: SMS_SINGLE_SEGMENT_LIMIT_UCS2,
      };
    }

    return {
      encoding: 'GSM-7',
      length: gsmLength,
      limit: SMS_SINGLE_SEGMENT_LIMIT_GSM,
    };
  }

  function formatTemplate(template, values) {
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
  }

  function getScreeningStatusLabel() {
    return screenSwitch.checked
      ? getTranslation('refScreeningFail', 'Fail')
      : getTranslation('refScreeningPass', 'Pass');
  }

  function truncateForSmsPreview(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    if (maxLength <= 3) {
      return text.slice(0, maxLength);
    }

    const sliceLength = maxLength - 3;
    let truncated = text.slice(0, sliceLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
    truncated = truncated.trimEnd();
    if (!truncated) {
      truncated = text.slice(0, sliceLength).trimEnd();
    }
    return `${truncated}...`;
  }

  function truncateGsmForSmsPreview(text, maxUnits) {
    const ellipsis = '...';
    const totalUnits = getGsmLength(text);
    if (totalUnits !== null && totalUnits <= maxUnits) {
      return text;
    }
    const ellipsisCost = getGsmLength(ellipsis) || ellipsis.length;
    const truncatedLimit = maxUnits - ellipsisCost;

    if (maxUnits <= ellipsisCost) {
      return text.slice(0, maxUnits);
    }

    let units = 0;
    let endIndex = 0;
    for (let i = 0; i < text.length; i += 1) {
      const cost = getGsmCharCost(text[i]) ?? 0;
      if (units + cost > truncatedLimit) break;
      units += cost;
      endIndex = i + 1;
    }

    let truncated = text.slice(0, endIndex);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
    truncated = truncated.trimEnd();
    if (!truncated) {
      truncated = text.slice(0, endIndex).trimEnd();
    }
    return `${truncated}${ellipsis}`;
  }

  /**
   * Updates the text preview area with the compacted referral text and provides feedback on its length.
   */
  function updateTextPreview() {
    const compactText = generateCompactReferralText();
    const segmentInfo = getSingleSegmentInfo(compactText);
    const previewText =
      segmentInfo.encoding === 'GSM-7'
        ? truncateGsmForSmsPreview(compactText, segmentInfo.limit)
        : truncateForSmsPreview(compactText, segmentInfo.limit);
    textPreviewContentEl.textContent = previewText;

    const previewLength =
      segmentInfo.encoding === 'GSM-7' ? getGsmLength(previewText) || 0 : previewText.length;
    const characterLabel =
      previewLength === 1
        ? getTranslation('refSmsCharacterSingle', 'character')
        : getTranslation('refSmsCharacterPlural', 'characters');
    const message = formatTemplate(
      getTranslation('refSmsPreviewInfo', '[SMS preview: {length}/{max} {characterLabel}]'),
      {
        length: previewLength,
        max: segmentInfo.limit,
        characterLabel,
      }
    );

    textPreviewCharCountInfoEl.style.color =
      segmentInfo.length > segmentInfo.limit ? 'var(--red-dark)' : 'var(--green-dark)';
    textPreviewCharCountInfoEl.textContent = message;
  }

  /**
   * Provides visual feedback when the 'copy' button is clicked by changing the icon.
   * @param {HTMLElement} element - The icon element to provide feedback on.
   */
  function showCopyFeedback(element) {
    if (!element) return;
    const icon = element.querySelector('i');
    if (!icon) return;
    icon.classList.remove('fa-copy');
    icon.classList.add('fa-check');
    element.style.color = 'var(--green-dark)';
    setTimeout(() => {
      icon.classList.remove('fa-check');
      icon.classList.add('fa-copy');
      element.style.color = 'var(--primary)';
    }, 1500);
  }

  /**
   * Updates the label for the screening switch based on its checked state.
   */
  function updateScreeningLabel() {
    const template = getTranslation('refScreeningLabel', 'Screening: {status}');
    screenLabel.textContent = formatTemplate(template, {
      status: getScreeningStatusLabel(),
    });
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
    copyTextToClipboard(textPreviewContentEl.textContent)
      .then(() => showCopyFeedback(copyPreviewTextBtn))
      .catch(() => alert('Failed to copy text.'));
  });
  btnLoadExample.addEventListener('click', loadExampleData);
  document.addEventListener('languageChanged', () => {
    updateScreeningLabel();
    updateTextPreview();
  });

  updateScreeningLabel();
  updateReferralPriorityColor();
  updateTextPreview();
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const succeeded = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (succeeded) {
        resolve();
      } else {
        reject(new Error('Copy failed'));
      }
    } catch (error) {
      document.body.removeChild(textArea);
      reject(error);
    }
  });
}

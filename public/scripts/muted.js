// Alan UI - muted.js

// muted.js
import log from './log.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

const MUTED_BUTTONS_FRAGMENT_PATH = '/partials/muted-buttons.html';

/**
 * Fetches and mounts the muted buttons fragment into a target element,
 * then wires its interactive behavior.
 * @param {HTMLElement|null} mountEl
 * @returns {Promise<void>}
 */
export async function mountMutedButtons(mountEl) {
  if (!mountEl) return;
  const response = await fetch(MUTED_BUTTONS_FRAGMENT_PATH);
  if (!response.ok) throw new Error(`Failed to fetch ${MUTED_BUTTONS_FRAGMENT_PATH}`);
  const html = await response.text();
  setTrustedHtml(mountEl, html);
  applyMutedButtonTranslations();
  initMutedButtons();
}

function applyMutedButtonTranslations() {
  const mutedButtonTranslations = {
    '#images .text-part': 'images',
    '#help .text-part': 'help',
    '#screenshot .text-part': 'screenshot',
    '#refer .text-part': 'refer',
  };

  for (const [selector, key] of Object.entries(mutedButtonTranslations)) {
    const el = document.querySelector(selector);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }

  const referPopupEl = document.getElementById('refer-popup');
  if (referPopupEl) {
    referPopupEl.textContent = getTranslation('comingSoon', 'Coming Soon...');
  }

  const imagePopupText = document.querySelector('#chat-end-buttons [data-images-popup-text]');
  if (imagePopupText) {
    imagePopupText.textContent = getTranslation(
      'findImagesOnTheseSites',
      'Find images on these sites'
    );
  }

  const imagePopupSiteButtons = {
    '#chat-end-buttons [data-images-site="ophthalmology"]': 'ophthalmology',
    '#chat-end-buttons [data-images-site="ent"]': 'ent',
    '#chat-end-buttons [data-images-site="dermatology"]': 'dermatology',
  };
  for (const [selector, key] of Object.entries(imagePopupSiteButtons)) {
    const el = document.querySelector(selector);
    if (el) el.textContent = getTranslation(key, el.textContent);
  }
}

/**
 * Attach Refer, Screenshot and Images button events
 */
export function initMutedButtons() {
  // REFER
  const referButton = document.getElementById('refer');
  if (referButton) {
    const goToReferral = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'referral.html';
    };
    referButton.addEventListener('click', goToReferral);
  }

  // SCREENSHOT
  const screenshotButton = document.getElementById('screenshot');
  if (screenshotButton) screenshotButton.addEventListener('click', takeScreenshot);

  // IMAGES
  const imagesButton = document.getElementById('images');
  if (imagesButton) {
    imagesButton.addEventListener('click', () => {
      // Cleaner toggle: if buttons exist, remove them. Otherwise, create them.
      if (document.getElementById('chat-end-buttons')) {
        removeChatEndButtons();
      } else {
        createButtonsWithText('');
      }
    });
  }
}

/**
 * Dynamically loads a script from a given URL and returns a promise that resolves when the script is loaded.
 * @param {string} url - The URL of the script to load.
 * @returns {Promise<void>}
 */
function loadScript(url) {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

/**
 * Captures the current screen using html2canvas and triggers a download of the resulting image.
 */
async function takeScreenshot() {
  try {
    // Load the html2canvas script from the CDN.
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');

    // Now that the script is loaded, the html2canvas function is available on the window object.
    if (typeof window.html2canvas !== 'function') {
      throw new Error('html2canvas is not loaded correctly.');
    }

    const canvas = await window.html2canvas(document.body);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'screenshot.png';
    link.click();
    link.remove();
  } catch (err) {
    log.error('Screenshot capture failed:', err);
  }
}

/**
 * Removes the container for the sub-image buttons if it exists.
 */
function removeChatEndButtons() {
  document.getElementById('chat-end-buttons')?.remove();
  document.querySelector('.chat-actions-dock')?.classList.remove('has-images-popover');
}

/**
 * Creates and displays the sub-image buttons with a conditional text line.
 * @param {string} [condition=''] - An optional condition to be displayed in the text line.
 */
function createButtonsWithText(condition = '') {
  if (document.getElementById('chat-end-buttons')) return;

  const container = document.createElement('div');
  container.id = 'chat-end-buttons';
  container.className = 'chat-end-buttons-popover';

  const textLine = document.createElement('div');
  textLine.dataset.imagesPopupText = 'true';
  textLine.className = 'chat-end-buttons-text';
  if (condition) {
    textLine.appendChild(document.createTextNode('Find '));
    const strong = document.createElement('strong');
    strong.textContent = condition;
    textLine.appendChild(strong);
    textLine.appendChild(document.createTextNode(' images on these sites'));
  } else {
    textLine.textContent = 'Find images on these sites';
  }
  container.appendChild(textLine);

  const buttonsRow = document.createElement('div');
  buttonsRow.className = 'chat-end-buttons-row';
  buttonsRow.appendChild(
    createSiteButton(
      'ophthalmology',
      'Ophthalmology',
      'rgb(134, 162, 255)',
      'https://eyewiki.org/Main_Page'
    )
  );
  buttonsRow.appendChild(
    createSiteButton(
      'ent',
      'ENT',
      'rgb(133, 255, 133)',
      'https://www.otoscape.com/image-atlas.html'
    )
  );
  buttonsRow.appendChild(
    createSiteButton('dermatology', 'Dermatology', '#efafff', 'https://dermnetnz.org/images')
  );
  container.appendChild(buttonsRow);

  const actionsDock = document.querySelector('.chat-actions-dock');
  const mountTarget = actionsDock || document.getElementById('muted-buttons') || document.body;
  if (actionsDock) actionsDock.classList.add('has-images-popover');
  mountTarget.appendChild(container);

  if (!condition) {
    textLine.textContent = getTranslation('findImagesOnTheseSites', textLine.textContent);
  }
}

/**
 * A helper function to create a styled button that links to an external site.
 * @param {string} translationKey - The translation key for the button label.
 * @param {string} fallbackLabel - The fallback text to be displayed on the button.
 * @param {string} background - The background color of the button.
 * @param {string} url - The URL to open when the button is clicked.
 * @returns {HTMLButtonElement} The created button element.
 */
function createSiteButton(translationKey, fallbackLabel, background, url) {
  const button = document.createElement('button');
  button.className = 'button chat-end-buttons-site';
  button.dataset.imagesSite = translationKey;
  button.textContent = getTranslation(translationKey, fallbackLabel);
  button.style.backgroundColor = background;
  button.addEventListener('click', () => {
    window.open(url, '_blank');
    removeChatEndButtons();
  });
  return button;
}

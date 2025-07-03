// Alan UI - muted.js | 19th June 2025, WJW

// muted.js
import log from './log.js';

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
 * Captures the current screen using html2canvas and triggers a download of the resulting image.
 */
async function takeScreenshot() {
  try {
    const html2canvas = (
      await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js')
    ).default;
    const canvas = await html2canvas(document.body);
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
}

/**
 * Creates and displays the sub-image buttons with a conditional text line.
 * @param {string} [condition=''] - An optional condition to be displayed in the text line.
 */
function createButtonsWithText(condition = '') {
  if (document.getElementById('chat-end-buttons')) return;

  const container = document.createElement('div');
  container.id = 'chat-end-buttons';
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-20px',
    marginBottom: '35px',
    transition: 'margin-top 0.3s',
  });

  const textLine = document.createElement('div');
  textLine.innerHTML = condition
    ? `Find <strong>${condition}</strong> images on these sites`
    : 'Find images on these sites';
  textLine.style.cssText = 'font-size: 14px; margin-bottom: 10px;';
  container.appendChild(textLine);

  const buttonsRow = document.createElement('div');
  buttonsRow.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;';
  buttonsRow.appendChild(
    createSiteButton('Ophthalmology', 'rgb(134, 162, 255)', 'https://eyewiki.org/Main_Page')
  );
  buttonsRow.appendChild(
    createSiteButton('ENT', 'rgb(133, 255, 133)', 'https://www.otoscape.com/image-atlas.html')
  );
  buttonsRow.appendChild(
    createSiteButton('Dermatology', '#efafff', 'https://dermnetnz.org/images')
  );
  container.appendChild(buttonsRow);

  const footer = document.querySelector('footer.chatbot-version');
  if (footer) footer.parentNode.insertBefore(container, footer);
  else document.body.appendChild(container);

  setTimeout(() => {
    // Adjust margin if container is off-screen
    if (container.getBoundingClientRect().bottom > window.innerHeight)
      container.style.marginTop = '0px';
  });
}

/**
 * A helper function to create a styled button that links to an external site.
 * @param {string} label - The text to be displayed on the button.
 * @param {string} background - The background color of the button.
 * @param {string} url - The URL to open when the button is clicked.
 * @returns {HTMLButtonElement} The created button element.
 */
function createSiteButton(label, background, url) {
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = label;
  button.style.cssText = `background-color: ${background}; color: black; font-size: 14px; border: 2px solid black; padding: 6px 10px; cursor: pointer;`;
  button.addEventListener('click', () => window.open(url, '_blank'));
  return button;
}

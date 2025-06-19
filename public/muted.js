// Alan UI - muted.js | 19th June 2025, WJW

// muted.js

// Wait until the document is ready, then wire the buttons
document.addEventListener('DOMContentLoaded', initMutedButtons);

/**
 * Attach Refer, Screenshot and Images button events
 */
function initMutedButtons() {
  // REFER
  const referButton = document.getElementById('refer');
  if (referButton) {
    const goToReferral = (e) => {
      e.preventDefault(); e.stopPropagation();
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
 * Capture the screen using html2canvas then trigger a download
 */
/* global html2canvas */
function takeScreenshot() {
  if (typeof html2canvas === 'undefined') return console.error('html2canvas is not loaded.');

  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'screenshot.png';
    link.click();
    link.remove();
  }).catch(err => console.error('Screenshot capture failed:', err));
}

/**
 * Remove any existing sub-image button container
 */
function removeChatEndButtons() {
  document.getElementById('chat-end-buttons')?.remove();
}

/**
 * Create and insert the sub-image button container
 * @param {string} condition
 */
function createButtonsWithText(condition = '') {
  if (document.getElementById('chat-end-buttons')) return;

  const container = document.createElement('div');
  container.id = 'chat-end-buttons';
  Object.assign(container.style, {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    marginTop: '-20px', marginBottom: '35px', transition: 'margin-top 0.3s',
  });

  const textLine = document.createElement('div');
  textLine.innerHTML = condition ? `Find <strong>${condition}</strong> images on these sites` : 'Find images on these sites';
  textLine.style.cssText = 'font-size: 14px; margin-bottom: 10px;';
  container.appendChild(textLine);

  const buttonsRow = document.createElement('div');
  buttonsRow.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;';
  buttonsRow.appendChild(createSiteButton('Ophthalmology', 'rgb(134, 162, 255)', 'https://eyewiki.org/Main_Page'));
  buttonsRow.appendChild(createSiteButton('ENT', 'rgb(133, 255, 133)', 'https://www.otoscape.com/image-atlas.html'));
  buttonsRow.appendChild(createSiteButton('Dermatology', '#efafff', 'https://dermnetnz.org/images'));
  container.appendChild(buttonsRow);

  const footer = document.querySelector('footer.chatbot-version');
  if (footer) footer.parentNode.insertBefore(container, footer);
  else document.body.appendChild(container);

  setTimeout(() => { // Adjust margin if container is off-screen
    if (container.getBoundingClientRect().bottom > window.innerHeight) container.style.marginTop = '0px';
  });
}

/**
 * Helper to build a styled site button
 */
function createSiteButton(label, background, url) {
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = label;
  button.style.cssText = `background-color: ${background}; color: black; font-size: 14px; border: 2px solid black; padding: 6px 10px; cursor: pointer;`;
  button.addEventListener('click', () => window.open(url, '_blank'));
  return button;
}

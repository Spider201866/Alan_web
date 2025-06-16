// muted.js

// Wait until the document is ready, then wire the buttons
document.addEventListener('DOMContentLoaded', initMutedButtons);

/**
 * Attach Refer, Screenshot and Images button events
 */
function initMutedButtons() {
  // REFER
  const referButton = document.getElementById('refer');
  const popup = document.getElementById('refer-popup');

  if (referButton && popup) {
    const showPopup = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Refer button activated');

      if (popup.hideTimeout) clearTimeout(popup.hideTimeout);
      popup.style.display = 'block';
      popup.hideTimeout = setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);
    };

    referButton.addEventListener('click', showPopup);
    referButton.addEventListener('touchstart', showPopup);
  } else {
    console.warn('Refer button or popup element not found.');
  }

  // SCREENSHOT
  const screenshotButton = document.getElementById('screenshot');
  if (screenshotButton) {
    screenshotButton.addEventListener('click', takeScreenshot);
  } else {
    console.warn('Screenshot button not found.');
  }

  // IMAGES
  const imagesButton = document.getElementById('images');
  if (imagesButton) {
    imagesButton.addEventListener('click', () => {
      console.log('Images button clicked.');
      const existingContainer = document.getElementById('chat-end-buttons');

      if (existingContainer) {
        removeChatEndButtons();
      } else {
        removeChatEndButtons();      // tidy up any strays
        createButtonsWithText('');
      }
    });
  } else {
    console.warn('Images button not found in the DOM.');
  }
}

/**
 * Capture the screen using html2canvas then trigger a download
 * Make sure the library is loaded, e.g. via
 * <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
 */
/* global html2canvas */
function takeScreenshot() {
  if (typeof html2canvas === 'undefined') {
    console.error('html2canvas is not loaded.');
    return;
  }

  html2canvas(document.body)
    .then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'screenshot.png';
      link.click();
      link.remove();
    })
    .catch((err) => {
      console.error('Screenshot capture failed:', err);
    });
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
  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-20px',
    marginBottom: '35px',
    transition: 'margin-top 0.3s',
  });
  container.id = 'chat-end-buttons';

  const textLine = document.createElement('div');
  textLine.innerHTML = condition
    ? `Find <strong>${condition}</strong> images on these sites`
    : 'Find images on these sites';
  Object.assign(textLine.style, { fontSize: '14px', marginBottom: '10px' });
  container.appendChild(textLine);

  const buttonsRow = document.createElement('div');
  Object.assign(buttonsRow.style, {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  });

  buttonsRow.appendChild(createSiteButton('Ophthalmology', 'rgb(134, 162, 255)', 'https://eyewiki.org/Main_Page'));
  buttonsRow.appendChild(createSiteButton('ENT', 'rgb(133, 255, 133)', 'https://www.otoscape.com/image-atlas.html'));
  buttonsRow.appendChild(createSiteButton('Dermatology', '#efafff', 'https://dermnetnz.org/images'));

  container.appendChild(buttonsRow);

  const footer = document.querySelector('footer.chatbot-version');
  if (footer) footer.parentNode.insertBefore(container, footer);
  else document.body.appendChild(container);

  setTimeout(() => {
    if (container.getBoundingClientRect().bottom > window.innerHeight) {
      container.style.marginTop = '0px';
    }
  });
}

/**
 * Helper to build a styled site button
 */
function createSiteButton(label, background, url) {
  const button = document.createElement('button');
  button.className = 'button';
  Object.assign(button.style, {
    backgroundColor: background,
    color: 'black',
    fontSize: '14px',
    border: '2px solid black',
    padding: '6px 10px',
  });
  button.textContent = label;
  button.addEventListener('click', () => window.open(url, '_blank'));
  return button;
}

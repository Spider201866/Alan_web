// Alan UI - home-ui-handlers.js | 14th January 2026, WJW
// public/scripts/home-ui-handlers.js
// Wires up event handlers for home page UI elements.

import log from './log.js';
import { setLanguage } from './language.js';
import { renderLanguageOptions } from './language-options.js';
import { closeAllPopups, updateButtonStyle } from './home-ui-core.js';
import { buildPopupContent } from './home-ui-popup.js';
import { setTrustedHtml } from './trusted-html.js';

function attachSwipeToClose(element, { direction, isOpen, onClose }) {
  if (!element) return;

  const thresholdPx = 60;
  const ratio = 1.2;
  let startX = 0;
  let startY = 0;
  let active = false;

  element.addEventListener(
    'touchstart',
    (event) => {
      if (!event.touches || event.touches.length !== 1) return;
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      active = true;
    },
    { passive: true }
  );

  element.addEventListener(
    'touchend',
    (event) => {
      if (!active) return;
      active = false;
      if (!isOpen()) return;
      if (!event.changedTouches || event.changedTouches.length !== 1) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < thresholdPx || absDx < absDy * ratio) return;

      if (direction === 'left' && dx < 0) onClose();
      if (direction === 'right' && dx > 0) onClose();
    },
    { passive: true }
  );
}

function setupMenuIcon(state) {
  if (!state.menuIcon || !state.sideMenu || !state.overlay || !state.sideMenuFocusTrap) return;
  state.menuIcon.addEventListener('click', function () {
    const isCurrentlyOpen = this.classList.contains('open');
    closeAllPopups(state);
    if (!isCurrentlyOpen) {
      this.classList.add('open');
      state.sideMenu.classList.add('is-open');
      state.overlay.style.display = 'block';
      state.sideMenuFocusTrap.activate();
    }
  });
}

function setupInstructionsButton(state) {
  if (!state.instructionsButton) return;
  state.instructionsButton.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.setItem('instructionsClicked', 'true');
    updateButtonStyle(this);
    setTimeout(() => (window.location.href = 'instructions.html'), 300);
  });
}

function setupGeoInfoButton(state) {
  if (!state.geoInfoButton || !state.geoInfoPopup) return;
  state.geoInfoButton.addEventListener('click', (event) => {
    event.stopPropagation();
    state.geoInfoPopup.style.display =
      state.geoInfoPopup.style.display === 'none' || state.geoInfoPopup.style.display === ''
        ? 'block'
        : 'none';
  });

  document.addEventListener('click', (event) => {
    if (
      state.geoInfoPopup.style.display === 'block' &&
      !state.geoInfoPopup.contains(event.target) &&
      event.target !== state.geoInfoButton
    ) {
      state.geoInfoPopup.style.display = 'none';
    }
  });
}

function flashBlueOnUpdate() {
  ['latLongSection', 'areaSection', 'countrySection'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('flash-blue');
      setTimeout(() => el.classList.remove('flash-blue'), 2000);
    }
  });
}

function setupGeolocationButton(state, onGeolocationClick) {
  if (!state.geolocationButton || !state.locationInfo) return;
  state.geolocationButton.addEventListener('click', async () => {
    state.geolocationButton.style.backgroundColor = 'blue';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());

          state.locationInfo.innerText = `Updated location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          state.locationInfo.style.display = 'block';

          if (typeof onGeolocationClick === 'function') {
            await onGeolocationClick(latitude, longitude);
          }

          const popupContent = document.getElementById('popup-content');
          if (popupContent) setTrustedHtml(popupContent, buildPopupContent());
          flashBlueOnUpdate();

          setTimeout(() => {
            state.geolocationButton.style.backgroundColor = 'grey';
            state.locationInfo.style.display = 'none';
          }, 3000);
        },
        (error) => {
          const errorMessages = {
            [error.PERMISSION_DENIED]: 'User denied geolocation.',
            [error.POSITION_UNAVAILABLE]: 'Location info unavailable.',
            [error.TIMEOUT]: 'Request timed out.',
          };
          state.locationInfo.innerText = errorMessages[error.code] || 'An unknown error occurred.';
          state.locationInfo.style.display = 'block';
          setTimeout(() => {
            state.geolocationButton.style.backgroundColor = 'grey';
            state.locationInfo.style.display = 'none';
          }, 3000);
        }
      );
    } else {
      state.locationInfo.innerText = 'Geolocation not supported.';
      state.locationInfo.style.display = 'block';
      setTimeout(() => {
        state.geolocationButton.style.backgroundColor = 'grey';
        state.locationInfo.style.display = 'none';
      }, 3000);
    }
  });
}

function setupLanguageControls(state) {
  if (!state.languageButton || !state.languageDropdown) return;
  const languageList = state.languageDropdown.querySelector('ul');
  renderLanguageOptions(languageList);

  state.languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden =
      state.languageDropdown.style.display === 'none' ||
      getComputedStyle(state.languageDropdown).display === 'none';
    state.languageDropdown.style.display = isHidden ? 'block' : 'none';
  });

  document.addEventListener('click', () => (state.languageDropdown.style.display = 'none'));

  state.languageDropdown.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', async () => {
      const chosenLang = item.getAttribute('data-value');
      localStorage.setItem('preferredLanguage', chosenLang);
      await setLanguage(chosenLang);
      state.languageDropdown.style.display = 'none';
    });
  });
}

function setupChatbotInteraction(state) {
  if (state.chatbotContainer && state.boxesFrame) {
    state.chatbotContainer.addEventListener('click', () => {
      state.boxesFrame.style.display = 'none';
    });
  }

  if (state.chatbotTitle) {
    state.chatbotTitle.classList.remove('flip-horizontally');
    void state.chatbotTitle.offsetWidth;
    state.chatbotTitle.classList.add('flip-horizontally');
  }
}

function setupCloseHandlers(state) {
  if (state.overlay) {
    state.overlay.addEventListener('click', () => closeAllPopups(state));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPopups(state);
    }
  });
}

function setupSwipeToClose(state) {
  attachSwipeToClose(state.sideMenu, {
    direction: 'left',
    isOpen: () => Boolean(state.sideMenu?.classList.contains('is-open')),
    onClose: () => closeAllPopups(state),
  });

  attachSwipeToClose(state.popup, {
    direction: 'right',
    isOpen: () => Boolean(state.popup?.classList.contains('is-open')),
    onClose: () => closeAllPopups(state),
  });
}

function setupClearHistoryButton() {
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (!clearHistoryBtn) return;
  clearHistoryBtn.addEventListener('click', () => {
    if (!confirm('Delete all saved chat sessions?')) return;

    localStorage.removeItem('alan-chat-history-v2');
    const side = document.getElementById('chatHistorySidebar');
    if (side) side.textContent = '';

    import('./listener-module.js')
      .then((mod) => {
        if (typeof mod.resetSidebarHistory === 'function') mod.resetSidebarHistory();
      })
      .catch((err) => log.error('Failed to load listener-module for history reset:', err));
  });
}

/**
 * Wires all home UI interactions.
 * @param {import('./home-ui-state.js').HomeUIState} state
 * @param {object} options
 * @param {(lat:number, lng:number)=>Promise<void>} [options.onGeolocationClick]
 */
export function wireHomeUIHandlers(state, options = {}) {
  setupMenuIcon(state);
  setupInstructionsButton(state);
  setupGeoInfoButton(state);

  if (typeof options.onGeolocationClick === 'function') {
    setupGeolocationButton(state, options.onGeolocationClick);
  } else {
    log.warn('initUI: onGeolocationClick callback not provided for geolocation button.');
    setupGeolocationButton(state, () => {
      log.info('Geolocation clicked, but no data handler provided to UI module.');
    });
  }

  setupLanguageControls(state);
  setupChatbotInteraction(state);
  setupCloseHandlers(state);
  setupSwipeToClose(state);
  setupClearHistoryButton();
}

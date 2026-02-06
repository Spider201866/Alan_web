// Alan UI - page-template.js | 14th January 2026, WJW
// public/scripts/page-template.js
// Provides a standardized template for creating and initializing sub-pages.

import { getTranslation } from './language.js';
import log from './log.js';

/**
 * Builds the standard page header with a translated title and appends it to the body.
 * It also automatically wires up the back button.
 * @param {string} pageTitleKey - The translation key for the page title.
 */
export function buildHeader(pageTitleKey) {
  const translatedTitle = getTranslation(pageTitleKey, pageTitleKey);

  const headerContainer = document.createElement('div');
  headerContainer.id = 'appBarContainer';
  const header = document.createElement('header');
  header.id = 'appBar';

  const backButton = document.createElement('button');
  backButton.className = 'back-arrow';
  backButton.setAttribute('aria-label', 'Go Back');
  backButton.textContent = '\u2190';

  const title = document.createElement('h1');
  title.id = 'pageTitle';
  title.textContent = translatedTitle;

  header.appendChild(backButton);
  header.appendChild(title);
  headerContainer.appendChild(header);

  if (document.body.firstChild) {
    document.body.insertBefore(headerContainer, document.body.firstChild);
  } else {
    document.body.appendChild(headerContainer);
  }

  backButton.addEventListener('click', () => {
    history.back();
  });
}

/**
 * Initializes a page: builds the header, applies initial translations,
 * and sets up listeners for dynamic language changes.
 * @param {string} pageTitleKey - The translation key for the page title.
 * @param {function} [applyPageSpecificTranslations] - Optional function to apply translations specific to the page content.
 */
export function initPage(pageTitleKey, applyPageSpecificTranslations) {
  const updatePageTranslations = () => {
    const pageTitleElement = document.getElementById('pageTitle');
    if (pageTitleElement) {
      pageTitleElement.textContent = getTranslation(pageTitleKey, pageTitleKey);
    }

    if (typeof applyPageSpecificTranslations === 'function') {
      applyPageSpecificTranslations();
    }
  };

  const initializePageShell = () => {
    buildHeader(pageTitleKey);
    updatePageTranslations();

    document.addEventListener('languageChanged', () => {
      log.info(
        `page-template.js: Detected languageChanged event for page with title key: ${pageTitleKey}`
      );
      updatePageTranslations();
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'preferredLanguage') {
        log.info(
          `page-template.js: Detected storage event for preferredLanguage on page: ${pageTitleKey}`
        );
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageShell, { once: true });
  } else {
    initializePageShell();
  }
}

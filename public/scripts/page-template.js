// Alan UI - page-template.js | 20th June 2025, WJW (Refactored for new language system)
import { getTranslation } from './language.js'; // Assuming language.js auto-initializes

/**
 * Builds the standard page header with a translated title and appends it to the body.
 * It also automatically wires up the back button.
 * @param {string} pageTitleKey - The translation key for the page title.
 */
export function buildHeader(pageTitleKey) {
  const translatedTitle = getTranslation(pageTitleKey, pageTitleKey); // Fallback to key if not found

  const headerContainer = document.createElement('div');
  headerContainer.id = 'appBarContainer'; // Give it an ID for potential targeting
  headerContainer.innerHTML = `
    <header id="appBar">
      <button class="back-arrow" aria-label="Go Back">←</button>
      <h1 id="pageTitle">${translatedTitle}</h1>
    </header>
  `;
  // Prepend as the first child of the body
  if (document.body.firstChild) {
    document.body.insertBefore(headerContainer, document.body.firstChild);
  } else {
    document.body.appendChild(headerContainer);
  }

  const backArrow = headerContainer.querySelector('.back-arrow');
  if (backArrow) {
    backArrow.addEventListener('click', () => {
      history.back();
    });
  }
}

/**
 * Initializes a page: builds the header, applies initial translations,
 * and sets up listeners for dynamic language changes.
 * @param {string} pageTitleKey - The translation key for the page title.
 * @param {function} [applyPageSpecificTranslations] - Optional function to apply translations specific to the page content.
 */
export function initPage(pageTitleKey, applyPageSpecificTranslations) {
  // This function will be called after language.js has initialized
  // and potentially loaded the initial language.

  const updatePageTranslations = () => {
    // Update the page title
    const pageTitleElement = document.getElementById('pageTitle');
    if (pageTitleElement) {
      pageTitleElement.textContent = getTranslation(pageTitleKey, pageTitleKey);
    }

    // Apply page-specific translations
    if (typeof applyPageSpecificTranslations === 'function') {
      applyPageSpecificTranslations();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Build the common header (title will be translated by buildHeader using getTranslation)
    buildHeader(pageTitleKey);

    // 2. Apply initial translations for the page content
    // language.js should have loaded initial translations by now.
    updatePageTranslations();

    // 3. Listen for the custom 'languageChanged' event
    document.addEventListener('languageChanged', () => {
      console.log(`page-template.js: Detected languageChanged event for page with title key: ${pageTitleKey}`);
      updatePageTranslations();
    });

    // 4. Listen for storage events (for cross-tab sync, though 'languageChanged' is primary for current tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'preferredLanguage') {
        // The 'languageChanged' event should ideally handle this,
        // but as a fallback or for immediate cross-tab UI update:
        console.log(`page-template.js: Detected storage event for preferredLanguage on page: ${pageTitleKey}`);
        // Note: setLanguage in language.js already re-fetches and dispatches 'languageChanged'.
        // Calling updatePageTranslations() here might be redundant if 'languageChanged' is robustly handled,
        // or could be useful if 'languageChanged' isn't caught for some reason from another tab.
        // For now, let the 'languageChanged' event be the primary trigger.
        // If direct re-translation is needed here without full setLanguage:
        // window.currentTranslations = await loadLanguage(e.newValue); // Requires loadLanguage to be imported
        // updatePageTranslations();
      }
    });
  });
}

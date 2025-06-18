// In the new file: page-template.js

/**
 * Builds the standard page header and appends it to the body.
 * It also automatically wires up the back button.
 * @param {string} title - The title to display in the header.
 */
export function buildHeader(title) {
  // Create a container for the header to avoid adding directly to body
  const headerContainer = document.createElement('div');
  headerContainer.innerHTML = `
    <header id="appBar">
      <button class="back-arrow" aria-label="Go Back">←</button>
      <h1 id="pageTitle">${title}</h1>
    </header>
  `;
  document.body.prepend(headerContainer); // prepends to the top of the body

  // Add back button functionality
  document.querySelector('.back-arrow')?.addEventListener('click', () => {
    history.back();
  });
}

/**
 * Wires up the logic to listen for language changes and apply translations.
 * @param {function} translationFunction - The specific function that updates the text for the current page.
 */
export function initPage(pageTitle, translationFunction) {
  // Wait for the DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Build the common header
    buildHeader(pageTitle);

    // 2. Apply the initial translations
    if (translationFunction && typeof translationFunction === 'function') {
      translationFunction();
    }

    // 3. Listen for future language changes from localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'preferredLanguage' && translationFunction) {
        translationFunction();
      }
    });
  });
}

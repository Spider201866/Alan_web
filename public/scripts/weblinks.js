import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the 'Web Links' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  const introParagraph = document.getElementById('weblinksIntroParagraph');
  if (introParagraph) {
    introParagraph.textContent = getTranslation(
      'weblinksIntro',
      'Here are some interesting links...'
    );
  }
  // Link texts themselves are not translated in this pass, as they are mostly titles/proper nouns.
}

// Using 'linksButton' key which should resolve to "Links" or "Web Links"
// If a different title is needed, a new key like 'pageTitle_weblinks' can be added to JSON files.
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('linksButton', applyPageSpecificTranslations);
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

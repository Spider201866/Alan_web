// Alan UI - aboutalan.js | 14th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

/**
 * Applies all necessary translations to the elements on the 'About Alan' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  // window.currentTranslations should be populated by language.js by the time this is called
  // or when languageChanged event fires.

  document.getElementById('aboutAlanText').innerHTML = getTranslation(
    'aboutAlanText',
    'Default About Alan text if key is missing.'
  );
  document.getElementById('aboutAlanListItem1').textContent = getTranslation(
    'aboutAlanListItem1',
    'Default item 1'
  );
  document.getElementById('aboutAlanListItem2').textContent = getTranslation(
    'aboutAlanListItem2',
    'Default item 2'
  );
  document.getElementById('aboutAlanEfficient').innerHTML = getTranslation(
    'aboutAlanEfficient',
    'Default efficient text'
  );
  document.getElementById('aboutAlanEasy').innerHTML = getTranslation(
    'aboutAlanEasy',
    'Default easy text'
  );
  document.getElementById('aboutAlanExplainable').innerHTML = getTranslation(
    'aboutAlanExplainable',
    'Default explainable text'
  );
  document.getElementById('aboutAlanEncouraging').innerHTML = getTranslation(
    'aboutAlanEncouraging',
    'Default encouraging text'
  );
  document.getElementById('aboutAlanDate').innerHTML = getTranslation(
    'aboutAlanDate',
    'Default date text'
  );
}

// Initialize the page with its title key and its specific translation function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('pageTitle_aboutAlan', applyPageSpecificTranslations);
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

// Logo animation logic is preserved
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var logoImage = document.getElementById('logoImage');
    if (logoImage) {
      logoImage.classList.add('flip-horizontally');
    }
  }, 1000);
});

// Alan UI - aboutalan.js | 16th January 2026, WJW
import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';
import { whenSwReady } from './sw-ready.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

/**
 * Applies all necessary translations to the elements on the 'About Alan' page.
 * This function is passed to the page template initializer to be called at the right time.
 */
function applyPageSpecificTranslations() {
  // window.currentTranslations should be populated by language.js by the time this is called
  // or when languageChanged event fires.

  // Translations contain intentional markup (<br>, <strong>), so use trusted HTML setter.
  setTrustedHtml(
    document.getElementById('aboutAlanText'),
    getTranslation('aboutAlanText', 'Default About Alan text if key is missing.')
  );
  setText('aboutAlanListItem1', 'aboutAlanListItem1', 'Default item 1');
  setText('aboutAlanListItem2', 'aboutAlanListItem2', 'Default item 2');

  setTrustedHtml(
    document.getElementById('aboutAlanEfficient'),
    getTranslation('aboutAlanEfficient', 'Default efficient text')
  );
  setTrustedHtml(
    document.getElementById('aboutAlanEasy'),
    getTranslation('aboutAlanEasy', 'Default easy text')
  );
  setTrustedHtml(
    document.getElementById('aboutAlanExplainable'),
    getTranslation('aboutAlanExplainable', 'Default explainable text')
  );
  setTrustedHtml(
    document.getElementById('aboutAlanEncouraging'),
    getTranslation('aboutAlanEncouraging', 'Default encouraging text')
  );

  setText('aboutAlanDate', 'aboutAlanDate', 'Default date text');
}

// Initialize the page with its title key and its specific translation function
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('pageTitle_aboutAlan', applyPageSpecificTranslations);
    pageHasInitialized = true;
  }
};

whenSwReady(runInitPage);

// Logo animation logic is preserved
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var logoImage = document.getElementById('logoImage');
    if (logoImage) {
      logoImage.classList.add('flip-horizontally');
    }
  }, 1000);
});

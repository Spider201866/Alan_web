import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

// This is the function that knows how to translate THIS specific page
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
initPage('pageTitle_aboutAlan', applyPageSpecificTranslations);

// Logo animation logic is preserved
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var logoImage = document.getElementById('logoImage');
    if (logoImage) {
      logoImage.classList.add('flip-horizontally');
    }
  }, 1000);
});

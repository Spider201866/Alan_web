import { initPage } from './page-template.js';
import { getTranslation } from './language.js';

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
initPage('linksButton', applyPageSpecificTranslations);

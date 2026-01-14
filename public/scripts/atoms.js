// Alan UI - atoms.js | 14th January 2026, WJW
// public/scripts/atoms.js
// Initializes the 'Atoms' page using the standard page template.

import { initPage } from './page-template.js';
// This page has no specific text content to translate beyond the title.
// Using 'atomsButton' key which should resolve to "Atoms".
// If a different title is needed, a new key like 'pageTitle_atoms' can be added to JSON files.
let pageHasInitialized = false;
const runInitPage = () => {
  if (!pageHasInitialized) {
    initPage('atomsButton');
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

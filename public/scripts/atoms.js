// public/scripts/atoms.js
// Initializes the 'Atoms' page using the standard page template.

import { initPage } from './page-template.js';
// This page has no specific text content to translate beyond the title.
// Using 'atomsButton' key which should resolve to "Atoms".
// If a different title is needed, a new key like 'pageTitle_atoms' can be added to JSON files.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_READY') {
      initPage('atomsButton');
    }
  });

  if (navigator.serviceWorker.controller) {
    initPage('atomsButton');
  }
} else {
  initPage('atomsButton');
}

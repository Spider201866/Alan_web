// Alan UI - atoms.js
// public/scripts/atoms.js
// Initializes the 'Atoms' page using the standard page template.

import { initPage } from './page-template.js';
import { whenSwReady } from './sw-ready.js';
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

whenSwReady(runInitPage);

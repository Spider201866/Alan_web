// Alan UI - language-loader.js | 14th January 2026, WJW
// public/scripts/language-loader.js
// Handles the dynamic loading and caching of translation files.

import log from './log.js';

// A simple in-memory cache to avoid re-fetching languages.
const loadedTranslations = {};

/**
 * Asynchronously loads the translation object for a given language code.
 * Fetches the corresponding JSON file from the /translations/ folder.
 * Falls back to English ('en') if the requested language file is not found.
 *
 * @param {string} langCode - The two-letter language code (e.g., 'en', 'es').
 * @returns {Promise<object>} A promise that resolves to the translation object.
 */
export async function loadLanguage(langCode = 'en') {
  // 1. If we already loaded this language, return the cached version instantly.
  if (loadedTranslations[langCode]) {
    return loadedTranslations[langCode];
  }

  // 2. Try to fetch the requested language file.
  try {
    const response = await fetch(`/translations/${langCode}.json`);
    if (!response.ok) {
      // If the file is not found (404), throw an error to trigger the fallback.
      throw new Error(`Translation file for '${langCode}' not found.`);
    }
    const translations = await response.json();
    // Cache the successfully loaded translations.
    loadedTranslations[langCode] = translations;
    return translations;
  } catch (error) {
    log.warn(error.message);
    // 3. If it fails, try to fetch the English fallback (if we're not already trying to load English).
    if (langCode !== 'en') {
      log.info('Falling back to English translation.');
      return await loadLanguage('en'); // This will use the cache if 'en' is already loaded.
    } else {
      // If even English fails, return an empty object to prevent total app failure.
      log.error('Critical: Could not load the English fallback translation file.');
      return {};
    }
  }
}

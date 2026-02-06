// Alan UI - language.js
import { loadLanguage } from './language-loader.js';
import log from './log.js';

// Holds the currently loaded translations
window.currentTranslations = {};
// let currentLangCode = 'en'; // Default language - This variable is unused

/**
 * Sets the application language.
 * Loads the specified language JSON, updates global translations,
 * stores the preference, and dispatches an event.
 * @param {string} langCode - The language code (e.g., 'en', 'es').
 */
export async function setLanguage(langCode) {
  if (!langCode) {
    log.warn('setLanguage called with no langCode, defaulting to English.');
    langCode = 'en';
  }
  try {
    window.currentTranslations = await loadLanguage(langCode);
    // currentLangCode = langCode; // Unused variable
    localStorage.setItem('preferredLanguage', langCode);
    // Dispatch a custom event to notify components that the language has changed
    // and they might need to re-render their translatable text.
    document.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: { langCode, translations: window.currentTranslations },
      })
    );
    log.info(`Language set to: ${langCode}`);
  } catch (error) {
    log.error(`Error setting language to ${langCode}:`, error);
    // Fallback to English if setting the desired language fails catastrophically
    if (langCode !== 'en') {
      log.warn(`Failed to load language "${langCode}". Attempting to fallback to English.`);
      await setLanguage('en'); // Try to load English
    } else {
      // This means 'en' itself failed to load. Do not recall setLanguage('en').
      log.error('CRITICAL: Failed to load English (en.json). Translations will be broken.');
      window.currentTranslations = {}; // Clear potentially stale translations
      // Consider dispatching a specific error event here if UI needs to react
      // document.dispatchEvent(new CustomEvent('criticalTranslationError'));
    }
  }
}

/**
 * Retrieves a translation string for the given key from the currently loaded language.
 * @param {string} key - The key of the translation string.
 * @param {string} [fallbackText] - Optional fallback text if key is not found.
 * @returns {string} The translated string or the key/fallbackText if not found.
 */
export function getTranslation(key, fallbackText = '') {
  if (
    window.currentTranslations &&
    typeof window.currentTranslations === 'object' &&
    key in window.currentTranslations
  ) {
    return window.currentTranslations[key];
  }
  // const activeLang = localStorage.getItem('preferredLanguage') || 'en'; // Get current lang for warning if needed
  // log.warn(`Translation key "${key}" not found for language "${activeLang}". Using fallback.`);
  return fallbackText || key; // Return the key itself if no fallback is provided
}

/**
 * Initializes the language system on application startup.
 * It retrieves the preferred language from local storage or defaults to English,
 * then calls setLanguage to load the appropriate translations.
 */
async function initializeLanguage() {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
  await setLanguage(preferredLanguage);
}

// Initialize the language as soon as the script is loaded.
// This ensures translations are ready early in the page lifecycle.
initializeLanguage().catch((error) => {
  log.error('Error during initial language load:', error);
});

// For convenience, also expose setLanguage and getTranslation on the window object,
// though module imports are preferred.
window.setAppLanguage = setLanguage;
window.getAppTranslation = getTranslation;

log.info('New language.js loaded and initialized.');

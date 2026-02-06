export const LANGUAGE_OPTIONS = [
  { code: 'en', nativeLabel: 'English', englishLabel: 'English' },
  { code: 'zh', nativeLabel: '\u4E2D\u6587', englishLabel: 'Chinese' },
  { code: 'hi', nativeLabel: '\u0939\u093F\u0928\u094D\u0926\u0940', englishLabel: 'Hindi' },
  { code: 'es', nativeLabel: 'Espa\u00F1ol', englishLabel: 'Spanish' },
  { code: 'ar', nativeLabel: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', englishLabel: 'Arabic' },
  { code: 'fr', nativeLabel: 'Fran\u00E7ais', englishLabel: 'French' },
  { code: 'bn', nativeLabel: '\u09AC\u09BE\u0982\u09B2\u09BE', englishLabel: 'Bangla' },
  { code: 'pt', nativeLabel: 'Portugu\u00EAs', englishLabel: 'Portuguese' },
  { code: 'id', nativeLabel: 'Bahasa Indonesia', englishLabel: 'Indonesian' },
  { code: 'sw', nativeLabel: 'Kiswahili', englishLabel: 'Swahili' },
  { code: 'ur', nativeLabel: '\u0627\u0631\u062F\u0648', englishLabel: 'Urdu' },
  { code: 'fa', nativeLabel: '\u0641\u0627\u0631\u0633\u06CC', englishLabel: 'Persian' },
  { code: 'ln', nativeLabel: 'Lingala', englishLabel: 'Lingala' },
  { code: 'ha', nativeLabel: 'Hausa', englishLabel: 'Hausa' },
  { code: 'yo', nativeLabel: 'Yor\u00F9b\u00E1', englishLabel: 'Yoruba' },
  { code: 'ig', nativeLabel: 'Igbo', englishLabel: 'Igbo' },
  { code: 'zu', nativeLabel: 'Zulu', englishLabel: 'Zulu' },
  { code: 'am', nativeLabel: '\u12A0\u121B\u122D\u129B', englishLabel: 'Amharic' },
  { code: 'sn', nativeLabel: 'chiShona', englishLabel: 'Shona' },
  { code: 'rw', nativeLabel: 'Ikinyarwanda', englishLabel: 'Kinyarwanda' },
  { code: 'ny', nativeLabel: 'Chichewa', englishLabel: 'Chichewa' },
  { code: 'cy', nativeLabel: 'Cymraeg', englishLabel: 'Welsh' },
];

/**
 * Populates a language list container with canonical language options.
 * If the container is already populated, no changes are made.
 * @param {HTMLElement|null} listEl
 * @param {{addRoleOption?: boolean}} [options]
 */
export function renderLanguageOptions(listEl, options = {}) {
  if (!listEl || listEl.children.length > 0) return;
  const { addRoleOption = false } = options;
  const fragment = document.createDocumentFragment();

  LANGUAGE_OPTIONS.forEach((lang) => {
    const li = document.createElement('li');
    li.setAttribute('data-value', lang.code);
    if (addRoleOption) li.setAttribute('role', 'option');

    const strong = document.createElement('strong');
    strong.textContent = lang.nativeLabel;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(` (${lang.englishLabel})`));
    fragment.appendChild(li);
  });

  listEl.appendChild(fragment);
}

export function getLanguageSelectorPreview() {
  const previewCodes = ['zh', 'hi', 'es', 'ar', 'fr'];
  const preview = LANGUAGE_OPTIONS.filter((lang) => previewCodes.includes(lang.code)).map(
    (lang) => lang.nativeLabel
  );
  return `${preview.join(', ')}...`;
}

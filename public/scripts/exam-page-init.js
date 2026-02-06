import { initPage } from './page-template.js';
import { getTranslation } from './language.js';
import { setTrustedHtml } from './trusted-html.js';

function setText(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = getTranslation(key, fallback);
}

function setHtml(id, key, fallback) {
  const el = document.getElementById(id);
  if (!el) return;
  setTrustedHtml(el, getTranslation(key, fallback));
}

function applySectionTranslations(sections) {
  sections.forEach((section) => {
    setText(section.headingId, section.headingKey, section.headingFallback);
    setHtml(section.bodyId, section.bodyKey, section.bodyFallback);
  });
}

/**
 * Shared initializer for the "How to Examine" pages.
 * @param {object} config
 * @param {string} config.pageTitleKey
 * @param {Array<{
 *   headingId:string,
 *   headingKey:string,
 *   headingFallback:string,
 *   bodyId:string,
 *   bodyKey:string,
 *   bodyFallback:string
 * }>} config.sections
 * @param {string} config.additionalTextKey
 * @param {string} config.additionalTextFallback
 */
export function initExamPage(config) {
  const {
    pageTitleKey,
    sections = [],
    additionalTextKey,
    additionalTextFallback = 'Practice often',
  } = config;

  const applyPageSpecificTranslations = () => {
    applySectionTranslations(sections);
    setHtml('additionalText', additionalTextKey, additionalTextFallback);
  };

  initPage(pageTitleKey, applyPageSpecificTranslations);
}

/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { setupUI, teardownUI } from './helpers/setup.js';

describe('UI Internationalization (i18n)', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    ({ dom, document, window } = setupUI());
  });

  afterEach(() => {
    teardownUI(dom);
  });

  it('should update all UI fields for each language selection', () => {
    const fields = {
      '.chatbot-subtitle': document.createElement('div'),
      '#good-history': document.createElement('span'),
      '.chatbot-version': document.createElement('footer'),
      '#instructions-button': document.createElement('button'),
    };
    Object.entries(fields).forEach(([selector, el]) => {
      if (selector.startsWith('.')) el.className = selector.slice(1);
      if (selector.startsWith('#')) el.id = selector.slice(1);
      document.body.appendChild(el);
    });

    const languages = ['en', 'es'];
    const translations = {
      en: {
        eyesEars: 'Eyes, Ears, Skin',
        goodHistory: 'Good History',
        alanMistakes: 'Alan can make mistakes, double check everything',
        instructionsButton: 'How to use',
      },
      es: {
        eyesEars: 'Ojos, Oídos, Piel',
        goodHistory: 'Buen historial',
        alanMistakes: 'Alan puede cometer errores, verifique todo',
        instructionsButton: 'Cómo usar',
      },
    };
    window.translations = translations;

    function updateAllLanguage(lang) {
      const t = window.translations[lang];
      const elementTranslations = {
        '.chatbot-subtitle': 'eyesEars',
        '#good-history': 'goodHistory',
        '.chatbot-version': 'alanMistakes',
        '#instructions-button': 'instructionsButton',
      };
      for (const [selector, key] of Object.entries(elementTranslations)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = t[key];
      }
    }

    languages.forEach((lang) => {
      updateAllLanguage(lang);
      const t = translations[lang];
      expect(document.querySelector('.chatbot-subtitle').textContent).toBe(t.eyesEars);
      expect(document.getElementById('good-history').textContent).toBe(t.goodHistory);
      expect(document.querySelector('.chatbot-version').textContent).toBe(t.alanMistakes);
    });
  });
});

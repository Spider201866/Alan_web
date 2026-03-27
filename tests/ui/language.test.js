/* eslint-env jest */

import { jest } from '@jest/globals';
import { JSDOM } from 'jsdom';

const flushLanguageInit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('language startup', () => {
  let dom;

  beforeEach(() => {
    jest.resetModules();
    dom = new JSDOM('<body></body>', { url: 'https://alan.up.railway.app/' });
    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;
    global.CustomEvent = dom.window.CustomEvent;
    document.dispatchEvent = jest.fn();
    window.currentTranslations = {};
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({}),
    }));
  });

  afterEach(() => {
    delete window.currentTranslations;
    delete global.fetch;
    delete global.CustomEvent;
    delete global.localStorage;
    delete global.document;
    delete global.window;
    dom.window.close();
  });

  it('prefers a supported lang query parameter over stored language', async () => {
    localStorage.setItem('preferredLanguage', 'en');
    window.history.replaceState({}, '', '/?lang=id');

    const { resolveInitialLanguage } = await import('../../public/scripts/language.js');
    await flushLanguageInit();

    expect(resolveInitialLanguage()).toBe('id');
    expect(localStorage.getItem('preferredLanguage')).toBe('id');
    expect(fetch).toHaveBeenCalledWith('/translations/id.json');
  });

  it('ignores unsupported lang query parameters and falls back to stored language', async () => {
    localStorage.setItem('preferredLanguage', 'ny');
    window.history.replaceState({}, '', '/?lang=unknown');

    const { getUrlLanguageOverride, resolveInitialLanguage } = await import(
      '../../public/scripts/language.js'
    );
    await flushLanguageInit();

    expect(getUrlLanguageOverride()).toBeNull();
    expect(resolveInitialLanguage()).toBe('ny');
    expect(localStorage.getItem('preferredLanguage')).toBe('ny');
    expect(fetch).toHaveBeenCalledWith('/translations/ny.json');
  });
});

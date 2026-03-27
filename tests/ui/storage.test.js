/* eslint-env jest */

import { JSDOM } from 'jsdom';

describe('storage helpers', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM('<body></body>', { url: 'https://alan.up.railway.app/home.html' });
    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.localStorage;
  });

  it('replaceSessionId stores a fresh session id', async () => {
    const { replaceSessionId } = await import('../../public/scripts/storage.js');

    localStorage.setItem('sessionId', 'user-old');

    const nextSessionId = replaceSessionId();

    expect(nextSessionId).toMatch(/^user-\d+$/);
    expect(nextSessionId).not.toBe('user-old');
    expect(localStorage.getItem('sessionId')).toBe(nextSessionId);
  });
});

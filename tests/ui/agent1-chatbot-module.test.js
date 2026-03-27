/* eslint-env jest */

import { JSDOM } from 'jsdom';

describe('agent1 chatbot module', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM('<body></body>', { url: 'https://alan.up.railway.app/home.html' });
    global.window = dom.window;
    global.document = dom.window.document;
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  it('passes the session id via chatflowConfig for flowise-embed', async () => {
    const { buildChatbotInitConfig } = await import('../../public/scripts/agent1-chatbot-module.js');

    const config = buildChatbotInitConfig('session-123');

    expect(config.apiHost).toBe(`${window.location.origin}/flowise`);
    expect(config.chatflowConfig).toEqual({ sessionId: 'session-123' });
    expect(config).not.toHaveProperty('sessionId');
  });
});

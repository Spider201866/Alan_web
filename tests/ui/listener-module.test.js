/* eslint-env jest */

import { __testOnly as listenerTestOnly } from '../../public/scripts/listener-module.js';

describe('listener-module', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('falls back to latest session when current session lookup fails', () => {
    const sessions = [{ id: 1, messages: [] }];
    sessions.find = () => undefined;

    const history = { sessionCounter: 1, sessions };
    listenerTestOnly.setState({ history, currentId: 1 });

    expect(() => {
      listenerTestOnly.saveMessage('user', 'Hello');
    }).not.toThrow();

    expect(history.sessions[0].messages).toHaveLength(1);
    expect(history.sessions[0].messages[0]).toEqual({ role: 'user', text: 'Hello' });
  });

  it('applies accessibility labels to Flowise icon-only controls', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <button type="button" class="py-2" buttoncolor="#000000"></button>
      <button type="button" class="py-2" sendbuttoncolor="#000000"></button>
      <a id="lite-badge" class="lite-badge" href="https://flowiseai.com"></a>
    `;

    listenerTestOnly.applyFlowiseAccessibilityLabels(root);

    const attachBtn = root.querySelector('button[buttoncolor]');
    const sendBtn = root.querySelector('button[sendbuttoncolor]');
    const badge = root.querySelector('#lite-badge');

    expect(attachBtn.getAttribute('aria-label')).toBe('Attach file');
    expect(sendBtn.getAttribute('aria-label')).toBe('Send message');
    expect(badge.getAttribute('aria-label')).toBe('Powered by Flowise');
  });
});

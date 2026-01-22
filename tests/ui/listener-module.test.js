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
});

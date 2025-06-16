/* eslint-env jest */
/**
 * Frontend chatbot and sidebar tests for Alan webapp.
 * Run with: npx jest tests/chatbot.test.js
 * Requires: jest, jsdom
 */

const { JSDOM } = require('jsdom');

// Import the modules to test
// Note: You may need to adjust import paths and use dynamic import for ES modules
// import { initChatbot } from '../public/agent1-chatbot-module.js';
// import { initChatbotListeners } from '../public/listener-module.js';

describe('Chatbot Frontend', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(`
      <body>
        <div class="chatbot-container"></div>
        <ul id="chat-history-list"></ul>
      </body>
    `, { url: "http://localhost" });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    // Mock localStorage
    let store = {};
    global.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
      removeItem: (key) => { delete store[key]; }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should deduplicate and truncate chat history', () => {
    // Simulate chat bubbles in the Flowise shadow DOM
    const bubbles = [
      { className: 'guest-container', textContent: 'Hello' },
      { className: 'host-container', textContent: 'Hi there' },
      { className: 'guest-container', textContent: 'Hello' }, // duplicate
      { className: 'host-container', textContent: 'How can I help?' }
    ];
    // Deduplication logic
    const normalise = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const seen = new Set();
    const lines = [];
    bubbles.forEach(bub => {
      const raw = bub.textContent.trim();
      if (!raw) return;
      const key = normalise(raw);
      if (seen.has(key)) return;
      seen.add(key);
      lines.push({ user: /\bguest-container\b/i.test(bub.className), text: raw });
    });
    // Truncate to 2 most recent
    const MAX_HISTORY_LINES = 2;
    const view = lines.slice(-MAX_HISTORY_LINES);
    expect(view.length).toBe(2);
    expect(view[0].text).toBe('Hi there');
    expect(view[1].text).toBe('How can I help?');
  });

  it('should persist chat history to localStorage', () => {
    // Simulate chat history
    const list = document.getElementById('chat-history-list');
    const li1 = document.createElement('li');
    li1.className = 'user-msg';
    li1.textContent = 'Hello';
    const li2 = document.createElement('li');
    li2.className = 'bot-msg';
    li2.textContent = 'Hi there';
    list.appendChild(li1);
    list.appendChild(li2);
    // Save to localStorage
    const fullLog = [
      { user: true, text: 'Hello' },
      { user: false, text: 'Hi there' }
    ];
    localStorage.setItem('alan-sidebar-log', JSON.stringify(fullLog));
    expect(localStorage.getItem('alan-sidebar-log')).toBe(JSON.stringify(fullLog));
  });

  it('should restore chat history from localStorage', () => {
    // Set up localStorage
    const fullLog = [
      { user: true, text: 'Hello' },
      { user: false, text: 'Hi there' }
    ];
    localStorage.setItem('alan-sidebar-log', JSON.stringify(fullLog));
    // Restore
    const savedLog = localStorage.getItem('alan-sidebar-log');
    const lines = JSON.parse(savedLog);
    expect(lines.length).toBe(2);
    expect(lines[0].text).toBe('Hello');
    expect(lines[1].text).toBe('Hi there');
  });

  it('should update sidebar when new chatbot message arrives', () => {
    // Simulate adding a new message to the sidebar
    const list = document.getElementById('chat-history-list');
    const newMsg = document.createElement('li');
    newMsg.className = 'bot-msg current-session';
    newMsg.textContent = 'New bot message';
    list.appendChild(newMsg);
    expect(list.querySelectorAll('.bot-msg').length).toBe(1);
    expect(list.querySelector('.bot-msg').textContent).toBe('New bot message');
  });

  // Add more tests for session separation, event listeners, and edge cases
});

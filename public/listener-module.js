// listener-module.js
// Builds a persistent, duplicate-free chat history log in the sidebar,
// parses diagnoses, and manages image-site buttons.

export let imagesButtonClicked = false;

// --- SETTINGS ---
const MAX_HISTORY_LINES = 100;
const MAX_SNIPPET_WORDS = 35;
const STORAGE_KEY = 'alan-sidebar-log';
const normalise = s => s.replace(/\s+/g, ' ').trim().toLowerCase();

// --- 1. INITIALIZE OBSERVERS & LOAD HISTORY ---
export function initChatbotListeners() {
  loadPreviousHistory();

  setTimeout(() => {
    const host = document.querySelector('flowise-fullchatbot');
    if (!host) { console.error('Flowise host not found'); return; }
    const root = host.shadowRoot;
    if (!root) { console.error('Cannot access Flowise shadow root'); return; }

    new MutationObserver(() => requestAnimationFrame(syncSidebar))
      .observe(root, { childList: true, subtree: true });

    syncSidebar();
  }, 700);
}

// --- 2. SYNC CURRENT CHAT TO SIDEBAR ---
function syncSidebar() {
  const list = document.getElementById('chat-history-list');
  if (!list) return;

  list.querySelectorAll('.current-session').forEach(el => el.remove());

  const bubbles = [...document.querySelector('flowise-fullchatbot').shadowRoot.querySelectorAll('[class*="guest-container"],[class*="host-container"]')];
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

  const view = lines.slice(-MAX_HISTORY_LINES);
  view.forEach(({ user, text }) => {
    const li = document.createElement('li');
    li.className = (user ? 'user-msg' : 'bot-msg') + ' current-session';
    li.textContent = truncate(text, MAX_SNIPPET_WORDS);
    list.appendChild(li);
  });

  list.parentElement.scrollTop = list.parentElement.scrollHeight;

  const lastBot = [...view].reverse().find(l => !l.user);
  if (lastBot && /good luck!/i.test(lastBot.text)) parseDiagnosis(lastBot.text);
}

// --- 3. LOAD & SAVE HISTORY LOG ---
function loadPreviousHistory() {
  const list = document.getElementById('chat-history-list');
  if (!list) return;

  const savedLog = localStorage.getItem(STORAGE_KEY);
  if (!savedLog) return;

  try {
    const lines = JSON.parse(savedLog);
    if (!lines || lines.length === 0) return;

    lines.forEach(({ user, text }) => {
      const li = document.createElement('li');
      li.className = user ? 'user-msg' : 'bot-msg';
      li.textContent = text;
      list.appendChild(li);
    });

    if (lines.length > 0) {
      const separator = document.createElement('li');
      separator.textContent = '--- New Session ---';
      separator.style.cssText = 'text-align:center; color: #999; font-size:10px; margin: 5px 0; font-style:italic;';
      list.appendChild(separator);
    }
  } catch (e) {
    console.error("Could not parse saved chat history:", e);
    localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
  }
}

function saveFullHistory() {
  const list = document.getElementById('chat-history-list');
  if (!list) return;

  const allListItems = [...list.querySelectorAll('.user-msg, .bot-msg')];
  if (allListItems.length === 0) {
    // If the list is empty, make sure we clear storage
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  
  const fullLog = allListItems.map(li => ({
    user: li.classList.contains('user-msg'),
    text: li.textContent
  }));

  console.log('Saving history to localStorage...', fullLog.length, 'lines'); // For debugging
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fullLog.slice(-MAX_HISTORY_LINES)));
}

// --- 4. PARSE DIAGNOSIS & CREATE BUTTONS ---
// --- 4. PARSE DIAGNOSIS & CREATE BUTTONS ---
function parseDiagnosis() {
  // TODO: Implement diagnosis parsing logic
}

// --- 5. IMAGE-SITE BUTTONS ---


// --- 6. MAIN "IMAGES" BUTTON TOGGLE ---
export function attachImagesButton() {
  // TODO: Implement images button logic
}

// --- 7. HELPERS & INITIALIZER ---
function truncate(msg, maxWords) {
  const words = msg.split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '…' : msg;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('listener-module ready');
  initChatbotListeners();



  
  // ** REPLACED with more reliable events **
  // This saves when the user switches tabs or closes the page.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveFullHistory();
    }
  });

  // This is a final fallback for older browsers or specific closing methods.
  window.addEventListener('pagehide', saveFullHistory, false);
});

/* listener-module.js  •  20 Jun 2025
   ─────────────────────────────────────────────────────────────────────────
   Persistent chat history with collapsible, numbered sessions.
   • New session on page load or when Flowise “Reset Chat” is clicked.
   • Strong de-duplication:
        - identical text from the same role is never saved twice
        - streaming bot chunks are merged into a single final line
   • All data in browser localStorage (key: alan-chat-history-v2).
   ----------------------------------------------------------------------- */

export let imagesButtonClicked = false;

/* ── helpers ───────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'alan-chat-history-v2';
const normalise = s => s
  .replace(/[.,;!?]/g, '')       // strip punctuation everywhere
  .replace(/\s+/g, ' ')          // collapse whitespace
  .replace(/\n/g, ' ')           // remove line breaks
  .trim()
  .toLowerCase();

/* ── load / seed history, create fresh session ────────────────────────── */
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
if (!history.sessions) history = { sessionCounter: 0, sessions: [] };

history.sessionCounter += 1;
let CURRENT_ID = history.sessionCounter;
history.sessions.push({ id: CURRENT_ID, messages: [] });
localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

console.log('%c[History] ready', 'color:#0b0', history);

/*  keeps duplicates out for the lifetime of THIS session only  */
let storedKeys = new Set();

/* ── bootstrap once DOM is ready ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  attachFlowiseObservers();
});

/* ── watch Flowise shadow DOM ──────────────────────────────────────────── */
function attachFlowiseObservers() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host) { console.error('[Flowise] host not found'); return; }
  const root = host.shadowRoot;
  if (!root) { console.error('[Flowise] cannot access shadow root'); return; }

  /* observe message bubbles */
  new MutationObserver(handleBubbleChanges)
    .observe(root, { childList: true, subtree: true });
  handleBubbleChanges();                    // initial scan

  /* hook the “Reset Chat” button */
  const hookResetButton = () => {
    const btn = root.querySelector('button[title="Reset Chat"]');
    if (btn && !btn.dataset.historyHooked) {
      btn.dataset.historyHooked = 'true';
      btn.addEventListener('click', () => {
        console.log('%c[Reset] click detected', 'color:#f90');
        startNewSession();
      });
      console.log('%c[Reset] button hooked', 'color:#09c');
    }
  };
  hookResetButton();
  new MutationObserver(hookResetButton)
    .observe(root, { childList: true, subtree: true });
}

/* ── scan bubbles, store new messages ──────────────────────────────────── */
function handleBubbleChanges() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host) return;

  const bubbles = [
    ...host.shadowRoot.querySelectorAll(
      '[class*="guest-container"],[class*="host-container"]'
    )
  ];

  bubbles.forEach(bub => {
    const raw = bub.textContent.trim();
    if (!raw) return;

    const role = /\bguest-container\b/i.test(bub.className) ? 'user' : 'bot';
    saveMessage(role, raw);
  });
}

/* ── start a new session ──────────────────────────────────────────────── */
function startNewSession() {
  history.sessionCounter += 1;
  CURRENT_ID = history.sessionCounter;
  history.sessions.push({ id: CURRENT_ID, messages: [] });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

  storedKeys = new Set();                  // reset duplicate map

  console.log('%c[Session] started --' + CURRENT_ID + '--', 'color:#0af');

  const side = document.getElementById('chatHistorySidebar');
  if (side) {
    const header   = document.createElement('div');
    header.className = 'session-header';
    header.textContent = `--${CURRENT_ID}--`;

    const container = document.createElement('div');
    container.id = `session-${CURRENT_ID}`;
    container.className = 'session-content';

    side.appendChild(header);
    side.appendChild(container);

    header.addEventListener('click', () => {
      container.style.display =
        container.style.display === 'none' ? 'block' : 'none';
    });

    header.scrollIntoView({ block: 'nearest' });
  }
}

/* ── save message, stop all remaining duplicates ──────────────────────── */
function saveMessage(role, text) {
  const session = history.sessions[history.sessions.length - 1];
  const last    = session.messages[session.messages.length - 1];
  const norm    = normalise(text);

  /* skip if exact text already stored for this session/role */
  if (storedKeys.has(role + '|' + norm)) {
    return;
  }

  /* merge streaming bot chunks (extension of previous line) */
  if (role === 'bot' && last && last.role === 'bot') {
    const prevNorm = normalise(last.text);
    if (prevNorm.startsWith(norm) || norm.startsWith(prevNorm)) {
      const better = text.length > last.text.length ? text : last.text;
      last.text = better;

      const cont = document.getElementById(`session-${CURRENT_ID}`);
      if (cont && cont.lastChild) cont.lastChild.textContent = better;

      storedKeys.add(role + '|' + normalise(better));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return;
    }
  }

  /* store as brand-new line */
  session.messages.push({ role, text });
  storedKeys.add(role + '|' + norm);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  appendLineToSidebar(CURRENT_ID, role, text);
}

/* ── sidebar helpers ───────────────────────────────────────────────────── */
function renderSidebar() {
  const side = document.getElementById('chatHistorySidebar');
  if (!side) return;
  side.innerHTML = '';

  history.sessions.forEach(sess => {
    /* header */
    const header = document.createElement('div');
    header.className = 'session-header';
    header.textContent = `--${sess.id}--`;

    /* container */
    const container = document.createElement('div');
    container.id = `session-${sess.id}`;
    container.className = 'session-content';
    if (sess.id !== CURRENT_ID) container.style.display = 'none';

    sess.messages.forEach(m => appendLine(container, m.role, m.text));

    header.addEventListener('click', () => {
      container.style.display =
        container.style.display === 'none' ? 'block' : 'none';
    });

    side.appendChild(header);
    side.appendChild(container);

    /* repopulate storedKeys for current session (after hard reload) */
    if (sess.id === CURRENT_ID) {
      sess.messages.forEach(m => {
        storedKeys.add(m.role + '|' + normalise(m.text));
      });
    }
  });
}

function appendLineToSidebar(id, role, text) {
  const container = document.getElementById(`session-${id}`);
  if (container) appendLine(container, role, text);
}

function appendLine(container, role, text) {
  const line = document.createElement('div');
  line.className = `history-message ${role}`;
  line.textContent = text;
  container.appendChild(line);
}

/* ── placeholder used elsewhere ───────────────────────────────────────── */
export function attachImagesButton() { /* no-op */ }

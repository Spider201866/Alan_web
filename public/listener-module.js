/* listener-module.js  •  21 Jun 2025
   ─────────────────────────────────────────────────────────────────────────
   Persistent chat history with collapsible, numbered sessions.
   • New session on page-load or when Flowise “Reset Chat” is pressed.
   • Strong de-duplication:
        ¬ identical text from the same role never stored twice
        ¬ streaming bot chunks merged into one final line
   • Each session bubble shows a small copy icon (bottom-right):
        ¬ click copies that session’s text to the clipboard.
   • All data lives only in browser localStorage (key alan-chat-history-v2).
   ----------------------------------------------------------------------- */

export let imagesButtonClicked = false;

/* ── constants & helpers ──────────────────────────────────────────────── */
const STORAGE_KEY = 'alan-chat-history-v2';
const normalise = s => s
  .replace(/[.,;!?]/g, '')
  .replace(/\s+/g, ' ')
  .replace(/\n/g, ' ')
  .trim()
  .toLowerCase();

/* add copy button inside a just-created session container */
/* add copy button inside a just-created session container */
function makeCopyButton(container, sess) {
  // use a Font Awesome icon instead of a base-64 SVG
  const btn = document.createElement('i');
  btn.className = 'fa-regular fa-copy copy-btn';   // FA5/6 regular style
  btn.title = 'Copy this session';

  btn.addEventListener('click', ev => {
    ev.stopPropagation();                          // don’t toggle collapse
    const text = sess.messages.map(m => m.text).join('\n');
    navigator.clipboard.writeText(text)
      .then(() => {
        btn.style.opacity = '1';
        setTimeout(() => (btn.style.opacity = '.55'), 600);
      })
      .catch(() => alert('Copy failed'));
  });

  container.appendChild(btn);
}


/* ── initialise history (or seed) ─────────────────────────────────────── */
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
if (!history.sessions) history = { sessionCounter: 0, sessions: [] };

history.sessionCounter += 1;
let CURRENT_ID = history.sessionCounter;
history.sessions.push({ id: CURRENT_ID, messages: [] });
localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
console.log('%c[History] ready', 'color:#0b0', history);

let storedKeys = new Set();                // duplicate filter for this session

/* ── bootstrap when DOM loaded ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  attachFlowiseObservers();
});

/* ── observe Flowise ──────────────────────────────────────────────────── */
function attachFlowiseObservers() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host) { console.error('[Flowise] host not found'); return; }
  const root = host.shadowRoot;
  if (!root) { console.error('[Flowise] cannot access shadow root'); return; }

  /* bubbles */
  new MutationObserver(handleBubbleChanges)
    .observe(root, { childList: true, subtree: true });
  handleBubbleChanges();

  /* Reset-chat button */
  const hookReset = () => {
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
  hookReset();
  new MutationObserver(hookReset).observe(root, { childList: true, subtree: true });
}

/* ── bubble scan ───────────────────────────────────────────────────────── */
function handleBubbleChanges() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host) return;

  host.shadowRoot
      .querySelectorAll('[class*="guest-container"],[class*="host-container"]')
      .forEach(bub => {
        const raw = bub.textContent.trim();
        if (!raw) return;
        const role = /\bguest-container\b/i.test(bub.className) ? 'user' : 'bot';
        saveMessage(role, raw);
      });
}

/* ── new session ───────────────────────────────────────────────────────── */
function startNewSession() {
  history.sessionCounter += 1;
  CURRENT_ID = history.sessionCounter;
  const sess = { id: CURRENT_ID, messages: [] };
  history.sessions.push(sess);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

  storedKeys = new Set();

  console.log('%c[Session] started --' + CURRENT_ID + '--', 'color:#0af');

  const side = document.getElementById('chatHistorySidebar');
  if (!side) return;

  const header = document.createElement('div');
  header.className = 'session-header';
  header.textContent = `--${CURRENT_ID}--`;

  const container = document.createElement('div');
  container.id = `session-${CURRENT_ID}`;
  container.className = 'session-content';
  makeCopyButton(container, sess);

  header.addEventListener('click', () => {
    container.style.display =
      container.style.display === 'none' ? 'block' : 'none';
  });

  side.appendChild(header);
  side.appendChild(container);
  header.scrollIntoView({ block: 'nearest' });
}

/* ── save / merge / de-dupe ───────────────────────────────────────────── */
function saveMessage(role, text) {
  const sess = history.sessions[history.sessions.length - 1];
  const last = sess.messages[sess.messages.length - 1];
  const norm = normalise(text);

  if (storedKeys.has(role + '|' + norm)) return;            // exact dup

  /* merge streaming bot chunks */
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

  /* new line */
  sess.messages.push({ role, text });
  storedKeys.add(role + '|' + norm);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  appendLineToSidebar(CURRENT_ID, role, text);
}

/* ── sidebar rendering ────────────────────────────────────────────────── */
function renderSidebar() {
  const side = document.getElementById('chatHistorySidebar');
  if (!side) return;
  side.innerHTML = '';

  history.sessions.forEach(sess => {
    const header = document.createElement('div');
    header.className = 'session-header';
    header.textContent = `--${sess.id}--`;

    const container = document.createElement('div');
    container.id = `session-${sess.id}`;
    container.className = 'session-content';
    if (sess.id !== CURRENT_ID) container.style.display = 'none';

    makeCopyButton(container, sess);
    sess.messages.forEach(m => appendLine(container, m.role, m.text));

    header.addEventListener('click', () => {
      container.style.display =
        container.style.display === 'none' ? 'block' : 'none';
    });

    side.appendChild(header);
    side.appendChild(container);

    if (sess.id === CURRENT_ID)
      sess.messages.forEach(m => storedKeys.add(m.role + '|' + normalise(m.text)));
  });
}

function appendLineToSidebar(id, role, text) {
  const cont = document.getElementById(`session-${id}`);
  if (cont) appendLine(cont, role, text);
}

function appendLine(cont, role, text) {
  const line = document.createElement('div');
  line.className = `history-message ${role}`;
  line.textContent = text;
  cont.appendChild(line);
}

/* exported helpers for external modules */
export function attachImagesButton() {}
export function resetSidebarHistory() {
  history    = { sessionCounter: 0, sessions: [] };
  CURRENT_ID = 0;
  storedKeys = new Set();
}

// listener-module.js
// =======================================================
// Builds a tidy, duplicate-free text history for Flowise,
// spots ‘Good luck!’ diagnoses, and toggles three image-site
// buttons.  Written in ES6.
// =======================================================

export let imagesButtonClicked = false;

// ────────────────────────────────────────────────────────
// settings
// ────────────────────────────────────────────────────────
const MAX_HISTORY_LINES = 50;      // rows to keep
const MAX_SNIPPET_WORDS = 35;      // truncate long lines

const normalise = s => s.replace(/\s+/g, ' ').trim().toLowerCase();

// ────────────────────────────────────────────────────────
// 1  start observers
// ────────────────────────────────────────────────────────
export function initChatbotListeners () {
  setTimeout(() => {
    const host = document.querySelector('flowise-fullchatbot');
    if (!host)  { console.error('Flowise host not found'); return; }
    const root = host.shadowRoot;
    if (!root)  { console.error('Cannot access Flowise shadow root'); return; }

    /* rebuild once per animation frame */
    const rebuild = () => requestAnimationFrame(syncSidebar);
    new MutationObserver(rebuild).observe(root, { childList: true, subtree: true });

    syncSidebar();                       // first draw
  }, 700);
}

// ────────────────────────────────────────────────────────
// 2  rebuild history sidebar
// ────────────────────────────────────────────────────────
function syncSidebar () {
  const list = document.getElementById('chat-history-list');
  if (!list) return;

  const bubbles = [
    ...document
      .querySelector('flowise-fullchatbot')
      .shadowRoot.querySelectorAll('[class*="guest-container"],[class*="host-container"]')
  ];

  const seen  = new Set();
  const lines = [];

  bubbles.forEach(bub => {
    const raw = bub.textContent.trim();
    if (!raw) return;

    const key = normalise(raw);
    if (seen.has(key)) return;
    seen.add(key);

    const user = /\bguest-container\b/i.test(bub.className);
    lines.push({ user, text: raw });
  });

  const view = lines.slice(-MAX_HISTORY_LINES);

  list.innerHTML = '';
  view.forEach(({ user, text }) => {
    const snippet = truncate(text, MAX_SNIPPET_WORDS);
    const li = document.createElement('li');
    li.className   = user ? 'user-msg' : 'bot-msg';
    li.textContent = snippet;
    list.appendChild(li);
  });

  list.parentElement.scrollTop = list.parentElement.scrollHeight;

  const lastBot = [...view].reverse().find(l => !l.user);
  if (lastBot && /good luck!/i.test(lastBot.text)) parseDiagnosis(lastBot.text);
}

// ────────────────────────────────────────────────────────
// 3  helpers
// ────────────────────────────────────────────────────────
function truncate (msg, maxWords) {
  const w = msg.split(/\s+/);
  return w.length > maxWords ? w.slice(0, maxWords).join(' ') + '…' : msg;
}

// ────────────────────────────────────────────────────────
// 4  parse “… is most likely … Good luck!”
// ────────────────────────────────────────────────────────
function parseDiagnosis (txt) {
  const trimmed = txt.split(/good luck!/i)[0].trim();

  const line = trimmed.split('\n')
    .map(s => s.trim())
    .filter(Boolean)
    .reverse()
    .find(s => /is most likely/i.test(s));
  if (!line) return;

  const condition = line.split(/is most likely/i)[0].trim().replace(/\.$/, '');
  if (!condition) return;

  removeChatEndButtons();
  createButtons(condition);
}

// ────────────────────────────────────────────────────────
// 5  image-site buttons
// ────────────────────────────────────────────────────────
function createButtons (condition) {
  if (document.getElementById('chat-end-buttons')) return;

  const box = document.createElement('div');
  box.id = 'chat-end-buttons';
  Object.assign(box.style, {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    marginTop:     '-20px',
    marginBottom:   '35px',
    transition:     'margin-top .3s'
  });

  const head = document.createElement('div');
  head.innerHTML = condition
    ? `Find <strong>${condition}</strong> images on these sites`
    : 'Find images on these sites';
  head.style.cssText = 'font-size:14px;margin-bottom:10px';
  box.appendChild(head);

  const row = document.createElement('div');
  row.style.cssText =
    'display:flex;flex-wrap:wrap;justify-content:center;gap:15px';

  const make = (label, color, url) => {
    const b = document.createElement('button');
    b.style.cssText =
      `background:${color};color:black;font-size:14px;border:2px solid black;padding:6px 10px`;
    b.textContent = label;
    b.onclick = () => window.open(url, '_blank');
    return b;
  };

  row.appendChild(make('Ophthalmology', 'rgb(134,162,255)', 'https://eyewiki.org/Main_Page'));
  row.appendChild(make('ENT',           'rgb(133,255,133)', 'https://www.otoscape.com/image-atlas.html'));
  row.appendChild(make('Dermatology',   '#efafff',          'https://dermnetnz.org/images'));
  box.appendChild(row);

  (document.querySelector('.chatbot-version')?.parentNode || document.body)
    .insertBefore(box, document.querySelector('.chatbot-version') || null);

  setTimeout(() => {
    if (box.getBoundingClientRect().bottom > innerHeight) box.style.marginTop = '0';
  }, 100);
}

function removeChatEndButtons () {
  document.getElementById('chat-end-buttons')?.remove();
}

// ────────────────────────────────────────────────────────
// 6  “Images” toggle
// ────────────────────────────────────────────────────────
export function attachImagesButton () {
  const btn = document.getElementById('images');
  if (!btn) { console.warn('Images button (#images) not found'); return; }

  btn.addEventListener('click', () => {
    if (document.getElementById('chat-end-buttons')) {
      removeChatEndButtons();
      imagesButtonClicked = false;
    } else {
      imagesButtonClicked = true;
      removeChatEndButtons();
      createButtons('');
    }
  });
}

// ────────────────────────────────────────────────────────
// 7  ready
// ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  console.log('listener-module ready');
  initChatbotListeners();
});

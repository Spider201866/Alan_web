// listener-module.js
// Builds a duplicate-free chat history, parses diagnoses, and manages image-site buttons.

export let imagesButtonClicked = false;

// --- SETTINGS ---
const MAX_HISTORY_LINES = 50;      // Rows to keep in the sidebar.
const MAX_SNIPPET_WORDS = 35;      // Words to show before truncating.
const normalise = s => s.replace(/\s+/g, ' ').trim().toLowerCase();

// --- 1. INITIALIZE OBSERVERS ---
export function initChatbotListeners() {
  setTimeout(() => {
    const host = document.querySelector('flowise-fullchatbot');
    if (!host) { console.error('Flowise host not found'); return; }
    const root = host.shadowRoot;
    if (!root) { console.error('Cannot access Flowise shadow root'); return; }

    // Rebuild sidebar on any change to the chat.
    new MutationObserver(() => requestAnimationFrame(syncSidebar))
      .observe(root, { childList: true, subtree: true });

    syncSidebar(); // Initial draw.
  }, 700);
}

// --- 2. SYNC CHAT HISTORY TO SIDEBAR ---
function syncSidebar() {
  const list = document.getElementById('chat-history-list');
  if (!list) return;

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
  list.innerHTML = ''; // Clear previous history.
  view.forEach(({ user, text }) => {
    const li = document.createElement('li');
    li.className = user ? 'user-msg' : 'bot-msg';
    li.textContent = truncate(text, MAX_SNIPPET_WORDS);
    list.appendChild(li);
  });

  list.parentElement.scrollTop = list.parentElement.scrollHeight; // Scroll to bottom.

  // Check the last bot message for a diagnosis.
  const lastBot = [...view].reverse().find(l => !l.user);
  if (lastBot && /good luck!/i.test(lastBot.text)) parseDiagnosis(lastBot.text);
}

// --- 3. PARSE DIAGNOSIS & CREATE BUTTONS ---
function parseDiagnosis(txt) {
  const diagnosisLine = txt.split(/good luck!/i)[0].trim().split('\n').reverse().find(s => /is most likely/i.test(s));
  if (!diagnosisLine) return;

  const condition = diagnosisLine.split(/is most likely/i)[0].trim().replace(/\.$/, '');
  if (condition) {
    removeChatEndButtons();
    createButtons(condition);
  }
}

// --- 4. IMAGE-SITE BUTTONS ---
function createButtons(condition) {
  if (document.getElementById('chat-end-buttons')) return;

  const container = document.createElement('div');
  container.id = 'chat-end-buttons';
  container.style.cssText = `display:flex; flex-direction:column; align-items:center; margin-top:-20px; margin-bottom:35px; transition:margin-top .3s`;

  const text = document.createElement('div');
  text.innerHTML = condition ? `Find <strong>${condition}</strong> images on these sites` : 'Find images on these sites';
  text.style.cssText = 'font-size:14px; margin-bottom:10px';
  container.appendChild(text);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:15px';

  const makeButton = (label, color, url) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = `background:${color}; color:black; font-size:14px; border:2px solid black; padding:6px 10px; cursor:pointer;`;
    btn.onclick = () => window.open(url, '_blank');
    return btn;
  };

  row.appendChild(makeButton('Ophthalmology', 'rgb(134,162,255)', 'https://eyewiki.org/Main_Page'));
  row.appendChild(makeButton('ENT', 'rgb(133,255,133)', 'https://www.otoscape.com/image-atlas.html'));
  row.appendChild(makeButton('Dermatology', '#efafff', 'https://dermnetnz.org/images'));
  container.appendChild(row);

  // Insert buttons before footer, or at end of body as fallback.
  const footer = document.querySelector('.chatbot-version');
  (footer?.parentNode || document.body).insertBefore(container, footer || null);

  setTimeout(() => { // Adjust margin if container is off-screen.
    if (container.getBoundingClientRect().bottom > window.innerHeight) container.style.marginTop = '0';
  }, 100);
}

function removeChatEndButtons() {
  document.getElementById('chat-end-buttons')?.remove();
}

// --- 5. MAIN "IMAGES" BUTTON TOGGLE ---
export function attachImagesButton() {
  const btn = document.getElementById('images');
  if (!btn) { console.warn('Images button (#images) not found'); return; }

  btn.addEventListener('click', () => {
    const buttonsExist = !!document.getElementById('chat-end-buttons');
    imagesButtonClicked = !buttonsExist;
    
    if (buttonsExist) {
      removeChatEndButtons();
    } else {
      createButtons(''); // Create buttons without a specific condition.
    }
  });
}

// --- 6. HELPERS & INITIALIZER ---
function truncate(msg, maxWords) {
  const words = msg.split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '…' : msg;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('listener-module ready');
  initChatbotListeners();
});
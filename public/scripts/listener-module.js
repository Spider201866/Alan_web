// Alan UI - listener-module.js | 19th June 2025, WJW

/* listener-module.js
   ─────────────────────────────────────────────────────────────────────────
   Persistent chat history with collapsible, numbered sessions.
   (Based on user-provided structure with enhancements for UI/UX)
   ----------------------------------------------------------------------- */

import log from './log.js';
export const imagesButtonClicked = false;

/* ── constants & helpers ──────────────────────────────────────────────── */
const STORAGE_KEY = 'alan-chat-history-v2';
const normalise = (s) =>
  s
    .replace(/[.,;!?]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\n/g, ' ')
    .trim()
    .toLowerCase();

/**
 * Creates and appends a 'copy' button to a session container in the sidebar.
 * @param {HTMLElement} container - The DOM element to which the button will be appended.
 * @param {Object} sess - The session object, used to access messages for copying.
 */
function makeCopyButton(container, sess) {
  const btn = document.createElement('i');
  btn.className = 'fa-regular fa-copy copy-btn'; // Font Awesome icon
  btn.title = 'Copy this session';

  btn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const text = sess.messages.map((m) => m.text).join('\n');
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Original opacity feedback
        btn.style.opacity = '1';
        setTimeout(() => (btn.style.opacity = '.55'), 600); // .55 as in your image example for default
      })
      .catch(() => alert('Copy failed. Check browser permissions.'));
  });

  container.appendChild(btn);
}

/* ── initialise history (or seed if empty) ────────────────────────────── */
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
if (!history.sessions || !Array.isArray(history.sessions)) {
  history = { sessionCounter: 0, sessions: [] };
}

// Start a new session on page load if one doesn't exist for CURRENT_ID,
// or continue the last one if page was reloaded.
// The logic for incrementing sessionCounter was here in your provided code
// and it's key for creating a new session each time.
history.sessionCounter += 1;
let CURRENT_ID = history.sessionCounter;
history.sessions.push({ id: CURRENT_ID, messages: [] });
localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
log.info('%c[History] Ready. Current Session ID:', 'color:#008000', CURRENT_ID, history);

const storedKeys = new Set(); // For de-duplication within the CURRENT_ID session

/* ── bootstrap when DOM loaded ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  attachFlowiseObservers();
});

/**
 * Attaches MutationObservers to the Flowise chatbot component to detect new messages and UI changes.
 * This is the primary mechanism for capturing chat interactions.
 */
function attachFlowiseObservers() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host) {
    log.error('[History] Flowise host element not found.');
    return;
  }

  let attempts = 0;
  const maxAttempts = 20;
  const intervalId = setInterval(() => {
    attempts++;
    if (host.shadowRoot) {
      clearInterval(intervalId);
      const root = host.shadowRoot;
      log.info('%c[History] Flowise shadowRoot accessed.', 'color:#008000');

      new MutationObserver(handleBubbleChanges).observe(root, { childList: true, subtree: true });
      handleBubbleChanges();

      const hookResetButton = () => {
        const resetButton = root.querySelector('button[title="Reset Chat"]');
        if (resetButton && !resetButton.dataset.historyHooked) {
          resetButton.dataset.historyHooked = 'true';
          resetButton.addEventListener('click', () => {
            log.info('%c[History] Flowise "Reset Chat" detected.', 'color:#ffa500');
            startNewSession();
          });
          log.info('%c[History] Flowise "Reset Chat" button hooked.', 'color:#00ced1');
        }
      };
      hookResetButton();
      new MutationObserver(hookResetButton).observe(root, { childList: true, subtree: true });
    } else if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      log.error('[History] Failed to access Flowise shadowRoot after multiple attempts.');
    }
  }, 100);
}

/**
 * Callback function for the MutationObserver that handles changes in the chatbot's message bubbles.
 * It scans for new user or bot messages and saves them.
 */
function handleBubbleChanges() {
  const host = document.querySelector('flowise-fullchatbot');
  if (!host || !host.shadowRoot) return;

  host.shadowRoot
    .querySelectorAll('[class*="guest-container"],[class*="host-container"]')
    .forEach((bubbleElement) => {
      const rawText = bubbleElement.textContent.trim();
      if (!rawText) return;

      const role = /\bguest-container\b/i.test(bubbleElement.className) ? 'user' : 'bot';
      saveMessage(role, rawText);
    });
}

/**
 * Starts a new chat session by incrementing the session counter, updating local storage,
 * and rendering a new session container in the sidebar.
 */
function startNewSession() {
  // This function is called by Flowise "Reset Chat" or potentially other triggers
  // It ensures a new session is correctly set up in 'history' and the sidebar
  history.sessionCounter += 1;
  CURRENT_ID = history.sessionCounter;
  const newSession = { id: CURRENT_ID, messages: [] };
  history.sessions.push(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

  storedKeys.clear();

  log.info(`%c[History] New session started: ID ${CURRENT_ID}`, 'color:#007bff');

  const sidebar = document.getElementById('chatHistorySidebar');
  if (!sidebar) {
    log.error('[History] Sidebar element not found for new session.');
    return;
  }

  const headerElement = document.createElement('div');
  headerElement.className = 'session-header';
  headerElement.textContent = `--${CURRENT_ID}--`;

  const contentContainer = document.createElement('div');
  contentContainer.id = `session-${CURRENT_ID}`;
  contentContainer.className = 'session-content empty-session-content'; // Mark as empty
  makeCopyButton(contentContainer, newSession);

  headerElement.addEventListener('click', () => {
    contentContainer.style.display = contentContainer.style.display === 'none' ? 'block' : 'none';
  });

  sidebar.appendChild(headerElement);
  sidebar.appendChild(contentContainer);
  headerElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
}

/**
 * Saves a message to the current session, handling streaming bot messages and de-duplication.
 * @param {string} role - The role of the message sender ('user' or 'bot').
 * @param {string} text - The content of the message.
 */
function saveMessage(role, text) {
  const currentSession = history.sessions.find((s) => s.id === CURRENT_ID);
  if (!currentSession) {
    // This could happen if a message arrives before startNewSession fully completes for CURRENT_ID
    // Or if CURRENT_ID somehow gets out of sync.
    // Let's try to find the latest session as a fallback.
    const latestSession = history.sessions[history.sessions.length - 1];
    if (latestSession && latestSession.id === CURRENT_ID) {
      // It was just a timing issue, proceed with latestSession as currentSession
    } else {
      log.error(
        `[History] Critical: Current session ${CURRENT_ID} not found. Message "${text}" for role "${role}" cannot be saved.`
      );
      return;
    }
  }

  const lastMessage = currentSession.messages[currentSession.messages.length - 1];
  const normalizedText = normalise(text);

  if (storedKeys.has(role + '|' + normalizedText)) return;

  if (role === 'bot' && lastMessage && lastMessage.role === 'bot') {
    const prevNormalizedText = normalise(lastMessage.text);
    if (
      normalizedText.startsWith(prevNormalizedText) ||
      prevNormalizedText.startsWith(normalizedText)
    ) {
      const betterText = text.length > lastMessage.text.length ? text : lastMessage.text;

      if (normalise(lastMessage.text) !== normalise(betterText)) {
        storedKeys.delete(role + '|' + normalise(lastMessage.text));
        lastMessage.text = betterText;
        storedKeys.add(role + '|' + normalise(betterText));

        const sessionContentDiv = document.getElementById(`session-${CURRENT_ID}`);
        if (sessionContentDiv) {
          const botMessageElements = sessionContentDiv.querySelectorAll('.history-message.bot');
          if (botMessageElements.length > 0) {
            botMessageElements[botMessageElements.length - 1].textContent = betterText;
          }
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return;
    }
  }

  currentSession.messages.push({ role, text });
  storedKeys.add(role + '|' + normalizedText);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  appendLineToSidebar(CURRENT_ID, role, text);
}

/**
 * Renders the entire chat history from local storage into the sidebar UI.
 * It creates collapsible sections for each session.
 */
function renderSidebar() {
  const sidebar = document.getElementById('chatHistorySidebar');
  if (!sidebar) {
    log.error('[History] Sidebar element not found for rendering.');
    return;
  }
  sidebar.innerHTML = '';

  history.sessions.forEach((session) => {
    const headerElement = document.createElement('div');
    headerElement.className = 'session-header';
    headerElement.textContent = `--${session.id}--`;

    const contentContainer = document.createElement('div');
    contentContainer.id = `session-${session.id}`;
    contentContainer.className = 'session-content';

    if (session.messages.length === 0) {
      contentContainer.classList.add('empty-session-content');
    }

    if (session.id !== CURRENT_ID) {
      contentContainer.style.display = 'none'; // Collapse old sessions
    } else {
      contentContainer.style.display = 'block'; // Ensure current is open
      storedKeys.clear(); // Reset for current session on initial render
      session.messages.forEach((msg) => storedKeys.add(msg.role + '|' + normalise(msg.text)));
    }

    makeCopyButton(contentContainer, session);
    session.messages.forEach((message) => appendLine(contentContainer, message.role, message.text));

    headerElement.addEventListener('click', () => {
      // Toggle display of the associated content container
      const targetContent = document.getElementById(`session-${session.id}`);
      if (targetContent) {
        targetContent.style.display = targetContent.style.display === 'none' ? 'block' : 'none';
      }
    });

    sidebar.appendChild(headerElement);
    sidebar.appendChild(contentContainer);
  });

  const currentSessionHeader = sidebar.querySelector(
    `#session-${CURRENT_ID}`
  )?.previousElementSibling;
  if (currentSessionHeader) {
    currentSessionHeader.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }
}

/**
 * Appends a new message line to a specific session container in the sidebar.
 * @param {number} sessionId - The ID of the session to which the message should be added.
 * @param {string} role - The role of the message sender ('user' or 'bot').
 * @param {string} text - The content of the message.
 */
function appendLineToSidebar(sessionId, role, text) {
  const sessionContentDiv = document.getElementById(`session-${sessionId}`);
  if (sessionContentDiv) {
    appendLine(sessionContentDiv, role, text);
    sessionContentDiv.classList.remove('empty-session-content'); // Now has content
  }
}

/**
 * Creates and appends a new message line element to a given session container.
 * @param {HTMLElement} sessionContentDiv - The DOM element for the session's content.
 * @param {string} role - The role of the message sender ('user' or 'bot').
 * @param {string} text - The content of the message.
 */
function appendLine(sessionContentDiv, role, text) {
  const lineElement = document.createElement('div');
  lineElement.className = `history-message ${role}`;
  lineElement.textContent = text;
  sessionContentDiv.appendChild(lineElement);

  if (
    sessionContentDiv.style.display !== 'none' &&
    sessionContentDiv.id === `session-${CURRENT_ID}`
  ) {
    sessionContentDiv.scrollTop = sessionContentDiv.scrollHeight;
  }
}

/* --- Exported functions --- */
export function attachImagesButton() {
  // To be implemented if needed
}

/**
 * Resets the in-memory history state of the module.
 * This is typically called when the user clears the chat history.
 */
export function resetSidebarHistory() {
  log.info('%c[History] Resetting in-memory sidebar history state.', 'color:#ff0000');
  history = { sessionCounter: 0, sessions: [] };
  CURRENT_ID = 0;
  storedKeys.clear();
  // The actual localStorage.removeItem and DOM clearing (sidebar.innerHTML = '')
  // is handled by the clearHistoryBtn event listener in the main HTML/script.
  // This function is for resetting the module's internal variables.
  // After this, the main script should ideally call startNewSession() or renderSidebar()
  // if an immediate visual update of a new empty session is desired without a page reload.
}

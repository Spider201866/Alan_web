// Alan UI - listener-module.js

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

function hasAccessibleName(el) {
  if (!el) return false;
  const ariaLabel = el.getAttribute('aria-label');
  const ariaLabelledBy = el.getAttribute('aria-labelledby');
  return Boolean((ariaLabel && ariaLabel.trim()) || (ariaLabelledBy && ariaLabelledBy.trim()));
}

function setAriaLabelIfMissing(el, label) {
  if (!el || hasAccessibleName(el)) return;
  el.setAttribute('aria-label', label);
}

function applyFlowiseAccessibilityLabels(root) {
  if (!root) return;

  root.querySelectorAll('button.py-2').forEach((button) => {
    if (hasAccessibleName(button)) return;

    if (button.hasAttribute('sendbuttoncolor')) {
      setAriaLabelIfMissing(button, 'Send message');
      return;
    }

    if (button.hasAttribute('buttoncolor')) {
      setAriaLabelIfMissing(button, 'Attach file');
      return;
    }

    if (button.title && button.title.trim()) {
      setAriaLabelIfMissing(button, button.title.trim());
    }
  });

  const liteBadge = root.querySelector('a#lite-badge.lite-badge');
  if (liteBadge && !hasAccessibleName(liteBadge)) {
    const linkText = liteBadge.textContent ? liteBadge.textContent.trim() : '';
    if (!linkText) {
      liteBadge.setAttribute('aria-label', 'Powered by Flowise');
    }
  }
}

function setCopyButtonState(btn, isEmpty) {
  if (!btn) return;
  const label = isEmpty ? 'Copy this session (empty)' : 'Copy this session';
  btn.disabled = isEmpty;
  btn.title = label;
  btn.setAttribute('aria-label', label);
}

function appendEmptyState(container) {
  if (container.querySelector('.empty-session-hint')) return;
  const hint = document.createElement('div');
  hint.className = 'empty-session-hint';
  hint.textContent = 'No messages yet.';
  container.appendChild(hint);
}

function clearEmptyState(container) {
  const hint = container.querySelector('.empty-session-hint');
  if (hint) hint.remove();
}

/**
 * Creates and appends a 'copy' button to a session container in the sidebar.
 * @param {HTMLElement} container - The DOM element to which the button will be appended.
 * @param {Object} sess - The session object, used to access messages for copying.
 */
function makeCopyButton(container, sess) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';

  const icon = document.createElement('span');
  icon.className = 'copy-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '⧉';
  btn.appendChild(icon);

  setCopyButtonState(btn, !sess.messages || sess.messages.length === 0);

  btn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (btn.disabled) return;
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
  return btn;
}

function setSessionExpanded(headerElement, contentContainer, isExpanded) {
  contentContainer.style.display = isExpanded ? 'flex' : 'none';
  headerElement.setAttribute('aria-expanded', String(isExpanded));
}

function setupSessionHeader(headerElement, contentContainer, { isExpanded, isCurrent }) {
  headerElement.classList.toggle('is-current', Boolean(isCurrent));
  headerElement.setAttribute('role', 'button');
  headerElement.setAttribute('aria-controls', contentContainer.id);
  headerElement.tabIndex = 0;
  setSessionExpanded(headerElement, contentContainer, isExpanded);

  const toggle = () => {
    const nextState = contentContainer.style.display === 'none';
    setSessionExpanded(headerElement, contentContainer, nextState);
  };

  headerElement.addEventListener('click', toggle);
  headerElement.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggle();
  });
}

/* ── state (initialised by initChatHistory) ───────────────────────────── */
let history;
let CURRENT_ID = 0;
const storedKeys = new Set(); // For de-duplication within the CURRENT_ID session
let isInitialised = false;

function loadHistoryFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  let parsed;
  try {
    parsed = JSON.parse(raw || '{}');
  } catch {
    parsed = {};
  }

  if (!parsed.sessions || !Array.isArray(parsed.sessions)) {
    return { sessionCounter: 0, sessions: [] };
  }

  if (typeof parsed.sessionCounter !== 'number') parsed.sessionCounter = parsed.sessions.length;
  return parsed;
}

function persistHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function startNewEmptySession() {
  history.sessionCounter += 1;
  CURRENT_ID = history.sessionCounter;
  history.sessions.push({ id: CURRENT_ID, messages: [] });
  persistHistory();
  storedKeys.clear();
  log.info('%c[History] Ready. Current Session ID:', 'color:#008000', CURRENT_ID, history);
}

function ensureHistoryReady() {
  if (!history) history = loadHistoryFromStorage();
  if (!history.sessions || !Array.isArray(history.sessions)) {
    history = { sessionCounter: 0, sessions: [] };
  }
  if (!CURRENT_ID || !history.sessions.some((s) => s.id === CURRENT_ID)) {
    startNewEmptySession();
  }
}

/**
 * Initialises chat history capture + sidebar rendering.
 *
 * IMPORTANT: Previously this module executed side effects on import.
 * This function makes initialisation explicit to avoid double session creation.
 */
export function initChatHistory() {
  if (isInitialised) return;
  isInitialised = true;

  history = loadHistoryFromStorage();
  if (!history.sessions || history.sessions.length === 0) {
    startNewEmptySession();
  } else {
    const lastSession = history.sessions[history.sessions.length - 1];
    CURRENT_ID = lastSession.id;
    if (typeof history.sessionCounter !== 'number' || history.sessionCounter < CURRENT_ID) {
      history.sessionCounter = CURRENT_ID;
    }
  }
  renderSidebar();
  attachFlowiseObservers();
}

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
  const maxAttempts = 80;
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
  applyFlowiseAccessibilityLabels(host.shadowRoot);

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
  ensureHistoryReady();
  history.sessionCounter += 1;
  CURRENT_ID = history.sessionCounter;
  const newSession = { id: CURRENT_ID, messages: [] };
  history.sessions.push(newSession);
  persistHistory();

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
  appendEmptyState(contentContainer);
  makeCopyButton(contentContainer, newSession);

  const existingCurrent = sidebar.querySelector('.session-header.is-current');
  if (existingCurrent) existingCurrent.classList.remove('is-current');
  setupSessionHeader(headerElement, contentContainer, { isExpanded: true, isCurrent: true });

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
  ensureHistoryReady();
  let currentSession = history.sessions.find((s) => s.id === CURRENT_ID);
  if (!currentSession) {
    // This could happen if a message arrives before startNewSession fully completes for CURRENT_ID
    // Or if CURRENT_ID somehow gets out of sync.
    // Let's try to find the latest session as a fallback.
    const latestSession = history.sessions[history.sessions.length - 1];
    if (latestSession && latestSession.id === CURRENT_ID) {
      currentSession = latestSession;
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
      persistHistory();
      return;
    }
  }

  currentSession.messages.push({ role, text });
  storedKeys.add(role + '|' + normalizedText);
  persistHistory();
  appendLineToSidebar(CURRENT_ID, role, text);
}

/**
 * Renders the entire chat history from local storage into the sidebar UI.
 * It creates collapsible sections for each session.
 */
function renderSidebar() {
  ensureHistoryReady();
  const sidebar = document.getElementById('chatHistorySidebar');
  if (!sidebar) {
    log.error('[History] Sidebar element not found for rendering.');
    return;
  }
  sidebar.textContent = '';

  history.sessions.forEach((session) => {
    const headerElement = document.createElement('div');
    headerElement.className = 'session-header';
    headerElement.textContent = `--${session.id}--`;

    const contentContainer = document.createElement('div');
    contentContainer.id = `session-${session.id}`;
    contentContainer.className = 'session-content';

    const isCurrent = session.id === CURRENT_ID;
    if (session.messages.length === 0) {
      contentContainer.classList.add('empty-session-content');
      appendEmptyState(contentContainer);
    }

    if (isCurrent) {
      storedKeys.clear(); // Reset for current session on initial render
      session.messages.forEach((msg) => storedKeys.add(msg.role + '|' + normalise(msg.text)));
    }

    makeCopyButton(contentContainer, session);
    session.messages.forEach((message) => appendLine(contentContainer, message.role, message.text));

    setupSessionHeader(headerElement, contentContainer, { isExpanded: isCurrent, isCurrent });

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
    clearEmptyState(sessionContentDiv);
    setCopyButtonState(sessionContentDiv.querySelector('.copy-btn'), false);
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
  // Note: localStorage.removeItem(STORAGE_KEY) and DOM clearing are done by the caller.
  // We reset in-memory state so future messages can start a fresh session.
  history = { sessionCounter: 0, sessions: [] };
  CURRENT_ID = 0;
  storedKeys.clear();
  // The actual localStorage.removeItem and DOM clearing (sidebar.innerHTML = '')
  // is handled by the clearHistoryBtn event listener in the main HTML/script.
  // This function is for resetting the module's internal variables.
  // After this, the next captured message will create a new session.
}

// Exposed for tests.
export const __testOnly = {
  setState({ history: nextHistory, currentId } = {}) {
    if (nextHistory) history = nextHistory;
    if (typeof currentId === 'number') CURRENT_ID = currentId;
    storedKeys.clear();
  },
  applyFlowiseAccessibilityLabels,
  saveMessage,
};

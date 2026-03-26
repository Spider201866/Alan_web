// Alan UI - home-first-use-tip.js
// Shows a one-time first-use coaching card on the home page after a short delay.

import { getStoredString } from './storage.js';

const TIP_SEEN_KEY = 'alanui:firstChatTipSeen';
const SHOW_DELAY_MS = 10000;
const HIDE_TRANSITION_MS = 500;
const FORCE_SHOW_DELAY_MS = 250;

export function initFirstUseTip() {
  const tip = document.getElementById('first-use-tip');
  const closeButton = document.getElementById('first-use-tip-close');
  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const forceShow = isLocalhost && new URLSearchParams(window.location.search).get('tip') === '1';

  if (!tip || !closeButton || (!forceShow && getStoredString(TIP_SEEN_KEY) === '1')) return;

  let showTimer = null;
  let hasShown = false;
  let isClosed = false;
  let repositionTimers = [];

  const clearRepositionTimers = () => {
    repositionTimers.forEach((timerId) => window.clearTimeout(timerId));
    repositionTimers = [];
  };

  const getComposerRect = () => {
    const host = document.querySelector('flowise-fullchatbot');
    const shadowRoot = host?.shadowRoot;
    const composer = shadowRoot?.querySelector('textarea, input[type="text"]');
    return composer?.getBoundingClientRect() || host?.getBoundingClientRect() || null;
  };

  const positionTip = () => {
    const greetingRect =
      document.getElementById('sub-text')?.getBoundingClientRect() ||
      document.querySelector('.logo-and-text-container')?.getBoundingClientRect() ||
      null;
    const composerRect = getComposerRect();

    const top = Math.max(88, Math.round((greetingRect?.top ?? 132) - 12));
    const bottomTarget = composerRect ? composerRect.top - 6 : window.innerHeight - 140;
    const baseHeight = Math.max(176, Math.round(bottomTarget - top));
    const maxHeight = Math.max(176, Math.round(window.innerHeight - top - 16));
    const width = Math.round(Math.min(Math.max(window.innerWidth * 0.58, 228), 336));

    tip.style.setProperty('--first-use-tip-top', `${top}px`);
    tip.style.setProperty('--first-use-tip-width', `${width}px`);

    if (tip.hidden) {
      tip.style.setProperty('--first-use-tip-height', `${baseHeight}px`);
      return;
    }

    const requiredHeight = Math.ceil(tip.scrollHeight + 20);
    const fittedHeight = Math.min(maxHeight, Math.max(baseHeight, requiredHeight));
    tip.style.setProperty('--first-use-tip-height', `${fittedHeight}px`);
  };

  const cleanupOpenListeners = () => {
    document.removeEventListener('pointerdown', handleOpenPointerDown, true);
    document.removeEventListener('focusin', handleOpenFocusIn, true);
    document.removeEventListener('keydown', handleOpenKeyDown, true);
    window.removeEventListener('resize', positionTip);
  };

  const finalizeHide = () => {
    tip.hidden = true;
    tip.removeEventListener('transitionend', finalizeHide);
  };

  const hideTip = () => {
    if (isClosed) return;
    isClosed = true;

    if (showTimer) {
      window.clearTimeout(showTimer);
      showTimer = null;
    }

    clearRepositionTimers();
    cleanupOpenListeners();
    if (!forceShow) localStorage.setItem(TIP_SEEN_KEY, '1');

    tip.classList.remove('is-open');
    tip.addEventListener('transitionend', finalizeHide);
    window.setTimeout(finalizeHide, HIDE_TRANSITION_MS);
  };

  const showTip = () => {
    if (isClosed || hasShown) return;

    if (document.hidden) {
      showTimer = window.setTimeout(showTip, 2000);
      return;
    }

    hasShown = true;
    positionTip();

    tip.hidden = false;
    requestAnimationFrame(() => {
      positionTip();
      tip.classList.add('is-open');
    });

    clearRepositionTimers();
    repositionTimers = [500, 1400, 3000].map((delayMs) => window.setTimeout(positionTip, delayMs));
    window.addEventListener('resize', positionTip);
    document.addEventListener('pointerdown', handleOpenPointerDown, true);
    document.addEventListener('focusin', handleOpenFocusIn, true);
    document.addEventListener('keydown', handleOpenKeyDown, true);
  };

  function handleOpenPointerDown(event) {
    if (tip.contains(event.target)) return;
    hideTip();
  }

  function handleOpenFocusIn(event) {
    if (tip.contains(event.target)) return;
    hideTip();
  }

  function handleOpenKeyDown(event) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    hideTip();
  }

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    hideTip();
  });

  showTimer = window.setTimeout(showTip, forceShow ? FORCE_SHOW_DELAY_MS : SHOW_DELAY_MS);
}

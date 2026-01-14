// Alan UI - home-ui-core.js | 14th January 2026, WJW
// public/scripts/home-ui-core.js
// Shared helpers for home UI behaviors.

/**
 * Closes all popups, side menus, and the modal overlay to ensure a clean UI state.
 * It also deactivates any active focus traps.
 *
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function closeAllPopups(state) {
  if (state.sideMenu && state.sideMenu.style.left === '0px') {
    if (state.menuIcon) state.menuIcon.classList.remove('open');
    state.sideMenu.style.left = '-370px';
    if (state.sideMenuFocusTrap) state.sideMenuFocusTrap.deactivate();
  }

  if (state.popup && state.popup.style.right === '0px') {
    state.popup.style.right = '-350px';
    if (state.popupFocusTrap) state.popupFocusTrap.deactivate();
  }

  if (state.overlay) state.overlay.style.display = 'none';
}

/**
 * Updates the style of a button after it has been clicked, typically to indicate a completed action.
 * @param {HTMLElement|null} button
 */
export function updateButtonStyle(button) {
  if (!button) return;
  button.classList.remove('pulse');
  button.style.backgroundColor = 'grey';
  button.style.color = 'white';
}

// Alan UI - home-ui-core.js
// public/scripts/home-ui-core.js
// Shared helpers for home UI behaviors.

/**
 * Closes all popups, side menus, and the modal overlay to ensure a clean UI state.
 * It also deactivates any active focus traps.
 *
 * @param {import('./home-ui-state.js').HomeUIState} state
 */
export function closeAllPopups(state) {
  if (state.sideMenu && state.sideMenu.classList.contains('is-open')) {
    if (state.menuIcon) state.menuIcon.classList.remove('open');
    state.sideMenu.classList.remove('is-open');
    if (state.sideMenuFocusTrap) state.sideMenuFocusTrap.deactivate();
  }

  if (state.popup && state.popup.classList.contains('is-open')) {
    state.popup.classList.remove('is-open');
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

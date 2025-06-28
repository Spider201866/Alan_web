// public/scripts/focus-trap.js
// A reusable class for managing focus within a modal or popup, ensuring accessibility.

export class FocusTrap {
  constructor(modalElement) {
    if (!modalElement) {
      throw new Error('FocusTrap requires a modal element.');
    }
    this.modalElement = modalElement;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
    this.previousActiveElement = null;

    // Bind the event handler to this instance
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  /**
   * Activates the focus trap.
   */
  activate() {
    this.previousActiveElement = document.activeElement;

    // Find all focusable elements within the modal
    const focusableSelector =
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(
      this.modalElement.querySelectorAll(focusableSelector)
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null); // Only visible, non-disabled elements

    if (this.focusableElements.length === 0) return;

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    // Move focus to the first element
    this.firstFocusableElement.focus();

    // Attach the keydown listener
    document.addEventListener('keydown', this._handleKeyDown);
  }

  /**
   * Deactivates the focus trap.
   */
  deactivate() {
    // Remove the keydown listener
    document.removeEventListener('keydown', this._handleKeyDown);

    // Return focus to the element that opened the modal
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Private method to handle keyboard events.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  _handleKeyDown(e) {
    if (e.key !== 'Tab' && e.key !== 'Escape') {
      return;
    }

    if (e.key === 'Escape') {
      // If the modal has a close button, we can trigger its click event
      const closeButton = this.modalElement.querySelector('.popup-close, .closebtn');
      if (closeButton) {
        closeButton.click();
      }
      return;
    }

    // Handle the Tab key
    if (e.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }
}

// --- END OF FILE focus-trap.js ---

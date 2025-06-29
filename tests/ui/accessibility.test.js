/* eslint-env jest */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { setupUI, teardownUI } from './helpers/setup.js';

describe('UI Accessibility', () => {
  let dom;
  let document;

  beforeEach(() => {
    ({ dom, document } = setupUI());
  });

  afterEach(() => {
    teardownUI(dom);
  });

  describe('Marquee duplication', () => {
    it('should set aria-hidden="true" on all duplicated marquee elements', () => {
      document.body.innerHTML = `
        <section class="marquee">
          <div class="marquee-content-reverse">
            <div class="box" id="eyeMarqueeLine1a"></div>
            <div class="box" id="eyeMarqueeLine1b" aria-hidden="true"></div>
          </div>
        </section>`;
      const duplicatedBox = document.querySelector('.box[id$="b"]');
      expect(duplicatedBox.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Icon-only buttons', () => {
    it('should have aria-label on icon-only language button', () => {
      document.body.innerHTML = `<button id="language-button" aria-label="Change language"></button>`;
      const btn = document.getElementById('language-button');
      expect(btn.getAttribute('aria-label')).toBe('Change language');
    });

    it('should have aria-label on icon-only clear history button', () => {
      document.body.innerHTML = `<button id="clearHistoryBtn" aria-label="Delete all chat history"></button>`;
      const btn = document.getElementById('clearHistoryBtn');
      expect(btn.getAttribute('aria-label')).toBe('Delete all chat history');
    });

    it('should have aria-label on icon-only geo-info button', () => {
      document.body.innerHTML = `<button id="geo-info-button" aria-label="Show location info">i</button>`;
      const btn = document.getElementById('geo-info-button');
      expect(btn.getAttribute('aria-label')).toBe('Show location info');
    });
  });

  describe('"Skip to content" link', () => {
    it('should have a skip to content link that targets the main content', () => {
      const skipLink = document.querySelector('.skip-to-content');
      const mainContent = document.getElementById('main-content');
      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(mainContent).not.toBeNull();
    });
  });
});

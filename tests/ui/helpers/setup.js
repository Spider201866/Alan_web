/**
 * @file This file contains shared setup and teardown logic for all UI tests.
 *
 * IMPORTANT: Any new UI test suite MUST import and use these helpers
 * to ensure a consistent and clean testing environment.
 */

import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';

/**
 * Sets up a clean JSDOM environment for a UI test.
 * Mocks global objects like `document`, `window`, `localStorage`, and `navigator`.
 * @returns {{dom: JSDOM, document: Document, window: Window & typeof globalThis}}
 */
export function setupUI() {
  const dom = new JSDOM(
    `
    <body>
      <a href="#main-content" class="skip-to-content">Skip to main content</a>
      <main id="main-content"></main>
    </body>
  `,
    { url: 'http://localhost' }
  );

  const { window } = dom;
  global.document = window.document;
  global.window = window;

  // Mock localStorage
  const mockStorage = {};
  global.localStorage = {
    getItem: jest.fn((key) => mockStorage[key] ?? null),
    setItem: jest.fn((key, value) => {
      mockStorage[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete mockStorage[key];
    }),
    clear: jest.fn(() => {
      mockStorage = {};
    }),
  };

  // Mock navigator.geolocation
  global.navigator = {
    geolocation: {
      getCurrentPosition: jest.fn(),
    },
  };

  return { dom, document: window.document, window };
}

/**
 * Tears down the JSDOM environment and resets mocks.
 * @param {JSDOM} dom - The JSDOM instance to clean up.
 */
export function teardownUI(dom) {
  jest.resetAllMocks();
  if (dom) {
    dom.window.close();
  }
}

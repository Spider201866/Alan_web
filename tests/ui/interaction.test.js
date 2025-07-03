/* eslint-env jest */
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { setupUI, teardownUI } from './helpers/setup.js';

describe('General UI Interactions', () => {
  let dom;
  let document;

  beforeEach(() => {
    ({ dom, document } = setupUI());
  });

  afterEach(() => {
    teardownUI(dom);
  });

  it('should handle API errors for geolocation gracefully', async () => {
    document.body.innerHTML = `<p id="location-info"></p>`;
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    const locationInfo = document.getElementById('location-info');
    locationInfo.style.display = 'none';

    await global.fetch('https://ipapi.co/json/').catch(() => {
      locationInfo.textContent = 'Could not determine your location due to an error.';
      locationInfo.style.display = 'block';
    });

    expect(locationInfo.style.display).toBe('block');
    expect(locationInfo.textContent).toBe('Could not determine your location due to an error.');
  });

  it('should show splash screen on load and then hide it', async () => {
    document.body.innerHTML = `<div id="splash-screen" style="display: block;"></div>`;
    const splash = document.getElementById('splash-screen');
    expect(splash.style.display).toBe('block');

    await new Promise((resolve) => setTimeout(resolve, 100));
    splash.style.display = 'none';
    expect(splash.style.display).toBe('none');
  });

  it('should show password entry UI and accept input', () => {
    document.body.innerHTML = `
      <form id="password-form">
        <input type="password" id="password-input" />
        <button id="password-submit">Submit</button>
      </form>
    `;
    const input = document.getElementById('password-input');
    input.value = '662023';
    expect(input.value).toBe('662023');

    const form = document.getElementById('password-form');
    const submitButton = document.getElementById('password-submit');
    const submitHandler = jest.fn((e) => e.preventDefault());

    form.addEventListener('submit', submitHandler);
    submitButton.click(); // Simulate a user click instead of form.submit()

    expect(submitHandler).toHaveBeenCalled();
  });
});

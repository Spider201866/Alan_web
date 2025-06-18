// closer.js

/**
 * A helper function that creates a delay using a Promise.
 * This is the key to cleaning up nested setTimeouts.
 * @param {number} ms - The delay in milliseconds.
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Runs once the page is fully loaded, initiating the animations.
 */
document.addEventListener('DOMContentLoaded', () => {
  showAnimation();
  setTimeout(highlightSequence, 2000); // Start the highlight sequence after 2s
  window.scrollTo(0, 0);
});

/**
 * Fades the Eyeor GIF in and out.
 */
async function showAnimation() {
  const container = document.getElementById('animationContainer');
  const image = container?.querySelector('img'); // Optional chaining is more concise
  if (!image) return;

  container.style.display = 'flex';
  image.style.opacity = 1;

  await delay(6000); // Keep it visible for 6 seconds

  image.style.opacity = 0;
  await delay(2000); // Wait for the 2s CSS fade-out transition

  container.style.display = 'none';
}

/**
 * Sequentially highlights key text elements.
 */
async function highlightSequence() {
  const ids = ['good-history', 'examine-well', 'use-arclight'];

  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) {
      element.style.color = 'red';
      await delay(1000); // Wait 1 second
      element.style.color = 'grey';
    }
  }
}

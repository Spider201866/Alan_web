// closer.js

/**
 * Runs once the page (window) is fully loaded.
 */
window.onload = function () {
  // Remove 'hidden' if your mainContent starts hidden in CSS
  // document.getElementById('mainContent').classList.remove('hidden');

  // Start the Eyeor fade-in/fade-out sequence
  showAnimation();

  // After 2s, start the highlight sequence on Good/Examine/Arclight
  setTimeout(anotherFunction, 2000);

  // Scroll to the top
  window.scrollTo(0, 0);
};

/**
 * showAnimation():
 * 1. Reveal #animationContainer (the Eyeor GIF container).
 * 2. Fade image in fully.
 * 3. Keep it visible for 6 seconds.
 * 4. Fade out over 2 seconds, then hide the container.
 */
function showAnimation() {
  const container = document.getElementById('animationContainer');
  if (!container) return;
  container.style.display = 'flex'; // or 'block'

  const image = container.querySelector('img');
  if (!image) return;

  // Fade in
  image.style.opacity = 1;

  // After 6s, fade out, then hide container
  setTimeout(() => {
    image.style.opacity = 0;
    setTimeout(() => {
      container.style.display = 'none';
    }, 2000); // match the 2s CSS transition
  }, 6000);
}

/**
 * anotherFunction():
 * Sequentially highlight #good-history, #examine-well, #use-arclight in red, then revert to grey.
 */
function anotherFunction() {
  const goodHistory = document.getElementById('good-history');
  const examineWell = document.getElementById('examine-well');
  const useArclight = document.getElementById('use-arclight');

  if (!goodHistory || !examineWell || !useArclight) return;

  // Turn #good-history red, then grey
  goodHistory.style.color = 'red';
  setTimeout(() => {
    goodHistory.style.color = 'grey';

    // Turn #examine-well red, then grey
    examineWell.style.color = 'red';
    setTimeout(() => {
      examineWell.style.color = 'grey';

      // Turn #use-arclight red, then grey
      useArclight.style.color = 'red';
      setTimeout(() => {
        useArclight.style.color = 'grey';
      }, 1000);
    }, 1000);
  }, 1000);
}

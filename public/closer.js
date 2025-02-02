/**
 * ******************************************************
 * 1) Window onload handler:
 *    - Immediately shows main content and triggers showAnimation().
 *    - Schedules doSomething() after 1 second.
 *    - Scrolls to the top of the page.
 * ******************************************************
 */
window.onload = function () {
  // Show main content straight away
  document.getElementById('mainContent').classList.remove('hidden');
  showAnimation();

  // After 1s, run doSomething()
  setTimeout(doSomething, 1000);

  // Ensure page is scrolled to the top
  window.scrollTo(0, 0);
};

/**
 * ******************************************************
 * showAnimation():
 *    - Reveals #animationContainer.
 *    - Fades the image in & keeps it visible for 6 seconds.
 *    - Then fades the image out over 2 seconds, hiding container.
 * ******************************************************
 */
function showAnimation() {
  const container = document.getElementById('animationContainer');
  container.style.display = 'flex'; // Make container visible

  const image = container.querySelector('img');
  image.style.opacity = 1; // Fade in

  setTimeout(() => {
    image.style.opacity = 0; // Fade out
    setTimeout(() => {
      container.style.display = 'none'; // Hide container after fade out
    }, 2000); // Matches CSS transition duration
  }, 6000); // Image fully visible for 6 seconds
}

/**
 * ******************************************************
 * doSomething():
 *    - Hides #mainContent.
 *    - After 0.5s, finds .chatbot-title and triggers flip-horizontally.
 *    - After 2s, calls anotherFunction().
 * ******************************************************
 */
function doSomething() {
  document.getElementById('mainContent').classList.add('hidden');

  setTimeout(function () {
    const d = document.querySelector('.chatbot-title');
    if (d) {
      d.classList.add('flip-horizontally');
      setTimeout(anotherFunction, 2000);
    }
  }, 500);
}

/**
 * ******************************************************
 * anotherFunction():
 *    - Sequentially highlights (#good-history, #examine-well, #use-arclight)
 *      in red, then reverts them to grey in timed intervals.
 * ******************************************************
 */
function anotherFunction() {
  const goodHistory = document.getElementById('good-history');
  const examineWell = document.getElementById('examine-well');
  const useArclight = document.getElementById('use-arclight');

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

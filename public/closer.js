/**
 * ******************************************************
 * 1) Window onload handler:
 *    - Checks if sessionStorage is already set (xyz).
 *    - If yes, shows main content & animation immediately.
 *    - Otherwise, prompts the user for a password.
 *    - Schedules doSomething() after 1 second.
 *    - Scrolls to the top of the page.
 * ******************************************************
 */
window.onload = function() {
  if (sessionStorage.getItem("xyz")) {
    // Session is already authenticated.
    document.getElementById("mainContent").classList.remove("hidden");
    showAnimation();
  } else {
    // Session not authenticated, prompt user for password.
    initiateProcess();
  }
  
  // After 1s, run doSomething()
  setTimeout(doSomething, 1000);

  // Ensure page is scrolled to top
  window.scrollTo(0, 0);
};

/**
 * ******************************************************
 * 2) initiateProcess():
 *    - Prompts for password.
 *    - Encodes the input to base64.
 *    - Compares with a known base64 string (part1 + part2).
 *    - If matched, sets sessionStorage (xyz) & shows content.
 *    - Otherwise, shows an "Access Denied." message.
 * ******************************************************
 */
function initiateProcess() {
  var part1 = "NjYy";
  var b = prompt("Enter password:", "");
  var c = (function(input) { return btoa(input); })(b);
  var part2 = "MDIz";
  var a = part1 + part2;

  if (c === a) {
    sessionStorage.setItem("xyz", "."); // Marks session as authenticated
    document.getElementById("mainContent").classList.remove("hidden");
    showAnimation(); // Trigger animation after successful auth
  } else {
    document.body.innerHTML = "Access Denied.";
  }
}

/**
 * ******************************************************
 * 3) showAnimation():
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
 * 4) doSomething():
 *    - Hides #mainContent.
 *    - After 0.5s, finds .chatbot-title and triggers flip-horizontally.
 *    - After 2s, calls anotherFunction().
 * ******************************************************
 */
function doSomething() {
  document.getElementById("mainContent").classList.add("hidden");

  setTimeout(function() {
    var d = document.querySelector('.chatbot-title');
    if (d) {
      d.classList.add('flip-horizontally');
      setTimeout(anotherFunction, 2000);
    }
  }, 500);
}

/**
 * ******************************************************
 * 5) anotherFunction():
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

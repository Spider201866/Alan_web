window.onload = function() {
  if (sessionStorage.getItem("xyz")) {
    // If the session is already authenticated, show the animation and content immediately.
    document.getElementById("mainContent").classList.remove("hidden");
    showAnimation();
  } else {
    // Only ask for the password if the session hasn't been authenticated yet.
    initiateProcess();
  }
  setTimeout(doSomething, 1000);
  window.scrollTo(0, 0);
};

function initiateProcess() {
  var part1 = "NjYy";
  var b = prompt("Enter password:", "");
  var c = (function(input) { return btoa(input); })(b);
  var part2 = "MDIz";
  var a = part1 + part2;

  if (c === a) {
    sessionStorage.setItem("xyz", "."); // Set this to authenticate the session
    document.getElementById("mainContent").classList.remove("hidden");
    showAnimation(); // Show animation after validation
  } else {
    document.body.innerHTML = "Access Denied.";
  }
}

function showAnimation() {
  const container = document.getElementById('animationContainer');
  container.style.display = 'flex'; // Make the container visible
  const image = container.querySelector('img');
  image.style.opacity = 1; // Start the fade in

  setTimeout(() => {
    image.style.opacity = 0; // Start the fade out
    setTimeout(() => {
      container.style.display = 'none'; // Hide the container after fade out
    }, 2000); // This matches the opacity transition duration
  }, 6000); // Image visible for 6 seconds
}

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

function anotherFunction() {
  const goodHistory = document.getElementById('good-history');
  const examineWell = document.getElementById('examine-well');
  const useArclight = document.getElementById('use-arclight');

  goodHistory.style.color = 'red';
  setTimeout(() => {
    goodHistory.style.color = 'grey';
    examineWell.style.color = 'red';
    setTimeout(() => {
      examineWell.style.color = 'grey';
      useArclight.style.color = 'red';
      setTimeout(() => {
        useArclight.style.color = 'grey';
      }, 1000);
    }, 1000);
  }, 1000);
}

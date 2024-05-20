window.onload = function() {
  if (!sessionStorage.getItem("xyz")) {
      initiateProcess();
  }
  document.getElementById("mainContent").classList.add("hidden");
  setTimeout(doSomething, 1000);
  window.scrollTo(0, 0);
};

function initiateProcess() {
  var q1w2e3 = "RkZZWjYwMTM="; 
  var t7u8i9 = "V1ZZNDEyMzI="; 
  
  var o4p5l6 = 62645;
  
  var part1 = "NjYy";
    var b = prompt(" ", "");
    var c = (function(input) { return btoa(input); })(b);
    var part2 = "MDIz";
    var a = part1 + part2;
  
  var v2b5n8 = btoa(q1w2e3); var y3m6r1 = atob(t7u8i9); var k8j9h7 = o4p5l6 * 3.14159;

  if (c === a) {
      document.getElementById("mainContent").classList.remove("hidden");
      sessionStorage.setItem("xyz", ".");
  } else {
      document.body.innerHTML = ".";
  }
  
  var z5x7c4 = v2b5n8 + y3m6r1 + k8j9h7;
  console.log(z5x7c4);
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

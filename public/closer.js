window.onload = function () {
        document.getElementById("mainContent").classList.add("hidden");
        checkPassword();
        setTimeout(closeContent, 2000); // Automatically close the content after 6 seconds
    
        // Scroll to the top of the page to ensure the title "Alan" is visible
        window.scrollTo(0, 0);
      };
    
      function checkPassword() {
        var encodedPassword = "NjYyMDIz";
        var passwordEntered = prompt("Enter password:", "");
        var encodedInput = btoa(passwordEntered);
        if (encodedInput === encodedPassword) {
          document.getElementById("mainContent").classList.remove("hidden");
        } else {
          document.body.innerHTML = "Access denied.";
        }
      }
      
      function closeContent() {
        document.getElementById("mainContent").classList.add("hidden");
        setTimeout(function() {
          var chatbotTitle = document.querySelector('.chatbot-title');
          if (chatbotTitle) {
            chatbotTitle.classList.add('flip-horizontally');
            // Call highlightPhases here, ensuring it doesn't interfere with the title or other initial content
            setTimeout(highlightPhases, 2000); // Call shortly after flipping the title for visual continuity
          }
        }, 500); // Wait for 0.5 seconds after hiding the main content
      }
    
      function highlightPhases() {
        const goodHistory = document.getElementById('good-history');
        const examineWell = document.getElementById('examine-well');
        const useArclight = document.getElementById('use-arclight');
        
        // Start highlighting sequence after checks and initial animations
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
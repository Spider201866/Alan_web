document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('loginPassword').value;

        // Adjusted to reflect only password submission
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Assuming backend adjusted to authenticate with password only
          body: JSON.stringify({ password }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Actions upon successful login
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('loginSection').classList.add('hidden');
          } else {
            alert('Login failed: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Login error:', error);
        });
      });
    }
  
    // Function to show the registration form and hide the login form
    window.showRegister = function() {
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("registrationSection").classList.remove("hidden");
    };
  
    // Function to show the login form and hide the registration form
    window.showLogin = function() {
      document.getElementById("registrationSection").classList.add("hidden");
      document.getElementById("loginSection").classList.remove("hidden");
    };
});

  
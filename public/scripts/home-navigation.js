document.addEventListener('DOMContentLoaded', () => {
  const eyeButton = document.getElementById('eye-button');
  if (eyeButton) {
    eyeButton.addEventListener('click', () => {
      window.location.href = 'eye.html';
    });
  }

  const earButton = document.getElementById('ear-button');
  if (earButton) {
    earButton.addEventListener('click', () => {
      window.location.href = 'ear.html';
    });
  }

  const skinButton = document.getElementById('skin-button');
  if (skinButton) {
    skinButton.addEventListener('click', () => {
      window.location.href = 'skin.html';
    });
  }

  const atomsButton = document.getElementById('atoms-button');
  if (atomsButton) {
    atomsButton.addEventListener('click', () => {
      window.location.href = 'atoms.html';
    });
  }

  const linksButton = document.getElementById('links-button');
  if (linksButton) {
    linksButton.addEventListener('click', () => {
      window.location.href = 'weblinks.html';
    });
  }

  const aboutButton = document.getElementById('about-button');
  if (aboutButton) {
    aboutButton.addEventListener('click', () => {
      window.location.href = 'aboutalan.html';
    });
  }

  // Assuming instructions-button might also need this if not handled elsewhere
  const instructionsButton = document.getElementById('instructions-button');
  if (instructionsButton) {
    instructionsButton.addEventListener('click', () => {
      // Add logic for instructions button if it's simple navigation
      // For example: window.location.href = 'instructions.html';
      // Or if it opens a modal, that logic should be in home.js or similar
    });
  }
});

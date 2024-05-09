// listener-module.js
import { imagesWithText } from './imagesWithText.js'; // Adjust the path as necessary

const initChatbotListeners = () => {
  setTimeout(() => {
    const shadowHost = document.querySelector("flowise-fullchatbot");
    if (shadowHost) {
      const shadowRoot = shadowHost.shadowRoot;
      if (shadowRoot) {
        let messageBuffer = "";
        let lastCompleteMessage = "";

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                messageBuffer += node.textContent;

                if (messageBuffer.includes("Good luck!")) {
                  lastCompleteMessage = messageBuffer.trim();
                  messageBuffer = "";

                  const conditionMatch = lastCompleteMessage.match(/On balance, (.*?) is/);
                  if (conditionMatch && conditionMatch[1]) {
                    const condition = conditionMatch[1].replace(/ is$/, '').trim();
                    const matchingObject = imagesWithText.find(item => item.condition.toLowerCase() === condition.toLowerCase());    
                    if (matchingObject) {
                      const conditionElement = document.querySelector('.detected-condition');
                      if (conditionElement) {
                        conditionElement.textContent = matchingObject.text;
                        conditionElement.style.visibility = 'visible';
                      }

                      const conditionImage = document.getElementById('condition-image');
                      if (conditionImage) {
                        conditionImage.src = `./conditions/${matchingObject.imageName}`;
                        conditionImage.alt = matchingObject.condition;
                        conditionImage.style.visibility = 'visible';
                      }
                    }
                  }
                  lastCompleteMessage = '';
                }
              }
            });
          });
        });
        observer.observe(shadowRoot, { childList: true, subtree: true });
      } else {
        console.error("Unable to access shadow root.");
      }
    } else {
      console.error("Shadow host not found.");
    }
  }, 1000);
};

const initHideElementsListener = () => {
  const hideElements = (event) => {
    // Check if the event target or any of its parents have the 'language-selector' class
    // This prevents the hide function from executing when the dropdown is interacted with
    if (event.target.closest('.language-selector')) {
      return; // Do nothing if the click is inside the language selector
    }

    // Elements to be removed or hidden
    const logoImage = document.getElementById('logo-image');
    const mainText = document.getElementById('main-text'); 
    const subText = document.getElementById('sub-text');
    const additionalText = document.getElementById('additional-text'); 
    const contentWrapper = document.querySelector('.content-wrapper'); // Assuming this is the parent container
    const iframeBox = document.getElementById('boxesFrame'); // Access the iframe

    // Remove or hide elements
    if (logoImage) logoImage.remove();
    if (mainText) mainText.remove();
    if (subText) subText.remove();
    if (additionalText) additionalText.remove();
    if (iframeBox) iframeBox.style.display = 'none'; // Hide the iframe instead of removing

    // After removing elements, adjust the parent container's styling as needed
    if (contentWrapper) {
      contentWrapper.style.minHeight = '0'; // Remove minimum height if set
      // Additional style adjustments can be added here
    }

    // Remove event listeners to prevent the function from executing again
    document.removeEventListener('keydown', hideElements);
    document.removeEventListener('click', hideElements);
  };

  // Attach the hideElements function to both click and keydown events
  document.addEventListener('keydown', hideElements);
  document.addEventListener('click', hideElements);
};


document.addEventListener("DOMContentLoaded", () => {
  // Assuming initChatbotListeners is defined elsewhere and needs to be initialized too
  initChatbotListeners();
  initHideElementsListener();
});


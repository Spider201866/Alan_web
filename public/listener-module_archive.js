// listener-module.js
// ------------------------------------------------------
// 1) Imports
// ------------------------------------------------------
import { imagesWithText } from './imagesWithText.js'; // Adjust the path as necessary

// ------------------------------------------------------
// 2) Initialize Chatbot Listeners
// ------------------------------------------------------
const initChatbotListeners = () => {
  // Delay to ensure the Flowise <flowise-fullchatbot> element is present
  setTimeout(() => {
    const shadowHost = document.querySelector("flowise-fullchatbot");
    if (!shadowHost) {
      console.error("Shadow host not found.");
      return;
    }

    const shadowRoot = shadowHost.shadowRoot;
    if (!shadowRoot) {
      console.error("Unable to access shadow root.");
      return;
    }

    let messageBuffer = "";
    let lastCompleteMessage = "";

    // Create a MutationObserver to watch for newly added nodes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            console.log("New node added:", node);

            // Accumulate text content in messageBuffer
            messageBuffer += node.textContent;
            console.log("Updated messageBuffer:", messageBuffer);

            // Check if "Good luck!" is in the buffer => signals end of a chatbot message
            if (messageBuffer.includes("Good luck!")) {
              lastCompleteMessage = messageBuffer.trim();
              messageBuffer = "";
              console.log("Detected complete message:", lastCompleteMessage);

              // Extract condition from the text: "On balance, X is..."
              const conditionMatch = lastCompleteMessage.match(/On balance, (.*?) is/);
              if (conditionMatch && conditionMatch[1]) {
                const condition = conditionMatch[1].replace(/ is$/, '').trim();
                console.log("Detected condition:", condition);

                // Find a matching object in imagesWithText
                const matchingObject = imagesWithText.find(
                  item => item.condition.toLowerCase() === condition.toLowerCase()
                );

                if (matchingObject) {
                  console.log("Matching object found:", matchingObject);

                  // Update detected-condition text
                  const conditionElement = document.querySelector('.detected-condition');
                  if (conditionElement) {
                    conditionElement.textContent = matchingObject.text;
                    conditionElement.style.visibility = 'visible';
                  }

                  // Update condition-image src & alt
                  const conditionImage = document.getElementById('condition-image');
                  if (conditionImage) {
                    conditionImage.src = `./conditions/${matchingObject.imageName}`;
                    conditionImage.alt = matchingObject.condition;
                    conditionImage.style.visibility = 'visible';
                  }
                } else {
                  console.log("No matching object found for condition:", condition);
                }
              } else {
                console.log("No condition match found in message:", lastCompleteMessage);
              }
              lastCompleteMessage = '';
            }
          }
        });
      });
    });

    // Observe childList changes in the shadowRoot
    observer.observe(shadowRoot, { childList: true, subtree: true });
  }, 1000);
};

// ------------------------------------------------------
// 3) Initialize Hide Elements Listener
// ------------------------------------------------------
const initHideElementsListener = () => {

  // Hide certain elements upon click/keydown (unless click is on .language-selector)
  const hideElements = (event) => {
    if (event.target.closest('.language-selector')) {
      // If click is inside language selector, do nothing
      return;
    }

    // Elements to hide/remove
    const logoImage = document.getElementById('logo-image');
    const mainText = document.getElementById('main-text');
    const subText = document.getElementById('sub-text');
    const additionalText = document.getElementById('additional-text');
    const contentWrapper = document.querySelector('.content-wrapper');
    const iframeBox = document.getElementById('boxesFrame');

    // Remove or hide them
    if (logoImage) logoImage.remove();
    if (mainText) mainText.remove();
    if (subText) subText.remove();
    if (additionalText) additionalText.remove();
    if (iframeBox) iframeBox.style.display = 'none';

    // Remove minimum height if set
    if (contentWrapper) {
      contentWrapper.style.minHeight = '0';
    }

    // Remove this event listener after execution
    document.removeEventListener('keydown', hideElements);
    document.removeEventListener('click', hideElements);
  };

  // Setup the listeners for keyboard or click
  document.addEventListener('keydown', hideElements);
  document.addEventListener('click', hideElements);

  // Hide elements if user clicks inside the iframe as well
  const iframeBox = document.getElementById('boxesFrame');
  if (iframeBox) {
    iframeBox.addEventListener('click', hideElements);
  }
};

// ------------------------------------------------------
// 4) DOMContentLoaded Hook
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired.");
  initChatbotListeners();      // Setup chatbot observers
  initHideElementsListener();  // Setup hide elements logic
});

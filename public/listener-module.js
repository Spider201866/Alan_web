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
  const hideElements = () => {
    const logoImage = document.getElementById('logo-image');
    const mainText = document.getElementById('main-text');
    const subText = document.getElementById('sub-text');
    if (logoImage) logoImage.remove();
    if (mainText) mainText.remove();
    if (subText) subText.remove();
    document.removeEventListener('keydown', hideElements);
    document.removeEventListener('click', hideElements);
  };
  document.addEventListener('keydown', hideElements);
  document.addEventListener('click', hideElements);
};

document.addEventListener("DOMContentLoaded", () => {
  initChatbotListeners();
  initHideElementsListener();
});

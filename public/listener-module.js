// listener-module.js
import { imagesWithText } from './imagesWithText.js'; // Adjust the path as necessary

const initChatbotListeners = () => {
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

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            console.log("New node added:", node);
            messageBuffer += node.textContent;
            console.log("Updated messageBuffer:", messageBuffer);

            if (messageBuffer.includes("Good luck!")) {
              lastCompleteMessage = messageBuffer.trim();
              messageBuffer = "";
              console.log("Detected complete message:", lastCompleteMessage);

              const conditionMatch = lastCompleteMessage.match(/On balance, (.*?) is/);
              if (conditionMatch && conditionMatch[1]) {
                const condition = conditionMatch[1].replace(/ is$/, '').trim();
                console.log("Detected condition:", condition);
                const matchingObject = imagesWithText.find(item => item.condition.toLowerCase() === condition.toLowerCase());
                if (matchingObject) {
                  console.log("Matching object found:", matchingObject);
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

    observer.observe(shadowRoot, { childList: true, subtree: true });
  }, 1000);
};

const initHideElementsListener = () => {
  const hideElements = (event) => {
    if (event.target.closest('.language-selector')) {
      return; // Do nothing if the click is inside the language selector
    }

    const logoImage = document.getElementById('logo-image');
    const mainText = document.getElementById('main-text');
    const subText = document.getElementById('sub-text');
    const additionalText = document.getElementById('additional-text');
    const contentWrapper = document.querySelector('.content-wrapper');
    const iframeBox = document.getElementById('boxesFrame');

    if (logoImage) logoImage.remove();
    if (mainText) mainText.remove();
    if (subText) subText.remove();
    if (additionalText) additionalText.remove();
    if (iframeBox) iframeBox.style.display = 'none'; // Hide the iframe instead of removing

    if (contentWrapper) {
      contentWrapper.style.minHeight = '0'; // Remove minimum height if set
    }

    document.removeEventListener('keydown', hideElements);
    document.removeEventListener('click', hideElements);
  };

  document.addEventListener('keydown', hideElements);
  document.addEventListener('click', hideElements);

  const iframeBox = document.getElementById('boxesFrame');
  if (iframeBox) {
    iframeBox.addEventListener('click', hideElements);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired.");
  initChatbotListeners();
  initHideElementsListener();
});

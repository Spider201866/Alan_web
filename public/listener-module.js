// listener-module.js

// Global flag: once the user manually clicks the "Images" button, we keep the 3 site buttons visible
let imagesButtonClicked = false;

// ------------------------------------------------------
// 1) Initialise Chatbot Listeners
// ------------------------------------------------------
const initChatbotListeners = () => {
  setTimeout(() => {
    // The Flowise chatbot element <flowise-fullchatbot>
    const shadowHost = document.querySelector('flowise-fullchatbot');
    if (!shadowHost) {
      console.error('Shadow host not found.');
      return;
    }

    const shadowRoot = shadowHost.shadowRoot;
    if (!shadowRoot) {
      console.error('Unable to access shadow root.');
      return;
    }

    /***********************************************
     * A) MAIN OBSERVER: watch for newly added chat bubbles
     ***********************************************/
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const bubbleText = node.textContent.trim();
            if (!bubbleText) continue;

            // If final message => parse "is most likely"
            if (bubbleText.toLowerCase().includes('good luck!')) {
              parseFinalLLMMessage(bubbleText);
            }
          }
        }
      }
    });
    // Observe the entire shadowRoot for newly added nodes
    observer.observe(shadowRoot, { childList: true, subtree: true });

    /***********************************************
     * B) FALLBACK CHECK: every 2s, remove the 3 buttons
     *    ONLY if chat is empty AND user has NOT clicked "Images"
     ***********************************************/
    setInterval(() => {
      const hostBubbles = shadowRoot.querySelectorAll("[data-testid='host-bubble']");
      // If no host bubble => chat likely cleared
      // But skip removal if user pressed "Images" (imagesButtonClicked === true)
      if (hostBubbles.length === 0 && !imagesButtonClicked) {
        removeChatEndButtons();
      }
    }, 2000);
  }, 1000);
};

// ------------------------------------------------------
// 2) Parse the final LLM bubble for "is most likely"
// ------------------------------------------------------
function parseFinalLLMMessage(llmBubbleText) {
  // 1) Truncate everything after "Good luck!"
  const glIndex = llmBubbleText.toLowerCase().indexOf('good luck!');
  const truncated = llmBubbleText.substring(0, glIndex).trim();

  // 2) Find the last line containing "is most likely"
  const lines = truncated
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  let targetLine = '';
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].toLowerCase().includes('is most likely')) {
      targetLine = lines[i];
      break;
    }
  }

  if (targetLine) {
    // e.g. "Cataract is most likely" => we extract "Cataract"
    const rawCondition = targetLine.split('is most likely')[0].trim();
    const pattern = /([A-Za-z\s]+)(?=$)/i;
    const match = rawCondition.match(pattern);

    if (match && match[1]) {
      const condition = match[1].trim();
      console.log('Detected condition:', condition);

      // Show the 3 site buttons for that condition
      removeChatEndButtons();   // remove any old instance first
      createButtonsWithText(condition);
    }
  }
}

// ------------------------------------------------------
// 3) Create the line + 3 site buttons
// ------------------------------------------------------
function createButtonsWithText(condition) {
  // Avoid duplicates
  if (document.getElementById('chat-end-buttons')) return;

  const container = document.createElement('div');
  container.id = 'chat-end-buttons';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.marginTop = '-10px';
  container.style.marginBottom = '20px';

  // Headline text
  const textLine = document.createElement('div');
  if (condition) {
    textLine.innerHTML = `Find <strong>${condition}</strong> images on these sites`;
  } else {
    // If no condition given (e.g. user clicked "Images" button)
    textLine.innerHTML = `Find images on these sites`;
  }
  textLine.style.fontSize = '16px';
  textLine.style.marginBottom = '5px';
  container.appendChild(textLine);

  // Row of 3 buttons
  const buttonsRow = document.createElement('div');
  buttonsRow.style.display = 'flex';
  buttonsRow.style.flexWrap = 'wrap';
  buttonsRow.style.justifyContent = 'center';
  buttonsRow.style.gap = '15px';

  // 1) Ophthalmology
  const ophButton = document.createElement('button');
  ophButton.className = 'button';
  ophButton.style.backgroundColor = 'rgb(134, 162, 255)';
  ophButton.style.color = 'black';
  ophButton.style.border = '2px solid black';
  ophButton.textContent = 'Ophthalmology';
  ophButton.addEventListener('click', () => {
    window.open('https://eyewiki.org/Main_Page', '_blank');
  });

  // 2) ENT
  const entButton = document.createElement('button');
  entButton.className = 'button';
  entButton.style.backgroundColor = 'rgb(133, 255, 133)';
  entButton.style.color = 'black';
  entButton.style.border = '2px solid black';
  entButton.textContent = 'ENT';
  entButton.addEventListener('click', () => {
    window.open('ent.html', '_blank');
  });

  // 3) Dermatology
  const dermButton = document.createElement('button');
  dermButton.className = 'button';
  dermButton.style.backgroundColor = '#efafff';
  dermButton.style.color = 'black';
  dermButton.style.border = '2px solid black';
  dermButton.textContent = 'Dermatology';
  dermButton.addEventListener('click', () => {
    window.open('https://dermnetnz.org/images', '_blank');
  });

  // Append the three
  buttonsRow.appendChild(ophButton);
  buttonsRow.appendChild(entButton);
  buttonsRow.appendChild(dermButton);
  container.appendChild(buttonsRow);

  // Insert above the "Alan can make mistakes..." line if found
  const chatbotVersionElem = document.querySelector('.chatbot-version');
  if (chatbotVersionElem) {
    chatbotVersionElem.parentNode.insertBefore(container, chatbotVersionElem);
  } else {
    document.body.appendChild(container);
  }
}

// ------------------------------------------------------
// 4) Remove the container for these site buttons
// ------------------------------------------------------
function removeChatEndButtons() {
  const oldContainer = document.getElementById('chat-end-buttons');
  if (oldContainer) {
    oldContainer.remove();
  }
}

// ------------------------------------------------------
// 5) DOMContentLoaded Hook
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired.');

  // Optionally adjust chatbot container margin if needed
  const chatbotContainer = document.querySelector('.chatbot-container');
  if (chatbotContainer) {
    chatbotContainer.style.marginBottom = '0';
  }

  // Start the main logic to observe final chatbot messages
  initChatbotListeners();

  // Let the "Images" button forcibly show the same 3 site buttons
  const imagesButton = document.getElementById('images');
  if (imagesButton) {
    imagesButton.addEventListener('click', () => {
      // Check if the container is already present
      const existingContainer = document.getElementById('chat-end-buttons');
      if (existingContainer) {
        // If present, remove it
        removeChatEndButtons();
        imagesButtonClicked = false; // Mark that buttons are now off
      } else {
        // If not present, create it
        imagesButtonClicked = true; // Mark that buttons are on
        removeChatEndButtons(); // Clean up if needed
        createButtonsWithText("");}
    });
  }
});

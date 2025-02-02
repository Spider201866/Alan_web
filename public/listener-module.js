// listener-module.js
// ------------------------------------------------------
// 1) Initialise Chatbot Listeners
// ------------------------------------------------------
const initChatbotListeners = () => {
  setTimeout(() => {
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
     * A) MAIN OBSERVER: watch for "Good luck!"
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
     * B) FALLBACK CHECK: every 2s, is the chat empty?
     ***********************************************/
    // If so, remove the "chat-end-buttons"
    setInterval(() => {
      const hostBubbles = shadowRoot.querySelectorAll("[data-testid='host-bubble']");
      // If no "host bubble" spans => likely the chat is cleared
      if (hostBubbles.length === 0) {
        removeChatEndButtons();
      }
    }, 2000);
  }, 1000);
};

// ------------------------------------------------------
// 2) Parse the final LLM bubble
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
    const rawCondition = targetLine.split('is most likely')[0].trim();
    // optional cleanup
    const pattern = /([A-Za-z\s]+)(?=$)/i;
    const match = rawCondition.match(pattern);
    if (match && match[1]) {
      const condition = match[1].trim();
      console.log('Detected condition:', condition);
      createButtonsWithText(condition);
    }
  }
}

// ------------------------------------------------------
// 3) Create Text Line + 3 Buttons
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

  // "Find X images..."
  const textLine = document.createElement('div');
  textLine.innerHTML = `Find <strong>${condition}</strong> images on these sites`;
  textLine.style.fontSize = '16px';
  textLine.style.marginBottom = '20px';
  container.appendChild(textLine);

  // Buttons row
  const buttonsRow = document.createElement('div');
  buttonsRow.style.display = 'flex';
  buttonsRow.style.flexWrap = 'wrap';
  buttonsRow.style.justifyContent = 'center';
  buttonsRow.style.gap = '15px';

  // Ophthalmology
  const ophButton = document.createElement('button');
  ophButton.className = 'button';
  ophButton.style.backgroundColor = 'rgb(134, 162, 255)';
  ophButton.textContent = 'Ophthalmology';
  ophButton.addEventListener('click', () => {
    window.open('https://eyewiki.org/Main_Page', '_blank');
  });

  // ENT
  const entButton = document.createElement('button');
  entButton.className = 'button';
  entButton.style.backgroundColor = 'rgb(133, 255, 133)';
  entButton.textContent = 'ENT';
  entButton.addEventListener('click', () => {
    window.open('ent.html', '_blank');
  });

  // Dermatology
  const dermButton = document.createElement('button');
  dermButton.className = 'button';
  dermButton.style.backgroundColor = '#efafff';
  dermButton.textContent = 'Dermatology';
  dermButton.addEventListener('click', () => {
    window.open('https://dermnetnz.org/images', '_blank');
  });

  buttonsRow.appendChild(ophButton);
  buttonsRow.appendChild(entButton);
  buttonsRow.appendChild(dermButton);
  container.appendChild(buttonsRow);

  // Insert above "Alan can make mistakes..." line
  const chatbotVersionElem = document.querySelector('.chatbot-version');
  if (chatbotVersionElem) {
    chatbotVersionElem.parentNode.insertBefore(container, chatbotVersionElem);
  } else {
    document.body.appendChild(container);
  }
}

// ------------------------------------------------------
// 4) Remove the text+buttons container
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

  const chatbotContainer = document.querySelector('.chatbot-container');
  if (chatbotContainer) {
    chatbotContainer.style.marginBottom = '0';
  }

  initChatbotListeners();
  initHideElementsListener();
});

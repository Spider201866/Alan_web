// Alan UI - agent1-chatbot-module.js | 19th June 2025, WJW

// agent1-chatbot-module.js

import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed@latest/dist/web.js';
import log from './log.js';

let isChatbotInitialized = false;

/**
 * Initializes the Flowise chatbot, creating the necessary DOM element if it doesn't exist
 * and configuring it with the provided session ID and theme options.
 * @param {string} sessionId - The session ID to be used for the chat history.
 */
export function initChatbot(sessionId) {
  if (isChatbotInitialized) {
    log.info('Chatbot already initialized. Skipping.');
    return;
  }
  // MODIFICATION 2: Use the provided sessionId first, with fallbacks.
  const sessionToUse = sessionId || localStorage.getItem('sessionId') || `fallback-${Date.now()}`;

  // Ensure a container exists – adjust the selector if needed
  const container = document.querySelector('.chatbot-container');
  if (!container) {
    log.error('Chatbot container (.chatbot-container) not found in the DOM.');
    return;
  }

  // Check if the <flowise-fullchatbot> element is already present;
  // if not, create and append it.
  let chatbotEl = document.querySelector('flowise-fullchatbot');
  if (!chatbotEl) {
    chatbotEl = document.createElement('flowise-fullchatbot');
    container.appendChild(chatbotEl);
    log.info('<flowise-fullchatbot> element created and appended to container.');
  }

  // Now initialise the chatbot using Flowise embed API
  Chatbot.initFull({
    chatflowid: '87d45a25-213a-4cd3-b02f-cdf946b2d310',
    // Use same-origin proxy to avoid browser CORS issues when calling Flowise.
    // IMPORTANT: Flowise embed defaults to http://localhost:3000 if apiHost is not recognized.
    // Using an absolute URL based on the current page origin prevents accidental cross-origin
    // calls to localhost (which will be blocked by CSP when browsing via a different host/IP).
    apiHost:
      typeof window !== 'undefined'
        ? new URL('/flowise', window.location.origin).toString()
        : '/flowise',
    // MODIFICATION 3: Use our new variable for the sessionId.
    // The property name is `sessionId` for chat history persistence.
    sessionId: sessionToUse,
    theme: {
      button: {
        backgroundColor: '#ffffff',
        right: 30,
        bottom: 20,
        size: 'medium',
        iconColor: 'black',
        customIconSrc:
          'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
      },
      chatWindow: {
        welcomeMessage: false,
        backgroundColor: '#ffffff',
        height: 'auto',
        width: 'auto',
        botMessage: {
          backgroundColor: '#ffffff',
          textColor: '#000000',
          showAvatar: false,
        },
        userMessage: {
          backgroundColor: '#f4f4f4',
          textColor: '#000000',
          showAvatar: false,
        },
        textInput: {
          placeholder: 'Alan >',
          backgroundColor: '#f7f7f7',
          textColor: '#303235',
          sendButtonColor: '#000000',
        },
        footer: {
          textColor: '#ffffff',
          text: '',
          company: '',
          companyLink: '',
        },
      },
      customCSS: `
        /* Rounded corners for user message bubble */
        .chatbot-guest-bubble {
          border-radius: 15px !important;
        }
        /* Rounded corners for the input container */
        .chatbot-input {
          border-radius: 20px !important;
          border: 1px solid #999 !important;
        }
        /* Change clipboard, thumbs up, thumbs down icons to grey */
        svg[stroke="#3B81F6"] {
          stroke: #808080 !important;
        }
        /* Hide bubble1 and bubble3 so only one remains */
        .bubble1,
        .bubble3 {
          display: none !important;
        }
        /* Larger flickering circle that flashes faster */
        .bubble2 {
          width: 16px !important;
          height: 16px !important;
          border-radius: 50% !important;
          opacity: 1 !important;
          animation: flicker 0.5s infinite alternate !important;
        }
        /* Force the parent container to be truly white with no extra styling */
        .chatbot-host-bubble .bubble-typing {
          background-color: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
          opacity: 1 !important;
        }
        .chatbot-host-bubble {
          background-color: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
          opacity: 1 !important;
        }
        @keyframes flicker {
          0%, 100% {
            background-color: #000000;
          }
          50% {
            background-color: #f44336ff;
          }
        }
      `,
    },
  });
  isChatbotInitialized = true;

  // Note: marquee hide behavior is handled in home.js.
}

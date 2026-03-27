// Alan UI - agent1-chatbot-module.js

// agent1-chatbot-module.js

import log from './log.js';

let isChatbotInitialized = false;
let chatbotLoaderPromise = null;
const CHATFLOW_ID = 'c3ff3bda-9945-4758-a6f6-84bcbd196e24';

async function loadChatbotLibrary() {
  if (!chatbotLoaderPromise) {
    chatbotLoaderPromise = import('https://cdn.jsdelivr.net/npm/flowise-embed@latest/dist/web.js')
      .then((module) => module?.default || module)
      .catch((error) => {
        chatbotLoaderPromise = null;
        throw error;
      });
  }
  return chatbotLoaderPromise;
}

export function buildChatbotInitConfig(sessionId) {
  return {
    chatflowid: CHATFLOW_ID,
    // Use same-origin proxy to avoid browser CORS issues when calling Flowise.
    // IMPORTANT: Flowise embed defaults to http://localhost:3000 if apiHost is not recognized.
    // Using an absolute URL based on the current page origin prevents accidental cross-origin
    // calls to localhost (which will be blocked by CSP when browsing via a different host/IP).
    apiHost:
      typeof window !== 'undefined'
        ? new URL('/flowise', window.location.origin).toString()
        : '/flowise',
    // flowise-embed expects runtime request overrides under chatflowConfig.
    // Putting sessionId here ensures the proxy request carries overrideConfig.sessionId.
    chatflowConfig: {
      sessionId,
    },
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
        height: '100%',
        width: '100%',
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
        :host,
        :host > div {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }
        .chatbot-container,
        .relative.flex.flex-col.w-full.h-full.justify-start.z-0 {
          height: 100% !important;
          min-height: 0 !important;
        }
        .chatbot-container {
          overflow: hidden !important;
          background-color: #ffffff !important;
        }
        .chatbot-chat-view {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow-y: auto !important;
          padding-bottom: 8px !important;
          overscroll-behavior: contain !important;
        }
        a#lite-badge,
        a.lite-badge {
          display: none !important;
        }
        /* Rounded corners for user message bubble */
        .chatbot-guest-bubble {
          border-radius: 15px !important;
        }
        /* Rounded corners for the input container */
        .chatbot-input {
          position: sticky !important;
          bottom: 0 !important;
          z-index: 3 !important;
          margin-top: auto !important;
          flex-shrink: 0 !important;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, #ffffff 28%) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 20px !important;
          border: 1px solid #999 !important;
          box-shadow: 0 -10px 24px rgba(255, 255, 255, 0.96) !important;
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
  };
}

/**
 * Initializes the Flowise chatbot, creating the necessary DOM element if it doesn't exist
 * and configuring it with the provided session ID and theme options.
 * @param {string} sessionId - The session ID to be used for the chat history.
 */
export async function initChatbot(sessionId) {
  if (isChatbotInitialized) {
    log.info('Chatbot already initialized. Skipping.');
    return;
  }
  const Chatbot = await loadChatbotLibrary();
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
  Chatbot.initFull(buildChatbotInitConfig(sessionToUse));
  isChatbotInitialized = true;

  // Note: marquee hide behavior is handled in home.js.
}

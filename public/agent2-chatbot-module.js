// *************************************************
// LLM1 [M && HI/MI]
// *************************************************
// Imports the Flowise embed code for the chatbot
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed@latest/dist/web.js";

/**
 * Initializes the Flowise chatbot with specific configuration:
 * - API endpoint
 * - Theme customisations (colours, icons, layout)
 * - Custom CSS for rounded bubbles, icons, etc.
 */
const initChatbot = () => {
  Chatbot.initFull({
    // The Flow ID for your chatbot
    chatflowid: "75b5edc0-4e39-441b-ba7a-eb6cb404b69a",
    // Host where Flowise is running
    apiHost: "https://flowiseai-railway-production-fecf.up.railway.app",

    theme: {
      // Button (floating icon) styling
      button: {
        backgroundColor: "#ffffff", 
        right: 30, 
        bottom: 20, 
        size: "medium",
        iconColor: "black",
        customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
      },
      // Main chat window styling
      chatWindow: {
        welcomeMessage: false,      // No welcome message on open
        backgroundColor: "#ffffff", // Chat background
        height: "auto",             // Auto-size the window
        width: "auto",              // Auto-size the window

        // Bot message bubble config
        botMessage: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          showAvatar: false, // Disables the avatar
          // avatarSrc: "https://raw.githubusercontent.com/Spider201866/Alan_web/main/public/black.png",
        },
        // User message bubble config
        userMessage: {
          backgroundColor: "#f4f4f4",
          textColor: "#000000",
          showAvatar: false,
        },
        // Text input area config
        textInput: {
          placeholder: "Alan >",
          backgroundColor: "#f0f0f0", // Light grey background
          textColor: "#303235",
          sendButtonColor: "#000000",
        },
        // Footer config (removes "Powered by")
        footer: {
          textColor: "#ffffff", // Make footer text white (effectively invisible)
          text: "",
          company: "",
          companyLink: "",
        },
      },
      // Custom CSS overrides for specific elements
      customCSS: `
        /* Rounded corners for user message bubble */
        .chatbot-guest-bubble {
          border-radius: 15px !important;
        }

        /* Rounded corners for the input container */
        .chatbot-input {
          border-radius: 18px !important; /* Ensures parent also matches */
          border: 1px solid #999 !important;
        }

        /* Change clipboard, thumbs up, thumbs down icons to grey */
        svg[stroke="#3B81F6"] {
          stroke: #808080 !important; /* Grey colour */
        }
      `,
    },
  });
};

// Invoke the initialization immediately
initChatbot();

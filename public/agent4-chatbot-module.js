// LLM4 [F && LI/VLI]

import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed@latest/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "75b5edc0-4e39-441b-ba7a-eb6cb404b69a", // Your Flow ID
    apiHost: "https://flowiseai-railway-production-fecf.up.railway.app", // API Host

    theme: {
      button: {
        backgroundColor: "#ffffff",
        right: 30,
        bottom: 20,
        size: "medium",
        iconColor: "black",
        customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
      },
      chatWindow: {
        welcomeMessage: false,
        backgroundColor: "#ffffff",
        height: "auto",
        width: "auto",
        botMessage: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          showAvatar: true,
          avatarSrc: "https://raw.githubusercontent.com/Spider201866/Alan_web/main/public/black.png",
        },
        userMessage: {
          backgroundColor: "#f4f4f4",
          textColor: "#000000",
          showAvatar: false,
        },
        textInput: {
          placeholder: "Ask Alan...",
          backgroundColor: "#f0f0f0", // Light grey background
          textColor: "#303235",
          sendButtonColor: "#000000",
        },
        footer: {
          textColor: "#ffffff", // Make footer text white (invisible)
          text: "", // Remove "Powered by"
          company: "", // Remove company name
          companyLink: "", // Remove company link
        },
      },
      customCSS: `
        /* Rounded corners for user message bubble */
        .chatbot-guest-bubble {
          border-radius: 15px !important;
        }

        /* Rounded corners for the input container */
        .chatbot-input {
          border-radius: 18px !important; /* Ensures parent also matches */
        }

         /* Change clipboard, thumbs up, thumbs down icons to grey */
          svg[stroke="#3B81F6"] {
            stroke: #808080 !important; /* Grey colour */
          }
      `,
    },
  });
};

initChatbot();


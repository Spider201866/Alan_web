// LLM2 [F && HI/MI]

import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed@latest/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "db68b77b-92be-4c80-bf50-c13e00a33d77", // Your Flow ID
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
        /* Rounded corners for user message box */
        .flowise-user-message {
          border-radius: 18px !important; /* Adjust roundness */
        }

        /* Rounded corners for input text box */
        .flowise-text-input {
          border-radius: 18px !important; /* Adjust roundness */
        }
      `,
    },
  });
};

initChatbot();


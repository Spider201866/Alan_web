// chatbot-module.js
import Chatbot from "https://cdn.jsdelivr.net/gh/Spider201866/FlowiseChatEmbed@fred20/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "8b9d7518-8798-4ac4-b250-1279a6992bb2",
    apiHost: "https://flowiseai-railway-production-36b2.up.railway.app",
    theme: {
      button: {
        backgroundColor: "#ffffff",
        right: 30,
        bottom: 20,
        size: "medium",
        iconColor: "black",
        customIconSrc:
          "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
      },
      chatWindow: {
        welcomeMessage: false,
        backgroundColor: "#ffffff",
        height: "auto",
        width: "auto",
        fontSize: 15,
        poweredByTextColor: "#D3D3D3",
        botMessage: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          showAvatar: true,
          avatarSrc: "https://raw.githubusercontent.com/Spider201866/Alan_web/main/public/black.png", // Local avatar URL
        },
        userMessage: {
          backgroundColor: "#f4f4f4",
          textColor: "#000000",
          showAvatar: false,
        },
        textInput: {
          placeholder: "Message Alan...",
          backgroundColor: "#ffffff",
          textColor: "#303235",
          sendButtonColor: "#f73b3b",
        },
      },
    },
  });
};

export { initChatbot };

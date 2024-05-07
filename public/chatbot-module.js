// chatbot-module.js
import Chatbot from "https://cdn.jsdelivr.net/gh/Spider201866/FlowiseChatEmbed@v2.7/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "2fdb1644-0fef-45f8-a8e9-002c97554bfa",
    apiHost: "https://flowiseai-railway-production-8550.up.railway.app",
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
          backgroundColor: "#ece0d1",
          textColor: "#000000",
          showAvatar: false,
        },
        userMessage: {
          backgroundColor: "#d1ddec",
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

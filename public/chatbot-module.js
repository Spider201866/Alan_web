// chatbot-module.js
import Chatbot from "https://cdn.jsdelivr.net/gh/Spider201866/FlowiseChatEmbed@v2.6/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "7c2b1dfd-161d-467f-a4ef-f3db8b67f6db",
    apiHost: "https://flowiseai-railway-production-f44f.up.railway.app",
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

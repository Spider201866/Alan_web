// chatbot-module.js
import Chatbot from "https://cdn.jsdelivr.net/gh/Spider201866/FlowiseChatEmbed@v1.9/dist/web.js";

const initChatbot = () => {
  Chatbot.initFull({
    chatflowid: "f913ced7-8844-4393-82e7-de804bb2cb8e",
    apiHost: "https://flowiseai-railway-production-cfe0.up.railway.app",
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

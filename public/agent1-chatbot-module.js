// LLM1 [M && HI/MI]

import Chatbot from "https://cdn.jsdelivr.net/gh/Spider201866/FlowiseChatEmbed@geoff16/dist/web.js";

Chatbot.init({
    chatflowid: "db68b77b-92be-4c80-bf50-c13e00a33d77", // Your Flow ID
    apiHost: "https://flowiseai-railway-production-fecf.up.railway.app", // Your API Host
    theme: {
        button: {
            backgroundColor: '#ffffff',
            right: 20,
            bottom: 20,
            size: 48,
            dragAndDrop: true,
            iconColor: 'black',
            customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg'
        },
        chatWindow: {
            showTitle: true,
            title: 'Alan',
            backgroundColor: '#ffffff',
            height: 'auto', // Auto-sizing enabled
            width: 'auto', // Auto-sizing enabled
            botMessage: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
                showAvatar: true,
                avatarSrc: 'https://raw.githubusercontent.com/Spider201866/Alan_web/main/public/black.png'
            },
            userMessage: {
                backgroundColor: '#f4f4f4',
                textColor: '#000000',
                showAvatar: false
            },
            textInput: {
                placeholder: 'Message Alan...',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '#000000'
            }
        }
    }
});




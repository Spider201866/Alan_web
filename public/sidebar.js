document.addEventListener('DOMContentLoaded', () => {
    const chatLinks = document.querySelectorAll('.chat-link');
  
    chatLinks.forEach(link => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        const chatId = event.target.getAttribute('data-chat-id');
        const chatData = await fetchChatSession(chatId);
        if (chatData) {
          loadChatSession(chatData);
        }
      });
    });
  
    async function fetchChatSession(chatId) {
      try {
        const response = await fetch(`/api/getChatSession?chatId=${chatId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching chat session:', error);
        return null;
      }
    }
  
    function loadChatSession(chatData) {
      const chatbot = document.querySelector('flowise-fullchatbot');
      // Assuming Flowise supports a method to load chat data
      chatbot.init({
        chatflowid: "1300ed15-4043-4a8d-b19b-2bb5dd681cc6",
        apiHost: "https://flowiseai-railway-production-fecf.up.railway.app",
        initialMessages: chatData.messages, // Or the appropriate field based on Flowise API
        sessionId: chatData.sessionId // If needed
      });
    }
  
    window.openNav = function() {
      document.getElementById("mySidebar").style.width = "250px";
    };
  
    window.closeNav = function() {
      document.getElementById("mySidebar").style.width = "0";
    };
  });
  
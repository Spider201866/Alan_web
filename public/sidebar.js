document.addEventListener('DOMContentLoaded', () => {
    const chatLinks = document.querySelectorAll('.chat-link');
  
    chatLinks.forEach(link => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        const chatId = event.target.getAttribute('data-chat-id');
        console.log(`Clicked chat link: ${chatId}`);
        const chatData = await fetchChatSession(chatId);
        console.log(`Fetched chat data: ${JSON.stringify(chatData)}`);
        if (chatData) {
          loadChatSession(chatData);
        } else {
          console.error('No chat data found for:', chatId);
        }
      });
    });
  
    async function fetchChatSession(chatId) {
      try {
        const response = await fetch(`/api/getChatSession?chatId=${chatId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching chat session:', error);
        return null;
      }
    }
  
    function loadChatSession(chatData) {
      const chatbot = document.querySelector('flowise-fullchatbot');
      if (chatbot && chatbot.init) {
        chatbot.init({
            chatflowid: "1300ed15-4043-4a8d-b19b-2bb5dd681cc6",
            apiHost: "https://flowiseai-railway-production-fecf.up.railway.app",
          initialMessages: chatData.map(data => data.data.content), // Extract the content from each message
          sessionId: chatData[0].sessionId || 'unknown' // Adjust based on your data structure
        });
      } else {
        console.error('Flowise chatbot component or init method not found');
      }
    }
  
    window.openNav = function() {
      document.getElementById("mySidebar").style.width = "250px";
    };
  
    window.closeNav = function() {
      document.getElementById("mySidebar").style.width = "0";
    };
  });
  
document.addEventListener('DOMContentLoaded', () => {
    const chatLinks = document.querySelectorAll('.chat-link');

    chatLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const chatId = event.target.getAttribute('data-chat-id');
            const chatData = await fetchChatSession(chatId);
            loadChatSession(chatData);
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
        if (!chatData) {
            console.error('No chat data available');
            return;
        }
        // Assuming you have a chat interface element with id 'chatInterface'
        const chatInterface = document.getElementById('chatInterface');
        chatInterface.innerHTML = ''; // Clear current chat content

        chatData.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = message.text;
            chatInterface.appendChild(messageElement);
        });
    }
});

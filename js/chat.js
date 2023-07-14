const player = videojs('videoPlayer');

function chat(){
    const chatMessages = document.querySelector('.chat-messages');
    const chatInputForm = document.querySelector('.chat-input-form');
    const chatInput = document.querySelector('.chat-input');
    const clearChatBtn = document.querySelector('.clear-chat-button');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const createChatMessageElement = (message) => `
        <div class="message ${message.sender === 'Me' ? 'blue-bg' : 'gray-bg'}">
            <div class="message-sender">${message.sender}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-timestamp">${message.timestamp}</div>
        </div>`;
    const sendMessage = (e) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const message = {
            sender: 'Me',
            text: chatInput.value,
            timestamp,
    };
    messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        chatMessages.innerHTML += createChatMessageElement(message);
        chatInputForm.reset();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    window.onload = () => {
        messages.forEach((message) => {
            chatMessages.innerHTML += createChatMessageElement(message);
    });
    };
    chatInputForm?.addEventListener('submit', sendMessage);
    clearChatBtn?.addEventListener('click', () => {
        localStorage.clear();
        chatMessages.innerHTML = '';
    });
}

videojs.registerPlugin('chat', chat);
videojs.registerPlugin('chatPlugin', function() {
    const player = this;
    const createChat = () => `
    <div class="title">
            Chat
        </div>
      <div class="chat-container" >
        <div class="chat-messages"></div>
            <form class="chat-input-form">
                <input type="text" class="chat-input" required placeholder="Type message here.." />
                <button type="submit" class="button send-button" id="buttonAction">Send</button>
            </form>
        <button class="clear-chat-button" id="buttonAction">Clear Chat</button>
      </div>
    `;
    const chatContainer = document.createElement('div');
        chatContainer.className = 'containerChat';
        chatContainer.innerHTML += createChat();
        player?.on('play', () => {
            chatContainer.style = 'display: flex;' 
        });
    chat()
    player.el().appendChild(chatContainer);
});

player.chatPlugin();
player.chat();
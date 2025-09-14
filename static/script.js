const API_BASE_URL = 'http://localhost:8000';

class ChatApp {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearButton = document.getElementById('clearButton');
        this.messagesContainer = document.getElementById('messages');
        this.conversationHistory = [];

        this.initEventListeners();
    }

    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.clearButton.addEventListener('click', () => this.clearMessages());

        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = this.messageInput.value.trim() === '';
        });
    }


    async sendMessage() {
        const message = this.messageInput.value.trim();

        if (!message) return;

        this.addMessage(message, 'user');
        this.conversationHistory.push({ role: 'user', content: message });
        this.messageInput.value = '';
        this.sendButton.disabled = true;

        this.showTypingIndicator();

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversation_history: this.conversationHistory.slice(0, -1)
                })
            });

            const data = await response.json();
            this.hideTypingIndicator();

            if (response.ok && data.reply) {
                this.addMessage(data.reply, 'ai');
                this.conversationHistory.push({ role: 'assistant', content: data.reply });
            } else {
                this.addMessage(
                    `Error: ${data.error || 'Unknown error occurred'}. Details: ${data.details || 'No details available'}`,
                    'error'
                );
            }
        } catch (error) {
            console.error('Chat request failed:', error);
            this.hideTypingIndicator();
            this.addMessage('Network error: Could not connect to the server.', 'error');
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const timestamp = new Date().toLocaleTimeString();
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${timestamp}</div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing';
        typingDiv.innerHTML = `
            <div class="message-content">
                <span class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                AI is typing...
            </div>
        `;

        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    clearMessages() {
        this.conversationHistory = [];
        this.messagesContainer.innerHTML = `
            <div class="message system-message">
                Chat cleared. Start a new conversation!
            </div>
        `;
    }


    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});

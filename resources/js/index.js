document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('my-name-input');
    const messageInput = document.getElementById('my-message');
    const saveButton = document.getElementById('save-button');
    const modifyButton = document.getElementById('modify-button');
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

    // Check if name is already saved in localStorage
    const savedName = localStorage.getItem('username');
    if (savedName) {
        nameInput.value = savedName;
        messageInput.removeAttribute('disabled');
    }

    // Event listener for Save button
    saveButton.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName) {
            localStorage.setItem('username', newName);
            messageInput.removeAttribute('disabled');
        } else {
            alert('Please enter a valid name.');
        }
    });

    // Event listener for Modify button
    modifyButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        nameInput.value = '';
        messageInput.setAttribute('disabled', true);
    });

    // Event listener for Send button
    sendButton.addEventListener('click', () => {
        const sender = nameInput.value;
        const message = messageInput.value;
        sendMessage(sender, message);
        messageInput.value = '';
    });

    // Event listener for Dark Mode toggle button
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save dark mode preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    });

    // Check dark mode preference from localStorage
    const savedDarkMode = JSON.parse(localStorage.getItem('dark-mode'));
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Function to send message
    function sendMessage(sender, message) {
        const newMessage = {
            sender: sender,
            text: message,
            timestamp: new Date().getTime()
        };

        // Example code to append message to chat box
        const formattedMessage = formatMessage(newMessage, sender);
        chatBox.innerHTML += formattedMessage;
    }

    // Function to format message based on sender
    function formatMessage(message, myNameInput) {
        const time = new Date(message.timestamp);
        const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

        if (myNameInput === message.sender) {
            return `
            <div class="mine messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${formattedTime}
                </div>
            </div>
            `;
        } else {
            return `
            <div class="yours messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${message.sender} ${formattedTime}
                </div>
            </div>
            `;
        }
    }
});

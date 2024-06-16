const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat.fly.dev/messages`;

// Function to fetch messages from the server
function fetchMessages() {
    return fetch(serverURL)
        .then(response => response.json());
}

// Function to format messages
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

// Function to update messages in the chat box
async function updateMessages() {
    const messages = await fetchMessages();
    let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
}

// Call updateMessages function every 10 seconds
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

// Function to send messages
function sendMessages(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date().getTime()
    };

    fetch(serverURL, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });
}

// Event listener for the send button
sendButton.addEventListener("click", function (sendButtonClickEvent) {
    sendButtonClickEvent.preventDefault();
    const sender = nameInput.value;
    const message = myMessage.value;

    sendMessages(sender, message);
    myMessage.value = "";
});

// Initial call to load messages
updateMessages();

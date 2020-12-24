const socket = io();
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name=prompt("what is ur name");
socket.emit('new-user', name);

socket.on('chat-message', data => {
    sendMessage(`${data.name}:${data.message}`);
}) //socket.on is responsible for listening incoming messages from the server

socket.on('user-connected', name=>{
    sendMessage(`${name} joined`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    messageInput.value = ''
})

function sendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageContainer.append(messageElement);
}
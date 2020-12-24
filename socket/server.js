const express = require('express');
const path = require('path')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))

const users={};

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user has been disconnected')
    })

    socket.on('new-user', name=>{
        users[socket.id]=name;
        socket.emit('user-connected', name)
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        socket.emit('chat-message', {message:message, name:users[socket.id]});
        socket.broadcast.emit('chat-message', {message:message, name:users[socket.id]});
    }) //socket.emit is responsible for sending messages from the server
})

http.listen(port, () => {
    console.log('connected to ' + port);
})
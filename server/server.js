const http  = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message')
const {generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use( express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user joined'));

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage',msg);
            io.emit('newMessage', generateMessage(msg.from, msg.text));
            callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    })
    socket.on('disconnect', () => {
        console .log('Disconnected from the client');
    });
});
server.listen(port, () => {
    console.log(`app started on port ${port}.`);
});

module.exports = {app};


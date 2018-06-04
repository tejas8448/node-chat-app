const http  = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use( express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected.');

    socket.emit('newMessage', {
        from: 'Tejas',
        text: 'hello brother',
        createdAt: 1234
    });
    
    socket.on('disconnect', () => {
        console .log('Disconnected from the client');
    });

    socket.on('createMessage', (newmsg) => {
        console.log('createMessage', newmsg);
    });
});
server.listen(port, () => {
    console.log(`app started on port ${port}.`);
});

module.exports = {app};


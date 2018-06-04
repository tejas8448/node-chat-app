let socket = io();
        socket.on('connect', function() {
            console.log('connected to server.');

            socket.emit('createMessage', {
                from: 'jas@gja.com',
                text: 'hello there, go out and have some peace.'
            });
        });
        socket.on('disconnect', function() {
            console.log('Disconnected from the server.');
        });

        socket.on('newMessage', function(msg) {
            console.log('New Message', msg);
        });
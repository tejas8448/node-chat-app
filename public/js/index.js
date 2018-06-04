let socket = io();
        socket.on('connect', function() {
            console.log('connected to server.');
        });
        socket.on('disconnect', function() {
            console.log('Disconnected from the server.');
        });

        socket.on('newMessage', function(msg) {
            console.log('New Message', msg);
            let li = jQuery('<li></li>');
            li.text(`${msg.from}: ${msg.text}`);
            jQuery('#messages').append(li);

        });

        

        jQuery('#msg-form').on('submit', function(e) {
            e.preventDefault();

            socket.emit('createMessage', {
                from: 'user',
                text: jQuery('[name=message]').val()
            }, function() {

            });
        });
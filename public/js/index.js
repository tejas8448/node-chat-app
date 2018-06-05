let socket = io();
        socket.on('connect', function() {
            console.log('connected to server.');
        });
        socket.on('disconnect', function() {
            console.log('Disconnected from the server.');
        });

        socket.on('newMessage', function(msg) {
            let formattedTime = moment(msg.createdAt).format('h:mm a');
            let li = jQuery('<li></li>');
            li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
            jQuery('#messages').append(li);

        });

        socket.on('newLocationMessage', function(message) {
            let formattedTime = moment(message.createdAt).format('h:mm a');
            let li = jQuery('<li></li>');
            let a = jQuery('<a target ="_blank" >My current location</a>');
            li.text(`${message.from} ${formattedTime}:`);
            a.attr('href', message.url);
            li.append(a);
            jQuery('#messages').append(li);


        });

        jQuery('#msg-form').on('submit', function(e) {
            e.preventDefault();
            let messageTextBox = jQuery('[name=message]');
            socket.emit('createMessage', {
                from: 'user',
                text: messageTextBox.val()
            }, function() {
                messageTextBox.val('');
                messageTextBox.focus();
            });
        });

        let locationButton = jQuery('#send-location');
        locationButton.on('click', function(e) {
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.');
            }

            locationButton.attr('disabled', 'disabled').text('sending location...');
            navigator.geolocation.getCurrentPosition(function(position) {
                locationButton.removeAttr('disabled').text('send location');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function() {
                locationButton.removeAttr('disabled').text('send location');
                alert('unable to fetch location');
            })
        });
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

        socket.on('newLocationMessage', function(message) {
            let li = jQuery('<li></li>');
            let a = jQuery('<a target ="_blank" >My current location</a>');
            li.text(`${message.from}`);
            a.attr('href', message.url);
            li.append(a);
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

        let locationButton = jQuery('#send-location');
        locationButton.on('click', function(e) {
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.');
            }
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function() {
                alert('unable to fetch location');
            })
        });
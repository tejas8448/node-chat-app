let socket = io();

        function scrollToBottom () {
            let messages = $('#messages');
            let newMessage = messages.children('li:last-child');
            let clientHeight = messages.prop('clientHeight');
            let scrollTop = messages.prop('scrollTop');
            let scrollHeight = messages.prop('scrollHeight');
            let newMessageHeight = newMessage.innerHeight();
            let lastMessageHeight = newMessage.prev().innerHeight();

            if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
               messages.scrollTop(scrollHeight);
            }
        }

        socket.on('connect', function() {
            console.log('connected to server.');
        });
        socket.on('disconnect', function() {
            console.log('Disconnected from the server.');
        });

        socket.on('newMessage', function(msg) {
            let formattedTime = moment(msg.createdAt).format('h:mm a');
            // let li = jQuery('<li></li>');
            // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
            // jQuery('#messages').append(li);
            let template = jQuery('#message-template').html();
            let html = Mustache.render(template, {
                text: msg.text,
                from: msg.from,
                createdAt: formattedTime
            });

            jQuery('#messages').append(html);
            scrollToBottom();
        });

        socket.on('newLocationMessage', function(message) {
            let formattedTime = moment(message.createdAt).format('h:mm a');
            // let li = jQuery('<li></li>');
            // let a = jQuery('<a target ="_blank" >My current location</a>');
            // li.text(`${message.from} ${formattedTime}:`);
            // a.attr('href', message.url);
            // li.append(a);
            // jQuery('#messages').append(li);

            let template = $('#location-message-template').html();
            let html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            });
            $('#messages').append(html);
            scrollToBottom();
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
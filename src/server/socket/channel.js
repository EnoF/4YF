/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function channelScope() {
    'use strict';

    function loadChannelResource(io) {

        function onConnect(socket) {

            function onLogin(user) {
                user.id = 1;
                socket.emit('me', user);
            }

            function onMessage(data) {
                io.sockets.in('general').emit('message', data);
            }

            function onJoin(data) {
                socket.join(data.channel);
            }

            socket.emit('channels', ['general', 'random']);
            socket.on('login', onLogin);
            socket.on('message', onMessage);
            socket.on('join', onJoin);
        }

        io.sockets.on('connection', onConnect);
    }


    module.exports = loadChannelResource;
}());
/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function channelScope() {
    'use strict';

    function loadChannelResource(io) {
        io.sockets.on('connection', onConnect);
    }

    function onConnect(socket) {
        socket.emit('channels', ['general', 'random']);
    }

    module.exports = loadChannelResource;
}());
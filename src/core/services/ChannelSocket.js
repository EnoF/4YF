/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function ChannelSocketScope(window) {
    'use strict';

    var clazz = window.clazz;

    function ChannelSocket() {
        this.private = {
            socket: {
                getSet: null
            }
        };

        this.public = {
            join: function join(channel) {
                this.private.socket.emit('join', {
                    channel: channel
                });
            },
            sendMessage: function sendMessage(message){
                this.private.socket.emit('message', {
                    message: message
                });
            }
        };

        this.constructor = function constructor(socket) {
            this.private.socket = socket;
        };
    }

    window.exports(module, clazz(ChannelSocket), 'ChannelSocket');
}(require('enofjs')));
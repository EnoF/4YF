/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function ChannelSocketScope(window, core) {
    'use strict';

    var clazz = window.clazz;
    var Message = core.Message;

    function ChannelSocket() {
        this.private = {
            socket: {
                getSet: null
            },
            name: {
                getSet: null
            },
            messages: {
                get: []
            },
            onMessage: function onMessage(message) {
                this.private.messages.push(new Message(message));
            },
            populateHistory: function populateHistory(history) {
                var messages = history.messages;
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i];
                    this.private.messages.push(message);
                }
            },
            subscribeChannel: function subscribeChannel() {
                this.private.socket.on('history',
                    this.private.populateHistory.bind(this));
            }
        };

        this.public = {
            join: function join(channel) {
                this.private.socket.emit('join', {
                    channel: channel
                });
                this.private.subscribeChannel();
            },
            sendMessage: function sendMessage(message) {
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
}(require('enofjs'), require('../../index.js')));
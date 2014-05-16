/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function ChannelSocketScope(window, core) {
    'use strict';

    var clazz = window.clazz;

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
            subscribers: {
                get: []
            },
            notify: function notify() {
                for (var i = 0; i < this.private.subscribers.length; i++) {
                    var callback = this.private.subscribers[i];
                    callback();
                }
            },
            onMessage: function onMessage(message) {
                var Message = core.Message;
                this.private.messages.push(new Message(message));
            },
            populateHistory: function populateHistory(history) {
                var models = require('../../index.js');
                var User = models.User;
                var Message = models.Message;
                var messages = history.messages;
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i];
                    this.private.messages.push(new Message(new User(0, 'EnoF'), message.message));
                }
                this.private.notify();
            },
            subscribeChannel: function subscribeChannel() {
                this.private.socket.on('history',
                    this.private.populateHistory.bindScope(this));
            }
        };

        this.public = {
            join: function join(channel, handler) {
                this.private.socket.emit('join', {
                    channel: channel
                });
                if (handler instanceof Function) {
                    this.private.subscribers.push(handler);
                }
                this.private.subscribeChannel();
            },
            sendMessage: function sendMessage(message, channel) {
                this.private.socket.emit('message', {
                    channel: channel,
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
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
            },
            channels: {
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
                var models = require('../../index.js');
                var Message = models.Message;
                var User = models.User;
                var user = new User(0, 'EnoF');
                this.private.messages.push(new Message(user, message.message));
                this.private.notify();
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
                this.private.socket.on('message',
                    this.private.onMessage.bindScope(this));
            }
        };

        this.public = {
            join: function join(channel, handler) {
                if (channel in this.private.channels) {
                    return;
                }
                this.private.channels[channel] = true;
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
            this.private.channels = {};
        };
    }

    window.exports(module, clazz(ChannelSocket), 'ChannelSocket');
}(require('enofjs'), require('../../index.js')));
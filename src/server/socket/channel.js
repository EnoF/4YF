/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function channelScope() {
    'use strict';

    var enofjs = require('enofjs');
    var models = require('../../index.js');

    var clazz = enofjs.clazz;
    var LinkedHashMap = enofjs.LinkedHashMap;
    var User = models.User;

    function loadChannelResource(io) {

        var connectedClients = new LinkedHashMap();

        function onConnect(socket) {
            var clientId = connectedClients.getSize();
            connectedClients.add(clientId, new ChannelResource(clientId, io, socket));
        }

        io.sockets.on('connection', onConnect);
    }

    // Create a new Channel Resource per Socket.
    var ChannelResource = clazz(function ChannelResource() {

        this.private = {
            id: {
                get: null
            },
            io: {
                getSet: null
            },
            socket: {
                getSet: null
            },
            user: {
                getSet: null
            },
            onLogin: function onLogin(user) {
                user.id = this.private.id;
                this.private.user = new User(user);
                this.private.socket.emit('me', this.private.user.serialize());
            },
            onMessage: function onMessage(message) {
                this.private.io.sockets.in('general').emit('message', message);
            },
            onJoin: function onJoin(channel) {
                this.private.socket.join(channel.channel);
            },
            openListeners: function openListeners() {
                var socket = this.private.socket;
                socket.on('login', this.private.onLogin.bind(this));
                socket.on('message', this.private.onMessage.bind(this));
                socket.on('join', this.private.onJoin.bind(this));
                socket.emit('channels', ['general', 'random']);
            }
        };

        this.constructor = function constructor(clientId, io, socket) {
            this.private.id = clientId;
            this.private.io = io;
            this.private.socket = socket;
            this.private.openListeners();
        };
    });

    module.exports = loadChannelResource;
}());
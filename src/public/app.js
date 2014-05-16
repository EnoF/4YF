/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function appScope(angular, window) {
    'use strict';

    var app = angular.module('4yf', []);

    // We use the controller more as an ViewModel then Controller. Therefore
    // we rename it into ViewModel to keep things semantically correct!
    app.viewModel = app.controller;

    var io = require('io');
    var socket = io.connect('http://localhost:6697');
    var ChannelSocket = require('ChannelSocket', {
        transports: ['websocket']
    });
    var channelSocket = new ChannelSocket(socket);

    window.exports(null, channelSocket, 'channelSocket');

}(window.angular, require('enofjs')));
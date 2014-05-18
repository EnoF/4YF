/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function MessagesVMScope(angular) {
    'use strict';

    var app = angular.module('4yf');

    var channelSocket = require('channelSocket');

    app.viewModel('MessagesVM', function MessagesVM($scope) {
        $scope.channel = 'general';
        $scope.message = null;
        $scope.messages = channelSocket.getMessages();

        channelSocket.join($scope.channel, function notifyMe() {
            $scope.$apply();
        });

        $scope.sendMessage = function sendMessage() {
            channelSocket.sendMessage($scope.message, $scope.channel);
        };
    });
}(window.angular));
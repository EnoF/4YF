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
        $scope.messages = channelSocket.getMessages();

        channelSocket.join('general', function notifyMe() {
            $scope.$apply();
        });
    });
}(window.angular));
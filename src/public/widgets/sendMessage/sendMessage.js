/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */

(function sendMessageScope(angular) {
    'use strict';

    var app = angular.module('4yf');

    app.directive('sendMessage', function sendMessage() {
        return {
            controller: 'MessagesVM',
            restrict: 'A',
            scope: {},
            templateUrl: 'sendMessage'
        };
    });
}(window.angular));

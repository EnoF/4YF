/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function messageFeedScope(angular) {
    'use strict';

    var app = angular.module('4yf');

    app.directive('messageFeed', function messageFeed() {
        return {
            controller: 'MessagesVM',
            restrict: 'A',
            scope: {},
            templateUrl: 'messageList'
        };
    });
}(window.angular));
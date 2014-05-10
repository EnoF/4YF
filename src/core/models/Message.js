/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function MessageScope(angular, clazz) {
    'use strict';

    var app = angular.module('4yf');

    app.factory('Message', function MessageFactory() {
        function Message() {
            this.private = {
                user: {
                    getSet: null
                },
                message: {
                    getSet: null
                }
            };

            this.constructor = function constructor(user, message) {
                this.private.user = user;
                this.private.message = message;
            };
        }

        return clazz(Message);
    });
}(window.angular, window.clazz));
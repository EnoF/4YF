/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function MessageScope(window, undefined) {
    'use strict';

    var clazz;
    var angular;
    var app;

    /* istanbul ignore else */
    if (window !== undefined) {
        clazz = window.clazz;
        angular = window.angular;
        app = angular.module('4yf');
    } else {
        clazz = require('enofjs').clazz;
    }

    var Message = clazz(function Message() {
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
    });

    /* istanbul ignore else */
    if (window !== undefined) {
        app.factory('Message', function MessageFactory() {
            return Message;
        });
    } else {
        module.exports = Message;
    }

}(this.window));
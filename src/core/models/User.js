/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function UserScope(window, undefined) {
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

    var User = clazz(function User() {
        this.private = {
            id: {
                get: null
            },
            userName: {
                getSet: null
            },
            email: {
                getSet: null
            }
        };

        this.constructor = function constructor(id, userName, email) {
            this.private.id = id;
            this.private.userName = userName;
            this.private.email = email;
        };
    });

    /* istanbul ignore else */
    if (window !== undefined) {
        app.factory('User', function UserFactory() {
            return User;
        });
    } else {
        module.exports = User;
    }
}(this.window));
/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function UserScope(angular, clazz) {
    'use strict';

    var app = angular.module('4yf');

    app.factory('User', function UserFactory() {
        function User() {
            this.private = {
                userName: {
                    getSet: null
                },
                email: {
                    getSet: null
                }
            };

            this.constructor = function constructor(userName, email) {
                this.private.userName = userName;
                this.private.email = email;
            };
        }

        return clazz(User);
    });
}(window.angular, window.clazz));
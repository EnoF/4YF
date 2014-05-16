/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function MessageScope(window) {
    'use strict';

    var clazz = window.clazz;

    var Message = clazz(function Message() {

        this.private = {
            user: {
                getSet: null
            },
            message: {
                getSet: null
            }
        };

        this.public = {
            serialize: function serialize() {
                return {
                    user: this.private.user.getId(),
                    message: this.private.message
                };
            }
        };

        this.constructor = function constructor(user, message) {
            this.private.user = user;
            this.private.message = message;
        };
    });

    window.exports(module, Message, 'Message');
}(require('enofjs')));
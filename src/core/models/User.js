/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function UserScope(window) {
    'use strict';

    var clazz = window.clazz;

    var User = clazz(function User() {

        this.extend = 'Serializable';

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
            if (id instanceof Object) {
                this.super(id);
            } else {
                this.private.id = id;
                this.private.userName = userName;
                this.private.email = email;
            }
        };
    });

    window.exports(module, User, 'User');
}(require('enofjs')));
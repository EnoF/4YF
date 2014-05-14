/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function modelIndexScope(require) {
    'use strict';

    module.exports = {
        Message: require('./core/models/Message.js'),
        User: require('./core/models/User.js')
    };
}(require));
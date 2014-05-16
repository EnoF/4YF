/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function coreIndexScope(require) {
    'use strict';

    module.exports = {
        Message: require('./core/models/Message.js'),
        User: require('./core/models/User.js'),
        ChannelSocket: require('./core/services/ChannelSocket.js')
    };
}(require));
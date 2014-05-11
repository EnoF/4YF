/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function mainScope(express) {
    'use strict';

    var app = express();
    app.http().io();

    require('./rest/base.js')(app);
    require('./socket/channel.js')(app.io);

    module.exports = app;

}(require('express.io')));
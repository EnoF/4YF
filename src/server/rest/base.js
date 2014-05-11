/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function baseScope() {
    'use strict';

    // This is the base of all resources. All resources will be loaded from this module.
    function loadBase(app) {
        // Make sure the rest API will be available from any client, even third party apps.
        app.use(allowCrossDomain);
        require('./feed.js')(app);

        app.listen(6667);
    }

    // Set the allow cross origin headers so the server can be reached from other domain clients.
    function allowCrossDomain(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.send(200);
        }
        else {
            next();
        }
    }

    module.exports = loadBase;
}());
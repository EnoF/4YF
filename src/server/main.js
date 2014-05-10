/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function mainScope(express) {
    'use strict';

    var app = express();

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

    app.use(allowCrossDomain);

    app.get('/feed', function getFeed(req, res) {
        res.send({
            messages: [
                {
                    user: 'EnoF',
                    message: 'Hello!'
                }
            ]
        }, 200);
    });

    app.listen(3000);

    module.exports = app;

}(require('express')));
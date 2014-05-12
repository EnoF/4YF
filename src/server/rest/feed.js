/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function feedScope(clazz) {
    'use strict';

    console.log(clazz);
    // Load the `feed` resource into the app.
    function loadFeedResource(app) {
        app.get('/feed', getFeed);
    }

    function getFeed(req, res) {
        res.send({
            messages: [
                {
                    user: 'EnoF',
                    message: 'Hello!',
                    channel: 'random'
                },
                {
                    user: 'AndOr',
                    message: 'Whatsup?!',
                    channel: 'general'
                }
            ]
        }, 200);
    }

    module.exports = loadFeedResource;
}(require('enofjs').clazz));
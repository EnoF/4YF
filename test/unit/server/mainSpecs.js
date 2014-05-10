/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
(function mainSpecsScope() {
    'use strict';

    var request = require('supertest');
    var app = require('../../../src/server/main.js');

    describe('message feed', function () {
        it('should retrieve a message feed', function (done) {
            request(app)
                .get('/feed')
                .expect(200)
                .expect({
                    messages: [
                        {
                            user: 'EnoF',
                            message: 'Hello!'
                        }
                    ]
                }, done);
        });
    });
}());
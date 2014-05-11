/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
(function mainSpecsScope() {
    'use strict';

    var request = require('supertest');
    var io = require('socket.io-client');
    var app = require('../../../src/server/main.js');

    describe('message feed', function () {

        var socket;

        beforeEach(function connectToSocket(done) {
            socket = io.connect('http://localhost:1234', {
                transports: ['websocket'],
                'reconnection delay': 0,
                'reopen delay': 0,
                'force new connection': true
            });
            socket.on('connect', done);
        });

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

        it('should retrieve available channels when connected', function retrieveChannels(done) {
            socket.on('channels', function response(data) {
                data.should.be.an.Array.and.containEql('general').and.containEql('random');
                done();
            });
            socket.emit('connect');
        });
    });
}());
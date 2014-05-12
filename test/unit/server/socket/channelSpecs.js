/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
(function channelSpecsScope() {
    'use strict';

    var io = require('socket.io-client');

    describe('Channel Resource', function channelSpecs() {

        var socket;

        beforeEach(function connectToSocket(done) {
            socket = io.connect('http://localhost:6667', {
                transports: ['websocket'],
                'reconnection delay': 0,
                'reopen delay': 0,
                'force new connection': true
            });
            socket.on('connect', done);
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
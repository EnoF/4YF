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

        it('should be able to register the user name', function registerUserName(done) {
            socket.on('me', function response(data) {
                data.should.containDeep({
                    id: 1,
                    userName: 'EnoF',
                    email: 'enof@github.com'
                });
                done();
            });
            socket.emit('login', {
                userName: 'EnoF',
                email: 'enof@github.com'
            });
        });

        it('should retrieve a message in a specific room', function retrieveMessage(done) {
            socket.on('message', function response(data) {
                data.should.containDeep({message: 'Hello world!'});
                done();
            });
            socket.emit('join', {
                channel: 'general'
            });
            socket.emit('message', {
                message: 'Hello world!'
            });
        });
    });
}());
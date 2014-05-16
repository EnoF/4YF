/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
(function MessageSpecsScope() {
    'use strict';

    describe('Message Model Specs', function MessageSpecsScope() {

        var message, User, Message;

        beforeEach(module('4yf'));

        beforeEach(inject(function standardMessage() {
            User = require('User');
            Message = require('Message');
            var user = new User(0, 'EnoF', 'enof@github.com');
            message = new Message(user, 'Hello world!');
        }));

        it('should remember who wrote the message', function who() {
            expect(message.getUser() instanceof User);
        });

        it('should display the written message', function messageContent() {
            expect(message.getMessage()).toEqual('Hello world!');
        });
    });
}(window.angular));
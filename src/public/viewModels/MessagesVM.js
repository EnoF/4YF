/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function MessagesVMScope(angular) {
    'use strict';

    var app = angular.module('4yf');

    app.viewModel('MessagesVM', function MessagesVM($scope, User, Message) {
        $scope.messages = [];

        // For demo purpose we now create some messages hard coded!
        var enof = new User(0, 'EnoF', 'enof@github.com');
        var andor = new User(1, 'AndOr', 'andor@github.com');

        // A fake conversation for demo purpose!
        $scope.messages.push(new Message(enof, 'Hello!'));
        $scope.messages.push(new Message(andor, 'Howdy!'));
        $scope.messages.push(new Message(enof, 'How are you?'));
        $scope.messages.push(new Message(andor, 'Awesome!'));

    });
}(window.angular));
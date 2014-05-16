/*
 * For Your Feed (4YF)
 * Version: 0.0.1
 *
 * Copyright (c) 2014.
 */
(function appScope(angular) {
    'use strict';

    var app = angular.module('4yf', []);

    // We use the controller more as an ViewModel then Controller. Therefore
    // we rename it into ViewModel to keep things semantically correct!
    app.viewModel = app.controller;

}(window.angular));
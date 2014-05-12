/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
'use strict';
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'src/public/bower_components/angular/angular.js',
            'src/public/bower_components/angular-mocks/angular-mocks.js',
            'src/public/bower_components/enofjs/src/ClassFactory.js',
            'src/public/bower_components/enofjs/src/whereIt.js',
            'src/public/app.js',
            'src/core/models/**/*.js',
            'src/public/viewModels/**/*.js',
            'test/unit/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            'src/core/models/index.js',
            'test/unit/server/**/*.js'
        ],

        // web server port
        port: 13337,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '!src/core/models/index.js': ['coverage'],
            'src/core/models/**/*.js': ['coverage'],
            'src/public/viewModels/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage'
        },


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};

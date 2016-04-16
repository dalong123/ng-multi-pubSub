module.exports = function (config) {
    'use strict';

    config.set({
        basePath: './',

        files: [
            'bower_components/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'NgPubSub.js',
            'tests/function.prototype.bind.js',
            'tests/NgPubSub.spec.js'
        ],

        exclude: [],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-jasmine',
            // 'karma-junit-reporter',
            // 'karma-chrome-launcher',
            // 'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'unit.xml',
            suite: 'unit'
        }

    });
};
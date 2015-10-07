/*
 * grunt-nexus-deployer-versioned
 * https://github.com/edieval/grunt-nexus-deployer
 *
 * Copyright (c) 2015 Emmanuel Dieval
 * Licensed under the MIT license.
 */

'use strict';

var format = require('util').format, deploy = require('./lib');

module.exports = function (grunt) {

    grunt.registerMultiTask('nexusDeployerVersioned', 'Deploy artifacts to nexus from grunt', function () {
        var options = this.options({
            debug: false,
            dryRun: false,
            cwd: ''
        });
        var done = this.async();
        deploy(options, done);
    });

};

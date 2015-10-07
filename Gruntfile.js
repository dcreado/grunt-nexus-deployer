/*
 * grunt-nexus-deployer-versioned
 * https://github.com/edieval/grunt-nexus-deployer
 *
 * Copyright (c) 2014 Emmanuel Dieval
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    var auth = {username: 'admin', password: 'admin123'};
    grunt.initConfig({
        auth: auth,
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        env: {
            mock: {
                MOCK_NEXUS: 1
            }
        },
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        nexusDeployerVersioned: {
            snapshot: {
                options: {
                    groupId: "grunt-nexus-deployer-versioned",
                    artifactId: "grunt-nexus-deployer-versioned",
                    version: "1.2-SNAPSHOT",
                    packaging: 'zip',
                    auth: {
                        username: auth.username,
                        password: auth.password
                    },
                    pomDir: 'test/pom',
                    url: 'http://localhost:8081/nexus/content/repositories/snapshots',
                    artifact: 'test/fixtures/example.zip',
                    noproxy: 'localhost',
                    cwd: '',
                    quiet: false,
                    insecure: true
                }
            },
            release: {
                options: {
                    groupId: "grunt-nexus-deployer-versioned",
                    artifactId: "grunt-nexus-deployer-versioned",
                    version: '1.2',
                    packaging: 'zip',
                    versioned: {
                        build: '1',
                        versionNumber:'1.0',
                        classifier: "test"
                    },
                    auth: {
                        username: auth.username,
                        password: auth.password
                    },
                    pomDir: 'test/pom',
                    url: 'http://localhost:8081/nexus/content/repositories/releases',
                    artifact: 'test/fixtures/example.zip',
                    noproxy: 'localhost',
                    cwd: '',
                    quiet: true
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('test', ['clean', 'env:mock', 'nexusDeployerVersioned:snapshot', 'nexusDeployerVersioned:release', 'mochaTest']);

    grunt.registerTask('default', ['jshint', 'test']);

};

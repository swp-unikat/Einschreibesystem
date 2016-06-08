/**
 * Created by Valle on 18.05.2016.
 */
module.exports = function(grunt) {
//Task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: ['Gruntfile.js']
        },
        karma: {
            options: {},
            unit: {
                singleRun: true
            },
            continous: {
                singleRun: false,
                autpWatch: true
            }
        },
        uglify: {
            dist: {
                files: {
                    'web/components/**/*.js': ['web/components/min/**/*.js']
                }
            },
            options: {
                mangle: false
            }
        },
        watch: {
            dev: {
                files: ['Gruntfile.js', 'web/components/controllers/*.js'],
                tasks: ['concat:controllers']
            }
        },
        concat: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\nvar mainAppCtrls = angular.module(\"mainAppCtrls\");",
                process: function (src, filepath) {
                    return '\n// Source: ' + filepath + '\n' +
                        src.replace('var mainAppCtrls = angular.module(\"mainAppCtrls\");', '');
                }
            },
            controllers: {
                src: ['web/components/controllers/dashboardCtrl.js',
                    'web/components/controllers/*.js'
                ],
                dest: 'web/components/dist/ctrl.js'
            }
        },
        ngdocs: {
            options: {
                title: "UNIKAT Einschreibesystem Documentation",
                inlinePartials: true,
                bestMatch: true,
                html5Mode: false
            },
            all: ['web/components/app.js','web/components/dist/ctrl.js','web/components/services/*.js']
        }
    });
    //Loading and registering tasks
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.registerTask('dev', ['watch:dev']);
    grunt.registerTask('doc',['ngdocs:all']);
};


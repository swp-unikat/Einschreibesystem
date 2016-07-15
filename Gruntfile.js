/**
 * Created by Valle on 18.05.2016.
 */
module.exports = function (grunt) {
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
                    './web/components/dist/ctrl.min.js': ['./web/components/ctrl.js'],
                    './web/components/dist/app.min.js': ['./web/components/app.js'],
                    './web/components/dist/srvcs.min.js': ['./web/components/srvcs.js']
                }
            },
            options: {
                mangle: false,
                beautify: false
            }
        },
        watch: {
            dev: {
                files: ['Gruntfile.js', 'web/components/controllers/*.js'],
                tasks: ['concat:controllers', 'concat:services']
            }
        },
        concat: {
            controllers: {
                src: ['web/components/controllers/dashboardCtrl.js',
                    'web/components/controllers/*.js'
                ],
                dest: 'web/components/ctrl.js'
            },
            services: {
                src: ['web/components/services/*.js'],
                dest: 'web/components/srvcs.js'
            }
        },
        ngdocs: {
            options: {
                title: "UNIKAT Einschreibesystem Documentation",
                inlinePartials: true,
                html5Mode: false,
                bestMatch: true,
                scripts: [
                    'web/vendor/a0-angular-storage/dist/angular-storage.js',
                    'web/vendor/angular/angular.js',
                    'web/vendor/angular-jwt/dist/angular-jwt.js',
                    'web/vendor/angular-resource/angular-resource.js',
                    'web/vendor/angular-translate/angular-translate.js',
                    'web/vendor/angular-ui-router/release/angular-ui-router.js',
                    'web/vendor/textAngular/dist/textAngular.js',
                    'web/vendor/angular-strap/dist/angular-strap.js'
                ]
            },
            all: ['web/components/app.js', 'web/components/controllers/*.js', 'web/components/services/*.js']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './public/min-safe/js/appFactory.js': ['./public/js/appFactory.js'],
                    './public/min-safe/js/FormController.js': ['./public/js/FormController.js'],
                    './public/min-safe/app.js': ['./public/js/app.js']
                }
            }
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
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.registerTask('dev', ['watch:dev']);
    grunt.registerTask('doc', ['ngdocs:all']);
    grunt.registerTask('compile', ['concat:services', 'concat:controllers', 'uglify']);
};


/**
 * Created by Valle on 18.05.2016.
 */
module.exports = function(grunt){
//Task configuration
  grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      jshint: {
          all : ['Gruntfile.js']
      },
      karma: {
          options: {
              
          },
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
              files: ['Gruntfile.js'],
              tasks: ['jshint','karma:unit']
          }
      }
  }
  );
  //Loading and registering tasks
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask('dev', ['watch:dev']);
    
};
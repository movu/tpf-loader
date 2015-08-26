"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      allFiles: [
        'Gruntfile.js',
        'static/movu-widget.js'
      ],
      individualFiles: {
        files: [
          {src: 'Gruntfile.js'},
          {src: 'static/movu-widget.js'}
        ]
      }
    },
    uglify: {
      production: {
        files: {
          '../dest/tpf-loader.min.js': ['static/movu-widget.js']
        }
      },
      staging1: {
        files: {
          '../dest/tpf-loader.staging1.min.js': ['static/movu-widget.js']
        }
      },
      staging2: {
        files: {
          '../dest/tpf-loader.staging2.min.js': ['static/movu-widget.js']
        }
      }
    },
    jasmine: {
      dev: {
        src: 'static/movu-widget.js',
        options: {
          specs: 'spec/*.spec.js'
        }
      },
      production:{
        src: '../dest/tpf-loader.min.js',
        options: {
          specs: 'spec/*.spec.js'
        },
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  grunt.registerTask('build', ['jshint','jasmine:dev', 'uglify','jasmine:production']);

  grunt.registerTask('test', ['jshint','jasmine:dev']);

};
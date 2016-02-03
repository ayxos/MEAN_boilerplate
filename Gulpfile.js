/**
 * @description Task Manager for SPP Project
 * @author: Marco Antonio Pajares
 * @tasks:
 * - sass
 */

var gulp      = require('gulp'),
  path        = require('path'),
  jade        = require('gulp-jade'),
  del         = require('del'),
  gulpArgs    = require('yargs').argv,
  concat      = require('gulp-concat'),
  ngAnnotate  = require('gulp-ng-annotate'),
  bytediff    = require('gulp-bytediff'),
  uglify      = require('gulp-uglify'),
  sourcemaps  = require('gulp-sourcemaps'),
  protractor  = require("gulp-protractor").protractor;

var paths = {
  dev: './public/js',
  templates: ['./public/templates/*.jade'],
  angular: './public/js/angular/**/*.js',
  test: './test/**/*.js',
  styles: ''
};

/**
 * @description Basic Tasks
 */
 
gulp.task('ngAnnotate', function () {
  return gulp.src('./public/js/angular/**/*.js')
    .pipe(ngAnnotate())
    .pipe(concat('all.min.js', {newLine: ';'}))
    // Annotate before uglify so the code get's min'd properly.
    .pipe(ngAnnotate({
        // true helps add where @ngInject is not used. It infers.
        // Doesn't work with resolve, so we must be explicit there
        add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dev));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src(paths.templates)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('protractor', function() {
  var suites = gulpArgs.suite;
  var url = gulpArgs.baseUrl;
  if(!suites) suites = 'all';
  else console.log('SUITE is', suites);
  if(!url) url = 'http://localhost:8081/publisherportal/';
  else console.log('BASEURL is', url);
  return gulp.src(["../specs/**/*.js"])
    .pipe(protractor({
        configFile: "protractor.config.js",
        args: [
          '--baseUrl', url,
          '--suite', suites
        ]
    }))
    .on('error', function(e) { console.log('ERROR!!', e); });
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.angular, ['ngAnnotate']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'templates', 'ngAnnotate']);
'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

var DEST = 'dist/';
var DOCS = 'docs/';

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/tr-trustpass.js', ['jshint', 'js']);
  gulp.watch('src/tr-trustpass.less', ['less']);
  gulp.watch(DOCS + '/index.html', ['html']);
});

// JS linting task
gulp.task('jshint', function () {
  return gulp.src('src/tr-trustpass.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Process JS
gulp.task('js', function() {
  return gulp.src('src/tr-trustpass.js')
    .pipe(sourcemaps.init())
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will output version for `docs` folder
    .pipe(gulp.dest(DOCS))
    // This will minify and rename to tr-trustpass.min.js
    .pipe(uglify({ mangle: true }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

// Process less
gulp.task('less', function () {
  return gulp.src('src/tr-trustpass.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(rename({ extname: '.css' }))
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will output version for `docs` folder
    .pipe(gulp.dest(DOCS))
    // This will minify and rename to tr-trustpass.min.css
    .pipe(minify({ compatibility: 'ie8' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

// Connect-server
gulp.task('connect', function() {
  connect.server({
    root: [DOCS],
    port: 3000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(DOCS + '/index.html')
    .pipe(connect.reload());
});


/**
 * Run sequence tasks
 */
gulp.task('build', function(done) {
  runSequence('jshint', 'less', 'js', done);
});

gulp.task('default', function(done) {
  runSequence('build', 'watch', done);
});

gulp.task('demo', function(done) {
  runSequence('build', 'connect', 'watch', done);
});

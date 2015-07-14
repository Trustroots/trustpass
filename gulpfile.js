'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps');

var DEST = 'dist/';

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('src/tr-trustpass.js', ['jshint', 'js']);
	gulp.watch('src/tr-trustpass.less', ['less']);
});

// JS linting task
gulp.task('jshint', function () {
  return gulp.src('src/tr-trustpass.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('js', function() {
  return gulp.src('src/tr-trustpass.js')
    .pipe(sourcemaps.init())
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to tr-trustpass.min.js
    .pipe(uglify({mangle: true}))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

// Less task
gulp.task('less', function () {
  return gulp.src('src/tr-trustpass.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(rename({ extname: '.css' }))
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to tr-trustpass.min.css
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

gulp.task('default', function(done) {
  runSequence('jshint', 'less', 'js', 'watch', done);
});

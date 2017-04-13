'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');

// Get tasks from gulp-tasks directory
require('require-dir')('gulp-tasks');

let allTasks = ['scripts', 'copy', 'html', 'images'];
gulp.task('default', function(cb) {
  runSequence(
    'clean',
    allTasks,
    'styles',
    'serviceworker',
    cb);
});

gulp.task('dev', function(cb) {
  return runSequence(
    'clean',
    allTasks,
    'styles',
    'serviceworker',
    'watch',
    'nodemon',
    cb);
});

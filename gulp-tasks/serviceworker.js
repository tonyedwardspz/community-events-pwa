'use strict';

let gulp = require('gulp');
let del = require('del');
let runSequence = require('run-sequence');
let fs = require('fs');
let file = require('gulp-file');
let gulpif = require('gulp-if');
let stripDebug = require('gulp-strip-debug');
let gutil = require('gulp-util');

let env = gutil.env.env === 'PRODUCTION' ? true : false;

gulp.task('service-worker:watch', function() {
  gulp.watch('./client/serviceworker.js', ['service-worker']);
});

gulp.task('generate-serviceworker', function(){
  let swContents = fs.readFileSync('./client/serviceworker.js', 'utf8');
  let versionedContents = swContents.replace(/\/\/VERSION-HERE/g, `const version = ${Date.now()};`);

  return file('serviceworker.js', versionedContents, { src: true })
    .pipe(gulpif(env, stripDebug()))
    .pipe(gulp.dest('./public'));
});

gulp.task('serviceworker', function(cb) {
  del('./public/serviceworker.js', {dot: true});

  runSequence(
    ['generate-serviceworker'],
    cb
  );
});

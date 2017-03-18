'use strict';

let gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        port: 8080
    });
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
});

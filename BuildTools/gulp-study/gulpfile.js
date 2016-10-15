var gulp = require('gulp');
var jasmine = require('jasmine');

gulp.task('default', function () {
    return gulp.src('./src/test1.js')
    .pipe(jasmine());
});
var gulp = require('gulp')

gulp.task('myTaskOne',function(){
    console.log('my tyaskOne!');
});

gulp.task('myTaskTwo',function(){
    console.log('my taskTwo!');
});

gulp.task('default',['myTaskOne','myTaskTwo'], function(){
    console.log('hello gulp!');
});
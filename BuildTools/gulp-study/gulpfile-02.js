var gulp = require('gulp')
var react = require('gulp-react')
var babel = require('gulp-babel')
var less = require('gulp-less')
var sass = require('gulp-sass')

gulp.task('less',function(){
    return gulp.src('./src/css1.less')
    .pipe(less())
    .pipe(gulp.dest('./dest'))
});

gulp.task('sass',function(){
    return gulp.src('./src/css2.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dest'))
});

gulp.task('default',['less','sass'],function(){
    return gulp.src('./src/myui.js')
    .pipe(react())
    .pipe(babel({
            preset:['babel-preset-es2015']
        }))
    .pipe(gulp.dest('./dest'))
});
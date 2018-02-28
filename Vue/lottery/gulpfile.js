//引入gulp
var gulp = require('gulp');
//这样的话 其他的模块可以直接使用 $ 符号来引入
var $ = require('gulp-load-plugins')();
//模块化，应用
var fileinclude = require('gulp-file-include');
var open = require('open');
// var px2rem = require('postcss-px2rem');

//定义目录路径
var app = {
    //源代码，文件目录
    srcPath: 'src/',
    //文件整合之后的目录
    devPath: 'build/',
    //项目，发布目录上产部署
    prdPath: 'dist/'
};

//通过bower安装的插件，需要拷贝到 devPath prdPath中
gulp.task('lib',function(){
    //   /**/* 读取这个文件夹下边的所有的文件或者文件夹
    gulp.src(app.srcPath + 'lib/**/*')
    //读取完整后进行操作  是要拷贝到整合目录 并重命名，在拷贝到生产目录并重命名
    .pipe(gulp.dest(app.devPath + 'lib'))
    .pipe(gulp.dest(app.prdPath + 'lib'))
    .pipe($.connect.reload());  //文件更改后自动变异 并执行启动服务重新打开浏览器
});
//将 html 拷贝到 devPath prdPath中
gulp.task('html',function(){
    gulp.src(app.srcPath + '*.html')
    //编译模块文件
    .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
});
//将 模拟的json 文件 拷贝到 devPath prdPath中
gulp.task('json',function(){
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});

// var processors = [px2rem({ remUnit: 75 })];
//将 index.less 文件 拷贝到 devPath prdPath中，index.less引入了所有的其他的less
gulp.task('less',function(){

    gulp.src(app.srcPath + 'css/**/*.less')
    // .pipe($.postcss(processors))
    .pipe($.less())
    .pipe($.autoprefixer(['iOS >= 7', 'Android >= 4.1']))
    .pipe($.concat('style.css'))
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());
});
// 拷贝 js 文件  将所有的源文件中的js 文件整合成index.js 然后拷贝过去
gulp.task('script',function(){
    gulp.src(app.srcPath + 'js/**/*.js')
    // .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});

//拷贝 压缩 图片 最后放到发布目录下
gulp.task('image',function(){
    gulp.src(app.srcPath + 'images/**/*')
    //将源图片放到整合目录下，在压缩放到生产目录下
    .pipe(gulp.dest(app.devPath + 'images'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'images'))
    .pipe($.connect.reload());
});

//总的方法
gulp.task('build',['image', 'script', 'less', 'json', 'html', 'lib']);

//清除旧文件，每次更新的时候
gulp.task('clean',function(){
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean());
})

//编写服务
gulp.task('serve',['build'], function() {
    $.connect.server({
        //服务起来的入口
        root: [app.devPath],
        //文件更改后自动刷新页面
        livereload: true,
        //端口号
        port: 1234
    });
    // 在 命令工具中执行 gulp serve  就相当于是启动了服务
    //自动打开浏览器
    open('http://localhost:1234');
    //我们希望更改了文件，就自动编译，并且打包等然后打开浏览器
    gulp.watch('bower_components/**/*' , ['lib']);
    //监听 script 下边的 js 文件，并执行 script 方法
    gulp.watch(app.srcPath + 'js/**/*.js', ['script']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'css/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'images/**/*', ['image']);
    //这样文件变更了就会自动构建
});


//默认执行的任务，直接 执行 gulp 变行了。都编写完成后再终端 执行 gulp 便可以了。
gulp.task('default', ['serve']);
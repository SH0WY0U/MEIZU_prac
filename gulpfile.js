var gulp = require('gulp');
var uglify = require("gulp-uglify");//压缩js
var connect = require('gulp-connect');//服务器
var concat = require('gulp-concat');//合并
const htmlmin = require('gulp-htmlmin');//压缩HTML
const imagemin = require('gulp-imagemin'); //压缩图片
const babel = require('gulp-babel');//ES6转ES5
var rename = require("gulp-rename");//重命名
var cssmin = require('gulp-clean-css');//压缩css
const rev = require('gulp-rev');//生成哈希后缀
const del = require('del');// 删除
var revCollector = require('gulp-rev-collector');//把生成哈希后缀的js或css文件通过rev生成的json文件转换文件名.写入html文件的引入标签
// var watch = require('gulp-watch');//监听
var runSequence = require('run-sequence');//让任务同步或异步执行
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    console.log(1 + 2)
});

gulp.task('mini', function () {
    console.log('我要压缩')
});

gulp.task('clear', function () {
    del(['app/**/*.js', '!app/js/ajax.js', '!app/js/jquery-3.3.1.js'])
    del('app/**/*.css')
    del('app/**/*.html')//删除
});

gulp.task('minicss', function () {
    console.log('我要开始压缩css')
});

gulp.task('minijs', function () {
    gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
    // .pipe(rev())        //生成哈希后缀
    // .pipe(gulp.dest('dist'))
    // .pipe(rev.manifest())
    // .pipe(gulp.dest('dist'))
    // .pipe(gulp.dest('dist'))
    // .pipe(connect.reload());
    // 可以再次合并文件, 给文件重命名lp
    // .pipe(concat('all.min.js'))
    // .pipe(gulp.dest('dist'))
})

gulp.task('mini', ['minicss', 'minijs'], function () {
    console.log('我要被捅了')
});

gulp.task('hebing', function () {//合并js
    gulp.src(['asjdjas.js', 'kikj.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minihtml', function () {//压缩html
    gulp.src('app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('miniimg', function () {//压缩图片
    // gulp.src(['images/**/*.jpg', 'images/**/*.png', 'app/**/*.gif'])
    gulp.src(['images/**/*', 'images/**/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});

gulp.task('es6toes5', function () {//ES6转ES5
    gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
});

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        // root: 'dist',
        root: './',
        port: '7777',
        livereload: true
    });
});

gulp.src('./hello.txt')
    .pipe(rename('gb/goodbye.md'))    // 直接修改文件名和路径
    .pipe(gulp.dest('./dist'));

gulp.src('./hello.txt')
    .pipe(rename({
        dirname: "text",                // 路径名
        basename: "goodbye",            // 主文件名
        prefix: "pre-",                 // 前缀
        suffix: "-min",                 // 后缀
        extname: ".html"                // 扩展名
    }))
    .pipe(gulp.dest('./dist'));

gulp.task('minicss', function () {
    gulp.src('app/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () { //监听
    gulp.watch('app/**/*.html', ['minihtml'])
    gulp.watch('app/**/*.scss', ['sass'])
    gulp.watch('app/**/*.css', ['minicss'])
    gulp.watch('app/**/*.js', ['minijs'])
})
gulp.task('push', function () {
    gulp.src(['*.*', '**/*.*', '**/**/*.*', '**/**/**/*.*', '**/**/**/**/*.*'])
        .pipe(gulp.dest('dist'));
})


gulp.task('dev', function (callback) {
    runSequence(
        // 'sass',//同步执行
        // ['minijs', 'minicss', 'minihtml', 'miniimg'],//数组里可以异步执行
        // 'watch',//同步执行
        'connect',
        callback);
})

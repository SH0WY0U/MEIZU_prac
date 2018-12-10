var gulp = require('gulp');//引入gulp
var uglify = require('gulp-uglify');//压缩js
var babel = require('gulp-babel');//es6转译
var connect = require('gulp-connect');//服务器
var concat = require('gulp-concat');//合并
var minicss = require('gulp-clean-css');//引入css
var minihtml = require('gulp-html-minify');//引入html
var del = require('del');//删除整个文件
const rev = require('gulp-rev');//添加版本号
var revCollector = require('gulp-rev-collector');//修改路径版本号
var run = require('run-sequence');//异步执行
var miniimg = require('gulp-imagemin');//图片压缩

//所有文件实时更新
gulp.task('default', function (callback) {
    run(['minijs', 'miniimg', 'minicss'],
        'minihtml',
        'watch',
        'connect',
        callback)
})

//压缩js
gulp.task('minijs', function () {
    gulp.src('app/static/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(connect.reload())
})
//压缩css
gulp.task('minicss', function () {
    gulp.src('app/static/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('dist/static/css'))
        .pipe(connect.reload())
})
//压缩HTML
gulp.task('minihtml', function () {
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())//实时刷新
})
//图片压缩
gulp.task('miniimg', function () {
    gulp.src('app/static/images/*')
        .pipe(gulp.dest('dist/static/images'))
        .pipe(connect.reload())
})


//监听实时更新
gulp.task('watch', function () {
    gulp.watch('app/static/js/index.js', ['minijs'])
    gulp.watch('app/static/css/index.css', ['minicss'])
    gulp.watch('app/static/images/bg71.png', ['miniimg'])
    gulp.watch('app/index.html', ['minihtml'])
})

//打开服务器
gulp.task('connect', function () {
    connect.server({
        root: './',//服务器默认文件夹
        port: '7777',//端口号
        livereload: true
    })
})





//删除文件
gulp.task('clean', function () {
    del(['dist'])
});




// gulp.task('_default',['minijs','minihtml'])
// gulp.task('default', ['minihtml', 'watch', 'connect']);

// gulp.task('default', function() {
//   // 将你的默认的任务代码放在这
//   console.log(1 + 2);
// });

//压缩js
// gulp.task('minijs', function() {
//     gulp.src('app/static/js/index.js')
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('dist'))
//     .pipe(rev.manifest())//生成一个json文件，存放文件名称
//     .pipe(gulp.dest('rev/js'))
//   })

//   //压缩HTML
// gulp.task('minihtml',function(){
//     gulp.src('app/static/a.html')
//     .pipe(gulp.dest('dist'))
//     .pipe(connect.reload())//实时刷新
// })

// //压缩css
// gulp.task('minicss',function(){
//     gulp.src('app/**/*.css')
//     .pipe(minicss())
//     .pipe(gulp.dest('dist/static/css'))
// })




var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var rename = require("gulp-rename");
const babel = require('gulp-babel');
gulp.task('uglifyJs', function () {
    gulp.src('./test/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
})
gulp.task('concatJs', function () {
    gulp.src('./test/**/*.js')
        .pipe(concat())
        .pipe(gulp.dest('./dist'))
})
gulp.task('renameJs', function () {
    gulp.src('./test/**/*.js')
        .pipe(rename())
        .pipe(gulp.dest('./dist'))
})
gulp.task('miniJs', function () {
    gulp.src('./test/**/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
})
// gulp.task('default', function () {
//     // 将你的默认的任务代码放在这
//     console.log('这是默认任务');
// });
// gulp.task('minihtml', function () {
//     console.log('开始对html进行降维打击');
// })
// gulp.task('minicss', function () {
//     console.log('开始对css进行降维打击');
// })
// gulp.task('minijs', function () {
//     console.log('开始对js进行降维打击');
// })
// gulp.task('mini', ['minihtml', 'minicss', 'minijs'], function () {
//     console.log('降维打击已完成');
// })
/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 * npm install html-webpack-plugin --save-dev
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload');   //livereload

// webpack相关
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //	 // output options
            // }));
            callback();
        });
});

// HTML处理
gulp.task('nhtml', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css1', function () {
    var cssSrc = './src/css/*.css',
        cssDst = './dist/css/';

    gulp.src(cssSrc)
        //.pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/img/**/*',
        imgDst = './dist/img/';
    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
})

// 图片处理
gulp.task('images1', function(){
    var imgSrc = './src/templet/**/*',
        imgDst = './dist/templet/';
    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
})

// 清空图片、样式、js
gulp.task('c', function() {
    gulp.src(['./dist','./dist/index.html','./dist/works.html','./dist/edit.html','./dist/detail.html'], {read: false})
        .pipe(clean());
});

// 清空图片、样式、js
gulp.task('cjs', function() {
    gulp.src(['./dist/js'], {read: false})
        .pipe(clean());
});
gulp.task('cimg', function() {
    gulp.src(['./dist/img'], {read: false})
        .pipe(clean());
});
gulp.task('ccss', function() {
    gulp.src(['./dist/css'], {read: false})
        .pipe(clean());
});
gulp.task('chtml', function() {
    gulp.src(['./dist/index.html','./dist/works.html','./dist/edit.html','./dist/detail.html'], {read: false})
        .pipe(clean());
});

//单独任务
gulp.task('wp', ['cjs'], function(){
    gulp.start('webpack');
});

gulp.task('img', ['cimg'], function(){
    gulp.start('images');
});

gulp.task('css', ['ccss'], function(){
    gulp.start('css1');
});

gulp.task('html', ['chtml'], function(){
    gulp.start('nhtml');
});
//单独任务以上

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['c'], function(){
    gulp.start('css1','images','images1','webpack');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/css/*.css', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/img/**/*', function(){
            gulp.run('images');
        });

    });
});
'use strict'

var gulp, glob, bower, less, babelify, browserify, watchify, source, util, mainBowerFiles;

gulp = require('gulp');
glob = require('glob');
bower = require('bower');
less = require('gulp-less');
babelify = require('babelify')
browserify = require('browserify');
watchify = require('watchify');
source = require('vinyl-source-stream');
util = require('gulp-util');
mainBowerFiles = require('main-bower-files')

var sassPath, sassSource, jsSource;

sassPath = './app/assets/stylesheets/**/*.less';
sassSource = ['./app/assets/stylesheets/application.css.less'];
jsSource = './app/assets/javascripts/**/*.{js,es6}';

function compile(watch) {
    var files = glob.sync(jsSource, {ignore: 'cable'})
    var bower_files = mainBowerFiles()
    var bundler = watchify(browserify({ entries: files, debug: true }).transform(babelify));

    function bundle() {
        bundler.bundle()
            .on('error', util.log.bind(util, "Browserify Error"))
            .pipe(source('build.js'))
            .pipe(gulp.dest('./public/dev-assets'));

            gulp.src(bower_files)
                .pipe(gulp.dest('public/dev-assets'));
    }

    if (watch) {
        bundler.on('update', function () {
            console.log("Recompiling JS...");
            bundle();
        });
    }

    bundle();
}

gulp.task('default', ['compile-sass', 'compile-es6']);

gulp.task('compile-sass', function () {
    gulp.src(sassSource)
        .pipe(less({ indentedSyntax: true, errLogToConsole: true }))
        .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('compile-es6', function () {
    compile();
});

gulp.task('watch', ['watch-sass', 'watch-es6']);

gulp.task('watch-sass', function () {
    gulp.watch(sassPath, ['compile-sass']);
});

gulp.task('watch-es6', function () {
    compile(true)
});
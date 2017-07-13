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
let components = glob.sync('./app/assets/javascripts/components/**/*.{js,es6}');
var directives = glob.sync('./app/assets/javascripts/directives/**/*.{js,es6}');
var filters =    glob.sync('./app/assets/javascripts/filters/**/*.{js,es6}');
var providers =  glob.sync('./app/assets/javascripts/providers/**/*.{js,es6}');
var services =   glob.sync('./app/assets/javascripts/services/**/*.{js,es6}');
var appfiles =  glob.sync('./app/assets/javascripts/app.*.{js,es6}');

function compile(watch) {
    var files = appfiles.concat(components, directives, filters, providers, services);
    var bower_files = mainBowerFiles()
    var bundler = watchify(browserify({ entries: files, debug: true }).transform(babelify));

    function bundle() {
        bundler.bundle()
            .on('error', util.log.bind(util, "Browserify Error"))
            .pipe(source('build.js'))
            .pipe(gulp.dest('./app/assets'));

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
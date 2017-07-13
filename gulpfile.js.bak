// grab our packages
var concat = require('gulp-concat')
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    mainNpmFiles = require('gulp-main-npm-files'),
    sourcemaps = require('gulp-sourcemaps');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function () {
    return gulp.src('app/assets/javascripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function () {
    return gulp.src('app/assets/stylesheets/**/*.less')
        .pipe(sourcemaps.init())  // Process the original sources
            .pipe(less())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('move-node-modules', function() {
    return gulp.src(mainNpmFiles())
            .pipe(gulp.dest('vendor/assets/javascripts'))
})

gulp.task('build-js', function () {
    return gulp.src('app/assets/javascripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/javascripts'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
    gulp.watch('app/assets/javascripts/**/*.js', ['jshint']);
    gulp.watch('app/assets/stylesheets/**/*.less', ['build-css']);
});
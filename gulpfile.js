let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    nodemon = require('gulp-nodemon'),
    config = require('./config/default'),
    uiport = 8081;

gulp.task('browser-sync', ['nodemon'], function () {
    browsersync.init({
        server: false,
        proxy: "http://" + config.APPIP +":"+ config.PORT,
        ui: {
            port: uiport
        }
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'app.js'
    })
    .on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    })
    .on('restart', function () {
        setTimeout(function reload() {
            browsersync.reload({
                stream: false
            });
        }, 500);
    });
});

gulp.task('sass', function () {
    return gulp.src('assets/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('assets/css'))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src([
        'assets/lib/common.js', // Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('assets/lib'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch('assets/sass/**/*.sass', ['sass']);
    gulp.watch(['assets/lib/**/*.js', 'assets/common.js'], ['js']);
    gulp.watch('views/**/*.ejs', browsersync.reload);
});

gulp.task('default', ['watch']);

'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

// Path variables
var path = {
  src: {
    js: 'src/js/',
    less: 'src/less/style.less',
    img: 'src/img/**/*.*',
  },
  dist: {
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
  },
  watch: {
    html: '**/*.html',
    js: 'src/js/**/*.js',
    less: 'src/less/**/*.less',
    img: 'src/img/*.*'
  },
  root: __dirname
};

// Copy images
gulp.task('copy:images', function() {
  return gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img))
});

// Work with .less files
gulp.task('styles', function() {
  return gulp.src(path.src.less)
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie > 8',
        '> 1%'
      ],
      cascade: true
    }))
    .pipe(csso())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest(path.dist.css));
});

// Work with .js files
gulp.task('scripts', function() {
  return gulp.src([path.src.js + 'classList.js', path.src.js + 'timer.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
});

// BrowserSync config
gulp.task('server', function() {
  browsersync({
    server: path.root,
    notify: false,
    open: false
  });

  gulp.watch(path.watch.html, reload);
  gulp.watch(path.watch.less, ['styles', reload]);
  gulp.watch(path.watch.js, ['scripts', reload]);
  gulp.watch(path.watch.img, reload);
});

// Main task aka - gulp
gulp.task('default', [
  'copy:images',
  'styles',
  'scripts',
  'server'
  ]);
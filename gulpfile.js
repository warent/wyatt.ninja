var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefix  = require('gulp-autoprefixer');
var htmlmin     = require('gulp-htmlmin');

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'media', 'sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/html/*.html", ['html']);
});

gulp.task('html', function() {
  return gulp.src("src/html/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("app"));
});

gulp.task('media', function() {
  return gulp.src("src/media/*")
    .pipe(gulp.dest("app"))
    .pipe(browserSync.stream());
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefix())
      .pipe(gulp.dest("app"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

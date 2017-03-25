var gulp = require('gulp'),uglify = require('gulp-uglify'),uglifycss = require('gulp-uglifycss'),cssbust = require('gulp-css-cache-bust');

gulp.task('scripts', function() {
  // place code for your default task here
  gulp.src('static/dashboard/scripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('static/minjs'));
  console.log("gulp working");
});

gulp.task('jprogress', function() {
  // place code for your default task here
  gulp.src('static/dashboard/jprogress/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('static/jprogress'));
  console.log("gulp working");
});

gulp.task('css', function () {
  gulp.src('static/dashboard/css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('static/css'));
});

gulp.task('cachebust', function () {
  return gulp.src('static/dashboard/css/*.css')
  .pipe(cssbust())
  .pipe(gulp.dest('static/csscache'));
});

gulp.task('compress',['scripts','jprogress','css']);
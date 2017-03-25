var gulp = require('gulp'),uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
  gulp.src('static/dashboard/scripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('static/minjs'));
  console.log("gulp working");
});
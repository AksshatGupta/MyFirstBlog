const path = require('path');
const sass = require('gulp-sass');
const gulp = require('gulp');

sass.compiler = require("node-sass");

function defaultTask(done) {
  // place code for your default task here
  done();
}

gulp.task('default', defaultTask);

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

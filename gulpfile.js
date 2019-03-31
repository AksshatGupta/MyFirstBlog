const path = require('path');
const sass = require('gulp-sass');
const gulp = require('gulp');

sass.compiler = require('node-sass');

function defaultTask(done) {
  // place code for your default task here
  done();
}

gulp.task('default', defaultTask);

gulp.task('sass', () => gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css')));

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

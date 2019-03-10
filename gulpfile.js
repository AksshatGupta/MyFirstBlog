const path = require('path');
const less = require('gulp-less');
const gulp = require('gulp');

function defaultTask(done) {
  // place code for your default task here
  done();
}

gulp.task('default', defaultTask);

gulp.task('less', () => gulp.src('./src/*.less')
  .pipe(less({
    paths: [path.join(__dirname, 'less', 'includes')],
  }))
  .pipe(gulp.dest('./dist/css')));

gulp.watch('src/*.less', gulp.parallel('less'));

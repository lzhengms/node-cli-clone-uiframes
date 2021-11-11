import gulp from 'gulp'
import './build/clean'
import './build/scripts'
import './build/styles'
import './build/assets'


const version = require('gulp-update-version')
gulp.task('version', async() => {
  gulp.src('./package.json')
    .pipe(version())
    .pipe(gulp.dest('./'))
}) 

gulp.task('default',
  gulp.series('clean', gulp.series('assets', 'styles', 'scripts')));


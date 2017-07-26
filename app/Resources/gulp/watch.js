import gulp from 'gulp';
import watch from 'gulp-watch';

gulp.task('watch', () => {
   
    watch('assets/styles/**/*.scss', () => {
        gulp.start('styles');
    });

    watch('assets/scripts/**/*.js', () => {
        gulp.start('scripts');
    });
    
});
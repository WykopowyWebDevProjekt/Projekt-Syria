import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

const packStyles = dest => {
    return gulp.src('assets/styles/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules/normalize-scss/sass']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .on('error', error => {
            console.log(error.toString());
        })
        .pipe(gulp.dest(dest));
}

gulp.task('styles', () => {
    return packStyles('../../web/bundles/styles');
});

gulp.task('styles-temp', () => {
    return packStyles('/temp/styles');
});

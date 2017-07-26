import gulp from 'gulp';
import del from 'del';
import cssnano from 'gulp-cssnano';
import uglify from 'gulp-uglify';
import pump from 'pump';

gulp.task('deleteDistFolder', () => {
    return del(['../../web/bundles'], { force: true }).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    //ignore paths with exclamation mark
    var paths = [
        'assets/**/*',
        '!assets/styles/**',
        '!assets/scripts/**',
        '!temp',
        '!temp/**'
    ]
    
    return gulp.src(paths)
        .pipe(gulp.dest('../../web/bundles'));
});

gulp.task('buildScripts', ['scripts-temp'], callback => {
//   pump([
//         gulp.src('/temp/scripts/App.js'),
//         uglify(),
//         gulp.dest('../../web/bundles/scripts')
//     ],
//     callback
//   );
    return gulp.src('temp/scripts/**/*.js')
        .on('error', error => {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(gulp.dest('../../web/bundles/scripts'));
// });
});

gulp.task('buildStyles', ['styles-temp'], () => {
    return gulp.src('/temp/styles/**/*.css')
        .on('error', error => {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(cssnano())
        .pipe(gulp.dest('../../web/bundles/styles'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'buildStyles', 'buildScripts']);
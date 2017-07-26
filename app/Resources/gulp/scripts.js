import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';

gulp.task('scripts-temp', callback => {
    webpack(webpackConfig, (error, stats) => {
        if (error) console.log(error.toString());

        console.log(stats.toString());
        
        callback();
    });
});

gulp.task('scripts', ['scripts-temp'], () => {
    return gulp.src('temp/scripts/**/*.js')
        .on('error', error => {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('../../web/bundles/scripts'));
});

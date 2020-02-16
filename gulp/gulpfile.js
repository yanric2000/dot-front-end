const gulp = require('gulp');
const { dest } = gulp;
const babel = require('gulp-babel');
const minifyCSS = require('gulp-csso');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const path = '../src/';

gulp.task('css', gulp.series( function() {
    return gulp.src(path + 'css/*.css') 
        .pipe(minifyCSS())
        .pipe(dest(path + 'build/css'))
}));

gulp.task('js', gulp.series( function() {
    return gulp.src(path +'js/*.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(path + 'build/js'))
}));

gulp.task('imgs', gulp.series( function() {
    return gulp.src(path + 'assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(path + 'assets/min-images'))
}));


gulp.task('default', function(){
    gulp.watch(path + 'css/*.css', gulp.series('css')),
    gulp.watch(path + 'js/*.js', gulp.series('js'));
    gulp.watch(path + 'assets/images/*', gulp.series('imgs'));
  return
});
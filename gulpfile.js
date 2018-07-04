var gulp = require('gulp');  
var sass = require('gulp-sass'); 
var cleanCSS = require('gulp-clean-css');
var autiprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var gulpSequence = require('gulp-sequence');

const server = browserSync.create();

const path = {
    src: {
		scss: 'src/sass/*.scss',
	},
	build: {
		scss: './',
	},
	watch: {
		html: 'src/index.html',
		css: 'src/css/*.css',
		scss: 'src/sass/*.scss',
		js: 'src/js/*.js',
	}
};

//build sass
gulp.task('sass', function () {  
	return gulp.src(path.src.scss)
	.pipe(sass())
	.pipe(autiprefixer())
    // .pipe(cleanCSS())
	.pipe(gulp.dest(path.build.scss));
});

//run browsersync
gulp.task('browser-sync', function() {  
    browserSync.init([path.watch.scss, path.watch.html, path.watch.js], {
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('watch', function () {
	gulp.watch(path.watch.scss, ['sass']);
});

gulp.task('build', gulpSequence('sass', 'browser-sync', 'watch'));



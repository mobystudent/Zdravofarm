'use strict';

const gulp = require('gulp'),
	del = require('del'),
	pug = require('gulp-pug'),
	imagemin = require('gulp-imagemin'),
	less = require('gulp-less'),
	groupcmq = require('gulp-group-css-media-queries'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

const dirBuild = 'build',
	dirSrc = 'src',
	path = {
		build: {
			html: dirBuild,
			css: dirBuild,
			pug: dirSrc + '/template',
			fonts: dirBuild + '/fonts',
			favicon: dirBuild + '/favicon',
			img: dirBuild + '/img',
			js: dirBuild + '/js'
		},
		src: {
			html: dirSrc + '/template/*.html',
			css: dirSrc + '/css/style.less',
			pug: dirSrc + '/pug/**/*.pug',
			fonts: dirSrc + '/fonts/**/*',
			favicon: dirSrc + '/favicon/*',
			img: dirSrc + '/img/**/*',
			js: dirSrc + '/js/script.js'
		},
		watch: {
			html: dirSrc + '/template/**/*.html',
			css: dirSrc + '/css/**/*.less',
			pug: dirSrc + '/pug/**/*.pug',
			fonts: dirSrc + '/fonts/**/*',
			favicon: dirSrc + '/favicon/*',
			img: dirSrc + '/img/**/*',
			js: dirSrc + '/js/**/*.js'
		}
	};

function clean() {
	return del(dirBuild + '/**');
}

function gulpLess() {
	return gulp.src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(less({
			outputStyle: 'compressed'
		}))
		.pipe(groupcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 0.4%, last 4 versions, firefox >= 52, edge >= 16, ie >= 11, safari >=10']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css));
}

function gulpFonts() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
}

function gulpPug() {
	return gulp.src(path.src.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(path.build.pug));
}

function gulpHTML() {
	return gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html));
}

function gulpImages() {
	return gulp.src(path.src.img)
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 90, progressive: true}),
			imagemin.optipng(),
			imagemin.svgo()
		]))
		.pipe(gulp.dest(path.build.img));
}

function gulpFavicon() {
	return gulp.src(path.src.favicon)
		.pipe(gulp.dest(path.build.favicon));
}

function gulpJS() {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js));
}

function gulpWatch() {
	browserSync.init({
		server: './'+dirBuild
	});

	gulp.watch(path.watch.css, gulp.series(gulpLess));
	gulp.watch(path.watch.fonts, gulp.series(gulpFonts));
	gulp.watch(path.watch.pug, gulp.series(gulpPug));
	gulp.watch(path.watch.html, gulp.series(gulpHTML));
	gulp.watch(path.watch.img, gulp.series(gulpImages));
	gulp.watch(path.watch.favicon, gulp.series(gulpFavicon));
	gulp.watch(path.watch.js, gulp.series(gulpJS));
}

const dev = gulp.series(clean, gulp.parallel(gulpLess, gulpHTML, gulpPug, gulpFonts, gulpFavicon, gulpJS)),
	build = gulp.series(clean, gulp.parallel(gulpLess, gulpHTML, gulpFonts, gulpFavicon, gulpJS, gulpImages));

exports.default = build;
exports.watch = gulp.series(build, gulpWatch);
exports.dev = gulp.series(dev, gulpWatch);
exports.clean = clean;
exports.js = gulpJS;
exports.less = gulpLess;
exports.img = gulpImages;
exports.fonts = gulpFonts;

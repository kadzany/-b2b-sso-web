var settings = {
	clean: true,
	scripts: true,
	reload: true,
	styles: true
};

var paths = {
	input: './src/',
	output: './dist/',
	html: {
		input: './src/*.html',
		output: './dist/'
	},
	scripts: {
		input: 'src/js/*',
		polyfills: '.polyfill.js',
		output: './dist/js/'
	},
	styles: {
		input: './src/css/**/*',
		output: './dist/css/'
	},
	img: {
		input: './src/img/*.{svg,jpg,jpeg,png,gif}',
		output: './dist/img/'
	},
	lib: {
		input: './src/lib/**/*',
		output: './dist/lib/'
	},
	views: {
		input: './src/app/views/**/*',
		output: './dist/app/views/'
	},
	reload: './dist/'
};


var { gulp, src, dest, watch, series, parallel } = require('gulp');
var flatmap = require('gulp-flatmap');
var del = require('del');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');
var npmDist = require('gulp-npm-dist');
var fileinclude = require('gulp-file-include');

// BrowserSync
var browserSync = require('browser-sync');

var cleanDist = function (done) {
	// Clean the dist folder
	del.sync([
		paths.output
	]);

	// Signal completion
	return done();

};

var copyNpmDeps = function (done) {
	return src(npmDist(), { base: './node_modules' })
		.pipe(dest(paths.lib.output));
}

var copyLib = function (done) {
	return src(paths.lib.input)
		.pipe(dest(paths.lib.output));
}


// Copy images
var copyImg = function(done){
	var imgTasks = lazypipe()
		.pipe(dest, paths.img.output);

	return src(paths.img.input)
		.pipe(flatmap(function (stream, file) {
			return stream.pipe(imgTasks());
		}));

}

// Copy htmls
var copyHtml = function (done) {
	var htmlTasks = lazypipe()
		.pipe(dest, paths.html.output);

	return src(paths.html.input)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(flatmap(function (stream, file) {
			return stream.pipe(htmlTasks());
		}))
		;

}

// Lint, minify, and concatenate scripts
var buildScripts = function (done) {

	// Repeated JavaScript tasks
	var jsTasks = lazypipe()
		// .pipe(rename, { suffix: '' })
		.pipe(uglify)
		.pipe(optimizejs)
		.pipe(dest, paths.scripts.output);

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Run tasks on script files
	return src(paths.scripts.input)
		.pipe(flatmap(function (stream, file) {

			// If the file is a directory
			if (file.isDirectory()) {

				// Setup a suffix variable
				var suffix = '';

				// If separate polyfill files enabled
				if (settings.polyfills) {

					// Update the suffix
					suffix = '.polyfills';

					// Grab files that aren't polyfills, concatenate them, and process them
					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				// Grab all files and concatenate them
				// If separate polyfills enabled, this will have .polyfills in the filename
				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			// Otherwise, process the file
			return stream.pipe(jsTasks());

		}));

};

// Lint scripts
var lintScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Lint scripts
	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

};

// Process, lint, and minify Sass files
var buildStyles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	// Run tasks on all Sass files
	return src(paths.styles.input)
		.pipe(dest(paths.styles.output));

};

// Watch for changes to the src directory
var startServer = function (done) {

	// Make sure this feature is activated before running
	if (!settings.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		}
	});

	// Signal completion
	done();

};

// Watch for changes
var watchSource = function (done) {
	// Reload the browser when files change
	var reloadBrowser = function (done) {
		if (!settings.reload) return done();
		browserSync.reload();
		done();
	};

	watch(paths.input, series(exports.default, reloadBrowser));
	done();
};

// Default task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		copyLib,
		copyImg,
		copyHtml,
		copyNpmDeps
	)
);


// Watch and reload
// gulp watch
exports.watch = series(
	exports.default,
	startServer,
	watchSource
);

/* File: gulpfile.js */

// grab our gulp packages
// Use this site to get plugins for your workflow http://gulpjs.com/plugins/
var gulp  = require('gulp'),
    gutil = require('gulp-util');
    closureCompiler = require('google-closure-compiler').gulp();
    cleanCSS = require('gulp-clean-css');
    criticalCss = require('gulp-critical-css');
    imagemin = require('gulp-imagemin');
    htmlmin = require('gulp-htmlmin');

// Default task and log a message https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
gulp.task('default', function() {
   return gutil.log('Gulp is running! lets automate our web workflow')

});

// Checks for errors, warning as well as Minify Javascripts file in ./src/js/perfmatters.js and outputs as /dist/js/perfmatters.min.js
gulp.task('js-compile-src', function () {
  return gulp.src('./src/js/*.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'SIMPLE',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'perfmatters.js'
        }))
      .pipe(gulp.dest('./dist/js'));
});
// Checks for errors, warning as well as Minify Javascripts file in ./src/views/js/main.js and outputs as /dist/views/js/main.min.js
gulp.task('js-compile-view', function () {
  return gulp.src('./src/views/js/*.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'SIMPLE',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'main.js'
        }))
      .pipe(gulp.dest('./dist/views/js'));
});

// Minify CSS
gulp.task('css-minify-src', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize + ' Original File Size');
            console.log(details.name + ': ' + details.stats.minifiedSize + ' Minified File Size');
        }))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('css-minify-view', function() {
    return gulp.src('./src/views/css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize + ' Original File Size');
            console.log(details.name + ': ' + details.stats.minifiedSize + ' Minified File Size');
        }))
        .pipe(gulp.dest('./dist//views/css'));
});

// Inline Critical CSS - avoid render blocking for ./src/css/style.css
gulp.task('css-critical-src', function() {
  return gulp.src('./src/css/style.css')
    .pipe(criticalCss())
    .pipe(gulp.dest('./dist/css'))
});

// Inline Critical CSS - avoid render blocking for ./src/view/css/style.css
gulp.task('css-critical-view', function() {
  return gulp.src('./src/views/css/style.css')
    .pipe(criticalCss())
    .pipe(gulp.dest('./dist/views/css'))
});



// Minify Images in ./src/img and output Minified image in ./dist/img
gulp.task('images-minify-src', function() {
    return gulp.src('./src/img/*')
           .pipe(imagemin())
           .pipe(gulp.dest('./dist/img'));
});
// Minify Images in ./src/views/images and output Minified image in ./dist/views/images
gulp.task('images-minify-view', function() {
    return gulp.src('./src/views/images/*')
           .pipe(imagemin())
           .pipe(gulp.dest('./dist/views/images'));
});

// Minify html in /src and output minified html files in /dist
gulp.task('html-minify-src', function() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true,
                       removeComments: true
                     }))
    .pipe(gulp.dest('./dist'));
});
// Minify html in /src/views and output minified html files in /dist/views
gulp.task('html-minify-view', function() {
  return gulp.src('./src/views/*.html')
  .pipe(htmlmin({collapseWhitespace: true,
                 removeComments: true
               }))
  .pipe(gulp.dest('./dist/views'));
});

// Watch for changes on /src directory and apply changes to /dist by calling the function listed
gulp.task('watchforChanges', function() {
    gulp.watch('./src/*.html',['html-minify-src'])
    gulp.watch('./src/views/*.html',['html-minify-view'])
    gulp.watch('./src/js/*.js',['js-compile-src'])
    gulp.watch('./src/views/js/*.js',['js-compile-view'])
    gulp.watch('./src/css/*.css',['css-minify-src'])
    gulp.watch('./src/css/*.css',['css-critical-src'])
    gulp.watch('./src/css/*.css',['css-critical-view'])
    gulp.watch('./src/views/css/*.css',['css-minify-view'])
 });

// Runs the optimization for html, css, javascript, images and watches for any changes
//To run this, just type gulp at the root where the gulpfile.js is located.
gulp.task('default', ['html-minify-src','html-minify-view','css-critical-src','css-critical-view','css-minify-src','css-minify-view','js-compile-src','js-compile-view','images-minify-src','images-minify-view','watchforChanges']);

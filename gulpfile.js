
/* File: gulpfile.js */

// grab our gulp packages
// Use this site to get plugins for your workflow http://gulpjs.com/plugins/
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
  //  closureCompiler = require('google-closure-compiler').gulp(), this introduced issues with main.js so opted for uglify
    uglify = require('gulp-uglify');
  //  cleanCSS = require('gulp-clean-css'),  - Not required since we are inline all css
    inlineCss = require('gulp-inline-css'),  // Couldnt get critical working so opt for this inline css
  //  imagemin = require('gulp-imagemin'),   - Using gulp-responsive-images instead - better generates responsives images sizes https://github.com/dcgauld/gulp-responsive-images
    responsive = require('gulp-responsive-images'), // as recommended in Review
   // changed = require('gulp-changed'),
    htmlmin = require('gulp-htmlmin');
  //  htmltidy = require('gulp-htmltidy');


// Default task and log a message https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
gulp.task('default', function() {
   return gutil.log('Gulp is running! lets automate our web workflow')

});
/*
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
// Checks for errors, warning as well as Minify Javascripts file in ./src/views/js/main.js and outputs as /dist/views/js/main.js
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
}); */
// Minify Javascripts
gulp.task('js-compress-src', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Task to minify the views (pizza) JS folder
gulp.task('js-compress-views', function() {
  return gulp.src('src/views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'));
})
// Minify CSS  -- not required now since we are inline all css
/*
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
*/
//   -- inline css everthing found in .css files, remove the references to css
gulp.task('css-inline-src', function() {
    return gulp.src('./src/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css-inline-view', function() {
    return gulp.src('./src/views/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/views/'));
});

// Inline Critical CSS - avoid render blocking for ./src/view/css/style.css   -- does not work even after npm install --save-dev gulp-critical-css

/*   Use responsive instead - this is better as allow generate images for different screen media types - mobile, tablet, desktop.
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
*/
// Resize images for responsive sizes
gulp.task('image-resize-src', function() {
    return gulp.src('./src/img/**/*')
        .pipe(responsive({
            '**/*.*': [{
                width: 100,     // set the width to 100px
            //    suffix: '-100'
            }, {
                width: 200,     // set the width to 200px - an example generating different size width however you can also do this for height as well.
                suffix: '-200'  // testing suffix - works fine
            }]

        }))
        .pipe(gulp.dest('./dist/img'));
});

// Resize images for responsive sizes
gulp.task('image-resize-view', function() {
    return gulp.src('./src/views/images/**/*')
        .pipe(responsive({
            '**/*.*': [{
                width: 100,     // set the width to 100px
            //    suffix: '-100'
            }, {
                width: 200,     // set the width to 200px
                suffix: '-200'
            }]

        }))
        .pipe(gulp.dest('./dist/views/images'));
});


// Html tidy up and remove Comments   - run this last
/*
gulp.task('html-tidy-src', function() {
  return gulp.src('./src/*.html')
  .pipe(htmltidy({doctype: 'html5',
                 hideComments: true,    // hide comments - this is production code as only need this in development code
                 indent: true}))
        .pipe(gulp.dest('./dist'));;
});

gulp.task('html-tidy-view', function() {
  return gulp.src('./src/views/*.html')
  .pipe(htmltidy({doctype: 'html5',
                 hideComments: true,    // hide comments - this is production code as only need this in development code
                 indent: true}))
        .pipe(gulp.dest('./dist/views'));;
});
*/

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
  .pipe(htmlmin({ collapseWhitespace: false,
                 removeComments: true
               }))
  .pipe(gulp.dest('./dist/views'));
});



// Watch for changes on /src directory and apply changes to /dist by calling the function listed
gulp.task('watchforChanges', function() {
    gulp.watch('./src/*.html',['html-tidy-src']),
    gulp.watch('./src/views/*.html',['html-tidy-view']),
    gulp.watch('./src/js/*.js',['js-compile-src']),
    gulp.watch('./src/views/js/*.js',['js-compile-view']),
    gulp.watch('./src/css/*.css',['css-inline-src']),
    gulp.watch('./src/css/*.css',['css-inline-view']),
    gulp.watch('./src/css/*.css',['image-resize-src']),
    gulp.watch('./src/views/css/*.css',['image-resize-view'])
 });

// Runs the optimization for html, css, javascript, images and watches for any changes
//To run this, just type gulp at the root where the gulpfile.js is located.
gulp.task('default', ['js-compress-src','js-compress-views','image-resize-src','image-resize-view','css-inline-src','html-minify-src','html-minify-view','watchforChanges']);

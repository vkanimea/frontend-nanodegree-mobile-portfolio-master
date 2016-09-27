## Website Performance Optimization
## Project Rubric found in here https://review.udacity.com/#!/rubrics/16/view
To achieve PageSpeed score of at least 90 for Mobile and Desktop for index.html / project-2048.html / project-mobile.html / project-webperf.html

Mobile PageSpeed Score of 97/100 and Desktop PageSpeed Score 98/100
1. Remove Google Font - Open Sans 
2. For the print.css added the media="print"
3. Added the async attribute for perfmatters.js script to load asyncronously
4.              - javascript minified by using gulp task js-compile-src, js-compile-view respectively output in respective /dist folders
                           /src/js/perfmatters.js -> /dist/js/perfmatters.js
                           /src/views/main.js -> /dist/views/main.js                      
5.              - css optimized by using gulp task css-minify-src, css-minify-view respectively respectively output in respective /dist folders
                          /src/css -> /dist/css
                          /src/views/css -> /dist/views/css
6.              - images optimized by using gulp task  images-minify-src, images-minify-view respectively output in respective /dist folders
                         /src/img -> /dist/img - Minified 4 images (saved 74.59 kB - 13.9%)
                         /src/views/images -> /dist/views/images - Minified 2 images (saved 242.54 kB - 10%)
7.               - html minified by using gulp task html-minify-src, html-minify-view respectively output in respective /dist folders
                         /src/*.html -> /dist/*.html
                         /src/views/pizza.html -> /dist/views/pizza.html

                         ####Part 1: Optimize PageSpeed Insights score for index.html

                         Some useful tips to help you get started:

                           $> cd /path/to/your-project-folder
                           $> python -m SimpleHTTPServer 8080
                           ```
                        Open a browser and visit localhost:8080
                        Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

                           $> cd /path/to/your-project-folder
                           $> ./ngrok http 8080
                           ```
                         Type the generated URL - note this top level project directory so need to navigate

##Getting Rid of jank
Optimization made to  functions

1. changePizzaSizes
a. Remove determineDx as this is not needed, set a % width when the sizes change
b. Change the document.querySelectorAll to document.getElementsByClassName
c. To move the dom selector outside of the for loop, create a var randomPizzas to store this in, simiplify for loop to avoid reflow
d.* Move the pizzasDiv i.e. dom selector outside of the for loop. Line 467

2. updatePositions
a. Change the document.querySelectorAll to document.getElementsByClassName
b. To Move the dom calculations outside of the for loop, store this in var topScroll
c. Declare a phase as an array, to store 5 values and simiplify for loop processing
d. Adjust to use requestAnimationFrame translateX;

3. Other i.e  Generates the sliding pizzas when the page loads.
a.   Change no of pizza based on windows row & column in var pizzaTot instead of 200 times
b.   move the dom selection out of the loop in a var movingPizzas
c.*   use strict - this mode help secure codes for global variables; Todo: can able placed in function definitions.
d.*   used getElementById instead of querySelector as web API call is faster ; Line 410, 413, 416
e.*   For loop, It is better to save the array length, which is part of the condition statement, in a local variable, so the array's length property is not
     accessed to check its value at each iteration. (i.e. more efficiency) Line 448 / 449
f.*

## Use of a Build Tool Gulp to automate production version
There is a gulpfile.js at root that optimizes source code in /src into an output destination directory in /dist
    /dist is the destination for production code - spaces, comments removed and javascripts, css, images, html have been Minified.
    /src is source for the development code - this is readable for comments, javascript, css, images, html have NOT been Minified/Optimized
To run the gulpfile.js just type gulp at the root folder to regenerate the /dist

Please note that node.js needs to be installed first before can add the node modules or gulp plugins found in /node_modules. The gulp modules or plugins were installed using this command below:
  npm install gulp gulp-util google-closure-compiler gulp-clean-css gulp-imagemin gulp-htmlmin
This is reference guide: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
List of other gulp plugins that can be added to your workflow: http://gulpjs.com/plugins/

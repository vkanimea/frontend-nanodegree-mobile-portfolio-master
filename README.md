## Website Performance Optimization
## Project Rubric found in here https://review.udacity.com/#!/rubrics/16/view
To achieve PageSpeed score of at least 90 for Mobile and Desktop for index.html / project-2048.html / project-mobile.html / project-webperf.html

1. Remove Google Font - Open Sans as this is not utilized.
2. For the print.css added the media="print"
3. Added the async attribute for perfmatters.js script to load asyncronously
3. Used a Build Tool Gulp, the gulpfile.js at root to optimize source /src into an output destination in /dist
    /dist is the for production code  - spaces and comments have been removed
    /src is for the development code - this is readable for comments
4.              - javascript minified by using gulp task js-compile-src, js-compile-view respectively
                           /src/js/perfmatters.js -> /dist/js/perfmatters.js
                           /src/views/main.js -> /dist/views/main.js                      
5.              - css optimized by using gulp task css-minify-src, css-minify-view respectively
                          /src/css -> /dist/css
                          /src/views/css -> /dist/views/css
6.              - images optimized by using gulp task  images-minify-src, images-minify-view respectively
                         /src/img -> /dist/img - Minified 4 images (saved 74.59 kB - 13.9%)
                         /src/views/images -> /dist/views/images - Minified 2 images (saved 242.54 kB - 10%)
7.               - html minified by using gulp task html-minify-src, html-minify-view respectively
                         /src/*.html -> /dist/*.html
                         /src/views/pizza.html -> /dist/views/pizza.html

##Getting Rid of jank
Optimization made to  functions

1. changePizzaSizes
a. Remove determineDx as this is not needed, set a % width when the sizes change
b. Change the document.querySelectorAll to document.getElementsByClassName
c. To move the dom selector outside of the for loop, create a var randomPizzas to store this in, simiplify for loop to avoid reflow

2. updatePositions
a. Change the document.querySelectorAll to document.getElementsByClassName
b. To Move the dom calculations outside of the for loop, store this in var topScroll
c. Declare a phase as an array, to store 5 values and simiplify for loop processing
d. Adjust to use requestAnimationFrame translateX

3. Other i.e  Generates the sliding pizzas when the page loads.
a.   Change no of pizza based on windows row & column in var pizzaTot instead of 200 times
b.   move the dom selection out of the loop in a var movingPizzas

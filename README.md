Configurable assets builder
===========================

A collection of configurable [gulp](http://gulpjs.com/) tasks we use to build front-end code, mostly for fully static or CMS-based website projects.

-   Flexible configuration
-   Useful logs and system alerts
-   Built-in tasks: Sass with Autoprefixer, SVG sprites and JS minification
-   Easy to remove or edit built-in tasks, or write your own

*Requirements:*

-   [Node.js](https://nodejs.org) >= 4.0

*Table of contents:*

-   [Installation and usage](#installation-and-usage)
-   [Configuring tasks](#configuring-tasks)
-   [How to write a new task](#how-to-write-a-new-task)
-   Built-in tasks:
    - [sass](doc/task-sass.md) (Sass and Autoprefixer)
    - [svgsymbols](doc/task-svgsymbols.md) (SVG symbol sprites)
    - [jsconcat](doc/task-jsconcat.md) (Concatenate and minify JS scripts)


Installation and usage
----------------------

Install:

1.  [Download a ZIP with the assets-builder scripts and config](https://github.com/gradientz/assets-builder/archive/master.zip),
2.  move its contents to your project dir,
3.  and modify the config object in `gulpfile.js` to suit your needs.
4.  Finally, in a command prompt, `cd` to your project dir and run `npm install`.

There are two commands than you can use:

-   `npm run build` (build CSS/JS/SVG once)
-   `npm run watch` (build CSS/JS/SVG when files are changed)

Important: if you’re using Git, don’t forget to add `node_modules` to your `.gitignore`, to avoid versioning the many files installed by npm.


Configuring tasks
-----------------

Config objects have the following properties:

-   Required `src`: paths or glob patterns (string or array of strings).
-   Required `dest`: a single path (string).
-   Optional `watch`: either the value `true` to reuse the `src` config, or a different set of paths or glob patterns (string or array of strings).
-   Some tasks may offer additional options (see the next section for details).

You can make multiple builds by providing an array of config objects, instead of a single config object:

```js
{
  …,
  sass: [
    { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] },
    { src: 'assets/styles/other.scss', watch: false, outputStyle: 'compact',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] }
  ]
  …
}
```

You can also share settings between objects, using an array-like syntax where string keys are shared between configs, and number keys represent individual build configs. This is equivalent to the previous example:

```js
{
  …,
  sass: {
    dest: 'public/css',
    browsers: ['last 3 versions', 'ie >= 11'],
    0: { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss' },
    1: { src: 'assets/styles/other.scss', watch: false, outputStyle: 'compact' }
  }
  …
}
```


How to write a new task
-----------------------

If you want to write a new or different task (for example, one that transpiles ES6 code with Babel and makes a JS bundle), you can `write a task script in `assets-builder/tasks`.

This script should export a function that takes a config object and does… what you want to do. See the existing tasks for examples!

Here is a minimal example:

```js
/**
 * assets-builder/tasks/mytask.js 
 */

var gulp = require('gulp')
var __ = require('./../taskutils.js')

// Specific
var doSomething = require('gulp-do-something')

module.exports = function mytask(conf) {
  return gulp.src(conf.src)     // take some files
    .pipe(__.logerrors())       // tell gulp to show errors and continue
    .pipe(doSomething())        // use a gulp plugin to transform content
    .pipe(gulp.dest(conf.dest)) // write resulting files to destination
}
```

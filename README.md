Configurable assets builder
===========================

A collection of configurable [gulp](http://gulpjs.com/) tasks we use to build front-end code, mostly for fully static or CMS-based website projects.

-   Flexible configuration
-   Useful logs and system alerts
-   Use the built-in tasks (Sass with Autoprefixer, SVG sprites, and simple JS minification) or write your own

*Table of contents:*

-   [Installation and usage](#installation-and-usage)
-   [Using tasks](#using-tasks)
-   [Enable system notifications](#enable-system-notifications)
-   Built-in tasks:
    - [sass](doc/task-sass.md) (Sass and Autoprefixer)
    - [svgsymbols](doc/task-svgsymbols.md) (SVG symbol sprites)
    - [jsconcat](doc/task-jsconcat.md) (Concatenate and minify JS scripts)
-   [Multiple builds per task](#multiple-builds-per-task)
-   [How to write a new task](#how-to-write-a-new-task)


Installation and usage
----------------------

Requirements: [Node.js](https://nodejs.org) 4.x or above

Installing:

1.  [Download a ZIP with the assets-builder scripts and config](https://github.com/gradientz/assets-builder/archive/master.zip) and unzip it in your projet directory.
3.  Change the config object in `gulpfile.js`.
4.  Finally, in a command prompt, go to your project dir and run:  
`npm install`

Usage:

-   `npm run build`: build assets once
-   `npm run watch`: run in the background and build assets when source files are changed


Using tasks
-----------

To use one of the built-in tasks, you will need to do two things: 1) Configure the task and 2) Install its dependencies (if any).

### Task configuration

Configuration goes in your `gulpfile.js` and generally looks like this:

```js
require('./assets-builder')({
  taskname: {
    src: ['some/files/to/use/*.*', 'some/other/files/*.*'],
    dest: 'where/to/write/the/result',
    watch: true // will watch the 'src' files
  }
})
```

The `src`, `dest` and `watch` keys are common to all tasks. Some tasks may offer other options too. For the built-in tasks, those options are documented in [the doc folder](doc).

### Installing dependencies

Task dependencies are *not* installed by default. The first time you try to run a task, with `npm run build`, you might see an error like this:

```
[21:28:37] Error: missing dependencies for 'sass', 'jsconcat', 'svgsymbols' 
  
  To fix this, install missing dependencies:
  
  npm install -D "gulp-autoprefixer@^3.1" \
                 "gulp-sass@^2.3" \
                 "gulp-uglify@^1.5" \
                 "gulp-svgmin@^1.2.3" \
                 "gulp-svg-symbols@^2.0.2"

```

You can run the provided command to install the missing dependencies. Then run `npm run build` again.


Enable system notifications
---------------------------

To enable system notifications, install the `node-notifier` package:

- Locally to the project: `npm install node-notifier`
- Globally on your OS: `npm install -g node-notifier`

You could also add it to the `devDependencies` (`npm install -D node-notifier`), but that’s not ideal if you want to put this code as a build step on a server.


Multiple builds per task
------------------------

Each task can accept an array of config objects:

```js
{
  sass: [
    {
      src: 'assets/styles/main.scss',
      watch: 'assets/styles/**/*.scss',
      dest: 'public/css',
      browsers: ['last 3 versions', 'ie >= 11']
    },
    {
      src: 'assets/styles/other.scss',
      dest: 'public/css',
      browsers: ['last 3 versions', 'ie >= 11'],
      outputStyle: 'compact'
    },
  ]
}
```

You can also share settings between objects, with an array-like syntax. This is equivalent to the previous example:

```js
{
  sass: {
    // base settings
    dest: 'public/css',
    browsers: ['last 3 versions', 'ie >= 11'],
    // builds with specific settings
    0: { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss' },
    1: { src: 'assets/styles/other.scss', outputStyle: 'compact' }
  }
}
```


How to write a new task
-----------------------

Write your own task script in `assets-builder/tasks`. This script should export a function that accepts a config object.

### Minimal task example

```js
/**
 * assets-builder/tasks/mytask.js 
 */

const gulp = require('gulp')
const tools = require('../tasktools.js')
const doSomething = require('gulp-do-something')

module.exports = function mytask(conf) {
  return gulp.src(conf.src)     // take some files
    .pipe(tools.errors())     // tell gulp to show errors and continue
    .pipe(doSomething())        // use a gulp plugin to transform content
    .pipe(tools.size(conf.dest)) // log resulting file path/names and size
    .pipe(gulp.dest(conf.dest)) // write resulting files to destination
}
```

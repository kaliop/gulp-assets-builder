Configurable assets builder
===========================

A collection of configurable [gulp](http://gulpjs.com/) tasks we use to build front-end code, mostly for fully static or CMS-based website projects, using [gulp-task-maker](https://www.npmjs.com/package/gulp-task-maker).

⚠ Requires Node.js 4 or later.

Task list
---------

-   [less](doc/less.md): compile Less stylesheets
-   [mincss](doc/mincss.md): concatenate and minify CSS
-   [minjs](doc/minjs.md): concatenate and minify JS code
-   [sass](doc/sass.md): compile Sass stylesheets
-   [svgsymbols](doc/svgsymbols.md): build SVG symbol sprites

Installation
------------

### Simple installation

1.  [Download a ZIP of this repo](https://github.com/gradientz/assets-builder/archive/master.zip) and unzip it in your projet directory.
3.  Change the main config in `gulpfile.js`.
4.  Finally, in a command prompt, go to your project dir and run: `npm install`.

### Custom installation

1.  Install `gulp` and `gulp-task-maker` as devDependencies: `npm install -D gulp gulp-task-maker`.
2.  [Download a ZIP of this repo](https://github.com/gradientz/assets-builder/archive/master.zip) and copy the `gulp-tasks` directory or only the task scripts you want to ue.
3.  Write your own `gulpfile.js`, following the [gulp-task-maker documentation](https://github.com/fvsch/gulp-task-maker/blob/master/README.md).

Usage
-----

-   `npm run build`: build assets once
-   `npm run watch`: run in the background and build assets when source files are changed

The first time you try to run a task, e.g. with `npm run build`, you might see an error that looks like this:

```  
[13:37:21] [gulp-task-maker] Errors in 'sass', 'minjs'
  …
  Install missing task dependencies with:
    npm install -D "gulp-autoprefixer@^3.1" "gulp-sass@^2.3" "gulp-uglify@^2.0"
```

This is because task dependencies are not installed by default, but documented in the task’s `.json` file. This allows us to maintain as many tasks as we want in this repo, but not install dependencies we don’t use.

Run the provided command (`npm install -D …`), then run `npm run build` again. You should see something like this:

```
$ npm run build

> assets-builder@4.0.0 build ~/my-project
> gulp build

[13:38:12] Using gulpfile ~/my-project/gulpfile.js
[13:38:12] Starting 'build-sass'...
[13:38:12] Starting 'build-minjs'...
[13:38:12] Starting 'build-svgsymbols'...
[13:38:14] ./test/dist/ minjs.js 88.59 kB
[13:38:14] ./test/dist/ sass.css 406 B
[13:38:14] Finished 'build-minjs' after 2.33 s
[13:38:14] ./test/dist/ svgsymbols.svg 9.31 kB
[13:38:14] ./test/dist/ svgsymbols.svg.html 30.6 kB
[13:38:14] Finished 'build-sass' after 2.37 s
[13:38:14] Finished 'build-svgsymbols' after 2.34 s
[13:38:14] Starting 'build'...
[13:38:14] Finished 'build' after 6.65 μs
```

Configurable assets builder
===========================

A collection of configurable [gulp](http://gulpjs.com/) tasks we use to build front-end code, mostly for fully static or CMS-based website projects, using [gulp-task-maker](https://www.npmjs.com/package/gulp-task-maker).

⚠ Requires Node.js 6.5 or later.

Task list
---------

- [less](doc/less.md): compile Less stylesheets
- [mincss](doc/mincss.md): concatenate and minify CSS
- [minjs](doc/minjs.md): concatenate and minify JS code
- [sass](doc/sass.md): compile Sass stylesheets
- [svgsymbols](doc/svgsymbols.md): build SVG symbol sprites

Installation
------------

1. [Download a ZIP of this repo](https://github.com/gradientz/assets-builder/archive/master.zip) and unzip it in your projet directory.
3. Change the main config in `gulpfile.js` as needed.
4. Finally, in a command prompt, go to your project dir and run: `npm install`.

Usage
-----

- `npm run build`: build assets once
- `npm run watch`: run in the background and build assets when source files are changed

You should see something like this:

```
$ npm run build

> assets-builder@5.0.0 build ~/my-project
> gulp build

[13:38:12] Using gulpfile ~/my-project/gulpfile.js
[13:38:12] Starting 'build'...
[13:38:12] Starting 'build_sass'...
[13:38:12] Starting 'build_minjs'...
[13:38:12] Starting 'build_svgsymbols'...
[13:38:13] ./dist/ main.js 30 B
[13:38:13] ./dist/ main.css 21 B
[13:38:13] ./dist/ icons.svg 418 B
[13:38:13] ./dist/ icons.svg.html 19.5 kB
[13:38:13] Finished 'build_sass' after 168 ms
[13:38:13] Finished 'build_minjs' after 168 ms
[13:38:13] Finished 'build_svgsymbols' after 169 ms
[13:38:13] Finished 'build' after 171 ms
```

# Task: concatenate and minify JS code

## Features

- Concatenate files
- Sourcemaps support
- Minify with UglifyJS (warning: no ES6 support!)

## Options

```js
require('gulp-task-maker').task('gulp-tasks/minjs.js', {
  // (Required) Source can be a single script or pattern,
  // or an array of paths or patterns
  src: 'assets/scripts/*.js',

  // (Required) Destination can be a folder name, or a filename ending in '.js'.
  // The main difference is when building more than one script.
  // - Filename ending in '.js': the result will be concatenated
  // - Otherwise: original filenames are used, and put in the destination folder.
  dest: 'public/css/main.js',

  // (Optional; defaults to false)
  // File patterns to watch for changes
  watch: true,

  // (Optional; defaults to true)
  // Should we minify with csso?
  minify: true,

  // (Optional; defaults to '.'; false to disable)
  // Where should we write sourcemaps (relative to 'dest')
  sourcemaps: '.',

  // (Optional; defaults shown below)
  // gulp-uglify options
  uglifyjs: {
    output: {inline_script: true},
    compress: {drop_debugger: false},
    preserveComments: 'license'
  }
})
```

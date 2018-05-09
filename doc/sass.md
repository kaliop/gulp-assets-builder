# Task: compile Sass stylesheets

## Features

- Compile Sass (`.scss` only)
- Concatenate files
- Autoprefixer support
- Sourcemaps support
- Minify with csso

## Options

```js
require("gulp-task-maker").task("gulp-tasks/sass.js", {
  // (Required) Source can be a single Sass stylesheet
  // or pattern, or an array of paths or patterns
  src: "assets/styles/*.scss",

  // (Required) Destination can be a folder name, or a filename ending in ".css".
  // The main difference is when building more than one Sass stylesheet.
  // - Filename ending in ".css": the result will be concatenated
  // - Otherwise: original filenames are used, and put in the destination folder.
  dest: "public/css",

  // (Optional; defaults to false)
  // File patterns to watch for changes
  watch: "assets/styles/**/*.less",

  // (Optional; defaults to true)
  // Should we minify with csso?
  minify: true,

  // (Optional; defaults to "."; false to disable)
  // Where should we write sourcemaps (relative to "dest")
  sourcemaps: ".",

  // (Optional; defaults shown below)
  // gulp-sass options
  sass: { outputStyle: "compact", includePaths: ["."] },

  // (Optional; defaults shown below; false to disable)
  // gulp-autoprefixer options
  autoprefixer: { flexbox: "no-2009", grid: false },

  // (Optional; defaults shown below)
  // gulp-csso options
  csso: { restructure: false }
})
```

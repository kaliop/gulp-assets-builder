# Task: concatenate and minify CSS

## Features

- Concatenate files
- Autoprefixer support
- Sourcemaps support
- Minify with csso

## Options

```js
require("gulp-task-maker").task("gulp-tasks/mincss.js", {
  // (Required) Source can be a single stylesheet
  // or pattern, or an array of paths or patterns
  src: "assets/styles/*.css",

  // (Required) Destination can be a folder name, or a filename ending in ".css".
  // The main difference is when building more than one stylesheet.
  // - Filename ending in ".css": the result will be concatenated
  // - Otherwise: original filenames are used, and put in the destination folder.
  dest: "public/css/main.css",

  // (Optional; defaults to false)
  // File patterns to watch for changes
  watch: true,

  // (Optional; defaults to true)
  // Should we minify with csso?
  minify: true,

  // (Optional; pass a filename to use)
  // Should we concatenate all resulting files?
  concat: undefined,

  // (Optional; defaults to "."; false to disable)
  // Where should we write sourcemaps (relative to "dest")
  sourcemaps: ".",

  // (Optional; defaults shown below; false to disable)
  // gulp-autoprefixer options
  autoprefixer: { flexbox: "no-2009", grid: false },

  // (Optional; defaults shown below)
  // gulp-csso options
  csso: { restructure: false }
})
```

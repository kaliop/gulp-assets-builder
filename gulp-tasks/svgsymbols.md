# Task: build SVG symbol sprites

## Features

- Takes individual SVG images and generates a symbol sprite
- Generates a HTML demo page for each sprite
- Minifies with svgo

## Options

```js
require('gulp-task-maker').task('gulp-tasks/svgsymbols.js', {
  // (Required) Source can be a single script or pattern,
  // or an array of paths or patterns
  src: 'assets/scripts/*.js',

  // (Required) Destination must be a filename ending in '.svg'.
  dest: 'public/css/main.svg',

  // (Optional; defaults to false)
  // File patterns to watch for changes
  watch: true,

  // (Optional; defaults to true)
  // Should we minify with svgo?
  // Note: when disabling svgo, some features such as internal references may break
  minify: true,
  
  // (Optional; defaults to the string shown below)
  // Pattern for the symbol’s id attribute.
  // '%f' is the cleaned-up original filename.
  id: 'icon-%f',

  // (Optional; defaults to false)
  // Should we make a HTML demo page?
  demo: false,

  // (Optional; defaults to false)
  // Add a class name on the sprite's root <svg> element?
  // Can be useful for sprites you want to directly include in a web page.
  svgClassname: 'inline-sprite',

  // (Optional; defaults to the function shown below)
  // Function that cleans up file names to be used in the symbol's id attribute
  slug: file => file.toLowerCase().replace(/[^a-z0-9]/g,'')
})
```

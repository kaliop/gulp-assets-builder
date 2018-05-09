# Task: build SVG symbol sprites

## Features

- Takes individual SVG images and generates a symbol sprite
- Generates a HTML demo page for each sprite
- Minifies with svgo

## Options

```js
require("gulp-task-maker").task("gulp-tasks/svgsymbols.js", {
  // (Required) Source should be a list of SVG files
  src: "assets/scripts/*.svg",

  // (Required) Destination must be a filename ending in ".svg".
  dest: "public/css/main.svg",

  // (Optional; defaults to false)
  // Should we watch file changes?
  // Use true to watch the config.src files.
  watch: false,

  // (Optional; defaults to false)
  // Should we make a HTML demo page?
  demo: false,

  // (Optional; defaults to the string shown below)
  // Pattern for the symbol’s id attribute.
  // "%f" is the cleaned-up original filename.
  id: "icon-%f",

  // (Optional; defaults to the function shown below)
  // Function that cleans up file names to be used in the symbol’s id attribute
  slug: name => name.toLowerCase().replace(/[^a-z0-9]/g,""),

  // (Optional) XML attributes added to the sprite's root element
  // e.g. {"aria-hidden": "true", height: 0, width: 0}
  svgAttrs: {}
})
```

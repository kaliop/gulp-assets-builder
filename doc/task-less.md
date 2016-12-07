# Task: compile LESS with Autoprefixer

- Config key: `less`
- Source: `assets-builder/tasks/less.js`

Compile with gulp-less and run through Autoprefixer. Optionally concatenates files.

## Options

```js
{
  // (Required) Source can be a single Sass stylesheet
  // or pattern, or an array of paths or patterns
  src: 'assets/styles/*.less',

  // (Required) Destination can be a folder name, or a filename ending in '.css'.
  // The main difference is when building more than one Sass stylesheet.
  // - Filename ending in '.css': the result will be concatenated
  // - Otherwise: original filenames are used, and put in the destination folder.
  dest: 'public/css',

  // (Optional) File patterns to watch for changes
  watch: 'assets/styles/**/*.less',

  // (Optional) Autoprefixer: target browsers
  browsers: ['last 3 versions'],

  // (Optional) LESS include paths (for resolving @import)
  includePaths: ['node_modules']
}
```

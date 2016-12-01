# Task: concatenate and minify JS scripts

- Config key: `jsconcat`
- Source:: `assets-builder/tasks/jsconcat.js`

Lets you concatenate and minify JS code. Note that there is no support for wrapping code in IIFEs, or working with modules (see e.g. Browserify or Rollup for that). 

## Options

```js
{
  // (Required) Source files. Like with other tasks, we can
  // provide an array of paths instead of a single path.
  src: [ 'assets/libs/hello.js',
         'assets/scripts/*.js' ],

  // (Required) Destination must be a file name
  dest:  'public/js/main.js',

  // (Optional) File patterns to watch for changes, or `true`
  // to use the same value as the src property
  watch: true,

  // (Optional) Should we minify the result? Default is true.
  minify: true
}
```

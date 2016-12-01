# Task: compile Sass with Autoprefixer

- Config key: `sass`
- Source: `assets-builder/tasks/sass.js`

Runs node-sass and autoprefixer.

## Options

```js
{
  // (Required) Source can be a single Sass stylesheet
  // or pattern, or an array of paths or patterns
  src: 'assets/styles/*.scss',

  // (Required) Destination must be a folder
  dest: 'public/css',

  // (Optional) File patterns to watch for changes
  watch: 'assets/styles/**/*.scss',

  // (Optional) Autoprefixer: target browsers
  browsers: ['last 3 versions'],

  // (Optional) Sass output style
  // Defaults to 'compressed', can also be: 'nested', 'expanded', 'compact'
  outputStyle: 'compressed',

  // (Optional) Sass include paths (for resolving @import)
  includePaths: ['node_modules']
}
```

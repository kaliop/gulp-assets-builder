Configurable assets builder
===========================

A collection of configurable [gulp][] tasks we use to build front-end code, mostly for fully static or CMS-based website projects. Includes Sass with Autoprefixer, SVG sprites and JS minification.

*Some highlights:*

-   Flexible configuration
-   Adds useful logs (written files, errors, warnings)
-   Plus system notifications for errors
-   Easy to remove or edit built-in tasks, or write your own


Installation and usage
----------------------

Requirements: you don’t have to know gulp to use this tool, but you should have [Node.js][] installed, and access to a command prompt (Terminal on macOS, cmd.exe on Windows, etc.).

Install: [Download a ZIP with the assets-builder scripts and config][ZIP], and move its contents to your project dir. You will need to add these files to your project:

1.  `assets-builder` (the whole directory)
2.  `gulpfile.js` (this is where your config lives)
3.  `package.json` (used to install the dependencies)

You will need to change the config object in `gulpfile.js` to fit your project. Then you can open your project directory in a command prompt or terminal, and use those commands:

-   `npm install` (install dependencies)
-   `npm run build` (build CSS/JS/SVG once)
-   `npm run watch` (build CSS/JS/SVG when files are changed)


Writing a new task
------------------

If you want to write a new or different task (for example, one that transpiles ES6 code with Babel and makes a JS bundle), you should:

1.  Add your dependencies to `package.json` (`npm install my-dependency --save-dev`).
2.  Write a task script in `assets-builder/tasks`. It should export a function that takes a config object and does… what you want to do. See the existing tasks for examples.


Configuring tasks
-----------------

Config objects have the following properties:

-   Required `src`: paths or glob patterns (string or array of strings).
-   Required `dest`: a single path (string).
-   Optional `watch`: either the value `true` to reuse the `src` config, or a different set of paths or glob patterns (string or array of strings).

Some tasks may offer additional options. See the next section for details.

### Sass → Autoprefixer → CSS

Config key: `sass`<br>
Task script: `assets-builder/tasks/sass.js`

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
  // (Optional) Sass include paths (for @import)
  includePaths: ['node_modules']
}
```

### JS scripts → Concatenated and minified JS

Config key: `jsconcat`<br>
Task script: `assets-builder/tasks/jsconcat.js`

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

### SVG images → [SVG symbol sprites][DOC_SVG_SPRITES]

Config key: `svgsprite`<br>
Task script: `assets-builder/tasks/svgsprite.js`

```js
{
  // (Required) Source SVG images
  src: 'assets/icons/main/*.svg',
  // (Required) Destination must be a file name
  dest: 'public/svg/main.svg',
  // (Optional) File patterns to watch for changes, or `true`
  // to use the same value as the src property
  watch: true,
  // (Optional) Output a SVG file fit for inlining in a HTML page; defaults to false
  inline: true,
  // (Optional) Prefix symbol id attributes; no prefix by default
  prefix: 'shape-'
}
```

### Several builds per task

Each task can accept an array of config objects, instead of a single config object:

```js
{
  …,
  sass: [
    { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] },
    { src: 'assets/styles/other.scss', outputStyle: 'compact',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] }
  ]
  …
}
```

You can also share settings between objects, using an array-like syntax where:

- text keys are shared between configs
- number keys represent individual build configs

The following example is equivalent to the previous example:

```js
{
  …,
  sass: {
    dest: 'public/css',
    browsers: ['last 3 versions', 'ie >= 11'],
    0: { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss' },
    1: { src: 'assets/styles/other.scss', outputStyle: 'compact' }
  }
  …
}
```


[gulp]: http://gulpjs.com/
[Node.js]: https://nodejs.org
[ZIP]: https://github.com/gradientz/assets-builder/archive/config-in-gulpfile.zip
[DOC_SVG_SPRITES]: http://fvsch.com/code/svg-icons/how-to/

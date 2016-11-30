Configurable assets builder
===========================

A collection of configurable [gulp][] tasks we use to build front-end code, mostly for fully static or CMS-based website projects.

-   Flexible configuration
-   Useful logs and system alerts
-   Built-in tasks: Sass with Autoprefixer, SVG sprites and JS minification
-   Easy to remove or edit built-in tasks, or write your own

*Requirements:*

-   [Node.js][] >= 4.0

*Table of contents:*

-   [Installation and usage](#installation-and-usage)
-   [Configuring tasks](#configuring-tasks)
-   [Built-in tasks](#built-in-tasks)
-   [Writing a new task](#writing-a-new-task)


Installation and usage
----------------------

Install:

1.  [Download a ZIP with the assets-builder scripts and config][ZIP],
2.  move its contents to your project dir,
3.  and modify the config object in `gulpfile.js` to suit your needs.
4.  Finally, in a command prompt, `cd` to your project dir and run `npm install`.

There are two commands than you can use:

-   `npm run build` (build CSS/JS/SVG once)
-   `npm run watch` (build CSS/JS/SVG when files are changed)

Important: if you’re using Git, don’t forget to add `node_modules` to your `.gitignore`, to avoid versioning the many files installed by npm.


Configuring tasks
-----------------

Config objects have the following properties:

-   Required `src`: paths or glob patterns (string or array of strings).
-   Required `dest`: a single path (string).
-   Optional `watch`: either the value `true` to reuse the `src` config, or a different set of paths or glob patterns (string or array of strings).
-   Some tasks may offer additional options (see the next section for details).

You can make multiple builds by providing an array of config objects, instead of a single config object:

```js
{
  …,
  sass: [
    { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] },
    { src: 'assets/styles/other.scss', watch: false, outputStyle: 'compact',
      dest: 'public/css', browsers: ['last 3 versions', 'ie >= 11'] }
  ]
  …
}
```

You can also share settings between objects, using an array-like syntax where string keys are shared between configs, and number keys represent individual build configs. This is equivalent to the previous example:

```js
{
  …,
  sass: {
    dest: 'public/css',
    browsers: ['last 3 versions', 'ie >= 11'],
    0: { src: 'assets/styles/main.scss', watch: 'assets/styles/**/*.scss' },
    1: { src: 'assets/styles/other.scss', watch: false, outputStyle: 'compact' }
  }
  …
}
```


Built-in tasks
--------------

### Sass → Autoprefixer → CSS

Runs node-sass and autoprefixer.

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

Lets you concatenate and minify JS code. Note that there is no support for wrapping code in IIFEs, or working with modules (see e.g. Browserify or Rollup for that). 

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

### SVG images → SVG symbol sprites

Takes a bunch of SVG files and make a [SVG symbol sprite][DOC_SVG_SPRITES], to be used inline in your HTML pages or as an external resource.

Config key: `svgsymbols`<br>
Task script: `assets-builder/tasks/svgsymbols.js`

```js
{
  // (Required) Source SVG images
  src: 'assets/icons/main/*.svg',
  // (Required) Destination must be a file name
  dest: 'public/svg/main.svg',
  // (Optional) File patterns to watch for changes, or `true`
  // to use the same value as the src property
  watch: true,
  // (Optional) Output a HTML demo page alongside the sprite
  demo: false,
  // (Optional) Add attributes for an inline <svg> sprite
  inline: false,
  // (Optional) Pattern to use for symbol id attributes. '%f' is the
  // original filename with only lowercase letters and digits.
  symbolId: 'icon-%f',
  // (Optional) Class name(s) to use in HTML usage examples.
  symbolClass: 'icon icon-%f'
}
```


Writing a new task
------------------

If you want to write a new or different task (for example, one that transpiles ES6 code with Babel and makes a JS bundle), you should:

1.  Add your dependencies to `package.json` (`npm install my-dependency --save-dev`).
2.  Write a task script in `assets-builder/tasks`. It should export a function that takes a config object and does… what you want to do. See the existing tasks for examples.


[gulp]: http://gulpjs.com/
[Node.js]: https://nodejs.org
[ZIP]: https://github.com/gradientz/assets-builder/archive/master.zip
[DOC_SVG_SPRITES]: http://fvsch.com/code/svg-icons/how-to/

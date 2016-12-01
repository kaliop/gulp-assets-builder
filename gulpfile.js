/**
 * Configuration for assets-builder
 * (https://github.com/gradientz/assets-builder)
 *
 * There are 3 built-in tasks: 'sass', 'jsconcat' and 'svgsymbols'.
 * See the documentation for details about task options:
 * https://github.com/gradientz/assets-builder/blob/master/README.md
 *
 * You can write your own tasks by adding a script in:
 * 'assets-builder/tasks'. If you’re using Node packages or gulp
 * plugins, don’t forget to add them to your package.json with
 * `npm install [package-name] --save-dev`
 */
require('./assets-builder')({

  // Sass + Autoprefixer config. We watch files in subfolders
  // but only build the SCSS files at the styles root.
  sass: {
    src:   'source/styles/*.scss',
    watch: 'source/styles/**/*.scss',
    dest:  'public/css',
    browsers: ['last 3 versions', 'ie >= 11', 'ios >= 9', 'android >= 5']
  },

  // JS concatenation + minification config. You can take JS files
  // from node_modules, just remember to install them like this:
  //     npm install jquery --save
  // so that they are added to your package.json
  jsconcat: {
    src: [
      'node_modules/jquery/dist/jquery.slim.min.js',
      'source/scripts/*.js'
    ],
    dest:  'public/js/main.js',
    watch: true // watch the src files
  },

  // SVG symbol sprite config. Here we are making two sprites
  // from two folders, a small one with critical icons to be
  // inlined in HTML pages, and the main external sprite.
  svgsymbols: [
    {
      src: 'source/icons/critical/*.svg',
      dest: 'public/svg/critical.svg',
      watch: true, demo: true, inline: true
    },
    {
      src: 'source/icons/main/*.svg',
      dest: 'public/svg/main.svg',
      watch: true, demo: true
    }
  ]

})

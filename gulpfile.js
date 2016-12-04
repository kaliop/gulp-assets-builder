/**
 * Configuration for assets-builder
 * (https://github.com/gradientz/assets-builder)
 */
require('./assets-builder')({

  // EXAMPLE CONFIG
  // All task configs starting with a underscore will be ignored.
  // If you want to use the built-in 'sass', 'jsconcat' or 'svgsymbols'
  // tasks, remove the '_' and adapt the configs to your folder structure.

  sass: {
    src:   'source/styles/*.scss',
    watch: 'source/styles/**/*.scss',
    dest:  'public/css',
    browsers: ['last 3 versions', 'ie >= 11', 'ios >= 9', 'android >= 5']
  },

  jsconcat: {
    src: [
      'node_modules/jquery/dist/jquery.slim.min.js',
      'source/scripts/*.js'
    ],
    dest:  'public/js/main.js',
    watch: true // watch the src files
  },

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

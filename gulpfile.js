'use strict'
/**
 * Configuration for assets-builder (https://github.com/gradientz/assets-builder),
 * based on gulp-task-maker (https://github.com/fvsch/gulp-task-maker)
 */

const gtm = require('gulp-task-maker')

gtm.conf({
  notify: true,  // use system notifications for errors? (default: true)
  strict: false  // throw errors immediately? (default: false, shows errors at the end)
})

gtm.load('gulp-tasks', {

  // IMPORTANT:
  //
  // These are only example configs for each task, remove or change
  // them to match your needs and your file structure.
  //
  // For the mincss, sass and less tasks, Autoprefixer will use
  // the "browserslist" config in package.json

  mincss: {
    src: [
      'node_modules/normalize.css/normalize.css',
      'test/src/css/*.css'
    ],
    minify: true, // minify with csso? (default: true)
    watch: true,  // watch the 'src' files (default: false)
    dest:  'test/dist/mincss.css'
  },

  sass: {
    src: [
      'test/src/css/*.css',
      'test/src/sass/test.scss'
    ],
    watch: 'test/src/**/*.{css,scss}',
    dest:  'test/dist/sass.css'
  },

  less: {
    src: [
      'test/src/css/*.css',
      'test/src/less/test.less'
    ],
    watch: 'test/src/**/*.{css,less}',
    dest:  'test/dist/less.css'
  },

  minjs: {
    src:  [
      'node_modules/jquery/dist/jquery.min.js',
      'test/src/js/*.js'
    ],
    dest: 'test/dist/minjs.js',
    watch: 'test/src/js/*.js',
    minify: true
  },

  svgsymbols: [
    {
      src: 'test/src/svg/*.svg',
      dest: 'test/dist/svgsymbols.svg',
      id: 'icon-%f', // id pattern for symbols, where '%f' is the cleaned up file name
      svgClassname: 'inline-sprite', // add class to the root <svg> element
      demo: true
    }
  ]

})

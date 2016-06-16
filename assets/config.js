/**
 * Exemple configuration for assets-builder
 * 
 * There’s nothing magical or even standard in this config,
 * these are just the values expected by our custom tasks.
 * 
 * For details, see:
 *   README.md
 *   gulp/index.js
 *   gulp/builders/*.js
 */
module.exports = {
  sass: {
    src:   'assets/styles/*.scss',
    dest:  'public/css',
    watch: 'assets/styles/**/*.scss',
    browsers: ['last 3 versions', 'ie >= 11', 'ios >= 9', 'android >= 5']
  },
  jsconcat: {
    src: [
      'assets/libs/hello.js',
      'assets/demo-of-missing-file.min.js',
      'assets/scripts/*.js'
    ],
    dest:  'public/js/main.js',
    watch: true
  },
  svgsprite: {
    src:   'assets/icons/*.svg',
    dest:  'public/svg/sprite.svg',
    watch: true
  }
}

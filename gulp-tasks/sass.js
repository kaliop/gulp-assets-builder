'use strict'
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso')
const path = require('path')
const sass = require('gulp-sass')

/**
 * Make a CSS build from CSS and/or SCSS sources, optionally concatenated and minified
 * @param {object} config - user configuration
 * @param {object} tools - utility functions provided by gulp-task-maker
 * @returns {*}
 */
module.exports = function sassBuilder(config, tools) {
  config = Object.assign({
    minify: true,
    sourcemaps: '.',
    sass: {
      outputStyle: 'compact',
      includePaths: ['.']
    },
    autoprefixer: {
      flexbox: 'no-2009',
      grid: false
    },
    csso: {
      restructure: false
    },
  }, config)

  const ext = path.extname(config.dest)
  const base = path.basename(config.dest)
  const transforms = [
    sass(config.sass),
    config.autoprefixer && autoprefixer(config.autoprefixer),
    ext === '.css' && tools.concat(base),
    config.minify && csso(config.csso)
  ]
  return tools.commonBuilder(config, transforms)
}
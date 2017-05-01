'use strict'
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const path = require('path')

/**
 * Make a CSS build, optionally concatenated and minified
 * @param {object} config - user configuration
 * @param {object} tools - utility functions provided by gulp-task-maker
 * @returns {*}
 */
module.exports = function mincssBuilder(config, tools) {
  config = Object.assign({
    minify: true,
    sourcemaps: '.',
    autoprefixer: {
      flexbox: 'no-2009',
      grid: false
    },
    csso: {
      restructure: false
    }
  }, config)

  const transforms = [
    config.autoprefixer && autoprefixer(config.autoprefixer),
    path.extname(config.dest) === '.css' && tools.concat(path.basename(config.dest)),
    config.minify && csso(config.csso)
  ]
  return tools.commonBuilder(config, transforms)
}

'use strict'
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso')
const less = require('gulp-less')
const path = require('path')

/**
 * Make a CSS build from CSS and/or Less sources, optionally concatenated and minified
 * @param {object} config - user configuration
 * @param {object} tools - utility functions provided by gulp-task-maker
 * @returns {*}
 */
module.exports = function lessBuilder(config, tools) {
  config = Object.assign({
    minify: true,
    sourcemaps: '.',
    less: {
      paths: ['.']
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
    less(config.less),
    config.autoprefixer && autoprefixer(config.autoprefixer),
    ext === '.css' && tools.concat(base),
    config.minify && csso(config.csso)
  ]
  return tools.commonBuilder(config, transforms)
}

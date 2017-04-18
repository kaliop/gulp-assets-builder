'use strict'
const path = require('path')
const uglify = require('gulp-uglify')

/**
 * Make a simple JS build, optionally minified
 * @param {object} config - user configuration
 * @param {object} tools - utility functions provided by gulp-task-maker
 * @returns {*}
 */
module.exports = function minjsBuilder(config, tools) {
  config = Object.assign({
    minify: true,
    sourcemaps: '.',
    uglifyjs: {
      output: {inline_script: true},
      compress: {drop_debugger: false},
      preserveComments: 'license'
    }
  }, config)

  const ext = path.extname(config.dest)
  const base = path.basename(config.dest)
  const transforms = [
    ext === '.js' && tools.concat(base),
    config.minify && uglify(config.uglifyjs)
  ]
  return tools.commonBuilder(config, transforms)
}

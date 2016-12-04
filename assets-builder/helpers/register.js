'use strict'

const gulp = require('gulp')
const normalize = require('./normalize.js')
const missing = require('./missing.js')

/**
 * Register matching 'build' and 'watch' gulp tasks and return their name
 * @param {string} key - short name of task
 * @param {Array|Object} configs - config object or array of config objects
 * @param {Function} builder - callback that takes a config object
 * @returns {Array} - names of registered tasks
 */
module.exports = function register(key, configs, builder) {
  let taskNames = []

  normalize(key, configs).forEach(function(config, index) {
    const id = key + (configs.length > 1 ? '-' + (index+1) : '')
    const buildId = 'build-' + id
    const watchId = 'watch-' + id

    // Register build task
    gulp.task(buildId, function() {
      // notify about paths or patterns that match no files
      config.src.forEach(function(pattern) {
        missing(pattern, id)
      })
      // do the actual building
      builder(config)
    })
    taskNames.push(buildId)

    // Register matching watch task
    if (config.watch) {
      gulp.task(watchId, function() {
        gulp.watch(config.watch, [buildId])
      })
      taskNames.push(watchId)
    }
  })

  return taskNames
}

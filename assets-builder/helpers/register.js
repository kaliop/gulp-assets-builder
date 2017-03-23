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
  const taskNames = []

  normalize(key, configs).forEach(function(conf, index, normalized) {
    const id = key + (normalized.length > 1 ? '-' + (index+1) : '')
    const buildId = 'build-' + id
    const watchId = 'watch-' + id

    // Register build task
    gulp.task(buildId, function() {
      // notify about paths or patterns that match no files
      conf.src.forEach(function(pattern) {
        missing(pattern, id)
      })
      // do the actual building
      builder(conf)
    })
    taskNames.push(buildId)

    // Register matching watch task
    if (Array.isArray(conf.watch) && conf.watch.length > 0) {
      gulp.task(watchId, function() {
        gulp.watch(conf.watch, [buildId])
      })
      taskNames.push(watchId)
    }
  })

  return taskNames
}

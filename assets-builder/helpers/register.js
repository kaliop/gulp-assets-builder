'use strict'

var gulp = require('gulp')
var normalize = require('./normalize.js')
var missing = require('./missing.js')

/**
 * Register matching 'build' and 'watch' gulp tasks and return their name
 * @param {Array|Object} configs - config object or array of config objects
 * @param {string} key - short name of task
 * @param {Function} builder - callback that takes a config object
 * @returns {Array} - names of registered tasks
 */
module.exports = function(configs, key, builder) {
  configs = normalize(configs, key)
  var taskNames = []

  configs.forEach(function(config, index) {
    var id = key + (configs.length > 1 ? ':' + index : '')
    var buildId = 'build:' + id
    var watchId = 'watch:' + id

    // Asynchronously notify about paths or patterns that match no files
    config.src.forEach(function(pattern) {
      missing(pattern, id)
    })

    // Register build task
    gulp.task(buildId, function() {
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

/**
 * @file Dynamically register gulp tasks
 */
'use strict'

var gulp = require('gulp')
var path = require('path')
var notify = require('./helpers/notify.js')
var register = require('./helpers/register.js')

/**
 * Set up assets-builder’s gulp tasks, based on available
 * task scripts (in the `tasks` subdir) and user-provided config.
 * @param {Object} config
 */
module.exports = function assetsBuilder(config) {
  if (typeof config !== 'object') {
    notify({
      title: 'Error: Missing config',
      colors: 'bold.red',
      message: 'Make sure you call assets-builder with a config object'
    })
    return
  }

  // Register individual build and watch tasks
  var activeTasks = []

  Object.keys(config).forEach(function(key) {
    key = key.trim().replace('..', '')
    var builder
    try {
      builder = require('./tasks/' + key + '.js')
      var taskNames = register(config[key], key, builder)
      activeTasks = activeTasks.concat(taskNames)
    }
    catch(err) {
      var filename = path.basename(__dirname) + '/tasks/' + key + '.js'
      notify({
        title: 'Ignoring \''+ key + '\' config',
        message: 'No task at \'' + filename + '\''
      })
    }
  })

  // Configure the main tasks
  gulp.task('build', activeTasks.filter(function(x) {
    return x.indexOf('build') === 0
  }))
  gulp.task('watch', activeTasks.filter(function(x) {
    return x.indexOf('watch') === 0
  }))

}

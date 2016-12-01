/**
 * @file Dynamically register gulp tasks
 */
'use strict'

var event = process.env.npm_lifecycle_event

var fs = require('fs')
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

  var activeScripts = {}
  var activeTasks = []

  // Check that the task script exists
  for (var key in config) {
    var relPath = 'tasks/' + key.trim().replace('..', '') + '.js'
    if (key.indexOf('_') !== 0 && fs.existsSync(__dirname + '/' + relPath)) {
      activeScripts[key] = relPath
    } else {
      notify({ title: 'Ignoring task "' + key + '" (no file at ' + path.basename(__dirname) + '/' + relPath + ')' })
    }
  }

  // Register tasks unless we're in debug mode
  if (event !== 'debug') Object.keys(activeScripts).forEach(function(name) {
    var builder = require('./' + activeScripts[name])
    activeTasks.concat(register(config[key], key, builder))
  })
  gulp.task('build', activeTasks.filter(function(x) {
    return x.indexOf('build') === 0
  }))
  gulp.task('watch', activeTasks.filter(function(x) {
    return x.indexOf('watch') === 0
  }))

  // Test that files exist and dependencies
  gulp.task('debug', function() {
    var load = require('./helpers/load.js')
    Object.keys(activeScripts).forEach(function(name) {
      var jsonPath = './' + activeScripts[name].replace('.js', '.json')
      var deps = require(jsonPath).dependencies
      console.log(deps)
      var test = load(name, deps)
    })
  })

}

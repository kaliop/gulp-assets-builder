// ==========
// gulp setup
// ==========

var gulp = require('gulp')
var path = require('path')
var notify = require('./helpers/notify.js')
var register = require('./helpers/register.js')


// -----------
// Load config
// -----------

var configPath = process.env.npm_package_config_assets
var conf = {}

if (!configPath) {
  notify({
    title:   '[assets-builder] Missing path to config file',
    message: 'Your package.json should have a config.assets key with a relative\n'
           + 'path to your assets config file (e.g. "assets/config.js").'
  })
}
else {
  try { conf = require(path.join(process.cwd(), configPath)) }
  catch(err) {
    err.title = '[assets-builder] Could not load config file'
    notify(err)
  }
}


// -----------------------------------------
// Register individual build and watch tasks
// -----------------------------------------

var activeTasks = []

Object.keys(conf).forEach(function(key) {
  var builder
  try { builder = require('./builders/' + key + '.js') }
  catch(err) { notify(err) }
  if (typeof builder === 'function') {
    var taskNames = register(conf[key], key, builder)
    activeTasks = activeTasks.concat(taskNames)
  }
})


// ------------------------
// Configure the main tasks
// ------------------------

gulp.task('build', activeTasks.filter(function(x) {
  return x.indexOf('build') === 0
}))

gulp.task('watch', activeTasks.filter(function(x) {
  return x.indexOf('watch') === 0
}))

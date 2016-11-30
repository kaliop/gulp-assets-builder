'use strict'

var plumber = require('gulp-plumber')
var notify  = require('../helpers/notify.js')

/**
 * Patch gulp.src's onerror method with gulp-plumber,
 * so that errors in a task are logged but don't kill the task.
 * Usage:
 *   var plumbing = require('./../helpers/plumbing.js')
 *   gulp.src( … ).pipe( plumbing() ).pipe( … )
 */
module.exports = function() {
  return plumber(notify)
}

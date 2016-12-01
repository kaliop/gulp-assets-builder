'use strict'

var gutil = require('gulp-util')

// Using node-notifier should be optional
// e.g. Developer installs it locally or globally on their workstation,
// but we don't use it on a server environment
var notifier = null;
try { notifier = require('node-notifier') } catch(err) {}

/**
 * Log and notify errors
 * Error objects we get from different gulp plugins can have very different
 * data, so sometimes it can be hard to display the right information.
 * @param {object} err
 */
module.exports = function notify(err) {
  // Prepare error message
  var title = '[assets-builder] Error'
  var message = ''
  if (typeof err === 'string') {
    message = err
  }
  else if (typeof err === 'object') {
    if (err.title) {
      title = err.title
    }
    else if (err.plugin) {
      title = '[' + err.plugin + '] Error'
    }
    if (err.file) {
      title += ' in ' + err.file.split('/').pop()
    }
    // Some gulp plugins use the 'formatted' key with a message format
    // that suits our needs better, but 'message' is more common.
    message = err.formatted || err.message || ''
  }

  // Show error in console
  var titleColor = gutil.colors.red
  if (typeof err.colors === 'string') {
    err.colors.split('.').forEach(function(name){
      if (name in titleColor) titleColor = titleColor[name]
    })
  }
  gutil.log(
    titleColor(title),
    message ? ('\n' + message).replace(/\n/g, '\n  ') : ''
  )

  // And in system notifications if we can
  if (notifier) {
    notifier.notify({
      title: title,
      message: message.replace(/\s*\n\s*/g, ' '),
      sound: true
    })
  }

  // Necessary so that errors from gulp plugins dont stop watch tasks
  if (typeof this === 'object' && this.emit) {
    this.emit('end')
  }

  // Useful when throwing, as in throw notify({…})
  return title + '\n' + message
}

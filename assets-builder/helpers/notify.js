'use strict'

const gutil = require('gulp-util')

// Using node-notifier should be optional
// e.g. Developer installs it locally or globally on their workstation,
// but we don't use it on a server environment
let notifier = null;
try { notifier = require('node-notifier') } catch(err) {}

/**
 * Log and notify errors
 * Error objects we get from different gulp plugins can have very different
 * data, so sometimes it can be hard to display the right information.
 * @param {object} err
 */
module.exports = function notify(err) {
  // Prepare error message
  let title = 'Error: ' + (typeof err === 'string' ? err : err.message)
  let customTitle = ''
  let details = ''
  if (typeof err === 'object') {
    if (err.title) {
      customTitle = err.title
    } else if (err.plugin) {
      customTitle = '[' + err.plugin + '] Error'
    }
    if (err.file) {
      customTitle += ' in ' + err.file.split('/').pop()
    }
    if (customTitle) {
      title = customTitle
    }
    if (customTitle || err.details) {
      // Some gulp plugins use the 'formatted' key with a message format
      // that suits our needs better, but 'message' is more common.
      details = err.details || err.formatted || err.message || ''
    }
  }

  // Show error in console
  let titleColor = err.warn ? gutil.colors.reset : gutil.colors.red
  if (typeof err.colors === 'string') {
    err.colors.split('.').forEach(name => {
      if (name in titleColor) titleColor = titleColor[name]
    })
  }
  gutil.log(
    titleColor(title),
    details ? ('\n' + details).replace(/\n/g, '\n  ') : ''
  )

  // And in system notifications if we can (for errors only)
  if (notifier && !err.warn) {
    notifier.notify({
      title: title,
      message: details.replace(/\s*\n\s*/g, ' '),
      sound: true
    })
  }

  // Necessary so that errors from gulp plugins dont stop watch tasks
  if (typeof this === 'object' && this.emit) {
    this.emit('end')
  }

  // Useful when throwing, as in throw notify({…})
  return err
}

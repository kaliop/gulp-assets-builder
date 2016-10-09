'use strict'

var glob = require('glob')
var notify = require('./notify.js')

/**
 * Check that a glob patterns actually matches at least one file,
 * and notify users otherwise.
 * @param {string} pattern - glob pattern
 * @param {string} taskId
 */
module.exports = function(pattern, taskId) {
  glob(pattern, function(err, found) {
    if (err) notify(err)
    if (found.length === 0) {
      notify({
        title: 'Missing \'' + taskId + '\' sources',
        message: 'Nothing at \'' + pattern + '\''
      })
    }
  })
}
'use strict'

const glob = require('glob')
const notify = require('./notify.js')

/**
 * Check that a glob patterns actually matches at least one file,
 * and notify users otherwise.
 * @param {string} pattern - glob pattern
 * @param {string} taskId
 */
module.exports = function missing(pattern, taskId) {
  glob(pattern, (err, found) => {
    if (err) notify(err)
    else if (found.length === 0) {
      notify({
        title: 'Warning: missing \'' + taskId + '\' sources: ' + pattern,
        warn: true
      })
    }
  })
}

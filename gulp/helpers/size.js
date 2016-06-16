'use strict'

var size = require('gulp-size')

/**
 * Helper function using gulp-size to log the size and path
 * of a file we're about to to write to the filesystem.
 * @param {string} dest
 */
module.exports = function(dest) {
  return size({
    showFiles: true,
    title: 'Writing → ' + dest + '/'
  })
}

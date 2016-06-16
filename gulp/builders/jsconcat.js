'use strict'
// ----------------------------------
// Builder: concat and minify JS code
// ----------------------------------

// Core tools
var concat     = require('gulp-concat')
var gulp       = require('gulp')
var path       = require('path')
var plumber    = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var uglify     = require('gulp-uglify')

// Helpers
var notify     = require('../helpers/notify.js')
var showSize   = require('../helpers/size.js')

/**
 * Make a JS build, optionally minified
 * @param {object} config
 * @property {Array|string} config.src - glob patterns of files to concatenate
 * @property {string} config.dest - output file name
 * @returns {*}
 */
module.exports = function concatJS(config) {
  var dest = path.parse(config.dest)
  return gulp.src(config.src)
    .pipe( plumber(notify) )
    .pipe( sourcemaps.init() )
    .pipe( concat(dest.base) )
    .pipe( uglify() )
    .pipe( showSize(dest.dir) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(dest.dir) )
}

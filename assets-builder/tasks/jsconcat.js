/**
 * @file Concat and minify JS code
 */
'use strict'

// Core & utils
var gulp = require('gulp')
var path = require('path')
var __ = require('../taskutils.js')

// Task-specific dependencies
var deps = __.load('jsconcat', require('./jsconcat.json').dependencies)
var uglify = deps['gulp-uglify']

/**
 * Make a JS build, optionally minified
 * @param {object} conf
 * @property {Array|string} conf.src - glob patterns of files to concatenate
 * @property {string} conf.dest - output file name
 * @returns {*}
 */
module.exports = function jsconcat(conf) {
  // Opt-out of minification with any falsy value
  var minify = 'minify' in conf ? Boolean(conf.minify) : true
  var dest = path.parse(conf.dest)

  return gulp.src(conf.src)
    .pipe( __.logerrors() )
    .pipe( __.sourcemaps.init() )
    .pipe( __.concat(dest.base) )
    .pipe( __.if(minify, uglify()) )
    .pipe( __.size(dest.dir) )
    .pipe( __.sourcemaps.write('.') )
    .pipe( gulp.dest(dest.dir) )
}

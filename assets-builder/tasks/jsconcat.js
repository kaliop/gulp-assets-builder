/**
 * @file Concat and minify JS code
 */
'use strict'

// Core
var concat     = require('gulp-concat')
var gulp       = require('gulp')
var gulpif     = require('gulp-if')
var path       = require('path')
var plumbing   = require('../helpers/plumbing.js')
var size       = require('../helpers/size.js')

// Specific
var uglify     = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

/**
 * Make a JS build, optionally minified
 * @param {object} config
 * @property {Array|string} config.src - glob patterns of files to concatenate
 * @property {string} config.dest - output file name
 * @returns {*}
 */
module.exports = function buildJsConcat(config) {
  // Opt-out of minification with any falsy value
  var minify = 'minify' in config ? Boolean(config.minify) : true
  var dest = path.parse(config.dest)

  return gulp.src(config.src)
    .pipe( plumbing() )
    .pipe( sourcemaps.init() )
    .pipe( concat(dest.base) )
    .pipe( gulpif(minify, uglify()) )
    .pipe( size(dest.dir) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(dest.dir) )
}

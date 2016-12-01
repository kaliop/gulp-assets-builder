/**
 * @file Sass + Autoprefixer
 */
'use strict'

// Core & utils
var gulp = require('gulp')
var __ = require('./../taskutils.js')

// Task-specific dependencies
var deps = __.load('sass', require('./sass.json').dependencies)
var autoprefixer = deps['gulp-autoprefixer']
var sass = deps['gulp-sass']

/**
 * Build one or more Sass stylesheets
 * @param {Object} conf
 * @property {Array|string} conf.src - glob patterns of Sass files to build
 * @property {string} conf.dest - output file name
 * @property {string} conf.browsers - Autoprefixer browser compat
 * @returns {*}
 */
module.exports = function sass(conf) {
  var sassOpts = {
    outputStyle: conf.outputStyle || 'compressed',
    includePaths: conf.includePaths || []
  }
  var prefixOpts = {}
  if (conf.browsers) {
    prefixOpts.browsers = conf.browsers
  }
  return gulp.src( conf.src )
    .pipe( __.logerrors() )
    .pipe( __.sourcemaps.init() )
    .pipe( sass(sassOpts) )
    .pipe( autoprefixer(prefixOpts) )
    .pipe( __.size(conf.dest) )
    .pipe( __.sourcemaps.write('.') )
    .pipe( gulp.dest(conf.dest) )
}

/**
 * @file Sass + Autoprefixer
 */
'use strict'

// Core
var gulp       = require('gulp')
var plumbing   = require('../helpers/plumbing.js')
var size       = require('../helpers/size.js')

// Specific
var autoprefix = require('gulp-autoprefixer')
var sass       = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

/**
 * Build one or more Sass stylesheets
 * @param {Object} config
 * @property {Array|string} config.src - glob patterns of Sass files to build
 * @property {string} config.dest - output file name
 * @property {string} config.browsers - Autoprefixer browser compat
 * @returns {*}
 */
module.exports = function buildSass(config) {
  var sassOpts = {
    outputStyle: config.outputStyle || 'compressed',
    includePaths: config.includePaths || []
  }
  var prefixOpts = {}
  if (config.browsers) {
    prefixOpts.browsers = config.browsers
  }
  return gulp.src( config.src )
    .pipe( plumbing() )
    .pipe( sourcemaps.init() )
    .pipe( sass(sassOpts) )
    .pipe( autoprefix(prefixOpts) )
    .pipe( size(config.dest) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(config.dest) )
}

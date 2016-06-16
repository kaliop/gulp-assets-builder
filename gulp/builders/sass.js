'use strict'
// ----------------------------
// Builder: Sass + Autoprefixer
// ----------------------------

// Core tools
var autoprefix = require('gulp-autoprefixer')
var gulp       = require('gulp')
var plumber    = require('gulp-plumber')
var sass       = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

// Helpers
var notify     = require('../helpers/notify.js')
var showSize   = require('../helpers/size.js')

/**
 * Build one or more Sass stylesheets
 * @param {Object} config
 * @property {Array|string} config.src - glob patterns of Sass files to build
 * @property {string} config.dest - output file name
 * @property {string} config.browsers - Autoprefixer browser compat
 * @returns {*}
 */
module.exports = function buildSass(config) {
  var prefixOpts = {}
  if (config.browsers) {
    prefixOpts.browsers = config.browsers
  }
  return gulp.src( config.src )
    .pipe( plumber(notify) )
    .pipe( sourcemaps.init() )
    .pipe( sass({outputStyle: 'compressed'}) )
    .pipe( autoprefix(prefixOpts) )
    .pipe( showSize(config.dest) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(config.dest) )
}

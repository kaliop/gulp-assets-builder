/**
 * @file Sass + Autoprefixer
 */
'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const tools = require('../tasktools.js')
const autoprefixer = require('gulp-autoprefixer');

/**
 * Build one or more Sass stylesheets
 * @param {Object} conf
 * @property {Array|string} conf.src - glob patterns of Sass files to build
 * @property {string} conf.dest - output file name
 * @property {string} conf.browsers - Autoprefixer browser compat
 * @returns {*}
 */
module.exports = function sassBuilder(conf) {
  let sassOpts = {
    outputStyle: conf.outputStyle || 'compressed',
    includePaths: conf.includePaths || []
  }
  let prefixOpts = conf.browsers ? {browsers: conf.browsers} : {}

  return gulp.src( conf.src )
    .pipe( tools.errors() )
    .pipe( tools.sourcemap.init() )
    .pipe( sass(sassOpts) )
    .pipe( autoprefixer(prefixOpts) )
    .pipe( tools.size(conf.dest) )
    .pipe( tools.sourcemap.write('.') )
    .pipe( gulp.dest(conf.dest) )
}

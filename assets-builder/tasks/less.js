/**
 * @file Less + Autoprefixer
 */
'use strict'

const gulp = require('gulp')
const path = require('path')
const less = require('gulp-less')
const tools = require('../tasktools.js')
const autoprefixer = require('gulp-autoprefixer');

/**
 * Build one or more Less stylesheets
 * @param {Object} conf
 * @property {Array|string} conf.src - glob patterns of Less files to build
 * @property {string} conf.dest - output folder or file name
 * @property {string} conf.browsers - Autoprefixer browser compat
 * @property {Array}  conf.includePaths - Folders to look for '@import's in
 * @returns {*}
 */
module.exports = function lessBuilder(conf) {
  const prefixOptions = {}
  if (conf.browsers) prefixOptions.browsers = conf.browsers
  const lessOptions = {}
  if (conf.includePaths) lessOptions.paths = conf.includePaths

  const dest = path.parse(conf.dest)
  const doConcat = dest.ext === '.css'
  const file = doConcat ? dest.base : 'all.css'
  const dir = doConcat ? dest.dir : conf.dest

  return gulp.src( conf.src )
    .pipe( tools.errors() )
    .pipe( tools.sourcemap.init() )
    .pipe( less(lessOptions) )
    .pipe( autoprefixer(prefixOptions) )
    .pipe( tools.if(doConcat, tools.concat(file)) )
    .pipe( tools.size(dir) )
    .pipe( tools.sourcemap.write('.') )
    .pipe( gulp.dest(dir) )
}

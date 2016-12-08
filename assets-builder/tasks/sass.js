/**
 * @file Sass + Autoprefixer
 */
'use strict'

const gulp = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const tools = require('../tasktools.js')
const autoprefixer = require('gulp-autoprefixer');

/**
 * Build one or more Sass stylesheets
 * @param {Object} conf
 * @property {Array|string} conf.src - glob patterns of Sass files to build
 * @property {string} conf.dest - output folder or file name
 * @property {string} conf.browsers - Autoprefixer browser compat
 * @property {string} conf.outputStyle - Sass output style
 * @property {Array}  conf.includePaths - Folders to look for '@import's in
 * @returns {*}
 */
module.exports = function sassBuilder(conf) {
  const prefixOptions = {}
  if (conf.browsers) prefixOptions.browsers = conf.browsers
  const sassOptions = {
    outputStyle: conf.outputStyle || 'compressed',
    includePaths: conf.includePaths || []
  }

  const dest = path.parse(conf.dest)
  const doConcat = dest.ext === '.css'
  const file = doConcat ? dest.base : 'all.css'
  const dir = doConcat ? dest.dir : conf.dest

  return gulp.src( conf.src )
    .pipe( tools.errors() )
    .pipe( tools.sourcemap.init() )
    .pipe( sass(sassOptions) )
    .pipe( autoprefixer(prefixOptions) )
    .pipe( tools.if(doConcat, tools.concat(file)) )
    .pipe( tools.size(dir) )
    .pipe( tools.sourcemap.write('.') )
    .pipe( gulp.dest(dir) )
}

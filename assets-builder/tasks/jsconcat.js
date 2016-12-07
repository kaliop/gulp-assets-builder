/**
 * @file Concat and minify JS code
 */
'use strict'

const gulp = require('gulp')
const path = require('path')
const tools = require('../tasktools.js')
const uglify = require('gulp-uglify')

/**
 * Make a JS build, optionally minified
 * @param {object} conf
 * @property {Array|string} conf.src - glob patterns of files to concatenate
 * @property {string} conf.dest - output file name
 * @returns {*}
 */
module.exports = function jsconcatBuilder(conf) {
  // Opt-out of minification with any falsy value
  const doMinify = 'minify' in conf ? Boolean(conf.minify) : true
  const dest = path.parse(conf.dest)

  return gulp.src(conf.src)
    .pipe( tools.errors() )
    .pipe( tools.sourcemap.init() )
    .pipe( tools.concat(dest.base) )
    .pipe( tools.if(doMinify, uglify()) )
    .pipe( tools.size(dest.dir) )
    .pipe( tools.sourcemap.write('.') )
    .pipe( gulp.dest(dest.dir) )
}

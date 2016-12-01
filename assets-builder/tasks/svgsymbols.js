/**
 * @file SVG symbol sprites, with svgo and demo pages
 */
'use strict'

// Core & utils
var gulp = require('gulp')
var path = require('path')
var __ = require('./../taskutils.js')

// Task-specific dependencies
var deps = __.load('svgsymbols', require('./svgsymbols.json').dependencies)
var svgmin = deps['gulp-svgmin']
var symbols = deps['gulp-svg-symbols']

/**
 * Build and write a SVG symbol sprite
 * @param {object} conf
 * @property {Array|string} conf.src - glob patterns of SVG images
 * @property {string} conf.dest - output file name
 * @property {string} conf.demo - should we generate a HTML demo page?
 * @property {boolean} conf.inline - for inlining in HTML documents
 * @property {string} conf.symbolId - pattern for <symbol> id attributes
 * @property {string} conf.symbolClass - pattern for <svg> class attributes
 * @returns {*}
 */
module.exports = function svgsymbols(conf) {
  // Prepare options
  var dest = path.parse(conf.dest)
  var symbolId = conf.symbolId || 'icon-%f'
  var symbolClass = conf.symbolClass || 'icon icon--%f'
  var templates = [
    __dirname + '/svgsymbols-sprite.svg',
    __dirname + '/svgsymbols-demo.html'
  ]

  // Rename input and output
  var renameIn = __.rename(function(n) {
    n.basename = n.basename.toLowerCase().replace(/[^a-z0-9]/g,'')
  })
  var renameOut = __.rename({
    basename: dest.name
  })

  // gulp-svgmin options
  var minify = svgmin(function(file) {
    var name = path.basename(file.relative, path.extname(file.relative))
    var ids = { cleanupIDs: { minify: true, prefix: 'def-' + name + '-' } }
    return { plugins: [ ids ] }
  })

  // gulp-svg-symbols options
  var doSprite = symbols({
    className: symbolClass,
    id: symbolId + (/%f/.test(symbolId) ?  '' : '%f'),
    svgClassname: conf.inline ? 'inline-sprite' : false,
    templates: templates.slice(0, conf.demo ? 2 : 1)
  })

  // Build sprite (+demo page)
  return gulp.src( conf.src )
    .pipe( __.logerrors() )
    .pipe( renameIn )
    .pipe( minify )
    .pipe( doSprite )
    .pipe( renameOut )
    .pipe( __.size(dest.dir) )
    .pipe( gulp.dest(dest.dir) )
}

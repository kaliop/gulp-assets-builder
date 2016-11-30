/**
 * @file SVG symbol sprites
 * With svgo and demo pages
 */
'use strict'

// Core tools
var gulp     = require('gulp')
var path     = require('path')
var plumbing = require('../helpers/plumbing.js')
var rename   = require('gulp-rename')
var size     = require('../helpers/size.js')

// Specific
var svgmin   = require('gulp-svgmin')
var symbols  = require('gulp-svg-symbols')

/**
 * Build and write a SVG symbol sprite
 * @param {object} config
 * @property {Array|string} config.src - glob patterns of SVG images
 * @property {string} config.dest - output file name
 * @property {string} config.demo - should we generate a HTML demo page?
 * @property {boolean} config.inline - for inlining in HTML documents
 * @returns {*}
 */
module.exports = function buildSvgSprite(config) {
  // Prepare options
  var dest = path.parse(config.dest)
  var symbolId = config.symbolId || 'icon-%f'
  var symbolClass = config.symbolClass || 'icon icon--%f'
  var templates = [
    __dirname + '/svgsymbols-sprite.svg',
    __dirname + '/svgsymbols-demo.html'
  ]

  // Rename input and output
  var renameIn = rename(function(n) {
    n.basename = n.basename.toLowerCase().replace(/[^a-z0-9]/g,'')
  })
  var renameOut = rename({
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
    svgClassname: config.inline ? 'inline-sprite' : false,
    templates: templates.slice(0, config.demo ? 2 : 1)
  })

  // Build sprite (+demo page)
  return gulp.src( config.src )
    .pipe( plumbing() )
    .pipe( renameIn )
    .pipe( minify )
    .pipe( doSprite )
    .pipe( renameOut )
    .pipe( size(dest.dir) )
    .pipe( gulp.dest(dest.dir) )
}

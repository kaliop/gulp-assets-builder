/**
 * @file SVG symbol sprites
 * With svgo and demo pages
 */
'use strict'

// Core tools
var gulp       = require('gulp')
var path       = require('path')
var plumber    = require('gulp-plumber')
var rename     = require('gulp-rename')
var svgmin     = require('gulp-svgmin')
var svgSymbols = require('gulp-svg-symbols')

// Helpers
var notify     = require('../helpers/notify.js')
var showSize   = require('../helpers/size.js')

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
  var prepareSlugs = rename(function(n) {
    n.basename = n.basename.toLowerCase().replace(/[^a-z0-9]/g,'')
  })

  // gulp-svgmin options
  var svgminOptions = function(file) {
    var name = path.basename(file.relative, path.extname(file.relative))
    var ids = { cleanupIDs: { minify: true, prefix: 'def-' + name + '-' } }
    return { plugins: [ ids ] }
  }

  // gulp-svg-symbols options
  // Append the filename placeholder to user config, if missing
  var symbolId = config.symbolId || 'icon-%f'
  var symbolClass = config.symbolClass || 'icon icon-%f'
  var templates = [
    __dirname + '/svgsymbols-sprite.svg',
    __dirname + '/svgsymbols-demo.html'
  ]
  var symbolOptions = {
    className: symbolClass,
    id: symbolId + (/%f/.test(symbolId) ?  '' : '%f'),
    svgClassname: config.inline ? 'inline-sprite' : false,
    templates: templates.slice(0, config.demo ? 2 : 1)
  }

  // Build sprite (+demo page)
  return gulp.src( config.src )
    .pipe( plumber(notify) )
    .pipe( prepareSlugs )
    .pipe( svgmin(svgminOptions) )
    .pipe( svgSymbols(symbolOptions) )
    .pipe( rename({basename:dest.name}) )
    .pipe( showSize(dest.dir) )
    .pipe( gulp.dest(dest.dir) )
}

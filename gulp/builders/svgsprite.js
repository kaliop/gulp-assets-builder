'use strict'
// ---------------------------
// Builder: SVG symbol sprites
// ---------------------------

// Core tools
var gulp       = require('gulp')
var path       = require('path')
var plumber    = require('gulp-plumber')
var svgSprite  = require('gulp-svg-sprite')

// Helpers
var notify     = require('../helpers/notify.js')
var showSize   = require('../helpers/size.js')

/**
 * Build and write a SVG symbol sprite
 * @param {object} config
 * @property {Array|string} config.src - glob patterns of SVG images
 * @property {string} config.dest - output file name
 * @property {string} config.prefix - prefix for symbol id attributes
 * @property {boolean} config.inline - for inlining in HTML documents
 * @returns {*}
 */
module.exports = function buildSvgSprite(config) {
  // Prepare options
  var destInfo = path.parse(config.dest)
  var opts = {
    mode: { symbol: { dest: '.', sprite: destInfo.base } },
    shape: { id: {separator: '-'}, transform: ['svgo'] }
  }
  if (config.inline) {
    opts.mode.symbol.inline = true
  }
  if (config.prefix) {
    opts.shape.id.generator = config.prefix + '%s'
  }
  // Build sprite
  return gulp.src( config.src )
    .pipe( plumber(notify) )
    .pipe( svgSprite(opts) )
    .pipe( showSize(destInfo.dir) )
    .pipe( gulp.dest(destInfo.dir) )
}

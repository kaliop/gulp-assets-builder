/**
 * @file SVG symbol sprites, with svgo and demo pages
 */
'use strict'

const gulp = require('gulp')
const path = require('path')
const tools = require('../tasktools.js')
const svgmin = require('gulp-svgmin')
const symbols = require('gulp-svg-symbols')

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
module.exports = function svgsymbolsBuilder(conf) {
  const dest = path.parse(conf.dest)

  // gulp-svg-symbols options
  let symbolId = typeof conf.symbolId === 'string' ? conf.symbolId : 'icon-%f'
  if (!/%f/.test(symbolId)) symbolId += '%f'
  const templates = [
    __dirname + '/svgsymbols-sprite.svg',
    __dirname + '/svgsymbols-demo.html'
  ]
  const doSprite = symbols({
    id: symbolId,
    className: conf.symbolClass || 'icon icon--%f',
    svgClassname: conf.inline ? 'inline-sprite' : false,
    templates: conf.demo ? templates : [templates[0]]
  })

  // Rename input and output
  const renameIn = tools.rename(n => {
    n.basename = n.basename.toLowerCase().replace(/[^a-z0-9]/g,'')
  })
  const renameOut = tools.rename({
    basename: dest.name
  })

  // gulp-svgmin options
  const minify = svgmin(file => {
    const name = path.basename(file.relative, path.extname(file.relative))
    const ids = { cleanupIDs: { minify: true, prefix: 'def-' + name + '-' } }
    return { plugins: [ ids ] }
  })

  // Build sprite (+demo page)
  return gulp.src( conf.src )
    .pipe( tools.errors() )
    .pipe( renameIn )
    .pipe( minify )
    .pipe( doSprite )
    .pipe( renameOut )
    .pipe( tools.size(dest.dir) )
    .pipe( gulp.dest(dest.dir) )
}

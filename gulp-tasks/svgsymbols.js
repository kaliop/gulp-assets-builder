'use strict'
const path = require('path')
const svgmin = require('gulp-svgmin')
const symbols = require('gulp-svg-symbols')

/**
 * Build and write a SVG symbol sprite
 * @param {object}   config
 * @param {Array}    config.src - glob patterns of SVG images
 * @param {string}   config.dest - output file name
 * @param {string}   config.demo - should we generate a HTML demo page?
 * @param {boolean}  config.inline - for inlining in HTML documents
 * @param {string}   config.id - pattern for <symbol> id attributes
 * (defaults to 'icon-%f', where '%f' is a slugified version of the source filename)
 * @param {function} config.slug - function that simplifies the
 * @param {string}   config.svgClassname - pattern for <svg> class attributes
 * @param {object}   tools
 * @returns {*}
 */
module.exports = function svgsymbolsBuilder(config, tools) {
  config = Object.assign({
    minify: true,
    demo: false,
    id: 'icon-%f',
    slug: file => file.toLowerCase().replace(/[^a-z0-9]/g,''),
    svgClassname: false
  }, config, { sourcemaps: false })

  // rename files internally so we can use the simplified names in ids
  // (both in svgmin and gulp-svg-symbols)
  const slugs = []
  const renameInputTransform = tools.rename(f => {
    let s = config.slug(f.basename)
    while (slugs.indexOf(s) !== -1) { s += '_' }
    slugs.push(s)
    f.basename = s
    // we have to keep the extension or gulp-svg-symbols crashes
    //f.extname = ''
  })

  // gulp-svgmin options
  const minifyTransform = svgmin(file => {
    const prefix = 'def-' + path.parse(file.relative).name + '-'
    return {plugins: [
      {cleanupIDs: {minify: true, prefix: prefix}}
    ]}
  })

  // final gulp-svg-symbols config
  const templates = [
    __dirname + '/svgsymbols-sprite.svg',
    __dirname + '/svgsymbols-demo.html'
  ]
  const spriteTransform = symbols({
    id: config.id,
    slug: f => f, // do nothing, we will rename files before
    svgClassname: config.svgClassname,
    templates: config.demo ? templates : templates.slice(0,1)
  })

  // Names of the sprite and demo page come from the template names,
  // so let's rename them to the filename in config.dest
  const dest = path.parse(config.dest)
  const renameOutputTransform = tools.rename(f => {
    f.basename = dest.name
    f.extname = dest.ext + (f.extname === '.html' ? '.html' : '')
  })

  // Build sprite (+demo page)
  return tools.commonBuilder(config, [
    renameInputTransform,
    config.minify && minifyTransform,
    spriteTransform,
    renameOutputTransform
  ])
}

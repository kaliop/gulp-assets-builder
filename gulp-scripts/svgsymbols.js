const path = require("path");
const svgmin = require("gulp-svgmin");
const symbols = require("gulp-svg-symbols");

/**
 * Build and write a SVG symbol sprite
 * @param {object}   userConfig
 * @param {Array}    userConfig.src - glob patterns of SVG images
 * @param {string}   userConfig.dest - output file name
 * @param {string}   userConfig.demo - should we generate a HTML demo page?
 * @param {boolean}  userConfig.inline - for inlining in HTML documents
 * @param {string}   userConfig.id - pattern for <symbol> id attributes
 * (defaults to 'icon-%f', where '%f' is a slugified version of the source filename)
 * @param {function} userConfig.slug - function that simplifies the
 * @param {string}   userConfig.svgClassname - pattern for <svg> class attributes
 * @param {object}   gtmTools
 * @returns {*}
 */
module.exports = function svgsymbolsBuilder(userConfig, gtmTools) {
  const config = Object.assign(
    {
      minify: true,
      demo: false,
      id: "icon-%f",
      slug: file => file.toLowerCase().replace(/[^a-z0-9]/g, ""),
      svgClassname: false
    },
    userConfig,
    { sourcemaps: false }
  );

  // rename files internally so we can use the simplified names in ids
  // (both in svgmin and gulp-svg-symbols)
  const slugs = [];
  const renameInputTransform = gtmTools.rename(f => {
    let s = config.slug(f.basename);
    while (slugs.indexOf(s) !== -1) {
      s += "_";
    }
    slugs.push(s);
    f.basename = s;
    // we have to keep the extension or gulp-svg-symbols crashes
    //f.extname = ''
  });

  // gulp-svgmin options
  const minifyTransform = svgmin(file => {
    const prefix = "def-" + path.parse(file.relative).name + "-";
    return {
      plugins: [{ cleanupIDs: { minify: true, prefix: prefix } }]
    };
  });

  // final gulp-svg-symbols config
  const templates = [
    __dirname + "/svgsymbols-sprite.svg",
    __dirname + "/svgsymbols-demo.html"
  ];
  const spriteTransform = symbols({
    id: config.id,
    slug: f => f, // do nothing, we will rename files before
    svgClassname: config.svgClassname,
    templates: config.demo ? templates : templates.slice(0, 1)
  });

  // Names of the sprite and demo page come from the template names,
  // so let's rename them to the filename in config.dest
  const dest = path.parse(config.dest);
  const renameOutputTransform = gtmTools.rename(f => {
    f.basename = dest.name;
    f.extname = dest.ext + (f.extname === ".html" ? ".html" : "");
  });

  // Build sprite (+demo page)
  return gtmTools.commonBuilder(config, [
    renameInputTransform,
    config.minify && minifyTransform,
    spriteTransform,
    renameOutputTransform
  ]);
};

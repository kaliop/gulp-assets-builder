const path = require("path");
const svgmin = require("gulp-svgmin");
const symbols = require("gulp-svg-symbols");

/**
 * Build and write a SVG symbol sprite
 * @param {object}   userConfig
 * @param {Array}    userConfig.src - glob patterns of SVG images
 * @param {string}   userConfig.dest - output file name
 * @param {boolean}  userConfig.demo - should we generate a HTML demo page?
 * @param {string}   userConfig.id - pattern for <symbol> ids, defaults to 'icon-%f'
 * @param {function} userConfig.slug - transforms the file's basename, defaults to keeping [a-z0-9] characters
 * @param {string}   userConfig.svgAttrs - XML attributes for the sprite's root <svg> element
 * @param {object}   tools
 * @returns {object} stream
 */
module.exports = function svgsymbolsBuilder(userConfig, tools) {
  const config = Object.assign(
    {
      demo: false,
      id: "icon-%f",
      slug: file => file.toLowerCase().replace(/[^a-z0-9]/g, ""),
      svgAttrs: {}
    },
    userConfig,
    { sourcemaps: false }
  );

  // rename files internally so we can use the simplified names in ids
  // (both in svgmin and gulp-svg-symbols)
  const slugs = [];
  const renameInputTransform = tools.rename(file => {
    const base = config.slug(file.basename);
    let slug = base;
    let count = 0;
    while (slugs.indexOf(slug) !== -1) {
      count += 1;
      slug = base + count;
    }
    slugs.push(slug);
    file.basename = slug;
    // we have to keep the extension or gulp-svg-symbols crashes
    //f.extname = ''
  });

  // Names of the sprite and demo page come from the template names,
  // so let's rename them to the filename in config.dest
  const dest = path.parse(config.dest);
  const renameOutputTransform = tools.rename(f => {
    f.basename = dest.name;
    f.extname = dest.ext + (f.extname === ".html" ? ".html" : "");
  });

  // Prepare gulp-svg-symbols config
  const symbolsConfig = {
    id: config.id,
    // do nothing, since we will rename files beforehand
    slug: f => f,
    svgAttrs: config.svgAttrs,
    templates: ["default-svg"]
  };
  if (config.demo) {
    symbolsConfig.templates.push("default-demo");
  }

  // Build sprite (+demo page)
  return tools.commonBuilder(config, [
    renameInputTransform,
    config.minify && svgmin(svgminConfig),
    symbols(symbolsConfig),
    renameOutputTransform
  ]);
};

function svgminConfig(file) {
  return {
    plugins: [
      {
        cleanupIDs: {
          minify: true,
          prefix: `def-${path.parse(file.relative).name}-`
        }
      }
    ]
  };
}

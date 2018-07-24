const path = require("path");
const rename = require("gulp-rename");
const svgo = require("gulp-svgo");
const symbols = require("gulp-svg-symbols");

/**
 * Build and write a SVG symbol sprite
 * @param {object} config
 * @param {object} tools
 * @returns {object}
 */
function svgsymbols(config, tools) {
  // force disable sourcemaps
  config.sourcemaps = false

  // rename files internally so we can use the simplified names in ids
  // (both in svgmin and gulp-svg-symbols)
  const slugs = [];
  const renameInputTransform = rename(file => {
    const base = config.toSlug(file.basename);
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
  // so let's rename them to the filename in config.sprite
  const spritePath = path.parse(
    typeof config.sprite === 'string' ? config.sprite : 'sprite.svg'
  )
  const renameOutputTransform = rename(f => {
    f.basename = spritePath.name;
    f.extname = spritePath.ext + (f.extname === ".html" ? ".html" : "");
  });
  const svgoConfig = {
    plugins: [
      {
        cleanupIDs: {
          minify: true,
          prefix: `def-${spritePath.name}-`
        }
      }
    ]
  }

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
  return tools.simpleStream(config, [
    renameInputTransform,
    //config.minify && svgmin(svgminConfig),
    config.minify && svgo(svgoConfig),
    symbols(symbolsConfig),
    renameOutputTransform
  ]);
}

svgsymbols.baseConfig = {
  demo: false,
  id: "icon-%f",
  minify: true,
  toSlug: file => file.toLowerCase().replace(/[^a-z0-9]/g, ""),
  svgAttrs: {}
}

module.exports = svgsymbols

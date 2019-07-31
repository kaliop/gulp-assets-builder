const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const gulpSass = require("gulp-sass");

// Use the dart-sass compiler rather than node-sass
gulpSass.compiler = require("sass");

/**
 * Make a CSS build from CSS and/or Sass sources,
 * optionally concatenated and minified
 * @param {object} config - task configuration
 * @param {object} tools - gtm utility functions
 * @return {object}
 */
function sass(config, tools) {
  return tools.simpleStream(config, [
    gulpSass(config.sass),
    config.autoprefixer && autoprefixer(config.autoprefixer),
    config.concat && concat(config.concat),
    config.minify && csso(config.csso)
  ]);
}

sass.baseConfig = {
  minify: true,
  sourcemaps: ".",
  sass: {
    outputStyle: "expanded",
    includePaths: ["."]
  },
  autoprefixer: {
    flexbox: "no-2009",
    grid: false
  },
  csso: {
    restructure: false
  }
};

module.exports = sass;

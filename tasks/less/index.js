const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const gulpLess = require("gulp-less");

/**
 * Make a CSS build from CSS and/or Less sources, 
 * optionally concatenated and minified
 * @param {object} config
 * @param {object} tools
 * @returns {object}
 */
function less(config, tools) {
  return tools.simpleStream(config, [
    gulpLess(config.less),
    config.autoprefixer && autoprefixer(config.autoprefixer),
    config.concat && concat(config.concat),
    config.minify && csso(config.csso)
  ]);
}

less.baseConfig = {
  minify: true,
  sourcemaps: ".",
  less: {
    paths: ["."]
  },
  autoprefixer: {
    flexbox: "no-2009",
    grid: false
  },
  csso: {
    restructure: false
  }
};

module.exports = less;

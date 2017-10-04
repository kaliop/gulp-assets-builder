const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const less = require("gulp-less");
const path = require("path");

/**
 * Make a CSS build from CSS and/or Less sources, optionally concatenated and minified
 * @param {object} userConfig
 * @param {object} gtmTools
 * @returns {*}
 */
module.exports = function lessBuilder(userConfig, gtmTools) {
  const config = Object.assign(
    {
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
    },
    userConfig
  );
  const transforms = [less(config.less)];
  if (config.autoprefixer) {
    transforms.push(autoprefixer(config.autoprefixer));
  }
  if (path.extname(config.dest) === ".css") {
    transforms.push(gtmTools.concat(path.basename(config.dest)));
  }
  if (config.minify) {
    transforms.push(csso(config.csso));
  }
  return gtmTools.commonBuilder(config, transforms);
};

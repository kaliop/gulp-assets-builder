const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const path = require("path");

/**
 * Make a CSS build, optionally concatenated and minified
 * @param {object} userConfig
 * @param {object} gtmTools
 * @returns {*}
 */
module.exports = function mincssBuilder(userConfig, gtmTools) {
  const config = Object.assign(
    {
      minify: true,
      sourcemaps: ".",
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
  const transforms = [];
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

const path = require("path");
const uglify = require("gulp-uglify");

/**
 * Make a simple JS build, optionally minified
 * @param {object} userConfig
 * @param {object} gtmTools
 * @returns {*}
 */
module.exports = function minjsBuilder(userConfig, gtmTools) {
  const config = Object.assign(
    {
      minify: true,
      sourcemaps: ".",
      uglifyjs: {
        output: { inline_script: true },
        compress: { drop_debugger: false },
        preserveComments: "license"
      }
    },
    userConfig
  );
  const transforms = [];
  if (path.extname(config.dest) === ".js") {
    transforms.push(gtmTools.concat(path.basename(config.dest)));
  }
  if (config.minify) {
    transforms.push(uglify(config.uglifyjs));
  }
  return gtmTools.commonBuilder(config, transforms);
};

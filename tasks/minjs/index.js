const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

/**
 * Make a simple JS build, optionally concatenated and minified
 * @param {object} config - task configuration
 * @param {object} tools - gtm utility functions
 * @return {object}
 */
function minjs(config, tools) {
  return tools.simpleStream(config, [
    config.concat && concat(config.concat),
    config.minify && uglify(config.uglifyjs)
  ]);
}

minjs.baseConfig = {
  minify: true,
  sourcemaps: ".",
  uglifyjs: {
    compress: { drop_debugger: false },
    output: { inline_script: true }
  }
};

module.exports = minjs;

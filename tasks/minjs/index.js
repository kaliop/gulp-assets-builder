const concat = require("gulp-concat");
const terser = require("gulp-terser");

/**
 * Make a simple JS build, optionally concatenated and minified
 * @param {object} config - task configuration
 * @param {object} tools - gtm utility functions
 * @return {object}
 */
function minjs(config, tools) {
  return tools.simpleStream(config, [
    config.concat && concat(config.concat),
    config.minify && terser(config.terser)
  ]);
}

minjs.baseConfig = {
  minify: true,
  sourcemaps: ".",
  terser: {}
};

module.exports = minjs;

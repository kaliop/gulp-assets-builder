/**
 * Configuration for assets-builder, based on gulp-task-maker
 * Guide: https://github.com/fvsch/gulp-task-maker/blob/master/doc/configuring-tasks.md
 */

const gtm = require("gulp-task-maker");

gtm.load("gulp-scripts", {
  sass: {
    src: ["test/src/css/*.css", "test/src/sass/test.scss"],
    watch: "test/src/**/*.{css,scss}",
    dest: "test/dist/sass.css"
  },

  minjs: {
    src: ["node_modules/jquery/dist/jquery.min.js", "test/src/js/*.js"],
    dest: "test/dist/minjs.js",
    watch: "test/src/js/*.js"
  },

  svgsymbols: {
    src: "test/src/svg/*.svg",
    dest: "test/dist/svgsymbols.svg",
    id: "icon-%f", // id pattern for symbols, where "%f" is the cleaned up file name
    svgClassname: "inline-sprite", // add class to the root <svg> element
    demo: true
  }
});

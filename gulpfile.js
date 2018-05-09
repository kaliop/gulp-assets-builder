/**
 * Configuration for assets-builder, based on gulp-task-maker
 * Guide: https://github.com/fvsch/gulp-task-maker/blob/master/doc/configuring-tasks.md
 */

const gtm = require("gulp-task-maker");

gtm.conf({
  notify: process.env.GTM_NOTIFY || false,
  strict: process.env.GTM_STRICT || false
});

gtm.load("gulp-tasks", {
  sass: {
    src: "src/scss/main.scss",
    watch: "src/scss/**/*.scss",
    dest: "dist/main.css"
  },

  minjs: {
    src: [
      // install dependencies with npm and import from node_modules
      // "node_modules/some-lib/dist/some-lib.js",
      "src/js/*.js"
    ],
    watch: "src/js/*.js",
    dest: "dist/main.js",
  },

  svgsymbols: {
    src: "src/svg/*.svg",
    watch: true,
    dest: "dist/icons.svg",
    demo: true, // create a HTML list of icons
    id: "icon-%f", // id pattern for symbols ("%f" is the cleaned up file name)
    svgAttrs: {}, // add XML attributes to the root <svg> element
  }
});

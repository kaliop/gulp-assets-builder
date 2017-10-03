/**
 * @file Test all included gulp-tasks
 */

const gtm = require("gulp-task-maker");

gtm.load("gulp-tasks", {
  less: {
    src: ["test/src/css/*.css", "test/src/less/test.less"],
    watch: "test/src/**/*.{css,less}",
    dest: "test/dist/less.css"
  },
  sass: {
    src: ["test/src/css/*.css", "test/src/sass/test.scss"],
    watch: "test/src/**/*.{css,scss}",
    dest: "test/dist/sass.css"
  },
  mincss: {
    src: ["node_modules/normalize.css/normalize.css", "test/src/css/*.css"],
    watch: true,
    dest: "test/dist/mincss.css"
  },
  minjs: {
    src: ["node_modules/jquery/dist/jquery.min.js", "test/src/js/sticks.js"],
    dest: "test/dist/minjs.js",
    watch: "test/src/js/*.js"
  },
  svgsymbols: {
    src: "test/src/svg/*.svg",
    dest: "test/dist/svgsymbols.svg",
    id: "icon-%f", // id pattern for symbols, where '%f' is the cleaned up file name
    svgClassname: "inline-sprite", // add class to the root <svg> element
    demo: true
  }
});

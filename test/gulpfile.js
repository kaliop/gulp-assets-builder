/**
 * @file Test all included gulp-tasks
 */

const gtm = require("gulp-task-maker");

gtm.load("gulp-tasks", {
  less: {
    src: ["src/css/*.css", "src/less/test.less"],
    watch: "src/**/*.{css,less}",
    dest: "dist/less.css"
  },
  sass: {
    src: ["src/css/*.css", "src/sass/test.scss"],
    watch: "src/**/*.{css,scss}",
    dest: "dist/sass.css"
  },
  mincss: {
    src: ["node_modules/normalize.css/normalize.css", "src/css/*.css"],
    watch: true,
    dest: "dist/mincss.css"
  },
  minjs: {
    src: ["node_modules/jquery/dist/jquery.min.js", "src/js/sticks.js"],
    dest: "dist/minjs.js",
    watch: "src/js/*.js"
  },
  svgsymbols: {
    src: "src/svg/*.svg",
    dest: "dist/svgsymbols.svg",
    id: "icon-%f", // id pattern for symbols, where "%f" is the cleaned up file name
    svgClassname: "inline-sprite", // add class to the root <svg> element
    demo: true
  }
});

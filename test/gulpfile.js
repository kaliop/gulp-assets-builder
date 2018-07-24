/**
 * @file Test all included gulp-tasks
 */

const gtm = require("gulp-task-maker");

gtm.add("./tasks/less", {
  src: ["./src/css/*.css", "./src/less/test.less"],
  watch: "./src/**/*.{css,less}",
  dest: "./dist",
  concat: "less-out.css"
})

gtm.add("./tasks/mincss", {
  src: ["./node_modules/normalize.css/normalize.css", "./src/css/*.css"],
  watch: true,
  dest: "./dist",
  concat: "mincss-out.css"
})

gtm.add("./tasks/minjs", {
  src: ["./node_modules/jquery/dist/jquery.min.js", "./src/js/sticks.js"],
  watch: "./src/js/*.js",
  dest: "./dist",
  concat: "minjs-out.js"
})

gtm.add("./tasks/sass", {
  src: ["./src/css/*.css", "./src/sass/test.scss"],
  watch: "./src/**/*.{css,scss}",
  dest: "./dist",
  concat: "sass-out.css"
})

gtm.add("./tasks/svgsymbols", {
  src: "./src/svg/*.svg",
  dest: "./dist",
  sprite: "svgsymbols-out.svg",
  demo: true,
  id: "icon-%f",
  svgAttrs: {}
})

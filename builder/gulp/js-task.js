const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const replace = require("gulp-replace");

const { watchPaths, destFiles } = require("../configs/paths");
const { isProduction } = require("../utils/helpers");

// JS task
function jsTask() {
  const production = isProduction();
  return (
    src([watchPaths.js])
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
      .pipe(
        gulpif(
          production,
          babel({
            presets: ["@babel/preset-env"],
          })
        )
      )
      .pipe(concat("main.js"))
      .pipe(gulpif(production, rename({ extname: ".min.js" })))
      .pipe(gulpif(production, uglify()))
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(dest(destFiles.js))
  );
}

module.exports.jsTask = jsTask;
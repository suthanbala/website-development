const { src, dest } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const { srcFiles, destFiles } = require("../configs/paths");
const { isProduction } = require("../utils/helpers");

// Sass task
function sassTask(server) {
  const production = isProduction();
  return (
    src(srcFiles.sass)
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
      .pipe(sass({
        includePaths: ['../../node_modules']
      }))
      // .pipe(gulpif(production, rename({ extname: ".min.css" })))
      .pipe(gulpif(production, postcss([ autoprefixer()])))
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(dest(destFiles.sass))
      .pipe(server.stream())
  );
}

module.exports.sassTask = sassTask;
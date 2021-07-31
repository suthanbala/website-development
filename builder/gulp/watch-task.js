const { watch, series, parallel } = require("gulp");
const browsersync = require('browser-sync');
const jsTask = require('./js-task');
const sassTask = require('./sass-task');
const { reload, serve } = require('./browser-sync');
const { watchPaths } = require("../configs/paths");

const server = browsersync.create();

// Sass task
function watchFiles() {
    console.log('watching', watchPaths.sass, watchPaths.js);
    watch(
        watchPaths.sass,
        series([done => sassTask.sassTask(server, done)])
    );

    // On js changes, reload the page
    watch(
        [watchPaths.js],
        series([jsTask.jsTask, done => { reload(server, done) }])
    );

    watch(
        [watchPaths.html],
        series([done => { reload(server, done) }])
    );
}

const watchTask = parallel(watchFiles, done => serve(server, done));
module.exports.watch = watchTask;
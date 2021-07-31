const path = require('path');

const rootPath = '../../';

const resolvePath = folder => (`${rootPath}${folder}`);

const sassSrc = [resolvePath('src/sass/styles.scss')];
const jsSrc = [resolvePath('src/js/main.js')];

const sassWatch = resolvePath('src/sass/**/*.scss');
const jsWatch = resolvePath('src/js/**/*.js');
const htmlWatch = resolvePath('**/*.html');

const sassDest = resolvePath('dist/css');
const jsDest = resolvePath('dist/js');

const srcFiles = {
    sass: sassSrc,
    js: jsSrc
};

const destFiles = {
    sass: sassDest,
    js: jsDest
};

const watchPaths = {
    sass: sassWatch,
    js: jsWatch,
    html: htmlWatch
}

module.exports = {
    srcFiles,
    destFiles,
    watchPaths,
    root: resolvePath(rootPath)
}
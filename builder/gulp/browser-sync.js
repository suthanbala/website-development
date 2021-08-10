const path = require("path");
const fs = require('fs');

function reload(server, done) {
  server.reload();
  done();
}

const rootPath = path.resolve("../../");

function serve(server, done) {
  server.init({
    server: {
      baseDir: rootPath
    },
    rewriteRules: [
      {
          match: /@include\("(.+?)"\)/g,
          fn: function (req, res, match) {
            const pattern = /@include\("(.+?)"\)/gm;
            let filename;
            while ((m = pattern.exec(match)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === pattern.lastIndex) {
                    pattern.lastIndex++;
                }
                filename = path.resolve(rootPath, m[1]);
              }
              if (fs.existsSync(filename)) {
                  return fs.readFileSync(filename);
              } else {
                  return '<span style="color: red">'+filename+' could not be found</span>';
              }
          }
      }
  ]
  });
  done();
}

module.exports = {
  reload,
  serve,
};

const path = require("path");

function reload(server, done) {
  server.reload();
  done();
}

function serve(server, done) {
  server.init({
    server: {
      baseDir: path.resolve("../../")
    },
  });
  done();
}

module.exports = {
  reload,
  serve,
};

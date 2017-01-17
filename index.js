const through = require('through2')
const gulpOcticons = require('./lib/gulp-octicons')

module.exports = function() {
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }
    if (file.isBuffer()) {
      const contents = String(file.contents)
      const replaced  = gulpOcticons.replace(contents)
      file.contents = new Buffer(replaced)
    }
    if (file.isStream()) {
      //TODO
    }

    callback(null, file)
  })
}

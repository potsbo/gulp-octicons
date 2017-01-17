const through = require('through2')
const gulpOcticons = require('./lib/gulp-octicons')

module.exports = function() {
  return through.obj(function(file, enc, callback) {
    file.contents = gulpOcticons.replace(file.contents)
    return callback(null, file);
  })
}

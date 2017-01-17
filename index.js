const through = require('through2')
const gutil = require('gulp-util')
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
      this.emit('error', new gutil.PluginError('gulp-octicons', 'Streaming not supported'))
      return callback()
    }

    callback(null, file)
  })
}

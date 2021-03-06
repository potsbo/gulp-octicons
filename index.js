const through = require('through2')
const PluginError = require('plugin-error')
const octiconsReplace = require('./lib/octicons-replace')

module.exports = function() {
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }
    if (file.isBuffer()) {
      const contents = String(file.contents)
      const replaced = octiconsReplace.replace(contents)
      file.contents = new Buffer(replaced)
    }
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-octicons', 'Streaming not supported'))
      return callback()
    }

    callback(null, file)
  })
}

octicons = require('octicons')
const regex = /(\s*)(<!--\s*octicons:(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endocticons\s*-->)/

const getIcon = function(iconName) {
  return octicons[iconName].toSVG()
}

module.exports = {
  replace: function(str) {
    const iconReplace = function(match, indent, openComment, iconName, _, closeComment) {
      const open = `${indent}${openComment}`
      const body = `${indent}${getIcon(iconName)}`
      const close = `${indent}${closeComment}`
      return [open, body, close].join("\n")
    }

    return str.replace(regex, iconReplace)
  }
}

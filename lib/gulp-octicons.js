octicons = require('octicons')
const regex = /(\s*)(<!--\s*octicons:(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endocticons\s*-->)/

const getIcon = function(iconName) {
  const icon = octicons[iconName]
  return icon ? icon.toSVG() : null
}

module.exports = {
  replace: function(str) {
    const iconReplace = function(match, indent, openComment, iconName, _, closeComment) {
      const open = `${indent}${openComment}`
      const close = `${indent}${closeComment}`

      const icon = getIcon(iconName)
      const body = icon ? `${indent}${icon}` : ''

      const lines = [open, body, close]
      const compact = lines.filter(function(e) { return e != '' })
      return compact.join("\n")
    }

    return str.replace(regex, iconReplace)
  }
}

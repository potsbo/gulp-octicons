octicons = require('octicons')
const regex = /([ \t]*)(<!--\s*octicons:(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endocticons\s*-->)/gi

const getIcon = function(iconName) {
  const icon = octicons[iconName]
  return icon ? icon.toSVG() : null
}

module.exports = {
  replace: function(str) {
    const iconReplace = function(match, indent, openComment, iconName, _, closeComment) {
      const lines = [openComment, getIcon(iconName), closeComment]
      const compact = lines.filter(function(line) { return line != null })
      const indented = compact.map(function(line) { return `${indent}${line}` })
      return indented.join("\n")
    }

    return str.replace(regex, iconReplace)
  }
}

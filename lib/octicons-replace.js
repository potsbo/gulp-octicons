const octicons = require('octicons')

module.exports = {
  replace: (str) => {
    function iconReplace(_, indent, openComment, iconName, _, closeComment) {
      const lines = [openComment, getIcon(iconName), closeComment]
      const compact = lines.filter((line) => line != null)
      const indented = compact.map((line) => `${indent}${line}`)
      return indented.join("\n")
    }

    function getIcon(iconName) {
      const icon = octicons[iconName]
      return icon ? icon.toSVG() : null
    }

    const regex = /([ \t]*)(<!--\s*octicons:(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endocticons\s*-->)/gi
    return str.replace(regex, iconReplace)
  }
}
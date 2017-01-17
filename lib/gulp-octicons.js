const regex = /(\s*)(<!--\s*octicon:(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endocticon\s*-->)/

const getIcon = function(iconName) {
  return `${iconName}.path` //TODO: use octoicons
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

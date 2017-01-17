const octicons = require('octicons')
const chai = require('chai')
const expect = chai.expect
$ = {
  octicons: require('../../lib/octicons-replace')
}

const strs = {
  open: (option = {}) => {
    const iconName = option.iconName || 'x'
    return `<!-- octicons:${iconName} -->`
  },
  close: '<!-- endocticons -->',
}
const svg = (iconName = 'x') => {
  return octicons[iconName].toSVG()
}

function itShouldHaveCorrectIndent(str, expectedLines) {
  describe('indent', () => {
    it('should insert same indent as openComment', () => {
      const indented = `  ${str}`
      const actual = $.octicons.replace(indented)
      const expected = expectedLines.map((block) => `  ${block}`).join('\n')
      expect(actual).to.eql(expected)
    })
  })
}

describe('octicon-replace', () => {
  describe('replace', () => {
    function itShouldReturnInsertedString(source, expectedLines) {
      const actual = $.octicons.replace(source)
      const expected = expectedLines.join('\n')
      expect(actual).to.eql(expected)
    }

    const str = [strs.open(), strs.close].join('\n')
    const expectedLines = [strs.open(), svg(), strs.close]
    it('should match and replace', () => {
      itShouldReturnInsertedString(str, expectedLines)
    })
    context('when not registered icon specified', () => {
      const open = strs.open({ iconName: 'not-registered-icon-name' })
      const str = [open, strs.close].join('\n')
      const expectedLines = [open, strs.close]
      it('should not insert anything', () => {
        itShouldReturnInsertedString(str, expectedLines)
      })
      itShouldHaveCorrectIndent(str, expectedLines)
    })
    itShouldHaveCorrectIndent(str, expectedLines)

    context('when more than one octions given', () => {
      const arrows = ['arrow-down', 'arrow-left', 'arrow-right', 'arrow-up']
      const comments = arrows.map((d) => {
        return [strs.open({ iconName: d }), strs.close].join('\n')
      })
      const expectedBases = arrows.map((d) => {
        return [strs.open({ iconName: d}), svg(d), strs.close]
      })
      const expectedLines = [].concat.apply([], expectedBases)
      const str = comments.join('\n')
      it('should match and replace', () => {
        itShouldReturnInsertedString(str, expectedLines)
      })
    })
  })
})

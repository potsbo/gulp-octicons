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
function linesGen(option = {}) {
  const lines = [
    strs.open(option.open || {}),
    option.body,
    strs.close
  ]
  return lines.filter((line) => line != null)
}
const svg = (iconName = 'x') => {
  return octicons[iconName].toSVG()
}


describe('octicon-replace', () => {
  describe('replace', () => {
    function itShouldReturnInsertedString(source, expectedLines) {
      source = source instanceof Array ? source.join("\n") : source
      const actual = $.octicons.replace(source)
      const expected = expectedLines.join('\n')
      expect(actual).to.eql(expected)
    }

    function describeIndent(source, expectedLines) {
      describe('indent', () => {
        it('should insert same indent as openComment', () => {
          const str = source instanceof Array ? source.join("\n") : source
          const indented = `  ${str}`
          const expected = expectedLines.map((block) => `  ${block}`)
          itShouldReturnInsertedString(indented, expected)
        })
      })
    }

    const sourceLines = linesGen()
    const expectedLines = linesGen({ body: svg() })

    it('should match and replace', () => {
      itShouldReturnInsertedString(sourceLines, expectedLines)
    })
    describeIndent(sourceLines, expectedLines)

    context('when not registered icon specified', () => {
      const sourceLines = linesGen({ open: { iconName: 'not-registered-icon-name' }})
      it('should not insert anything', () => {
        itShouldReturnInsertedString(sourceLines, sourceLines)
      })
      describeIndent(sourceLines, sourceLines)
    })

    context('when more than one octions given', () => {
      const arrows = ['arrow-down', 'arrow-left', 'arrow-right', 'arrow-up']
      const sourceLines = arrows.map((d) => [strs.open({ iconName: d }), strs.close].join('\n'))
      const expectedBases = arrows.map((d) => [strs.open({ iconName: d}), svg(d), strs.close])
      const expectedLines = [].concat.apply([], expectedBases)
      it('should match and replace', () => {
        itShouldReturnInsertedString(sourceLines, expectedLines)
      })
    })
  })
})

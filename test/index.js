const expect = require('chai').expect
$ = {
  octicons: require('../index')
}

const strs = {
  open: '<!-- octicon:icon-name -->',
  close: '<!-- endocticon -->',
}

describe('gulp-octicons', function() {
  describe('replace', function() {
    const str = [strs.open, strs.close].join('\n')
    const expectedBase = [strs.open, 'icon-name.path', strs.close]
    it('should match and replace', function() {
      const actual = $.octicons.replace(str)
      const expected = expectedBase.join('\n')
      expect(actual).to.eql(expected)
    })
    describe('indent', function() {
      it('should insert same indent as openComment', function() {
        const indented = `  ${str}`
        const actual = $.octicons.replace(indented)
        const expected = expectedBase.map(function(block){ return `  ${block}`}).join('\n')
        expect(actual).to.eql(expected)
      })
    })
  })
})

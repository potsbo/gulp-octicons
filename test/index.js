const expect = require('chai').expect
$ = {
  octicons: require('../index')
}

describe('gulp-octicons', function() {
  describe('replace', function() {
    const str = "<!-- octicon:icon-name -->\n<!-- endocticon -->"
    it('should match and replace', function() {
      const actual = $.octicons.replace(str)
      const expected = "<!-- octicon:icon-name -->\nicon-name.path\n<!-- endocticon -->"
      expect(actual).to.eql(expected)
    })
    describe('indent', function() {
      it('should insert same indent as openComment', function() {
        const indented = `  ${str}`
        const actual = $.octicons.replace(indented)
        const expected = "  <!-- octicon:icon-name -->\n  icon-name.path\n  <!-- endocticon -->"
        expect(actual).to.eql(expected)
      })
    })
  })
})

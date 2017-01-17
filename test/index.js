const expect = require('chai').expect
$ = {
  octicons: require('../index')
}

describe('gulp-octicons', function() {
  describe('replace', function() {
    it('should match and replace', function() {
      const str = "<!-- octicon:icon-name -->\n<!-- endocticon -->"
      const actual = $.octicons.replace(str)
      const expected = "<!-- octicon:icon-name -->\nicon-name.path\n<!-- endocticon -->"
      expect(actual).to.eql(expected)
    })
  })
})

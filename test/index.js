const octicons = require('octicons')
const chai = require('chai')
const chaiFiles = require('chai-files')
chai.use(chaiFiles)
const file = chaiFiles.file
const expect = chai.expect
$ = {
  octicons: require('../lib/gulp-octicons')
}

const strs = {
  open: function(option = {}){
    const iconName = option.iconName || 'x'
    return `<!-- octicons:${iconName} -->`
  },
  close: '<!-- endocticons -->',
}
function svg(iconName = 'x') {
  return octicons[iconName].toSVG()
}

function itShouldHaveCorrectIndent(str, expectedBase) {
  describe('indent', function() {
    it('should insert same indent as openComment', function() {
      const indented = `  ${str}`
      const actual = $.octicons.replace(indented)
      const expected = expectedBase.map(function (block) {
        return `  ${block}`
      }).join('\n')
      expect(actual).to.eql(expected)
    })
  })
}

describe('gulp-octicons', function() {
  describe('replace', function() {
    const str = [strs.open(), strs.close].join('\n')
    const expectedBase = [strs.open(), svg(), strs.close]
    it('should match and replace', function() {
      const actual = $.octicons.replace(str)
      const expected = expectedBase.join('\n')
      expect(actual).to.eql(expected)
    })
    context('when not registered icon specified', function() {
      const open = strs.open({ iconName: 'not-registered-icon-name' })
      const str = [open, strs.close].join('\n')
      const expectedBase = [open, strs.close]
      it('should not insert anything', function() {
        const actual = $.octicons.replace(str)
        const expected = expectedBase.join('\n')
        expect(actual).to.eql(expected)
      })
      itShouldHaveCorrectIndent(str, expectedBase)
    })
    itShouldHaveCorrectIndent(str, expectedBase)

    context('when more than one octions given', function() {
      const arrows = ['arrow-down', 'arrow-left', 'arrow-right', 'arrow-up']
      const comments = arrows.map(function(d) {
        return [strs.open({ iconName: d }), strs.close].join('\n')
      })
      const expectedBases = arrows.map(function(d) {
        return [strs.open({ iconName: d}), svg(d), strs.close]
      })
      const expectedBase = [].concat.apply([], expectedBases)
      const str = comments.join('\n')
      it('should match and replace', function() {
        const actual = $.octicons.replace(str)
        const expected = expectedBase.join('\n')
        expect(actual).to.eql(expected)
      })
    })
  })

  describe('pipe', function() {
    const gulp = require('gulp')
    const gulpOcticons = require('../index')
    gulp.task('octicons', function() {
      gulp.src('test/fixtures/index-source.html')
        .pipe(gulpOcticons())
        .pipe(gulp.dest('./test/dest'))
    })
    gulp.run('octicons')
    it('should render expected html file', function() {
      const actual = file('test/dest/index-source.html')
      const expected = file('test/fixtures/index-expected.html')
      expect(actual).to.equal(expected)
    })
  })
})

const octicons = require('octicons')
const chai = require('chai')
const chaiFiles = require('chai-files')
chai.use(chaiFiles)
const file = chaiFiles.file
const expect = chai.expect
$ = {
  octicons: require('../lib/octicons-replace')
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
  describe('pipe', function() {
    function itShouldRenderExpectedFile(suffix) {
      const actual = file(`test/dest/index-${suffix}.html`)
      const expected = file(`test/expected/index-${suffix}.html`)
      expect(actual).to.equal(expected)
    }
    const gulp = require('gulp')
    const gulpOcticons = require('../index')
    gulp.task('octicons', function() {
      gulp.src('test/fixtures/*.html')
        .pipe(gulpOcticons())
        .pipe(gulp.dest('./test/dest'))
    })
    gulp.run('octicons')

    it('should render expected html file', function() {
      itShouldRenderExpectedFile('basic')
    })

    it('should respond to more than one octicons', function() {
      itShouldRenderExpectedFile('multiple')
    })
  })
})

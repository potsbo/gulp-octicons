const chai = require('chai')
const chaiFiles = require('chai-files')
chai.use(chaiFiles)
const file = chaiFiles.file
const expect = chai.expect

describe('gulp-octicons', () => {
  describe('pipe', () => {
    function itShouldRenderExpectedFile(suffix) {
      const actual = file(`test/dest/index-${suffix}.html`)
      const expected = file(`test/expected/index-${suffix}.html`)
      expect(actual).to.equal(expected)
    }

    before((done) => {
      const gulp = require('gulp')
      const gulpOcticons = require('../index')
      gulp.task('octicons', () => {
        gulp.src('test/fixtures/*.html')
          .pipe(gulpOcticons())
          .pipe(gulp.dest('./test/dest'))
      })
      gulp.run('octicons', done)
    })

    it('should render expected html file', () => {
      itShouldRenderExpectedFile('basic')
    })

    it('should respond to more than one octicons', () => {
      itShouldRenderExpectedFile('multiple')
    })
  })
})

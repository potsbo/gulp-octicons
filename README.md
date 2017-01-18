# gulp-octicons
Insert [octiocns](https://github.com/primer/octicons/) svg path into html file.
You can see icons that you can insert at [this page](https://octicons.github.com/).

## Install
```shell
npm install gulp-octicons --save-dev
```

### Insert octicons
When you want to insert an icons named `__icon_name__`,
use special comments as below.

```html
<!-- octicons:__icon_name__ -->
<!-- endocticons -->
```

Icon svg rendered with `octiocns.__icon_name__.toSVG()` will be inserted.
See [this section](https://github.com/primer/octicons/#octiconsalerttosvg) for more detail about `toSVG()`.


### Example

#### Task
```javascript
var octicons = require('gulp-octicons');

gulp.task('octicons', function() {
  gulp.src("src/*.html")
    .pipe(octicons())
    .pipe(gulp.dest('dest'))
});
```

#### Before
```html
<!-- octicons:arrow-up -->
<!-- endocticons -->

<!-- octicons:arrow-down -->
<!-- endocticons -->
```

#### After
```html
<!-- octicons:arrow-up -->
<svg version="1.1" width="10" height="16" viewBox="0 0 10 16" class="octicon octicon-arrow-up" aria-hidden="true"><path fill-rule="evenodd" d="M5 3L0 9h3v4h4V9h3z"/></svg>
<!-- endocticons -->

<!-- octicons:arrow-down -->
<svg version="1.1" width="10" height="16" viewBox="0 0 10 16" class="octicon octicon-arrow-down" aria-hidden="true"><path fill-rule="evenodd" d="M7 7V3H3v4H0l5 6 5-6z"/></svg>
<!-- endocticons -->
```

## Future Works

- [ ] Take options that octions do
- [ ] Other formats
- [ ] Support Node 4 and 5

## License

MIT

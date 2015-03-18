/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import jscs        from 'gulp-jscs';
import jshint      from 'gulp-jshint';
import lazypipe    from 'lazypipe';
import runSequence from 'run-sequence';

import * as utils from '../utils';

/**
 * Configures static analysis tools as gulp tasks under `test:style`.
 *
 * @param {!Gulp} gulp
 * @param {!Context} context
 */
export function configureTasks(gulp, context) {
  gulp.task('test:style', function(done) {
    runSequence.use(gulp)('test:style:jshint', 'test:style:jscs', done);
  });

  gulp.task('test:style:jshint', function() {
    gulp.src(context.sources).pipe(jshintPipe(context));
  });

  gulp.task('test:style:jscs', function() {
    gulp.src(context.sources).pipe(jscsPipe(context));
  });
}

// Shared Pipes

/**
 * @param {!Context} context
 * @return {!Stream}
 */
export function jshintPipe(context) {
  let config = utils.loadJsonTemplate(context.jshintrcPath, context);
  return lazypipe()
      .pipe(jshint.extract, 'auto')
      .pipe(jshint, config)
      .pipe(jshint.reporter, 'jshint-stylish')
      .pipe(jshint.reporter, 'fail')
      ();
}

/**
 * @param {!Context} context
 * @return {!Stream}
 */
export function jscsPipe(context) {
  let config = utils.loadJsonTemplate(context.jscsrcPath, context);
  return lazypipe()
      .pipe(jscs, config)
      ();
}

/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import runSequence from 'run-sequence';

import Context        from '../context';
import * as testStyle from './testStyle';

/**
 * Configures shared gulp tasks for Substratum based projects.
 *
 * @param {!Gulp} gulp The gulp object to add tasks to.
 * @param {Object=} options Any configuration options for the project.
 */
export function configureTasks(gulp, options) {
  let context = new Context(options);

  testStyle.configureTasks(gulp, context);

  gulp.task('test', function(done) {
    runSequence.use(gulp)('test:style', done);
  });
}

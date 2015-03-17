/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import notifier    from 'node-notifier';
import os          from 'os';
import plumber     from 'gulp-plumber';
import pluralize   from 'pluralize';
import streamArray from 'stream-array';
import watch       from 'gulp-watch';

import * as testStyle from './testStyle';

/**
 * Configures a `watch` task that runs appropriate tests/checks whenever files
 * under the project have been touched.
 *
 * @param {!Gulp} gulp
 * @param {!Context} context
 */
export function configureTasks(gulp, context) {
  let sources = context.sources;

  gulp.task('watch', (done) => {
    watch(sources, (file) => {
      console.log(file.relative); // Very confusing w/o some feedback.

      // Unfortunately, we have to spin off a new stream per file for a few
      // reasons. gulp-jshint and gulp-jscs don't play nicely with gulp-watch
      // (they wait for the stream to end before emitting errors). Also, many of
      // the stream wrappers will tend to refuse additional data after a stream
      // has encountered an error.
      //
      // This avoids all that extra state, and allows for simplifying
      // assumptions to be made in the various gulp plugins we use.
      let stream = streamArray([file])
          .pipe(plumber({
            errorHandler: (error) => {
              console.log(error.message); // Emit errors for jscs
            },
          }))
          .on('data', () => {}) // The stream won't end without this.
          .on('end', () => {
            var summary = [];
            if (file.jshint && file.jshint.results &&
                file.jshint.results.length > 0) {
              summary.push(errorMessage('JSHint', file.jshint.results.length));
            }
            if (file.jscs && file.jscs.errors && file.jscs.errors.length > 0) {
              summary.push(errorMessage('JSCS', file.jscs.errors.length));
            }

            if (summary.length === 0) return;
            notifier.notify({
              title:   file.relative,
              message: summary.join(', '),
            });
          })
          .pipe(testStyle.jshintPipe(context));

      // JSHint does a good job of filtering unknown file types; JSCS doesn't
      // fare quite so well, however.
      if (/\.js$/.test(file.relative)) {
        stream.pipe(testStyle.jscsPipe(context));
      }
    });
  });

}

/**
 * Formats a fragment indicating the kind and number of errors for display by
 * notifier.
 *
 * @param {string} kind
 * @param {number} count
 */
function errorMessage(kind, count) {
  return `${count} ${kind} ${pluralize('errors', count)}`;
}

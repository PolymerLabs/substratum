/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import fs                from 'fs';
import stripJsonComments from 'strip-json-comments';
import template          from 'es6-template-strings';

/**
 * Loads and parses a JSON configuration file; allowing comments in it.
 *
 * @param {string} filename
 * @return {Object}
 */
export function loadJson(filename) {
  return JSON.parse(stripJsonComments(fs.readFileSync(filename)));
}

/**
 * Loads and parses a JSON configuration file template, following ES6 template
 * syntax
 *
 * @param {string} filename
 * @param {Object} context
 * @return {Object}
 */
export function loadJsonTemplate(filename, context) {
  let source = template(fs.readFileSync(filename), context);
  return JSON.parse(stripJsonComments(source));
}

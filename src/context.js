/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import path from 'path';

/**
 * The configuration of a Substratum based project, and runtime information
 * about it (such as calculated paths).
 */
export default class Context {

  /** @param {Object=} options Initial options that override the defaults. */
  constructor(options) {
    // Note that we cannot safely use getters if we want them to be consumable
    // by the es6-template-strings module. So we assign all the things we might
    // want access to in templates.
    Object.assign(this, Context.DEFAULTS, options);

    this.substratumRoot = path.resolve(__dirname, '..');
    this.substratumData = path.join(this.substratumRoot, 'data');
    this.jscsrcPath     = path.join(this.substratumData, '.jscsrc');
    this.jshintrcPath   = path.join(this.substratumData, '.jshintrc');
    this.esprimaPath    = path.join(this.substratumRoot, 'node_modules', 'esprima');
  }

  get jsSources() {
    return this.sources.filter(f => /\.js$/.test(f));
  }

}

// https://esdiscuss.org/topic/es7-property-initializers
Context.DEFAULTS = {
  /** Files or globs representing the project's JS source files. */
  sources: ['src/**/*.{js,html}'],
};

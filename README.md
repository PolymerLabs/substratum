# Substratum

Substratum provides a baseline configuration for your Node.js projects,
primarily via a set of common gulp tasks.

To get started:

```
npm install substratum --save
```

and create a `gulpfile.js`:

```js
var gulp = require('gulp');
require('substratum').gulp.configureTasks(gulp);
```

## Configuration

Substratum will assume a standard project layout, with sources under `src/`, 
tests under `test/`, etc.

You can override these values (and many more), by passing options via the 
second argument to `configureTasks`.

See [`Context` for a full reference](src/context.js).


## Gulp Tasks

Substratum defines many gulp tasks for you in a cascade. Tasks are grouped into
namespaces, and a namespace tasks will run all tasks under them. I.e.
`gulp test` will run all tasks that begin with `test:`.

For a full reference, just run `gulp -T`.

## `watch`

This should be your bread and butter. Leave `gulp watch` running in the 
background, and it will continually run tests against any file that changes as
you edit it. Any issues will trigger a notification for you.

## `test:style:jshint`

Runs jshint [configured for a modern world](data/.jshintrc) against your 
project's sources.

## `test:style:jscs`

Runs jshint [configured for a modern world](data/.jscsrc) against your 
project's sources.

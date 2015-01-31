# gulp-node-debug

A gulp node-debug wrapper, which works on top of node-inspector.

Perfect for development. Easy to use.

1. Runs node-inspector.
2. Runs the supplied script in debug mode
3. Opens the user's browser, pointing it at the inspector.

## Installation

`npm install gulp-node-debug --save-dev`

## Usage

```javascript
// Gulpfile.js
var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');

gulp.task('node-debug', function () {
  return nodeDebug({
    'script': 'app.js'
    'web-host': '127.0.0.2'
  });
});
```

## Options

You can pass an object to `nodeDebug` with options [specified in node-inspector config](https://github.com/node-inspector/node-inspector#options).


## Credits

This project was forked from [gulp-node-inspector](https://github.com/koemei/gulp-node-inspector) which wraps **node-inspector**. Many thanks to [Koemei](https://github.com/koemei) for the initial work. 
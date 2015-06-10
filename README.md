# gulp-node-debug

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] 
<!--[![Dependency Status][daviddm-url]][daviddm-image]-->
<!--[![Coverage Status][coveralls-image]][coveralls-url]-->

A wrapper around [node-inspector](https://github.com/node-inspector/node-inspector) for gulp, has the same functionality as the **node-debug** command.

Perfect for development. Easy to use.

1. Runs node-inspector.
2. Runs the supplied script in debug mode
3. Opens the user's browser, pointing it at the inspector.

## Installation

`npm install gulp-node-debug --save-dev`

## Usage

This is the minimal setup. The file `app.js` will be debugged with default values.

```javascript
// gulpfile.js
var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');
gulp.task('debug', function() {

    gulp.src(['app.js'])
        .pipe(nodeDebug());
});
```

Add `debugBrk: true` if your script finishes immediately:

```javascript
// gulpfile.js
var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');
gulp.task('debug', function() {

    gulp.src(['app.js'])
        .pipe(nodeDebug({
            debugBrk: true
        }));
});
```

This example shows all available options (default values):

```javascript
// gulpfile.js
var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');
gulp.task('debug', function() {

    gulp.src(['app.js'])
        .pipe(nodeDebug({
            debugPort: 5858,
            webHost: '0.0.0.0',
            webPort: 8080,
            debugBrk: false,
            nodejs: [],
            script: [],
            saveLiveEdit: false,
            preload: true,
            inject: true,
            hidden: [],
            stackTraceLimit: 50,
            sslKey: '',
            sslCert: ''
        }));
});
```

Enter `gulp debug` in your shell to start the node-inspector, run the supplied script and to open the debug URL in Chrome, Chromium or Opera.


## How to debug Mocha unit-tests?

You have to start _mocha as the debugged process. Try out the **watch** option, which makes sure that the debugged process does not end after execution of all tests. 

```javascript
// gulpfile.js
var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');
gulp.task('debugTest', function() {

    var mochaScript = path.join(__dirname, 'node_modules/mocha/bin/_mocha');

    gulp.src([mochaScript])
        .pipe(nodeDebug({
            debugBrk: true,
            script: ['--watch'],
        }));
});
   
```

## Options

All options are written in camelCase style:

| Option              | Default   | Description |
| :------------------ | :-------: | :-------- |
| debugPort           | 5858      | Node/V8 debugger port.
| webHost             | '0.0.0.0' | Host to listen on for Node Inspector's web interface. `node-debug` listens on `127.0.0.1` by default.
| webPort             | 8080      | Port to listen on for Node Inspector's web interface.
| **node-debug**
| debugBrk            | true      | Break on the first line.
| nodejs              | []        | List of string to pass NodeJS options to debugged process.
| script              | []        | List of string to pass options to debugged process.
| **node-inspector**
| saveLiveEdit        | false     | Save live edit changes to disk (update the edited files).
| preload             | true      | Preload *.js files. You can disable this option<br/>to speed up the startup.
| inject              | true      | Enable injection of debugger extensions into the debugged process.
| hidden              | []        | Array of files to hide from the UI, breakpoints in these files will be ignored. All paths are interpreted as regular expressions.
| stackTraceLimit     | 50        | Number of stack frames to show on a breakpoint.
| sslKey              | ''        | Path to file containing a valid SSL key.
| sslCert             | ''        | Path to file containing a valid SSL certificate.

## Credits

This project was forked from [gulp-node-inspector](https://github.com/koemei/gulp-node-inspector) which wraps **node-inspector** (but does not start a debugged process). All real work was done by [node-inspector](https://github.com/node-inspector/node-inspector).

## License

The MIT License (MIT)  
  
Copyright (c) 2015 Johannes Hoppe (http://haushoppe-its.de)  
  
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.  


[npm-url]: https://npmjs.org/package/gulp-node-debug
[npm-image]: https://badge.fury.io/js/gulp-node-debug.svg
[travis-url]: https://travis-ci.org/middleware-io/gulp-node-debug
[travis-image]: https://travis-ci.org/middleware-io/gulp-node-debug.svg?branch=master
[daviddm-url]: https://david-dm.org/middleware-io/gulp-node-debug.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/middleware-io/gulp-node-debug
[coveralls-url]: https://coveralls.io/r/middleware-io/gulp-node-debug
[coveralls-image]: https://coveralls.io/repos/middleware-io/gulp-node-debug/badge.png
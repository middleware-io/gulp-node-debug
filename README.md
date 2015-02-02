# gulp-node-debug

A wrapper around node-inspector for gulp, works similar to the node-debug command.

Perfect for development. Easy to use.

1. Runs node-inspector.
2. Runs the supplied script in debug mode
3. Opens the user's browser, pointing it at the inspector.

## Installation

`npm install gulp-node-debug --save-dev`

## Usage

```javascript
// gulpfile.js

```

Enter `gulp debug` in your shell to start the node-inspector, run the supplied script and to open the debug URL in Chrome, Chromium or Opera.

## Options

All options are written in camelCase style:

| Option              | Default   | Description |
| :------------------ | :-------: | :-------- |
| debugPort           | 5858      | Node/V8 debugger port.<br/>(`node --debug={port}`)
| webHost             | '0.0.0.0' | Host to listen on for Node Inspector's web interface.<br/>`node-debug` listens on `127.0.0.1` by default.
| webPort             | 8080      | Port to listen on for Node Inspector's web interface.
| **node-debug**
| debugBrk            | true      | Break on the first line.<br/>(`node --debug-brk`)
| nodejs              | []        | List of string to pass NodeJS options to debugged process.
| script              | []        | List of string to pass options to debugged process.
| **node-inspector**
| saveLiveEdit        | false     | Save live edit changes to disk (update the edited files).
| preload             | true      | Preload *.js files. You can disable this option<br/>to speed up the startup.
| inject              | true      | Enable injection of debugger extensions into the debugged process.
| hidden              | []        | Array of files to hide from the UI,<br/>breakpoints in these files will be ignored.<br/>All paths are interpreted as regular expressions.
| stackTraceLimit     | 50        | Number of stack frames to show on a breakpoint.
| sslKey              | ''        | Path to file containing a valid SSL key.
| sslCert             | ''        | Path to file containing a valid SSL certificate.


## Todo

This version is more or less a proof of concept. I will add some units-tests if people confirm that it's useful.   

## Credits

This project was forked from [gulp-node-inspector](https://github.com/koemei/gulp-node-inspector) which wraps **node-inspector**.  
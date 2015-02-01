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
// Gulpfile.js

```

Enter `gulp debug` in your shell to start the node-inspector, run the supplied script nad to open the default browser.

## Options

You can pass an object to `nodeInspector` with options [specified in node-inspector config](https://github.com/node-inspector/node-inspector#options).  
Options are written in camelCase style!

## Credits

This project was forked from [gulp-node-inspector](https://github.com/koemei/gulp-node-inspector) which wraps **node-inspector**.  
Many thanks to [Koemei](https://github.com/koemei) for the initial work. 
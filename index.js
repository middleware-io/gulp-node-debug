'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

module.exports = function(options) {
  options = options || {};
  gulp.task('node-debug', function(cb) {
    var args = [require.resolve('node-inspector/bin/node-debug')];
  
    gutil.log("test");

    Object.keys(options).forEach(function(option) {
    
      var value = options[option];
      args.push('--' + option);
      
      if (Array.isArray(value)) {
        args.push(JSON.stringify(options[option]));
      } else {
        args.push(value);
      }
    });
    
    var child = spawn('node', args, {
      stdio: 'inherit'
    });
    
    child.on('error', function(err) {
      gutil.log(gutil.colors.red('node-debug error: ' + err.message));
    });
    
    child.on('exit', function() {
      gutil.log(gutil.colors.red('node-debug process stopped'));
    });
    
    // calling callback for alerting gulp that the task is finished, probably we should do better.
    cb();
  });
};

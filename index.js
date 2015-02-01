'use strict';

/*
 * 1. Runs node-inspector.
 * 2. Runs the supplied script in debug mode
 * 3. Opens the user's browser, pointing it at the inspector.
 */

var through = require('through2'),
    gutil = require('gulp-util'),
    merge = require('merge'),
    debugServer = require('node-inspector/lib/debug-server'),
    Config = require('node-inspector/lib/config'),
    packageJson = require('node-inspector/package.json'),
    open = require('opener'),
    fork = require('child_process').fork;

var PluginError = gutil.PluginError;
var config = new Config([]);
var DebugServer = debugServer.DebugServer;
var log = gutil.log, colors = gutil.colors;

var PLUGIN_NAME = 'gulp-node-debug';

var nodeDebug = function(opt) {

    var options = merge(config, opt);

    var startDebugServer = function(file, enc, cb) {

        log(PLUGIN_NAME, 'is using node-inspector v' + packageJson.version);

        // 1.
        var debugServer = new DebugServer(options);

        debugServer.on('error', function(err) {

            if (err.code === 'EADDRINUSE') {
                log(colors.red('There is another process already listening at this address.\nChange "webPort": {port} to use a different port.'));
            }

            throw new PluginError(PLUGIN_NAME, 'Cannot start the server at ' + config.webHost + ':' + config.webPort + '. Error: ' + (err.message || err));
        });

        debugServer.on('listening', function() {

            var url = this.address().url;
            log(colors.green('Node Inspector is now available from', url));

            // 2.
            startDebuggedProcess(
                file,
                function startCallback() {
                    // 3. a compatible browser must be the default browser
                    open(url);
                }, function exitCallback() {
                    
                    debugServer.close();
                    cb(null, file);
                });

        });

        debugServer.on('close', function() {
            log(colors.gray('DebugServer closed.'));
        });

        debugServer.start(config);
    };

    function startDebuggedProcess(file, startCallback, exitCallback) {

        var modulePath = file.path;
        var subprocDebugOption = (options.debugBrk ? '--debug-brk' : '--debug') + '=' + options.debugPort;
        var subprocExecArgs = options.nodejs.concat(subprocDebugOption);
        var subprocArgs = []; // TODO, if requried?

        var debuggedProcess = fork(
            modulePath,
            subprocArgs,
            { execArgv: subprocExecArgs }
        );

        debuggedProcess.on('exit', function() {
            log(colors.gray('Debugged process exited.'));
            exitCallback();
        });

        startCallback();
    }

    // Creating a stream through which each file will pass
    // ... probably you only want to pass one file!
    return through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
        }

        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Streaming not supported'); // TODO
        }

        startDebugServer(file, enc, cb);

    });
};

module.exports = nodeDebug;

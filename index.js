'use strict';

/*
 * 1. Runs node-inspector.
 * 2. Runs the supplied script in debug mode
 * 3. Opens the user's browser, pointing it at the inspector.
 */

var es = require('event-stream'),
    gutil = require('gulp-util'),
    merge = require('merge'),
    debugServer = require('node-inspector/lib/debug-server'),
    Config = require('node-inspector/lib/config'),
    packageJson = require('node-inspector/package.json'),
    biasedOpen = require('biased-opener'),
    open = require('opener'),
    fork = require('child_process').fork;

var PluginError = gutil.PluginError;
var config = new Config([]);
var DebugServer = debugServer.DebugServer;
var log = gutil.log, colors = gutil.colors;

var PLUGIN_NAME = 'gulp-node-debug';

var nodeDebug = function(opt) {
    
    var stream, files = [];
    var options = merge(config, opt);

    var startDebugServer = function() {

        log(PLUGIN_NAME, 'is using node-inspector v' + packageJson.version);

        // 1.
        var debugServer = new DebugServer(options);

        debugServer.on('error', function(err) {

            if (err.code === 'EADDRINUSE') {
                log(colors.red('There is another process already listening at this address.\nChange "webPort": {port} to use a different port.'));
            }

            stream.emit('error', PluginError(PLUGIN_NAME, 'Cannot start the server at ' + config.webHost + ':' + config.webPort + '. Error: ' + (err.message || err)));
        });

        debugServer.on('listening', function() {

            var url = this.address().url;
            log(colors.green('Node Inspector is now available at', url));

            // 2.
            startDebuggedProcess(
                function startCallback() {
                    // 3.
                    openUrl(url);
                }, function exitCallback() {
                    log(colors.gray('Requesting debugServer to close.'));
                    debugServer.close();
                    done();
                });
        });

        debugServer.on('close', function() {
            log(colors.gray('DebugServer closed.'));
        });

        debugServer.start(config);
    };
    
    // try to launch the URL in one of those browsers in the defined order
    // (but if one of them is default browser, then it takes priority)    
    var openUrl = function(url) {
  
        biasedOpen(url, {
            preferredBrowsers : ['chrome', 'chromium', 'opera']
        }, function (err, okMsg) {
            if (err) {
                // unable to launch one of preferred browsers for some reason
                log(colors.gray('biased-opener:', err.message));
                log(colors.gray('opening url with default browser instead.'));
                open(url);
            }
        });
    }

    var startDebuggedProcess = function(startCallback, exitCallback) {
        
        if (!files.length) {
            log(colors.red('No file to debug provided. Nothing to do.'));
            exitCallback();
            return;
        }
        
        // this will be changed later on. (e.g. picking a file by convention) 
        if (!files.length > 1) {
            log(colors.red('More that one file provided. Only one single file can be debugged.'));
            exitCallback();
            return;
        }

        var fileToDebug = files[0];

        var subprocDebugOption = (options.debugBrk ? '--debug-brk' : '--debug') + '=' + options.debugPort;
        var subprocExecArgs = options.nodejs.concat(subprocDebugOption);
        var subprocArgs = options.script || [];

        log("Going to debug", fileToDebug, subprocArgs, subprocExecArgs);

        var debuggedProcess = fork(
            fileToDebug,
            subprocArgs,
            { execArgv: subprocExecArgs }
        );

        debuggedProcess.on('exit', function() {
            log(colors.gray('Debugged process exited.'));
            exitCallback();
        });

        startCallback();
    }



    // -------------

    function done() {
        // End the stream if it exists
        if (stream) {
            stream.emit('end');
        }
        log(colors.gray('Done!'));
    }
    
    var queueFile = function (file) {
        if (!file) {
            stream.emit('error', new PluginError(PLUGIN_NAME, 'got undefined file'));
            return;
        }

        files.push(file.path);
    };
    
    var endStream = function () {
        startDebugServer();
    };
    
    // copied from gulp-karma 
    stream = es.through(queueFile, endStream);
    
    return stream;
};

module.exports = nodeDebug;

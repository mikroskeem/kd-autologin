#!/usr/bin/env node

var config = {};
var debug = {};
/* Config */
/* |- Debug config */
debug.yes = true; // set this true for debug pictures/messages
debug.picture_path = "/home/kelluke/Web/phantom_test"; // I want to see pictures in web
/* |- User credenitals */
config.username = "kelluke";
config.password = "";


/* Imports */
var colors = require("colors"),
    path = require('path'),
    childProcess = require('child_process');

/* Functions */
function launchbrowser(args){
    var childArgs = [
        "--ssl-protocol=any",
        path.join(__dirname, 'browser.js')
    ];
    args.forEach(function(arg, index){
        console.log("DEBUG: " + "Arg: ".cyan + index + ": " + arg);
        childArgs.push(arg);
    });
    childProcess.execFile("/usr/bin/casperjs", childArgs, function(err, stdout, stderr) {
	if(debug.yes){
            console.log("Browser started");
            if(stdout) console.log("DEBUG: " + "CasperJS output: ".cyan + "%s".yellow, stdout);
            if(stderr) console.log("DEBUG: " + "CasperJS stderr: ".cyan + "%s".red, stderr);
            if(err) console.log("DEBUG: " + "exec err: ".cyan + "%s".red, err);
        }
    });
}
/* Main */
launchbrowser(["https://koding.com/Login", debug.yes, debug.picture_path, config.username, config.password]);

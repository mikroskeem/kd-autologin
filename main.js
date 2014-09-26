#!/usr/bin/env nodejs

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
    glob = require("glob"),
    path = require('path'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs').path; 


/* Functions */
function launchphantom(args){
    var childArgs = [
        path.join(__dirname, 'browser.js'),
        args
    ];
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if(stdout) console.log("PhantomJS output: " + "%s".yellow, stdout);
        if(stderr) console.log("PhantomJS stderr: " + "%s".red, stderr);
        if(err) console.log("exec err: " + "%s".red, err);
    });
}
/* Main */
launchphantom("lel");
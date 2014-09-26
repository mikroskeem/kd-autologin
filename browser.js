#!/usr/bin/env phantomjs

/* Imports */
var Koding = "https://koding.com/",
    fs = require("fs"),
    page = require('webpage').create();


/* Functions */
function newimage () {
    console.log(phantom.args);
}
/* Main */
newimage();

page.open(Koding, function (status) {
    console.log(status);
    //page.render()
});



phantom.exit();
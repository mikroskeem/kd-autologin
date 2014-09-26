#!/usr/bin/env casperjs

/* Config */
var useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
/* Imports */
var fs = require("fs"),
    page = require('webpage').create(), //Phantomjs
    casper = require('casper').create({verbose:true,loglevel:"debug"}),
    args = casper.cli.args;

/* Args */
var Koding = args[0],
    debug = args[1],
    picpath = args[2],
    username = args[3],
    password = args[4];

if(!(picpath[picpath.length-1] == "/")){
    picpath = picpath + "/";
}
/* Functions */
function savecookie() {
    var cookies = JSON.stringify(phantom.cookies)
    fs.write("cookie-jar", cookies, 644)
}
function restorecookie() {
    try {
        var data = fs.read("cookie-jar")
        phantom.cookies = JSON.parse(data)
    } catch(e) {
        fs.write("cookie-jar", "{}", 644)
    }
}
function newimage () {
    var list = fs.list(picpath);
    var images = [];
    for(var x = 0; x < list.length; x++){
        if(list[x] != "." && list[x] != ".."){
            if (list[x].indexOf("-") == 3){
                var imgid = list[x].slice(0, -4).split("-")[1];
                images.push(imgid);
            }
        }
    }
    if(images.length == 0) {
        return picpath + "img-0.png"
    } else {
        return picpath + "img-" + (Math.max.apply(Math, images) + 1) + ".png";
    }
}
/* Main */

casper.userAgent(useragent);
restorecookie();
casper.start(Koding, function(data){
    console.log(JSON.stringify(data));
    this.echo(this.getTitle());
    this.capture(newimage());
    console.log(this.getHTML());
    savecookie();
});
casper.run();

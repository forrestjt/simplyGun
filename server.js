console.log("Make sure to pass in the PORT as an argument to this file!");
console.log("If modules not found, run `npm install`!");
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 80;

var express = require('express');
var app = express();

var Gun = require('gun/gun');
require('gun/lib/wsp');
require('gun/lib/file');
require('./lib/gun.map');
var gun = Gun({
	file: 'state.json'
});

gun.attach(app);
app.use(express.static(__dirname)).listen(port);

gun.load("game").blank(function(){
	console.log("Initializing Game!");
	gun.set({title: "simplyGun",
		players: {} // {'banana': {x: -5, y: -5}, 'kiwi': {x: -4, y: -3}}
	}).key("game");
});

console.log('Server started on port ' + port + ' with /gun');

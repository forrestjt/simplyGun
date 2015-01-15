console.log("Make sure to pass in the PORT as an argument to this file!");
console.log("If modules not found, run `npm install`!");
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 80;

var express = require('express');
var app = express();

var Gun = require('gun/gun');
var wsp = require('gun/lib/wsp');
var file = require('gun/lib/file');
var gun = Gun({
	file: 'state.json'
});

gun.attach(app);
app.use(express.static(__dirname)).listen(port);

gun.load("game").blank(function(){
	gun.set({title: "simplyGun", players: {}}).key("game");
});

console.log('Server started on port ' + port + ' with /gun');

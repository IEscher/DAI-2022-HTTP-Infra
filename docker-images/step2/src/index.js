
/* Step (2a): App. node "dockerisée" */
//var Chance = require('chance');
//var chance = new Chance();

//console.log("Bonjour " + chance.name());

/* Step (2b): App. express "dockerisée" */
var Chance = require('chance');
var chance = new Chance();

var Express = require('express');
var app = Express();

var LISTENING_PORT = 3000;

app.get('/', function(req, res) {
//	res.send("Hello DAI");
	res.send( generateConfig() );
});

// After test, node test the full path
// So the order is not important
//app.get('/test', function(req, res) {
//	res.send("Hello DAI/test");
//});

app.listen(LISTENING_PORT, function() {
	console.log('Accepting HTTP request on port ' + LISTENING_PORT);
});

function generateConfig() {
	var nConfigs = chance.integer({
		min:  0,
		max: 10
	});
	console.log("Will generate " + nConfigs + " server configurations");
	var configs = [];
	var hosts = ["localhost", "smtp.tructruc.ch"];
	var encodings = ["ASCII", "UTF-8"];
	for (var i = 0; i < nConfigs; ++i) {
		var portHttp = chance.integer({
			min:     0,
			max: 65535
		});
		var portSmtp = chance.integer({
			min:          0,
			max: 2147483647
		});
		var host = hosts[ chance.integer({
			min: 0,
			max: 1
		}) ];
		var encoding = encodings[ chance.integer({
			min: 0,
			max: 1
		}) ];

		configs.push({
			config: {
				ip: host,
				encoding: encoding,
				portSMTP: portSmtp,
				portHTTP: portHttp
			}
		});
	}
	console.log(configs);
	return configs;
}

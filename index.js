var config = require('./config.json');
var lightState = require("node-hue-api").lightState;
var HueApi = require("node-hue-api").HueApi;

// server.js
var express         = require('express');
var app             = express();
var httpServer      = require("http").createServer(app);
var io              = require('socket.io')(httpServer);

var port = 3000;

var displayResults = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
		res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

//Socket connection handler
io.on('connection', function (socket) {
		// console.log(socket.id);

		socket.on('led:on', function (data) {
		  // console.log(data);
		  lightsValue(data);
		   // lightsOn();
		   console.log('Light Level ' + data + ' received');
		});

		socket.on('led:off', function (data) {
			lightsOff();
			console.log('LED OFF RECEIVED');

		});
	});

console.log('Waiting for connection');

var host = config.ip,
	username = config.username,
	api = new HueApi(host, username),
	lightId = 1,
	state = lightState.create().on().brightness(75);

function lightsValue(brightness) {
	if (brightness === '0') { // if brightness is zero turn off.
		state = lightState.create().off();
	} else { // otherwise run the brightness at the assigned value
		state = lightState.create().on().brightness(brightness);
	}

	api.setGroupLightState(lightId, state)
		.then(displayResults)
		.done();
}

function lightsOn() {
	api.setGroupLightState(lightId, state)
		.then(displayResults)
		.done();
}

function lightsOff() {
	api.setGroupLightState(lightId, lightState.create().off())
}

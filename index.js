var config = require('./config.json');
var lightState = require("node-hue-api").lightState;
var HueApi = require("node-hue-api").HueApi;
var convert = require('color-convert');

var displayResults = function(result) {
	console.log(JSON.stringify(result, null, 2));
};
var host = config.ip,
	username = config.username,
	api = new HueApi(host, username),
	lightId = 1,
	brightness = 75,
	state = lightState.create().on().brightness(brightness);

function lightsOn() {
	api.setGroupLightState(lightId, state)
		.then(displayResults)
		.done();
}

function lightsOff() {
	api.setGroupLightState(lightId, lightState.create().off())
}

function colorLight([r, g, b] = color) {
	state = lightState.create().on().brightness(brightness);
	api.setLightState(lightId, state.rgb(r, g, b))
		.then(displayResults)
		.done();
}

const { argv } = process;

if (argv[2]) {
	if (argv[2] === 'off') {
		lightsOff();
	} else if (argv[2] === 'on') {
		lightsOn();
	} else if (argv[2] === 'color') {
		var color = 'green';
		if (argv[3]) {
			color = argv[3];
		}

		colorLight(convert.keyword.rgb(color));
	}
}

const config = require('./config.json');
const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;

const displayResult = function(result) {
	console.log(JSON.stringify(result, null, 2));
};

const state = lightState.create();

const api = new HueApi(config.ip, config.username);

// api.setLightState(4, state.on().hsl(116, 100, 100))
// 	.then(displayResult)
// 	.done();

// api.lightStatus();



let a = 0;
setInterval(function () {
	if (a % 370 === 0) {
		a = 0;
	}

	api.setLightState(4, state.hsl(a, 100, 50))
		.then(displayResult)
		.done();

	console.log(a);
	a += 10;
}, 5000);

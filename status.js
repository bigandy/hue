const config = require('./config.json');
const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;

const displayResult = function(result) {
	console.log(JSON.stringify(result, null, 2));

	// for(let key in result.lights) {
	// 	const jsonResult = JSON.stringify(result.lights[key], null, 2);
	// 	console.log(jsonResult);
	// 	// if (jsonResult.state.reachable) {
	// 		// console.log(jsonResult);
	// 	// }
	// }
};

const state = lightState.create();

const api = new HueApi(config.ip, config.username);

api.setLightState(4, state.on())
	.then(displayResult)
	.done();

// let a = 0;
// setInterval(function () {
// 	if (a % 61 === 0) {
// 		a = 0;
// 	}
// 	console.log(a);
// 	a++;
// }, 100);

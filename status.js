var config = require('./config.json');
var HueApi = require("node-hue-api").HueApi;

var displayResult = function(result) {
	var lightOne = result.lights[1];
	var lightTwo = result.lights[2];

	// Visit non-inherited enumerable keys
	Object.keys(result).forEach(function(key) {
	    console.log(key, result[key]);
	});



	// console.log('Light One is ' + JSON.stringify(lightOne, null, 2) + ' level');
	// console.log('Light Two is ' + JSON.stringify(lightTwo, null, 2) + ' level');

	// console.log(lights);

    // console.log(JSON.stringify(result.lights[1].state.bri, null, 2));
};

var hostname = config.ip,
    username = config.username,
    api;

api = new HueApi(hostname, username);

// --------------------------
// Using a promise
api.getFullState().then(displayResult).done();
// or alias fullState()
// api.fullState().then(displayResult).done();

// --------------------------
// Using a callback
// api.getFullState(function(err, config) {
//     if (err) throw err;
//     displayResult(config);
// });
// // or alias fullState()
// api.fullState(function(err, config) {
//     if (err) throw err;
//     displayResult(config);
// });

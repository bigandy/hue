const config = require('./config.json');
const HueApi = require("node-hue-api").HueApi;

const displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

const api = new HueApi(config.ip, config.username);

// --------------------------
// Using a promise
api.lights()
    .then(displayResult)
    .done();

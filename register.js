var HueApi = require("node-hue-api").HueApi;
var config = require("./config.json");
var host = config.ip,
	userDescription = "node";

var displayUserResult = function(result) {
	console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
	console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(host, userDescription)
	.then(displayUserResult)
	.fail(displayError)
	.done();

// --------------------------
// Using a callback (with default description and auto generated username)
hue.createUser(host, function(err, user) {
	if (err) throw err;
	displayUserResult(user);
});

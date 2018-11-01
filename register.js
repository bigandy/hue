var HueApi = require("node-hue-api").HueApi;

var host = "192.168.1.24",
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

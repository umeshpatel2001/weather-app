const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=c2c609d070120ca969de4cb071b87126&query=${latitude},${longitude}&untis=f`;

	request({ url: url, json: true }, (error, responce) => {
		if (error) {
			callback("Unable to connect to location service ...", undefined);
		} else if (responce.body.error) {
			callback(
				"Unable to find location, try another location",
				undefined
			);
		} else {
			callback(undefined, {
				...responce.body.current,
			});
		}
	});
};

module.exports = forecast;

// pk.eyJ1IjoidW1lc2gtcGF0ZWwiLCJhIjoiY2t1MnJ1MnBvMG4xeTJxcWt4Y2V2MnJ0ZCJ9.sXjyZ7ZZ4_51TfKf3dAPVQ

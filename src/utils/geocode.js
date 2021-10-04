const request = require("request");

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoidW1lc2gtcGF0ZWwiLCJhIjoiY2t1MnJ1MnBvMG4xeTJxcWt4Y2V2MnJ0ZCJ9.sXjyZ7ZZ4_51TfKf3dAPVQ&limit=1`;

	request({ url: url, json: true }, (error, responce) => {
		if (error) {
			callback("Unable to connect to location service ...", undefined);
		} else if (responce.body.features.length === 0) {
			callback(
				"Unable to find location, try another location",
				undefined
			);
		} else {
			callback(undefined, {
				latitude: responce.body.features[0].center[1],
				longitude: responce.body.features[0].center[0],
				location: responce.body.features[0].place_name,
			});
		}
	});
};
module.exports = geocode;


// c2c609d070120ca969de4cb071b87126

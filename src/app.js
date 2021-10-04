const path = require("path");
const hbs = require("hbs");
const express = require("express");
const chalk = require("chalk");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { error } = require("console");

const app = express();

// define for path
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set for handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// set for static folder
app.use(express.static(publicPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Umesh",
	});
});
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Umesh",
		text: "This is some thing helpful text",
	});
});
app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Umesh",
	});
});
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		res.send({
			error: "Please provide address",
		});
		return;
	}
	geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
		if (error) {
			return res.send({
				error,
			});
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				});
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
	// res.send({ forcast: 30, location: req.query.address });
});
// This is wild card charrecter
app.get("*", (req, res) => {
	res.render("404", {
		title: "404 page",
		name: "Umesh",
		errorMessage: "Wrong URL",
	});
});
app.listen(3000, () => {
	console.log(chalk.yellow.bold("Server is running 🏃‍♂️🏃‍♀️"));
});

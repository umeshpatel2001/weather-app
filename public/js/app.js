"use strict";

const subButton = document.querySelector("button");
const inputTxt = document.querySelector("#input");
const para1 = document.querySelector("#para1");
const para2 = document.querySelector("#para2");

const getWeather = (value = "!") => {
	const url = `http://localhost:3000/weather?address=${value}`;

	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.error) {
				para2.innerText = "";
				para1.innerText = data.error;
			} else {
				para1.innerText = data.location;
                const img = document.createElement('img');
                img.src=data.forecast.weather_icons[0]
                para1.appendChild(img)
				para2.innerText = data.forecast.weather_descriptions[0];
				console.log(data);
			}
		});
};

subButton.addEventListener("click", (e) => {
	para1.innerText = "";
	para1.innerText = "Loding...";
	getWeather(inputTxt.value);
	inputTxt.value = "";
});

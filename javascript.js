//TEMPERATURE change
function change() {
	var tempConverter;
	var speedConverter;
	if($('#celsius')
		.attr('class') == 'metric') {
		//=====SET THE CONVERT VARIABLES
		tempConverter = ((Number($('#celsius')
				.text()
				.match(/[0-9]|\./g)
				.join(''))) * 1.8 + 32)
			.toFixed(2);
		speedConverter = ((Number($('#kmh')
				.text()
				.match(/[0-9]|\./g)
				.join(''))) * 0.621)
			.toFixed(2);
		//====CONVERTING THE CONTENT
		document.getElementById('temp')
			.innerHTML = ' Now it\'s <a id ="farenheit" class ="imperial">' + tempConverter + ' &deg;<a class = "changer" onclick ="change()" "">F</a></a> in your area.';
		document.getElementById('windspeed')
			.innerHTML = 'The wind speed is <a id = "mph" class = "imperial">' + speedConverter + '</a> mph.';
	}
	else if($('#farenheit')
		.attr('class') == 'imperial') {
		tempConverter = (((Number($('#farenheit')
				.text()
				.match(/[0-9]|\./g)
				.join(''))) - 32) * 5 / 9)
			.toFixed(2);
		speedConverter = ((Number($('#mph')
				.text()
				.match(/[0-9]|\./g)
				.join(''))) * 1.61)
			.toFixed(2);
		//====CONVERTING THE CONTENT
		document.getElementById('temp')
			.innerHTML = ' Now it\'s <a id ="celsius" class ="metric">' + tempConverter + ' &deg;<a class = "changer" onclick ="change()" "">C</a></a> in your area.';
		document.getElementById('windspeed')
			.innerHTML = 'The wind speed is <a id = "kmh" class = "metric">' + speedConverter + '</a> km/h.';
	}
}
// ====NAMES FOR LATTITUDE AND LONGITUDE
var userLat;
var userLon;
var api;
// ====SET LAT AND LON TO CURRENT GEOPOSITION COORDINATES
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = "lat=" + position.coords.latitude;
		userLon = "&lon=" + position.coords.longitude;
		api = 'https://fcc-weather-api.glitch.me/api/current?' + userLat + userLon;
		// =========AJAX REQUEST
		$.getJSON(api, function(json) {
			document.getElementById('location')
				.innerHTML = 'Your Location: <br>' + json.name + ', ' + json.sys.country;
			document.getElementById('description')
				.innerHTML = json.weather[0].description;
			document.getElementById('icon')
				.innerHTML = '<img src = "' + json.weather[0].icon + '" alt = "temperature icon style ">';
			document.getElementById('temp')
				.innerHTML = ' Now it\'s <a id ="celsius" class ="metric">' + json.main.temp + ' &deg;<a class = "changer" onclick ="change()" "">C</a></a> in your area.';
			document.getElementById('humidity')
				.innerHTML = 'Humidity is at ' + json.main.humidity + '%.';
			document.getElementById('windspeed')
				.innerHTML = 'The wind speed is <a id = "kmh" class = "metric">' + json.wind.speed + '</a> km/h.';
		});
	});
}
else {
	alert('Oops! Your broswer doesn\'t supports geolocation');
}

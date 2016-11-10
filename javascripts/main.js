"use strict";

let apiKeys = {};

let weatherSearch = (searchText) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response) => {
        apiKeys = response;
        let authHeader = apiKeys.client_id;
        console.log("authHeader", authHeader);

        $.ajax({
        method: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText},us&units=metric&APPID=${authHeader}`
      }).then((response2)=>{
      	console.log("response2", response2);
        resolve(response2);
      }, (errorResponse2) => {
        reject(errorResponse2);
      });
    }, (errorResponse) =>{
    	console.log("errorResponse", errorResponse);
      reject(errorResponse);
    });
  });
};

$(document).ready(function() {
    // check if zip is 5 digits or 9 a fire alert if either
    function checkZipCode(value) {
     return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
    }

    $('#clicky-button').on('click', function (e) {
       e.preventDefault();
       $('#clicky-button');
       var value = $('#zip').val();
       console.log("value", value);
       if (checkZipCode(value)) {
           alert('valid zip');
       } else {
           alert('invalid zip');
       }
        weatherSearch(value).then((dataFromWeather)=>{
      	$('#clicky-button').button('reset');
    		console.log("dataFromWeather", dataFromWeather);

        var weather = `<div>${dataFromWeather.name}'s current weather is:</div>`;
        weather += `<div>Temperature: ${dataFromWeather.main.temp * 100}</div>`;
        weather += `<div>Conditions: ${dataFromWeather.weather[0].description}</div>`;
        weather += `<div>Air Pressure: ${dataFromWeather.main.pressure}</div>`;
        weather += `<div>Wind Speed: ${dataFromWeather.wind.speed}</div>`;
        weather += `<button>Next Three Days</button>`;
        weather += `<button>Next Seven Days</button>`;
  	    $('#output').append(weather);
    });

    });
});

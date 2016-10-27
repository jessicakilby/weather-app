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
       if (checkZipCode(value)) {
           alert('valid zip');
       } else {
           alert('invalid zip');
       }
   weatherSearch(value);
   });
});
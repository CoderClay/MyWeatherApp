function geoLocateMe() {
  var output = document.getElementById("info-display");

  if (!navigator.geolocation) {
    output.innerHTML = "<h1>Youre browser is not supported!</h1>";
    return;
  }

  function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var weatherJSON = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=c800859dca214b3c26f48def82083151';


//Function to get JSON, convert from Kelvin to Celsius and Fahrenheit; and choose display picture.
      $.getJSON(weatherJSON, function(json) {
        var   weatherData = json,
              mainWeather = weatherData.weather[0].description,
              kelvin = weatherData.main.temp,
              celsius = Math.floor(kelvin - 273.15),
              fahrenheit = Math.floor(celsius * 9 / 5 + 32),
              celToFahrMessage = "Returned " + celsius + " celsius and converted it to " + fahrenheit + " fahrenheit.",
              tempMessage = "Your local temperature is " + fahrenheit + " Fahrenheit.",
              photoDisplay = document.getElementById("photo-display"),
              jsonDisplay = document.getElementById("json-display");
        jsonDisplay.innerHTML = "<h1>" + tempMessage + mainWeather + "</h1>";
        if (fahrenheit > 50) {
          photoDisplay.innerHTML = "<img class=\"weather-pic\" src=\"photos/sunnyDay.jpg\"/>";
        } else {
          photoDisplay.innerHTML = "<img class=\"weather-pic\" src=\"photos/coldDay.jpg\"/>";
        }
        console.log(celToFahrMessage);
        console.log(photoDisplay);

      });


      output.innerHTML = '<h1 style="color: black; background-color: rgba(199, 236, 193, 0.58)">Your latitude is ' + latitude + ' and <br>your longitude is ' + longitude +'</h1>';
      console.log(output);
      // var img = new Image();
      // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
      //
      // output.appendChild(img);

  }

  function error() {
    output.innerHTML = 'Couldnt find you...SOWWWY!';
  }

  output.innerHTML = '<h1>where are you...hmmmmm</h1>';

  navigator.geolocation.getCurrentPosition(success, error);

}


function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#number-degrees");
  let dateElement = document.querySelector("#date");
  let city = document.querySelector("h1");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = currentTemperature;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `${response.data.main.humidity}`;
  windSpeed.innerHTML = `${wind}`;
  var degrees = "Celsius";
  function convertCelsius(event) {
    event.preventDefault();
    if (degrees === "Celsius") {
      return;
    } else {
      let temperature = document.querySelector("#number-degrees");
      temperature.innerHTML = currentTemperature;
      degrees = "Celsius";
    }
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
  }

  function convertFahrenheit(event) {
    event.preventDefault();
    if (degrees === "Fahrenheit") {
      return;
    } else {
      let temperatureElement = document.querySelector("#number-degrees");

      currentTemperature = Number(currentTemperature);
      temperatureElement.innerHTML = `${Math.round(
        (currentTemperature * 9) / 5 + 32
      )}`;
      degrees = "Fahrenheit";
    }
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
  }

  let degreesInCelsius1 = document.querySelector("#celsius");
  degreesInCelsius1.addEventListener("click", convertCelsius);
  let degreesInFahrenheit1 = document.querySelector("#fahrenheit");
  degreesInFahrenheit1.addEventListener("click", convertFahrenheit);
}
function searchCity(city) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  
}

function currentGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentGeolocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

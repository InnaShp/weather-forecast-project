function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
    "Saturday"
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function showWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#number-degrees");
  temperatureElement.innerHTML = currentTemperature;

  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
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
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl)
}

function currentGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formattedDate(currentTime);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentGeolocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

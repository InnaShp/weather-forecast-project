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
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
      `
        <div class="col next-day-forecast">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
        </div>
      `;
    } 
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  

}

function displayWeeklyForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    };
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeekendForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (formatDay(forecastDay.dt) === "Sunday" || formatDay(forecastDay.dt) === "Saturday" && index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    };
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = ["00.00","01.00","02.00","03.00","04.00","05.00","06.00","07.00","08.00","09.00", "10.00","11.00","12.00","13.00","14.00","15.00","16.00","17.00","18.00","19.00","20.00","21.00","22.00","23.00"];
  return hours[hour];
}
function displayHourlyForecast (response) {
  let forecast = response.data.hourly;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  let next = document.querySelector("#next-hours");  
  next = `<a href="#" class="next-hours"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
    </svg></a>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 8 ) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col next-day-forecast">
            <div class="weather-forecast-date">${formatHour(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures"> ${Math.round(forecastDay.temp)}° </div>
          </div>
        `;
    };
  });
  forecastHTML = forecastHTML  + `</div>` + next;
  forecastElement.innerHTML = forecastHTML;
 
}

function getForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function getWeeklyForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast)
}
function getWeekendForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeekendForecast)
}
function getHourlyForecast(coordinates) {
  let apiKey = "9ad78e7db9272efcf0a75aa55efdcd5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast)
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
  let iconElement = document.querySelector("#icon");
  let weekly = document.querySelector("#weekly");
  let fiveDays = document.querySelector("#five-days-forecast");
  let weekend = document.querySelector("#weekend");
  let hourly = document.querySelector("#hourly");
  temperatureElement.innerHTML = currentTemperature;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `${response.data.main.humidity}`;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windSpeed.innerHTML = `${wind}`;
  getForecast(response.data.coord);
  weekly.addEventListener("click", function handleWeeklyForecast(event) {
    event.preventDefault();
    getWeeklyForecast(response.data.coord);
  });
  fiveDays.addEventListener("click", function getFiveDaysForecast(event) {
    event.preventDefault();
    getForecast(response.data.coord);
  });
  weekend.addEventListener("click", function handleWeekendForecast(event) {
    event.preventDefault();
    getWeekendForecast(response.data.coord);
  });
  hourly.addEventListener("click", function handleHourlyForecast(event) {
    event.preventDefault();
    getHourlyForecast(response.data.coord);
  });
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
searchCity("Lviv");








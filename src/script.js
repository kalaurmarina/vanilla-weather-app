//change Day and Time
let currentDate = new Date();

let timeElement = document.querySelector("h2");

function formatDate(date) {
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

  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}

timeElement.innerHTML = formatDate(currentDate);


//change City
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  cityElement.innerHTML = searchInput.value;
}
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", search);


//change Celsius to Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}


//show City and Location 
function showTemperature(event) {
  let celsius = Math.round(event.data.main.temp);
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  temperatureValue(celsius);
  console.log(event.data);
  
  let h1City = document.querySelector("#city");
  h1City.innerHTML = event.data.name;

  let weatherDescription = document.querySelector("#weather-descr");
  weatherDescription.innerHTML = event.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(event.data.main.humidity)} %`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(event.data.wind.speed)} m/h`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${Math.round(event.data.main.pressure)} hPa`;
}

function temperatureValue(newTemperature) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = newTemperature;
}

function unitValue(newUnitTemperature) {
  let unit = document.querySelector("#unit-temperature");
  unit.innerHTML = newUnitTemperature``;
}

function changeUnitToFahrenheit() {
  unitValue("℉");
}
let unitTemperatureC = document.querySelector("#fahrenheit-link");
unitTemperatureC.addEventListener("click", changeUnitToFahrenheit);

function changeUnitToCelsius() {
  unitValue("℃");
}
let unitTemperatureF = document.querySelector("#celsius-link");
unitTemperatureF.addEventListener("click", changeUnitToCelsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "031949a0d7d7edd934eeada2bf7732aa";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonMyLocation = document.querySelector("#current-loc");
buttonMyLocation.addEventListener("click", getCurrentPosition);


///Search for city
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchInput.value = firstUpper(searchInput.value.trim());

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "031949a0d7d7edd934eeada2bf7732aa";
  let apiUrl = `${apiEndpoint}?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let h1City = document.querySelector("#city");
  if (searchInput.value) {
    // h1City.innerHTML = `${searchInput.value}`;
  } else {
    h1City.innerHTML = null;
    temperatureValue(null);
    alert("Please enter a city");
  }
}

let searchFormCity = document.querySelector("#search-city");
searchFormCity.addEventListener("submit", searchCity);

function firstUpper(city) {
  if (!city) return city;
  return city
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}



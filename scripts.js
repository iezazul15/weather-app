// Importing the API key from the config.js file
import { API_KEY } from "./config.js";

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Default city to use if geolocation fails
const city = "Dhaka";

// Selecting elements from the DOM
const searchInput = document.getElementById("search-input"); // Input field for city search
const btn = document.getElementById("btn"); // Button for searching weather by city name
const btnCurrentLocation = document.getElementById("btn-current-location"); // Button for fetching current location weather
const weatherBox = document.querySelector(".weather-box"); // Container to display weather data

/**
 * Generates HTML content to display weather data.
 * @param {Object} data - Weather data fetched from API
 * @returns {string} - HTML string with formatted weather details
 */
const getData = (data) => {
  return `
    <div class="weather-info">
      <img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" alt="weather icon">
      <h1>${Number.parseInt(data.main.temp)}°C</h1>
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].main}</p>
    </div>

    <div class="weather-details">
      <div class="detail">
        <i class="fa-solid fa-temperature-half"></i>
        <div>
          <p>Feels Like</p>
          <span>${data.main.feels_like}°C</span>
        </div>
      </div>
      <div class="detail">
        <i class="fa-solid fa-droplet"></i>
        <div>
          <p>Humidity</p>
          <span>${data.main.humidity}%</span>
        </div>
      </div>
      <div class="detail">
        <i class="fa-solid fa-wind"></i>
        <div>
          <p>Wind Speed</p>
          <span>${data.wind.speed} km/h</span>
        </div>
      </div>
      <div class="detail">
        <i class="fa-solid fa-gauge-high"></i>
        <div>
          <p>Pressure</p>
          <span>${data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  `;
};

/**
 * Fetches weather data from the API and updates the weatherBox element.
 * @param {string} url - API request URL
 */
function handleFetch(url) {
  fetch(url)
    .then((res) => res.json()) // Convert response to JSON
    .then((data) => {
      weatherBox.innerHTML = getData(data); // Update UI with fetched weather data
    })
    .catch((e) => {
      console.log(e); // Log errors if any occur
      alert("City not found");
    });
}

/**
 * Gets the user's current location using Geolocation API.
 * If location access is granted, fetches weather for that location.
 * If denied, fetches weather for the default city.
 */
function navigatorGeolocation() {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      // If location is obtained, fetch weather based on latitude & longitude
      handleFetch(
        `${BASE_URL}?lat=${s.coords.latitude}&lon=${s.coords.longitude}&appid=${API_KEY}&units=metric`
      );
    },
    (e) => {
      // If location access is denied, fetch weather for default city
      handleFetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    }
  );
}

// 📌 Event Listeners

// Event: Click on search button → Fetch weather for entered city
btn.addEventListener("click", function () {
  const value = searchInput.value; // Get city name from input
  handleFetch(`${BASE_URL}?q=${value}&appid=${API_KEY}&units=metric`); // Fetch weather data
});

// Event: Load the page → Automatically fetch weather (via Geolocation or Default City)
window.addEventListener("load", function () {
  navigatorGeolocation(); // Call function to get location-based weather
});

// Event: Click on "Current Location" button → Fetch weather for current location
btnCurrentLocation.addEventListener("click", function () {
  navigatorGeolocation(); // Call function to get location-based weather
  searchInput.value = ""; // Clear search input field
});

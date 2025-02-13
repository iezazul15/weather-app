import { API_KEY } from "./config.js";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const city = "Dhaka";

const searchInput = document.getElementById("search-input");
const btn = document.getElementById("btn");
const btnCurrentLocation = document.getElementById("btn-current-location");
const weatherBox = document.querySelector(".weather-box");

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

function handleFetch(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weatherBox.innerHTML = getData(data);
    })
    .catch((e) => console.log(e));
}

function navigatorGeolocation() {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      handleFetch(
        `${BASE_URL}?lat=${s.coords.latitude}&lon=${s.coords.longitude}&appid=${API_KEY}&units=metric`
      );
    },
    (e) => {
      handleFetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    }
  );
}

btn.addEventListener("click", function () {
  const value = searchInput.value;
  handleFetch(`${BASE_URL}?q=${value}&appid=${API_KEY}&units=metric`);
});

window.addEventListener("load", function () {
  navigatorGeolocation();
});

btnCurrentLocation.addEventListener("click", function () {
  navigatorGeolocation();
  searchInput.value = "";
});

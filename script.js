const apiKey = "/* cannot display api here. */";

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
  }, () => {
    alert("Unable to get your location.");
  });
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const display = document.getElementById("weatherDisplay");
      if (data.cod !== 200) {
        display.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
      }

      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
      display.innerHTML = weatherHTML;
    })
    .catch(err => {
      document.getElementById("weatherDisplay").innerHTML = `<p>Failed to fetch weather data.</p>`;
      console.error(err);
    });
}

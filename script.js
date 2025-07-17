const apiKey = 'c66653f943680754ab2a55b063b06da6'; // Replace with your OpenWeatherMap API key

document.getElementById('weather-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const city = document.getElementById('city-input').value;
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const resultDiv = document.getElementById('weather-result');
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Weather:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      `;
    })
    .catch(err => {
      document.getElementById('weather-result').innerHTML = `<p style="color: red;">${err.message}</p>`;
    });
}

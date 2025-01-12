// script.js
import config from './config.js';   
const apiKey = config.apiKey; // Replace with your OpenWeather API key
document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const city = document.getElementById('city').value;
    const weatherDetails = document.getElementById('weather-details');

    if (!city) {
        weatherDetails.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        weatherDetails.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} &#8451;</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherDetails.innerHTML = '<p>Unable to fetch weather details. Please try again.</p>';
    }
});
const apiKey = '69bff3cf3d5497fe617ac49274dc2634'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();

    // Check if city input is empty
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Construct the URL with the city, API key, and units (metric for Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the full response for debugging

            if (data.cod === 200) {
                // Update the UI with the fetched weather data
                document.getElementById('cityName').innerText = data.name;
                document.getElementById('temperature').innerText = `${data.main.temp}°C`;
                document.getElementById('description').innerText = data.weather[0].description;
                document.getElementById('humidity').innerText = `${data.main.humidity}%`;
                document.getElementById('windSpeed').innerText = `${data.wind.speed} km/h`;

                const sunriseTime = new Date(data.sys.sunrise * 1000);
                const sunsetTime = new Date(data.sys.sunset * 1000);
                document.getElementById('sunrise').innerText = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                document.getElementById('sunset').innerText = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                alert('City not found, please try again!');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to retrieve weather data.');
        });
}

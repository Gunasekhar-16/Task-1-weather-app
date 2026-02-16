async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "❌ Please enter a city name";
        return;
    }

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "❌ City not found";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        result.innerHTML = `
            🌍 City: <b>${city}</b><br>
            🌡 Temperature: ${weatherData.current_weather.temperature}°C<br>
            💨 Wind Speed: ${weatherData.current_weather.windspeed} km/h
        `;
    } catch (error) {
        result.innerHTML = "⚠️ Error fetching data";
    }
}

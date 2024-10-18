async function fetchWeather(city) {
    const apiKey = 'b728d599517da7376665ddde98f095f0';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error(`Error fetching ${city} weather: ${response.statusText}`);
    }
    return response.json();
}

async function displayWeather() {
    try {
        const helsinkiWeather = await fetchWeather('Helsinki');
        document.getElementById('helsinki-temp').textContent = helsinkiWeather.main.temp;
        document.getElementById('helsinki-condition').textContent = helsinkiWeather.weather[0].description;

        const tampereWeather = await fetchWeather('Tampere');
        document.getElementById('tampere-temp').textContent = tampereWeather.main.temp;
        document.getElementById('tampere-condition').textContent = tampereWeather.weather[0].description;

        const ouluWeather = await fetchWeather('Oulu');
        document.getElementById('oulu-temp').textContent = ouluWeather.main.temp;
        document.getElementById('oulu-condition').textContent = ouluWeather.weather[0].description;

        const rovaniemiWeather = await fetchWeather('Rovaniemi');
        document.getElementById('rovaniemi-temp').textContent = rovaniemiWeather.main.temp;
        document.getElementById('rovaniemi-condition').textContent = rovaniemiWeather.weather[0].description;

    } catch (error) {
        console.error(error);
    }
}
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); 

window.onload = displayWeather;

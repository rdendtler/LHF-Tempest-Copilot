// Weather API Configuration
// Note: This API token is intentionally client-side accessible as it's a read-only
// token for a personal weather station. Tempest API tokens are designed for this use.
// The token only allows reading data from your specific station.
// Replace YOUR_STATION_ID with your actual Tempest station ID
const TEMPEST_CONFIG = {
    stationId: '142632', // Replace with your station ID
    apiToken: '8bbac51c-64fc-4f20-9000-dea6c4b8e17c',
    apiUrl: 'https://swd.weatherflow.com/swd/rest/observations/station/'
};

// Cache for weather data
let weatherData = null;
let lastUpdate = null;

/**
 * Fetch weather data from Tempest API
 */
async function fetchWeatherData() {
    try {
        const url = `${TEMPEST_CONFIG.apiUrl}${TEMPEST_CONFIG.stationId}?token=${TEMPEST_CONFIG.apiToken}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        weatherData = data;
        lastUpdate = new Date();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Return mock data for development/demo purposes
        return getMockWeatherData();
    }
}

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

/**
 * Mock weather data for development/demo purposes
 */
function getMockWeatherData() {
    return {
        obs: [{
            timestamp: Date.now() / 1000,
            air_temperature: 29.4,     // °C (85°F)
            relative_humidity: 65,     // %
            station_pressure: 29.92,   // inHg
            wind_avg: 5,               // mph
            wind_gust: 8,              // mph
            wind_direction: 180,       // degrees
            precipitation_type: 0,
            solar_radiation: 800,      // W/m²
            uv: 5,
            feels_like: 32.2          // °C (90°F)
        }]
    };
}

/**
 * Calculate wet bulb temperature using the simplified formula
 * This is an approximation suitable for typical conditions
 * 
 * @param {number} temperature - Air temperature in °F
 * @param {number} humidity - Relative humidity in %
 * @returns {number} Wet bulb temperature in °F
 */
function calculateWetBulbTemperature(temperature, humidity) {
    // Convert to Celsius for calculation
    const tempC = (temperature - 32) * 5 / 9;
    const rh = humidity / 100;
    
    // Simplified wet bulb formula (Stull, 2011)
    // Tw = T * atan(0.151977 * sqrt(RH% + 8.313659)) + 
    //      atan(T + RH%) - atan(RH% - 1.676331) + 
    //      0.00391838 * RH%^(3/2) * atan(0.023101 * RH%) - 4.686035
    
    const wetBulbC = tempC * Math.atan(0.151977 * Math.sqrt(rh * 100 + 8.313659)) +
                     Math.atan(tempC + rh * 100) -
                     Math.atan(rh * 100 - 1.676331) +
                     0.00391838 * Math.pow(rh * 100, 1.5) * Math.atan(0.023101 * rh * 100) -
                     4.686035;
    
    // Convert back to Fahrenheit
    return wetBulbC * 9 / 5 + 32;
}

/**
 * Determine if it's too hot to ride based on wet bulb temperature
 * 
 * @param {number} wetBulbTemp - Wet bulb temperature in °F
 * @returns {object} Riding status object
 */
function getRidingStatus(wetBulbTemp) {
    // Wet bulb temperature thresholds for riding safety
    // Based on heat stress guidelines
    if (wetBulbTemp < 70) {
        return {
            status: 'safe',
            message: 'Safe to Ride',
            description: 'Conditions are comfortable for riding.'
        };
    } else if (wetBulbTemp < 80) {
        return {
            status: 'caution',
            message: 'Ride with Caution',
            description: 'Conditions are warm. Stay hydrated and take breaks.'
        };
    } else {
        return {
            status: 'danger',
            message: 'Too Hot to Ride',
            description: 'Dangerous heat conditions. Avoid strenuous outdoor activity.'
        };
    }
}

/**
 * Get weather icon based on conditions
 */
function getWeatherIcon(type) {
    const icons = {
        temperature: '🌡️',
        humidity: '💧',
        wind: '💨',
        pressure: '⏱️',
        rain: '🌧️',
        sun: '☀️',
        cloud: '☁️',
        storm: '⛈️'
    };
    return icons[type] || '📊';
}

/**
 * Update the weather summary on the main page
 */
function updateWeatherSummary(data) {
    const summaryElement = document.getElementById('weather-summary');
    
    if (!data || !data.obs || data.obs.length === 0) {
        summaryElement.innerHTML = '<div class="error">Unable to load weather data</div>';
        return;
    }
    
    const obs = data.obs[0];
    const temp = celsiusToFahrenheit(obs.air_temperature);
    const humidity = obs.relative_humidity;
    const windSpeed = obs.wind_avg;
    const windGust = obs.wind_gust;
    
    summaryElement.innerHTML = `
        <div class="weather-item">
            <div class="icon">${getWeatherIcon('temperature')}</div>
            <div class="label">Temperature</div>
            <div class="value">${temp.toFixed(1)}<span class="unit">°F</span></div>
        </div>
        <div class="weather-item">
            <div class="icon">${getWeatherIcon('humidity')}</div>
            <div class="label">Humidity</div>
            <div class="value">${humidity.toFixed(0)}<span class="unit">%</span></div>
        </div>
        <div class="weather-item">
            <div class="icon">${getWeatherIcon('wind')}</div>
            <div class="label">Wind Speed</div>
            <div class="value">${windSpeed.toFixed(1)}<span class="unit">mph</span></div>
        </div>
        <div class="weather-item">
            <div class="icon">🌪️</div>
            <div class="label">Wind Gust</div>
            <div class="value">${windGust.toFixed(1)}<span class="unit">mph</span></div>
        </div>
    `;
}

/**
 * Update weather cards on the main page
 */
function updateWeatherCards(data) {
    const cardsElement = document.getElementById('weather-cards');
    
    if (!cardsElement || !data || !data.obs || data.obs.length === 0) {
        return;
    }
    
    const obs = data.obs[0];
    const pressure = obs.station_pressure;
    const solarRad = obs.solar_radiation;
    const uv = obs.uv;
    const precipType = obs.precipitation_type;
    
    // Calculate dew point (use Celsius directly from API)
    const tempC = obs.air_temperature;
    const humidity = obs.relative_humidity;
    const dewPointC = tempC - ((100 - humidity) / 5);
    const dewPoint = celsiusToFahrenheit(dewPointC);
    
    cardsElement.innerHTML = `
        <div class="weather-card">
            <div class="card-icon">⏱️</div>
            <h4>Barometric Pressure</h4>
            <div class="card-value">${pressure.toFixed(2)} inHg</div>
            <div class="card-description">Current atmospheric pressure</div>
        </div>
        
        <div class="weather-card">
            <div class="card-icon">☀️</div>
            <h4>UV Index</h4>
            <div class="card-value">${uv.toFixed(0)}</div>
            <div class="card-description">${getUVDescription(uv)} exposure level</div>
        </div>
        
        <div class="weather-card">
            <div class="card-icon">💧</div>
            <h4>Dew Point</h4>
            <div class="card-value">${dewPoint.toFixed(1)}°F</div>
            <div class="card-description">Moisture saturation point</div>
        </div>
    `;
}

/**
 * Get UV index description
 */
function getUVDescription(uv) {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Moderate';
    if (uv < 8) return 'High';
    if (uv < 11) return 'Very High';
    return 'Extreme';
}

/**
 * Update the riding indicator on the main page
 */
function updateRidingIndicator(data) {
    const indicatorElement = document.getElementById('riding-indicator');
    
    if (!data || !data.obs || data.obs.length === 0) {
        indicatorElement.innerHTML = '<div class="error">Unable to calculate riding conditions</div>';
        return;
    }
    
    const obs = data.obs[0];
    const temp = celsiusToFahrenheit(obs.air_temperature);
    const humidity = obs.relative_humidity;
    
    const wetBulbTemp = calculateWetBulbTemperature(temp, humidity);
    const ridingStatus = getRidingStatus(wetBulbTemp);
    
    indicatorElement.innerHTML = `
        <div class="riding-status ${ridingStatus.status}">
            ${ridingStatus.message}
        </div>
        <div class="riding-details">
            ${ridingStatus.description}<br>
            Wet Bulb Temperature: ${wetBulbTemp.toFixed(1)}°F
        </div>
    `;
}

/**
 * Initialize the weather display on page load
 */
async function initializeWeather() {
    const data = await fetchWeatherData();
    
    // Update main page elements if they exist
    if (document.getElementById('weather-summary')) {
        updateWeatherSummary(data);
    }
    
    if (document.getElementById('riding-indicator')) {
        updateRidingIndicator(data);
    }
    
    if (document.getElementById('weather-cards')) {
        updateWeatherCards(data);
    }
}

// Auto-refresh weather data every 5 minutes
setInterval(async () => {
    await initializeWeather();
}, 5 * 60 * 1000);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWeather);
} else {
    initializeWeather();
}

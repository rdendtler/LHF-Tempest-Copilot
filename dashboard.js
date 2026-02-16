/**
 * Dashboard-specific functionality
 */

/**
 * Get wind direction name from degrees
 */
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
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
 * Get precipitation type description
 */
function getPrecipitationType(type) {
    const types = ['None', 'Rain', 'Hail', 'Rain + Hail'];
    return types[type] || 'Unknown';
}

/**
 * Update the dashboard with detailed weather information
 */
function updateDashboard(data) {
    const dashboardElement = document.getElementById('dashboard-content');
    
    if (!data || !data.obs || data.obs.length === 0) {
        dashboardElement.innerHTML = '<div class="error">Unable to load weather data</div>';
        return;
    }
    
    const obs = data.obs[0];
    const temp = obs.air_temperature;
    const humidity = obs.relative_humidity;
    const pressure = obs.station_pressure;
    const windSpeed = obs.wind_avg;
    const windGust = obs.wind_gust;
    const windDir = obs.wind_direction;
    const precipType = obs.precipitation_type;
    const solarRad = obs.solar_radiation;
    const uv = obs.uv;
    const feelsLike = obs.feels_like;
    
    // Calculate wet bulb temperature
    const wetBulbTemp = calculateWetBulbTemperature(temp, humidity);
    
    // Calculate dew point (approximation)
    const tempC = (temp - 32) * 5 / 9;
    const dewPointC = tempC - ((100 - humidity) / 5);
    const dewPoint = dewPointC * 9 / 5 + 32;
    
    // Get timestamp
    const timestamp = new Date(obs.timestamp * 1000);
    const timeStr = timestamp.toLocaleTimeString();
    
    dashboardElement.innerHTML = `
        <div class="dashboard-card">
            <h4>Temperature</h4>
            <div class="value">${temp.toFixed(1)}°F</div>
            <div class="description">Current air temperature</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Feels Like</h4>
            <div class="value">${feelsLike.toFixed(1)}°F</div>
            <div class="description">Perceived temperature</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Wet Bulb Temperature</h4>
            <div class="value">${wetBulbTemp.toFixed(1)}°F</div>
            <div class="description">Heat stress indicator</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Dew Point</h4>
            <div class="value">${dewPoint.toFixed(1)}°F</div>
            <div class="description">Moisture in the air</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Humidity</h4>
            <div class="value">${humidity.toFixed(0)}%</div>
            <div class="description">Relative humidity</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Barometric Pressure</h4>
            <div class="value">${pressure.toFixed(2)}</div>
            <div class="description">inHg</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Wind Speed</h4>
            <div class="value">${windSpeed.toFixed(1)}</div>
            <div class="description">mph average</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Wind Gust</h4>
            <div class="value">${windGust.toFixed(1)}</div>
            <div class="description">mph maximum</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Wind Direction</h4>
            <div class="value">${getWindDirection(windDir)}</div>
            <div class="description">${windDir}° from north</div>
        </div>
        
        <div class="dashboard-card">
            <h4>UV Index</h4>
            <div class="value">${uv.toFixed(0)}</div>
            <div class="description">${getUVDescription(uv)}</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Solar Radiation</h4>
            <div class="value">${solarRad}</div>
            <div class="description">W/m²</div>
        </div>
        
        <div class="dashboard-card">
            <h4>Precipitation</h4>
            <div class="value">${getPrecipitationType(precipType)}</div>
            <div class="description">Current conditions</div>
        </div>
        
        <div class="dashboard-card" style="grid-column: 1 / -1;">
            <h4>Last Update</h4>
            <div class="value" style="font-size: 1.5rem;">${timeStr}</div>
            <div class="description">${timestamp.toLocaleDateString()}</div>
        </div>
    `;
}

// Initialize dashboard on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        if (weatherData) {
            updateDashboard(weatherData);
        } else {
            const data = await fetchWeatherData();
            updateDashboard(data);
        }
    });
} else {
    if (weatherData) {
        updateDashboard(weatherData);
    }
}

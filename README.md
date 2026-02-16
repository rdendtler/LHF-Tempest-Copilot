# Little Hill Farm - Weather Station Website

A static website displaying current weather conditions from your Tempest Weather Station, including a "Too Hot to Ride" indicator based on wet bulb temperature calculations.

## Features

- **Main Page (index.html)**
  - Current weather summary with temperature, humidity, and wind conditions
  - "Too Hot to Ride" indicator using wet bulb temperature method
  - Clean, responsive design

- **Weather Dashboard (dashboard.html)**
  - Comprehensive weather metrics including:
    - Temperature and feels-like temperature
    - Wet bulb temperature (heat stress indicator)
    - Dew point
    - Humidity
    - Barometric pressure
    - Wind speed, gusts, and direction
    - UV index
    - Solar radiation
    - Precipitation status
  - Real-time updates every 5 minutes

## Quick Start

1. **Configure Your Station**
   - Edit `weather.js` and replace `YOUR_STATION_ID` with your Tempest station ID
   - The API token is already configured
   - See [CONFIG.md](CONFIG.md) for detailed setup instructions

2. **Deploy to GitHub Pages**
   - This repository is configured for automatic deployment to GitHub Pages
   - Once merged to `main` branch, the site will be available at: `https://rdendtler.github.io/LHF-Tempest-Copilot/`
   - The GitHub Actions workflow will automatically deploy on every push to `main`
   - Alternative: Upload files to any static web hosting (Netlify, Vercel, etc.)

3. **Customize**
   - Adjust "Too Hot to Ride" thresholds in `weather.js`
   - Modify colors and styling in `styles.css`

## Files

- `index.html` - Main landing page
- `dashboard.html` - Detailed weather dashboard
- `styles.css` - Styling for all pages
- `weather.js` - Core weather data fetching and wet bulb calculations
- `dashboard.js` - Dashboard-specific functionality
- `CONFIG.md` - Detailed configuration guide

## Wet Bulb Temperature Method

This website uses the wet bulb temperature method (not heat index) to determine riding safety. Wet bulb temperature is a more accurate indicator of heat stress because it accounts for both temperature and humidity in relation to the body's ability to cool through evaporation.

**Safety Thresholds:**
- Below 70°F: Safe to ride
- 70-80°F: Ride with caution (stay hydrated)
- Above 80°F: Too hot to ride (dangerous conditions)

## Requirements

- Tempest Weather Station with API access
- Modern web browser
- Internet connection (for fetching weather data)

## Support

For detailed setup instructions, see [CONFIG.md](CONFIG.md).

## License

MIT License - Feel free to use and modify for your own farm or weather station!

# Quick Setup Guide for Little Hill Farm Weather Website

## ✅ What's Already Done

Your website is fully built and ready to deploy! Here's what's included:

- ✅ Modern rustic design with warm neutrals and clean typography
- ✅ Main page with current weather and riding conditions
- ✅ Detailed weather dashboard
- ✅ Wet bulb temperature calculation for heat stress
- ✅ Mobile-responsive design
- ✅ Auto-refresh every 5 minutes
- ✅ API key configured: `8bbac51c-64fc-4f20-9000-dea6c4b8e17c`

## 🔧 One Step Remaining

You just need to add your **Tempest Station ID** to complete the setup.

### How to Find Your Station ID:

**Option 1: Use the Tempest API** (Easiest)
```bash
curl "https://swd.weatherflow.com/swd/rest/stations?token=8bbac51c-64fc-4f20-9000-dea6c4b8e17c"
```

This will return JSON with your station information. Look for `"station_id"`.

**Option 2: From Tempest App**
1. Open Tempest app
2. Go to Settings → Stations
3. Select your station
4. Note the Station ID number

**Option 3: From Tempest Website**
1. Log in to https://tempestwx.com
2. Click on your station
3. The station ID is in the URL or settings

### Update the Configuration:

Edit `weather.js` (line 7) and replace `'YOUR_STATION_ID'` with your actual station ID:

```javascript
const TEMPEST_CONFIG = {
    stationId: '12345',  // Replace with your actual station ID number
    apiToken: '8bbac51c-64fc-4f20-9000-dea6c4b8e17c',
    apiUrl: 'https://swd.weatherflow.com/swd/rest/observations/station/'
};
```

## 🧪 Test Locally

Before deploying, test the website locally:

```bash
# Using Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Or Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 🚀 Deploy Your Website

### Option 1: GitHub Pages (Free)
1. Go to your repository settings
2. Click "Pages" in the sidebar
3. Under "Source", select your branch (main)
4. Click "Save"
5. Your site will be available at `https://yourusername.github.io/LHF-Tempest-Copilot/`

### Option 2: Netlify (Free)
1. Sign up at https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Deploy with default settings
5. Your site will be available at a netlify.app URL

### Option 3: Vercel (Free)
1. Sign up at https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Deploy with default settings

### Option 4: Any Web Server
Simply upload all files to your web hosting:
- index.html
- dashboard.html
- styles.css
- weather.js
- dashboard.js
- CONFIG.md (optional)
- README.md (optional)

## 🎨 Customize the Design

All design settings are in `styles.css` using CSS variables (lines 1-50). You can easily customize:

- **Colors**: Change `--color-primary`, `--color-secondary`, etc.
- **Fonts**: Modify `--font-primary` and `--font-display`
- **Spacing**: Adjust `--spacing-*` values
- **Shadows**: Tweak `--shadow-*` values

## 🌡️ Adjust "Too Hot to Ride" Thresholds

Edit `weather.js` (lines 90-102) to customize temperature thresholds:

```javascript
function getRidingStatus(wetBulbTemp) {
    if (wetBulbTemp < 70) {  // Change these values
        return { status: 'safe', message: 'Safe to Ride', ... };
    } else if (wetBulbTemp < 80) {
        return { status: 'caution', message: 'Ride with Caution', ... };
    } else {
        return { status: 'danger', message: 'Too Hot to Ride', ... };
    }
}
```

## 📱 Features

### Main Page
- Current temperature, humidity, and wind conditions
- "Too Hot to Ride" indicator using wet bulb temperature
- Additional cards for pressure, UV index, and dew point

### Dashboard Page  
- 12+ comprehensive weather metrics
- Temperature, feels like, wet bulb temperature
- Dew point, humidity, pressure
- Wind speed, gusts, and direction
- UV index, solar radiation
- Precipitation status
- Last update timestamp

## 🔄 How It Works

1. Website loads and fetches data from Tempest API
2. Calculates wet bulb temperature using Stull (2011) formula
3. Determines riding safety based on wet bulb temperature thresholds
4. Displays all weather data with icons and animations
5. Auto-refreshes every 5 minutes to keep data current

## ❓ Need Help?

- See `CONFIG.md` for detailed configuration instructions
- See `README.md` for full feature documentation
- The website uses mock/placeholder data if the API is unavailable

## 🔒 Security Note

The API token is intentionally in the client-side code. This is standard practice for Tempest API - the token only allows reading data from your personal weather station and has appropriate rate limits.

---

**You're almost done! Just add your station ID and deploy. Enjoy your farm weather website! 🐴🌤️**

# Configuration Guide

## Tempest Weather Station Setup

To connect this website to your Tempest Weather Station, you need two pieces of information:

### 1. API Token (Already Configured)
Your API token has been set to: `8bbac51c-64fc-4f20-9000-dea6c4b8e17c`

### 2. Station ID (Required)
You need to obtain your Tempest station ID:

#### Option A: From the Tempest App
1. Open the Tempest app on your phone
2. Go to Settings → Stations
3. Select your station
4. Look for "Station ID" or note the station number

#### Option B: From the Tempest Web Interface
1. Log in to your Tempest account at https://tempestwx.com
2. Navigate to your station
3. The station ID will be in the URL or station settings

#### Option C: Using the API
Run this command (replace YOUR_API_TOKEN with your token):
```bash
curl "https://swd.weatherflow.com/swd/rest/stations?token=8bbac51c-64fc-4f20-9000-dea6c4b8e17c"
```

This will return a list of your stations with their IDs.

### 3. Update the Configuration
Once you have your station ID, edit the `weather.js` file:

```javascript
const TEMPEST_CONFIG = {
    stationId: 'YOUR_STATION_ID', // Replace with your actual station ID
    apiToken: '8bbac51c-64fc-4f20-9000-dea6c4b8e17c',
    apiUrl: 'https://swd.weatherflow.com/swd/rest/observations/station/'
};
```

Replace `'YOUR_STATION_ID'` with your actual station ID number.

## Deployment

This is a static website that can be deployed to any web hosting service:

### GitHub Pages
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select the branch to deploy (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name/`

### Netlify
1. Sign up for a free Netlify account
2. Connect your GitHub repository
3. Deploy with default settings
4. Your site will be available at a Netlify URL

### Other Static Hosting Services
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any web server (Apache, Nginx, etc.)

Simply upload the HTML, CSS, and JS files to your hosting service.

## Testing Locally

To test the website locally:

1. Open `index.html` in a web browser directly, or
2. Use a local web server (recommended for full functionality):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Customization

### Adjusting "Too Hot to Ride" Thresholds

Edit the `getRidingStatus()` function in `weather.js` to customize the wet bulb temperature thresholds:

```javascript
function getRidingStatus(wetBulbTemp) {
    if (wetBulbTemp < 70) {
        return { status: 'safe', ... };
    } else if (wetBulbTemp < 80) {
        return { status: 'caution', ... };
    } else {
        return { status: 'danger', ... };
    }
}
```

### Styling

Edit `styles.css` to customize colors, fonts, and layout to match your preferences.

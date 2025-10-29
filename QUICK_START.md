# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- Leaflet 1.9.4 (mapping library)
- React-Leaflet 4.2.1 (React bindings)
- React-Scripts 5.0.1 (build tooling)

### 2. Start Development Server

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

### 3. Use the App

1. **Allow location access** or enter a ZIP code (e.g., `90210`)
2. Adjust filters as needed (time window, radius, min magnitude)
3. View earthquakes on the map and in the list
4. Click markers or cards to see details
5. Use "View on USGS" or "Did You Feel It?" links for more info

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm run build`
Creates an optimized production build in the `build/` folder.

### `npm test`
Launches the test runner (if tests are added).

## First Time Using?

The app will:
1. Request your browser location permission
2. If denied, prompt for a ZIP code
3. Save your last ZIP to localStorage for convenience
4. Fetch earthquakes from USGS within your specified radius and time window

## Keyboard Shortcuts

- **Tab** - Navigate through cards and controls
- **Enter/Space** - Select focused card
- **Esc** - Close popups on map

## Troubleshooting

### "Location not available"
- Check browser permissions (usually a 🔒 icon in address bar)
- Try entering a ZIP code instead

### "No earthquakes found"
- Increase search radius (slider control)
- Extend time window (dropdown: 24h → 48h → 7d)
- Lower minimum magnitude (slider control)

### Build/Install Errors
- Ensure Node.js 14+ is installed: `node --version`
- Clear cache: `npm cache clean --force`
- Delete `node_modules/` and `package-lock.json`, then `npm install` again

## Tech Stack

- **React 18** - UI framework
- **Leaflet** - Interactive maps
- **CARTO Dark Matter** - Dark basemap tiles
- **USGS API** - Real-time earthquake data
- **Zippopotam.us** - ZIP → coordinates conversion

## Design Notes

This app follows an **Anduril-inspired minimal aesthetic**:
- Monochrome black/white palette
- Accent colors only for data (green/orange/red magnitude coding)
- Clean Inter typography
- Hairline dividers and restrained spacing

## Next Steps

After getting familiar with the app, consider:
- Adding auto-refresh (polling USGS every 2-5 min)
- Implementing URL state for shareable links
- Creating a "Quakes You Felt" bookmark feature
- Adding push notifications for new quakes above a threshold

## Resources

- [Full README](./README.md) - Complete documentation
- [USGS API Docs](https://earthquake.usgs.gov/fdsnws/event/1/)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [React Docs](https://react.dev/)

---

**Questions?** Check the [README](./README.md) for detailed API information, architecture, and design decisions.

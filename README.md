# Was That an Earthquake? Near-Me

![License](https://img.shields.io/badge/license-MIT-blue.svg)

Instantly check if there was an earthquake near you with trustworthy data from the USGS. When you feel a wobble, this app gives you context in one click—no slow sites, just immediate answers.

## Problem Statement

Living in earthquake country means every wobble raises the question: "Was that an earthquake?" Opening massive government sites is slow and overwhelming. This app delivers "was that it?" context instantly, with a clean interface that respects your time.

## Features

- **Instant Location Detection**: Automatic geolocation or ZIP code fallback
- **Smart Filtering**: Customize time window (24h/48h/7d), search radius (10-250 miles), and minimum magnitude
- **Interactive Dark Map**: CARTO Dark Matter basemap with color-coded earthquake markers
- **Likely Match Detection**: Smart algorithm identifies the most probable quake you felt based on time, distance, and magnitude
- **Rich Data Display**:
  - Magnitude, location, time, and depth
  - DYFI (Did You Feel It?) report counts
  - Community and instrumental intensity (CDI/MMI)
  - Tsunami warnings when applicable
- **Direct USGS Integration**: One-tap links to detailed USGS event pages and "Did You Feel It?" reporting

## Design Language

This app follows an **Anduril-inspired dark, minimal aesthetic** emphasizing clarity and restraint:

- **Monochrome-first**: Deep blacks (`#000000`), neutral grays, white typography
- **Swiss Grotesk Typography**: Clean Inter font family (Helvetica Now substitute)
- **Restrained Color**: Accent colors appear only for data visualization:
  - `#28C76F` - Minor quakes (≤2.5)
  - `#FFB020` - Light quakes (2.6-4.0)
  - `#FF7A00` - Moderate+ quakes (>4.0)
- **Generous Spacing**: Thoughtful whitespace with consistent 4/8/12/16/24/32/48/64px scale
- **Hairline Dividers**: Subtle 1px borders with `rgba(255,255,255,0.06)`
- **Subtle Motion**: 180ms transitions with `cubic-bezier(0.2, 0.9, 0.2, 1)` easing

### Design References

- [Anduril Industries](https://www.anduril.com/) - Inspiration for monochrome, mission-focused UI
- [Anduril Case Study by Yashas Mitta](https://yashasmitta.com/anduril) - Silicon Valley sophistication and minimal presentation
- [Helvetica Now on Fonts in Use](https://fontsinuse.com/uses/38642/anduril-com) - Typography reference
- [Brandfetch Anduril Colors](https://brandfetch.com/anduril.com) - Brand neutral palette

## Data Sources

All data is sourced from **free, public APIs** with no authentication required:

### USGS Earthquake Catalog API

- **Primary Source**: [FDSN/ComCat Event Service](https://earthquake.usgs.gov/fdsnws/event/1/)
- **Format**: GeoJSON with comprehensive earthquake metadata
- **Fields Used**:
  - `properties.mag` - Magnitude
  - `properties.place` - Human-readable location
  - `properties.time` - Unix timestamp (ms)
  - `properties.felt` - DYFI report count
  - `properties.cdi` - Community Decimal Intensity
  - `properties.mmi` - Modified Mercalli Intensity (instrumental)
  - `properties.tsunami` - Tsunami flag (0/1)
  - `properties.url` - USGS event page
  - `geometry.coordinates` - [longitude, latitude, depth]

**Documentation**:
- [FDSN Event Web Service](https://earthquake.usgs.gov/fdsnws/event/1/)
- [GeoJSON Feed Format](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [ComCat Documentation](https://earthquake.usgs.gov/data/comcat/)

### Zippopotam.us

- **Purpose**: ZIP code → latitude/longitude conversion fallback
- **Endpoint**: `https://api.zippopotam.us/us/{zipcode}`
- **Returns**: Coordinates and place name

**Documentation**:
- [Zippopotamus Getting Started](https://docs.zippopotam.us/docs/getting-started/)

### USGS "Did You Feel It?" (DYFI)

- **Purpose**: Community-driven earthquake intensity reporting
- **Integration**: Direct links to DYFI questionnaire for each event
- **Endpoint Pattern**: `https://earthquake.usgs.gov/earthquakes/eventpage/{eventId}/tellus`

**Documentation**:
- [DYFI Overview](https://earthquake.usgs.gov/data/dyfi/)

## Maps & Attribution

### CARTO Dark Matter Basemap

This app uses the **CARTO Dark Matter** raster basemap to maintain the dark, minimal aesthetic:

- **URL Pattern**: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- **Subdomains**: `a`, `b`, `c`, `d`
- **Free Tier**: Available for development and public projects
- **Required Attribution**: © OpenStreetMap contributors © CARTO

**References**:
- [CARTO Basemaps](https://github.com/CartoDB/basemap-styles)
- [OpenStreetMap Copyright](https://www.openstreetmap.org/copyright)

## Project Structure

```
src/
├── App.js                      # Main app with state management and orchestration
├── App.css                     # Anduril-inspired design system and styling
├── index.js                    # React entry point
├── index.css                   # Global resets
├── components/
│   ├── ControlsBar.jsx         # Location input, filters, and refresh controls
│   ├── MapView.jsx             # Leaflet map with CARTO Dark Matter + earthquake markers
│   ├── QuakeList.jsx           # Sortable list with "Likely Match" detection
│   ├── QuakeCard.jsx           # Individual earthquake card with metadata and actions
│   └── LoadingError.jsx        # Loading spinner and error states
└── utils/
    ├── geo.js                  # Haversine distance, time formatting, match scoring
    └── usgs.js                 # USGS API query builder and data fetching
```

## "Likely Match" Algorithm

The app computes a simple, explainable score to identify which earthquake you most likely felt:

```javascript
score = 0.7 × normalizedTime + 0.3 × normalizedDistance - 0.1 × (magnitude/6)
```

Where:
- **normalizedTime**: Minutes since earthquake / 90 (capped at 1)
- **normalizedDistance**: Miles from user / 100 (capped at 1)
- **Magnitude weight**: Small negative factor favoring stronger quakes

The event with the **lowest score** within 90 minutes and search radius gets the "⭐ Likely Match" badge.

## Installation

### Prerequisites

- Node.js 14+ and npm

### Setup

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Set Location**:
   - Click "📍 Use My Location" for automatic geolocation
   - Or enter a 5-digit ZIP code and click "Go"
   - Last used ZIP is saved in localStorage

2. **Adjust Filters**:
   - **Time Window**: 24h, 48h, or 7 days
   - **Radius**: 10-250 miles (slider)
   - **Min Magnitude**: 0.0-4.0 (slider)

3. **View Results**:
   - **Map**: Interactive markers colored by magnitude
   - **List**: Sortable by "Most Recent" or "Nearest"
   - **Likely Match**: Top candidate gets a ⭐ badge

4. **Take Action**:
   - Click "View on USGS" for detailed event info
   - Click "Did You Feel It?" to submit your own report

5. **Refresh**: Click "🔄 Refresh" to fetch latest data

## API Endpoints

### USGS Earthquake Query

```
GET https://earthquake.usgs.gov/fdsnws/event/1/query
  ?format=geojson
  &starttime=2025-10-28T00:00:00
  &endtime=2025-10-29T23:59:59
  &latitude=34.0522
  &longitude=-118.2437
  &maxradiuskm=80.47
  &minmagnitude=1.0
  &orderby=time
  &limit=200
```

### ZIP to Coordinates

```
GET https://api.zippopotam.us/us/90210
```

Returns:
```json
{
  "places": [{
    "latitude": "34.0901",
    "longitude": "-118.4065",
    "place name": "Beverly Hills",
    "state abbreviation": "CA"
  }]
}
```

## Technical Details

### State Management

- **React Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`
- **Location State**: Tracks lat/lon, source (geolocation/ZIP), and place name
- **Filter State**: Time window, radius, min magnitude
- **Data State**: Quakes array, loading/error flags
- **UI State**: Selected quake for map/list sync

### Effects

- Fetch earthquakes on location or filter change
- Request geolocation on mount if previously used
- Save last ZIP to localStorage

### Edge Cases Handled

- No geolocation permissions → ZIP fallback
- Invalid ZIP codes → Validation + error message
- USGS API rate limiting → Modest defaults (50mi/80km radius)
- Missing data fields → Conditional rendering (felt, cdi, mmi can be null)
- UTC timestamps → Convert to local time ("2h 14m ago")
- Responsive layout → Grid → stack on mobile

### Accessibility

- Keyboard-focusable list items (`tabIndex={0}`)
- ARIA labels on controls and map
- Sufficient color contrast (WCAG AA compliant)
- Semantic HTML with `role` attributes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Considerations

- **Memoization**: `useMemo` for expensive calculations (distances, scores)
- **Callbacks**: `useCallback` to prevent unnecessary re-renders
- **Lazy Loading**: Leaflet markers only render visible quakes
- **Debouncing**: User input could benefit from debounce (future enhancement)

## Future Enhancements

- **Auto-refresh**: Poll USGS every 2-5 minutes with toggle
- **URL State**: Serialize filters in query params for sharing (`?zip=90049&h=24&r=50&m=2.5`)
- **Bookmarking**: "Quakes You Felt" local storage list
- **Advanced Filters**: Depth range, significance threshold
- **Historical View**: Calendar picker for past date ranges
- **Notification**: Browser notification on new quakes above threshold

## License

MIT License - feel free to use this project for learning or personal use.

## Credits

- **Data**: [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/)
- **Maps**: [CARTO](https://carto.com/attributions) & [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
- **Geolocation**: [Zippopotam.us](https://www.zippopotam.us/)
- **Design Inspiration**: [Anduril Industries](https://www.anduril.com/)

## Disclaimer

This application is for informational purposes only. Always refer to official sources like USGS for authoritative earthquake information and follow local emergency protocols.

---

**Built with React, Leaflet, and a focus on simplicity and clarity.**

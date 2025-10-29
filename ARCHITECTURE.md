# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                  Was That an Earthquake? Near-Me                 │
│                        React Application                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                           App.js                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ State Management (React Hooks)                            │  │
│  │ • Location (lat/lon, placeName)                           │  │
│  │ • Filters (windowHours, radiusMi, minMag)                 │  │
│  │ • Data (quakes[], loading, error)                         │  │
│  │ • UI (selectedQuake)                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐       │
│  │ ControlsBar  │   │   MapView    │   │  QuakeList   │       │
│  └──────────────┘   └──────────────┘   └──────────────┘       │
└─────────────────────────────────────────────────────────────────┘
         │                     │                   │
         │                     │                   └──────┐
         │                     │                          ▼
         │                     │                  ┌──────────────┐
         │                     │                  │  QuakeCard   │
         │                     │                  └──────────────┘
         ▼                     ▼
┌──────────────┐       ┌──────────────┐
│ LoadingError │       │ LoadingError │
└──────────────┘       └──────────────┘
```

## Data Flow

```
User Action (Location)
       │
       ▼
┌─────────────────┐
│  Geolocation    │──────┐
│  Browser API    │      │
└─────────────────┘      │
       OR                │
┌─────────────────┐      │
│  ZIP Code       │      │
│  Input          │      │
└─────────────────┘      │
       │                 │
       ▼                 │
┌─────────────────┐      │
│ Zippopotam.us   │      │
│ API (ZIP→LL)    │      │
└─────────────────┘      │
       │                 │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ App.js State    │
       │ setUserLocation │
       └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ useEffect       │
       │ (fetchQuakes)   │
       └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ utils/usgs.js   │
       │ buildQuery()    │
       └─────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│ USGS Earthquake Catalog API        │
│ /fdsnws/event/1/query              │
│ ?format=geojson                    │
│ &latitude={lat}                    │
│ &longitude={lon}                   │
│ &maxradiuskm={radius}              │
│ &minmagnitude={mag}                │
│ &starttime={start}                 │
│ &endtime={now}                     │
└────────────────────────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ GeoJSON Response│
       │ features[]      │
       └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ utils/geo.js    │
       │ • haversine()   │
       │ • calcScore()   │
       │ • formatTime()  │
       └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ App.js State    │
       │ setQuakes()     │
       └─────────────────┘
                │
       ┌────────┴────────┐
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│   MapView    │  │  QuakeList   │
│              │  │              │
│ • Markers    │  │ • Cards      │
│ • Popups     │  │ • Sort       │
│ • Legend     │  │ • Badge      │
└──────────────┘  └──────────────┘
```

## Component Hierarchy

```
App.js
├── ControlsBar.jsx
│   ├── LocationButton (geolocation)
│   ├── ZipForm (input + submit)
│   ├── FilterGroup (time window select)
│   ├── FilterGroup (radius slider)
│   ├── FilterGroup (min mag slider)
│   └── RefreshButton
│
├── LoadingError.jsx (conditional)
│   ├── Spinner (if loading)
│   └── ErrorMessage (if error)
│
├── MapView.jsx
│   ├── Leaflet Map
│   │   ├── CARTO Dark Matter Tiles
│   │   ├── User Location Marker
│   │   └── Earthquake Markers (custom icons)
│   └── Legend
│       ├── Title
│       └── LegendItem × 3 (magnitude colors)
│
└── QuakeList.jsx
    ├── ListHeader
    │   ├── Count
    │   └── SortControls
    │       ├── SortButton (most recent)
    │       └── SortButton (nearest)
    │
    ├── EmptyState (if no quakes)
    │
    └── CardsContainer
        └── QuakeCard × N
            ├── LikelyMatchBadge (conditional)
            ├── QuakeHeader
            │   ├── MagnitudeBadge
            │   └── Location
            ├── QuakeDetails
            │   ├── TimeAgo
            │   ├── Distance
            │   └── Depth
            ├── QuakeIntensity (conditional)
            │   ├── DYFI Reports
            │   ├── CDI
            │   └── MMI
            ├── TsunamiWarning (conditional)
            └── QuakeActions
                ├── ViewOnUSGS (link)
                └── DidYouFeelIt (link)
```

## Utility Functions

```
utils/
├── geo.js
│   ├── haversineDistance(lat1, lon1, lat2, lon2) → miles
│   ├── milesToKm(miles) → kilometers
│   ├── kmToMiles(km) → miles
│   ├── getCoordinatesFromZip(zip) → { lat, lon, placeName }
│   ├── formatTimeAgo(timestampMs) → "2h 14m ago"
│   └── calculateMatchScore(quake, userLat, userLon, nowMs)
│       → { score, distance, timeDiffMinutes, isLikelyMatch }
│
└── usgs.js
    ├── buildQuery({ lat, lon, windowHours, radiusMi, minMag })
    │   → USGS API URL string
    ├── fetchEarthquakes({ lat, lon, windowHours, radiusMi, minMag })
    │   → Promise<Feature[]>
    ├── getDYFIUrl(eventId) → DYFI questionnaire URL
    ├── getMagnitudeColor(mag) → hex color
    └── getMagnitudeLabel(mag) → "Minor" | "Light" | "Moderate" | ...
```

## State Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Initial State                           │
│  userLocation: null                                          │
│  locationName: ""                                            │
│  filters: { windowHours: 24, radiusMi: 50, minMag: 0 }      │
│  quakes: []                                                  │
│  loading: false                                              │
│  error: null                                                 │
│  selectedQuake: null                                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   User Interaction                           │
│  • Click "Use My Location"                                   │
│  • Enter ZIP code                                            │
│  • Change filter (time/radius/mag)                           │
│  • Click refresh                                             │
│  • Select quake (card/marker)                                │
└─────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌────────────────┐ ┌──────────────┐ ┌──────────────┐
│ setUserLocation│ │ setFilters   │ │setSelectedQuake
│ setLocationName│ │              │ │              │
└────────────────┘ └──────────────┘ └──────────────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  useEffect    │
                  │  dependency:  │
                  │  [userLocation│
                  │   filters]    │
                  └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  setLoading   │
                  │  (true)       │
                  └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ fetchQuakes() │
                  │ (async)       │
                  └───────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                                 ▼
┌────────────────┐                ┌────────────────┐
│   Success      │                │     Error      │
│                │                │                │
│ setQuakes([])  │                │ setError(msg)  │
│ setError(null) │                │ setQuakes([])  │
│ setLoading(false)               │ setLoading(false)
└────────────────┘                └────────────────┘
         │                                 │
         └────────────────┬────────────────┘
                          ▼
                  ┌───────────────┐
                  │   Re-render   │
                  │               │
                  │ • MapView     │
                  │ • QuakeList   │
                  │ • Loading     │
                  │ • Error       │
                  └───────────────┘
```

## API Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    External APIs                             │
└─────────────────────────────────────────────────────────────┘

1. ZIP → Coordinates
   ┌───────────────────────────────────────┐
   │ https://api.zippopotam.us/us/{zip}    │
   └───────────────────────────────────────┘
                │
                ▼
   {
     "places": [{
       "latitude": "34.0901",
       "longitude": "-118.4065",
       "place name": "Beverly Hills",
       "state abbreviation": "CA"
     }]
   }

2. Earthquake Data
   ┌───────────────────────────────────────────────────┐
   │ https://earthquake.usgs.gov/fdsnws/event/1/query  │
   │ ?format=geojson                                   │
   │ &starttime=2025-10-28T00:00:00                    │
   │ &endtime=2025-10-29T23:59:59                      │
   │ &latitude=34.0522                                 │
   │ &longitude=-118.2437                              │
   │ &maxradiuskm=80.47                                │
   │ &minmagnitude=1.0                                 │
   │ &orderby=time                                     │
   │ &limit=200                                        │
   └───────────────────────────────────────────────────┘
                │
                ▼
   {
     "type": "FeatureCollection",
     "features": [
       {
         "type": "Feature",
         "id": "nc73xxx",
         "properties": {
           "mag": 3.2,
           "place": "5 km NE of Berkeley, CA",
           "time": 1735497600000,
           "url": "https://earthquake.usgs.gov/...",
           "felt": 23,
           "cdi": 3.4,
           "mmi": 3.8,
           "tsunami": 0,
           "updated": 1735498000000
         },
         "geometry": {
           "type": "Point",
           "coordinates": [-122.2523, 37.8795, 8.2]
         }
       }
     ]
   }

3. Did You Feel It? (DYFI)
   ┌────────────────────────────────────────────────────────┐
   │ https://earthquake.usgs.gov/earthquakes/eventpage/     │
   │ {eventId}/tellus                                       │
   └────────────────────────────────────────────────────────┘
                │
                ▼
   (Opens USGS questionnaire form in new tab)
```

## Design System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   App.css (Root)                             │
│                                                              │
│  :root {                                                     │
│    /* Color Tokens */                                        │
│    --bg: #000000                                             │
│    --bg-elev: #0B0B0B                                        │
│    --ink: #FFFFFF                                            │
│    --muted: #C1C3C2                                          │
│    --accent-ok: #28C76F                                      │
│    --accent-mid: #FFB020                                     │
│    --accent-warn: #FF7A00                                    │
│                                                              │
│    /* Spacing Tokens */                                      │
│    --space-4: 4px                                            │
│    --space-8: 8px                                            │
│    --space-12: 12px                                          │
│    --space-16: 16px                                          │
│    --space-24: 24px                                          │
│    --space-32: 32px                                          │
│    --space-48: 48px                                          │
│    --space-64: 64px                                          │
│                                                              │
│    /* Typography Tokens */                                   │
│    --font-base: "Inter", ...                                 │
│    --font-12: 12px                                           │
│    --font-14: 14px                                           │
│    --font-16: 16px                                           │
│    --font-20: 20px                                           │
│    --font-28: 28px                                           │
│    --font-40: 40px                                           │
│                                                              │
│    /* Motion Tokens */                                       │
│    --duration: 180ms                                         │
│    --easing: cubic-bezier(0.2, 0.9, 0.2, 1)                 │
│                                                              │
│    /* Layout Tokens */                                       │
│    --container-max: 1240px                                   │
│    --hairline: 1px solid rgba(255, 255, 255, 0.06)          │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌────────────────┐ ┌──────────────┐ ┌──────────────┐
│  Component     │ │  Component   │ │  Component   │
│  Styles        │ │  Styles      │ │  Styles      │
│                │ │              │ │              │
│ .quake-card {  │ │ .map-legend {│ │ .filter-group{
│   background:  │ │   background:│ │   display:   │
│   var(--bg);   │ │   var(...);  │ │   flex;      │
│   padding:     │ │   border:    │ │   gap:       │
│   var(--space-│ │   var(--hair-│ │   var(--space│
│   16);         │ │   line);     │ │   -8);       │
│ }              │ │ }            │ │ }            │
└────────────────┘ └──────────────┘ └──────────────┘
```

## Performance Optimization Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                   React Optimization                         │
└─────────────────────────────────────────────────────────────┘

1. useMemo for Expensive Calculations
   ┌────────────────────────────────────┐
   │ QuakeList.jsx                      │
   │                                    │
   │ const enrichedQuakes = useMemo(() =>│
   │   quakes.map(q => ({              │
   │     ...q,                          │
   │     distance: haversine(...),      │
   │     matchScore: calcScore(...)     │
   │   })),                             │
   │   [quakes, userLocation]           │
   │ );                                 │
   └────────────────────────────────────┘

2. useCallback for Stable References
   ┌────────────────────────────────────┐
   │ App.js                             │
   │                                    │
   │ const fetchQuakes = useCallback(   │
   │   async () => { ... },             │
   │   [userLocation, filters]          │
   │ );                                 │
   └────────────────────────────────────┘

3. Effect Dependencies
   ┌────────────────────────────────────┐
   │ App.js                             │
   │                                    │
   │ useEffect(() => {                  │
   │   fetchQuakes();                   │
   │ }, [fetchQuakes]);                 │
   │                                    │
   │ // Only re-fetch when location or  │
   │ // filters actually change         │
   └────────────────────────────────────┘

4. Marker Cleanup
   ┌────────────────────────────────────┐
   │ MapView.jsx                        │
   │                                    │
   │ useEffect(() => {                  │
   │   // Remove old markers            │
   │   markersRef.current.forEach(m =>  │
   │     m.remove()                     │
   │   );                               │
   │   // Add new markers               │
   │   quakes.forEach(addMarker);       │
   │ }, [quakes]);                      │
   └────────────────────────────────────┘
```

## Folder Structure

```
earthquake-near-me/
│
├── public/
│   └── index.html                 # HTML template with Leaflet CSS
│
├── src/
│   ├── components/
│   │   ├── ControlsBar.jsx        # Location + filters
│   │   ├── MapView.jsx            # Leaflet map
│   │   ├── QuakeList.jsx          # Sortable list
│   │   ├── QuakeCard.jsx          # Individual card
│   │   └── LoadingError.jsx       # Loading + error states
│   │
│   ├── utils/
│   │   ├── geo.js                 # Haversine, time, scoring
│   │   └── usgs.js                # API integration
│   │
│   ├── App.js                     # Main orchestration
│   ├── App.css                    # Design system + styles
│   ├── index.js                   # React entry
│   └── index.css                  # Global resets
│
├── .gitignore                     # Git exclusions
├── package.json                   # Dependencies + scripts
├── package-lock.json              # Dependency lock file
│
├── README.md                      # Complete documentation
├── QUICK_START.md                 # Getting started guide
├── DESIGN_SYSTEM.md               # Design tokens + patterns
├── ARCHITECTURE.md                # This file
└── PROJECT_SUMMARY.md             # Project overview
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Build Process                           │
└─────────────────────────────────────────────────────────────┘

    npm run build
         │
         ▼
┌──────────────────┐
│ react-scripts    │
│ build            │
│                  │
│ • Webpack bundle │
│ • Babel transpile│
│ • CSS minify     │
│ • Asset optimize │
└──────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│          build/ folder                │
│                                       │
│  ├── index.html                       │
│  ├── static/                          │
│  │   ├── js/                          │
│  │   │   └── main.ceec992d.js (93KB) │
│  │   └── css/                         │
│  │       └── main.74516624.css (2.8KB)│
│  └── asset-manifest.json              │
└──────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│      Deployment Options                │
│                                        │
│  1. GitHub Pages                       │
│     gh-pages -d build                  │
│                                        │
│  2. Netlify                            │
│     Drag build/ to Netlify             │
│                                        │
│  3. Vercel                             │
│     vercel --prod                      │
│                                        │
│  4. Static Server                      │
│     serve -s build                     │
└────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│        Production Site                 │
│                                        │
│  https://your-domain.com               │
│                                        │
│  • Serves static files                 │
│  • Client-side routing                 │
│  • API calls to USGS/Zippopotam       │
└────────────────────────────────────────┘
```

---

This architecture emphasizes:

1. **Separation of Concerns**: Components, utilities, and state clearly separated
2. **Unidirectional Data Flow**: React's one-way binding from parent to child
3. **Memoization**: Expensive calculations cached and recomputed only when dependencies change
4. **External API Integration**: Clean abstraction in utility modules
5. **Design System**: CSS custom properties for consistent theming
6. **Responsive Layout**: CSS Grid with mobile-first breakpoints
7. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
8. **Performance**: Lazy effects, marker cleanup, optimized re-renders

The result is a maintainable, scalable, and performant React application.
